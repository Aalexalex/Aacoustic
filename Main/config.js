window.appConfig = {
  dashboard: 'Main/main.html',
  baseDir: {
    en: 'Main_app_en',
    fr: 'Main_app_fr'
  },
  translations: {
    en: {
      title: "Suite d'outils acoustiques",
      description: 'Acoustic Tools provides a suite of utilities for common acoustics calculations.',
      dbTitle: 'Addition and subtraction of dB levels',
      dbDesc: 'Add or subtract sound levels in dB/dBA.',
      distTitle: 'Distance decay calculation',
      distDesc: 'Estimate level loss over distance.',
      tiersTitle: 'Conversion from third-octave Lp to octave Lp',
      tiersDesc: 'Convert an Lp spectrum to octave bands.',
      dbAlt: 'dB calculator logo',
      distAlt: 'Distance decay calculator logo',
      tiersAlt: 'Third-octave to octave converter logo'
    },
    fr: {
      title: "Suite d'outils acoustiques",
      description: "Outils Acoustiques est votre suite complète d'outils pour les calculs acoustiques.",
      dbTitle: 'Somme & Soustraction des niveaux',
      dbDesc: 'Additionnez ou soustrayez des niveaux sonores en dB/dBA.',
      distTitle: 'Calcul du décroissement par la distance',
      distDesc: "Évaluez la perte de niveau sonore avec l'éloignement.",
      tiersTitle: "Conversion Lp tiers d'octave vers Lp octave",
      tiersDesc: "Convertissez un spectre Lp en bandes d’octave.",
      dbAlt: 'Logo du calculateur de dB',
      distAlt: 'Logo du calculateur de décroissement de distance',
      tiersAlt: "Logo du calculateur de tiers d'octave en bande"
    }
  },
  tools: {
    'db-calculator': {
      page: 'Calculs_db_web/calc_db.html',
      img: 'Calculs_db_web/logo_calc_db.png'
    },
    'distance-decay': {
      page: 'Calcul_decroissement_distance/calc_dist.html',
      img: 'Calcul_decroissement_distance/logo_calc_dist.png'
    },
    'lptiers-lpoct': {
      page: 'Calcul_tiers_en_bande/tiers_en_bande.html',
      img: 'Calcul_tiers_en_bande/logo_calc_tiers_en_bande.png'
    }
  }
};
