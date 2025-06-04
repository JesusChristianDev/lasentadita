// utils/navigation.js
// Utilidad para navegación entre pantallas
// Centraliza el cambio de pantalla y la visibilidad de la barra de tabs

import { renderProfileView } from '../views/ProfileView.js';

export function showScreen(screenId) {
    // Elimina .active de todas las pantallas
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

    // Activa solo la pantalla deseada
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.add('active');

    // Si es bienvenida, añade clase especial al body
    if (screenId === 'welcome-screen') {
        document.body.classList.add('welcome-active');
    } else {
        document.body.classList.remove('welcome-active');
    }

    // La barra solo se muestra si NO es bienvenida
    const tabBar = document.querySelector('.tab-bar');
    if (tabBar) {
        tabBar.style.display = (screenId === 'welcome-screen') ? 'none' : 'flex';
    }

    // Si se navega al perfil, renderiza la vista de perfil
    if (screenId === 'profile-screen' && typeof renderProfileView === 'function') {
        renderProfileView();
    }
}
