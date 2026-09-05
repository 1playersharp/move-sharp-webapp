import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { Field, Input, Label, ErrorText, HelpText } from "@/components/ui/Field";
import { requirePlayer } from "@/lib/auth";
import { POSITIONS } from "@/lib/constants/positions";
import { updateProfile } from "@/app/actions/profile";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

// Format a Date as YYYY-MM-DD for the native date input's default value.
function dobInputValue(dob: Date): string {
  const y = dob.getUTCFullYear();
  const m = String(dob.getUTCMonth() + 1).padStart(2, "0");
  const d = String(dob.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default async function EditProfilePage({ searchParams }: Props) {
  const user = await requirePlayer();
  const p = user.player;
  const { error } = await searchParams;

  return (
    <AppShell>
      <Header
        back={{ href: "/you", label: "You" }}
        title="Profile"
        subtitle="Name, date of birth, position, club."
      />

      <form action={updateProfile} className="space-y-5 shell-gutter pb-8">
        {error ? <ErrorText>{error}</ErrorText> : null}

        <Field>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            defaultValue={p.name}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="dateOfBirth">Date of birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            defaultValue={dobInputValue(p.dateOfBirth)}
            required
          />
          <HelpText>
            Used to pick programmes for your age band. MoveSharp is for
            players aged 13–18 — a birthday outside that will be
            rejected.
          </HelpText>
        </Field>

        <Field>
          <Label htmlFor="position">Position</Label>
          <select
            id="position"
            name="position"
            defaultValue={p.position ?? ""}
            className="h-11 rounded-xl bg-ink-800 px-4 text-white border border-white/5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            <option value="">Prefer not to say</option>
            {POSITIONS.map((pos) => (
              <option key={pos.key} value={pos.key}>
                {pos.label}
              </option>
            ))}
          </select>
        </Field>

        <Field>
          <Label htmlFor="club">Club (optional)</Label>
          <Input
            id="club"
            name="club"
            autoComplete="organization"
            defaultValue={p.club ?? ""}
          />
        </Field>

        <div className="flex flex-col gap-2 pt-2 sm:flex-row">
          <Button type="submit" className="w-full sm:w-auto">
            Save changes
          </Button>
          <Link
            href="/you"
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/10 shell-gutter font-display uppercase tracking-display text-sm text-muted hover:text-white sm:w-auto"
          >
            Cancel
          </Link>
        </div>
      </form>
    </AppShell>
  );
}
