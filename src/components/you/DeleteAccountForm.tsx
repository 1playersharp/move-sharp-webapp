"use client";

import { useState } from "react";
import { deleteAccount } from "@/app/actions/profile";

// Typed "delete" confirmation for permanent account removal. Mirrors
// the DeleteProgrammeConfirm pattern already used for custom
// programmes — client gates the submit button, and the server action
// re-validates the string so a crafted request can't skip it.

export function DeleteAccountForm() {
  const [text, setText] = useState("");
  const canDelete = text.trim().toLowerCase() === "delete";

  return (
    <form action={deleteAccount} className="space-y-4">
      <label htmlFor="confirm" className="block text-sm text-white">
        To confirm, type{" "}
        <span className="font-display uppercase tracking-display text-caution-300">
          delete
        </span>{" "}
        below.
      </label>
      <input
        id="confirm"
        name="confirm"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
        autoComplete="off"
        placeholder="delete"
        aria-describedby="confirm-help"
        className="w-full rounded-md border border-caution-500/30 bg-ink-900 px-4 py-3 text-base text-white placeholder:text-caution-400/40 focus:border-caution-500 focus:outline-none"
      />
      <p id="confirm-help" className="text-xs text-muted">
        The button below unlocks once you type the word exactly.
      </p>

      <button
        type="submit"
        disabled={!canDelete}
        className={`inline-flex h-12 w-full items-center justify-center rounded-full px-6 font-display uppercase tracking-display text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caution-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${
          canDelete
            ? "bg-caution-500 text-white hover:bg-caution-600"
            : "cursor-not-allowed bg-caution-500/20 text-caution-400/40"
        }`}
      >
        Delete my account
      </button>
    </form>
  );
}
