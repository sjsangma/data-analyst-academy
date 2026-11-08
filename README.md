# Data Analyst Academy — Study Dashboard

**Live site:** https://sjsangma.github.io/data-analyst-academy/

A self-contained study dashboard for data-analyst interviews, built from the
GeeksforGeeks Data Analysis tutorial and the Microsoft Learn "Data Analyst"
career path (Power BI / PL-300 skills).

## Repo contents

```
index.html          the study dashboard (site root)
assets/             app code, design system, 3D layer, vendored three.js r149
data/               every study file: curriculum, deep notes, videos, flashcards,
                    quizzes, exam papers, cheat sheets, roadmap, Hindi track
portfolio/          React + Vite + Three.js personal portfolio (SHIBU SANGMA)
                    — source project, not part of the study site build
```

The dashboard is static: GitHub Pages serves `index.html` and the browser loads
`data/*.js` directly. `portfolio/` is a separate app; build it with
`cd portfolio && npm install && npm run build`.

## How to use it

Double-click `index.html`. It runs entirely offline in a modern browser
(Chrome, Edge, Firefox or Safari) — no install, no server, no internet.

| Section | What is inside |
| --- | --- |
| **Dashboard** | Course progress ring, streak, module progress, today's plan, interview readiness |
| **Curriculum** | 12 modules / 68 lessons with deep written notes, tables, code, interview callouts |
| **Video Lessons** | 10 narrated slide-by-slide lessons using your browser's speech engine, with transcript |
| **Interview Prep** | 193 flashcards (core / advanced / behavioural) + a timed mock interview |
| **Quizzes** | 11 module quizzes, 55 questions with explanations |
| **Cheat Sheets** | 8 dense one-page references (SQL, pandas, DAX, stats, chart choice, one-liners) |
| **8-Week Plan** | A 2h/day, 5-day/week roadmap with weekly tasks you can tick off |

Progress is saved in your browser's `localStorage`, so it survives closing the
tab. "Reset progress" in the sidebar clears it.

### Video lessons

Press ▶ on a lesson. The narration is spoken by your browser's built-in
text-to-speech (toggle **Voice** off to read silently). Use ⏮ / ⏭ to move
between slides, and click any transcript line to jump to it. Voices vary by
operating system; Windows/macOS/Chrome give the best results.

### Mock interview

Interview Prep → **Start mock interview**. You get a random set of questions
with a timer; mark each as nailed or stumbled and you get a score plus a
debrief on which topics to revisit.

## Exams (SQL, Excel, Power BI, Python)

The **Exams** tab holds four timed papers built from the interview question banks, one per tool:

| Paper | Questions | Time | Pass mark | Topics covered |
|---|---|---|---|---|
| SQL | 20 | 25 min | 70% | SELECT/WHERE, joins, GROUP BY/HAVING, CTEs, window functions, NULL logic, keys, transactions, indexes |
| Excel | 20 | 25 min | 70% | absolute/mixed refs, VLOOKUP vs INDEX/MATCH vs XLOOKUP, IF/IFS/IFERROR, SUMIFS/COUNTIFS, pivot tables, cleaning, tables, charts, validation |
| Power BI | 20 | 20 min | 70% | star schema, measures vs calculated columns, filter context and CALCULATE, SUMMARIZE-style DAX, time intelligence, Power Query, storage modes, RLS |
| Python | 20 | 25 min | 70% | data structures, slicing, comprehensions, mutable defaults, args/kwargs, exceptions, files, pandas loc/iloc + groupby + merge, NumPy vectorisation |

How a paper works:

- No feedback while you answer — like a real interview screening. Answers are hidden until you submit.
- A countdown clock per paper; when it reaches zero the paper submits itself.
- Question jump grid so you can skip, come back, and see which numbers are answered.
- After submitting: score, pass/fail guidance, a **per-topic breakdown** (what to re-read), and a full review of all 20 questions with the correct answer and a one-paragraph explanation.
- Best score per paper is saved in `localStorage` and shown on the card; the dashboard's daily plan adds "Sit a timed tool exam" until all four are done.

## Hindi track: beginner → advanced → real project

A second, ordered video path in Hindi for each of the five tools on the Video Lessons page. Every entry is a full **starter course**, one or more **advanced deep-dives**, and a **real-time project** you can put on your CV — with a "Mark watched" tick per video and a global `x / 21 watched` counter.

