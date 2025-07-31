// Fonction pour changer de langue
function changeLanguage(lang) {
    if(lang === 'fr') {
        window.location.href = '/Aacoustic/Main/Main_app_fr/main.html';
    } else if(lang === 'en') {
        window.location.href = '/Aacoustic/Main/Main_app_en/main.html';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const dbCalculator = document.getElementById("db-calculator");
    const distanceDecay = document.getElementById("distance-decay");
    const lptierslpoct = document.getElementById("lptiers-lpoct");
    const home = document.getElementById("home");
    const container = document.getElementById("tool-container");
    const frame = document.getElementById("toolFrame");
    const backBtn = document.getElementById("backBtn");

    function openTool(url) {
        frame.src = url;
        home.style.display = "none";
        container.style.display = "block";
    }

    dbCalculator.addEventListener("click", function() {
        openTool("Calculs_db_web/calc_db.html");
    });

    distanceDecay.addEventListener("click", function() {
        openTool("Calcul_decroissement_distance/calc_dist.html");
    });

    lptierslpoct.addEventListener("click", function() {
        openTool("Calcul_tiers_en_bande/tiers_en _bande.html");
    });

    backBtn.addEventListener("click", function() {
        frame.src = "";
        container.style.display = "none";
        home.style.display = "block";
    });
});
