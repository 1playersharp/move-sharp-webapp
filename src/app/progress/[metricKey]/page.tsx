import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { pbMetricByKey, formatMetricValue } from "@/lib/constants/pb-metrics";

type Props = {
  params: Promise<{ metricKey: string }>;
};

type ConditionsShape = {
  surface?: string;
  weather?: string;
  windAssist?: number;
  footwear?: string;
  notes?: string;
};

export default async function MetricDetailPage({ params }: Props) {
  const user = await requirePlayer();
  const { metricKey } = await params;

  const def = pbMetricByKey(metricKey);
  if (!def) notFound();

  const metric = await prisma.metric.findUnique({
    where: { playerId_key: { playerId: user.player.id, key: metricKey } },
  });

  const entries = metric
    ? await prisma.metricEntry.findMany({
        where: { metricId: metric.id },
        orderBy: { recordedAt: "desc" },
      })
    : [];
  const best = entries.find((e) => e.isPersonalBest) ?? null;

  return (
    <AppShell>
      <Header
        back={{ href: "/progress", label: "Progress" }}
        title={def.label}
        subtitle={`${def.direction === "lower_better" ? "Lower is better" : "Higher is better"} · Unit: ${def.unit}`}
      />

      <div className="space-y-4 shell-gutter">
        <Card>
          <CardTitle>Personal best</CardTitle>
          {best ? (
            <>
              <p className="mt-2 font-display uppercase tracking-display text-mint-400 text-4xl leading-none">
                {formatMetricValue(best.value, def.unit)}
              </p>
              <p className="mt-2 text-xs text-muted">
                Set {best.recordedAt.toLocaleDateString()}
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted">No PB set yet — first attempt will become the one to beat.</p>
          )}
        </Card>

        <Link href={`/progress/log?metric=${metricKey}`} className="block">
          <Button size="lg" className="w-full">+ Log an attempt</Button>
        </Link>

        {entries.length > 0 ? (
          <section>
            <h2 className="section-title mb-3">History</h2>
            <ul className="space-y-2">
              {entries.map((e) => {
                const c = (e.conditions as ConditionsShape | null) ?? null;
                const conditionParts = c
                  ? [c.surface, c.weather, c.footwear, c.windAssist != null ? `wind ${c.windAssist} m/s` : null]
                      .filter(Boolean)
                      .join(" · ")
                  : "";
                return (
                  <li
                    key={e.id}
                    className={`rounded-card border p-4 ${
                      e.isPersonalBest
                        ? "border-mint bg-mint/10"
                        : "border-white/5 bg-ink-850"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="font-display uppercase tracking-display text-white text-lg">
                        {formatMetricValue(e.value, def.unit)}
                        {e.isPersonalBest ? (
                          <span className="ml-2 font-display uppercase tracking-display text-mint-400 text-[0.65rem]">
                            PB
                          </span>
                        ) : null}
                      </p>
                      <span className="text-xs text-muted">
                        {e.recordedAt.toLocaleDateString()}
                      </span>
                    </div>
                    {conditionParts ? (
                      <p className="mt-1 text-[0.7rem] text-muted">{conditionParts}</p>
                    ) : null}
                    {c?.notes ? (
                      <p className="mt-1 text-xs italic text-muted-strong">"{c.notes}"</p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}
