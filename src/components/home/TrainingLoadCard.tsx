import { Card, CardTitle, CardSubtitle } from "@/components/ui/Card";
import { lastNDays, utcDayKey } from "@/lib/date";

type Props = {
  countsByDay: Map<string, number>;
};

const WEEKDAY_INITIAL = ["S", "M", "T", "W", "T", "F", "S"];

export function TrainingLoadCard({ countsByDay }: Props) {
  const days = lastNDays(7);
  const counts = days.map((d) => countsByDay.get(utcDayKey(d)) ?? 0);
  const total = counts.reduce((a, b) => a + b, 0);
  const max = Math.max(1, ...counts);

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <CardTitle>Training load</CardTitle>
          <CardSubtitle>
            {total === 0
              ? "No sessions this week yet — start one from Train."
              : `${total} session${total === 1 ? "" : "s"} in the last 7 days.`}
          </CardSubtitle>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1.5" aria-hidden="true">
        {counts.map((c, i) => {
          const heightPct = (c / max) * 100;
          const isToday = i === counts.length - 1;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="flex h-14 w-full items-end rounded-md bg-ink-800">
                <div
                  className={`w-full rounded-md ${c === 0 ? "bg-white/5" : "bg-mint"}`}
                  style={{ height: c === 0 ? "8%" : `${heightPct}%` }}
                />
              </div>
              <span
                className={`text-[0.65rem] ${
                  isToday ? "text-mint" : "text-muted"
                }`}
              >
                {WEEKDAY_INITIAL[days[i].getUTCDay()]}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
