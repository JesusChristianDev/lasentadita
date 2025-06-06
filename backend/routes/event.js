const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Get all events
// GET /api/events?lang=es
router.get('/', async (req, res) => {
    try {
        const lang = req.query.lang || 'es';
        const events = await Event.find().populate('restaurant');
        // Devuelve solo el idioma solicitado
        const data = events.map(ev => ({
            _id: ev._id,
            restaurant: ev.restaurant?._id,
            title: ev.title[lang] || ev.title['es'],
            description: ev.description[lang] || ev.description['es'],
            date: ev.date,
            image: ev.image
        }));
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create event
router.post('/', async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
