import Link from "next/link";
import type { Programme } from "@prisma/client";
import { QualityChip } from "./QualityChip";

const BAND_LABEL: Record<"U13_U15" | "U16_U18", string> = {
  U13_U15: "U13-15",
  U16_U18: "U16-18",
};

export function ProgrammeCard({ programme }: { programme: Programme }) {
  const bandLabel =
    programme.ageBands.length === 2
      ? "Both bands"
      : programme.ageBands.map((b) => BAND_LABEL[b as "U13_U15" | "U16_U18"]).join(" · ");

  return (
    <Link
      href={`/train/${programme.slug}`}
      className="group block rounded-card border border-white/5 bg-ink-850 p-4 shadow-card transition-colors hover:border-brand/30"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display uppercase tracking-display text-white text-lg leading-tight">
            {programme.name}
          </h3>
          <p className="mt-1 text-xs text-muted">
            {bandLabel} · {programme.weeks} weeks · {programme.sessionsPerWeek}×/wk
          </p>
        </div>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-muted-strong">
        {programme.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {programme.qualities.map((q) => (
          <QualityChip key={q} quality={q} />
        ))}
      </div>
    </Link>
  );
}
