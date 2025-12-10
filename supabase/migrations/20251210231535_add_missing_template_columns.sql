/*
  # Add Missing Template Columns

  ## Overview
  Adds all missing columns that are used by the template modals but weren't in the base schema.

  ## Changes
    1. Add content_tcpa column for TCPA classification
    2. Add additional template-specific columns
    3. Add calendar_title and external_calendar_title for appointment invites

  ## Notes
    - Uses IF NOT EXISTS checks to prevent errors if columns already exist
    - Provides sensible defaults for all new columns
*/

-- Add content_tcpa for email and text templates
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

-- Add title and detail for task templates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'title'
  ) THEN
    ALTER TABLE templates ADD COLUMN title text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'detail'
  ) THEN
    ALTER TABLE templates ADD COLUMN detail text;
  END IF;
END $$;

-- Add due_in_days, assignee_type, and priority for task templates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'due_in_days'
  ) THEN
    ALTER TABLE templates ADD COLUMN due_in_days integer DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'assignee_type'
  ) THEN
    ALTER TABLE templates ADD COLUMN assignee_type text DEFAULT 'assigned_user'
      CHECK (assignee_type IN ('account_owner', 'assigned_user', 'specific_user'));
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'priority'
  ) THEN
    ALTER TABLE templates ADD COLUMN priority text;
  END IF;
END $$;

-- Add calendar titles for appointment invite templates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'calendar_title'
  ) THEN
    ALTER TABLE templates ADD COLUMN calendar_title text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'external_calendar_title'
  ) THEN
    ALTER TABLE templates ADD COLUMN external_calendar_title text;
  END IF;
END $$;