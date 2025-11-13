CREATE DATABASE IF NOT EXISTS agrosphere;
USE agrosphere;
-- farmer table
CREATE TABLE IF NOT EXISTS farmer (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(20),
  state VARCHAR(100),
  district VARCHAR(100),
  village VARCHAR(100),
  land_size FLOAT,
  land_unit VARCHAR(20),
  crops VARCHAR(255),
  income FLOAT,
  preferred_language VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- scheme table
CREATE TABLE IF NOT EXISTS scheme (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  eligibility JSON,
  benefits TEXT,
  region VARCHAR(255),
  crops VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- recommendation logs
CREATE TABLE IF NOT EXISTS recommendation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farmer_id INT,
  scheme_id INT,
  score FLOAT,
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farmer_id) REFERENCES farmer(id) ON DELETE SET NULL,
  FOREIGN KEY (scheme_id) REFERENCES scheme(id) ON DELETE SET NULL
);
