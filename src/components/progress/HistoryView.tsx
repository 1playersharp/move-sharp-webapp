import Link from "next/link";
import { formatMetricValue, pbMetricByKey } from "@/lib/constants/pb-metrics";

type SessionRow = {
  kind: "session";
  id: string;
  when: Date;
  name: string;
  itemsLogged: number;
  itemsTotal: number;
};

type PbRow = {
  kind: "pb";
  id: string;
  when: Date;
  metricKey: string;
  metricLabel: string;
  value: number;
  isPersonalBest: boolean;
};

export type TimelineRow = SessionRow | PbRow;

function relativeDate(d: Date): string {
  const today = new Date();
  const diff = Math.floor((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;
  return d.toLocaleDateString();
}

export function HistoryView({ rows }: { rows: TimelineRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-white/10 bg-ink-900/50 p-6 text-center">
        <p className="font-display uppercase tracking-display text-white text-sm">
          No history yet
        </p>
        <p className="mt-1 text-xs text-muted">
          Log your first session or a PB — this timeline fills up as you train.
        </p>
      </div>
    );
  }

  return (
    <ul className="max-w-2xl space-y-2">
      {rows.map((row) => {
        if (row.kind === "session") {
          return (
            <li key={row.id}>
              <div className="rounded-card border border-white/5 bg-ink-850 p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-display uppercase tracking-display text-white text-sm">
                    {row.name}
                  </p>
                  <span className="text-[0.65rem] text-muted">{relativeDate(row.when)}</span>
                </div>
                <p className="mt-1 text-xs text-muted-strong">
                  {row.itemsLogged}/{row.itemsTotal} exercises ticked
                </p>
              </div>
            </li>
          );
        }
        const def = pbMetricByKey(row.metricKey);
        return (
          <li key={row.id}>
            <Link
              href={`/progress/${row.metricKey}`}
              className={
                row.isPersonalBest
                  ? "block rounded-card border border-achievement/25 bg-achievement/5 p-4"
                  : "block rounded-card border border-white/5 bg-ink-850 p-4"
              }
            >
              <div className="flex items-baseline justify-between gap-2">
                <p
                  className={
                    row.isPersonalBest
                      ? "font-display uppercase tracking-display text-achievement-400 text-sm"
                      : "font-display uppercase tracking-display text-muted-strong text-sm"
                  }
                >
                  {row.isPersonalBest ? "PB ·" : ""} {row.metricLabel}
                </p>
                <span className="text-[0.65rem] text-muted">{relativeDate(row.when)}</span>
              </div>
              <p className="mt-1 font-display uppercase tracking-display text-white text-lg">
                {def ? formatMetricValue(row.value, def.unit) : row.value}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
