const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: String,
  from: String,
  to: String,
  departureTime: String,
  arrivalTime: String,
  price: Number
});

module.exports = mongoose.model('Flight', flightSchema);
