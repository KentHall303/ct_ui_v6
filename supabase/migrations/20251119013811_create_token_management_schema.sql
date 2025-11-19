/*
  # Create Token Management Schema

  1. New Tables
    - `token_categories`
      - `id` (uuid, primary key)
      - `name` (text) - Category name like "Contact", "Account", etc.
      - `display_order` (integer) - Order for displaying categories
      - `is_active` (boolean) - Whether category is active
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `tokens`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key to token_categories)
      - `token_value` (text) - The actual token value
      - `display_order` (integer) - Order within the category
      - `is_active` (boolean) - Whether token is active
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (for dropdowns)
    - Add policies for authenticated users to manage tokens

  3. Indexes
    - Add index on category_id for faster token lookups
    - Add index on display_order for both tables
*/

-- Create token_categories table
CREATE TABLE IF NOT EXISTS token_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tokens table
CREATE TABLE IF NOT EXISTS tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES token_categories(id) ON DELETE CASCADE,
  token_value text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tokens_category_id ON tokens(category_id);
CREATE INDEX IF NOT EXISTS idx_tokens_display_order ON tokens(display_order);
CREATE INDEX IF NOT EXISTS idx_token_categories_display_order ON token_categories(display_order);

-- Enable RLS
ALTER TABLE token_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tokens ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can view tokens for dropdowns)
CREATE POLICY "Anyone can view active token categories"
  ON token_categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view active tokens"
  ON tokens FOR SELECT
  USING (is_active = true);

-- Create policies for authenticated users to manage tokens
CREATE POLICY "Authenticated users can insert token categories"
  ON token_categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update token categories"
  ON token_categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete token categories"
  ON token_categories FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert tokens"
  ON tokens FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tokens"
  ON tokens FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tokens"
  ON tokens FOR DELETE
  TO authenticated
  USING (true);