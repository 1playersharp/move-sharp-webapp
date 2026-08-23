"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { completeSession } from "@/app/actions/sessions";
import { cn } from "@/lib/cn";

type Item = {
  id: string;
  name: string;
  category: string;
  prescription: string;
  notes?: string;
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
  const [pending, startTransition] = useTransition();

  const toggle = (id: string) =>
    setChecked((prev) => {
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
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className={cn(
                    "w-full rounded-card border p-4 text-left transition-colors",
                    isDone
                      ? "border-mint bg-mint/10"
                      : "border-white/5 bg-ink-850 hover:border-mint/30",
                  )}
                  aria-pressed={isDone}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                        isDone ? "border-mint bg-mint text-ink-950" : "border-white/20 bg-ink-800",
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
                    ? "border-mint bg-mint text-ink-950"
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
          className="w-full rounded-xl bg-ink-800 p-3 text-sm text-white placeholder:text-muted border border-white/5 focus:border-mint focus:outline-none focus:ring-2 focus:ring-mint/30"
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
