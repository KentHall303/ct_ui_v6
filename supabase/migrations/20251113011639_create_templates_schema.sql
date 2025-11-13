/*
  # Create Templates Schema

  ## Overview
  This migration creates the templates system for managing email, task, text, appointment invites, notes/logs, and export list templates.

  ## New Tables
    - `templates`
      - `id` (uuid, primary key) - Unique identifier for the template
      - `name` (text, required) - Template name/title
      - `description` (text, optional) - Template description
      - `category` (text, required) - Template category (email, task, text, appt_invites, notes_logs, export_list)
      - `content` (text, required) - Template content/body
      - `variables` (jsonb, optional) - Template variables for dynamic content
      - `tags` (text[], optional) - Tags for organizing templates
      - `is_active` (boolean, default true) - Whether template is active
      - `usage_count` (integer, default 0) - Number of times template has been used
      - `last_used_at` (timestamptz, optional) - Last time template was used
      - `created_by` (uuid, optional) - User who created the template
      - `created_at` (timestamptz, default now()) - Creation timestamp
      - `updated_at` (timestamptz, default now()) - Last update timestamp

  ## Security
    - Enable RLS on `templates` table
    - Add policies for authenticated users to manage their templates

  ## Indexes
    - Index on category for faster filtering
    - Index on tags for search functionality
    - Index on is_active for filtering active templates
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
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
CREATE INDEX IF NOT EXISTS idx_templates_tags ON templates USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_templates_is_active ON templates(is_active);
CREATE INDEX IF NOT EXISTS idx_templates_created_by ON templates(created_by);

CREATE POLICY "Users can view all active templates"
  ON templates
  FOR SELECT
  TO authenticated
  USING (is_active = true OR created_by = auth.uid());

CREATE POLICY "Users can insert their own templates"
  ON templates
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own templates"
  ON templates
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can delete their own templates"
  ON templates
  FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());