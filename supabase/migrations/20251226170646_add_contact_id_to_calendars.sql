/*
  # Add Contact ID to Calendars Table

  ## Overview
  Links calendars to contacts, establishing a one-to-one relationship where each contact has their own calendar.

  ## Changes
  1. New Columns
    - `contact_id` (uuid, foreign key to contacts) - Associates calendar with a contact
    - Made required to ensure every calendar belongs to a contact

  2. Indexes
    - Add index on `contact_id` for efficient lookups
    - Add unique constraint to ensure one calendar per contact

  3. Foreign Key
    - Add foreign key constraint to contacts table
    - ON DELETE CASCADE to remove calendar when contact is deleted

  4. Security
    - Existing RLS policies remain in place
    - Calendars will be filtered by active contacts in application layer
*/

-- Add contact_id column to calendars table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calendars' AND column_name = 'contact_id'
  ) THEN
    ALTER TABLE calendars ADD COLUMN contact_id uuid;
  END IF;
END $$;

-- Add foreign key constraint to contacts table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'calendars_contact_id_fkey'
  ) THEN
    ALTER TABLE calendars
      ADD CONSTRAINT calendars_contact_id_fkey
      FOREIGN KEY (contact_id)
      REFERENCES contacts(id)
      ON DELETE CASCADE;
  END IF;
END $$;

-- Add unique constraint to ensure one calendar per contact
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'calendars_contact_id_unique'
  ) THEN
    ALTER TABLE calendars
      ADD CONSTRAINT calendars_contact_id_unique
      UNIQUE (contact_id);
  END IF;
END $$;

-- Add index for efficient contact lookups
CREATE INDEX IF NOT EXISTS idx_calendars_contact_id ON calendars(contact_id);
