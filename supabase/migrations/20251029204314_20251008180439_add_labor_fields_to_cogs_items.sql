/*
  # Add Labor-Specific Fields to COGS Items Table

  1. Changes
    - Add `date` field (date) - Date when the labor/material was incurred
    - Add `rate` field (decimal, optional) - Hourly rate for labor items
    - Add `hours` field (decimal, optional) - Hours worked for labor items
    
  2. Notes
    - For labor items: cost = rate × hours (calculated in application)
    - For material items: cost is entered directly, rate/hours remain null
    - The date field is required for both types
*/

-- Add new columns to cogs_items table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cogs_items' AND column_name = 'date'
  ) THEN
    ALTER TABLE cogs_items ADD COLUMN date date NOT NULL DEFAULT CURRENT_DATE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cogs_items' AND column_name = 'rate'
  ) THEN
    ALTER TABLE cogs_items ADD COLUMN rate decimal(10, 2);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cogs_items' AND column_name = 'hours'
  ) THEN
    ALTER TABLE cogs_items ADD COLUMN hours decimal(10, 2);
  END IF;
END $$;