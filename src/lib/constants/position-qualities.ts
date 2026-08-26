import type { Position, Quality } from "@prisma/client";

// Three recommended qualities per position — the demands that show up
// most in match data / positional physio literature for youth football.
// Order matters: the first listed is the strongest bias.
//
//   GK           Power · Agility · Robustness      explosive dives, quick footwork, hits the deck
//   CB           Strength · Power · Robustness     aerial duels, contact, staying whole
//   FB (L/R)     Speed · Endurance · Agility       overlap + track back all game
//   DM           Strength · Endurance · Robustness win tackles, cover ground, absorb contact
//   CM           Endurance · Robustness · Strength box-to-box workload
//   AM           Agility · Speed · Power           quick changes, one-touch bursts
//   Winger       Speed · Agility · Power           beat the fullback
//   Striker      Power · Speed · Strength          finish, hold off, first-step
export const POSITION_QUALITIES: Record<Position, Quality[]> = {
  goalkeeper: ["power", "agility", "robustness"],
  right_back: ["speed", "endurance", "agility"],
  left_back: ["speed", "endurance", "agility"],
  centre_back: ["strength", "power", "robustness"],
  defensive_mid: ["strength", "endurance", "robustness"],
  central_mid: ["endurance", "robustness", "strength"],
  attacking_mid: ["agility", "speed", "power"],
  right_wing: ["speed", "agility", "power"],
  left_wing: ["speed", "agility", "power"],
  striker: ["power", "speed", "strength"],
};

const QUALITY_LABEL: Record<Quality, string> = {
  speed: "Speed",
  power: "Power",
  strength: "Strength",
  agility: "Agility",
  endurance: "Endurance",
  robustness: "Robustness",
};

export function recommendedQualitiesFor(position: Position | null): Quality[] {
  if (!position) return [];
  return POSITION_QUALITIES[position] ?? [];
}

export function formatQualityList(qs: Quality[]): string {
  return qs.map((q) => QUALITY_LABEL[q]).join(" · ");
}
