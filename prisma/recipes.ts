import type { Allergen, DietPreference, FuelTag } from "@prisma/client";

export type RecipeSeed = {
  slug: string;
  name: string;
  servings: number;
  ingredients: Array<{ name: string; quantity: string; note?: string }>;
  allergens: Allergen[];
  dietSuitability: DietPreference[];
  fuelTags: FuelTag[];
  carbsG: number;
  proteinG: number;
  instructions: string;
};

// A vegan dish fits every diet; a vegetarian dish drops vegan; a fish
// dish is pescatarian + omnivore; a meat dish is omnivore only.
const VEGAN: DietPreference[] = ["vegan", "vegetarian", "pescatarian", "omnivore"];
const VEGETARIAN: DietPreference[] = ["vegetarian", "pescatarian", "omnivore"];
const PESCATARIAN: DietPreference[] = ["pescatarian", "omnivore"];
const OMNIVORE_ONLY: DietPreference[] = ["omnivore"];

// 15 starter recipes — youth-athlete friendly, cheap and quick, covering
// all five Fuel Rails. Allergen lists reflect the UK/EU 14 declared list
// and are conservative (e.g. porridge oats are gluten-listed even if you
// can buy gluten-free oats separately). Macros are per serving and
// approximate — for at-a-glance carbs/protein check, not clinical use.

