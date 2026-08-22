import * as React from "react";
import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: keyof React.JSX.IntrinsicElements;
};

export function Card({ className, as: Tag = "div", ...props }: CardProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component
      className={cn(
        "bg-ink-850 rounded-card shadow-card border border-white/5 p-5",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display uppercase tracking-display text-white text-lg", className)}
      {...props}
    />
  );
}

export function CardSubtitle({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted mt-1", className)} {...props} />;
}
