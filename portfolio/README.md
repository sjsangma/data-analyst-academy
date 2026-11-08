# SHIBU SANGMA — 3D Portfolio

A premium, futuristic personal portfolio built with **React + Vite + Three.js (React Three Fiber) + GSAP + Framer Motion + Tailwind CSS**.
Dark background, neon blue / electric purple / silver palette, glassmorphism panels, a rotating chrome 3D name, and fully working navigation, project modals, gallery lightbox and contact form.

---

## 1. What is inside

```
portfolio/
├─ index.html                  # page shell, fonts, favicon, <div id="root">
├─ package.json                # dependencies + scripts
├─ vite.config.js              # build config, code-splitting, base "./"
├─ tailwind.config.js          # colours, fonts
├─ postcss.config.js
├─ public/
│  ├─ fonts/helvetiker_bold.typeface.json   # typeface for the 3D name
│  └─ gallery/g01.svg … g06.svg             # generated artwork for the gallery
└─ src/
   ├─ main.jsx                 # React root
   ├─ App.jsx                  # section layout, theme, loader, intro timing
   ├─ index.css                # design tokens, glass / neon utilities, animations
   ├─ data/site.js             # NAV, PROJECTS, SKILLS, GALLERY, SOCIALS  ← edit your content here
   ├─ hooks/
   │  ├─ useTheme.js           # dark / light mode + localStorage
   │  └─ useReducedMotion.js   # prefers-reduced-motion
   └─ components/
      ├─ Preloader.jsx         # cinematic loading screen
      ├─ Cursor.jsx            # custom animated cursor (desktop only)
      ├─ Nav.jsx               # sticky nav, scroll progress, active link, mobile drawer
      ├─ Hero.jsx              # hero copy, stats, scroll hint
      ├─ Name3D.jsx            # the chrome 3D name (WebGL scene)
      ├─ About.jsx             # About copy + fact cards
      ├─ Projects.jsx          # tilt cards + case-study modal
      ├─ Skills.jsx            # animated bars + tools marquee
      ├─ Gallery.jsx           # grid + lightbox with keyboard controls
      ├─ Contact.jsx           # validated form + socials
      ├─ Footer.jsx
      ├─ Reveal.jsx            # scroll-reveal wrapper
      ├─ Magnetic.jsx          # magnetic hover for buttons/links
      └─ SectionHeading.jsx    # shared section title
```

### Everything you can click

| Element | Behaviour |
|---|---|
| Nav links / logo / "Hire me" | smooth-scrolls to the section, active link pill follows the scroll |
| Theme button | switches dark ↔ light, saved in `localStorage` |
| Hamburger (mobile) | opens the animated drawer, closes on link click |
| Project card | opens a case-study modal (Role / Year / Deliverable) with two working buttons |
| Gallery tile | opens the lightbox; `←` `→` browse, `Esc` closes, prev/next/close buttons |
| Contact form | validates name / email / message, shows success or error state |
| Footer links | Projects, Contact, back-to-top |
| 3D name | drag to rotate, click to pause/resume, mouse parallax |

---

## 2. Run it on Windows 11

Install **Node.js 20 or newer** from <https://nodejs.org> (choose the LTS installer), then open **PowerShell** in the `portfolio` folder:

```powershell
cd C:\path\to\portfolio
npm install
npm run dev
```

Open the address Vite prints — normally <http://localhost:5173>.

> If PowerShell blocks `npm.ps1`, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, or use **Command Prompt** instead.
> `npm install` needs internet access the first time.

Stop the dev server with `Ctrl + C`.

---

## 3. Build for production

```powershell
npm run build      # writes the static site to dist\
npm run preview    # serves dist\ locally at http://localhost:4173
```

`dist/` is plain static files (HTML + JS + CSS + SVG + font) and can be uploaded to any static host.

### Deploy

**Netlify** — drag the `dist` folder onto <https://app.netlify.com/drop>.
**Vercel** — `npm i -g vercel`, then `vercel --prod` inside `portfolio`.
**GitHub Pages** — push `dist/` to a `gh-pages` branch, or let a GitHub Action build it.
The build uses `base: "./"`, so it also works from a sub-folder such as `https://user.github.io/repo/`.

---

## 4. Make it yours

- **Name / brand:** `src/components/Name3D.jsx` (`<ChromeText text="SHIBU" />`, `text="SANGMA"`), `Nav.jsx`, `Footer.jsx`, `index.html` `<title>`.
- **About copy:** `src/components/About.jsx` → `INTRO`.
- **Projects:** `src/data/site.js` → `PROJECTS` (title, category, blurb, stack, role, year, deliverable).
- **Skills:** `src/data/site.js` → `SKILLS` (label, tools, percentage).
- **Gallery:** replace `public/gallery/g0*.svg` with your own images and update `GALLERY` in `src/data/site.js`.
- **Socials / email:** `src/data/site.js` → `SOCIALS`; email lives in `Contact.jsx` and `Footer.jsx`.
- **Colours:** CSS variables in `src/index.css` (`--neon`, `--violet`, `--silver`, `--bg`, …).

### Send the contact form to a real inbox

The form works with no backend: it opens the visitor's mail app addressed to `hello@shibusangma.dev`.
To POST it instead, set an endpoint (Formspree, Getform, your own API) before building:

```powershell
# portfolio/.env.local
VITE_CONTACT_ENDPOINT=https://formspree.io/f/your-id
```

`.env.local` is git-ignored — never commit real keys.

---

## 5. Notes on performance & accessibility

- Three.js, React Three Fiber and Framer Motion are split into separate chunks; the 3D canvas is lazy-loaded after the first paint.
- The 3D scene drops particle count and pixel ratio on small screens, disables drag interaction on mobile, and stops animating when `prefers-reduced-motion` is set.
- If WebGL is unavailable, a styled text fallback renders the name instead of an empty box.
- Keyboard: gallery lightbox supports arrows/Esc; the mobile drawer and modal can be closed with their buttons.
