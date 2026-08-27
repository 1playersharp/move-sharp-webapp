import Link from "next/link";
import { WordMark } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { PREVIEW_SESSION } from "@/lib/preview/session";

export const metadata = {
  title: "See a session · MoveSharp",
  description:
    "Preview one real MoveSharp training session — exercises, sets, cues — before you make an account.",
};

export default function PreviewPage() {
  const session = PREVIEW_SESSION;
  const totalItems = session.blocks.reduce((n, b) => n + b.items.length, 0);

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
        <div className="mb-8">
          <Link
            href="/"
            className="text-xs font-display uppercase tracking-display text-mint-400 hover:text-mint focus-visible:text-mint"
          >
            ← Back
          </Link>
          <p className="mt-4 font-display uppercase tracking-display text-mint-400 text-xs">
            No account needed · preview
          </p>
          <h1 className="mt-2 font-display uppercase tracking-display text-white text-4xl leading-[1.05]">
            {session.name}
          </h1>
          <p className="mt-3 max-w-xl text-base text-white/80">
            {session.intent}
          </p>
          <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <dt className="font-display uppercase tracking-display text-mint-400 text-[0.65rem]">
                Quality
              </dt>
              <dd>{session.quality}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="font-display uppercase tracking-display text-mint-400 text-[0.65rem]">
                Context
              </dt>
              <dd>{session.context}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="font-display uppercase tracking-display text-mint-400 text-[0.65rem]">
                Duration
              </dt>
              <dd>≈ {session.approxMinutes} min</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="font-display uppercase tracking-display text-mint-400 text-[0.65rem]">
                Items
              </dt>
              <dd>{totalItems}</dd>
            </div>
          </dl>
        </div>

        <div className="space-y-8">
          {session.blocks.map((block, blockIdx) => (
            <section
              key={block.heading}
              aria-labelledby={`block-${blockIdx}`}
              className="rounded-card border border-white/5 bg-ink-850 shadow-card"
            >
              <div className="flex items-baseline justify-between gap-2 border-b border-white/5 px-5 py-4">
                <h2
                  id={`block-${blockIdx}`}
                  className="font-display uppercase tracking-display text-white text-lg"
                >
                  {block.heading}
                </h2>
                <span className="font-display uppercase tracking-display text-[0.65rem] text-mint-400">
                  {block.items.length} {block.items.length === 1 ? "item" : "items"}
                </span>
              </div>
              <p className="border-b border-white/5 px-5 py-3 text-sm text-muted-strong">
                {block.intent}
              </p>
              <ol className="divide-y divide-white/5">
                {block.items.map((item, itemIdx) => (
                  <li key={item.name} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-display uppercase tracking-display text-[0.65rem] text-muted">
                            {String(itemIdx + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-display uppercase tracking-display text-white text-base leading-tight">
                            {item.name}
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-muted-strong">{item.cue}</p>
                      </div>
                      <span className="shrink-0 font-display uppercase tracking-display text-mint-400 text-[0.7rem] tabular-nums">
                        {item.prescription}
                      </span>
                    </div>
                    {item.pilotAvailable ? (
                      <div className="mt-3 flex items-center gap-2 rounded-md border border-mint/20 bg-mint/5 px-3 py-2">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-4 w-4 shrink-0 text-mint"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 6h13l3 3v9H4z" />
                          <circle cx="9" cy="14" r="2" />
                          <path d="M13 8h4" />
                        </svg>
                        <p className="text-[0.7rem] text-white/80">
                          <span className="font-display uppercase tracking-display text-mint-400">
                            3D coach demo available
                          </span>{" "}
                          in the app — full rotation, real-time playback.
                        </p>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-card border border-mint/30 bg-mint/5 p-6 text-center">
          <p className="font-display uppercase tracking-display text-white text-lg">
            Like the shape of this?
          </p>
          <p className="mt-2 text-sm text-white/80">
            Six-week programmes, personal bests, fuel planning, and a 3D
            coach — all wired to what you actually train.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/sign-up" className="sm:min-w-[10rem]">
              <Button size="lg" className="w-full">
                Start training
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
        </div>
      </main>
    </div>
  );
}
