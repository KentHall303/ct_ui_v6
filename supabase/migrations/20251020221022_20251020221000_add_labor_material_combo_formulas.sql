/*
  # Add Labor Material Combo Formula Fields

  ## Overview
  This migration adds formula fields to support Labor Material Combo line items.
  When a line item is of type "Labor Material Combo", it needs separate formulas
  for material and labor components.

  ## Changes

  ### `bid_line_items` table
  Add the following columns:
  - `material_retail_formula` (text, nullable) - Formula for material retail pricing (used for material tax if applied)
  - `material_cogs_formula` (text, nullable) - Formula for material COGS (shows on work order)
  - `labor_retail_formula` (text, nullable) - Formula for labor retail pricing (used for labor tax if applied)
  - `labor_cogs_formula` (text, nullable) - Formula for labor COGS/sub rate (shows on work order)

  ## Notes
  - These fields are only used when line_item_type = 'Labor Material Combo'
  - The existing retail_formula field becomes "Old Retail" for combo items
  - All formulas are nullable and default to null
*/

-- Add new formula fields to bid_line_items table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bid_line_items' AND column_name = 'material_retail_formula'
  ) THEN
    ALTER TABLE bid_line_items ADD COLUMN material_retail_formula text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bid_line_items' AND column_name = 'material_cogs_formula'
  ) THEN
    ALTER TABLE bid_line_items ADD COLUMN material_cogs_formula text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bid_line_items' AND column_name = 'labor_retail_formula'
  ) THEN
    ALTER TABLE bid_line_items ADD COLUMN labor_retail_formula text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bid_line_items' AND column_name = 'labor_cogs_formula'
  ) THEN
    ALTER TABLE bid_line_items ADD COLUMN labor_cogs_formula text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bid_line_items' AND column_name = 'retail_formula'
  ) THEN
    ALTER TABLE bid_line_items ADD COLUMN retail_formula text;
  END IF;
END $$;
