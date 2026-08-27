import * as React from "react";
import Image from "next/image";
import { WordMark } from "@/components/ui/Header";
import heroImage from "@/images/gabin-vallet-J154nEkpzlQ-unsplash.jpg";

type Variant =
  // Default — clean form, no atmosphere. Used by /onboarding.
  | "plain"
  // Returning-user surface. Only a small mint radial glow behind the
  // wordmark so the screen has life without demanding attention.
  | "glow"
  // Aspirational surface. Full-bleed training photograph → dark
  // gradient wash → mint radial glow on top. Matches Landing so the
  // Landing → sign-up flow reads as one narrative.
  | "hero";

export function AuthShell({
  children,
  variant = "plain",
}: {
  children: React.ReactNode;
  variant?: Variant;
}) {
  return (
    <div className="relative isolate mx-auto flex min-h-dvh max-w-sm flex-col overflow-hidden px-6 pt-[max(3rem,env(safe-area-inset-top))] pb-8">
      {variant === "hero" ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 448px"
            className="object-cover object-center opacity-70"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/30 via-ink-950/70 to-ink-950" />
        </div>
      ) : null}
      {variant === "hero" || variant === "glow" ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 h-[380px]
                     bg-[radial-gradient(circle_at_50%_30%,rgba(74,222,168,0.18),transparent_60%)]"
        />
      ) : null}
      <div className="relative mb-8 flex items-center justify-center">
        <WordMark />
      </div>
      <main className="relative flex-1">{children}</main>
    </div>
  );
}
