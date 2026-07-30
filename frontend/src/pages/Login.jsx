import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExclamationTriangle,
  faMobileAlt,
  faChartBar,
  faStar,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGoogle,
  faFacebook
} from '@fortawesome/free-brands-svg-icons';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Login failed');
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
          <h1>Sign in to your account</h1>
          <p>Welcome back! Please enter your details</p>
        </div>

        {error && (
          <div className="error-alert">
            <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
            <span>{error}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" name="remember" />
              Remember me
            </label>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="spinner" spin />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>

        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up here
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
          <h2>Your account, your travel</h2>
          <p>All your trip details in one place</p>
          <div className="benefits">
            <div className="benefit">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faMobileAlt} />
              </div>
              <div className="benefit-content">
                <h3>Book faster</h3>
                <p>Save your details for quick bookings</p>
              </div>
            </div>
            <div className="benefit">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faChartBar} />
              </div>
              <div className="benefit-content">
                <h3>Manage trips</h3>
                <p>Access all your bookings in one place</p>
              </div>
            </div>
            <div className="benefit">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className="benefit-content">
                <h3>Exclusive deals</h3>
                <p>Get member-only discounts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;