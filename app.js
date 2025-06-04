// app.js
// --- ORQUESTADOR PRINCIPAL DE LA APP LA SENTADITA ---
// Importa vistas, componentes y utilidades para delegar el renderizado y la lógica de navegación, internacionalización y sesión.

import { renderRestaurantsView } from './views/RestaurantsView.js';
import { renderEventsView } from './views/EventsView.js';
import { renderHomeView } from './views/HomeView.js';
import { renderProfileView } from './views/ProfileView.js';
import { renderRestaurantDetailsView } from './views/RestaurantDetailsView.js';
import { showAuthView } from './views/AuthView.js';
import { t, setLanguage, getLanguage } from './utils/i18n.js';
import { showScreen } from './utils/navigation.js';
import { getUser, saveUser, clearUser } from './utils/storage.js';

// =========================
// Verificación de carga de TailwindCSS
// =========================
(function checkTailwindLoaded() {
  const div = document.createElement('div');
  div.className = 'hidden';
  document.body.appendChild(div);
  const style = window.getComputedStyle(div);
  if (style.display !== 'none') {
    console.warn('⚠️ TailwindCSS NO está cargando correctamente. Revisa tu conexión o la inclusión del CDN.');
  } else {
    console.info('✅ TailwindCSS está funcionando correctamente.');
  }
  document.body.removeChild(div);
})();

// =========================
// Inicialización de Swiper para la pantalla de bienvenida
// =========================
const welcomeSwiper = new Swiper('.welcome-swiper', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

// =========================
// Control de sesión y usuario
// =========================
let user = getUser();
if (!user || !user.name || user.name === 'Invitado' || !user.email) user = null;

// =========================
// Validación y registro de usuario
// =========================
function isValidUser(userData) {
  // Valida que el usuario tenga nombre y email válido
  if (!userData || !userData.name) return false;
  if (!userData.email) return false;
  // Validación básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(userData.email);
}

function isRegisteredUser(email) {
  // Busca en localStorage si existe un usuario con ese email
  const stored = JSON.parse(localStorage.getItem('users') || '[]');
  return stored.find(u => u.email === email);
}

function registerUser(userData) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));
}

// =========================
// Manejo de la pantalla de bienvenida y flujo de autenticación
// =========================
function handleWelcomeActions() {
  // Espera a que el botón exista en el DOM y añade listeners para login, registro e invitado
  function addStartBtnListener() {
    const startBtn = document.getElementById('start-button');
    if (startBtn) {
      startBtn.onclick = () => {
        console.log("Botón Empezar PRESIONADO");
        // Refuerzo: siempre ocultar barra antes de mostrar auth
        document.body.classList.remove('show-tab-bar');
        showAuthView({
          onLogin: (userData) => {
            if (!isValidUser(userData)) {
              alert(t('invalidEmail') || 'Por favor, introduce un email válido.');
              return;
            }
            const existing = isRegisteredUser(userData.email);
            if (!existing) {
              alert(t('userNotRegistered') || 'Usuario no registrado. Por favor, regístrate primero.');
              return;
            }
            saveUser(existing);
            user = existing;
            renderMainApp();
            setMobileViewport(); // Refuerzo tras login
            document.body.classList.add('show-tab-bar');
          },
          onRegister: (userData) => {
            if (!isValidUser(userData)) {
              alert(t('invalidEmail') || 'Por favor, introduce un email válido.');
              return;
            }
            if (isRegisteredUser(userData.email)) {
              alert(t('userAlreadyRegistered') || 'Este email ya está registrado.');
              return;
            }
            registerUser(userData);
            saveUser(userData);
            user = userData;
            renderMainApp();
            setMobileViewport(); // Refuerzo tras registro
            document.body.classList.add('show-tab-bar');
          },
          onGuest: () => {
            user = { name: t('profileName') || 'Invitado' };
            saveUser(user);
            renderMainApp();
            setMobileViewport(); // Refuerzo tras invitado
            document.body.classList.add('show-tab-bar');
          }
        });
      };
    } else {
      setTimeout(addStartBtnListener, 100);
    }
  }
  addStartBtnListener();
  // Refuerzo: al mostrar bienvenida, siempre ocultar barra
  document.body.classList.remove('show-tab-bar');
}

