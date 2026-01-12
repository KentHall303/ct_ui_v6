/*
  # Create Saved Filters Table

  1. New Tables
    - `saved_filters`
      - `id` (uuid, primary key)
      - `name` (text, required) - display name of the filter
      - `filter_type` (text) - either "Contact Filters" or "Advanced Filters" for grouping
      - `filter_config` (jsonb) - stores the filter criteria as JSON
      - `is_active` (boolean, default true)
      - `created_by` (text, optional) - user who created the filter
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `saved_filters` table
    - Add policy for anonymous access during development
*/

CREATE TABLE IF NOT EXISTS saved_filters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  filter_type text NOT NULL DEFAULT 'Contact Filters',
  filter_config jsonb NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_by text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE saved_filters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access to saved_filters"
  ON saved_filters
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Allow anonymous insert access to saved_filters"
  ON saved_filters
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update access to saved_filters"
  ON saved_filters
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous delete access to saved_filters"
  ON saved_filters
  FOR DELETE
  TO anon
  USING (true);

INSERT INTO saved_filters (name, filter_type, filter_config) VALUES
  ('Before and After', 'Contact Filters', '{"actionPlan": "all", "salesCycle": "all"}'),
  ('New Leads Only', 'Contact Filters', '{"salesCycle": "New Lead"}'),
  ('Triple Three', 'Contact Filters', '{"state": "CA"}'),
  ('unknown lead source and apt set', 'Contact Filters', '{"leadSource": "Other"}'),
  ('can text', 'Advanced Filters', '{"advancedRows": [{"field": "cell_phone", "operator": "is_not_empty", "value": ""}]}'),
  ('Search for Kent', 'Advanced Filters', '{"advancedRows": [{"field": "name", "operator": "contains", "value": "Kent"}]}')
ON CONFLICT DO NOTHING;