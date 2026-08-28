import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { requirePlayer } from "@/lib/auth";
import { ageInYears } from "@/lib/age-band";
import { injurySessionBySlug } from "@/lib/recovery/content";
import { hasRecentRecoveryConsent } from "@/lib/recovery/consent";
import { RecoveryDisclaimer } from "@/components/recovery/RecoveryDisclaimer";
import { ReturningBanner } from "@/components/recovery/ReturningBanner";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ReturningFromInjurySessionPage({ params }: Props) {
  const user = await requirePlayer();
  const { slug } = await params;

  const session = injurySessionBySlug(slug);
  if (!session) notFound();

  // Gate: no valid consent in the last 30 minutes → render the
  // interstitial in place of the session. Same URL either way so a
  // shared link never smuggles someone past the check.
  const consented = await hasRecentRecoveryConsent(user.player.id);

  if (!consented) {
    const isUnder16 = ageInYears(user.player.dateOfBirth) < 16;
    return (
      <AppShell>
        <RecoveryDisclaimer
          slug={slug}
          sessionName={session.name}
          isUnder16={isUnder16}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <ReturningBanner />

      <div className="mx-auto max-w-2xl px-5 pb-10 pt-6">
        <Link
          href="/recovery/returning-from-injury"
          className="text-xs font-display uppercase tracking-display text-mint-400 hover:text-mint focus-visible:text-mint"
        >
          ← All tracks
        </Link>
        <p className="mt-3 font-display uppercase tracking-display text-red-300 text-xs">
          {session.injury}
        </p>
        <h1 className="mt-1 font-display uppercase tracking-display text-white text-3xl leading-[1.05] sm:text-4xl">
          {session.name}
        </h1>
        <p className="mt-3 max-w-xl text-sm text-white/85">{session.intent}</p>
        <p className="mt-3 text-xs text-muted">≈ {session.approxMinutes} min</p>

        <div className="mt-8 space-y-6">
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
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-md border border-red-500/25 bg-red-500/5 p-4 text-xs text-red-100">
          <span className="font-display uppercase tracking-display text-red-300">
            Something not right?
          </span>{" "}
          Stop the session and contact the professional who cleared you.
          Report a concern:{" "}
          <a
            href="mailto:hello@movesharp.app"
            className="text-mint-400 underline underline-offset-4 hover:text-mint"
          >
            hello@movesharp.app
          </a>
          .
        </div>
      </div>
    </AppShell>
  );
}
