import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './TaxiBooking.css';

const TaxiBooking = () => {
  const { user } = useAuth();
  const [availableTaxis, setAvailableTaxis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [formData, setFormData] = useState({
    taxiType: '',
    bookingType: 'one-way',
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    returnDate: '',
    passengers: 1,
    luggage: 1,
    flightNumber: '',
    specialInstructions: '',
    distance: 20
  });

  useEffect(() => {
    fetchAvailableTaxis();
  }, []);

  const fetchAvailableTaxis = async () => {
    try {
      const response = await axios.get('/api/taxi/available');
      setAvailableTaxis(response.data);
      if (response.data.length > 0 && !formData.taxiType) {
        setFormData(prev => ({ ...prev, taxiType: response.data[0]._id }));
      }
    } catch (error) {
      console.error('Error fetching taxis:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePrice = () => {
    const selectedTaxi = availableTaxes.find(taxi => taxi._id === formData.taxiType);
    if (!selectedTaxi) return 0;

    const basePrice = selectedTaxi.basePrice;
    const distancePrice = selectedTaxi.pricePerKm * formData.distance;
    let totalPrice = basePrice + distancePrice;

    if (formData.bookingType === 'return') {
      totalPrice *= 2;
    }

    return totalPrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to book a taxi');
      return;
    }

    setLoading(true);
    try {
      const price = calculatePrice();
      const bookingData = {
        ...formData,
        price
      };

      const response = await axios.post('/api/taxi/book', bookingData);
      
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 3000);
      
      // Reset form
      setFormData({
        taxiType: availableTaxis[0]?._id || '',
        bookingType: 'one-way',
        pickupLocation: '',
        dropoffLocation: '',
        pickupDate: '',
        returnDate: '',
        passengers: 1,
        luggage: 1,
        flightNumber: '',
        specialInstructions: '',
        distance: 20
      });

      alert(`Booking successful! Booking ID: ${response.data._id}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedTaxi = availableTaxis.find(taxi => taxi._id === formData.taxiType);
  const price = calculatePrice();

  return (
    <div className="taxi-booking">
      <h2 className="booking-title">Book Your Airport Taxi</h2>
      <p className="booking-subtitle">Easy transportation between the airport and your accommodations</p>

      <div className="booking-types">
        <button
          className={`type-btn ${formData.bookingType === 'one-way' ? 'active' : ''}`}
          onClick={() => setFormData(prev => ({ ...prev, bookingType: 'one-way' }))}
        >
          One-way
        </button>
        <button
          className={`type-btn ${formData.bookingType === 'return' ? 'active' : ''}`}
          onClick={() => setFormData(prev => ({ ...prev, bookingType: 'return' }))}
        >
          Return
        </button>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Pickup Location</label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="Airport, address, or hotel"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Drop-off Location</label>
            <input
              type="text"
              name="dropoffLocation"
              value={formData.dropoffLocation}
              onChange={handleChange}
              placeholder="Address or hotel"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Pickup Date & Time</label>
            <input
              type="datetime-local"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {formData.bookingType === 'return' && (
            <div className="form-group">
              <label className="form-label">Return Date & Time</label>
              <input
                type="datetime-local"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Passengers</label>
            <select
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              className="form-input"
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Luggage</label>
            <select
              name="luggage"
              value={formData.luggage}
              onChange={handleChange}
              className="form-input"
              required
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num} bag{num !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Flight Number (Optional)</label>
            <input
              type="text"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleChange}
              placeholder="For flight tracking"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Distance (km)</label>
            <input
              type="number"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              min="1"
              max="200"
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="vehicle-selection">
          <h3 className="section-title">Select Your Vehicle</h3>
          <div className="vehicles-grid">
            {availableTaxis.map(taxi => (
              <div
                key={taxi._id}
                className={`vehicle-card ${formData.taxiType === taxi._id ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, taxiType: taxi._id }))}
              >
                <div className="vehicle-image">
                  <img src={taxi.image} alt={taxi.name} />
                </div>
                <div className="vehicle-info">
                  <h4>{taxi.name}</h4>
                  <p className="vehicle-description">{taxi.description}</p>
                  <div className="vehicle-specs">
                    <span className="spec">👤 {taxi.capacity} passengers</span>
                    <span className="spec">🧳 {taxi.luggage} bags</span>
                  </div>
                  <div className="vehicle-price">
                    <span className="price-label">From</span>
                    <span className="price">${taxi.basePrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="special-instructions">
          <label className="form-label">Special Instructions</label>
          <textarea
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            placeholder="Any special requirements or instructions..."
            className="form-textarea"
            rows="3"
          />
        </div>

        <div className="price-summary">
          <h3 className="section-title">Price Summary</h3>
          <div className="price-details">
            <div className="price-row">
              <span>Base fare:</span>
              <span>${selectedTaxi?.basePrice || 0}</span>
            </div>
            <div className="price-row">
              <span>Distance ({formData.distance} km × ${selectedTaxi?.pricePerKm || 0}/km):</span>
              <span>${(selectedTaxi?.pricePerKm || 0) * formData.distance}</span>
            </div>
            {formData.bookingType === 'return' && (
              <div className="price-row">
                <span>Return trip:</span>
                <span>× 2</span>
              </div>
            )}
            <div className="price-total">
              <span>Total Price:</span>
              <span className="total-amount">${price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button type="submit" className="book-btn" disabled={loading}>
          {loading ? 'Booking...' : 'Book Now'}
        </button>

        {bookingSuccess && (
          <div className="success-message">
            ✅ Booking successful! Check your dashboard for details.
          </div>
        )}
      </form>

      <div className="booking-info">
        <div className="info-card">
          <h3>🔄 Free Cancellation</h3>
          <p>Cancel for free up to 24 hours before your scheduled pickup time</p>
        </div>
        <div className="info-card">
          <h3>✈️ Flight Tracking</h3>
          <p>Driver tracks your flight and waits if it's delayed</p>
        </div>
        <div className="info-card">
          <h3>💰 Clear Pricing</h3>
          <p>No hidden costs - price confirmed upfront</p>
        </div>
      </div>
    </div>
  );
};

export default TaxiBooking;