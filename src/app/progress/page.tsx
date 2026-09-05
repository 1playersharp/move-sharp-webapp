import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PB_METRICS, pbMetricByKey } from "@/lib/constants/pb-metrics";
import { ProgressTabs } from "@/components/progress/ProgressTabs";
import { BestsView, type PbSummary } from "@/components/progress/BestsView";
import { HistoryView, type TimelineRow } from "@/components/progress/HistoryView";
import { BadgesView } from "@/components/progress/BadgesView";
import { computeBadges } from "@/lib/badges";

type Props = {
  searchParams: Promise<{ view?: string }>;
};

export default async function ProgressPage({ searchParams }: Props) {
  const user = await requirePlayer();
  const { view } = await searchParams;
  const active: "bests" | "history" | "badges" =
    view === "history" ? "history" : view === "badges" ? "badges" : "bests";

  const playerId = user.player.id;

  const [metrics, entries, sessions] = await Promise.all([
    prisma.metric.findMany({ where: { playerId } }),
    prisma.metricEntry.findMany({
      where: { playerId },
      orderBy: { recordedAt: "desc" },
      take: 50,
    }),
    prisma.session.findMany({
      where: { playerId, completedAt: { not: null } },
      include: { sessionTemplate: true },
      orderBy: { completedAt: "desc" },
      take: 50,
    }),
  ]);

  const metricByKey = new Map(metrics.map((m) => [m.key, m] as const));

  let body: React.ReactNode;
  if (active === "bests") {
    const summaries: PbSummary[] = PB_METRICS.map((def) => {
      const stored = metricByKey.get(def.key) ?? null;
      const best =
        stored
          ? entries.find((e) => e.metricId === stored.id && e.isPersonalBest) ?? null
          : null;
      return {
        metric: def,
        storedMetric: stored,
        best,
        latestAt: best?.recordedAt ?? null,
      };
    });
    body = <BestsView summaries={summaries} />;
  } else if (active === "history") {
    const rows: TimelineRow[] = [];
    for (const s of sessions) {
      if (!s.completedAt) continue;
      const total = s.sessionTemplate
        ? (await prisma.sessionTemplateItem.count({
            where: { sessionTemplateId: s.sessionTemplate.id },
          }))
        : 0;
      rows.push({
        kind: "session",
        id: s.id,
        when: s.completedAt,
        name: s.sessionTemplate?.name ?? "Session",
        itemsLogged: s.completedItemIds.length,
        itemsTotal: total,
      });
    }
    for (const e of entries) {
      const stored = metrics.find((m) => m.id === e.metricId);
      const def = stored ? pbMetricByKey(stored.key) : undefined;
      rows.push({
        kind: "pb",
        id: e.id,
        when: e.recordedAt,
        metricKey: stored?.key ?? "unknown",
        metricLabel: def?.label ?? stored?.label ?? "PB",
        value: e.value,
        isPersonalBest: e.isPersonalBest,
      });
    }
    rows.sort((a, b) => b.when.getTime() - a.when.getTime());
    body = <HistoryView rows={rows.slice(0, 60)} />;
  } else {
    const badges = computeBadges(sessions, entries);
    body = <BadgesView badges={badges} />;
  }

  return (
    <AppShell>
      <Header
        title="Progress"
        subtitle="Bests, history, badges."
        right={
          <Link
            href="/progress/log"
            className="rounded-full bg-mint px-3 py-1 font-display uppercase tracking-display text-[0.65rem] text-ink-950 hover:bg-mint-400"
          >
            + Log PB
          </Link>
        }
      />
      <div className="space-y-6 shell-gutter">
        <ProgressTabs active={active} />
        {body}
      </div>
    </AppShell>
  );
}
