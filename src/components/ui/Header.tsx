import * as React from "react";
import { cn } from "@/lib/cn";

type HeaderProps = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  className?: string;
};

export function Header({ title, subtitle, right, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4 flex items-start justify-between gap-3",
        className,
      )}
    >
      <div className="min-w-0">
        <h1 className="font-display uppercase tracking-display text-white text-2xl leading-none">
          {title}
        </h1>
        {subtitle ? <p className="text-sm text-muted mt-1">{subtitle}</p> : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
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
      <span className="text-mint">SHARP</span>
    </span>
  );
}
