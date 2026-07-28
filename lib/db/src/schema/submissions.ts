import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// ─── Pre-order submissions (FERRG book) ──────────────────────────────────────

export const preorderSubmissions = pgTable("preorder_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  note: text("note"),
  followedUp: boolean("followed_up").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPreorderSchema = createInsertSchema(preorderSubmissions).omit(
  { id: true, createdAt: true },
);
export type InsertPreorder = z.infer<typeof insertPreorderSchema>;
export type Preorder = typeof preorderSubmissions.$inferSelect;

// ─── Retreat bookings ─────────────────────────────────────────────────────────

export const retreatBookings = pgTable("retreat_bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  partner: text("partner").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(), // 'Accra' | 'Mauritius' | 'Virtual'
  virtualTier: text("virtual_tier"),    // 'day3' | '2days' | 'all3' | null
  note: text("note"),
  followedUp: boolean("followed_up").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRetreatSchema = createInsertSchema(retreatBookings).omit(
  { id: true, createdAt: true },
);
export type InsertRetreat = z.infer<typeof insertRetreatSchema>;
export type RetreatBooking = typeof retreatBookings.$inferSelect;
