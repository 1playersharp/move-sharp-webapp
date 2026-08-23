import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const CATEGORY_LABEL: Record<string, string> = {
  strength: "Strength",
  plyometric: "Plyometric",
  speed: "Speed",
  agility: "Agility",
  mobility: "Mobility",
  general: "General",
};

const CATEGORY_ORDER = ["strength", "plyometric", "speed", "agility", "mobility", "general"];

export default async function ExerciseLibraryPage() {
  await requirePlayer();
  const exercises = await prisma.exercise.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] });

  const byCategory = new Map<string, typeof exercises>();
  for (const e of exercises) {
    const c = e.category ?? "general";
    if (!byCategory.has(c)) byCategory.set(c, []);
    byCategory.get(c)!.push(e);
  }

  const orderedCategories = CATEGORY_ORDER.filter((c) => byCategory.has(c));

  return (
    <AppShell>
      <div className="px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
        <Link href="/train" className="text-[0.7rem] font-display uppercase tracking-display text-mint-400 hover:text-mint">
          ← Train
        </Link>
        <h1 className="mt-2 font-display uppercase tracking-display text-white text-2xl">
          Exercise library
        </h1>
        <p className="mt-1 text-sm text-muted">
          {exercises.length} exercises. More coming.
        </p>
      </div>

      <div className="space-y-6 px-5">
        {orderedCategories.map((category) => (
          <section key={category}>
            <h2 className="section-title mb-3">{CATEGORY_LABEL[category] ?? category}</h2>
            <ul className="space-y-2">
              {byCategory.get(category)!.map((e) => (
                <li
                  key={e.id}
                  className="rounded-card border border-white/5 bg-ink-850 p-3"
                >
                  <p className="font-display uppercase tracking-display text-white text-sm">
                    {e.name}
                  </p>
                  {e.description ? (
                    <p className="mt-1 text-xs text-muted-strong">{e.description}</p>
                  ) : null}
                  {(e.equipmentGym || e.equipmentHome) ? (
                    <p className="mt-1.5 text-[0.7rem] text-muted">
                      {e.equipmentGym ? `Gym: ${e.equipmentGym}` : ""}
                      {e.equipmentGym && e.equipmentHome ? " · " : ""}
                      {e.equipmentHome ? `Home: ${e.equipmentHome}` : ""}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
