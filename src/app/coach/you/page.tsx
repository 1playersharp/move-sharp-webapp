import Link from "next/link";
import { CoachShell } from "@/components/layout/CoachShell";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { requireManager } from "@/lib/auth";
import { signOut } from "@/app/(auth)/actions";

export default async function CoachYouPage() {
  const user = await requireManager();
  const m = user.manager;

  return (
    <CoachShell>
      <Header title="You" subtitle={user.email ?? undefined} />
      <div className="space-y-4 shell-gutter pb-6">
        <section className="rounded-card border border-white/5 bg-ink-850 p-5 shadow-card">
          <h2 className="font-display uppercase tracking-display text-white text-base">
            Coach profile
          </h2>
          <p className="mt-2 text-sm text-white/85">
            {m.name}
            {m.club ? <span className="text-muted"> · {m.club}</span> : null}
          </p>
          <p className="mt-1 text-xs text-muted">
            Profile editing lands with the full team feature.
          </p>
        </section>

        <form action={signOut}>
          <Button type="submit" variant="secondary" className="w-full">
            Sign out
          </Button>
        </form>

        {/* Danger zone — mirrors /you/delete. Coach delete cascades
            through teams → memberships → JoinConsent; the /coach/delete
            page shows the impact count before the typed confirm. */}
        <section className="pt-4">
          <div className="rounded-md border border-caution-500/25 bg-caution-500/5 p-4">
            <h2 className="font-display uppercase tracking-display text-caution-300 text-xs">
              Delete coach account
            </h2>
            <p className="mt-2 text-xs text-white/80">
              Removes your coach account and every team you own. Player
              accounts stay untouched — they just lose the team card on
              their You tab.
            </p>
            <Link
              href="/coach/delete"
              className="mt-3 inline-flex h-9 items-center rounded-full border border-caution-500/40 bg-transparent px-4 font-display uppercase tracking-display text-xs text-caution-300 hover:border-caution-500 hover:text-caution-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caution-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              Delete my coach account
            </Link>
          </div>
        </section>
      </div>
    </CoachShell>
  );
}
