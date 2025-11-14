/*
  # Add Content TCPA Field to Templates Table

  ## Overview
  This migration adds a content_tcpa field to the templates table to track the TCPA 
  (Telephone Consumer Protection Act) classification for email templates.

  ## Changes
    1. New Column Added:
      - `content_tcpa` (text, default 'Promotional') - TCPA classification for email content
        - Valid values: 'Promotional', 'Transactional', 'Mixed'
        - Constraint ensures only these three values are allowed

  ## Notes
    - Default value is 'Promotional' to match current modal behavior
    - CHECK constraint ensures data integrity by limiting allowed values
    - This field is specifically for email templates to ensure TCPA compliance
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'content_tcpa'
  ) THEN
    ALTER TABLE templates ADD COLUMN content_tcpa text DEFAULT 'Promotional' 
      CHECK (content_tcpa IN ('Promotional', 'Transactional', 'Mixed'));
  END IF;
END $$;
