/*
  # Add Email Template Modal Fields

  1. Schema Changes
    - Add `additional_emails` (text) - For storing additional email addresses
    - Add `bcc_email` (text) - For BCC email address
    - Add `select_token` (text, default 'Contact ID') - For token dropdown value
    - Add `protect_from_overwriting` (boolean, default false) - Protection flag
    - Add `protect_from_sharing` (boolean, default false) - Protection flag

  2. Notes
    - All fields are nullable to maintain backward compatibility
    - Uses conditional checks to prevent errors if columns already exist
    - Default values ensure consistent behavior for new records
*/

-- Add additional_emails column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'additional_emails'
  ) THEN
    ALTER TABLE templates ADD COLUMN additional_emails text;
  END IF;
END $$;

-- Add bcc_email column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'bcc_email'
  ) THEN
    ALTER TABLE templates ADD COLUMN bcc_email text;
  END IF;
END $$;

-- Add select_token column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'select_token'
  ) THEN
    ALTER TABLE templates ADD COLUMN select_token text DEFAULT 'Contact ID';
  END IF;
END $$;

-- Add protect_from_overwriting column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'protect_from_overwriting'
  ) THEN
    ALTER TABLE templates ADD COLUMN protect_from_overwriting boolean DEFAULT false;
  END IF;
END $$;

-- Add protect_from_sharing column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'protect_from_sharing'
  ) THEN
    ALTER TABLE templates ADD COLUMN protect_from_sharing boolean DEFAULT false;
  END IF;
END $$;
