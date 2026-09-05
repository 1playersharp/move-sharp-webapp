import Link from "next/link";
import Image from "next/image";
import type { AgeBand, Quality } from "@prisma/client";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import trainHeaderImage from "@/images/brett-jordan-U2q73PfHFpM-unsplash.jpg";
import { getPlayerHeaderData } from "@/lib/player-header";
import { PlayerHeader } from "@/components/player/PlayerHeader";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ageBandFromDOB } from "@/lib/age-band";
import { ProgrammeCard } from "@/components/train/ProgrammeCard";
import { QualityFilterGrid } from "@/components/train/QualityFilterGrid";
import { ModeToggle } from "@/components/train/ModeToggle";
import { YourProgrammesStrip } from "@/components/train/YourProgrammesStrip";
import {
  recommendedQualitiesFor,
  formatQualityList,
} from "@/lib/constants/position-qualities";
import { POSITIONS } from "@/lib/constants/positions";

const VALID_QUALITIES = new Set<Quality>([
  "speed",
  "power",
  "strength",
  "agility",
  "endurance",
  "robustness",
]);

type Props = {
  searchParams: Promise<{ quality?: string; band?: string }>;
};

export default async function TrainPage({ searchParams }: Props) {
  const user = await requirePlayer();
  const { quality: qualityRaw, band: bandRaw } = await searchParams;

  const playerBand = ageBandFromDOB(user.player.dateOfBirth);
  const recommendedQualities = recommendedQualitiesFor(user.player.position);
  const positionLabel =
    POSITIONS.find((p) => p.key === user.player.position)?.label ?? "your position";
  const showAll = bandRaw === "all";
  const activeQuality: Quality | null =
    qualityRaw && VALID_QUALITIES.has(qualityRaw as Quality)
      ? (qualityRaw as Quality)
      : null;

  const bandFilter: AgeBand[] = showAll ? [] : [playerBand];

  // Seeded library programmes only (custom ones live in the "Your
  // programmes" strip so they don't get mixed into filter results).
  const programmes = await prisma.programme.findMany({
    where: {
      isCustom: false,
      ...(activeQuality ? { qualities: { has: activeQuality } } : {}),
      ...(bandFilter.length > 0
        ? { ageBands: { hasSome: bandFilter } }
        : {}),
    },
    orderBy: [{ name: "asc" }],
  });

  const headerData = await getPlayerHeaderData(user.player);

  const customProgrammes = await prisma.programme.findMany({
    where: { createdForPlayerId: user.player.id },
    orderBy: [{ createdAt: "desc" }],
  });

  const buildHref = (q: Quality | null) => {
    const params = new URLSearchParams();
    if (q) params.set("quality", q);
    if (showAll) params.set("band", "all");
    const qs = params.toString();
    return `/train${qs ? `?${qs}` : ""}`;
  };

  const bandLabel = playerBand === "U13_U15" ? "U13-15" : "U16-18";

  return (
    <AppShell>
      {/* Photographic header strip — image dimmed with a dark gradient
          wash so the title stays legible, brand accent line separates
          it from the content below. */}
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Image
            src={trainHeaderImage}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 576px"
            className="object-cover object-center opacity-75"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/30 via-ink-950/55 to-ink-950" />
        </div>
        <div className="relative">
          <Header title="Train" subtitle="Blocks scaled to your band." />
        </div>
        <div
          aria-hidden="true"
          className="relative h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent"
        />
      </div>
      <div className="space-y-6 shell-gutter pt-6">
        {/* Compact variant only — continuity away from the dashboard.
            Mounted per-page rather than in AppShell so it can never
            appear during a live session. */}
        <PlayerHeader
          variant="compact"
          firstName={headerData.firstName}
          avatarId={headerData.avatarId}
          trainingContext={headerData.trainingContext}
          programme={headerData.programme}
        />
        <ModeToggle mode="programme" />

        <YourProgrammesStrip programmes={customProgrammes} />

        <section className="space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="section-title">Filter by quality</h2>
            {recommendedQualities.length > 0 ? (
              <span className="flex items-center gap-1.5 text-[0.65rem] font-display uppercase tracking-display text-brand-400">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                Recommended for {positionLabel}
              </span>
            ) : null}
          </div>
          <QualityFilterGrid
            active={activeQuality}
            buildHref={buildHref}
            recommendedFor={recommendedQualities}
          />
          {recommendedQualities.length > 0 ? (
            <p className="text-xs text-muted">
              {formatQualityList(recommendedQualities)} lead the demands for {positionLabel.toLowerCase()} — the chips marked with a dot.
            </p>
          ) : null}
        </section>

        <section>
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <h2 className="section-title">Programmes</h2>
            <div className="flex gap-1 rounded-full bg-ink-800 p-0.5 text-[0.65rem]">
              <Link
                href={
                  activeQuality
                    ? `/train?quality=${activeQuality}`
                    : "/train"
                }
                className={`rounded-full px-2.5 py-1 font-display uppercase tracking-display ${
                  !showAll ? "bg-brand text-ink-950" : "text-muted"
                }`}
              >
                {bandLabel}
              </Link>
              <Link
                href={
                  activeQuality
                    ? `/train?quality=${activeQuality}&band=all`
                    : "/train?band=all"
                }
                className={`rounded-full px-2.5 py-1 font-display uppercase tracking-display ${
                  showAll ? "bg-brand text-ink-950" : "text-muted"
                }`}
              >
                All
              </Link>
            </div>
          </div>

          {programmes.length === 0 ? (
            <EmptyState
              title="No programmes here yet"
              body={
                activeQuality
                  ? `No ${activeQuality} programmes for this band. Try All or a different quality.`
                  : "Try All bands or check back soon."
              }
            />
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {programmes.map((p) => (
                <ProgrammeCard key={p.id} programme={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
