# TASK_DECOMPOSITION.md — Developer Portfolio (Hands-on Lab 1 + Homework 1)

This file defines the Work Breakdown Structure (WBS) and the atomic commit rules for this project. Every sub-task below is defined **before** any AI prompt is issued for it, and each sub-task maps to exactly one commit. `†` = commit message/scope authored by the student because the official PDF guide does not specify it.

---

## 1. Work Breakdown Structure (WBS)

Levels: **Big step** = Exercise / Homework; **Small step** = sub-task (one AI prompt, one commit).

| ID       | Level      | Scope                                     | Contract / constraint (summary)                                      | Commit message                                       | Deliverable (file created / modified)                                               |
| -------- | ---------- | ----------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **DOC**  | Big step   | Spec & WBS for the hands-on lab           | Component contracts + WBS written before any AI call                 | `docs(spec): define component contracts & WBS table` | create `TASK_DECOMPOSITION.md`, `project-rules.md`                                  |
| **EX1**  | Big step   | Semantic DOM Architecture & A11y Contract | 0 `<div>`, skip-link, 1 `<h1>`; DevTools Landmark Tree               | — (see T-01)                                         | `index.html`                                                                        |
| T-01     | Small step | Landmark tree + skip-link                 | HTML only; no CSS in the commit                                      | `feat(html): semantic landmark tree`                 | create `index.html`                                                                 |
| **EX2**  | Big step   | Enterprise Developer Portfolio            | `'theme'` key; CSS variables; CLS/LCP budget; acceptance matrix      | — (see T-02A/B/C)                                    | `style.css`, `theme-toggle.js`, `index.html`                                        |
| T-02A    | Small step | Tokens & Reset                            | Reset + `:root` tokens + `prefers-color-scheme`; CSS only            | `feat(css): tokens & reset`                          | create `style.css`                                                                  |
| T-02B    | Small step | 2D Grid Layout                            | `repeat(auto-fit, minmax(280px, 1fr))`; CSS only                     | `feat(css): responsive grid`                         | modify `style.css`; modify `index.html` (grid/card classes)                         |
| T-02C    | Small step | Theme Engine                              | `localStorage` `'theme'`; `aria-pressed`; JS only (no CSS)           | `feat(js): dark mode engine`                         | create `theme-toggle.js`; modify `index.html` (`#theme-btn`, `<script>`)            |
| **EX3**  | Big step   | Component Architecture & State Modeling   | 5 components, one prompt + one commit each                           | — (see E3-01…05)                                     | `index.html`, `style.css`, `assets/avatar.webp`, `contact-form.js` †                |
| E3-01 †  | Small step | Hero Section                              | Portrait with explicit `width`/`height`/`alt`; headline; pitch       | `feat(ui): hero section` †                           | modify `index.html`, `style.css`; add `assets/avatar.webp`                          |
| E3-02 †  | Small step | Theme Switcher                            | Accessible button, `aria-pressed`, dynamic icon; reuses T-02C engine | `feat(ui): theme switcher` †                         | modify `index.html`, `style.css`                                                    |
| E3-03 †  | Small step | Skills Matrix                             | Categorized badges in CSS Grid                                       | `feat(ui): skills matrix` †                          | modify `index.html`, `style.css`                                                    |
| E3-04 †  | Small step | Project Cards                             | Self-contained `<article>` blocks (tags, links, descriptions)        | `feat(ui): project cards` †                          | modify `index.html`, `style.css`                                                    |
| E3-05a † | Small step | Contact Form (markup & native validation) | `required`, `minlength`, `type="email"`, explicit labels             | `feat(ui): contact form` †                           | modify `index.html`, `style.css`                                                    |
| E3-05b † | Small step | Contact Form (client-side state handling) | JS only (no CSS in the commit)                                       | `feat(js): contact form state` †                     | create `contact-form.js`; modify `index.html` (`<script>`)                          |
| **EX4**  | Big step   | Resilient Component Architecture          | 4-state contract; state machine defined first                        | — (see T-03A/B/C)                                    | `style.css`, `index.html`                                                           |
| T-03A    | Small step | Loading Skeleton                          | Pure CSS shimmer gradient                                            | `feat(css): skeleton`                                | modify `style.css`; modify `index.html` (`.skeleton-item` markup)                   |
| T-03B †  | Small step | Live Data State                           | Flexbox metadata badges + Grid list                                  | `feat(css): live data state` †                       | modify `style.css`, `index.html`                                                    |
| T-03C †  | Small step | Empty & Error States                      | Accessible retry trigger                                             | `feat(css): empty & error states` †                  | modify `style.css`, `index.html`                                                    |
| **HW1**  | Big step   | Production Portfolio — Audit & Fix        | Audit + fix on the existing Portfolio; min. 4 atomic commits         | — (see M1–M4)                                        | `index.html`, `style.css`, `theme-toggle.js`, assets                                |
| M1       | Small step | WCAG 2.2 AA audit                         | Contrast ratio >= 4.5:1; landmark roles verified                     | `fix(a11y): contrast & landmarks`                    | modify `style.css` (tokens/badge contrast), `index.html` (landmark fixes if needed) |
| M2       | Small step | Focus trap audit                          | Full keyboard Tab/Enter flow; no keyboard trap                       | `fix(nav): keyboard trap prevention`                 | modify `index.html`, `style.css`, JS files as needed                                |
| M3 †     | Small step | Strict CSP & zero inline handlers         | No `onclick="..."` anywhere; CSP meta policy defined                 | `fix(security): content security policy` †           | modify `index.html` (CSP `<meta>` tag); audit JS files for inline handlers          |
| M4       | Small step | Lighthouse 100 audit score                | Lighthouse Performance/A11y/Best Practices/SEO = 100                 | `perf: optimize assets`                              | modify `index.html`, `style.css`, `assets/*` (image compression, etc.)              |

