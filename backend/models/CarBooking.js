const mongoose = require('mongoose');

const carBookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'CarRental', required: true },
  pickupDate: { type: Date, required: true },
  dropoffDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('CarBooking', carBookingSchema);
