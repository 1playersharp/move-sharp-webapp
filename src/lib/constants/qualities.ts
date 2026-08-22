export type QualityKey =
  | "speed"
  | "power"
  | "strength"
  | "agility"
  | "endurance"
  | "robustness";

export const QUALITIES: Array<{
  key: QualityKey;
  label: string;
  blurb: string;
}> = [
  { key: "speed", label: "Speed", blurb: "Top-end sprint" },
  { key: "power", label: "Power", blurb: "Jump and launch" },
  { key: "strength", label: "Strength", blurb: "Base you build on" },
  { key: "agility", label: "Agility", blurb: "Cuts and turns" },
  { key: "endurance", label: "Endurance", blurb: "Repeat efforts" },
  { key: "robustness", label: "Robustness", blurb: "Stay on the pitch" },
];
