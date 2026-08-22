import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { requirePlayer } from "@/lib/auth";

export default async function ProgressPage() {
  await requirePlayer();
  return (
    <AppShell>
      <Header title="Progress" subtitle="Bests, history, and badges." />
      <div className="px-5">
        <EmptyState
          title="No personal bests yet"
          body="Log your first personal best with the + button once test entry ships."
        />
      </div>
    </AppShell>
  );
}
