import type { AgeBand, Quality } from "@prisma/client";

export type ProgrammeSession = {
  name: string;
  focus: string;
  gymCue?: string;
  homeCue?: string;
  // Slugs into the Exercise bank. Renders as a linked list on the
  // programme detail page. Every slug must exist in prisma/exercises.ts.
  exerciseSlugs?: string[];
};

export type ProgrammeWeek = {
  week: number;
  theme: string;
  sessions: ProgrammeSession[];
};

export type ProgrammeSeed = {
  slug: string;
  name: string;
  description: string;
  intent: string;
  ageBands: AgeBand[];
  qualities: Quality[];
  weeks: number;
  sessionsPerWeek: number;
  equipmentGym: string;
  equipmentHome: string;
  curriculum: ProgrammeWeek[];
};
