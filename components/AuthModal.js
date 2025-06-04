// components/AuthModal.js
// Componente para el modal de autenticación (login/registro/invitado)
// Recibe callbacks para login, registro e invitado

import { t, getLanguage } from '../utils/i18n.js';

// Refuerzo: nunca mostrar la clave literal si no existe traducción
function safeT(key, fallback) {
  const value = t(key);
  if (!value || value === key) return fallback;
  return value;
}

export function AuthModal({ onLogin, onRegister, onGuest }) {
  const modal = document.createElement('div');
  modal.id = 'auth-modal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60';
  modal.tabIndex = -1;
  modal.innerHTML = `
    <div class="bg-[#232323] rounded-2xl p-6 w-[90vw] max-w-md shadow-xl relative">
      <button id="close-auth-modal" class="absolute top-3 right-3 text-gold text-xl"><i class="fas fa-times"></i></button>
      <h3 class="text-lg font-bold mb-4">${safeT('authTitle', 'Acceso')}</h3>
      <div class="flex gap-2 mb-4">
        <button id="auth-login-tab" class="flex-1 gold-button">${safeT('loginBtn', 'Iniciar sesión')}</button>
        <button id="auth-register-tab" class="flex-1 bg-neutral-800 text-gold rounded-lg font-bold">${safeT('registerBtn', 'Registrarse')}</button>
      </div>
      <form id="login-form" class="flex flex-col gap-3">
        <input type="email" id="login-email" class="rounded px-3 py-2 bg-neutral-800 text-white w-full" placeholder="${safeT('email', 'Email')}" required autocomplete="username">
        <div class="relative">
          <input type="password" id="login-password" class="rounded px-3 py-2 bg-neutral-800 text-white w-full pr-10" placeholder="${safeT('password', 'Contraseña')}" required autocomplete="current-password">
          <button type="button" id="toggle-login-password" tabindex="-1" class="absolute right-2 top-2 text-gold text-lg focus:outline-none" aria-label="${safeT('showHidePassword', 'Mostrar/ocultar contraseña')}"><i class="fas fa-eye"></i></button>
        </div>
        <button type="submit" class="gold-button w-full mt-2">${safeT('loginBtn', 'Entrar')}</button>
      </form>
      <form id="register-form" class="flex flex-col gap-3 hidden">
        <input type="text" id="register-name" class="rounded px-3 py-2 bg-neutral-800 text-white" placeholder="${safeT('name', 'Nombre')}" required autocomplete="name">
        <input type="email" id="register-email" class="rounded px-3 py-2 bg-neutral-800 text-white" placeholder="${safeT('email', 'Email')}" required autocomplete="username">
        <div class="relative">
          <input type="password" id="register-password" class="rounded px-3 py-2 bg-neutral-800 text-white w-full pr-10" placeholder="${safeT('password', 'Contraseña')}" required autocomplete="new-password">
          <button type="button" id="toggle-register-password" tabindex="-1" class="absolute right-2 top-2 text-gold text-lg focus:outline-none" aria-label="${safeT('showHidePassword', 'Mostrar/ocultar contraseña')}"><i class="fas fa-eye"></i></button>
        </div>
        <button type="submit" class="gold-button w-full mt-2">${safeT('registerBtn', 'Crear cuenta')}</button>
      </form>
      <button id="guest-access" class="text-gold underline mt-2">${safeT('guestBtn', 'Entrar como invitado')}</button>
      <div id="auth-error" class="text-red-400 text-sm mt-2 hidden"></div>
    </div>
  `;
  // --- LÓGICA DE INTERACCIÓN Y FLUIDEZ UX ---
  const loginTab = modal.querySelector('#auth-login-tab');
  const registerTab = modal.querySelector('#auth-register-tab');
  const loginForm = modal.querySelector('#login-form');
  const registerForm = modal.querySelector('#register-form');
  const guestBtn = modal.querySelector('#guest-access');
  const closeBtn = modal.querySelector('#close-auth-modal');
  const errorDiv = modal.querySelector('#auth-error');

  // Tabs
  loginTab.onclick = () => {
    loginTab.classList.add('gold-button');
    registerTab.classList.remove('gold-button');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    errorDiv.classList.add('hidden');
  };
  registerTab.onclick = () => {
    registerTab.classList.add('gold-button');
    loginTab.classList.remove('gold-button');
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    errorDiv.classList.add('hidden');
  };

  // Login
  loginForm.onsubmit = (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('#login-email').value;
    const password = loginForm.querySelector('#login-password').value;
    if (email && password) {
      if (onLogin) onLogin({ email, name: email.split('@')[0] });
      modal.remove();
    } else {
      errorDiv.textContent = safeT('loginError', 'Introduce email y contraseña.');
      errorDiv.classList.remove('hidden');
    }
  };
  // Registro
  registerForm.onsubmit = (e) => {
    e.preventDefault();
    const name = registerForm.querySelector('#register-name').value;
    const email = registerForm.querySelector('#register-email').value;
    const password = registerForm.querySelector('#register-password').value;
    if (name && email && password) {
      if (onRegister) onRegister({ name, email });
      modal.remove();
    } else {
      errorDiv.textContent = safeT('registerError', 'Completa todos los campos.');
      errorDiv.classList.remove('hidden');
    }
  };
  // Invitado
  guestBtn.onclick = () => {
    if (onGuest) onGuest();
    modal.remove();
  };
  // Cerrar modal
  closeBtn.onclick = () => {
    modal.remove();
  };
  // Cerrar con Escape
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.remove();
  });
  setTimeout(() => modal.focus && modal.focus(), 100);
  // Mostrar/ocultar contraseña login
  const loginPassword = modal.querySelector('#login-password');
  const toggleLoginPassword = modal.querySelector('#toggle-login-password');
  toggleLoginPassword.onclick = (e) => {
    e.preventDefault();
    const isVisible = loginPassword.type === 'text';
    loginPassword.type = isVisible ? 'password' : 'text';
    toggleLoginPassword.innerHTML = `<i class="fas fa-eye${isVisible ? '' : '-slash'}"></i>`;
  };
  // Mostrar/ocultar contraseña registro
  const registerPassword = modal.querySelector('#register-password');
  const toggleRegisterPassword = modal.querySelector('#toggle-register-password');
  toggleRegisterPassword.onclick = (e) => {
    e.preventDefault();
    const isVisible = registerPassword.type === 'text';
    registerPassword.type = isVisible ? 'password' : 'text';
    toggleRegisterPassword.innerHTML = `<i class="fas fa-eye${isVisible ? '' : '-slash'}"></i>`;
  };
  // Refuerzo: actualizar textos al cambiar idioma globalmente
  document.addEventListener('languagechange', () => {
    modal.querySelector('h3').textContent = safeT('authTitle', 'Acceso');
    loginTab.textContent = safeT('loginBtn', 'Iniciar sesión');
    registerTab.textContent = safeT('registerBtn', 'Registrarse');
    loginForm.querySelector('#login-email').placeholder = safeT('email', 'Email');
    loginForm.querySelector('#login-password').placeholder = safeT('password', 'Contraseña');
    toggleLoginPassword.setAttribute('aria-label', safeT('showHidePassword', 'Mostrar/ocultar contraseña'));
    loginForm.querySelector('button[type="submit"]').textContent = safeT('loginBtn', 'Entrar');
    registerForm.querySelector('#register-name').placeholder = safeT('name', 'Nombre');
    registerForm.querySelector('#register-email').placeholder = safeT('email', 'Email');
    registerForm.querySelector('#register-password').placeholder = safeT('password', 'Contraseña');
    toggleRegisterPassword.setAttribute('aria-label', safeT('showHidePassword', 'Mostrar/ocultar contraseña'));
    registerForm.querySelector('button[type="submit"]').textContent = safeT('registerBtn', 'Crear cuenta');
    guestBtn.textContent = safeT('guestBtn', 'Entrar como invitado');
    // Si hay error visible, actualiza mensaje
    if (!errorDiv.classList.contains('hidden')) {
      if (!loginForm.classList.contains('hidden')) {
        errorDiv.textContent = safeT('loginError', 'Introduce email y contraseña.');
      } else {
        errorDiv.textContent = safeT('registerError', 'Completa todos los campos.');
      }
    }
  });
  return modal;
}
