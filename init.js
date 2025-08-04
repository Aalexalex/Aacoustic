var userLang = navigator.language || navigator.userLanguage;
changeLanguage(userLang && userLang.startsWith('fr') ? 'fr' : 'en', window.appConfig.basePath);
