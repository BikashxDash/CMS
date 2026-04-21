-- ====================================================
-- INSERT TEST ADMIN USER
-- ====================================================
-- 
-- Run this in Supabase SQL Editor AFTER database.sql
-- This creates the admin account for testing
--
-- Login Credentials:
-- Email: admin@cms.com
-- Password: admin123
--
-- ====================================================

-- Check if user already exists
SELECT * FROM users WHERE email = 'admin@cms.com';

-- Insert admin user
-- Password hash is bcrypt hash of "admin123"
INSERT INTO users (user_id, email, password, role, dob, is_activated)
VALUES (
  'ADMIN001',
  'admin@cms.com',
  '$2b$10$KIX.YhPzLv8dkgC1Ip.wYuCzq4D4n6YuKP/CpJ3QD.JhZaGZ8dFoi',
  'admin',
  '1990-01-01',
  true
)
ON CONFLICT (email) DO NOTHING;

-- Verify user was created
SELECT * FROM users WHERE email = 'admin@cms.com';

-- ====================================================
-- OPTIONAL: Add more test users
-- ====================================================

-- Staff user
-- INSERT INTO users (user_id, email, password, role, dob, is_activated)
-- VALUES (
--   'STAFF001',
--   'staff@cms.com',
--   '$2b$10$JKkwfLVJ5YrC5m7Q9L2C...',
--   'staff',
--   '1985-05-15',
--   true
-- );

-- Student user (not yet activated)
-- INSERT INTO users (user_id, email, password, role, dob, is_activated)
-- VALUES (
--   'STUDENT001',
--   'student@cms.com',
--   NULL,
--   'student',
--   '2005-08-20',
--   false
-- );
