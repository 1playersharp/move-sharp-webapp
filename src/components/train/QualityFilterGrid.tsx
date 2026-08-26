import Link from "next/link";
import type { Quality } from "@prisma/client";
import { QUALITIES } from "@/lib/constants/qualities";
import { cn } from "@/lib/cn";

// The full six qualities the Programme model tags on.
const ALL_QUALITIES: Array<{ key: Quality; label: string; blurb: string }> = [
  ...QUALITIES,
  { key: "endurance", label: "Endurance", blurb: "Repeat efforts" },
  { key: "robustness", label: "Robustness", blurb: "Stay on the pitch" },
];

// Dedupe (QUALITIES already includes endurance + robustness).
const SEEN = new Set<string>();
const QUALITIES_LIST = ALL_QUALITIES.filter((q) => {
  if (SEEN.has(q.key)) return false;
  SEEN.add(q.key);
  return true;
});

type Props = {
  active?: Quality | null;
  buildHref: (quality: Quality | null) => string;
  // Optional set of qualities recommended for the player's position —
  // rendered with a mint tint + a small dot marker so they're easy to
  // spot without competing with the active state.
  recommendedFor?: Quality[];
};

export function QualityFilterGrid({ active, buildHref, recommendedFor }: Props) {
  const recommended = new Set(recommendedFor ?? []);
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      <Link
        href={buildHref(null)}
        className={cn(
          "flex flex-col items-center rounded-md border px-2 py-2 text-center",
          !active
            ? "border-mint bg-mint/15 text-mint-400"
            : "border-white/5 bg-ink-850 text-muted hover:border-mint/30",
        )}
      >
        <span className="font-display uppercase tracking-display text-[0.7rem]">All</span>
      </Link>
      {QUALITIES_LIST.map((q) => {
        const isActive = active === q.key;
        const isRecommended = recommended.has(q.key);
        return (
          <Link
            key={q.key}
            href={buildHref(q.key)}
            className={cn(
              "relative flex flex-col items-center rounded-md border px-2 py-2 text-center",
              isActive
                ? "border-mint bg-mint/15 text-mint-400"
                : isRecommended
                ? "border-mint/40 bg-mint/5 text-white hover:border-mint"
                : "border-white/5 bg-ink-850 text-muted hover:border-mint/30",
            )}
          >
            {isRecommended && !isActive ? (
              <span
                aria-label="Recommended"
                className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-mint"
              />
            ) : null}
            <span className="font-display uppercase tracking-display text-[0.7rem]">
              {q.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
