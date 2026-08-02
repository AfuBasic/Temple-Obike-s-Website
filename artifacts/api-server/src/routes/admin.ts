import { Router, type IRouter } from "express";
import { db, preorderSubmissions, retreatBookings, speakingEnquiries, settings, SETTING_KEYS, SETTING_DEFAULTS, type SettingKey } from "@workspace/db";
import { desc, eq } from "drizzle-orm";

const router: IRouter = Router();

// Simple password check — password must match SESSION_SECRET
function isAuthorised(authHeader?: string): boolean {
  const secret = process.env["SESSION_SECRET"];
  if (!secret) return false;
  if (!authHeader) return false;
  // Accept "Bearer <secret>" or plain "<secret>"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;
  return token === secret;
}

// ─── GET /api/admin/submissions ──────────────────────────────────────────────
//
//   Returns both pre-order and retreat bookings.
//   Optional query param: ?location=Accra | Mauritius | Virtual
//   Requires:  Authorization: Bearer <SESSION_SECRET>

router.get("/admin/submissions", async (req, res) => {
  if (!isAuthorised(req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorised" });
    return;
  }

  try {
    const locationFilter = req.query["location"] as string | undefined;

    // Fetch preorders (no location filter for book preorders)
    const preorders = await db
      .select()
      .from(preorderSubmissions)
      .orderBy(desc(preorderSubmissions.createdAt));

    // Fetch retreat bookings (optionally filtered by location)
    const retreatsQuery = db
      .select()
      .from(retreatBookings)
      .orderBy(desc(retreatBookings.createdAt));

    const retreats =
      locationFilter &&
      ["Accra", "Mauritius", "Virtual"].includes(locationFilter)
        ? await db
            .select()
            .from(retreatBookings)
            .where(eq(retreatBookings.location, locationFilter))
            .orderBy(desc(retreatBookings.createdAt))
        : await retreatsQuery;

    // Fetch speaking enquiries
    const enquiries = await db
      .select()
      .from(speakingEnquiries)
      .orderBy(desc(speakingEnquiries.createdAt));

    res.json({ preorders, retreats, enquiries });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch admin submissions");
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

// ─── PATCH /api/admin/submissions/:type/:id/followed-up ──────────────────────
//
//   Toggles the followed_up flag for a retreat or preorder row.
//   Body: { followedUp: boolean }
//   Requires:  Authorization: Bearer <SESSION_SECRET>

router.patch("/admin/submissions/:type/:id/followed-up", async (req, res) => {
  if (!isAuthorised(req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorised" });
    return;
  }

  const { type, id } = req.params;
  const rowId = parseInt(id, 10);
  if (isNaN(rowId)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const { followedUp } = req.body as { followedUp?: boolean };
  if (typeof followedUp !== "boolean") {
    res.status(400).json({ error: "followedUp must be a boolean" });
    return;
  }

  try {
    if (type === "retreat") {
      await db
        .update(retreatBookings)
        .set({ followedUp })
        .where(eq(retreatBookings.id, rowId));
    } else if (type === "preorder") {
      await db
        .update(preorderSubmissions)
        .set({ followedUp })
        .where(eq(preorderSubmissions.id, rowId));
    } else if (type === "enquiry") {
      await db
        .update(speakingEnquiries)
        .set({ followedUp })
        .where(eq(speakingEnquiries.id, rowId));
    } else {
      res.status(400).json({ error: "type must be retreat, preorder, or enquiry" });
      return;
    }

    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to update followed_up");
    res.status(500).json({ error: "Failed to update" });
  }
});

// ─── GET /api/admin/settings ─────────────────────────────────────────────────
//
//   Returns all email-template settings.
//   Falls back to SETTING_DEFAULTS for any key not yet in the DB.
//   Requires:  Authorization: Bearer <SESSION_SECRET>

router.get("/admin/settings", async (req, res) => {
  if (!isAuthorised(req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorised" });
    return;
  }

  try {
    const rows = await db.select().from(settings);
    const map: Record<string, string> = {};
    for (const row of rows) map[row.key] = row.value;

    // Merge with defaults so every key is always present
    const result: Record<string, string> = {};
    for (const key of Object.values(SETTING_KEYS)) {
      result[key] = map[key] ?? SETTING_DEFAULTS[key];
    }

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch settings");
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

// ─── PUT /api/admin/settings ─────────────────────────────────────────────────
//
//   Upserts one or more email-template settings.
//   Body: { [key: string]: string }  (only known SETTING_KEYS are accepted)
//   Requires:  Authorization: Bearer <SESSION_SECRET>

router.put("/admin/settings", async (req, res) => {
  if (!isAuthorised(req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorised" });
    return;
  }

  const body = req.body as Record<string, unknown>;
  const validKeys = new Set<string>(Object.values(SETTING_KEYS));
  const updates: { key: string; value: string }[] = [];

  for (const [k, v] of Object.entries(body)) {
    if (!validKeys.has(k)) continue;
    if (typeof v !== "string") continue;
    updates.push({ key: k, value: v });
  }

  if (updates.length === 0) {
    res.status(400).json({ error: "No valid setting keys provided" });
    return;
  }

  try {
    for (const { key, value } of updates) {
      await db
        .insert(settings)
        .values({ key, value, updatedAt: new Date() })
        .onConflictDoUpdate({
          target: settings.key,
          set: { value, updatedAt: new Date() },
        });
    }
    res.json({ ok: true, updated: updates.map((u) => u.key) });
  } catch (err) {
    req.log.error({ err }, "Failed to update settings");
    res.status(500).json({ error: "Failed to update settings" });
  }
});

// ─── GET /api/settings/email-templates ───────────────────────────────────────
//
//   Public (no auth) endpoint returning the current email-template settings.
//   The frontend reads this before submitting a form so the autoresponse text
//   is always in sync with what Temple has configured.

router.get("/settings/email-templates", async (req, res) => {
  try {
    const rows = await db.select().from(settings);
    const map: Record<string, string> = {};
    for (const row of rows) map[row.key] = row.value;

    const result: Record<string, string> = {};
    for (const key of Object.values(SETTING_KEYS)) {
      result[key] = map[key] ?? SETTING_DEFAULTS[key];
    }

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch email templates");
    res.status(500).json({ error: "Failed to fetch email templates" });
  }
});

export default router;
