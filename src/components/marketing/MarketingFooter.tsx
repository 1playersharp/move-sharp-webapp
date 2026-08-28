import Link from "next/link";
import { WordMark } from "@/components/ui/Header";

// Shared footer for the marketing surfaces (/, /preview,
// /for-parents). Server component — no state, no client bundle.

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/5 bg-ink-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-10">
        <div>
          <Link
            href="/"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 rounded"
          >
            <WordMark className="text-xl" />
          </Link>
          <p className="mt-2 max-w-xs text-xs text-white/60">
            Athletic training for the athlete you want to be.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-4 text-sm sm:grid-cols-3">
          <div>
            <p className="font-display uppercase tracking-display text-mint-400 text-[0.65rem]">
              Product
            </p>
            <ul className="mt-3 space-y-2 text-white/75">
              <li><Link href="/preview" className="hover:text-mint focus-visible:text-mint focus-visible:outline-none">See a session</Link></li>
              <li><Link href="/for-parents" className="hover:text-mint focus-visible:text-mint focus-visible:outline-none">For parents</Link></li>
              <li><Link href="/sign-in" className="hover:text-mint focus-visible:text-mint focus-visible:outline-none">Sign in</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-display uppercase tracking-display text-mint-400 text-[0.65rem]">
              Legal
            </p>
            <ul className="mt-3 space-y-2 text-white/75">
              <li><Link href="/privacy" className="hover:text-mint focus-visible:text-mint focus-visible:outline-none">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-mint focus-visible:text-mint focus-visible:outline-none">Terms</Link></li>
              <li>
                <a
                  href="mailto:hello@movesharp.app"
                  className="hover:text-mint focus-visible:text-mint focus-visible:outline-none"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="font-display uppercase tracking-display text-mint-400 text-[0.65rem]">
              Family
            </p>
            <ul className="mt-3 space-y-2 text-white/75">
              <li>
                {/* Placeholder — replace href once PlaySharp has a public
                    surface. Deliberately not linked to # so it degrades
                    into an inert list item rather than a broken link. */}
                <span className="text-white/40" aria-disabled="true">
                  PlaySharp (coming soon)
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="border-t border-white/5">
        <p className="mx-auto max-w-6xl px-5 py-4 text-center text-[0.65rem] text-white/40 sm:px-10">
          © {new Date().getFullYear()} MoveSharp. Made for young footballers.
        </p>
      </div>
    </footer>
  );
}
