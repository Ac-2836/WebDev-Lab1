# TASK_DECOMPOSITION.md — Lab 1 Hands-on (Exercise 1 → 4)

**Course:** Web Application Development — Lab 1: Modern Web Development & AI-Assisted Engineering
**Student:** `<Full name>` — `<Student ID>`
**Authority:** Lab 1 slides (PDF) are the single source of truth for requirements. Slide references are written as `[S7]` = page 7.
**Legend:** `†` = authored by the student because the PDF does not specify it (design decision / proposal to confirm with the instructor).

> This file is written BEFORE any AI prompt is issued and is committed as **commit 1**:
> `docs(spec): define component contracts & WBS table`

---

## 1. Method — Contract-First, Mandatory 4-Stage Decomposition [S5]

| Stage | Meaning | How it is applied in this repository |
|---|---|---|
| 1. Functional Slicing | Split the app into isolated, verifiable subsystems | Section 3 (WBS): 4 exercises → 13 sub-tasks, each with its own commit |
| 2. Contract Definition | Define data attributes & interfaces before code | Section 4: DOM contracts, `data-*`, token names, state machine |
| 3. Atomic Generation | Prompt AI strictly on ONE isolated sub-task at a time | "AI prompt scope" line of every sub-task in Section 4 |
| 4. Contract Verification | Test the subsystem in isolation before integration | "Verification" line of every sub-task in Section 4 |

**Prompt rules:** never pass the whole assignment to AI in one shot (one-shot = spaghetti code, unauthorized libraries, hallucinations, brittle state flags). Never prompt AI for all 4 states of Exercise 4 at once. Every prompt starts by making the agent parse `project-rules.md`.

---

## 2. Global constraints & penalties

### 2.1 Penalties stated in the slides
| Violation | Consequence | Source |
|---|---|---|
| AI prompt submitted as a monolithic dump | Zero credit | [S5] |
| Exercise 1: a commit combining CSS with HTML | 0 pts | [S7] |
| Exercise 2: a commit combining CSS and JS in one shot | 0 pts | [S13] |
| A commit adding 100+ lines across multiple files without an atomic spec | 0 pts | [S20] |
| Live defense: cannot fix the changed constraint in time | FAILS | [S13, S20] |

### 2.2 Technical constraints (summary — full list in `project-rules.md`)
- Vanilla HTML5 + modern CSS + ES6+ JS only. No jQuery, Bootstrap, Tailwind, external script CDNs. [S6]
- Run through Live Server (`http://localhost:5500`), never `file:///`. [S3]
- Semantic HTML first; exactly one `<h1>`; no heading-level skipping; explicit `<label for>`; every `<img>` has `alt`, `width`, `height`. [S8, S9]
- `const` by default, `let` only when reassigned, no `var`; never put unescaped user input into `innerHTML`. [S6, S22]
- Colors only through CSS custom properties; zero hardcoded hex codes in rules; `gap` instead of margin overrides in Flexbox. [S13, S16]
- Mobile-first, verified at 375px with zero horizontal scroll; WCAG 2.2 AA contrast (>= 4.5:1); full Tab & Enter navigation; zero console errors. [S13, S21]
- Performance: zero CLS, LCP < 2.0s on DevTools Fast 3G. [S13]

---

## 3. Work Breakdown Structure (WBS) with Deliverables

Levels: **Big step** = Exercise; **Small step** = sub-task (one AI prompt, one commit).

