const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const { protect } = require('../middleware/authMiddleware');

// Public: list available cars
router.get('/', carController.getCars);

// Authenticated routes
router.post('/book', protect, carController.bookCar);
router.get('/my-bookings', protect, carController.getUserBookings);
router.delete('/cancel/:id', protect, carController.cancelBooking);

module.exports = router;
