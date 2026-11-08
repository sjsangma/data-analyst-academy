import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, accent, blurb, align = "left" }) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <Reveal as="p" className="eyebrow" y={12}>
        <span className="h-px w-8 bg-current inline-block" />
        {eyebrow}
      </Reveal>
      <Reveal as="h2" className="section-title mt-4" delay={0.05}>
        {title} {accent ? <span className="neon-text">{accent}</span> : null}
      </Reveal>
      {blurb ? (
        <Reveal as="p" className="mt-4 text-[0.98rem] leading-relaxed" style={{ color: "var(--muted)" }} delay={0.1}>
          {blurb}
        </Reveal>
      ) : null}
    </div>
  );
}
