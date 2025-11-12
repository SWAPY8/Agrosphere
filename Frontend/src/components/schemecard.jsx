import React from 'react';
import './schemecard.css';

const SchemeCard = ({ title, description, eligibility, link }) => {
  return (
    <div className="scheme-card">
      <div className="scheme-card-header">
        <h3>{title}</h3>
      </div>
      <div className="scheme-card-body">
        <p className="scheme-description">{description}</p>
        
        {eligibility && (
          <div className="scheme-eligibility">
            <h4>Eligibility:</h4>
            <p>{eligibility}</p>
          </div>
        )}
        
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="scheme-link"
          >
            Learn More →
          </a>
        )}
      </div>
    </div>
  );
};

export default SchemeCard;