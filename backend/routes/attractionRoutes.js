// backend/routes/attractionRoutes.js

const express = require('express');
const router = express.Router();

// Controllers
const attractionController = require('../controllers/attractionController');
const authController = require('../controllers/authController');

// ==========================
// ROUTES
// ==========================

// Get all attractions
router.get('/', attractionController.getAllAttractions);

// Book an attraction (user must be logged in)
router.post('/book', authController.protect, attractionController.bookAttraction);

// Get user's bookings
router.get('/my-bookings', authController.protect, attractionController.getUserBookings);

// Cancel a booking
router.delete(
  '/cancel/:bookingId',
  authController.protect,
  attractionController.cancelBooking
);

module.exports = router;
