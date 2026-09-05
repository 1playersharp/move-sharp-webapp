import Link from "next/link";
import { notFound } from "next/navigation";
import { CoachShell } from "@/components/layout/CoachShell";
import { Header } from "@/components/ui/Header";
import { requireManager } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ageBandFromDOB } from "@/lib/age-band";
import { POSITIONS } from "@/lib/constants/positions";
import { rotateInviteCode, removeMember } from "@/app/actions/team";

const BAND_LABEL: Record<"U13_U15" | "U16_U18", string> = {
  U13_U15: "U13-15",
  U16_U18: "U16-18",
};

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ rotated?: string; removed?: string; error?: string }>;
};

type ConsentShape = {
  sessionsVisible?: boolean;
  readinessVisible?: boolean;
  pbsVisible?: boolean;
};

export default async function CoachTeamDetailPage({ params, searchParams }: Props) {
  const user = await requireManager();
  const { id } = await params;
  const { rotated, removed, error } = await searchParams;

  const team = await prisma.team.findFirst({
    where: { id, createdByUserId: user.id },
    include: {
      memberships: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              player: {
                select: {
                  id: true,
                  name: true,
                  dateOfBirth: true,
                  position: true,
                },
              },
            },
          },
        },
        orderBy: [{ role: "asc" }, { joinedAt: "asc" }],
      },
    },
  });

  if (!team) notFound();

  const players = team.memberships.filter((m) => m.role === "player");

  return (
    <CoachShell>
      <Header
        back={{ href: "/coach/teams", label: "Teams" }}
        title={team.name}
        subtitle={`${players.length} player${players.length === 1 ? "" : "s"} · created ${team.createdAt.toLocaleDateString()}`}
      />

      <div className="space-y-5 shell-gutter pb-6">
        {rotated ? (
          <p role="status" className="rounded-md border border-mint/30 bg-mint/10 px-3 py-2 text-xs text-mint-400">
            New invite code issued. The old one no longer works.
          </p>
        ) : null}
        {removed ? (
          <p role="status" className="rounded-md border border-mint/30 bg-mint/10 px-3 py-2 text-xs text-mint-400">
            Player removed from the roster.
          </p>
        ) : null}
        {error === "owner" ? (
          <p role="alert" className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            You can't remove yourself from your own team from the roster.
          </p>
        ) : null}

        {/* Invite code — big, tabular-nums so it's easy to read aloud
            or copy. Rotate button next to it. */}
        <section className="rounded-card border border-mint/25 bg-mint/5 p-5">
          <p className="font-display uppercase tracking-display text-mint-400 text-[0.65rem]">
            Invite code
          </p>
          <p className="mt-2 font-display uppercase tracking-display text-white text-4xl tabular-nums">
            {team.inviteCode}
          </p>
          <p className="mt-2 text-xs text-muted-strong">
            Players enter this code at{" "}
            <span className="font-display uppercase tracking-display text-mint-400">
              /join/{team.inviteCode}
            </span>
            . Share the URL or read the code out — either works.
          </p>
          <form action={rotateInviteCode} className="mt-4">
            <input type="hidden" name="teamId" value={team.id} />
            <button
              type="submit"
              className="inline-flex h-9 items-center rounded-full border border-white/20 px-4 font-display uppercase tracking-display text-xs text-white hover:border-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              Rotate code
            </button>
          </form>
        </section>

        {/* Roster */}
        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="section-title">Roster</h2>
            <span className="font-display uppercase tracking-display text-[0.65rem] text-muted">
              {players.length} player{players.length === 1 ? "" : "s"}
            </span>
          </div>

          {players.length === 0 ? (
            <div className="rounded-card border border-white/5 bg-ink-850 p-6 text-center shadow-card">
              <p className="text-sm text-white/85">No players yet.</p>
              <p className="mt-1 text-xs text-muted">
                Share the invite code above so players can join.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {players.map((m) => {
                const p = m.user.player;
                const consent = (m.consent ?? {}) as ConsentShape;
                const positionLabel = p?.position
                  ? POSITIONS.find((x) => x.key === p.position)?.label
                  : null;
                const band = p ? BAND_LABEL[ageBandFromDOB(p.dateOfBirth)] : null;
                const consented =
                  Number(!!consent.sessionsVisible) +
                  Number(!!consent.readinessVisible) +
                  Number(!!consent.pbsVisible);

                return (
                  <li
                    key={m.id}
                    className="rounded-card border border-white/5 bg-ink-850 p-4 shadow-card"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-display uppercase tracking-display text-white text-base">
                          {p?.name ?? m.user.email ?? "Unnamed"}
                        </p>
                        <p className="mt-0.5 text-xs text-muted">
                          {[band, positionLabel].filter(Boolean).join(" · ") || "—"}
                        </p>
                        <p className="mt-2 text-[0.7rem] text-muted">
                          Shares {consented} of 3 data fields · joined{" "}
                          {m.joinedAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col gap-1.5">
                        <Link
                          href={`/coach/teams/${team.id}/players/${p?.id ?? m.user.id}`}
                          className="rounded-full border border-white/10 px-3 py-1 text-center font-display uppercase tracking-display text-[0.6rem] text-white hover:border-mint hover:text-mint"
                        >
                          View
                        </Link>
                        <form action={removeMember}>
                          <input type="hidden" name="teamId" value={team.id} />
                          <input type="hidden" name="membershipId" value={m.id} />
                          <button
                            type="submit"
                            className="w-full rounded-full border border-white/10 px-3 py-1 font-display uppercase tracking-display text-[0.6rem] text-muted hover:border-red-500/50 hover:text-red-300"
                          >
                            Remove
                          </button>
                        </form>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </CoachShell>
  );
}
