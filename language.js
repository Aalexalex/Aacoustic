function changeLanguage(lang) {
  const segments = window.location.pathname.split('/');
  let base = '';
  if (segments[1] && segments[1] !== 'Main' && !segments[1].includes('.')) {
    base = '/' + segments[1];
  }
  const url = new URL(base + '/Main/main.html', window.location.origin);
  url.searchParams.set('lang', lang);
  window.location.href = url.toString();
}
