// A frozen preview of one real training session. Exercise names,
// coaching cues, and default prescriptions are pulled verbatim from
// prisma/exercises.ts (the seeded bank) so what a visitor sees is
// exactly what an onboarded player gets — nothing invented. Kept
// hardcoded so /preview works without a database and without auth.

export type PreviewItem = {
  name: string;
  prescription: string;
  cue: string;
  // Not every bank exercise has a 3D pilot; the preview page renders
  // a "3D coach demo" chip only where pilotAvailable is true.
  pilotAvailable: boolean;
};

export type PreviewBlock = {
  heading: string;
  intent: string;
  items: PreviewItem[];
};

export type PreviewSession = {
  name: string;
  quality: string;
  context: "Home" | "Gym";
  approxMinutes: number;
  intent: string;
  blocks: PreviewBlock[];
};

// Speed & Acceleration — Session A, home-equipment track. Mirrors
// Week 1 Day 1 of the seeded "First-Step Acceleration" U13 programme.
export const PREVIEW_SESSION: PreviewSession = {
  name: "Shape the start — Session A",
  quality: "Speed & Acceleration",
  context: "Home",
  approxMinutes: 30,
  intent:
    "Own the first three yards. Teaches shin angle and posture before it teaches speed.",
  blocks: [
    {
      heading: "Warm-up",
      intent: "Ten minutes to loosen the ankles, hips and calves and rehearse the pattern.",
      items: [
        {
          name: "Mobility Flow",
          prescription: "10 min",
          cue: "Breath-led. Slow beats fast every time.",
          pilotAvailable: false,
        },
        {
          name: "Wall Drives",
          prescription: "3 × 10 marches per side",
          cue: "Long back leg, driving knee horizontal. Own the shin angle.",
          pilotAvailable: true,
        },
      ],
    },
    {
      heading: "Main",
      intent: "The block that changes the athlete. Every rep max intent, full recovery.",
      items: [
        {
          name: "Falling Starts",
          prescription: "4 × 10m starts",
          cue: "Trigger foot behind hips. Fall before you push.",
          pilotAvailable: false,
        },
        {
          name: "A-Skip",
          prescription: "3 × 20m",
          cue: "Knee up, toe up, ball of the foot down under the hip.",
          pilotAvailable: true,
        },
        {
          name: "Broad Jump + Stick",
          prescription: "4 × 3 broad jumps",
          cue: "Arms load back, then forward. Stick the landing 2 seconds.",
          pilotAvailable: true,
        },
      ],
    },
    {
      heading: "Cool-down",
      intent: "Bring the system back down. Log how it felt.",
      items: [
        {
          name: "Snap-Down Landing",
          prescription: "3 × 6 snap-downs from tall stance",
          cue: "Ankle-knee-hip stack. Freeze the landing.",
          pilotAvailable: true,
        },
      ],
    },
  ],
};
