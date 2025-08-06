(function(){
  const currentScript = document.currentScript;
  const basePath = currentScript ? currentScript.src.replace(/[^/]+$/, '') : '';
  if (basePath) {
    const theorySrc = `${basePath}theory-sections.js`;
    if (!document.querySelector(`script[src="${theorySrc}"]`)) {
      document.head.appendChild(Object.assign(
        document.createElement('script'),
        { src: theorySrc, defer: true }
      ));
    }
  }
  const cfg = window.headerConfig || {};
  document.addEventListener('DOMContentLoaded', () => {
    const gtagUrl = 'https://www.googletagmanager.com/gtag/js?id=G-YET08GB3VB';
    if (!document.querySelector(`script[src="${gtagUrl}"]`)) {
      document.head.appendChild(Object.assign(
        document.createElement('script'),
        { async: true, src: gtagUrl }
      ));
      document.head.appendChild(Object.assign(
        document.createElement('script'),
        {
          textContent: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YET08GB3VB');
        `
        }
      ));
    }

    if (!document.getElementById('custom-header')) {
      const {
        title = '',
        home = '#',
        homeIcon,
        homeAlt,
        homeLabel,
        navLabel,
        lang = 'en',
        links = [],
        homeAriaLabel,
        onMathJaxReady
      } = cfg;

      const resolvedNav = navLabel || (lang === 'en' ? 'Main navigation' : 'Navigation principale');
      const homeAria = homeAriaLabel || (lang === 'en' ? 'Back to home' : 'Retour à l’accueil');
      const homeContent = homeIcon
        ? `<img src="${homeIcon}" alt="${homeAlt || homeAria}" class="home-icon">`
        : (homeLabel || (lang === 'en' ? 'Home' : 'Accueil'));
      const navItems = [
        { href: home, label: homeContent, ariaLabel: homeAria },
        ...links
      ]
        .map(l => `<a href="${l.href}" class="nav-button" aria-label="${l.ariaLabel || l.label}">${l.label}</a>`)
        .join('');

      document.body.insertAdjacentHTML('afterbegin', `
        <header id="custom-header" class="header">
          <div class="header-content">
            <h1>${title}</h1>
            <nav aria-label="${resolvedNav}">
              ${navItems}
            </nav>
          </div>
        </header>
      `);

      if (typeof onMathJaxReady === 'function' && window.MathJax?.startup?.promise) {
        window.MathJax.startup.promise.then(onMathJaxReady);
      }
    }
  });
})();
