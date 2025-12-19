/*
  # Create Connection Plan Actions Table

  ## Overview
  Creates the connection_plan_actions table for storing individual actions
  within connection plans.

  ## New Tables
    - `connection_plan_actions`
      - `id` (uuid, primary key)
      - `connection_plan_id` (uuid, foreign key) - Links to connection_plans
      - `action_type` (text) - Type of action
      - `sequence_order` (integer) - Order of execution
      - `action_config` (jsonb) - Action configuration
      - `created_at`, `updated_at` (timestamptz)

  ## Security
    - RLS enabled with public access for demo
*/

CREATE TABLE IF NOT EXISTS connection_plan_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_plan_id uuid NOT NULL REFERENCES connection_plans(id) ON DELETE CASCADE,
  action_type text NOT NULL CHECK (action_type IN (
    'send_email',
    'send_text',
    'create_task',
    'schedule_appointment',
    'add_note',
    'wait_delay'
  )),
  sequence_order integer NOT NULL,
  action_config jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE connection_plan_actions ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_connection_plan_actions_plan_id
  ON connection_plan_actions(connection_plan_id);

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