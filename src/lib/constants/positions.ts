import type { Position } from "@prisma/client";

export const POSITIONS: Array<{ key: Position; label: string }> = [
  { key: "goalkeeper", label: "Goalkeeper" },
  { key: "right_back", label: "Right back" },
  { key: "left_back", label: "Left back" },
  { key: "centre_back", label: "Centre back" },
  { key: "defensive_mid", label: "Defensive mid" },
  { key: "central_mid", label: "Central mid" },
  { key: "attacking_mid", label: "Attacking mid" },
  { key: "right_wing", label: "Right wing" },
  { key: "left_wing", label: "Left wing" },
  { key: "striker", label: "Striker" },
];
