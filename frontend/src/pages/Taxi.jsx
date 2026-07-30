import React, { useState } from 'react';
import axios from 'axios';
import './Taxi.css';

const airports = [
  'Jinnah Karachi',
  'Allama Iqbal Lahore',
  'Islamabad Intl',
  'Quetta Intl',
  'Peshawar Intl'
];

const Taxi = () => {
  const [taxis, setTaxis] = useState([]);
  const [search, setSearch] = useState({
    pickup: '',
    destination: '',
    date: '',
    passengers: 1
  });
  const [bookingState, setBookingState] = useState({});
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noSearchResults, setNoSearchResults] = useState(false);

  /* =========================
     SEARCH TAXIS
  ========================= */
  const handleSearch = async () => {
    setSearched(true);
    setLoading(true);
    setNoSearchResults(false);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/taxi/search?passengers=${search.passengers}`
      );

      const shuffled = res.data.sort(() => 0.5 - Math.random());
      const filtered = shuffled.slice(0, 4);

      setTaxis(filtered);
      if (filtered.length === 0) setNoSearchResults(true);
    } catch (err) {
      console.error(err);
      setTaxis([]);
      setNoSearchResults(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const clearSearch = () => {
    setSearch({
      pickup: '',
      destination: '',
      date: '',
      passengers: 1
    });
    setTaxis([]);
    setSearched(false);
    setNoSearchResults(false);
  };

  /* =========================
     BOOKING HANDLERS
  ========================= */
  const handleBookNow = (taxiId) => {
    setBookingState((prev) => ({
      ...prev,
      [taxiId]: {
        showFields: true,
        pickup: '',
        destination: '',
        date: '',
        passengers: 1
      }
    }));
  };

  const handleConfirmBooking = async (taxi) => {
    const booking = bookingState[taxi._id];
    if (!booking) return;

    const { pickup, destination, date, passengers } = booking;

    if (!pickup || !destination || !date || !passengers) {
      alert('Please fill all booking details');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to book a taxi');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/taxi/book',
        {
          taxiId: taxi._id,
          pickupLocation: pickup,
          destinationAirport: destination,
          date,
          passengers
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Booking confirmed!');
      setBookingState((prev) => ({
        ...prev,
        [taxi._id]: { showFields: false }
      }));
    } catch (err) {
      console.error(err);
      alert('Failed to book taxi');
    }
  };

  return (
    <div className="taxi-container">
      {/* ================= SEARCH BOX ================= */}
      <div className="search-box">
        <h2>
          <i className="fas fa-search"></i> Search Airport Taxis
        </h2>

        <div className="search-bar">
          {/* Input fields row */}
          <div className="search-input-row">
            <div className="input-with-icon">
              <i className="fas fa-map-marker-alt"></i>
              <input
                type="text"
                placeholder="Pick-up Location"
                value={search.pickup}
                onChange={(e) => setSearch({ ...search, pickup: e.target.value })}
                onKeyPress={handleKeyPress}
                className="search-input"
              />
            </div>

            <div className="input-with-icon">
              <i className="fas fa-plane"></i>
              <select
                value={search.destination}
                onChange={(e) => setSearch({ ...search, destination: e.target.value })}
                className="search-input"
              >
                <option value="">Destination Airport</option>
                {airports.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="input-with-icon">
              <i className="fas fa-calendar-alt"></i>
              <input
                type="date"
                value={search.date}
                onChange={(e) => setSearch({ ...search, date: e.target.value })}
                onKeyPress={handleKeyPress}
                className="search-input"
              />
            </div>

            <div className="input-with-icon">
              <i className="fas fa-users"></i>
              <input
                type="number"
                min="1"
                placeholder="Passengers"
                value={search.passengers}
                onChange={(e) => setSearch({ ...search, passengers: e.target.value })}
                onKeyPress={handleKeyPress}
                className="search-input"
              />
            </div>
          </div>
          
          {/* Search button row */}
          <div className="search-button-row">
            <button className="search-button" onClick={handleSearch}>
              <i className="fas fa-search"></i> Search
            </button>
          </div>
        </div>

        {searched && (
          <div className="clear-search-container">
            <button className="clear-search-button" onClick={clearSearch}>
              <i className="fas fa-times"></i> Clear Search
            </button>
          </div>
        )}
      </div>

      {/* ================= SEARCH MESSAGE ================= */}
      {searched && noSearchResults && (
        <div className="search-message">
          <i className="fas fa-info-circle"></i>
          <div>
            <p className="message-title">No taxis available</p>
            <p className="message-subtitle">Try different search criteria</p>
          </div>
        </div>
      )}

      {/* ================= AVAILABLE TAXIS ================= */}
      {searched && (
        <div className="available-taxis-section">
          <h2>Available Taxis</h2>

          {loading ? (
            <div className="loading-container">
              <i className="fas fa-taxi fa-spin"></i>
              <p>Loading taxis...</p>
            </div>
          ) : (
            <div className="taxi-grid">
              {taxis.map((taxi) => {
                const booking = bookingState[taxi._id] || {};
                return (
                  <div key={taxi._id} className="taxi-card">
                    <div className="taxi-image-container">
                      <img src={taxi.image} alt={taxi.name} className="taxi-image" />
                    </div>

                    <div className="taxi-details">
                      <h3>{taxi.name}</h3>
                      <p className="taxi-description">{taxi.description}</p>

                      <div className="price-section">
                        <div className="price">${taxi.basePrice}</div>
                        <div className="price-label">base fare</div>
                      </div>

                      {!booking.showFields ? (
                        <button
                          className="book-button"
                          onClick={() => handleBookNow(taxi._id)}
                        >
                          BOOK NOW
                        </button>
                      ) : (
                        <div className="booking-fields">
                          <input
                            type="text"
                            placeholder="Pick-up Location"
                            value={booking.pickup}
                            onChange={(e) =>
                              setBookingState((p) => ({
                                ...p,
                                [taxi._id]: { ...p[taxi._id], pickup: e.target.value }
                              }))
                            }
                          />

                          <select
                            value={booking.destination}
                            onChange={(e) =>
                              setBookingState((p) => ({
                                ...p,
                                [taxi._id]: { ...p[taxi._id], destination: e.target.value }
                              }))
                            }
                          >
                            <option value="">Select Airport</option>
                            {airports.map((a) => (
                              <option key={a} value={a}>{a}</option>
                            ))}
                          </select>

                          <input
                            type="date"
                            value={booking.date}
                            onChange={(e) =>
                              setBookingState((p) => ({
                                ...p,
                                [taxi._id]: { ...p[taxi._id], date: e.target.value }
                              }))
                            }
                          />

                          <input
                            type="number"
                            min="1"
                            value={booking.passengers}
                            onChange={(e) =>
                              setBookingState((p) => ({
                                ...p,
                                [taxi._id]: { ...p[taxi._id], passengers: e.target.value }
                              }))
                            }
                          />

                          <button
                            className="confirm-button"
                            onClick={() => handleConfirmBooking(taxi)}
                          >
                            CONFIRM BOOKING
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Taxi;