import "server-only";
import type { Player, User } from "@prisma/client";

// Set MOVESHARP_DEV_BYPASS=1 in .env.local to walk the app without signing in.
// Force-disabled in production for safety even if the env leaks — never let
// a synthetic player replace a real signed-in one on a deployed build.
export const DEV_BYPASS =
  process.env.NODE_ENV !== "production" && process.env.MOVESHARP_DEV_BYPASS === "1";

// A stable UUID so Prisma queries and later re-runs all hit the same row.
export const DEV_USER_ID = "00000000-0000-4000-8000-000000000001";
export const DEV_EMAIL = "dev@movesharp.local";

export type DevPlayerFixture = User & { player: Player };

// A deferred Prisma import — kept out of client bundles that import this file.
// (dev-bypass.ts is server-only, but avoid the import cost at module load anyway.)
export async function ensureDevPlayer(): Promise<DevPlayerFixture> {
  const { prisma } = await import("@/lib/prisma");

  const dob = new Date(Date.UTC(2010, 0, 1)); // 16 at time of writing → U16_U18

  const user = await prisma.user.upsert({
    where: { id: DEV_USER_ID },
    create: { id: DEV_USER_ID, email: DEV_EMAIL, role: "player" },
    update: {},
  });

  const player = await prisma.player.upsert({
    where: { userId: DEV_USER_ID },
    create: {
      userId: DEV_USER_ID,
      name: "Dev Player",
      dateOfBirth: dob,
      position: "central_mid",
      allergies: [],
    },
    update: {},
  });

  return { ...user, player };
}
