import * as React from "react";
import { WordMark } from "@/components/ui/Header";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-sm flex-col px-6 pt-[max(3rem,env(safe-area-inset-top))] pb-8">
      <div className="mb-8 flex items-center justify-center">
        <WordMark />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
