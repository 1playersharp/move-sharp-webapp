import type { AgeBand } from "@prisma/client";

// Age boundary: U16 starts the season they turn 16.
// For v1 we use a simple age-in-years split at 16.
export function ageBandFromDOB(dob: Date, now: Date = new Date()): AgeBand {
  const years = ageInYears(dob, now);
  return years >= 16 ? "U16_U18" : "U13_U15";
}

export function ageInYears(dob: Date, now: Date = new Date()): number {
  let years = now.getFullYear() - dob.getFullYear();
  const beforeBirthday =
    now.getMonth() < dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate());
  if (beforeBirthday) years -= 1;
  return years;
}

export function isEligibleAge(dob: Date, now: Date = new Date()): boolean {
  const years = ageInYears(dob, now);
  return years >= 13 && years <= 18;
}
