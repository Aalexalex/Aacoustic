// Fonction pour changer de langue
function changeLanguage(lang) {
    if(lang === 'fr') {
        window.location.href = '/Aacoustic/Main/Main_app_fr/main.html';
    } else if(lang === 'en') {
        window.location.href = '/Aacoustic/Main/Main_app_en/main.html';
    }
}


document.addEventListener("DOMContentLoaded", function() {
    initializeToolPage();
});
