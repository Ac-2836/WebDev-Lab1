# HƯỚNG DẪN THỰC HÀNH LAB 1 — HANDS-ON LAB (EXERCISE 1 → 4)

**Môn học:** Web Application Development — Lab 1: Modern Web Development & AI-Assisted Engineering
**Giảng viên:** MSc. Trần Vĩnh Khiêm — University of Information Technology, VNUHCM
**Nguồn chuẩn duy nhất:** file PDF `Lab_1_-_Web_Application_Development_2026`. Mọi nội dung dưới đây lấy từ PDF.

**Quy ước ký hiệu**
- `[S7]` = slide (page) 7 của PDF.
- `⚠` = chỗ PDF **không nêu** hoặc **không thống nhất** (xem Phần 9). Không được tự suy diễn — hỏi giảng viên.

> *"HTML is the foundation. CSS enhances presentation. JavaScript enhances behavior. AI enhances the developer."* [S1]
> *"AI can generate code. Developers are responsible for proving that it is correct."* — (Generate with AI. Verify with engineering.) [S26]

---

# PHẦN 0. PHẠM VI

## 0.1 Bài cần làm: 4 Hands-on Exercises

| Ex | Slide | Tên | Sản phẩm chính |
|---|---|---|---|
| 1 | S7 | Semantic DOM Architecture & A11y Contract | `index.html` — cây landmark, 0 `<div>`, skip-link |
| 2 | S13 | Enterprise Developer Portfolio | Tokens & Reset (CSS) → 2D Grid (CSS) → Theme Engine (JS) |
| 3 | S14 | Component Architecture & State Modeling | Hero, Theme Switcher, Skills Matrix, Project Cards, Contact Form |
| 4 | S18 | Resilient Component Architecture | 4 trạng thái: Loading Skeleton, Live Data, Empty, Error |

## 0.2 Kiến thức tầng CORE (phải nắm vững) [S2]
- Semantic HTML: các thẻ landmark bắt buộc
- CSS Box Model: cơ chế reset `border-box`
- Modern Layouts: Flexbox (1D) & Grid (2D)
- Mobile-First Responsive: baseline viewport 375px
- Vanilla JS ES6+: DOM APIs, `querySelector`
- W3C Standard Events: `keydown` & `event.key`
- Git Diff Inspection: kiểm toán những thay đổi do AI sinh ra

Tầng AWARENESS (biết và biết tra cứu): Native Dialog & Popover, Native CSS Nesting, Browser Baseline, Core Web Vitals (LCP, CLS, INP), Container Queries & `:has()`, Fetch API & async/await, XSS & rủi ro `innerHTML`.
Tầng LATER LABS (không thuộc Lab 1): TypeScript, React/Next.js, Playwright, CI/CD, REST/GraphQL, State Management.

## 0.3 Không thuộc phạm vi tài liệu này
Homework 1, 2, 3 (S24–S25), slide Bảng HTML (S10), slide Drum Kit (S23).

---

# PHẦN 1. MÔ TẢ YÊU CẦU CỦA TỪNG EXERCISE (TÓM TẮT)

**Exercise 1 [S7]** — Dựng khung HTML ngữ nghĩa với skip-link, header (có `<h1>` duy nhất), nav, main chứa 2 section (`about`, `projects`). **0 thẻ `<div>`.** Kiểm tra bằng Chrome DevTools → Accessibility → Landmark Tree.

**Exercise 2 [S13]** — Trang Portfolio chuẩn doanh nghiệp, chia 3 sub-task có commit riêng: T-02A Tokens & Reset, T-02B 2D Grid Layout, T-02C Theme Engine (dark mode, lưu `localStorage` key `'theme'`). Có tiêu chí nghiệm thu nghiêm ngặt và live defense 3 phút.

**Exercise 3 [S14]** — Các component: Hero Section, Theme Switcher, Skills Matrix, Project Cards, Contact Form.

**Exercise 4 [S18]** — Hợp đồng 4 trạng thái bền vững: T-03A Loading Skeleton (shimmer CSS thuần), T-03B Live Data (Flexbox badges + Grid list), T-03C Empty & Error có nút thử lại đạt chuẩn trợ năng.

---

# PHẦN 2. RÀNG BUỘC & LUẬT CHUNG

## 2.1 Môi trường & công cụ [S3]
- IDE: Visual Studio Code hoặc Agentic IDE (Cursor, Windsurf).
- Local server: extension **Live Server**, chạy tại `http://localhost:5500`.
- **STRICT BAN:** không bao giờ mở file trực tiếp qua `file:///...` (làm hỏng CORS, Web Audio, ES Modules).
- Formatting & Linting: **Prettier** (auto-format khi save) và **ESLint**.
- Version control: khởi tạo Git cục bộ (`git init`) để theo dõi các thay đổi của code.
- AI Coding Assistants được liệt kê: GitHub Copilot, Gemini Code Assist, Cursor.
- Emmet có sẵn trong VS Code (không cần extension boilerplate ngoài).
- **Công cụ bị khai tử — KHÔNG dùng:**
  - Kite AutoComplete (đã đóng cửa từ 2022).
  - Obsolete Boilerplate Snippets (đã được thay bởi Emmet `!`).
- **Engineering Rule:** AI viết boilerplate; bạn thiết kế kiến trúc và kiểm chứng tính đúng đắn.

## 2.2 Quy trình Anti-Monolithic: phân rã trước khi prompt [S5]
**Không one-shot.** Đưa nguyên đề bài cho AI sẽ sinh ra spaghetti code gắn kết chặt; AI đưa vào thư viện trái phép, hallucination và state flag giòn.

