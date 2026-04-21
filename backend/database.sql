/*
====================================================
COLLEGE MANAGEMENT SYSTEM - DATABASE SCHEMA
====================================================
This file contains all SQL commands to set up
the database tables in Supabase.

Run these commands in Supabase SQL Editor:
https://app.supabase.com → Your Project → SQL Editor
====================================================
*/

-- ====================================================
-- USERS TABLE
-- ====================================================
CREATE TABLE IF NOT EXISTS users (
  user_id VARCHAR(50) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'student',
  dob DATE NOT NULL,
  is_activated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ====================================================
-- OTP TABLE (for admin authentication)
-- ====================================================
CREATE TABLE IF NOT EXISTS otps (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  otp VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create index for faster OTP lookups
CREATE INDEX IF NOT EXISTS idx_otps_user_id ON otps(user_id);
CREATE INDEX IF NOT EXISTS idx_otps_expires_at ON otps(expires_at);

-- ====================================================
-- SAMPLE ADMIN USER (for testing)
-- PASSWORD: admin123 (hashed with bcrypt)
-- ====================================================
-- INSERT INTO users (user_id, email, password, role, dob, is_activated)
-- VALUES (
--   'ADMIN001',
--   'admin@cms.com',
--   '$2b$10$...',  -- bcrypt hash of 'admin123'
--   'admin',
--   '1990-01-01',
--   true
-- );

-- ====================================================
-- SAMPLE STAFF USER (for testing)
-- ====================================================
-- INSERT INTO users (user_id, email, password, role, dob, is_activated)
-- VALUES (
--   'STAFF001',
--   'staff@cms.com',
--   '$2b$10$...',  -- bcrypt hash
--   'staff',
--   '1985-05-15',
--   true
-- );

-- ====================================================
-- SAMPLE STUDENT USER (not activated)
-- ====================================================
-- INSERT INTO users (user_id, email, password, role, dob, is_activated)
-- VALUES (
--   'STUDENT001',
--   'student@cms.com',
--   NULL,  -- Password set during activation
--   'student',
--   '2005-08-20',
--   false
-- );
