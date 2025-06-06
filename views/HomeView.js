// views/HomeView.js
// Vista para la pantalla principal de bienvenida y fidelidad
// Renderiza saludo, banner, fidelidad y eventos destacados

import { t, getLanguage } from '../utils/i18n.js';
import { EVENTS } from '../data/events.js';

export function renderHomeView(user) {
  const lang = getLanguage();
  // Saludo y banner principal
  document.querySelector('#home-screen .greeting').setAttribute('data-i18n', 'greeting');
  document.querySelector('#home-screen .greeting').innerHTML = `${t('greeting')} <span class="gold-text" id="userName">${user?.name || 'Invitado'}</span>`;
  document.querySelector('#home-screen .rounded-2xl .text-lg').textContent = t('welcome1').replace(/<[^>]+>/g, '');
  document.querySelector('#home-screen .rounded-2xl .text-base').textContent = t('desc1').replace(/<[^>]+>/g, '');
  // Sección de fidelidad visual
  document.querySelector('#home-screen .text-base.font-semibold.mb-2.gold-text').textContent = t('sectionTitle') || 'Tu programa de fidelidad';
  // Eventos destacados (primeros 2)
  const eventsList = document.querySelector('#home-screen .featured-events');
  if (eventsList) {
    eventsList.innerHTML = EVENTS.slice(0, 2).map(ev => `
      <div class="event-card">
        <div class="event-name">${ev.name[lang] || ev.name['es']}</div>
        <div class="event-meta">${ev.date[lang] || ev.date['es'] || ev.date}</div>
      </div>
    `).join('');
  }
}
