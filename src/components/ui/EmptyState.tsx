import * as React from "react";
import { cn } from "@/lib/cn";

type EmptyStateProps = {
  title: string;
  body: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ title, body, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-dashed border-white/10 bg-ink-900/50 p-6 text-center",
        className,
      )}
    >
      <h3 className="font-display uppercase tracking-display text-white text-lg">{title}</h3>
      <p className="mt-2 text-sm text-muted">{body}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}
