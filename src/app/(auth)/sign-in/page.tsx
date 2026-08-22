import Link from "next/link";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/Button";
import { Field, Input, Label, ErrorText, HelpText } from "@/components/ui/Field";
import { signInWithPassword, sendMagicLink } from "../actions";

type Props = {
  searchParams: Promise<{
    error?: string;
    method?: string;
    sent?: string;
    next?: string;
  }>;
};

export default async function SignInPage({ searchParams }: Props) {
  const { error, method, sent, next } = await searchParams;
  const isMagic = method === "magic";
  const nextParam = next && next.startsWith("/") ? next : "/";

  return (
    <AuthShell>
      <div className="space-y-6">
        <div>
          <h1 className="section-title">Sign in</h1>
          <p className="mt-1 text-sm text-muted">Welcome back.</p>
        </div>

        {error ? <ErrorText>{error}</ErrorText> : null}
        {sent ? (
          <p className="rounded-md border border-mint/30 bg-mint/10 px-3 py-2 text-xs text-mint-400">
            Check your email for a sign-in link.
          </p>
        ) : null}

        {isMagic ? (
          <form action={sendMagicLink} className="space-y-4">
            <input type="hidden" name="next" value={nextParam} />
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" autoComplete="email" required />
            </Field>
            <Button type="submit" className="w-full">Email me a link</Button>
            <p className="text-center text-xs text-muted">
              <Link href={`/sign-in${nextParam !== "/" ? `?next=${encodeURIComponent(nextParam)}` : ""}`} className="text-mint-400 hover:text-mint">
                Use password instead
              </Link>
            </p>
          </form>
        ) : (
          <form action={signInWithPassword} className="space-y-4">
            <input type="hidden" name="next" value={nextParam} />
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" autoComplete="email" required />
            </Field>
            <Field>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" autoComplete="current-password" required />
            </Field>
            <Button type="submit" className="w-full">Sign in</Button>
            <p className="text-center text-xs text-muted">
              <Link
                href={`/sign-in?method=magic${nextParam !== "/" ? `&next=${encodeURIComponent(nextParam)}` : ""}`}
                className="text-mint-400 hover:text-mint"
              >
                Email me a magic link instead
              </Link>
            </p>
          </form>
        )}

        <HelpText className="text-center">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-mint-400 hover:text-mint">Create one</Link>
        </HelpText>
      </div>
    </AuthShell>
  );
}
