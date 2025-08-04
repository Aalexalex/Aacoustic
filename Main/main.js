(() => {
document.addEventListener('DOMContentLoaded', () => {
  if (!window.appConfig) {
    console.error('appConfig not loaded');
    return;
  }
  const url = new URL(window.location);
  let lang = url.searchParams.get('lang');
  const translations = window.appConfig.translations;
  if (!translations[lang]) {
    const userLang = navigator.language || navigator.userLanguage;
    lang = userLang && userLang.startsWith('fr') ? 'fr' : 'en';
  }
  if (!translations[lang]) {
    lang = 'en';
  }
  document.documentElement.lang = lang;
  const tr = translations[lang];

  // set text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (tr[key]) {
      el.textContent = tr[key];
    }
  });

  // set alt attributes
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const key = el.dataset.i18nAlt;
    if (tr[key]) {
      el.alt = tr[key];
    }
  });

  // set meta description
  const meta = document.querySelector('meta[name="description"][data-i18n-meta]');
  if (meta) {
    const key = meta.dataset.i18nMeta;
    if (tr[key]) {
      meta.content = tr[key];
    }
  }

  // configure tool cards
  const base = window.appConfig.baseDir[lang];
  document.querySelectorAll('.tool-card').forEach(card => {
    const id = card.id;
    const tool = window.appConfig.tools[id];
    if (!tool) {
      console.warn(`No tool config for card id "${id}"`);
      card.classList.add('disabled');
      card.removeAttribute('href');
      return;
    }
    if (tool.page) {
      card.href = `${base}/${tool.page}`;
    }
    const img = card.querySelector('img');
    if (img && tool.img) {
      img.src = `${base}/${tool.img}`;
    }
  });

  // language selector
  document.querySelectorAll('.lang-selector .flag').forEach(flag => {
    flag.addEventListener('click', () => {
      changeLanguage(flag.getAttribute('data-lang'), window.appConfig.basePath);
    });
  });
});
})();
