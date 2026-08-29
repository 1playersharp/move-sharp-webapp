import Link from "next/link";
import Image from "next/image";
import { WordMark } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { MarketingNav } from "./MarketingNav";
import { MarketingFooter } from "./MarketingFooter";
import { DecorativeBoundary } from "@/components/ui/DecorativeBoundary";
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
      {/* The sticky nav is the only client component on this page and the
          only thing here that runs an effect. It's wrapped so a failure
          costs the nav bar and nothing else — the hero below carries its
          own CTAs and sign-in link, so the page stays fully usable. */}
      <DecorativeBoundary label="MarketingNav">
        <MarketingNav />
      </DecorativeBoundary>
      {/* Hero — full-bleed photograph with left-to-right scrim so the
          content column on the left stays legible while the training
          shot reads on the right. Left-aligned throughout. */}
      <section
        aria-labelledby="hero-heading"
        className="relative isolate flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden"
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
              {/* One text node, deliberately. This headline used to be
                  split into a <span class="block"> per sentence to get a
                  staggered reveal. JSX strips the whitespace between
                  sibling elements, so the heading's actual text run was
                  "Faster.Stronger.Harder to move." — no spaces at all.
                  Splitting a sentence across elements is the bug; the
                  sentence now stays intact and wraps on its own, which
                  also gives correct line breaks at every width. */}
              <h1
                id="hero-heading"
                className="ms-fade-up text-balance font-display uppercase tracking-display text-white text-5xl leading-[1.02] sm:text-6xl"
                style={{ animationDelay: "120ms" }}
              >
                Faster. Stronger. Harder to move.
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
        {/* Sentinel — MarketingNav watches this element to know when
            the hero has scrolled out and it's time to reveal the CTA. */}
        <div id="hero-sentinel" aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px" />
      </section>

      <WhatsInsideSection />
      <WhoItsForSection />
      <ForParentsBriefSection />
      <HowItWorksSection />
      <MarketingFooter />
    </>
  );
}

// -----------------------------------------------------------------------
// What's inside — expands the four hero labels into cards with a line
// of what each feature actually does. 3D coach description drawn from
// the codebase (13 named joints, MotionSpec keyframes, 11 pilots).
// -----------------------------------------------------------------------

const INSIDE_CARDS = [
  {
    title: "Programmes",
    body:
      "Six-week blocks built around speed, power, deceleration, core, and duel strength. Every session comes with sets, reps, coaching cues and a home-or-gym track — no gym membership required to start.",
  },
  {
    title: "Personal bests",
    body:
      "Track sprint times, jump distance, agility-test times and rep counts against your own past performance, not anyone else's. A PB is logged only when you actually beat one.",
  },
  {
    title: "Fuel",
    body:
      "What to eat before training, after training and on match day. A recipe library filtered by your allergies and diet, macro totals per serving, and a weekly meal planner you can pin recipes to.",
  },
  {
    title: "3D coach",
    body:
      "A procedural 3D athlete demonstrates the shape of every drill — a 13-joint humanoid driven by keyframed motion, playing back in real time. Eleven pilots ship today across sprints, jumps, cuts and lifts; the same rig runs every drill added next.",
  },
];

