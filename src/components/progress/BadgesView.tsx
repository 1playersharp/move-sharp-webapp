import { cn } from "@/lib/cn";

export type Badge = {
  key: string;
  label: string;
  criteria: string;
  earned: boolean;
  earnedAt?: Date;
  icon: string;
};

export function BadgesView({ badges }: { badges: Badge[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3">
      {badges.map((b) => (
        <li
          key={b.key}
          className={cn(
            "rounded-card border p-4 text-center",
            b.earned
              ? "border-mint bg-mint/10"
              : "border-white/5 bg-ink-850 opacity-60",
          )}
        >
          <div
            className={cn(
              "mx-auto flex h-10 w-10 items-center justify-center rounded-full text-xl",
              b.earned ? "bg-mint text-ink-950" : "bg-ink-800 text-muted",
            )}
            aria-hidden="true"
          >
            {b.icon}
          </div>
          <p className="mt-2 font-display uppercase tracking-display text-white text-sm leading-tight">
            {b.label}
          </p>
          <p className="mt-1 text-[0.65rem] text-muted">{b.criteria}</p>
          {b.earned && b.earnedAt ? (
            <p className="mt-2 text-[0.6rem] uppercase tracking-display font-display text-mint-400">
              Earned {b.earnedAt.toLocaleDateString()}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
