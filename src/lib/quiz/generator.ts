import type {
  AgeBand,
  Exercise,
  ExerciseCategory,
  Position,
  Quality,
  TrainingContext,
} from "@prisma/client";
import type { QuizAnswers } from "@/lib/constants/quiz";
import { ageBandFromDOB } from "@/lib/age-band";

// The generator returns something the seed pipeline would accept — same
// shape as the ProgrammeSeed type in prisma/programmes/types.ts, plus the
// bookkeeping bits (slug, isCustom, createdForPlayerId) that persistence
// wants.

export type GeneratedCurriculumSession = {
  name: string;
  focus: string;
  gymCue?: string;
  homeCue?: string;
};
export type GeneratedCurriculumWeek = {
  week: number;
  theme: string;
  sessions: GeneratedCurriculumSession[];
};

export type GeneratedProgramme = {
  slug: string;
  name: string;
  description: string;
  intent: string;
  ageBands: AgeBand[];
  qualities: Quality[];
  weeks: number;
  sessionsPerWeek: number;
  equipmentGym: string | null;
  equipmentHome: string | null;
  curriculum: GeneratedCurriculumWeek[];
};

// ---------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------

const GOAL_WEIGHTS: Record<string, Partial<Record<ExerciseCategory, number>>> = {
  get_faster: { speed_acceleration: 3, plyometric_elastic: 2, decel_cod: 1, robustness_resilience: 1 },
  jump_higher: { plyometric_elastic: 3, contact_duel_strength: 2, speed_acceleration: 1 },
  get_stronger: { contact_duel_strength: 3, plyometric_elastic: 1, core_antirotation: 1 },
  sharper_cod: { decel_cod: 3, plyometric_elastic: 2, speed_acceleration: 1 },
  harder_to_move: { contact_duel_strength: 3, core_antirotation: 2, decel_cod: 1 },
  stay_robust: { robustness_resilience: 3, core_antirotation: 2, contact_duel_strength: 1 },
};

const WEAKNESS_BONUS: Record<string, Partial<Record<ExerciseCategory, number>>> = {
  first_5: { speed_acceleration: 2 },
  top_end: { speed_acceleration: 2, plyometric_elastic: 1 },
  cod: { decel_cod: 2 },
  duels: { contact_duel_strength: 2 },
  jumping: { plyometric_elastic: 2 },
  general: {},
};

const POSITION_NUDGE: Record<string, Partial<Record<ExerciseCategory, number>>> = {
  goalkeeper: { plyometric_elastic: 1, contact_duel_strength: 1 },
  fullback: { speed_acceleration: 1, decel_cod: 1 },
  centreback: { contact_duel_strength: 1, plyometric_elastic: 1 },
  midfielder: { speed_acceleration: 1, robustness_resilience: 1 },
  winger: { speed_acceleration: 1 },
  striker: { plyometric_elastic: 1, contact_duel_strength: 1 },
};

const TWEAK_EXCLUDE: Record<string, Set<string>> = {
  none: new Set(),
  ankle: new Set([
    "pogo-hops",
    "depth-drop-gym",
    "depth-drop-home",
    "box-jump-gym",
    "step-jump-home",
    "shuttle-5-10-5",
    "l-drill",
    "angle-cuts",
    "flying-20m",
  ]),
  knee: new Set([
    "box-jump-gym",
    "step-jump-home",
    "depth-drop-gym",
    "depth-drop-home",
    "broad-jump-stick",
    "snap-down-landing",
    "split-squat-gym",
    "split-squat-home",
  ]),
  hip: new Set([
    "db-rdl",
    "band-hinge",
    "split-squat-gym",
    "split-squat-home",
    "angle-cuts",
  ]),
  back: new Set([
    "db-rdl",
    "band-hinge",
    "farmer-carry-gym",
    "farmer-carry-home",
    "db-row",
    "band-row",
  ]),
  shoulder: new Set([
    "db-press",
    "band-press",
    "push-up",
  ]),
};

// ---------------------------------------------------------------------
// Naming
// ---------------------------------------------------------------------

