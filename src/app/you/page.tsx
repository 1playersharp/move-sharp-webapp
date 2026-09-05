import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ageInYears, ageBandFromDOB } from "@/lib/age-band";
import { POSITIONS } from "@/lib/constants/positions";
import { signOut } from "@/app/(auth)/actions";
import { updateTrainingContext } from "@/app/actions/profile";

const AGE_BAND_LABEL: Record<"U13_U15" | "U16_U18", string> = {
  U13_U15: "U13-U15",
  U16_U18: "U16-U18",
};

const DIET_LABEL: Record<string, string> = {
  omnivore: "Omnivore",
  pescatarian: "Pescatarian",
  vegetarian: "Vegetarian",
  vegan: "Vegan",
};

type Props = {
  searchParams: Promise<{ saved?: string }>;
};

export default async function YouPage({ searchParams }: Props) {
  const user = await requirePlayer();
  const player = user.player;
  const { saved } = await searchParams;

  const positionLabel =
    player.position ? POSITIONS.find((p) => p.key === player.position)?.label : null;
  const age = ageInYears(player.dateOfBirth);
  const band = AGE_BAND_LABEL[ageBandFromDOB(player.dateOfBirth)];
  const teamCount = await prisma.teamMembership.count({
    where: { userId: user.id, role: "player" },
  });

  const savedLabel: Record<string, string> = {
    profile: "Profile saved.",
    diet: "Diet and allergies saved.",
    context: "Training context updated.",
  };

  return (
    <AppShell>
      <Header title="You" subtitle={user.email ?? undefined} />

      <div className="space-y-4 shell-gutter pb-6">
        {saved && savedLabel[saved] ? (
          <p
            role="status"
            className="rounded-md border border-mint/30 bg-mint/10 px-3 py-2 text-xs text-mint-400"
          >
            {savedLabel[saved]}
          </p>
        ) : null}

        {/* Training context — the one setting worth an inline toggle
            (single tap, ripples across Train + Fuel), everything else
            gets its own edit page. */}
        <section className="rounded-card border border-white/5 bg-ink-850 p-5 shadow-card">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="font-display uppercase tracking-display text-white text-base">
              Training context
            </h2>
            <span className="font-display uppercase tracking-display text-[0.65rem] text-mint-400">
              {player.trainingContext === "gym" ? "Gym" : "Home"}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-strong">
            Rewires equipment cues across Train, Progress, and the exercise
            bank without changing the block you're on.
          </p>
          <form action={updateTrainingContext} className="mt-3">
            <input
              type="hidden"
              name="trainingContext"
              value={player.trainingContext === "gym" ? "home" : "gym"}
            />
            <Button type="submit" variant="secondary" size="sm">
              Switch to {player.trainingContext === "gym" ? "Home" : "Gym"}
            </Button>
          </form>
        </section>

        {/* Profile — read-only summary + link to /you/profile to edit. */}
        <SettingsRow
          href="/you/profile"
          heading="Profile"
          summary={`${player.name} · Age ${age} (${band})${positionLabel ? ` · ${positionLabel}` : ""}${player.club ? ` · ${player.club}` : ""}`}
        />

        {/* Diet + allergies. */}
        <SettingsRow
          href="/you/diet"
          heading="Diet and allergies"
          summary={
            <>
              <span>{DIET_LABEL[player.dietPreference] ?? "Omnivore"}</span>
              <span className="mx-2 text-muted">·</span>
              <span>
                {player.allergies.length === 0
                  ? "No allergies set"
                  : `${player.allergies.length} allergen${player.allergies.length === 1 ? "" : "s"} set`}
              </span>
            </>
          }
        />

        {/* Team card. Locked decision: card, not a bottom-nav tab.
            Per-field consent flags on TeamMembership control what a
            manager can see. */}
        <Link
          href="/you/teams"
          className="group block rounded-card border border-mint/25 bg-mint/5 p-5 shadow-card hover:border-mint/60"
        >
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="font-display uppercase tracking-display text-white text-base">
              Teams
            </h2>
            <span className="font-display uppercase tracking-display text-[0.65rem] text-mint-400">
              {teamCount === 0
                ? "None joined"
                : `${teamCount} team${teamCount === 1 ? "" : "s"}`}
            </span>
          </div>
          <p className="mt-2 text-sm text-white/85">
            {teamCount === 0
              ? "Got an invite code from a coach? Redeem it and choose what they see."
              : "Manage what each coach can see — one field at a time."}
          </p>
        </Link>

        <div className="pt-2">
          <form action={signOut}>
            <Button type="submit" variant="secondary" className="w-full">
              Sign out
            </Button>
          </form>
        </div>

        {/* Danger zone — lives at the bottom, muted-red, one tap to
            the confirmation page. Delivers on the /for-parents
            promise of one-click deletion. */}
        <section className="pt-6">
          <div className="rounded-md border border-red-500/25 bg-red-500/5 p-4">
            <h2 className="font-display uppercase tracking-display text-red-300 text-xs">
              Delete account
            </h2>
            <p className="mt-2 text-xs text-white/80">
              Removes your account and every piece of data attached to it
              (sessions, PBs, custom programmes, meal plan, recovery
              consents). We keep no copy.
            </p>
            <Link
              href="/you/delete"
              className="mt-3 inline-flex h-9 items-center rounded-full border border-red-500/40 bg-transparent px-4 font-display uppercase tracking-display text-xs text-red-300 hover:border-red-500 hover:text-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              Delete my account
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function SettingsRow({
  href,
  heading,
  summary,
}: {
  href: string;
  heading: string;
  summary: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start justify-between gap-3 rounded-card border border-white/5 bg-ink-850 p-5 shadow-card hover:border-mint/40"
    >
      <div className="min-w-0">
        <h2 className="font-display uppercase tracking-display text-white text-base">
          {heading}
        </h2>
        <p className="mt-1 text-sm text-muted-strong">{summary}</p>
      </div>
      <span
        aria-hidden="true"
        className="shrink-0 text-muted group-hover:text-mint"
      >
        ›
      </span>
    </Link>
  );
}
