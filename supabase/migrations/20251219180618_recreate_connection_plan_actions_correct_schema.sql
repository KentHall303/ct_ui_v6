/*
  # Recreate Connection Plan Actions Table with Correct Schema

  ## Overview
  Creates the connection_plan_actions table with the CORRECT schema including:
  - step_number, action_name, delivery_timing, delivery_type, add_notifications, display_order

  ## New Tables
    - `connection_plan_actions`
      - `id` (uuid, primary key) - Unique identifier for the action
      - `connection_plan_id` (uuid, foreign key, required) - Reference to parent connection plan
      - `step_number` (integer, required) - Sequential step number in the plan
      - `action_name` (text, required) - Name/description of the action
      - `action_type` (text, optional) - Type of action (email, task, call, etc.)
      - `delivery_timing` (text, optional) - When to deliver (immediate, scheduled, etc.)
      - `delivery_type` (text, required) - How to deliver (email, sms, notification, etc.)
      - `add_notifications` (boolean, default false) - Whether to add notifications
      - `display_order` (integer, required) - Order for displaying actions
      - `action_config` (jsonb, optional) - Additional configuration for the action
      - `created_at` (timestamptz, default now()) - Creation timestamp

  ## Security
    - RLS enabled with public access for demo
*/

CREATE TABLE IF NOT EXISTS connection_plan_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_plan_id uuid NOT NULL REFERENCES connection_plans(id) ON DELETE CASCADE,
  step_number integer NOT NULL,
  action_name text NOT NULL,
  action_type text,
  delivery_timing text,
  delivery_type text NOT NULL,
  add_notifications boolean DEFAULT false,
  display_order integer NOT NULL,
  action_config jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE connection_plan_actions ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_connection_plan_actions_plan_id ON connection_plan_actions(connection_plan_id);
CREATE INDEX IF NOT EXISTS idx_connection_plan_actions_display_order ON connection_plan_actions(display_order);
CREATE INDEX IF NOT EXISTS idx_connection_plan_actions_action_type ON connection_plan_actions(action_type);

DROP POLICY IF EXISTS "Allow public read access to connection_plan_actions" ON connection_plan_actions;
CREATE POLICY "Allow public read access to connection_plan_actions"
  ON connection_plan_actions FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Allow public insert access to connection_plan_actions" ON connection_plan_actions;
CREATE POLICY "Allow public insert access to connection_plan_actions"
  ON connection_plan_actions FOR INSERT
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access to connection_plan_actions" ON connection_plan_actions;
CREATE POLICY "Allow public update access to connection_plan_actions"
  ON connection_plan_actions FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete access to connection_plan_actions" ON connection_plan_actions;
CREATE POLICY "Allow public delete access to connection_plan_actions"
  ON connection_plan_actions FOR DELETE
  TO public
  USING (true);