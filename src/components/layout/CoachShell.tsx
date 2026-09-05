import * as React from "react";
import { CoachBottomNav } from "@/components/ui/CoachBottomNav";
import { SideNav } from "@/components/ui/SideNav";
import { COACH_TABS } from "@/components/ui/nav-tabs";
import { DEV_BYPASS } from "@/lib/dev-bypass";

// Distinct shell for manager (coach) accounts. Different nav so a coach
// doesn't see Train / Fuel / Recovery / Progress — those are player-training
// surfaces, not manager surfaces. Same responsive shape as AppShell: bottom
// bar on mobile, left rail from lg up.

export function CoachShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh lg:pl-60">
      <SideNav tabs={COACH_TABS} root="/coach" />
      <div className="shell-width flex min-h-dvh flex-col">
        {DEV_BYPASS ? (
          <div className="border-b border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-center text-[0.7rem] uppercase tracking-display font-display text-yellow-300">
            Dev bypass — no real sign-in
          </div>
        ) : null}
        <main className="flex-1 pb-24 lg:pb-10">{children}</main>
      </div>
      <CoachBottomNav />
    </div>
  );
}
