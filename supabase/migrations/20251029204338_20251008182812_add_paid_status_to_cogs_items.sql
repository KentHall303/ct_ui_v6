/*
  # Add Paid/Reimbursed Status to COGS Items

  1. Changes
    - Add `paid` field (boolean) - Indicates if the COGS item has been paid/reimbursed
    
  2. Notes
    - Defaults to false (unpaid)
    - This field helps track which expenses have been settled
*/

-- Add paid column to cogs_items table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cogs_items' AND column_name = 'paid'
  ) THEN
    ALTER TABLE cogs_items ADD COLUMN paid boolean NOT NULL DEFAULT false;
  END IF;
END $$;