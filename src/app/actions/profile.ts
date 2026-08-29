"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Prisma, type Allergen, type DietPreference, type Position, type TrainingContext } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePlayer, requireManager } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isEligibleAge } from "@/lib/age-band";
import { ALLERGENS } from "@/lib/constants/allergens";
import { POSITIONS } from "@/lib/constants/positions";

const ALLERGEN_KEYS = new Set(ALLERGENS.map((a) => a.key));
const POSITION_KEYS = new Set(POSITIONS.map((p) => p.key));
const DIET_KEYS = new Set<DietPreference>(["omnivore", "pescatarian", "vegetarian", "vegan"]);
const CONTEXT_KEYS = new Set<TrainingContext>(["home", "gym"]);

function fail(page: string, msg: string): never {
  redirect(`/you/${page}?error=${encodeURIComponent(msg)}`);
}

export async function updateProfile(formData: FormData) {
  const user = await requirePlayer();

  const name = String(formData.get("name") ?? "").trim();
  const dobRaw = String(formData.get("dateOfBirth") ?? "").trim();
  const positionRaw = String(formData.get("position") ?? "").trim();
  const club = String(formData.get("club") ?? "").trim() || null;

  if (name.length < 2) fail("profile", "Enter your name.");
  if (!dobRaw) fail("profile", "Enter your date of birth.");

  const dateOfBirth = new Date(dobRaw);
  if (Number.isNaN(dateOfBirth.getTime())) fail("profile", "That date of birth doesn't look right.");
  if (!isEligibleAge(dateOfBirth)) fail("profile", "MoveSharp is for players aged 13 to 18.");

  const position: Position | null =
    positionRaw && POSITION_KEYS.has(positionRaw as Position)
      ? (positionRaw as Position)
      : null;

  try {
    await prisma.player.update({
      where: { id: user.player.id },
      data: { name, dateOfBirth, position, club },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      fail("profile", "Couldn't save changes — try again.");
    }
    throw e;
  }

  revalidatePath("/you");
  revalidatePath("/you/profile");
  redirect("/you?saved=profile");
}

export async function updateDiet(formData: FormData) {
  const user = await requirePlayer();

  const dietRaw = String(formData.get("dietPreference") ?? "").trim();
  const dietPreference: DietPreference = DIET_KEYS.has(dietRaw as DietPreference)
    ? (dietRaw as DietPreference)
    : "omnivore";

  const allergies: Allergen[] = ALLERGENS.filter(
    (a) => formData.get(`allergy_${a.key}`) === "on",
  ).map((a) => a.key);
  const safeAllergies = allergies.filter((a) => ALLERGEN_KEYS.has(a));

  const noteRaw = String(formData.get("allergyNote") ?? "").trim();
  const allergyNote = noteRaw ? noteRaw.slice(0, 200) : null;

  await prisma.player.update({
    where: { id: user.player.id },
    data: {
      dietPreference,
      allergies: safeAllergies,
      allergyNote,
    },
  });

  revalidatePath("/you");
  revalidatePath("/you/diet");
  revalidatePath("/fuel");
  revalidatePath("/fuel/recipes");
  redirect("/you?saved=diet");
}

export async function updateTrainingContext(formData: FormData) {
  const user = await requirePlayer();
  const ctxRaw = String(formData.get("trainingContext") ?? "").trim();
  if (!CONTEXT_KEYS.has(ctxRaw as TrainingContext)) redirect("/you");

  await prisma.player.update({
    where: { id: user.player.id },
    data: { trainingContext: ctxRaw as TrainingContext },
  });

  revalidatePath("/you");
  revalidatePath("/train");
  revalidatePath("/train/exercise");
  redirect("/you?saved=context");
}

// One-click account deletion per the /for-parents promise. Requires a
// typed "delete" confirmation on the client and re-checks server-side.
// User cascades in the schema handle Player, Session, MetricEntry,
// custom Programmes, mealPlan, recoveryConsent — nothing left behind.
// Also signs the Supabase session out so the browser is clean.
export async function deleteAccount(formData: FormData) {
  const user = await requirePlayer();
  const confirm = String(formData.get("confirm") ?? "").trim().toLowerCase();
  if (confirm !== "delete") redirect("/you/delete?error=confirm");

  await prisma.user.delete({ where: { id: user.id } });

  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();

  redirect("/?deleted=1");
}

// Coach-side delete. Same typed-confirm pattern; the cascade migration
// on Team.createdBy means deleting the User also drops every team the
// coach owned (Team → memberships → JoinConsent all cascade). The
// /coach/delete page shows the coach the impact before it runs so they
// can weigh the tradeoff.
export async function deleteCoachAccount(formData: FormData) {
  const user = await requireManager();
  const confirm = String(formData.get("confirm") ?? "").trim().toLowerCase();
  if (confirm !== "delete") redirect("/coach/delete?error=confirm");

  await prisma.user.delete({ where: { id: user.id } });

  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();

  redirect("/?deleted=1");
}
