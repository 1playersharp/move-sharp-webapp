import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { Card, CardTitle } from "@/components/ui/Card";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { QualityChip } from "@/components/train/QualityChip";
import { startSession } from "@/app/actions/sessions";
import { DeleteProgrammeConfirm } from "@/components/train/DeleteProgrammeConfirm";
import { contextLabel, equipmentForContext } from "@/lib/training-context";
import { categoryMeta } from "@/lib/constants/exercise-categories";

const BAND_LABEL: Record<"U13_U15" | "U16_U18", string> = {
  U13_U15: "U13-15",
  U16_U18: "U16-18",
};

type CurriculumSession = {
  name: string;
  focus: string;
  gymCue?: string;
  homeCue?: string;
  exerciseSlugs?: string[];
};
type CurriculumWeek = {
  week: number;
  theme: string;
  sessions: CurriculumSession[];
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProgrammeDetailPage({ params }: Props) {
  const user = await requirePlayer();
  const { slug } = await params;

  const programme = await prisma.programme.findUnique({ where: { slug } });
  if (!programme) notFound();

  const templates = await prisma.sessionTemplate.findMany({
    where: { programmeId: programme.id },
    select: { id: true, week: true, day: true },
  });
  const templateKey = (week: number, day: number) => `w${week}d${day}`;
  const templateByKey = new Map(
    templates
      .filter((t) => t.week != null && t.day != null)
      .map((t) => [templateKey(t.week!, t.day!), t.id] as const),
  );
  const isMaterialised = templateByKey.size > 0;

  const context = user.player.trainingContext;
  const ctxLabel = contextLabel(context);
  const equipment = equipmentForContext(
    context,
    programme.equipmentGym,
    programme.equipmentHome,
  );

  const bandLabel =
    programme.ageBands.length === 2
      ? "Both bands"
      : programme.ageBands.map((b) => BAND_LABEL[b as "U13_U15" | "U16_U18"]).join(" · ");

  const curriculum = (programme.curriculum ?? []) as unknown as CurriculumWeek[];

  // Pull every exercise slug referenced anywhere in the curriculum in one
  // query, then look up by slug in the render loop. Sessions carry their
  // exercise list explicitly (prisma/programmes), so nothing is inferred.
  const sessionSlugs = new Map<string, string[]>();
  const referencedSlugs = new Set<string>();
  for (const wk of curriculum) {
    for (let i = 0; i < wk.sessions.length; i++) {
      const slugs = wk.sessions[i].exerciseSlugs ?? [];
      sessionSlugs.set(`w${wk.week}s${i}`, slugs);
      slugs.forEach((slug) => referencedSlugs.add(slug));
    }
  }
  const bankExercises = referencedSlugs.size
    ? await prisma.exercise.findMany({
        where: { slug: { in: Array.from(referencedSlugs) } },
        select: {
          slug: true,
          name: true,
          category: true,
          defaultPrescription: true,
          contexts: true,
        },
      })
    : [];
  // Gym/home twins are both listed on the session; the player only sees the
  // one matching their context. Filtering on the exercise's own contexts
  // keeps this data-driven rather than a hardcoded list of twin slugs.
  const bankBySlug = new Map(
    bankExercises
      .filter((e) => e.contexts.includes(context))
      .map((e) => [e.slug, e]),
  );

  return (
    <AppShell>
      <Header
        back={{ href: "/train", label: "Programmes" }}
        title={programme.name}
        subtitle={`${bandLabel} · ${programme.weeks} weeks · ${programme.sessionsPerWeek}×/wk`}
      >
        <div className="mt-3 flex flex-wrap gap-1.5">
          {programme.qualities.map((q) => (
            <QualityChip key={q} quality={q} />
          ))}
        </div>
      </Header>

      <div className="space-y-4 shell-gutter">
        {programme.intent ? (
          <Card>
            <CardTitle>Why this block</CardTitle>
            <p className="mt-2 text-sm text-muted-strong">{programme.intent}</p>
          </Card>
        ) : null}

        <Card>
          <CardTitle>Equipment · {ctxLabel}</CardTitle>
          <p className="mt-2 text-sm text-muted-strong">{equipment}</p>
        </Card>

        {!isMaterialised ? (
          <div className="rounded-md border border-white/10 bg-ink-800 p-3 text-xs text-muted-strong">
            Preview only — session logging for this block ships in a later phase.
          </div>
        ) : null}

        <section className="space-y-3">
          <h2 className="section-title">Curriculum</h2>
          {curriculum.length === 0 ? (
            <p className="text-sm text-muted">Curriculum coming soon.</p>
          ) : (
            <ol className="space-y-3">
              {curriculum.map((wk) => (
                <li key={wk.week}>
                  <Card>
                    <div className="mb-3 flex items-baseline justify-between gap-2">
                      <span className="font-display uppercase tracking-display text-brand-400 text-sm">
                        Week {wk.week}
                      </span>
                      <span className="text-xs text-muted">{wk.sessions.length} sessions</span>
                    </div>
                    <h3 className="font-display uppercase tracking-display text-white text-base">
                      {wk.theme}
                    </h3>
                    <ul className="mt-3 space-y-3">
                      {wk.sessions.map((s, i) => {
                        const day = i + 1;
                        const templateId = templateByKey.get(templateKey(wk.week, day));
                        return (
                          <li key={i} className="border-l-2 border-white/5 pl-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <p className="font-display uppercase tracking-display text-white text-sm">
                                  {s.name}
                                </p>
                                {(() => {
                                  const slugs = sessionSlugs.get(`w${wk.week}s${i}`) ?? [];
                                  const rows = slugs
                                    .map((slug) => bankBySlug.get(slug))
                                    .filter((ex): ex is NonNullable<typeof ex> => Boolean(ex));
                                  if (rows.length === 0) return null;
                                  return (
                                    <ul className="mt-3 divide-y divide-white/5 overflow-hidden rounded-md border border-white/10 bg-ink-900/40">
                                      {rows.map((ex) => (
                                        <li key={ex.slug}>
                                          <Link
                                            href={`/train/exercise/${categoryMeta(ex.category).slug}/${ex.slug}`}
                                            className="group flex items-center justify-between gap-3 px-3 py-2 transition-colors hover:bg-brand/5"
                                          >
                                            <span className="min-w-0 flex-1 truncate text-[0.8rem] text-white group-hover:text-brand">
                                              {ex.name}
                                            </span>
                                            <span className="shrink-0 font-display uppercase tracking-display text-[0.65rem] tabular-nums text-muted-strong">
                                              {ex.defaultPrescription}
                                            </span>
                                            <span
                                              aria-hidden="true"
                                              className="shrink-0 text-muted group-hover:text-brand"
                                            >
                                              ›
                                            </span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  );
                                })()}
                              </div>
                              {templateId ? (
                                <form action={startSession} className="shrink-0">
                                  <input type="hidden" name="sessionTemplateId" value={templateId} />
                                  <button
                                    type="submit"
                                    className="rounded-full bg-brand px-3 py-1 font-display uppercase tracking-display text-[0.65rem] text-ink-950 hover:bg-brand-400"
                                  >
                                    Start
                                  </button>
                                </form>
                              ) : null}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </Card>
                </li>
              ))}
            </ol>
          )}
        </section>

        {programme.isCustom && programme.createdForPlayerId === user.player.id ? (
          <section className="pt-4">
            <DeleteProgrammeConfirm
              id={programme.id}
              programmeName={programme.name}
              variant="full"
            />
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}
