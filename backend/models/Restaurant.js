const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        es: { type: String, required: true },
        en: { type: String },
        fr: { type: String },
        de: { type: String },
        ru: { type: String }
    },
    address: { type: String, required: true },
    phone: { type: String },
    description: {
        es: { type: String },
        en: { type: String },
        fr: { type: String },
        de: { type: String },
        ru: { type: String }
    },
    image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