| ID | Level | Scope | Contract / constraint (summary) | Commit message | Deliverable (file created / modified) |
|---|---|---|---|---|---|
| **DOC** | Big step | Spec & WBS for the whole hands-on lab | Component contracts + WBS written before any AI call | `docs(spec): define component contracts & WBS table` | create `TASK_DECOMPOSITION.md`, `project-rules.md` |
| **EX1** | Big step | Semantic DOM Architecture & A11y Contract [S7] | 0 `<div>`, skip-link, 1 `<h1>`; DevTools Landmark Tree | — (see T-01) | `index.html` |
| T-01 | Small step | Landmark tree + skip-link | HTML only; no CSS in the commit | `feat(html): semantic landmark tree` | create `index.html` |
| **EX2** | Big step | Enterprise Developer Portfolio [S13] | `'theme'` key; CSS variables; CLS/LCP budget; acceptance matrix | — (see T-02A/B/C) | `style.css`, `theme-toggle.js`, `index.html` |
| T-02A | Small step | Tokens & Reset | Reset + `:root` tokens + `prefers-color-scheme`; CSS only | `feat(css): tokens & reset` | create `style.css` |
| T-02B | Small step | 2D Grid Layout | `repeat(auto-fit, minmax(280px, 1fr))`; CSS only | `feat(css): responsive grid` | modify `style.css`; modify `index.html` (grid/card classes) |
| T-02C | Small step | Theme Engine | `localStorage` `'theme'`; `aria-pressed`; JS only (no CSS) | `feat(js): dark mode engine` | create `theme-toggle.js`; modify `index.html` (`#theme-btn`, `<script>`) |
| **EX3** | Big step | Component Architecture & State Modeling [S14] | 5 components, one prompt + one commit each | — (see E3-01…05) | `index.html`, `style.css`, `assets/avatar.webp`, `contact-form.js` † |
| E3-01 † | Small step | Hero Section | Portrait with explicit `width`/`height`/`alt`; headline; pitch | `feat(ui): hero section` † | modify `index.html`, `style.css`; add `assets/avatar.webp` |
| E3-02 † | Small step | Theme Switcher | Accessible button, `aria-pressed`, dynamic icon; reuses T-02C engine | `feat(ui): theme switcher` † | modify `index.html`, `style.css` |
| E3-03 † | Small step | Skills Matrix | Categorized badges in CSS Grid | `feat(ui): skills matrix` † | modify `index.html`, `style.css` |
| E3-04 † | Small step | Project Cards | Self-contained `<article>` blocks (tags, links, descriptions) | `feat(ui): project cards` † | modify `index.html`, `style.css` |
| E3-05a † | Small step | Contact Form (markup & native validation) | `required`, `minlength="3"`, `type="email"`, explicit labels | `feat(ui): contact form` † | modify `index.html`, `style.css` |
| E3-05b † | Small step | Contact Form (client-side state handling) | JS only (no CSS in the commit) | `feat(js): contact form state` † | create `contact-form.js` †; modify `index.html` (`<script>`) |
| **EX4** | Big step | Resilient Component Architecture [S18] | 4-state contract; state machine defined first | — (see T-03A/B/C) | `style.css`, `index.html` |
| T-03A | Small step | Loading Skeleton | Pure CSS shimmer gradient | `feat(css): skeleton` | modify `style.css`; modify `index.html` (`.skeleton-item` markup) |
| T-03B † | Small step | Live Data State | Flexbox metadata badges + Grid list | `feat(css): live data state` † | modify `style.css`, `index.html` |
| T-03C † | Small step | Empty & Error States | Accessible retry trigger | `feat(css): empty & error states` † | modify `style.css`, `index.html` |

**Prompt-scope summary:** 1 AI prompt = 1 small step. No prompt may span two rows.

---

## 4. Contracts per task

### EX1 — Semantic DOM Architecture & A11y Contract [S7]

#### T-01 — Landmark tree + skip-link
- **Slice:** `index.html` only; the document tree with no styling and no behavior.
- **Contract:**
  - Boilerplate: `<!DOCTYPE html>`, `<html lang="en">`, `<meta charset="UTF-8">`, viewport `width=device-width, initial-scale=1.0`, `<title>`, `<link rel="stylesheet" href="style.css">`. No `X-UA-Compatible` meta. [S4]
  - Skip-link as the first element in `<body>`: `<a href="#main-content" class="skip-link">Skip to main content</a>`.
  - `<header role="banner">` containing the only `<h1>`: `Jane Doe, Lead Engineer`.
  - `<nav role="navigation" aria-label="Primary">` containing `<ul>` / `<li>` / `<a>` with links to `#about` and `#projects`.
  - `<main id="main-content" role="main">` containing `<section id="about">` and `<section id="projects">`.
  - Total `<div>` elements = **0**. Total `<h1>` elements = **1**. Skip-link `href` equals the `id` of `<main>`.
- **AI prompt scope:** T-01 only (HTML tree + skip-link). No CSS, no JS.
- **Verification (gate):** Chrome DevTools → Accessibility → Landmark Tree shows banner, navigation, main correctly; count `<div>` = 0 and `<h1>` = 1.
- **Commit:** `feat(html): semantic landmark tree` — the commit contains HTML only (CSS + HTML in one commit = 0 pts).

