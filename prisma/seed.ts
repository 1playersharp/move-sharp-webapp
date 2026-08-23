import { PrismaClient } from "@prisma/client";
import { ALL_PROGRAMMES } from "./programmes";

const prisma = new PrismaClient();

async function main() {
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
