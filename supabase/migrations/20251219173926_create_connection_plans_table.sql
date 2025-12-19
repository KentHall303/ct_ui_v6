/*
  # Create Connection Plans Table

  ## Overview
  Creates the connection_plans table for managing automated connection/action plans.

  ## New Tables
    - `connection_plans`
      - `id` (uuid, primary key)
      - `name` (text, required) - Plan name
      - `description` (text, optional)
      - `contact_types` (text) - Comma-separated contact type identifiers
      - `next_plan` (text, optional) - Next plan to trigger
      - `lead_sources` (text, optional) - Comma-separated lead sources
      - `specific_date` (text, optional) - Date trigger
      - `plan_id` (text, optional) - External plan ID
      - `count` (integer, default 0) - Execution count
      - `is_active` (boolean, default true)
      - `show_only_here` (boolean, default false)
      - `build_pending_traditional` (boolean, default false)
      - `build_pending_domino` (boolean, default false)
      - `protect_from_overwriting` (boolean, default false)
      - `created_at`, `updated_at` (timestamptz)

  ## Security
    - RLS enabled with public access for demo
*/

CREATE TABLE IF NOT EXISTS connection_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  contact_types text NOT NULL DEFAULT '',
  next_plan text,
  lead_sources text,
  specific_date text,
  plan_id text,
  count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  show_only_here boolean DEFAULT false,
  build_pending_traditional boolean DEFAULT false,
  build_pending_domino boolean DEFAULT false,
  protect_from_overwriting boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE connection_plans ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_connection_plans_is_active ON connection_plans(is_active);
CREATE INDEX IF NOT EXISTS idx_connection_plans_contact_types ON connection_plans(contact_types);
CREATE INDEX IF NOT EXISTS idx_connection_plans_created_at ON connection_plans(created_at);

DROP POLICY IF EXISTS "Public read access" ON connection_plans;
CREATE POLICY "Public read access"
  ON connection_plans
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public insert access" ON connection_plans;
CREATE POLICY "Public insert access"
  ON connection_plans
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public update access" ON connection_plans;
CREATE POLICY "Public update access"
  ON connection_plans
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public delete access" ON connection_plans;
CREATE POLICY "Public delete access"
  ON connection_plans
  FOR DELETE
  USING (true);