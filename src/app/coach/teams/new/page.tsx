import Link from "next/link";
import { CoachShell } from "@/components/layout/CoachShell";
import { Button } from "@/components/ui/Button";
import { Field, Input, Label, ErrorText, HelpText } from "@/components/ui/Field";
import { requireManager } from "@/lib/auth";
import { createTeam } from "@/app/actions/team";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function CoachNewTeamPage({ searchParams }: Props) {
  await requireManager();
  const { error } = await searchParams;

  return (
    <CoachShell>
      <div className="px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
        <Link
          href="/coach/teams"
          className="text-[0.7rem] font-display uppercase tracking-display text-mint-400 hover:text-mint focus-visible:text-mint"
        >
          ← Teams
        </Link>
        <h1 className="mt-2 font-display uppercase tracking-display text-white text-3xl leading-tight">
          Create a team
        </h1>
        <p className="mt-1 text-sm text-muted">
          Give it a name. We'll generate an invite code you share with your
          players.
        </p>
      </div>

      <form action={createTeam} className="space-y-5 px-5 pb-8">
        {error ? <ErrorText>{error}</ErrorText> : null}

        <Field>
          <Label htmlFor="name">Team name</Label>
          <Input
            id="name"
            name="name"
            required
            maxLength={60}
            placeholder="e.g. Riverside U16s"
            autoFocus
          />
          <HelpText>
            60 characters max. Players see this on their team card.
          </HelpText>
        </Field>

        <div className="flex flex-col gap-2 pt-2 sm:flex-row">
          <Button type="submit" className="w-full sm:w-auto">
            Create team
          </Button>
          <Link
            href="/coach/teams"
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/10 px-5 font-display uppercase tracking-display text-sm text-muted hover:text-white sm:w-auto"
          >
            Cancel
          </Link>
        </div>
      </form>
    </CoachShell>
  );
}
