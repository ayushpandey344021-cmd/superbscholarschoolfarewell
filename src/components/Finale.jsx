import { Reveal } from "./Reveal";
import { LogoMark } from "./Logo";

export const Finale = () => (
  <>
    <section data-testid="final-message-section" className="relative py-32 sm:py-48 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.16),transparent_65%)]" />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <Reveal>
          <LogoMark className="mx-auto h-20 w-20 animate-float" />
        </Reveal>
        <Reveal delay={0.15}>
          <p
            data-testid="final-message"
            className="mt-10 font-serif text-2xl sm:text-5xl font-light leading-[1.25] sm:leading-[1.2] tracking-tight text-ink/90"
          >
            School may be behind us, but{" "}
            <span className="italic text-glow-gold bg-gradient-to-r from-gold-bright via-gold to-gold-muted bg-clip-text text-transparent">
              Superb Scholar School will always be a part of our hearts.
            </span>
          </p>
        </Reveal>
      </div>
    </section>

    <footer data-testid="site-footer" className="relative border-t border-gold/25 bg-parch/80">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-5">
            <LogoMark className="h-14 w-14 hidden sm:block" />
            <h2
              data-testid="footer-school-name"
              className="font-serif text-[7vw] sm:text-5xl lg:text-6xl font-light tracking-tight text-ink/85 leading-tight"
            >
              SUPERB SCHOLAR SCHOOL
            </h2>
            <LogoMark className="h-14 w-14 hidden sm:block" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 font-sans text-xs tracking-[0.45em] uppercase text-gold" data-testid="footer-batch">
            Class 10 Batch 2026
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-8 font-serif italic text-lg text-ink/50" data-testid="footer-tagline">
            "Once a student, always a part of this family."
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mx-auto mt-12 h-px w-40 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          <p className="mt-8 font-sans text-[10px] tracking-[0.3em] uppercase text-ink/30">
            From Nursery to Class 10 · A Journey We Will Never Forget
          </p>
        </Reveal>
      </div>
    </footer>
  </>
);