// =========================
// Render principal de la app según usuario
// =========================
function renderMainApp() {
  renderHomeView(user);
  renderRestaurantsView(getLanguage(), (id) => {
    renderRestaurantDetailsView(id, getLanguage(), () => {/* lógica reserva */ });
    showScreen('restaurant-details-screen');
    setMobileViewport(); // Refuerzo: asegura fondo correcto
  });
  renderEventsView();
  showScreen('home-screen');
  setMobileViewport(); // Refuerzo: asegura fondo correcto
  document.body.classList.add('show-tab-bar');
}

// =========================
// Flujo de logout robusto
// =========================
function handleLogout() {
  clearUser();
  user = null;
  showScreen('welcome-screen');
  // Refuerzo: siempre ocultar barra al volver a bienvenida
  document.body.classList.remove('show-tab-bar');
}

// Listener global para el botón de logout
function addLogoutListener() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.onclick = handleLogout;
  } else {
    setTimeout(addLogoutListener, 100);
  }
}
addLogoutListener();

// =========================
// Actualiza textos estáticos del HTML según el idioma
// =========================
function updateStaticTexts() {
  const lang = getLanguage();
  // Welcome slides
  const slides = document.querySelectorAll('.welcome-swiper .swiper-slide');
  if (slides[0]) {
    slides[0].querySelector('.slide-title').innerHTML = t('welcome1');
    slides[0].querySelector('.slide-description').textContent = t('desc1');
  }
  if (slides[1]) {
    slides[1].querySelector('.slide-title').innerHTML = t('welcome2');
    slides[1].querySelector('.slide-description').textContent = t('desc2');
  }
  if (slides[2]) {
    slides[2].querySelector('.slide-title').innerHTML = t('welcome3');
    slides[2].querySelector('.slide-description').textContent = t('desc3');
    const startBtn = slides[2].querySelector('#start-button');
    if (startBtn) startBtn.textContent = t('start');
  }
  // Tab labels
  const tabLabels = [
    { selector: '.tab-item[data-screen="home-screen"] .tab-label', key: 'tabHome' },
    { selector: '.tab-item[data-screen="restaurants-screen"] .tab-label', key: 'tabRestaurants' },
    { selector: '.tab-item[data-screen="events-screen"] .tab-label', key: 'tabEvents' },
    { selector: '.tab-item[data-screen="profile-screen"] .tab-label', key: 'tabProfile' },
  ];
  tabLabels.forEach(tab => {
    const el = document.querySelector(tab.selector);
    if (el) el.textContent = t(tab.key);
  });
  // Home quick access
  const quickBtns = document.querySelectorAll('#home-screen .open-reservation-btn');
  if (quickBtns[0]) quickBtns[0].lastChild.textContent = t('reservationBtn') || 'Reservar mesa';
  // Corregido: selector válido para el botón de premios
  const premiosBtn = document.querySelector('#home-screen .rewards-btn');
  if (premiosBtn) premiosBtn.lastChild.textContent = t('myRewards') || 'Mis premios';
  // Home greeting and welcome
  const greeting = document.querySelector('#home-screen .greeting');
  if (greeting) greeting.childNodes[0].textContent = t('greeting') + ' ';
  const homeWelcome = document.querySelector('#home-screen .bg-gradient-to-r .text-lg');
  if (homeWelcome) homeWelcome.textContent = t('homeWelcome') || '¡Bienvenido a La Sentadita!';
  const homeDesc = document.querySelector('#home-screen .bg-gradient-to-r .text-base.mb-2');
  if (homeDesc) homeDesc.textContent = t('homeDesc') || 'Descubre experiencias gastronómicas únicas y eventos exclusivos.';
  // Home loyalty section
  const loyaltyTitle = document.querySelector('#home-screen .gold-text.font-semibold');
  if (loyaltyTitle) loyaltyTitle.textContent = t('loyaltyTitle') || 'Tu programa de fidelidad';
  const loyaltyPoints = document.querySelector('#home-screen .text-xs.text-gold');
  if (loyaltyPoints) loyaltyPoints.textContent = t('points') || 'Puntos';
  const loyaltyMsg = document.querySelector('#home-screen .text-sm.mb-1');
  if (loyaltyMsg) loyaltyMsg.textContent = t('keepEarning') || '¡Sigue acumulando puntos y desbloquea recompensas!';
  const loyaltyNext = document.querySelector('#home-screen .text-xs.text-gray-400');
  if (loyaltyNext) loyaltyNext.innerHTML = t('nextReward') || 'Te faltan <span class="gold-text font-semibold">180</span> puntos para tu próxima recompensa.';
  const loyaltyBtn = document.querySelector('#home-screen .bg-gold.text-black');
  if (loyaltyBtn) loyaltyBtn.textContent = t('seeRewards') || 'Ver premios';
  // Home featured events
  const featuredTitle = document.querySelector('#home-screen .mb-6 .text-base.font-semibold');
  if (featuredTitle) featuredTitle.textContent = t('upcomingEvents') || 'Próximos eventos destacados';
  // Home quick access title
  const quickTitle = document.querySelectorAll('#home-screen .mb-6 .text-base.font-semibold')[1];
  if (quickTitle) quickTitle.textContent = t('quickAccess') || 'Accesos rápidos';
  // Reservation modal
  const reservationTitle = document.getElementById('reservation-modal-title');
  if (reservationTitle) reservationTitle.textContent = t('reservationTitle') || 'Reservar mesa';
  const reservationLabels = [
    { selector: 'label[for="reservation-restaurant-select"]', key: 'restaurantLabel', fallback: 'Restaurante' },
    { selector: 'option[value=""]', key: 'selectRestaurant', fallback: 'Selecciona restaurante' },
    { selector: 'label[for="reservation-date"]', key: 'dateLabel', fallback: 'Fecha' },
    { selector: 'label[for="reservation-time"]', key: 'timeLabel', fallback: 'Hora' },
    { selector: 'label[for="reservation-guests"]', key: 'guestsLabel', fallback: 'Personas' },
    { selector: '#reservation-form button[type="submit"]', key: 'confirmReservation', fallback: 'Confirmar reserva' },
  ];
  reservationLabels.forEach(lab => {
    const el = document.querySelector(lab.selector);
    if (el) el.textContent = t(lab.key) || lab.fallback;
  });
  // Restaurants screen title
  const restTitle = document.querySelector('#restaurants-screen .greeting');
  if (restTitle) restTitle.textContent = t('tabRestaurants');
  // Events screen title and filters
  const eventsTitle = document.querySelector('#events-screen h2');
  if (eventsTitle) eventsTitle.textContent = t('eventsTitle');
  const filterButtons = document.querySelectorAll('#events-screen .filter-button');
  const filterKeys = ['filterAll', 'filterMusic', 'filterGastro', 'filterTasting', 'filterSpecial'];
  filterButtons.forEach((btn, i) => {
    btn.textContent = t(filterKeys[i]);
  });
  // Profile screen static
  const profileName = document.getElementById('profileName');
  if (profileName) profileName.textContent = t('profileName') || 'Usuario';
  const profileEmail = document.querySelector('#profile-screen .profile-email');
  if (profileEmail) profileEmail.textContent = t('profileEmail') || 'correo@ejemplo.com';
  // Settings section
  const settingsTitle = document.querySelector('#profile-screen .settings-section h3');
  if (settingsTitle) settingsTitle.textContent = t('settingsTitle');
  const settingsItems = document.querySelectorAll('#profile-screen .settings-item span.flex-1');
  if (settingsItems[0]) settingsItems[0].textContent = t('language') || 'Idioma';
  if (settingsItems[1]) settingsItems[1].textContent = t('privacy') || 'Privacidad';
  if (settingsItems[2]) settingsItems[2].textContent = t('help') || 'Ayuda';
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> ' + (t('logout') || 'Cerrar Sesión');
}

