import { EmptyState } from "@/components/ui/EmptyState";

export function BlockPreviews() {
  return (
    <div>
      <h2 className="section-title mb-3">6-Week Blocks</h2>
      <EmptyState
        title="Coming soon"
        body="6-week programme blocks — scaled to your age band — will show up here once we drop them."
      />
    </div>
  );
}
