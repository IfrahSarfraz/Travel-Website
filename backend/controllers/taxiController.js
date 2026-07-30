const Taxi = require('../models/Taxi');
const TaxiBooking = require('../models/TaxiBooking');

// Random taxi search
exports.searchTaxis = async (req, res) => {
  try {
    const taxis = await Taxi.find();
    // Pick 4 random taxis
    const shuffled = taxis.sort(() => 0.5 - Math.random());
    res.json(shuffled.slice(0, 4));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Book taxi
exports.bookTaxi = async (req, res) => {
  try {
    const { taxiId, pickupLocation, destinationAirport, date, passengers } = req.body;
    const taxi = await Taxi.findById(taxiId);
    if (!taxi) return res.status(404).json({ message: 'Taxi not found' });

    const totalPrice = taxi.basePrice + (Math.random() * 20); // Example random pricing
    const booking = new TaxiBooking({
      user: req.user._id,
      taxi: taxiId,
      pickupLocation,
      destinationAirport,
      date,
      passengers,
      totalPrice
    });
    await booking.save();
    res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's taxi bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await TaxiBooking.find({ user: req.user._id }).populate('taxi');
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await TaxiBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    if (booking.user.toString() !== req.user._id.toString())
      return res.status(403).json({ success: false, message: 'Unauthorized' });

    await booking.deleteOne();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
