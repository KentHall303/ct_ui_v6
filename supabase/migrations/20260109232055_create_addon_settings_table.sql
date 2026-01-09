/*
  # Create Add-Ons Settings Table

  1. New Tables
    - `addon_settings`
      - `id` (uuid, primary key)
      - `addon_id` (text, unique) - unique identifier for each addon
      - `enabled` (boolean, default false) - whether addon is enabled
      - `input_value` (text, nullable) - stores token/config value for addons that need it
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `addon_settings` table
    - Add policy for authenticated users to read all addon settings
    - Add policy for authenticated users to update addon settings
    - Add policy for authenticated users to insert addon settings

  3. Notes
    - This table stores the enabled/disabled state and configuration values for all addons
    - Each addon has a unique addon_id that corresponds to the hard-coded addon list
    - The input_value field stores tokens, access codes, or other configuration data
*/

CREATE TABLE IF NOT EXISTS addon_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  addon_id text UNIQUE NOT NULL,
  enabled boolean DEFAULT false,
  input_value text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE addon_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read addon settings"
  ON addon_settings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert addon settings"
  ON addon_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update addon settings"
  ON addon_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous to read addon settings"
  ON addon_settings FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous to insert addon settings"
  ON addon_settings FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous to update addon settings"
  ON addon_settings FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);