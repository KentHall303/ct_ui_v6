/*
  # Add opportunity_id to contacts table

  1. Changes
    - Add opportunity_id column to contacts table
    - Set as foreign key referencing opportunities(id)
    - Set ON DELETE SET NULL so when an opportunity is deleted, contact persists but becomes hidden from Contacts page
    - Add index on opportunity_id for filtering

  2. Notes
    - Contacts with opportunity_id IS NOT NULL are shown on Contacts page
    - Contacts with opportunity_id IS NULL are hidden from Contacts page (but persist in database)
    - The sales_cycle column will be synced from the linked opportunity's sales_cycle name
*/

-- Add opportunity_id column to contacts table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contacts' AND column_name = 'opportunity_id'
  ) THEN
    ALTER TABLE contacts ADD COLUMN opportunity_id uuid;
  END IF;
END $$;

-- Add foreign key constraint (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'contacts_opportunity_id_fkey'
  ) THEN
    ALTER TABLE contacts
      ADD CONSTRAINT contacts_opportunity_id_fkey
      FOREIGN KEY (opportunity_id)
      REFERENCES opportunities(id)
      ON DELETE SET NULL;
  END IF;
END $$;

-- Add index on opportunity_id for filtering
CREATE INDEX IF NOT EXISTS idx_contacts_opportunity_id ON contacts(opportunity_id);