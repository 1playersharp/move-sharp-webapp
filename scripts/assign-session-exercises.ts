// First-pass assignment of exercise slugs to every programme session.
//
// Programme curricula describe sessions in prose. Today src/lib/programmes/
// session-exercises.ts guesses the exercise list at render time with regexes,
// which leaves 28 of the 61 library exercises unreachable. This script does a
// one-off pass so the slugs can be written into the seed explicitly, and —
// crucially — reports what it is NOT sure about instead of silently guessing.
//
// Run: npx tsx scripts/assign-session-exercises.ts [--json out.json]

import fs from "node:fs";
import { ALL_PROGRAMMES } from "../prisma/programmes";
import { EXERCISES } from "../prisma/exercises";

type Match = { slug: string; score: number; why: string };

const BY_SLUG = new Map(EXERCISES.map((e) => [e.slug, e]));

// Gym/home twins: matching either should offer both, and the renderer picks
// by the player's context.
const TWINS: string[][] = [
  ["box-jump-gym", "step-jump-home"],
  ["depth-drop-gym", "depth-drop-home"],
  ["farmer-carry-gym", "farmer-carry-home"],
  ["pallof-press-gym", "pallof-press-home"],
  ["goblet-squat-gym", "goblet-squat-home"],
  ["split-squat-gym", "split-squat-home"],
  ["db-row", "band-row"],
  ["db-rdl", "band-hinge"],
  ["db-press", "band-press"],
  ["woodchop-gym", "woodchop-home"],
  ["barbell-back-squat", "bodyweight-squat"],
  ["weighted-sit-up", "sit-up"],
];
const twinOf = new Map<string, string[]>();
for (const group of TWINS) for (const slug of group) twinOf.set(slug, group);

