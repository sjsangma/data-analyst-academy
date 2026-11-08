import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MousePointer2, Pause, Sparkles, Move3d } from "lucide-react";
import Magnetic from "./Magnetic";
import { useReducedMotion } from "../hooks/useReducedMotion";

const Name3D = lazy(() => import("./Name3D"));

const rise = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.1 + i * 0.09, duration: 0.8, ease: [0.2, 0.9, 0.25, 1] },
  }),
};

export default function Hero({ onSceneReady, started }) {
  const reduced = useReducedMotion();

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-8 pt-24 md:pt-28">
      <div className="mx-auto w-full max-w-6xl px-5">
        <motion.div
          className="flex flex-wrap items-center justify-between gap-3"
          variants={reduced ? undefined : rise}
          custom={0}
          initial="hidden"
          animate={started ? "show" : "hidden"}
        >
          <span className="eyebrow">
            <Sparkles size={13} /> Interactive 3D Portfolio — 2026
          </span>
          <span
            className="hidden items-center gap-2 text-[0.64rem] uppercase tracking-[0.28em] md:inline-flex"
            style={{ color: "var(--muted)" }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Available for freelance
          </span>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[22%] z-0 flex justify-center">
        <div
          className="h-[46vh] w-[92vw] max-w-5xl md:h-[56vh]"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(124,58,237,.16), transparent 62%)",
            filter: "blur(18px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto h-[46vh] w-full max-w-6xl px-2 md:h-[56vh] md:px-6">
        <Suspense fallback={<SceneFallback />}>
          <Name3D onReady={onSceneReady} />
        </Suspense>
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="hint-fade flex items-end gap-2 pb-2 text-[0.6rem] uppercase tracking-[0.28em]" style={{ color: "var(--muted)" }}>
            <MousePointer2 size={12} /> drag to rotate · click to pause
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5">
        <div className="grid items-end gap-8 md:grid-cols-[1.25fr_auto]">
          <div>
            <motion.h1
              className="font-display text-[clamp(2rem,4.6vw,3.6rem)] font-bold leading-[1.02]"
              variants={reduced ? undefined : rise}
              custom={1}
              initial="hidden"
              animate={started ? "show" : "hidden"}
            >
              <span className="silver-text">SHIBU</span> <span className="neon-text">SANGMA</span>
            </motion.h1>
            <motion.p
              className="mt-3 max-w-xl text-sm leading-relaxed md:text-[0.98rem]"
              style={{ color: "var(--muted)" }}
              variants={reduced ? undefined : rise}
              custom={2}
              initial="hidden"
              animate={started ? "show" : "hidden"}
            >
              Creative developer &amp; 3D designer crafting cinematic digital experiences — where chrome
              typography, motion and code meet.
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap items-center gap-3"
              variants={reduced ? undefined : rise}
              custom={3}
              initial="hidden"
              animate={started ? "show" : "hidden"}
            >
              <Magnetic>
                <a href="#projects" className="btn-neon">
                  Explore my work <ArrowDown size={16} />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href="#contact" className="btn-ghost">
                  Let&apos;s talk
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <motion.ul
            className="grid grid-cols-3 gap-3 text-center md:grid-cols-1 md:text-right"
            variants={reduced ? undefined : rise}
            custom={4}
            initial="hidden"
            animate={started ? "show" : "hidden"}
          >
            {[
              { k: "5+", v: "Years creating" },
              { k: "40+", v: "Projects shipped" },
              { k: "12", v: "Awards & features" },
            ].map((s) => (
              <li key={s.v} className="glass rounded-xl px-3 py-2">
                <span className="block font-display text-lg font-bold neon-text">{s.k}</span>
                <span className="block text-[0.58rem] uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
                  {s.v}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="mt-8 flex items-center justify-between border-t pt-4" style={{ borderColor: "var(--panel-line)" }}>
          <div className="flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.24em]" style={{ color: "var(--muted)" }}>
            <span className="inline-flex items-center gap-1.5"><Move3d size={12} /> 360° chrome type</span>
            <span className="hidden items-center gap-1.5 sm:inline-flex"><Pause size={12} /> click to pause</span>
          </div>
          <a href="#about" className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.26em]" style={{ color: "var(--muted)" }}>
            Scroll
            <span className="grid h-7 w-7 place-items-center rounded-full border" style={{ borderColor: "var(--panel-line)" }}>
              <ArrowDown size={13} className="animate-bounce" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function SceneFallback() {
  return (
    <div className="grid h-full place-items-center">
      <p className="text-[0.6rem] uppercase tracking-[0.36em]" style={{ color: "var(--muted)" }}>
        Loading chrome type…
      </p>
    </div>
  );
}
