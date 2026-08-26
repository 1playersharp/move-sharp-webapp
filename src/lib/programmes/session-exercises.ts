import type { TrainingContext } from "@prisma/client";

// Seeded programmes describe sessions in prose. To render an exercise
// list per session without hand-editing 260+ rows, we infer bank slugs
// from the session's name + focus text using aliases, then filter by
// the player's training context (gym/home twins picked accordingly).
// Custom programmes bypass this: the quiz generator emits exerciseSlugs
// directly, and the detail page prefers those when present.

type Alias = { slug: string; patterns: RegExp[] };

const ALIASES: Alias[] = [
  { slug: "wall-drives", patterns: [/wall drives?/i, /wall marches?/i] },
  { slug: "falling-starts", patterns: [/falling starts?/i, /reactive starts?/i, /partner starts?/i, /band starts?/i, /rolled ball starts?/i, /chase the ball/i] },
  { slug: "a-skip", patterns: [/\ba-skips?\b/i, /a-marches?/i, /skip for distance/i, /skips?/i] },
  { slug: "flying-20m", patterns: [/flying\s?20m/i, /flying\s?30m/i, /flying\s?40m/i, /ins-and-outs/i, /wickets?/i, /3x30m fresh/i, /partner flying/i, /long wickets/i, /sharpener/i] },
  { slug: "tempo-run", patterns: [/tempo runs?/i, /rhythm runs?/i, /\d+x\s?100m/i, /rsa/i, /repeat sprint/i] },
  { slug: "broad-jump-stick", patterns: [/broad jumps?/i, /standing triple jump/i, /broad \+ /i, /broad-to/i, /alt bounds/i, /alt-leg bounds/i, /bounds? \+/i, /alt\s?bounds/i, /bound to sprint/i, /sl bounds/i, /hurdle-to-broad/i] },
  { slug: "pogo-hops", patterns: [/\bpogos?\b/i, /pogo hops?/i, /hurdle hops?/i, /sl hops for height/i] },
  { slug: "snap-down-landing", patterns: [/snap-?downs?/i] },
  { slug: "box-jump-gym", patterns: [/box jumps?/i, /box step-off/i, /step off (a )?low box/i, /step-off/i, /depth jumps?/i] },
  { slug: "step-jump-home", patterns: [/step jumps?/i, /stair drop/i, /bottom stair/i, /low step/i] },
  { slug: "depth-drop-gym", patterns: [/depth drops?/i, /depth-drops?/i, /depth-to-sprint/i] },
  { slug: "depth-drop-home", patterns: [/depth drops?/i, /depth-drops?/i, /depth-to-sprint/i, /stair drop/i] },
  { slug: "shuttle-5-10-5", patterns: [/5-10-5/, /5-5 shuttles?/i, /shuttle rehearsal/i, /shuttle circuits?/i, /shuttle rsa/i] },
  { slug: "l-drill", patterns: [/l-drill/i] },
  { slug: "angle-cuts", patterns: [/angle cuts?/i, /reactive cuts?/i, /cut \+ ball/i, /chop \+ cut/i, /accel[- ]cut/i, /mirror drill/i, /decel/i, /deceleration/i, /t-drill/i] },
  { slug: "farmer-carry-gym", patterns: [/farmer/i, /suitcase/i, /carry day/i, /loaded carry/i, /mixed carries/i, /carry \+ push/i, /push \+ carry/i, /carry/i] },
  { slug: "farmer-carry-home", patterns: [/farmer/i, /suitcase/i, /carry day/i, /loaded carry/i, /mixed carries/i, /carry \+ push/i, /push \+ carry/i, /loaded bag in each hand/i] },
  { slug: "deadbug", patterns: [/dead\s?bugs?/i, /bird dogs?/i, /core deep/i] },
  { slug: "pallof-press-gym", patterns: [/pallof press/i, /anti-rotation/i, /core anti-rotation/i, /contact-ready core/i] },
  { slug: "pallof-press-home", patterns: [/pallof press/i, /band pallof/i] },
  { slug: "side-plank", patterns: [/side plank/i] },
  { slug: "goblet-squat-gym", patterns: [/goblet squats?/i, /squat \+ push/i, /squat 3-1-1/i, /jump squat/i, /heavy squat/i, /goblet with a db/i] },
  { slug: "goblet-squat-home", patterns: [/goblet squats?/i, /squat \+ push/i, /loaded bag squat/i, /bag squat/i, /bag goblet squat/i] },
  { slug: "push-up", patterns: [/push-?ups?/i, /rep max push-?up/i, /fast-up push/i, /push \+ carry/i, /pull \+ push/i, /push day/i] },
  { slug: "db-row", patterns: [/db rows?/i, /dumbbell rows?/i, /explosive rows?/i, /rows?/i, /pull day/i, /pull \+ push/i, /rep max row/i, /pull-apart/i, /hinge \+ pull/i] },
  { slug: "band-row", patterns: [/band rows?/i, /band pull-apart/i, /rows?/i] },
  { slug: "db-rdl", patterns: [/\brdl\b/i, /db rdl/i, /dumbbell rdl/i, /sl rdl/i, /single-leg hinge/i] },
  { slug: "band-hinge", patterns: [/band hinge/i, /band deadlift/i, /hip hinge/i, /band-resisted hip drives?/i, /kettlebell swing/i, /kb swing/i] },
  { slug: "db-press", patterns: [/db press/i, /dumbbell press/i, /overhead press/i, /db snatch/i, /strength day a/i, /strength touch/i] },
  { slug: "band-press", patterns: [/band press/i, /press with pop/i, /band press against/i] },
  { slug: "split-squat-gym", patterns: [/split squats?/i, /split-stance/i] },
  { slug: "split-squat-home", patterns: [/split squats?/i, /split-stance/i] },
  { slug: "mobility-flow", patterns: [/mobility/i, /hip flow/i, /full flow/i, /t-spine/i, /ankle \+ calf/i, /foot \+ ankle/i, /hip \+ posture/i, /rope work/i, /rope \+ /i, /recovery/i, /rehearsal reps/i, /rest day/i, /core \+ mobility/i, /contact-ready core/i, /cut-ready hips/i, /sprint-ready ankles/i, /open books/i, /90\/90/i, /calf raises?/i, /woodchop/i, /rotational throws?/i, /med ball throw/i, /med ball/i] },
];

// Exercises with gym/home twins — pick the variant matching context. Any
// slug listed here is treated as context-scoped; every other slug is
// context-neutral.
const GYM_TWINS = new Set([
  "box-jump-gym",
  "depth-drop-gym",
  "farmer-carry-gym",
  "pallof-press-gym",
  "goblet-squat-gym",
  "split-squat-gym",
  "db-row",
  "db-rdl",
  "db-press",
]);
const HOME_TWINS = new Set([
  "step-jump-home",
  "depth-drop-home",
  "farmer-carry-home",
  "pallof-press-home",
  "goblet-squat-home",
  "split-squat-home",
  "band-row",
  "band-hinge",
  "band-press",
]);

export function inferSessionExerciseSlugs(
  session: { name: string; focus?: string },
  context: TrainingContext,
): string[] {
  const text = `${session.name} ${session.focus ?? ""}`;
  const matched = new Set<string>();
  for (const { slug, patterns } of ALIASES) {
    if (patterns.some((rx) => rx.test(text))) matched.add(slug);
  }
  // Apply context filter: drop the wrong-context twin.
  const wrongSet = context === "gym" ? HOME_TWINS : GYM_TWINS;
  for (const slug of Array.from(matched)) {
    if (wrongSet.has(slug)) matched.delete(slug);
  }
  return Array.from(matched);
}
