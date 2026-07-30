const Hotel = require('../models/Hotel');
const HotelBooking = require('../models/HotelBooking');

/* ================================
   GET ALL / SEARCH HOTELS
================================ */
exports.searchHotels = async (req, res) => {
  try {
    const { name, city } = req.query;

    let filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (city) filter.city = { $regex: city, $options: 'i' };

    const hotels = await Hotel.find(filter).limit(10);
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch hotels' });
  }
};

/* ================================
   BOOK HOTEL (FIXED + VALIDATED)
================================ */
exports.bookHotel = async (req, res) => {
  try {
    const { hotelId, checkInDate, checkOutDate, guests } = req.body;

    /* ---- BASIC VALIDATION ---- */
    if (!hotelId || !checkInDate || !checkOutDate || !guests) {
      return res.status(400).json({
        message: 'All booking fields are required'
      });
    }

    if (guests < 1) {
      return res.status(400).json({
        message: 'Guests must be at least 1'
      });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    /* ---- DATE VALIDATION ---- */
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      return res.status(400).json({
        message: 'Check-in date cannot be in the past'
      });
    }

    if (checkOut <= checkIn) {
      return res.status(400).json({
        message: 'Check-out date must be after check-in date'
      });
    }

    /* ---- PRICE CALCULATION ---- */
    const nights =
      Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      return res.status(400).json({
        message: 'Invalid booking duration'
      });
    }

    const totalPrice = nights * hotel.pricePerNight;

    /* ---- CREATE BOOKING ---- */
    const booking = await HotelBooking.create({
      user: req.user.id,
      hotel: hotelId,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice
    });

    res.status(201).json({
      success: true,
      booking
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Booking failed' });
  }
};

/* ================================
   MY BOOKINGS
================================ */
exports.myBookings = async (req, res) => {
  try {
    const bookings = await HotelBooking
      .find({ user: req.user.id })
      .populate('hotel');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

/* ================================
   CANCEL BOOKING
================================ */
exports.cancelBooking = async (req, res) => {
  try {
    await HotelBooking.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Cancel failed' });
  }
};
