/*
  # Add Material Source to COGS Items

  1. Changes
    - Add `material_source` field (text) - Source or supplier of materials
    
  2. Notes
    - Optional field
    - Relevant primarily for material type COGS items
*/

-- Add material_source column to cogs_items table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cogs_items' AND column_name = 'material_source'
  ) THEN
    ALTER TABLE cogs_items ADD COLUMN material_source text;
  END IF;
END $$;