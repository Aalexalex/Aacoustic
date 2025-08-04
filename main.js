// Fonction pour changer de langue
function changeLanguage(lang) {
    if(lang === 'fr') {
        window.location.href = 'Main/main.html?lang=fr';
    } else if(lang === 'en') {
        window.location.href = 'Main/main.html?lang=en';
    }
}

// Ajout des applications 
document.addEventListener("DOMContentLoaded", function() {
    const dbCalculator = document.getElementById("db-calculator");
    const distanceDecay = document.getElementById("distance-decay");
    const lptierslpoct = document.getElementById("lptiers-lpoct");

    dbCalculator.addEventListener("click", function() {
        window.open("Calculs_db_web/calc_db.html", "_blank");
    });

    distanceDecay.addEventListener("click", function() {
        window.open("Calcul_decroissement_distance/calc_dist.html", "_blank");
    });

    lptierslpoct.addEventListener("click", function() {
        window.open("Calcul_tiers_en_bande/tiers_en_bande.html", "_blank");
    });
        

    // Ajoutez plus de gestionnaires d'événements ici pour d'autres applications
});
