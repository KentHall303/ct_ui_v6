/*
  # Make created_by nullable for COGS items (Demo/Testing)

  1. Changes
    - Drop the foreign key constraint on created_by field
    - This allows COGS items to be created without authentication for demo purposes
    
  2. Security Notes
    - This is for DEMO/TESTING purposes only
    - In production, authentication should be properly implemented
    - The foreign key constraint should be re-added in production
*/

-- Drop the foreign key constraint on created_by if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'cogs_items_created_by_fkey' 
    AND table_name = 'cogs_items'
  ) THEN
    ALTER TABLE cogs_items DROP CONSTRAINT cogs_items_created_by_fkey;
  END IF;
END $$;