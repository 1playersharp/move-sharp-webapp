import * as React from "react";
import { BottomNav } from "@/components/ui/BottomNav";
import { SideNav } from "@/components/ui/SideNav";
import { PLAYER_TABS } from "@/components/ui/nav-tabs";
import { DEV_BYPASS } from "@/lib/dev-bypass";

// Below lg the app is a phone column with a bottom tab bar. From lg up the
// tabs move to a fixed 240px left rail and the content is offset past it,
// then capped and centred by .shell-width so lines never run long on a wide
// monitor. See globals.css for the widths.

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh lg:pl-60">
      <SideNav tabs={PLAYER_TABS} root="/" />
      <div className="shell-width flex min-h-dvh flex-col">
        {DEV_BYPASS ? (
          <div className="border-b border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-center text-[0.7rem] uppercase tracking-display font-display text-yellow-300">
            Dev bypass — no real sign-in
          </div>
        ) : null}
        <main className="flex-1 pb-24 lg:pb-10">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
