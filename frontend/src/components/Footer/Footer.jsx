import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          
          {/* Main Footer */}
          <div className="footer-main">
            <div className="footer-section">
              <h3 className="footer-heading">Support</h3>
              <ul className="footer-links">
                <li><Link to="/">Manage your trips</Link></li>
                <li><Link to="/">Customer Service Help</Link></li>
                <li><Link to="/">Safety Resource Center</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-heading">Discover</h3>
              <ul className="footer-links">
                <li><Link to="/">Genius loyalty program</Link></li>
                <li><Link to="/">Seasonal and holiday deals</Link></li>
                <li><Link to="/">Travel articles</Link></li>
                <li><Link to="/">Booking.com for Business</Link></li>
                <li><Link to="/car-rental">Car rental</Link></li>
                <li><Link to="/flights">Flight finder</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-heading">Terms and settings</h3>
              <ul className="footer-links">
                <li><Link to="/">Privacy Notice</Link></li>
                <li><Link to="/">Terms of Service</Link></li>
                <li><Link to="/">Accessibility Statement</Link></li>
                <li><Link to="/">Partner dispute</Link></li>
                <li><Link to="/">Modern Slavery Statement</Link></li>
                <li><Link to="/">Human Rights Statement</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-heading">Partners</h3>
              <ul className="footer-links">
                <li><Link to="/">Extranet login</Link></li>
                <li><Link to="/">Partner help</Link></li>
                <li><Link to="/">List your property</Link></li>
                <li><Link to="/">Become an affiliate</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-heading">About Booking.com</h3>
              <ul className="footer-links">
                <li><Link to="/">How We Work</Link></li>
                <li><Link to="/">Sustainability</Link></li>
                <li><Link to="/">Press center</Link></li>
                <li><Link to="/">Careers</Link></li>
                <li><Link to="/">Investor relations</Link></li>
                <li><Link to="/">Corporate contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="footer-bottom">
            <div className="footer-info">
              <p className="copyright">
                Copyright © 1996-{currentYear} Travely.com™. All rights reserved.
              </p>
              <p className="company-info">
                Travely.com Transport Ltd is part of Booking Holdings Inc., the world leader in online travel and related services.
              </p>
            </div>
            
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;