const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Puede ser null para invitado
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    date: { type: Date, required: true },
    guests: { type: Number, required: true },
    name: { type: String }, // nombre de reserva para invitado
    email: { type: String }, // email de reserva para invitado
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
