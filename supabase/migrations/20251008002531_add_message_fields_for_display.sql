/*
  # Add additional fields to messages table

  1. Changes
    - Add `company_name` (text) - Company/business name of the contact
    - Add `opportunity_name` (text) - Associated opportunity or deal name
    - Add `contact_type` (text) - Type of contact (candidates, resale_candidates, additional_locations, acquisitions, other)
    - Add `lead_status` (text) - Current lead status (new, contacted, qualified, lost, converted)

  2. Notes
    - All new fields are nullable to maintain compatibility with existing data
    - Contact type and lead status have CHECK constraints to ensure valid values
*/

-- Add new columns to messages table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'messages' AND column_name = 'company_name'
  ) THEN
    ALTER TABLE messages ADD COLUMN company_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'messages' AND column_name = 'opportunity_name'
  ) THEN
    ALTER TABLE messages ADD COLUMN opportunity_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'messages' AND column_name = 'contact_type'
  ) THEN
    ALTER TABLE messages ADD COLUMN contact_type text CHECK (contact_type IN ('candidates', 'resale_candidates', 'additional_locations', 'acquisitions', 'other'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'messages' AND column_name = 'lead_status'
  ) THEN
    ALTER TABLE messages ADD COLUMN lead_status text CHECK (lead_status IN ('new', 'contacted', 'qualified', 'lost', 'converted'));
  END IF;
END $$;