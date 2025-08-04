function changeLanguage(lang) {
  const parts = window.location.pathname.split('/').filter(Boolean);
  const mainIndex = parts.indexOf('Main');
  const baseParts = mainIndex !== -1 ? parts.slice(0, mainIndex) : parts.slice(0, -1);
  const basePath = baseParts.length ? '/' + baseParts.join('/') : '';
  const url = new URL(`${basePath}/Main/main.html`, window.location.origin);
  url.searchParams.set('lang', lang);
  window.location.href = url.toString();
}
