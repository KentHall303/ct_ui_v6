/*
  # Create Jobs Calendar System
  
  This migration creates an independent calendar system for the Jobs page,
  separate from the main Calendar page calendars.
  
  1. New Tables
    - `jobs_calendars` - Calendars for the Jobs page, linked to contacts by category
      - `id` (uuid, primary key)
      - `contact_id` (uuid, references contacts) - The contact this calendar belongs to
      - `name` (text) - Display name for the calendar
      - `color` (text) - Color for visual identification
      - `is_visible` (boolean) - Whether calendar is currently visible/checked
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `jobs_calendar_events` - Events for Jobs calendars
      - `id` (uuid, primary key)
      - `jobs_calendar_id` (uuid, references jobs_calendars)
      - `title` (text) - Event title
      - `description` (text) - Event description
      - `start_date` (timestamptz) - Start date/time
      - `end_date` (timestamptz) - End date/time
      - `status` (text) - Event status
      - `quote_id` (text) - Reference to quote number
      - `contact_name` (text) - Contact name for display
      - `amount` (decimal) - Amount for display
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `quotes` - Quotes for the Jobs table
      - `id` (uuid, primary key)
      - `quote_number` (text) - Quote identifier (e.g., "New Quote #122")
      - `contact_name` (text) - Customer contact name
      - `amount` (decimal) - Total amount
      - `material` (decimal) - Material cost
      - `labor` (decimal) - Labor cost
      - `balance_due` (decimal) - Balance due
      - `start_date` (timestamptz) - Job start date
      - `end_date` (timestamptz) - Job end date
      - `wo_status` (text) - Work order status
      - `payments` (decimal) - Payments received
      - `total_cogs` (decimal) - Total cost of goods sold
      - `gross_margin` (decimal) - Gross margin percentage
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `quote_jobs` - Individual jobs within quotes (sub-rows)
      - `id` (uuid, primary key)
      - `quote_id` (uuid, references quotes)
      - `subcontractor_name` (text) - Assigned person/subcontractor
      - `bid_type` (text) - Type of bid/work
      - `start_date_time` (timestamptz) - Job start
      - `end_date_time` (timestamptz) - Job end
      - `status` (text) - Job status (Pending, Started, Completed, Need More Time, Decline, Cancelled)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Create policies for public access (for demo purposes)
*/

-- Create jobs_calendars table
CREATE TABLE IF NOT EXISTS jobs_calendars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES contacts(id) ON DELETE CASCADE,
  name text NOT NULL,
  color text DEFAULT '#3b82f6',
  is_visible boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create jobs_calendar_events table
CREATE TABLE IF NOT EXISTS jobs_calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  jobs_calendar_id uuid REFERENCES jobs_calendars(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  status text DEFAULT 'pending',
  quote_id text,
  contact_name text,
  amount decimal(12, 2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number text NOT NULL UNIQUE,
  contact_name text NOT NULL,
  amount decimal(12, 2) DEFAULT 0,
  material decimal(12, 2) DEFAULT 0,
  labor decimal(12, 2) DEFAULT 0,
  balance_due decimal(12, 2) DEFAULT 0,
  start_date timestamptz,
  end_date timestamptz,
  wo_status text DEFAULT 'pending',
  payments decimal(12, 2) DEFAULT 0,
  total_cogs decimal(12, 2) DEFAULT 0,
  gross_margin decimal(5, 2) DEFAULT 100.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create quote_jobs table (sub-rows for expandable quotes)
CREATE TABLE IF NOT EXISTS quote_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id uuid REFERENCES quotes(id) ON DELETE CASCADE,
  subcontractor_name text,
  bid_type text,
  start_date_time timestamptz,
  end_date_time timestamptz,
  status text DEFAULT 'Pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('Pending', 'Started', 'Completed', 'Need More Time', 'Decline', 'Cancelled'))
);

-- Enable RLS
ALTER TABLE jobs_calendars ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs_calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_jobs ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_calendars_contact_id ON jobs_calendars(contact_id);
CREATE INDEX IF NOT EXISTS idx_jobs_calendar_events_calendar_id ON jobs_calendar_events(jobs_calendar_id);
CREATE INDEX IF NOT EXISTS idx_jobs_calendar_events_dates ON jobs_calendar_events(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_quote_jobs_quote_id ON quote_jobs(quote_id);
CREATE INDEX IF NOT EXISTS idx_quotes_quote_number ON quotes(quote_number);

-- Create policies for demo/anonymous access
CREATE POLICY "Allow anonymous read jobs_calendars"
  ON jobs_calendars FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous insert jobs_calendars"
  ON jobs_calendars FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update jobs_calendars"
  ON jobs_calendars FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous delete jobs_calendars"
  ON jobs_calendars FOR DELETE
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous read jobs_calendar_events"
  ON jobs_calendar_events FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous insert jobs_calendar_events"
  ON jobs_calendar_events FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update jobs_calendar_events"
  ON jobs_calendar_events FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous delete jobs_calendar_events"
  ON jobs_calendar_events FOR DELETE
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous read quotes"
  ON quotes FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous insert quotes"
  ON quotes FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update quotes"
  ON quotes FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous delete quotes"
  ON quotes FOR DELETE
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous read quote_jobs"
  ON quote_jobs FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous insert quote_jobs"
  ON quote_jobs FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update quote_jobs"
  ON quote_jobs FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous delete quote_jobs"
  ON quote_jobs FOR DELETE
  TO anon
  USING (true);
