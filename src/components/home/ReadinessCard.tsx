import type { ReadinessEntry } from "@prisma/client";
import { Card, CardTitle, CardSubtitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { saveReadiness } from "@/app/actions/readiness";

const SCALES = [
  { key: "soreness", label: "Soreness", low: "None", high: "Heavy" },
  { key: "sleep", label: "Sleep", low: "Poor", high: "Great" },
  { key: "energy", label: "Energy", low: "Flat", high: "Firing" },
  { key: "mood", label: "Mood", low: "Low", high: "Up" },
] as const;

function readinessScore(r: ReadinessEntry): number {
  // Sleep, energy, mood → higher is better. Soreness → lower is better.
  // Average, normalised 0-100 for a rough single-glance summary.
  const positive = (r.sleep + r.energy + r.mood) / 3;
  const negative = 6 - r.soreness;
  return Math.round(((positive * 3 + negative) / 4) * 20);
}

export function ReadinessCard({ today }: { today: ReadinessEntry | null }) {
  if (!today) {
    return (
      <Card>
        <CardTitle>Today's readiness</CardTitle>
        <CardSubtitle>Soreness, sleep, energy, mood — 30 seconds.</CardSubtitle>
        <form action={saveReadiness} className="mt-4 space-y-4">
          {SCALES.map((s) => (
            <div key={s.key}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-display uppercase tracking-display text-muted">{s.label}</span>
                <span className="text-muted">{s.low} → {s.high}</span>
              </div>
              <div
                className="grid grid-cols-5 gap-1.5"
                role="radiogroup"
                aria-label={s.label}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <label
                    key={n}
                    className="cursor-pointer rounded-md border border-white/5 bg-ink-800 px-2 py-2 text-center text-sm text-muted-strong hover:bg-ink-700 has-[:checked]:border-mint has-[:checked]:bg-mint has-[:checked]:text-ink-950"
                  >
                    <input
                      type="radio"
                      name={s.key}
                      value={n}
                      required
                      className="sr-only"
                    />
                    {n}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <Button type="submit" size="sm">Save check-in</Button>
        </form>
      </Card>
    );
  }

  const score = readinessScore(today);
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <CardTitle>Ready</CardTitle>
          <CardSubtitle>Checked in today — {score}/100.</CardSubtitle>
        </div>
        <div className="rounded-full bg-mint/15 px-3 py-1 text-mint-400 font-display tracking-display text-sm">
          {score}
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-4 gap-3 text-center">
        {SCALES.map((s) => (
          <div key={s.key}>
            <dt className="font-display uppercase tracking-display text-[0.65rem] text-muted">{s.label}</dt>
            <dd className="mt-1 text-lg text-white">{today[s.key]}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
