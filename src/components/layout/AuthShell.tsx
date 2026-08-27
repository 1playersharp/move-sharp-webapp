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
    // Outer wrapper spans the full viewport so background image and
    // gradient stretch edge-to-edge on desktop. Inner column stays
    // max-w-sm so the form remains phone-width and readable.
    <div className="relative isolate flex min-h-dvh flex-col overflow-hidden">
      {variant === "hero" ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-45"
            placeholder="blur"
          />
          {/* Vertical wash keeps top open for the photograph, darkens
              through the middle where the form lives so text stays
              legible against any part of the image. */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/50 via-ink-950/85 to-ink-950" />
          {/* Extra centred vignette anchored under the form column on
              desktop — narrow, so photograph shows on the sides. */}
          <div className="absolute inset-y-0 left-1/2 hidden w-[28rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-ink-950/40 to-transparent sm:block" />
        </div>
      ) : null}
      {variant === "hero" || variant === "glow" ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 h-[380px]
                     bg-[radial-gradient(circle_at_50%_30%,rgba(74,222,168,0.16),transparent_60%)]"
        />
      ) : null}
      <div className="relative mx-auto flex w-full max-w-sm flex-1 flex-col px-6 pt-[max(3rem,env(safe-area-inset-top))] pb-8">
        <div className="mb-8 flex items-center justify-center">
          <WordMark />
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
