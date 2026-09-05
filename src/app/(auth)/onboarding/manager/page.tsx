import { redirect } from "next/navigation";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/Button";
import { Field, Input, Label, ErrorText, HelpText } from "@/components/ui/Field";
import { getCurrentUser, requireAuthUser } from "@/lib/auth";
import { completeManagerOnboarding } from "./actions";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function ManagerOnboardingPage({ searchParams }: Props) {
  await requireAuthUser();
  const user = await getCurrentUser();

  // Redirect if this account already has a profile of either kind.
  if (user?.manager) redirect("/coach");
  if (user?.player) redirect("/");

  const { error } = await searchParams;

  return (
    <AuthShell>
      <form action={completeManagerOnboarding} className="space-y-6">
        <div>
          <p className="font-display uppercase tracking-display text-brand-400 text-xs">
            Coach onboarding
          </p>
          <h1 className="section-title mt-2">Set up your coach profile</h1>
          <p className="mt-1 text-sm text-muted">
            Takes about thirty seconds. This is what players see when a coach
            invite comes from you.
          </p>
        </div>

        {error ? <ErrorText>{error}</ErrorText> : null}

        <Field>
          <Label htmlFor="name">Your name</Label>
          <Input id="name" name="name" autoComplete="name" required />
        </Field>

        <Field>
          <Label htmlFor="club">Club (optional)</Label>
          <Input id="club" name="club" autoComplete="organization" />
          <HelpText>Shown on team invites so players know who's asking.</HelpText>
        </Field>

        <Field>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
          <HelpText>
            Never shown to players. For account recovery only.
          </HelpText>
        </Field>

        <Button type="submit" className="w-full" size="lg">
          Save and continue
        </Button>
      </form>
    </AuthShell>
  );
}
