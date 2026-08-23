import "server-only";
import type { MetricEntry, Session } from "@prisma/client";
import type { Badge } from "@/components/progress/BadgesView";
import { addDays, toUtcDay } from "@/lib/date";

// Pure function of session + entry history — no DB writes. Cheap to
// compute per Progress-tab render.
export function computeBadges(
  sessions: Session[],
  entries: MetricEntry[],
): Badge[] {
  const completedSessions = sessions.filter((s) => s.completedAt != null);
  const pbEntries = entries.filter((e) => e.isPersonalBest);

  const firstSession = completedSessions.length > 0
    ? completedSessions[completedSessions.length - 1]
    : null;
  const firstPb = pbEntries.length > 0 ? pbEntries[pbEntries.length - 1] : null;

  // Sessions per rolling 7-day window — highest count in any window.
  const highestWeek = highestWeekCount(completedSessions);

  return [
    {
      key: "first-session",
      label: "First session",
      criteria: "Log your first completed session",
      earned: firstSession != null,
      earnedAt: firstSession?.completedAt ?? undefined,
      icon: "▶",
    },
    {
      key: "first-pb",
      label: "First PB",
      criteria: "Log your first personal best",
      earned: firstPb != null,
      earnedAt: firstPb?.recordedAt ?? undefined,
      icon: "★",
    },
    {
      key: "five-in-week",
      label: "Five in a week",
      criteria: "Complete 5 sessions inside any 7 days",
      earned: highestWeek >= 5,
      icon: "5",
    },
    {
      key: "ten-sessions",
      label: "Ten sessions",
      criteria: "Complete 10 sessions total",
      earned: completedSessions.length >= 10,
      earnedAt:
        completedSessions.length >= 10
          ? completedSessions[completedSessions.length - 10].completedAt ?? undefined
          : undefined,
      icon: "X",
    },
    {
      key: "twenty-sessions",
      label: "Twenty sessions",
      criteria: "Complete 20 sessions total",
      earned: completedSessions.length >= 20,
      icon: "XX",
    },
    {
      key: "five-pbs",
      label: "Five PBs",
      criteria: "Log 5 personal bests",
      earned: pbEntries.length >= 5,
      icon: "★★",
    },
  ];
}

function highestWeekCount(sessions: Session[]): number {
  if (sessions.length === 0) return 0;
  const days = sessions
    .filter((s) => s.completedAt)
    .map((s) => toUtcDay(s.completedAt!));
  let best = 0;
  for (let i = 0; i < days.length; i++) {
    const windowEnd = days[i];
    const windowStart = addDays(windowEnd, -6);
    const count = days.filter(
      (d) => d.getTime() >= windowStart.getTime() && d.getTime() <= windowEnd.getTime(),
    ).length;
    if (count > best) best = count;
  }
  return best;
}
