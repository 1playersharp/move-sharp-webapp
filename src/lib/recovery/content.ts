// Recovery content — split into two clearly separate areas:
//
//  1. General recovery — no clearance required. Mobility, foam
//     rolling, hydration and sleep guidance. Anyone can use this.
//
//  2. Returning from injury — gated behind the RecoveryDisclaimer
//     interstitial. Short starter sessions per common football
//     injury, deliberately low-load and slow.
//
// Content is frozen here (like /preview) so the Recovery tab renders
// with no DB dependency on the content side. Consent tracking still
// hits the database.

export type RecoveryItem = {
  name: string;
  prescription: string;
  cue: string;
};

export type RecoveryBlock = {
  heading: string;
  intent: string;
  items: RecoveryItem[];
};

export type RecoverySession = {
  slug: string;
  name: string;
  injury: string;
  intent: string;
  approxMinutes: number;
  blocks: RecoveryBlock[];
};

// ---- General recovery -----------------------------------------------

export const GENERAL_RECOVERY: RecoveryBlock[] = [
  {
    heading: "Daily mobility",
    intent:
      "Ten minutes of mobility a day keeps ranges open and reduces the small niggles that turn into missed sessions.",
    items: [
      {
        name: "Mobility Flow",
        prescription: "10 min · daily",
        cue: "Breath-led. Slow beats fast every time. Hips, T-spine, ankles, calves.",
      },
      {
        name: "Ankle + Calf",
        prescription: "3 × 8 per side · after training",
        cue: "Knee-to-wall stretch, calf raises, banded ankle rocks.",
      },
      {
        name: "T-Spine Opening",
        prescription: "3 × 8 per side · when it feels stiff",
        cue: "Open books, side-lying rotations, cat/cow.",
      },
    ],
  },
  {
    heading: "Foam rolling",
    intent:
      "Not magic. A cheap way to move blood around and lower muscle tone before or after work.",
    items: [
      {
        name: "Quads",
        prescription: "60s per side",
        cue: "Slow rolls. Pause on tender spots for 5–10s and breathe.",
      },
      {
        name: "Glutes",
        prescription: "60s per side",
        cue: "Sit on the roller, cross one ankle over the opposite knee.",
      },
      {
        name: "Upper back",
        prescription: "60s",
        cue: "Roller across shoulder blades. Small arcs, don't roll the low back.",
      },
    ],
  },
  {
    heading: "Sleep and hydration",
    intent:
      "The two things you can control that move athletic output more than any drill.",
    items: [
      {
        name: "Sleep target",
        prescription: "9 hours between 13–15, 8 hours 16–18",
        cue: "Same wake time every day, weekends included. Phones out of the room.",
      },
      {
        name: "Water",
        prescription: "Regular sips through the day",
        cue: "Bottle in your bag, refill at every break. Pale straw is the target.",
      },
    ],
  },
];

// ---- Returning-from-injury sessions ---------------------------------

