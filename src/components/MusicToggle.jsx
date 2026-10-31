import { AnimatePresence, motion } from "framer-motion";
import { Music2, Pause, Play } from "lucide-react";
import { SONG, useYouTubeMusic } from "../hooks/useYouTubeMusic";

export const MusicToggle = () => {
  const { hostRef, playing, started, toggle } = useYouTubeMusic();

  return (
    <>
      {/* Real YouTube player kept off-screen (display:none breaks playback on mobile). */}
      <div
        ref={hostRef}
        aria-hidden="true"
        data-testid="youtube-player-host"
        style={{ position: "fixed", left: "-10000px", top: 0, width: 200, height: 200, opacity: 0, pointerEvents: "none" }}
      />

      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3" data-testid="music-dock">
        <AnimatePresence>
          {(playing || !started) && (
            <motion.div
              key={playing ? "now-playing" : "hint"}
              data-testid="music-now-playing"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.4 }}
              className="flex max-w-[62vw] items-center gap-2 rounded-full border border-gold/40 bg-cream/85 px-4 py-2 backdrop-blur-xl shadow-[0_6px_24px_rgba(163,117,42,0.2)]"
            >
              <Music2 size={13} className={`shrink-0 text-gold ${playing ? "animate-pulse" : ""}`} />
              <span className="truncate font-sans text-[10px] tracking-[0.22em] uppercase text-ink/70">
                {playing ? `${SONG.title} · ${SONG.artist}` : "Tap anywhere for music"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          data-testid="music-play-button"
          onClick={toggle}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          aria-label={playing ? "Pause background music" : "Play background music"}
          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-cream/85 text-gold-bright backdrop-blur-xl shadow-[0_6px_30px_rgba(163,117,42,0.3)] transition-[transform,box-shadow,border-color] duration-300 hover:scale-105 hover:border-gold hover:shadow-[0_10px_45px_rgba(163,117,42,0.45)]"
        >
          {playing && (
            <span className="absolute inset-0 rounded-full border border-gold/60 animate-ping [animation-duration:2.2s]" />
          )}
          {playing ? <Pause size={19} /> : <Play size={19} className="ml-0.5" />}
          <span className="sr-only">{playing ? "Pause" : "Play"}</span>
        </motion.button>
      </div>
    </>
  );
};
