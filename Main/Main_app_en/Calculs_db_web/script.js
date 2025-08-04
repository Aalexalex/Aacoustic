function parseLocaleFloat(value) {
    // Convert to string and trim whitespace
    let str = String(value).trim();

    // Remove non-breaking spaces and normal spaces (common thousands separators)
    str = str.replace(/\s|\u00A0/g, '');

    // If both ',' and '.' are present, assume the last one is the decimal separator
    if (str.indexOf(',') > -1 && str.indexOf('.') > -1) {
        if (str.lastIndexOf(',') > str.lastIndexOf('.')) {
            // ',' is decimal, '.' is thousands
            str = str.replace(/\./g, '');
            str = str.replace(/,/g, '.');
        } else {
            // '.' is decimal, ',' is thousands
            str = str.replace(/,/g, '');
        }
    } else if (str.indexOf(',') > -1) {
        // Only ',' present, assume it's decimal
        str = str.replace(/,/g, '.');
    } else {
        // Only '.' present or neither, assume '.' is decimal
        // Remove any stray thousands separators (rare, but for safety)
        str = str.replace(/(?<=\d)\.(?=\d{3}\b)/g, '');
    }

    // Validate: should be a valid float now
    const num = parseFloat(str);
    return isNaN(num) ? NaN : num;
}

document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById("inputField");
    const calculateBtn = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");
    const historyDiv = document.getElementById("history");

    // Adding an event listener for the "Enter" key
    inputField.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default behavior of the "Enter" key
            calculateBtn.click(); // Trigger a click on the "Calculate" button
        }
    });

    calculateBtn.addEventListener("click", function() {
        const text = inputField.value;
        if (!text) return;

        let elements = text.split("+");
        let total_positive = 0;
        let total_negative = 0;

        elements.forEach(function(elem) {
            let sub_elements = elem.split("-");
            let first = true;
            sub_elements.forEach(function(sub_elem) {
                if (first) {
                    total_positive += Math.pow(10, parseLocaleFloat(sub_elem) / 10);
                    first = false;
                } else {
                    total_negative += Math.pow(10, parseLocaleFloat(sub_elem) / 10);
                }
            });
        });

        let total = total_positive - total_negative;
        
        if (total <= 0) {
            resultDiv.innerHTML = "Result: Impossible (total <= 0)";
            historyDiv.innerHTML += `${text}<br><b>Impossible</b><br>--------<br>`;
            return;
        }

        let result = 10 * Math.log10(total);
        resultDiv.innerHTML = `Result: ${result.toFixed(2)} dB`;
        historyDiv.innerHTML += `${text}<br><b>${result.toFixed(2)}</b><br>--------<br>`;
    });
});
