function changeLanguage(lang) {
  // Try to find the script tag for language.js in a robust way
  let script = Array.from(document.scripts).find(s => s.src && s.src.includes('language.js'));
  if (!script && document.currentScript && document.currentScript.src && document.currentScript.src.includes('language.js')) {
    script = document.currentScript;
  }
  const base = script ? script.src : window.location.href;
  const target = (window.appConfig && window.appConfig.dashboard) || 'Main/main.html';
  const url = new URL(target, base);
  url.searchParams.set('lang', lang);
  window.location.href = url.toString();
}
