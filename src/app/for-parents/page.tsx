import Link from "next/link";
import { WordMark } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "For parents · MoveSharp",
  description:
    "MoveSharp's privacy stance, safeguarding posture, and account controls, explained in full.",
};

// Structured so a safeguarding lead can skim headings and get every
// answer they need without hunting through a policy PDF. Every claim
// here matches how the app actually works today.
const SECTIONS = [
  {
    heading: "What we track",
    body: (
      <>
        <p>
          MoveSharp is a training tracker. It stores training numbers only —
          sprint times, jump distances, agility-test times, and rep counts
          your child chooses to log. It also stores readiness check-ins
          (energy, sleep, muscle soreness on a 1–5 scale) so we can size a
          session appropriately.
        </p>
      </>
    ),
  },
  {
    heading: "What we don't track",
    body: (
      <>
        <p>These are decisions, not oversights:</p>
        <ul className="mt-3 list-disc space-y-1 pl-6">
          <li>No body weight</li>
          <li>No body measurements — waist, chest, biceps</li>
          <li>No progress photos</li>
          <li>No calorie counting on the player</li>
          <li>No macro tracking on the player</li>
          <li>No BMI, no body-fat percentage</li>
        </ul>
        <p className="mt-3">
          Youth athletes go through weight and shape changes that have
          nothing to do with training quality. Making them log a number
          against those changes creates problems, not performance.
        </p>
      </>
    ),
  },
  {
    heading: "Under-16 accounts",
    body: (
      <>
        <p>
          Accounts for players under 16 are held by the parent. The parent
          creates the account, holds the password, and receives any account
          emails. The player uses the app on shared or supervised devices.
        </p>
        <p className="mt-3">
          Parents can see training history and control the meal planner.
          The parent view mirrors what the child sees, plus the ability to
          edit stored allergies and dietary settings.
        </p>
      </>
    ),
  },
  {
    heading: "No social layer",
    body: (
      <>
        <p>
          There is no public leaderboard. There are no followers, no
          comments, no direct messaging, no likes. A player's numbers are
          compared against their own past performance only.
        </p>
        <p className="mt-3">
          If your club uses MoveSharp for a team, a coach can see per-player
          data only where the player has explicitly consented, on a
          per-field basis (sessions, readiness, or PBs). Team features are
          not enabled in the initial release.
        </p>
      </>
    ),
  },
  {
    heading: "Fuel and recipes",
    body: (
      <>
        <p>
          The fuel tab has recipe suggestions filtered by 14 UK/EU declared
          allergens and by diet preference (omnivore, pescatarian,
          vegetarian, vegan). The filter is a convenience shortcut, not a
          replacement for reading ingredients. Please check the label on
          every ingredient before your child eats it — this is important.
        </p>
        <p className="mt-3">
          The recipes are meal ideas, not clinical nutrition. If your child
          has a medical condition affecting diet, treat the app as a
          starting point and defer to whoever prescribed the diet.
        </p>
      </>
    ),
  },
  {
    heading: "Deletion",
    body: (
      <>
        <p>
          You (or your child) can delete the account and all data
          associated with it in a single click from the You tab. No email
          chain, no forms, no waiting period. Once deleted, we have no
          copy.
        </p>
      </>
    ),
  },
  {
    heading: "Data storage",
    body: (
      <>
        <p>
          Data is stored on Supabase infrastructure hosted in Europe
          (eu-west-1). All connections use TLS. Your child's data is not
          sold, and it is not shared with third parties for advertising.
        </p>
      </>
    ),
  },
  {
    heading: "Contact",
    body: (
      <>
        <p>
          Questions? Concerns? Reach out at{" "}
          <a
            href="mailto:hello@movesharp.app"
            className="text-mint-400 underline underline-offset-4 hover:text-mint focus-visible:text-mint"
          >
            hello@movesharp.app
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function ForParentsPage() {
  return (
    <div className="min-h-dvh bg-ink-950">
      <header className="border-b border-white/5 bg-ink-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center">
            <WordMark className="text-xl" />
          </Link>
          <Link
            href="/sign-in"
            className="text-sm text-mint-400 underline-offset-4 hover:text-mint hover:underline focus-visible:text-mint focus-visible:underline"
          >
            Sign in
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
        <div className="mb-10">
          <Link
            href="/#for-parents"
            className="text-xs font-display uppercase tracking-display text-mint-400 hover:text-mint focus-visible:text-mint"
          >
            ← Back
          </Link>
          <p className="mt-4 font-display uppercase tracking-display text-mint-400 text-xs">
            For parents
          </p>
          <h1 className="mt-2 font-display uppercase tracking-display text-white text-4xl leading-[1.05] sm:text-5xl">
            The full version.
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/80">
            MoveSharp is used by minors. The privacy posture is a design
            constraint, not a legal footnote. This page explains what that
            means in practice.
          </p>
        </div>

        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.heading} aria-labelledby={`section-${s.heading}`}>
              <h2
                id={`section-${s.heading}`}
                className="font-display uppercase tracking-display text-white text-xl"
              >
                {s.heading}
              </h2>
              <div className="mt-3 space-y-3 text-base text-white/85 leading-relaxed">
                {s.body}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 sm:flex-row">
          <Link href="/sign-up" className="sm:min-w-[10rem]">
            <Button size="lg" className="w-full">
              Create your child's account
            </Button>
          </Link>
          <Link href="/" className="sm:min-w-[10rem]">
            <Button
              size="lg"
              variant="secondary"
              className="w-full border border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/5"
            >
              Back to home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