// Four starter injury tracks. Each is a single "week 1" session — the
// slow, safe re-entry to training after a physio has cleared them.
export const INJURY_SESSIONS: RecoverySession[] = [
  {
    slug: "hamstring-week-1",
    name: "Hamstring — Week 1",
    injury: "Hamstring strain",
    approxMinutes: 25,
    intent:
      "Reintroduce the hamstring to slow, controlled load. No sprinting, no top-end. Own the pattern before you own the speed.",
    blocks: [
      {
        heading: "Warm-up",
        intent: "Wake the hamstring up gently. Nothing sharp.",
        items: [
          {
            name: "Mobility Flow",
            prescription: "10 min",
            cue: "Breath-led. Slow beats fast every time.",
          },
          {
            name: "Glute Bridge",
            prescription: "3 × 10, 3s hold at top",
            cue: "Squeeze the glutes, ribs down. Should feel work in the glute, not the hamstring.",
          },
        ],
      },
      {
        heading: "Main",
        intent: "Controlled hip hinge work. Stop immediately on any sharp pull.",
        items: [
          {
            name: "Band Hip Hinge",
            prescription: "3 × 8, slow eccentric",
            cue: "Push the hips back, ribs stacked over pelvis. No load in the hands yet.",
          },
          {
            name: "Single-Leg Bridge",
            prescription: "3 × 6 per leg",
            cue: "Foot flat, other leg extended. Lift with the working glute, don't kick.",
          },
        ],
      },
      {
        heading: "Cool-down",
        intent: "Bring the system back down. Notes to the physio if anything felt off.",
        items: [
          {
            name: "Calf + Hamstring Reach",
            prescription: "3 × 30s per side",
            cue: "Gentle reach. Nothing bouncy. Breathe out into the stretch.",
          },
        ],
      },
    ],
  },
  {
    slug: "ankle-week-1",
    name: "Ankle — Week 1",
    injury: "Ankle sprain",
    approxMinutes: 20,
    intent:
      "Restore range and single-leg control. Progress to bounding and cutting only when the physio agrees.",
    blocks: [
      {
        heading: "Warm-up",
        intent: "Move the ankle through its full range gently.",
        items: [
          {
            name: "Ankle Alphabet",
            prescription: "2 × through the alphabet, per side",
            cue: "Trace each letter with the big toe. Slow and full range.",
          },
          {
            name: "Knee-to-Wall Mobs",
            prescription: "3 × 10 per side",
            cue: "Knee forward toward the wall, heel stays down.",
          },
        ],
      },
      {
        heading: "Main",
        intent: "Single-leg control before any impact work.",
        items: [
          {
            name: "Single-Leg Balance",
            prescription: "3 × 30s per leg, eyes closed if you can",
            cue: "Soft knee, foot tripod (big toe, little toe, heel).",
          },
          {
            name: "Heel Raises",
            prescription: "3 × 10 per leg",
            cue: "Full range up, slow down. Symmetry left vs right is the target.",
          },
        ],
      },
      {
        heading: "Cool-down",
        intent: "Ice if needed, note anything to your physio.",
        items: [
          {
            name: "Calf Stretch",
            prescription: "3 × 30s per side",
            cue: "Straight leg for gastroc, bent knee for soleus. No pain, only stretch.",
          },
        ],
      },
    ],
  },
  {
    slug: "groin-week-1",
    name: "Groin — Week 1",
    injury: "Adductor strain",
    approxMinutes: 25,
    intent:
      "Isometric work first, no cutting or changing direction. The adductor gets loaded slowly through the week.",
    blocks: [
      {
        heading: "Warm-up",
        intent: "Adductor pump-primer, no ballistic movement.",
        items: [
          {
            name: "Adductor Rock-Back",
            prescription: "3 × 8 per side",
            cue: "Half-kneeling, rock the hips back into the extended leg. Breathe out at the end range.",
          },
        ],
      },
      {
        heading: "Main",
        intent: "Isometric adductor work. Time under tension, not load.",
        items: [
          {
            name: "Copenhagen Isometric",
            prescription: "3 × 20s per side",
            cue: "Side plank on forearm, top leg on a low surface. Squeeze the surface with the inside of the top leg.",
          },
          {
            name: "Adductor Squeeze",
            prescription: "3 × 10s hold × 5, per set",
            cue: "Ball or rolled towel between the knees. Squeeze hard, breathe.",
          },
        ],
      },
      {
        heading: "Cool-down",
        intent: "Gentle finish. Log any pinch or sharp pull for your physio.",
        items: [
          {
            name: "90/90 Hip Flow",
            prescription: "3 × 30s per side",
            cue: "Front knee at 90°, back knee at 90°. Reach forward slowly.",
          },
        ],
      },
    ],
  },
  {
    slug: "knee-week-1",
    name: "Knee — Week 1",
    injury: "General knee return-to-training",
    approxMinutes: 25,
    intent:
      "Rebuild quad and glute strength. No jumping or landing work this week.",
    blocks: [
      {
        heading: "Warm-up",
        intent: "Wake the quad and glute without loading the knee.",
        items: [
          {
            name: "Mobility Flow",
            prescription: "10 min",
            cue: "Focus on hips and ankles — the joints either side of the knee.",
          },
          {
            name: "Terminal Knee Extension",
            prescription: "3 × 10 per leg",
            cue: "Band round the back of the knee, push the knee straight against it.",
          },
        ],
      },
      {
        heading: "Main",
        intent: "Bodyweight strength only. No load in the hands yet.",
        items: [
          {
            name: "Wall Sit",
            prescription: "3 × 30s",
            cue: "Thighs parallel to the floor. Breathe. Should feel work in the quads, not the knee.",
          },
          {
            name: "Bodyweight Split Squat (short range)",
            prescription: "3 × 6 per leg, half depth",
            cue: "Half range this week. Full depth next week if the physio agrees.",
          },
        ],
      },
      {
        heading: "Cool-down",
        intent: "Ice if the knee is warm afterwards. Note anything to your physio.",
        items: [
          {
            name: "Quad Stretch",
            prescription: "3 × 30s per side",
            cue: "Standing or side-lying. No pressure, just a gentle stretch.",
          },
        ],
      },
    ],
  },
];

export function injurySessionBySlug(slug: string): RecoverySession | undefined {
  return INJURY_SESSIONS.find((s) => s.slug === slug);
}
