/*
  # Create Calendar Events Schema

  ## Overview
  Creates comprehensive calendar event management system with support for:
  - Multiple event types (quotes, installations, inspections, follow-ups)
  - Event status tracking (pending, active, completed, overdue)
  - Multi-day event support
  - Estimator assignment

  ## New Tables
  
  ### `estimators`
  - `id` (uuid, primary key)
  - `name` (text, required) - Full name of estimator
  - `email` (text, nullable) - Contact email
  - `phone` (text, nullable) - Contact phone
  - `is_active` (boolean, default true) - Active status
  - `color` (text, default '#0d6efd') - Display color for calendar
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### `calendar_events`
  - `id` (uuid, primary key)
  - `title` (text, required) - Event title/name
  - `description` (text, nullable) - Event details
  - `event_type` (text, default 'quote') - Type: quote, installation, inspection, follow_up
  - `status` (text, default 'pending') - Status: pending, active, completed, overdue
  - `start_date` (timestamptz, required) - Event start date and time
  - `end_date` (timestamptz, required) - Event end date and time
  - `is_all_day` (boolean, default false) - All-day event flag
  - `location` (text, nullable) - Event location
  - `estimator_id` (uuid, foreign key) - Assigned estimator
  - `contact_name` (text, nullable) - Contact person name
  - `contact_email` (text, nullable) - Contact email
  - `contact_phone` (text, nullable) - Contact phone
  - `amount` (decimal, nullable) - Event monetary value
  - `quote_number` (text, nullable) - Associated quote reference
  - `notes` (text, nullable) - Additional notes
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Policies for authenticated users to manage calendar data
  - Temporary anonymous access for demo purposes (to be removed in production)

  ## Indexes
  - Date range queries for calendar views
  - Estimator filtering
  - Event type and status filtering
*/

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create estimators table
CREATE TABLE IF NOT EXISTS estimators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  is_active boolean DEFAULT true,
  color text DEFAULT '#0d6efd',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create calendar_events table
CREATE TABLE IF NOT EXISTS calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_type text DEFAULT 'quote' CHECK (event_type IN ('quote', 'installation', 'inspection', 'follow_up')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'overdue')),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  is_all_day boolean DEFAULT false,
  location text,
  estimator_id uuid REFERENCES estimators(id) ON DELETE SET NULL,
  contact_name text,
  contact_email text,
  contact_phone text,
  amount decimal(10, 2),
  quote_number text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_date_range CHECK (end_date >= start_date)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_calendar_events_start_date ON calendar_events(start_date);
CREATE INDEX IF NOT EXISTS idx_calendar_events_end_date ON calendar_events(end_date);
CREATE INDEX IF NOT EXISTS idx_calendar_events_estimator_id ON calendar_events(estimator_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_event_type ON calendar_events(event_type);
CREATE INDEX IF NOT EXISTS idx_calendar_events_status ON calendar_events(status);

-- Create composite index for date range queries
CREATE INDEX IF NOT EXISTS idx_calendar_events_date_range ON calendar_events(start_date, end_date);

-- Enable Row Level Security
ALTER TABLE estimators ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

-- Estimators policies
CREATE POLICY "Allow authenticated users to view estimators"
  ON estimators FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert estimators"
  ON estimators FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update estimators"
  ON estimators FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete estimators"
  ON estimators FOR DELETE
  TO authenticated
  USING (true);

-- Calendar events policies
CREATE POLICY "Allow authenticated users to view calendar events"
  ON calendar_events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert calendar events"
  ON calendar_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update calendar events"
  ON calendar_events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete calendar events"
  ON calendar_events FOR DELETE
  TO authenticated
  USING (true);

-- Temporary anonymous access for demo (remove in production)
CREATE POLICY "Allow anonymous users to view estimators"
  ON estimators FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous users to view calendar events"
  ON calendar_events FOR SELECT
  TO anon
  USING (true);

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_estimators_updated_at ON estimators;
CREATE TRIGGER update_estimators_updated_at
  BEFORE UPDATE ON estimators
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_calendar_events_updated_at ON calendar_events;
CREATE TRIGGER update_calendar_events_updated_at
  BEFORE UPDATE ON calendar_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample estimators
INSERT INTO estimators (name, email, color, is_active) VALUES
  ('Test_Account Owner', 'test@example.com', '#198754', true),
  ('Standard Kent', 'kent@example.com', '#0d6efd', true),
  ('Sara Joe', 'sara.joe@example.com', '#6610f2', true),
  ('Jeanette Standards', 'jeanette@example.com', '#fd7e14', true),
  ('Sara Admin', 'sara.admin@example.com', '#0dcaf0', true),
  ('Absolute Nugget', 'nugget@example.com', '#20c997', true),
  ('Frank Team', 'frank@example.com', '#ffc107', true),
  ('Sara Admin Team', 'sara.team@example.com', '#d63384', true)
ON CONFLICT DO NOTHING;