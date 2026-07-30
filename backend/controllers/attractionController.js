// controllers/attractionController.js
const Attraction = require('../models/Attraction');
const AttractionBooking = require('../models/AttractionBooking');

// GET all attractions
exports.getAllAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.status(200).json(attractions);
    } catch (error) {
        console.error('Error fetching attractions:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// BOOK an attraction
exports.bookAttraction = async (req, res) => {
    try {
        const { attractionId, date, numPeople } = req.body;

        if (!attractionId || !date || !numPeople) {
            return res.status(400).json({ message: 'Please provide all required fields: attractionId, date, numPeople' });
        }

        const attraction = await Attraction.findById(attractionId);
        if (!attraction) {
            return res.status(404).json({ message: 'Attraction not found' });
        }

        const peopleCount = Number(numPeople);
        if (isNaN(peopleCount) || peopleCount <= 0) {
            return res.status(400).json({ message: 'Invalid number of people' });
        }

        const bookingDate = new Date(date);
        if (isNaN(bookingDate.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        // Take userId from req.user (logged-in user)
        const userId = req.user._id;

        const totalPrice = attraction.pricePerPerson * peopleCount;

        const booking = new AttractionBooking({
            attraction: attractionId,
            user: userId,
            date: bookingDate,
            persons: peopleCount,
            totalPrice
        });

        await booking.save();

        res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
        console.error('Error booking attraction:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// GET bookings of a user
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await AttractionBooking.find({ user: req.user._id })
            .populate('attraction');
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// CANCEL a booking
exports.cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const userId = req.user._id;

        const booking = await AttractionBooking.findOne({ _id: bookingId, user: userId });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        await AttractionBooking.findByIdAndDelete(bookingId);

        res.status(200).json({ success: true, message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({ message: 'Failed to cancel booking', error });
    }
};
