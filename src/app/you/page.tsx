import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { Card, CardTitle, CardSubtitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { requirePlayer } from "@/lib/auth";
import { ageInYears, ageBandFromDOB } from "@/lib/age-band";
import { POSITIONS } from "@/lib/constants/positions";
import { signOut } from "@/app/(auth)/actions";

const AGE_BAND_LABEL: Record<"U13_U15" | "U16_U18", string> = {
  U13_U15: "U13-U15",
  U16_U18: "U16-U18",
};

export default async function YouPage() {
  const user = await requirePlayer();
  const player = user.player;

  const positionLabel =
    player.position ? POSITIONS.find((p) => p.key === player.position)?.label : null;
  const age = ageInYears(player.dateOfBirth);
  const band = AGE_BAND_LABEL[ageBandFromDOB(player.dateOfBirth)];

  return (
    <AppShell>
      <Header title="You" subtitle={user.email ?? undefined} />
      <div className="space-y-4 px-5">
        <Card>
          <CardTitle>Profile</CardTitle>
          <CardSubtitle>
            {player.name} · Age {age} ({band}){positionLabel ? ` · ${positionLabel}` : ""}
            {player.club ? ` · ${player.club}` : ""}
          </CardSubtitle>
        </Card>

        <Card>
          <CardTitle>Allergies</CardTitle>
          <CardSubtitle>
            {player.allergies.length === 0
              ? "None set. Recipes won't be filtered."
              : `${player.allergies.length} set — recipes containing these are hidden.`}
          </CardSubtitle>
        </Card>

        <Card>
          <CardTitle>Team</CardTitle>
          <CardSubtitle>
            Coming soon — share readiness, sessions, or PBs with a manager on your terms.
          </CardSubtitle>
        </Card>

        <form action={signOut}>
          <Button type="submit" variant="secondary" className="w-full">Sign out</Button>
        </form>
      </div>
    </AppShell>
  );
}
