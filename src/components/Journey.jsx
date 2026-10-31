import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";

const MILESTONES = [
  {
    year: "Nursery",
    title: "The First Goodbye",
    text: "Tiny hands, teary eyes, and a classroom that felt like another planet. None of us knew we had just met the people who would become family.",
  },
  {
    year: "Class 2",
    title: "Friends We Never Chose",
    text: "Shared tiffins, borrowed pencils, and secrets whispered in the back row. Friendships that began over crayons turned into something unbreakable.",
  },
  {
    year: "Class 4",
    title: "The Troublemakers",
    text: "Paper planes during math class, nicknames for every teacher, and standing outside the classroom like it was an achievement.",
  },
  {
    year: "Class 6",
    title: "The Legends Awaken",
    text: "Sports day victories, annual function chaos, and the first time our batch made the whole school chant our name.",
  },
  {
    year: "Class 8",
    title: "Seniors of the Middle Wing",
    text: "We stopped being the little ones. School trips, midnight group studies before exams, and laughter that echoed through every corridor.",
  },
  {
    year: "Class 10",
    title: "The Final Chapter",
    text: "Board exams, last signatures on uniforms, and the quiet realization that these walls will never feel like ours again.",
  },
];

const Milestone = ({ m, index }) => {
  const left = index % 2 === 0;
  return (
    <div
      className={`relative flex ${left ? "md:justify-start" : "md:justify-end"}`}
      data-testid={`journey-milestone-${index}`}
    >
      <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 z-10">
        <div className="h-3.5 w-3.5 rounded-full bg-gold shadow-[0_0_16px_rgba(163,117,42,0.7)] ring-4 ring-cream" />
      </div>
      <Reveal
        className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${left ? "" : "md:text-right"}`}
        delay={0.05}
      >
        <div className="group rounded-2xl border border-gold/25 bg-white/70 p-7 shadow-[0_6px_30px_rgba(120,90,30,0.07)] backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_14px_50px_rgba(163,117,42,0.18)]">
          <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-gold">{m.year}</span>
          <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-light text-ink/90">{m.title}</h3>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink/60">{m.text}</p>
        </div>
      </Reveal>
    </div>
  );
};

export const Journey = () => {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section id="journey" data-testid="journey-section" className="relative py-28 sm:py-40">
      <div className="pointer-events-none absolute right-[-10%] top-24 h-[50vmin] w-[50vmin] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.14),transparent_65%)]" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Journey · 2013 — 2026"
          title={
            <>
              From Nursery to Class 10,{" "}
              <span className="italic text-gold">a journey we will never forget</span>
            </>
          }
        />

        <div ref={lineRef} className="relative mt-20 sm:mt-28">
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink/10" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 top-0 h-full w-px -translate-x-1/2 origin-top bg-gradient-to-b from-gold-muted via-gold to-gold-bright shadow-[0_0_12px_rgba(163,117,42,0.5)]"
          />
          <div className="flex flex-col gap-14 sm:gap-20">
            {MILESTONES.map((m, i) => (
              <Milestone key={m.year} m={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
