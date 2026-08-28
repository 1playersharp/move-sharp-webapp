"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WordMark } from "@/components/ui/Header";

// Sticky top nav for the landing page. The "Start training" CTA
// appears in the bar only once the hero is scrolled past — before
// that, the hero has its own dominant CTA and doubling up creates
// visual noise.
//
// Uses IntersectionObserver against a sentinel element the parent
// places at the bottom of the hero. Without JavaScript the CTA never
// appears, but the wordmark + anchor links + Sign in still render as
// plain <a> tags — nothing on this bar is JS-dependent for core use.

const LINKS = [
  { label: "What's inside", href: "#whats-inside" },
  { label: "For parents", href: "#for-parents" },
  { label: "How it works", href: "#how-it-works" },
];

type Props = {
  // Selector for the sentinel element (usually placed at the end of
  // the hero). When it leaves the viewport, the CTA reveals.
  sentinelSelector?: string;
};

export function MarketingNav({ sentinelSelector = "#hero-sentinel" }: Props) {
  const [heroPastFold, setHeroPastFold] = useState(false);

  useEffect(() => {
    const el = document.querySelector(sentinelSelector);
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroPastFold(!entry.isIntersecting);
      },
      { rootMargin: "-4rem 0px 0px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sentinelSelector]);

  return (
    <div className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/85 backdrop-blur">
      <nav
        aria-label="Marketing"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-10"
      >
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 rounded"
          aria-label="MoveSharp home"
        >
          <WordMark className="text-lg" />
        </Link>

        {/* Section anchors — hidden on the smallest phones because
            they compete with the CTA for horizontal room. */}
        <ul className="hidden gap-6 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-white/70 hover:text-mint focus-visible:text-mint focus-visible:outline-none"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm text-white/80 hover:text-mint focus-visible:text-mint focus-visible:outline-none"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className={`inline-flex h-9 items-center rounded-full bg-mint px-4 text-sm font-display uppercase tracking-display text-ink-950 transition-opacity duration-300 hover:bg-mint-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 motion-reduce:transition-none ${
              heroPastFold
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            aria-hidden={heroPastFold ? undefined : true}
            tabIndex={heroPastFold ? undefined : -1}
          >
            Start training
          </Link>
        </div>
      </nav>
    </div>
  );
}
