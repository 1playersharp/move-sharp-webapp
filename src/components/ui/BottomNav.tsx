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

const TABS: Tab[] = [
  { href: "/", label: "Home", icon: <IconHome /> },
  { href: "/train", label: "Train", icon: <IconTrain /> },
  { href: "/quiz", label: "Quiz", icon: <IconQuiz /> },
  { href: "/progress", label: "Progress", icon: <IconProgress /> },
  { href: "/fuel", label: "Fuel", icon: <IconFuel /> },
  { href: "/you", label: "You", icon: <IconYou /> },
];

export function BottomNav() {
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
      <ul className="mx-auto flex max-w-xl items-stretch justify-around px-2 pt-2">
        {TABS.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
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

function IconTrain() {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M4 12h2l2-4 4 8 4-8 2 4h2" />
    </svg>
  );
}

function IconQuiz() {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M9 9a3 3 0 1 1 4.5 2.6c-1 .6-1.5 1.2-1.5 2.4" />
      <circle cx="12" cy="17.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconProgress() {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M4 20V6" />
      <path d="M10 20v-8" />
      <path d="M16 20v-4" />
      <path d="M22 20H2" />
    </svg>
  );
}

function IconFuel() {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M12 3s5 5.5 5 10a5 5 0 1 1-10 0c0-4.5 5-10 5-10Z" />
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