function programmeName(goal: string, weakness: string): string {
  const key = `${goal}::${weakness}`;
  const map: Record<string, string> = {
    "get_faster::first_5": "First-Step Focus 6",
    "get_faster::top_end": "Top-End Sprint 6",
    "get_faster::cod": "Speed + Cut 6",
    "get_faster::duels": "Explosive Frame 6",
    "get_faster::jumping": "Spring + Sprint 6",
    "get_faster::general": "Speed Focus 6",
    "jump_higher::jumping": "Vertical Focus 6",
    "jump_higher::first_5": "Launch + Land 6",
    "jump_higher::general": "Elastic Focus 6",
    "get_stronger::duels": "Duel Strength Build 6",
    "get_stronger::first_5": "Explosive Base 6",
    "get_stronger::general": "Strength Base 6",
    "sharper_cod::cod": "COD Focus 6",
    "sharper_cod::first_5": "Change of Direction 6",
    "sharper_cod::general": "Agility Focus 6",
    "harder_to_move::duels": "Contact Build 6",
    "harder_to_move::general": "Physical Base 6",
    "stay_robust::general": "Robustness Reset 6",
  };
  return map[key] ?? map[`${goal}::general`] ?? "Custom Block 6";
}

function programmeIntent(answers: QuizAnswers): string {
  const goalIntent: Record<string, string> = {
    get_faster: "You want to be faster. This block is built around it.",
    jump_higher: "You want a bigger vertical and cleaner landings.",
    get_stronger: "You want more usable strength — the kind that shows up in duels.",
    sharper_cod: "You want to cut harder and reaccelerate cleaner.",
    harder_to_move: "You want to hold your ground and win contact.",
    stay_robust: "You want to stay on the pitch, not in the physio room.",
  };
  const scheduleContext: Record<string, string> = {
    off: "It's built for off-season volume — full intent, full weeks.",
    pre: "It ramps for pre-season — session count builds through week 3.",
    in: "In-season load — two lighter sessions a week, matches take priority.",
    return: "Return-to-play — no max effort in weeks 1-2, mobility on every day.",
  };
  return `${goalIntent[answers.goal] ?? "This is your custom block."} ${scheduleContext[answers.match_schedule] ?? ""}`.trim();
}

// ---------------------------------------------------------------------
// Weight computation
// ---------------------------------------------------------------------

const ALL_CATEGORIES: ExerciseCategory[] = [
  "speed_acceleration",
  "plyometric_elastic",
  "decel_cod",
  "core_antirotation",
  "contact_duel_strength",
  "robustness_resilience",
];

function computeWeights(answers: QuizAnswers): Record<ExerciseCategory, number> {
  const weights: Record<ExerciseCategory, number> = Object.fromEntries(
    ALL_CATEGORIES.map((c) => [c, 0]),
  ) as Record<ExerciseCategory, number>;

  for (const [cat, w] of Object.entries(GOAL_WEIGHTS[answers.goal] ?? {})) {
    weights[cat as ExerciseCategory] += w!;
  }
  for (const [cat, w] of Object.entries(WEAKNESS_BONUS[answers.weakness] ?? {})) {
    weights[cat as ExerciseCategory] += w!;
  }
  for (const [cat, w] of Object.entries(POSITION_NUDGE[answers.position] ?? {})) {
    weights[cat as ExerciseCategory] += w!;
  }
  return weights;
}

// ---------------------------------------------------------------------
// Session shape
// ---------------------------------------------------------------------

function sessionsPerWeekFrom(answers: QuizAnswers): number {
  if (answers.match_schedule === "in" || answers.match_schedule === "return") return 2;
  const days = Number(answers.days_per_week);
  return days === 2 ? 2 : 3;
}

function exercisesPerSessionFrom(answers: QuizAnswers): number {
  if (answers.recent_load === "cooked") return 3;
  if (answers.match_schedule === "return") return 3;
  switch (answers.session_length) {
    case "short":
      return 3;
    case "long":
      return 5;
    default:
      return 4;
  }
}

// Deterministic pseudo-random cycle through a pool so exercises rotate
// week-to-week without repeating the same first pick every time.
function pickFromPool<T>(pool: T[], seed: number, count: number): T[] {
  if (pool.length === 0) return [];
  const out: T[] = [];
  const start = seed % pool.length;
  for (let i = 0; i < count; i++) {
    out.push(pool[(start + i) % pool.length]);
  }
  // Dedupe if pool < count.
  return Array.from(new Set(out));
}

