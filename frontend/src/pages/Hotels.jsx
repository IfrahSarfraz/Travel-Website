import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Hotels.css';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]);
  const [search, setSearch] = useState({ name: '', city: '' });
  const [bookingData, setBookingData] = useState({});
  const [loading, setLoading] = useState(false);
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [hasSearchCriteria, setHasSearchCriteria] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/hotels/search');
      setHotels(res.data);
      setAllHotels(res.data);
      setNoSearchResults(false);
      setHasSearchCriteria(false);
    } catch (err) {
      console.error(err);
      setHotels([]);
      setAllHotels([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      
      // Check if any search criteria is active
      const hasNameSearch = search.name.trim() !== '';
      const hasCitySearch = search.city.trim() !== '';
      const hasCriteria = hasNameSearch || hasCitySearch;
      setHasSearchCriteria(hasCriteria);

      // If no criteria, show all hotels
      if (!hasCriteria) {
        setHotels(allHotels);
        setNoSearchResults(false);
        return;
      }

      // Make search request
      const res = await axios.get('/api/hotels/search', { 
        params: {
          name: hasNameSearch ? search.name.trim() : '',
          city: hasCitySearch ? search.city.trim() : ''
        }
      });

      if (res.data.length === 0) {
        setNoSearchResults(true);
        setHotels(allHotels); // Show all hotels when no results
      } else {
        setNoSearchResults(false);
        setHotels(res.data);
      }
    } catch (err) {
      console.error(err);
      setNoSearchResults(true);
      setHotels(allHotels);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearch({ name: '', city: '' });
    setHotels(allHotels);
    setNoSearchResults(false);
    setHasSearchCriteria(false);
  };

  const handleChange = (hotelId, field, value) => {
    setBookingData({
      ...bookingData,
      [hotelId]: {
        ...bookingData[hotelId],
        [field]: value
      }
    });
  };

  const bookHotel = async (hotelId) => {
    const data = bookingData[hotelId];
    const token = localStorage.getItem('token');

    if (!data?.checkIn || !data?.checkOut || !data?.guests) {
      return alert('Please fill all booking fields');
    }

    if (Number(data.guests) <= 0) {
      return alert('Enter a correct number of guests');
    }

    try {
      await axios.post(
        '/api/hotels/reserve',
        {
          hotelId,
          checkInDate: data.checkIn,
          checkOutDate: data.checkOut,
          guests: data.guests
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Hotel booked successfully');
      setBookingData(prev => ({ ...prev, [hotelId]: {} }));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="hotels-container">
      {/* SEARCH BOX - Same as flights */}
      <div className="search-box">
        <h2>
          <i className="fas fa-search"></i> Search Hotels
        </h2>
        
        <div className="search-bar">
          <div className="search-input-group">
            <div className="input-with-icon">
              <i className="fas fa-hotel"></i>
              <input
                placeholder="Hotel Name (e.g., Marriott)"
                value={search.name}
                onChange={e => setSearch({ ...search, name: e.target.value })}
                onKeyPress={handleKeyPress}
                className="search-input"
              />
            </div>
            
            <div className="input-with-icon">
              <i className="fas fa-map-marker-alt"></i>
              <input
                placeholder="City (e.g., New York)"
                value={search.city}
                onChange={e => setSearch({ ...search, city: e.target.value })}
                onKeyPress={handleKeyPress}
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
            <p className="message-title">No hotels found matching your search criteria</p>
            <p className="message-subtitle">Search criteria: 
              {search.name && ` Hotel: "${search.name}"`}
              {search.city && ` City: "${search.city}"`}
            </p>
            <p className="message-subtitle">Here are other available hotels:</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <i className="fas fa-hotel fa-spin"></i>
          <p>Loading hotels...</p>
        </div>
      )}

      {/* No Hotels Available (when there are truly no hotels) */}
      {!loading && hotels.length === 0 && !noSearchResults && (
        <div className="no-hotels">
          <i className="fas fa-hotel-slash"></i>
          <p>No hotels available at the moment</p>
        </div>
      )}

      {/* HOTELS LIST with 3-section layout */}
      {!loading && hotels.length > 0 && (
        <div className="hotels-grid">
          {hotels.map(h => (
            <div key={h._id} className="hotel-row">
              {/* Left Section - Image Only */}
              <div className="hotel-image-section">
                <img src={h.image} alt={h.name} className="hotel-main-image" />
              </div>

              {/* Middle Section - Name, Location, Inputs */}
              <div className="hotel-details-section">
                <div className="hotel-info">
                  <h3 className="hotel-name">{h.name}</h3>
                  <p className="hotel-location">
                    <i className="fas fa-map-marker-alt"></i> {h.city}
                  </p>
                </div>
                
                <div className="booking-inputs">
                  <div className="input-group">
                    <label>
                      <i className="fas fa-calendar-alt"></i> Check-in
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={bookingData[h._id]?.checkIn || ''}
                      onChange={e => handleChange(h._id, 'checkIn', e.target.value)}
                      className="booking-input"
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>
                      <i className="fas fa-calendar-alt"></i> Check-out
                    </label>
                    <input
                      type="date"
                      min={bookingData[h._id]?.checkIn || today}
                      value={bookingData[h._id]?.checkOut || ''}
                      onChange={e => handleChange(h._id, 'checkOut', e.target.value)}
                      className="booking-input"
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>
                      <i className="fas fa-users"></i> Guests
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={bookingData[h._id]?.guests || ''}
                      onChange={e => handleChange(h._id, 'guests', e.target.value)}
                      className="booking-input"
                      placeholder="Number of guests"
                    />
                  </div>
                </div>
              </div>

              {/* Right Section - Price and Book Button */}
              <div className="hotel-booking-section">
                <div className="price-container">
                  <div className="price-label">Price per night</div>
                  <div className="price-amount">${h.pricePerNight}</div>
                </div>
                
                <button 
                  className="book-now-btn" 
                  onClick={() => bookHotel(h._id)}
                >
                  <i className="fas fa-check-circle"></i> Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hotels;