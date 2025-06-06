const express = require('express');
const Reservation = require('../models/Reservation');
const router = express.Router();

// Get all reservations
// GET /api/reservations?userId=...&restaurantId=...
router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.userId) filter.user = req.query.userId;
        if (req.query.restaurantId) filter.restaurant = req.query.restaurantId;
        const reservations = await Reservation.find(filter).populate('user').populate('restaurant');
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create reservation
router.post('/', async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.status(201).json(reservation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
