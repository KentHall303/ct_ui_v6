/*
  # Create Bid Types Schema for Proposal Designer

  ## Overview
  This migration creates the database structure for the Bid Types Designer,
  which allows admins to define custom building blocks used by the quoting tool.

  ## New Tables

  ### `bid_types`
  Main container for bid type definitions.
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Bid type name (e.g., "Interior Painting")
  - `description` (text, nullable) - Detailed description
  - `package_template_id` (uuid, nullable) - Optional link to template/package
  - `is_archived` (boolean) - Whether this bid type is archived
  - `sort_order` (integer) - Display order in the list
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last modification timestamp

  ### `bid_categories`
  Categories within a bid type (e.g., "Prep Work", "Painting").
  - `id` (uuid, primary key) - Unique identifier
  - `bid_type_id` (uuid) - Parent bid type
  - `name` (text) - Category name
  - `description` (text, nullable) - Category description
  - `sort_order` (integer) - Display order within bid type
  - `is_archived` (boolean) - Whether this category is archived
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last modification timestamp

  ### `bid_line_items`
  Individual line items within categories.
  - `id` (uuid, primary key) - Unique identifier
  - `bid_category_id` (uuid) - Parent category
  - `line_item_type` (text) - Type of line item (e.g., "Labor", "Material")
  - `name` (text) - Line item name
  - `description` (text, nullable) - Line item description
  - `show_on_worksheet` (boolean) - WS flag
  - `show_on_workorder` (boolean) - WO flag
  - `sort_order` (integer) - Display order within category
  - `is_archived` (boolean) - Whether this line item is archived
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last modification timestamp

  ### `bid_line_item_fields`
  Custom fields for line items with formulas and validation.
  - `id` (uuid, primary key) - Unique identifier
  - `bid_line_item_id` (uuid) - Parent line item
  - `field_name` (text) - Field name (e.g., "Square Feet", "Rate")
  - `field_type` (text) - Field type (text, number, select, checkbox)
  - `default_value` (text, nullable) - Default field value
  - `field_size` (text) - Display size (small, medium, large)
  - `is_hidden` (boolean) - Whether field is hidden in UI
  - `is_required` (boolean) - Whether field is required
  - `is_taxed` (boolean) - Whether this field value is taxed
  - `sort_order` (integer) - Display order in form
  - `retail_formula` (text, nullable) - Calculation formula for retail pricing
  - `sub_rate_formula` (text, nullable) - Calculation formula for subcontractor rates
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last modification timestamp

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to manage bid types
  - Temporary demo policies allow public read access for development
*/

-- Create bid_types table
CREATE TABLE IF NOT EXISTS bid_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  package_template_id uuid,
  is_archived boolean DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bid_categories table
