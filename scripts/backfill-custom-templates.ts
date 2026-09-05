// Custom (quiz-generated) programmes created before the quiz action
// materialised SessionTemplates have a curriculum but nothing to start —
// the programme page could only browse and delete. This creates the missing
// templates from the curriculum already stored on the programme.
//
// Idempotent: skips any programme that already has templates.
// Run: npx tsx scripts/backfill-custom-templates.ts [--apply]

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

type Session = {
  name: string;
  focus: string;
  gymCue?: string;
  homeCue?: string;
  exerciseSlugs?: string[];
};
type Week = { week: number; sessions: Session[] };

async function main() {
  const programmes = await prisma.programme.findMany({
    where: { isCustom: true },
    select: { id: true, slug: true, name: true, curriculum: true, _count: { select: { templates: true } } },
  });
  const exercises = await prisma.exercise.findMany({
    select: { id: true, slug: true, defaultPrescription: true },
  });
  const bySlug = new Map(exercises.map((e) => [e.slug, e] as const));

  let created = 0;
  for (const p of programmes) {
    if (p._count.templates > 0) {
      console.log(`skip ${p.slug} — already has ${p._count.templates} templates`);
      continue;
    }
    const weeks = (p.curriculum ?? []) as unknown as Week[];
    let made = 0;
    for (const week of weeks) {
      for (const [index, session] of (week.sessions ?? []).entries()) {
        const day = index + 1;
        const items = (session.exerciseSlugs ?? [])
          .map((s) => bySlug.get(s))
          .filter((e): e is NonNullable<typeof e> => Boolean(e));
        if (items.length === 0) continue;
        if (APPLY) {
          await prisma.sessionTemplate.create({
            data: {
              slug: `${p.slug}-w${week.week}-d${day}`,
              name: session.name,
              programmeId: p.id,
              week: week.week,
              day,
              focus: session.focus,
              gymCue: session.gymCue,
              homeCue: session.homeCue,
              items: {
                create: items.map((e, order) => ({
                  exerciseId: e.id,
                  order: order + 1,
                  prescription: { display: e.defaultPrescription ?? "As prescribed" },
                })),
              },
            },
          });
        }
        made++;
      }
    }
    created += made;
    console.log(`${APPLY ? "created" : "would create"} ${made} templates for ${p.slug} (${p.name})`);
  }
  console.log(`\n${APPLY ? "Created" : "Would create"} ${created} templates across ${programmes.length} custom programme(s).`);
  if (!APPLY) console.log("Dry run — re-run with --apply to write.");
  await prisma.$disconnect();
}

main();
