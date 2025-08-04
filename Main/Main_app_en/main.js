// Fonction pour changer de langue
function changeLanguage(lang) {
    if(lang === 'fr') {
        window.location.href = '/Aacoustic/Main/Main_app_fr/main.html';
    } else if(lang === 'en') {
        window.location.href = '/Aacoustic/Main/Main_app_en/main.html';
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const tools = {
        "db-calculator": "Calculs_db_web/calc_db.html",
        "distance-decay": "Calcul_decroissement_distance/calc_dist.html",
        "lptiers-lpoct": "Calcul_tiers_en_bande/tiers_en _bande.html"
    };

    Object.entries(tools).forEach(([id, url]) => {
        const card = document.getElementById(id);
        if (card) {
            card.addEventListener("click", () => {
                window.open(url, "_blank");
            });
        }
    });

    // Ajoutez plus de gestionnaires d'événements ici pour d'autres applications
});
