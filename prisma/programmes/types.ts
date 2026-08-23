import type { AgeBand, Quality } from "@prisma/client";

export type ProgrammeSession = {
  name: string;
  focus: string;
  gymCue?: string;
  homeCue?: string;
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
