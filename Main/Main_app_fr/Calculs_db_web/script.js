document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById("inputValue");
    const calculateBtn = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result-container");
    const historyDiv = document.getElementById("history");
    const errorDiv = document.getElementById("error-message");

    function validateInput(input) {
        if (!input.trim()) return "Veuillez entrer une valeur.";
        const tokens = input.split(/[\s,+-]+/);
        for (let t of tokens) {
            if (t && isNaN(parseFloat(t))) {
                return `La valeur "${t}" n'est pas un nombre valide.`;
            }
        }
        return null;
    }

    inputField.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            calculateBtn.click();
        }
    });

    calculateBtn.addEventListener("click", function() {
        const text = inputField.value;
        const error = validateInput(text);

        if (error) {
            errorDiv.innerText = error;
            errorDiv.style.display = 'block';
            return;
        } else {
            errorDiv.style.display = 'none';
        }

        let elements = text.split("+");
        let total_positive = 0;
        let total_negative = 0;

        elements.forEach(function(elem) {
            let sub_elements = elem.split("-");
            let first = true;
            sub_elements.forEach(function(sub_elem) {
                if (first) {
                    total_positive += Math.pow(10, parseFloat(sub_elem) / 10);
                    first = false;
                } else {
                    total_negative += Math.pow(10, parseFloat(sub_elem) / 10);
                }
            });
        });

        let total = total_positive - total_negative;

        if (total <= 0) {
            resultDiv.innerText = "Résultat : Impossible (total <= 0)";
            resultDiv.style.display = 'block';
            historyDiv.innerHTML += `${text}<br><b>Impossible</b><br>--------<br>`;
            return;
        }

        let result = 10 * Math.log10(total);
        resultDiv.innerText = `Résultat : ${result.toFixed(2)} dB`;
        resultDiv.style.display = 'block';
        historyDiv.innerHTML += `${text}<br><b>${result.toFixed(2)}</b><br>--------<br>`;
    });
});
