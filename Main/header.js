(function() {
  const config = window.headerConfig || {};

  function insertAnalytics() {
    if (!document.querySelector('script[data-adsense]')) {
      const ads = document.createElement('script');
      ads.async = true;
      ads.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9605384505780666';
      ads.crossOrigin = 'anonymous';
      ads.dataset.adsense = 'true';
      document.head.appendChild(ads);
    }
    if (!document.querySelector('script[data-gtag]')) {
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-YET08GB3VB';
      gtagScript.dataset.gtag = 'true';
      document.head.appendChild(gtagScript);

      const inline = document.createElement('script');
      inline.dataset.gtagInline = 'true';
      inline.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-YET08GB3VB');
      `;
      document.head.appendChild(inline);
    }
  }

  function buildHeader() {
    const header = document.createElement('header');
    header.className = 'header';

    const headerContent = document.createElement('div');
    headerContent.className = 'header-content';

    const h1 = document.createElement('h1');
    h1.textContent = config.title || '';
    headerContent.appendChild(h1);

    const nav = document.createElement('nav');
    const navLabel = config.navLabel || (config.lang === 'en' ? 'Main navigation' : 'Navigation principale');
    nav.setAttribute('aria-label', navLabel);

    const a = document.createElement('a');
    a.href = config.home || '#';
    a.className = 'nav-button';
    const homeAria = config.homeAriaLabel || (config.lang === 'en' ? 'Back to home' : 'Retour à l’accueil');
    a.setAttribute('aria-label', homeAria);

    if (config.homeIcon) {
      const img = document.createElement('img');
      img.src = config.homeIcon;
      img.alt = config.homeAlt || homeAria;
      img.className = 'home-icon';
      a.appendChild(img);
    } else {
      a.textContent = config.homeLabel || (config.lang === 'en' ? 'Home' : 'Accueil');
    }

    nav.appendChild(a);
    headerContent.appendChild(nav);
    header.appendChild(headerContent);
    document.body.prepend(header);
  }

  insertAnalytics();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildHeader);
  } else {
    buildHeader();
  }
})();