// Phrases that name an exercise directly. Weighted higher than a loose word
// match because they're unambiguous.
const STRONG: Array<[string, RegExp[]]> = [
  ["wall-drives", [/wall drives?/i, /wall marches?/i]],
  ["falling-starts", [/falling starts?/i, /reactive starts?/i, /partner starts?/i, /band starts?/i, /rolled ball starts?/i]],
  ["a-skip", [/\ba-skips?\b/i, /a-marches?/i]],
  ["flying-20m", [/flying\s?\d+m/i, /ins-and-outs/i, /wickets?/i]],
  ["tempo-run", [/tempo runs?/i, /rhythm runs?/i, /\d+\s?x\s?100m/i, /\brsa\b/i, /repeat sprints?/i]],
  ["broad-jump-stick", [/broad jumps?/i, /alt(-leg)? bounds/i, /\bbounds?\b/i, /skip for distance/i]],
  ["standing-triple-jump-test", [/standing triple jump/i, /triple jump/i]],
  ["pogo-hops", [/\bpogos?\b/i, /pogo hops?/i, /hurdle hops?/i, /sl hops/i]],
  ["snap-down-landing", [/snap-?downs?/i]],
  ["box-jump-gym", [/box jumps?/i, /depth jumps?/i]],
  ["step-jump-home", [/step jumps?/i, /stair drop/i, /bottom stair/i, /low step/i]],
  ["depth-drop-gym", [/depth drops?/i, /depth-to-sprint/i, /step off (a )?low box/i, /step-off/i]],
  ["shuttle-5-10-5", [/5-10-5/, /5-5 shuttles?/i, /shuttle/i]],
  ["l-drill", [/l-drill/i]],
  ["t-drill", [/t-drill/i]],
  ["agility-505", [/505/]],
  ["illinois-agility", [/illinois/i]],
  ["arrowhead-agility", [/arrowhead/i]],
  ["mirror-drill", [/mirror drill/i]],
  ["angle-cuts", [/angle cuts?/i, /reactive cuts?/i, /cut \+ ball/i, /chop \+ cut/i, /accel[- ]cut/i, /\bdecel/i, /deceleration/i]],
  ["ball-roll-reaction", [/rolled ball/i, /ball roll/i, /chase the ball/i]],
  ["coloured-cone-call", [/colou?red cone/i, /cone call/i]],
  ["wall-ball-reaction", [/wall ball/i, /wall-ball/i]],
  ["1v1-read-react", [/1v1/i, /read.{0,3}react/i]],
  ["ladder-in-in-out-out", [/in-?in-?out-?out/i]],
  ["ladder-icky-shuffle", [/icky shuffle/i]],
  ["ladder-lateral-run", [/lateral (ladder )?runs?/i, /ladder lateral/i]],
  ["farmer-carry-gym", [/farmer/i, /suitcase/i, /loaded carry/i, /mixed carries/i, /\bcarry\b/i, /carries/i]],
  ["rotational-med-ball-throw", [/rotational throws?/i, /med ball throws?/i, /rotational med ball/i, /step-behind throws?/i, /\bthrows?\b/i, /throws light/i]],
  ["woodchop-gym", [/woodchops?/i, /wood chops?/i, /\bchops?\b/i]],
  ["sprint-10m-test", [/10m test/i, /timed 10m/i, /timed starts/i]],
  ["deadbug", [/dead\s?bugs?/i, /bird dogs?/i]],
  ["pallof-press-gym", [/pallof/i, /anti-rotation/i]],
  ["side-plank", [/side plank/i]],
  ["plank", [/\bplanks?\b/i]],
  ["goblet-squat-gym", [/goblet squats?/i, /bag squat/i, /jump squat/i]],
  ["barbell-back-squat", [/back squats?/i, /barbell squat/i, /heavy squat/i]],
  ["bodyweight-squat", [/bodyweight squats?/i, /air squats?/i]],
  ["push-up", [/push-?ups?/i]],
  ["db-row", [/db rows?/i, /dumbbell rows?/i, /explosive rows?/i, /\brows?\b/i, /pull-apart/i]],
  ["db-rdl", [/\brdls?\b/i, /sl rdl/i, /single-leg hinge/i, /hip hinge/i, /\bhinge\b/i]],
  ["band-hinge", [/kettlebell swings?/i, /kb swings?/i, /band-resisted hip drives?/i, /band deadlifts?/i]],
  ["db-press", [/db press/i, /dumbbell press/i, /overhead press/i, /db snatch/i]],
  ["bench-press", [/bench press/i]],
  ["trap-bar-deadlift", [/trap.?bar/i, /(?<!band |romanian |db )deadlifts?/i]],
  ["chin-up", [/chin-?ups?/i, /pull-?ups?/i]],
  ["split-squat-gym", [/split squats?/i, /split-stance/i, /bulgarian/i]],
  ["bodyweight-lunge", [/lunges?/i]],
  ["sit-up", [/sit-?ups?/i]],
  ["mountain-climber", [/mountain climbers?/i]],
  ["burpee", [/burpees?/i]],
  ["jumping-jack", [/jumping jacks?/i]],
  ["vertical-jump-test", [/vertical jump/i, /jump test/i]],
  ["countermovement-jump-test", [/countermovement/i, /\bcmj\b/i]],
  ["single-leg-broad-jump-test", [/single-leg broad/i, /sl broad/i]],
  ["mobility-flow", [/mobility/i, /hip flow/i, /full flow/i, /t-spine/i, /ankle \+ calf/i, /foot \+ ankle/i, /rope work/i, /\brecovery\b/i, /rest day/i, /open books/i, /90\/90/i, /calf raises?/i]],
];

// Words that only hint. A session matched by nothing but these is ambiguous.
const WEAK: Array<[string, RegExp[]]> = [
  ["a-skip", [/skips?/i]],
  ["tempo-run", [/sharpener/i]],
  ["angle-cuts", [/cuts?/i]],
  ["mobility-flow", [/rehearsal reps/i, /quiet work/i, /easy day/i]],
  ["push-up", [/push day/i, /pressing/i]],
  ["db-row", [/pull day/i, /pulling/i]],
  ["goblet-squat-gym", [/squats?/i]],
  ["deadbug", [/core deep/i, /\bcore\b/i]],
  ["plank", [/core deep/i]],
  ["db-press", [/(?<!pallof )\bpress\b/i]],
];

