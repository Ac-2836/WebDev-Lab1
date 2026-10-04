# Project Architectural Constraints
- Use Vanilla HTML5, modern CSS, and ES6+ JS exclusively.
- No jQuery, Bootstrap, Tailwind, or external script CDNs.
- Prioritize native semantic HTML over generic <div> containers.
- Declare variables using const by default, let only if reassigned.
- Never render unescaped user inputs with innerHTML (XSS risk).
- Mobile-first: Verify 375px viewport prior to desktop.

## Agent Mandate
- Always parse project rules before proposing any code changes.
- Work on ONE isolated sub-task per prompt, as defined in TASK_DECOMPOSITION.md. Never generate the whole assignment in one shot.
- Do not introduce unauthorized libraries or dependencies.

## Lab 1 Hands-on Constraints
### Environment
- Serve the app via Live Server at http://localhost:5500. Never open files via file:///.
- Deprecated tools are not allowed: Kite AutoComplete, obsolete boilerplate snippets.

### HTML
- Boilerplate: `<html lang="en">`, `<meta charset="UTF-8">`, viewport `width=device-width, initial-scale=1.0`. Do not include `<meta http-equiv="X-UA-Compatible" content="IE=edge">`.
- Exercise 1 (T-01): the landmark tree contains 0 `<div>` elements, an accessible skip-link, and exactly one `<h1>`.
- Exactly ONE `<h1>` per document. Never skip heading levels (h1 -> h2 -> h3). Use CSS for font sizing.
- Every form input has an explicit visible `<label for="id">` paired with `<input id="id">`. Do not use placeholder as a label. Use `aria-describedby` for hint text.
- Every `<img>` has a descriptive `alt` and explicit `width` and `height` (prevents CLS).
- `<strike>` is obsolete: use `<del>` or `<s>`.

### CSS
- Global reset: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`.
- Load CSS from an external stylesheet via `<link>`. Inline `style=""` is an anti-pattern.
- All colors come from CSS custom properties declared in `:root` (design tokens). Zero hardcoded hex codes inside rules.
- Flexbox for 1D layouts and Grid for 2D layouts. Always use `gap` instead of margin overrides on child items.
- Responsive card grids use `repeat(auto-fit, minmax(280px, 1fr))`.
- No horizontal scroll at 375px. Contrast must meet WCAG 2.2 AA (>= 4.5:1).
- Performance budget: zero CLS, LCP < 2.0s on DevTools Fast 3G.

### JavaScript
- Never use `var`. Use `document.querySelector` / `querySelectorAll` and `classList`.
- Theme persistence strictly via `localStorage` key `'theme'`.
- Zero console errors, including while toggling the theme.
- All interactive elements are operable with Tab and Enter.

### Commits
- Atomic commits only. A commit adding 100+ lines across multiple files without an atomic spec is not allowed.
- Never combine CSS with HTML in one commit for Exercise 1 (T-01).
- Never combine CSS and JS in one commit for Exercise 2.
- Never prompt for all 4 states of Exercise 4 at once; commit each sub-task individually.
