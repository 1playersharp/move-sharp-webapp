import type { ExerciseCategory, TrainingContext } from "@prisma/client";

export type ExerciseSeed = {
  slug: string;
  name: string;
  description: string;
  category: ExerciseCategory;
  contexts: TrainingContext[];
  equipmentGym?: string;
  equipmentHome?: string;
  defaultPrescription: string;
  coachingCue: string;
};

// Genuinely-split library: movements that materially differ between gym
// and home get separate entries (DB Row vs Band Row, DB RDL vs Band Hinge,
// etc.). Bodyweight and cone/marker movements list both contexts.

export const EXERCISES: ExerciseSeed[] = [
  // ================================================================
  // Speed & Acceleration  (all dual-context)
  // ================================================================
  {
    slug: "wall-drives",
    name: "Wall Drives",
    description: "Lean into a wall at 60° and march. Teaches shin angle and posture for the first three yards.",
    category: "speed_acceleration",
    contexts: ["home", "gym"],
    equipmentGym: "Wall or bench",
    equipmentHome: "Wall or fence",
    defaultPrescription: "3 × 10 marches per side",
    coachingCue: "Long back leg, driving knee horizontal. Own the shin angle.",
  },
  {
    slug: "falling-starts",
    name: "Falling Starts",
    description: "Fall from a two-foot lean, catch with the first stride, accelerate 10–15m.",
    category: "speed_acceleration",
    contexts: ["home", "gym"],
    defaultPrescription: "4 × 10m starts",
    coachingCue: "Trigger foot behind hips. Fall before you push.",
  },
  {
    slug: "a-skip",
    name: "A-Skip",
    description: "Skip with a high knee drive and dorsiflexed foot. Rhythm work for sprint mechanics.",
    category: "speed_acceleration",
    contexts: ["home", "gym"],
    defaultPrescription: "3 × 20m",
    coachingCue: "Toe up, knee up. Rhythm before speed.",
  },
  {
    slug: "flying-20m",
    name: "Flying 20m",
    description: "20m runup into 20m max effort. Top-end speed without the fatigue of a full start.",
    category: "speed_acceleration",
    contexts: ["home", "gym"],
    equipmentGym: "Cones, timer optional",
    equipmentHome: "Cones or markers on grass",
    defaultPrescription: "4 × flying 20m, 3 min rest",
    coachingCue: "Build into 20m. Fly the middle 20m. Float the last 10m.",
  },
  {
    slug: "tempo-run",
    name: "Tempo Run",
    description: "70% pace runs over 100m. Aerobic base + recovery running between hard sessions.",
    category: "speed_acceleration",
    contexts: ["home", "gym"],
    equipmentGym: "Track or grass",
    equipmentHome: "Football pitch or long grass",
    defaultPrescription: "6 × 100m at 70%",
    coachingCue: "Relaxed shoulders, easy breathing. Never at 100%.",
  },

  // ================================================================
  // Plyometrics & Elastic Strength
  // ================================================================
  {
    slug: "broad-jump-stick",
    name: "Broad Jump + Stick",
    description: "Two-foot horizontal jump for distance. Stick the landing — no shuffle, no step back.",
    category: "plyometric_elastic",
    contexts: ["home", "gym"],
    defaultPrescription: "4 × 3 broad jumps",
    coachingCue: "Arms load back, then forward. Stick the landing 2 seconds.",
  },
  {
    slug: "pogo-hops",
    name: "Pogo Hops",
    description: "Stiff-ankle vertical bounces. Contact time is the metric — short, snappy, quiet.",
    category: "plyometric_elastic",
    contexts: ["home", "gym"],
    defaultPrescription: "3 × 15 pogos",
    coachingCue: "Ankles only, minimal knee. Silent contacts.",
  },
  {
    slug: "snap-down-landing",
    name: "Snap-Down Landing",
    description: "From tall stance, snap into a quarter-squat landing. Practising the shape without the jump.",
    category: "plyometric_elastic",
    contexts: ["home", "gym"],
    defaultPrescription: "3 × 6 snap-downs",
    coachingCue: "Ankle-knee-hip stack. Land like you're catching a punch.",
  },

  // Box jump — split.
  {
    slug: "box-jump-gym",
    name: "Box Jump",
    description: "Two-foot jump onto a proper box, soft landing. Vertical intent, controlled top.",
    category: "plyometric_elastic",
    contexts: ["gym"],
    equipmentGym: "Low box (12–18 inches)",
    defaultPrescription: "3 × 4 slow box jumps",
    coachingCue: "Explode up. Land like a feather.",
  },
  {
    slug: "step-jump-home",
    name: "Step Jump",
    description: "Two-foot jump onto a bottom stair or sturdy low step. Same intent as a box jump, lower height.",
    category: "plyometric_elastic",
    contexts: ["home"],
    equipmentHome: "Bottom stair or low sturdy step",
    defaultPrescription: "3 × 5 step jumps",
    coachingCue: "Explode up. Feet land under you, not out in front.",
  },

  // Depth drop — split.
  {
    slug: "depth-drop-gym",
    name: "Depth Drop",
    description: "Step off a low box, stick the landing. Landing mechanics before rebound work.",
    category: "plyometric_elastic",
    contexts: ["gym"],
    equipmentGym: "Low box (12–18 inches)",
    defaultPrescription: "3 × 5 step-off + stick",
    coachingCue: "Step, don't jump. Freeze the landing.",
  },
  {
    slug: "depth-drop-home",
    name: "Stair Drop",
    description: "Step off a bottom stair and stick the landing. Home-friendly landing practice.",
    category: "plyometric_elastic",
    contexts: ["home"],
    equipmentHome: "Bottom stair",
    defaultPrescription: "3 × 5 step-off + stick",
    coachingCue: "Step, don't jump. Freeze the landing.",
  },

  // ================================================================
  // Deceleration & Change of Direction  (all dual-context)
  // ================================================================
  {
    slug: "shuttle-5-10-5",
    name: "5-10-5 Shuttle",
    description: "Pro-agility shuttle. Sprint 5, plant, sprint 10, plant, sprint 5. Every plant matters.",
    category: "decel_cod",
    contexts: ["home", "gym"],
    equipmentGym: "Cones",
    equipmentHome: "Cones or markers",
    defaultPrescription: "4 × 5-10-5 max effort, 90s rest",
    coachingCue: "Wide plant, drop the hip, push through the outside foot.",
  },
  {
    slug: "l-drill",
    name: "L-Drill",
    description: "3-cone drill in an L shape. Combines shuffle, turn, and sprint reads.",
    category: "decel_cod",
    contexts: ["home", "gym"],
    equipmentGym: "Three cones",
    equipmentHome: "Three markers",
    defaultPrescription: "4 × L-drill max, 60s rest",
    coachingCue: "Low centre of mass through the L. Attack every cone.",
  },
  {
    slug: "angle-cuts",
    name: "Angle Cuts",
    description: "45° cuts off a plant foot. Practising the plant angle and reacceleration.",
    category: "decel_cod",
    contexts: ["home", "gym"],
    equipmentGym: "Cones",
    equipmentHome: "Cones or markers",
    defaultPrescription: "3 × 5 cuts per side",
    coachingCue: "Plant outside foot wide, push through the ball of the foot.",
  },

  // ================================================================
  // Core & Anti-Rotation
  // ================================================================
  // Farmer carry — split (DB vs Loaded bag).
  {
    slug: "farmer-carry-gym",
    name: "Farmer Carry",
    description: "Walk with a heavy DB in each hand for distance. Anti-flexion — spine stays long under load.",
    category: "core_antirotation",
    contexts: ["gym"],
    equipmentGym: "Dumbbells or trap-bar",
    defaultPrescription: "3 × 30m heavy carry",
    coachingCue: "Tall spine, chest up, quiet feet. No hip sway.",
  },
  {
    slug: "farmer-carry-home",
    name: "Bag Farmer Carry",
    description: "Walk with a loaded bag in each hand for distance. Same anti-flexion cue as the gym version.",
    category: "core_antirotation",
    contexts: ["home"],
    equipmentHome: "Loaded bag in each hand",
    defaultPrescription: "3 × 30m heavy carry",
    coachingCue: "Tall spine, chest up, quiet feet. No hip sway.",
  },

  {
    slug: "deadbug",
    name: "Deadbug",
    description: "Supine anti-extension: opposite arm and leg reach, low back pinned.",
    category: "core_antirotation",
    contexts: ["home", "gym"],
    defaultPrescription: "3 × 10 per side, slow",
    coachingCue: "Ribs down, low back glued to the floor. Slow the movement to feel it.",
  },

  // Pallof press — split (cable vs band).
  {
    slug: "pallof-press-gym",
    name: "Cable Pallof Press",
    description: "Anti-rotation press from a side-on stance against a cable stack.",
    category: "core_antirotation",
    contexts: ["gym"],
    equipmentGym: "Cable machine",
    defaultPrescription: "3 × 8 per side",
    coachingCue: "Press away from the anchor. Don't let it rotate you.",
  },
  {
    slug: "pallof-press-home",
    name: "Band Pallof Press",
    description: "Anti-rotation press against a resistance band anchored to something solid.",
    category: "core_antirotation",
    contexts: ["home"],
    equipmentHome: "Resistance band anchored to a fence post",
    defaultPrescription: "3 × 8 per side",
    coachingCue: "Press away from the anchor. Don't let it rotate you.",
  },

  {
    slug: "side-plank",
    name: "Side Plank",
    description: "Side plank on forearm — anti-lateral-flexion static hold.",
    category: "core_antirotation",
    contexts: ["home", "gym"],
    defaultPrescription: "3 × 30s per side",
    coachingCue: "Long straight line ankles to shoulder. Don't sag at the hip.",
  },

  // ================================================================
  // Contact & Duel Strength
  // ================================================================
  // Goblet squat — split.
  {
    slug: "goblet-squat-gym",
    name: "Goblet Squat",
    description: "Squat with a dumbbell or kettlebell held at chest. Owning the pattern under load.",
    category: "contact_duel_strength",
    contexts: ["gym"],
    equipmentGym: "Dumbbell or kettlebell",
    defaultPrescription: "4 × 5 with intent",
    coachingCue: "Chest up, knees track over toes, drive through the floor.",
  },
  {
    slug: "goblet-squat-home",
    name: "Bag Goblet Squat",
    description: "Squat with a loaded bag held at chest. Same pattern as the gym version at bag-load.",
    category: "contact_duel_strength",
    contexts: ["home"],
    equipmentHome: "Loaded bag held at chest",
    defaultPrescription: "4 × 6 with intent",
    coachingCue: "Chest up, knees track over toes, drive through the floor.",
  },

  {
    slug: "push-up",
    name: "Push-Up",
    description: "Standard push-up, hollow-body position, elbows tracking back at ~45°.",
    category: "contact_duel_strength",
    contexts: ["home", "gym"],
    defaultPrescription: "3 × 8 clean reps",
    coachingCue: "Long body. Elbows back not out.",
  },

  // Row — split.
  {
    slug: "db-row",
    name: "Dumbbell Row",
    description: "Bent-over single-arm row with a DB. Long spine, elbow high, squeeze at the top.",
    category: "contact_duel_strength",
    contexts: ["gym"],
    equipmentGym: "Dumbbell, bench",
    defaultPrescription: "3 × 8 per side",
    coachingCue: "Row the DB to the hip. Long spine, no rounding.",
  },
  {
    slug: "band-row",
    name: "Band Row",
    description: "Single-arm row against a resistance band anchored on a fence or door.",
    category: "contact_duel_strength",
    contexts: ["home"],
    equipmentHome: "Band looped on a fence post or door anchor",
    defaultPrescription: "3 × 10 per side",
    coachingCue: "Row to the hip. Squeeze the shoulder blade back and down.",
  },

  // RDL / Hinge — split.
  {
    slug: "db-rdl",
    name: "Dumbbell RDL",
    description: "Romanian deadlift with DBs. Hips back, soft knees, long spine to just below the knee.",
    category: "contact_duel_strength",
    contexts: ["gym"],
    equipmentGym: "Dumbbells",
    defaultPrescription: "4 × 5 heavy",
    coachingCue: "Hips push the wall behind you. DBs slide down the thighs.",
  },
  {
    slug: "band-hinge",
    name: "Band Hip Hinge",
    description: "Hip hinge with a band under the feet, held at hip. Home-friendly RDL alternative.",
    category: "contact_duel_strength",
    contexts: ["home"],
    equipmentHome: "Resistance band and a loaded bag if available",
    defaultPrescription: "4 × 8 with band tension",
    coachingCue: "Hips push back — band should be pulling you forward. Don't round.",
  },

  // Press — split.
  {
    slug: "db-press",
    name: "Dumbbell Overhead Press",
    description: "Standing overhead DB press. Ribs down, glutes tight, full lockout.",
    category: "contact_duel_strength",
    contexts: ["gym"],
    equipmentGym: "Dumbbells",
    defaultPrescription: "4 × 5",
    coachingCue: "Ribs down, squeeze the glutes, punch the ceiling.",
  },
  {
    slug: "band-press",
    name: "Band Overhead Press",
    description: "Standing overhead press against a band anchored under the foot.",
    category: "contact_duel_strength",
    contexts: ["home"],
    equipmentHome: "Resistance band, foot anchor",
    defaultPrescription: "4 × 8",
    coachingCue: "Ribs down, squeeze the glutes, punch the ceiling.",
  },

  // Split squat — split.
  {
    slug: "split-squat-gym",
    name: "Dumbbell Split Squat",
    description: "Split-stance squat with DBs. Front knee tracks the toes, back knee brushes the floor.",
    category: "contact_duel_strength",
    contexts: ["gym"],
    equipmentGym: "Dumbbells",
    defaultPrescription: "3 × 6 per side",
    coachingCue: "Tall trunk. Back knee kisses the floor.",
  },
  {
    slug: "split-squat-home",
    name: "Split Squat",
    description: "Bodyweight or loaded-bag split squat. Same knee tracking cue as the DB version.",
    category: "contact_duel_strength",
    contexts: ["home"],
    equipmentHome: "Bodyweight or loaded bag",
    defaultPrescription: "3 × 8 per side",
    coachingCue: "Tall trunk. Back knee kisses the floor.",
  },

  // ================================================================
  // Robustness & Resilience
  // ================================================================
  {
    slug: "mobility-flow",
    name: "Mobility Flow",
    description: "10-minute flow of hips, T-spine, ankles, and calves. Recovery + preparation in one block.",
    category: "robustness_resilience",
    contexts: ["home", "gym"],
    defaultPrescription: "10 min daily",
    coachingCue: "Breath-led. Slow beats fast every time.",
  },
];

// Slugs that were previously seeded but no longer belong to the split
// library. Removed on seed so the DB reflects the new taxonomy exactly.
export const ORPHANED_SLUGS = [
  "goblet-squat",
  "db-rdl",
  "farmer-carry",
  "box-jump",
  "depth-drop",
  "pallof-press",
  "split-squat",
];
