function ThemeConfig() {
  const theme =
    new URLSearchParams(new URL(window.location.href).search).get('theme') ||
    localStorage.getItem('dash_theme') ||
    (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'dark'
      : 'light');

  applyTheme(theme);

  localStorage.setItem('dash_theme', theme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute(
    'data-theme',
    theme === 'dark' ? 'dark' : 'light',
  );

  if (theme === 'dark') {
    document.body.classList.add('dark_mode');
  } else {
    document.body.classList.remove('dark_mode');
  }

  const themeBackGround = theme === 'dark' ? '#23242c' : '#fff';
  document.querySelector('#body').style.backgroundColor = themeBackGround;
}

ThemeConfig();
