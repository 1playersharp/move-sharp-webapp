import { prisma } from "@/lib/prisma";

// A consent is treated as still-valid within this window so a mid-
// session refresh doesn't force a re-ack. The disclaimer requirement
// is one ack per Returning-from-injury session — a 30-minute window
// is a pragmatic proxy for "the same session".
export const CONSENT_WINDOW_MS = 30 * 60 * 1000;

// Read-only check used by the session page to decide whether to
// render the interstitial or the session itself. Lives outside the
// "use server" file because Server Actions files can only export
// async functions callable from the client — non-action helpers stay
// here.
export async function hasRecentRecoveryConsent(
  playerId: string,
): Promise<boolean> {
  const since = new Date(Date.now() - CONSENT_WINDOW_MS);
  const row = await prisma.recoveryConsent.findFirst({
    where: { playerId, createdAt: { gte: since } },
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });
  return Boolean(row);
}
