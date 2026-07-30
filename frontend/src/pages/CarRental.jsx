import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './CarRental.css';

const CarRental = () => {
  const { user } = useAuth();
  const [allCars, setAllCars] = useState([]); // Store ALL cars
  const [filteredCars, setFilteredCars] = useState([]); // Store filtered cars
  const [loading, setLoading] = useState(true);
  const [bookingCarId, setBookingCarId] = useState(null);
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');

  // Separate search fields
  const [searchName, setSearchName] = useState('');
  const [searchPassengers, setSearchPassengers] = useState('');
  const [searchLuggage, setSearchLuggage] = useState('');
  
  const [noSearchResults, setNoSearchResults] = useState(false); // Track if search returned no results
  const [hasSearchCriteria, setHasSearchCriteria] = useState(false); // Track if any search criteria is active

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/cars');
      setAllCars(res.data);
      setFilteredCars(res.data); // Initially show all cars
      setNoSearchResults(false);
      setHasSearchCriteria(false);
    } catch (err) {
      console.error(err);
      setAllCars([]);
      setFilteredCars([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const hasNameSearch = searchName.trim() !== '';
    const hasPassengerSearch = searchPassengers !== '';
    const hasLuggageSearch = searchLuggage !== '';
    
    // Check if any search criteria is active
    const hasCriteria = hasNameSearch || hasPassengerSearch || hasLuggageSearch;
    setHasSearchCriteria(hasCriteria);
    
    if (!hasCriteria) {
      // If no search criteria, show all cars
      setFilteredCars(allCars);
      setNoSearchResults(false);
      return;
    }

    const filtered = allCars.filter((car) => {
      const nameMatch = hasNameSearch 
        ? car.name.toLowerCase().includes(searchName.toLowerCase().trim())
        : true;
      
      const passengerMatch = hasPassengerSearch
        ? car.capacity && car.capacity.toString() === searchPassengers
        : true;
      
      const luggageMatch = hasLuggageSearch
        ? car.luggage && car.luggage.toString() === searchLuggage
        : true;

      return nameMatch && passengerMatch && luggageMatch;
    });

    if (filtered.length === 0) {
      setNoSearchResults(true);
      // Show all cars when search returns no results
      setFilteredCars(allCars);
    } else {
      setNoSearchResults(false);
      setFilteredCars(filtered);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchName('');
    setSearchPassengers('');
    setSearchLuggage('');
    setFilteredCars(allCars);
    setNoSearchResults(false);
    setHasSearchCriteria(false);
  };

  const bookCar = async (carId) => {
    if (!user) return alert('Please login first');

    if (!pickupDate || !dropoffDate) {
      return alert('Please enter both pickup and dropoff dates');
    }

    try {
      setBookingCarId(carId);
      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/api/cars/book',
        { carId, pickupDate, dropoffDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.success) {
        alert('Car booked successfully!');
        setPickupDate('');
        setDropoffDate('');
        setBookingCarId(null);
        fetchCars();
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Booking failed');
      setBookingCarId(null);
    }
  };

  return (
    <div className="car-rental-container">
      {/* SEARCH BOX */}
      <div className="search-box">
        <h2>
          <i className="fas fa-search"></i> Search Cars
        </h2>
        
        <div className="search-bar">
          <div className="search-input-group">
            <div className="input-with-icon">
              <i className="fas fa-car"></i>
              <input
                type="text"
                placeholder="Car Name (e.g., Toyota Camry)"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="search-input"
              />
            </div>
            
            <div className="input-with-icon">
              <i className="fas fa-users"></i>
              <input
                type="number"
                placeholder="Passengers (e.g., 4)"
                value={searchPassengers}
                onChange={(e) => setSearchPassengers(e.target.value)}
                onKeyPress={handleKeyPress}
                min="1"
                className="search-input"
              />
            </div>
            
            <div className="input-with-icon">
              <i className="fas fa-suitcase"></i>
              <input
                type="number"
                placeholder="Luggage (e.g., 2)"
                value={searchLuggage}
                onChange={(e) => setSearchLuggage(e.target.value)}
                onKeyPress={handleKeyPress}
                min="0"
                className="search-input"
              />
            </div>
            
            <button className="search-button" onClick={handleSearch}>
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
            <p className="message-title">No cars found matching your search criteria</p>
            <p className="message-subtitle">Search criteria: 
              {searchName && ` Car: "${searchName}"`}
              {searchPassengers && ` Passengers: ${searchPassengers}`}
              {searchLuggage && ` Luggage: ${searchLuggage}`}
            </p>
            <p className="message-subtitle">Here are other available cars:</p>
          </div>
        </div>
      )}

      <div className="available-cars-section">
        <h2>Available Cars</h2>
        
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : filteredCars.length === 0 ? (
          <p className="no-cars-text">No cars available at the moment.</p>
        ) : (
          <div className="car-grid">
            {filteredCars.map((car) => (
              <div key={car._id} className="car-card">
                <div className="car-image-container">
                  <img src={car.image} alt={car.name} className="car-image" />
                  {!car.available && <div className="unavailable-badge">Unavailable</div>}
                </div>
                
                <div className="car-details">
                  <h3>{car.name}</h3>
                  <div className="car-specs">
                    <div className="spec-item">
                      <span className="spec-label">Type:</span>
                      <span className="spec-value">{car.type}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Capacity:</span>
                      <span className="spec-value">{car.capacity} passengers</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Luggage:</span>
                      <span className="spec-value">{car.luggage} bags</span>
                    </div>
                  </div>
                  
                  <div className="price-section">
                    <div className="price">${car.pricePerDay}</div>
                    <div className="price-label">per day</div>
                  </div>

                  {bookingCarId === car._id ? (
                    <div className="booking-form">
                      <div className="date-inputs">
                        <div className="date-field">
                          <label>Pickup Date</label>
                          <input
                            type="date"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                          />
                        </div>
                        <div className="date-field">
                          <label>Dropoff Date</label>
                          <input
                            type="date"
                            value={dropoffDate}
                            onChange={(e) => setDropoffDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <button 
                        className="confirm-button" 
                        onClick={() => bookCar(car._id)}
                      >
                        Confirm Booking
                      </button>
                    </div>
                  ) : (
                    <button
                      className={`book-button ${!car.available ? 'disabled' : ''}`}
                      onClick={() => car.available && setBookingCarId(car._id)}
                      disabled={!car.available}
                    >
                      {car.available ? 'BOOK NOW' : 'UNAVAILABLE'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarRental;