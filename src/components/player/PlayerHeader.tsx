import Link from "next/link";
import type { TrainingContext } from "@prisma/client";
import { cn } from "@/lib/cn";
import { PlayerAvatar } from "./PlayerAvatar";

// One component, two variants, three layouts.
//
// `full`    — dashboard only. Vertical stack on mobile; the SAME markup
//             reflows horizontally at md. The desktop treatment is a
//             responsive variation of `full`, not a third component.
// `compact` — a single horizontal pill for other authenticated screens.
//
// Kept free of MoveSharp-specific imports beyond the design tokens so it
// can move to PlaySharp behind the same props. The "Start" control takes
// either a server action (posts) or falls back to a link, so the host app
// decides how a session actually begins.
//
// NOT here, deliberately: position, streaks/points/levels/badges, any
// comparison to other players, surname, anything body-related. See the
// product rules — this app is used by minors.

type NextSession = {
  name: string;
  durationMin?: number;
  equipment?: string;
  href: string;
  templateId?: string;
};

type Programme = {
  name: string;
  sessionsCompleted: number;
  sessionsTotal: number;
  currentWeek?: number;
};

type Props = {
  variant?: "full" | "compact";
  firstName: string;
  avatarId?: string | null;
  trainingContext?: TrainingContext;
  programme?: Programme;
  nextSession?: NextSession;
  // When provided together with nextSession.templateId, Start submits to
  // this action. Otherwise Start is a link to nextSession.href.
  startAction?: (formData: FormData) => void | Promise<void>;
  chooseProgrammeHref?: string;
  className?: string;
};

function trackLabel(ctx?: TrainingContext): string | null {
  if (!ctx) return null;
  return ctx === "gym" ? "Gym track" : "Home track";
}

