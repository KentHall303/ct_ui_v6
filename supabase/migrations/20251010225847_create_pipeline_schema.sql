/*
  # Create Pipeline Schema for Sales Management

  ## Overview
  This migration creates the pipeline infrastructure for managing sales opportunities
  through various stages, similar to Pipedrive functionality.

  ## New Tables

  ### `sales_cycles`
  Defines the stages that opportunities move through in the sales process.
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Stage name (e.g., "New Lead", "Proposal Sent")
  - `order_position` (integer) - Display order in pipeline (left to right)
  - `is_active` (boolean) - Whether this stage is currently in use
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last modification timestamp

  ### `opportunities`
  Tracks individual sales opportunities/leads through the pipeline.
  - `id` (uuid, primary key) - Unique identifier
  - `contact_name` (text) - Name of the contact/lead
  - `company_name` (text, nullable) - Company associated with opportunity
  - `email` (text, nullable) - Contact email
  - `phone` (text, nullable) - Contact phone
  - `sales_cycle_id` (uuid) - Current stage in pipeline
  - `estimated_value` (decimal) - Potential deal value
  - `priority` (text) - Priority level (high, medium, low)
  - `lead_source` (text, nullable) - Where the lead came from
  - `notes` (text, nullable) - Additional notes
  - `contact_type` (text) - Type (residential, commercial, etc.)
  - `created_by` (uuid, nullable) - User who created the opportunity
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last modification timestamp

  ## Security
  - Enable RLS on both tables
  - Add policies for authenticated users to read opportunities
  - Add policies for authenticated users to manage opportunities
  - Temporary demo policies allow anonymous access for development
*/

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
  sales_cycle_id uuid REFERENCES sales_cycles(id) ON DELETE SET NULL,
  estimated_value decimal(12, 2) DEFAULT 0.00,
  priority text DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  lead_source text,
  notes text,
  contact_type text DEFAULT 'residential',
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE sales_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

-- Policies for sales_cycles
CREATE POLICY "Anyone can view sales cycles"
  ON sales_cycles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert sales cycles"
  ON sales_cycles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update sales cycles"
  ON sales_cycles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for opportunities
CREATE POLICY "Anyone can view opportunities"
  ON opportunities FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert opportunities"
  ON opportunities FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update opportunities"
  ON opportunities FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete opportunities"
  ON opportunities FOR DELETE
  TO authenticated
  USING (true);

-- Insert 5-step sales cycles
INSERT INTO sales_cycles (name, order_position, is_active) VALUES
  ('New Lead', 1, true),
  ('Appointment Set', 2, true),
  ('Quoted', 3, true),
  ('Closed', 4, true),
  ('Completed', 5, true)
ON CONFLICT DO NOTHING;

-- Insert sample opportunities for New Lead (5 contacts)
INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'John Martinez',
  NULL,
  'john.martinez@email.com',
  '(555) 101-2345',
  (SELECT id FROM sales_cycles WHERE name = 'New Lead' LIMIT 1),
  15000.00,
  'high',
  'Website',
  'Default'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'New Lead');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Sarah Thompson',
  'Thompson Homes',
  'sarah@thompsonhomes.com',
  '(555) 102-3456',
  (SELECT id FROM sales_cycles WHERE name = 'New Lead' LIMIT 1),
  0.00,
  'medium',
  'Referral',
  'Default'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'New Lead');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Michael Chen',
  NULL,
  'mchen@email.com',
  '(555) 103-4567',
  (SELECT id FROM sales_cycles WHERE name = 'New Lead' LIMIT 1),
  8500.00,
  'low',
  'Google Ads',
  'Default-Residential'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'New Lead');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Lisa Anderson',
  NULL,
  'lisa.anderson@email.com',
  '(555) 104-5678',
  (SELECT id FROM sales_cycles WHERE name = 'New Lead' LIMIT 1),
  22000.00,
  'high',
  'Facebook',
  'Default'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'New Lead');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'David Brown',
  'Brown Construction',
  'dbrown@brownconstruction.com',
  '(555) 105-6789',
  (SELECT id FROM sales_cycles WHERE name = 'New Lead' LIMIT 1),
  45000.00,
  'medium',
  'Partner',
  'Default'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'New Lead');

-- Insert sample opportunities for Appointment Set (4 contacts)
INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Jennifer Wilson',
  NULL,
  'jwilson@email.com',
  '(555) 201-2345',
  (SELECT id FROM sales_cycles WHERE name = 'Appointment Set' LIMIT 1),
  18500.00,
  'high',
  'Website',
  'Default-Residential'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Appointment Set');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Robert Taylor',
  'Taylor Enterprises',
  'rtaylor@taylorenterprises.com',
  '(555) 202-3456',
  (SELECT id FROM sales_cycles WHERE name = 'Appointment Set' LIMIT 1),
  0.00,
  'medium',
  'Cold Call',
  'Default'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Appointment Set');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Amanda Garcia',
  NULL,
  'amanda.garcia@email.com',
  '(555) 203-4567',
  (SELECT id FROM sales_cycles WHERE name = 'Appointment Set' LIMIT 1),
  32000.00,
  'high',
  'Referral',
  'Default'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Appointment Set');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'James Rodriguez',
  NULL,
  'jrodriguez@email.com',
  '(555) 204-5678',
  (SELECT id FROM sales_cycles WHERE name = 'Appointment Set' LIMIT 1),
  12500.00,
  'low',
  'Google Ads',
  'Default-Residential'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Appointment Set');

