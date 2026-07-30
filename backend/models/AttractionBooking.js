const mongoose = require('mongoose');

const AttractionBookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    attraction: { type: mongoose.Schema.Types.ObjectId, ref: 'Attraction', required: true },
    date: { type: Date, required: true },
    persons: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AttractionBooking', AttractionBookingSchema);
