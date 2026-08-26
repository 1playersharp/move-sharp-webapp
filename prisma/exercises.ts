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
  // When set, session logging offers to log a PB value against this metric
  // when the item is ticked complete.
  pbMetricKey?: string;
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
    pbMetricKey: "flying-20m",
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
    pbMetricKey: "broad-jump",
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

  // ---- Jump tests (progress-tracked) ---------------------------------
  {
    slug: "vertical-jump-test",
    name: "Vertical Jump Test",
    description: "Reach mark on a wall standing, then jump one-off from a countermovement and mark the top. Difference is your jump.",
    category: "plyometric_elastic",
    contexts: ["home", "gym"],
    equipmentGym: "Wall + chalk or measuring tape",
    equipmentHome: "Wall + chalk or measuring tape",
    defaultPrescription: "3 × max jump, 60s rest — log best in cm",
    coachingCue: "Arms drive up hard on the way up. One clean rep at a time.",
    pbMetricKey: "vertical-jump",
  },
  {
    slug: "standing-triple-jump-test",
    name: "Standing Triple Jump",
    description: "Standing broad + right foot bound + left foot bound to a two-foot landing. Measure the total distance.",
    category: "plyometric_elastic",
    contexts: ["home", "gym"],
    equipmentGym: "Measuring tape",
    equipmentHome: "Measuring tape",
    defaultPrescription: "3 × max triple, 90s rest — log best in metres",
    coachingCue: "Big arms. Don't lose momentum between bounds — chain them.",
    pbMetricKey: "standing-triple-jump",
  },
  {
    slug: "countermovement-jump-test",
    name: "Countermovement Jump",
    description: "Dip to a shallow squat, then explode up. Same measurement as vertical jump but with a bigger pre-load.",
    category: "plyometric_elastic",
    contexts: ["home", "gym"],
    equipmentGym: "Wall + chalk or tape",
    equipmentHome: "Wall + chalk or tape",
    defaultPrescription: "3 × max CMJ, 60s rest — log best in cm",
    coachingCue: "Dip fast, reverse faster. Don't pause at the bottom.",
    pbMetricKey: "cmj",
  },
  {
    slug: "single-leg-broad-jump-test",
    name: "Single-Leg Broad Jump",
    description: "Broad jump for distance, taking off and landing on the same leg. Best measure of unilateral power asymmetry.",
    category: "plyometric_elastic",
    contexts: ["home", "gym"],
    equipmentGym: "Measuring tape",
    equipmentHome: "Measuring tape",
    defaultPrescription: "3 × max per leg — log best each side",
    coachingCue: "Land soft, stick the landing. If you can't stick it, it doesn't count.",
    pbMetricKey: "single-leg-broad-jump",
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
    pbMetricKey: "shuttle-5-10-5",
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
    pbMetricKey: "l-drill",
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

  // ---- Timed agility tests --------------------------------------------
  // Standard football/S&C tests. Each has a pbMetricKey so a "max
  // effort" logged rep is compared against the player's previous best
  // in the Progress → Bests view.
  {
    slug: "t-drill",
    name: "T-Drill",
    description: "4-cone T. Sprint 10m forward, shuffle 5m left, shuffle 10m right, shuffle 5m left, back-pedal 10m to start. One time on the clock.",
    category: "decel_cod",
    contexts: ["home", "gym"],
    equipmentGym: "4 cones + stopwatch",
    equipmentHome: "4 markers + stopwatch",
    defaultPrescription: "3 × T max, 90s rest — log best",
    coachingCue: "Face forward the whole time. Don't cross the feet on the shuffle.",
    pbMetricKey: "t-drill",
  },
  {
    slug: "agility-505",
    name: "505 Agility Test",
    description: "5m run-in, plant on the line, 5m sprint back through the start. Isolates the deceleration + turn.",
    category: "decel_cod",
    contexts: ["home", "gym"],
    equipmentGym: "2 cones + stopwatch",
    equipmentHome: "2 markers + stopwatch",
    defaultPrescription: "3 × per side, log best each side",
    coachingCue: "Wide plant, drop the hip, drive back through the outside foot.",
    pbMetricKey: "agility-505",
  },
  {
    slug: "illinois-agility",
    name: "Illinois Agility Test",
    description: "10m × 5m course with a slalom through 4 middle cones. The classic 30-second-ish full-body agility test.",
    category: "decel_cod",
    contexts: ["home", "gym"],
    equipmentGym: "8 cones + stopwatch",
    equipmentHome: "8 markers + stopwatch",
    defaultPrescription: "2 × max, 3 min rest — log best",
    coachingCue: "Attack the turns. Chest through each cone, don't drift wide.",
    pbMetricKey: "illinois-agility",
  },
  {
    slug: "arrowhead-agility",
    name: "Arrowhead Agility",
    description: "Soccer-specific arrow: 10m out, 5m diagonal, round a cone, 5m back diagonal, 10m through the start. Run left and right versions.",
    category: "decel_cod",
    contexts: ["home", "gym"],
    equipmentGym: "4 cones + stopwatch",
    equipmentHome: "4 markers + stopwatch",
    defaultPrescription: "3 × per side, 90s rest — log best",
    coachingCue: "Take the round cone tight. Push off the far foot on the way back.",
    pbMetricKey: "arrowhead-agility",
  },

  // ---- Reactive drills ------------------------------------------------
  // Match agility is reactive — you cut when the winger shows you the
  // ball, not on a beat you memorised. The block below trains the
  // eye-to-first-step step that closed-pattern shuttles can't.
  {
    slug: "mirror-drill",
    name: "Mirror Drill",
    description: "Face a partner in athletic stance; they lead with shuffles, forward, back — you mirror in real time. Pure reactive footwork.",
    category: "decel_cod",
    contexts: ["home", "gym"],
    equipmentGym: "Partner + small area",
    equipmentHome: "Partner + small area",
    defaultPrescription: "3 × 20–30s, swap leader",
    coachingCue: "Stay low, feet light. React to hips, not feet.",
  },
  {
    slug: "ball-roll-reaction",
    name: "Ball-Roll Reaction Sprint",
    description: "Three cones fanned out ~5–8m ahead. Partner rolls a ball to one — you react, sprint, retrieve.",
    category: "decel_cod",
    contexts: ["home", "gym"],
    equipmentGym: "Partner, football, 3 cones",
    equipmentHome: "Partner, football, 3 markers",
    defaultPrescription: "6 × 1 rep per side",
    coachingCue: "Eyes up. First step goes toward the ball, not away.",
  },
  {
    slug: "coloured-cone-call",
    name: "Coloured-Cone Call",
    description: "Four coloured cones in a diamond around you. Partner calls a colour — sprint out, touch, return. Adds a decision under fatigue.",
    category: "decel_cod",
    contexts: ["home", "gym"],
    equipmentGym: "4 coloured cones, partner",
    equipmentHome: "4 coloured markers, partner",
    defaultPrescription: "6–8 × 1 call, 20s rest",
    coachingCue: "Push off the far foot. Decel wide on the return.",
  },
  {
    slug: "wall-ball-reaction",
    name: "Wall-Ball Reaction",
    description: "Throw a tennis or football at a wall at odd angles; react to the bounce and catch/tag it. The solo reactive option.",
    category: "decel_cod",
    contexts: ["home"],
    equipmentHome: "Wall + ball",
    defaultPrescription: "3 × 30s continuous",
    coachingCue: "Rebound low and hard so the direction genuinely surprises you.",
  },
  {
    slug: "1v1-read-react",
    name: "1v1 Read-and-React",
    description: "Attacker/defender inside a 5×5m box. Attacker cuts freely, defender mirrors and tries to touch. Rotate every 30s.",
    category: "decel_cod",
    contexts: ["gym"],
    equipmentGym: "Partner, 5×5m box",
    defaultPrescription: "6 × 30s bouts, swap roles",
    coachingCue: "Small, chopping steps. Never cross your feet.",
  },

  // ---- Footwork / ladder ---------------------------------------------
  // Warm-up + coordination work — teaches rhythm and clean ground
  // contacts. Doesn't replace the reactive drills above for on-pitch
  // agility, but it's cheap, portable, and builds motor patterns U13-15
  // players are still forming.
  {
    slug: "ladder-in-in-out-out",
    name: "Ladder: In-In-Out-Out",
    description: "Two feet in the first square, two feet out either side, next square, repeat. Rhythm before speed.",
    category: "decel_cod",
    contexts: ["home", "gym"],
    equipmentGym: "Agility ladder or chalk lines",
    equipmentHome: "Chalk-drawn ladder or line of markers a boot-width apart",
    defaultPrescription: "5 × down-and-back",
    coachingCue: "Ball of the foot. Arms drive. Speed is a bonus once the pattern is clean.",
  },
  {
    slug: "ladder-icky-shuffle",
    name: "Ladder: Icky Shuffle",
    description: "Two feet in, one out to the side, next square repeat leading with the other foot. Cross-body coordination.",
    category: "decel_cod",
    contexts: ["home", "gym"],
    equipmentGym: "Agility ladder",
    equipmentHome: "Chalk-drawn ladder or markers",
    defaultPrescription: "5 × down-and-back",
    coachingCue: "Same rhythm both directions — start slow to iron out the reset step.",
  },
  {
    slug: "ladder-lateral-run",
    name: "Ladder: Lateral Quick Feet",
    description: "Sideways down the ladder, both feet touching each square. Trains lateral ground contact rhythm.",
    category: "decel_cod",
    contexts: ["home", "gym"],
    equipmentGym: "Agility ladder",
    equipmentHome: "Chalk-drawn ladder or markers",
    defaultPrescription: "4 × down-and-back per direction",
    coachingCue: "Hips low, shoulders square, don't cross the feet.",
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
    pbMetricKey: "plank-hold",
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
    pbMetricKey: "push-ups-max",
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
  // Basics — bodyweight home moves + weighted gym equivalents
  // ================================================================
  // Home = no equipment; gym = uses weight. Kept as distinct entries
  // so the /train/exercise browse (which filters by context) shows the
  // right catalogue per environment.

  // Squat family
  {
    slug: "bodyweight-squat",
    name: "Bodyweight Squat",
    description: "Classic air squat. Feet shoulder-width, hips back and down, chest tall.",
    category: "contact_duel_strength",
    contexts: ["home"],
    defaultPrescription: "3 × 15 clean reps",
    coachingCue: "Sit between your feet, not behind them. Knees track over toes.",
  },
  {
    slug: "barbell-back-squat",
    name: "Barbell Back Squat",
    description: "Bar on upper back, hips break first, thighs to parallel or below.",
    category: "contact_duel_strength",
    contexts: ["gym"],
    equipmentGym: "Barbell + rack",
    defaultPrescription: "4 × 5 heavy",
    coachingCue: "Big breath at the top, brace, drive the floor away on the way up.",
    pbMetricKey: "back-squat-1rm",
  },

  // Push family (push-up already exists dual-context)
  {
    slug: "bench-press",
    name: "Barbell Bench Press",
    description: "Flat bench, bar to lower chest, drive back up. Log heaviest clean set.",
    category: "contact_duel_strength",
    contexts: ["gym"],
    equipmentGym: "Barbell + bench + rack",
    defaultPrescription: "4 × 5",
    coachingCue: "Feet planted, shoulder blades pinched, bar down under control.",
    pbMetricKey: "bench-press-1rm",
  },
  {
    slug: "trap-bar-deadlift",
    name: "Trap-Bar Deadlift",
    description: "Hex/trap bar deadlift. Safer bar path than a straight-bar deadlift for youth athletes and produces very similar lower-body strength gains.",
    category: "contact_duel_strength",
    contexts: ["gym"],
    equipmentGym: "Trap bar + plates",
    defaultPrescription: "4 × 3 heavy — log heaviest clean 3-rep set",
    coachingCue: "Chest up, brace hard, push the floor away.",
    pbMetricKey: "deadlift-3rm",
  },

  // Pull family
  {
    slug: "chin-up",
    name: "Chin-Up",
    description: "Underhand grip, chin over the bar, controlled down. Max clean reps in one set — no kipping.",
    category: "contact_duel_strength",
    contexts: ["home", "gym"],
    equipmentGym: "Pull-up bar",
    equipmentHome: "Doorway pull-up bar",
    defaultPrescription: "3 × max clean reps",
    coachingCue: "Pull the bar to you, not you to the bar. Full extension at the bottom.",
    pbMetricKey: "chin-ups-max",
  },

  // Lunge family
  {
    slug: "bodyweight-lunge",
    name: "Bodyweight Lunge",
    description: "Step forward into a lunge, drop the back knee toward the floor, drive back up.",
    category: "contact_duel_strength",
    contexts: ["home"],
    defaultPrescription: "3 × 10 per leg",
    coachingCue: "Front shin vertical, back knee kisses the floor, tall trunk.",
  },

  // Core / trunk
  {
    slug: "sit-up",
    name: "Sit-Up",
    description: "Full sit-up to touch shoulders to knees, controlled on the way down.",
    category: "core_antirotation",
    contexts: ["home"],
    defaultPrescription: "3 × 15",
    coachingCue: "Chin off chest, roll up slowly — no yanking on the neck.",
    pbMetricKey: "sit-ups-max",
  },
  {
    slug: "weighted-sit-up",
    name: "Weighted Sit-Up",
    description: "Sit-up holding a plate on the chest. Own the eccentric.",
    category: "core_antirotation",
    contexts: ["gym"],
    equipmentGym: "Weight plate",
    defaultPrescription: "3 × 10 with plate",
    coachingCue: "Hug the plate. Roll up smoothly — no momentum.",
  },
  {
    slug: "plank",
    name: "Plank",
    description: "Straight-body plank on forearms. Hollow, not sagging.",
    category: "core_antirotation",
    contexts: ["home"],
    defaultPrescription: "3 × 30–45s hold",
    coachingCue: "Squeeze glutes and quads. Ribs down, don't sag the hips.",
    pbMetricKey: "plank-hold",
  },

  // Conditioning / warm-up bodyweight
  {
    slug: "mountain-climber",
    name: "Mountain Climbers",
    description: "Push-up position, drive knees alternately to chest at pace.",
    category: "core_antirotation",
    contexts: ["home"],
    defaultPrescription: "3 × 30s",
    coachingCue: "Hips stay flat. Fast feet, quiet hands.",
  },
  {
    slug: "burpee",
    name: "Burpees",
    description: "Squat, kick back to a push-up, hop feet in, jump up. Full-body conditioning.",
    category: "plyometric_elastic",
    contexts: ["home"],
    defaultPrescription: "3 × 10",
    coachingCue: "Land soft on the hop-in. Fully extend on the jump.",
  },
  {
    slug: "jumping-jack",
    name: "Jumping Jacks",
    description: "Classic star jumps. Warm-up staple, light rhythmic work.",
    category: "plyometric_elastic",
    contexts: ["home"],
    defaultPrescription: "3 × 30s",
    coachingCue: "Land through the balls of your feet. Stay light.",
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
