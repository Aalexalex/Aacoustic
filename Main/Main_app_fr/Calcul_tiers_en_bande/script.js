console.log("Script loaded");
document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById('conversionTable');
    const resultsTable = document.getElementById('resultsTable');
    const calculateBtn = document.getElementById('calculateBtn');


    const thirdBands = [25, 31.5, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 6300, 8000, 10000, 12500, 16000, 20000];
    const octaveBands = [31.5, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

    let tableContent = "";

// Variable pour suivre si la ligne de résultat existe déjà
let resultRow = null;
// Générer l'en-tête du tableau pour les octaves
let octaveHeaderRow = '<tr class="octave-row"><td class="header-cell" style="border-right: 2px solid black; border-left: 2px solid black;">Bandes d\'Octave (Hz)</td>'; 
let count = 0;
let octaveIndex = 0;
thirdBands.forEach(() => {
    let cellStyle = "";
    if (count % 3 === 2) { // Ajout d'une bordure à droite toutes les trois cellules
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

// Générer l'en-tête du tableau pour les tiers d'octave
let headerRow = '<tr><td class="header-cell" style="border-right: 2px solid black; border-left: 2px solid black;">Bandes en Tiers (Hz)</td>';
count = 0;
thirdBands.forEach((band) => {
    let cellStyle = "";
    if (count % 3 === 2) { // Ajout d'une bordure à droite toutes les trois cellules
        cellStyle = ' style="border-right: 2px solid black;"';
    }
    headerRow += `<td${cellStyle}>${band}</td>`;
    count++;
});
tableContent += headerRow + '</tr>';

    // Générer les inputs pour les niveaux en tiers d'octave
    let inputRow = '<tr style="border-bottom: 2px solid black;"><td style="border-right: 2px solid black; border-left: 2px solid black;">Niveaux en Tiers</td>';
    count = 0;  // Réinitialisez la variable de comptage
    thirdBands.forEach((third) => {
        let cellStyle = "";
        if (count % 3 === 2) {  // Ajout d'une bordure à droite toutes les trois cellules
            cellStyle = ' style="border-right: 2px solid black;"';
        }
        if (count % 3 === 0) {  // Ajout d'une bordure à gauche toutes les trois cellules
            cellStyle += ' style="border-left: 2px solid black;"';
        }
        inputRow += `<td${cellStyle}><input type="number" step="any" min="0" id="third_${third}"></td>`;
        count++;
    });
    tableContent += inputRow + '</tr>';

    // Mettre à jour le tableau HTML
    table.innerHTML = tableContent;

    // Obtenir tous les éléments input dans le tableau
    const inputElements = document.querySelectorAll('input');

    // Ajouter un écouteur d'événements pour chaque élément input
    inputElements.forEach(input => {
        input.addEventListener('keyup', function(event) {
            // Numéro 13 est le code de la touche "Entrée"
            if (event.keyCode === 13) {
                // Déclencher le clic sur le bouton de calcul
                calculateBtn.click();
            }
        });
    });  

    // Continuer avec l'événement de clic pour le bouton de calcul
    calculateBtn.addEventListener('click', function() {
        console.log("Button clicked");
    
        // Si la ligne de résultat "Niveau en Octave" n'existe pas encore, créez une nouvelle ligne
        if (!resultRow) {
            let newRow = '<tr id="octaveResult"><td style="border: 3px solid black;" colspan="1">Niveau en Octave</td>';
            table.insertAdjacentHTML('beforeend', newRow); // Insérez la nouvelle ligne dans le tableau
            resultRow = document.getElementById("octaveResult");  // Conservez une référence à cette nouvelle ligne
        }
    
        let calculatedResults = [];  // Tableau pour stocker les niveaux calculés
    
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
    
            // Vérifier si tous les éléments existent et ont des valeurs
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
    
        // Mettre à jour les cellules de la ligne de résultat
        let newCells = '<td style="border: 3px solid black;" colspan="1">Niveau en Octave</td>';
        calculatedResults.forEach(result => {
            if (result !== null) {
                newCells += `<td style="border: 3px solid black;" class="resultsTable-td" colspan="3">${result.toFixed(2)}</td>`;
            } else {
                newCells += '<td style="border: 3px solid black;" colspan="3">-</td>';
            }
        });
    
        resultRow.innerHTML = newCells;  // Mettez à jour la ligne existante
    });
});    