---

## 2. Commit Rule

Every sub-task above maps to exactly one atomic commit, in this exact order. No commit may combine CSS with HTML in Exercise 1, or CSS with JS in Exercise 2. No commit may add 100+ lines across multiple files without a matching WBS entry.

| #   | Commit message                                       | Task   | Files                                           |
| --- | ---------------------------------------------------- | ------ | ----------------------------------------------- |
| 1   | `docs(spec): define component contracts & WBS table` | DOC    | `TASK_DECOMPOSITION.md`, `project-rules.md`     |
| 2   | `feat(html): semantic landmark tree`                 | T-01   | `index.html`                                    |
| 3   | `feat(css): tokens & reset`                          | T-02A  | `style.css`                                     |
| 4   | `feat(css): responsive grid`                         | T-02B  | `style.css`, `index.html`                       |
| 5   | `feat(js): dark mode engine`                         | T-02C  | `theme-toggle.js`, `index.html`                 |
| 6   | `feat(ui): hero section` †                           | E3-01  | `index.html`, `style.css`, `assets/avatar.webp` |
| 7   | `feat(ui): theme switcher` †                         | E3-02  | `index.html`, `style.css`                       |
| 8   | `feat(ui): skills matrix` †                          | E3-03  | `index.html`, `style.css`                       |
| 9   | `feat(ui): project cards` †                          | E3-04  | `index.html`, `style.css`                       |
| 10  | `feat(ui): contact form` †                           | E3-05a | `index.html`, `style.css`                       |
| 11  | `feat(js): contact form state` †                     | E3-05b | `contact-form.js`, `index.html`                 |
| 12  | `feat(css): skeleton`                                | T-03A  | `style.css`, `index.html`                       |
| 13  | `feat(css): live data state` †                       | T-03B  | `style.css`, `index.html`                       |
| 14  | `feat(css): empty & error states` †                  | T-03C  | `style.css`, `index.html`                       |
| 15  | `fix(a11y): contrast & landmarks`                    | M1     | `style.css`, `index.html`                       |
| 16  | `fix(nav): keyboard trap prevention`                 | M2     | `index.html`, `style.css`, JS files             |
| 17  | `fix(security): content security policy` †           | M3     | `index.html`                                    |
| 18  | `perf: optimize assets`                              | M4     | `index.html`, `style.css`, `assets/*`           |
