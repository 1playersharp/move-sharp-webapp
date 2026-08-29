import * as React from "react";
import { CoachBottomNav } from "@/components/ui/CoachBottomNav";
import { DEV_BYPASS } from "@/lib/dev-bypass";

// Distinct shell for manager (coach) accounts. Different bottom nav
// so a coach doesn't see Train / Fuel / Recovery / Progress — those
// are player-training surfaces, not manager surfaces.

export function CoachShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col">
      {DEV_BYPASS ? (
        <div className="border-b border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-center text-[0.7rem] uppercase tracking-display font-display text-yellow-300">
          Dev bypass — no real sign-in
        </div>
      ) : null}
      <main className="flex-1 pb-24">{children}</main>
      <CoachBottomNav />
    </div>
  );
}