// Movement families. A loose word like "squat" must not add a goblet squat to
// a session that already specified a SPLIT squat — they are the same family,
// and the specific match wins.
const FAMILIES: string[][] = [
  ["goblet-squat-gym", "goblet-squat-home", "barbell-back-squat", "bodyweight-squat", "split-squat-gym", "split-squat-home"],
  ["db-rdl", "band-hinge", "trap-bar-deadlift"],
  ["db-row", "band-row", "chin-up"],
  ["db-press", "band-press", "bench-press", "push-up"],
  ["sit-up", "weighted-sit-up", "deadbug", "plank", "side-plank"],
  // A "skip for distance" is a bound, not an A-skip — the specific match wins.
  ["broad-jump-stick", "a-skip"],
];
const familyOf = new Map<string, number>();
FAMILIES.forEach((group, i) => group.forEach((slug) => familyOf.set(slug, i)));

function expand(slugs: Set<string>): string[] {
  const out = new Set<string>();
  for (const slug of slugs) {
    for (const s of twinOf.get(slug) ?? [slug]) out.add(s);
  }
  return Array.from(out).filter((s) => BY_SLUG.has(s));
}

function match(text: string): { matches: Match[]; weakOnly: boolean } {
  const strong = new Set<string>();
  const weak = new Set<string>();
  const why: Record<string, string> = {};

  for (const [slug, patterns] of STRONG) {
    for (const rx of patterns) {
      if (rx.test(text)) { strong.add(slug); why[slug] = rx.source; break; }
    }
  }
  for (const [slug, patterns] of WEAK) {
    if (strong.has(slug)) continue;
    for (const rx of patterns) {
      if (rx.test(text)) { weak.add(slug); why[slug] = `weak: ${rx.source}`; break; }
    }
  }

  // A weak hit still counts when it names a movement no strong hit covered —
  // "Squat + Push" is a squat AND a push-up, and dropping the loose "squat"
  // match just because "push-up" matched strongly loses half the session.
  const strongCanon = new Set(Array.from(strong).map((s) => twinOf.get(s)?.[0] ?? s));
  const strongFamilies = new Set(
    Array.from(strong).map((s) => familyOf.get(s)).filter((f): f is number => f !== undefined),
  );
  const chosen = new Set(strong);
  for (const slug of weak) {
    if (strongCanon.has(twinOf.get(slug)?.[0] ?? slug)) continue;
    const family = familyOf.get(slug);
    if (family !== undefined && strongFamilies.has(family)) continue;
    chosen.add(slug);
  }

  const matches = expand(chosen).map((slug) => ({
    slug,
    score: strong.has(slug) ? 2 : 1,
    why: why[slug] ?? "twin of a match",
  }));
  return { matches, weakOnly: strong.size === 0 && weak.size > 0 };
}

type Row = {
  programme: string;
  week: number;
  index: number;
  name: string;
  focus: string;
  slugs: string[];
  status: "ok" | "weak" | "none" | "crowded";
  why: string[];
};

const rows: Row[] = [];
for (const programme of ALL_PROGRAMMES) {
  for (const week of programme.curriculum) {
    week.sessions.forEach((session, index) => {
      const text = `${session.name} ${session.focus ?? ""} ${session.gymCue ?? ""} ${session.homeCue ?? ""}`;
      const { matches, weakOnly } = match(text);
      // Twins double the count, so measure crowding on distinct movements.
      const distinct = new Set(matches.map((m) => twinOf.get(m.slug)?.[0] ?? m.slug));
      const status: Row["status"] =
        matches.length === 0 ? "none" : weakOnly ? "weak" : distinct.size > 4 ? "crowded" : "ok";
      rows.push({
        programme: programme.slug,
        week: week.week,
        index,
        name: session.name,
        focus: session.focus ?? "",
        slugs: matches.map((m) => m.slug),
        status,
        why: matches.map((m) => `${m.slug} ← ${m.why}`),
      });
    });
  }
}

