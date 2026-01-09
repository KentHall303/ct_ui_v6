/*
  # Create Action Plans Settings Table

  1. New Tables
    - `action_plans_settings`
      - `id` (uuid, primary key)
      - `action_call_option` (text) - Options: 'default', 'ordered', 'simultaneous'
      - `action_call_divert_to_assigned_user` (boolean) - Divert calls to assigned user
      - `bcc_system_sends_action_plan_emails` (boolean)
      - `bcc_user_sends_bulk_emails` (boolean)
      - `bcc_user_sends_manual_emails` (boolean)
      - `bcc_account_owner_sends_emails` (boolean)
      - `send_today_schedule_to_owner` (boolean)
      - `send_from_assigned_user` (boolean)
      - `action_plan_email_option` (text) - Options: 'send_all', 'send_assigned_only'
      - `play_client_status_message` (boolean)
      - `ring_time_seconds` (integer) - Range 0-100
      - `phone_return_option` (text) - Options: 'default', 'ordered', 'pass_through', 'simultaneous'
      - `phone_return_divert_to_assigned_user` (boolean)
      - `business_hours_phone` (text)
      - `after_hours_phone` (text)
      - `text_notification_phone` (text)
      - `send_owner_text_operation_hours_only` (boolean)
      - `send_delayed_action_plan_texts_business_hours` (boolean)
      - `end_connection_plan_on_return_text` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `action_plans_settings` table
    - Add policy for public access (demo mode)

  3. Seed Data
    - Insert default settings record
*/

CREATE TABLE IF NOT EXISTS action_plans_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action_call_option text NOT NULL DEFAULT 'default',
  action_call_divert_to_assigned_user boolean NOT NULL DEFAULT false,
  bcc_system_sends_action_plan_emails boolean NOT NULL DEFAULT false,
  bcc_user_sends_bulk_emails boolean NOT NULL DEFAULT false,
  bcc_user_sends_manual_emails boolean NOT NULL DEFAULT false,
  bcc_account_owner_sends_emails boolean NOT NULL DEFAULT false,
  send_today_schedule_to_owner boolean NOT NULL DEFAULT false,
  send_from_assigned_user boolean NOT NULL DEFAULT true,
  action_plan_email_option text NOT NULL DEFAULT 'send_all',
  play_client_status_message boolean NOT NULL DEFAULT true,
  ring_time_seconds integer NOT NULL DEFAULT 30 CHECK (ring_time_seconds >= 0 AND ring_time_seconds <= 100),
  phone_return_option text NOT NULL DEFAULT 'default',
  phone_return_divert_to_assigned_user boolean NOT NULL DEFAULT false,
  business_hours_phone text DEFAULT '',
  after_hours_phone text DEFAULT '',
  text_notification_phone text DEFAULT '',
  send_owner_text_operation_hours_only boolean NOT NULL DEFAULT false,
  send_delayed_action_plan_texts_business_hours boolean NOT NULL DEFAULT true,
  end_connection_plan_on_return_text boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE action_plans_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to action_plans_settings"
  ON action_plans_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public insert access to action_plans_settings"
  ON action_plans_settings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public update access to action_plans_settings"
  ON action_plans_settings
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO action_plans_settings (
  action_call_option,
  action_call_divert_to_assigned_user,
  bcc_system_sends_action_plan_emails,
  bcc_user_sends_bulk_emails,
  bcc_user_sends_manual_emails,
  bcc_account_owner_sends_emails,
  send_today_schedule_to_owner,
  send_from_assigned_user,
  action_plan_email_option,
  play_client_status_message,
  ring_time_seconds,
  phone_return_option,
  phone_return_divert_to_assigned_user,
  business_hours_phone,
  after_hours_phone,
  text_notification_phone,
  send_owner_text_operation_hours_only,
  send_delayed_action_plan_texts_business_hours,
  end_connection_plan_on_return_text
) VALUES (
  'default',
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  'send_all',
  true,
  30,
  'default',
  false,
  '(303) 929-1447',
  '(303) 929-1447',
  '(801) 709-1847',
  false,
  true,
  true
);