-- Insert sample opportunities for Quoted (6 contacts)
INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Emily White',
  NULL,
  'ewhite@email.com',
  '(555) 301-2345',
  (SELECT id FROM sales_cycles WHERE name = 'Quoted' LIMIT 1),
  28000.00,
  'high',
  'Website',
  'Default-Residential'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Quoted');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'William Harris',
  'Harris Properties',
  'wharris@harrisproperties.com',
  '(555) 302-3456',
  (SELECT id FROM sales_cycles WHERE name = 'Quoted' LIMIT 1),
  65000.00,
  'medium',
  'Partner',
  'Default'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Quoted');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Jessica Lee',
  NULL,
  'jlee@email.com',
  '(555) 303-4567',
  (SELECT id FROM sales_cycles WHERE name = 'Quoted' LIMIT 1),
  15500.00,
  'low',
  'Facebook',
  'Default'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Quoted');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Daniel Moore',
  NULL,
  'dmoore@email.com',
  '(555) 304-5678',
  (SELECT id FROM sales_cycles WHERE name = 'Quoted' LIMIT 1),
  42000.00,
  'high',
  'Referral',
  'Default-Residential'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Quoted');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Michelle Jackson',
  'Jackson Design',
  'mjackson@jacksondesign.com',
  '(555) 305-6789',
  (SELECT id FROM sales_cycles WHERE name = 'Quoted' LIMIT 1),
  0.00,
  'medium',
  'Cold Call',
  'Default'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Quoted');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Christopher Martin',
  NULL,
  'cmartin@email.com',
  '(555) 306-7890',
  (SELECT id FROM sales_cycles WHERE name = 'Quoted' LIMIT 1),
  19500.00,
  'medium',
  'Google Ads',
  'Default'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Quoted');

-- Insert sample opportunities for Closed (7 contacts)
INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Ashley Thompson',
  NULL,
  'athompson@email.com',
  '(555) 401-2345',
  (SELECT id FROM sales_cycles WHERE name = 'Closed' LIMIT 1),
  38000.00,
  'high',
  'Website',
  'Default-Residential'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Closed');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Matthew Davis',
  'Davis Builders',
  'mdavis@davisbuilders.com',
  '(555) 402-3456',
  (SELECT id FROM sales_cycles WHERE name = 'Closed' LIMIT 1),
  125000.00,
  'high',
  'Partner',
  'Full Exterior'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Closed');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Nicole Clark',
  NULL,
  'nclark@email.com',
  '(555) 403-4567',
  (SELECT id FROM sales_cycles WHERE name = 'Closed' LIMIT 1),
  22500.00,
  'medium',
  'Referral',
  'Default'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Closed');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Andrew Lewis',
  NULL,
  'alewis@email.com',
  '(555) 404-5678',
  (SELECT id FROM sales_cycles WHERE name = 'Closed' LIMIT 1),
  15000.00,
  'low',
  'Facebook',
  'Default-Residential'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Closed');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Stephanie Walker',
  'Walker Development',
  'swalker@walkerdevelopment.com',
  '(555) 405-6789',
  (SELECT id FROM sales_cycles WHERE name = 'Closed' LIMIT 1),
  87500.00,
  'high',
  'Website',
  'Default'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Closed');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Kevin Hall',
  NULL,
  'khall@email.com',
  '(555) 406-7890',
  (SELECT id FROM sales_cycles WHERE name = 'Closed' LIMIT 1),
  31000.00,
  'medium',
  'Google Ads',
  'Default'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Closed');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Laura Young',
  NULL,
  'lyoung@email.com',
  '(555) 407-8901',
  (SELECT id FROM sales_cycles WHERE name = 'Closed' LIMIT 1),
  0.00,
  'low',
  'Cold Call',
  'Default-Residential'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Closed');

-- Insert sample opportunities for Completed (3 contacts)
INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Brian King',
  NULL,
  'bking@email.com',
  '(555) 501-2345',
  (SELECT id FROM sales_cycles WHERE name = 'Completed' LIMIT 1),
  52000.00,
  'high',
  'Referral',
  'Default-Residential'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Completed');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Rebecca Scott',
  'Scott Realty',
  'rscott@scottrealty.com',
  '(555) 502-3456',
  (SELECT id FROM sales_cycles WHERE name = 'Completed' LIMIT 1),
  98000.00,
  'medium',
  'Partner',
  'Default'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Completed');

INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Timothy Green',
  NULL,
  'tgreen@email.com',
  '(555) 503-4567',
  (SELECT id FROM sales_cycles WHERE name = 'Completed' LIMIT 1),
  28500.00,
  'low',
  'Website',
  'Default'
WHERE EXISTS (SELECT 1 FROM sales_cycles WHERE name = 'Completed');