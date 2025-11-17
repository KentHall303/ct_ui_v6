/*
  # Add Appointment Invite Template Fields

  ## Overview
  This migration adds appointment invite specific fields to the templates table to support
  the appointment invites template functionality.

  ## Changes Made
    1. New Columns Added to `templates` table:
      - `subject` (text) - Email subject line for appointment invites
      - `additional_emails` (text) - Comma-separated list of additional email recipients
      - `calendar_title` (text) - Title for internal calendar event
      - `external_calendar_title` (text) - Title for external calendar invite
      - `contact_type` (text) - Contact type filter (Client, Vendor, Employee, All, etc.)
      - `select_token` (text) - Token selection for dynamic content
      - `protect_from_overwriting` (boolean, default false) - Protection flag

  ## Notes
    - These fields are optional and will be null for non-appointment invite templates
    - Fields support the appt_invites category template functionality
    - No RLS policy changes needed as existing policies cover these new fields
*/

-- Add subject field for email subject lines
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'subject'
  ) THEN
    ALTER TABLE templates ADD COLUMN subject text;
  END IF;
END $$;

-- Add additional_emails field
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'additional_emails'
  ) THEN
    ALTER TABLE templates ADD COLUMN additional_emails text;
  END IF;
END $$;

-- Add calendar_title field
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'calendar_title'
  ) THEN
    ALTER TABLE templates ADD COLUMN calendar_title text;
  END IF;
END $$;

-- Add external_calendar_title field
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'external_calendar_title'
  ) THEN
    ALTER TABLE templates ADD COLUMN external_calendar_title text;
  END IF;
END $$;

-- Add contact_type field
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'contact_type'
  ) THEN
    ALTER TABLE templates ADD COLUMN contact_type text;
  END IF;
END $$;

-- Add select_token field
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'select_token'
  ) THEN
    ALTER TABLE templates ADD COLUMN select_token text;
  END IF;
END $$;

-- Add protect_from_overwriting field
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'protect_from_overwriting'
  ) THEN
    ALTER TABLE templates ADD COLUMN protect_from_overwriting boolean DEFAULT false;
  END IF;
END $$;