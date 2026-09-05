import Link from "next/link";
import { MOTION_SPEC_BY_SLUG } from "@/lib/exercise/pilots";
import { ExerciseCanvas } from "@/components/exercise/ExerciseCanvas";
import { CoachCanvas } from "@/components/exercise/CoachCanvas";
import { COACH_CLIPS, COACH_CLIP_LABELS, COACH_CLIP_BY_SLUG } from "@/lib/exercise/coach-clips";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/ui/Header";

export const metadata = { title: "Exercise sandbox · MoveSharp" };

// Public preview — the sandbox is a dev/sign-off screen, not a real app
// tab. Kept out of the nav; no auth required so an owner can view the
// pilots without going through sign-up first.
export default async function ExerciseSandboxPage() {
  // Which library slugs each captured clip is wired to, for the sign-off read.
  const slugsByClip = new Map<string, string[]>();
  for (const [slug, clip] of Object.entries(COACH_CLIP_BY_SLUG)) {
    if (!clip) continue;
    slugsByClip.set(clip, [...(slugsByClip.get(clip) ?? []), slug]);
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-16">
      <Header
        title="Exercise pilots"
        subtitle="Sign-off checkpoint — every exercise on the 3D Coach avatar."
        right={
          <Link href="/" className="text-xs text-brand-400 hover:text-brand uppercase tracking-display font-display">
            Home
          </Link>
        }
      />

      <section className="mb-10">
        <h2 className="section-title mb-1">3D Coach — captured clips</h2>
        <p className="mb-4 text-xs text-muted">
          All {COACH_CLIPS.length} clips ship on one rig in a single model. A clip
          only appears in the app once it&apos;s mapped to a library exercise that
          shows the same movement.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {COACH_CLIPS.map((clip) => {
            const mapped = slugsByClip.get(clip) ?? [];
            return (
              <Card key={clip} className="p-3">
                <div className="mb-2 flex items-baseline justify-between gap-2">
                  <h3 className="font-display uppercase tracking-display text-white text-base">
                    {COACH_CLIP_LABELS[clip]}
                  </h3>
                  <span className="font-mono text-[0.65rem] text-muted">{clip}</span>
                </div>
                <CoachCanvas clipName={clip} label={COACH_CLIP_LABELS[clip]} className="rounded-md" />
                <p className="mt-2 text-xs text-muted">
                  {mapped.length
                    ? `Live on: ${mapped.join(", ")}`
                    : "Not mapped to a library exercise yet"}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="section-title mb-1">Authored movements</h2>
        <p className="mb-4 text-xs text-muted">
          Exercises with no captured clip. The movement is authored in code as
          joint rotations, then retargeted onto the same avatar — so every
          exercise in the app shows the same character. Cone-and-path field
          drills are written but parked; they are not listed here.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from(new Set(Object.values(MOTION_SPEC_BY_SLUG))).map((spec) => (
            <Card key={spec.slug} className="p-3">
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <h3 className="font-display uppercase tracking-display text-white text-base">
                  {spec.name}
                </h3>
                <span className="font-mono text-[0.65rem] text-muted">{spec.slug}</span>
              </div>
              <ExerciseCanvas spec={spec} className="rounded-md" />
              <p className="mt-2 text-xs text-muted">
                {spec.loop ? "Looped" : "One-shot"} · {spec.repDurationSec}s / rep
                {spec.restBetweenRepsSec ? ` · +${spec.restBetweenRepsSec}s hold` : ""}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
