import { motion } from "framer-motion";
import { BookOpen, Crown } from "lucide-react";
import { Reveal } from "./Reveal";

const LEADERS = [
  { name: "Sabita Ma'am", role: "Principal", tag: "Our Guiding Light" },
  { name: "Sourav Sir", role: "Secretary", tag: "The Backbone of Our School" },
];

const TEACHERS = [
  { name: "Pankaj Sir", role: "Mathematics" },
  { name: "Kajal Ma'am", role: "Science" },
  { name: "Sunita Ma'am", role: "Hindi" },
  { name: "Sarita Ma'am", role: "Sanskrit" },
  { name: "Sobodh Sir", role: "Social Science" },
  { name: "Sunny Sir", role: "English" },
  { name: "Prachii Ma'am", role: "Computer" },
  { name: "Rakesh Sir", role: "English" },
  { name: "Vidya Ma'am", role: "Science" },
];

const LeaderCard = ({ t, index }) => (
  <motion.div
    data-testid={`teacher-leader-${index}`}
    initial={{ opacity: 0, y: 30, scale: 0.96 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.85, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6 }}
    className="relative rounded-2xl border-2 border-gold/60 bg-gradient-to-br from-gold/15 via-white/85 to-parch/70 px-8 py-10 text-center shadow-[0_14px_50px_rgba(163,117,42,0.22)]"
  >
    <Crown size={20} className="absolute top-4 left-1/2 -translate-x-1/2 text-gold" />
    <p className="mt-6 font-serif text-2xl sm:text-4xl font-light text-glow-gold bg-gradient-to-br from-gold-bright via-gold to-gold-muted bg-clip-text text-transparent">
      {t.name}
    </p>
    <p className="mt-3 font-sans text-xs tracking-[0.35em] uppercase text-ink/70">{t.role}</p>
    <span className="mx-auto mt-4 block h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
    <p className="mt-4 font-serif italic text-base text-gold-bright">{t.tag}</p>
  </motion.div>
);

const TeacherCard = ({ t, index }) => (
  <motion.div
    data-testid={`teacher-card-${index}`}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -5 }}
    className="group rounded-2xl border border-gold/30 bg-white/75 px-6 py-7 text-center shadow-[0_6px_26px_rgba(120,90,30,0.08)] transition-[border-color,box-shadow] duration-500 hover:border-gold/70 hover:shadow-[0_14px_45px_rgba(163,117,42,0.2)]"
  >
    <BookOpen size={16} className="mx-auto text-gold/50 transition-colors duration-500 group-hover:text-gold" />
    <p className="mt-4 font-serif text-2xl font-light text-ink/90">{t.name}</p>
    <p className="mt-2 font-sans text-[11px] tracking-[0.3em] uppercase text-gold">{t.role}</p>
  </motion.div>
);

export const Teachers = () => (
  <section id="teachers" data-testid="teachers-section" className="relative py-28 sm:py-44 overflow-hidden">
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -top-16 left-2 sm:left-10 select-none font-serif text-[16rem] sm:text-[24rem] leading-none text-gold/10"
    >
      &ldquo;
    </span>

    <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
      <Reveal>
        <p className="font-sans text-xs tracking-[0.35em] uppercase text-gold">Our Teachers</p>
      </Reveal>

      <Reveal delay={0.12}>
        <blockquote
          data-testid="teachers-quote"
          className="mt-8 max-w-4xl font-serif text-2xl sm:text-5xl lg:text-6xl font-light leading-[1.2] sm:leading-[1.15] tracking-tight text-ink/90"
        >
          You didn&rsquo;t just teach us lessons,{" "}
          <span className="italic text-glow-gold bg-gradient-to-r from-gold-bright via-gold to-gold-muted bg-clip-text text-transparent">
            you taught us how to live.
          </span>
        </blockquote>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-14 font-sans text-[11px] tracking-[0.4em] uppercase text-ink/40">
          With special love and respect
        </p>
      </Reveal>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
        {LEADERS.map((t, i) => (
          <LeaderCard key={t.name} t={t} index={i} />
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-16 font-sans text-[11px] tracking-[0.4em] uppercase text-ink/40">
          And the teachers who shaped every single day
        </p>
      </Reveal>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TEACHERS.map((t, i) => (
          <TeacherCard key={t.name + t.role} t={t} index={i} />
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mt-16 sm:mt-20 font-sans text-[11px] tracking-[0.35em] uppercase text-ink/40">
          With endless gratitude — the Batch of 2026
        </p>
      </Reveal>
    </div>
  </section>
);
