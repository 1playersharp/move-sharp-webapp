import Link from "next/link";
import type { AgeBand, Quality } from "@prisma/client";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ageBandFromDOB } from "@/lib/age-band";
import { ProgrammeCard } from "@/components/train/ProgrammeCard";
import { QualityFilterGrid } from "@/components/train/QualityFilterGrid";
import { ModeToggle } from "@/components/train/ModeToggle";
import { ContextToggle } from "@/components/train/ContextToggle";

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
  const showAll = bandRaw === "all";
  const activeQuality: Quality | null =
    qualityRaw && VALID_QUALITIES.has(qualityRaw as Quality)
      ? (qualityRaw as Quality)
      : null;

  const bandFilter: AgeBand[] = showAll ? [] : [playerBand];

  const programmes = await prisma.programme.findMany({
    where: {
      ...(activeQuality ? { qualities: { has: activeQuality } } : {}),
      ...(bandFilter.length > 0
        ? { ageBands: { hasSome: bandFilter } }
        : {}),
    },
    orderBy: [{ name: "asc" }],
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
      <Header
        title="Train"
        subtitle="Blocks scaled to your band."
        right={<ContextToggle context={user.player.trainingContext} />}
      />
      <div className="space-y-6 px-5">
        <ModeToggle mode="programme" />

        <section className="space-y-3">
          <h2 className="section-title">Filter by quality</h2>
          <QualityFilterGrid active={activeQuality} buildHref={buildHref} />
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
                  !showAll ? "bg-mint text-ink-950" : "text-muted"
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
                  showAll ? "bg-mint text-ink-950" : "text-muted"
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
            <div className="space-y-3">
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
