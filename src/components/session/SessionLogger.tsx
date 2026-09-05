"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { completeSession } from "@/app/actions/sessions";
import { cn } from "@/lib/cn";
import { ExerciseDemo } from "@/components/exercise/ExerciseDemo";
import { hasExerciseDemo } from "@/lib/exercise/demo";
import type { MotionSpec } from "@/lib/exercise/motion-spec";

type Item = {
  id: string;
  slug: string;
  name: string;
  category: string;
  spec?: MotionSpec | null;
  prescription: string;
  notes?: string;
  pbMetricKey?: string | null;
  pbMetricLabel?: string | null;
  pbUnitHint?: string | null;
};

type Props = {
  sessionId: string;
  items: Item[];
};

const FEEL_SCALE = [
  { value: 1, label: "Rough" },
  { value: 2, label: "Off" },
  { value: 3, label: "OK" },
  { value: 4, label: "Sharp" },
  { value: 5, label: "Firing" },
];

export function SessionLogger({ sessionId, items }: Props) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState("");
  const [feltAfter, setFeltAfter] = useState<number | null>(null);
  const [pbValues, setPbValues] = useState<Record<string, string>>({});
  // Demos are mounted only while open — each one is its own WebGL context.
  const [openDemos, setOpenDemos] = useState<Set<string>>(new Set());
  const [pending, startTransition] = useTransition();

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleDemo = (id: string) =>
    setOpenDemos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const submit = () => {
    const fd = new FormData();
    for (const id of checked) fd.append("completedItemIds", id);
    if (feltAfter != null) fd.set("feltAfter", String(feltAfter));
    if (notes.trim()) fd.set("notes", notes.trim());
    for (const [itemId, value] of Object.entries(pbValues)) {
      if (checked.has(itemId) && value.trim()) {
        fd.set(`pb_${itemId}`, value.trim());
      }
    }
    startTransition(() => {
      completeSession(sessionId, fd);
    });
  };

  const allChecked = items.length > 0 && checked.size === items.length;

  return (
    <div className="space-y-6">
      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="section-title">Exercises</h2>
          <span className="text-xs text-muted">
            {checked.size} / {items.length}
          </span>
        </div>
        <ul className="space-y-2">
          {items.map((item) => {
            const isDone = checked.has(item.id);
            const showPb = isDone && item.pbMetricKey;
            const demoOpen = openDemos.has(item.id);
            const canDemo = hasExerciseDemo(item.slug, item.spec);
            return (
              <li key={item.id}>
                <div
                  className={cn(
                    "rounded-card border transition-colors",
                    isDone
                      ? "border-completion bg-completion/10"
                      : "border-white/5 bg-ink-850 hover:border-completion/30",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="w-full p-4 text-left"
                    aria-pressed={isDone}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                          isDone ? "border-completion bg-completion text-ink-950" : "border-white/20 bg-ink-800",
                        )}
                        aria-hidden="true"
                      >
                        {isDone ? "✓" : ""}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-display uppercase tracking-display text-white text-sm">
                            {item.name}
                          </span>
                          <span className="text-[0.65rem] uppercase tracking-display text-muted">
                            {item.category}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-strong">{item.prescription}</p>
                        {item.notes ? (
                          <p className="mt-1 text-[0.7rem] italic text-muted">{item.notes}</p>
                        ) : null}
                      </div>
                    </div>
                  </button>

                  {canDemo ? (
                    <div className="border-t border-white/5 px-4 py-2">
                      <button
                        type="button"
                        onClick={() => toggleDemo(item.id)}
                        aria-expanded={demoOpen}
                        className="text-[0.7rem] font-display uppercase tracking-display text-brand-400 hover:text-brand"
                      >
                        {demoOpen ? "Hide the move" : "Show me the move"}
                      </button>
                      {demoOpen ? (
                        <ExerciseDemo
                          slug={item.slug}
                          name={item.name}
                          spec={item.spec}
                          className="mt-2"
                        />
                      ) : null}
                    </div>
                  ) : null}

                  {showPb ? (
                    <div className="border-t border-white/5 px-4 pb-3 pt-2">
                      <label className="block text-[0.65rem] uppercase tracking-display font-display text-achievement-400">
                        Log a PB? · {item.pbMetricLabel}
                      </label>
                      <input
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        value={pbValues[item.id] ?? ""}
                        onChange={(e) =>
                          setPbValues((prev) => ({
                            ...prev,
                            [item.id]: e.target.value,
                          }))
                        }
                        placeholder={item.pbUnitHint ?? "value"}
                        className="mt-1 h-9 w-full rounded-md bg-ink-800 px-3 text-sm text-white placeholder:text-muted border border-white/10 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                      />
                      <p className="mt-1 text-[0.65rem] text-muted">
                        Optional — only fill if you timed or measured this rep.
                      </p>
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="section-title mb-3">How did it feel?</h2>
        <div className="grid grid-cols-5 gap-1.5" role="radiogroup" aria-label="Feel after">
          {FEEL_SCALE.map((f) => {
            const active = feltAfter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFeltAfter(f.value)}
                aria-pressed={active}
                className={cn(
                  "flex flex-col items-center rounded-md border py-2 text-center",
                  active
                    ? "border-brand bg-brand text-ink-950"
                    : "border-white/5 bg-ink-800 text-muted hover:bg-ink-700",
                )}
              >
                <span className="text-lg font-display tracking-display">{f.value}</span>
                <span className="text-[0.6rem] uppercase tracking-display">{f.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <label htmlFor="session-notes" className="section-title mb-3 block">
          Notes
        </label>
        <textarea
          id="session-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={500}
          rows={3}
          placeholder="Anything worth remembering — what worked, what didn't."
          className="w-full rounded-xl bg-ink-800 p-3 text-sm text-white placeholder:text-muted border border-white/5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
        <p className="mt-1 text-right text-[0.65rem] text-muted">{notes.length}/500</p>
      </section>

      <Button
        type="button"
        size="lg"
        onClick={submit}
        disabled={pending}
        className="w-full"
      >
        {pending
          ? "Saving…"
          : allChecked
            ? "Complete session"
            : `Complete (${checked.size} logged)`}
      </Button>
    </div>
  );
}
