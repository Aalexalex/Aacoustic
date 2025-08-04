(function(){
  function insertSharedHeader(){
    const body = document.body;
    const title = body.getAttribute('data-title');
    const home = body.getAttribute('data-home') || '#';
    const homeIcon = body.getAttribute('data-home-icon') || '../../logo_home.png';
    const homeLabel = body.getAttribute('data-home-label') || 'Home';

    if(!document.querySelector('script[src*="googlesyndication"]')){
      const adsScript = document.createElement('script');
      adsScript.async = true;
      adsScript.crossOrigin = 'anonymous';
      adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9605384505780666';
      document.head.appendChild(adsScript);
    }

    if(!document.querySelector('script[src*="googletagmanager"]')){
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-YET08GB3VB';
      document.head.appendChild(gtagScript);

      const gtagInline = document.createElement('script');
      gtagInline.innerHTML = `\n        window.dataLayer = window.dataLayer || [];\n        function gtag(){dataLayer.push(arguments);}\n        gtag('js', new Date());\n        gtag('config', 'G-YET08GB3VB');\n      `;
      document.head.appendChild(gtagInline);
    }

    if (title) {
      const header = document.createElement('header');
      header.className = 'header';
      header.innerHTML = `\n        <div class=\"header-content\">\n          <h1>${title}</h1>\n          <nav aria-label=\"Main navigation\">\n            <a href=\"${home}\" class=\"nav-button\" aria-label=\"${homeLabel}\">\n              <img src=\"${homeIcon}\" alt=\"${homeLabel}\" class=\"home-icon\">\n            </a>\n          </nav>\n        </div>`;
      body.prepend(header);
    }
  }
  document.addEventListener('DOMContentLoaded', insertSharedHeader);
})();
