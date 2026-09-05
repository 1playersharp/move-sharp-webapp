import Link from "next/link";
import type { Allergen, DietPreference, FuelTag } from "@prisma/client";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { requirePlayer } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FUEL_RAILS, FUEL_TAG_LABEL } from "@/lib/fuel/rails";
import { RecipeCard } from "@/components/fuel/RecipeCard";
import { ALLERGENS } from "@/lib/constants/allergens";

const VALID_TAGS = new Set<FuelTag>([
  "before_training",
  "after_training",
  "match_day",
  "pre_match",
  "hydration",
]);

// Strictness order: higher number = stricter. A chip can narrow the
// player's saved diet preference but never widen it, so we clamp any
// requested diet to be >= the saved preference.
const DIET_ORDER: Record<DietPreference, number> = {
  omnivore: 0,
  pescatarian: 1,
  vegetarian: 2,
  vegan: 3,
};
const DIET_LABEL: Record<DietPreference, string> = {
  omnivore: "All",
  pescatarian: "Pescatarian",
  vegetarian: "Vegetarian",
  vegan: "Vegan",
};

const ALLERGEN_KEYS = new Set<Allergen>(ALLERGENS.map((a) => a.key));

function parseHideList(raw: string | undefined): Allergen[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is Allergen => ALLERGEN_KEYS.has(s as Allergen));
}

type Props = {
  searchParams: Promise<{ tag?: string; diet?: string; hide?: string }>;
};

