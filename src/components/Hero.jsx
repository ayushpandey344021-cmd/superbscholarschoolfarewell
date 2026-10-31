import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { LogoMark } from "./Logo";

const MaskedLine = ({ children, delay = 0, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: "115%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export const Hero = ({ onExplore }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const crestY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden paper-texture"
    >
      <motion.div
        style={{ y: glowY }}
        className="absolute left-1/2 top-1/4 -z-0 h-[65vmin] w-[85vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.22),transparent_65%)] animate-pulse-glow"
      />

      <motion.div
        style={{ y: crestY }}
        initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[-38%] top-1/2 -translate-y-1/2 sm:right-[-14%] md:right-[2%] lg:right-[6%] pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <LogoMark className="h-[48vmin] w-[48vmin] max-h-[540px] max-w-[540px] opacity-20 md:opacity-90" />
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity: fade }} className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 pt-28 pb-20">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gold"
          data-testid="hero-eyebrow"
        >
          Superb Scholar School · Class 10 Farewell 2026
        </motion.p>

        <h1
          data-testid="hero-title"
          className="mt-8 font-serif font-light tracking-tight text-ink/90 text-[13.5vw] sm:text-7xl lg:text-8xl xl:text-[7.5rem] leading-[1.02]"
        >
          <MaskedLine delay={0.35}>THE END</MaskedLine>
          <MaskedLine delay={0.5}>
            <span className="text-ink/90">OF AN </span>
            <span className="italic text-glow-gold bg-gradient-to-r from-gold-bright via-gold to-gold-muted bg-clip-text text-transparent">
              ERA
            </span>
          </MaskedLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          className="mt-8 max-w-[85%] sm:max-w-xl font-serif italic text-base sm:text-xl text-ink/60 leading-relaxed"
          data-testid="hero-subtitle"
        >
          "Some journeys end, but memories last forever."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.35 }}
          className="mt-12"
        >
          <button
            data-testid="hero-explore-button"
            onClick={onExplore}
            className="group inline-flex items-center gap-3 rounded-full border border-gold/50 bg-gold/5 px-6 sm:px-8 py-3.5 sm:py-4 font-sans text-[10px] sm:text-xs tracking-[0.22em] sm:tracking-[0.28em] uppercase text-gold-bright transition-[transform,box-shadow,background-color,border-color] duration-300 hover:-translate-y-1 hover:bg-gold/15 hover:border-gold hover:shadow-[0_10px_40px_rgba(163,117,42,0.3)]"
          >
            Explore Our Memories
            <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        data-testid="hero-scroll-indicator"
      >
        <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink/40">Scroll</span>
        <div className="h-12 w-px bg-gradient-to-b from-gold/70 to-transparent animate-float" />
      </motion.div>
    </section>
  );
};
