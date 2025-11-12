import React, { useState } from 'react';
import SchemeCard from '../components/schemecard';
import './scheme.css';

const SchemesPage = ({ farmerProfile }) => {
  const [formData, setFormData] = useState({
    name: farmerProfile.name || '',
    age: '',
    state: farmerProfile.state || '',
    landSize: '',
    income: '',
    category: 'General',
    cropType: ''
  });
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSchemes([]);

    try {
      // API Integration Point: POST request to Spring Boot backend
      const response = await fetch('http://localhost:8080/api/farmer/eligibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSchemes(data.schemes || []);
    } catch (err) {
      console.error('Error fetching schemes:', err);
      setError('Failed to fetch schemes. Please ensure the backend is running on localhost:8080');
      
      // For demonstration purposes, show dummy data on error
      setSchemes(getDummySchemes());
    } finally {
      setLoading(false);
    }
  };

  const getDummySchemes = () => [
    {
      title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      description: "Direct income support of ₹6,000 per year to all farmer families having cultivable land, paid in three equal installments of ₹2,000 each.",
      eligibility: "All landholding farmers, irrespective of size of landholding",
      link: "https://pmkisan.gov.in/"
    },
    {
      title: "Kisan Credit Card (KCC)",
      description: "Provides adequate and timely credit support to farmers for their cultivation and other needs including post-harvest expenses.",
      eligibility: "All farmers including tenant farmers and sharecroppers",
      link: "https://www.india.gov.in/spotlight/kisan-credit-card-kcc"
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      description: "Crop insurance scheme providing financial support to farmers in case of crop failure due to natural calamities, pests, and diseases.",
      eligibility: "All farmers growing notified crops in notified areas",
      link: "https://pmfby.gov.in/"
    }
  ];

  return (
    <div className="schemes-page">
      <div className="schemes-container">
        <h1 className="schemes-title">Find Your Eligible Schemes</h1>

        {/* Farmer Details Form */}
        <div className="schemes-form-container">
          <div className="form-fields">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label>Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="18"
                  max="100"
                  placeholder="Your age"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>State *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="West Bengal">West Bengal</option>
                  {/* Add more states */}
                </select>
              </div>
              <div className="form-group">
                <label>Land Size (acres) *</label>
                <input
                  type="number"
                  name="landSize"
                  value={formData.landSize}
                  onChange={handleChange}
                  required
                  step="0.1"
                  min="0"
                  placeholder="Land size"
                />
              </div>
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

            <div className="form-group">
              <label>Crop Type *</label>
              <input
                type="text"
                name="cropType"
                value={formData.cropType}
                onChange={handleChange}
                required
                placeholder="e.g., Rice, Wheat, Cotton"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="submit-button"
            >
              {loading ? 'Searching Schemes...' : 'Find Eligible Schemes'}
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

        {/* Schemes Display */}
        {schemes.length > 0 && (
          <div className="schemes-results">
            <h2 className="results-title">
              Recommended Schemes ({schemes.length})
            </h2>
            <div className="schemes-grid">
              {schemes.map((scheme, index) => (
                <SchemeCard key={index} {...scheme} />
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!loading && schemes.length === 0 && !error && (
          <div className="no-results">
            Fill out the form above to discover schemes you're eligible for
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemesPage;