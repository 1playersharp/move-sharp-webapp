import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Field, Input, Label, ErrorText, HelpText } from "@/components/ui/Field";
import { requirePlayer } from "@/lib/auth";
import { ALLERGENS } from "@/lib/constants/allergens";
import { updateDiet } from "@/app/actions/profile";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

const DIET_OPTIONS: Array<{ key: string; label: string; note?: string }> = [
  { key: "omnivore", label: "Eats everything" },
  { key: "pescatarian", label: "Pescatarian", note: "fish, no meat" },
  { key: "vegetarian", label: "Vegetarian" },
  { key: "vegan", label: "Vegan" },
];

export default async function EditDietPage({ searchParams }: Props) {
  const user = await requirePlayer();
  const p = user.player;
  const { error } = await searchParams;
  const activeAllergies = new Set(p.allergies);

  return (
    <AppShell>
      <div className="px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
        <Link
          href="/you"
          className="text-[0.7rem] font-display uppercase tracking-display text-mint-400 hover:text-mint focus-visible:text-mint"
        >
          ← You
        </Link>
        <h1 className="mt-2 font-display uppercase tracking-display text-white text-3xl leading-tight">
          Diet and allergies
        </h1>
        <p className="mt-1 text-sm text-muted">
          Filters your recipe browse and the planner suggestions.
        </p>
      </div>

      <form action={updateDiet} className="space-y-6 px-5 pb-8">
        {error ? <ErrorText>{error}</ErrorText> : null}

        <fieldset className="space-y-3 rounded-xl border border-white/5 bg-ink-900/50 p-4">
          <legend className="px-1 font-display uppercase tracking-display text-xs text-muted">
            Diet
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {DIET_OPTIONS.map((d) => (
              <label
                key={d.key}
                htmlFor={`diet_${d.key}`}
                className="flex cursor-pointer items-start gap-2 rounded-md border border-white/5 bg-ink-900/60 p-3 hover:border-mint/30 has-[:checked]:border-mint has-[:checked]:bg-mint/10"
              >
                <input
                  id={`diet_${d.key}`}
                  name="dietPreference"
                  type="radio"
                  value={d.key}
                  defaultChecked={d.key === p.dietPreference}
                  className="mt-0.5 h-4 w-4 accent-mint"
                />
                <span className="min-w-0">
                  <span className="block text-sm text-white">{d.label}</span>
                  {d.note ? (
                    <span className="block text-xs text-muted">{d.note}</span>
                  ) : null}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-3 rounded-xl border border-white/5 bg-ink-900/50 p-4">
          <legend className="px-1 font-display uppercase tracking-display text-xs text-muted">
            Allergies
          </legend>
          <p className="text-xs text-muted">
            Tick anything you can't eat. Recipes containing these are hidden
            completely. This is a convenience filter —{" "}
            <strong className="text-white">
              it's not a substitute for you or a parent checking every
              ingredient
            </strong>
            .
          </p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {ALLERGENS.map((a) => (
              <label
                key={a.key}
                htmlFor={`allergy_${a.key}`}
                className="flex cursor-pointer items-start gap-2 rounded-md p-2 hover:bg-white/5"
              >
                <input
                  id={`allergy_${a.key}`}
                  name={`allergy_${a.key}`}
                  type="checkbox"
                  defaultChecked={activeAllergies.has(a.key)}
                  className="mt-1 h-4 w-4 accent-mint"
                />
                <span className="min-w-0">
                  <span className="block text-sm text-white">{a.label}</span>
                  {a.examples ? (
                    <span className="block text-xs text-muted">{a.examples}</span>
                  ) : null}
                </span>
              </label>
            ))}
          </div>
          <Field>
            <Label htmlFor="allergyNote">Anything else? (optional)</Label>
            <Input
              id="allergyNote"
              name="allergyNote"
              maxLength={200}
              defaultValue={p.allergyNote ?? ""}
            />
            <HelpText>
              Free text — we won't auto-filter on this, so mention it to
              whoever cooks for you.
            </HelpText>
          </Field>
        </fieldset>

        <div className="flex flex-col gap-2 pt-2 sm:flex-row">
          <Button type="submit" className="w-full sm:w-auto">
            Save changes
          </Button>
          <Link
            href="/you"
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/10 px-5 font-display uppercase tracking-display text-sm text-muted hover:text-white sm:w-auto"
          >
            Cancel
          </Link>
        </div>
      </form>
    </AppShell>
  );
}
