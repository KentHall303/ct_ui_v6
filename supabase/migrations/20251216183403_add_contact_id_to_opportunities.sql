/*
  # Add contact_id to opportunities table

  1. Changes
    - Add contact_id column to opportunities table
    - Set as foreign key referencing contacts(id)
    - Set ON DELETE SET NULL so when a contact is deleted, the opportunity remains (can be cleaned up separately)
    - Add index on contact_id for faster joins

  2. Notes
    - Contacts are the primary data source
    - Opportunities reference contacts through contact_id
    - When an opportunity is deleted, the contact persists but becomes hidden from Contacts page
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

-- Add index on contact_id for faster joins
CREATE INDEX IF NOT EXISTS idx_opportunities_contact_id ON opportunities(contact_id);