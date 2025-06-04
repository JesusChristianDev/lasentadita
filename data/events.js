// data/events.js
// --- DATOS MULTILINGÜES DE EVENTOS REALES ---
// Este archivo exporta el array EVENTS, con todos los eventos multilingües asociados a los restaurantes reales de La Sentadita.
// Se importa en la app principal para renderizar listados y detalles de eventos.

export const EVENTS = [
    {
        id: 1,
        name: {
            es: "Sunset Cocktails",
            en: "Sunset Cocktails",
            fr: "Cocktails au coucher du soleil",
            de: "Sonnenuntergangs-Cocktails",
            ru: "Коктейли на закате"
        },
        date: "Viernes, 19:00 hrs",
        type: {
            es: "Música",
            en: "Music",
            fr: "Musique",
            de: "Musik",
            ru: "Музыка"
        },
        restaurant: {
            es: "Bambero",
            en: "Bambero",
            fr: "Bambero",
            de: "Bambero",
            ru: "Бамберо"
        }
    },
    {
        id: 2,
        name: {
            es: "Healthy Brunch",
            en: "Healthy Brunch",
            fr: "Brunch Santé",
            de: "Gesunder Brunch",
            ru: "Здоровый бранч"
        },
        date: "Domingo, 11:00 hrs",
        type: {
            es: "Especiales",
            en: "Specials",
            fr: "Spéciaux",
            de: "Sonderangebote",
            ru: "Специальные"
        },
        restaurant: {
            es: "Sol Beach",
            en: "Sol Beach",
            fr: "Plage Sol",
            de: "Sonnenstrand",
            ru: "Сол Бич"
        }
    },
    // Puedes añadir más eventos reales siguiendo esta estructura
];
