import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserGraduate, 
  faBolt, 
  faMobileAlt, 
  faGem,
  faExclamationTriangle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreed) {
      setError('You must agree to the Terms & Conditions');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      };

      const result = await register(userData);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Create your account</h1>
          <p>Join millions of travelers around the world</p>
        </div>

        {error && (
          <div className="error-alert">
            <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
            <span>{error}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min. 6 characters)"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              disabled={loading}
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                disabled={loading}
              />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="inline-link">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="inline-link">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="spinner" spin />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
          <p>
            <Link to="/" className="auth-link">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>

      <div className="auth-sidebar">
        <div className="sidebar-content">
          <h2>Why join us?</h2>
          <p>Experience the benefits of being a member</p>
          <div className="benefits">
            <div className="benefit">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faUserGraduate} />
              </div>
              <div className="benefit-content">
                <h3>Genius Program</h3>
                <p>Get 10% off on thousands of properties</p>
              </div>
            </div>
            <div className="benefit">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faBolt} />
              </div>
              <div className="benefit-content">
                <h3>Fast Booking</h3>
                <p>Save your details for instant bookings</p>
              </div>
            </div>
            <div className="benefit">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faMobileAlt} />
              </div>
              <div className="benefit-content">
                <h3>Easy Management</h3>
                <p>Manage trips on the go</p>
              </div>
            </div>
            <div className="benefit">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faGem} />
              </div>
              <div className="benefit-content">
                <h3>Exclusive Deals</h3>
                <p>Access members-only promotions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;