import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";
import { NAV } from "../data/site";
import Magnetic from "./Magnetic";

export default function Nav({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[70] h-[2px] origin-left"
        style={{
          width: "100%",
          transform: `scaleX(${progress})`,
          background: "linear-gradient(90deg,#38bdf8,#a855f7)",
          boxShadow: "0 0 14px rgba(56,189,248,.8)",
        }}
      />

      <header className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 md:px-5 ${
            scrolled ? "glass-strong" : ""
          }`}
          style={{ marginInline: "max(0.75rem, calc((100vw - 72rem) / 2))" }}
          aria-label="Main"
        >
          <a href="#home" onClick={go("home")} className="group flex items-center gap-3" aria-label="Shibu Sangma — home">
            <span
              className="grid h-10 w-10 place-items-center rounded-xl text-sm font-bold tracking-wider text-white transition-transform duration-300 group-hover:rotate-6"
              style={{
                background: "linear-gradient(145deg,#38bdf8,#7c3aed)",
                boxShadow: "0 6px 18px -8px #38bdf8, inset 0 1px 0 rgba(255,255,255,.4)",
              }}
            >
              SS
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-sm font-bold tracking-[0.16em]">SHIBU SANGMA</span>
              <span className="block text-[0.6rem] tracking-[0.3em]" style={{ color: "var(--muted)" }}>
                CREATIVE DEVELOPER
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    className="relative block rounded-full px-3.5 py-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300"
                    style={{ color: isActive ? "var(--text)" : "var(--muted)" }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full"
                        style={{
                          background: "linear-gradient(120deg, rgba(56,189,248,.16), rgba(168,85,247,.16))",
                          border: "1px solid rgba(148,163,255,.28)",
                          boxShadow: "0 0 22px -6px rgba(56,189,248,.7)",
                        }}
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              className="grid h-10 w-10 place-items-center rounded-xl border transition-transform duration-300 hover:-translate-y-0.5"
              style={{ borderColor: "var(--panel-line)", background: "var(--panel)", color: "var(--text)" }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <Magnetic strength={0.25} className="hidden sm:inline-flex">
              <a href="#contact" onClick={go("contact")} className="btn-neon !px-5 !py-2.5 text-[0.78rem]">
                Hire me <ArrowUpRight size={15} />
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border lg:hidden"
              style={{ borderColor: "var(--panel-line)", background: "var(--panel)", color: "var(--text)" }}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(3,5,12,.72)", backdropFilter: "blur(8px)" }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute inset-x-3 top-20 rounded-3xl p-6 glass-strong"
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.9, 0.25, 1] }}
            >
              <ul className="space-y-1">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={go(item.id)}
                      className="flex items-center justify-between rounded-xl px-4 py-3 font-display text-lg"
                      style={{ color: active === item.id ? "var(--neon)" : "var(--text)" }}
                    >
                      {item.label}
                      <span className="text-[0.65rem] tracking-[0.2em]" style={{ color: "var(--muted)" }}>
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a href="#contact" onClick={go("contact")} className="btn-neon mt-4 w-full justify-center">
                Hire me <ArrowUpRight size={16} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
