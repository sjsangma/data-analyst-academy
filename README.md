# Data Analyst Academy — study dashboard

A single-page study workspace for data-analyst interviews: 12 modules / 68 deep
lesson notes, narrated video lessons, 193 interview flashcards with a timed mock
interview, quizzes, four timed tool exams (SQL, Excel, Power BI, Python), cheat
sheets and an 8-week plan.

Source material used for the syllabus: the GeeksforGeeks Data Analysis tutorial
and the Microsoft Learn data-analyst career path (Power BI / PL-300 outcomes).
All lesson text is original study writing for interview practice.

## Use it

Open `index.html` — it runs straight from the file system, no build or server.
Progress is stored in the browser (`localStorage` key `daa:v1`).

## Structure

```
index.html                    app shell and views
assets/styles.css             design system
assets/fx3d.css / fx3d.js     depth layer, pointer tilt, scroll reveal
assets/premium.css / .js      premium 3D shell, Three.js hero, live charts
assets/vendor/three.min.js    vendored three.js r149 (UMD)
assets/app*.js                state, routing, lessons, videos, cards, exams
data/*.js                     all study content
```
