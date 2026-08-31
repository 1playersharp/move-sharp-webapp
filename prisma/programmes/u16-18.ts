import type { ProgrammeSeed } from "./types";

// U16-U18 blocks add load, intent, and complexity. All still framed around
// athletic explosiveness — low reps, high output, not hypertrophy volume.

export const U16_18_PROGRAMMES: ProgrammeSeed[] = [
  {
    slug: "top-end-speed-u16",
    name: "Top-End Speed",
    description: "Max velocity mechanics. Wickets, flying runs, and the drills that unlock true top gear.",
    intent: "Most players never touch true top speed. This block goes there — six weeks of pure velocity work built around max-effort flying sprints.",
    ageBands: ["U16_U18"],
    qualities: ["speed"],
    weeks: 6,
    sessionsPerWeek: 3,
    equipmentGym: "Cones or wickets, timing gates if available",
    equipmentHome: "Cones or markers, football pitch or long flat grass",
    curriculum: [
      {
        week: 1,
        theme: "Wickets — teach cadence",
        sessions: [
          { name: "Wicket Runs", focus: "6x30m wickets. Small cone at each stride length. Rhythm over speed.", gymCue: "Set with tape measure.", homeCue: "Football cones every 4 boots at first.", exerciseSlugs: ["flying-20m"] },
          { name: "Flying 20m", focus: "4x flying 20m from 20m runup. Log times.", exerciseSlugs: ["flying-20m"] },
          { name: "Recovery + Mobility", focus: "Hips, hamstrings, calves. 15 min.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 2,
        theme: "Ins-and-outs — top gear on demand",
        sessions: [
          { name: "Ins-and-Outs", focus: "4x60m (20 build, 20 fly, 20 float). Change gears cleanly.", exerciseSlugs: ["flying-20m"] },
          { name: "Flying 30m", focus: "4x flying 30m. Rest 3 min between.", exerciseSlugs: ["flying-20m"] },
          { name: "Recovery + Mobility", focus: "Hamstrings deep work.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 3,
        theme: "Extend the fly — 40m",
        sessions: [
          { name: "Wickets Repeat", focus: "5x30m wickets. Stride length + posture.", exerciseSlugs: ["flying-20m"] },
          { name: "Flying 40m", focus: "4x flying 40m from 20m runup.", exerciseSlugs: ["flying-20m"] },
          { name: "Tempo Runs", focus: "6x100m at 70%. Aerobic base.", exerciseSlugs: ["tempo-run"] },
        ],
      },
      {
        week: 4,
        theme: "Deload — quality only",
        sessions: [
          { name: "Wicket Rehearsal", focus: "3x30m wickets at 80%.", exerciseSlugs: ["flying-20m"] },
          { name: "Flying 20m at 90%", focus: "3x flying 20m. Half volume.", exerciseSlugs: ["flying-20m"] },
          { name: "Mobility + Recovery", focus: "Full flow.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 5,
        theme: "Race",
        sessions: [
          { name: "Partner Flying 30m", focus: "4x flying 30m against a partner. Compete.", exerciseSlugs: ["flying-20m"] },
          { name: "Long Wickets", focus: "5x40m wickets. Cruise gear.", exerciseSlugs: ["flying-20m"] },
          { name: "Recovery + Mobility", focus: "Deep tissue work if you can.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 6,
        theme: "Test",
        sessions: [
          { name: "Flying 20m Test", focus: "3x flying 20m timed. Best logged.", exerciseSlugs: ["flying-20m"] },
          { name: "Flying 30m Test", focus: "3x flying 30m timed. Best logged.", exerciseSlugs: ["flying-20m"] },
          { name: "Mobility + Recovery", focus: "Deload. Notes vs week 1.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
    ],
  },

  {
    slug: "repeat-sprint-ability-u16",
    name: "Repeat Sprint Ability",
    description: "Sprint hard, recover fast, do it again. Match-day fitness that shows up in the 80th minute.",
    intent: "A full-back who's fast for one sprint but done after four is a liability. This block builds the ability to hold speed across a match.",
    ageBands: ["U16_U18"],
    qualities: ["speed", "endurance"],
    weeks: 6,
    sessionsPerWeek: 3,
    equipmentGym: "Cones, timer or GPS if available",
    equipmentHome: "Cones or markers, football, watch",
    curriculum: [
      {
        week: 1,
        theme: "Base RSA — 6 reps",
        sessions: [
          { name: "6x30m RSA", focus: "6x30m sprint, 30s walk recovery. Track drop-off.", exerciseSlugs: ["tempo-run", "mobility-flow"] },
          { name: "Tempo Runs", focus: "8x100m at 70%. Recovery running.", exerciseSlugs: ["tempo-run", "mobility-flow"] },
          { name: "Mobility + Recovery", focus: "Full flow.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 2,
        theme: "Increase the reps",
        sessions: [
          { name: "8x30m RSA", focus: "8x30m sprint, 30s walk. Small drop-off target.", exerciseSlugs: ["tempo-run"] },
          { name: "Flying 20m", focus: "4x flying 20m for speed base.", exerciseSlugs: ["flying-20m"] },
          { name: "Tempo + Mobility", focus: "6x100m at 70% + mobility.", exerciseSlugs: ["tempo-run", "mobility-flow"] },
        ],
      },
      {
        week: 3,
        theme: "Shorter recovery",
        sessions: [
          { name: "6x40m RSA short rest", focus: "6x40m, 25s walk. Hold form when tired.", exerciseSlugs: ["tempo-run"] },
          { name: "Flying 30m", focus: "4x flying 30m fresh.", exerciseSlugs: ["flying-20m"] },
          { name: "Tempo Runs", focus: "8x100m at 70%.", exerciseSlugs: ["tempo-run"] },
        ],
      },
      {
        week: 4,
        theme: "Deload",
        sessions: [
          { name: "3x30m Fresh", focus: "3x30m sprint, full recovery. Quality only.", exerciseSlugs: ["mobility-flow"] },
          { name: "Tempo Runs", focus: "6x100m at 65%.", exerciseSlugs: ["tempo-run"] },
          { name: "Mobility + Recovery", focus: "Full flow.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 5,
        theme: "Direction change RSA",
        sessions: [
          { name: "6x(20+20) Shuttle RSA", focus: "6x 20m-out-20m-back, 30s walk. Turn eats the fresh legs.", exerciseSlugs: ["tempo-run", "shuttle-5-10-5"] },
          { name: "Flying 20m", focus: "4x flying 20m for peak speed.", exerciseSlugs: ["flying-20m"] },
          { name: "Tempo + Mobility", focus: "6x100m + mobility.", exerciseSlugs: ["tempo-run", "mobility-flow"] },
        ],
      },
      {
        week: 6,
        theme: "Test + deload",
        sessions: [
          { name: "RSA Test", focus: "6x30m sprint, 30s walk. Log all times, calc drop-off %.", exerciseSlugs: ["tempo-run"] },
          { name: "Flying 30m Test", focus: "3x flying 30m.", exerciseSlugs: ["flying-20m"] },
          { name: "Mobility + Recovery", focus: "Deload. Reflect.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
    ],
  },

  {
    slug: "explosive-strength-u16",
    name: "Explosive Strength",
    description: "Turn strength into power. Jump squats, DB snatches, and loaded plyos.",
    intent: "You've built the base. Now the goal is to move it fast. Low reps, high intent, no hypertrophy volume.",
    ageBands: ["U16_U18"],
    qualities: ["strength", "power"],
    weeks: 6,
    sessionsPerWeek: 3,
    equipmentGym: "Dumbbells (medium-heavy), box, trap bar optional",
    equipmentHome: "Resistance band, bag (heavy loaded)",
    curriculum: [
      {
        week: 1,
        theme: "Groove the pattern — heavy then fast",
        sessions: [
          { name: "Strength Day A", focus: "4x5 heavy goblet squat, 4x5 DB press. Own the load.", homeCue: "Loaded bag squat + band press.", exerciseSlugs: ["goblet-squat-gym", "goblet-squat-home", "db-press", "band-press"] },
          { name: "Power Day", focus: "4x3 jump squat with light DBs, 3x3 broad jump. Every rep max intent.", homeCue: "Bag jump squats, then broad jumps.", exerciseSlugs: ["broad-jump-stick", "goblet-squat-gym", "goblet-squat-home"] },
          { name: "Strength Day B", focus: "4x5 DB row, 4x5 DB RDL.", exerciseSlugs: ["db-row", "band-row", "db-rdl", "band-hinge"] },
        ],
      },
      {
        week: 2,
        theme: "Add the snatch",
        sessions: [
          { name: "Strength Day A", focus: "5x4 goblet squat, 4x5 DB press.", exerciseSlugs: ["goblet-squat-gym", "goblet-squat-home", "db-press", "band-press"] },
          { name: "Power Day", focus: "4x3 DB snatch each side, 4x3 broad jump.", homeCue: "Bag high pull + jump squat.", exerciseSlugs: ["broad-jump-stick", "goblet-squat-gym", "goblet-squat-home", "db-press", "band-press"] },
          { name: "Strength Day B", focus: "5x4 row, 5x4 RDL.", exerciseSlugs: ["db-row", "band-row", "db-rdl", "band-hinge"] },
        ],
      },
      {
        week: 3,
        theme: "Peak load",
        sessions: [
          { name: "Strength Day A", focus: "5x3 heavy goblet squat, 4x4 press.", exerciseSlugs: ["goblet-squat-gym", "goblet-squat-home", "db-press", "band-press"] },
          { name: "Power Day", focus: "5x3 jump squat light DBs, 4x2 broad jump for max distance.", exerciseSlugs: ["broad-jump-stick", "goblet-squat-gym", "goblet-squat-home"] },
          { name: "Strength Day B", focus: "5x3 row heavy, 5x4 RDL.", exerciseSlugs: ["db-row", "band-row", "db-rdl", "band-hinge"] },
        ],
      },
      {
        week: 4,
        theme: "Deload — speed only",
        sessions: [
          { name: "Strength Rehearsal", focus: "3x5 squat, 3x5 press at 60%.", exerciseSlugs: ["goblet-squat-gym", "goblet-squat-home", "db-press", "band-press"] },
          { name: "Power Rehearsal", focus: "3x3 jump squat, 3x3 broad jump. Half volume.", exerciseSlugs: ["broad-jump-stick", "goblet-squat-gym", "goblet-squat-home"] },
          { name: "Mobility + Recovery", focus: "Full flow.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 5,
        theme: "Combos",
        sessions: [
          { name: "Contrast A", focus: "4x(3 heavy goblet squat + 3 jump squat). Post-activation.", exerciseSlugs: ["goblet-squat-gym", "goblet-squat-home"] },
          { name: "Power Focus", focus: "5x2 broad jump, 5x2 DB snatch. Max output.", exerciseSlugs: ["broad-jump-stick", "db-press", "band-press"] },
          { name: "Contrast B", focus: "4x(3 heavy row + 3 explosive row). Fast up.", exerciseSlugs: ["db-row", "band-row"] },
        ],
      },
      {
        week: 6,
        theme: "Test + deload",
        sessions: [
          { name: "Broad Jump Test", focus: "3x max broad jumps.", exerciseSlugs: ["broad-jump-stick", "vertical-jump-test"] },
          { name: "Vertical Jump Test", focus: "3x max vertical.", exerciseSlugs: ["vertical-jump-test"] },
          { name: "Mobility + Recovery", focus: "Deload. Notes vs week 1.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
    ],
  },

  {
    slug: "reactive-plyos-u16",
    name: "Reactive Plyos",
    description: "Advanced plyometrics — depth jumps, hurdle rebounds, single-leg bounds.",
    intent: "Once landings are safe, reactive plyos train the shortest ground contact possible. This is the plyometric layer above Elastic Foundations.",
    ageBands: ["U16_U18"],
    qualities: ["speed", "power"],
    weeks: 6,
    sessionsPerWeek: 3,
    equipmentGym: "Low box (12-18\"), mini-hurdles, jump rope",
    equipmentHome: "Jump rope, cones or markers, low step",
    curriculum: [
      {
        week: 1,
        theme: "Depth drops — teach the landing",
        sessions: [
          { name: "Depth Drops", focus: "4x5 step off low box, stick landing. Ankle-knee-hip stack.", homeCue: "Bottom stair.", exerciseSlugs: ["box-jump-gym", "step-jump-home", "depth-drop-gym", "depth-drop-home"] },
          { name: "Pogo + Hurdle Hops", focus: "3x15 pogos, 3x5 mini-hurdle hops.", homeCue: "Line of cones instead of hurdles.", exerciseSlugs: ["pogo-hops"] },
          { name: "Rope Work", focus: "5x30s doubles or singles at pace.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 2,
        theme: "Depth jumps — rebound",
        sessions: [
          { name: "Depth Jumps", focus: "4x5 step off low box, immediate vertical rebound. Contact under 200ms.", exerciseSlugs: ["box-jump-gym", "step-jump-home", "depth-drop-gym", "depth-drop-home"] },
          { name: "Hurdle Hops", focus: "4x5 continuous hurdle hops.", exerciseSlugs: ["pogo-hops"] },
          { name: "Rope + Mobility", focus: "5x30s rope + 10 min mobility.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 3,
        theme: "Single-leg reactive",
        sessions: [
          { name: "SL Bounds", focus: "3x5 per leg SL bounds over 15m.", exerciseSlugs: ["broad-jump-stick"] },
          { name: "SL Hops for Height", focus: "3x5 per leg hops onto low box.", exerciseSlugs: ["pogo-hops"] },
          { name: "Depth Drops SL", focus: "3x5 per leg SL step-off landings.", exerciseSlugs: ["depth-drop-gym", "depth-drop-home"] },
        ],
      },
      {
        week: 4,
        theme: "Deload",
        sessions: [
          { name: "Pogo + Broad Jumps", focus: "3x10 pogos, 3x3 broad jumps at 80%.", exerciseSlugs: ["broad-jump-stick", "pogo-hops"] },
          { name: "Rope Work", focus: "5x30s rope.", exerciseSlugs: ["mobility-flow"] },
          { name: "Mobility + Recovery", focus: "Calves and ankles. Full flow.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 5,
        theme: "Sequences — depth into sprint",
        sessions: [
          { name: "Depth-to-Sprint", focus: "4x(depth drop into 10m sprint). Feel the pop.", exerciseSlugs: ["depth-drop-gym", "depth-drop-home"] },
          { name: "Hurdle-to-Broad", focus: "4x(3 hurdle hops into broad jump). Chain.", exerciseSlugs: ["broad-jump-stick", "pogo-hops"] },
          { name: "Rope + Mobility", focus: "Recover well between.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 6,
        theme: "Test + deload",
        sessions: [
          { name: "Reactive Strength Test", focus: "3x depth jump — measure rebound height if you can.", exerciseSlugs: ["box-jump-gym", "step-jump-home"] },
          { name: "Broad Jump Test", focus: "3x max broad jumps.", exerciseSlugs: ["broad-jump-stick", "vertical-jump-test"] },
          { name: "Mobility + Recovery", focus: "Deload.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
    ],
  },

  {
    slug: "change-of-direction-u16",
    name: "Change of Direction",
    description: "Every angle, every plant. Reactive agility built on decel + reaccel.",
    intent: "Football is unscripted direction change. This block trains cuts under fatigue and cuts on cue, not just cuts on a line.",
    ageBands: ["U16_U18"],
    qualities: ["agility", "power"],
    weeks: 6,
    sessionsPerWeek: 3,
    equipmentGym: "Cones, agility ladder, timer",
    equipmentHome: "Cones or markers, football, partner if possible",
    curriculum: [
      {
        week: 1,
        theme: "Decel first",
        sessions: [
          { name: "Decel Drills", focus: "5x20m sprint to full stop in 3 steps.", exerciseSlugs: ["angle-cuts"] },
          { name: "L-Drill", focus: "4x L-drill at 90%. Log times.", exerciseSlugs: ["l-drill"] },
          { name: "Recovery + Mobility", focus: "Hips + adductors.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 2,
        theme: "Add lateral shuffle",
        sessions: [
          { name: "T-Drill", focus: "4x T-drill max. Include shuffle sections clean.", exerciseSlugs: ["t-drill"] },
          { name: "5-10-5 at 90%", focus: "4x 5-10-5. Push the plant.", exerciseSlugs: ["shuttle-5-10-5"] },
          { name: "Mirror Drill", focus: "3x30s partner mirror. Reactive footwork.", homeCue: "Ball against wall works solo.", exerciseSlugs: ["mirror-drill"] },
        ],
      },
      {
        week: 3,
        theme: "Reactive cues",
        sessions: [
          { name: "Reactive Cuts", focus: "5x accel to cone reaction. Cut on partner point.", exerciseSlugs: ["angle-cuts"] },
          { name: "L-Drill Max", focus: "4x L-drill max. Best time.", exerciseSlugs: ["l-drill"] },
          { name: "Mirror Drill", focus: "4x30s partner mirror.", exerciseSlugs: ["mirror-drill"] },
        ],
      },
      {
        week: 4,
        theme: "Deload",
        sessions: [
          { name: "Decel Rehearsal", focus: "3x20m decel drills at 70%.", exerciseSlugs: ["angle-cuts"] },
          { name: "L-Drill Slow", focus: "3x L-drill at 70%.", exerciseSlugs: ["l-drill"] },
          { name: "Mobility + Recovery", focus: "Full flow.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 5,
        theme: "Under fatigue",
        sessions: [
          { name: "5-10-5 Circuits", focus: "3x(3x 5-10-5). Short rest between reps in a set.", exerciseSlugs: ["shuttle-5-10-5"] },
          { name: "Reactive + Ball", focus: "5x accel-cut-receive with a ball at cone.", exerciseSlugs: ["angle-cuts"] },
          { name: "T-Drill Repeat", focus: "4x T-drill max effort.", exerciseSlugs: ["t-drill"] },
        ],
      },
      {
        week: 6,
        theme: "Test + deload",
        sessions: [
          { name: "5-10-5 Test", focus: "3x 5-10-5 max. Best logged.", exerciseSlugs: ["shuttle-5-10-5"] },
          { name: "L-Drill Test", focus: "3x L-drill max. Best logged.", exerciseSlugs: ["l-drill"] },
          { name: "Mobility + Recovery", focus: "Deload.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
    ],
  },

  {
    slug: "rotational-power-u16",
    name: "Rotational Power",
    description: "Med ball throws, rotational DB work, and hip-turn drills for kicking and duels.",
    intent: "Rotational power shows up in kicking, shoulder-to-shoulder duels, and every plant-and-cut. Six weeks to build a base most players skip.",
    ageBands: ["U16_U18"],
    qualities: ["strength", "power", "agility"],
    weeks: 6,
    sessionsPerWeek: 3,
    equipmentGym: "Medicine ball (4-8 kg), dumbbells, cable machine optional",
    equipmentHome: "Football (subbed for med ball), resistance band",
    curriculum: [
      {
        week: 1,
        theme: "Teach the sequence",
        sessions: [
          { name: "Rotational Throws", focus: "4x5 per side rotational med ball throw into wall.", homeCue: "Football thrown two-handed sideways into wall.", exerciseSlugs: ["rotational-med-ball-throw"] },
          { name: "DB Woodchop", focus: "3x8 per side DB woodchop.", homeCue: "Band woodchop anchored high.", exerciseSlugs: ["woodchop-gym", "woodchop-home"] },
          { name: "Core + Mobility", focus: "Deadbugs, T-spine rotations.", exerciseSlugs: ["deadbug", "mobility-flow"] },
        ],
      },
      {
        week: 2,
        theme: "Add speed",
        sessions: [
          { name: "Rotational Throws", focus: "5x4 per side, max intent.", exerciseSlugs: ["rotational-med-ball-throw"] },
          { name: "Split-Stance Chop", focus: "3x6 per side split-stance woodchop.", exerciseSlugs: ["woodchop-gym", "woodchop-home", "split-squat-gym", "split-squat-home"] },
          { name: "Core + Mobility", focus: "Rotational core work.", exerciseSlugs: ["mobility-flow", "deadbug"] },
        ],
      },
      {
        week: 3,
        theme: "Feet in the sequence",
        sessions: [
          { name: "Step-Behind Throws", focus: "4x4 per side rotational throw with step-behind footwork.", exerciseSlugs: ["rotational-med-ball-throw"] },
          { name: "Kettlebell Swing", focus: "4x6 KB swing OR heavy DB swing. Explosive hip drive.", homeCue: "Band-resisted hip drives.", exerciseSlugs: ["db-rdl", "band-hinge"] },
          { name: "Core + Mobility", focus: "T-spine, adductors.", exerciseSlugs: ["mobility-flow", "deadbug"] },
        ],
      },
      {
        week: 4,
        theme: "Deload",
        sessions: [
          { name: "Throws Light", focus: "3x5 rotational throws at 70%. Feel the sequence.", exerciseSlugs: ["rotational-med-ball-throw"] },
          { name: "Chops Light", focus: "3x8 woodchop with lighter load.", exerciseSlugs: ["woodchop-gym", "woodchop-home"] },
          { name: "Mobility + Recovery", focus: "Full flow.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
      {
        week: 5,
        theme: "Contrast with sprints",
        sessions: [
          { name: "Throw + Sprint", focus: "4x(3 rotational throws + 10m sprint). Post-activation.", exerciseSlugs: ["rotational-med-ball-throw"] },
          { name: "Chop + Cut", focus: "3x(6 chops + 3 accel cuts). Rotation feeds cut.", exerciseSlugs: ["angle-cuts", "woodchop-gym", "woodchop-home"] },
          { name: "Core + Mobility", focus: "Full flow.", exerciseSlugs: ["mobility-flow", "deadbug"] },
        ],
      },
      {
        week: 6,
        theme: "Test + deload",
        sessions: [
          { name: "Med Ball Throw Test", focus: "3x max rotational throw for distance.", exerciseSlugs: ["rotational-med-ball-throw"] },
          { name: "Broad Jump Test", focus: "3x max broad jump (rotation carries).", exerciseSlugs: ["broad-jump-stick", "farmer-carry-gym", "farmer-carry-home", "vertical-jump-test"] },
          { name: "Mobility + Recovery", focus: "Deload.", exerciseSlugs: ["mobility-flow"] },
        ],
      },
    ],
  },
];
