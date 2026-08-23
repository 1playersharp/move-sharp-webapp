import Link from "next/link";
import { PILOTS } from "@/lib/exercise/pilots";
import { ExerciseCanvas } from "@/components/exercise/ExerciseCanvas";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/ui/Header";

export const metadata = { title: "Exercise sandbox · MoveSharp" };

// Public preview — the sandbox is a dev/sign-off screen, not a real app
// tab. Kept out of the nav; no auth required so an owner can view the
// pilots without going through sign-up first.
export default async function ExerciseSandboxPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-16">
      <Header
        title="Exercise pilots"
        subtitle="Sign-off checkpoint — 4 pilots before scaling the library."
        right={
          <Link href="/" className="text-xs text-mint-400 hover:text-mint uppercase tracking-display font-display">
            Home
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PILOTS.map((spec) => (
          <Card key={spec.slug} className="p-3">
            <div className="mb-2 flex items-baseline justify-between gap-2">
              <h2 className="font-display uppercase tracking-display text-white text-base">
                {spec.name}
              </h2>
              <span className="font-mono text-[0.65rem] text-muted">{spec.slug}</span>
            </div>
            <ExerciseCanvas
              spec={spec}
              className="aspect-square w-full overflow-hidden rounded-md bg-ink-900"
            />
            <p className="mt-2 text-xs text-muted">
              {spec.loop ? "Looped" : "One-shot"} · {spec.repDurationSec}s / rep
              {spec.restBetweenRepsSec ? ` · +${spec.restBetweenRepsSec}s hold` : ""}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
