import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  mode: "programme" | "exercise";
};

// Small pill toggle matching the "Your band / All" style already on /train.
export function ModeToggle({ mode }: Props) {
  return (
    <div
      className="flex gap-1 rounded-full bg-ink-800 p-0.5 text-[0.65rem]"
      role="tablist"
      aria-label="Train mode"
    >
      <Link
        href="/train"
        role="tab"
        aria-selected={mode === "programme"}
        className={cn(
          "rounded-full px-3 py-1 font-display uppercase tracking-display transition-colors",
          mode === "programme" ? "bg-mint text-ink-950" : "text-muted hover:text-white",
        )}
      >
        Programme
      </Link>
      <Link
        href="/train/exercise"
        role="tab"
        aria-selected={mode === "exercise"}
        className={cn(
          "rounded-full px-3 py-1 font-display uppercase tracking-display transition-colors",
          mode === "exercise" ? "bg-mint text-ink-950" : "text-muted hover:text-white",
        )}
      >
        Exercise
      </Link>
    </div>
  );
}
