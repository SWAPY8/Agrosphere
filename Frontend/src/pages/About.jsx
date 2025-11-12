import React from 'react';
import './About.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">About Agrosphere</h1>
        
        <div className="about-section mission">
          <h2>Our Mission</h2>
          <p>
            Agrosphere is dedicated to empowering farmers by providing easy access to government welfare schemes. 
            We leverage cutting-edge technology to match farmers with the most relevant schemes based on their 
            unique profiles and requirements.
          </p>
        </div>

        <div className="about-section">
          <h2>Project Motivation</h2>
          <p>
            Many farmers are unaware of the numerous government schemes designed to support them. The complex 
            eligibility criteria and fragmented information make it challenging for farmers to discover and 
            apply for these benefits. Agrosphere bridges this gap by:
          </p>
          <ul>
            <li>Simplifying the scheme discovery process</li>
            <li>Providing personalized recommendations using AI</li>
            <li>Offering a user-friendly interface accessible to all</li>
            <li>Ensuring farmers don't miss out on beneficial schemes</li>
          </ul>
        </div>

        <div className="about-section tech-stack">
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <h3>Frontend</h3>
              <ul>
                <li>React.js</li>
                <li>Vite</li>
                <li>TailwindCSS</li>
                <li>Lucide Icons</li>
              </ul>
            </div>
            <div className="tech-card">
              <h3>Backend</h3>
              <ul>
                <li>Spring Boot</li>
                <li>RESTful API</li>
                <li>Port 8080</li>
              </ul>
            </div>
            <div className="tech-card">
              <h3>ML Service</h3>
              <ul>
                <li>Python</li>
                <li>Flask API</li>
                <li>Port 5000</li>
                <li>ML Algorithms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;