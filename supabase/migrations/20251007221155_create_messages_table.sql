/*
  # Create Messages Table for Unified Communication Hub

  1. New Tables
    - `messages`
      - `id` (uuid, primary key) - Unique message identifier
      - `contact_id` (uuid) - Reference to contact who sent/received the message
      - `type` (text) - Message type: 'text', 'call', 'email', 'thumbtack'
      - `direction` (text) - Message direction: 'inbound', 'outbound'
      - `subject` (text) - Message subject line (for emails)
      - `body` (text) - Full message content
      - `preview_text` (text) - Short preview for list view
      - `sender_name` (text) - Name of sender
      - `sender_email` (text) - Email of sender
      - `sender_phone` (text) - Phone number of sender
      - `is_read` (boolean) - Whether message has been read
      - `is_starred` (boolean) - Whether message is starred/pinned
      - `timestamp` (timestamptz) - When the message was sent/received
      - `attachments` (jsonb) - Array of attachment metadata
      - `metadata` (jsonb) - Additional message metadata
      - `created_at` (timestamptz) - Record creation timestamp
      - `user_id` (uuid) - Reference to auth.users

  2. Security
    - Enable RLS on `messages` table
    - Add policies for authenticated users to manage their own messages

  3. Indexes
    - Index on type for efficient filtering
    - Index on timestamp for sorting
    - Index on user_id and is_read for unread counts
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid,
  type text NOT NULL CHECK (type IN ('text', 'call', 'email', 'thumbtack')),
  direction text NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  subject text DEFAULT '',
  body text DEFAULT '',
  preview_text text DEFAULT '',
  sender_name text NOT NULL,
  sender_email text DEFAULT '',
  sender_phone text DEFAULT '',
  is_read boolean DEFAULT false,
  is_starred boolean DEFAULT false,
  timestamp timestamptz DEFAULT now(),
  attachments jsonb DEFAULT '[]'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users to manage their own messages
CREATE POLICY "Users can view own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own messages"
  ON messages FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_type ON messages(type);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_user_read ON messages(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_messages_user_type ON messages(user_id, type);