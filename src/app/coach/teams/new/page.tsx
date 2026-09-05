import Link from "next/link";
import { CoachShell } from "@/components/layout/CoachShell";
import { Header } from "@/components/ui/Header";
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
      <Header
        back={{ href: "/coach/teams", label: "Teams" }}
        title="Create a team"
        subtitle="Give it a name. We'll generate an invite code you share with your players."
      />

      <form action={createTeam} className="space-y-5 shell-gutter pb-8">
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
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/10 shell-gutter font-display uppercase tracking-display text-sm text-muted hover:text-white sm:w-auto"
          >
            Cancel
          </Link>
        </div>
      </form>
    </CoachShell>
  );
}
