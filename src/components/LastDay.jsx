import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal } from "./Reveal";

const Counter = ({ to, suffix = "", testId, duration = 2.4 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} data-testid={testId} className="tabular-nums">
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
};

const STATS = [
  { to: 12, suffix: "", label: "Years within these walls", testId: "stat-years" },
  { to: 3650, suffix: "+", label: "Days of laughter and lessons", testId: "stat-days" },
  { to: 1000, suffix: "+", label: "Memories we carry forever", testId: "stat-memories" },
];

export const LastDay = () => (
  <section
    id="last-day"
    data-testid="last-day-section"
    className="relative py-32 sm:py-48 overflow-hidden bg-parch/70 border-y border-gold/20"
  >
    <div className="pointer-events-none absolute left-1/2 top-0 h-[70vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.18),transparent_60%)]" />

    <div className="relative mx-auto max-w-6xl px-5 sm:px-8 text-center">
      <Reveal>
        <p className="font-sans text-xs tracking-[0.35em] uppercase text-gold">The Last Day</p>
      </Reveal>
      <Reveal delay={0.12}>
        <h2
          data-testid="last-day-title"
          className="mx-auto mt-6 max-w-4xl font-serif text-3xl sm:text-5xl lg:text-7xl font-light leading-[1.15] sm:leading-[1.05] tracking-tight text-ink/90"
        >
          One Last Goodbye,{" "}
          <span className="italic text-glow-gold bg-gradient-to-r from-gold-bright via-gold to-gold-muted bg-clip-text text-transparent">
            A Thousand Beautiful Memories.
          </span>
        </h2>
      </Reveal>

      <div className="mt-20 sm:mt-28 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6">
        {STATS.map((s, i) => (
          <Reveal key={s.testId} delay={0.1 * i}>
            <div data-testid={`last-day-${s.testId}`} className="flex flex-col items-center gap-4">
              <span className="font-serif text-5xl sm:text-7xl font-light text-gold-bright text-glow-gold">
                <Counter to={s.to} suffix={s.suffix} testId={s.testId} />
              </span>
              <span className="h-px w-16 bg-gold/50" />
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-ink/50">{s.label}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.25}>
        <p className="mx-auto mt-20 max-w-2xl font-serif italic text-lg sm:text-xl leading-relaxed text-ink/55">
          The bell will ring one final time. The corridors will fall silent. But every step we take into the world
          carries a little of this place with it.
        </p>
      </Reveal>
    </div>
  </section>
);
