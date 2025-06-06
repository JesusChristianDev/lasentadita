const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Puede ser vacío para invitados
    avatar: { type: String }, // base64 o URL
    role: { type: String, enum: ['user', 'admin', 'guest'], default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
