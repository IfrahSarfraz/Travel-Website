import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  /* =========================
     STATES
  ========================= */
  const [hotelBookings, setHotelBookings] = useState([]);
  const [flightBookings, setFlightBookings] = useState([]);
  const [carBookings, setCarBookings] = useState([]);
  const [attractionBookings, setAttractionBookings] = useState([]);
  const [taxiBookings, setTaxiBookings] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(true);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [loadingCars, setLoadingCars] = useState(true);
  const [loadingAttractions, setLoadingAttractions] = useState(true);
  const [loadingTaxis, setLoadingTaxis] = useState(true);
  const [cancelling, setCancelling] = useState(null);
  const [error, setError] = useState('');

  /* =========================
     EFFECT: FETCH BOOKINGS
  ========================= */
  useEffect(() => {
    if (user) {
      fetchHotelBookings();
      fetchFlightBookings();
      fetchCarBookings();
      fetchAttractionBookings();
      fetchTaxiBookings();
    }
  }, [user]);

  /* =========================
     FETCH BOOKINGS FUNCTIONS
  ========================= */
  const fetchHotelBookings = async () => {
    try {
      setLoadingHotels(true);
      setError('');
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get('/api/hotels/my-bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHotelBookings(Array.isArray(res.data) ? res.data : res.data.bookings || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load hotel bookings.');
      setHotelBookings([]);
    } finally {
      setLoadingHotels(false);
    }
  };

  const fetchFlightBookings = async () => {
    try {
      setLoadingFlights(true);
      setError('');
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get('/api/flights/my-bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFlightBookings(Array.isArray(res.data) ? res.data : res.data.bookings || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load flight bookings.');
      setFlightBookings([]);
    } finally {
      setLoadingFlights(false);
    }
  };

  const fetchCarBookings = async () => {
    try {
      setLoadingCars(true);
      setError('');
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get('/api/cars/my-bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCarBookings(Array.isArray(res.data) ? res.data : res.data.bookings || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load car bookings.');
      setCarBookings([]);
    } finally {
      setLoadingCars(false);
    }
  };

  const fetchAttractionBookings = async () => {
    try {
      setLoadingAttractions(true);
      setError('');
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get('/api/attractions/my-bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAttractionBookings(Array.isArray(res.data) ? res.data : res.data.bookings || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load attraction bookings.');
      setAttractionBookings([]);
    } finally {
      setLoadingAttractions(false);
    }
  };

  const fetchTaxiBookings = async () => {
    try {
      setLoadingTaxis(true);
      setError('');
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get('/api/taxi/my-bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTaxiBookings(Array.isArray(res.data) ? res.data : res.data.bookings || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load taxi bookings.');
      setTaxiBookings([]);
    } finally {
      setLoadingTaxis(false);
    }
  };

  /* =========================
     CANCEL FUNCTIONS
  ========================= */
  const cancelHotelBooking = async (id) => {
    if (!window.confirm('Cancel this hotel booking?')) return;
    try {
      setCancelling(id);
      const token = localStorage.getItem('token');
      const res = await axios.delete(`/api/hotels/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.success) {
        setHotelBookings((prev) => prev.filter((b) => b._id !== id));
        alert('Hotel booking cancelled successfully.');
      } else {
        alert('Failed to cancel hotel booking.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to cancel hotel booking.');
    } finally {
      setCancelling(null);
    }
  };

  const cancelFlightBooking = async (id) => {
    if (!window.confirm('Cancel this flight booking?')) return;
    try {
      setCancelling(id);
      const token = localStorage.getItem('token');
      const res = await axios.delete(`/api/flights/cancel/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.success) {
        setFlightBookings((prev) => prev.filter((b) => b._id !== id));
        alert('Flight booking cancelled successfully.');
      } else {
        alert('Failed to cancel flight booking.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to cancel flight booking.');
    } finally {
      setCancelling(null);
    }
  };

  const cancelCarBooking = async (id) => {
    if (!window.confirm('Cancel this car booking?')) return;
    try {
      setCancelling(id);
      const token = localStorage.getItem('token');
      const res = await axios.delete(`/api/cars/cancel/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.success) {
        setCarBookings((prev) => prev.filter((b) => b._id !== id));
        alert('Car booking cancelled successfully.');
      } else {
        alert('Failed to cancel car booking.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to cancel car booking.');
    } finally {
      setCancelling(null);
    }
  };

  const cancelAttractionBooking = async (id) => {
    if (!window.confirm('Cancel this attraction booking?')) return;
    try {
      setCancelling(id);
      const token = localStorage.getItem('token');
      const res = await axios.delete(`/api/attractions/cancel/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.success) {
        setAttractionBookings((prev) => prev.filter((b) => b._id !== id));
        alert('Attraction booking cancelled successfully.');
      } else {
        alert('Failed to cancel attraction booking.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to cancel attraction booking.');
    } finally {
      setCancelling(null);
    }
  };

  const cancelTaxiBooking = async (id) => {
    if (!window.confirm('Cancel this taxi booking?')) return;
    try {
      setCancelling(id);
      const token = localStorage.getItem('token');
      const res = await axios.delete(`/api/taxi/cancel/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.success) {
        setTaxiBookings((prev) => prev.filter((b) => b._id !== id));
        alert('Taxi booking cancelled successfully.');
      } else {
        alert('Failed to cancel taxi booking.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to cancel taxi booking.');
    } finally {
      setCancelling(null);
    }
  };

  /* =========================
     HELPERS
  ========================= */
  const formatDate = (d) => {
    if (!d) return 'N/A';
    const date = new Date(d);
    return isNaN(date) ? 'N/A' : date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (d) => {
    if (!d) return 'N/A';
    const date = new Date(d);
    return isNaN(date) ? 'N/A' : date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (p) =>
    (parseFloat(p) || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const totalSpent = useMemo(() => {
    const hotelTotal = hotelBookings.reduce((sum, b) => sum + (parseFloat(b.totalPrice) || 0), 0);
    const flightTotal = flightBookings.reduce((sum, b) => sum + (parseFloat(b.flight?.price) || 0), 0);
    const carTotal = carBookings.reduce((sum, b) => sum + (parseFloat(b.totalPrice) || 0), 0);
    const attractionTotal = attractionBookings.reduce((sum, b) => sum + (parseFloat(b.totalPrice) || 0), 0);
    const taxiTotal = taxiBookings.reduce((sum, b) => sum + (parseFloat(b.totalPrice) || 0), 0);
    return hotelTotal + flightTotal + carTotal + attractionTotal + taxiTotal;
  }, [hotelBookings, flightBookings, carBookings, attractionBookings, taxiBookings]);

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* WELCOME SECTION */}
        <div className="welcome-section">
          <h1>Welcome back, <span className="user-name">{user?.name}</span>!</h1>
          <p className="welcome-subtitle">Manage all your bookings in one place</p>
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}

        <div className="dashboard-layout">
          {/* SIDEBAR */}
          <div className="dashboard-sidebar">
            {/* STATS CARD */}
            <div className="stats-card">
              <div className="stats-header">
                <i className="fas fa-chart-line"></i>
                <h3>Your Stats</h3>
              </div>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-icon hotel-icon">
                    <i className="fas fa-hotel"></i>
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{hotelBookings.length}</span>
                    <span className="stat-label">Hotel Bookings</span>
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon flight-icon">
                    <i className="fas fa-plane"></i>
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{flightBookings.length}</span>
                    <span className="stat-label">Flight Bookings</span>
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon car-icon">
                    <i className="fas fa-car"></i>
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{carBookings.length}</span>
                    <span className="stat-label">Car Bookings</span>
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon attraction-icon">
                    <i className="fas fa-landmark"></i>
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{attractionBookings.length}</span>
                    <span className="stat-label">Attraction Bookings</span>
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon taxi-icon">
                    <i className="fas fa-taxi"></i>
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{taxiBookings.length}</span>
                    <span className="stat-label">Taxi Bookings</span>
                  </div>
                </div>
                
                <div className="stat-item total-spent">
                  <div className="stat-icon total-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">${formatPrice(totalSpent)}</span>
                    <span className="stat-label">Total Spent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="quick-actions">
              <div className="actions-header">
                <i className="fas fa-bolt"></i>
                <h3>Quick Actions</h3>
              </div>
              <div className="actions-grid">
                <Link to="/hotels" className="action-btn hotel-btn">
                  <i className="fas fa-hotel"></i>
                  <span>Book Hotel</span>
                </Link>
                <Link to="/flights" className="action-btn flight-btn">
                  <i className="fas fa-plane"></i>
                  <span>Book Flight</span>
                </Link>
                <Link to="/cars" className="action-btn car-btn">
                  <i className="fas fa-car"></i>
                  <span>Book Car</span>
                </Link>
                <Link to="/attractions" className="action-btn attraction-btn">
                  <i className="fas fa-landmark"></i>
                  <span>Book Attraction</span>
                </Link>
                <Link to="/taxi" className="action-btn taxi-btn">
                  <i className="fas fa-taxi"></i>
                  <span>Book Taxi</span>
                </Link>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="dashboard-main">
            {/* HOTEL BOOKINGS - Updated to match image exactly */}
            <div className="bookings-section">
              <div className="section-header">
                <i className="fas fa-hotel section-icon"></i>
                <h2>My Hotel Reservations</h2>
              </div>
              {loadingHotels ? (
                <div className="loading-state">
                  <i className="fas fa-spinner fa-spin"></i>
                  <p>Loading hotel bookings...</p>
                </div>
              ) : hotelBookings.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-bed"></i>
                  <p>No hotel bookings yet.</p>
                  <Link to="/hotels" className="empty-btn">Book a Hotel</Link>
                </div>
              ) : (
                <div className="bookings-grid hotel-grid">
                  {hotelBookings.map((b) => (
                    <div key={b._id} className="booking-card">
                      <div className="booking-header">
                        <h4 className="booking-title">{b.hotel?.name || 'Unnamed Hotel'}</h4>
                        <div className="booking-price">${formatPrice(b.totalPrice)}</div>
                      </div>
                      
                      <div className="booking-details-grid">
                        <div className="booking-detail-row">
                          <div className="booking-detail-item">
                            <span className="detail-label">Check-in:</span>
                            <span className="detail-value">{formatDate(b.checkInDate)}</span>
                          </div>
                          <div className="booking-detail-item">
                            <span className="detail-label">Check-out:</span>
                            <span className="detail-value">{formatDate(b.checkOutDate)}</span>
                          </div>
                        </div>
                        
                        <div className="booking-detail-row">
                          <div className="booking-detail-item">
                            <span className="detail-label">Guests:</span>
                            <span className="detail-value">{b.guests || 1}</span>
                          </div>
                          <div className="booking-detail-item">
                            <span className="detail-label">Location:</span>
                            <span className="detail-value">{b.hotel?.city || 'Unknown'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="booking-divider"></div>
                      
                      <div className="booking-actions">
                        <button 
                          className={`cancel-btn ${cancelling === b._id ? 'cancelling' : ''}`} 
                          onClick={() => cancelHotelBooking(b._id)}
                          disabled={cancelling === b._id}
                        >
                          {cancelling === b._id ? (
                            <>
                              <i className="fas fa-spinner fa-spin"></i> Cancelling...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-times"></i> Cancel Booking
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FLIGHT BOOKINGS - Updated with same layout as hotels */}
            <div className="bookings-section">
              <div className="section-header">
                <i className="fas fa-plane section-icon"></i>
                <h2>My Flight Bookings</h2>
              </div>
              {loadingFlights ? (
                <div className="loading-state">
                  <i className="fas fa-spinner fa-spin"></i>
                  <p>Loading flight bookings...</p>
                </div>
              ) : flightBookings.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-plane"></i>
                  <p>No flight bookings yet.</p>
                  <Link to="/flights" className="empty-btn">Book a Flight</Link>
                </div>
              ) : (
                <div className="bookings-grid flight-grid">
                  {flightBookings.map((b) => (
                    <div key={b._id} className="booking-card">
                      <div className="booking-header">
                        <h4 className="booking-title">{b.flight?.airline || 'Unknown Airline'}</h4>
                        <div className="booking-price">${formatPrice(b.flight?.price)}</div>
                      </div>
                      
                      <div className="booking-details-grid">
                        <div className="booking-detail-row">
                          <div className="booking-detail-item">
                            <span className="detail-label">From:</span>
                            <span className="detail-value">{b.flight?.from || 'Unknown'}</span>
                          </div>
                          <div className="booking-detail-item">
                            <span className="detail-label">To:</span>
                            <span className="detail-value">{b.flight?.to || 'Unknown'}</span>
                          </div>
                        </div>
                        
                        
                        <div className="booking-detail-row">
                          <div className="booking-detail-item">
                            <span className="detail-label">Class:</span>
                            <span className="detail-value">{b.flight?.class || 'Economy'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="booking-divider"></div>
                      
                      <div className="booking-actions">
                        <button 
                          className={`cancel-btn ${cancelling === b._id ? 'cancelling' : ''}`} 
                          onClick={() => cancelFlightBooking(b._id)}
                          disabled={cancelling === b._id}
                        >
                          {cancelling === b._id ? (
                            <>
                              <i className="fas fa-spinner fa-spin"></i> Cancelling...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-times"></i> Cancel Flight
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CAR BOOKINGS - Updated with same layout */}
            <div className="bookings-section">
              <div className="section-header">
                <i className="fas fa-car section-icon"></i>
                <h2>My Car Rentals</h2>
              </div>
              {loadingCars ? (
                <div className="loading-state">
                  <i className="fas fa-spinner fa-spin"></i>
                  <p>Loading car bookings...</p>
                </div>
              ) : carBookings.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-car"></i>
                  <p>No car bookings yet.</p>
                  <Link to="/cars" className="empty-btn">Book a Car</Link>
                </div>
              ) : (
                <div className="bookings-grid">
                  {carBookings.map((b) => (
                    <div key={b._id} className="booking-card">
                      <div className="booking-header">
                        <h4 className="booking-title">{b.car?.name || 'Unknown Car'}</h4>
                        <div className="booking-price">${formatPrice(b.totalPrice)}</div>
                      </div>
                      
                      <div className="booking-details-grid">
                        <div className="booking-detail-row">
                          <div className="booking-detail-item">
                            <span className="detail-label">Pickup:</span>
                            <span className="detail-value">{formatDate(b.pickupDate)}</span>
                          </div>
                          <div className="booking-detail-item">
                            <span className="detail-label">Dropoff:</span>
                            <span className="detail-value">{formatDate(b.dropoffDate)}</span>
                          </div>
                        </div>
                        
                        <div className="booking-detail-row">
                          <div className="booking-detail-item">
                            <span className="detail-label">Type:</span>
                            <span className="detail-value">{b.car?.type || 'Unknown'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="booking-divider"></div>
                      
                      <div className="booking-actions">
                        <button 
                          className={`cancel-btn ${cancelling === b._id ? 'cancelling' : ''}`} 
                          onClick={() => cancelCarBooking(b._id)}
                          disabled={cancelling === b._id}
                        >
                          {cancelling === b._id ? (
                            <>
                              <i className="fas fa-spinner fa-spin"></i> Cancelling...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-times"></i> Cancel Rental
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ATTRACTION BOOKINGS - Updated with same layout */}
            <div className="bookings-section">
              <div className="section-header">
                <i className="fas fa-landmark section-icon"></i>
                <h2>My Attraction Bookings</h2>
              </div>
              {loadingAttractions ? (
                <div className="loading-state">
                  <i className="fas fa-spinner fa-spin"></i>
                  <p>Loading attraction bookings...</p>
                </div>
              ) : attractionBookings.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-landmark"></i>
                  <p>No attraction bookings yet.</p>
                  <Link to="/attractions" className="empty-btn">Book Attraction</Link>
                </div>
              ) : (
                <div className="bookings-grid">
                  {attractionBookings.map((b) => (
                    <div key={b._id} className="booking-card">
                      <div className="booking-header">
                        <h4 className="booking-title">{b.attraction?.name || 'Unknown Attraction'}</h4>
                        <div className="booking-price">${formatPrice(b.totalPrice)}</div>
                      </div>
                      
                      <div className="booking-details-grid">
                        <div className="booking-detail-row">
                          <div className="booking-detail-item">
                            <span className="detail-label">Date:</span>
                            <span className="detail-value">{formatDate(b.date)}</span>
                          </div>
                          <div className="booking-detail-item">
                            <span className="detail-label">Location:</span>
                            <span className="detail-value">{b.attraction?.location || 'Unknown'}</span>
                          </div>
                        </div>
                      
                      </div>
                      
                      <div className="booking-divider"></div>
                      
                      <div className="booking-actions">
                        <button 
                          className={`cancel-btn ${cancelling === b._id ? 'cancelling' : ''}`} 
                          onClick={() => cancelAttractionBooking(b._id)}
                          disabled={cancelling === b._id}
                        >
                          {cancelling === b._id ? (
                            <>
                              <i className="fas fa-spinner fa-spin"></i> Cancelling...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-times"></i> Cancel Booking
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TAXI BOOKINGS - Updated with same layout */}
            <div className="bookings-section">
              <div className="section-header">
                <i className="fas fa-taxi section-icon"></i>
                <h2>My Taxi Bookings</h2>
              </div>
              {loadingTaxis ? (
                <div className="loading-state">
                  <i className="fas fa-spinner fa-spin"></i>
                  <p>Loading taxi bookings...</p>
                </div>
              ) : taxiBookings.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-taxi"></i>
                  <p>No taxi bookings yet.</p>
                  <Link to="/taxi" className="empty-btn">Book Taxi</Link>
                </div>
              ) : (
                <div className="bookings-grid">
                  {taxiBookings.map((b) => (
                    <div key={b._id} className="booking-card">
                      <div className="booking-header">
                        <h4 className="booking-title">{b.taxi?.name || 'Taxi Service'}</h4>
                        <div className="booking-price">${formatPrice(b.totalPrice)}</div>
                      </div>
                      
                      <div className="booking-details-grid">
                        <div className="booking-detail-row">
                          <div className="booking-detail-item">
                            <span className="detail-label">Pickup:</span>
                            <span className="detail-value">{b.pickupLocation || 'Unknown'}</span>
                          </div>
                          <div className="booking-detail-item">
                            <span className="detail-label">Destination:</span>
                            <span className="detail-value">{b.destinationAirport || 'Unknown'}</span>
                          </div>
                        </div>
                        
                        <div className="booking-detail-row">
                          <div className="booking-detail-item">
                            <span className="detail-label">Date:</span>
                            <span className="detail-value">{formatDate(b.date)}</span>
                          </div>
                          <div className="booking-detail-item">
                            <span className="detail-label">Passengers:</span>
                            <span className="detail-value">{b.passengers || 1}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="booking-divider"></div>
                      
                      <div className="booking-actions">
                        <button 
                          className={`cancel-btn ${cancelling === b._id ? 'cancelling' : ''}`} 
                          onClick={() => cancelTaxiBooking(b._id)}
                          disabled={cancelling === b._id}
                        >
                          {cancelling === b._id ? (
                            <>
                              <i className="fas fa-spinner fa-spin"></i> Cancelling...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-times"></i> Cancel Ride
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;