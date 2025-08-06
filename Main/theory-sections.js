(function () {
  const tpl = document.createElement('template');
  tpl.innerHTML = `
    <section class="calc-tool__theory">
      <h2></h2>
    </section>
  `;

  const sections = {
    'calc-db-fr': {
      id: 'db-fr',
      title: 'Principe du calcul',
      paras: [
        'Les décibels étant une échelle logarithmique, on ne peut pas additionner les niveaux comme des nombres classiques.',
        'On convertit chaque niveau en puissance relative, on les additionne, puis on reconvertit le total en dB :',
        'Remarque : si un niveau est très inférieur aux autres, son influence est quasi nulle.'
      ],
      code: 'L_total = 10 × log₁₀(Σ 10^(Li / 10))'
    },
    'calc-db-en': {
      id: 'db-en',
      title: 'Calculation principle',
      paras: [
        'Because decibels are a logarithmic scale, levels cannot be added like ordinary numbers.',
        'Each level is converted to relative power, summed, then converted back to dB:',
        'Note: if a level is much lower than the others, its influence is negligible.'
      ],
      code: 'L_total = 10 × log₁₀(Σ 10^(Li / 10))'
    },
    'calc-dist-fr': {
      id: 'dist-fr',
      title: 'Principe du calcul',
      paras: [
        'Le niveau sonore diminue avec la distance à cause de la dispersion de l’énergie acoustique.',
        'Dans un champ libre, la loi de décroissance est :',
        'Cette loi suppose une propagation sphérique sans obstacle ni réverbération. En pratique, l’atténuation peut être influencée par d’autres facteurs.'
      ],
      code: 'L2 = L1 - 20 × log₁₀(d2 / d1)'
    },
    'calc-dist-en': {
      id: 'dist-en',
      title: 'Calculation principle',
      paras: [
        'Sound level decreases with distance due to the dispersion of acoustic energy.',
        'In free field, the decay law is:',
        'This law assumes spherical propagation without obstacles or reverberation. In practice, attenuation can be influenced by other factors.'
      ],
      code: 'L2 = L1 - 20 × log₁₀(d2 / d1)'
    },
    'calc-tiers-fr': {
      id: 'tiers-fr',
      title: 'Principe du calcul',
      paras: [
        'Le spectre sonore est souvent analysé en bandes de tiers d’octave, normalisées selon la norme ISO 266.',
        ['Chaque bande est centrée sur une fréquence (f', { type: 'sub', text: 'c' }, ') et s’étend de :'],
        'Ce découpage permet d’analyser précisément le comportement acoustique des équipements selon leur réponse en fréquence.'
      ],
      code: ['[f', { type: 'sub', text: 'c' }, ' / √2 ; f', { type: 'sub', text: 'c' }, ' × √2]']
    },
    'calc-tiers-en': {
      id: 'tiers-en',
      title: 'Calculation principle',
      paras: [
        'The sound spectrum is often analyzed in third-octave bands, standardized by ISO 266.',
        ['Each band is centered on a frequency (f', { type: 'sub', text: 'c' }, ') and spans:'],
        'This segmentation allows precise analysis of equipment acoustic behavior according to their frequency response.'
      ],
      code: ['[f', { type: 'sub', text: 'c' }, ' / √2 ; f', { type: 'sub', text: 'c' }, ' × √2]']
    }
  };

  function inline(parts) {
    return parts
      .map(part => (typeof part === 'string' ? part : `<sub>${part.text}</sub>`))
      .join('');
  }

  function buildSection({ id, title, paras, code }) {
    const section = tpl.content.firstElementChild.cloneNode(true);
    const h2 = section.querySelector('h2');
    h2.id = `theory-${id}`;
    h2.textContent = title;

    section.insertAdjacentHTML(
      'beforeend',
      paras
        .map(p => `<p>${Array.isArray(p) ? inline(p) : p}</p>`)
        .join('')
    );

    if (code) {
      const inner = Array.isArray(code) ? inline(code) : code;
      section.insertAdjacentHTML(
        'beforeend',
        `<pre><code>${inner}</code></pre>`
      );
    }

    return section;
  }

  function render(key) {
    const cfg = sections[key];
    return cfg ? buildSection(cfg) : null;
  }

  function injectConfig() {
    const { theory, theoryTarget = '#result' } = window.headerConfig || {};
    if (!theory) return;
    const target = document.querySelector(theoryTarget);
    const section = render(theory);
    if (target && section) {
      const anchor = target.closest('.card') || target;
      anchor.insertAdjacentElement('afterend', section);
    }
  }

  function injectPlaceholders() {
    document.querySelectorAll('[data-theory]').forEach(el => {
      const section = render(el.dataset.theory);
      if (section) {
        el.replaceWith(section);
      }
    });
  }

  function init() {
    injectConfig();
    injectPlaceholders();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

