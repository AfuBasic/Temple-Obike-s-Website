import { Router, type IRouter } from "express";
import { db, preorderSubmissions, retreatBookings } from "@workspace/db";
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

    res.json({ preorders, retreats });
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
    } else {
      res.status(400).json({ error: "type must be retreat or preorder" });
      return;
    }

    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to update followed_up");
    res.status(500).json({ error: "Failed to update" });
  }
});

export default router;
