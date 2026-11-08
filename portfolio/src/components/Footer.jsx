import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t py-10" style={{ borderColor: "var(--panel-line)" }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-center md:flex-row md:text-left">
        <div>
          <p className="font-display text-sm font-bold tracking-[0.2em]">SHIBU SANGMA</p>
          <p className="mt-1 text-[0.66rem]" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} — Designed &amp; built with React, Three.js and GSAP.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a href="#projects" className="text-[0.66rem] uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
            Projects
          </a>
          <a href="#contact" className="text-[0.66rem] uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
            Contact
          </a>
          <a
            href="#home"
            className="grid h-9 w-9 place-items-center rounded-full border"
            style={{ borderColor: "var(--panel-line)", color: "var(--neon)" }}
            aria-label="Back to top"
          >
            <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
