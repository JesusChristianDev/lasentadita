// utils/i18n.js
// Utilidad para internacionalización y traducción dinámica
// Centraliza el acceso a las traducciones y el idioma activo

// Usar window.translations porque translations.js no exporta nada
const translations = window.translations;

let currentLang = 'es';

// Traduce una clave según el idioma actual
export function t(key) {
    if (!translations || !translations[currentLang]) return key;
    return translations[currentLang][key] || key;
}

// Cambia el idioma activo
export function setLanguage(lang) {
    currentLang = lang;
}

// Obtiene el idioma activo
export function getLanguage() {
    return currentLang;
}
