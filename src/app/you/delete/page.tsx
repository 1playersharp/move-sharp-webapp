import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { requirePlayer } from "@/lib/auth";
import { DeleteAccountForm } from "@/components/you/DeleteAccountForm";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function DeleteAccountPage({ searchParams }: Props) {
  const user = await requirePlayer();
  const { error } = await searchParams;

  return (
    <AppShell>
      <div className="mx-auto max-w-lg shell-gutter pt-[max(1rem,env(safe-area-inset-top))] pb-10">
        <Link
          href="/you"
          className="text-[0.7rem] font-display uppercase tracking-display text-brand-400 hover:text-brand focus-visible:text-brand"
        >
          ← You
        </Link>
        <p className="mt-3 font-display uppercase tracking-display text-caution-300 text-xs">
          Danger zone
        </p>
        <h1 className="mt-2 font-display uppercase tracking-display text-white text-2xl md:text-3xl leading-tight">
          Delete your account.
        </h1>
        <p className="mt-3 text-sm text-white/85">
          This removes your account for{" "}
          <span className="text-white">{user.email ?? user.player.name}</span>{" "}
          and every piece of data attached to it: training sessions, PBs,
          custom programmes, meal plan, recovery consents. We keep no
          copy. It cannot be undone.
        </p>

        {error === "confirm" ? (
          <p
            role="alert"
            className="mt-4 rounded-md border border-caution-500/40 bg-caution-500/10 px-3 py-2 text-xs text-caution-200"
          >
            Type the word <span className="font-semibold">delete</span> to
            confirm.
          </p>
        ) : null}

        <div className="mt-8 rounded-card border border-caution-500/25 bg-caution-500/5 p-5">
          <DeleteAccountForm />
        </div>

        <p className="mt-6 text-xs text-muted">
          Changed your mind?{" "}
          <Link
            href="/you"
            className="text-brand-400 underline underline-offset-4 hover:text-brand"
          >
            Back to You
          </Link>
          .
        </p>
      </div>
    </AppShell>
  );
}
