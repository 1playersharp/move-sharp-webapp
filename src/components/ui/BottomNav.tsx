"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { PLAYER_TABS, isTabActive } from "@/components/ui/nav-tabs";

// Mobile and tablet navigation. Hidden from lg up, where SideNav takes over.
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 lg:hidden",
        "bg-ink-900/95 backdrop-blur border-t border-white/5",
        "pb-[max(0.5rem,env(safe-area-inset-bottom))]",
      )}
    >
      <ul className="shell-width flex items-stretch justify-around px-2 pt-2">
        {PLAYER_TABS.map((tab) => {
          const active = isTabActive(pathname, tab.href, "/");
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 py-1.5 text-xs font-display uppercase tracking-display",
                  active ? "text-brand" : "text-muted hover:text-white",
                )}
              >
                <span className="h-6 w-6">{tab.icon}</span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
