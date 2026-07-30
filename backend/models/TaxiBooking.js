const mongoose = require('mongoose');

const TaxiBookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taxi: { type: mongoose.Schema.Types.ObjectId, ref: 'Taxi', required: true },
  pickupLocation: { type: String, required: true },
  destinationAirport: { type: String, required: true },
  date: { type: Date, required: true },
  passengers: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TaxiBooking', TaxiBookingSchema);
