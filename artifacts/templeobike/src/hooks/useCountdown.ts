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
const COHORTS: { label: string; date: Date }[] = [
  { label: 'Accra cohort',    date: new Date('2026-10-07T23:00:00Z') }, // 8 Oct 00:00 WAT
  { label: 'Mauritius cohort', date: new Date('2026-10-21T23:00:00Z') }, // 22 Oct 00:00 WAT (+4)
];

function compute(): CountdownResult {
  const now = Date.now();
  const upcoming = COHORTS.find(c => c.date.getTime() > now);
  if (!upcoming) {
    return { label: '', days: 0, hours: 0, minutes: 0, seconds: 0, active: false };
  }
  const diff = upcoming.date.getTime() - now;
  const totalSec = Math.floor(diff / 1000);
  const days    = Math.floor(totalSec / 86400);
  const hours   = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { label: upcoming.label, days, hours, minutes, seconds, active: true };
}

export function useCountdown(): CountdownResult {
  const [state, setState] = useState<CountdownResult>(compute);

  useEffect(() => {
    const id = setInterval(() => setState(compute()), 1000);
    return () => clearInterval(id);
  }, []);

  return state;
}
