const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    title: {
        es: { type: String, required: true },
        en: { type: String },
        fr: { type: String },
        de: { type: String },
        ru: { type: String }
    },
    description: {
        es: { type: String },
        en: { type: String },
        fr: { type: String },
        de: { type: String },
        ru: { type: String }
    },
    date: { type: Date, required: true },
    image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
