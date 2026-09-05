// Educational hydration guidance — four cards that live alongside the
// recipe rails on /fuel. Content is static; if it grows, split into a
// dedicated /fuel/hydration page.

type Card = {
  when: string;
  body: string;
};

const CARDS: Card[] = [
  {
    when: "Before training or a match",
    body:
      "Arrive already hydrated rather than catching up. Drink steadily across the day. Avoid drinking a large volume immediately before kick-off.",
  },
  {
    when: "During",
    body:
      "Take a drink at every natural break — water breaks, substitutions, half-time. In hot weather don't wait until thirsty. Small, frequent sips beat one large drink.",
  },
  {
    when: "After",
    body:
      "Drink alongside the post-session meal. Milk is one of the most effective recovery drinks available — the sodium and protein help the body hold onto fluid rather than passing it straight through. Chocolate milk covers rehydration and recovery together.",
  },
  {
    when: "Electrolytes",
    body:
      "Sweat carries salt out. Long sessions, hot weather, and back-to-back training all drain electrolytes and water alone won't replace them. Add a pinch of salt to a homemade sports drink, use an electrolyte tablet, or salt your post-session meal — plain water on top of a heavy sweat can leave you feeling worse, not better.",
  },
];

export function HydrationCards() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="font-display uppercase tracking-display text-white text-lg">
          Hydration
        </h2>
        <p className="mt-1 text-xs text-muted-strong">
          What to drink, when — the practical stuff behind the water bottle.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {CARDS.map((c) => (
          <article
            key={c.when}
            className="rounded-card border border-white/5 bg-ink-850 p-4 shadow-card"
          >
            <h3 className="font-display uppercase tracking-display text-brand-400 text-[0.7rem]">
              {c.when}
            </h3>
            <p className="mt-2 text-sm text-white/90 leading-relaxed">
              {c.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
