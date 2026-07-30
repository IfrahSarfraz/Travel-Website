import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHotel, 
  faPlane, 
  faCar, 
  faLandmark,
  faTaxi,
  faSearch,
  faCalendar,
  faMapMarkerAlt,
  faUsers,
  faDoorClosed,
  faCheckCircle,
  faUser,
  faWallet,
  faStar,
  faArrowRight,
  faSignInAlt,
  faUserPlus,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('stays');
  
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  });

  const handleSearchChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Navigate to hotels page with search parameters
    const params = new URLSearchParams({
      destination: searchData.destination,
      checkInDate: searchData.checkIn,
      checkOutDate: searchData.checkOut,
      guests: searchData.guests,
      rooms: searchData.rooms
    });
    
    navigate(`/hotels?${params.toString()}`);
  };

  const handleTabClick = (type) => {
    setSearchType(type);
    // Navigate to respective page when clicking on tabs
    if (type === 'flights') {
      navigate('/flights');
    } else if (type === 'car-rental') {
      navigate('/car-rental');
    } else if (type === 'attractions') {
      navigate('/attractions');
    } else if (type === 'taxi') {
      navigate('/taxi');
    }
    // 'stays' tab keeps you on the home page with hotel search
  };

  const features = [
    {
      icon: faHotel,
      title: 'Find your next stay',
      description: 'Search deals on hotels, homes, and much more...',
      link: '/hotels'
    },
    {
      icon: faPlane,
      title: 'Search flights',
      description: 'Compare prices from hundreds of airlines',
      link: '/flights'
    },
    {
      icon: faCar,
      title: 'Car rental',
      description: 'Find great prices on rental cars',
      link: '/car-rental'
    },
    {
      icon: faLandmark,
      title: 'Attractions',
      description: 'Discover amazing things to do',
      link: '/attractions'
    },
    {
      icon: faTaxi,
      title: 'Airport taxi',
      description: 'Pre-book your airport transfer',
      link: '/taxi'
    }
  ];

  const popularDestinations = [
    { name: 'Clifton Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'},
    { name: 'Badshahi Mosque', image: 'https://media.istockphoto.com/id/838017344/photo/badshahi-mosque-with-golden-sky.jpg?s=612x612&w=0&k=20&c=t5SIRHMSFcNapMkD8D3vivVUEAlxXKztz5KIva57ToY='},
    { name: 'Swat Valley', image: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=800'},
    { name: 'Hunza Valley', image: 'https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&w=800'},
    { name: 'Deosai Plains', image: 'https://images.pexels.com/photos/691034/pexels-photo-691034.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Attabad Lake', image: 'https://images.pexels.com/photos/2406388/pexels-photo-2406388.jpeg?auto=compress&cs=tinysrgb&w=800'}
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find your next stay</h1>
          <p className="hero-subtitle">Search deals on hotels, flights, and much more...</p>
          
          {/* Search Tabs - Now navigates to respective pages */}
          <div className="search-tabs">
            {['stays', 'flights', 'car-rental', 'attractions', 'taxi'].map(type => (
              <button
                key={type}
                className={`search-tab ${searchType === type ? 'active' : ''}`}
                onClick={() => handleTabClick(type)}
              >
                {type === 'stays' && <FontAwesomeIcon icon={faHotel} className="tab-icon" />}
                {type === 'flights' && <FontAwesomeIcon icon={faPlane} className="tab-icon" />}
                {type === 'car-rental' && <FontAwesomeIcon icon={faCar} className="tab-icon" />}
                {type === 'attractions' && <FontAwesomeIcon icon={faLandmark} className="tab-icon" />}
                {type === 'taxi' && <FontAwesomeIcon icon={faTaxi} className="tab-icon" />}
                {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Search Form - Only shown when 'stays' tab is selected */}
          {searchType === 'stays' && (
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-fields">
                <div className="search-field">
                  <label>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={searchData.destination}
                    onChange={handleSearchChange}
                    placeholder="Where are you going?"
                    required
                  />
                </div>
                
                <div className="search-field">
                  <label>
                    <FontAwesomeIcon icon={faCalendar} /> Check-in
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={searchData.checkIn}
                    onChange={handleSearchChange}
                    required
                  />
                </div>
                
                <div className="search-field">
                  <label>
                    <FontAwesomeIcon icon={faCalendar} /> Check-out
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={searchData.checkOut}
                    onChange={handleSearchChange}
                    required
                  />
                </div>
                
              </div>
              
              <button type="submit" className="search-btn">
                <FontAwesomeIcon icon={faSearch} />
                Search
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why choose us?</h2>
          <div className="features-grid">
            {features.slice(0, 3).map((feature, index) => (
              <Link to={feature.link} key={index} className="feature-card">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="feature-link">
                  Explore <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </Link>
            ))}
            {features.slice(3, 5).map((feature, index) => (
              <Link to={feature.link} key={index + 3} className="feature-card">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="feature-link">
                  Explore <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="destinations-section">
        <div className="container">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faGlobe} /> Top destinations
          </h2>
          <div className="destinations-grid">
            {popularDestinations.map((destination, index) => (
              <div key={index} className="destination-card">
                <img src={destination.image} alt={destination.name} className="destination-image" />
                <div className="destination-info">
                  <h3>{destination.name}</h3>
                </div>
                <button className="explore-btn" onClick={() => navigate(`/attractions?location=${destination.name}`)}>
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How does it work?</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Book online</h3>
              <p>Select your service and make a reservation</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Get confirmation</h3>
              <p>Receive instant booking confirmation</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Meet your driver</h3>
              <p>Driver tracks your flight for timely pickup</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Arrive at destination</h3>
              <p>Get there quickly and safely</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit">
              <div className="benefit-content">
                <h3>
                  <FontAwesomeIcon icon={faUser} /> Your account, your travel
                </h3>
                <p>All your trip details in one place. Sign in to book faster and manage your trip with ease.</p>
                <div className="benefit-buttons">
                  <Link to="/login" className="btn-primary">
                    <FontAwesomeIcon icon={faSignInAlt} /> Sign in
                  </Link>
                  <Link to="/register" className="btn-secondary">
                    <FontAwesomeIcon icon={faUserPlus} /> Register
                  </Link>
                </div>
              </div>
            </div>
            <div className="benefit">
              <div className="benefit-content">
                <h3>
                  <FontAwesomeIcon icon={faWallet} /> Our clear price
                </h3>
                <p>Your price is confirmed up front – no extra costs, no cash required.</p>
              </div>
            </div>
            <div className="benefit">
              <div className="benefit-content">
                <h3>
                  <FontAwesomeIcon icon={faStar} /> Tried and true service
                </h3>
                <p>We work with professional drivers and have 24/7 customer care.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;