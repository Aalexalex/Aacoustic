(function(){
  const sections = {
    'calc-db-fr': `
<section class="calc-tool__theory" aria-labelledby="theory-db-fr">
  <h2 id="theory-db-fr">Principe du calcul</h2>
  <p>Les décibels étant une échelle logarithmique, on ne peut pas additionner les niveaux comme des nombres classiques.</p>
  <p>On convertit chaque niveau en puissance relative, on les additionne, puis on reconvertit le total en dB :</p>
  <pre><code>L_total = 10 × log₁₀(Σ 10^(Li / 10))</code></pre>
  <p>Remarque : si un niveau est très inférieur aux autres, son influence est quasi nulle.</p>
</section>
`,
    'calc-db-en': `
<section class="calc-tool__theory" aria-labelledby="theory-db-en">
  <h2 id="theory-db-en">Calculation principle</h2>
  <p>Because decibels are a logarithmic scale, levels cannot be added like ordinary numbers.</p>
  <p>Each level is converted to relative power, summed, then converted back to dB:</p>
  <pre><code>L_total = 10 × log₁₀(Σ 10^(Li / 10))</code></pre>
  <p>Note: if a level is much lower than the others, its influence is negligible.</p>
</section>
`,
    'calc-dist-fr': `
<section class="calc-tool__theory" aria-labelledby="theory-dist-fr">
  <h2 id="theory-dist-fr">Principe du calcul</h2>
  <p>Le niveau sonore diminue avec la distance à cause de la dispersion de l’énergie acoustique.</p>
  <p>Dans un champ libre, la loi de décroissance est :</p>
  <pre><code>L2 = L1 - 20 × log₁₀(d2 / d1)</code></pre>
  <p>Cette loi suppose une propagation sphérique sans obstacle ni réverbération. En pratique, l’atténuation peut être influencée par d’autres facteurs.</p>
</section>
`,
    'calc-dist-en': `
<section class="calc-tool__theory" aria-labelledby="theory-dist-en">
  <h2 id="theory-dist-en">Calculation principle</h2>
  <p>Sound level decreases with distance due to the dispersion of acoustic energy.</p>
  <p>In free field, the decay law is:</p>
  <pre><code>L2 = L1 - 20 × log₁₀(d2 / d1)</code></pre>
  <p>This law assumes spherical propagation without obstacles or reverberation. In practice, attenuation can be influenced by other factors.</p>
</section>
`,
    'calc-tiers-fr': `
<section class="calc-tool__theory" aria-labelledby="theory-tiers-fr">
  <h2 id="theory-tiers-fr">Principe du calcul</h2>
  <p>Le spectre sonore est souvent analysé en bandes de tiers d’octave, normalisées selon la norme ISO 266.</p>
  <p>Chaque bande est centrée sur une fréquence (f<sub>c</sub>) et s’étend de :</p>
  <pre><code>[f<sub>c</sub> / √2 ; f<sub>c</sub> × √2]</code></pre>
  <p>Ce découpage permet d’analyser précisément le comportement acoustique des équipements selon leur réponse en fréquence.</p>
</section>
`,
    'calc-tiers-en': `
<section class="calc-tool__theory" aria-labelledby="theory-tiers-en">
  <h2 id="theory-tiers-en">Calculation principle</h2>
  <p>The sound spectrum is often analyzed in third-octave bands, standardized by ISO 266.</p>
  <p>Each band is centered on a frequency (f<sub>c</sub>) and spans:</p>
  <pre><code>[f<sub>c</sub> / √2 ; f<sub>c</sub> × √2]</code></pre>
  <p>This segmentation allows precise analysis of equipment acoustic behavior according to their frequency response.</p>
</section>
`
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-theory]').forEach(el => {
      const key = el.getAttribute('data-theory');
      if (sections[key]) {
        el.outerHTML = sections[key];
      }
    });
  });
})();
