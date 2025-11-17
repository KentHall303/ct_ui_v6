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

-- Create policies for subcontractors table (demo - allow public access)
CREATE POLICY "Allow public to view subcontractors"
  ON subcontractors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public to insert subcontractors"
  ON subcontractors FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public to update subcontractors"
  ON subcontractors FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public to delete subcontractors"
  ON subcontractors FOR DELETE
  TO public
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