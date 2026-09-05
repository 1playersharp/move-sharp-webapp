import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type HeaderProps = {
  title: string;
  subtitle?: string;
  /** Optional "← Back" link above the title, for detail screens. */
  back?: { href: string; label: string };
  /** Extra content under the title — meta lines, chips, a context toggle. */
  children?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
};

// Every screen's title bar. Detail pages used to hand-roll this markup
// because there was no way to render a back link through the component, and
// they drifted apart doing it — title sizes ranged from text-2xl to text-5xl
// across the app, so moving between screens visibly jumped the heading size.
// The `back` and `children` slots exist so no page needs its own version.
export function Header({
  title,
  subtitle,
  back,
  children,
  right,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "shell-gutter pt-[max(1rem,env(safe-area-inset-top))] pb-4",
        className,
      )}
    >
      {back ? (
        <Link
          href={back.href}
          className="text-[0.7rem] font-display uppercase tracking-display text-brand-400 hover:text-brand"
        >
          ← {back.label}
        </Link>
      ) : null}
      <div className={cn("flex items-start justify-between gap-3", back && "mt-2")}>
        <div className="min-w-0">
          <h1 className="font-display uppercase tracking-display text-white text-2xl md:text-3xl leading-tight">
            {title}
          </h1>
          {subtitle ? <p className="text-sm text-muted mt-1">{subtitle}</p> : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      {children}
    </header>
  );
}

export function WordMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display uppercase tracking-display text-2xl leading-none",
        className,
      )}
    >
      <span className="text-white">MOVE</span>
      <span className="text-brand">SHARP</span>
    </span>
  );
}