const byStatus = (s: Row["status"]) => rows.filter((r) => r.status === s);

console.log(`sessions: ${rows.length}`);
console.log(`  ok      : ${byStatus("ok").length}`);
console.log(`  weak    : ${byStatus("weak").length}   (matched only on a loose word)`);
console.log(`  crowded : ${byStatus("crowded").length}   (>4 movements — probably over-matched)`);
console.log(`  none    : ${byStatus("none").length}   (no match at all)`);

const used = new Set(rows.flatMap((r) => r.slugs));
const unused = EXERCISES.filter((e) => !used.has(e.slug)).map((e) => e.slug);
console.log(`\nexercises never referenced (${unused.length}):`);
console.log("  " + (unused.join(", ") || "none"));

for (const status of ["none", "weak", "crowded"] as const) {
  const group = byStatus(status);
  if (!group.length) continue;
  console.log(`\n${"=".repeat(70)}\n${status.toUpperCase()} (${group.length})\n${"=".repeat(70)}`);
  for (const r of group) {
    console.log(`\n[${r.programme} w${r.week}s${r.index}] ${r.name}`);
    console.log(`  focus: ${r.focus.slice(0, 120)}`);
    if (r.slugs.length) console.log(`  got  : ${r.slugs.join(", ")}`);
  }
}

// --write patches exerciseSlugs into the programme seed files in place. The
// curriculum sessions are object literals on one line each, so each is matched
// by its name + focus and rewritten with the slugs appended.
if (process.argv.includes("--write")) {
  const FILES = ["prisma/programmes/u13-15.ts", "prisma/programmes/u16-18.ts", "prisma/programmes/crossover.ts"];
  const byKey = new Map<string, string[]>();
  for (const r of rows) byKey.set(`${r.programme}\u0000${r.week}\u0000${r.index}`, r.slugs);

  let patched = 0;
  for (const file of FILES) {
    let src = fs.readFileSync(file, "utf8");
    // Walk the file's programmes in the same order the seed exposes them, so
    // the (programme, week, index) key lines up with what was matched.
    for (const programme of ALL_PROGRAMMES) {
      if (!src.includes(`slug: "${programme.slug}"`)) continue;
      for (const week of programme.curriculum) {
        week.sessions.forEach((session, index) => {
          const slugs = byKey.get(`${programme.slug}\u0000${week.week}\u0000${index}`);
          if (!slugs || !slugs.length) return;
          // Match this exact session literal by its name and focus.
          const needle = `{ name: ${JSON.stringify(session.name)}, focus: ${JSON.stringify(session.focus)}`;
          // Identical session literals repeat across weeks ("Mobility +
          // Recovery / Full flow." appears 9 times), so take the first
          // occurrence not already patched rather than the first occurrence.
          let at = -1;
          let close = -1;
          for (let from = src.indexOf(needle); from !== -1; from = src.indexOf(needle, from + 1)) {
            const end = src.indexOf(" }", from);
            if (end === -1) continue;
            if (src.slice(from, end).includes("exerciseSlugs")) continue;
            at = from;
            close = end;
            break;
          }
          if (at === -1) {
            console.warn(`  ! could not locate ${programme.slug} w${week.week}s${index} ${session.name}`);
            return;
          }
          const insert = `, exerciseSlugs: [${slugs.map((s) => JSON.stringify(s)).join(", ")}]`;
          src = src.slice(0, close) + insert + src.slice(close);
          patched++;
        });
      }
    }
    fs.writeFileSync(file, src);
  }
  console.log(`\npatched ${patched} sessions across ${FILES.length} files`);
}

const jsonFlag = process.argv.indexOf("--json");
if (jsonFlag !== -1 && process.argv[jsonFlag + 1]) {
  fs.writeFileSync(process.argv[jsonFlag + 1], JSON.stringify(rows, null, 2));
  console.log(`\nwrote ${process.argv[jsonFlag + 1]}`);
}
