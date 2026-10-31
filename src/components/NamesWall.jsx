import { motion } from "framer-motion";
import { PenLine } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const NAMES = [
  "Ayush Pandey",
  "Shahid Ansari",
  "Piyush Choudhary",
  "Adarsh Chouhan",
  "Adarsh Choursiya",
];

const NameCard = ({ name, index }) => (
  <motion.div
    data-testid={`names-wall-name-${index}`}
    initial={{ opacity: 0, y: 26, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6, rotate: index % 2 === 0 ? -1 : 1 }}
    whileTap={{ scale: 0.97 }}
    className="group relative rounded-2xl border border-gold/40 bg-white/80 px-6 py-8 sm:px-8 text-center shadow-[0_8px_30px_rgba(120,90,30,0.1)] transition-[border-color,box-shadow] duration-500 hover:border-gold hover:shadow-[0_18px_55px_rgba(163,117,42,0.3)]"
  >
    <span className="absolute top-3 left-4 font-sans text-[10px] tracking-[0.3em] text-gold/50">
      {String(index + 1).padStart(2, "0")}
    </span>
    <PenLine
      size={15}
      className="absolute top-3 right-4 text-gold/40 transition-colors duration-500 group-hover:text-gold"
    />
    <p className="mt-2 font-serif text-xl sm:text-3xl font-light text-glow-gold bg-gradient-to-br from-gold-bright via-gold to-gold-muted bg-clip-text text-transparent">
      {name}
    </p>
    <span className="mx-auto mt-4 block h-px w-12 bg-gradient-to-r from-transparent via-gold/60 to-transparent transition-[width] duration-500 group-hover:w-24" />
    <p className="mt-3 font-sans text-[10px] tracking-[0.3em] uppercase text-ink/35">Batch of 2026</p>
  </motion.div>
);

export const NamesWall = () => (
  <section id="names" data-testid="names-wall-section" className="relative py-28 sm:py-40 bg-parch/60 border-y border-gold/15 overflow-hidden">
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-24 right-0 select-none font-serif text-[14rem] sm:text-[20rem] leading-none text-gold/[0.06]"
    >
      26
    </span>
    <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="The Signature Wall"
        align="center"
        title={
          <>
            Every name,{" "}
            <span className="italic text-gold">etched in gold forever</span>
          </>
        }
      />
      <Reveal delay={0.2}>
        <p className="mx-auto mt-6 max-w-xl text-center font-serif italic text-base sm:text-lg text-ink/55">
          The legends of Class 10 — signatures that will outlive every mark sheet.
        </p>
      </Reveal>

      <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 justify-items-stretch">
        {NAMES.map((name, i) => (
          <NameCard key={name} name={name} index={i} />
        ))}
      </div>
    </div>
  </section>
);
