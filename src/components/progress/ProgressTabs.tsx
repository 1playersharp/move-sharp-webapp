import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = { active: "bests" | "history" | "badges" };

const TABS: Array<{ key: Props["active"]; label: string; href: string }> = [
  { key: "bests", label: "Bests", href: "/progress" },
  { key: "history", label: "History", href: "/progress?view=history" },
  { key: "badges", label: "Badges", href: "/progress?view=badges" },
];

export function ProgressTabs({ active }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Progress view"
      className="grid grid-cols-3 gap-1 rounded-full bg-ink-800 p-1"
    >
      {TABS.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          role="tab"
          aria-selected={active === t.key}
          className={cn(
            "flex items-center justify-center rounded-full py-2.5 text-sm font-display uppercase tracking-display transition-colors",
            active === t.key
              ? "bg-brand text-ink-950 shadow"
              : "text-muted hover:text-white",
          )}
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}
