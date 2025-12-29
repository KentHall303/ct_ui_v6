/*
  # Add Address Fields to Users Table

  1. Changes
    - Add `address` column (text, nullable initially)
    - Add `city` column (text, nullable initially)
    - Add `state` column (text, nullable initially)
    - Add `zipcode` column (text, nullable initially)

  2. Notes
    - Fields are nullable initially to allow updating existing records
    - Will be made NOT NULL in a subsequent migration after data population
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'address'
  ) THEN
    ALTER TABLE users ADD COLUMN address text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'city'
  ) THEN
    ALTER TABLE users ADD COLUMN city text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'state'
  ) THEN
    ALTER TABLE users ADD COLUMN state text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'zipcode'
  ) THEN
    ALTER TABLE users ADD COLUMN zipcode text;
  END IF;
END $$;
