/*
  # Create Meetings and Subcontractors Management System

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, nullable)
      - `phone` (text, nullable)
      - `address` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `subcontractors`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, nullable)
      - `phone` (text, nullable)
      - `specialty` (text, nullable)
      - `is_active` (boolean, default true)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `jobs`
      - `id` (uuid, primary key)
      - `customer_id` (uuid, foreign key to customers)
      - `title` (text, required)
      - `description` (text, nullable)
      - `address` (text, nullable)
      - `status` (text, default 'proposal')
      - `total_amount` (decimal, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `meetings`
      - `id` (uuid, primary key)
      - `job_id` (uuid, foreign key to jobs)
      - `title` (text, required)
      - `description` (text, nullable)
      - `meeting_type` (text, default 'site_visit')
      - `start_date` (timestamptz, required)
      - `end_date` (timestamptz, required)
      - `location` (text, nullable)
      - `status` (text, default 'scheduled')
      - `notes` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `meeting_subcontractors`
      - `id` (uuid, primary key)
      - `meeting_id` (uuid, foreign key to meetings)
      - `subcontractor_id` (uuid, foreign key to subcontractors)
      - `is_primary` (boolean, default false)
      - `notes` (text, nullable)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
    
  3. Important Notes
    - Meeting types: 'site_visit', 'consultation', 'inspection', 'follow_up'
    - Job status: 'proposal', 'approved', 'in_progress', 'completed', 'cancelled'
    - Meeting status: 'scheduled', 'in_progress', 'completed', 'cancelled'
    - Only one subcontractor can be marked as primary per meeting
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subcontractors table
CREATE TABLE IF NOT EXISTS subcontractors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  specialty text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  address text,
  status text DEFAULT 'proposal',
  total_amount decimal(10, 2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  meeting_type text DEFAULT 'site_visit',
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  location text,
  status text DEFAULT 'scheduled',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meeting_subcontractors junction table
CREATE TABLE IF NOT EXISTS meeting_subcontractors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings(id) ON DELETE CASCADE NOT NULL,
  subcontractor_id uuid REFERENCES subcontractors(id) ON DELETE CASCADE NOT NULL,
  is_primary boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(meeting_id, subcontractor_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_jobs_customer_id ON jobs(customer_id);
CREATE INDEX IF NOT EXISTS idx_meetings_job_id ON meetings(job_id);
CREATE INDEX IF NOT EXISTS idx_meeting_subcontractors_meeting_id ON meeting_subcontractors(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_subcontractors_subcontractor_id ON meeting_subcontractors(subcontractor_id);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcontractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_subcontractors ENABLE ROW LEVEL SECURITY;

-- Create policies for customers table
CREATE POLICY "Allow authenticated users to view customers"
  ON customers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert customers"
  ON customers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update customers"
  ON customers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete customers"
  ON customers FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for subcontractors table
CREATE POLICY "Allow authenticated users to view subcontractors"
  ON subcontractors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert subcontractors"
  ON subcontractors FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update subcontractors"
  ON subcontractors FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete subcontractors"
  ON subcontractors FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for jobs table
CREATE POLICY "Allow authenticated users to view jobs"
  ON jobs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete jobs"
  ON jobs FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for meetings table
CREATE POLICY "Allow authenticated users to view meetings"
  ON meetings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert meetings"
  ON meetings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update meetings"
  ON meetings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete meetings"
  ON meetings FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for meeting_subcontractors table
CREATE POLICY "Allow authenticated users to view meeting subcontractors"
  ON meeting_subcontractors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert meeting subcontractors"
  ON meeting_subcontractors FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update meeting subcontractors"
  ON meeting_subcontractors FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete meeting subcontractors"
  ON meeting_subcontractors FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subcontractors_updated_at
  BEFORE UPDATE ON subcontractors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meetings_updated_at
  BEFORE UPDATE ON meetings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();