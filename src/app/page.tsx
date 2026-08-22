import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { Card, CardTitle, CardSubtitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Landing } from "@/components/marketing/Landing";
import { getAuthUser, getCurrentUser } from "@/lib/auth";

export default async function HomePage() {
  const authUser = await getAuthUser();
  if (!authUser) return <Landing />;

  const user = await getCurrentUser();
  if (!user || !user.player) redirect("/onboarding");

  return (
    <AppShell>
      <Header title={`Hi, ${user.player.name.split(" ")[0]}`} subtitle="Check in, then get to work." />
      <div className="space-y-4 px-5">
        <Card>
          <CardTitle>Today's readiness</CardTitle>
          <CardSubtitle>Soreness, sleep, energy, mood — 30 seconds.</CardSubtitle>
          <div className="mt-4">
            <Button size="sm">Check in</Button>
          </div>
        </Card>

        <EmptyState
          title="No sessions logged yet"
          body="Pick a quality or a 6-week block from the Train tab to begin."
        />
      </div>
    </AppShell>
  );
}
