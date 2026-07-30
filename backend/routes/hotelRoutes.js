const router = require('express').Router();
const {
  searchHotels,
  bookHotel,
  myBookings,
  cancelBooking
} = require('../controllers/hotelController');

const { protect } = require('../middleware/authMiddleware'); // ✅ FIX

router.get('/search', searchHotels);
router.post('/reserve', protect, bookHotel);      // ✅ use protect
router.get('/my-bookings', protect, myBookings);
router.delete('/bookings/:id', protect, cancelBooking);

module.exports = router;
