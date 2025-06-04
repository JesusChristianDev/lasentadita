// components/RestaurantCard.js
// Componente para renderizar una tarjeta de restaurante
// Recibe un objeto restaurante, el idioma y un callback para el click

export function RestaurantCard(restaurant, lang, onClick) {
  // Crea el elemento principal de la tarjeta
  const card = document.createElement('div');
  card.className = 'restaurant-card bg-[#232323] rounded-xl p-4 flex gap-4 items-center shadow cursor-pointer hover:scale-[1.02] transition';
  card.dataset.id = restaurant.id;
  card.innerHTML = `
    <img src="${restaurant.logo || restaurant.img}" class="restaurant-img w-20 h-20 object-contain rounded-lg bg-white p-2" alt="${restaurant.name[lang] || restaurant.name['es']}">
    <div class="flex-1">
      <div class="restaurant-name text-lg font-bold mb-1 gold-text">${restaurant.name[lang] || restaurant.name['es']}</div>
      <div class="restaurant-style flex items-center gap-2 mb-1">
        <i class="fas ${restaurant.icon}" style="color:${restaurant.iconColor}"></i>
        <span class="text-sm">${restaurant.style[lang] || restaurant.style['es']}</span>
      </div>
      <div class="restaurant-description text-sm text-gray-300">${restaurant.description[lang] || restaurant.description['es']}</div>
    </div>
  `;
  // Callback al hacer click
  card.onclick = () => onClick(restaurant.id);
  return card;
}
