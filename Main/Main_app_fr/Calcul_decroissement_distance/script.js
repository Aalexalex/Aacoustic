function parseLocaleFloat(value) {
    return parseFloat(String(value).replace(',', '.'));
}

document.addEventListener("DOMContentLoaded", function() {
    const initialNoiseLevel = document.getElementById("initialNoiseLevel");
    const initialDistance = document.getElementById("initialDistance");
    const directivityFactor = document.getElementById("directivityFactor");
    const newDistance = document.getElementById("newDistance");
    const calculateBtn = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");
    const historyDiv = document.getElementById("history");

    calculateBtn.addEventListener("click", function() {
        const L1 = parseLocaleFloat(initialNoiseLevel.value);
        const r1 = parseLocaleFloat(initialDistance.value);
        const Q = parseLocaleFloat(directivityFactor.value);
        const r2 = parseLocaleFloat(newDistance.value);

        const L2 = L1 + 10 * Math.log10((4 * Math.PI * Math.pow(r1, 2)) / (Q * 4 * Math.PI * Math.pow(r2, 2)));
        
        resultDiv.textContent = `Résultat : ${L2.toFixed(2)} dB`;
        historyDiv.innerHTML += `${L1} dB, ${r1} m, Q = ${Q}, ${r2} m => <b>${L2.toFixed(2)} dB</b><br>--------<br>`;
    });
});
