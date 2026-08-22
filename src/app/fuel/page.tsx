import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { requirePlayer } from "@/lib/auth";

export default async function FuelPage() {
  await requirePlayer();
  return (
    <AppShell>
      <Header title="Fuel" subtitle="Rails, recipes, planner." />
      <div className="px-5">
        <EmptyState
          title="Recipes coming soon"
          body="Fuel rails, recipes filtered to your allergies, and a weekly planner will live here."
        />
      </div>
    </AppShell>
  );
}
