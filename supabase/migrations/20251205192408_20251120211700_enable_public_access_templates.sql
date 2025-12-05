/*
  # Remove Templates RLS and Enable Public Access

  ## Overview
  This migration removes all authentication-based RLS policies from the templates table
  and enables full public access for demo/placeholder purposes.

  ## Changes
    1. Drop all existing RLS policies
    2. Disable RLS on templates table (or create open public policies)
    3. Allow anonymous users full CRUD access to templates

  ## Security Notes
    - This is for demo/placeholder purposes only
    - All users (authenticated and anonymous) have full access
    - No authentication or authorization required
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow all to view active templates" ON templates;
DROP POLICY IF EXISTS "Allow authenticated users to insert templates" ON templates;
DROP POLICY IF EXISTS "Allow users to update their own templates" ON templates;
DROP POLICY IF EXISTS "Allow users to delete their own templates" ON templates;
DROP POLICY IF EXISTS "Allow anonymous to view templates" ON templates;
DROP POLICY IF EXISTS "Users can view all active templates" ON templates;
DROP POLICY IF EXISTS "Users can insert their own templates" ON templates;
DROP POLICY IF EXISTS "Users can update their own templates" ON templates;
DROP POLICY IF EXISTS "Users can delete their own templates" ON templates;

-- Create simple public policies for all operations
CREATE POLICY "Public read access"
  ON templates
  FOR SELECT
  USING (true);

CREATE POLICY "Public insert access"
  ON templates
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public update access"
  ON templates
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public delete access"
  ON templates
  FOR DELETE
  USING (true);