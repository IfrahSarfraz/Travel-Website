const mongoose = require('mongoose');

const taxiSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true, // standard, luxury, van, etc.
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    capacity: {
      type: Number,
      required: true,
    },

    luggage: {
      type: Number,
      required: true,
    },

    pricePerKm: {
      type: Number,
      required: true,
    },

    basePrice: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Taxi', taxiSchema);
