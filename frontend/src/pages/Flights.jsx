import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Flights.css';

const Flights = () => {
  const [allFlights, setAllFlights] = useState([]); // Store ALL flights
  const [filteredFlights, setFilteredFlights] = useState([]); // Store filtered flights
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [noSearchResults, setNoSearchResults] = useState(false); // Track if search returned no results
  const [hasSearchCriteria, setHasSearchCriteria] = useState(false); // Track if any search criteria is active

  /* =========================
     FETCH ALL FLIGHTS
  ========================= */
  const fetchAllFlights = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/flights');
      if (Array.isArray(res.data)) {
        setAllFlights(res.data);
        setFilteredFlights(res.data); // Initially show all flights
      } else {
        setAllFlights([]);
        setFilteredFlights([]);
      }
      setNoSearchResults(false);
      setHasSearchCriteria(false);
    } catch {
      setAllFlights([]);
      setFilteredFlights([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SEARCH FLIGHTS
  ========================= */
  const searchFlights = async () => {
    try {
      setLoading(true);
      
      // Check if any search criteria is active
      const hasFrom = from.trim() !== '';
      const hasTo = to.trim() !== '';
      const hasCriteria = hasFrom || hasTo;
      setHasSearchCriteria(hasCriteria);

      // If inputs empty → show all flights
      if (!hasCriteria) {
        setFilteredFlights(allFlights);
        setNoSearchResults(false);
        return;
      }

      // If we have search criteria, try to fetch matching flights
      const res = await axios.get('/api/flights', {
        params: { 
          from: hasFrom ? from.trim().toUpperCase() : '',
          to: hasTo ? to.trim().toUpperCase() : ''
        }
      });

      // If we have results, show them
      if (Array.isArray(res.data) && res.data.length > 0) {
        setFilteredFlights(res.data);
        setNoSearchResults(false);
      } else {
        // No matching flights found
        setNoSearchResults(true);
        setFilteredFlights(allFlights); // Show all flights
      }
    } catch {
      // On error, show all flights
      setNoSearchResults(true);
      setFilteredFlights(allFlights);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchFlights();
    }
  };

  const clearSearch = () => {
    setFrom('');
    setTo('');
    setFilteredFlights(allFlights);
    setNoSearchResults(false);
    setHasSearchCriteria(false);
  };

  /* =========================
     LOAD ON PAGE OPEN
  ========================= */
  useEffect(() => {
    fetchAllFlights();
  }, []);

  /* =========================
     BOOK FLIGHT
  ========================= */
  const bookFlight = async (flightId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to book flights');
        return;
      }

      await axios.post(
        '/api/flights/book',
        { flightId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('✅ Flight booked successfully!');
    } catch {
      alert('❌ Failed to book flight');
    }
  };

  /* =========================
     HELPER FUNCTION: GET AIRLINE ICON
  ========================= */
  const getAirlineIcon = (airlineName) => {
    if (!airlineName) {
      return { icon: 'fas fa-plane', className: 'airline-icon airline-default' };
    }
    
    const name = airlineName.toLowerCase();
    
   if (name.includes('pia') || name.includes('pakistan')) {
      return { icon: 'fas fa-plane', className: 'airline-icon airline-pia' };
    } else {
      return { icon: 'fas fa-plane', className: 'airline-icon airline-default' };
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="flights-container">
      {/* SEARCH BOX */}
      <div className="search-box">
        <h2>
          <i className="fas fa-search"></i> Search Flights
        </h2>
        
        <div className="search-bar">
          <div className="search-input-group">
            <div className="input-with-icon">
              <i className="fas fa-plane-departure"></i>
              <input
                placeholder="From (e.g., ISB)"
                value={from}
                onChange={e => setFrom(e.target.value)}
                onKeyPress={handleKeyPress}
                className="search-input"
              />
            </div>
            
            <div className="input-arrow">
              <i className="fas fa-long-arrow-alt-right"></i>
            </div>
            
            <div className="input-with-icon">
              <i className="fas fa-plane-arrival"></i>
              <input
                placeholder="To (e.g., MAN)"
                value={to}
                onChange={e => setTo(e.target.value)}
                onKeyPress={handleKeyPress}
                className="search-input"
              />
            </div>
            
            <button className="search-button" onClick={searchFlights}>
              <i className="fas fa-search"></i> Search
            </button>
          </div>
        </div>
        
        {/* Clear search button */}
        {hasSearchCriteria && (
          <div className="clear-search-container">
            <button className="clear-search-button" onClick={clearSearch}>
              <i className="fas fa-times"></i> Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Search Result Message */}
      {noSearchResults && (
        <div className="search-message">
          <i className="fas fa-info-circle"></i>
          <div>
            <p className="message-title">No flights found matching your search criteria</p>
            <p className="message-subtitle">Search criteria: 
              {from && ` From: "${from.toUpperCase()}"`}
              {to && ` To: "${to.toUpperCase()}"`}
            </p>
            <p className="message-subtitle">Here are other available flights:</p>
          </div>
        </div>
      )}

      {/* FLIGHTS BOX */}
      <div className="flights-box">
        <div className="flights-header">
          <h1>
            <i className="fas fa-plane"></i> Available Flights
          </h1>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="loading-container">
            <i className="fas fa-plane fa-spin"></i>
            <p>Loading flights...</p>
          </div>
        )}

        {/* NO FLIGHTS */}
        {!loading && filteredFlights.length === 0 && (
          <div className="no-flights">
            <i className="fas fa-plane-slash"></i>
            <p>No flights available at the moment</p>
          </div>
        )}

        {/* FLIGHTS LIST */}
        {!loading && filteredFlights.map(f => {
          const airlineIcon = getAirlineIcon(f.airline);
          const stops = f.stops || 0;
          const duration = f.duration || `${Math.floor(Math.random() * 10) + 1}h ${Math.floor(Math.random() * 60)}m`;
          const basePrice = f.price || 250;
          
          return (
            <div key={f._id} className="flight-card">
              {/* Left Section - Flight Details */}
              <div className="flight-left-section">
                <div className="airline-info">
                  <i className={`${airlineIcon.icon} ${airlineIcon.className}`}></i>
                  <h3>{f.airline || 'Unknown Airline'}</h3>
                </div>
                
                <div className="flight-details">
                  <div className="route-section">
                    <div className="city-code">{f.from || '---'}</div>
                    <div className="flight-route">
                      <div className="route-line">
                        <i className="fas fa-circle"></i>
                        <div className="line"></div>
                        <i className="fas fa-circle"></i>
                      </div>
                      <div className="route-time">
                        <span>
                          <i className="far fa-clock"></i> {duration}
                        </span>
                        <span className="stops">
                          <i className="fas fa-map-marker-alt"></i> {stops === 0 ? 'Non-stop' : `${stops} stop${stops > 1 ? 's' : ''}`}
                        </span>
                      </div>
                    </div>
                    <div className="city-code">{f.to || '---'}</div>
                  </div>
                  
                  <div className="timing-section">
                    <div className="time-block">
                      <div className="time-label">DEPARTURE</div>
                      <div className="time-value">
                        <i className="far fa-calendar-alt"></i> {f.departureTime || '--:--'}
                      </div>
                    </div>
                    
                    <div className="time-block">
                      <div className="time-label">ARRIVAL</div>
                      <div className="time-value">
                        <i className="far fa-calendar-alt"></i> {f.arrivalTime || '--:--'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Section - Price and Booking */}
              <div className="flight-right-section">
                <div className="flight-price">
                  <div className="price-amount">${basePrice}</div>
                  <div className="price-label">per person</div>
                </div>
                
                <div className="flight-class">
                  <div className="class-option active">
                    <span className="class-name">Economy</span>
                  </div>
                </div>
                
                <button 
                  className="book-button" 
                  onClick={() => bookFlight(f._id)}
                >
                  <i className="fas fa-ticket-alt"></i> Select
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Flights;