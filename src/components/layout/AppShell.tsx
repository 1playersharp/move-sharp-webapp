import * as React from "react";
import { BottomNav } from "@/components/ui/BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col">
      <main className="flex-1 pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
