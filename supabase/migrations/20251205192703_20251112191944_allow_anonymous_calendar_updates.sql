/*
  # Allow Anonymous Calendar Updates for Testing

  1. Changes
    - Add temporary policy to allow anonymous users to update calendar events
    - This enables drag-and-drop rescheduling without authentication
  
  2. Security Notes
    - This is a temporary policy for demo/testing purposes
    - In production, this should be restricted to authenticated users only
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow anonymous users to update calendar events" ON calendar_events;

-- Allow anonymous users to update calendar events
CREATE POLICY "Allow anonymous users to update calendar events"
  ON calendar_events
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);