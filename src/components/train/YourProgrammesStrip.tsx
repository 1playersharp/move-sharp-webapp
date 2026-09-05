import Link from "next/link";
import type { Programme } from "@prisma/client";
import { QualityChip } from "./QualityChip";
import { DeleteProgrammeConfirm } from "./DeleteProgrammeConfirm";

type Props = { programmes: Programme[] };

export function YourProgrammesStrip({ programmes }: Props) {
  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="section-title">Your programmes</h2>
        <Link
          href="/quiz"
          className="rounded-full bg-brand px-3 py-1 font-display uppercase tracking-display text-[0.65rem] text-ink-950 hover:bg-brand-400"
        >
          + Build one
        </Link>
      </div>

      {programmes.length === 0 ? (
        <Link
          href="/quiz"
          className="block rounded-card border border-dashed border-brand/40 bg-brand/5 p-4 text-center hover:border-brand"
        >
          <p className="font-display uppercase tracking-display text-white text-sm">
            Build your own 6-week block
          </p>
          <p className="mt-1 text-xs text-muted">
            Ten quick questions — we do the rest.
          </p>
        </Link>
      ) : (
        <div className="space-y-3">
          {programmes.map((p) => (
            <div
              key={p.id}
              className="group rounded-card border border-brand/40 bg-brand/5 shadow-card hover:border-brand"
            >
              <Link href={`/train/${p.slug}`} className="block p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display uppercase tracking-display text-white text-lg leading-tight">
                        {p.name}
                      </h3>
                      <span className="rounded-full bg-ink-800 px-2 py-0.5 font-display uppercase tracking-display text-[0.6rem] text-muted-strong">
                        Custom
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted">
                      {p.weeks} weeks · {p.sessionsPerWeek}×/wk · built {p.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {p.description ? (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-strong">{p.description}</p>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.qualities.map((q) => (
                    <QualityChip key={q} quality={q} />
                  ))}
                </div>
              </Link>
              <div className="flex justify-end border-t border-brand/20 px-3 py-2">
                <DeleteProgrammeConfirm
                  id={p.id}
                  programmeName={p.name}
                  variant="icon"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
