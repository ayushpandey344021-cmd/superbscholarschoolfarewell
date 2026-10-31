import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "@/App.css";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Journey } from "@/components/Journey";
import { Gallery } from "@/components/Gallery";
import { Teachers } from "@/components/Teachers";
import { Friendship } from "@/components/Friendship";
import { NamesWall } from "@/components/NamesWall";
import { LastDay } from "@/components/LastDay";
import { Finale } from "@/components/Finale";
import { MusicToggle } from "@/components/MusicToggle";
import { ScrollProgress } from "@/components/ScrollProgress";

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    lenisRef.current = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const scrollTo = (target) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -60, duration: 1.6 });
    }
  };

  return (
    <div className="min-h-screen bg-cream text-foreground" data-testid="farewell-app">
      <div className="grain-overlay pointer-events-none fixed inset-0 z-[70] opacity-[0.05] mix-blend-multiply" />
      <ScrollProgress />
      <Nav onNavigate={scrollTo} />
      <main>
        <Hero onExplore={() => scrollTo("#memories")} />
        <Marquee />
        <Journey />
        <Gallery />
        <Teachers />
        <Friendship />
        <NamesWall />
        <LastDay />
        <Finale />
      </main>
      <MusicToggle />
    </div>
  );
}

export default App;
