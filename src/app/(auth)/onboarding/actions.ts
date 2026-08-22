"use server";

import { redirect } from "next/navigation";
import { Prisma, type Allergen, type Position } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAuthUser } from "@/lib/auth";
import { isEligibleAge } from "@/lib/age-band";
import { ALLERGENS } from "@/lib/constants/allergens";
import { POSITIONS } from "@/lib/constants/positions";

const ALLERGEN_KEYS = new Set(ALLERGENS.map((a) => a.key));
const POSITION_KEYS = new Set(POSITIONS.map((p) => p.key));

function fail(error: string): never {
  redirect(`/onboarding?error=${encodeURIComponent(error)}`);
}

export async function completeOnboarding(formData: FormData) {
  const authUser = await requireAuthUser();

  const name = String(formData.get("name") ?? "").trim();
  const dobRaw = String(formData.get("dateOfBirth") ?? "").trim();
  const positionRaw = String(formData.get("position") ?? "").trim();
  const club = String(formData.get("club") ?? "").trim() || null;
  const allergyNoteRaw = String(formData.get("allergyNote") ?? "").trim();
  const allergyNote = allergyNoteRaw ? allergyNoteRaw.slice(0, 200) : null;

  if (name.length < 2) fail("Enter your name.");
  if (!dobRaw) fail("Enter your date of birth.");

  const dateOfBirth = new Date(dobRaw);
  if (Number.isNaN(dateOfBirth.getTime())) fail("That date of birth doesn't look right.");

  if (!isEligibleAge(dateOfBirth)) {
    fail("MoveSharp is for players aged 13 to 18.");
  }

  const position: Position | null =
    positionRaw && POSITION_KEYS.has(positionRaw as Position)
      ? (positionRaw as Position)
      : null;

  const allergies: Allergen[] = ALLERGENS.filter((a) =>
    formData.get(`allergy_${a.key}`) === "on",
  ).map((a) => a.key);

  // Defensive filter in case the client posts an unknown enum value.
  const safeAllergies = allergies.filter((a) => ALLERGEN_KEYS.has(a));

  const email = authUser.email ?? null;
  if (!email) fail("Your account has no email address on file.");

  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.upsert({
        where: { id: authUser.id },
        create: { id: authUser.id, email, role: "player" },
        update: { email },
      });
      await tx.player.upsert({
        where: { userId: authUser.id },
        create: {
          userId: authUser.id,
          name,
          dateOfBirth,
          position,
          club,
          allergies: safeAllergies,
          allergyNote,
        },
        update: {
          name,
          dateOfBirth,
          position,
          club,
          allergies: safeAllergies,
          allergyNote,
        },
      });
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      fail("Couldn't save your profile — try again.");
    }
    throw e;
  }

  redirect("/");
}
