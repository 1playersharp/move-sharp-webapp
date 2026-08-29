import { CoachShell } from "@/components/layout/CoachShell";
import { Header } from "@/components/ui/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireManager } from "@/lib/auth";

// Stub for Team 2/4 — a proper list + create + detail lands next.
export default async function CoachTeamsPage() {
  await requireManager();
  return (
    <CoachShell>
      <Header title="Teams" subtitle="Create, invite, manage rosters." />
      <div className="px-5">
        <EmptyState
          title="Team management coming next"
          body="Create teams, generate invite codes, and see rosters. Ships in the next commit."
        />
      </div>
    </CoachShell>
  );
}
