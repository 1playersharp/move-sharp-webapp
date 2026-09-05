"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { WordMark } from "@/components/ui/Header";
import { isTabActive, type Tab } from "@/components/ui/nav-tabs";

// Desktop navigation. A bottom bar pinned to the base of a 1440px browser
// window is a phone idiom — on a desktop viewport it is the single strongest
// signal that an app is a scaled-up mobile layout. Above the lg breakpoint
// the same tabs become a fixed left rail instead, and BottomNav hides.
//
// Same tab list as the bottom bar (see nav-tabs.tsx), same active rule.

export const SIDE_NAV_WIDTH = "15rem"; // 240px

export function SideNav({ tabs, root }: { tabs: Tab[]; root: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-white/5 bg-ink-900/60 px-4 py-6 lg:flex"
    >
      <Link href={root} className="px-3 pb-6">
        <WordMark />
      </Link>
      <ul className="flex flex-1 flex-col gap-1">
        {tabs.map((tab) => {
          const active = isTabActive(pathname, tab.href, root);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 font-display uppercase tracking-display text-sm transition-colors",
                  active
                    ? "bg-brand/10 text-brand"
                    : "text-muted hover:bg-white/5 hover:text-white",
                )}
              >
                <span className="h-5 w-5 shrink-0">{tab.icon}</span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
