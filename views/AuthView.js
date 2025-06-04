// views/AuthView.js
// Vista para el modal de autenticación
// Orquesta el renderizado usando el componente AuthModal

import { AuthModal } from '../components/AuthModal.js';

export function showAuthView(callbacks) {
    console.log("showAuthView llamado con:", callbacks);
    const modal = AuthModal(callbacks); // <-- PASAR callbacks como objeto
    document.body.appendChild(modal);
    // Permitir cerrar con Escape
    setTimeout(() => modal.focus && modal.focus(), 100);
}
