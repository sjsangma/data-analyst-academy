import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Dribbble, Github, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { SOCIALS } from "../data/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

const ICONS = { github: Github, linkedin: Linkedin, dribbble: Dribbble, mail: Mail };
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "";

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ status: "idle", text: "" });

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: "" }));
    if (state.status !== "idle") setState({ status: "idle", text: "" });
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please tell me your name (2+ characters).";
    if (!emailOk(form.email)) next.email = "That email address does not look right.";
    if (form.message.trim().length < 12) next.message = "A little more detail helps — 12 characters minimum.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setState({ status: "error", text: "Please fix the highlighted fields and try again." });
      return;
    }
    setState({ status: "sending", text: "" });

    if (ENDPOINT) {
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...form, sentAt: new Date().toISOString() }),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        setState({ status: "success", text: "Message sent. I will reply within one business day." });
        setForm({ name: "", email: "", message: "" });
      } catch (err) {
        setState({
          status: "error",
          text: `${err.message}. You can email me directly at hello@shibusangma.dev.`,
        });
      }
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name.trim()}`);
    const body = encodeURIComponent(`${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}`);
    window.location.href = `mailto:hello@shibusangma.dev?subject=${subject}&body=${body}`;
    setState({
      status: "success",
      text: "Your email app is opening with the message ready to send. No email app? Write to hello@shibusangma.dev.",
    });
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Contact me"
          title="Let's build something"
          accent="unforgettable."
          blurb="A project, a collaboration or just a hello — this form reaches me directly."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <form onSubmit={submit} noValidate className="glass-strong rounded-3xl p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your name" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Ada Lovelace"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-sky-400/70"
                    style={{ borderColor: errors.name ? "#f87171" : "var(--panel-line)", color: "var(--text)" }}
                  />
                </Field>
                <Field label="Email address" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@studio.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-sky-400/70"
                    style={{ borderColor: errors.email ? "#f87171" : "var(--panel-line)", color: "var(--text)" }}
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Message" error={errors.message}>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Tell me about the idea, the timeline and what success looks like…"
                    aria-invalid={!!errors.message}
                    className="w-full resize-none rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-sky-400/70"
                    style={{ borderColor: errors.message ? "#f87171" : "var(--panel-line)", color: "var(--text)" }}
                  />
                </Field>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Magnetic strength={0.2}>
                  <button type="submit" className="btn-neon disabled:opacity-60" disabled={state.status === "sending"}>
                    {state.status === "sending" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message <Send size={16} />
                      </>
                    )}
                  </button>
                </Magnetic>
                <a href="mailto:hello@shibusangma.dev" className="text-[0.72rem] underline-offset-4 hover:underline" style={{ color: "var(--muted)" }}>
                  or email hello@shibusangma.dev
                </a>
              </div>

              <div aria-live="polite">
                {state.status === "success" && (
                  <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-start gap-2 rounded-xl border p-3 text-[0.78rem]"
                    style={{ borderColor: "rgba(52,211,153,.4)", background: "rgba(16,185,129,.1)", color: "#6ee7b7" }}>
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0" /> {state.text}
                  </motion.p>
                )}
                {state.status === "error" && (
                  <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-start gap-2 rounded-xl border p-3 text-[0.78rem]"
                    style={{ borderColor: "rgba(248,113,113,.4)", background: "rgba(248,113,113,.1)", color: "#fca5a5" }}>
                    <AlertCircle size={15} className="mt-0.5 shrink-0" /> {state.text}
                  </motion.p>
                )}
              </div>
              <p className="mt-3 text-[0.62rem]" style={{ color: "var(--muted)" }}>
                {ENDPOINT
                  ? "Connected to your configured contact endpoint."
                  : "No backend configured — this opens your email app with the message filled in."}
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-4">
            <div className="glass rounded-3xl p-6">
              <p className="eyebrow">Direct line</p>
              <a href="mailto:hello@shibusangma.dev" className="mt-3 block font-display text-xl font-semibold hover:text-sky-300">
                hello@shibusangma.dev
              </a>
              <p className="mt-2 text-[0.8rem]" style={{ color: "var(--muted)" }}>
                Replies within one business day · Meghalaya, India (IST)
              </p>

              <div className="mt-6 grid grid-cols-4 gap-2">
                {SOCIALS.map((s) => {
                  const Icon = ICONS[s.icon] || Mail;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      title={s.label}
                      className="group grid aspect-square place-items-center rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                      style={{ borderColor: "var(--panel-line)", color: "var(--muted)" }}
                    >
                      <Icon size={18} className="transition-colors duration-300 group-hover:text-sky-300" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="glass flex-1 rounded-3xl p-6">
              <p className="eyebrow">Availability</p>
              <div className="mt-4 space-y-3 text-[0.84rem]" style={{ color: "var(--muted)" }}>
                <p className="flex items-center justify-between gap-3">
                  <span>Freelance projects</span>
                  <span className="text-emerald-400">Open</span>
                </p>
                <p className="flex items-center justify-between gap-3">
                  <span>Full-time roles</span>
                  <span className="text-emerald-400">Open</span>
                </p>
                <p className="flex items-center justify-between gap-3">
                  <span>Response window</span>
                  <span>24 hours</span>
                </p>
              </div>
              <div className="mt-6 h-px" style={{ background: "var(--panel-line)" }} />
              <p className="mt-4 text-[0.72rem] leading-relaxed" style={{ color: "var(--muted)" }}>
                Best fit: 3D web experiences, interactive brand sites and product interfaces that need motion.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.6rem] uppercase tracking-[0.22em]" style={{ color: "var(--muted)" }}>
        {label}
      </span>
      {children}
      {error ? <span className="mt-1 block text-[0.68rem] text-red-400">{error}</span> : null}
    </label>
  );
}
