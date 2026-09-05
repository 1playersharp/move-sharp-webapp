import * as React from "react";
import { BottomNav } from "@/components/ui/BottomNav";
import { DEV_BYPASS } from "@/lib/dev-bypass";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell-width flex min-h-dvh flex-col">
      {DEV_BYPASS ? (
        <div className="border-b border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-center text-[0.7rem] uppercase tracking-display font-display text-yellow-300">
          Dev bypass — no real sign-in
        </div>
      ) : null}
      <main className="flex-1 pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
