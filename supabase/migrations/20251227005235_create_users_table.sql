/*
  # Create Users Table

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `username` (text, unique) - User's login username
      - `first_name` (text) - User's first name
      - `last_name` (text) - User's last name
      - `email` (text, unique) - User's email address
      - `phone` (text) - User's phone number
      - `user_type` (text) - Type of user: standard, admin, salesperson, subcontractor
      - `api_id` (text) - External API identifier
      - `timezone` (text) - User's timezone preference
      - `default_page` (text) - Default landing page
      - `default_contact_tab` (text) - Default contact tab view
      - `is_active` (boolean) - Whether user is active
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `users` table
    - Add policy for anonymous access (demo mode)

  3. Indexes
    - Index on `user_type` for filtering queries
    - Index on `email` for lookups
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  user_type text NOT NULL DEFAULT 'standard',
  api_id text,
  timezone text DEFAULT 'America/Denver',
  default_page text DEFAULT 'Pipeline',
  default_contact_tab text DEFAULT 'Contacts',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_user_type CHECK (user_type IN ('standard', 'admin', 'salesperson', 'subcontractor'))
);

CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access to users"
  ON users FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous insert access to users"
  ON users FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update access to users"
  ON users FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous delete access to users"
  ON users FOR DELETE
  TO anon
  USING (true);