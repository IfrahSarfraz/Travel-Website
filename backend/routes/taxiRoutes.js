const express = require('express');
const router = express.Router();
const { bookTaxi, getMyBookings, cancelBooking, searchTaxis } = require('../controllers/taxiController');
const { protect } = require('../middleware/authMiddleware');

// Search taxis
router.get('/search', searchTaxis);

// Book taxi
router.post('/book', protect, bookTaxi);

// Get my bookings
router.get('/my-bookings', protect, getMyBookings);

// Cancel booking
router.delete('/cancel/:id', protect, cancelBooking);

module.exports = router;
