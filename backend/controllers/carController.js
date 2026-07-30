const CarRental = require('../models/CarRental');
const CarBooking = require('../models/CarBooking');

/* =========================
   GET AVAILABLE CARS
========================= */
exports.getCars = async (req, res) => {
  try {
    const cars = await CarRental.find({}); // fetch ALL cars
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};


/* =========================
   BOOK A CAR
========================= */
exports.bookCar = async (req, res) => {
  try {
    const userId = req.user._id;
    const { carId, pickupDate, dropoffDate } = req.body;

    if (!carId || !pickupDate || !dropoffDate) {
      return res.status(400).json({ error: 'Car ID, pickup date, and dropoff date are required' });
    }

    const car = await CarRental.findById(carId);
    if (!car || !car.available) return res.status(400).json({ error: 'Car not available' });

    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);

    if (isNaN(start) || isNaN(end) || end <= start) {
      return res.status(400).json({ error: 'Invalid pickup or dropoff date' });
    }

    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = totalDays * car.pricePerDay;

    const booking = await CarBooking.create({
      user: userId,
      car: carId,
      pickupDate: start,
      dropoffDate: end,
      totalPrice
    });

    car.available = false;
    await car.save();

    res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Booking failed', details: err.message });
  }
};

/* =========================
   GET USER CAR BOOKINGS
========================= */
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await CarBooking.find({ user: req.user._id }).populate('car');
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

/* =========================
   CANCEL A CAR BOOKING
========================= */
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await CarBooking.findById(req.params.id).populate('car');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    // Make car available again
    if (booking.car) {
      booking.car.available = true;
      await booking.car.save();
    }

    // Delete the booking
    await CarBooking.deleteOne({ _id: booking._id });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Cancellation failed', details: err.message });
  }
};