export const RECIPES: RecipeSeed[] = [
  {
    slug: "overnight-oats-banana-honey",
    name: "Overnight Oats with Banana + Honey",
    servings: 1,
    ingredients: [
      { name: "Porridge oats", quantity: "50g" },
      { name: "Milk", quantity: "150ml", note: "or oat/soya milk" },
      { name: "Banana", quantity: "1, sliced" },
      { name: "Honey", quantity: "1 tsp" },
      { name: "Cinnamon", quantity: "pinch", note: "optional" },
    ],
    allergens: ["cereals_gluten", "milk"],
    dietSuitability: VEGETARIAN,
    fuelTags: ["before_training"],
    carbsG: 75,
    proteinG: 12,
    instructions:
      "Combine oats and milk in a jar the night before. Fridge overnight. In the morning top with banana, honey, cinnamon. Eat cold or warm 60 sec in microwave.",
  },
  {
    slug: "peanut-butter-banana-toast",
    name: "Peanut Butter + Banana Toast",
    servings: 1,
    ingredients: [
      { name: "Wholemeal bread", quantity: "2 slices" },
      { name: "Peanut butter", quantity: "2 tbsp" },
      { name: "Banana", quantity: "1, sliced" },
    ],
    allergens: ["cereals_gluten", "peanuts"],
    dietSuitability: VEGAN,
    fuelTags: ["before_training"],
    carbsG: 60,
    proteinG: 14,
    instructions:
      "Toast the bread. Spread peanut butter thick. Layer banana slices. Done — eat within 60 minutes of training.",
  },
  {
    slug: "scrambled-eggs-toast",
    name: "Scrambled Eggs on Toast",
    servings: 1,
    ingredients: [
      { name: "Eggs", quantity: "3, medium" },
      { name: "Wholemeal bread", quantity: "2 slices" },
      { name: "Butter", quantity: "1 tsp" },
      { name: "Salt + pepper", quantity: "to taste" },
    ],
    allergens: ["eggs", "cereals_gluten", "milk"],
    dietSuitability: VEGETARIAN,
    fuelTags: ["after_training"],
    carbsG: 40,
    proteinG: 26,
    instructions:
      "Whisk eggs with a pinch of salt. Melt butter in a pan on low heat. Add eggs, stir gently until just set — take off heat while still glossy. Serve on toast.",
  },
  {
    slug: "rice-cakes-honey-banana",
    name: "Rice Cakes with Honey + Banana",
    servings: 1,
    ingredients: [
      { name: "Plain rice cakes", quantity: "3" },
      { name: "Honey", quantity: "1 tbsp" },
      { name: "Banana", quantity: "1, sliced" },
    ],
    allergens: [],
    dietSuitability: VEGETARIAN,
    fuelTags: ["before_training", "pre_match"],
    carbsG: 55,
    proteinG: 3,
    instructions:
      "Drizzle honey on rice cakes, top with banana. Fast carbs, no fibre, easy on the stomach 45–60 minutes before training.",
  },
  {
    slug: "greek-yogurt-berry-parfait",
    name: "Greek Yogurt + Berry Parfait",
    servings: 1,
    ingredients: [
      { name: "Greek yogurt", quantity: "200g" },
      { name: "Mixed berries", quantity: "100g", note: "fresh or frozen" },
      { name: "Granola", quantity: "30g" },
      { name: "Honey", quantity: "1 tsp" },
    ],
    allergens: ["milk", "cereals_gluten"],
    dietSuitability: VEGETARIAN,
    fuelTags: ["before_training"],
    carbsG: 45,
    proteinG: 22,
    instructions:
      "Layer yogurt, berries, granola in a bowl. Drizzle honey on top. Grab and go.",
  },
  {
    slug: "chocolate-milk-recovery",
    name: "Chocolate Milk",
    servings: 1,
    ingredients: [
      { name: "Milk", quantity: "400ml", note: "semi-skimmed" },
      { name: "Cocoa powder", quantity: "2 tsp" },
      { name: "Honey or sugar", quantity: "1–2 tsp" },
    ],
    allergens: ["milk"],
    dietSuitability: VEGETARIAN,
    fuelTags: ["after_training", "hydration"],
    carbsG: 30,
    proteinG: 14,
    instructions:
      "Warm 50ml milk, whisk in cocoa + sweetener to a paste, then pour in the rest cold. Shake or whisk. Drink within 30 minutes of finishing training.",
  },
  {
    slug: "chicken-rice-veg-bowl",
    name: "Chicken + Rice Bowl with Veg",
    servings: 2,
    ingredients: [
      { name: "Chicken breast", quantity: "300g" },
      { name: "White or brown rice", quantity: "200g dry" },
      { name: "Mixed veg", quantity: "300g", note: "frozen is fine" },
      { name: "Soy sauce", quantity: "2 tbsp" },
      { name: "Olive oil", quantity: "1 tbsp" },
      { name: "Garlic", quantity: "2 cloves, crushed" },
    ],
    allergens: ["soybeans", "cereals_gluten"],
    dietSuitability: OMNIVORE_ONLY,
    fuelTags: ["after_training", "match_day"],
    carbsG: 90,
    proteinG: 45,
    instructions:
      "Cook rice per packet. Dice chicken, fry in oil + garlic 6–8 min. Add veg + soy, cook 3–4 min more. Serve over rice.",
  },
  {
    slug: "tuna-pasta-salad",
    name: "Tuna Pasta Salad",
    servings: 2,
    ingredients: [
      { name: "Pasta", quantity: "200g dry" },
      { name: "Tinned tuna", quantity: "2 tins, drained" },
      { name: "Sweetcorn", quantity: "1 tin, drained" },
      { name: "Cucumber", quantity: "1/2, diced" },
      { name: "Mayonnaise", quantity: "3 tbsp" },
      { name: "Lemon juice", quantity: "1 tbsp" },
    ],
    allergens: ["cereals_gluten", "fish", "eggs"],
    dietSuitability: PESCATARIAN,
    fuelTags: ["after_training"],
    carbsG: 85,
    proteinG: 35,
    instructions:
      "Cook pasta, drain, cool. Mix everything in a big bowl. Season. Keeps 2 days in the fridge — meal-prep friendly.",
  },
  {
    slug: "beef-sweet-potato-mash",
    name: "Beef Mince + Sweet Potato Mash",
    servings: 2,
    ingredients: [
      { name: "Beef mince (5%)", quantity: "400g" },
      { name: "Sweet potato", quantity: "500g" },
      { name: "Onion", quantity: "1, diced" },
      { name: "Tinned chopped tomatoes", quantity: "1 tin" },
      { name: "Mixed herbs", quantity: "1 tsp" },
      { name: "Olive oil", quantity: "1 tbsp" },
    ],
    allergens: [],
    dietSuitability: OMNIVORE_ONLY,
    fuelTags: ["after_training", "match_day"],
    carbsG: 55,
    proteinG: 48,
    instructions:
      "Peel + cube sweet potato, boil 15 min, mash. Fry onion in oil 3 min, add mince, brown 5 min. Add tomatoes + herbs, simmer 10 min. Serve mince over mash.",
  },
  {
    slug: "chicken-wrap-pre-match",
    name: "Pre-Match Chicken Wrap",
    servings: 1,
    ingredients: [
      { name: "Tortilla wrap", quantity: "1 large" },
      { name: "Cooked chicken", quantity: "100g", note: "leftovers or pre-cooked" },
      { name: "Lettuce", quantity: "handful" },
      { name: "Cucumber", quantity: "1/4, sliced" },
      { name: "Mayonnaise or hummus", quantity: "1 tbsp" },
    ],
    allergens: ["cereals_gluten", "eggs", "sesame"],
    dietSuitability: OMNIVORE_ONLY,
    fuelTags: ["pre_match", "match_day"],
    carbsG: 50,
    proteinG: 32,
    instructions:
      "Warm the wrap 20 sec. Spread mayo/hummus. Layer chicken + salad. Roll tight. Eat 2–3 hours before kick-off.",
  },
  {
    slug: "match-day-turkey-pasta",
    name: "Match-Day Turkey Bolognese",
    servings: 2,
    ingredients: [
      { name: "Pasta", quantity: "200g dry" },
      { name: "Turkey mince", quantity: "400g" },
      { name: "Tinned chopped tomatoes", quantity: "1 tin" },
      { name: "Onion", quantity: "1, diced" },
      { name: "Garlic", quantity: "2 cloves" },
      { name: "Mixed herbs", quantity: "1 tsp" },
      { name: "Olive oil", quantity: "1 tbsp" },
    ],
    allergens: ["cereals_gluten"],
    dietSuitability: OMNIVORE_ONLY,
    fuelTags: ["match_day", "after_training"],
    carbsG: 90,
    proteinG: 50,
    instructions:
      "Boil pasta. In a pan, sweat onion + garlic in oil, add turkey mince, brown 5 min. Add tomatoes + herbs, simmer 10 min. Serve over drained pasta.",
  },
  {
    slug: "homemade-sports-drink",
    name: "Homemade Sports Drink",
    servings: 1,
    ingredients: [
      { name: "Water", quantity: "500ml" },
      { name: "Salt", quantity: "1/4 tsp" },
      { name: "Honey or sugar", quantity: "3 tsp" },
      { name: "Squash or fresh lemon juice", quantity: "2 tbsp", note: "for flavour" },
    ],
    allergens: [],
    dietSuitability: VEGAN,
    fuelTags: ["hydration", "match_day"],
    carbsG: 25,
    proteinG: 0,
    instructions:
      "Dissolve salt + honey in a splash of warm water. Top up with cold water, add squash. Sip during long sessions or hot matches.",
  },
  {
    slug: "recovery-smoothie",
    name: "Recovery Smoothie",
    servings: 1,
    ingredients: [
      { name: "Milk", quantity: "300ml" },
      { name: "Banana", quantity: "1, frozen if you can" },
      { name: "Porridge oats", quantity: "30g" },
      { name: "Honey", quantity: "1 tsp" },
      { name: "Peanut butter", quantity: "1 tbsp", note: "optional" },
    ],
    allergens: ["milk", "cereals_gluten", "peanuts"],
    dietSuitability: VEGETARIAN,
    fuelTags: ["after_training", "hydration"],
    carbsG: 65,
    proteinG: 18,
    instructions:
      "Blend everything for 30–40 seconds until smooth. Drink within 30 minutes of finishing training.",
  },
  {
    slug: "banana-oat-pancakes",
    name: "Banana + Oat Pancakes",
    servings: 2,
    ingredients: [
      { name: "Banana", quantity: "2, ripe" },
      { name: "Eggs", quantity: "2" },
      { name: "Porridge oats", quantity: "60g" },
      { name: "Baking powder", quantity: "1/2 tsp" },
      { name: "Butter or oil", quantity: "for the pan" },
    ],
    allergens: ["eggs", "cereals_gluten", "milk"],
    dietSuitability: VEGETARIAN,
    fuelTags: ["before_training", "pre_match"],
    carbsG: 50,
    proteinG: 14,
    instructions:
      "Mash bananas. Whisk in eggs, oats, baking powder. Rest 2 min. Cook small pancakes in a lightly oiled pan on medium, 2 min per side. Serve with honey or berries.",
  },
  {
    slug: "salmon-rice-veg",
    name: "Salmon, Rice + Veg Tray Bake",
    servings: 2,
    ingredients: [
      { name: "Salmon fillets", quantity: "2" },
      { name: "White or brown rice", quantity: "200g dry" },
      { name: "Broccoli", quantity: "1 head, in florets" },
      { name: "Olive oil", quantity: "2 tbsp" },
      { name: "Lemon", quantity: "1, sliced" },
      { name: "Salt + pepper", quantity: "to taste" },
    ],
    allergens: ["fish"],
    dietSuitability: PESCATARIAN,
    fuelTags: ["after_training", "match_day"],
    carbsG: 80,
    proteinG: 38,
    instructions:
      "Heat oven to 200°C. Cook rice separately per packet. Toss broccoli in oil, salt, spread on a tray. Nestle salmon on top, lemon slices over. Roast 12–14 min. Serve with rice.",
  },

  // ================================================================
  // Vegan expansion — every rail covered
  // ================================================================
  {
    slug: "vegan-overnight-oats",
    name: "Vegan Overnight Oats",
    servings: 1,
    ingredients: [
      { name: "Porridge oats", quantity: "50g" },
      { name: "Oat or soya milk", quantity: "150ml" },
      { name: "Banana", quantity: "1, sliced" },
      { name: "Maple syrup", quantity: "1 tsp" },
      { name: "Cinnamon", quantity: "pinch" },
    ],
    allergens: ["cereals_gluten", "soybeans"],
    dietSuitability: VEGAN,
    fuelTags: ["before_training"],
    carbsG: 70,
    proteinG: 8,
    instructions:
      "Mix oats and plant milk in a jar. Fridge overnight. Top with banana, maple, cinnamon. Eat cold or warm 60 sec in microwave.",
  },
  {
    slug: "vegan-banana-pancakes",
    name: "Vegan Banana Pancakes",
    servings: 2,
    ingredients: [
      { name: "Banana", quantity: "2, ripe" },
      { name: "Porridge oats", quantity: "80g" },
      { name: "Oat or soya milk", quantity: "150ml" },
      { name: "Baking powder", quantity: "1 tsp" },
      { name: "Oil", quantity: "for the pan" },
    ],
    allergens: ["cereals_gluten", "soybeans"],
    dietSuitability: VEGAN,
    fuelTags: ["before_training", "pre_match"],
    carbsG: 55,
    proteinG: 8,
    instructions:
      "Mash bananas. Blend or whisk with oats, milk, baking powder. Rest 2 min. Cook small pancakes on medium 2 min per side. Serve with maple or berries.",
  },
  {
    slug: "hummus-pita-plate",
    name: "Hummus + Pita Plate",
    servings: 1,
    ingredients: [
      { name: "Wholemeal pita", quantity: "2" },
      { name: "Hummus", quantity: "4 tbsp" },
      { name: "Cucumber", quantity: "1/2, sliced" },
      { name: "Cherry tomatoes", quantity: "handful" },
      { name: "Olive oil", quantity: "drizzle" },
    ],
    allergens: ["cereals_gluten", "sesame"],
    dietSuitability: VEGAN,
    fuelTags: ["before_training"],
    carbsG: 60,
    proteinG: 14,
    instructions:
      "Warm the pitas 20 sec. Spread with hummus. Serve with cucumber + tomatoes on the side. Portable, no cooking.",
  },
  {
    slug: "vegan-chickpea-wrap",
    name: "Vegan Chickpea Wrap",
    servings: 1,
    ingredients: [
      { name: "Tortilla wrap", quantity: "1 large" },
      { name: "Tinned chickpeas", quantity: "150g, drained" },
      { name: "Hummus", quantity: "2 tbsp" },
      { name: "Lettuce", quantity: "handful" },
      { name: "Cucumber", quantity: "1/4, sliced" },
      { name: "Lemon juice", quantity: "squeeze" },
    ],
    allergens: ["cereals_gluten", "sesame"],
    dietSuitability: VEGAN,
    fuelTags: ["pre_match", "match_day"],
    carbsG: 65,
    proteinG: 18,
    instructions:
      "Mash chickpeas roughly with a fork, mix with lemon + a spoon of hummus. Warm the wrap 20 sec. Spread more hummus, layer chickpea mash + salad. Roll tight.",
  },
  {
    slug: "tofu-rice-power-bowl",
    name: "Tofu + Rice Power Bowl",
    servings: 2,
    ingredients: [
      { name: "Firm tofu", quantity: "300g, cubed" },
      { name: "Brown or white rice", quantity: "200g dry" },
      { name: "Mixed veg", quantity: "300g", note: "broccoli, peppers, whatever" },
      { name: "Soy sauce", quantity: "3 tbsp" },
      { name: "Sesame oil", quantity: "1 tbsp" },
      { name: "Garlic", quantity: "2 cloves" },
      { name: "Ginger", quantity: "thumb-sized, grated" },
    ],
    allergens: ["soybeans", "cereals_gluten", "sesame"],
    dietSuitability: VEGAN,
    fuelTags: ["after_training", "match_day"],
    carbsG: 90,
    proteinG: 28,
    instructions:
      "Cook rice per packet. Pat tofu dry, cube it, fry in a splash of oil 8 min until golden. Add garlic + ginger 30 sec, then veg + soy, stir 3–4 min. Serve over rice with a drizzle of sesame oil.",
  },
  {
    slug: "lentil-sweet-potato-curry",
    name: "Lentil + Sweet Potato Curry",
    servings: 3,
    ingredients: [
      { name: "Red lentils", quantity: "200g" },
      { name: "Sweet potato", quantity: "400g, cubed" },
      { name: "Tinned coconut milk", quantity: "1 tin (400ml)" },
      { name: "Onion", quantity: "1, diced" },
      { name: "Garlic", quantity: "2 cloves" },
      { name: "Curry powder", quantity: "2 tsp" },
      { name: "Vegetable stock", quantity: "400ml" },
      { name: "Rice, to serve", quantity: "150g dry" },
    ],
    allergens: [],
    dietSuitability: VEGAN,
    fuelTags: ["after_training"],
    carbsG: 95,
    proteinG: 22,
    instructions:
      "Sweat onion 3 min, add garlic + curry powder 30 sec. Add lentils, sweet potato, coconut milk, stock. Simmer 20 min until lentils are soft and sweet potato tender. Serve over rice.",
  },
  {
    slug: "chickpea-pasta-bolognese",
    name: "Chickpea Pasta Bolognese",
    servings: 2,
    ingredients: [
      { name: "Pasta", quantity: "200g dry" },
      { name: "Tinned chickpeas", quantity: "1 tin, drained + rinsed" },
      { name: "Tinned chopped tomatoes", quantity: "1 tin" },
      { name: "Onion", quantity: "1, diced" },
      { name: "Garlic", quantity: "2 cloves" },
      { name: "Mixed herbs", quantity: "1 tsp" },
      { name: "Olive oil", quantity: "1 tbsp" },
    ],
    allergens: ["cereals_gluten"],
    dietSuitability: VEGAN,
    fuelTags: ["match_day", "after_training"],
    carbsG: 100,
    proteinG: 24,
    instructions:
      "Boil pasta. Sweat onion + garlic in oil, add chickpeas + tomatoes + herbs. Simmer 10 min, mash some chickpeas for texture. Serve over drained pasta.",
  },
  {
    slug: "vegan-recovery-smoothie",
    name: "Vegan Recovery Smoothie",
    servings: 1,
    ingredients: [
      { name: "Oat or soya milk", quantity: "300ml" },
      { name: "Banana", quantity: "1, frozen if you can" },
      { name: "Porridge oats", quantity: "40g" },
      { name: "Peanut butter", quantity: "1 tbsp" },
      { name: "Maple syrup", quantity: "1 tsp" },
    ],
    allergens: ["cereals_gluten", "soybeans", "peanuts"],
    dietSuitability: VEGAN,
    fuelTags: ["after_training", "hydration"],
    carbsG: 70,
    proteinG: 15,
    instructions:
      "Blend everything 30–40 seconds until smooth. Drink within 30 minutes of finishing training.",
  },
];
