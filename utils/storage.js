// utils/storage.js
// Utilidad para persistencia de datos en localStorage
// Permite guardar, obtener y limpiar el usuario actual

export function saveUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    // Refuerzo: actualiza también el array de usuarios registrados
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
        users[idx] = { ...users[idx], ...user };
    } else {
        users.push(user);
    }
    localStorage.setItem('users', JSON.stringify(users));
}

export function getUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

export function clearUser() {
    localStorage.removeItem('currentUser');
}