const WEEK_THEMES: Array<{ theme: string; intensity: "learn" | "groove" | "build" | "deload" | "peak" | "test" }> = [
  { theme: "Learn the pattern", intensity: "learn" },
  { theme: "Groove — refine the shape", intensity: "groove" },
  { theme: "Build — add intent", intensity: "build" },
  { theme: "Deload — quality only", intensity: "deload" },
  { theme: "Push — competition pace", intensity: "peak" },
  { theme: "Test + deload", intensity: "test" },
];

// Every session ends with a Mobility Flow when the load is "cooked",
// return-to-play, or the training age is brand-new — keeps volume
// honest without dropping the primary work.
function shouldAlwaysAddMobility(answers: QuizAnswers): boolean {
  return (
    answers.recent_load === "cooked" ||
    answers.match_schedule === "return" ||
    answers.training_age === "brand_new" ||
    answers.tweak !== "none"
  );
}

// Category order for session slots — highest-weighted first, filtered to
// categories that actually have exercises available in the context.
function orderedSessionCategories(
  weights: Record<ExerciseCategory, number>,
  available: Map<ExerciseCategory, Exercise[]>,
): ExerciseCategory[] {
  return ALL_CATEGORIES.filter((c) => (available.get(c)?.length ?? 0) > 0)
    .sort((a, b) => (weights[b] ?? 0) - (weights[a] ?? 0));
}

// ---------------------------------------------------------------------
// Main entry
// ---------------------------------------------------------------------

export type GeneratorInput = {
  answers: QuizAnswers;
  player: { id: string; dateOfBirth: Date; position: Position | null };
  exercises: Exercise[];
};

