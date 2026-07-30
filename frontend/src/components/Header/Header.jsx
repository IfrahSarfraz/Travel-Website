import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faPlane, 
  faCar, 
  faMountainCity,
  faTaxi,
  faChartBar,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faUser,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="logo-link">
              <span className="logo-text">Travely</span>
              <span className="logo-dot">.</span>
              <span className="logo-com">com</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faHome} className="nav-icon" />
              <span>Stays</span>
            </Link>
            <Link to="/flights" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faPlane} className="nav-icon" />
              <span>Flights</span>
            </Link>
            <Link to="/car-rental" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faCar} className="nav-icon" />
              <span>Car Rental</span>
            </Link>
            <Link to="/attractions" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faMountainCity} className="nav-icon" />
              <span>Attractions</span>
            </Link>
            <Link to="/taxi" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faTaxi} className="nav-icon" />
              <span>Airport Taxi</span>
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="auth-section">
            {user ? (
              <div className="user-menu">
                <Link to="/dashboard" className="dashboard-btn">
                  <FontAwesomeIcon icon={faChartBar} className="btn-icon" />
                  <span>Dashboard</span>
                </Link>
                <div className="user-info">
                  <span className="welcome-text">
                    <FontAwesomeIcon icon={faUser} className="user-icon" />
                    Hi, {user.name}
                  </span>
                  <button onClick={handleLogout} className="logout-btn">
                    <FontAwesomeIcon icon={faSignOutAlt} className="btn-icon" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/register" className="register-btn">
                  <FontAwesomeIcon icon={faUserPlus} className="btn-icon" />
                  <span>Register</span>
                </Link>
                <Link to="/login" className="login-btn">
                  <FontAwesomeIcon icon={faSignInAlt} className="btn-icon" />
                  <span>Sign in</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="menu-toggle" onClick={toggleMenu}>
            <FontAwesomeIcon 
              icon={isMenuOpen ? faTimes : faBars} 
              className="menu-icon" 
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;