function changeLanguage(lang) {
  const url = new URL('Main/main.html', window.location);
  url.searchParams.set('lang', lang);
  window.location.href = url.toString();
}
