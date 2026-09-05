import type { TrainingContext } from "@prisma/client";
import { setTrainingContext } from "@/app/actions/player";
import { cn } from "@/lib/cn";

type Props = {
  context: TrainingContext;
  size?: "sm" | "md";
  className?: string;
};

// Server-action-driven pill toggle. Every button is its own form so it
// works without any client JS (Progressive-enhancement friendly).
export function ContextToggle({ context, size = "sm", className }: Props) {
  const pad = size === "md" ? "px-4 py-2 text-sm" : "px-3 py-1 text-[0.65rem]";

  return (
    <div
      role="group"
      aria-label="Training context"
      className={cn(
        "flex gap-1 rounded-full bg-ink-800 p-0.5",
        className,
      )}
    >
      {(["home", "gym"] as const).map((value) => {
        const active = context === value;
        return (
          <form key={value} action={setTrainingContext} className="contents">
            <input type="hidden" name="context" value={value} />
            <button
              type="submit"
              aria-pressed={active}
              className={cn(
                "rounded-full font-display uppercase tracking-display transition-colors",
                pad,
                active ? "bg-brand text-ink-950" : "text-muted hover:text-white",
              )}
            >
              {value === "home" ? "Home" : "Gym"}
            </button>
          </form>
        );
      })}
    </div>
  );
}
