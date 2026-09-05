import Link from "next/link";
import type { Metric, MetricEntry } from "@prisma/client";
import { PB_METRICS, PB_GROUP_LABEL, formatMetricValue, type PbMetric } from "@/lib/constants/pb-metrics";

type PbSummary = {
  metric: PbMetric;
  storedMetric: Metric | null;
  best: MetricEntry | null;
  latestAt: Date | null;
};

type Props = { summaries: PbSummary[] };

function groupedByType(summaries: PbSummary[]) {
  const groups: Record<string, PbSummary[]> = {};
  for (const s of summaries) {
    (groups[s.metric.group] ||= []).push(s);
  }
  return groups;
}

function relativeDate(d: Date): string {
  const today = new Date();
  const diff = Math.floor((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "today";
  if (diff === 1) return "yesterday";
  if (diff < 7) return `${diff} days ago`;
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
  return d.toLocaleDateString();
}

export function BestsView({ summaries }: Props) {
  const grouped = groupedByType(summaries);
  const orderedGroups: PbMetric["group"][] = [
    "sprint",
    "jump",
    "agility",
    "strength",
    "strength_endurance",
  ];

  return (
    <div className="space-y-6">
      {orderedGroups.map((group) => {
        const items = grouped[group];
        if (!items?.length) return null;
        return (
          <section key={group}>
            <h2 className="section-title mb-3">{PB_GROUP_LABEL[group]}</h2>
            <ul className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {items.map((s) => (
                <li key={s.metric.key}>
                  <Link
                    href={`/progress/${s.metric.key}`}
                    className="group flex items-center justify-between gap-3 rounded-card border border-white/5 bg-ink-850 p-4 shadow-card transition-colors hover:border-brand/30"
                  >
                    <div className="min-w-0">
                      <p className="font-display uppercase tracking-display text-white text-sm leading-tight">
                        {s.metric.label}
                      </p>
                      <p className="mt-0.5 text-[0.7rem] text-muted">
                        {s.best
                          ? `Set ${relativeDate(s.best.recordedAt)}`
                          : "No PB yet"}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      {s.best ? (
                        <span className="font-display uppercase tracking-display text-achievement-400 text-lg">
                          {formatMetricValue(s.best.value, s.metric.unit)}
                        </span>
                      ) : (
                        <span className="font-display uppercase tracking-display text-muted text-xs">
                          —
                        </span>
                      )}
                      <span aria-hidden="true" className="ml-1 text-muted group-hover:text-white">›</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

export type { PbSummary };
