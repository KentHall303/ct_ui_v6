/*
  # Add Messages-Contacts Relationship

  1. Changes
    - Add foreign key constraint from messages.contact_id to contacts.id
    - Add index on messages.contact_id for optimized contact lookups
    - Set up ON DELETE SET NULL to preserve messages if contact is deleted
  
  2. Security
    - No RLS changes (uses existing messages table policies)
  
  3. Notes
    - contact_id is nullable to support messages not yet linked to contacts
    - Index improves query performance when filtering messages by contact
*/

-- Add index on contact_id for performance
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'messages' 
    AND indexname = 'idx_messages_contact_id'
  ) THEN
    CREATE INDEX idx_messages_contact_id ON messages(contact_id);
  END IF;
END $$;

-- Add foreign key constraint if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_messages_contact_id'
    AND table_name = 'messages'
  ) THEN
    ALTER TABLE messages 
    ADD CONSTRAINT fk_messages_contact_id 
    FOREIGN KEY (contact_id) 
    REFERENCES contacts(id) 
    ON DELETE SET NULL;
  END IF;
END $$;