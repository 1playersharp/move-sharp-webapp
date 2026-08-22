// Truncate a Date to its UTC calendar day (00:00:00 UTC).
// Used as the uniqueness key for daily rows (e.g. ReadinessEntry).
export function toUtcDay(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

// Format YYYY-MM-DD in UTC — safe for grouping/comparing dates without TZ drift.
export function utcDayKey(d: Date): string {
  return toUtcDay(d).toISOString().slice(0, 10);
}

export function addDays(d: Date, days: number): Date {
  const next = new Date(d);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

// Returns an array of the last N UTC days ending today (inclusive), oldest first.
export function lastNDays(n: number, now: Date = new Date()): Date[] {
  const today = toUtcDay(now);
  const out: Date[] = [];
  for (let i = n - 1; i >= 0; i--) out.push(addDays(today, -i));
  return out;
}
