// views/RestaurantsView.js
// Vista para el listado de restaurantes
// Renderiza la lista usando el componente RestaurantCard

import { RESTAURANTS } from '../data/restaurants.js';
import { RestaurantCard } from '../components/RestaurantCard.js';
import { t } from '../utils/i18n.js';

export function renderRestaurantsView(lang, onDetails) {
    const list = document.querySelector('#restaurants-screen .restaurant-list');
    list.innerHTML = '';
    RESTAURANTS.forEach(r => {
        const card = RestaurantCard(r, lang, onDetails);
        list.appendChild(card);
    });
    // Ejemplo de uso en renderRestaurantsView:
    document.querySelector('#restaurants-screen .greeting').setAttribute('data-i18n', 'tabRestaurants');
    document.querySelector('#restaurants-screen .greeting').textContent = t('tabRestaurants');
}
