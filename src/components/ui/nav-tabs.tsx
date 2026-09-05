import * as React from "react";

// One definition of the primary navigation, shared by the mobile bottom bar
// and the desktop side rail. They are two presentations of the same thing —
// keeping the tab list in each is how they drift out of step.

export type Tab = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export const PLAYER_TABS: Tab[] = [
  { href: "/", label: "Home", icon: <IconHome /> },
  { href: "/train", label: "Train", icon: <IconTrain /> },
  { href: "/quiz", label: "Quiz", icon: <IconQuiz /> },
  { href: "/progress", label: "Progress", icon: <IconProgress /> },
  { href: "/fuel", label: "Fuel", icon: <IconFuel /> },
  { href: "/recovery", label: "Recovery", icon: <IconRecovery /> },
  { href: "/you", label: "You", icon: <IconYou /> },
];

// Deliberately short — a coach doesn't need Train / Fuel / Recovery /
// Progress; those are player surfaces.
export const COACH_TABS: Tab[] = [
  { href: "/coach", label: "Home", icon: <IconHome /> },
  { href: "/coach/teams", label: "Teams", icon: <IconTeams /> },
  { href: "/coach/you", label: "You", icon: <IconYou /> },
];

// A tab is active on exact match for the section root, prefix match below it.
export function isTabActive(pathname: string, href: string, root: string): boolean {
  return href === root ? pathname === root : pathname.startsWith(href);
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
      <path d="M10 19v-5h4v5" />
    </svg>
  );
}

function IconTrain() {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M4 12h2l2-4 4 8 4-8 2 4h2" />
    </svg>
  );
}

function IconQuiz() {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M9 9a3 3 0 1 1 4.5 2.6c-1 .6-1.5 1.2-1.5 2.4" />
      <circle cx="12" cy="17.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconProgress() {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M4 20V6" />
      <path d="M10 20v-8" />
      <path d="M16 20v-4" />
      <path d="M22 20H2" />
    </svg>
  );
}

function IconFuel() {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M12 3s5 5.5 5 10a5 5 0 1 1-10 0c0-4.5 5-10 5-10Z" />
    </svg>
  );
}

function IconRecovery() {
  // Cross-in-shield motif: recovery + safety, not medical-red-cross.
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
      <path d="M12 9v6" />
      <path d="M9 12h6" />
    </svg>
  );
}

function IconYou() {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.5-3.5 4.5-5 7.5-5s6 1.5 7.5 5" />
    </svg>
  );
}

function IconTeams() {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <circle cx="8.5" cy="8" r="3" />
      <circle cx="15.5" cy="8" r="3" />
      <path d="M3.5 19c1-3 3-4.5 5-4.5s4 1.5 5 4.5" />
      <path d="M10.5 19c1-3 3-4.5 5-4.5s4 1.5 5 4.5" />
    </svg>
  );
}
