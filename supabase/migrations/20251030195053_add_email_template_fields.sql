/*
  # Add Email Template Fields

  ## Overview
  This migration adds the required fields for email templates: subject, contact_type, and exclude_client.

  ## Changes
    - Add `subject` (text, optional) - Email subject line
    - Add `contact_type` (text, optional) - Type of contact (All, Client, Employee, Partner, Vendor, etc.)
    - Add `exclude_client` (boolean, default false) - Whether to exclude client from this template

  ## Notes
    - These fields are specific to email templates but won't affect other template categories
    - contact_type defaults to 'All' for backwards compatibility
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
END $$;