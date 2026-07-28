import { Router, type IRouter } from "express";
import { z } from "zod";
import { db, preorderSubmissions, retreatBookings } from "@workspace/db";

const router: IRouter = Router();

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
  name: z.string().min(1),
  partner: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  location: z.enum(["Accra", "Mauritius", "Virtual"]),
  virtualTier: z.enum(["day3", "2days", "all3"]).optional(),
  note: z.string().optional(),
});

router.post("/submissions/retreat", async (req, res) => {
  const parsed = retreatBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.issues });
    return;
  }
  try {
    const [row] = await db
      .insert(retreatBookings)
      .values({
        name: parsed.data.name,
        partner: parsed.data.partner,
        email: parsed.data.email,
        phone: parsed.data.phone,
        location: parsed.data.location,
        virtualTier: parsed.data.virtualTier ?? null,
        note: parsed.data.note ?? null,
      })
      .returning({ id: retreatBookings.id });
    res.status(201).json({ ok: true, id: row?.id });
  } catch (err) {
    req.log.error({ err }, "Failed to save retreat booking");
    res.status(500).json({ error: "Failed to save submission" });
  }
});

export default router;
