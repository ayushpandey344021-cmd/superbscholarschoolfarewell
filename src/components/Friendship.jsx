import { Reveal, SectionHeading } from "./Reveal";

const CARDS = [
  {
    title: "Partners in Crime",
    text: "We copied homework, covered for each other, and somehow still call it 'teamwork'.",
    offset: "",
  },
  {
    title: "The Back Bench Society",
    text: "Where the best plans were made, the worst jokes were told, and lifelong bonds were sealed.",
    offset: "sm:translate-y-10",
  },
  {
    title: "2 AM Exam Warriors",
    text: "Group calls before every exam — ten minutes of study, five hours of laughing about everything else.",
    offset: "",
  },
  {
    title: "One Tiffin, Ten Hands",
    text: "Whoever brought the best lunch never got to eat it. That was the rule. Nobody wrote it down.",
    offset: "sm:translate-y-6",
  },
  {
    title: "Promise Made",
    text: "No matter where life takes us — different cities, different dreams — this batch stays one message away. Always.",
    offset: "",
  },
  {
    title: "Adarsh Bhai, Train Chalu Karo!",
    text: "The official slogan of our batch. Jab tak Adarsh bhai signal nahi dete, koi kahin nahi jaata — life ho ya last bench.",
    offset: "sm:translate-y-6",
  },
  {
    title: "Adarsh, YouTube Kholo!",
    text: "Camera ready, squad ready, content ready. Sirf channel ka button dabana baaki hai — first video pe 100% attendance guaranteed.",
    offset: "",
  },
];

export const Friendship = () => (
  <section id="friends" data-testid="friendship-section" className="relative py-28 sm:py-40">
    <div className="pointer-events-none absolute left-[-12%] top-40 h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.14),transparent_65%)]" />
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="Friendship Forever"
        title={
          <>
            Distances may separate us,{" "}
            <span className="italic text-gold">but never this bond</span>
          </>
        }
      />

      <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={(i % 3) * 0.08} className={c.offset}>
            <div
              data-testid={`friendship-card-${i}`}
              className="group h-full rounded-2xl border border-gold/25 bg-white/70 p-8 shadow-[0_6px_26px_rgba(120,90,30,0.07)] transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:-rotate-1 hover:border-gold/60 hover:shadow-[0_16px_50px_rgba(163,117,42,0.2)]"
            >
              <span className="font-serif italic text-4xl text-gold/40 transition-colors duration-500 group-hover:text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-serif text-2xl font-light text-ink/90">{c.title}</h3>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink/60">{c.text}</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.16} className="sm:translate-y-10">
          <div
            data-testid="friendship-card-quote"
            className="flex h-full flex-col justify-center rounded-2xl border border-gold/50 bg-gradient-to-br from-gold/15 via-parch/80 to-cream p-8 shadow-[0_10px_40px_rgba(163,117,42,0.15)]"
          >
            <p className="font-serif italic text-2xl leading-snug text-gold-bright">
              "We didn't choose the batch. The batch chose us — and what a choice it was."
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
