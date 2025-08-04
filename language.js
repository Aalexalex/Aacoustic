function changeLanguage(lang) {
  const url = new URL('/Main/main.html', window.location.origin);
  url.searchParams.set('lang', lang);
  window.location.href = url.toString();
}
