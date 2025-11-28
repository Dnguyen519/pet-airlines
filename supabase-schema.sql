-- Pet Airlines Database Schema
-- Run this in your Supabase SQL Editor

-- Create inquiries table
CREATE TABLE inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    preferred_language TEXT CHECK (preferred_language IN ('en', 'es', 'fr', 'vi', 'ko', 'zh-cn')) DEFAULT 'en',
    page_locale TEXT,
    pet_type TEXT,
    pet_breed TEXT,
    pet_weight_kg NUMERIC,
    pet_length_cm NUMERIC,
    pet_height_cm NUMERIC,
    pet_count INTEGER DEFAULT 1,
    from_country TEXT,
    from_city TEXT,
    to_country TEXT,
    to_city TEXT,
    travel_date TEXT, -- Can be approximate date string
    travel_flexibility TEXT,
    crate_status TEXT,
    special_requests TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'closed')),
    internal_notes TEXT
);

-- Enable Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (form submissions)
CREATE POLICY "Anyone can insert inquiries" ON inquiries
    FOR INSERT WITH CHECK (true);

-- Create policy for authenticated read (admin dashboard)
CREATE POLICY "Authenticated users can read inquiries" ON inquiries
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy for authenticated update (admin management)
CREATE POLICY "Authenticated users can update inquiries" ON inquiries
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create indexes for performance
CREATE INDEX inquiries_created_at_idx ON inquiries(created_at DESC);
CREATE INDEX inquiries_status_idx ON inquiries(status);
CREATE INDEX inquiries_language_idx ON inquiries(preferred_language);
CREATE INDEX inquiries_route_idx ON inquiries(from_country, to_country);

-- Insert sample data for testing
INSERT INTO inquiries (
    full_name, 
    email, 
    phone, 
    preferred_language,
    pet_type, 
    pet_breed,
    pet_weight_kg,
    pet_count,
    from_country,
    from_city,
    to_country, 
    to_city,
    travel_date,
    special_requests
) VALUES 
(
    'John Smith',
    'john.smith@email.com',
    '+1-555-0123',
    'en',
    'Dog',
    'Golden Retriever',
    25.0,
    1,
    'Canada',
    'Toronto',
    'France',
    'Paris',
    'March 2025',
    'First time traveling with pet, needs extra guidance'
),
(
    'Marie Dubois',
    'marie.dubois@email.fr',
    '+33-6-12-34-56-78',
    'fr',
    'Cat',
    'Persian',
    4.5,
    1,
    'France',
    'Lyon',
    'Canada',
    'Montreal',
    'Summer 2025',
    'EU pet passport already available'
);