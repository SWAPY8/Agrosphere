import React, { useState, useEffect } from 'react';
import SchemeCard from '../components/schemecard';
import './scheme.css';

// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

const SchemesPage = ({ farmerProfile }) => {
  // State for profile-based schemes
  const [profileSchemes, setProfileSchemes] = useState([]);
  const [profileLoading, setProfileLoading] = useState(false);
  
  // State for additional eligibility form
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    category: 'General'
  });
  const [additionalSchemes, setAdditionalSchemes] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);

  const isProfileComplete = farmerProfile.name && farmerProfile.state && 
                            farmerProfile.landSize && farmerProfile.cropType;

  // Fetch schemes based on profile when component mounts or profile changes
  useEffect(() => {
    if (isProfileComplete) {
      fetchProfileBasedSchemes();
    }
  }, [farmerProfile]);

  // API CALL 1: Fetch schemes based on saved profile
  const fetchProfileBasedSchemes = async () => {
    setProfileLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/farmer/profile-schemes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: farmerProfile.name,
          state: farmerProfile.state,
          landSize: parseFloat(farmerProfile.landSize),
          cropType: farmerProfile.cropType
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProfileSchemes(data.schemes || []);
    } catch (err) {
      console.error('Error fetching profile schemes:', err);
      // Show demo schemes for profile
      setProfileSchemes(getProfileDemoSchemes());
    } finally {
      setProfileLoading(false);
    }
  };

  // API CALL 2: Find additional eligible schemes with more details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);
    setAdditionalSchemes([]);

    try {
      // Combine profile data with form data for ML prediction
      const requestData = {
        name: farmerProfile.name,
        state: farmerProfile.state,
        landSize: parseFloat(farmerProfile.landSize),
        cropType: farmerProfile.cropType,
        age: parseInt(formData.age),
        income: parseFloat(formData.income),
        category: formData.category
      };

      const response = await fetch(`${API_BASE_URL}/farmer/eligibility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAdditionalSchemes(data.schemes || []);
    } catch (err) {
      console.error('Error fetching eligible schemes:', err);
      setError('Failed to fetch schemes. Please ensure the backend is running on localhost:8080');
      setAdditionalSchemes(getAdditionalDemoSchemes());
    } finally {
      setFormLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="schemes-page">
      <div className="schemes-container">
        <h1 className="schemes-title">Your Personalized Scheme Recommendations</h1>

        {/* Profile Status Section */}
        {!isProfileComplete ? (
          <div className="profile-incomplete-message">
            <div className="message-icon">👤</div>
            <h3>Complete Your Profile First</h3>
            <p>Please complete your farmer profile (Name, State, Land Size, Crop Type) to see personalized scheme recommendations.</p>
            <button onClick={() => window.location.reload()} className="refresh-btn">
              Check Profile Status
            </button>
          </div>
        ) : (
          <>
            {/* Profile-Based Schemes Section */}
            <div className="profile-schemes-section">
              <div className="section-header">
                <h2>Schemes Based on Your Profile</h2>
                <p className="profile-info">
                  📍 {farmerProfile.state} | 🌾 {farmerProfile.cropType} | 📏 {farmerProfile.landSize} acres
                </p>
              </div>

              {profileLoading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading personalized schemes...</p>
                </div>
              ) : profileSchemes.length > 0 ? (
                <div className="schemes-grid">
                  {profileSchemes.map((scheme, index) => (
                    <SchemeCard key={`profile-${index}`} {...scheme} isRecommended={true} />
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  No schemes found based on your profile. Try filling the form below for more options.
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="section-divider">
              <span>Find More Eligible Schemes</span>
            </div>

            {/* Additional Eligibility Form Section */}
            <div className="additional-schemes-section">
              <div className="section-header">
                <h2>Find Additional Eligible Schemes</h2>
                <p>Provide more details to discover additional schemes you may be eligible for</p>
              </div>

              <div className="eligibility-form-container">
                <div className="form-fields">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Your Age *</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="18"
                        max="100"
                        placeholder="Enter your age"
                      />
                    </div>

                    <div className="form-group">
                      <label>Annual Income (₹) *</label>
                      <input
                        type="number"
                        name="income"
                        value={formData.income}
                        onChange={handleChange}
                        required
                        min="0"
                        placeholder="Annual income"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="General">General</option>
                      <option value="SC">SC (Scheduled Caste)</option>
                      <option value="ST">ST (Scheduled Tribe)</option>
                      <option value="OBC">OBC (Other Backward Classes)</option>
                    </select>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={formLoading || !formData.age || !formData.income}
                    className="submit-button"
                  >
                    {formLoading ? 'Searching Additional Schemes...' : 'Find More Schemes'}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="error-message">
                  <div className="error-icon">⚠️</div>
                  <div className="error-content">
                    <p>{error}</p>
                    <p className="error-sub">Showing demo schemes for reference</p>
                  </div>
                </div>
              )}

              {/* Additional Schemes Results */}
              {additionalSchemes.length > 0 && (
                <div className="schemes-results">
                  <h3 className="results-title">
                    Additional Schemes ({additionalSchemes.length})
                  </h3>
                  <div className="schemes-grid">
                    {additionalSchemes.map((scheme, index) => (
                      <SchemeCard key={`additional-${index}`} {...scheme} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Demo data functions
const getProfileDemoSchemes = () => [
  {
    title: "State Agricultural Credit Scheme",
    description: "Special credit facility for farmers in your state with subsidized interest rates for crop cultivation.",
    eligibility: "Farmers with landholding in the state",
    benefits: "Low interest loans up to ₹5 lakhs",
    link: "#"
  },
  {
    title: "Crop-Specific Subsidy Program",
    description: "Government subsidy for cultivation of your specific crop type, including seed and fertilizer support.",
    eligibility: "Based on crop type and land size",
    benefits: "Up to 50% subsidy on inputs",
    link: "#"
  }
];

const getAdditionalDemoSchemes = () => [
  {
    title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    description: "Direct income support of ₹6,000 per year to all farmer families having cultivable land.",
    eligibility: "All landholding farmers, irrespective of size",
    benefits: "₹2,000 per installment, 3 times a year",
    link: "https://pmkisan.gov.in/"
  },
  {
    title: "Kisan Credit Card (KCC)",
    description: "Provides credit support to farmers for cultivation and post-harvest expenses.",
    eligibility: "All farmers including tenant farmers",
    benefits: "Credit limit based on land and crop",
    link: "https://www.india.gov.in/spotlight/kisan-credit-card-kcc"
  },
  {
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "Crop insurance providing financial support in case of crop failure.",
    eligibility: "Farmers growing notified crops",
    benefits: "Premium: 2% for Kharif, 1.5% for Rabi",
    link: "https://pmfby.gov.in/"
  }
];

export default SchemesPage;