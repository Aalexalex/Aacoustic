document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById('conversionTable');
    const resultsTable = document.getElementById('resultsTable');
    const calculateBtn = document.getElementById('calculateBtn');
    const errorDiv = document.getElementById('error-message');
    const resultsCard = document.getElementById('results-card');

    const thirdBands = [25, 31.5, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 6300, 8000, 10000, 12500, 16000, 20000];
    const octaveBands = [31.5, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

    let tableContent = "";

    // Header for octave bands
    let octaveHeaderRow = '<tr class="octave-row"><td class="header-cell" style="border-right: 2px solid black; border-left: 2px solid black;">Bandes d\\'Octave (Hz)</td>';
    let count = 0;
    let octaveIndex = 0;
    thirdBands.forEach(() => {
        let styles = [];
        if (count % 3 === 2) styles.push('border-right: 2px solid black;');
        if (styles.length) {
            octaveHeaderRow += `<td style="${styles.join(' ')}">`;
        } else {
            octaveHeaderRow += '<td>';
        }
        if (count % 3 === 1 && octaveBands[octaveIndex]) {
            octaveHeaderRow += `${octaveBands[octaveIndex]}</td>`;
            octaveIndex++;
        } else {
            octaveHeaderRow += '</td>';
        }
        count++;
    });
    tableContent += octaveHeaderRow + '</tr>';

    // Header for third bands
    let headerRow = '<tr><td class="header-cell" style="border-right: 2px solid black; border-left: 2px solid black;">Bandes en Tiers (Hz)</td>';
    count = 0;
    thirdBands.forEach(band => {
        let styles = [];
        if (count % 3 === 2) styles.push('border-right: 2px solid black;');
        let cellStyle = styles.length ? ` style="${styles.join(' ')}"` : '';
        headerRow += `<td${cellStyle}>${band}</td>`;
        count++;
    });
    tableContent += headerRow + '</tr>';

    // Input row
    let inputRow = '<tr style="border-bottom: 2px solid black;"><td style="border-right: 2px solid black; border-left: 2px solid black;">Niveaux en Tiers</td>';
    count = 0;
    thirdBands.forEach(third => {
        let styles = [];
        if (count % 3 === 2) styles.push('border-right: 2px solid black;');
        if (count % 3 === 0) styles.push('border-left: 2px solid black;');
        let cellStyle = styles.length ? ` style="${styles.join(' ')}"` : '';
        inputRow += `<td${cellStyle}><input type="text" id="third_${third}"></td>`;
        count++;
    });
    tableContent += inputRow + '</tr>';

    table.innerHTML = tableContent;

    const inputElements = table.querySelectorAll('input');
    inputElements.forEach(input => {
        input.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                calculateBtn.click();
            }
        });
    });

    calculateBtn.addEventListener('click', function() {
        for (let input of inputElements) {
            const val = input.value.trim();
            if (val !== '' && isNaN(parseFloat(val))) {
                errorDiv.innerText = `La valeur "${val}" n'est pas un nombre valide.`;
                errorDiv.style.display = 'block';
                resultsCard.style.display = 'none';
                return;
            }
        }
        errorDiv.style.display = 'none';

        let calculatedResults = [];
        octaveBands.forEach(octaveBand => {
            let octaveIndex = thirdBands.findIndex(band => band === octaveBand);
            let lowerThird = thirdBands[octaveIndex - 1];
            let upperThird = thirdBands[octaveIndex + 1];
            let thirds = [
                document.getElementById(`third_${lowerThird}`).value,
                document.getElementById(`third_${octaveBand}`).value,
                document.getElementById(`third_${upperThird}`).value
            ];
            if (thirds.every(v => v !== '')) {
                let sum = 0;
                thirds.forEach(v => { sum += Math.pow(10, parseFloat(v) / 10); });
                calculatedResults.push(10 * Math.log10(sum));
            } else {
                calculatedResults.push(null);
            }
        });

        let header = '<tr><th>Bandes d\\'Octave (Hz)</th>' + octaveBands.map(b => `<th>${b}</th>`).join('') + '</tr>';
        let row = '<tr><td>Niveau en Octave</td>' + calculatedResults.map(r => r !== null ? `<td>${r.toFixed(2)}</td>` : '<td>-</td>').join('') + '</tr>';
        resultsTable.innerHTML = header + row;
        resultsCard.style.display = 'block';
    });
});
