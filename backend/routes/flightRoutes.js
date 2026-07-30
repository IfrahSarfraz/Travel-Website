const express = require('express');
const router = express.Router();

const {
  getFlights,
  bookFlight,
  getMyFlights,
  cancelFlight
} = require('../controllers/flightController');

const { protect } = require('../middleware/authMiddleware'); // must set req.user

router.get('/', getFlights);
router.post('/book', protect, bookFlight);
router.get('/my-bookings', protect, getMyFlights);
router.delete('/cancel/:id', protect, cancelFlight);

module.exports = router;
