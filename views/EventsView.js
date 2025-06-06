// views/EventsView.js
// Vista para el listado de eventos
// Renderiza la lista de eventos usando el componente EventCard

import { EVENTS } from '../data/events.js';
import { EventCard } from '../components/EventCard.js';
import { getLanguage, t } from '../utils/i18n.js';

export function renderEventsView() {
    const lang = getLanguage();
    const list = document.querySelector('#events-screen .events-list');
    list.innerHTML = '';
    EVENTS.forEach(ev => {
        const card = EventCard(ev, lang);
        list.appendChild(card);
    });
    // Ejemplo de uso en renderEventsView:
    document.querySelector('#events-screen h2').setAttribute('data-i18n', 'eventsTitle');
    document.querySelector('#events-screen h2').textContent = t('eventsTitle');
}
