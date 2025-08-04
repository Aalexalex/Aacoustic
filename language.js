function changeLanguage(lang) {
  const script = document.querySelector('script[src$="language.js"]');
  const base = script ? script.src : window.location.href;
  const target = (window.appConfig && window.appConfig.dashboard) || 'Main/main.html';
  const url = new URL(target, base);
  url.searchParams.set('lang', lang);
  window.location.href = url.toString();
}
