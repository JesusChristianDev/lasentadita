// views/RestaurantDetailsView.js
// Vista para los detalles de un restaurante
// Renderiza tabs: menú, galería, eventos, opiniones, contacto y redes

import { RESTAURANTS } from '../data/restaurants.js';
import { EVENTS } from '../data/events.js';
import { getLanguage, t } from '../utils/i18n.js';

export function renderRestaurantDetailsView(id, onReservation) {
  const lang = getLanguage();
  const r = RESTAURANTS.find(x => x.id == id);
  if (!r) return;
  const screen = document.getElementById('restaurant-details-screen');
  // Render principal de detalles, tabs y contenido
  screen.innerHTML = `
    <div class="relative">
      <img src="${r.logo || r.img}" class="w-full h-48 object-contain rounded-b-2xl bg-white p-4" alt="${r.name[lang] || r.name['es']}">
      <div class="absolute top-4 left-4 bg-black/60 rounded-lg px-3 py-1 flex items-center gap-2">
        <span class="text-xl font-bold gold-text">${r.name[lang] || r.name['es']}</span>
      </div>
    </div>
    <div class="px-4 pt-4 pb-2">
      <div class="text-base text-gray-400 mb-1"><i class="fas fa-map-marker-alt mr-1"></i> ${r.city[lang] || r.city['es']}, ${r.address[lang] || r.address['es']}</div>
      <button class="gold-button w-full mb-4" id="open-reservation-btn">${t('reserveTable') || 'Reservar mesa'}</button>
      <div class="tabs flex gap-2 mb-4 overflow-x-auto">
        <button class="tab-btn active" data-tab="menu">${t('menuTab') || 'Menú'}</button>
        <button class="tab-btn" data-tab="gallery">${t('photosTab') || 'Fotos'}</button>
        <button class="tab-btn" data-tab="events">${t('eventsTab') || 'Eventos'}</button>
        <button class="tab-btn" data-tab="reviews">${t('reviewsTab') || 'Opiniones'}</button>
        <button class="tab-btn" data-tab="contact">${t('contactTab') || 'Contacto'}</button>
        <button class="tab-btn" data-tab="social">${t('socialTab') || 'Redes'}</button>
      </div>
      <div class="tab-content" id="tab-menu">
        ${Object.entries(r.menu || {}).map(([cat, items]) => `
          <div class="mb-2">
            <div class="font-bold text-gold mb-1">${t('menu' + cat.charAt(0).toUpperCase() + cat.slice(1)) || cat}</div>
            <div class="grid grid-cols-1 gap-2">
              ${items.map(item => `
                <div class="flex gap-3 items-center bg-neutral-900 rounded-lg p-2">
                  ${item.img ? `<img src="${item.img}" class="w-12 h-12 object-cover rounded" alt="${item.name[lang] || item.name['es']}">` : ''}
                  <div>
                    <div class="font-semibold">${item.name[lang] || item.name['es']}</div>
                    <div class="text-xs text-gray-400">${item.desc[lang] || item.desc['es']}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('') || `<div class="text-gray-300">${t('menuSoon') || 'Menú próximamente disponible.'}</div>`}
      </div>
      <div class="tab-content hidden" id="tab-gallery">
        <div class="grid grid-cols-3 gap-2">
          ${(r.gallery || []).map(img => `<img src="${img}" class="rounded-lg object-cover w-full h-20" alt="Foto">`).join('')}
        </div>
      </div>
      <div class="tab-content hidden" id="tab-events">
        ${(EVENTS.filter(ev => (ev.restaurant[lang] || ev.restaurant['es']) === (r.name[lang] || r.name['es'])).map(ev => `
          <div class="event-card mb-2">
            <div class="event-name font-bold gold-text">${ev.name[lang] || ev.name['es']}</div>
            <div class="event-meta text-xs text-gray-400 mb-1">${ev.date[lang] || ev.date['es'] || ev.date}</div>
            <div class="event-type text-xs mb-1">${ev.type[lang] || ev.type['es']}</div>
            <button class="gold-button w-full text-xs py-1">${t('reserveSpot') || 'Reservar plaza'}</button>
          </div>
        `).join('')) || `<div class="text-gray-400 text-sm">${t('noUpcomingEvents') || 'No hay eventos próximos.'}</div>`}
      </div>
      <div class="tab-content hidden" id="tab-reviews">
        ${(r.reviews || []).map(op => `
          <div class="flex items-center gap-2 mb-1">
            <span class="text-gold">${'★'.repeat(op.stars)}${'☆'.repeat(5 - op.stars)}</span>
            <span class="text-sm text-gray-200">${op.text[lang] || op.text['es']}</span>
          </div>
        `).join('') || `<div class="text-gray-300">${t('reviewsSoon') || 'Opiniones próximamente.'}</div>`}
      </div>
      <div class="tab-content hidden" id="tab-contact">
        <div class="flex flex-col gap-2">
          <a href="tel:${r.phone || ''}" class="gold-button w-full flex items-center justify-center gap-2"><i class="fas fa-phone"></i> ${t('callBtn') || 'Llamar'}</a>
          <a href="mailto:${r.email || ''}" class="gold-button w-full flex items-center justify-center gap-2"><i class="fas fa-envelope"></i> Email</a>
          <a href="${r.map || '#'}" target="_blank" class="gold-button w-full flex items-center justify-center gap-2"><i class="fas fa-map"></i> ${t('seeMap') || 'Ver mapa'}</a>
        </div>
      </div>
      <div class="tab-content hidden" id="tab-social">
        <div class="flex gap-3">
          <a href="${r.instagram || '#'}" target="_blank" class="text-pink-400 text-2xl"><i class="fab fa-instagram"></i></a>
          <a href="${r.facebook || '#'}" target="_blank" class="text-blue-500 text-2xl"><i class="fab fa-facebook"></i></a>
          <a href="${r.tiktok || '#'}" target="_blank" class="text-black text-2xl"><i class="fab fa-tiktok"></i></a>
        </div>
      </div>
    </div>
    <button id="contact-fab" class="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg text-2xl"><i class="fab fa-whatsapp"></i></button>
  `;
  // Tabs: listeners para mostrar/ocultar contenido
  screen.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = function () {
      screen.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      screen.querySelectorAll('.tab-content').forEach(tc => tc.classList.add('hidden'));
      screen.querySelector(`#tab-${this.dataset.tab}`).classList.remove('hidden');
    };
  });
  // Botón de reserva
  screen.querySelector('#open-reservation-btn').onclick = () => onReservation(r.id, r.name[lang] || r.name['es']);
  // Botón de contacto rápido (WhatsApp)
  screen.querySelector('#contact-fab').onclick = () => window.open(`https://wa.me/${r.whatsapp || ''}`, '_blank');
}
