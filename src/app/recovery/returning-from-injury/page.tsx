import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { requirePlayer } from "@/lib/auth";
import { INJURY_SESSIONS } from "@/lib/recovery/content";

export default async function ReturningFromInjuryHubPage() {
  await requirePlayer();

  return (
    <AppShell>
      <Header title="Return to training" subtitle="Pick your track." />

      <div className="space-y-4 px-5 pb-6">
        {/* Reminder card — sits ABOVE the session list so the reader
            sees the disclaimer stance before choosing a session. */}
        <div className="rounded-md border border-red-500/25 bg-red-500/5 px-4 py-3 text-xs text-red-100">
          <span className="font-display uppercase tracking-display text-red-300">
            Physio-cleared only.
          </span>{" "}
          Each session shows a clearance check before it opens.
        </div>

        <ul className="space-y-3">
          {INJURY_SESSIONS.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/recovery/returning-from-injury/${s.slug}`}
                className="group block rounded-card border border-white/5 bg-ink-850 p-5 shadow-card hover:border-mint/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display uppercase tracking-display text-red-300 text-[0.65rem]">
                      {s.injury}
                    </p>
                    <p className="mt-1 font-display uppercase tracking-display text-white text-base leading-tight group-hover:text-mint">
                      {s.name}
                    </p>
                    <p className="mt-2 text-xs text-muted-strong">{s.intent}</p>
                  </div>
                  <span className="shrink-0 font-display uppercase tracking-display text-mint-400 text-[0.65rem] tabular-nums">
                    ≈ {s.approxMinutes} min
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
