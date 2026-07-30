// models/Attraction.js
const mongoose = require('mongoose');

const AttractionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    pricePerPerson: { type: Number, required: true },
    image: { type: String },
    location: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attraction', AttractionSchema);
