/*
  # Recreate Templates Table with Correct Schema

  ## Overview
  Creates the templates table for managing email, task, text, appointment invites,
  notes/logs, and export list templates.

  ## New Tables
    - `templates`
      - `id` (uuid, primary key)
      - `name` (text, required) - Template name
      - `description` (text, optional)
      - `category` (text, required) - email, task, text, appt_invites, notes_logs, export_list
      - `content` (text, required) - Template content
      - `variables` (jsonb, optional) - Template variables
      - `tags` (text[], optional)
      - `is_active` (boolean, default true)
      - `usage_count` (integer, default 0)
      - `last_used_at` (timestamptz, optional)
      - `created_by` (uuid, optional)
      - `created_at`, `updated_at` (timestamptz)
      - Email specific: subject, contact_type, exclude_client, additional_emails, bcc_email, content_tcpa
      - Text specific: select_token, protect_from_overwriting, protect_from_sharing
      - Task specific: title, detail, due_in_days, assignee_type, priority
      - Appointment specific: calendar_title, external_calendar_title

  ## Security
    - RLS enabled with public access for demo
*/

CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('email', 'task', 'text', 'appt_invites', 'notes_logs', 'export_list')),
  content text NOT NULL,
  variables jsonb DEFAULT '{}',
  tags text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  usage_count integer DEFAULT 0,
  last_used_at timestamptz,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  subject text,
  contact_type text DEFAULT 'All',
  exclude_client boolean DEFAULT false,
  additional_emails text,
  bcc_email text,
  content_tcpa text CHECK (content_tcpa IS NULL OR content_tcpa IN ('Promotional', 'Transactional', 'Mixed')),

  select_token text,
  protect_from_overwriting boolean DEFAULT false,
  protect_from_sharing boolean DEFAULT false,

  title text,
  detail text,
  due_in_days integer,
  assignee_type text CHECK (assignee_type IS NULL OR assignee_type IN ('account_owner', 'assigned_user', 'specific_user')),
  priority text,

  calendar_title text,
  external_calendar_title text
);

ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
CREATE INDEX IF NOT EXISTS idx_templates_tags ON templates USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_templates_is_active ON templates(is_active);

DROP POLICY IF EXISTS "Allow public read access to templates" ON templates;
CREATE POLICY "Allow public read access to templates"
  ON templates FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Allow public insert access to templates" ON templates;
CREATE POLICY "Allow public insert access to templates"
  ON templates FOR INSERT
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access to templates" ON templates;
CREATE POLICY "Allow public update access to templates"
  ON templates FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete access to templates" ON templates;
CREATE POLICY "Allow public delete access to templates"
  ON templates FOR DELETE
  TO public
  USING (true);