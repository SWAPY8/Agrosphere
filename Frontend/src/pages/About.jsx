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
            We leverage cutting-edge machine learning technology to match farmers with the most relevant schemes 
            based on their unique profiles and requirements.
          </p>
        </div>

        <div className="about-section">
          <h2>How It Works</h2>
          <div className="workflow">
            <div className="workflow-step">
              <div className="step-number">1</div>
              <h3>Create Profile</h3>
              <p>Fill in your basic details: name, state, land size, and crop type</p>
            </div>
            <div className="workflow-step">
              <div className="step-number">2</div>
              <h3>Get Recommendations</h3>
              <p>Instantly see schemes based on your profile</p>
            </div>
            <div className="workflow-step">
              <div className="step-number">3</div>
              <h3>Find More</h3>
              <p>Add age, income details to discover additional schemes</p>
            </div>
            <div className="workflow-step">
              <div className="step-number">4</div>
              <h3>Apply</h3>
              <p>Visit scheme links and apply directly</p>
            </div>
          </div>
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
            <li>Providing personalized recommendations using AI/ML</li>
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
                <li>CSS3</li>
                <li>Lucide Icons</li>
              </ul>
            </div>
            <div className="tech-card">
              <h3>Backend</h3>
              <ul>
                <li>Spring Boot</li>
                <li>RESTful API</li>
                <li>Port 8080</li>
                <li>Java</li>
              </ul>
            </div>
            <div className="tech-card">
              <h3>ML Service</h3>
              <ul>
                <li>Python</li>
                <li>Flask API</li>
                <li>Port 5000</li>
                <li>Scikit-learn</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
