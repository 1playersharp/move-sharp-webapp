import { U13_15_PROGRAMMES } from "./u13-15";
import { U16_18_PROGRAMMES } from "./u16-18";
import { CROSSOVER_PROGRAMMES } from "./crossover";
import type { ProgrammeSeed } from "./types";

export const ALL_PROGRAMMES: ProgrammeSeed[] = [
  ...U13_15_PROGRAMMES,
  ...U16_18_PROGRAMMES,
  ...CROSSOVER_PROGRAMMES,
];
