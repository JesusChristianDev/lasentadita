const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// Get all restaurants
// GET /api/restaurants?lang=es
router.get('/', async (req, res) => {
    try {
        const lang = req.query.lang || 'es';
        const restaurants = await Restaurant.find();
        // Devuelve solo el idioma solicitado
        const data = restaurants.map(r => ({
            _id: r._id,
            name: r.name[lang] || r.name['es'],
            address: r.address,
            phone: r.phone,
            description: r.description[lang] || r.description['es'],
            image: r.image
        }));
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create restaurant
router.post('/', async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
