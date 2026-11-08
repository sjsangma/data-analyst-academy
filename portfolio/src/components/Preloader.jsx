import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

const LINES = [
  "Loading metallic typeface",
  "Building chrome material",
  "Warming neon lights",
  "Almost there",
];

export default function Preloader({ ready }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(8);
  const [hidden, setHidden] = useState(false);
  const [line, setLine] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    let value = 8;
    const tick = () => {
      const ceiling = ready ? 100 : 92;
      value += Math.max(0.6, (ceiling - value) * 0.06);
      if (value > ceiling) value = ceiling;
      setProgress(value);
      setLine(Math.min(LINES.length - 1, Math.floor((value / 100) * LINES.length)));
      if (ready && value > 99.2) {
        setProgress(100);
        setTimeout(() => setHidden(true), 450);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [ready]);

  useEffect(() => {
    document.body.style.overflow = hidden ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "radial-gradient(circle at 50% 45%, #0d1226 0%, #04050a 70%)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: [0.2, 0.9, 0.25, 1] }}
        >
          <motion.div
            className="relative grid h-40 w-40 place-items-center"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="absolute inset-0 rounded-full border border-white/10" />
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, #38bdf8 90deg, #a855f7 200deg, transparent 320deg)",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
              }}
              animate={reduced ? {} : { rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="relative text-4xl font-bold tracking-[0.3em] text-white"
              animate={reduced ? {} : { opacity: [1, 0.55, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              SS
            </motion.div>
          </motion.div>

          <p className="mt-10 text-[0.68rem] uppercase tracking-[0.42em] text-sky-300/70">
            Shibu Sangma — Portfolio
          </p>

          <div className="mt-5 h-[3px] w-64 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg,#38bdf8,#a855f7)",
                transition: "width .25s ease",
                boxShadow: "0 0 18px rgba(56,189,248,.7)",
              }}
            />
          </div>

          <div className="mt-4 flex w-64 items-center justify-between text-[0.68rem] tracking-[0.2em] text-white/45">
            <span>{LINES[line]}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
