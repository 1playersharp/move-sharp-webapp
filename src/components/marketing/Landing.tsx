import Link from "next/link";
import Image from "next/image";
import { WordMark } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import heroImage from "@/images/victor-freitas-qZ-U9z4TQ6A-unsplash.jpg";

// Four feature labels double as anchor links to the sections below.
// "Personal bests" is spelled out — PBS in caps reads as a US broadcaster
// and a 13-year-old shouldn't have to decode an abbreviation on a hero.
const FEATURES: Array<{ label: string; href: string }> = [
  { label: "Programmes", href: "#whats-inside" },
  { label: "Personal bests", href: "#whats-inside" },
  { label: "Fuel", href: "#whats-inside" },
  { label: "3D coach", href: "#whats-inside" },
];

export function Landing() {
  return (
    <>
      {/* Hero — full-bleed photograph with left-to-right scrim so the
          content column on the left stays legible while the training
          shot reads on the right. Left-aligned throughout. */}
      <section
        aria-labelledby="hero-heading"
        className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            // object-position favours the left of the frame on portrait
            // mobile viewports so the bar and front leg stay in shot;
            // desktop lets the natural centre composition breathe.
            className="object-cover object-left sm:object-center"
            placeholder="blur"
          />
          {/* Left-to-right scrim — heavy on the copy side, transparent
              across the image. Doesn't uniformly darken the whole
              photograph, which is what killed contrast before. */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/20 sm:via-ink-950/75 sm:to-transparent" />
          {/* Bottom wash keeps the scroll cue and CTA area readable. */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-[max(3rem,env(safe-area-inset-top))] pb-16 sm:px-10 sm:pt-16">
          <div className="ms-fade-up mb-10 sm:mb-16" style={{ animationDelay: "0ms" }}>
            <WordMark className="text-2xl sm:text-3xl" />
          </div>

          {/* Left-aligned content column. On desktop it sits over the
              dark side of the image; on mobile it stacks over the whole
              screen with the image showing behind through the scrim. */}
          <div className="flex flex-1 flex-col justify-center">
            <div className="max-w-xl space-y-6">
              <h1
                id="hero-heading"
                className="font-display uppercase tracking-display text-white text-5xl leading-[1.02] sm:text-6xl"
              >
                <span className="ms-fade-up block" style={{ animationDelay: "120ms" }}>
                  Faster.
                </span>
                <span className="ms-fade-up block" style={{ animationDelay: "240ms" }}>
                  Stronger.
                </span>
                <span className="ms-fade-up block" style={{ animationDelay: "360ms" }}>
                  Harder to move.
                </span>
              </h1>

              <p
                className="ms-fade-up max-w-md text-base text-white/80 sm:text-lg"
                style={{ animationDelay: "500ms" }}
              >
                Athletic training built for the athlete you want to be. Speed,
                power, robustness — at home with a band, or in the gym.
              </p>

              <nav
                aria-label="Sections on this page"
                className="ms-fade-up"
                style={{ animationDelay: "620ms" }}
              >
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {FEATURES.map((f) => (
                    <li key={f.label}>
                      <a
                        href={f.href}
                        className="text-white/70 underline-offset-4 hover:text-mint hover:underline focus-visible:text-mint focus-visible:underline"
                      >
                        {f.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div
                className="ms-fade-up flex flex-col gap-3 pt-2 sm:flex-row"
                style={{ animationDelay: "740ms" }}
              >
                <Link href="/sign-up" className="sm:min-w-[10rem]">
                  <Button size="lg" className="w-full">
                    Start training
                  </Button>
                </Link>
                <Link href="/preview" className="sm:min-w-[10rem]">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full border border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/5"
                  >
                    See a session
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-white/70">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-mint-400 underline underline-offset-4 hover:text-mint"
                >
                  Sign in
                </Link>
              </p>

              {/* Promoted privacy line — the trust signal for the parent
                  who'll be paying. Full-width mint outline card, not
                  bottom-of-page small print. */}
              <div
                className="ms-fade-up flex items-start gap-3 rounded-md border border-mint/30 bg-mint/5 p-4"
                style={{ animationDelay: "860ms" }}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-5 w-5 shrink-0 text-mint"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
                  <path d="M9 12l2.2 2.2L15.5 10" />
                </svg>
                <p className="text-sm text-white">
                  <span className="font-display uppercase tracking-display text-mint-400">
                    Private by default.
                  </span>{" "}
                  Coaches only see what you share.
                </p>
              </div>
            </div>
          </div>

          {/* Scroll cue — tells the reader the page continues. Respects
              prefers-reduced-motion via the ms-fade-up rule in globals. */}
          <div className="ms-fade-up pt-10" style={{ animationDelay: "1000ms" }}>
            <a
              href="#whats-inside"
              className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-display text-white/60 hover:text-mint focus-visible:text-mint"
            >
              Keep scrolling
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 animate-bounce motion-reduce:animate-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="M6 13l6 6 6-6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
