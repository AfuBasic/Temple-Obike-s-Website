import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db, preorderSubmissions, retreatBookings } from "@workspace/db";

const router: IRouter = Router();

// ─── Seat caps ────────────────────────────────────────────────────────────────
// Advertised limits: Accra 10, Mauritius 7.
// Hard stops are set slightly higher to give a small buffer.
const SEAT_CAPS: Partial<Record<string, number>> = {
  Accra:     12,
  Mauritius: 8,
  // Virtual is uncapped
};

async function bookingCount(location: string): Promise<number> {
  const [row] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(retreatBookings)
    .where(eq(retreatBookings.location, location));
  return row?.count ?? 0;
}

// ─── GET /api/availability ────────────────────────────────────────────────────
// Returns current booking counts and full status for each in-person location.
router.get("/availability", async (req, res) => {
  try {
    const [accraCount, mauritiusCount] = await Promise.all([
      bookingCount("Accra"),
      bookingCount("Mauritius"),
    ]);
    res.json({
      Accra:     { count: accraCount,    cap: SEAT_CAPS.Accra,     full: accraCount    >= (SEAT_CAPS.Accra    ?? Infinity) },
      Mauritius: { count: mauritiusCount, cap: SEAT_CAPS.Mauritius, full: mauritiusCount >= (SEAT_CAPS.Mauritius ?? Infinity) },
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch availability");
    res.status(500).json({ error: "Failed to fetch availability" });
  }
});

// ─── POST /api/submissions/preorder ──────────────────────────────────────────

const preorderBody = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  note: z.string().optional(),
});

router.post("/submissions/preorder", async (req, res) => {
  const parsed = preorderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.issues });
    return;
  }
  try {
    const [row] = await db
      .insert(preorderSubmissions)
      .values({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        note: parsed.data.note ?? null,
      })
      .returning({ id: preorderSubmissions.id });
    res.status(201).json({ ok: true, id: row?.id });
  } catch (err) {
    req.log.error({ err }, "Failed to save preorder submission");
    res.status(500).json({ error: "Failed to save submission" });
  }
});

// ─── POST /api/submissions/retreat ───────────────────────────────────────────

const retreatBody = z.object({
  name:        z.string().min(1),
  partner:     z.string().min(1),
  email:       z.string().email(),
  phone:       z.string().min(1),
  location:    z.enum(["Accra", "Mauritius", "Virtual"]),
  virtualTier: z.enum(["1day", "2days", "3days"]).optional(),
  note:        z.string().optional(),
});

router.post("/submissions/retreat", async (req, res) => {
  const parsed = retreatBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.issues });
    return;
  }

  // ── Seat cap check ──────────────────────────────────────────────────────────
  const cap = SEAT_CAPS[parsed.data.location];
  if (cap !== undefined) {
    try {
      const count = await bookingCount(parsed.data.location);
      if (count >= cap) {
        res.status(409).json({ error: "LOCATION_FULL", location: parsed.data.location });
        return;
      }
    } catch (err) {
      req.log.error({ err }, "Failed to check seat cap");
      res.status(500).json({ error: "Failed to verify availability" });
      return;
    }
  }

  try {
    const [row] = await db
      .insert(retreatBookings)
      .values({
        name:        parsed.data.name,
        partner:     parsed.data.partner,
        email:       parsed.data.email,
        phone:       parsed.data.phone,
        location:    parsed.data.location,
        virtualTier: parsed.data.virtualTier ?? null,
        note:        parsed.data.note ?? null,
      })
      .returning({ id: retreatBookings.id });
    res.status(201).json({ ok: true, id: row?.id });
  } catch (err) {
    req.log.error({ err }, "Failed to save retreat booking");
    res.status(500).json({ error: "Failed to save submission" });
  }
});

export default router;
