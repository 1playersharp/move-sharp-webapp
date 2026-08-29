import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Landing } from "@/components/marketing/Landing";
import { ReadinessCard } from "@/components/home/ReadinessCard";
import { TrainingLoadCard } from "@/components/home/TrainingLoadCard";
import { QualityGrid } from "@/components/home/QualityGrid";
import { BlockPreviews } from "@/components/home/BlockPreviews";
import { getAuthUser, getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { addDays, toUtcDay, utcDayKey } from "@/lib/date";
import { getPlayerHeaderData } from "@/lib/player-header";
import { PlayerHeader } from "@/components/player/PlayerHeader";
import { startSession } from "@/app/actions/sessions";

export default async function HomePage() {
  const authUser = await getAuthUser();
  if (!authUser) return <Landing />;

  const user = await getCurrentUser();
  if (!user) redirect("/onboarding");
  // Managers landing on the player home get routed to their surface.
  if (user.manager) redirect("/coach");
  if (!user.player) redirect("/onboarding");

  const playerId = user.player.id;
  const today = toUtcDay(new Date());
  const weekAgo = addDays(today, -6);

  // Header data runs alongside the existing dashboard reads rather than
  // after them — the card must not add a sequential round trip.
  const [todayReadiness, weekSessions, headerData] = await Promise.all([
    prisma.readinessEntry.findUnique({
      where: { playerId_recordedOn: { playerId, recordedOn: today } },
    }),
    prisma.session.findMany({
      where: { playerId, startedAt: { gte: weekAgo } },
      select: { startedAt: true },
    }),
    getPlayerHeaderData(user.player),
  ]);

  const countsByDay = new Map<string, number>();
  for (const s of weekSessions) {
    const k = utcDayKey(s.startedAt);
    countsByDay.set(k, (countsByDay.get(k) ?? 0) + 1);
  }

  return (
    <AppShell>
      {/* The full card carries identity, so it replaces the old
          "Hi, {name}" Header rather than sitting under it — no duplicate
          name, and it keeps the vertical budget on a 375px phone. */}
      <div className="px-5 pt-[max(1rem,env(safe-area-inset-top))]">
        <PlayerHeader
          variant="full"
          firstName={headerData.firstName}
          avatarId={headerData.avatarId}
          trainingContext={headerData.trainingContext}
          programme={headerData.programme}
          nextSession={headerData.nextSession}
          startAction={startSession}
        />
      </div>
      <div className="mt-6 space-y-6 px-5">
        <ReadinessCard today={todayReadiness} />
        <TrainingLoadCard countsByDay={countsByDay} />
        <QualityGrid />
        <BlockPreviews />
      </div>
    </AppShell>
  );
}
