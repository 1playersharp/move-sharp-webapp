"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requirePlayer } from "@/lib/auth";
import { ageInYears } from "@/lib/age-band";
import { injurySessionBySlug } from "@/lib/recovery/content";

export async function acknowledgeRecoveryConsent(formData: FormData) {
  const user = await requirePlayer();

  const slug = String(formData.get("slug") ?? "").trim();
  const cleared = String(formData.get("cleared") ?? "");

  if (!slug || !injurySessionBySlug(slug)) {
    redirect("/recovery/returning-from-injury");
  }

  // Server-side guard — the client button gates on the checkbox but a
  // crafted request could skip it. Refuse without the explicit "on".
  if (cleared !== "on") {
    redirect(`/recovery/returning-from-injury/${slug}`);
  }

  const isUnder16 = ageInYears(user.player.dateOfBirth) < 16;

  await prisma.recoveryConsent.create({
    data: {
      playerId: user.player.id,
      isUnder16,
      sessionSlug: slug,
    },
  });

  revalidatePath(`/recovery/returning-from-injury/${slug}`);
  redirect(`/recovery/returning-from-injury/${slug}`);
}