**4 giai đoạn phân rã BẮT BUỘC:**
1. **Functional Slicing:** chia app thành các hệ con cô lập, kiểm chứng được.
2. **Contract Definition:** định nghĩa thuộc tính dữ liệu & interface **trước khi** viết code.
3. **Atomic Generation:** mỗi lần chỉ prompt AI cho **MỘT** sub-task cô lập.
4. **Contract Verification:** kiểm thử hệ con độc lập **trước khi** tích hợp.

**File nộp bắt buộc:** `TASK_DECOMPOSITION.md` — sinh viên phải định nghĩa sub-task **TRƯỚC khi** gọi AI.
**Luật:** zero credit nếu nộp prompt AI dạng monolithic dump.

## 2.3 Context Engineering: `project-rules.md` [S6]
AI agent sẽ trôi sang hallucination nếu không có ràng buộc cố định. Tạo file cố định **`project-rules.md`** (hoặc `.cursorrules`) tại **root của repo**. Mandate dành cho AI: *"Always parse project rules before proposing any code changes."*

Nội dung mẫu trong PDF:

```md
# Project Architectural Constraints
- Use Vanilla HTML5, modern CSS, and ES6+ JS exclusively.
- No jQuery, Bootstrap, Tailwind, or external script CDNs.
- Prioritize native semantic HTML over generic <div> containers.
- Declare variables using const by default, let only if reassigned.
- Never render unescaped user inputs with innerHTML (XSS risk).
- Mobile-first: Verify 375px viewport prior to desktop.
```

## 2.4 Atomic Git Commits — bằng chứng của việc phân rã [S20]
- **Commit nguyên khối bị cấm:** commit thêm 100+ dòng trên nhiều file mà không theo atomic spec = **0 pts**.
- **Pipeline commit nguyên tử bắt buộc (tối thiểu 6 commit):**
  1. `docs(spec): define component contracts & WBS table`
  2. `feat(html): build semantic landmark tree (zero divs)`
  3. `feat(css): implement design tokens & box-sizing reset`
  4. `feat(css): build 2D responsive grid layout`
  5. `feat(js): implement decoupled audio engine logic`
  6. `feat(js): bind keydown events with repeat throttling`
  (⚠ commit 5–6 nhắc tới audio — xem Phần 9.)
- **Message commit riêng của từng Exercise** nằm trong slide của Exercise đó (S7, S13, S18) — xem từng Phần bên dưới.

## 2.5 Live Defense 3 phút (Pass/Fail Gate) [S20]
Khi chấm, giảng viên sửa **MỘT** ràng buộc hợp đồng ngay tại chỗ:
- Test A: *"Change data-sound attribute to data-audio-src."*
- Test B: *"Add Spacebar listener to halt all active audio."*
- Test C: *"Swap grid minmax(280px, 1fr) to container query."*

Kết quả: **Decomposed Architect** sửa 1 dòng, qua trong 60 giây. **Monolithic Copier** mất phương hướng, không prompt AI kịp → **FAILS**.
Riêng Exercise 2: giảng viên đổi 1 CSS token, bạn phải sửa trong **60 giây** [S13].

## 2.6 Bảng tổng hợp hình phạt (theo PDF)

| Vi phạm | Hậu quả | Nguồn |
|---|---|---|
| Nộp prompt AI dạng monolithic dump | Zero credit | S5 |
| Ex1: commit gộp CSS với HTML | 0 pts | S7 |
| Ex2: commit gộp CSS và JS trong 1 lần | 0 pts | S13 |
| Commit 100+ dòng nhiều file không theo atomic spec | 0 pts | S20 |
| Live defense: không sửa kịp / không prompt kịp | FAILS | S20 |

Theo xác nhận của bạn: các mức phạt trên đúng như slide — **làm sai là mất điểm cả bài**.

## 2.7 Quy tắc kỹ thuật theo PDF

### HTML
- Boilerplate [S4]: gõ `!` hoặc `html:5` + Tab trong file `.html` trống; `<html lang="en">` bắt buộc; `<meta charset="UTF-8">`; viewport `width=device-width, initial-scale=1.0`; **bỏ** `<meta http-equiv="X-UA-Compatible" content="IE=edge">`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">
  <title>Developer Portfolio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Semantic document tree goes here -->
</body>
</html>
```

- Nội dung & a11y [S8]:
  - Text elements: `<p>`, `<blockquote>`, `<address>`, `<code>`, `<pre>`; `<strong>` (quan trọng), `<em>` (nhấn).
  - `<strike>` đã lỗi thời → dùng `<del>` hoặc `<s>`.
  - Đúng **MỘT** `<h1>` mỗi tài liệu; không nhảy cấp (`h1 → h2 → h3`); dùng CSS để chỉnh cỡ chữ.
  - Form: luôn ghép `<label for="id">` hiển thị với `<input id="id">`; tránh lạm dụng placeholder (biến mất khi nhập, không đạt tương phản); dùng `aria-describedby` cho hint.
- Media & CLS [S9]:
  - Mục tiêu Core Web Vitals: LCP ≤ 2.5s; INP ≤ 200ms; CLS ≤ 0.1.
  - Ảnh không khai báo kích thước tải bất đồng bộ làm đẩy nội dung (CLS). Luôn có `alt` mô tả.

```html
<img
  src="assets/avatar.webp"
  alt="Portrait of Senior Developer"
  width="400"
  height="400"
  loading="lazy"
  decoding="async">
```

- Form [S11]: native validation `required`, `pattern`, `min`, `max`, `minlength`; input type hiện đại `email, tel, date, number, url, search`; chỉ GET/POST tồn tại natively (PUT/PATCH/DELETE cần Fetch API).

```html
<form action="/api/register" method="POST">
  <label for="applicant-name">Full Name:</label>
  <input type="text" id="applicant-name" name="name"
         required minlength="3">

  <label for="applicant-email">Institutional Email:</label>
  <input type="email" id="applicant-email" name="email" required>

  <button type="submit">Submit Application</button>