// Llama a updateStaticTexts en el arranque y tras cada cambio de idioma
document.addEventListener('DOMContentLoaded', () => {
  updateStaticTexts();
  renderHomeView(user);
  renderRestaurantsView(getLanguage(), (id) => {
    renderRestaurantDetailsView(id, getLanguage(), () => {/* lógica reserva */ });
    showScreen('restaurant-details-screen');
  });
  renderEventsView();
  renderProfileView();
  showScreen('welcome-screen');
  handleWelcomeActions();
  // Si hay usuario logueado, inicia sesión automáticamente
  // ...puedes expandir lógica aquí...
  // Listener para cambio de idioma en bienvenida
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      if (typeof window.syncLanguage === 'function') {
        window.syncLanguage(this.dataset.lang);
      }
    });
  });
});

// =========================
// Navegación entre pantallas (tabs)
// =========================
document.querySelectorAll('.tab-item').forEach(tab => {
  tab.addEventListener('click', function () {
    showScreen(this.dataset.screen);
    setMobileViewport();
    // Resalta la pestaña activa
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    updateStaticTexts(); // Refuerzo: sincroniza traducción de la barra
    if (this.dataset.screen === 'restaurants-screen') {
      renderRestaurantsView(getLanguage(), (id) => {
        renderRestaurantDetailsView(id, getLanguage(), () => {/* lógica reserva */ });
        showScreen('restaurant-details-screen');
      });
    } else if (this.dataset.screen === 'events-screen') {
      renderEventsView();
    } else if (this.dataset.screen === 'profile-screen') {
      renderProfileView();
    } else if (this.dataset.screen === 'home-screen') {
      renderHomeView(user);
    }
    // Refuerzo: nunca mostrar barra en bienvenida
    if (this.dataset.screen === 'welcome-screen') {
      document.body.classList.remove('show-tab-bar');
    } else {
      document.body.classList.add('show-tab-bar');
    }
  });
});

