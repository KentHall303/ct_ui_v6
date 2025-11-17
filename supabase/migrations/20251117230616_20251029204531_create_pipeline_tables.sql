-- Create sales_cycles table
CREATE TABLE IF NOT EXISTS sales_cycles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  order_position integer NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create opportunities table
CREATE TABLE IF NOT EXISTS opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name text NOT NULL,
  company_name text,
  email text,
  phone text,
  sales_cycle_id uuid REFERENCES sales_cycles(id) ON DELETE CASCADE,
  estimated_value numeric DEFAULT 0,
  priority text DEFAULT 'medium',
  lead_source text,
  contact_type text DEFAULT 'Prospect',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE sales_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

-- Create policies for sales_cycles (temporary public access for demo)
CREATE POLICY "Allow public read access to sales_cycles"
  ON sales_cycles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to sales_cycles"
  ON sales_cycles FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update to sales_cycles"
  ON sales_cycles FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from sales_cycles"
  ON sales_cycles FOR DELETE
  TO public
  USING (true);

-- Create policies for opportunities (temporary public access for demo)
CREATE POLICY "Allow public read access to opportunities"
  ON opportunities FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to opportunities"
  ON opportunities FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update to opportunities"
  ON opportunities FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from opportunities"
  ON opportunities FOR DELETE
  TO public
  USING (true);

-- Insert default sales cycle stages
INSERT INTO sales_cycles (name, order_position, is_active) VALUES
  ('Lead', 1, true),
  ('Qualified', 2, true),
  ('Meeting Scheduled', 3, true),
  ('Proposal Sent', 4, true),
  ('Negotiation', 5, true),
  ('Won', 6, true),
  ('Lost', 7, true);

-- Insert sample opportunities
INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT 
  'John Smith',
  'ABC Corporation',
  'john@abccorp.com',
  '555-0101',
  id,
  25000,
  'high',
  'Website',
  'Client'
FROM sales_cycles WHERE name = 'Lead' LIMIT 1;

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT 
  'Sarah Johnson',
  'XYZ Industries',
  'sarah@xyzind.com',
  '555-0102',
  id,
  50000,
  'high',
  'Referral',
  'Client'
FROM sales_cycles WHERE name = 'Qualified' LIMIT 1;

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT 
  'Mike Davis',
  'Tech Solutions',
  'mike@techsol.com',
  '555-0103',
  id,
  35000,
  'medium',
  'Cold Call',
  'Prospect'
FROM sales_cycles WHERE name = 'Meeting Scheduled' LIMIT 1;

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT 
  'Emily Brown',
  'Global Enterprises',
  'emily@globalent.com',
  '555-0104',
  id,
  75000,
  'high',
  'Website',
  'Client'
FROM sales_cycles WHERE name = 'Proposal Sent' LIMIT 1;

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT 
  'Robert Wilson',
  'Innovative Co',
  'robert@innovco.com',
  '555-0105',
  id,
  40000,
  'medium',
  'LinkedIn',
  'Client'
FROM sales_cycles WHERE name = 'Negotiation' LIMIT 1;