---

### EX2 — Enterprise Developer Portfolio [S13]

**Contract-first constraints (apply to T-02A/B/C):**
- Theme persistence strictly via `localStorage` key `'theme'` (values written by the engine: `'dark'` / `'light'`). [S22]
- Colors are paired via CSS variables; zero hardcoded hex codes in rules (hex only appears in token declarations inside `:root`).
- Performance budget: zero CLS, LCP < 2.0s on DevTools Fast 3G.

#### T-02A — Tokens & Reset
- **Slice:** foundations of `style.css`.
- **Contract:**
  - Reset: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`; `html { color-scheme: light dark; }`; `body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; }`. [S15]
  - Design tokens in `:root`: `--bg-primary`, `--text-primary`, `--accent`, `--card-bg` (light values) and the dark values inside `@media (prefers-color-scheme: dark)`. [S19]
  - `--border-color` is used by `.project-card` [S17] and must also be declared as a token †.
  - Every later rule uses `var(--token)`; no hex in rules.
- **AI prompt scope:** T-02A only (reset + tokens). No layout, no JS.
- **Verification:** tokens resolve in DevTools; no hex inside any rule; OS dark mode switches the palette.
- **Commit:** `feat(css): tokens & reset`.

#### T-02B — 2D Grid Layout
- **Slice:** the project grid.
- **Contract:**
  - `.project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; padding: 1.5rem 0; }` [S17]
  - `.project-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem; }` [S17]
  - Responsive without media queries. Any Flexbox used (e.g., nav) uses `gap`, not child margins. [S16]
- **AI prompt scope:** T-02B only (grid + card styling). No JS.
- **Verification:** at 375px there is zero horizontal scroll; columns wrap automatically.
- **Commit:** `feat(css): responsive grid`.

#### T-02C — Theme Engine
- **Slice:** theme behavior and persistence.
- **Contract:**
  - Toggle button `#theme-btn` with an accessible label and `aria-pressed` (boolean). [S22]
  - On `click`: toggle class `dark-theme` on `<body>`, set `aria-pressed` to whether `dark-theme` is present, store `localStorage.setItem('theme', isDark ? 'dark' : 'light')`. [S22]
  - ES6+ only: `const`/`let`, `querySelector`, `classList`; no `var`.
- **AI prompt scope:** T-02C only (JS engine). No CSS in the same commit.
- **Verification:** toggle repeatedly with zero console errors; key `'theme'` updates in Application → Local Storage; operable with Tab & Enter.
- **Commit:** `feat(js): dark mode engine` — JS only (CSS + JS in one commit = 0 pts).

---

### EX3 — Component Architecture & State Modeling [S14]
Task IDs and commit messages of Exercise 3 are not given by the PDF; they are authored here (†). The rule "never combine CSS and JS in one commit" of Exercise 2 is applied defensively: JS-heavy work is in its own commit.

#### E3-01 † — Hero Section
- **Contract:** high-resolution portrait with explicit dimensions and descriptive alt; headline; pitch.
  ```html
  <img src="assets/avatar.webp" alt="Portrait of Senior Developer"
       width="400" height="400" loading="lazy" decoding="async">
  ```
  (pattern from [S9]; the headline must respect "one `<h1>` per document" and sequential heading order [S8]).
- **AI prompt scope:** Hero only. **Verification:** zero CLS; alt present; 375px OK. **Commit:** `feat(ui): hero section`.

#### E3-02 † — Theme Switcher
- **Contract:** accessible button with `aria-pressed` and a dynamic icon. Reuses the T-02C engine (`#theme-btn`, key `'theme'`); the icon follows the `aria-pressed` state; no new JS.
- **AI prompt scope:** Theme Switcher only. **Verification:** Tab & Enter toggles; icon changes; contrast >= 4.5:1; console clean. **Commit:** `feat(ui): theme switcher`.

#### E3-03 † — Skills Matrix
- **Contract:** categorized badges (`<span class="badge">` as in the Project Card contract) arranged in a clean CSS Grid; each category is introduced by a heading that keeps the sequential order; placed inside the existing landmark tree (no `<div>` added to the T-01 tree).
- **AI prompt scope:** Skills Matrix only. **Verification:** grid wraps at 375px with no horizontal scroll. **Commit:** `feat(ui): skills matrix`.

