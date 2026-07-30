const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    description: String,
    pricePerNight: Number,
    rating: Number,
    image: String,
    availableRooms: Number
});

module.exports = mongoose.model('Hotel', hotelSchema);
