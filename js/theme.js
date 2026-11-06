/* Applies the saved (or system) theme before first paint to avoid a flash. Loaded in <head>. */
(function () {
  var theme = 'light';
  try {
    theme = localStorage.getItem('kexplore.theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (e) { /* storage blocked: fall back to light */ }
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.add('js');
})();
