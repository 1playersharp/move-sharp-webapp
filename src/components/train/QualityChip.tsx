import type { Quality } from "@prisma/client";
import { QUALITIES } from "@/lib/constants/qualities";
import { cn } from "@/lib/cn";

const LABEL_BY_KEY: Record<Quality, string> = Object.fromEntries(
  QUALITIES.map((q) => [q.key, q.label]),
) as Record<Quality, string>;

// Fallback labels for the 2 qualities not in the Home grid.
const EXTRA_LABELS: Record<string, string> = {
  endurance: "Endurance",
  robustness: "Robustness",
};

// One hue per quality, so a wall of chips is scannable without reading every
// label. Carried as a dot rather than a fill or text colour: that keeps the
// hue categorical, and stops it being mistaken for a status — the semantic
// colours (brand, completion, achievement, caution) own fills and text.
const DOT_BY_QUALITY: Record<string, string> = {
  speed: "bg-quality-speed",
  power: "bg-quality-power",
  strength: "bg-quality-strength",
  agility: "bg-quality-agility",
  endurance: "bg-quality-endurance",
  robustness: "bg-quality-robustness",
};

export function QualityChip({
  quality,
  active,
  className,
}: {
  quality: Quality;
  active?: boolean;
  className?: string;
}) {
  const label = LABEL_BY_KEY[quality] ?? EXTRA_LABELS[quality] ?? quality;
  const dot = DOT_BY_QUALITY[quality];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-display uppercase tracking-display text-[0.7rem]",
        active
          ? "border-brand bg-brand/20 text-brand-400"
          : "border-white/10 bg-ink-800 text-muted",
        className,
      )}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dot)}
        />
      ) : null}
      {label}
    </span>
  );
}
