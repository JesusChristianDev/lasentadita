// views/ProfileView.js
// Vista para la pantalla de perfil y ajustes de usuario
// Renderiza datos de usuario, edición y configuración de idioma

import { t, setLanguage, getLanguage } from '../utils/i18n.js';
import { getUser, clearUser, saveUser } from '../utils/storage.js';

export function renderProfileView() {
    const profileScreen = document.getElementById('profile-screen');
    if (!profileScreen || profileScreen.offsetParent === null) return;
    const user = getUser();
    const nameEl = document.getElementById('profileName');
    const emailEl = document.querySelector('.profile-email');
    if (!nameEl || !emailEl) return;
    // Estado de edición
    let isEditing = !!document.getElementById('profile-edit-name');
    if (!isEditing) {
        nameEl.innerHTML = `${user?.name || t('profileName') || 'Invitado'} <button id="profile-edit-btn" class="ml-2 text-xs px-2 py-1 rounded bg-gold text-black">${t('editProfile') || 'Editar'}</button>`;
        emailEl.innerHTML = `${user?.email || t('profileEmail') || ''}`;
        document.getElementById('profile-edit-btn').onclick = () => {
            renderProfileEdit(user);
        };
    }
    // Mostrar reservas del usuario (solo si existe la función)
    const reservationsSection = document.querySelector('.reservations-section');
    if (reservationsSection) {
        reservationsSection.innerHTML = `<h4 class="font-semibold mb-2">${t('reservationsTitle') || 'Mis Reservas'}</h4>`;
        let reservations = [];
        if (typeof window.getUserReservations === 'function') {
            reservations = window.getUserReservations(user);
        }
        if (reservations && reservations.length > 0) {
            reservationsSection.innerHTML += '<ul>' + reservations.map(r => `<li class="mb-1">${r.date} - ${r.restaurant} (${r.guests} ${t('guests')})</li>`).join('') + '</ul>';
        } else {
            reservationsSection.innerHTML += `<div class="text-gray-400 text-sm">${t('noReservations') || 'Aún no tienes reservas.'}</div>`;
        }
    }
    // Traducción de título y settings
    const settingsTitle = document.querySelector('#profile-screen .settings-section h3');
    if (settingsTitle) settingsTitle.textContent = t('settingsTitle');
    const settingsItems = document.querySelectorAll('#profile-screen .settings-item');
    // Notificaciones
    if (settingsItems[0]) {
        const notifSpan = settingsItems[0].querySelector('span.flex-1');
        if (notifSpan) notifSpan.textContent = t('notifications') || 'Notificaciones';
        // Switch de notificaciones (placeholder visual)
        let notifSwitch = settingsItems[0].querySelector('.notif-switch');
        if (!notifSwitch) {
            notifSwitch = document.createElement('input');
            notifSwitch.type = 'checkbox';
            notifSwitch.className = 'notif-switch ml-2';
            notifSwitch.checked = !!user?.notifications;
            notifSwitch.onchange = (e) => {
                saveUser({ ...user, notifications: e.target.checked });
                showProfileFeedback('notif');
            };
            settingsItems[0].appendChild(notifSwitch);
        }
    }
    // Idioma
    if (settingsItems[1]) {
        const langSpan = settingsItems[1].querySelector('span.flex-1');
        if (langSpan) langSpan.textContent = t('language') || 'Idioma';
        const langSelect = document.getElementById('settings-lang-select');
        if (langSelect) {
            langSelect.value = getLanguage();
            langSelect.onchange = (e) => {
                if (typeof window.syncLanguage === 'function') {
                    window.syncLanguage(e.target.value);
                } else {
                    setLanguage(e.target.value);
                    if (typeof window.updateStaticTexts === 'function') window.updateStaticTexts();
                    if (typeof window.renderHomeView === 'function') window.renderHomeView(getUser());
                    if (typeof window.renderRestaurantsView === 'function') window.renderRestaurantsView(getLanguage(), () => {});
                    if (typeof window.renderEventsView === 'function') window.renderEventsView();
                }
            };
        }
    }
    // Privacidad
    if (settingsItems[2]) {
        const privacySpan = settingsItems[2].querySelector('span.flex-1');
        if (privacySpan) privacySpan.textContent = t('privacy') || 'Privacidad';
        // Modal o enlace a política de privacidad (placeholder)
        privacySpan.style.cursor = 'pointer';
        privacySpan.onclick = () => alert(t('privacy') + ': https://tusitio.com/privacidad');
    }
    // Ayuda
    if (settingsItems[3]) {
        const helpSpan = settingsItems[3].querySelector('span.flex-1');
        if (helpSpan) helpSpan.textContent = t('help') || 'Ayuda';
        helpSpan.style.cursor = 'pointer';
        helpSpan.onclick = () => alert(t('help') + ': support@tusitio.com');
    }
    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> ' + (t('logout') || 'Cerrar Sesión');
        logoutBtn.onclick = () => {
            clearUser();
            location.reload();
        };
    }
    // Elimina el bloque que muestra la contraseña en el perfil si existe
    const infoDiv = document.getElementById('profile-credentials-info');
    if (infoDiv) infoDiv.remove();
}

