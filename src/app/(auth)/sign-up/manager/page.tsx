import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/Button";
import { Field, Input, Label, ErrorText, HelpText } from "@/components/ui/Field";
import { signUpAsManager } from "../../actions";

type Props = {
  searchParams: Promise<{ error?: string; pending?: string }>;
};

export default async function ManagerSignUpPage({ searchParams }: Props) {
  const { error, pending } = await searchParams;

  if (pending === "1") {
    return (
      <AuthShell
      footer={<BackButton />}
    >
        <div className="space-y-4">
          <h1 className="section-title">Check your email</h1>
          <p className="text-sm text-muted">
            We've sent a confirmation link to the email you signed up with. Open it
            to finish creating your coach account, then we'll ask a few things
            about you and your club.
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      footer={<BackButton />}
    >
      <div className="space-y-6">
        <div>
          <p className="font-display uppercase tracking-display text-brand-400 text-xs">
            Coach sign-up
          </p>
          <h1 className="section-title mt-2">Create a coach account.</h1>
          <p className="mt-1 text-sm text-muted">
            For managers and coaches only. Players sign up on the{" "}
            <Link href="/sign-up" className="text-brand-400 hover:text-brand">
              player page
            </Link>
            .
          </p>
        </div>

        {error ? <ErrorText>{error}</ErrorText> : null}

        <form action={signUpAsManager} className="space-y-4">
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
            <HelpText>At least 8 characters.</HelpText>
          </Field>
          <Button type="submit" className="w-full">Create coach account</Button>
        </form>

        <div className="rounded-xl border border-white/5 bg-ink-900/50 p-3">
          <p className="text-xs text-muted">
            Coach accounts see the players on their team who have opted in to
            share sessions, readiness or personal bests — one field at a time,
            player-controlled. You never see anything a player hasn't turned
            on.
          </p>
        </div>

        <HelpText className="text-center">
          Already have a coach account?{" "}
          <Link href="/sign-in" className="text-brand-400 hover:text-brand">Sign in</Link>
        </HelpText>
      </div>
    </AuthShell>
  );
}
