import Link from "next/link";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/Button";
import { Field, Input, Label, ErrorText, HelpText } from "@/components/ui/Field";
import { signUpWithPassword } from "../actions";

type Props = {
  searchParams: Promise<{ error?: string; pending?: string }>;
};

export default async function SignUpPage({ searchParams }: Props) {
  const { error, pending } = await searchParams;

  if (pending === "1") {
    return (
      <AuthShell variant="hero">
        <div className="space-y-4">
          <h1 className="section-title">Check your email</h1>
          <p className="text-sm text-muted">
            We've sent a confirmation link to the email you signed up with. Open it to finish
            creating your account, then you'll be asked a few questions about your training.
          </p>
          <HelpText>
            Didn't get it? Check your junk folder, or{" "}
            <Link href="/sign-up" className="text-brand-400 hover:text-brand">try again</Link>.
          </HelpText>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell variant="hero">
      <div className="space-y-6">
        <div>
          <h1 className="section-title">Create account</h1>
          <p className="mt-1 text-sm text-muted">Only takes a minute.</p>
        </div>

        {error ? <ErrorText>{error}</ErrorText> : null}

        <form action={signUpWithPassword} className="space-y-4">
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
          <Button type="submit" className="w-full">Create account</Button>
        </form>

        <div className="space-y-2 rounded-xl border border-white/5 bg-ink-900/50 p-3">
          <p className="text-xs text-muted">
            MoveSharp is for 13–18-year-old players. We ask a few onboarding questions
            (name, date of birth, position, allergies) so training and food suggestions
            are safe for you. Your data stays private — a manager can only see what you
            choose to share.
          </p>
        </div>

        <HelpText className="text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-brand-400 hover:text-brand">Sign in</Link>
        </HelpText>
        <HelpText className="text-center">
          Coach or manager?{" "}
          <Link href="/sign-up/manager" className="text-brand-400 hover:text-brand">
            Create a coach account
          </Link>
        </HelpText>
      </div>
    </AuthShell>
  );
}
