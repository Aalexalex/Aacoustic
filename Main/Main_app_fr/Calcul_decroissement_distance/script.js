document.addEventListener("DOMContentLoaded", function() {
    const initialNoiseLevel = document.getElementById("initialNoiseLevel");
    const initialDistance = document.getElementById("initialDistance");
    const directivityFactor = document.getElementById("directivityFactor");
    const newDistance = document.getElementById("newDistance");
    const calculateBtn = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");
    const historyDiv = document.getElementById("history");

    calculateBtn.addEventListener("click", function() {
        const L1 = parseFloat(initialNoiseLevel.value);
        const r1 = parseFloat(initialDistance.value);
        const Q = parseFloat(directivityFactor.value);
        const r2 = parseFloat(newDistance.value);

        if ([L1, r1, Q, r2].some(isNaN)) {
            resultDiv.textContent = "Veuillez entrer des valeurs valides";
            return;
        }

        const L2 = L1 + 10 * Math.log10((4 * Math.PI * Math.pow(r1, 2)) / (Q * 4 * Math.PI * Math.pow(r2, 2)));

        resultDiv.textContent = `Résultat : ${L2.toFixed(2)} dB`;
        historyDiv.innerHTML += `${L1} dB, ${r1} m, Q = ${Q}, ${r2} m => <b>${L2.toFixed(2)} dB</b><br>--------<br>`;
    });
});
