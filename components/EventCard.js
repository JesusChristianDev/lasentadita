// components/EventCard.js
// Componente para renderizar una tarjeta de evento
// Recibe un objeto evento y el idioma

export function EventCard(event, lang) {
  // Crea el elemento principal de la tarjeta
  const div = document.createElement('div');
  div.className = 'event-card mb-2';
  div.innerHTML = `
    <div class="event-name font-bold gold-text">${event.name[lang] || event.name['es']}</div>
    <div class="event-meta text-xs text-gray-400 mb-1">${event.date[lang] || event.date['es'] || event.date}</div>
    <div class="event-type text-xs mb-1">${event.type[lang] || event.type['es']}</div>
    <div class="event-restaurant">${event.restaurant[lang] || event.restaurant['es']}</div>
  `;
  return div;
}
