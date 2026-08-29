import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Public diagnostic endpoint. Answers one question: can this deployment
// reach Postgres? Every other public route is anonymous and never
// touches Prisma, so a broken DATABASE_URL on the host is invisible
// until a signed-in page 500s.
//
// Deliberately leaks nothing: booleans, a duration, and whether the env
// vars are *present* — never their values, never the error detail.

export const dynamic = "force-dynamic";

export async function GET() {
  const envPresent = {
    DATABASE_URL: Boolean(process.env.DATABASE_URL),
    DIRECT_URL: Boolean(process.env.DIRECT_URL),
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  };

  const startedAt = Date.now();
  let database: "ok" | "unreachable" = "unreachable";
  // Coarse reason only — enough to tell a missing env var from a
  // network block, without echoing connection strings back publicly.
  let reason: string | undefined;

  try {
    await prisma.$queryRaw`SELECT 1`;
    database = "ok";
  } catch (e) {
    reason =
      e instanceof Error
        ? e.message.slice(0, 120).replace(/postgres(ql)?:\/\/\S+/gi, "[redacted]")
        : "unknown";
  }

  const healthy = database === "ok";

  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      database,
      ...(reason ? { reason } : {}),
      dbLatencyMs: Date.now() - startedAt,
      envPresent,
    },
    { status: healthy ? 200 : 503 },
  );
}
