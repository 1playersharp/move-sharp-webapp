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
          { name: "Wicket Runs", focus: "6x30m wickets. Small cone at each stride length. Rhythm over speed.", gymCue: "Set with tape measure.", homeCue: "Football cones every 4 boots at first." },
          { name: "Flying 20m", focus: "4x flying 20m from 20m runup. Log times." },
          { name: "Recovery + Mobility", focus: "Hips, hamstrings, calves. 15 min." },
        ],
      },
      {
        week: 2,
        theme: "Ins-and-outs — top gear on demand",
        sessions: [
          { name: "Ins-and-Outs", focus: "4x60m (20 build, 20 fly, 20 float). Change gears cleanly." },
          { name: "Flying 30m", focus: "4x flying 30m. Rest 3 min between." },
          { name: "Recovery + Mobility", focus: "Hamstrings deep work." },
        ],
      },
      {
        week: 3,
        theme: "Extend the fly — 40m",
        sessions: [
          { name: "Wickets Repeat", focus: "5x30m wickets. Stride length + posture." },
          { name: "Flying 40m", focus: "4x flying 40m from 20m runup." },
          { name: "Tempo Runs", focus: "6x100m at 70%. Aerobic base." },
        ],
      },
      {
        week: 4,
        theme: "Deload — quality only",
        sessions: [
          { name: "Wicket Rehearsal", focus: "3x30m wickets at 80%." },
          { name: "Flying 20m at 90%", focus: "3x flying 20m. Half volume." },
          { name: "Mobility + Recovery", focus: "Full flow." },
        ],
      },
      {
        week: 5,
        theme: "Race",
        sessions: [
          { name: "Partner Flying 30m", focus: "4x flying 30m against a partner. Compete." },
          { name: "Long Wickets", focus: "5x40m wickets. Cruise gear." },
          { name: "Recovery + Mobility", focus: "Deep tissue work if you can." },
        ],
      },
      {
        week: 6,
        theme: "Test",
        sessions: [
          { name: "Flying 20m Test", focus: "3x flying 20m timed. Best logged." },
          { name: "Flying 30m Test", focus: "3x flying 30m timed. Best logged." },
          { name: "Mobility + Recovery", focus: "Deload. Notes vs week 1." },
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
          { name: "6x30m RSA", focus: "6x30m sprint, 30s walk recovery. Track drop-off." },
          { name: "Tempo Runs", focus: "8x100m at 70%. Recovery running." },
          { name: "Mobility + Recovery", focus: "Full flow." },
        ],
      },
      {
        week: 2,
        theme: "Increase the reps",
        sessions: [
          { name: "8x30m RSA", focus: "8x30m sprint, 30s walk. Small drop-off target." },
          { name: "Flying 20m", focus: "4x flying 20m for speed base." },
          { name: "Tempo + Mobility", focus: "6x100m at 70% + mobility." },
        ],
      },
      {
        week: 3,
        theme: "Shorter recovery",
        sessions: [
          { name: "6x40m RSA short rest", focus: "6x40m, 25s walk. Hold form when tired." },
          { name: "Flying 30m", focus: "4x flying 30m fresh." },
          { name: "Tempo Runs", focus: "8x100m at 70%." },
        ],
      },
      {
        week: 4,
        theme: "Deload",
        sessions: [
          { name: "3x30m Fresh", focus: "3x30m sprint, full recovery. Quality only." },
          { name: "Tempo Runs", focus: "6x100m at 65%." },
          { name: "Mobility + Recovery", focus: "Full flow." },
        ],
      },
      {
        week: 5,
        theme: "Direction change RSA",
        sessions: [
          { name: "6x(20+20) Shuttle RSA", focus: "6x 20m-out-20m-back, 30s walk. Turn eats the fresh legs." },
          { name: "Flying 20m", focus: "4x flying 20m for peak speed." },
          { name: "Tempo + Mobility", focus: "6x100m + mobility." },
        ],
      },
      {
        week: 6,
        theme: "Test + deload",
        sessions: [
          { name: "RSA Test", focus: "6x30m sprint, 30s walk. Log all times, calc drop-off %." },
          { name: "Flying 30m Test", focus: "3x flying 30m." },
          { name: "Mobility + Recovery", focus: "Deload. Reflect." },
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
          { name: "Strength Day A", focus: "4x5 heavy goblet squat, 4x5 DB press. Own the load.", homeCue: "Loaded bag squat + band press." },
          { name: "Power Day", focus: "4x3 jump squat with light DBs, 3x3 broad jump. Every rep max intent.", homeCue: "Bag jump squats, then broad jumps." },
          { name: "Strength Day B", focus: "4x5 DB row, 4x5 DB RDL." },
        ],
      },
      {
        week: 2,
        theme: "Add the snatch",
        sessions: [
          { name: "Strength Day A", focus: "5x4 goblet squat, 4x5 DB press." },
          { name: "Power Day", focus: "4x3 DB snatch each side, 4x3 broad jump.", homeCue: "Bag high pull + jump squat." },
          { name: "Strength Day B", focus: "5x4 row, 5x4 RDL." },
        ],
      },
      {
        week: 3,
        theme: "Peak load",
        sessions: [
          { name: "Strength Day A", focus: "5x3 heavy goblet squat, 4x4 press." },
          { name: "Power Day", focus: "5x3 jump squat light DBs, 4x2 broad jump for max distance." },
          { name: "Strength Day B", focus: "5x3 row heavy, 5x4 RDL." },
        ],
      },
      {
        week: 4,
        theme: "Deload — speed only",
        sessions: [
          { name: "Strength Rehearsal", focus: "3x5 squat, 3x5 press at 60%." },
          { name: "Power Rehearsal", focus: "3x3 jump squat, 3x3 broad jump. Half volume." },
          { name: "Mobility + Recovery", focus: "Full flow." },
        ],
      },
      {
        week: 5,
        theme: "Combos",
        sessions: [
          { name: "Contrast A", focus: "4x(3 heavy goblet squat + 3 jump squat). Post-activation." },
          { name: "Power Focus", focus: "5x2 broad jump, 5x2 DB snatch. Max output." },
          { name: "Contrast B", focus: "4x(3 heavy row + 3 explosive row). Fast up." },
        ],
      },
      {
        week: 6,
        theme: "Test + deload",
        sessions: [
          { name: "Broad Jump Test", focus: "3x max broad jumps." },
          { name: "Vertical Jump Test", focus: "3x max vertical." },
          { name: "Mobility + Recovery", focus: "Deload. Notes vs week 1." },
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
          { name: "Depth Drops", focus: "4x5 step off low box, stick landing. Ankle-knee-hip stack.", homeCue: "Bottom stair." },
          { name: "Pogo + Hurdle Hops", focus: "3x15 pogos, 3x5 mini-hurdle hops.", homeCue: "Line of cones instead of hurdles." },
          { name: "Rope Work", focus: "5x30s doubles or singles at pace." },
        ],
      },
      {
        week: 2,
        theme: "Depth jumps — rebound",
        sessions: [
          { name: "Depth Jumps", focus: "4x5 step off low box, immediate vertical rebound. Contact under 200ms." },
          { name: "Hurdle Hops", focus: "4x5 continuous hurdle hops." },
          { name: "Rope + Mobility", focus: "5x30s rope + 10 min mobility." },
        ],
      },
      {
        week: 3,
        theme: "Single-leg reactive",
        sessions: [
          { name: "SL Bounds", focus: "3x5 per leg SL bounds over 15m." },
          { name: "SL Hops for Height", focus: "3x5 per leg hops onto low box." },
          { name: "Depth Drops SL", focus: "3x5 per leg SL step-off landings." },
        ],
      },
      {
        week: 4,
        theme: "Deload",
        sessions: [
          { name: "Pogo + Broad Jumps", focus: "3x10 pogos, 3x3 broad jumps at 80%." },
          { name: "Rope Work", focus: "5x30s rope." },
          { name: "Mobility + Recovery", focus: "Calves and ankles. Full flow." },
        ],
      },
      {
        week: 5,
        theme: "Sequences — depth into sprint",
        sessions: [
          { name: "Depth-to-Sprint", focus: "4x(depth drop into 10m sprint). Feel the pop." },
          { name: "Hurdle-to-Broad", focus: "4x(3 hurdle hops into broad jump). Chain." },
          { name: "Rope + Mobility", focus: "Recover well between." },
        ],
      },
      {
        week: 6,
        theme: "Test + deload",
        sessions: [
          { name: "Reactive Strength Test", focus: "3x depth jump — measure rebound height if you can." },
          { name: "Broad Jump Test", focus: "3x max broad jumps." },
          { name: "Mobility + Recovery", focus: "Deload." },
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
          { name: "Decel Drills", focus: "5x20m sprint to full stop in 3 steps." },
          { name: "L-Drill", focus: "4x L-drill at 90%. Log times." },
          { name: "Recovery + Mobility", focus: "Hips + adductors." },
        ],
      },
      {
        week: 2,
        theme: "Add lateral shuffle",
        sessions: [
          { name: "T-Drill", focus: "4x T-drill max. Include shuffle sections clean." },
          { name: "5-10-5 at 90%", focus: "4x 5-10-5. Push the plant." },
          { name: "Mirror Drill", focus: "3x30s partner mirror. Reactive footwork.", homeCue: "Ball against wall works solo." },
        ],
      },
      {
        week: 3,
        theme: "Reactive cues",
        sessions: [
          { name: "Reactive Cuts", focus: "5x accel to cone reaction. Cut on partner point." },
          { name: "L-Drill Max", focus: "4x L-drill max. Best time." },
          { name: "Mirror Drill", focus: "4x30s partner mirror." },
        ],
      },
      {
        week: 4,
        theme: "Deload",
        sessions: [
          { name: "Decel Rehearsal", focus: "3x20m decel drills at 70%." },
          { name: "L-Drill Slow", focus: "3x L-drill at 70%." },
          { name: "Mobility + Recovery", focus: "Full flow." },
        ],
      },
      {
        week: 5,
        theme: "Under fatigue",
        sessions: [
          { name: "5-10-5 Circuits", focus: "3x(3x 5-10-5). Short rest between reps in a set." },
          { name: "Reactive + Ball", focus: "5x accel-cut-receive with a ball at cone." },
          { name: "T-Drill Repeat", focus: "4x T-drill max effort." },
        ],
      },
      {
        week: 6,
        theme: "Test + deload",
        sessions: [
          { name: "5-10-5 Test", focus: "3x 5-10-5 max. Best logged." },
          { name: "L-Drill Test", focus: "3x L-drill max. Best logged." },
          { name: "Mobility + Recovery", focus: "Deload." },
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
          { name: "Rotational Throws", focus: "4x5 per side rotational med ball throw into wall.", homeCue: "Football thrown two-handed sideways into wall." },
          { name: "DB Woodchop", focus: "3x8 per side DB woodchop.", homeCue: "Band woodchop anchored high." },
          { name: "Core + Mobility", focus: "Deadbugs, T-spine rotations." },
        ],
      },
      {
        week: 2,
        theme: "Add speed",
        sessions: [
          { name: "Rotational Throws", focus: "5x4 per side, max intent." },
          { name: "Split-Stance Chop", focus: "3x6 per side split-stance woodchop." },
          { name: "Core + Mobility", focus: "Rotational core work." },
        ],
      },
      {
        week: 3,
        theme: "Feet in the sequence",
        sessions: [
          { name: "Step-Behind Throws", focus: "4x4 per side rotational throw with step-behind footwork." },
          { name: "Kettlebell Swing", focus: "4x6 KB swing OR heavy DB swing. Explosive hip drive.", homeCue: "Band-resisted hip drives." },
          { name: "Core + Mobility", focus: "T-spine, adductors." },
        ],
      },
      {
        week: 4,
        theme: "Deload",
        sessions: [
          { name: "Throws Light", focus: "3x5 rotational throws at 70%. Feel the sequence." },
          { name: "Chops Light", focus: "3x8 woodchop with lighter load." },
          { name: "Mobility + Recovery", focus: "Full flow." },
        ],
      },
      {
        week: 5,
        theme: "Contrast with sprints",
        sessions: [
          { name: "Throw + Sprint", focus: "4x(3 rotational throws + 10m sprint). Post-activation." },
          { name: "Chop + Cut", focus: "3x(6 chops + 3 accel cuts). Rotation feeds cut." },
          { name: "Core + Mobility", focus: "Full flow." },
        ],
      },
      {
        week: 6,
        theme: "Test + deload",
        sessions: [
          { name: "Med Ball Throw Test", focus: "3x max rotational throw for distance." },
          { name: "Broad Jump Test", focus: "3x max broad jump (rotation carries)." },
          { name: "Mobility + Recovery", focus: "Deload." },
        ],
      },
    ],
  },
];
