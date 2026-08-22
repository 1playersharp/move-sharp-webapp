import Link from "next/link";
import { QUALITIES } from "@/lib/constants/qualities";

export function QualityGrid() {
  return (
    <div>
      <h2 className="section-title mb-3">Train a Quality</h2>
      <div className="grid grid-cols-2 gap-3">
        {QUALITIES.map((q) => (
          <Link
            key={q.key}
            href={`/train?quality=${q.key}`}
            className="group flex flex-col justify-between rounded-card border border-white/5 bg-ink-850 p-4 shadow-card transition-colors hover:border-mint/30"
          >
            <span className="font-display uppercase tracking-display text-white text-lg">
              {q.label}
            </span>
            <span className="mt-2 text-xs text-muted group-hover:text-muted-strong">
              {q.blurb}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
