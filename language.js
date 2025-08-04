function changeLanguage(lang, basePath) {
  const cfg = window.appConfig || {};
  const target = cfg.dashboard || 'Main/main.html';
  const base = basePath !== undefined ? basePath : cfg.basePath || '';
  const url = new URL(target, window.location.origin + base + '/');
  url.searchParams.set('lang', lang);
  window.location.href = url.toString();
}
