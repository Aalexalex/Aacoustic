(function(){
  const buildFragment = (parts) => {
    const frag = document.createDocumentFragment();
    parts.forEach(part => {
      if (typeof part === 'string') {
        frag.append(part);
      } else if (part.type === 'sub') {
        const el = document.createElement('sub');
        el.textContent = part.text;
        frag.appendChild(el);
      }
    });
    return frag;
  };

  const buildSection = ({ id, title, paras, code }) => {
    const section = document.createElement('section');
    section.className = 'calc-tool__theory';
    section.setAttribute('aria-labelledby', `theory-${id}`);

    const h2 = document.createElement('h2');
    h2.id = `theory-${id}`;
    h2.textContent = title;
    section.appendChild(h2);

    paras.forEach(p => {
      const pEl = document.createElement('p');
      if (Array.isArray(p)) {
        pEl.append(buildFragment(p));
      } else {
        pEl.textContent = p;
      }
      section.appendChild(pEl);
    });

    if (code) {
      const pre = document.createElement('pre');
      const codeEl = document.createElement('code');
      if (Array.isArray(code)) {
        codeEl.append(buildFragment(code));
      } else {
        codeEl.textContent = code;
      }
      pre.appendChild(codeEl);
      section.appendChild(pre);
    }

    return section;
  };

  const sectionsConfig = [
    {
      key: 'calc-db-fr',
      id: 'db-fr',
      title: 'Principe du calcul',
      paras: [
        'Les décibels étant une échelle logarithmique, on ne peut pas additionner les niveaux comme des nombres classiques.',
        'On convertit chaque niveau en puissance relative, on les additionne, puis on reconvertit le total en dB :',
        'Remarque : si un niveau est très inférieur aux autres, son influence est quasi nulle.'
      ],
      code: 'L_total = 10 × log₁₀(Σ 10^(Li / 10))'
    },
    {
      key: 'calc-db-en',
      id: 'db-en',
      title: 'Calculation principle',
      paras: [
        'Because decibels are a logarithmic scale, levels cannot be added like ordinary numbers.',
        'Each level is converted to relative power, summed, then converted back to dB:',
        'Note: if a level is much lower than the others, its influence is negligible.'
      ],
      code: 'L_total = 10 × log₁₀(Σ 10^(Li / 10))'
    },
    {
      key: 'calc-dist-fr',
      id: 'dist-fr',
      title: 'Principe du calcul',
      paras: [
        'Le niveau sonore diminue avec la distance à cause de la dispersion de l’énergie acoustique.',
        'Dans un champ libre, la loi de décroissance est :',
        'Cette loi suppose une propagation sphérique sans obstacle ni réverbération. En pratique, l’atténuation peut être influencée par d’autres facteurs.'
      ],
      code: 'L2 = L1 - 20 × log₁₀(d2 / d1)'
    },
    {
      key: 'calc-dist-en',
      id: 'dist-en',
      title: 'Calculation principle',
      paras: [
        'Sound level decreases with distance due to the dispersion of acoustic energy.',
        'In free field, the decay law is:',
        'This law assumes spherical propagation without obstacles or reverberation. In practice, attenuation can be influenced by other factors.'
      ],
      code: 'L2 = L1 - 20 × log₁₀(d2 / d1)'
    },
    {
      key: 'calc-tiers-fr',
      id: 'tiers-fr',
      title: 'Principe du calcul',
      paras: [
        'Le spectre sonore est souvent analysé en bandes de tiers d’octave, normalisées selon la norme ISO 266.',
        ['Chaque bande est centrée sur une fréquence (f', { type: 'sub', text: 'c' }, ') et s’étend de :'],
        'Ce découpage permet d’analyser précisément le comportement acoustique des équipements selon leur réponse en fréquence.'
      ],
      code: ['[f', { type: 'sub', text: 'c' }, ' / √2 ; f', { type: 'sub', text: 'c' }, ' × √2]']
    },
    {
      key: 'calc-tiers-en',
      id: 'tiers-en',
      title: 'Calculation principle',
      paras: [
        'The sound spectrum is often analyzed in third-octave bands, standardized by ISO 266.',
        ['Each band is centered on a frequency (f', { type: 'sub', text: 'c' }, ') and spans:'],
        'This segmentation allows precise analysis of equipment acoustic behavior according to their frequency response.'
      ],
      code: ['[f', { type: 'sub', text: 'c' }, ' / √2 ; f', { type: 'sub', text: 'c' }, ' × √2]']
    }
  ];

  const sections = Object.fromEntries(sectionsConfig.map(cfg => [cfg.key, buildSection(cfg)]));

  const inject = () => {
    document.querySelectorAll('[data-theory]').forEach(el => {
      const key = el.getAttribute('data-theory');
      const section = sections[key];
      if (section) {
        el.replaceWith(section.cloneNode(true));
      }
    });
  };

  if (document.readyState !== 'loading') {
    inject();
  } else {
    document.addEventListener('DOMContentLoaded', inject);
  }
})();
