/*
  # Temporary Anonymous Access for COGS Items (Demo/Testing Only)

  1. Changes
    - Add temporary policies to allow anonymous users to:
      - View all COGS items
      - Insert COGS items without authentication requirement
      - Update COGS items
      - Delete COGS items
    
  2. Security Notes
    - This is for DEMO/TESTING purposes only
    - In production, these policies should be removed
    - Authentication should be properly implemented before production use
*/

-- Allow anonymous users to select COGS items
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cogs_items' 
    AND policyname = 'Allow anonymous users to view COGS items (DEMO)'
  ) THEN
    CREATE POLICY "Allow anonymous users to view COGS items (DEMO)"
      ON cogs_items
      FOR SELECT
      TO anon
      USING (true);
  END IF;
END $$;

-- Allow anonymous users to insert COGS items
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cogs_items' 
    AND policyname = 'Allow anonymous users to insert COGS items (DEMO)'
  ) THEN
    CREATE POLICY "Allow anonymous users to insert COGS items (DEMO)"
      ON cogs_items
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;

-- Allow anonymous users to update COGS items
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cogs_items' 
    AND policyname = 'Allow anonymous users to update COGS items (DEMO)'
  ) THEN
    CREATE POLICY "Allow anonymous users to update COGS items (DEMO)"
      ON cogs_items
      FOR UPDATE
      TO anon
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Allow anonymous users to delete COGS items
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cogs_items' 
    AND policyname = 'Allow anonymous users to delete COGS items (DEMO)'
  ) THEN
    CREATE POLICY "Allow anonymous users to delete COGS items (DEMO)"
      ON cogs_items
      FOR DELETE
      TO anon
      USING (true);
  END IF;
END $$;