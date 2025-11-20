/*
  # Add Appointment Invite Template Fields

  ## Overview
  This migration adds appointment invite specific fields to the templates table to support
  the appointment invites template functionality.

  ## Changes Made
    1. New Columns Added to `templates` table:
      - `calendar_title` (text) - Title for internal calendar event
      - `external_calendar_title` (text) - Title for external calendar invite

  ## Notes
    - These fields are optional and will be null for non-appointment invite templates
    - Fields support the appt_invites category template functionality
    - Other fields like subject, contact_type, etc. already exist from previous migrations
*/

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