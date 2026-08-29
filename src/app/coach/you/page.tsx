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
      <div className="space-y-4 px-5 pb-6">
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
      </div>
    </CoachShell>
  );
}
