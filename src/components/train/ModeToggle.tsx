import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  mode: "programme" | "exercise";
  className?: string;
};

// Full-width segmented control below the Header. Two equal-width buttons,
// hard to miss on mobile.
export function ModeToggle({ mode, className }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Train mode"
      className={cn(
        "grid grid-cols-2 gap-1 rounded-full bg-ink-800 p-1",
        className,
      )}
    >
      <Link
        href="/train"
        role="tab"
        aria-selected={mode === "programme"}
        className={cn(
          "flex items-center justify-center rounded-full py-2.5 text-sm font-display uppercase tracking-display transition-colors",
          mode === "programme"
            ? "bg-mint text-ink-950 shadow"
            : "text-muted hover:text-white",
        )}
      >
        Programme
      </Link>
      <Link
        href="/train/exercise"
        role="tab"
        aria-selected={mode === "exercise"}
        className={cn(
          "flex items-center justify-center rounded-full py-2.5 text-sm font-display uppercase tracking-display transition-colors",
          mode === "exercise"
            ? "bg-mint text-ink-950 shadow"
            : "text-muted hover:text-white",
        )}
      >
        Exercise
      </Link>
    </div>
  );
}
