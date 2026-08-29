import "server-only";
import { redirect } from "next/navigation";
import type { Manager, Player, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DEV_BYPASS, DEV_EMAIL, DEV_USER_ID, ensureDevPlayer } from "@/lib/dev-bypass";

export async function getAuthUser() {
  if (DEV_BYPASS) {
    return { id: DEV_USER_ID, email: DEV_EMAIL } as { id: string; email: string };
  }
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Returns the linked User row (with both profiles included) for the
// signed-in Supabase auth user, or null. Does NOT auto-create the User
// row — that happens during onboarding.
export async function getCurrentUser(): Promise<
  (User & { player: Player | null; manager: Manager | null }) | null
> {
  if (DEV_BYPASS) {
    const devPlayer = await ensureDevPlayer();
    return { ...devPlayer, manager: null };
  }
  const authUser = await getAuthUser();
  if (!authUser) return null;
  return prisma.user.findUnique({
    where: { id: authUser.id },
    include: { player: true, manager: true },
  });
}

// Guard for pages that require a signed-in Supabase auth user.
// Redirects to /sign-in if not.
export async function requireAuthUser() {
  const authUser = await getAuthUser();
  if (!authUser) redirect("/sign-in");
  return authUser;
}

// Guard for pages that require a fully-onboarded player.
// Redirects to /sign-in if unauth, /onboarding if auth-only, /coach if
// this account is actually a manager landing on a player surface.
export async function requirePlayer(): Promise<
  User & { player: Player }
> {
  if (DEV_BYPASS) return ensureDevPlayer();
  const authUser = await requireAuthUser();
  const user = await prisma.user.findUnique({
    where: { id: authUser.id },
    include: { player: true, manager: true },
  });
  if (!user) redirect("/onboarding");
  if (user.manager && !user.player) redirect("/coach");
  if (!user.player) redirect("/onboarding");
  return user as User & { player: Player };
}

// Guard for pages that require a fully-onboarded manager.
// Redirects to /sign-in if unauth, /onboarding/manager if auth-only,
// / (player home) if this account is actually a player landing on a
// coach surface.
export async function requireManager(): Promise<
  User & { manager: Manager }
> {
  if (DEV_BYPASS) redirect("/");
  const authUser = await requireAuthUser();
  const user = await prisma.user.findUnique({
    where: { id: authUser.id },
    include: { player: true, manager: true },
  });
  if (!user) redirect("/onboarding/manager");
  if (user.player && !user.manager) redirect("/");
  if (!user.manager) redirect("/onboarding/manager");
  return user as User & { manager: Manager };
}