| Tool | Beginner | Advanced | Project |
|---|---|---|---|
| Excel | Rishabh Mishra — complete Excel (76 min) | Satish Dhawale basic→advanced (361 min), Power Query (50 min) | Interactive dashboard project (37 min) |
| SQL | Apna College one-shot (196 min) | Console Flare interview level (670 min), window functions (21 min) | Music Store analysis (45 min), end-to-end portfolio (98 min) |
| Python | CodeWithHarry complete Python (654 min) | NumPy + Pandas (127 min), Pandas (65 min) | EDA project (44 min) |
| Power BI | First dashboard (106 min) | 7-hour beginner→advanced (423 min), DAX masterclass (243 min) | End-to-end dashboard (126 min) |
| Tableau | Beginner course (80 min) | 3-hour course with project (180 min), LOD expressions (8 min) | Sales Insights dashboard — codebasics Hindi (138 min) |

Each card also has a **Read the … notes →** button that jumps into the matching module, so the video and the written lesson reinforce each other. Videos open on YouTube in a new tab — nothing is re-uploaded or embedded.

## Topic videos (one per tool)

The Video Lessons tab shows a card per tool, each with a main pick and an
alternative. Every link was checked against YouTube's oEmbed API, and the
20-minute sessions open the video that matches the module you picked.

| Tool | Main video | Alt |
| --- | --- | --- |
| Python | Python Full Course for Beginners — Programming with Mosh (122 min) `K5KVEU3aaeQ` | Learn Python — Full Course — freeCodeCamp (267 min) `rfscVS0vtbw` |
| Excel | Microsoft Excel Tutorial for Beginners — freeCodeCamp (146 min) `Vl0H-qTclOg` | Excel for Data Analytics — Luke Barousse (660 min) `pCJ15nGFgVg` |
| SQL | SQL Course for Beginners — Programming with Mosh (190 min) `7S_tz1z_5bA` | SQL Tutorial — freeCodeCamp (261 min) `HXV3zeQKqGY` |
| Power BI | Learn Power BI in Under 3 Hours — Alex The Analyst (125 min) `I0vQ_VLZTWg` | Power BI for Data Analytics — Luke Barousse (505 min) `FwjaHCVNBWA` |
| Tableau | Learn Tableau in Under 2 Hours — Alex The Analyst (90 min) `j8FSP8XuFyk` | Tableau Full Course — Simplilearn (335 min) `HGMrIZq5dq0` |

Module → video mapping used by the sessions: `python`, `pandas`, `eda` → Python;
`excel` → Excel; `sql` → SQL; `powerbi` → Power BI; `viz` → Tableau; other
modules fall back to the 47-hour full course.

## 20-minute sessions

The 47-hour YouTube course is too long to sit through, so the **20-Min Sessions**
tab turns it into repeatable study blocks (20, 25 or 45 minutes):

1. **Watch** ~40% of the block in the YouTube course, pausing when the timer
   changes block — that pause point is your cut.
2. **Read** the matching module lesson here (opens the next unread one).
3. **Recall** with flashcards on the same topic.

Each block has a countdown, a phase tracker and a "Mark session done" button;
completed blocks are stored with the date, module and minutes, and the sidebar
tracks sessions today, total blocks and total hours against the ~141 blocks a
47-hour course contains.

The video itself is not downloaded, cut or re-uploaded: it stays on YouTube and
you study it in slices. Use YouTube's own chapter list if you want exact
timestamps, and add them here if you want them linked.

## External video course

- **Data Analyst Full Course in 47 Hours — Simplilearn**
  https://www.youtube.com/watch?v=5mCglA9CuSg
  Linked from the Video Lessons tab. A long-form second pass over Excel, SQL,
  Python, statistics and Power BI; it needs an internet connection, unlike the
  built-in narrated lessons.

## Visual design

The interface uses a layered dark "depth" look rather than flat panels:

- **Aurora backdrop** — two slow-drifting colour fields behind the whole app.
- **Glass cards** — every stat card, module card, exam paper and Hindi card has a
  gradient border, inner highlight and a soft drop shadow, and lifts 6° toward
  the pointer (pointer-tilt) with a moving glare highlight.
- **3D hero cube** — a rotating cube on the dashboard carrying the five tool
  labels (SQL, Py, XL, BI, T) plus DA.
