import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import HomePage from './pages/home';
import SchemesPage from './pages/scheme';
import AboutPage from './pages/About';
import ContactPage from './pages/contact';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // Farmer Profile State - includes land, crop, state
  const [farmerProfile, setFarmerProfile] = useState(() => {
    const saved = localStorage.getItem('farmerProfile');
    return saved ? JSON.parse(saved) : {
      name: '',
      state: '',
      landSize: '',
      cropType: '',
      phone: '',
      email: ''
    };
  });

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('farmerProfile', JSON.stringify(farmerProfile));
  }, [farmerProfile]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'schemes':
        return <SchemesPage farmerProfile={farmerProfile} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        farmerProfile={farmerProfile}
        setFarmerProfile={setFarmerProfile}
      />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;