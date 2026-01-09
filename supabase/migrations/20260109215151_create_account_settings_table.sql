/*
  # Create Account Settings Table

  1. New Tables
    - `account_settings`
      - `id` (uuid, primary key)
      - Personal Information fields:
        - `first_name` (text)
        - `last_name` (text)
        - `phone` (text)
        - `email` (text)
        - `country` (text)
        - `profile_image_url` (text)
        - `is_active` (boolean)
        - `record_call` (boolean)
        - `notification_sound` (boolean)
        - `right_side_panel_opened` (boolean)
        - `default_page` (text)
        - `default_contact_tab` (text)
      - Account Information fields:
        - `company` (text)
        - `account_owner` (text)
        - `website` (text)
        - `office_phone` (text)
        - `notification_auto_delete_days` (integer)
        - `address_1` (text)
        - `address_2` (text)
        - `address_3` (text)
        - `default_date_format` (text)
        - `default_time_format` (text)
      - Theme fields:
        - `theme_color` (text)
        - `header_color` (text)
        - `footer_color` (text)
        - `logo_url` (text)
      - Timestamps:
        - `created_at` (timestamptz)
        - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `account_settings` table
    - Add policy for public access (demo mode)

  3. Seed Data
    - Insert default account settings record
*/

-- Create account_settings table
CREATE TABLE IF NOT EXISTS account_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Personal Information
  first_name text DEFAULT '',
  last_name text DEFAULT '',
  phone text DEFAULT '',
  email text DEFAULT '',
  country text DEFAULT 'US',
  profile_image_url text DEFAULT '',
  is_active boolean DEFAULT true,
  record_call boolean DEFAULT true,
  notification_sound boolean DEFAULT true,
  right_side_panel_opened boolean DEFAULT true,
  default_page text DEFAULT 'Accounts',
  default_contact_tab text DEFAULT 'Log-a-Call',
  
  -- Account Information
  company text DEFAULT '',
  account_owner text DEFAULT '',
  website text DEFAULT '',
  office_phone text DEFAULT '',
  notification_auto_delete_days integer DEFAULT 30,
  address_1 text DEFAULT '',
  address_2 text DEFAULT '',
  address_3 text DEFAULT '',
  default_date_format text DEFAULT 'F j, Y',
  default_time_format text DEFAULT 'g:i a',
  
  -- Theme
  theme_color text DEFAULT '#0d6efd',
  header_color text DEFAULT '#161516',
  footer_color text DEFAULT '#b0b2b0',
  logo_url text DEFAULT '',
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE account_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for demo access (allowing anonymous read/write)
CREATE POLICY "Allow anonymous read access to account_settings"
  ON account_settings
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous insert access to account_settings"
  ON account_settings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update access to account_settings"
  ON account_settings
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous delete access to account_settings"
  ON account_settings
  FOR DELETE
  TO anon
  USING (true);

-- Insert default account settings
INSERT INTO account_settings (
  first_name,
  last_name,
  phone,
  email,
  country,
  is_active,
  record_call,
  notification_sound,
  right_side_panel_opened,
  default_page,
  default_contact_tab,
  company,
  account_owner,
  website,
  office_phone,
  notification_auto_delete_days,
  address_1,
  address_2,
  address_3,
  default_date_format,
  default_time_format,
  theme_color,
  header_color,
  footer_color
) VALUES (
  'Test_Account',
  'Owner',
  '(303) 929-1447',
  'kent@clienttether.com',
  'US',
  true,
  true,
  true,
  true,
  'Accounts',
  'Log-a-Call',
  'CT Enterprise Test Accounts',
  'The Account Owners now',
  'www.clienttether.com',
  '(801) 447-1544',
  30,
  '105 N Main St',
  'Spanish Fork, UT 84660',
  'Bond #: UT123456789',
  'F j, Y',
  'g:i a',
  '#0d6efd',
  '#161516',
  '#b0b2b0'
);