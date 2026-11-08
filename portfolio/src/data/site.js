export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "projects", label: "My Projects" },
  { id: "skills", label: "My Skills" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact Me" },
];

export const PROJECTS = [
  {
    title: "Nebula — 3D Animation Reel",
    category: "3D Animation",
    blurb:
      "A 60-second cinematic reel built in Blender: volumetric nebula, chrome typography and physically-based lighting.",
    tags: ["Blender", "Cycles", "Houdini"],
    accent: ["#38bdf8", "#6366f1"],
    glyph: "cube",
  },
  {
    title: "Aurora Commerce",
    category: "Website Development",
    blurb:
      "Headless storefront with animated product transitions, 98 Lighthouse score and a Stripe checkout flow.",
    tags: ["React", "Vite", "Tailwind"],
    accent: ["#a855f7", "#ec4899"],
    glyph: "code",
  },
  {
    title: "Pulse Design System",
    category: "UI/UX Design",
    blurb:
      "A 90-component design system with tokens, dark mode, motion guidelines and Figma-to-code handoff.",
    tags: ["Figma", "Tokens", "A11y"],
    accent: ["#22d3ee", "#a855f7"],
    glyph: "layers",
  },
  {
    title: "Synthetic Studio",
    category: "AI Video Creation",
    blurb:
      "AI-assisted campaign films: generative storyboards, voice cloning and automated colour grading pipeline.",
    tags: ["Runway", "ElevenLabs", "FFmpeg"],
    accent: ["#818cf8", "#22d3ee"],
    glyph: "sparkles",
  },
  {
    title: "Chrome Identity",
    category: "Creative Digital Projects",
    blurb:
      "Interactive brand identity: WebGL chrome logo, motion kit and a launch microsite with scroll storytelling.",
    tags: ["Three.js", "GSAP", "GLSL"],
    accent: ["#cbd5e1", "#a855f7"],
    glyph: "gem",
  },
];

export const SKILLS = [
  { name: "Web Development", level: 92, note: "React · Vite · Tailwind" },
  { name: "3D Animation", level: 85, note: "Blender · Three.js · R3F" },
  { name: "UI/UX Design", level: 90, note: "Figma · Design systems" },
  { name: "Video Editing", level: 80, note: "Premiere · After Effects" },
  { name: "Artificial Intelligence", level: 76, note: "Python · LLM tooling" },
  { name: "Creative Design", level: 88, note: "Branding · Motion" },
];

export const GALLERY = [
  { title: "Chrome Study 01", tag: "3D", from: "#38bdf8", to: "#7c3aed" },
  { title: "Neon Grid", tag: "Motion", from: "#a855f7", to: "#0ea5e9" },
  { title: "Glass Interface", tag: "UI", from: "#22d3ee", to: "#6366f1" },
  { title: "Liquid Metal", tag: "3D", from: "#cbd5e1", to: "#38bdf8" },
  { title: "Signal Bloom", tag: "Motion", from: "#f472b6", to: "#a855f7" },
  { title: "Type Experiment", tag: "Type", from: "#818cf8", to: "#22d3ee" },
];

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/sjsangma", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "Dribbble", href: "https://dribbble.com/", icon: "dribbble" },
  { label: "Email", href: "mailto:hello@shibusangma.dev", icon: "mail" },
];
