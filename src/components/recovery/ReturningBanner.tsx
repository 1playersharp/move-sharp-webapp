// Persistent banner shown on every screen inside the Returning-from-
// injury flow. Not dismissable. Red-tinted so it registers as a
// warning, but professional in tone.

export function ReturningBanner() {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="sticky top-0 z-40 border-b border-caution-500/40 bg-caution-500/10 backdrop-blur"
    >
      <div className="mx-auto max-w-2xl px-5 py-2.5">
        <p className="text-center text-[0.7rem] text-caution-100">
          <span className="font-display uppercase tracking-display text-caution-300">
            Returning from injury
          </span>{" "}
          · Cleared by a professional · Stop any drill on new pain.
        </p>
      </div>
    </div>
  );
}
