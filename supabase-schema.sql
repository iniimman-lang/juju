-- Supabase Database Schema for Juju
-- Run this in Supabase SQL Editor

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT DEFAULT 'FaBullhorn',
  level TEXT DEFAULT 'Beginner',
  duration TEXT NOT NULL,
  students TEXT DEFAULT '0+',
  rating REAL DEFAULT 5.0,
  price TEXT NOT NULL,
  short_desc TEXT NOT NULL,
  description TEXT NOT NULL,
  what_you_learn JSONB DEFAULT '[]',
  modules JSONB DEFAULT '[]',
  outcomes JSONB DEFAULT '[]',
  image TEXT,
  popular BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT,
  rating INTEGER DEFAULT 5,
  text TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course TEXT NOT NULL,
  message TEXT DEFAULT '',
  status TEXT DEFAULT 'pending',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default admin (password: admin123)
INSERT INTO admins (username, password, email, role) 
VALUES ('admin', 'admin123', 'admin@juju.com', 'superadmin')
ON CONFLICT (username) DO NOTHING;

-- Enable Row Level Security (optional - disable for now)
-- ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
