/*
  # Allow Anonymous Insert for Opportunities Table

  ## Overview
  This migration adds a Row Level Security policy to allow anonymous (public) 
  users to insert records into the opportunities table. This is needed because
  the application currently operates without user authentication.

  ## Changes
  1. Drop existing restrictive INSERT policy if it exists
  2. Create new INSERT policy allowing public/anonymous access

  ## Security Note
  This is a temporary policy for development/demo purposes. In production,
  proper authentication should be implemented and this policy should be
  replaced with authenticated-only access.
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'opportunities' 
    AND policyname = 'Authenticated users can insert opportunities'
  ) THEN
    DROP POLICY "Authenticated users can insert opportunities" ON opportunities;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'opportunities' 
    AND policyname = 'Allow anonymous insert to opportunities'
  ) THEN
    CREATE POLICY "Allow anonymous insert to opportunities"
      ON opportunities FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;
