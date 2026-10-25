// Runs before first paint to avoid a flash of the wrong theme.
(function () {
  'use strict';
  var root = document.documentElement;
  var theme = null;
  root.classList.add('js');
  try { theme = localStorage.getItem('theme'); } catch (e) { /* storage unavailable */ }
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  root.setAttribute('data-theme', theme);
})();
