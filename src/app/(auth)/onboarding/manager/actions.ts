"use server";

import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAuthUser } from "@/lib/auth";

function fail(error: string): never {
  redirect(`/onboarding/manager?error=${encodeURIComponent(error)}`);
}

export async function completeManagerOnboarding(formData: FormData) {
  const authUser = await requireAuthUser();

  const name = String(formData.get("name") ?? "").trim();
  const club = String(formData.get("club") ?? "").trim() || null;
  const phone = String(formData.get("phone") ?? "").trim() || null;

  if (name.length < 2) fail("Enter your name.");

  const email = authUser.email ?? null;
  if (!email) fail("Your account has no email address on file.");

  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.upsert({
        where: { id: authUser.id },
        create: { id: authUser.id, email, role: "manager" },
        // If the row exists (e.g. auth callback pre-created it) make sure
        // the role reflects the intent — a player never lands here.
        update: { email, role: "manager" },
      });
      await tx.manager.upsert({
        where: { userId: authUser.id },
        create: { userId: authUser.id, name, club, phone },
        update: { name, club, phone },
      });
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      fail("Couldn't save your profile — try again.");
    }
    throw e;
  }

  redirect("/coach");
}
