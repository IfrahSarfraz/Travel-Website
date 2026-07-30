// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/api', (req, res) => {
    res.json({ 
        message: 'Travel Booking API is running',
        endpoints: {
            hotels: {
                search: 'GET /api/hotels/search',
                all: 'GET /api/hotels/all',
                reserve: 'POST /api/hotels/reserve',
                myBookings: 'GET /api/hotels/my-bookings',
                cancelBooking: 'DELETE /api/hotels/bookings/:id'
            },
            flights: 'GET /api/flights',
            cars: 'GET /api/cars',
            taxi: 'GET /api/taxi',
            attractions: 'GET /api/attractions'
        }
    });
});

// Route logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/taxi', require('./routes/taxiRoutes'));
app.use('/api/hotels', require('./routes/hotelRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/attractions', require('./routes/attractionRoutes'));
app.use('/api/flights', require('./routes/flightRoutes'));

// 404 handler for undefined API routes
app.use('/api', (req, res) => {
    res.status(404).json({
        success: false,
        message: `❌ Route not found: ${req.method} ${req.originalUrl}`
    });
});

// 404 handler for any other undefined route (non-API)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ 
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🔗 http://localhost:${PORT}/api`);
});
