import type { ProgrammeSeed } from "../programmes/types";
import type { ExerciseSeed } from "../exercises";
import type { TemplateSeed } from "./first-step-acceleration-u13";

// Every programme session becomes a real SessionTemplate so a player can
// start and log it. The curriculum already carries the exercise list per
// session (exerciseSlugs), so templates are derived from it rather than
// hand-written per programme — 252 sessions is well past hand-authoring.
//
// Hand-curated templates still win where they exist: they carry bespoke
// per-item prescriptions ("3x10 wall marches at 60° lean") that a generated
// template can only approximate with the exercise's default.

export type GenerateOptions = {
  programmes: ProgrammeSeed[];
  exercises: ExerciseSeed[];
  /** Curated templates, keyed by `${programmeSlug}-w${week}-d${day}`. */
  overrides?: Map<string, TemplateSeed>;
};

export type GeneratedTemplate = TemplateSeed & { programmeSlug: string };

export function templateKey(programmeSlug: string, week: number, day: number): string {
  return `${programmeSlug}-w${week}-d${day}`;
}

export function generateTemplates({
  programmes,
  exercises,
  overrides = new Map(),
}: GenerateOptions): GeneratedTemplate[] {
  const bySlug = new Map(exercises.map((e) => [e.slug, e]));
  const out: GeneratedTemplate[] = [];

  for (const programme of programmes) {
    for (const week of programme.curriculum) {
      week.sessions.forEach((session, index) => {
        const day = index + 1;
        const key = templateKey(programme.slug, week.week, day);

        const curated = overrides.get(key);
        if (curated) {
          out.push({ ...curated, programmeSlug: programme.slug });
          return;
        }

        const slugs = session.exerciseSlugs ?? [];
        if (slugs.length === 0) {
          throw new Error(`${key} (${session.name}) has no exerciseSlugs — run scripts/assign-session-exercises.ts`);
        }

        out.push({
          programmeSlug: programme.slug,
          slug: key,
          name: session.name,
          week: week.week,
          day,
          focus: session.focus,
          gymCue: session.gymCue,
          homeCue: session.homeCue,
          items: slugs.map((exerciseSlug, order) => {
            const exercise = bySlug.get(exerciseSlug);
            if (!exercise) throw new Error(`${key} references unknown exercise "${exerciseSlug}"`);
            return {
              exerciseSlug,
              order: order + 1,
              // Generated templates have no per-item prescription of their
              // own, so the exercise default stands in. No notes: the session
              // focus is already shown once at the top of the session page,
              // and repeating it under every item is just noise.
              prescription: exercise.defaultPrescription,
            };
          }),
        });
      });
    }
  }

  return out;
}
