import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { Card, CardTitle, CardSubtitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <AppShell>
      <Header title="Ready, Test" subtitle="Check in, then get to work." />
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
