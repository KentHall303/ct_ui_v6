/*
  # Add contact_id to opportunities table

  1. Changes
    - Add contact_id column to opportunities table
    - Set as foreign key referencing contacts(id)
    - Set ON DELETE SET NULL so when a contact is deleted, opportunity persists
    - Add index on contact_id for filtering

  2. Notes
    - Creates bidirectional relationship between contacts and opportunities
    - Both tables can reference each other
*/

-- Add contact_id column to opportunities table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'opportunities' AND column_name = 'contact_id'
  ) THEN
    ALTER TABLE opportunities ADD COLUMN contact_id uuid;
  END IF;
END $$;

-- Add foreign key constraint (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'opportunities_contact_id_fkey'
  ) THEN
    ALTER TABLE opportunities
      ADD CONSTRAINT opportunities_contact_id_fkey
      FOREIGN KEY (contact_id)
      REFERENCES contacts(id)
      ON DELETE SET NULL;
  END IF;
END $$;

-- Add index on contact_id for filtering
CREATE INDEX IF NOT EXISTS idx_opportunities_contact_id ON opportunities(contact_id);