- **Scroll reveal** — cards fade and rise into place as you scroll.
- **3D controls** — every clickable icon is a raised keycap: the nine sidebar
  icons, toolbar buttons (play / prev / next / menu / close), chips, plan dots,
  the search glyph, the avatar coin and every primary / ghost button get a
  gradient face, a hard bottom edge and a press-down state.
- **Time-aware greeting** — the dashboard opens with "Good morning, Shibu Sangma ☀️",
  "Good afternoon, Shibu Sangma 🌤️", "Good evening, Shibu Sangma 🌇",
  "Good night, Shibu Sangma 🌙"
  (or "Still up" after midnight) and switches to "Welcome back, Shibu Sangma 👋" when
  you return on a new day. The nameplate is a glass panel with a floating 3D
  monogram badge ("SS") and letters that pop in one by one. The same name and
  initials appear in the topbar profile chip.
- **3D wordmark** — the "Data Analyst Academy" brand text carries its own
  extruded text shadow.

All of it is pure CSS + about 220 lines of vanilla JS, works from `file://`
(double-click `index.html`), and switches itself off for
`prefers-reduced-motion` and touch devices.

## Premium 3D interface layer

`assets/premium.css` + `assets/premium.js` sit on top of the original design
system and change only the visual shell — every lesson, score, streak and
`localStorage` key (`daa:v1`) behaves exactly as before.

- **3D hero** — WebGL scene (vendored three.js r149, `assets/vendor/three.min.js`):
  a metallic chrome icosahedron inside a wireframe shell, a real arc that tracks
  your overall course progress, five orbiting tool cubes (SQL, Python, Excel,
  Power BI, Statistics) with connector lines, particle field, pointer parallax
  and a mouse-following camera. Falls back to a pure-CSS rotating cube when
  WebGL is unavailable and renders a single static frame for
  `prefers-reduced-motion`.
- **Hero KPIs** — lessons done, day streak, quiz average and videos, animated
  count-up, all read from the live dashboard DOM.
- **3D analytics** — perspective bar chart of the first eight modules, a track
  donut (core / Python / SQL / Statistics / Visualisation / BI) and a learning
  curve sparkline. All recomputed from real progress.
- **Interactive cards** — pointer tilt + moving glare on stat and module cards.
- **Collapsible sidebar** — a `<` keycap on the sidebar rail collapses it to a
  86 px icon rail; the state is remembered in `localStorage` (`daa:sidebar`).
- **Responsive** — single-column hero, stacked analytics and a slide-in sidebar
  under 760 px; tilt and animation are disabled on touch devices.

Rebuild nothing: it is plain `<script>` tags, so double-clicking `index.html`
still works.

## Source material

- GeeksforGeeks — Data Analysis tutorial (syllabus structure)
- Microsoft Learn — Data Analyst career path (Power BI, DAX, modelling, PL-300 outcomes)

Content is written as original study notes aimed at interview performance; it is
not a copy of either site.

## Files

```
index.html            app shell + views
assets/styles.css     design system and layout
assets/fx3d.css       depth layer: aurora backdrop, glass cards, 3D hero cube
assets/app.js         state, routing, dashboard, curriculum, reader, search
assets/app2.js        video player (TTS), flashcards, mock, quizzes, cheat sheets, roadmap
assets/app3.js        20-minute session planner, per-tool topic videos, Hindi track
assets/app4.js        timed exams (SQL, Excel, Power BI, Python)
assets/fx3d.js        pointer-tilt cards, hero cube injection, scroll reveal
assets/premium.css    premium 3D shell: neon/glass tokens, hero, charts, responsive
assets/premium.js     three.js hero scene, live charts, cards, sidebar rail, CTA wiring
assets/vendor/three.min.js  vendored three.js r149 (UMD, no build step)
data/*.js             all study content (curriculum, videos, hindi, interview, quizzes, exams, sheets, roadmap)
```

## 3D portfolio (separate app)

`portfolio/` holds the SHIBU SANGMA 3D portfolio — a React + Vite + Three.js app.
It runs on its own (React needs a build step), so it is not served by this static dashboard:

```bash
cd portfolio
npm install
npm run dev      # http://localhost:5173
```

See [`portfolio/README.md`](portfolio/README.md) for the folder structure, production build and deployment steps.
