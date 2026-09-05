import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { Field, Input, Label, ErrorText, HelpText } from "@/components/ui/Field";
import { requirePlayer } from "@/lib/auth";
import {
  PB_METRICS,
  PB_GROUP_LABEL,
  pbMetricByKey,
  type PbMetric,
} from "@/lib/constants/pb-metrics";
import { logPersonalBest } from "@/app/actions/metrics";

type Props = {
  searchParams: Promise<{ metric?: string; error?: string }>;
};

const UNIT_HINT: Record<string, string> = {
  seconds: "in seconds (e.g. 2.85)",
  meters: "in meters (e.g. 6.42)",
  centimeters: "in centimetres (e.g. 62)",
  reps: "as a whole number (e.g. 24)",
  kilograms: "in kilos",
  watts: "in watts",
  custom: "value",
};

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export default async function LogPbPage({ searchParams }: Props) {
  await requirePlayer();
  const { metric: metricKey, error } = await searchParams;
  const selected: PbMetric | undefined = metricKey ? pbMetricByKey(metricKey) : undefined;

  const grouped: Record<string, PbMetric[]> = {};
  for (const m of PB_METRICS) (grouped[m.group] ||= []).push(m);
  const orderedGroups: PbMetric["group"][] = ["sprint", "jump", "agility", "strength_endurance"];

  return (
    <AppShell>
      <Header
        title="Log a PB"
        subtitle="Direction-aware — sprint times count down, jumps count up."
      />
      <div className="space-y-6 shell-gutter">
        <Link
          href="/progress"
          className="inline-block text-[0.7rem] font-display uppercase tracking-display text-brand-400 hover:text-brand"
        >
          ← Progress
        </Link>

        {error ? <ErrorText>{error}</ErrorText> : null}

        {!selected ? (
          <div className="space-y-6">
            {orderedGroups.map((group) => (
              <section key={group}>
                <h2 className="section-title mb-3">{PB_GROUP_LABEL[group]}</h2>
                <ul className="space-y-2">
                  {grouped[group]?.map((m) => (
                    <li key={m.key}>
                      <Link
                        href={`/progress/log?metric=${m.key}`}
                        className="flex items-center justify-between rounded-card border border-white/5 bg-ink-850 p-4 hover:border-brand/30"
                      >
                        <span className="font-display uppercase tracking-display text-white text-sm">
                          {m.label}
                        </span>
                        <span aria-hidden="true" className="text-muted">›</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <form action={logPersonalBest} className="space-y-4">
            <input type="hidden" name="metricKey" value={selected.key} />
            <div>
              <p className="font-display uppercase tracking-display text-white text-lg">
                {selected.label}
              </p>
              <p className="mt-1 text-xs text-muted">
                {selected.direction === "lower_better" ? "Lower is better." : "Higher is better."}
              </p>
            </div>

            <Field>
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                name="value"
                type="number"
                inputMode="decimal"
                step={selected.unit === "reps" ? "1" : "0.01"}
                required
                placeholder={UNIT_HINT[selected.unit] ?? "value"}
              />
              <HelpText>Enter {UNIT_HINT[selected.unit] ?? "the raw value"}.</HelpText>
            </Field>

            <Field>
              <Label htmlFor="recordedAt">When?</Label>
              <Input id="recordedAt" name="recordedAt" type="date" defaultValue={todayIso()} />
            </Field>

            <fieldset className="space-y-3 rounded-xl border border-white/5 bg-ink-900/50 p-4">
              <legend className="px-1 font-display uppercase tracking-display text-xs text-muted">
                Conditions (optional)
              </legend>
              <Field>
                <Label htmlFor="surface">Surface</Label>
                <Input id="surface" name="surface" placeholder="grass, track, concrete…" />
              </Field>
              <Field>
                <Label htmlFor="weather">Weather</Label>
                <Input id="weather" name="weather" placeholder="dry, wet, cold…" />
              </Field>
              <Field>
                <Label htmlFor="windAssist">Wind (m/s, + tail / − head)</Label>
                <Input id="windAssist" name="windAssist" type="number" step="0.1" />
              </Field>
              <Field>
                <Label htmlFor="footwear">Footwear</Label>
                <Input id="footwear" name="footwear" placeholder="spikes, trainers, boots…" />
              </Field>
              <Field>
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" name="notes" maxLength={200} />
              </Field>
            </fieldset>

            <Button type="submit" size="lg" className="w-full">Save attempt</Button>
          </form>
        )}
      </div>
    </AppShell>
  );
}
