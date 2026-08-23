export type ExerciseSeed = {
  slug: string;
  name: string;
  description: string;
  category: "strength" | "plyometric" | "speed" | "agility" | "mobility";
  equipmentGym?: string;
  equipmentHome?: string;
};

// Starter set — the 20 most-used exercises across the 14 programmes.
// Motion specs left null until Phase 5 sign-off is complete; the animation
// factory is proven on the 4 pilots but not scaled to the full library yet.

export const EXERCISES: ExerciseSeed[] = [
  // --- Strength (7) ---
  {
    slug: "goblet-squat",
    name: "Goblet Squat",
    description: "Squat with a load held at chest. Owning the pattern under load, upright torso, full depth.",
    category: "strength",
    equipmentGym: "Dumbbell or kettlebell",
    equipmentHome: "Loaded bag held at chest",
  },
  {
    slug: "push-up",
    name: "Push-Up",
    description: "Standard push-up, hollow-body position, elbows tracking back at ~45°.",
    category: "strength",
    equipmentGym: "Bodyweight",
    equipmentHome: "Bodyweight",
  },
  {
    slug: "db-row",
    name: "Dumbbell Row",
    description: "Bent-over single-arm row with a dumbbell. Long spine, elbow high, squeeze at the top.",
    category: "strength",
    equipmentGym: "Dumbbell, bench",
    equipmentHome: "Band looped on a fence post or door anchor",
  },
  {
    slug: "db-rdl",
    name: "Dumbbell RDL",
    description: "Romanian deadlift with DBs. Hips back, soft knees, long spine to just below the knee.",
    category: "strength",
    equipmentGym: "Dumbbells",
    equipmentHome: "Band deadlift or loaded bag hinge",
  },
  {
    slug: "db-press",
    name: "Dumbbell Overhead Press",
    description: "Standing overhead press with DBs. Ribs down, glutes tight, full lockout.",
    category: "strength",
    equipmentGym: "Dumbbells",
    equipmentHome: "Band press from a step-on anchor",
  },
  {
    slug: "split-squat",
    name: "Split Squat",
    description: "Split-stance squat with weight in each hand. Front knee tracks the toes, back knee brushes the floor.",
    category: "strength",
    equipmentGym: "Dumbbells",
    equipmentHome: "Loaded bag or bodyweight",
  },
  {
    slug: "farmer-carry",
    name: "Farmer Carry",
    description: "Walk with a heavy load in each hand for distance. Tall spine, chest up, quiet feet.",
    category: "strength",
    equipmentGym: "Dumbbells or trap-bar",
    equipmentHome: "Loaded bag in each hand",
  },

  // --- Plyometrics (5) ---
  {
    slug: "broad-jump-stick",
    name: "Broad Jump + Stick",
    description: "Two-foot horizontal jump for distance. Stick the landing — no shuffle, no step back.",
    category: "plyometric",
    equipmentGym: "None",
    equipmentHome: "None",
  },
  {
    slug: "pogo-hops",
    name: "Pogo Hops",
    description: "Stiff-ankle vertical bounces. Contact time is the metric — short, snappy, quiet.",
    category: "plyometric",
    equipmentGym: "None",
    equipmentHome: "None",
  },
  {
    slug: "snap-down-landing",
    name: "Snap-Down Landing",
    description: "From tall stance, snap into a quarter-squat landing. Practising the shape without the jump.",
    category: "plyometric",
    equipmentGym: "None",
    equipmentHome: "None",
  },
  {
    slug: "box-jump",
    name: "Box Jump",
    description: "Two-foot jump onto a low box, soft landing. Vertical intent, controlled top.",
    category: "plyometric",
    equipmentGym: "Low box (8–18 inches)",
    equipmentHome: "Bottom stair or low sturdy step",
  },
  {
    slug: "depth-drop",
    name: "Depth Drop",
    description: "Step off a low box, stick the landing. Landing mechanics before rebound work.",
    category: "plyometric",
    equipmentGym: "Low box",
    equipmentHome: "Bottom stair",
  },

  // --- Speed (5) ---
  {
    slug: "wall-drives",
    name: "Wall Drives",
    description: "Lean into a wall at 60° and march. Teaches shin angle and posture for the first three yards.",
    category: "speed",
    equipmentGym: "Wall or bench",
    equipmentHome: "Wall or fence",
  },
  {
    slug: "falling-starts",
    name: "Falling Starts",
    description: "Fall from a two-foot lean, catch with the first stride, accelerate 10–15m.",
    category: "speed",
    equipmentGym: "None",
    equipmentHome: "None",
  },
  {
    slug: "a-skip",
    name: "A-Skip",
    description: "Skip with a high knee drive and dorsiflexed foot. Rhythm work for sprint mechanics.",
    category: "speed",
    equipmentGym: "None",
    equipmentHome: "None",
  },
  {
    slug: "flying-20m",
    name: "Flying 20m",
    description: "20m runup into 20m max effort. Top-end speed without the fatigue of a full start.",
    category: "speed",
    equipmentGym: "Cones, timer optional",
    equipmentHome: "Cones or markers on grass",
  },
  {
    slug: "tempo-run",
    name: "Tempo Run",
    description: "70% pace runs over 100m. Aerobic base + recovery running between hard sessions.",
    category: "speed",
    equipmentGym: "Track or grass",
    equipmentHome: "Football pitch or long grass",
  },

  // --- Agility (3) ---
  {
    slug: "shuttle-5-10-5",
    name: "5-10-5 Shuttle",
    description: "Pro-agility shuttle. Sprint 5, plant, sprint 10, plant, sprint 5. Every plant matters.",
    category: "agility",
    equipmentGym: "Cones",
    equipmentHome: "Cones or markers",
  },
  {
    slug: "l-drill",
    name: "L-Drill",
    description: "3-cone drill in an L shape. Combines shuffle, turn, and sprint reads.",
    category: "agility",
    equipmentGym: "Three cones",
    equipmentHome: "Three markers",
  },
  {
    slug: "angle-cuts",
    name: "Angle Cuts",
    description: "45° cuts off a plant foot. Practising the plant angle and reacceleration.",
    category: "agility",
    equipmentGym: "Cones",
    equipmentHome: "Cones or markers",
  },

  // --- Mobility (1) — appears in almost every programme ---
  {
    slug: "mobility-flow",
    name: "Mobility Flow",
    description: "10-minute flow of hips, T-spine, ankles, and calves. Recovery + preparation in one block.",
    category: "mobility",
    equipmentGym: "Mat optional",
    equipmentHome: "None",
  },
];
