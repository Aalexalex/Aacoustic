(function() {
  const cfg = window.headerConfig || {};

  function injectScript({ src, async = true, attrs = {}, text, onload }) {
    let s = src ? document.querySelector(`script[src="${src}"]`) : null;
    if (!s) {
      s = document.createElement('script');
      if (async) s.async = true;
      if (src) s.src = src;
      Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
      if (text) s.textContent = text;
      if (onload) s.addEventListener('load', onload, { once: true });
      document.head.appendChild(s);
    } else if (onload) {
      if (s.readyState === 'complete') onload();
      else s.addEventListener('load', onload, { once: true });
    }
    return s;
  }

  function insertAnalytics() {
    const gtagSrc = 'https://www.googletagmanager.com/gtag/js?id=G-YET08GB3VB';
    injectScript({ src: gtagSrc, attrs: { 'data-gtag': 'true' } });
    if (!document.querySelector('script[data-gtag-inline]')) {
      injectScript({
        attrs: { 'data-gtag-inline': 'true' },
        text: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-YET08GB3VB');
      `
      });
    }
  }

  function onMathJaxReady(cb) {
    const mj = document.getElementById('MathJax-script');
    if (window.MathJax?.startup?.promise) {
      window.MathJax.startup.promise.then(cb);
    } else if (mj) {
      mj.addEventListener('load', () => {
        window.MathJax?.startup?.promise?.then(cb);
      }, { once: true });
    }
  }

  function insertHeader() {
    if (document.getElementById('custom-header')) return;

    const {
      title = '',
      home = '#',
      homeIcon,
      homeAlt,
      homeLabel,
      navLabel,
      lang,
      links = [],
      homeAriaLabel
    } = cfg;

    const resolvedNav = navLabel || (lang === 'en' ? 'Main navigation' : 'Navigation principale');
    const homeAria = homeAriaLabel || (lang === 'en' ? 'Back to home' : 'Retour à l’accueil');
    const homeContent = homeIcon
      ? `<img src="${homeIcon}" alt="${homeAlt || homeAria}" class="home-icon">`
      : (homeLabel || (lang === 'en' ? 'Home' : 'Accueil'));

    const navLinks = [
      { href: home, label: homeContent, aria: homeAria },
      ...links.map(l => ({ href: l.href, label: l.label, aria: l.ariaLabel || l.label }))
    ]
      .map(l => `<a href="${l.href}" class="nav-button" aria-label="${l.aria}">${l.label}</a>`)
      .join('');

    document.body.insertAdjacentHTML('afterbegin', `
      <header id="custom-header" class="header">
        <div class="header-content">
          <h1>${title}</h1>
          <nav aria-label="${resolvedNav}">
            ${navLinks}
          </nav>
        </div>
      </header>
    `);
  }

  function safeInsertHeader() {
    if (document.body) {
      insertHeader();
    } else {
      const observer = new MutationObserver((_, obs) => {
        if (document.body) {
          insertHeader();
          obs.disconnect();
        }
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  insertAnalytics();
  if (cfg.onMathJaxReady) onMathJaxReady(cfg.onMathJaxReady);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeInsertHeader);
  } else {
    safeInsertHeader();
  }
})();
