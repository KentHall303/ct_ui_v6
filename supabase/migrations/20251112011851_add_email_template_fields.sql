/*
  # Add Email-Specific Fields to Templates Table

  ## Overview
  This migration adds email-specific columns to the templates table to support
  email template functionality including subject, contact type, recipients, and
  protection settings.

  ## Changes
    1. New Columns Added:
      - `subject` (text) - Email subject line
      - `contact_type` (text, default 'All') - Contact type filter (All, Client, Employee, Partner, Vendor)
      - `exclude_client` (boolean, default false) - Whether to exclude client from recipients
      - `additional_emails` (text) - Additional email addresses to include
      - `bcc_email` (text) - BCC email address
      - `select_token` (text) - Token selection for email personalization
      - `protect_from_overwriting` (boolean, default false) - Prevents template from being overwritten
      - `protect_from_sharing` (boolean, default false) - Prevents template from being shared

  ## Notes
    - All new fields are nullable to maintain backward compatibility with existing templates
    - Default values are provided where appropriate
    - These fields are specifically for email templates but won't break other template types
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'subject'
  ) THEN
    ALTER TABLE templates ADD COLUMN subject text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'contact_type'
  ) THEN
    ALTER TABLE templates ADD COLUMN contact_type text DEFAULT 'All';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'exclude_client'
  ) THEN
    ALTER TABLE templates ADD COLUMN exclude_client boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'additional_emails'
  ) THEN
    ALTER TABLE templates ADD COLUMN additional_emails text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'bcc_email'
  ) THEN
    ALTER TABLE templates ADD COLUMN bcc_email text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'select_token'
  ) THEN
    ALTER TABLE templates ADD COLUMN select_token text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'protect_from_overwriting'
  ) THEN
    ALTER TABLE templates ADD COLUMN protect_from_overwriting boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'protect_from_sharing'
  ) THEN
    ALTER TABLE templates ADD COLUMN protect_from_sharing boolean DEFAULT false;
  END IF;
END $$;
