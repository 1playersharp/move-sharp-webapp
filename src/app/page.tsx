import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { Landing } from "@/components/marketing/Landing";
import { ReadinessCard } from "@/components/home/ReadinessCard";
import { TrainingLoadCard } from "@/components/home/TrainingLoadCard";
import { QualityGrid } from "@/components/home/QualityGrid";
import { BlockPreviews } from "@/components/home/BlockPreviews";
import { getAuthUser, getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { addDays, toUtcDay, utcDayKey } from "@/lib/date";

export default async function HomePage() {
  const authUser = await getAuthUser();
  if (!authUser) return <Landing />;

  const user = await getCurrentUser();
  if (!user || !user.player) redirect("/onboarding");

  const playerId = user.player.id;
  const today = toUtcDay(new Date());
  const weekAgo = addDays(today, -6);

  const [todayReadiness, weekSessions] = await Promise.all([
    prisma.readinessEntry.findUnique({
      where: { playerId_recordedOn: { playerId, recordedOn: today } },
    }),
    prisma.session.findMany({
      where: { playerId, startedAt: { gte: weekAgo } },
      select: { startedAt: true },
    }),
  ]);

  const countsByDay = new Map<string, number>();
  for (const s of weekSessions) {
    const k = utcDayKey(s.startedAt);
    countsByDay.set(k, (countsByDay.get(k) ?? 0) + 1);
  }

  return (
    <AppShell>
      <Header title={`Hi, ${user.player.name.split(" ")[0]}`} subtitle="Ready, test, then get to work." />
      <div className="space-y-6 px-5">
        <ReadinessCard today={todayReadiness} />
        <TrainingLoadCard countsByDay={countsByDay} />
        <QualityGrid />
        <BlockPreviews />
      </div>
    </AppShell>
  );
}