CREATE TABLE IF NOT EXISTS bid_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bid_type_id uuid NOT NULL REFERENCES bid_types(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  is_archived boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bid_line_items table
CREATE TABLE IF NOT EXISTS bid_line_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bid_category_id uuid NOT NULL REFERENCES bid_categories(id) ON DELETE CASCADE,
  line_item_type text NOT NULL DEFAULT 'standard',
  name text NOT NULL,
  description text,
  show_on_worksheet boolean DEFAULT false,
  show_on_workorder boolean DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  is_archived boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bid_line_item_fields table
CREATE TABLE IF NOT EXISTS bid_line_item_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bid_line_item_id uuid NOT NULL REFERENCES bid_line_items(id) ON DELETE CASCADE,
  field_name text NOT NULL,
  field_type text NOT NULL DEFAULT 'text' CHECK (field_type IN ('text', 'number', 'select', 'checkbox', 'textarea')),
  default_value text,
  field_size text DEFAULT 'medium' CHECK (field_size IN ('small', 'medium', 'large')),
  is_hidden boolean DEFAULT false,
  is_required boolean DEFAULT false,
  is_taxed boolean DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  retail_formula text,
  sub_rate_formula text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bid_categories_bid_type_id ON bid_categories(bid_type_id);
CREATE INDEX IF NOT EXISTS idx_bid_line_items_bid_category_id ON bid_line_items(bid_category_id);
CREATE INDEX IF NOT EXISTS idx_bid_line_item_fields_bid_line_item_id ON bid_line_item_fields(bid_line_item_id);
CREATE INDEX IF NOT EXISTS idx_bid_types_sort_order ON bid_types(sort_order);
CREATE INDEX IF NOT EXISTS idx_bid_categories_sort_order ON bid_categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_bid_line_items_sort_order ON bid_line_items(sort_order);

-- Enable RLS
ALTER TABLE bid_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE bid_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE bid_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bid_line_item_fields ENABLE ROW LEVEL SECURITY;

-- Policies for bid_types
CREATE POLICY "Anyone can view bid types"
  ON bid_types FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert bid types"
  ON bid_types FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update bid types"
  ON bid_types FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete bid types"
  ON bid_types FOR DELETE
  TO authenticated
  USING (true);

-- Policies for bid_categories
CREATE POLICY "Anyone can view bid categories"
  ON bid_categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert bid categories"
  ON bid_categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update bid categories"
  ON bid_categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete bid categories"
  ON bid_categories FOR DELETE
  TO authenticated
  USING (true);

-- Policies for bid_line_items
CREATE POLICY "Anyone can view bid line items"
  ON bid_line_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert bid line items"
  ON bid_line_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update bid line items"
  ON bid_line_items FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete bid line items"
  ON bid_line_items FOR DELETE
  TO authenticated
  USING (true);

-- Policies for bid_line_item_fields
CREATE POLICY "Anyone can view bid line item fields"
  ON bid_line_item_fields FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert bid line item fields"
  ON bid_line_item_fields FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update bid line item fields"
  ON bid_line_item_fields FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete bid line item fields"
  ON bid_line_item_fields FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample data for demonstration
INSERT INTO bid_types (name, description, sort_order) VALUES
  ('Interior Painting', 'Complete interior painting services including walls, trim, and ceilings', 1),
  ('Exterior Painting', 'Full exterior painting including siding, trim, doors, and windows', 2)
ON CONFLICT DO NOTHING;

-- Insert sample categories for Interior Painting
INSERT INTO bid_categories (bid_type_id, name, description, sort_order)
SELECT
  (SELECT id FROM bid_types WHERE name = 'Interior Painting' LIMIT 1),
  'Prep Work',
  'Surface preparation and masking',
  1
WHERE EXISTS (SELECT 1 FROM bid_types WHERE name = 'Interior Painting');

INSERT INTO bid_categories (bid_type_id, name, description, sort_order)
SELECT
  (SELECT id FROM bid_types WHERE name = 'Interior Painting' LIMIT 1),
  'Painting',
  'Primary painting work',
  2
WHERE EXISTS (SELECT 1 FROM bid_types WHERE name = 'Interior Painting');

-- Insert sample line items for Prep Work category
INSERT INTO bid_line_items (bid_category_id, line_item_type, name, description, show_on_worksheet, show_on_workorder, sort_order)
SELECT
  (SELECT id FROM bid_categories WHERE name = 'Prep Work' LIMIT 1),
  'Labor',
  'Wall Repair',
  'Repair holes, cracks, and imperfections in walls',
  true,
  true,
  1
WHERE EXISTS (SELECT 1 FROM bid_categories WHERE name = 'Prep Work');

INSERT INTO bid_line_items (bid_category_id, line_item_type, name, description, show_on_worksheet, show_on_workorder, sort_order)
SELECT
  (SELECT id FROM bid_categories WHERE name = 'Prep Work' LIMIT 1),
  'Material',
  'Masking & Protection',
  'Tape, plastic, and drop cloths for protection',
  true,
  false,
  2
WHERE EXISTS (SELECT 1 FROM bid_categories WHERE name = 'Prep Work');