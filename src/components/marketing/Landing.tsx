import Link from "next/link";
import { WordMark } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";

export function Landing() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 pt-[max(3rem,env(safe-area-inset-top))] pb-8">
      <div className="mb-10">
        <WordMark className="text-3xl" />
      </div>

      <div className="flex-1 space-y-6">
        <h1 className="font-display uppercase tracking-display text-4xl leading-[1.05] text-white">
          Faster. Stronger.
          <br />
          Harder to move.
        </h1>
        <p className="text-base text-muted">
          Athletic training for 13–18-year-old footballers. Build the qualities that keep you
          on the ball — at home with a band, or in the gym.
        </p>
      </div>

      <div className="mt-10 space-y-3">
        <Link href="/sign-up" className="block">
          <Button size="lg" className="w-full">Create account</Button>
        </Link>
        <Link href="/sign-in" className="block">
          <Button size="lg" variant="secondary" className="w-full">Sign in</Button>
        </Link>
      </div>
    </div>
  );
}
