/**
 * Shared retreat cohort data.
 * Update dates here — changes propagate to the countdown timer and location cards.
 *
 * Dates are expressed as midnight local-time equivalents in UTC:
 *   WAT (UTC+1)  → use T23:00:00Z the night before
 *   MUT (UTC+4)  → use T20:00:00Z the night before
 */
export const COHORTS: { label: string; date: Date }[] = [
  { label: 'Accra cohort',     date: new Date('2026-10-07T23:00:00Z') }, // 8 Oct 00:00 WAT
  { label: 'Mauritius cohort', date: new Date('2026-10-21T20:00:00Z') }, // 22 Oct 00:00 MUT
];
