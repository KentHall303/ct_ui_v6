/*
  # Add Contact Category to Contacts Table
  
  Adds a contact_category field to classify contacts as Estimator, Field Manager, or Subcontractor
  for the Jobs Calendar sidebar grouping.
  
  1. Schema Changes
    - Add `contact_category` column to contacts table
    - Values: 'Estimator', 'Field Manager', 'Subcontractor'
    - Default: 'Estimator'
  
  2. Index
    - Add index on contact_category for efficient filtering
*/

-- Add contact_category column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contacts' AND column_name = 'contact_category'
  ) THEN
    ALTER TABLE contacts ADD COLUMN contact_category text DEFAULT 'Estimator';
  END IF;
END $$;

-- Create index for filtering by category
CREATE INDEX IF NOT EXISTS idx_contacts_category ON contacts(contact_category);
