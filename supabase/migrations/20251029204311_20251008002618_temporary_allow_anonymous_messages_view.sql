/*
  # Temporarily allow anonymous viewing of messages for demo purposes

  1. Changes
    - Add a policy to allow anonymous users to view messages (for demonstration)
    - This is temporary and should be removed in production

  2. Security Note
    - This policy allows unauthenticated access to messages
    - In production, ensure proper authentication is in place
*/

-- Drop existing SELECT policy if it exists
DROP POLICY IF EXISTS "Users can view own messages" ON messages;
DROP POLICY IF EXISTS "Allow anonymous message viewing for demo" ON messages;

-- Create new policy that allows both authenticated users to see their own messages
-- and anonymous users to see all messages (for demo purposes only)
CREATE POLICY "Allow message viewing"
  ON messages FOR SELECT
  USING (
    auth.uid() = user_id OR user_id IS NULL OR auth.uid() IS NULL
  );