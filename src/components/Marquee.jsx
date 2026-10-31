const ITEMS = [
  "Class 10 Batch 2026",
  "Superb Scholar School",
  "Once a Scholar, Always a Scholar",
  "From Nursery to Class 10",
];

export const Marquee = () => (
  <div
    data-testid="editorial-marquee"
    className="relative overflow-hidden border-y border-gold/25 bg-parch/80 py-5"
    aria-hidden="true"
  >
    <div className="flex w-max animate-marquee">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center">
          {ITEMS.map((item, i) => (
            <span
              key={`${copy}-${i}`}
              className="flex items-center font-serif italic text-lg sm:text-xl text-gold/60 whitespace-nowrap"
            >
              <span className="px-8">{item}</span>
              <span className="text-gold/50 text-sm">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
