"use client";

import { useState } from "react";
import { joinTeamByCode } from "@/app/actions/team";

// Client-gated join form. For over-16 players it's a straight "Join
// team" button. For under-16 players there's an additional
// parent-ack checkbox which must be ticked before the button
// unlocks. The server action re-validates the same checkbox so a
// crafted request can't skip the friction.

type Props = {
  code: string;
  isUnder16: boolean;
};

export function JoinTeamForm({ code, isUnder16 }: Props) {
  const [parentAck, setParentAck] = useState(false);
  const canJoin = !isUnder16 || parentAck;

  return (
    <form action={joinTeamByCode} className="space-y-4">
      <input type="hidden" name="code" value={code} />

      {isUnder16 ? (
        <label
          htmlFor="parentAck"
          className="flex cursor-pointer items-start gap-3 rounded-md border border-white/10 bg-ink-900/60 p-4 hover:border-brand/40 has-[:checked]:border-brand has-[:checked]:bg-brand/10"
        >
          <input
            id="parentAck"
            name="parentAck"
            type="checkbox"
            checked={parentAck}
            onChange={(e) => setParentAck(e.target.checked)}
            className="mt-0.5 h-5 w-5 accent-brand"
          />
          <span className="text-sm text-white">
            A parent has read this with me and agrees to me joining this team.
          </span>
        </label>
      ) : null}

      <button
        type="submit"
        disabled={!canJoin}
        className={`inline-flex h-12 w-full items-center justify-center rounded-full px-6 font-display uppercase tracking-display text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${
          canJoin
            ? "bg-brand text-ink-950 hover:bg-brand-400"
            : "cursor-not-allowed bg-brand/20 text-brand-400/50"
        }`}
      >
        Join team
      </button>
    </form>
  );
}
