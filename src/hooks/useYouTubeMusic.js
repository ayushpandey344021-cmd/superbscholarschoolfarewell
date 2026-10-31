import { useCallback, useEffect, useRef, useState } from "react";

export const SONG = {
  videoId: "9dcBy2uXL7E",
  title: "Tere Jaisa Yaar Kahan",
  artist: "Kishore Kumar · Yaarana",
};

const VOLUME = 55;
let apiPromise;

function loadYouTubeAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT);
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => reject(new Error("YouTube IFrame API failed to load"));
      document.head.appendChild(script);
    }
  });
  return apiPromise;
}

export function useYouTubeMusic() {
  const hostRef = useRef(null);
  const playerRef = useRef(null);
  const pendingStartRef = useRef(false);
  const userPausedRef = useRef(false);
  const startedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const play = useCallback(() => {
    userPausedRef.current = false;
    const player = playerRef.current;
    if (!player?.playVideo) {
      pendingStartRef.current = true;
      return;
    }
    player.unMute?.();
    player.setVolume?.(VOLUME);
    player.playVideo();
  }, []);

  const pause = useCallback(() => {
    userPausedRef.current = true;
    pendingStartRef.current = false;
    playerRef.current?.pauseVideo?.();
  }, []);

  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play]);

  useEffect(() => {
    let disposed = false;

    loadYouTubeAPI()
      .then((YT) => {
        if (disposed || !hostRef.current) return;
        playerRef.current = new YT.Player(hostRef.current, {
          width: "200",
          height: "200",
          videoId: SONG.videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            loop: 1,
            playlist: SONG.videoId,
            origin: window.location.origin,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (e) => {
              if (disposed) return;
              e.target.setVolume(VOLUME);
              if (pendingStartRef.current) {
                pendingStartRef.current = false;
                e.target.playVideo();
              }
            },
            onStateChange: (e) => {
              if (e.data === YT.PlayerState.PLAYING) {
                setPlaying(true);
                setStarted(true);
                startedRef.current = true;
              } else if (e.data === YT.PlayerState.PAUSED) {
                setPlaying(false);
              } else if (e.data === YT.PlayerState.ENDED) {
                if (!userPausedRef.current) {
                  e.target.seekTo(0, true);
                  e.target.playVideo();
                }
              }
            },
            onAutoplayBlocked: () => setPlaying(false),
            onError: () => {
              setPlaying(false);
              // Transient error (network / bot check) — retry unless the user paused.
              setTimeout(() => {
                if (!disposed && !userPausedRef.current) playerRef.current?.playVideo?.();
              }, 4000);
            },
          },
        });
      })
      .catch(() => setPlaying(false));

    // Keep-alive: if the song was started and got paused/stalled by anything other than the
    // user (tab switch, YouTube hiccup, end of video), nudge it back to playing.
    const keepAlive = setInterval(() => {
      const p = playerRef.current;
      if (!p?.getPlayerState || userPausedRef.current || !startedRef.current) return;
      const s = p.getPlayerState();
      const YT = window.YT;
      if (YT && s !== YT.PlayerState.PLAYING && s !== YT.PlayerState.BUFFERING) p.playVideo();
    }, 3000);

    const onVisible = () => {
      if (document.visibilityState === "visible" && startedRef.current && !userPausedRef.current) {
        playerRef.current?.playVideo?.();
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    // Start on the very first tap / click / key anywhere on the site.
    const onFirstInteraction = () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
      if (!userPausedRef.current) play();
    };
    window.addEventListener("pointerdown", onFirstInteraction, { passive: true });
    window.addEventListener("touchstart", onFirstInteraction, { passive: true });
    window.addEventListener("keydown", onFirstInteraction, { passive: true });

    return () => {
      disposed = true;
      clearInterval(keepAlive);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [play]);

  return { hostRef, playing, started, toggle };
}
