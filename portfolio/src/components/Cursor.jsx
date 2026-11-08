import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return undefined;

    document.body.classList.add("custom-cursor");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let raf = 0;
    let scale = 1;
    let targetScale = 1;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = e.target.closest("a, button, [data-cursor], input, textarea");
      targetScale = el ? 1.9 : 1;
    };

    const onDown = () => {
      targetScale = 0.75;
    };
    const onUp = () => {
      targetScale = 1.9;
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      scale += (targetScale - scale) * 0.16;
      if (dot.current && ring.current) {
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%,-50%)`;
        ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%,-50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block" aria-hidden="true">
      <span
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full"
        style={{ background: "#fff", boxShadow: "0 0 12px #a855f7" }}
      />
      <span
        ref={ring}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border"
        style={{ borderColor: "rgba(56,189,248,.65)", boxShadow: "0 0 18px rgba(168,85,247,.5)" }}
      />
    </div>
  );
}