export function generateCustomProgramme(input: GeneratorInput): GeneratedProgramme {
  const { answers, player, exercises } = input;

  const context = (answers.context === "gym" ? "gym" : "home") as TrainingContext;
  const excluded = TWEAK_EXCLUDE[answers.tweak] ?? new Set();

  // Filter to context + not excluded.
  const eligible = exercises.filter(
    (e) => e.contexts.includes(context) && !excluded.has(e.slug),
  );

  // Bucket by category.
  const byCategory = new Map<ExerciseCategory, Exercise[]>();
  for (const e of eligible) {
    if (!byCategory.has(e.category)) byCategory.set(e.category, []);
    byCategory.get(e.category)!.push(e);
  }
  // Mobility bucket (always available if seeded).
  const mobility = eligible.find((e) => e.slug === "mobility-flow") ?? null;

  const weights = computeWeights(answers);
  const spw = sessionsPerWeekFrom(answers);
  const exercisesPerSession = exercisesPerSessionFrom(answers);
  const ageBand = ageBandFromDOB(player.dateOfBirth);
  const orderedCats = orderedSessionCategories(weights, byCategory);
  const alwaysMobility = shouldAlwaysAddMobility(answers);

  // Session slot categories per week — top N categories cycle through.
  const sessionSlots: ExerciseCategory[] = [];
  for (let i = 0; i < spw; i++) {
    sessionSlots.push(orderedCats[i % orderedCats.length]);
  }

  const primaryQuality = qualityForCategory(sessionSlots[0]);
  const secondaryQuality = sessionSlots[1] ? qualityForCategory(sessionSlots[1]) : null;
  const qualities: Quality[] = secondaryQuality && secondaryQuality !== primaryQuality
    ? [primaryQuality, secondaryQuality]
    : [primaryQuality];

  // Build the 6-week curriculum.
  const curriculum: GeneratedCurriculumWeek[] = WEEK_THEMES.map((tw, wIdx) => {
    const week = wIdx + 1;
    const sessions: GeneratedCurriculumSession[] = [];

    for (let slot = 0; slot < sessionSlots.length; slot++) {
      const cat = sessionSlots[slot];
      const pool = byCategory.get(cat) ?? [];
      // Rotate per (week, slot) so exercises change week-to-week.
      const seed = wIdx * 7 + slot * 3;
      const primaryPicks = pickFromPool(
        pool,
        seed,
        Math.min(exercisesPerSession - (alwaysMobility ? 1 : 0), pool.length),
      );

      const items = primaryPicks.map((e) => e.name).join(", ");
      const cueBits: string[] = [];
      for (const e of primaryPicks) {
        if (e.coachingCue) cueBits.push(`${e.name}: ${e.coachingCue}`);
      }

      const sessionName = sessionNameFor(cat, slot, tw.intensity);
      const focus = focusFor(tw.intensity, cat, items);

      sessions.push({
        name: sessionName,
        focus,
        gymCue: context === "gym" ? cueBits[0] : undefined,
        homeCue: context === "home" ? cueBits[0] : undefined,
      });

      if (alwaysMobility && mobility) {
        // Don't repeat mobility as its own session — inline into the focus text.
        sessions[sessions.length - 1].focus += " + 10 min mobility flow to finish.";
      }
    }

    return { week, theme: tw.theme, sessions };
  });

  const name = programmeName(answers.goal, answers.weakness);
  const description = describeFor(answers, name);
  const intent = programmeIntent(answers);
  const slug = `custom-${player.id.slice(0, 8)}-${Date.now().toString(36)}`;

  const equipmentSummary = equipmentSummaryFrom(context, eligible);

  return {
    slug,
    name,
    description,
    intent,
    ageBands: [ageBand],
    qualities,
    weeks: 6,
    sessionsPerWeek: spw,
    equipmentGym: context === "gym" ? equipmentSummary : null,
    equipmentHome: context === "home" ? equipmentSummary : null,
    curriculum,
  };
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

function qualityForCategory(cat: ExerciseCategory): Quality {
  switch (cat) {
    case "speed_acceleration":
      return "speed";
    case "plyometric_elastic":
      return "power";
    case "decel_cod":
      return "agility";
    case "core_antirotation":
      return "strength";
    case "contact_duel_strength":
      return "strength";
    case "robustness_resilience":
      return "robustness";
  }
}

function sessionNameFor(
  cat: ExerciseCategory,
  slot: number,
  intensity: "learn" | "groove" | "build" | "deload" | "peak" | "test",
): string {
  const base: Record<ExerciseCategory, string> = {
    speed_acceleration: "Speed Day",
    plyometric_elastic: "Elastic Day",
    decel_cod: "COD Day",
    core_antirotation: "Core Day",
    contact_duel_strength: "Strength Day",
    robustness_resilience: "Recovery Day",
  };
  const letter = String.fromCharCode(65 + (slot % 3));
  if (intensity === "test") return `${base[cat]} — Test`;
  if (intensity === "deload") return `${base[cat]} — Deload`;
  return `${base[cat]} ${letter}`;
}

function focusFor(
  intensity: "learn" | "groove" | "build" | "deload" | "peak" | "test",
  cat: ExerciseCategory,
  items: string,
): string {
  const intensityLine: Record<string, string> = {
    learn: "Teach the shapes.",
    groove: "Repeat clean — feel the pattern.",
    build: "Add intent and load.",
    deload: "Half volume, quality only.",
    peak: "Compete pace, max intent.",
    test: "Log times or distances.",
  };
  return `${intensityLine[intensity]} ${items}.`.replace(/\s+/g, " ").trim();
}

function equipmentSummaryFrom(context: TrainingContext, eligible: Exercise[]): string {
  const key = context === "gym" ? "equipmentGym" : "equipmentHome";
  const seen = new Set<string>();
  for (const e of eligible) {
    const v = e[key];
    if (v) v.split(",").forEach((piece) => seen.add(piece.trim().toLowerCase()));
  }
  if (seen.size === 0) return context === "gym" ? "Dumbbells, box, cones" : "Resistance band, football, cones";
  return Array.from(seen).slice(0, 6).join(", ");
}

function describeFor(answers: QuizAnswers, name: string): string {
  const goalLine: Record<string, string> = {
    get_faster: "A 6-week block wired around getting faster.",
    jump_higher: "A 6-week block wired around vertical and reactive strength.",
    get_stronger: "A 6-week block wired around usable, athletic strength.",
    sharper_cod: "A 6-week block wired around clean cuts and reacceleration.",
    harder_to_move: "A 6-week block wired around winning contact.",
    stay_robust: "A 6-week block wired around staying on the pitch.",
  };
  return goalLine[answers.goal] ?? `${name} — your custom block.`;
}
