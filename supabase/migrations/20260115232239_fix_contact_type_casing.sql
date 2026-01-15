/*
  # Fix Contact Type Casing

  1. Problem
    - Frontend expects capitalized contact types: 'Client', 'Employee', 'Partner', 'Vendor', 'Other'
    - Database has lowercase values: 'client', 'employee', 'partner', 'vendor', 'other'
    - This causes the Clients page to not find contacts

  2. Changes
    - Update all contacts with lowercase contact_type to capitalized values
    - Update all opportunities with lowercase contact_type to capitalized values
    - Update default value for contact_type column to 'Client'
    - Set any NULL contact_type values to 'Client'

  3. Notes
    - This migration is idempotent and safe to run multiple times
    - All contacts on the Clients page will have contact_type = 'Client'
*/

UPDATE contacts SET contact_type = 'Client' WHERE contact_type = 'client' OR contact_type IS NULL;
UPDATE contacts SET contact_type = 'Employee' WHERE contact_type = 'employee';
UPDATE contacts SET contact_type = 'Partner' WHERE contact_type = 'partner';
UPDATE contacts SET contact_type = 'Vendor' WHERE contact_type = 'vendor';
UPDATE contacts SET contact_type = 'Other' WHERE contact_type = 'other';

UPDATE opportunities SET contact_type = 'Client' WHERE contact_type = 'client' OR contact_type IS NULL;
UPDATE opportunities SET contact_type = 'Employee' WHERE contact_type = 'employee';
UPDATE opportunities SET contact_type = 'Partner' WHERE contact_type = 'partner';
UPDATE opportunities SET contact_type = 'Vendor' WHERE contact_type = 'vendor';
UPDATE opportunities SET contact_type = 'Other' WHERE contact_type = 'other';
UPDATE opportunities SET contact_type = 'Client' WHERE contact_type = 'Client' OR contact_type = 'Prospect';

ALTER TABLE contacts ALTER COLUMN contact_type SET DEFAULT 'Client';