export function PlayerHeader({
  variant = "full",
  firstName,
  avatarId = null,
  trainingContext,
  programme,
  nextSession,
  startAction,
  chooseProgrammeHref = "/train",
  className,
}: Props) {
  const total = programme?.sessionsTotal ?? 0;
  const done = Math.min(programme?.sessionsCompleted ?? 0, total);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const complete = total > 0 && done >= total;

  // ---------------------------------------------------------------- compact
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-full border border-white/10 bg-ink-850 px-3 py-2",
          className,
        )}
      >
        <PlayerAvatar avatarId={avatarId} firstName={firstName} size={34} />
        <span className="min-w-0 truncate font-display uppercase tracking-display text-white text-sm">
          {firstName}
        </span>
        {programme ? (
          <>
            <ProgressBar
              done={done}
              total={total}
              pct={pct}
              label={`${programme.name} progress`}
              className="h-1.5 min-w-0 flex-1"
            />
            {/* The count repeats what the bar shows, so progress is never
                carried by colour alone. */}
            <span className="shrink-0 font-display uppercase tracking-display text-[0.7rem] tabular-nums text-completion-400">
              {done} / {total}
            </span>
          </>
        ) : null}
      </div>
    );
  }

  // ------------------------------------------------------------------- full
  return (
    <section
      aria-label="Your progress"
      className={cn(
        "rounded-card border border-white/10 bg-ink-850 shadow-card",
        "md:flex md:items-stretch",
        className,
      )}
    >
      {/* Identity */}
      <div className="flex items-center gap-3 p-3 md:w-56 md:shrink-0 md:p-4">
        <PlayerAvatar avatarId={avatarId} firstName={firstName} size={52} />
        <div className="min-w-0">
          <p className="truncate font-display uppercase tracking-display text-white text-[1.45rem] leading-none">
            {firstName}
          </p>
          <p className="mt-1 truncate text-xs text-muted-strong">
            {[
              programme?.currentWeek ? `Week ${programme.currentWeek}` : null,
              trackLabel(trainingContext),
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </div>

      {programme ? (
        <>
          {/* Progress */}
          <div className="px-3 pb-2.5 md:flex md:flex-1 md:flex-col md:justify-center md:px-5 md:py-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="min-w-0 truncate text-sm text-white/90">
                {programme.name}
              </p>
              <p className="shrink-0 font-display uppercase tracking-display text-sm tabular-nums text-completion-400">
                {done} / {total}
              </p>
            </div>
            <ProgressBar
              done={done}
              total={total}
              pct={pct}
              label={`${programme.name} progress`}
              className="mt-2 h-1.5"
            />
          </div>

          {/* Next session — above a top border on mobile, behind a left
              border on desktop, so it reads as an action not more status. */}
          <div className="border-t border-white/10 p-3 md:w-64 md:shrink-0 md:border-l md:border-t-0 md:p-4">
            {complete ? (
              <>
                <p className="font-display uppercase tracking-display text-[0.65rem] text-completion-400">
                  Programme complete
                </p>
                <p className="mt-1 text-sm text-white">Start your next block.</p>
                <Link
                  href={chooseProgrammeHref}
                  className="mt-3 inline-flex h-9 items-center rounded-full bg-brand px-4 font-display uppercase tracking-display text-xs text-ink-950 hover:bg-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink-850"
                >
                  Choose a programme
                </Link>
              </>
            ) : nextSession ? (
              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display uppercase tracking-display text-[0.65rem] text-brand-400">
                    Next session
                  </p>
                  <p className="mt-1 truncate text-sm text-white">
                    {nextSession.name}
                  </p>
                  {nextSession.durationMin || nextSession.equipment ? (
                    <p className="mt-0.5 truncate text-[0.7rem] text-muted-strong">
                      {[
                        nextSession.durationMin
                          ? `${nextSession.durationMin} min`
                          : null,
                        nextSession.equipment,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  ) : null}
                </div>
                <StartControl
                  nextSession={nextSession}
                  startAction={startAction}
                />
              </div>
            ) : (
              <>
                <p className="font-display uppercase tracking-display text-[0.65rem] text-brand-400">
                  Next session
                </p>
                <p className="mt-1 text-sm text-muted-strong">
                  Nothing scheduled yet.
                </p>
              </>
            )}
          </div>
        </>
      ) : (
        // No programme started — progress and next-session collapse into a
        // single call to action.
        <div className="border-t border-white/10 p-4 md:flex md:flex-1 md:items-center md:justify-between md:gap-4 md:border-l md:border-t-0">
          <p className="text-sm text-muted-strong">
            No programme yet — pick one and your progress shows up here.
          </p>
          <Link
            href={chooseProgrammeHref}
            className="mt-3 inline-flex h-9 shrink-0 items-center rounded-full bg-brand px-4 font-display uppercase tracking-display text-xs text-ink-950 hover:bg-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink-850 md:mt-0"
          >
            Choose a programme
          </Link>
        </div>
      )}
    </section>
  );
}

function StartControl({
  nextSession,
  startAction,
}: {
  nextSession: NextSession;
  startAction?: (formData: FormData) => void | Promise<void>;
}) {
  const classes =
    "inline-flex h-9 shrink-0 items-center rounded-full bg-brand px-4 font-display uppercase tracking-display text-xs text-ink-950 hover:bg-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink-850";

  if (startAction && nextSession.templateId) {
    return (
      <form action={startAction} className="shrink-0">
        <input
          type="hidden"
          name="sessionTemplateId"
          value={nextSession.templateId}
        />
        <button type="submit" className={classes}>
          Start
        </button>
      </form>
    );
  }

  return (
    <Link href={nextSession.href} className={classes}>
      Start
    </Link>
  );
}

function ProgressBar({
  done,
  total,
  pct,
  label,
  className,
}: {
  done: number;
  total: number;
  pct: number;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="progressbar"
      aria-valuenow={done}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={label}
      aria-valuetext={`${done} of ${total} sessions complete`}
      className={cn("w-full overflow-hidden rounded-full bg-white/10", className)}
    >
      <div
        className="h-full rounded-full bg-completion transition-[width]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// Skeleton matching the final layout's dimensions so nothing shifts when
// data arrives. No spinner, by design.
export function PlayerHeaderSkeleton({
  variant = "full",
  className,
}: {
  variant?: "full" | "compact";
  className?: string;
}) {
  if (variant === "compact") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "flex items-center gap-3 rounded-full border border-white/10 bg-ink-850 px-3 py-2",
          className,
        )}
      >
        <div className="h-[34px] w-[34px] shrink-0 rounded-full bg-white/10" />
        <div className="h-4 w-20 rounded bg-white/10" />
        <div className="h-1.5 min-w-0 flex-1 rounded-full bg-white/10" />
        <div className="h-4 w-10 shrink-0 rounded bg-white/10" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-card border border-white/10 bg-ink-850 shadow-card md:flex md:items-stretch",
        className,
      )}
    >
      <div className="flex items-center gap-3 p-3 md:w-56 md:shrink-0 md:p-4">
        <div className="h-[52px] w-[52px] shrink-0 rounded-full bg-white/10" />
        <div className="min-w-0 flex-1">
          <div className="h-5 w-24 rounded bg-white/10" />
          <div className="mt-2 h-3 w-32 rounded bg-white/10" />
        </div>
      </div>
      <div className="px-3 pb-2.5 md:flex md:flex-1 md:flex-col md:justify-center md:px-5 md:py-4">
        <div className="flex items-baseline justify-between gap-3">
          <div className="h-4 w-40 rounded bg-white/10" />
          <div className="h-4 w-12 rounded bg-white/10" />
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-white/10" />
      </div>
      <div className="border-t border-white/10 p-3 md:w-64 md:shrink-0 md:border-l md:border-t-0 md:p-4">
        <div className="h-3 w-20 rounded bg-white/10" />
        <div className="mt-2 h-4 w-36 rounded bg-white/10" />
        <div className="mt-1.5 h-3 w-24 rounded bg-white/10" />
      </div>
    </div>
  );
}
