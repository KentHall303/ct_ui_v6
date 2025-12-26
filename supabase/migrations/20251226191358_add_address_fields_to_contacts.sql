/*
  # Add Address Fields to Contacts

  1. Schema Changes
    - Adds `address` column for street address
    - Adds `city` column for city name
    - Adds `postal_code` column for ZIP code
    - Adds `latitude` column for GPS coordinates
    - Adds `longitude` column for GPS coordinates

  2. Purpose
    - Enables map visualization of customer locations
    - Required for route planning in the Jobs dispatching view
    - Allows geographic clustering and distance calculations
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contacts' AND column_name = 'address'
  ) THEN
    ALTER TABLE contacts ADD COLUMN address text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contacts' AND column_name = 'city'
  ) THEN
    ALTER TABLE contacts ADD COLUMN city text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contacts' AND column_name = 'postal_code'
  ) THEN
    ALTER TABLE contacts ADD COLUMN postal_code text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contacts' AND column_name = 'latitude'
  ) THEN
    ALTER TABLE contacts ADD COLUMN latitude decimal(10, 7);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contacts' AND column_name = 'longitude'
  ) THEN
    ALTER TABLE contacts ADD COLUMN longitude decimal(10, 7);
  END IF;
END $$;