// =========================
// Adaptación responsiva para móvil y mejoras de sincronización de idioma
// =========================
function setMobileViewport() {
  // Fuerza el viewport móvil y limita el ancho máximo de la app
  let meta = document.querySelector('meta[name="viewport"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'viewport';
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
  const appContainer = document.querySelector('.app-container');
  if (appContainer) {
    appContainer.style.maxWidth = '600px';
    appContainer.style.margin = '0 auto';
  }
}

// =========================
// Sincronización de idioma y configuración inicial
// =========================
function initLanguage() {
  const userLang = navigator.language || navigator.userLanguage;
  const lang = userLang.startsWith('es') ? 'es' : 'en';
  setLanguage(lang);
  document.documentElement.lang = lang;
  // Carga de fuentes y recursos específicos por idioma
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = lang === 'es' ? 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' : 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap';
  document.head.appendChild(fontLink);
}

// =========================
// Arranque de la aplicación
// =========================
function startApp() {
  initLanguage();
  setMobileViewport();
  // Muestra la pantalla de bienvenida o la pantalla principal según el estado de sesión
  if (user) {
    renderMainApp();
    showScreen('home-screen');
  } else {
    handleWelcomeActions();
    showScreen('welcome-screen');
  }
}

// Inicia la aplicación
startApp();

// =========================
// Sincronización global de idioma sin sobrescribir el módulo importado
// =========================
window.syncLanguage = function(lang) {
  setLanguage(lang);
  updateStaticTexts();
  renderHomeView(getUser());
  renderRestaurantsView(getLanguage(), (id) => {
    renderRestaurantDetailsView(id, getLanguage(), () => {/* lógica reserva */ });
    showScreen('restaurant-details-screen');
  });
  renderEventsView();
  renderProfileView();
  setupReservationFormI18n();
  // Mantiene activa la pestaña de la pantalla actual
  const activeScreen = document.querySelector('.screen.active');
  if (activeScreen) {
    const tab = document.querySelector('.tab-item[data-screen="' + activeScreen.id + '"]');
    if (tab) {
      document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    }
  }
};

// =========================
// Manejo de errores e internacionalización en el formulario de reserva
// =========================
function setupReservationFormI18n() {
  const form = document.getElementById('reservation-form');
  if (!form) return;
  const errorDiv = document.getElementById('reservation-error');
  form.addEventListener('submit', function (e) {
    // Validación simple de campos
    const date = form.querySelector('#reservation-date').value;
    const time = form.querySelector('#reservation-time').value;
    const guests = form.querySelector('#reservation-guests').value;
    if (!date || !time || !guests || guests < 1) {
      if (errorDiv) {
        errorDiv.textContent = t('reservationError') || 'Completa todos los campos correctamente.';
        errorDiv.classList.remove('hidden');
      }
      e.preventDefault();
      return false;
    } else {
      if (errorDiv) errorDiv.classList.add('hidden');
    }
  });
  // Refuerzo: actualizar mensaje de error al cambiar idioma
  document.addEventListener('languagechange', () => {
    if (errorDiv && !errorDiv.classList.contains('hidden')) {
      errorDiv.textContent = t('reservationError') || 'Completa todos los campos correctamente.';
    }
  });
}
