/*
  # Create contacts table

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, optional)
      - `cell_phone` (text, optional)
      - `state` (text, optional)
      - `sales_cycle` (text, optional) - stores the display name of the sales cycle
      - `lead_source` (text, optional)
      - `created_date` (text, optional)
      - `white_board` (text, optional) - notes/whiteboard field
      - `status_color` (text, optional) - bootstrap color class for status
      - `is_starred` (boolean, default false)
      - `client_tether` (text, optional)
      - `assigned_user` (text, optional)
      - `next_date` (text, optional)
      - `favorite_color` (text, optional)
      - `opportunity_id` (uuid, optional, foreign key to opportunities)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `contacts` table
    - Add policy for anonymous access (temporary for demo)
    
  3. Indexes
    - Add index on opportunity_id for filtering
    - Contacts with opportunity_id IS NOT NULL are shown on Contacts page
    - Contacts with opportunity_id IS NULL are hidden from Contacts page
*/

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  cell_phone text,
  state text,
  sales_cycle text,
  lead_source text,
  created_date text,
  white_board text,
  status_color text,
  is_starred boolean DEFAULT false,
  client_tether text,
  assigned_user text,
  next_date text,
  favorite_color text,
  opportunity_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add foreign key constraint to opportunities
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'contacts_opportunity_id_fkey'
  ) THEN
    ALTER TABLE contacts
      ADD CONSTRAINT contacts_opportunity_id_fkey
      FOREIGN KEY (opportunity_id)
      REFERENCES opportunities(id)
      ON DELETE SET NULL;
  END IF;
END $$;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_contacts_opportunity_id ON contacts(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_contacts_name ON contacts(name);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous access (temporary for demo purposes)
CREATE POLICY "Allow anonymous access to contacts"
  ON contacts
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create policy for authenticated users
CREATE POLICY "Allow authenticated users to access contacts"
  ON contacts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
