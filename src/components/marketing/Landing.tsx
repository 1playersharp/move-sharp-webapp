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
                        className="text-white/70 underline-offset-4 hover:text-brand hover:underline focus-visible:text-brand focus-visible:underline"
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
                  className="text-brand-400 underline underline-offset-4 hover:text-brand"
                >
                  Sign in
                </Link>
              </p>

              {/* Promoted privacy line — the trust signal for the parent
                  who'll be paying. Full-width brand outline card, not
                  bottom-of-page small print. */}
              <div
                className="ms-fade-up flex items-start gap-3 rounded-md border border-brand/30 bg-brand/5 p-4"
                style={{ animationDelay: "860ms" }}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand"
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
                  <span className="font-display uppercase tracking-display text-brand-400">
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
              className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-display text-white/60 hover:text-brand focus-visible:text-brand"
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
      <WhatYoullWorkOnSection />
      <ForCoachesSection />
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
      "What to eat before training, after training and on match day. Recipes filtered by your allergies and dietary preference, tagged by purpose — recovery, iron-rich, match fuel — with timing guidance and a weekly planner. Household measures, no numbers to count.",
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
          <p className="font-display uppercase tracking-display text-brand-400 text-xs">
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
              <h3 className="font-display uppercase tracking-display text-brand-400 text-sm">
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
// What you'll work on — the three things the app actually trains, in
// the player's language. No stock inspirational copy.
// -----------------------------------------------------------------------

// Reframed from "Who it's for" (which described the player's deficits
// back at them) to what they'll actually do about it. Same three
// situations, now stated as work rather than as a diagnosis — better for
// a 13-18 audience, and it says what the product does.
const WORK_ON = [
  {
    title: "Be stronger on the ball",
    body:
      "Bracing, arm-fend, body position in duels. Technique you can learn at any size.",
  },
  {
    title: "Build physicality, late developer or not",
    body:
      "You can't rush growing. You can get quicker off the mark and harder to shift while you wait.",
  },
  {
    title: "Learn how to actually get stronger",
    body:
      "Not “go to the gym” and hope. A six-week block with the sets, reps and cues written down — at home with a band, or in a gym.",
  },
];

function WhatYoullWorkOnSection() {
  return (
    <section
      id="what-youll-work-on"
      aria-labelledby="work-on-heading"
      className="border-y border-white/5 bg-ink-900 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-display uppercase tracking-display text-brand-400 text-xs">
            What you'll work on
          </p>
          <h2
            id="work-on-heading"
            className="mt-3 font-display uppercase tracking-display text-white text-3xl leading-[1.1] sm:text-4xl"
          >
            Three things you can change.
          </h2>
        </div>
        <ul className="mt-10 space-y-6 sm:space-y-8">
          {WORK_ON.map((w, i) => (
            <li
              key={w.title}
              className="border-l-2 border-brand/60 pl-4 sm:pl-6"
            >
              <p className="font-display uppercase tracking-display text-white text-lg sm:text-xl">
                <span className="text-muted-strong tabular-nums">
                  0{i + 1}
                </span>
                <span aria-hidden="true" className="text-brand-400"> — </span>
                {w.title}
              </p>
              <p className="mt-1.5 max-w-2xl text-base text-white/80">
                {w.body}
              </p>
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

// -----------------------------------------------------------------------
// For coaches — the second audience. Every claim below maps to something
// that actually ships today (team creation + 6-char invite codes, the
// roster, the per-player view, per-field consent defaulting to nothing
// shared, and the under-16 parent acknowledgement on join). Nothing
// aspirational, no club names, no usage numbers.
// -----------------------------------------------------------------------

const COACH_POINTS = [
  {
    heading: "A squad in minutes",
    body:
      "Create a team and share a six-character code. Players join from their own accounts — you never key in their data, and you're never holding their password.",
  },
  {
    heading: "See what they actually did",
    body:
      "Sessions logged, readiness check-ins and personal bests, per player, for anyone who's turned that field on. Their own history — not a ranking against teammates.",
  },
  {
    heading: "Consent is theirs, field by field",
    body:
      "Each player decides separately whether you see sessions, readiness or personal bests. It starts at nothing shared, and they can switch any of it back off without asking you.",
  },
  {
    heading: "Safeguarding isn't an afterthought",
    body:
      "Under-16s need a parent's acknowledgement before they can join a team. No public leaderboards, no player-to-player comparison, no messaging.",
  },
];

function ForCoachesSection() {
  return (
    <section
      id="for-coaches"
      aria-labelledby="coaches-heading"
      className="bg-ink-950 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-display uppercase tracking-display text-brand-400 text-xs">
            For coaches
          </p>
          <h2
            id="coaches-heading"
            className="mt-3 font-display uppercase tracking-display text-white text-3xl leading-[1.1] sm:text-4xl"
          >
            You see what they choose to show you.
          </h2>
          <p className="mt-3 text-base text-white/70">
            MoveSharp gives you a real picture of what your squad does between
            sessions — built so the players stay in control of it. That
            constraint is the point, not a limitation.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {COACH_POINTS.map((c) => (
            <li
              key={c.heading}
              className="rounded-card border border-white/10 bg-ink-850 p-6 shadow-card"
            >
              <h3 className="font-display uppercase tracking-display text-brand-400 text-sm">
                {c.heading}
              </h3>
              <p className="mt-3 text-sm text-white/85 leading-relaxed">
                {c.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-start gap-4 rounded-card border border-brand/30 bg-brand/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display uppercase tracking-display text-white text-lg">
              Coaching a squad?
            </p>
            <p className="mt-1 text-sm text-white/80">
              Coach accounts are separate from player accounts — you don't
              train through the app.
            </p>
          </div>
          <Link href="/sign-up/manager" className="shrink-0">
            <Button size="lg">Create a coach account</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

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
      // border-t separates this from the coaches section above, which
      // shares the same ink-950 background.
      className="border-t border-white/5 bg-ink-950 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-display uppercase tracking-display text-brand-400 text-xs">
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
              className="rounded-card border border-brand/25 bg-brand/5 p-5"
            >
              <h3 className="font-display uppercase tracking-display text-brand-400 text-xs">
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
            className="inline-flex items-center gap-2 font-display uppercase tracking-display text-sm text-brand-400 underline-offset-4 hover:text-brand hover:underline focus-visible:text-brand focus-visible:underline"
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
          <p className="font-display uppercase tracking-display text-brand-400 text-xs">
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
                className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 font-display uppercase tracking-display text-brand text-lg tabular-nums"
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
        <div className="mt-14 flex flex-col items-start gap-4 rounded-card border border-brand/30 bg-brand/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display uppercase tracking-display text-white text-lg">
              Ready to level up your physical output?
            </p>
            <p className="mt-1 text-sm text-white/80">
              Free while we're in early access.
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
