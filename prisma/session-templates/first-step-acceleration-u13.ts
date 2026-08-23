// Full materialisation of First-Step Acceleration U13 — every week and
// session becomes a real SessionTemplate row with items linking to the
// starter Exercise library. Phase 7 pilot; the other 13 programmes stay
// curriculum-JSON only until this format is signed off.

export type ItemSeed = {
  exerciseSlug: string;
  order: number;
  prescription: string;
  notes?: string;
};

export type TemplateSeed = {
  slug: string;
  name: string;
  week: number;
  day: number;
  focus: string;
  gymCue?: string;
  homeCue?: string;
  items: ItemSeed[];
};

export const FIRST_STEP_TEMPLATES: TemplateSeed[] = [
  // -------- Week 1 --------
  {
    slug: "fsa-u13-w1-d1",
    name: "Wall Drives",
    week: 1,
    day: 1,
    focus: "3×10 wall marches at 60° lean. Long back leg, driving knee horizontal.",
    items: [
      { exerciseSlug: "wall-drives", order: 1, prescription: "3 × 10 marches" },
    ],
  },
  {
    slug: "fsa-u13-w1-d2",
    name: "Falling Starts",
    week: 1,
    day: 2,
    focus: "4×10m starts from a two-foot lean. Trigger foot behind hips.",
    items: [
      { exerciseSlug: "falling-starts", order: 1, prescription: "4 × 10m starts" },
    ],
  },
  {
    slug: "fsa-u13-w1-d3",
    name: "Mobility A",
    week: 1,
    day: 3,
    focus: "Hip flexors, calves, ankle rockers. 10 min quiet work.",
    items: [
      { exerciseSlug: "mobility-flow", order: 1, prescription: "10 min flow" },
    ],
  },

  // -------- Week 2 --------
  {
    slug: "fsa-u13-w2-d1",
    name: "Wall Drives + Marches",
    week: 2,
    day: 1,
    focus: "3×10 wall marches, 3×10 A-marches. Rhythm before speed.",
    items: [
      { exerciseSlug: "wall-drives", order: 1, prescription: "3 × 10 marches" },
      { exerciseSlug: "a-skip", order: 2, prescription: "3 × 10 A-marches" },
    ],
  },
  {
    slug: "fsa-u13-w2-d2",
    name: "Reactive Starts",
    week: 2,
    day: 2,
    focus: "5×10m starts on cue (clap/whistle). Trigger foot goes to the floor fast.",
    items: [
      { exerciseSlug: "falling-starts", order: 1, prescription: "5 × 10m starts on cue" },
    ],
  },
  {
    slug: "fsa-u13-w2-d3",
    name: "Mobility A",
    week: 2,
    day: 3,
    focus: "Same as W1. Recovery is the point.",
    items: [
      { exerciseSlug: "mobility-flow", order: 1, prescription: "10 min flow" },
    ],
  },

  // -------- Week 3 --------
  {
    slug: "fsa-u13-w3-d1",
    name: "Band Starts",
    week: 3,
    day: 1,
    focus: "4×5m band-resisted from a two-point stance.",
    gymCue: "Partner-held band or column anchor.",
    homeCue: "Loop band around a low fence post.",
    items: [
      { exerciseSlug: "falling-starts", order: 1, prescription: "4 × 5m band-resisted", notes: "Feel the drive against resistance." },
    ],
  },
  {
    slug: "fsa-u13-w3-d2",
    name: "Wall Drives Loaded",
    week: 3,
    day: 2,
    focus: "3×10 wall marches with band round waist. Owning the shin angle.",
    items: [
      { exerciseSlug: "wall-drives", order: 1, prescription: "3 × 10 marches, band round waist" },
    ],
  },
  {
    slug: "fsa-u13-w3-d3",
    name: "Mobility B",
    week: 3,
    day: 3,
    focus: "Add glute bridges + dead bugs, 3×10 each.",
    items: [
      { exerciseSlug: "mobility-flow", order: 1, prescription: "10 min flow + 3 × 10 glute bridges + 3 × 10 dead bugs" },
    ],
  },

  // -------- Week 4 (Deload) --------
  {
    slug: "fsa-u13-w4-d1",
    name: "Rehearsal Reps",
    week: 4,
    day: 1,
    focus: "2×5 wall drives, 3×10m falling starts. Slow-fast-slow.",
    items: [
      { exerciseSlug: "wall-drives", order: 1, prescription: "2 × 5 marches" },
      { exerciseSlug: "falling-starts", order: 2, prescription: "3 × 10m starts" },
    ],
  },
  {
    slug: "fsa-u13-w4-d2",
    name: "Rhythm Runs",
    week: 4,
    day: 2,
    focus: "4×30m tempo runs, focus on stride cadence.",
    items: [
      { exerciseSlug: "tempo-run", order: 1, prescription: "4 × 30m at 70%" },
    ],
  },
  {
    slug: "fsa-u13-w4-d3",
    name: "Mobility A",
    week: 4,
    day: 3,
    focus: "Full 10-min mobility flow.",
    items: [
      { exerciseSlug: "mobility-flow", order: 1, prescription: "10 min flow" },
    ],
  },

  // -------- Week 5 --------
  {
    slug: "fsa-u13-w5-d1",
    name: "Partner Starts",
    week: 5,
    day: 1,
    focus: "6×10m partner-triggered starts. First to touch a cone.",
    items: [
      { exerciseSlug: "falling-starts", order: 1, prescription: "6 × 10m partner-triggered" },
    ],
  },
  {
    slug: "fsa-u13-w5-d2",
    name: "Chase the Ball",
    week: 5,
    day: 2,
    focus: "5× rolled ball starts from lean, retrieve at 15m.",
    homeCue: "A football rolled ahead is perfect for this.",
    items: [
      { exerciseSlug: "falling-starts", order: 1, prescription: "5 × 15m ball chase" },
    ],
  },
  {
    slug: "fsa-u13-w5-d3",
    name: "Recovery + Mobility",
    week: 5,
    day: 3,
    focus: "10 min mobility + easy tempo run.",
    items: [
      { exerciseSlug: "mobility-flow", order: 1, prescription: "10 min flow" },
      { exerciseSlug: "tempo-run", order: 2, prescription: "3 × 100m easy" },
    ],
  },

  // -------- Week 6 (Test) --------
  {
    slug: "fsa-u13-w6-d1",
    name: "10m Test",
    week: 6,
    day: 1,
    focus: "3×10m timed starts. Best of three logged.",
    items: [
      { exerciseSlug: "falling-starts", order: 1, prescription: "3 × 10m for time", notes: "Log the best on the Progress tab." },
    ],
  },
  {
    slug: "fsa-u13-w6-d2",
    name: "Flying 10m Feel",
    week: 6,
    day: 2,
    focus: "3×40m runs, hitting top gear by 30m.",
    items: [
      { exerciseSlug: "flying-20m", order: 1, prescription: "3 × 40m — top gear by 30m" },
    ],
  },
  {
    slug: "fsa-u13-w6-d3",
    name: "Mobility A",
    week: 6,
    day: 3,
    focus: "Deload. Notes on what's better than week 1.",
    items: [
      { exerciseSlug: "mobility-flow", order: 1, prescription: "10 min flow" },
    ],
  },
];
