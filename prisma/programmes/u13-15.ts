import type { ProgrammeSeed } from "./types";

// U13-U15 blocks bias movement quality over load — fewer sessions/week and
// most cues are teaching cues, not intensification cues.

export const U13_15_PROGRAMMES: ProgrammeSeed[] = [
  {
    slug: "first-step-acceleration-u13",
    name: "First-Step Acceleration",
    description: "Own the first three yards. Shin angle, triple extension, no wasted motion.",
    intent: "Getting from standing to full sprint faster is the highest-leverage speed skill for a young player. This block teaches the shape.",
    ageBands: ["U13_U15"],
    qualities: ["speed"],
    weeks: 6,
    sessionsPerWeek: 3,
    equipmentGym: "Cones, wall or bench, resistance band",
    equipmentHome: "Resistance band, cones or markers, wall or fence",
    curriculum: [
      {
        week: 1,
        theme: "Shape the start — teach shin angle and posture",
        sessions: [
          { name: "Wall Drives", focus: "3x10 wall marches at 60° lean. Long back leg, driving knee horizontal.", gymCue: "Bench height helps if wall isn't comfy.", homeCue: "Any wall — sofa arm works.", exerciseSlugs: ["wall-drives"] },
          { name: "Falling Starts", focus: "4x10m starts from a two-foot lean. Trigger foot behind hips.", exerciseSlugs: ["falling-starts"] },
          { name: "Mobility A", focus: "Hip flexors, calves, ankle rockers. 10 min quiet work.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 2,
        theme: "Repeat with intent — clean the pattern",
        sessions: [
          { name: "Wall Drives + Marches", focus: "3x10 wall marches, 3x10 A-marches. Rhythm before speed.", exerciseSlugs: ["wall-drives", "a-skip"] },
          { name: "Reactive Starts", focus: "5x10m starts on cue (clap/whistle). Trigger foot goes to the floor fast.", exerciseSlugs: ["falling-starts"] },
          { name: "Mobility A", focus: "Same as W1. Recovery is the point.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 3,
        theme: "Add resistance — feel the drive",
        sessions: [
          { name: "Band Starts", focus: "4x5m band-resisted from a two-point stance.", gymCue: "Partner-held band or column anchor.", homeCue: "Loop band around a low fence post.", exerciseSlugs: ["falling-starts"] },
          { name: "Wall Drives Loaded", focus: "3x10 wall marches with band round waist. Owning the shin angle.", exerciseSlugs: ["wall-drives"] },
          { name: "Mobility B", focus: "Add glute bridges + dead bugs, 3x10 each.", exerciseSlugs: ["deadbug", "mobility-flow"] },
        ],
      },
      {
        week: 4,
        theme: "Deload — quality only",
        sessions: [
          { name: "Rehearsal Reps", focus: "2x5 wall drives, 3x10m falling starts. Slow-fast-slow.", exerciseSlugs: ["wall-drives", "falling-starts", "mobility-flow"] },
          { name: "Rhythm Runs", focus: "4x30m tempo runs, focus on stride cadence.", exerciseSlugs: ["tempo-run"] },
          { name: "Mobility A", focus: "Full 10-min mobility flow.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 5,
        theme: "Compete — reactive drills",
        sessions: [
          { name: "Partner Starts", focus: "6x10m partner-triggered starts. First to touch a cone.", exerciseSlugs: ["falling-starts"] },
          { name: "Chase the Ball", focus: "5x rolled ball starts from lean, retrieve at 15m.", homeCue: "A football rolled ahead is perfect for this.", exerciseSlugs: ["falling-starts", "ball-roll-reaction"] },
          { name: "Recovery + Mobility", focus: "10 min mobility + easy tempo run.", exerciseSlugs: ["tempo-run", "mobility-flow"] },
        ],
      },
      {
        week: 6,
        theme: "Test + deload",
        sessions: [
          { name: "10m Test", focus: "3x10m timed starts. Best of three logged.", exerciseSlugs: ["sprint-10m-test"] },
          { name: "Flying 10m Feel", focus: "3x40m runs, hitting top gear by 30m.", exerciseSlugs: ["flying-20m"] },
          { name: "Mobility A", focus: "Deload. Notes on what's better than week 1.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
    ],
  },

  {
    slug: "elastic-foundations-u13",
    name: "Elastic Foundations",
    description: "Introduce plyometrics — how to jump, land, and rebound cleanly.",
    intent: "Speed comes from putting force into the floor quickly. This block teaches the landing before it teaches the jump.",
    ageBands: ["U13_U15"],
    qualities: ["speed", "power"],
    weeks: 6,
    sessionsPerWeek: 3,
    equipmentGym: "Low box (8-12\"), jump rope, cones",
    equipmentHome: "Jump rope, football, cones or markers",
    curriculum: [
      {
        week: 1,
        theme: "Land first — the plyometric ABC",
        sessions: [
          { name: "Snap-Down Landings", focus: "3x6 snap-downs from tall stance. Ankle-knee-hip stack.", exerciseSlugs: ["snap-down-landing"] },
          { name: "Pogo Hops", focus: "3x15 stiff-ankle bounces. Contact time is the metric.", exerciseSlugs: ["pogo-hops"] },
          { name: "Rope Work", focus: "5x30s jump rope singles. Rhythm and posture.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 2,
        theme: "Add horizontal — the broad jump",
        sessions: [
          { name: "Broad Jump + Stick", focus: "4x3 broad jumps, hold the landing 2s.", exerciseSlugs: ["broad-jump-stick"] },
          { name: "Pogo + Skip", focus: "3x15 pogos, 3x20m A-skips.", exerciseSlugs: ["a-skip", "pogo-hops"] },
          { name: "Rope Work", focus: "5x30s rope. Try alternating singles.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 3,
        theme: "Low box work — vertical intent",
        sessions: [
          { name: "Box Step-Off Landings", focus: "3x5 step off low box, stick landing.", gymCue: "8-10\" box.", homeCue: "Bottom stair or low step.", exerciseSlugs: ["box-jump-gym", "step-jump-home", "depth-drop-gym", "depth-drop-home"] },
          { name: "Box Jump Up", focus: "3x4 slow box jumps up. Soft landings.", exerciseSlugs: ["box-jump-gym", "step-jump-home"] },
          { name: "Broad Jump + Stick", focus: "4x3 broad jumps. Distance is bonus, landing is the goal.", exerciseSlugs: ["broad-jump-stick"] },
        ],
      },
      {
        week: 4,
        theme: "Deload — feel it",
        sessions: [
          { name: "Rehearsal Reps", focus: "2x5 pogos, 3x3 broad jumps. Half intensity.", exerciseSlugs: ["broad-jump-stick", "pogo-hops", "mobility-flow"] },
          { name: "Rope + Skip", focus: "5x30s rope, 3x20m A-skip. Rhythm.", exerciseSlugs: ["a-skip"] },
          { name: "Mobility + Recovery", focus: "Ankle mobility + calf raises. 10 min.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 5,
        theme: "Combine — bound and skip",
        sessions: [
          { name: "Alt-Leg Bounds", focus: "4x5 alternating bounds over 15m. Big and light.", exerciseSlugs: ["broad-jump-stick"] },
          { name: "Broad + Vert Sequence", focus: "3x(1 broad jump into 1 vertical). Rebound feel.", exerciseSlugs: ["broad-jump-stick"] },
          { name: "Rope Work", focus: "5x30s doubles or crossovers. Optional.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 6,
        theme: "Test + deload",
        sessions: [
          { name: "Broad Jump Test", focus: "3 max-effort broad jumps. Best distance logged.", exerciseSlugs: ["broad-jump-stick", "vertical-jump-test"] },
          { name: "Vertical Jump Test", focus: "3 max verticals. Rest 60s between.", exerciseSlugs: ["vertical-jump-test"] },
          { name: "Recovery + Mobility", focus: "Ankles and calves.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
    ],
  },

  {
    slug: "base-strength-build-u13",
    name: "Base Strength Build",
    description: "Squat, hinge, push, pull, carry. Learn the patterns with intent, not with load.",
    intent: "Strength before intensity. Six weeks to own the five patterns before the U16 blocks add speed and load.",
    ageBands: ["U13_U15"],
    qualities: ["strength"],
    weeks: 6,
    sessionsPerWeek: 3,
    equipmentGym: "Dumbbells (light-medium), kettlebell if available",
    equipmentHome: "Resistance band, bag (backpack loaded)",
    curriculum: [
      {
        week: 1,
        theme: "Meet the patterns",
        sessions: [
          { name: "Squat + Push", focus: "3x6 goblet squat, 3x8 push-up. Slow tempo.", gymCue: "Goblet with a DB or KB.", homeCue: "Hold the loaded bag at chest.", exerciseSlugs: ["goblet-squat-gym", "goblet-squat-home", "push-up"] },
          { name: "Hinge + Pull", focus: "3x6 DB RDL, 3x8 rows.", gymCue: "DBs in each hand.", homeCue: "Band deadlift, band row.", exerciseSlugs: ["db-row", "band-row", "db-rdl", "standing-pistol"] },
          { name: "Carry Day", focus: "3x30m farmer carries. Long spine, tall walk.", homeCue: "Loaded bag in each hand or one heavy.", exerciseSlugs: ["farmer-carry-gym", "farmer-carry-home"] },
        ],
      },
      {
        week: 2,
        theme: "Groove — slow it down",
        sessions: [
          { name: "Squat + Push", focus: "3x6 squat 3-1-1 tempo, 3x8 push-up.", exerciseSlugs: ["push-up", "goblet-squat-gym", "goblet-squat-home"] },
          { name: "Hinge + Pull", focus: "3x6 RDL 3-1-1, 3x8 rows.", exerciseSlugs: ["db-row", "band-row", "db-rdl", "standing-pistol"] },
          { name: "Carry Day", focus: "3x30m farmer + 3x20m suitcase carry per side.", exerciseSlugs: ["farmer-carry-gym", "farmer-carry-home"] },
        ],
      },
      {
        week: 3,
        theme: "Add split-stance",
        sessions: [
          { name: "Split Squat + Push", focus: "3x6 per leg split squat, 3x8 push-up variation.", exerciseSlugs: ["push-up", "split-squat-gym", "split-squat-home"] },
          { name: "Single-Leg Hinge + Pull", focus: "3x6 SL RDL per side, 3x8 rows.", exerciseSlugs: ["db-row", "band-row", "db-rdl", "standing-pistol"] },
          { name: "Carry Day", focus: "3x30m mixed carries.", exerciseSlugs: ["farmer-carry-gym", "farmer-carry-home"] },
        ],
      },
      {
        week: 4,
        theme: "Deload — quality reps",
        sessions: [
          { name: "Full Body A", focus: "2x6 goblet squat, 2x8 push-up, 2x6 rows. Light.", exerciseSlugs: ["goblet-squat-gym", "goblet-squat-home", "push-up", "db-row", "band-row"] },
          { name: "Full Body B", focus: "2x6 RDL, 2x6 split squat, 2x20m carry.", exerciseSlugs: ["farmer-carry-gym", "farmer-carry-home", "db-rdl", "standing-pistol", "split-squat-gym", "split-squat-home"] },
          { name: "Mobility + Recovery", focus: "Hips, T-spine, shoulders.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 5,
        theme: "Intent — add speed to the up",
        sessions: [
          { name: "Squat + Push Intent", focus: "3x5 goblet squat with fast up. Explode.", exerciseSlugs: ["goblet-squat-gym", "goblet-squat-home"] },
          { name: "Hinge + Pull Intent", focus: "3x5 RDL, 3x6 rows with pull-and-hold.", exerciseSlugs: ["db-row", "band-row", "db-rdl", "standing-pistol"] },
          { name: "Carry + Push", focus: "3x30m farmer, 3x6 push-up cluster.", exerciseSlugs: ["farmer-carry-gym", "farmer-carry-home", "push-up"] },
        ],
      },
      {
        week: 6,
        theme: "Test + deload",
        sessions: [
          { name: "Rep Max Push-Up", focus: "Max clean push-ups in one set. Log it.", exerciseSlugs: ["push-up"] },
          { name: "Goblet Squat Test", focus: "Heaviest 5-rep goblet with clean tempo.", exerciseSlugs: ["goblet-squat-gym", "goblet-squat-home"] },
          { name: "Mobility + Recovery", focus: "10 min flow. Notes on best patterns.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
    ],
  },

  {
    slug: "cut-and-turn-u13",
    name: "Cut & Turn",
    description: "Decelerate cleanly, plant, and go the other way. The base skill under every football moment.",
    intent: "You can't cut hard if you can't stop hard. This block teaches deceleration, planting, and controlled reacceleration.",
    ageBands: ["U13_U15"],
    qualities: ["agility"],
    weeks: 6,
    sessionsPerWeek: 2,
    equipmentGym: "Cones, agility ladder if available",
    equipmentHome: "Cones or markers, football",
    curriculum: [
      {
        week: 1,
        theme: "Learn the stop",
        sessions: [
          { name: "Deceleration ABCs", focus: "4x15m run to full stop in 3 steps. Feet wide on final step.", exerciseSlugs: ["angle-cuts"] },
          { name: "Angle Cuts", focus: "3x5 45° cuts off each foot. Plant outside foot, push through.", exerciseSlugs: ["angle-cuts"] },
        ],
      },
      {
        week: 2,
        theme: "Add direction change",
        sessions: [
          { name: "5-5 Shuttles", focus: "5x5-5m shuttle. Slow start, clean turn.", exerciseSlugs: ["shuttle-5-10-5"] },
          { name: "L-Drill Intro", focus: "3x L-drill at 60%. Learn the shape.", exerciseSlugs: ["l-drill"] },
        ],
      },
      {
        week: 3,
        theme: "Reactive — respond to a cue",
        sessions: [
          { name: "Mirror Drill", focus: "3x30s mirror partner side-shuffle. Stay short.", homeCue: "Ball-mirror against a wall works solo.", exerciseSlugs: ["mirror-drill"] },
          { name: "5-10-5 at 70%", focus: "4x 5-10-5 shuttle at 70%. Own the turn.", exerciseSlugs: ["shuttle-5-10-5"] },
        ],
      },
      {
        week: 4,
        theme: "Deload — clean reps",
        sessions: [
          { name: "Angle Cuts Slow", focus: "3x5 slow 45° cuts per side. Feel the plant foot.", exerciseSlugs: ["angle-cuts"] },
          { name: "Shuttle Rehearsal", focus: "3x 5-10-5 at 60%. Rhythm work.", exerciseSlugs: ["shuttle-5-10-5"] },
        ],
      },
      {
        week: 5,
        theme: "Speed up the plant",
        sessions: [
          { name: "L-Drill Full Speed", focus: "4x L-drill max. Log times.", exerciseSlugs: ["l-drill"] },
          { name: "Cut + Ball", focus: "5x accel-cut-receive with a ball at the end.", exerciseSlugs: ["angle-cuts"] },
        ],
      },
      {
        week: 6,
        theme: "Test",
        sessions: [
          { name: "5-10-5 Test", focus: "3x 5-10-5 max effort. Best time logged.", exerciseSlugs: ["shuttle-5-10-5"] },
          { name: "L-Drill Test", focus: "3x L-drill max. Best logged. Deload after.", exerciseSlugs: ["l-drill"] },
        ],
      },
    ],
  },

  {
    slug: "bounce-and-bound-u13",
    name: "Bounce & Bound",
    description: "Horizontal plyometrics — build the elastic step that turns strength into sprint.",
    intent: "Bounding is a bridge between strength and speed. This block builds the horizontal spring most young players never train.",
    ageBands: ["U13_U15"],
    qualities: ["speed", "power"],
    weeks: 6,
    sessionsPerWeek: 3,
    equipmentGym: "Cones, low hurdles or mini-cones",
    equipmentHome: "Cones or markers, football, flat grass or field",
    curriculum: [
      {
        week: 1,
        theme: "Broad jumps first",
        sessions: [
          { name: "Broad Jumps", focus: "4x3 broad jumps + stick. Own the landing.", exerciseSlugs: ["broad-jump-stick"] },
          { name: "Skip for Distance", focus: "3x20m skip for distance. Big arms.", exerciseSlugs: ["broad-jump-stick"] },
          { name: "Rope + Mobility", focus: "5x30s jump rope, 10 min mobility.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 2,
        theme: "Introduce bounds",
        sessions: [
          { name: "Alt-Leg Bounds", focus: "3x5 bounds over 15m. Big and slow.", exerciseSlugs: ["broad-jump-stick"] },
          { name: "Broad + Rebound", focus: "3x(broad jump into second bound). Two-in-one.", exerciseSlugs: ["broad-jump-stick"] },
          { name: "Rope Work", focus: "5x30s rope. Fast singles.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 3,
        theme: "Single-leg spring",
        sessions: [
          { name: "SL Bounds", focus: "3x5 per leg single-leg bounds over 10m.", exerciseSlugs: ["broad-jump-stick"] },
          { name: "Alt Bounds Full", focus: "4x5 alt bounds over 20m.", exerciseSlugs: ["broad-jump-stick"] },
          { name: "Rope + Mobility", focus: "Rope + calves + ankles.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 4,
        theme: "Deload — feel the bounce",
        sessions: [
          { name: "Broad Jumps Slow", focus: "3x3 broad jumps at 70%. Pattern focus.", exerciseSlugs: ["broad-jump-stick"] },
          { name: "Skip for Distance", focus: "3x20m skip. Half pace, full form.", exerciseSlugs: ["broad-jump-stick"] },
          { name: "Mobility + Rope", focus: "10 min mobility, 3x30s rope.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 5,
        theme: "Combine — sprint out",
        sessions: [
          { name: "Bound to Sprint", focus: "4x(3 bounds into 15m sprint). Smooth transition.", exerciseSlugs: ["broad-jump-stick"] },
          { name: "Broad Jump + Sprint", focus: "4x(broad jump into 10m accel).", exerciseSlugs: ["broad-jump-stick"] },
          { name: "Rope Work", focus: "5x30s rope, add crossover if you have it.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 6,
        theme: "Test + deload",
        sessions: [
          { name: "Standing Triple Jump", focus: "3x max triple jump. Best distance logged.", exerciseSlugs: ["standing-triple-jump-test"] },
          { name: "Broad Jump Test", focus: "3x max broad jumps.", exerciseSlugs: ["broad-jump-stick", "vertical-jump-test"] },
          { name: "Mobility + Recovery", focus: "Full-body flow.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
    ],
  },

  {
    slug: "push-pull-carry-u13",
    name: "Push, Pull, Carry",
    description: "Full-body athletic strength using the three patterns that carry to the pitch.",
    intent: "Every football moment is a push, a pull, or a carry against a load. Six weeks to own all three at bodyweight and DB level.",
    ageBands: ["U13_U15"],
    qualities: ["strength", "robustness"],
    weeks: 6,
    sessionsPerWeek: 3,
    equipmentGym: "Dumbbells (light-medium)",
    equipmentHome: "Resistance band, bag (backpack loaded)",
    curriculum: [
      {
        week: 1,
        theme: "Own the patterns",
        sessions: [
          { name: "Push Day", focus: "3x8 push-up, 3x8 DB press.", homeCue: "Band press against a door frame.", exerciseSlugs: ["push-up", "db-press", "band-press"] },
          { name: "Pull Day", focus: "3x8 DB row, 3x8 band pull-apart.", homeCue: "Loop band on fence post for rows.", exerciseSlugs: ["db-row", "band-row"] },
          { name: "Carry Day", focus: "3x30m farmer, 3x20m suitcase per side.", exerciseSlugs: ["farmer-carry-gym", "farmer-carry-home"] },
        ],
      },
      {
        week: 2,
        theme: "Add tempo",
        sessions: [
          { name: "Push Day", focus: "3x8 push-up 3-1-1, 3x6 press 3-1-1.", exerciseSlugs: ["push-up"] },
          { name: "Pull Day", focus: "3x8 row 3-1-1, 3x8 pull-apart.", exerciseSlugs: ["db-row", "band-row"] },
          { name: "Carry Day", focus: "3x30m farmer + 3x20m suitcase 3-count pause per rep.", exerciseSlugs: ["farmer-carry-gym", "farmer-carry-home"] },
        ],
      },
      {
        week: 3,
        theme: "Add speed — clean up",
        sessions: [
          { name: "Push Day", focus: "3x5 fast-up push-up, 3x5 press with pop.", exerciseSlugs: ["push-up"] },
          { name: "Pull Day", focus: "3x5 explosive row, 3x8 pull-apart.", exerciseSlugs: ["db-row", "band-row"] },
          { name: "Carry Day", focus: "3x30m farmer heavy, 3x20m suitcase.", exerciseSlugs: ["farmer-carry-gym", "farmer-carry-home"] },
        ],
      },
      {
        week: 4,
        theme: "Deload",
        sessions: [
          { name: "Full Body A", focus: "2x6 push, 2x6 row, 2x30m carry. Half load.", exerciseSlugs: ["farmer-carry-gym", "farmer-carry-home", "db-row", "band-row"] },
          { name: "Full Body B", focus: "2x6 press, 2x6 pull-apart, 2x20m suitcase.", exerciseSlugs: ["farmer-carry-gym", "farmer-carry-home", "db-row", "band-row", "db-press", "band-press"] },
          { name: "Mobility + Recovery", focus: "T-spine, shoulders, hips.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 5,
        theme: "Combos",
        sessions: [
          { name: "Push + Carry", focus: "3x(6 push-up into 30m farmer).", exerciseSlugs: ["farmer-carry-gym", "farmer-carry-home", "push-up"] },
          { name: "Pull + Push", focus: "3x(6 row + 6 press). Alternate.", exerciseSlugs: ["db-row", "band-row", "db-press", "band-press"] },
          { name: "Loaded Carry Circuit", focus: "5x(30m farmer + 20m suitcase per side).", exerciseSlugs: ["farmer-carry-gym", "farmer-carry-home"] },
        ],
      },
      {
        week: 6,
        theme: "Test + deload",
        sessions: [
          { name: "Rep Max Push-Up", focus: "One max clean set. Log.", exerciseSlugs: ["push-up"] },
          { name: "Rep Max Row", focus: "One max clean set with a moderate DB.", exerciseSlugs: ["db-row", "band-row"] },
          { name: "Mobility + Recovery", focus: "Full-body flow. Reflect on what improved.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
    ],
  },
];
