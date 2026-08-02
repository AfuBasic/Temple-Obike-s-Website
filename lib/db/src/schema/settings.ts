import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

// ─── Settings (key-value config store) ───────────────────────────────────────

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Setting = typeof settings.$inferSelect;

// ─── Known setting keys ───────────────────────────────────────────────────────

export const SETTING_KEYS = {
  PREORDER_SUBJECT:  "preorder_autoresponse_subject",
  PREORDER_MESSAGE:  "preorder_autoresponse_message",
  RETREAT_SUBJECT:   "retreat_autoresponse_subject",
  RETREAT_MESSAGE:   "retreat_autoresponse_message",
} as const;

export type SettingKey = typeof SETTING_KEYS[keyof typeof SETTING_KEYS];

// ─── Defaults (used when DB has no row yet) ───────────────────────────────────

export const SETTING_DEFAULTS: Record<SettingKey, string> = {
  [SETTING_KEYS.PREORDER_SUBJECT]: "Your name is on the list",
  [SETTING_KEYS.PREORDER_MESSAGE]:
    `Hi {name},\n\nThank you for reserving your copy. Your name is on the list.\n\nWhen the book is ready, you will be among the first to know and the first to receive it. If companion courses, workshops, or private cohorts open before then, pre-order readers hear about them first.\n\nThere is nothing you need to do right now. We have your details and we will be in touch.\n\nWith gratitude,\nThe Temple Obike Team`,
  [SETTING_KEYS.RETREAT_SUBJECT]: "We received your Gold Retreat request",
  [SETTING_KEYS.RETREAT_MESSAGE]:
    `Hi {name},\n\nWe have received your request for The Gold Retreat{location_part} and we are glad you reached out.\n\nSpaces are held on a first-come basis, so reaching out when you did matters. Our team will follow up by email and WhatsApp shortly with the next steps.\n\nIf you have any questions before then, simply reply to this email.\n\nWith gratitude,\nThe Temple Obike Team`,
};
