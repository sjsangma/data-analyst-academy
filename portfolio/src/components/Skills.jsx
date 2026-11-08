import { motion } from "framer-motion";
import { Box, Brain, Clapperboard, Code2, Palette, PenTool } from "lucide-react";
import { SKILLS } from "../data/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { useReducedMotion } from "../hooks/useReducedMotion";

const ICONS = [Code2, Box, PenTool, Clapperboard, Brain, Palette];

const TOOLS = [
  "React", "Vite", "Three.js", "React Three Fiber", "GSAP", "Framer Motion",
  "Tailwind CSS", "Blender", "Figma", "After Effects", "Python", "TypeScript",
];

export default function Skills() {
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="My skills"
          title="Tools I use to build"
          accent="the experience."
          blurb="A hybrid toolkit — engineering depth on one side, visual craft on the other. Percentages are self-assessed and updated as I learn."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {SKILLS.map((skill, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={skill.name} delay={0.05 * i} y={20}>
                <div className="tilt-wrap">
                  <div className="glass rounded-2xl p-5 transition-colors duration-300 hover:border-sky-400/40">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="grid h-10 w-10 place-items-center rounded-xl"
                          style={{
                            background: "linear-gradient(145deg, rgba(56,189,248,.22), rgba(168,85,247,.22))",
                            border: "1px solid var(--panel-line)",
                            color: "var(--neon)",
                          }}
                        >
                          <Icon size={17} />
                        </span>
                        <div>
                          <p className="font-display text-sm font-semibold">{skill.name}</p>
                          <p className="text-[0.62rem] uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
                            {skill.note}
                          </p>
                        </div>
                      </div>
                      <span className="font-display text-sm font-bold neon-text">{skill.level}%</span>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full" style={{ background: "rgba(148,163,255,.14)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg,#38bdf8,#a855f7)",
                          boxShadow: "0 0 14px rgba(56,189,248,.6)",
                        }}
                        initial={reduced ? false : { width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 1.15, delay: 0.12 + i * 0.06, ease: [0.2, 0.9, 0.25, 1] }}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12" delay={0.1}>
          <div className="glass relative overflow-hidden rounded-2xl py-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16" style={{ background: "linear-gradient(90deg, var(--bg), transparent)" }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16" style={{ background: "linear-gradient(270deg, var(--bg), transparent)" }} />
            <div className="marquee flex w-max gap-3">
              {[...TOOLS, ...TOOLS].map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="whitespace-nowrap rounded-full border px-4 py-2 text-[0.62rem] uppercase tracking-[0.18em]"
                  style={{ borderColor: "var(--panel-line)", color: "var(--muted)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
