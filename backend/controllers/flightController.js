const Flight = require('../models/Flight');
const FlightBooking = require('../models/FlightBooking');
const { v4: uuidv4 } = require('uuid'); // for unique booking reference

// ------------------- GET ALL FLIGHTS -------------------
exports.getFlights = async (req, res) => {
  try {
    const { from, to } = req.query;

    let flights = await Flight.find();

    // Filter by origin and destination if provided
    if (from && to) {
      flights = flights.filter(
        f =>
          f.from.toLowerCase() === from.toLowerCase() &&
          f.to.toLowerCase() === to.toLowerCase()
      );
    }

    res.json(flights);
  } catch (err) {
    console.error('Error fetching flights:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ------------------- BOOK A FLIGHT -------------------
exports.bookFlight = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    const { flightId } = req.body;
    if (!flightId) {
      return res.status(400).json({ message: 'Flight ID is required' });
    }

    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    // Create booking with unique reference
    const booking = await FlightBooking.create({
      user: req.user.id,
      flight: flightId,
      bookingReference: uuidv4()
    });

    res.status(201).json({
      success: true,
      booking
    });
  } catch (err) {
    console.error('Error booking flight:', err);
    res.status(500).json({ message: 'Failed to book flight' });
  }
};

// ------------------- GET MY BOOKINGS -------------------
exports.getMyFlights = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    // Find bookings for this user and populate flight info
    const bookings = await FlightBooking.find({ user: req.user.id }).populate('flight');

    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ------------------- CANCEL A BOOKING -------------------
exports.cancelFlight = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    // Delete booking for this user by ID
    const deletedBooking = await FlightBooking.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ success: true, message: 'Booking cancelled' });
  } catch (err) {
    console.error('Error cancelling booking:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
