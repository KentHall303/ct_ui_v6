/*
  # Add NOT NULL Constraints to Users Table

  1. Changes
    - Add NOT NULL constraint to `phone` column
    - Add NOT NULL constraint to `address` column
    - Add NOT NULL constraint to `city` column
    - Add NOT NULL constraint to `state` column
    - Add NOT NULL constraint to `zipcode` column

  2. Notes
    - All existing records have been populated with data
    - These constraints prevent future records from missing mandatory fields
*/

-- Add NOT NULL constraints
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;
ALTER TABLE users ALTER COLUMN address SET NOT NULL;
ALTER TABLE users ALTER COLUMN city SET NOT NULL;
ALTER TABLE users ALTER COLUMN state SET NOT NULL;
ALTER TABLE users ALTER COLUMN zipcode SET NOT NULL;