// Renderiza el formulario de edición de perfil
function renderProfileEdit(user) {
    const nameEl = document.getElementById('profileName');
    const emailEl = document.querySelector('.profile-email');
    nameEl.innerHTML = `<input id="profile-edit-name" class="bg-neutral-800 text-gold rounded px-2 py-1 w-full" placeholder="${t('profileName')}" value="${user?.name || ''}">`;
    emailEl.innerHTML = `<input id="profile-edit-email" class="bg-neutral-800 text-gold rounded px-2 py-1 w-full" placeholder="${t('profileEmail')}" value="${user?.email || ''}">`;
    // Botón guardar y cancelar
    if (!document.getElementById('profile-save-btn')) {
        const saveBtn = document.createElement('button');
        saveBtn.id = 'profile-save-btn';
        saveBtn.className = 'gold-button mt-2 w-full';
        saveBtn.textContent = t('saveProfile') || 'Guardar perfil';
        emailEl.parentElement.appendChild(saveBtn);
        saveBtn.onclick = () => {
            const newName = document.getElementById('profile-edit-name').value.trim();
            const newEmail = document.getElementById('profile-edit-email').value.trim();
            if (newName && newEmail && newEmail.includes('@')) {
                saveUser({ ...getUser(), name: newName, email: newEmail });
                // Forzar recarga del usuario actualizado
                setTimeout(() => renderProfileView(), 0);
                showProfileFeedback('success');
            } else {
                showProfileFeedback('error');
            }
        };
        const cancelBtn = document.createElement('button');
        cancelBtn.id = 'profile-cancel-btn';
        cancelBtn.className = 'mt-2 w-full text-xs text-gray-400 underline';
        cancelBtn.textContent = t('cancelProfile') || 'Cancelar';
        emailEl.parentElement.appendChild(cancelBtn);
        cancelBtn.onclick = () => renderProfileView();
    }
}

// Muestra feedback tras guardar/cancelar perfil y acciones
function showProfileFeedback(type) {
    let msg = document.getElementById('profile-feedback-msg');
    if (!msg) {
        msg = document.createElement('div');
        msg.id = 'profile-feedback-msg';
        msg.className = 'text-center mt-2';
        document.querySelector('.profile-email').parentElement.appendChild(msg);
    }
    if (type === 'success') {
        msg.textContent = t('profileSaved') || 'Perfil guardado correctamente';
        msg.className = 'text-green-400 text-center mt-2';
        setTimeout(() => { msg.remove(); }, 2000);
    } else if (type === 'notif') {
        msg.textContent = t('notifications') + ' ✓';
        msg.className = 'text-blue-400 text-center mt-2';
        setTimeout(() => { msg.remove(); }, 1500);
    } else {
        msg.textContent = t('profileError') || 'Introduce un nombre y email válidos';
        msg.className = 'text-red-400 text-center mt-2';
        setTimeout(() => { msg.remove(); }, 2000);
    }
}
