console.log("Script loaded");
document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById('conversionTable');
    const resultsTable = document.getElementById('resultsTable');
    const calculateBtn = document.getElementById('calculateBtn');

    const thirdBands = [25, 31.5, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 6300, 8000, 10000, 12500, 16000, 20000];
    const octaveBands = [31.5, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

    let tableContent = "";

    // Variable to track if the result row already exists
    let resultRow = null;

    // Generate the table header for octaves
    let octaveHeaderRow = '<tr class="octave-row"><td class="header-cell" style="border-right: 2px solid black; border-left: 2px solid black;">Octave Bands (Hz)</td>';
    let count = 0;
    let octaveIndex = 0;
    thirdBands.forEach(() => {
        let cellStyle = "";
        if (count % 3 === 2) { // Add right border every three cells
            cellStyle = ' style="border-right: 2px solid black;"';
        }
        if (count % 3 === 1 && octaveBands[octaveIndex]) {
            octaveHeaderRow += `<td${cellStyle}>${octaveBands[octaveIndex]}</td>`;
            octaveIndex++;
        } else {
            octaveHeaderRow += `<td${cellStyle}></td>`;
        }
        count++;
    });
    tableContent += octaveHeaderRow + '</tr>';

    // Generate the table header for third-octaves
    let headerRow = '<tr><td class="header-cell" style="border-right: 2px solid black; border-left: 2px solid black;">Third-Octave Bands (Hz)</td>';
    count = 0;
    thirdBands.forEach((band) => {
        let cellStyle = "";
        if (count % 3 === 2) { // Add right border every three cells
            cellStyle = ' style="border-right: 2px solid black;"';
        }
        headerRow += `<td${cellStyle}>${band}</td>`;
        count++;
    });
    tableContent += headerRow + '</tr>';

    // Generate the inputs for third-octave levels
    let inputRow = '<tr style="border-bottom: 2px solid black;"><td style="border-right: 2px solid black; border-left: 2px solid black;">Third-Octave Levels</td>';
    count = 0;
    thirdBands.forEach((third) => {
        let cellStyle = "";
        if (count % 3 === 2) { // Add right border every three cells
            cellStyle = ' style="border-right: 2px solid black;"';
        }
        if (count % 3 === 0) { // Add left border every three cells
            cellStyle += ' style="border-left: 2px solid black;"';
        }
        inputRow += `<td${cellStyle}><input type="number" step="any" min="0" aria-label="Band ${third} Hz" id="third_${third}"></td>`;
        count++;
    });
    tableContent += inputRow + '</tr>';

    // Update the HTML table
    table.innerHTML = tableContent;

    // Get all input elements in the table
    const inputElements = document.querySelectorAll('input');

    // Add an event listener for each input element
    inputElements.forEach(input => {
        input.addEventListener('keyup', function(event) {
            // Key code 13 is the "Enter" key
            if (event.keyCode === 13) {
                // Trigger the click on the calculate button
                calculateBtn.click();
            }
        });
    });

    // Continue with the click event for the calculate button
    calculateBtn.addEventListener('click', function() {
        console.log("Button clicked");

        // If the "Octave Level" result row doesn't exist yet, create a new row
        if (!resultRow) {
            let newRow = '<tr id="octaveResult"><td style="border: 3px solid black;" colspan="1">Octave Level</td>';
            table.insertAdjacentHTML('beforeend', newRow); // Insert the new row into the table
            resultRow = document.getElementById("octaveResult"); // Keep a reference to this new row
        }

        let calculatedResults = []; // Array to store calculated levels

        console.log("About to start loop through octaveBands");

        octaveBands.forEach((octaveBand, index) => {
            let octaveIndex = thirdBands.findIndex(band => band === octaveBand);
            let lowerThird = thirdBands[octaveIndex - 1];
            let upperThird = thirdBands[octaveIndex + 1];

            let thirds = [
                document.getElementById(`third_${lowerThird}`),
                document.getElementById(`third_${octaveBand}`),
                document.getElementById(`third_${upperThird}`)
            ];

            console.log("Finished loop through octaveBands");

            // Check if all elements exist and have values
            if (thirds.every(element => element && element.value)) {
                let sum = 0;
                thirds.forEach(element => {
                    sum += Math.pow(10, parseFloat(element.value) / 10);
                });
                let octaveLevel = 10 * Math.log10(sum);
                console.log("Octave Level:", octaveLevel);

                calculatedResults.push(octaveLevel);
            } else {
                calculatedResults.push(null);
            }
        });

        // Update the cells in the result row
        let newCells = '<td style="border: 3px solid black;" colspan="1">Octave Level</td>';
        calculatedResults.forEach(result => {
            if (result !== null) {
                newCells += `<td style="border: 3px solid black;" class="resultsTable-td" colspan="3">${result.toFixed(2)}</td>`;
            } else {
                newCells += '<td style="border: 3px solid black;" colspan="3">-</td>';
            }
        });

        resultRow.innerHTML = newCells; // Update the existing row
    });
});
