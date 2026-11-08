import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { GALLERY } from "../data/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { useReducedMotion } from "../hooks/useReducedMotion";

const src = (i) => `gallery/g${String(i + 1).padStart(2, "0")}.svg`;

export default function Gallery() {
  const [index, setIndex] = useState(null);
  const reduced = useReducedMotion();
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((dir) => setIndex((i) => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length)), []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <section id="gallery" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Gallery"
          title="Visual"
          accent="experiments."
          blurb="Poster studies, chrome tests and motion frames. Click any piece to view it full size — arrow keys browse the set."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {GALLERY.map((item, i) => (
            <Reveal key={item.title} delay={0.04 * i} y={24}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden rounded-2xl border text-left"
                style={{ borderColor: "var(--panel-line)", aspectRatio: i % 3 === 1 ? "3 / 4" : "4 / 5" }}
                aria-label={`Open ${item.title}`}
              >
                <img
                  src={src(i)}
                  alt={`${item.title} — ${item.tag} artwork by Shibu Sangma`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `linear-gradient(180deg, transparent 45%, rgba(3,5,12,.85) 100%)`, opacity: 0.55 }}
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                  <span>
                    <span className="block text-[0.56rem] uppercase tracking-[0.24em]" style={{ color: "#7dd3fc" }}>
                      {item.tag}
                    </span>
                    <span className="mt-1 block font-display text-sm font-semibold text-white">{item.title}</span>
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-white/25 text-white/80 transition-transform duration-300 group-hover:scale-110">
                    <Maximize2 size={13} />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[85] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0" style={{ background: "rgba(2,4,10,.9)", backdropFilter: "blur(6px)" }} onClick={close} />
            <motion.figure
              key={index}
              className="relative z-10 max-h-[88vh] w-full max-w-xl"
              initial={reduced ? { opacity: 0 } : { scale: 0.94, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 26 }}
            >
              <img
                src={src(index)}
                alt={`${GALLERY[index].title} — ${GALLERY[index].tag}`}
                className="max-h-[76vh] w-full rounded-2xl object-contain"
              />
              <figcaption className="mt-3 flex items-center justify-between gap-4 text-white/80">
                <span className="font-display text-sm">{GALLERY[index].title}</span>
                <span className="text-[0.6rem] uppercase tracking-[0.24em] text-white/50">
                  {index + 1} / {GALLERY.length}
                </span>
              </figcaption>

              <div className="absolute inset-y-0 -left-2 flex items-center md:-left-14">
                <button type="button" onClick={() => step(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/40 text-white"
                  aria-label="Previous artwork">
                  <ChevronLeft size={18} />
                </button>
              </div>
              <div className="absolute inset-y-0 -right-2 flex items-center md:-right-14">
                <button type="button" onClick={() => step(1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/40 text-white"
                  aria-label="Next artwork">
                  <ChevronRight size={18} />
                </button>
              </div>
              <button type="button" onClick={close} className="absolute -top-12 right-0 grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white"
                aria-label="Close gallery">
                <X size={15} />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
