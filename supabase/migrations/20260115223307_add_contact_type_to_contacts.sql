/*
  # Add contact_type column to contacts table

  1. Schema Changes
    - Add `contact_type` column to `contacts` table
    - Values: 'client', 'employee', 'partner', 'vendor', 'other'
    - Default: 'client' for backward compatibility

  2. Indexes
    - Add index on contact_type for efficient filtering

  3. Notes
    - Existing contacts will default to 'client' type
    - This enables the Contacts All page to show all contact types
    - Each contact type can have its own pipeline and sales cycles
*/

-- Add contact_type column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contacts' AND column_name = 'contact_type'
  ) THEN
    ALTER TABLE contacts ADD COLUMN contact_type text DEFAULT 'client';
  END IF;
END $$;

-- Update existing contacts without a contact_type to 'client'
UPDATE contacts SET contact_type = 'client' WHERE contact_type IS NULL;

-- Add index for efficient filtering by contact_type
CREATE INDEX IF NOT EXISTS idx_contacts_contact_type ON contacts(contact_type);

-- Add composite index for common queries
CREATE INDEX IF NOT EXISTS idx_contacts_type_opportunity ON contacts(contact_type, opportunity_id);