"use client";

import { useState } from "react";
import { deleteCustomProgramme } from "@/app/actions/programmes";

type Props = {
  id: string;
  programmeName: string;
  // "full" = big red button on the detail page.
  // "icon" = small × in the corner of the strip card.
  variant: "full" | "icon";
};

export function DeleteProgrammeConfirm({ id, programmeName, variant }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [text, setText] = useState("");
  const canDelete = text.trim().toLowerCase() === "delete";

  if (!confirming) {
    if (variant === "icon") {
      return (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          aria-label={`Delete ${programmeName}`}
          className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-caution-500/10 hover:text-caution-300"
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="w-full rounded-md border border-caution-500/30 bg-caution-500/5 py-3 font-display uppercase tracking-display text-xs text-caution-300 hover:border-caution-500/60 hover:bg-caution-500/10 hover:text-caution-200"
      >
        Delete this programme
      </button>
    );
  }

  return (
    <form
      action={deleteCustomProgramme}
      className="w-full space-y-3 rounded-md border border-caution-500/40 bg-caution-500/5 p-4"
    >
      <input type="hidden" name="id" value={id} />
      <p className="text-sm text-caution-200">
        Deleting{" "}
        <span className="font-semibold text-white">{programmeName}</span> is
        permanent. Type{" "}
        <span className="font-display uppercase tracking-display text-caution-300">
          delete
        </span>{" "}
        below to confirm.
      </p>
      <input
        type="text"
        name="confirm"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
        placeholder="delete"
        autoComplete="off"
        className="w-full rounded-md border border-caution-500/30 bg-ink-900 px-3 py-2 text-sm text-white placeholder:text-caution-400/40 focus:border-caution-500 focus:outline-none"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setConfirming(false);
            setText("");
          }}
          className="flex-1 rounded-md border border-white/10 py-2 font-display uppercase tracking-display text-xs text-muted hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!canDelete}
          className={`flex-1 rounded-md py-2 font-display uppercase tracking-display text-xs ${
            canDelete
              ? "bg-caution-500 text-white hover:bg-caution-600"
              : "cursor-not-allowed bg-caution-500/20 text-caution-400/40"
          }`}
        >
          Delete
        </button>
      </div>
    </form>
  );
}
