// 10-question quiz — every field is a single-select radio group. Answers
// funnel into the rules engine in src/lib/quiz/generator.ts.

export type QuizAnswerKey =
  | "goal"
  | "position"
  | "weakness"
  | "days_per_week"
  | "session_length"
  | "training_age"
  | "context"
  | "recent_load"
  | "tweak"
  | "match_schedule";

export type QuizAnswers = Record<QuizAnswerKey, string>;

export type QuizOption = { key: string; label: string; blurb?: string };
export type QuizQuestion = {
  key: QuizAnswerKey;
  prompt: string;
  help?: string;
  options: QuizOption[];
  // If set, prefill from this Player field on first render.
  prefillFrom?: "position" | "trainingContext";
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    key: "goal",
    prompt: "What do you want most from this block?",
    options: [
      { key: "get_faster", label: "Get faster" },
      { key: "jump_higher", label: "Jump higher / more explosive" },
      { key: "get_stronger", label: "Get stronger" },
      { key: "sharper_cod", label: "Sharper on cuts & change of direction" },
      { key: "harder_to_move", label: "Harder to move off the ball" },
      { key: "stay_robust", label: "Stay robust — avoid tweaks" },
    ],
  },
  {
    key: "position",
    prompt: "Where do you play mostly?",
    help: "Nudges the block toward what your position asks for most.",
    prefillFrom: "position",
    options: [
      { key: "goalkeeper", label: "Goalkeeper" },
      { key: "fullback", label: "Full back / wing back" },
      { key: "centreback", label: "Centre back" },
      { key: "midfielder", label: "Midfielder" },
      { key: "winger", label: "Winger" },
      { key: "striker", label: "Striker" },
    ],
  },
  {
    key: "weakness",
    prompt: "Biggest weakness right now?",
    options: [
      { key: "first_5", label: "First 5 yards / acceleration" },
      { key: "top_end", label: "Top-end speed" },
      { key: "cod", label: "Cuts & change of direction" },
      { key: "duels", label: "Strength in duels" },
      { key: "jumping", label: "Jumping / heading" },
      { key: "general", label: "Not sure — I want a general block" },
    ],
  },
  {
    key: "days_per_week",
    prompt: "How many days a week can you train (outside matches)?",
    options: [
      { key: "2", label: "2 days" },
      { key: "3", label: "3 days" },
      { key: "4", label: "4+ days" },
    ],
  },
  {
    key: "session_length",
    prompt: "How long can each session be?",
    options: [
      { key: "short", label: "20-30 minutes (short and sharp)" },
      { key: "standard", label: "30-45 minutes (standard)" },
      { key: "long", label: "45-60 minutes (full session)" },
    ],
  },
  {
    key: "training_age",
    prompt: "How long have you done structured speed/strength work?",
    options: [
      { key: "brand_new", label: "Brand new — never" },
      { key: "few_months", label: "A few months" },
      { key: "over_year", label: "Over a year" },
      { key: "multi_years", label: "Multiple years" },
    ],
  },
  {
    key: "context",
    prompt: "Where will you train?",
    help: "Only exercises available in that setting show up.",
    prefillFrom: "trainingContext",
    options: [
      { key: "home", label: "Home (band + ball + bag)" },
      { key: "gym", label: "Gym (dumbbells, box, cable)" },
    ],
  },
  {
    key: "recent_load",
    prompt: "How hard have you trained the last two weeks?",
    options: [
      { key: "barely", label: "Barely anything" },
      { key: "football_only", label: "Football only — no gym or speed work" },
      { key: "regular", label: "Regular sessions" },
      { key: "cooked", label: "A lot — I'm cooked" },
    ],
  },
  {
    key: "tweak",
    prompt: "Any recent tweaks or things to work around?",
    help: "Blocks off high-impact movements that would risk making it worse.",
    options: [
      { key: "none", label: "No issues" },
      { key: "ankle", label: "Ankle / foot" },
      { key: "knee", label: "Knee" },
      { key: "hip", label: "Hip / groin" },
      { key: "back", label: "Back" },
      { key: "shoulder", label: "Shoulder" },
    ],
  },
  {
    key: "match_schedule",
    prompt: "What does your match schedule look like?",
    options: [
      { key: "off", label: "Off-season — build phase" },
      { key: "pre", label: "Pre-season — ramping up" },
      { key: "in", label: "In-season — matches every week" },
      { key: "return", label: "Return-to-play — coming off an injury" },
    ],
  },
];

export const QUIZ_QUESTION_KEYS = QUIZ_QUESTIONS.map((q) => q.key);
