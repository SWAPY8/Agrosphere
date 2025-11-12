import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="footer-icon">🌾</span>
            <span className="footer-title">Agrosphere</span>
          </div>
          <p className="footer-description">
            Empowering farmers with personalized scheme recommendations
          </p>
          <p className="footer-copyright">
            © 2025 Agrosphere | Designed for Farmers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;