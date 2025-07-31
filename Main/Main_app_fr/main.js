// Changer de langue
function changeLanguage(lang) {
    if (lang === 'fr') {
        window.location.href = '/Aacoustic/Main/Main_app_fr/main.html';
    } else if (lang === 'en') {
        window.location.href = '/Aacoustic/Main/Main_app_en/main.html';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.app-card');
    const frame = document.getElementById('content-frame');
    const home = document.getElementById('home-section');
    const title = document.querySelector('header h1');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const src = card.getAttribute('data-src');
            if (src) {
                frame.src = src;
                frame.style.display = 'block';
                home.style.display = 'none';
            }
        });
    });

    if (title) {
        title.addEventListener('click', () => {
            frame.style.display = 'none';
            home.style.display = 'block';
        });
    }
});
