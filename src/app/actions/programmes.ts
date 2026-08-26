"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requirePlayer } from "@/lib/auth";

// Delete a custom programme belonging to the current player. Seeded
// library programmes (isCustom=false) and other players' custom blocks
// are silently ignored — the where clause enforces ownership so a bad
// id or crafted form never touches someone else's data.
export async function deleteCustomProgramme(formData: FormData) {
  const user = await requirePlayer();
  const id = String(formData.get("id") ?? "");
  // Confirmation-by-typing (see DeleteProgrammeConfirm) — the client
  // gates the button, but validate server-side too so a crafted request
  // can't skip the confirmation.
  const confirm = String(formData.get("confirm") ?? "").trim().toLowerCase();
  if (!id || confirm !== "delete") redirect("/train");

  await prisma.programme.deleteMany({
    where: {
      id,
      isCustom: true,
      createdForPlayerId: user.player.id,
    },
  });

  revalidatePath("/train");
  redirect("/train");
}