#### E3-04 † — Project Cards
- **Contract [S14]:**
  ```html
  <article class="project-card" data-category="frontend">
    <header class="card-header">
      <h3>Distributed State Engine</h3>
      <span class="badge">TypeScript</span>
    </header>
    <p>Lightweight event bus built without external libraries.</p>
    <footer class="card-footer">
      <a href="#" aria-label="View State Engine repository">Source Code</a>
    </footer>
  </article>
  ```
  Cards live inside `.project-grid` (T-02B). Each link has a descriptive `aria-label`.
- **AI prompt scope:** Project Cards only. **Verification:** each card is self-contained; keyboard focus reaches every link. **Commit:** `feat(ui): project cards`.

#### E3-05a † — Contact Form (markup & native validation)
- **Contract:** native `<form>`; each input has a visible `<label for>` paired with `<input id>`; no placeholder used as label; hint text via `aria-describedby`. [S8, S11]
  - Name: `type="text"`, `required`, `minlength="3"`.
  - Email: `type="email"`, `required`.
  - Submit: `<button type="submit">`.
  - Field ids `contact-name` / `contact-email` and field set follow the [S11] sample †.
- **AI prompt scope:** form markup + native validation only. **Verification:** native validation messages appear; Tab & Enter works. **Commit:** `feat(ui): contact form`.

#### E3-05b † — Contact Form (client-side state handling)
- **Contract:** JS only; user input is never inserted with `innerHTML`; the exact set of states is not defined in the PDF (see Section 8).
- **AI prompt scope:** form state handling only. **Verification:** zero console errors; no XSS vector. **Commit:** `feat(js): contact form state`.

---

### EX4 — Resilient Component Architecture [S18]

#### State machine (defined BEFORE prompting AI)
The component container carries the contract attribute `data-state="loading | live | empty | error"` †. The PDF requires a state machine but gives no transitions; the following is authored here †.

| From | Event | To |
|---|---|---|
| (initial) | component mounts | `loading` |
| `loading` | data received, 1+ items | `live` |
| `loading` | data received, 0 items | `empty` |
| `loading` | request failed | `error` |
| `empty` | retry activated (click / Enter) | `loading` |
| `error` | retry activated (click / Enter) | `loading` |

| State | What the user sees | Sub-task |
|---|---|---|
| `loading` | Pure CSS shimmer skeleton items | T-03A |
| `live` | Grid list of items with Flexbox metadata badges | T-03B |
| `empty` | Empty message + accessible retry trigger | T-03C |
| `error` | Error message + accessible retry trigger | T-03C |

Rendering of any data uses safe DOM methods (`textContent`), never unescaped `innerHTML`.

#### T-03A — Loading Skeleton
- **Contract:** `.skeleton-item { height: 48px; background: linear-gradient(90deg, … 25%, … 50%, … 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }` and `@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }` [S18]. Pure CSS, no JS.
- **AI prompt scope:** skeleton only. **Verification:** shimmer animates; no layout shift. **Commit:** `feat(css): skeleton`.

#### T-03B † — Live Data State
- **Contract:** metadata badges laid out with Flexbox using `gap`; the list laid out with Grid (reuse `.project-grid`).
- **AI prompt scope:** live state only. **Verification:** 375px no horizontal scroll; badges wrap. **Commit:** `feat(css): live data state`.

#### T-03C † — Empty & Error States
- **Contract:** empty and error layouts, each with a retry trigger that is a real focusable control (operable with Tab & Enter), with a clear accessible name.
- **AI prompt scope:** empty + error only. **Verification:** keyboard-only retry returns the component to `loading`. **Commit:** `feat(css): empty & error states`.

---

## 5. Atomic commit plan