function WhatsInsideSection() {
  return (
    <section
      id="whats-inside"
      aria-labelledby="whats-inside-heading"
      className="bg-ink-950 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-display uppercase tracking-display text-mint-400 text-xs">
            What's inside
          </p>
          <h2
            id="whats-inside-heading"
            className="mt-3 font-display uppercase tracking-display text-white text-3xl leading-[1.1] sm:text-4xl"
          >
            Four surfaces, wired to each other.
          </h2>
          <p className="mt-3 text-base text-white/70">
            The whole app is built around the four things a young footballer
            needs to level up their physical output. Each surface feeds the
            next.
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {INSIDE_CARDS.map((c) => (
            <li
              key={c.title}
              className="rounded-card border border-white/10 bg-ink-850 p-6 shadow-card"
            >
              <h3 className="font-display uppercase tracking-display text-mint-400 text-sm">
                {c.title}
              </h3>
              <p className="mt-3 text-sm text-white/85 leading-relaxed">
                {c.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------
// Who it's for — direct statements to the target user, no stock
// inspirational language.
// -----------------------------------------------------------------------

const WHO_STATEMENTS = [
  "The player who is good on the ball but gets outmuscled.",
  "The late developer who is behind physically and knows it.",
  "The player told to “fill out” or “get stronger” with no idea how.",
];

function WhoItsForSection() {
  return (
    <section
      id="who-its-for"
      aria-labelledby="who-heading"
      className="border-y border-white/5 bg-ink-900 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-display uppercase tracking-display text-mint-400 text-xs">
            Who it's for
          </p>
          <h2
            id="who-heading"
            className="mt-3 font-display uppercase tracking-display text-white text-3xl leading-[1.1] sm:text-4xl"
          >
            If any of these sound like you.
          </h2>
        </div>
        <ul className="mt-10 space-y-4 sm:space-y-6">
          {WHO_STATEMENTS.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-4 border-l-2 border-mint/60 pl-4 sm:pl-6"
            >
              <span
                aria-hidden="true"
                className="mt-1 font-display uppercase tracking-display text-mint-400 text-[0.7rem] tabular-nums"
              >
                0{i + 1}
              </span>
              <p className="text-lg text-white sm:text-xl">{s}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------
// For parents — brief version on the landing, plus a link to the full
// /for-parents page. This is the section a safeguarding lead reads
// first, so it lives above the fold on scroll not below.
// -----------------------------------------------------------------------

const PARENT_POINTS = [
  {
    heading: "What we don't collect",
    body:
      "No weight, no body measurements, no progress photos, no calorie or macro tracking on the player. Training numbers only — sprint times, jump distance, sets logged.",
  },
  {
    heading: "Under-16 accounts",
    body:
      "Accounts for under-16s are held by a parent. Parents see training history and control the meal planner.",
  },
  {
    heading: "No social layer",
    body:
      "No public leaderboards, no followers, no comments, no direct messaging. Nothing your child is compared against publicly.",
  },
  {
    heading: "One-click deletion",
    body:
      "Account and all associated data can be deleted in a single click, no email chain required.",
  },
];

function ForParentsBriefSection() {
  return (
    <section
      id="for-parents"
      aria-labelledby="parents-heading"
      className="bg-ink-950 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-display uppercase tracking-display text-mint-400 text-xs">
            For parents
          </p>
          <h2
            id="parents-heading"
            className="mt-3 font-display uppercase tracking-display text-white text-3xl leading-[1.1] sm:text-4xl"
          >
            Built so a safeguarding lead can nod at it.
          </h2>
          <p className="mt-3 text-base text-white/70">
            The privacy stance is a design decision, not a policy page you
            have to hunt for. Here's the shape of it.
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PARENT_POINTS.map((p) => (
            <li
              key={p.heading}
              className="rounded-card border border-mint/25 bg-mint/5 p-5"
            >
              <h3 className="font-display uppercase tracking-display text-mint-400 text-xs">
                {p.heading}
              </h3>
              <p className="mt-2 text-sm text-white/85 leading-relaxed">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <a
            href="/for-parents"
            className="inline-flex items-center gap-2 font-display uppercase tracking-display text-sm text-mint-400 underline-offset-4 hover:text-mint hover:underline focus-visible:text-mint focus-visible:underline"
          >
            Read the full parents' page
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------
// How it works — four concrete steps, numbered clearly.
// -----------------------------------------------------------------------

const STEPS = [
  {
    title: "Choose a programme",
    body:
      "Pick a six-week block from the seeded library, or answer a ten-question quiz and MoveSharp generates one wired to your position, goal and available equipment.",
  },
  {
    title: "Train at home or in the gym",
    body:
      "Every drill has a home track and a gym track. Swap contexts on the fly — the app rewires equipment cues without you re-picking the block.",
  },
  {
    title: "Log what you did",
    body:
      "Tick items complete as you go. When an exercise has a testable metric — sprint time, jump distance, max reps — log the number and the app checks it against your PB.",
  },
  {
    title: "Watch your numbers move",
    body:
      "Progress → Bests shows every metric you've tested against your own history. Not anyone else's leaderboard.",
  },
];

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="border-t border-white/5 bg-ink-900 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-display uppercase tracking-display text-mint-400 text-xs">
            How it works
          </p>
          <h2
            id="how-heading"
            className="mt-3 font-display uppercase tracking-display text-white text-3xl leading-[1.1] sm:text-4xl"
          >
            Four steps. Repeat.
          </h2>
        </div>
        <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint/10 font-display uppercase tracking-display text-mint text-lg tabular-nums"
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-display uppercase tracking-display text-white text-base">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-white/80 leading-relaxed">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* End-of-page CTA — repeats the primary action so someone
            who scrolled past the hero doesn't have to scroll back. */}
        <div className="mt-14 flex flex-col items-start gap-4 rounded-card border border-mint/30 bg-mint/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display uppercase tracking-display text-white text-lg">
              Ready to level up your physical output?
            </p>
            <p className="mt-1 text-sm text-white/80">
              Free to try. Cancel any time, one click.
            </p>
          </div>
          <Link href="/sign-up" className="shrink-0">
            <Button size="lg">Start training</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
