import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { requirePlayer } from "@/lib/auth";
import { GENERAL_RECOVERY, INJURY_SESSIONS } from "@/lib/recovery/content";

export default async function RecoveryPage() {
  await requirePlayer();

  return (
    <AppShell>
      <Header
        title="Recovery"
        subtitle="Stay durable. Return safely."
      />

      <div className="space-y-8 px-5 pb-6">
        {/* Returning-from-injury entry point — mint-tinted card so it
            reads as a distinct section from the general work above.
            Doesn't require any acknowledgment yet; the interstitial
            fires per-session, not per-visit-to-the-hub. */}
        <section className="space-y-3">
          <h2 className="section-title">Returning from injury</h2>
          <Link
            href="/recovery/returning-from-injury"
            className="block rounded-card border border-red-500/25 bg-red-500/5 p-5 shadow-card hover:border-red-500/60"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display uppercase tracking-display text-red-300 text-xs">
                  Physio-cleared only
                </p>
                <p className="mt-2 font-display uppercase tracking-display text-white text-lg leading-tight">
                  Return-to-training sessions
                </p>
                <p className="mt-1 text-xs text-muted-strong">
                  {INJURY_SESSIONS.length} starter sessions across the most
                  common football injuries. Each one gated behind a
                  professional-clearance check.
                </p>
              </div>
              <span aria-hidden="true" className="text-white/60">
                ›
              </span>
            </div>
          </Link>
        </section>

        {/* General recovery — no gate. Mobility, foam rolling, sleep,
            hydration. Reads directly. */}
        <section className="space-y-4">
          <div>
            <h2 className="section-title">General recovery</h2>
            <p className="mt-1 text-xs text-muted">
              No clearance needed — for everyone, every day.
            </p>
          </div>
          {GENERAL_RECOVERY.map((block) => (
            <article
              key={block.heading}
              className="rounded-card border border-white/5 bg-ink-850 shadow-card"
            >
              <div className="border-b border-white/5 px-5 py-4">
                <h3 className="font-display uppercase tracking-display text-white text-base">
                  {block.heading}
                </h3>
                <p className="mt-1 text-xs text-muted-strong">{block.intent}</p>
              </div>
              <ul className="divide-y divide-white/5">
                {block.items.map((item) => (
                  <li key={item.name} className="px-5 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-display uppercase tracking-display text-white text-sm">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-strong">
                          {item.cue}
                        </p>
                      </div>
                      <span className="shrink-0 font-display uppercase tracking-display text-mint-400 text-[0.65rem] tabular-nums">
                        {item.prescription}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
