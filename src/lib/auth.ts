import "server-only";
import { redirect } from "next/navigation";
import type { Player, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAuthUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Returns the linked User row for the signed-in Supabase auth user, or null.
// Does NOT auto-create the User row — that happens during onboarding.
export async function getCurrentUser(): Promise<
  (User & { player: Player | null }) | null
> {
  const authUser = await getAuthUser();
  if (!authUser) return null;
  return prisma.user.findUnique({
    where: { id: authUser.id },
    include: { player: true },
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
// Redirects to /sign-in if unauth, /onboarding if auth-only.
export async function requirePlayer(): Promise<
  User & { player: Player }
> {
  const authUser = await requireAuthUser();
  const user = await prisma.user.findUnique({
    where: { id: authUser.id },
    include: { player: true },
  });
  if (!user || !user.player) redirect("/onboarding");
  return user as User & { player: Player };
}
