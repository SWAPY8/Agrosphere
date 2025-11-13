import React from 'react';
import './home.css';

const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Empowering Farmers with Access to Welfare Schemes
          </h1>
          <p className="hero-subtitle">
            Discover personalized government schemes tailored to your needs
          </p>
          <button
            onClick={() => setCurrentPage('schemes')}
            className="hero-button"
          >
            Get Started →
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-container">
          <h2 className="features-title">Why Choose Agrosphere?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Personalized Recommendations</h3>
              <p className="feature-description">
                Get scheme suggestions based on your specific profile and needs
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3 className="feature-title">AI-Powered Matching</h3>
              <p className="feature-description">
                Machine learning algorithms ensure accurate scheme eligibility
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Quick & Easy</h3>
              <p className="feature-description">
                Simple profile setup with instant personalized results
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
