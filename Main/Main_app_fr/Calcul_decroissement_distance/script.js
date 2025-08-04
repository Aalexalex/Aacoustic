document.addEventListener("DOMContentLoaded", function() {
    const initialNoiseLevel = document.getElementById("initialNoiseLevel");
    const initialDistance = document.getElementById("initialDistance");
    const directivityFactor = document.getElementById("directivityFactor");
    const newDistance = document.getElementById("newDistance");
    const calculateBtn = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result-container");
    const historyDiv = document.getElementById("history");
    const errorDiv = document.getElementById("error-message");

    function validateNumbers(values) {
        for (const [value, label] of values) {
            if (value.trim() === "") {
                return `Veuillez entrer une valeur pour ${label}.`;
            }
            if (isNaN(parseFloat(value))) {
                return `La valeur "${value}" pour ${label} n'est pas un nombre valide.`;
            }
        }
        return null;
    }

    calculateBtn.addEventListener("click", function() {
        const L1 = initialNoiseLevel.value;
        const r1 = initialDistance.value;
        const Q = directivityFactor.value;
        const r2 = newDistance.value;

        const error = validateNumbers([[L1, 'L1'], [r1, 'r1'], [Q, 'Q'], [r2, 'r2']]);
        if (error) {
            errorDiv.innerText = error;
            errorDiv.style.display = 'block';
            return;
        } else {
            errorDiv.style.display = 'none';
        }

        const L2 = parseFloat(L1) + 10 * Math.log10((4 * Math.PI * Math.pow(parseFloat(r1), 2)) / (parseFloat(Q) * 4 * Math.PI * Math.pow(parseFloat(r2), 2)));

        resultDiv.innerText = `Résultat : ${L2.toFixed(2)} dB`;
        resultDiv.style.display = 'block';
        historyDiv.innerHTML += `${L1} dB, ${r1} m, Q = ${Q}, ${r2} m => <b>${L2.toFixed(2)} dB</b><br>--------<br>`;
    });
});
