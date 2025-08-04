function changeLanguage(lang) {
  const url = new URL(window.location);
  url.searchParams.set('lang', lang);
  window.location.href = url.toString();
}

document.addEventListener('DOMContentLoaded', () => {
  const url = new URL(window.location);
  let lang = url.searchParams.get('lang');
  if (lang !== 'en' && lang !== 'fr') {
    lang = 'fr';
  }

  const translations = {
    fr: {
      title: "Suite d'outils acoustiques",
      dbTitle: "Somme & Soustraction des niveaux",
      dbDesc: "Additionnez ou soustrayez des niveaux sonores en dB/dBA.",
      distTitle: "Calcul du décroissement par la distance",
      distDesc: "Évaluez la perte de niveau sonore avec l'éloignement.",
      tiersTitle: "Conversion Lp tiers d'octave vers Lp octave",
      tiersDesc: "Convertissez un spectre Lp en bandes d’octave."
    },
    en: {
      title: "Acoustic tools suite",
      dbTitle: "Addition and subtraction of dB levels",
      dbDesc: "Add or subtract sound levels in dB/dBA.",
      distTitle: "Distance decay calculation",
      distDesc: "Estimate level loss over distance.",
      tiersTitle: "Conversion from third-octave Lp to octave Lp",
      tiersDesc: "Convert an Lp spectrum to octave bands."
    }
  };

  const metaDescriptions = {
    fr: "Outils Acoustiques est votre suite complète d'outils pour les calculs acoustiques.",
    en: "Acoustic Tools provides a suite of utilities for common acoustics calculations."
  };

  const toolUrls = {
    fr: {
      "db-calculator": "Main_app_fr/Calculs_db_web/calc_db.html",
      "distance-decay": "Main_app_fr/Calcul_decroissement_distance/calc_dist.html",
      "lptiers-lpoct": "Main_app_fr/Calcul_tiers_en_bande/tiers_en_bande.html"
    },
    en: {
      "db-calculator": "Main_app_en/Calculs_db_web/calc_db.html",
      "distance-decay": "Main_app_en/Calcul_decroissement_distance/calc_dist.html",
      "lptiers-lpoct": "Main_app_en/Calcul_tiers_en_bande/tiers_en_bande.html"
    }
  };

  document.documentElement.lang = lang;
  const text = translations[lang];
  document.title = text.title;
  document.getElementById('site-title').textContent = text.title;
  document.querySelector('meta[name="description"]').setAttribute('content', metaDescriptions[lang]);
  document.getElementById('db-calculator-title').textContent = text.dbTitle;
  document.getElementById('db-calculator-desc').textContent = text.dbDesc;
  document.getElementById('distance-decay-title').textContent = text.distTitle;
  document.getElementById('distance-decay-desc').textContent = text.distDesc;
  document.getElementById('lptiers-lpoct-title').textContent = text.tiersTitle;
  document.getElementById('lptiers-lpoct-desc').textContent = text.tiersDesc;

  Object.entries(toolUrls[lang]).forEach(([id, href]) => {
    const card = document.getElementById(id);
    if (card) {
      card.addEventListener('click', () => {
        window.open(href, '_blank');
      });
    }
  });

  document.querySelectorAll('.lang-selector .flag').forEach(flag => {
    flag.addEventListener('click', () => {
      changeLanguage(flag.getAttribute('data-lang'));
    });
  });
});
