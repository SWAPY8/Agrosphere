import React from 'react';
import { Home, FileText, Info, Mail, Menu, X, User } from 'lucide-react';
import './navbar.css';

const Navbar = ({ 
  currentPage, 
  setCurrentPage, 
  mobileMenuOpen, 
  setMobileMenuOpen,
  showProfile,
  setShowProfile,
  farmerProfile,
  setFarmerProfile
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'schemes', label: 'Schemes', icon: FileText },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const handleProfileUpdate = async (e) => {
  e.preventDefault();
  
  // Validate required fields
  if (!farmerProfile.name || !farmerProfile.state || !farmerProfile.landSize || !farmerProfile.cropType) {
    alert('Please fill all required fields: Name, State, Land Size, and Crop Type');
    return;
  }
  
  try {
    // Call backend API to save profile
    const response = await fetch('http://localhost:8080/api/farmer/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: farmerProfile.name,
        state: farmerProfile.state,
        landSize: parseFloat(farmerProfile.landSize),
        cropType: farmerProfile.cropType,
        phone: farmerProfile.phone,
        email: farmerProfile.email
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      // Store profile ID in localStorage for future reference
      localStorage.setItem('profileId', data.id);
      
      setShowProfile(false);
      alert('Profile saved successfully to database! Visit Schemes page to see personalized recommendations.');
    } else {
      alert('Error saving profile: ' + data.message);
    }
    
  } catch (error) {
    console.error('Error saving profile:', error);
    alert('Failed to save profile to database. Please ensure backend is running.');
    
    // Fallback: Still close modal and save to localStorage
    setShowProfile(false);
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFarmerProfile({
      ...farmerProfile,
      [name]: value
    });
  };

  const isProfileComplete = farmerProfile.name && farmerProfile.state && 
                            farmerProfile.landSize && farmerProfile.cropType;

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            {/* Logo */}
            <div className="navbar-logo" onClick={() => setCurrentPage('home')}>
              <span className="logo-icon">🌾</span>
              <span className="logo-text">Agrosphere</span>
            </div>

            {/* Desktop Navigation */}
            <div className="navbar-links">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Profile Icon with status indicator */}
            <div className="navbar-actions">
              <button 
                className={`profile-icon ${isProfileComplete ? 'profile-complete' : 'profile-incomplete'}`}
                onClick={() => setShowProfile(!showProfile)}
                title={isProfileComplete ? 'Farmer Profile (Complete)' : 'Farmer Profile (Incomplete)'}
              >
                <User size={20} />
                {!isProfileComplete && <span className="profile-dot"></span>}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`mobile-nav-link ${currentPage === item.id ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Profile Modal */}
      {showProfile && (
        <div className="profile-modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <h2>Farmer Profile</h2>
              <button onClick={() => setShowProfile(false)} className="close-btn">
                <X size={24} />
              </button>
            </div>
            <div className="profile-modal-body">
              <div className="profile-avatar">
                <User size={48} />
              </div>
              
              {!isProfileComplete && (
                <div className="profile-warning">
                  <span>⚠️</span>
                  <p>Complete your profile to get personalized scheme recommendations</p>
                </div>
              )}

              {/* Required Fields */}
              <div className="form-section">
                <h3>Required Information</h3>
                
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={farmerProfile.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label>State *</label>
                  <select
                    name="state"
                    value={farmerProfile.state}
                    onChange={handleInputChange}
                  >
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Land Size (acres) *</label>
                  <input
                    type="number"
                    name="landSize"
                    value={farmerProfile.landSize}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    placeholder="Enter land size"
                  />
                </div>

                <div className="form-group">
                  <label>Crop Type *</label>
                  <select
                    name="cropType"
                    value={farmerProfile.cropType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Crop Type</option>
                    <option value="Rice">Rice</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Sugarcane">Sugarcane</option>
                    <option value="Maize">Maize</option>
                    <option value="Pulses">Pulses</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Oilseeds">Oilseeds</option>
                    <option value="Tea">Tea</option>
                    <option value="Coffee">Coffee</option>
                    <option value="Spices">Spices</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Optional Fields */}
              <div className="form-section optional">
                <h3>Optional Information</h3>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={farmerProfile.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={farmerProfile.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <button onClick={handleProfileUpdate} className="save-profile-btn">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;