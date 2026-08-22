import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { requirePlayer } from "@/lib/auth";

export default async function TrainPage() {
  await requirePlayer();
  return (
    <AppShell>
      <Header title="Train a Quality" subtitle="Qualities and 6-week blocks." />
      <div className="px-5">
        <EmptyState
          title="Programmes coming soon"
          body="The Train tab will list qualities to develop and 6-week blocks scaled to your age band."
        />
      </div>
    </AppShell>
  );
}
