import { redirect } from "next/navigation";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/Button";
import { Field, Input, Label, ErrorText, HelpText } from "@/components/ui/Field";
import { ALLERGENS } from "@/lib/constants/allergens";
import { POSITIONS } from "@/lib/constants/positions";
import { getCurrentUser, requireAuthUser } from "@/lib/auth";
import { completeOnboarding } from "./actions";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function OnboardingPage({ searchParams }: Props) {
  await requireAuthUser();
  const user = await getCurrentUser();
  if (user?.player) redirect("/");

  const { error } = await searchParams;

  return (
    <AuthShell>
      <form action={completeOnboarding} className="space-y-6">
        <div>
          <h1 className="section-title">Set up your profile</h1>
          <p className="mt-1 text-sm text-muted">
            Takes about a minute. We use this to keep training and food safe for you.
          </p>
        </div>

        {error ? <ErrorText>{error}</ErrorText> : null}

        <Field>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" required />
        </Field>

        <Field>
          <Label htmlFor="dateOfBirth">Date of birth</Label>
          <Input id="dateOfBirth" name="dateOfBirth" type="date" required />
          <HelpText>Used to pick programmes suited to your age band. Only shared with a manager if you choose to.</HelpText>
        </Field>

        <Field>
          <Label htmlFor="position">Position</Label>
          <select
            id="position"
            name="position"
            defaultValue=""
            className="h-11 rounded-xl bg-ink-800 px-4 text-white border border-white/5 focus:border-mint focus:outline-none focus:ring-2 focus:ring-mint/30"
          >
            <option value="">Prefer not to say</option>
            {POSITIONS.map((p) => (
              <option key={p.key} value={p.key}>{p.label}</option>
            ))}
          </select>
        </Field>

        <Field>
          <Label htmlFor="club">Club (optional)</Label>
          <Input id="club" name="club" autoComplete="organization" />
        </Field>

        <fieldset className="space-y-3 rounded-xl border border-white/5 bg-ink-900/50 p-4">
          <legend className="px-1 font-display uppercase tracking-display text-xs text-muted">
            Diet
          </legend>
          <p className="text-xs text-muted">
            We use this to hide recipes you can't eat.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: "omnivore", label: "Eats everything" },
              { key: "pescatarian", label: "Pescatarian", note: "fish, no meat" },
              { key: "vegetarian", label: "Vegetarian" },
              { key: "vegan", label: "Vegan" },
            ].map((d) => (
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
                  defaultChecked={d.key === "omnivore"}
                  className="mt-0.5 h-4 w-4 accent-mint"
                />
                <span className="min-w-0">
                  <span className="block text-sm text-white">{d.label}</span>
                  {d.note ? <span className="block text-xs text-muted">{d.note}</span> : null}
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
            Tick anything you can't eat. Recipes containing these are hidden completely. This is a
            convenience filter — <strong className="text-white">it's not a substitute for you or a
            parent checking every ingredient</strong>.
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
            <Input id="allergyNote" name="allergyNote" maxLength={200} />
            <HelpText>Free text — we won't auto-filter on this, so mention it to whoever cooks for you.</HelpText>
          </Field>
        </fieldset>

        <Button type="submit" className="w-full" size="lg">Save and continue</Button>
      </form>
    </AuthShell>
  );
}
