// utils/i18n.js
// Utilidad para internacionalización y traducción dinámica
// Centraliza el acceso a las traducciones y el idioma activo
// --- MEJORA: Persistencia de idioma en localStorage ---
// --- MEJORA: Modularización dinámica de traducciones ---

const LANG_STORAGE_KEY = 'appLang';
let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || 'es';
let translations = {};
let loadedLangs = {};

// Carga dinámica de traducciones por idioma
async function loadTranslations(lang) {
    if (loadedLangs[lang]) return loadedLangs[lang];
    try {
        let module;
        switch (lang) {
            case 'es':
                module = await import('../translations/es.js');
                break;
            case 'en':
                module = await import('../translations/en.js');
                break;
            case 'fr':
                module = await import('../translations/fr.js');
                break;
            case 'de':
                module = await import('../translations/de.js');
                break;
            case 'ru':
                module = await import('../translations/ru.js');
                break;
            default:
                module = await import('../translations/es.js');
        }
        loadedLangs[lang] = module.default;
        return module.default;
    } catch (e) {
        // Fallback a español si falla
        const fallback = (await import('../translations/es.js')).default;
        loadedLangs[lang] = fallback;
        return fallback;
    }
}

// Inicializa las traducciones para el idioma actual
export async function initI18n() {
    translations[currentLang] = await loadTranslations(currentLang);
    // Precarga español e inglés como fallback
    if (!translations['es']) translations['es'] = await loadTranslations('es');
    if (!translations['en']) translations['en'] = await loadTranslations('en');
}

// Traduce una clave con fallback y soporte de variables
export function t(key, vars) {
    let value =
        (translations[currentLang] && translations[currentLang][key]) ||
        (translations['es'] && translations['es'][key]) ||
        (translations['en'] && translations['en'][key]) ||
        key;
    if (vars && typeof value === 'string') {
        Object.keys(vars).forEach(k => {
            value = value.replace(new RegExp('{' + k + '}', 'g'), vars[k]);
        });
    }
    return value;
}

export function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_STORAGE_KEY, lang);
}

export function getLanguage() {
    return currentLang;
}

export function getLocalized(obj, field) {
    if (!obj) return '';
    const lang = getLanguage();
    return (
        obj[`${field}_${lang}`] ||
        obj[`${field}_es`] ||
        obj[`${field}_en`] ||
        ''
    );
}

// --- EJEMPLOS DE USO ---
// t('welcomeUser', { name: 'Jesús' })
// getLocalized({ name_es: 'Hola', name_en: 'Hello' }, 'name')
