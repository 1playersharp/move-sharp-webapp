import type { ProgrammeSeed } from "./types";

// Both-band programmes — foundational or in-season blocks that scale
// across ages when the load is intent-driven rather than absolute.

export const CROSSOVER_PROGRAMMES: ProgrammeSeed[] = [
  {
    slug: "movement-prep-6",
    name: "Movement Prep 6",
    description: "Six weeks of daily 10-minute mobility, activation, and posture work.",
    intent: "Robustness before performance. Miss this and every other block borrows against your joints — the players who never get a movement prep block are the ones who limp out of the season.",
    ageBands: ["U13_U15", "U16_U18"],
    qualities: ["robustness"],
    weeks: 6,
    sessionsPerWeek: 5,
    equipmentGym: "Mat, band optional",
    equipmentHome: "Just yourself, band optional",
    curriculum: [
      {
        week: 1,
        theme: "Hips first",
        sessions: [
          { name: "Hip Flow A", focus: "10 min: 90/90 rotations, half-kneeling stretch, glute bridges." },
          { name: "Ankle + Calf", focus: "10 min: knee-to-wall, calf raises, banded ankle mobs." },
          { name: "Core Deep", focus: "10 min: deadbugs, bird dogs, plank variations." },
          { name: "T-Spine", focus: "10 min: open books, side-lying rotations, cat/cow." },
          { name: "Full Flow", focus: "10 min: combine the week's work." },
        ],
      },
      {
        week: 2,
        theme: "Add loading",
        sessions: [
          { name: "Hip Flow B", focus: "Add band-resisted glute bridges + banded clams." },
          { name: "Ankle + Calf B", focus: "Weighted calf raises, single-leg calf raises." },
          { name: "Core Deep B", focus: "Add pallof press, side plank." },
          { name: "T-Spine B", focus: "Add banded pull-aparts + wall angels." },
          { name: "Full Flow", focus: "Combine." },
        ],
      },
      {
        week: 3,
        theme: "Add posture drills",
        sessions: [
          { name: "Hip + Posture", focus: "Hip flow + tall postures under band tension." },
          { name: "Foot + Ankle", focus: "Foot doming, ankle rockers, toe yoga." },
          { name: "Core Anti-Rotation", focus: "Pallof press variations, suitcase holds." },
          { name: "T-Spine + Neck", focus: "Add chin tucks + neck iso holds." },
          { name: "Full Flow", focus: "Combine week 3." },
        ],
      },
      {
        week: 4,
        theme: "Deload — slow it down",
        sessions: [
          { name: "Hip Flow A", focus: "10 min slow work, breath-led." },
          { name: "Core Deep", focus: "Slow deadbugs, holds only." },
          { name: "T-Spine", focus: "Breath-led open books." },
          { name: "Ankle + Calf", focus: "Easy mobility." },
          { name: "Full Flow", focus: "Combine, slow." },
        ],
      },
      {
        week: 5,
        theme: "Add sport-specific patterns",
        sessions: [
          { name: "Cut-Ready Hips", focus: "Split-stance, adductor rock-backs, hip airplanes." },
          { name: "Sprint-Ready Ankles", focus: "Pogo prep, ankle stiffness drills." },
          { name: "Contact-Ready Core", focus: "Anti-rotation under load." },
          { name: "T-Spine Rotational", focus: "Prepare for rotational power block." },
          { name: "Full Flow", focus: "Chain the sport-specific work." },
        ],
      },
      {
        week: 6,
        theme: "Own it — daily habit",
        sessions: [
          { name: "Hip Flow", focus: "Daily 10 min." },
          { name: "Ankle + Calf", focus: "Daily 10 min." },
          { name: "Core Deep", focus: "Daily 10 min." },
          { name: "T-Spine", focus: "Daily 10 min." },
          { name: "Full Flow", focus: "Combine. Build it into pre-training." },
        ],
      },
    ],
  },

  {
    slug: "in-season-maintain",
    name: "In-Season Maintain",
    description: "Two short sessions per week to keep speed and power while matches take the primary load.",
    intent: "Off-season builds it. In-season the goal is not to lose it. This block keeps the qualities alive at low volume without stealing recovery from matches.",
    ageBands: ["U13_U15", "U16_U18"],
    qualities: ["speed", "strength", "power"],
    weeks: 6,
    sessionsPerWeek: 2,
    equipmentGym: "Dumbbells, cones, box",
    equipmentHome: "Resistance band, cones or markers, football",
    curriculum: [
      {
        week: 1,
        theme: "Speed touch + strength touch",
        sessions: [
          { name: "Speed Touch", focus: "3x flying 20m, 3x broad jumps. In and out, 20 min max." },
          { name: "Strength Touch", focus: "3x5 goblet squat, 3x5 press, 3x5 row. Heavy but short." },
        ],
      },
      {
        week: 2,
        theme: "Add reactive plyos",
        sessions: [
          { name: "Speed + Plyos", focus: "3x flying 20m, 3x depth drops, 3x broad jumps." },
          { name: "Strength Touch", focus: "3x5 squat, 3x5 push, 3x5 row. Fast up." },
        ],
      },
      {
        week: 3,
        theme: "Peak match week — reduce",
        sessions: [
          { name: "Sharpener", focus: "3x flying 20m only. Nothing else. 10 min in and out." },
          { name: "Rest Day", focus: "Mobility flow only. Full recovery for match." },
        ],
      },
      {
        week: 4,
        theme: "Repeat W1",
        sessions: [
          { name: "Speed Touch", focus: "3x flying 20m, 3x broad jumps." },
          { name: "Strength Touch", focus: "3x5 squat, press, row." },
        ],
      },
      {
        week: 5,
        theme: "Add rotational",
        sessions: [
          { name: "Speed + Rotation", focus: "3x flying 20m, 3x rotational throws per side." },
          { name: "Strength Touch", focus: "3x5 heavy squat, 3x5 press, 3x5 row." },
        ],
      },
      {
        week: 6,
        theme: "Test week — assess",
        sessions: [
          { name: "Flying 20m Test", focus: "3x flying 20m timed. Compare vs off-season best." },
          { name: "Broad Jump Test", focus: "3x max broad jumps. Log." },
        ],
      },
    ],
  },
];
