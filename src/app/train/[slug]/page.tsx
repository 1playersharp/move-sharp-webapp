import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardTitle } from "@/components/ui/Card";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { QualityChip } from "@/components/train/QualityChip";
import { startSession } from "@/app/actions/sessions";

const BAND_LABEL: Record<"U13_U15" | "U16_U18", string> = {
  U13_U15: "U13-15",
  U16_U18: "U16-18",
};

type CurriculumSession = {
  name: string;
  focus: string;
  gymCue?: string;
  homeCue?: string;
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
  await requirePlayer();
  const { slug } = await params;

  const programme = await prisma.programme.findUnique({ where: { slug } });
  if (!programme) notFound();

  // Materialised sessions (if any) keyed by "w{week}d{day}".
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

  const bandLabel =
    programme.ageBands.length === 2
      ? "Both bands"
      : programme.ageBands.map((b) => BAND_LABEL[b as "U13_U15" | "U16_U18"]).join(" · ");

  const curriculum = (programme.curriculum ?? []) as unknown as CurriculumWeek[];

  return (
    <AppShell>
      <div className="px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
        <Link href="/train" className="text-[0.7rem] font-display uppercase tracking-display text-mint-400 hover:text-mint">
          ← Programmes
        </Link>
        <h1 className="mt-2 font-display uppercase tracking-display text-white text-3xl leading-tight">
          {programme.name}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {bandLabel} · {programme.weeks} weeks · {programme.sessionsPerWeek}×/wk
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {programme.qualities.map((q) => (
            <QualityChip key={q} quality={q} />
          ))}
        </div>
      </div>

      <div className="space-y-4 px-5">
        {programme.intent ? (
          <Card>
            <CardTitle>Why this block</CardTitle>
            <p className="mt-2 text-sm text-muted-strong">{programme.intent}</p>
          </Card>
        ) : null}

        {programme.equipmentGym || programme.equipmentHome ? (
          <Card>
            <CardTitle>Equipment</CardTitle>
            <dl className="mt-2 space-y-2 text-sm">
              {programme.equipmentGym ? (
                <div>
                  <dt className="font-display uppercase tracking-display text-[0.65rem] text-muted">Gym</dt>
                  <dd className="text-muted-strong">{programme.equipmentGym}</dd>
                </div>
              ) : null}
              {programme.equipmentHome ? (
                <div>
                  <dt className="font-display uppercase tracking-display text-[0.65rem] text-muted">Home</dt>
                  <dd className="text-muted-strong">{programme.equipmentHome}</dd>
                </div>
              ) : null}
            </dl>
          </Card>
        ) : null}

        {!isMaterialised ? (
          <div className="rounded-md border border-yellow-500/20 bg-yellow-500/5 p-3 text-xs text-yellow-200">
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
                      <span className="font-display uppercase tracking-display text-mint-400 text-sm">
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
                                <p className="mt-0.5 text-xs text-muted-strong">{s.focus}</p>
                                {(s.gymCue || s.homeCue) ? (
                                  <dl className="mt-1.5 space-y-1 text-[0.7rem]">
                                    {s.gymCue ? (
                                      <div className="flex gap-2">
                                        <dt className="w-10 shrink-0 font-display uppercase tracking-display text-mint-400">Gym</dt>
                                        <dd className="text-muted">{s.gymCue}</dd>
                                      </div>
                                    ) : null}
                                    {s.homeCue ? (
                                      <div className="flex gap-2">
                                        <dt className="w-10 shrink-0 font-display uppercase tracking-display text-mint-400">Home</dt>
                                        <dd className="text-muted">{s.homeCue}</dd>
                                      </div>
                                    ) : null}
                                  </dl>
                                ) : null}
                              </div>
                              {templateId ? (
                                <form action={startSession} className="shrink-0">
                                  <input type="hidden" name="sessionTemplateId" value={templateId} />
                                  <button
                                    type="submit"
                                    className="rounded-full bg-mint px-3 py-1 font-display uppercase tracking-display text-[0.65rem] text-ink-950 hover:bg-mint-400"
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
      </div>
    </AppShell>
  );
}
