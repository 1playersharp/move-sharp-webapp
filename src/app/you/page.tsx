import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { Card, CardTitle, CardSubtitle } from "@/components/ui/Card";

export default function YouPage() {
  return (
    <AppShell>
      <Header title="You" subtitle="Profile, settings, team." />
      <div className="space-y-4 px-5">
        <Card>
          <CardTitle>Profile</CardTitle>
          <CardSubtitle>Age band, position, allergies — filled in during onboarding.</CardSubtitle>
        </Card>

        <Card>
          <CardTitle>Team</CardTitle>
          <CardSubtitle>
            Coming soon — share readiness, sessions, or PBs with a manager on your terms.
          </CardSubtitle>
        </Card>
      </div>
    </AppShell>
  );
}
