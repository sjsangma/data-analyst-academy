import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, MapPin, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { useReducedMotion } from "../hooks/useReducedMotion";

const INTRO =
  "Hello, I'm Shibu Sangma. Welcome to my digital world. I am passionate about creativity, technology, digital experiences, and innovation.";

const FACTS = [
  { icon: MapPin, label: "Based in", value: "Meghalaya, India" },
  { icon: Sparkles, label: "Focus", value: "3D · Motion · Web" },
  { icon: BadgeCheck, label: "Open to", value: "Freelance & full-time" },
];

export default function About() {
  const reduced = useReducedMotion();
  const words = INTRO.split(" ");

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="relative" y={40}>
          <div className="relative mx-auto aspect-square w-full max-w-[380px]">
            <motion.div
              className="absolute inset-0 rounded-[2rem]"
              style={{
                background: "conic-gradient(from 0deg, rgba(56,189,248,.5), rgba(168,85,247,.5), rgba(56,189,248,.5))",
                filter: "blur(26px)",
                opacity: 0.55,
              }}
              animate={reduced ? {} : { rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-[1.7rem] glass-strong overflow-hidden"
              initial={{ rotateY: -8, rotateX: 6 }}
              whileHover={reduced ? {} : { rotateY: 0, rotateX: 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative grid h-full place-items-center p-8">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(56,189,248,.28), transparent 55%), radial-gradient(circle at 75% 80%, rgba(168,85,247,.3), transparent 55%)",
                  }}
                />
                <div className="relative text-center">
                  <div className="mx-auto grid h-24 w-24 place-items-center rounded-3xl font-display text-3xl font-bold text-white"
                    style={{
                      background: "linear-gradient(145deg,#7dd3fc,#7c3aed 60%,#1e1b4b)",
                      boxShadow: "inset 0 2px 0 rgba(255,255,255,.55), inset 0 -6px 14px rgba(0,0,0,.55), 0 18px 40px -18px #a855f7",
                      transform: "perspective(600px) rotateX(10deg) rotateY(-12deg)",
                    }}
                  >
                    SS
                  </div>
                  <p className="mt-6 font-display text-2xl font-bold">SHIBU SANGMA</p>
                  <p className="mt-1 text-[0.66rem] uppercase tracking-[0.32em]" style={{ color: "var(--muted)" }}>
                    Creative Developer
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-2 text-[0.6rem] uppercase tracking-[0.24em]" style={{ color: "var(--neon)" }}>
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Open for work
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow="About me" title="Designing the" accent="future, one pixel at a time." />
          <p className="mt-6 text-[1.02rem] leading-relaxed md:text-[1.08rem]">
            {words.map((w, i) => (
              <motion.span
                key={`${w}-${i}`}
                className="inline-block"
                initial={reduced ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.012, duration: 0.4 }}
              >
                {w}&nbsp;
              </motion.span>
            ))}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {FACTS.map((f, i) => (
              <Reveal key={f.label} delay={0.06 * i} y={18}>
                <div className="glass h-full rounded-2xl p-4">
                  <f.icon size={16} style={{ color: "var(--neon)" }} />
                  <p className="mt-3 text-[0.58rem] uppercase tracking-[0.22em]" style={{ color: "var(--muted)" }}>
                    {f.label}
                  </p>
                  <p className="mt-1 text-sm font-medium">{f.value}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-neon">
              See my projects <ArrowUpRight size={16} />
            </a>
            <a href="#contact" className="btn-ghost">
              Start a conversation
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