export default async function RecipesListPage({ searchParams }: Props) {
  const user = await requirePlayer();
  const playerAllergies = user.player.allergies;
  const playerAllergySet = new Set(playerAllergies);
  const savedDiet = user.player.dietPreference;
  const { tag: tagRaw, diet: dietRaw, hide: hideRaw } = await searchParams;

  const activeTag: FuelTag | null =
    tagRaw && VALID_TAGS.has(tagRaw as FuelTag) ? (tagRaw as FuelTag) : null;

  const requestedDiet: DietPreference | null =
    dietRaw && (dietRaw as DietPreference) in DIET_ORDER
      ? (dietRaw as DietPreference)
      : null;
  // Clamp: user can only pick a diet at least as strict as their saved one.
  const effectiveDiet: DietPreference =
    requestedDiet && DIET_ORDER[requestedDiet] >= DIET_ORDER[savedDiet]
      ? requestedDiet
      : savedDiet;

  // Extra runtime allergen filter — additive to the saved onboarding
  // allergies, never subtractive. Player picks any combination of the
  // 14; a recipe carrying any of them is hidden.
  const extraHide = parseHideList(hideRaw).filter((a) => !playerAllergySet.has(a));
  const extraHideSet = new Set(extraHide);
  const hideAll = [...playerAllergies, ...extraHide];

  const recipes = await prisma.recipe.findMany({
    where: {
      ...(hideAll.length ? { NOT: { allergens: { hasSome: hideAll } } } : {}),
      dietSuitability: { has: effectiveDiet },
      ...(activeTag ? { fuelTags: { has: activeTag } } : {}),
    },
    select: {
      slug: true,
      name: true,
      servings: true,
      fuelTags: true,
    },
    orderBy: { name: "asc" },
  });

  const buildHref = (opts: {
    tag?: FuelTag | null;
    diet?: DietPreference | null;
    hide?: Allergen[] | null;
  }) => {
    const params = new URLSearchParams();
    const nextTag = opts.tag === undefined ? activeTag : opts.tag;
    const nextDiet = opts.diet === undefined ? effectiveDiet : opts.diet;
    const nextHide = opts.hide === undefined ? extraHide : opts.hide ?? [];
    if (nextTag) params.set("tag", nextTag);
    if (nextDiet && nextDiet !== savedDiet) params.set("diet", nextDiet);
    if (nextHide.length) params.set("hide", nextHide.join(","));
    const qs = params.toString();
    return `/fuel/recipes${qs ? `?${qs}` : ""}`;
  };

  const toggleHide = (a: Allergen): Allergen[] =>
    extraHideSet.has(a) ? extraHide.filter((x) => x !== a) : [...extraHide, a];

  // Only show diet chips at least as strict as the saved preference.
  const selectableDiets = (Object.keys(DIET_ORDER) as DietPreference[])
    .filter((d) => DIET_ORDER[d] >= DIET_ORDER[savedDiet]);

  return (
    <AppShell>
      <Header
        title={(activeTag && FUEL_TAG_LABEL[activeTag]) || "All recipes"}
        subtitle={
          activeTag
            ? "Filtered by rail."
            : "Everything, ordered A to Z."
        }
      />

      <div className="space-y-4 shell-gutter pb-6">
        <section className="space-y-2">
          <p className="font-display uppercase tracking-display text-muted text-[0.65rem]">
            Rail
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Link
              href={buildHref({ tag: null })}
              className={`rounded-full border px-3 py-1 font-display uppercase tracking-display text-[0.65rem] ${
                activeTag === null
                  ? "border-brand bg-brand text-ink-950"
                  : "border-white/10 text-muted hover:border-brand hover:text-brand"
              }`}
            >
              All
            </Link>
            {FUEL_RAILS.map((rail) => (
              <Link
                key={rail.tag}
                href={buildHref({ tag: rail.tag })}
                className={`rounded-full border px-3 py-1 font-display uppercase tracking-display text-[0.65rem] ${
                  activeTag === rail.tag
                    ? "border-brand bg-brand text-ink-950"
                    : "border-white/10 text-muted hover:border-brand hover:text-brand"
                }`}
              >
                {rail.title}
              </Link>
            ))}
          </div>
        </section>

        {selectableDiets.length > 1 ? (
          <section className="space-y-2">
            <p className="font-display uppercase tracking-display text-muted text-[0.65rem]">
              Diet {savedDiet !== "omnivore" ? `(saved: ${savedDiet})` : ""}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {selectableDiets.map((d) => (
                <Link
                  key={d}
                  href={buildHref({ diet: d === savedDiet ? null : d })}
                  className={`rounded-full border px-3 py-1 font-display uppercase tracking-display text-[0.65rem] ${
                    effectiveDiet === d
                      ? "border-brand bg-brand text-ink-950"
                      : "border-white/10 text-muted hover:border-brand hover:text-brand"
                  }`}
                >
                  {DIET_LABEL[d]}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="space-y-2">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-display uppercase tracking-display text-muted text-[0.65rem]">
              Hide allergens
            </p>
            {extraHide.length > 0 ? (
              <Link
                href={buildHref({ hide: null })}
                className="text-[0.65rem] font-display uppercase tracking-display text-muted hover:text-brand"
              >
                Clear
              </Link>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ALLERGENS.map((a) => {
              const isSaved = playerAllergySet.has(a.key);
              const isExtra = extraHideSet.has(a.key);
              const active = isSaved || isExtra;
              // Saved allergens are always on and can't be toggled from here
              // — they're an onboarding decision.
              if (isSaved) {
                return (
                  <span
                    key={a.key}
                    title="Saved from onboarding — edit in your profile"
                    className="rounded-full border border-caution/30 bg-caution/10 px-3 py-1 font-display uppercase tracking-display text-[0.65rem] text-caution-400"
                  >
                    {a.label}
                    <span aria-hidden="true" className="ml-1 opacity-60">•</span>
                  </span>
                );
              }
              return (
                <Link
                  key={a.key}
                  href={buildHref({ hide: toggleHide(a.key) })}
                  className={`rounded-full border px-3 py-1 font-display uppercase tracking-display text-[0.65rem] transition-colors ${
                    active
                      ? "border-brand bg-brand text-ink-950"
                      : "border-white/10 text-muted hover:border-brand hover:text-brand"
                  }`}
                >
                  {a.label}
                </Link>
              );
            })}
          </div>
        </section>

        {(playerAllergies.length > 0 || extraHide.length > 0 || effectiveDiet !== "omnivore") ? (
          <p className="text-xs text-muted">
            {[
              effectiveDiet !== "omnivore" ? DIET_LABEL[effectiveDiet].toLowerCase() : null,
              playerAllergies.length ? `${playerAllergies.length} saved allergen${playerAllergies.length === 1 ? "" : "s"}` : null,
              extraHide.length ? `${extraHide.length} extra hidden` : null,
            ]
              .filter(Boolean)
              .join(" · ")}
            {" · "}
            <span className="text-muted">{recipes.length} recipe{recipes.length === 1 ? "" : "s"} shown</span>
          </p>
        ) : (
          <p className="text-xs text-muted">
            <span className="text-muted">{recipes.length} recipe{recipes.length === 1 ? "" : "s"} shown</span>
          </p>
        )}

        {recipes.length === 0 ? (
          <EmptyState
            title="No recipes"
            body={
              activeTag
                ? "Nothing matches this rail with your current filter."
                : "The library is empty right now."
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {recipes.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
