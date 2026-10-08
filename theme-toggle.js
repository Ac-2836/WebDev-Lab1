// Clean Modern DOM Manipulation
const themeToggle = document.querySelector('#theme-btn');

function syncIcon(isDark) {
  themeToggle.textContent = isDark ? '☀️' : '🌙';
}

function applyTheme(isDark) {
  document.body.classList.toggle('dark-theme', isDark);
  document.body.classList.toggle('light-theme', !isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  syncIcon(isDark);
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialIsDark = savedTheme === 'dark' || (savedTheme !== 'light' && prefersDark);

applyTheme(initialIsDark);

themeToggle.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark-theme');
  applyTheme(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});