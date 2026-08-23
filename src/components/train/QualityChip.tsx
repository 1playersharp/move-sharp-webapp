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
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-display uppercase tracking-display text-[0.65rem]",
        active
          ? "border-mint bg-mint/20 text-mint-400"
          : "border-white/10 bg-ink-800 text-muted",
        className,
      )}
    >
      {label}
    </span>
  );
}
