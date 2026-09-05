"use client";

import Link from "next/link";
import { useState } from "react";
import { acknowledgeRecoveryConsent } from "@/app/actions/recovery";

type Props = {
  slug: string;
  sessionName: string;
  isUnder16: boolean;
};

// Interstitial shown when a player tries to enter a specific
// Returning-from-injury session and no consent from the last 30
// minutes exists. Cannot be dismissed by tapping outside — the parent
// route renders THIS in place of the session content until it's
// acknowledged.
//
// Single checkbox ack. "Enter session" disabled until ticked; server
// action also enforces the same on submit (defence in depth).

export function RecoveryDisclaimer({ slug, sessionName, isUnder16 }: Props) {
  const [cleared, setCleared] = useState(false);

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 sm:py-14">
      <p className="font-display uppercase tracking-display text-caution-300 text-xs">
        Returning from injury
      </p>
      <h1 className="mt-2 font-display uppercase tracking-display text-white text-3xl leading-[1.1] sm:text-4xl">
        Returning from injury.
      </h1>
      <p className="mt-3 text-sm text-muted-strong">
        Before you enter <span className="text-white">{sessionName}</span>.
      </p>

      <div className="mt-8 space-y-4 rounded-card border border-caution-500/25 bg-caution-500/5 p-5 text-sm text-white/90 leading-relaxed">
        <p>
          MoveSharp is a training tool, not a rehabilitation tool. It cannot
          diagnose, treat, or determine whether you are ready to train again.
        </p>
        <p>
          Before using any programme in this section, you must have been
          cleared to return to training by a qualified professional — a
          physiotherapist, a doctor, or an academy sports scientist.
        </p>
        <p>
          If during any drill you feel new pain, sharp pain, or the injured
          area giving way, stop the session immediately and contact the
          professional who cleared you.
        </p>
        {isUnder16 ? (
          <p className="rounded-md border border-caution-500/30 bg-caution-500/10 px-3 py-2 text-white">
            If you are under 16, a parent should read this page with you
            before you continue.
          </p>
        ) : null}
      </div>

      <form action={acknowledgeRecoveryConsent} className="mt-8 space-y-6">
        <input type="hidden" name="slug" value={slug} />

        <label
          htmlFor="cleared"
          className="flex cursor-pointer items-start gap-3 rounded-md border border-white/10 bg-ink-900/60 p-4 hover:border-brand/40 has-[:checked]:border-brand has-[:checked]:bg-brand/10"
        >
          <input
            id="cleared"
            name="cleared"
            type="checkbox"
            checked={cleared}
            onChange={(e) => setCleared(e.target.checked)}
            className="mt-0.5 h-5 w-5 accent-brand"
          />
          <span className="text-sm text-white">
            I've been cleared by a qualified professional to return to
            training.
          </span>
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={!cleared}
            className={`inline-flex h-12 flex-1 items-center justify-center rounded-full px-6 font-display uppercase tracking-display text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${
              cleared
                ? "bg-brand text-ink-950 hover:bg-brand-400"
                : "cursor-not-allowed bg-brand/20 text-brand-400/50"
            }`}
          >
            Enter session
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-6 font-display uppercase tracking-display text-sm text-white hover:border-white/50 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            Not cleared yet? Back to Home
          </Link>
        </div>
      </form>

      <p className="mt-8 text-xs text-muted">
        Report a concern:{" "}
        <a
          href="mailto:hello@movesharp.app"
          className="text-brand-400 underline underline-offset-4 hover:text-brand"
        >
          hello@movesharp.app
        </a>
      </p>
    </div>
  );
}
