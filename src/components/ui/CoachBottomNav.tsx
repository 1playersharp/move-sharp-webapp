"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/cn";

type Tab = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

// Three tabs for the coach shell. Deliberately short — a coach doesn't
// need Train / Fuel / Recovery / Progress; those are player surfaces.
const TABS: Tab[] = [
  { href: "/coach", label: "Home", icon: <IconHome /> },
  { href: "/coach/teams", label: "Teams", icon: <IconTeams /> },
  { href: "/coach/you", label: "You", icon: <IconYou /> },
];

export function CoachBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40",
        "bg-ink-900/95 backdrop-blur border-t border-white/5",
        "pb-[max(0.5rem,env(safe-area-inset-bottom))]",
      )}
    >
      <ul className="shell-width flex items-stretch justify-around px-2 pt-2">
        {TABS.map((tab) => {
          const active =
            tab.href === "/coach"
              ? pathname === "/coach"
              : pathname.startsWith(tab.href);
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 py-1.5 text-xs font-display uppercase tracking-display",
                  active ? "text-mint" : "text-muted hover:text-white",
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

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
      <path d="M10 19v-5h4v5" />
    </svg>
  );
}

function IconTeams() {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <circle cx="8.5" cy="8" r="3" />
      <circle cx="15.5" cy="8" r="3" />
      <path d="M3.5 19c1-3 3-4.5 5-4.5s4 1.5 5 4.5" />
      <path d="M10.5 19c1-3 3-4.5 5-4.5s4 1.5 5 4.5" />
    </svg>
  );
}

function IconYou() {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.5-3.5 4.5-5 7.5-5s6 1.5 7.5 5" />
    </svg>
  );
}
