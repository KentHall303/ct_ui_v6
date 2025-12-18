/*
  # Create Calendar Events Table with Calendar Support

  1. New Tables
    - `calendar_events`
      - `id` (uuid, primary key)
      - `title` (text, not null) - Event title
      - `description` (text, nullable) - Event details
      - `calendar_id` (uuid, foreign key) - Associated calendar for color
      - `event_type` (text) - Type: quote, installation, inspection, follow_up
      - `status` (text) - Status: pending, active, completed, overdue
      - `start_date` (timestamptz) - Event start
      - `end_date` (timestamptz) - Event end
      - `is_all_day` (boolean) - All-day flag
      - `location` (text, nullable) - Event location
      - `contact_name` (text, nullable) - Contact person
      - `contact_email` (text, nullable)
      - `contact_phone` (text, nullable)
      - `amount` (decimal, nullable)
      - `quote_number` (text, nullable)
      - `notes` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Public access policies for demo

  3. Indexes
    - Date range queries
    - Calendar filtering
*/

CREATE TABLE IF NOT EXISTS calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  calendar_id uuid REFERENCES calendars(id) ON DELETE SET NULL,
  event_type text DEFAULT 'quote' CHECK (event_type IN ('quote', 'installation', 'inspection', 'follow_up')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'overdue')),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  is_all_day boolean DEFAULT false,
  location text,
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

CREATE INDEX IF NOT EXISTS idx_calendar_events_start_date ON calendar_events(start_date);
CREATE INDEX IF NOT EXISTS idx_calendar_events_end_date ON calendar_events(end_date);
CREATE INDEX IF NOT EXISTS idx_calendar_events_calendar_id ON calendar_events(calendar_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_event_type ON calendar_events(event_type);
CREATE INDEX IF NOT EXISTS idx_calendar_events_status ON calendar_events(status);
CREATE INDEX IF NOT EXISTS idx_calendar_events_date_range ON calendar_events(start_date, end_date);

ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to calendar_events"
  ON calendar_events
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public insert access to calendar_events"
  ON calendar_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public update access to calendar_events"
  ON calendar_events
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to calendar_events"
  ON calendar_events
  FOR DELETE
  TO anon, authenticated
  USING (true);