</form>
```

### CSS
- Box Model [S15]: Margin (khoảng ngoài trong suốt) → Border → Padding (khoảng trong trong suốt) → Content. 3 cách nhúng CSS: External stylesheet (`<link>` — ưu tiên), Style region (`<style>`), Inline style (**anti-pattern**).

```css
/* Mandatory Modern CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  color-scheme: light dark;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.6;
}
```

- Flexbox [S16]: 1D (một trục: row HOẶC column). Dùng cho nav header/footer, căn giữa, toolbar nút và metadata chips. Thuộc tính cốt lõi: `display: flex`, `justify-content`, `align-items`, `flex-wrap`, `gap`. **Luật: luôn dùng `gap`, không ghi đè `margin` trên item con.**

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  gap: 1.5rem;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.25rem;
}
```

- Grid [S17]: 2D (hàng VÀ cột). `repeat(auto-fit, minmax(280px, 1fr))` tạo cột tự co giãn, không cần media query.

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem 0;
}

.project-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
}
```

- Custom Properties & Dark Mode [S19]: khai báo design token tập trung ở `:root`; dùng `@media (prefers-color-scheme: dark)` để theo theme hệ điều hành. (Nesting native và `light-dark()` được nhắc ở mức biết.)

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #0f172a;
  --accent: #0284c7;
  --card-bg: #f8fafc;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0f172a;
    --text-primary: #f8fafc;
    --accent: #38bdf8;
    --card-bg: #1e293b;
  }
}
```

### JavaScript [S22]
- `const` mặc định; `let` chỉ khi bắt buộc gán lại; **loại bỏ `var`** (hoisting bug, ô nhiễm `window`).
- `document.querySelector(selector)` (phần tử đầu tiên khớp); `document.querySelectorAll(selector)` (NodeList lặp được).
- `classList.add()`, `remove()`, `toggle()`, `contains()`.

```js
// Clean Modern DOM Manipulation
const themeToggle = document.querySelector('#theme-btn');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  themeToggle.setAttribute('aria-pressed', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
```

## 2.8 5 Quality Gates cho Web do AI sinh ra [S21]
1. **Functional & Responsive:** thỏa mọi Acceptance Criteria; layout hoàn hảo ở 375px, không cuộn ngang.
2. **A11y & Performance:** điều hướng hoàn toàn bằng Tab & Enter; Lighthouse sạch; zero CLS.
3. **Security & Code Health:** zero XSS (không xuất input chưa escape bằng `innerHTML`); indentation sạch, không dead code, không dependency trái phép.

## 2.9 Thang điểm tổng (100%) [S26]
- 30% — Functional & Architectural Correctness: thỏa đủ Acceptance Criteria.
- 25% — Web Engineering Foundations: **vấn đáp** Semantic DOM, Box Model, Event Loop, State modeling.
- 15% — Responsiveness & Accessibility: hoàn hảo ở 375px; 100% điều hướng bằng bàn phím (không dùng chuột).
- 15% — Code Quality & Security: Git history sạch, zero XSS, zero `innerHTML` chưa escape.
- 15% — AI Failure Mode Analysis & Dev Log.

## 2.10 Nhắc nhỏ của giảng viên
- Senior hỏi: *"Can my target user browsers run it without polyfills?"* chứ không hỏi *"Does this shiny CSS feature look cool?"* [S12]
- Không tin các bài blog SEO lỗi thời với practice cũ. Nguồn chuẩn: MDN (developer.mozilla.org), web.dev, W3C/WHATWG. [S12]
- Baseline: *Widely Available* (≥ 30 tháng trên mọi engine chính — `<dialog>`, Flexbox, Grid) an toàn cho production; *Newly Available* (Popover API, `:has()`) cần đánh giá người dùng. [S12]
- Vấn đáp: giảng viên có thể đổi một ràng buộc ngay tại chỗ (mục 2.5). [S20]

---

# PHẦN 3. CÁC BƯỚC CHUẨN BỊ CHUNG (LÀM TRƯỚC EXERCISE 1)

## Bước C1 — Thiết lập môi trường [S3]
- [ ] Cài VS Code (hoặc Cursor/Windsurf); bật Prettier (format on save) và ESLint.
- [ ] Cài extension **Live Server**; chạy dự án tại `http://localhost:5500`. **Không** mở file bằng `file:///`.
- [ ] Tạo thư mục dự án và chạy `git init` tại thư mục gốc.
- [ ] Không dùng Kite AutoComplete và snippet boilerplate lỗi thời; dùng Emmet có sẵn.
- **Deliverable:** thư mục dự án + thư mục `.git/`.

## Bước C2 — Tạo `project-rules.md` [S6]
- [ ] Tạo `project-rules.md` (hoặc `.cursorrules`) tại root repo với đúng nội dung ở mục 2.3.
- [ ] Mỗi phiên làm việc với AI agent: yêu cầu agent *"Always parse project rules before proposing any code changes."*
- **Deliverable:** `project-rules.md` (tạo). ⚠ PDF không nói file này thuộc commit nào (Phần 9).

## Bước C3 — Viết TOÀN BỘ `TASK_DECOMPOSITION.md` cho Exercise 1–4 và commit `docs(spec)` [S5, S20]
`TASK_DECOMPOSITION.md` là **file nộp bắt buộc**; sub-task phải được định nghĩa **trước khi** gọi AI. Bạn viết file này **một lần, đầy đủ cho cả hands-on lab (Ex1–Ex4)** rồi commit ngay làm **commit 1**. Vì vậy các Exercise bên dưới **không** cần khai báo/cập nhật WBS lại.

**Nội dung bắt buộc phải có trong file** (PDF không quy định định dạng, chỉ yêu cầu những nội dung này):
- [ ] **Ex1:** WBS `T-01` (Semantic DOM landmarks: 0 divs, skip-link, 1 h1) + hợp đồng cây landmark (0 `<div>`): skip-link ở đầu `<body>`; `<header role="banner">` chứa `<h1>Jane Doe, Lead Engineer</h1>`; `<nav role="navigation" aria-label="Primary">` với `<ul>/<li>/<a>` trỏ `#about`, `#projects`; `<main id="main-content" role="main">` chứa `<section id="about">` và `<section id="projects">`.
- [ ] **Ex2:** WBS `T-02A`, `T-02B`, `T-02C` + Contract-First Constraints (key `localStorage` `'theme'`; màu qua CSS variables, zero hex trong rule; budget zero CLS, LCP < 2.0s Fast 3G) + Acceptance Criteria (mục 5.3).
- [ ] **Ex3:** 5 component (Hero, Theme Switcher, Skills Matrix, Project Cards, Contact Form) + contract của từng component (cấu trúc DOM, class, `data-*`; contract Project Card ở mục 6.3).
- [ ] **Ex4:** **state machine** 4 trạng thái (Loading, Live Data, Empty, Error) + `T-03A`, `T-03B`, `T-03C`.
- [ ] **Bảng WBS** bên dưới (kèm cột Deliverable).

### Bảng WBS (kèm Deliverable)
Ký hiệu: `†` = message do tạo theo mẫu `type(scope): ...` vì PDF không nêu. `⚠` = PDF không nêu (xem Phần 9).

| Mã | Cấp | Nội dung | Contract / ràng buộc (theo PDF) | Commit message | Deliverable (file tạo / sửa) |
|---|---|---|---|---|---|
| **DOC** | Bước lớn | Spec & WBS toàn hands-on | WBS + component contracts viết trước khi gọi AI | `docs(spec): define component contracts & WBS table` | tạo `TASK_DECOMPOSITION.md` |
| **EX1** | Bước lớn | Semantic DOM Architecture & A11y Contract | 0 div, 1 h1, skip-link; DevTools Landmark Tree | (xem T-01) | `index.html` |
| T-01 | Bước nhỏ | Landmark tree + skip-link | 0 `<div>`; không CSS trong commit | `feat(html): semantic landmark tree` | tạo `index.html` |
| **EX2** | Bước lớn | Enterprise Developer Portfolio | `'theme'`; CSS variables; CLS/LCP; acceptance matrix | (xem T-02A/B/C) | `style.css`, `theme-toggle.js`, `index.html` |
| T-02A | Bước nhỏ | Tokens & Reset | border-box reset; tokens ở `:root`; zero hex trong rule | `feat(css): tokens & reset` | tạo `style.css` ⚠ |
| T-02B | Bước nhỏ | 2D Grid Layout | `repeat(auto-fit, minmax(280px, 1fr))`; 375px không cuộn ngang | `feat(css): responsive grid` | sửa `style.css`; sửa `index.html` (class `.project-grid`/`.project-card`) ⚠ |
| T-02C | Bước nhỏ | Theme Engine | `localStorage` key `'theme'`; `aria-pressed`; không gộp CSS+JS | `feat(js): dark mode engine` | tạo `theme-toggle.js`; sửa `index.html` (nút `#theme-btn`, thẻ script) ⚠ |
| **EX3** | Bước lớn | Component Architecture & State Modeling | 5 component, prompt/commit nguyên tử | ⚠ | `index.html`, `style.css`, `theme-toggle.js`, JS cho form ⚠, `assets/avatar.webp` |
| Hero | Bước nhỏ | Hero Section | Ảnh có `width`/`height`/`alt`; headline; pitch | ⚠ | sửa `index.html`, `style.css`; thêm `assets/avatar.webp` |
| Theme Switcher | Bước nhỏ | Nút theme | `aria-pressed`, icon động | ⚠ | sửa `index.html`, `style.css`, `theme-toggle.js` |
| Skills Matrix | Bước nhỏ | Badge kỹ năng theo nhóm | CSS Grid | ⚠ | sửa `index.html`, `style.css` |
| Project Cards | Bước nhỏ | Thẻ dự án | `<article class="project-card" data-category>` | ⚠ | sửa `index.html`, `style.css` |
| Contact Form | Bước nhỏ | Form liên hệ | Native validation; label tường minh; xử lý state client | ⚠ | sửa `index.html`, `style.css`; JS xử lý state (tên file ⚠) |
| **EX4** | Bước lớn | Resilient Component Architecture | State machine 4 trạng thái; không prompt 4 state một lần | (xem T-03A/B/C) | `style.css`, `index.html`, JS xử lý state ⚠ |
| T-03A | Bước nhỏ | Loading Skeleton | Shimmer CSS thuần | `feat(css): skeleton` | sửa `style.css`; sửa `index.html` (markup `.skeleton-item`) ⚠ |
| T-03B | Bước nhỏ | Live Data State | Metadata badge Flexbox + danh sách Grid | `feat(css): live data state` † | sửa `style.css`, `index.html` |
| T-03C | Bước nhỏ | Empty & Error State | Retry trigger đạt chuẩn trợ năng | `feat(css): empty & error states` † | sửa `style.css`, `index.html` |

- [ ] **Commit 1** (push/up luôn file decomposition của cả hands-on lab):
```bash
git commit -m 'docs(spec): define component contracts & WBS table'
```
- **Deliverable:** `TASK_DECOMPOSITION.md` (tạo) — chỉ file này nằm trong commit 1.

---

# PHẦN 4. EXERCISE 1 — SEMANTIC DOM ARCHITECTURE & A11Y CONTRACT [S7]

## 4.1 Yêu cầu
Xây `index.html` chỉ gồm HTML (không CSS) với cây landmark ngữ nghĩa, skip-link trợ năng, **0 thẻ `<div>`**, đúng **1 `<h1>`**.

## 4.2 Ràng buộc
- Cây landmark phải có **0 `<div>`** (comment trong code mẫu: *"ATOMIC MILESTONE T-01: No div tags allowed"*).
- Đúng 1 `<h1>`; heading không nhảy cấp [S8]; `index.html` theo boilerplate ở mục 2.7.
- Commit chỉ chứa HTML: **commit gộp CSS với HTML = 0 pts.**
- Prompt AI chỉ cho **T-01**, không đưa cả đề bài vào một prompt.

## 4.3 Các bước (đúng thứ tự PDF)

**STEP 1 & STEP 2 — Khai báo WBS Task T-01 và định nghĩa hợp đồng landmark (0 `<div>`)**
- [ ] Đã hoàn thành trong Bước C3 (commit 1). Chỉ cần mở `TASK_DECOMPOSITION.md` kiểm tra mục T-01 và hợp đồng landmark đã có trước khi prompt AI.
- **Deliverable:** không đổi file (đọc `TASK_DECOMPOSITION.md`).

**STEP 3 — Cài skip-link trợ năng và cây landmark** (giai đoạn Atomic Generation, chỉ T-01)

Mã tham chiếu trong PDF:

```html
<!-- ATOMIC MILESTONE T-01: No div tags allowed -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
<header role="banner">
  <h1>Jane Doe, Lead Engineer</h1>
</header>
<nav role="navigation" aria-label="Primary">
  <ul>
    <li><a href="#about">About</a></li>
    <li><a href="#projects">Projects</a></li>
  </ul>
</nav>
<main id="main-content" role="main">
  <section id="about">...</section>
  <section id="projects">...</section>
</main>
```

(⚠ chữ trong slide ghi `href="#main"`, code ghi `#main-content` — xem Phần 9. Đảm bảo `href` của skip-link khớp với `id` của `<main>`.)
- **Deliverable:** `index.html` (tạo — boilerplate + khối trên đặt trong `<body>`).

**STEP 4 — Atomic Commit**
- [ ] Chỉ stage HTML (không CSS). Chạy:
```bash
git commit -m 'feat(html): semantic landmark tree'
```
- **Deliverable:** commit chỉ chứa `index.html`.

**VERIFICATION GATE**
- [ ] Mở Chrome DevTools → **Accessibility** → kiểm tra **Landmark Tree** hiển thị đúng.
- [ ] Đếm lại: 0 `<div>`, 1 `<h1>`.

## 4.4 Checklist nghiệm thu Exercise 1
- [ ] Mục T-01 + contract landmark đã nằm trong commit 1
- [ ] Skip-link hoạt động
- [ ] 0 `<div>`, 1 `<h1>`
- [ ] Landmark Tree đúng trong DevTools
- [ ] Commit `feat(html): semantic landmark tree` chỉ chứa HTML

---

# PHẦN 5. EXERCISE 2 — ENTERPRISE DEVELOPER PORTFOLIO [S13]

## 5.1 Yêu cầu
Trang Portfolio với 3 sub-task bắt buộc, mỗi sub-task **một commit riêng**:

| Sub-task | Nội dung | Commit | Deliverable |
|---|---|---|---|
| T-02A | Tokens & Reset | `feat(css): tokens & reset` | `style.css` (tạo) ⚠ |
| T-02B | 2D Grid Layout | `feat(css): responsive grid` | `style.css` (sửa); `index.html` (sửa) ⚠ |
| T-02C | Theme Engine | `feat(js): dark mode engine` | `theme-toggle.js` (tạo); `index.html` (sửa) ⚠ |

## 5.2 Ràng buộc hợp đồng (CONTRACT-FIRST)
- Lưu trạng thái theme **chỉ** qua `localStorage` với key **`'theme'`**.
- Màu sắc ghép qua **CSS variables**; **zero hardcoded hex** trong các rule (hex chỉ khai báo ở token `:root`).
- Ngân sách hiệu năng: **zero CLS**, **LCP < 2.0s** trên **DevTools Fast 3G**.

## 5.3 Tiêu chí nghiệm thu (Strict Acceptance Criteria Matrix)
- [ ] **Monolithic Dump Ban:** commit gộp CSS & JS trong 1 lần = **0 pts**.
- [ ] Hiển thị sạch ở **375px** (không cuộn ngang).
- [ ] Đạt **WCAG 2.2 AA** (tương phản ≥ 4.5:1).
- [ ] **Zero console errors** khi bật/tắt theme động.
- [ ] Điều hướng đầy đủ bằng **Tab & Enter**.
- [ ] **3-Minute Live Defense:** giảng viên đổi 1 CSS token; bạn phải sửa trong **60 giây**.

## 5.4 Các bước

**STEP 1 — Điều kiện tiên quyết**
- [ ] WBS T-02A/B/C, Contract-First Constraints và Acceptance Criteria đã có trong `TASK_DECOMPOSITION.md` (commit 1). Không viết lại.
- **Deliverable:** không đổi file.

**STEP 2 — T-02A: Tokens & Reset** (chỉ CSS)
- [ ] Prompt AI **chỉ** cho T-02A.
- [ ] CSS Reset chuẩn (mã mục 2.7 — Box Model).
- [ ] Design tokens ở `:root` (`--bg-primary`, `--text-primary`, `--accent`, `--card-bg`) + dark values trong `@media (prefers-color-scheme: dark)` (mã mục 2.7 — Custom Properties). Mọi rule sau này gọi màu qua `var(--...)`.
- [ ] Kiểm tra riêng (Contract Verification), rồi:
```bash
git commit -m 'feat(css): tokens & reset'
```
- **Deliverable:** `style.css` (tạo) ⚠.

**STEP 3 — T-02B: 2D Grid Layout** (chỉ CSS, cùng markup tối thiểu)
- [ ] Prompt AI **chỉ** cho T-02B.
- [ ] `.project-grid` với `repeat(auto-fit, minmax(280px, 1fr))`, `gap`; `.project-card` dùng `var(--card-bg)`, `var(--border-color)` (mã mục 2.7 — Grid).
- [ ] Nếu dùng Flexbox (ví dụ nav): dùng `gap`, không ghi đè `margin` của item con.
- [ ] Kiểm tra ở 375px (không cuộn ngang), rồi:
```bash
git commit -m 'feat(css): responsive grid'
```
- **Deliverable:** `style.css` (sửa); `index.html` (sửa — gắn class `.project-grid`/`.project-card`) ⚠.

**STEP 4 — T-02C: Theme Engine** (chỉ JS)
- [ ] Prompt AI **chỉ** cho T-02C.
- [ ] Nút theme `#theme-btn` có `aria-pressed`; JS bắt `click`, toggle class, cập nhật `aria-pressed`, ghi `localStorage` key `'theme'` (mã mục 2.7 — JavaScript).
- [ ] Dùng `const`/`let`, không dùng `var`.
- [ ] Kiểm tra: bật/tắt theme nhiều lần, **console không lỗi**. Rồi:
```bash
git commit -m 'feat(js): dark mode engine'
```
- **Deliverable:** `theme-toggle.js` (tạo); `index.html` (sửa — nút `#theme-btn`, thẻ `<script>`) ⚠. Không có CSS trong commit này.

**STEP 5 — Nghiệm thu toàn bộ (Acceptance Matrix 5.3)**
- [ ] 375px không cuộn ngang
- [ ] Tương phản ≥ 4.5:1 (WCAG 2.2 AA)
- [ ] Zero console errors khi toggle
- [ ] Tab & Enter dùng được toàn bộ navigation
- [ ] DevTools Fast 3G: LCP < 2.0s, CLS = 0
- [ ] Không có hex trong rule (chỉ trong token `:root`)
- **Deliverable:** không đổi file (chỉ kiểm thử).

**STEP 6 — Chuẩn bị Live Defense (60 giây)**
- [ ] Biết chính xác token nào nằm ở đâu và chỉnh/khắc phục 1 token trong 60 giây.
- [ ] Biết cách prompt AI (hoặc tự sửa) cho đúng **một** dòng, không rewrite cả file.

---

# PHẦN 6. EXERCISE 3 — COMPONENT ARCHITECTURE & STATE MODELING [S14]

## 6.1 Yêu cầu — Modular Component Architecture
Năm component bắt buộc:

| # | Component | Yêu cầu theo PDF | Deliverable |
|---|---|---|---|
| 1 | **Hero Section** | Ảnh chân dung độ phân giải cao có **kích thước tường minh**, headline, pitch | `index.html`, `style.css` (sửa); `assets/avatar.webp` (thêm) |
| 2 | **Theme Switcher** | Nút trợ năng có `aria-pressed` và icon động | `index.html`, `style.css`, `theme-toggle.js` (sửa) |
| 3 | **Skills Matrix** | Badge có phân loại (categorized), sắp xếp trong **CSS Grid** gọn gàng | `index.html`, `style.css` (sửa) |
| 4 | **Project Cards** | Khối `<article>` tự chứa, có tag, link, mô tả | `index.html`, `style.css` (sửa) |
| 5 | **Contact Form** | Form native có validation, xử lý state phía client | `index.html`, `style.css` (sửa); JS xử lý state (tên file ⚠) |

## 6.2 Ràng buộc
- Áp dụng toàn bộ luật chung ở Phần 2: anti-monolithic (mỗi lần prompt **một** component), contract trước code, commit nguyên tử (cấm commit 100+ dòng nhiều file không theo atomic spec), project rules, Quality Gates.
- Ảnh Hero: khai báo `width`/`height`, `alt` mô tả (để tránh CLS) — mã mẫu ở mục 2.7.
- Contact Form: `<label for>` hiển thị đi cùng `<input id>`; native constraint validation; không dùng placeholder thay label; `aria-describedby` cho hint [S8, S11].
- Không dùng `innerHTML` với dữ liệu người dùng chưa escape [S6, S21].
- Layout bằng Flexbox/Grid theo luật `gap`; màu qua CSS variable (đã định nghĩa ở Ex2).

## 6.3 Các bước

**STEP 1 — Điều kiện tiên quyết**
- [ ] 5 component và contract của từng cái đã có trong `TASK_DECOMPOSITION.md` (commit 1). Không viết lại.
- [ ] ⚠ PDF không cho mã Task và commit message của Ex3 — đặt message nhất quán theo mẫu `type(scope): ...` và hỏi lại giảng viên nếu cần.
- **Deliverable:** không đổi file.

Contract tham chiếu cho Project Card trong PDF:

```html
<article class="project-card" data-category="frontend">
  <header class="card-header">
    <h3>Distributed State Engine</h3>
    <span class="badge">TypeScript</span>
  </header>
  <p>Lightweight event bus built without external libraries.</p>
  <footer class="card-footer">
    <a href="#" aria-label="View State Engine repository">Source
Code</a>
  </footer>
</article>
```

**STEP 2 — Hero Section** (một prompt, một component)
- [ ] Ảnh có `width`, `height`, `alt`; headline; pitch. Giữ đúng một `<h1>` cho cả trang.
- [ ] Verify độc lập → commit riêng.
- **Deliverable:** `index.html` (sửa), `style.css` (sửa), `assets/avatar.webp` (thêm).

**STEP 3 — Theme Switcher**
- [ ] Nút trợ năng + `aria-pressed` + icon đổi theo trạng thái; nối với theme engine của Ex2 (key `'theme'`).
- [ ] Verify (Tab & Enter, console sạch) → commit riêng.
- **Deliverable:** `index.html`, `style.css`, `theme-toggle.js` (sửa).

**STEP 4 — Skills Matrix**
- [ ] Badge chia nhóm, bố trí bằng CSS Grid.
- [ ] Verify ở 375px → commit riêng.
- **Deliverable:** `index.html`, `style.css` (sửa).

**STEP 5 — Project Cards**
- [ ] Mỗi card là `<article>` tự chứa với tag, link, mô tả (theo contract ở trên); đặt trong `.project-grid` của Ex2.
- [ ] Verify → commit riêng.
- **Deliverable:** `index.html`, `style.css` (sửa).

**STEP 6 — Contact Form**
- [ ] Form native với `<label for>`, `required`, `minlength="3"`, `type="email"` (mã mẫu mục 2.7); xử lý state phía client.
- [ ] Verify (Tab & Enter, không XSS) → commit riêng.
- **Deliverable:** `index.html`, `style.css` (sửa); JS xử lý state (tên file ⚠).

(⚠ PDF cho Ex3 chỉ nêu danh sách component; thứ tự các bước ở trên là cách chia nhỏ để tuân thủ "một sub-task mỗi lần prompt" và "commit nguyên tử".)

## 6.4 Checklist nghiệm thu Exercise 3
- [ ] 5 component và contract đã nằm trong commit 1
- [ ] 5 component đủ, mỗi component prompt và commit riêng
- [ ] Ảnh có kích thước tường minh + `alt`
- [ ] Form: label tường minh, native validation
- [ ] 375px không cuộn ngang; Tab & Enter dùng được
- [ ] Không `innerHTML` với input chưa escape

---

# PHẦN 7. EXERCISE 4 — RESILIENT COMPONENT ARCHITECTURE [S18]

## 7.1 Yêu cầu — Hợp đồng 4 trạng thái bền vững
| Sub-task | Trạng thái | Nội dung | Commit | Deliverable |
|---|---|---|---|---|
| T-03A | Loading Skeleton | Shimmer gradient bằng **CSS thuần** | `feat(css): skeleton` | `style.css`, `index.html` (sửa) ⚠ |
| T-03B | Live Data State | Metadata badge Flexbox & danh sách Grid | `feat(css): live data state` † | `style.css`, `index.html` (sửa) |
| T-03C | Empty & Error States | Có **nút retry đạt chuẩn trợ năng** | `feat(css): empty & error states` † | `style.css`, `index.html` (sửa) |

`†` = message tạo theo mẫu `feat(css): skeleton`, PDF không nêu.

## 7.2 Ràng buộc
- **Định nghĩa state machine trong `TASK_DECOMPOSITION.md` TRƯỚC KHI prompt AI** (đã làm ở Bước C3, commit 1).
- **Commit từng sub-task riêng lẻ** (xem lưu ý ⚠ ở Phần 9 về T-03C gồm 2 state).
- **Prompt Rule: không bao giờ prompt AI cho cả 4 state cùng lúc.**
- Luật chung: commit nguyên tử, Quality Gates, 375px, Tab & Enter.

## 7.3 Các bước

**STEP 1 — Điều kiện tiên quyết**
- [ ] State machine 4 trạng thái (Loading, Live Data, Empty, Error) với điều kiện chuyển state và T-03A/T-03B/T-03C đã có trong `TASK_DECOMPOSITION.md` (commit 1). Không viết lại.
- **Deliverable:** không đổi file.

**STEP 2 — T-03A: Loading Skeleton** (chỉ prompt cho state này)

Mã tham chiếu trong PDF:

```css
/* SUB-TASK T-03A: Pure CSS Shimmer Skeleton */
.skeleton-item {
  height: 48px;
  background: linear-gradient(90deg, #1e293b 25%, #334155 50%,
#1e293b 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

- [ ] Verify độc lập, rồi:
```bash
git commit -m 'feat(css): skeleton'
```
- **Deliverable:** `style.css` (sửa); `index.html` (sửa — markup `.skeleton-item`) ⚠.

**STEP 3 — T-03B: Live Data State** (chỉ prompt cho state này)
- [ ] Metadata badge bằng Flexbox (dùng `gap`); danh sách bằng Grid.
- [ ] Verify độc lập, rồi:
```bash
git commit -m 'feat(css): live data state'
```
- **Deliverable:** `style.css`, `index.html` (sửa).

**STEP 4 — T-03C: Empty State & Error State** (chỉ prompt cho sub-task này)
- [ ] Trạng thái rỗng và trạng thái lỗi, kèm nút retry đạt chuẩn trợ năng (điều hướng được bằng Tab & Enter).
- [ ] Verify độc lập, rồi:
```bash
git commit -m 'feat(css): empty & error states'
```
- **Deliverable:** `style.css`, `index.html` (sửa).

## 7.4 Checklist nghiệm thu Exercise 4
- [ ] State machine đã nằm trong `TASK_DECOMPOSITION.md` ở commit 1, trước khi prompt AI
- [ ] Mỗi sub-task được prompt riêng (không prompt 4 state một lần)
- [ ] Mỗi sub-task commit riêng; 3 commit: skeleton, live data state, empty & error states
- [ ] Skeleton shimmer thuần CSS
- [ ] Retry button dùng được bằng bàn phím

---

# PHẦN 8. CHECKLIST TỔNG TRƯỚC KHI NỘP / CHẤM

- [ ] `project-rules.md` ở root repo
- [ ] `TASK_DECOMPOSITION.md` (WBS Ex1–Ex3 + state machine Ex4 + cột Deliverable) đã được commit ở commit 1 `docs(spec)`
- [ ] Lịch sử Git đủ commit nguyên tử, không commit 100+ dòng nhiều file không theo atomic spec
- [ ] Ex1: không có commit gộp CSS với HTML
- [ ] Ex2: không có commit gộp CSS và JS
- [ ] Không có `<div>` ở cây landmark T-01; đúng 1 `<h1>`
- [ ] Không jQuery/Bootstrap/Tailwind/CDN script; không `var`; không `innerHTML` input chưa escape
- [ ] 375px: không cuộn ngang
- [ ] WCAG 2.2 AA ≥ 4.5:1
- [ ] Toàn bộ Tab & Enter
- [ ] Fast 3G: LCP < 2.0s, CLS = 0 (Lighthouse sạch)
- [ ] Chạy bằng Live Server, không `file:///`
- [ ] Sẵn sàng live defense: đổi 1 CSS token trong 60 giây; các tình huống Test A/B/C (mục 2.5)

---

# PHẦN 9. ĐIỂM PDF KHÔNG NÊU HOẶC KHÔNG THỐNG NHẤT — CẦN HỎI GIẢNG VIÊN

1. **Skip-link:** S7 phần chữ ghi `<a href="#main">`, nhưng code mẫu ghi `href="#main-content"` và `<main id="main-content">`.
2. **Mã task khác nhau:** S5 mẫu T-01…T-05 (T-02 tokens, T-03 grid, T-04 audio, T-05 keyboard), còn S13 dùng T-02A/B/C và S18 dùng T-03A/B/C.
3. **Message commit khác nhau:** Ex1 `feat(html): semantic landmark tree` (S7) so với pipeline `feat(html): build semantic landmark tree (zero divs)` (S20). Tương tự `feat(css): tokens & reset` / `feat(css): responsive grid` (S13) so với `feat(css): implement design tokens & box-sizing reset` / `feat(css): build 2D responsive grid layout` (S20). PDF không nói dùng bản nào.
4. **Pipeline 6 commit (S20):** commit 5–6 là audio engine và keydown, không có trong Exercise 1–4; tương tự Test A/B ở live defense nhắc tới `data-sound` và Spacebar/audio.
5. **S18:** nhãn đầu slide ghi "HANDS-ON LAB: EXERCISE 3" nhưng tiêu đề là "Exercise 4".
6. **Ex3:** PDF không cho Task ID, commit message, chi tiết "client-side state handling" của Contact Form.
7. **Ex4 — commit message:** PDF chỉ cho `feat(css): skeleton`. Hai message `feat(css): live data state` (T-03B) và `feat(css): empty & error states` (T-03C) được **tạo theo mẫu** theo yêu cầu của bạn, không phải từ PDF.
8. **Ex4 — T-03C gồm 2 state:** PDF yêu cầu "Commit each state individually" và gọi là "4-State Contract", nhưng T-03C gộp Empty và Error trong một sub-task. File này dùng 1 commit cho T-03C; nếu giảng viên đếm Empty và Error là 2 commit riêng thì tách thêm 1 commit.
9. **Ex4 — retry trigger:** PDF không nói retry trigger là CSS hay có JS; nếu cần JS thì commit JS phải đặt riêng (scope `feat(js)`), không gộp với commit CSS.
10. **`--border-color`:** `.project-card` (S17) dùng `var(--border-color)` nhưng token này không có trong khối `:root` ở S19.
11. **"Zero hardcoded hex":** S13 cấm hex trong rule, nhưng mã mẫu skeleton (S18) dùng hex trực tiếp trong rule.
12. **Dark mode:** S22 toggle class `dark-theme` trên `<body>`, còn S19 chỉ có `@media (prefers-color-scheme: dark)`; PDF không cho CSS cho `.dark-theme` và không nêu việc đọc lại `localStorage` khi tải trang. PDF cũng không nói `@media` thuộc T-02A hay T-02C. Nếu cần CSS cho `.dark-theme`, nó phải ở commit CSS riêng, không cùng commit JS (luật Ex2).
13. **Ex2 — HTML đi kèm:** PDF không nêu bước HTML cho nút `#theme-btn`, thẻ `<script>`, class `.project-grid`/`.project-card` trong Ex2. Cột Deliverable ghi `index.html (sửa)` ở T-02B/T-02C theo suy luận từ code mẫu; cần xác nhận cách làm với giảng viên.
14. **Tên file:** boilerplate (S4) chỉ link `style.css`, nhưng các panel mã mẫu đặt tên `reset.css` (S15), `navbar.css` (S16), `grid.css` (S17), `theme.css` (S19), `skeleton.css` (S18), còn JS là `theme-toggle.js` (S22). File này dùng `style.css` làm file CSS duy nhất theo boilerplate; PDF không nói tách file hay không. Tên file JS xử lý state (Contact Form, Ex4) PDF cũng không nêu.
15. **`project-rules.md`:** PDF không nói file này nằm trong commit nào.
16. **S21:** tiêu đề "5 Quality Gates" nhưng liệt kê 3 nhóm (6 mục).
17. **Thứ tự Verification Gate (S7):** slide liệt kê gate sau bước commit.
