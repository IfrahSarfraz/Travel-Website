const mongoose = require('mongoose');

const carRentalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  capacity: Number,
  luggage: Number,
  pricePerDay: Number,
  image: String,
  available: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('CarRental', carRentalSchema);
