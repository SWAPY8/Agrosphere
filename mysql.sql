CREATE DATABASE agrosphere_db;
USE agrosphere_db;

CREATE TABLE farmer_profiles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    state VARCHAR(100) NOT NULL,
    land_size DECIMAL(10, 2) NOT NULL,
    crop_type VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_email (email)
);

CREATE INDEX idx_state ON farmer_profiles(state);
CREATE INDEX idx_crop_type ON farmer_profiles(crop_type);


