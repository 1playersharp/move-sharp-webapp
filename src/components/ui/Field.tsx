import * as React from "react";
import { cn } from "@/lib/cn";

export function Field({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("font-display uppercase tracking-display text-xs text-muted", className)}
      {...props}
    />
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-11 rounded-xl bg-ink-800 px-4 text-white placeholder:text-muted",
        "border border-white/5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export function HelpText({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-muted", className)} {...props} />;
}

export function ErrorText({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      role="alert"
      className={cn(
        "rounded-md border border-caution-500/30 bg-caution-500/10 px-3 py-2 text-xs text-caution-300",
        className,
      )}
      {...props}
    />
  );
}