| # | Commit message | Task | Files |
|---|---|---|---|
| 1 | `docs(spec): define component contracts & WBS table` | DOC | `TASK_DECOMPOSITION.md`, `project-rules.md` |
| 2 | `feat(html): semantic landmark tree` | T-01 | `index.html` |
| 3 | `feat(css): tokens & reset` | T-02A | `style.css` |
| 4 | `feat(css): responsive grid` | T-02B | `style.css`, `index.html` |
| 5 | `feat(js): dark mode engine` | T-02C | `theme-toggle.js`, `index.html` |
| 6 | `feat(ui): hero section` † | E3-01 | `index.html`, `style.css`, `assets/avatar.webp` |
| 7 | `feat(ui): theme switcher` † | E3-02 | `index.html`, `style.css` |
| 8 | `feat(ui): skills matrix` † | E3-03 | `index.html`, `style.css` |
| 9 | `feat(ui): project cards` † | E3-04 | `index.html`, `style.css` |
| 10 | `feat(ui): contact form` † | E3-05a | `index.html`, `style.css` |
| 11 | `feat(js): contact form state` † | E3-05b | `contact-form.js`, `index.html` |
| 12 | `feat(css): skeleton` | T-03A | `style.css`, `index.html` |
| 13 | `feat(css): live data state` † | T-03B | `style.css`, `index.html` |
| 14 | `feat(css): empty & error states` † | T-03C | `style.css`, `index.html` |

Rules: no commit mixes CSS+HTML in Exercise 1; no commit mixes CSS+JS in Exercise 2; no commit adds 100+ lines across multiple files without an atomic spec.

---

## 6. Acceptance criteria & verification checklist

**Exercise 1 gate [S7]**
- [ ] Chrome DevTools → Accessibility → Landmark Tree verified
- [ ] 0 `<div>`, 1 `<h1>`, skip-link works

**Exercise 2 Strict Acceptance Criteria Matrix [S13]**
- [ ] No commit combines CSS & JS
- [ ] Renders cleanly at 375px (zero horizontal scroll)
- [ ] WCAG 2.2 AA contrast ratios (>= 4.5:1)
- [ ] Zero console errors during dynamic theme toggling
- [ ] Navigation supports full keyboard Tab & Enter flow
- [ ] Performance: zero CLS, LCP < 2.0s on DevTools Fast 3G
- [ ] Colors only via CSS variables, state persisted only via `localStorage` key `'theme'`

**Quality Gates for the whole lab [S21]**
- [ ] Functionality & Responsive: acceptance criteria met; 375px without horizontal scrolling
- [ ] Accessibility & Performance: fully navigable with Tab & Enter; clean Lighthouse audit; zero CLS
- [ ] Security & Code Health: zero XSS hazards; clean indentation, no dead code, no unauthorized dependencies

---

## 7. Live defense readiness [S13, S20]
- Exercise 2: the instructor alters one CSS token; fix within **60 seconds** — know where every token lives (`:root` in `style.css`).
- Instructor may change ONE contract constraint on the spot: Test A (`data-sound` → `data-audio-src`), Test B (Spacebar listener to halt audio), Test C (`minmax(280px, 1fr)` → container query).
- Expected outcome of a decomposed architect: modify 1 line, pass in 60 seconds.

---

## 8. Open items to confirm with the instructor (remove once resolved)
1. Skip-link: slide text shows `href="#main"`, code shows `#main-content` [S7]. This file uses `#main-content`.
2. Commit messages differ between exercise slides [S7, S13] and the pipeline [S20]; this file uses the exercise-slide messages.
3. Pipeline commits 5–6 in [S20] mention an audio engine / keydown binding, which are not part of Exercises 1–4.
4. Exercise 3: the PDF gives no task IDs, no commit messages, and no definition of "client-side state handling" of the Contact Form.
5. Exercise 4: transitions of the state machine, the data source and whether the retry trigger needs JS are not specified (a JS part must be a separate `feat(js)` commit).
6. `--border-color` is used by `.project-card` [S17] but is not declared in the token block [S19].
7. The sample skeleton [S18] hardcodes hex colors inside a rule, conflicting with "zero hardcoded hex codes in rules" [S13].
8. `dark-theme` class (JS [S22]) versus `prefers-color-scheme` (CSS [S19]): no CSS for `.dark-theme` and no read of `localStorage` on load is given. CSS for `.dark-theme`, if needed, must live in a CSS-only commit.
9. File naming: the PDF boilerplate links `style.css`, while code panels are labelled `reset.css`, `grid.css`, `theme.css`, `skeleton.css`; this file uses a single `style.css`.
10. T-03C covers 2 states while the slide says "commit each state individually"; one commit is used for T-03C.
