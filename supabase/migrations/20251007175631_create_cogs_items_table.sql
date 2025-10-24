/*
  # Create COGS (Cost of Goods Sold) Items Table

  1. New Tables
    - `cogs_items`
      - `id` (uuid, primary key) - Unique identifier for each COGS item
      - `proposal_id` (text) - Reference to the proposal this COGS item belongs to
      - `name` (text, required) - Name/description of the cost item
      - `cost` (decimal, required) - Cost amount in dollars
      - `type` (text, required) - Either 'labor' or 'material'
      - `subcontractor` (text, optional) - Subcontractor name if applicable
      - `receipt_image_url` (text, optional) - URL to uploaded receipt image
      - `created_at` (timestamptz) - Timestamp when the item was created
      - `updated_at` (timestamptz) - Timestamp when the item was last updated
      - `created_by` (uuid) - User who created this item
      
  2. Security
    - Enable RLS on `cogs_items` table
    - Add policy for authenticated users to read COGS items
    - Add policy for authenticated users to insert their own COGS items
    - Add policy for authenticated users to update their own COGS items
    - Add policy for authenticated users to delete their own COGS items

  3. Indexes
    - Add index on `proposal_id` for efficient querying by proposal
    - Add index on `created_by` for efficient querying by user
*/

-- Create COGS items table
CREATE TABLE IF NOT EXISTS cogs_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id text NOT NULL,
  name text NOT NULL,
  cost decimal(10, 2) NOT NULL DEFAULT 0.00,
  type text NOT NULL CHECK (type IN ('labor', 'material')),
  subcontractor text,
  receipt_image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE cogs_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view COGS items"
  ON cogs_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own COGS items"
  ON cogs_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own COGS items"
  ON cogs_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own COGS items"
  ON cogs_items FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_cogs_items_proposal_id ON cogs_items(proposal_id);
CREATE INDEX IF NOT EXISTS idx_cogs_items_created_by ON cogs_items(created_by);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_cogs_items_updated_at'
  ) THEN
    CREATE TRIGGER update_cogs_items_updated_at
      BEFORE UPDATE ON cogs_items
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;