/*
  # Create Calendars Table

  1. New Tables
    - `calendars`
      - `id` (uuid, primary key)
      - `name` (text, not null) - Calendar display name
      - `color` (text, not null) - Hex color code for the calendar
      - `is_active` (boolean, default true) - Whether calendar is active
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `calendars` table
    - Add policy for public read access (demo purposes)
    - Add policy for public write access (demo purposes)

  3. Notes
    - Colors will be inherited by events associated with each calendar
    - Similar to Google Calendar's calendar color system
*/

CREATE TABLE IF NOT EXISTS calendars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  color text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE calendars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to calendars"
  ON calendars
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public insert access to calendars"
  ON calendars
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public update access to calendars"
  ON calendars
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to calendars"
  ON calendars
  FOR DELETE
  TO anon, authenticated
  USING (true);
