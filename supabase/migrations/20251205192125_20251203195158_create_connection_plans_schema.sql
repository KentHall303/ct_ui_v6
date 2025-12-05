/*
  # Create Connection Plans Schema

  ## Overview
  This migration creates the connection_plans table for managing automated connection/action plans
  that can be triggered based on contact types, lead sources, and specific dates.

  ## New Tables
    - `connection_plans`
      - `id` (uuid, primary key) - Unique identifier for the connection plan
      - `name` (text, required) - Connection plan name
      - `contact_types` (text, required) - Comma-separated contact type identifiers
      - `next_plan` (text, optional) - ID or name of the next plan to trigger
      - `lead_sources` (text, optional) - Comma-separated lead source identifiers
      - `specific_date` (text, optional) - Specific date trigger (ISO format or relative)
      - `plan_id` (text, optional) - External plan identifier
      - `count` (integer, default 0) - Number of times this plan has been executed
      - `is_active` (boolean, default true) - Whether the plan is active
      - `show_only_here` (boolean, default false) - Visibility flag
      - `build_pending_traditional` (boolean, default false) - Traditional build pending flag
      - `build_pending_domino` (boolean, default false) - Domino build pending flag
      - `protect_from_overwriting` (boolean, default false) - Protection flag
      - `created_at` (timestamptz, default now()) - Creation timestamp
      - `updated_at` (timestamptz, default now()) - Last update timestamp

  ## Security
    - Enable RLS on `connection_plans` table
    - Add public access policies for demo purposes

  ## Indexes
    - Index on is_active for filtering active plans
    - Index on contact_types for faster lookups
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS connection_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_types text NOT NULL,
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

-- Public access policies for demo purposes
CREATE POLICY "Public read access"
  ON connection_plans
  FOR SELECT
  USING (true);

CREATE POLICY "Public insert access"
  ON connection_plans
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public update access"
  ON connection_plans
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public delete access"
  ON connection_plans
  FOR DELETE
  USING (true);