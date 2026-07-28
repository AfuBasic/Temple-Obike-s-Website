import { useEffect, useState } from 'react';

export interface CountdownResult {
  /** Label for the upcoming cohort, e.g. "Accra cohort" */
  label: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** true while at least one cohort is still in the future */
  active: boolean;
}

// Cohort dates — midnight WAT (UTC+1) = 23:00 UTC the previous day.
// We target the opening day of each cohort.
export const COHORTS: { label: string; date: Date }[] = [
  { label: 'Accra cohort',     date: new Date('2026-10-07T23:00:00Z') }, // 8 Oct 00:00 WAT
  { label: 'Mauritius cohort', date: new Date('2026-10-21T23:00:00Z') }, // 22 Oct 00:00 WAT (+4)
];

function computeFor(targetDate: Date, targetLabel: string): CountdownResult {
  const now = Date.now();
  const diff = targetDate.getTime() - now;
  if (diff <= 0) return { label: targetLabel, days: 0, hours: 0, minutes: 0, seconds: 0, active: false };
  const totalSec = Math.floor(diff / 1000);
  return {
    label: targetLabel,
    days:    Math.floor(totalSec / 86400),
    hours:   Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
    active: true,
  };
}

function computeNext(): CountdownResult {
  const now = Date.now();
  const upcoming = COHORTS.find(c => c.date.getTime() > now);
  if (!upcoming) return { label: '', days: 0, hours: 0, minutes: 0, seconds: 0, active: false };
  return computeFor(upcoming.date, upcoming.label);
}

export function useCountdown(targetDate?: Date, targetLabel?: string): CountdownResult {
  const computeFn = () => targetDate ? computeFor(targetDate, targetLabel ?? '') : computeNext();
  const [state, setState] = useState<CountdownResult>(computeFn);

  useEffect(() => {
    const id = setInterval(() => setState(computeFn()), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate?.getTime(), targetLabel]);

  return state;
}
