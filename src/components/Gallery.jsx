import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, ImagePlus, X } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

// To replace a placeholder with a real photo, set its `image` field to any image URL
// (e.g. image: "/photos/farewell.jpg" placed in frontend/public/photos/) and it will
// render automatically in the frame and in the fullscreen view.
export const GALLERY_ITEMS = [
  { id: 1, label: "Memory 01", caption: "Teachers' Day, with the ones who raised us", aspect: "aspect-square", image: "/photos/teachers-day.jpeg" },
  { id: 2, label: "Memory 02", caption: "The squad, Independence Day on the ground", aspect: "aspect-[4/3]", image: "/photos/friends-selfie.jpeg" },
  { id: 3, label: "Memory 03", caption: "Marching with the Tiranga, heads held high", aspect: "aspect-square", image: "/photos/flag-march.webp" },
  { id: 4, label: "Memory 04", caption: "Brothers on the school ground", aspect: "aspect-[4/5]", image: "/photos/ground-trio.jpeg" },
  { id: 5, label: "Memory 05", caption: "The whole batch, tricolour in hand", aspect: "aspect-[2/1] sm:aspect-[16/9]", image: "/photos/batch-group.jpg" },
  { id: 6, label: "Memory 06", caption: "The gate where it all began", aspect: "aspect-[4/3]", image: "/photos/school-gate.jpg" },
];

const Frame = ({ item, onOpen, index }) => (
  <Reveal delay={(index % 3) * 0.08} className="break-inside-avoid">
    <motion.button
      data-testid={`gallery-frame-${item.id}`}
      onClick={() => onOpen(item)}
      whileHover={{ y: -6, rotate: index % 2 === 0 ? -0.6 : 0.6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`group relative block w-full overflow-hidden rounded-xl border border-gold/40 gold-frame-inner shadow-[0_6px_26px_rgba(120,90,30,0.1)] ${item.aspect} transition-[border-color,box-shadow] duration-500 hover:border-gold hover:shadow-[0_16px_55px_rgba(163,117,42,0.28)]`}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.caption}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:1200ms] ease-out group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-3 rounded-lg border border-gold/30 flex flex-col items-center justify-center gap-3">
          <ImagePlus size={26} className="text-gold/60 transition-colors duration-500 group-hover:text-gold-bright" />
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/60">{item.label}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 opacity-0 translate-y-2 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-hover:translate-y-0">
        <span className="font-serif italic text-sm text-cream">{item.caption}</span>
        <Expand size={15} className="text-cream shrink-0" />
      </div>
    </motion.button>
  </Reveal>
);

export const Gallery = () => {
  const [active, setActive] = useState(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  return (
    <section id="memories" data-testid="gallery-section" className="relative py-28 sm:py-40 bg-parch/60 border-y border-gold/15">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeading
            eyebrow="Memories Gallery"
            title={
              <>
                Every frame holds{" "}
                <span className="italic text-gold">a story only we understand</span>
              </>
            }
          />
          <Reveal delay={0.2}>
            <p className="max-w-xs text-sm leading-relaxed text-ink/50 md:text-right">
              Our favourite moments, locked in gold forever — aankhein band karo, sab yaad aa jayega.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 sm:mt-20 columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6" data-testid="gallery-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <Frame key={item.id} item={item} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            data-testid="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 backdrop-blur-xl p-5"
            onClick={close}
          >
            <button
              data-testid="lightbox-close-button"
              onClick={close}
              className="absolute top-6 right-6 rounded-full border border-cream/40 p-3 text-cream transition-colors duration-300 hover:bg-cream/10"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative overflow-hidden rounded-2xl border border-gold/60 bg-ink/60 shadow-[0_0_90px_rgba(163,117,42,0.35)]">
                {active.image ? (
                  <img src={active.image} alt={active.caption} className="block mx-auto max-h-[72vh] w-auto max-w-full object-contain" />
                ) : (
                  <div className="aspect-[4/3] m-5 rounded-xl border border-gold/35 flex flex-col items-center justify-center gap-4">
                    <ImagePlus size={40} className="text-gold/70" />
                    <span className="font-sans text-xs tracking-[0.35em] uppercase text-gold/70">{active.label}</span>
                  </div>
                )}
              </div>
              <p
                data-testid="lightbox-caption"
                className="mt-6 text-center font-serif italic text-xl text-cream"
              >
                {active.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
