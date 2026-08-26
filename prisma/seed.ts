import { PrismaClient } from "@prisma/client";
import { ALL_PROGRAMMES } from "./programmes";
import { EXERCISES, ORPHANED_SLUGS } from "./exercises";
import { RECIPES } from "./recipes";
import { FIRST_STEP_TEMPLATES } from "./session-templates/first-step-acceleration-u13";

const prisma = new PrismaClient();

async function main() {
  // Drop exercises that were seeded under old (pre-split) slugs and no
  // longer belong to the library. Errors if any SessionTemplateItem still
  // references one — a signal to update the template seed first.
  if (ORPHANED_SLUGS.length > 0) {
    const result = await prisma.exercise.deleteMany({
      where: { slug: { in: ORPHANED_SLUGS } },
    });
    if (result.count > 0) {
      console.log(`Dropped ${result.count} orphan exercise(s): ${ORPHANED_SLUGS.join(", ")}`);
    }
  }

  console.log(`Seeding ${EXERCISES.length} exercises…`);
  for (const e of EXERCISES) {
    await prisma.exercise.upsert({
      where: { slug: e.slug },
      create: {
        slug: e.slug,
        name: e.name,
        description: e.description,
        category: e.category,
        contexts: e.contexts,
        equipmentGym: e.equipmentGym,
        equipmentHome: e.equipmentHome,
        defaultPrescription: e.defaultPrescription,
        coachingCue: e.coachingCue,
        pbMetricKey: e.pbMetricKey,
      },
      update: {
        name: e.name,
        description: e.description,
        category: e.category,
        contexts: e.contexts,
        equipmentGym: e.equipmentGym,
        equipmentHome: e.equipmentHome,
        defaultPrescription: e.defaultPrescription,
        coachingCue: e.coachingCue,
        pbMetricKey: e.pbMetricKey,
      },
    });
    console.log(`  ✓ ${e.slug}`);
  }

  console.log(`Seeding ${ALL_PROGRAMMES.length} programmes…`);
  for (const p of ALL_PROGRAMMES) {
    await prisma.programme.upsert({
      where: { slug: p.slug },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        intent: p.intent,
        ageBands: p.ageBands,
        qualities: p.qualities,
        weeks: p.weeks,
        sessionsPerWeek: p.sessionsPerWeek,
        equipmentGym: p.equipmentGym,
        equipmentHome: p.equipmentHome,
        curriculum: p.curriculum,
      },
      update: {
        name: p.name,
        description: p.description,
        intent: p.intent,
        ageBands: p.ageBands,
        qualities: p.qualities,
        weeks: p.weeks,
        sessionsPerWeek: p.sessionsPerWeek,
        equipmentGym: p.equipmentGym,
        equipmentHome: p.equipmentHome,
        curriculum: p.curriculum,
      },
    });
    console.log(`  ✓ ${p.slug}`);
  }

  console.log(`Materialising ${FIRST_STEP_TEMPLATES.length} sessions for First-Step Acceleration U13…`);
  const firstStep = await prisma.programme.findUnique({
    where: { slug: "first-step-acceleration-u13" },
  });
  if (!firstStep) throw new Error("First-Step programme not found — seed programmes first");

  const exerciseIdBySlug = new Map(
    (await prisma.exercise.findMany({ select: { id: true, slug: true } })).map(
      (e) => [e.slug, e.id] as const,
    ),
  );

  for (const t of FIRST_STEP_TEMPLATES) {
    const template = await prisma.sessionTemplate.upsert({
      where: { slug: t.slug },
      create: {
        slug: t.slug,
        name: t.name,
        programmeId: firstStep.id,
        week: t.week,
        day: t.day,
        focus: t.focus,
        gymCue: t.gymCue,
        homeCue: t.homeCue,
      },
      update: {
        name: t.name,
        programmeId: firstStep.id,
        week: t.week,
        day: t.day,
        focus: t.focus,
        gymCue: t.gymCue,
        homeCue: t.homeCue,
      },
    });

    // Wipe and rewrite items — idempotent re-seed.
    await prisma.sessionTemplateItem.deleteMany({
      where: { sessionTemplateId: template.id },
    });
    for (const item of t.items) {
      const exerciseId = exerciseIdBySlug.get(item.exerciseSlug);
      if (!exerciseId) throw new Error(`Exercise not found: ${item.exerciseSlug}`);
      await prisma.sessionTemplateItem.create({
        data: {
          sessionTemplateId: template.id,
          exerciseId,
          order: item.order,
          prescription: {
            display: item.prescription,
            ...(item.notes ? { notes: item.notes } : {}),
          },
        },
      });
    }
    console.log(`  ✓ ${t.slug}`);
  }

  console.log(`Seeding ${RECIPES.length} recipes…`);
  for (const r of RECIPES) {
    await prisma.recipe.upsert({
      where: { slug: r.slug },
      create: {
        slug: r.slug,
        name: r.name,
        servings: r.servings,
        ingredients: r.ingredients,
        allergens: r.allergens,
        dietSuitability: r.dietSuitability,
        fuelTags: r.fuelTags,
        carbsG: r.carbsG,
        proteinG: r.proteinG,
        instructions: r.instructions,
      },
      update: {
        name: r.name,
        servings: r.servings,
        ingredients: r.ingredients,
        allergens: r.allergens,
        dietSuitability: r.dietSuitability,
        fuelTags: r.fuelTags,
        carbsG: r.carbsG,
        proteinG: r.proteinG,
        instructions: r.instructions,
      },
    });
    console.log(`  ✓ ${r.slug}`);
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
