import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 32, className = "", ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y, filter: "blur(6px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children }) => (
  <p className="font-sans text-xs tracking-[0.35em] uppercase text-gold/80">{children}</p>
);

export const SectionHeading = ({ eyebrow, title, align = "left" }) => (
  <div className={align === "center" ? "text-center" : "text-left"}>
    <Reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
    </Reveal>
    <Reveal delay={0.1}>
      <h2 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-ink/90">
        {title}
      </h2>
    </Reveal>
    <Reveal delay={0.18}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`mt-6 h-px w-24 bg-gradient-to-r from-gold/70 to-transparent ${
          align === "center" ? "mx-auto origin-center bg-gradient-to-r from-transparent via-gold/70 to-transparent" : "origin-left"
        }`}
      />
    </Reveal>
  </div>
);
