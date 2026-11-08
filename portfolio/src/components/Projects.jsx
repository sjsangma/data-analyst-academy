import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Box, Code2, Gem, Layers, Sparkles, X } from "lucide-react";
import { PROJECTS } from "../data/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { useReducedMotion } from "../hooks/useReducedMotion";

const ICONS = { cube: Box, code: Code2, layers: Layers, sparkles: Sparkles, gem: Gem };
const META = [
  { role: "Art direction & 3D", year: "2025", deliverable: "Reel · 60 sec" },
  { role: "Full-stack build", year: "2025", deliverable: "Storefront" },
  { role: "Design system", year: "2024", deliverable: "90 components" },
  { role: "AI pipeline", year: "2025", deliverable: "12 films" },
  { role: "WebGL identity", year: "2024", deliverable: "Microsite" },
];

function TiltCard({ project, index, onOpen }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const Icon = ICONS[project.glyph] || Box;

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ref.current.style.setProperty("--mx", `${px * 100}%`);
    ref.current.style.setProperty("--my", `${py * 100}%`);
    ref.current.style.transform = `rotateX(${(0.5 - py) * 12}deg) rotateY(${(px - 0.5) * 14}deg) translateY(-6px)`;
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <Reveal delay={0.05 * index} className="tilt-wrap h-full">
      <button
        type="button"
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        onClick={() => onOpen(index)}
        className="tilt-card group relative flex h-full w-full flex-col overflow-hidden rounded-3xl p-6 text-left glass"
        aria-label={`Open project ${project.title}`}
      >
        <span className="tilt-glare" />
        <span
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
          style={{ background: `radial-gradient(circle, ${project.accent[0]}, transparent 65%)` }}
        />
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accent[0]}, ${project.accent[1]}, transparent)` }}
        />

        <div className="flex items-start justify-between">
          <span
            className="grid h-12 w-12 place-items-center rounded-2xl text-white"
            style={{
              background: `linear-gradient(145deg, ${project.accent[0]}, ${project.accent[1]})`,
              boxShadow: `0 10px 26px -14px ${project.accent[0]}, inset 0 1px 0 rgba(255,255,255,.45)`,
              transform: "translateZ(40px)",
            }}
          >
            <Icon size={20} />
          </span>
          <span className="rounded-full border px-3 py-1 text-[0.56rem] uppercase tracking-[0.2em]" style={{ borderColor: "var(--panel-line)", color: "var(--muted)" }}>
            {project.category}
          </span>
        </div>

        <h3 className="mt-5 font-display text-xl font-bold leading-snug" style={{ transform: "translateZ(24px)" }}>
          {project.title}
        </h3>
        <p className="mt-2 text-[0.86rem] leading-relaxed" style={{ color: "var(--muted)" }}>
          {project.blurb}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="rounded-full px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.14em]"
                style={{ background: "rgba(148,163,255,.1)", color: "var(--muted)", border: "1px solid var(--panel-line)" }}>
                {t}
              </span>
            ))}
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 group-hover:rotate-45"
            style={{ borderColor: "var(--panel-line)", color: "var(--neon)" }}>
            <ArrowUpRight size={15} />
          </span>
        </div>
      </button>
    </Reveal>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);
  const reduced = useReducedMotion();
  const project = open === null ? null : PROJECTS[open];
  const meta = open === null ? null : META[open];

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const discuss = () => {
    close();
    setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 120);
  };

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="My projects" title="Selected" accent="work in motion." blurb="Five disciplines, one obsession: making digital feel physical. Tap a card to open the case study." />
          <Reveal className="text-[0.62rem] uppercase tracking-[0.24em]" style={{ color: "var(--muted)" }}>
            {PROJECTS.length} featured projects
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <div key={p.title} className={i === 0 ? "lg:col-span-2" : ""}>
              <TiltCard project={p} index={i} onOpen={setOpen} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {project && (
          <motion.div className="fixed inset-0 z-[80] grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0" style={{ background: "rgba(2,4,10,.72)", backdropFilter: "blur(10px)" }} onClick={close} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={project.title}
              className="relative w-full max-w-xl overflow-hidden rounded-3xl glass-strong"
              initial={reduced ? { opacity: 0 } : { y: 30, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { y: 20, scale: 0.97, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${project.accent[0]}, ${project.accent[1]})` }} />
              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">{project.category}</p>
                    <h3 className="mt-3 font-display text-2xl font-bold">{project.title}</h3>
                  </div>
                  <button type="button" onClick={close} className="grid h-9 w-9 place-items-center rounded-full border"
                    style={{ borderColor: "var(--panel-line)" }} aria-label="Close case study">
                    <X size={15} />
                  </button>
                </div>

                <p className="mt-4 text-[0.92rem] leading-relaxed" style={{ color: "var(--muted)" }}>
                  {project.blurb} Built end-to-end: concept, design system, motion language and production
                  code — tuned for 60 fps and fully responsive.
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-3">
                  <div className="glass rounded-xl p-3">
                    <dt className="text-[0.56rem] uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>Role</dt>
                    <dd className="mt-1 text-sm">{meta.role}</dd>
                  </div>
                  <div className="glass rounded-xl p-3">
                    <dt className="text-[0.56rem] uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>Year</dt>
                    <dd className="mt-1 text-sm">{meta.year}</dd>
                  </div>
                  <div className="glass col-span-2 rounded-xl p-3">
                    <dt className="text-[0.56rem] uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>Deliverable</dt>
                    <dd className="mt-1 text-sm">{meta.deliverable} · {project.tags.join(" · ")}</dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={discuss} className="btn-neon">
                    Discuss this project <ArrowUpRight size={16} />
                  </button>
                  <button type="button" onClick={close} className="btn-ghost">Back to projects</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
