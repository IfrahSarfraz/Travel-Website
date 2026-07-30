import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Attractions.css';

const Attractions = () => {
  const { user } = useAuth();
  const [allAttractions, setAllAttractions] = useState([]); // Store ALL attractions
  const [filteredAttractions, setFilteredAttractions] = useState([]); // Store filtered attractions
  const [searchName, setSearchName] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeBooking, setActiveBooking] = useState(null);
  const [inputs, setInputs] = useState({});
  const [noSearchResults, setNoSearchResults] = useState(false); // Track if search returned no results

  // Fetch all attractions initially
  const fetchAllAttractions = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/attractions');
      setAllAttractions(res.data);
      setFilteredAttractions(res.data); // Initially show all attractions
      setNoSearchResults(false);
    } catch (err) {
      console.error(err);
      setAllAttractions([]);
      setFilteredAttractions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAttractions();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchName.trim()) {
      // If search is empty, show all attractions
      setFilteredAttractions(allAttractions);
      setNoSearchResults(false);
      return;
    }

    const searchTerm = searchName.toLowerCase().trim();
    const filtered = allAttractions.filter(attr => 
      attr.name.toLowerCase().includes(searchTerm) ||
      attr.description.toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
      setNoSearchResults(true);
      // Still show all attractions when search returns no results
      setFilteredAttractions(allAttractions);
    } else {
      setNoSearchResults(false);
      setFilteredAttractions(filtered);
    }
  };

  const handleInputChange = (id, field, value) => {
    setInputs((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleBookNow = (id) => {
    setActiveBooking((prev) => (prev === id ? null : id));
  };

  const handleConfirmBooking = async (attraction) => {
    const { date, persons } = inputs[attraction._id] || {};
    if (!date || !persons || isNaN(persons) || persons <= 0) {
      return alert('Please provide valid date and number of persons');
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/api/attractions/book',
        { attractionId: attraction._id, date, numPeople: persons },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.booking) {
        alert('Booking successful!');
        setActiveBooking(null);
        setInputs((prev) => ({ ...prev, [attraction._id]: {} }));
      }
    } catch (err) {
      console.error(err);
      alert('Booking failed');
    }
  };

  return (
    <div className="attractions-container">
      {/* SEARCH BOX */}
      <div className="search-box">
        <h2>
          <i className="fas fa-search"></i> Search Attractions
        </h2>
        
        <div className="search-bar">
          <div className="search-input-group">
            <div className="input-with-icon">
              <i className="fas fa-landmark"></i>
              <input
                type="text"
                placeholder="Search attraction (e.g., Eiffel Tower)"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                className="search-input"
              />
            </div>
            
            <button className="search-button" onClick={handleSearch}>
              <i className="fas fa-search"></i> Search
            </button>
          </div>
        </div>
      </div>

      {/* Search Result Message */}
      {noSearchResults && (
        <div className="search-message">
          <i className="fas fa-info-circle"></i>
          <div>
            <p className="message-title">No attractions found matching your search: "{searchName}"</p>
            <p className="message-subtitle">Here are other available attractions:</p>
          </div>
        </div>
      )}

      {/* Attractions Grid */}
      <div className="available-attractions-section">
        <h2>Available Attractions</h2>
        
        {loading ? (
          <p className="loading-text">Loading attractions...</p>
        ) : filteredAttractions.length === 0 ? (
          <p className="no-attractions-text">No attractions available at the moment.</p>
        ) : (
          <div className="attractions-grid">
            {filteredAttractions.map((attr) => {
              const isActive = activeBooking === attr._id;
              const inputData = inputs[attr._id] || {};

              return (
                <div key={attr._id} className="attraction-card">
                  <div className="attraction-image-container">
                    <img src={attr.image} alt={attr.name} className="attraction-image" />
                  </div>
                  
                  <div className="attraction-details">
                    <h3>{attr.name}</h3>
                    <p className="attraction-description">{attr.description.slice(0, 80)}...</p>
                    
                    <div className="price-section">
                      <div className="price">${attr.pricePerPerson}</div>
                      <div className="price-label">per person</div>
                    </div>

                    {isActive && (
                      <div className="booking-fields">
                        <div className="date-field">
                          <label>Visit Date</label>
                          <input
                            type="date"
                            value={inputData.date || ''}
                            onChange={(e) =>
                              handleInputChange(attr._id, 'date', e.target.value)
                            }
                          />
                        </div>
                        <div className="persons-field">
                          <label>Number of Persons</label>
                          <input
                            type="number"
                            placeholder="e.g., 2"
                            min="1"
                            value={inputData.persons || ''}
                            onChange={(e) =>
                              handleInputChange(attr._id, 'persons', e.target.value)
                            }
                          />
                        </div>
                      </div>
                    )}

                    <button
                      className={`book-button ${isActive ? 'confirm-button' : ''}`}
                      onClick={() =>
                        isActive
                          ? handleConfirmBooking(attr)
                          : handleBookNow(attr._id)
                      }
                    >
                      {isActive ? 'Confirm Booking' : 'BOOK NOW'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Attractions;