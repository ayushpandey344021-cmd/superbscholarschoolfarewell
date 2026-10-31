import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoMark } from "./Logo";

const LINKS = [
  { label: "Journey", href: "#journey" },
  { label: "Memories", href: "#memories" },
  { label: "Teachers", href: "#teachers" },
  { label: "Friends", href: "#friends" },
  { label: "Names", href: "#names" },
  { label: "Last Day", href: "#last-day" },
];

export const Nav = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    onNavigate(href);
  };

  return (
    <header
      data-testid="site-nav"
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ${
        scrolled || open
          ? "backdrop-blur-xl bg-cream/85 border-b border-gold/20 shadow-[0_4px_30px_rgba(120,90,30,0.08)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <button
          data-testid="nav-logo-button"
          onClick={() => go("#hero")}
          className="flex items-center gap-3 group"
        >
          <LogoMark className="h-11 w-11 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3" />
          <span className="hidden sm:block font-sans text-[11px] tracking-[0.3em] uppercase text-ink/70 group-hover:text-gold-bright transition-colors duration-300">
            Superb Scholar · 2026
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-7" data-testid="nav-links-desktop">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(" ", "-")}`}
              onClick={() => go(l.href)}
              className="relative font-sans text-xs tracking-[0.22em] uppercase text-ink/60 hover:text-gold-bright transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-[width] after:duration-300 hover:after:w-full"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          data-testid="nav-menu-toggle"
          className="md:hidden text-gold p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            data-testid="nav-links-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-gold/20 bg-cream/95 backdrop-blur-xl"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {LINKS.map((l) => (
                <button
                  key={l.href}
                  data-testid={`nav-mobile-link-${l.label.toLowerCase().replace(" ", "-")}`}
                  onClick={() => go(l.href)}
                  className="text-left py-3 font-sans text-sm tracking-[0.25em] uppercase text-ink/70 hover:text-gold-bright transition-colors duration-300"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
