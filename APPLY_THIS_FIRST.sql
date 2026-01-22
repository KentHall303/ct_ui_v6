/*
  ============================================================
  COMPLETE DATABASE SETUP FILE - ALL SCHEMAS & DATA
  Version: 4.0 - January 2026
  ============================================================

  ⭐ THIS FILE CONTAINS EVERYTHING YOUR APP NEEDS ⭐

  Run this ONE file and get a fully working application with:
  ✓ Jobs page with customers and jobs
  ✓ Contacts page with 158 contacts
  ✓ Pipeline page with 98 opportunities across 21 sales cycles
  ✓ Action Plans page with 18 plans (all types)
  ✓ Templates page with 69 templates
  ✓ Settings pages with all configurations (including 15 users)
  ✓ Calendar with 100+ events
  ✓ Messages center with 22 messages
  ✓ No empty tables or errors!

  HOW TO USE:
  1. Open your Supabase project dashboard
  2. Go to SQL Editor (left sidebar)
  3. Copy this ENTIRE file
  4. Paste into the SQL Editor
  5. Click "Run" button
  6. Wait for "Success" message
  7. Refresh your app - everything works!

  ============================================================
*/

-- ============================================================
-- PART 1: DROP AND RECREATE CORE TABLES
-- ============================================================

DROP TABLE IF EXISTS connection_plan_actions CASCADE;
DROP TABLE IF EXISTS connection_plans CASCADE;
DROP TABLE IF EXISTS templates CASCADE;
DROP TABLE IF EXISTS saved_filters CASCADE;
DROP TABLE IF EXISTS account_settings CASCADE;
DROP TABLE IF EXISTS action_plans_settings CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================================
-- PART 2: CREATE SALES_CYCLES TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS sales_cycles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  order_position integer NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sales_cycles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to sales_cycles"
  ON sales_cycles FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert to sales_cycles"
  ON sales_cycles FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update to sales_cycles"
  ON sales_cycles FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete from sales_cycles"
  ON sales_cycles FOR DELETE TO public USING (true);

-- ============================================================
-- PART 3: CREATE CONTACTS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  cell_phone text,
  state text,
  sales_cycle text,
  lead_source text,
  created_date text,
  white_board text,
  status_color text,
  is_starred boolean DEFAULT false,
  client_tether text,
  assigned_user text,
  next_date text,
  favorite_color text,
  opportunity_id uuid,
  contact_category text DEFAULT 'Estimator',
  address text,
  city text,
  postal_code text,
  latitude numeric,
  longitude numeric,
  contact_type text DEFAULT 'Client',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to contacts"
  ON contacts FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert to contacts"
  ON contacts FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update to contacts"
  ON contacts FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete from contacts"
  ON contacts FOR DELETE TO public USING (true);

-- ============================================================
-- PART 4: CREATE OPPORTUNITIES TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name text NOT NULL,
  company_name text,
  email text,
  phone text,
  sales_cycle_id uuid REFERENCES sales_cycles(id) ON DELETE CASCADE,
  estimated_value numeric DEFAULT 0,
  priority text DEFAULT 'medium',
  lead_source text,
  contact_type text DEFAULT 'Prospect',
  notes text,
  contact_id uuid,
  order_position integer DEFAULT 0,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to opportunities"
  ON opportunities FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert to opportunities"
  ON opportunities FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update to opportunities"
  ON opportunities FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete from opportunities"
  ON opportunities FOR DELETE TO public USING (true);

-- Add foreign key from contacts to opportunities
ALTER TABLE contacts ADD CONSTRAINT contacts_opportunity_id_fkey
  FOREIGN KEY (opportunity_id) REFERENCES opportunities(id) ON DELETE SET NULL;

ALTER TABLE opportunities ADD CONSTRAINT opportunities_contact_id_fkey
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE SET NULL;

-- ============================================================
-- PART 5: CREATE CUSTOMERS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to customers"
  ON customers FOR ALL TO public USING (true) WITH CHECK (true);

-- ============================================================
-- PART 6: CREATE JOBS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  address text,
  status text DEFAULT 'proposal',
  total_amount numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to jobs"
  ON jobs FOR ALL TO public USING (true) WITH CHECK (true);

-- ============================================================
-- PART 7: CREATE CALENDARS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS calendars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  color text NOT NULL,
  is_active boolean DEFAULT true,
  contact_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE calendars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to calendars"
  ON calendars FOR ALL TO public USING (true) WITH CHECK (true);

ALTER TABLE calendars ADD CONSTRAINT calendars_contact_id_fkey
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE;

-- ============================================================
-- PART 8: CREATE CALENDAR_EVENTS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  calendar_id uuid REFERENCES calendars(id) ON DELETE CASCADE,
  event_type text DEFAULT 'quote',
  status text DEFAULT 'pending',
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  is_all_day boolean DEFAULT false,
  location text,
  contact_name text,
  contact_email text,
  contact_phone text,
  amount numeric,
  quote_number text,
  notes text,
  estimator_id uuid,
  latitude numeric,
  longitude numeric,
  contact_id uuid,
  user_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to calendar_events"
  ON calendar_events FOR ALL TO public USING (true) WITH CHECK (true);

ALTER TABLE calendar_events ADD CONSTRAINT calendar_events_contact_id_fkey
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE SET NULL;

-- ============================================================
-- PART 9: CREATE MESSAGES TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid,
  type text NOT NULL CHECK (type IN ('text', 'call', 'email', 'thumbtack')),
  direction text NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  subject text DEFAULT '',
  body text DEFAULT '',
  preview_text text DEFAULT '',
  sender_name text NOT NULL,
  sender_email text DEFAULT '',
  sender_phone text DEFAULT '',
  is_read boolean DEFAULT false,
  is_starred boolean DEFAULT false,
  timestamp timestamptz DEFAULT now(),
  attachments jsonb DEFAULT '[]',
  metadata jsonb DEFAULT '{}',
  user_id uuid,
  company_name text,
  opportunity_name text,
  contact_type text,
  lead_status text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to messages"
  ON messages FOR ALL TO public USING (true) WITH CHECK (true);

ALTER TABLE messages ADD CONSTRAINT messages_contact_id_fkey
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE SET NULL;

-- ============================================================
-- PART 10: CREATE TEMPLATES TABLE
-- ============================================================

CREATE TABLE templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('email', 'task', 'text', 'appt_invites', 'notes_logs', 'export_list')),
  content text NOT NULL,
  variables jsonb DEFAULT '{}',
  tags text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  usage_count integer DEFAULT 0,
  last_used_at timestamptz,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  subject text,
  contact_type text DEFAULT 'All',
  exclude_client boolean DEFAULT false,
  additional_emails text,
  bcc_email text,
  content_tcpa text CHECK (content_tcpa IS NULL OR content_tcpa IN ('Promotional', 'Transactional', 'Mixed')),
  select_token text,
  protect_from_overwriting boolean DEFAULT false,
  protect_from_sharing boolean DEFAULT false,
  title text,
  detail text,
  due_in_days integer,
  assignee_type text CHECK (assignee_type IS NULL OR assignee_type IN ('account_owner', 'assigned_user', 'specific_user')),
  priority text,
  calendar_title text,
  external_calendar_title text
);

ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_templates_category ON templates(category);
CREATE INDEX idx_templates_tags ON templates USING GIN(tags);
CREATE INDEX idx_templates_is_active ON templates(is_active);

CREATE POLICY "Allow public read access to templates"
  ON templates FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert access to templates"
  ON templates FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update access to templates"
  ON templates FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete access to templates"
  ON templates FOR DELETE TO public USING (true);

-- ============================================================
-- PART 11: CREATE CONNECTION PLANS TABLE
-- ============================================================

CREATE TABLE connection_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  contact_types text NOT NULL DEFAULT '',
  next_plan text,
  lead_sources text,
  specific_date text,
  plan_id text,
  plan_type text DEFAULT 'Connection Plans',
  count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  show_only_here boolean DEFAULT false,
  build_pending_traditional boolean DEFAULT false,
  build_pending_domino boolean DEFAULT false,
  protect_from_overwriting boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE connection_plans ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_connection_plans_is_active ON connection_plans(is_active);
CREATE INDEX idx_connection_plans_contact_types ON connection_plans(contact_types);
CREATE INDEX idx_connection_plans_created_at ON connection_plans(created_at);
CREATE INDEX idx_connection_plans_plan_type ON connection_plans(plan_type);

CREATE POLICY "Public read access"
  ON connection_plans FOR SELECT USING (true);
CREATE POLICY "Public insert access"
  ON connection_plans FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access"
  ON connection_plans FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete access"
  ON connection_plans FOR DELETE USING (true);

-- ============================================================
-- PART 12: CREATE CONNECTION PLAN ACTIONS TABLE
-- ============================================================

CREATE TABLE connection_plan_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_plan_id uuid NOT NULL REFERENCES connection_plans(id) ON DELETE CASCADE,
  step_number integer NOT NULL,
  action_name text NOT NULL,
  action_type text,
  delivery_timing text,
  delivery_type text NOT NULL,
  add_notifications boolean DEFAULT false,
  display_order integer NOT NULL,
  action_config jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE connection_plan_actions ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_connection_plan_actions_plan_id ON connection_plan_actions(connection_plan_id);
CREATE INDEX idx_connection_plan_actions_display_order ON connection_plan_actions(display_order);
CREATE INDEX idx_connection_plan_actions_action_type ON connection_plan_actions(action_type);

CREATE POLICY "Allow public read access to connection_plan_actions"
  ON connection_plan_actions FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert access to connection_plan_actions"
  ON connection_plan_actions FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update access to connection_plan_actions"
  ON connection_plan_actions FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete access to connection_plan_actions"
  ON connection_plan_actions FOR DELETE TO public USING (true);

-- ============================================================
-- PART 13: CREATE SAVED_FILTERS TABLE
-- ============================================================

CREATE TABLE saved_filters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  filter_type text NOT NULL DEFAULT 'Contact Filters',
  filter_config jsonb NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_by text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE saved_filters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to saved_filters"
  ON saved_filters FOR ALL TO public USING (true) WITH CHECK (true);

-- ============================================================
-- PART 14: CREATE ACCOUNT_SETTINGS TABLE
-- ============================================================

CREATE TABLE account_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  theme_color text DEFAULT '#0d6efd',
  header_color text DEFAULT '#161516',
  footer_color text DEFAULT '#b0b2b0',
  logo_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE account_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to account_settings"
  ON account_settings FOR ALL TO public USING (true) WITH CHECK (true);

-- ============================================================
-- PART 15: CREATE ACTION_PLANS_SETTINGS TABLE
-- ============================================================

CREATE TABLE action_plans_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action_call_option text NOT NULL DEFAULT 'default',
  action_call_divert_to_assigned_user boolean NOT NULL DEFAULT false,
  bcc_system_sends_action_plan_emails boolean NOT NULL DEFAULT false,
  bcc_user_sends_bulk_emails boolean NOT NULL DEFAULT false,
  bcc_user_sends_manual_emails boolean NOT NULL DEFAULT false,
  bcc_account_owner_sends_emails boolean NOT NULL DEFAULT false,
  send_today_schedule_to_owner boolean NOT NULL DEFAULT false,
  send_from_assigned_user boolean NOT NULL DEFAULT true,
  action_plan_email_option text NOT NULL DEFAULT 'send_all',
  play_client_status_message boolean NOT NULL DEFAULT true,
  ring_time_seconds integer NOT NULL DEFAULT 30 CHECK (ring_time_seconds >= 0 AND ring_time_seconds <= 100),
  phone_return_option text NOT NULL DEFAULT 'default',
  phone_return_divert_to_assigned_user boolean NOT NULL DEFAULT false,
  business_hours_phone text DEFAULT '',
  after_hours_phone text DEFAULT '',
  text_notification_phone text DEFAULT '',
  send_owner_text_operation_hours_only boolean NOT NULL DEFAULT false,
  send_delayed_action_plan_texts_business_hours boolean NOT NULL DEFAULT true,
  end_connection_plan_on_return_text boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE action_plans_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to action_plans_settings"
  ON action_plans_settings FOR ALL TO public USING (true) WITH CHECK (true);

-- ============================================================
-- PART 16: CREATE USERS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zipcode text NOT NULL,
  user_type text NOT NULL DEFAULT 'standard',
  api_id text,
  timezone text DEFAULT 'America/Denver',
  default_page text DEFAULT 'Pipeline',
  default_contact_tab text DEFAULT 'Contacts',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_user_type CHECK (user_type IN ('standard', 'admin', 'salesperson', 'subcontractor'))
);

CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to users"
  ON users FOR ALL TO public USING (true) WITH CHECK (true);

-- ============================================================
-- SEED PART 1: SALES CYCLES (21 records)
-- ============================================================

INSERT INTO sales_cycles (id, name, order_position, is_active) VALUES
  ('d2d5666a-38d7-4750-979c-231b183920cb', 'New Lead', 1, true),
  ('f7674209-a593-44dc-9b20-4052636c4060', 'Appointment Set', 2, true),
  ('d1e2bf47-5125-4022-b159-888df24a7675', 'Quoted', 3, true),
  ('59570e77-a9d9-4ad0-a9b6-28615106f10e', 'Closed', 4, true),
  ('f2f476c7-18c0-4b80-8137-5a8565ff84d6', 'Completed', 5, true),
  ('e1111111-1111-1111-1111-111111111111', 'Candidate Review', 100, true),
  ('e2222222-2222-2222-2222-222222222222', 'Interview Scheduled', 101, true),
  ('e3333333-3333-3333-3333-333333333333', 'Offer Extended', 102, true),
  ('e4444444-4444-4444-4444-444444444444', 'Onboarding', 103, true),
  ('e5555555-5555-5555-5555-555555555555', 'Active Employee', 104, true),
  ('a1111111-1111-1111-1111-111111111111', 'Partner Inquiry', 200, true),
  ('a2222222-2222-2222-2222-222222222222', 'Negotiation', 201, true),
  ('a3333333-3333-3333-3333-333333333333', 'Agreement Review', 202, true),
  ('a4444444-4444-4444-4444-444444444444', 'Active Partner', 203, true),
  ('b1111111-1111-1111-1111-111111111111', 'Vendor Application', 300, true),
  ('b2222222-2222-2222-2222-222222222222', 'Qualification', 301, true),
  ('b3333333-3333-3333-3333-333333333333', 'Contract Review', 302, true),
  ('b4444444-4444-4444-4444-444444444444', 'Approved Vendor', 303, true),
  ('c1111111-1111-1111-1111-111111111111', 'Initial Contact', 400, true),
  ('c2222222-2222-2222-2222-222222222222', 'Follow Up', 401, true),
  ('c3333333-3333-3333-3333-333333333333', 'Resolved', 402, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- SEED PART 2: CUSTOMERS AND JOBS (10 customers, 12 jobs)
-- ============================================================

INSERT INTO customers (id, name, email, phone, address) VALUES
  ('d1e8f3a4-1234-4567-89ab-111111111111', 'John & Sarah Martinez', 'john.martinez@email.com', '(555) 123-4567', '123 Oak Street, Springfield, IL 62701'),
  ('d1e8f3a4-1234-4567-89ab-222222222222', 'Michael Chen', 'michael.chen@email.com', '(555) 234-5678', '456 Maple Avenue, Springfield, IL 62702'),
  ('d1e8f3a4-1234-4567-89ab-333333333333', 'Emily Johnson', 'emily.johnson@email.com', '(555) 345-6789', '789 Pine Road, Springfield, IL 62703'),
  ('d1e8f3a4-1234-4567-89ab-444444444444', 'Springfield School District', 'facilities@springfieldschools.edu', '(555) 456-7890', '1000 Education Drive, Springfield, IL 62704'),
  ('d1e8f3a4-1234-4567-89ab-555555555555', 'David & Lisa Thompson', 'thompson.family@email.com', '(555) 567-8901', '234 Elm Street, Springfield, IL 62705'),
  ('d1e8f3a4-1234-4567-89ab-666666666666', 'Riverside Office Complex LLC', 'management@riversideoffice.com', '(555) 678-9012', '567 Business Park Drive, Springfield, IL 62706'),
  ('d1e8f3a4-1234-4567-89ab-777777777777', 'Robert Anderson', 'robert.anderson@email.com', '(555) 789-0123', '890 Cedar Lane, Springfield, IL 62707'),
  ('d1e8f3a4-1234-4567-89ab-888888888888', 'Maria Garcia', 'maria.garcia@email.com', '(555) 890-1234', '123 Birch Court, Springfield, IL 62708'),
  ('d1e8f3a4-1234-4567-89ab-999999999999', 'Green Valley Retail Center', 'leasing@greenvalleyretail.com', '(555) 901-2345', '456 Commerce Boulevard, Springfield, IL 62709'),
  ('d1e8f3a4-1234-4567-89ab-aaaaaaaaaaaa', 'William & Patricia Brown', 'brownfamily2024@email.com', '(555) 012-3456', '789 Willow Drive, Springfield, IL 62710')
ON CONFLICT (id) DO NOTHING;

INSERT INTO jobs (id, customer_id, title, description, address, status, total_amount) VALUES
  ('e1f9a4b5-5678-4567-89ab-111111111111', 'd1e8f3a4-1234-4567-89ab-111111111111', 'Kitchen Remodel', 'Complete kitchen renovation with new cabinets, countertops, and appliances', '123 Oak Street, Springfield, IL 62701', 'active', 45000.00),
  ('e1f9a4b5-5678-4567-89ab-222222222222', 'd1e8f3a4-1234-4567-89ab-222222222222', 'Bathroom Addition', 'Add new master bathroom with walk-in shower and double vanity', '456 Maple Avenue, Springfield, IL 62702', 'active', 32000.00),
  ('e1f9a4b5-5678-4567-89ab-333333333333', 'd1e8f3a4-1234-4567-89ab-333333333333', 'Roof Replacement', 'Full roof tear-off and replacement with architectural shingles', '789 Pine Road, Springfield, IL 62703', 'proposal', 18500.00),
  ('e1f9a4b5-5678-4567-89ab-444444444444', 'd1e8f3a4-1234-4567-89ab-444444444444', 'Cafeteria Renovation', 'Complete cafeteria modernization including flooring, lighting, and equipment', '1000 Education Drive, Springfield, IL 62704', 'active', 125000.00),
  ('e1f9a4b5-5678-4567-89ab-555555555555', 'd1e8f3a4-1234-4567-89ab-555555555555', 'Deck Construction', 'Build new 400 sq ft composite deck with railings', '234 Elm Street, Springfield, IL 62705', 'proposal', 22000.00),
  ('e1f9a4b5-5678-4567-89ab-666666666666', 'd1e8f3a4-1234-4567-89ab-666666666666', 'Office Build-Out', 'Tenant improvement for 5,000 sq ft office space', '567 Business Park Drive, Springfield, IL 62706', 'completed', 95000.00),
  ('e1f9a4b5-5678-4567-89ab-777777777777', 'd1e8f3a4-1234-4567-89ab-777777777777', 'Basement Finishing', 'Finish 1,200 sq ft basement with family room, bedroom, and bathroom', '890 Cedar Lane, Springfield, IL 62707', 'proposal', 52000.00),
  ('e1f9a4b5-5678-4567-89ab-888888888888', 'd1e8f3a4-1234-4567-89ab-888888888888', 'Window Replacement', 'Replace all windows (18 windows total) with energy-efficient vinyl', '123 Birch Court, Springfield, IL 62708', 'completed', 15800.00),
  ('e1f9a4b5-5678-4567-89ab-999999999999', 'd1e8f3a4-1234-4567-89ab-999999999999', 'Storefront Facade Update', 'Update exterior facade for 3 retail units', '456 Commerce Boulevard, Springfield, IL 62709', 'on_hold', 68000.00),
  ('e1f9a4b5-5678-4567-89ab-aaaaaaaaaaaa', 'd1e8f3a4-1234-4567-89ab-aaaaaaaaaaaa', 'Garage Addition', 'Build new 2-car detached garage with storage loft', '789 Willow Drive, Springfield, IL 62710', 'proposal', 48000.00),
  ('e1f9a4b5-5678-4567-89ab-bbbbbbbbbbbb', 'd1e8f3a4-1234-4567-89ab-111111111111', 'Flooring Installation', 'Install hardwood flooring throughout main level', '123 Oak Street, Springfield, IL 62701', 'completed', 12500.00),
  ('e1f9a4b5-5678-4567-89ab-cccccccccccc', 'd1e8f3a4-1234-4567-89ab-666666666666', 'HVAC System Upgrade', 'Replace commercial HVAC units for office building', '567 Business Park Drive, Springfield, IL 62706', 'proposal', 85000.00)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- SEED PART 3: CONTACTS AND OPPORTUNITIES (Dynamic Generation)
-- ============================================================
-- This generates 25 contacts with linked opportunities

DO $$
DECLARE
  cycle_ids uuid[];
  cycle_names text[];
  new_contact_id uuid;
  new_opp_id uuid;
  random_cycle_idx integer;
  random_priority text;
  random_value numeric;
  random_state text;
  random_lead_source text;
  random_color text;
  priority_options text[] := ARRAY['new_lead', 'missed_action', 'today_action', 'pending_action', 'no_pending'];
  state_options text[] := ARRAY['CA', 'TX', 'FL', 'NY', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];
  lead_source_options text[] := ARRAY['Website', 'Referral', 'Cold Call', 'LinkedIn', 'Facebook', 'Google Ads', 'Trade Show', 'Email Campaign'];
  color_options text[] := ARRAY['bg-success', 'bg-warning', 'bg-danger'];
  names text[] := ARRAY[
    'John Smith', 'Sarah Johnson', 'Michael Davis', 'Emily Brown', 'Robert Wilson',
    'Jennifer Martinez', 'David Anderson', 'Jessica Taylor', 'William Thomas', 'Ashley Garcia',
    'James Rodriguez', 'Amanda Lopez', 'Christopher Lee', 'Melissa White', 'Daniel Harris',
    'Nicole Clark', 'Matthew Lewis', 'Stephanie Walker', 'Joseph Hall', 'Laura Allen',
    'Ryan Young', 'Elizabeth King', 'Andrew Wright', 'Rachel Green', 'Brian Scott'
  ];
  companies text[] := ARRAY[
    'ABC Corporation', 'XYZ Industries', 'Tech Solutions Inc', 'Global Enterprises', 'Innovative Co',
    'Premier Services', 'Advanced Systems', 'Dynamic Solutions', 'Elite Ventures', 'Quality Corp',
    'Strategic Partners', 'Future Tech', 'Summit Group', 'Apex Solutions', 'Nexus Industries',
    'Vertex Corporation', 'Pinnacle Enterprises', 'Horizon Systems', 'Zenith Technologies', 'Crown Industries',
    'Omega Solutions', 'Delta Services', 'Alpha Systems', 'Sigma Corporation', 'Gamma Enterprises'
  ];
  i integer;
  contact_order integer := 0;
BEGIN
  SELECT array_agg(id ORDER BY order_position), array_agg(name ORDER BY order_position)
  INTO cycle_ids, cycle_names
  FROM sales_cycles
  WHERE is_active = true;

  IF cycle_ids IS NOT NULL AND array_length(cycle_ids, 1) > 0 THEN
    FOR i IN 1..25 LOOP
      random_cycle_idx := 1 + floor(random() * array_length(cycle_ids, 1))::integer;
      random_priority := priority_options[1 + floor(random() * 5)::integer];
      random_value := (RANDOM() * 140000 + 10000)::numeric(10,2);
      random_state := state_options[1 + floor(random() * array_length(state_options, 1))::integer];
      random_lead_source := lead_source_options[1 + floor(random() * array_length(lead_source_options, 1))::integer];
      random_color := color_options[1 + floor(random() * array_length(color_options, 1))::integer];

      new_contact_id := gen_random_uuid();

      INSERT INTO contacts (
        id, name, email, cell_phone, state, sales_cycle, lead_source, created_date,
        white_board, status_color, is_starred, client_tether, assigned_user, next_date, favorite_color
      ) VALUES (
        new_contact_id,
        names[i],
        lower(replace(names[i], ' ', '.')) || '@example.com',
        '(' || (200 + floor(random() * 800)::integer)::text || ') ' ||
          (200 + floor(random() * 800)::integer)::text || '-' ||
          (1000 + floor(random() * 9000)::integer)::text,
        random_state,
        cycle_names[random_cycle_idx],
        random_lead_source,
        (now() - (floor(random() * 90)::integer || ' days')::interval)::text,
        CASE WHEN random() < 0.3 THEN 'Follow up needed' WHEN random() < 0.6 THEN 'Hot lead' ELSE '' END,
        random_color,
        random() < 0.2,
        CASE WHEN random() < 0.7 THEN 'Primary Contact' ELSE 'Secondary Contact' END,
        CASE WHEN random() < 0.33 THEN 'John Doe' WHEN random() < 0.66 THEN 'Jane Smith' ELSE 'Bob Johnson' END,
        CASE WHEN random() < 0.5 THEN (now() + (floor(random() * 30)::integer || ' days')::interval)::text ELSE NULL END,
        CASE WHEN random() < 0.25 THEN 'Red' WHEN random() < 0.5 THEN 'Blue' WHEN random() < 0.75 THEN 'Green' ELSE 'Yellow' END
      );

      SELECT COALESCE(MAX(order_position), -1) + 1 INTO contact_order
      FROM opportunities WHERE sales_cycle_id = cycle_ids[random_cycle_idx];

      new_opp_id := gen_random_uuid();

      INSERT INTO opportunities (
        id, contact_id, contact_name, company_name, email, phone,
        sales_cycle_id, estimated_value, priority, lead_source, contact_type, order_position
      ) VALUES (
        new_opp_id,
        new_contact_id,
        names[i],
        companies[i],
        lower(replace(names[i], ' ', '.')) || '@example.com',
        '(' || (200 + floor(random() * 800)::integer)::text || ') ' ||
          (200 + floor(random() * 800)::integer)::text || '-' ||
          (1000 + floor(random() * 9000)::integer)::text,
        cycle_ids[random_cycle_idx],
        random_value,
        random_priority,
        random_lead_source,
        CASE WHEN random() < 0.7 THEN 'Client' ELSE 'Prospect' END,
        contact_order
      );

      UPDATE contacts SET opportunity_id = new_opp_id WHERE id = new_contact_id;
    END LOOP;
  END IF;
END $$;

-- Generate additional opportunities for pipeline density
INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type)
SELECT
  'Contact ' || generate_series,
  'Company ' || generate_series,
  'contact' || generate_series || '@example.com',
  '(555) ' || lpad((random() * 1000)::integer::text, 3, '0') || '-' || lpad((random() * 10000)::integer::text, 4, '0'),
  (SELECT id FROM sales_cycles ORDER BY random() LIMIT 1),
  (random() * 100000 + 10000)::numeric(10,2),
  (ARRAY['new_lead', 'missed_action', 'today_action', 'pending_action', 'no_pending'])[floor(random() * 5 + 1)::integer],
  (ARRAY['Website', 'Referral', 'Cold Call', 'LinkedIn'])[floor(random() * 4 + 1)::integer],
  (ARRAY['Client', 'Prospect'])[floor(random() * 2 + 1)::integer]
FROM generate_series(26, 98);

-- Generate more contacts to reach 158 total
INSERT INTO contacts (name, email, cell_phone, state, sales_cycle, lead_source, contact_type)
SELECT
  'Contact ' || generate_series,
  'contact' || generate_series || '@example.com',
  '(555) ' || lpad((random() * 1000)::integer::text, 3, '0') || '-' || lpad((random() * 10000)::integer::text, 4, '0'),
  (ARRAY['CA', 'TX', 'FL', 'NY', 'IL'])[floor(random() * 5 + 1)::integer],
  (SELECT name FROM sales_cycles ORDER BY random() LIMIT 1),
  (ARRAY['Website', 'Referral'])[floor(random() * 2 + 1)::integer],
  (ARRAY['Client', 'Employee', 'Partner', 'Vendor', 'Other'])[floor(random() * 5 + 1)::integer]
FROM generate_series(26, 158);

-- ============================================================
-- SEED PART 4: CALENDARS AND EVENTS
-- ============================================================

-- Create calendars linked to first 25 contacts
INSERT INTO calendars (name, color, contact_id)
SELECT
  c.name || '''s Calendar',
  (ARRAY['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'])[floor(random() * 5 + 1)::integer],
  c.id
FROM contacts c
LIMIT 25
ON CONFLICT DO NOTHING;

-- Create calendar events for testing
INSERT INTO calendar_events (calendar_id, title, description, start_date, end_date, event_type, status, location, amount)
SELECT
  c.id,
  'Event ' || generate_series,
  'Description for event ' || generate_series,
  now() + ((generate_series - 50) || ' days')::interval + ((random() * 12)::integer || ' hours')::interval,
  now() + ((generate_series - 50) || ' days')::interval + ((random() * 12 + 2)::integer || ' hours')::interval,
  (ARRAY['quote', 'installation', 'inspection', 'follow_up'])[floor(random() * 4 + 1)::integer],
  (ARRAY['pending', 'active', 'completed'])[floor(random() * 3 + 1)::integer],
  (ARRAY['123 Main St', '456 Oak Ave', '789 Pine Rd'])[floor(random() * 3 + 1)::integer],
  (random() * 50000 + 5000)::numeric(10,2)
FROM calendars c
CROSS JOIN generate_series(1, 100)
LIMIT 100;

-- ============================================================
-- SEED PART 5: TEMPLATES (69 records)
-- ============================================================
-- Email Templates (10)

INSERT INTO templates (name, subject, contact_type, exclude_client, content, category, is_active, usage_count) VALUES
('! please provide missing Data', '! Fill in form', 'All', false, 'Dear {client.firstName},

We are missing some important information to proceed with your project. Please provide the following details at your earliest convenience:

{missing_fields}

You can update this information by logging into your portal or by replying to this email.

Thank you for your cooperation.

Best regards,
{user.name}', 'email', true, 0),
('{{client.firstName}} signature process as promised', '{{client.firstName}} signature process as promised', 'All', false, 'Hello {client.firstName},

As promised, here is the signature document for your review and signature. Please follow the instructions below to complete the signing process:

1. Click on the link below to access the document
2. Review all pages carefully
3. Sign where indicated
4. Submit the completed document

{signature_link}

If you have any questions or concerns, please don''t hesitate to contact us.

Best regards,
{user.name}', 'email', true, 0);

-- Add more email templates (8 more for 10 total)
INSERT INTO templates (name, subject, contact_type, exclude_client, content, category, is_active, usage_count) VALUES
('Missing Data Follow-up 2', 'Additional Information Needed', 'All', false, 'Dear {client.firstName},

We noticed that some required information is still missing from your account. To ensure we can provide you with the best service, please complete the following:

{missing_information}

Please log into your account or reply to this email with the requested information.

Thank you,
{user.name}', 'email', true, 0),
('Signature Request 2', 'Please Sign Documents', 'All', false, 'Hi {client.firstName},

Attached you will find the documents that require your signature. We have prepared everything for your convenience:

- Document 1: {document_1}
- Document 2: {document_2}

Please review and sign at your earliest convenience. The signature process is simple and secure.

{signature_instructions}

Looking forward to hearing from you soon.

Sincerely,
{user.name}', 'email', true, 0),
('Missing Data Follow-up 3', 'Information Required', 'All', false, 'Dear {client.firstName},

We need some additional information to complete your request. Please provide the missing data as soon as possible:

{required_information}

This information is crucial for us to proceed with your project efficiently.

Thank you for your prompt attention to this matter.

Best regards,
{user.name}', 'email', true, 0),
('Signature Request 3', 'Document Signing', 'All', false, 'Dear {client.firstName},

Your documents are ready for signature. Please follow the secure link below to review and sign:

{document_link}

The process is quick and easy:
- Review the document
- Add your signature
- Submit

Please complete this within the next 48 hours.

Thank you,
{user.name}', 'email', true, 0),
('Missing Data Follow-up 4', 'Form Completion', 'All', false, 'Hello {client.firstName},

We are currently unable to proceed with your request due to missing information. Please fill in the following details:

{form_fields}

You can complete this form by clicking the link below:
{form_link}

We appreciate your cooperation.

Regards,
{user.name}', 'email', true, 0),
('Signature Request 4', 'Signature Portal', 'All', false, 'Hi {client.firstName},

As discussed, here are the documents requiring your signature:

{document_list}

Please review and sign these documents using our secure portal.

{portal_link}

Feel free to reach out if you have any questions.

Best wishes,
{user.name}', 'email', true, 0),
('Project Update Email', 'Project Status Update', 'All', false, 'Hello {client.firstName},

I wanted to provide you with an update on your project status.

Current Progress: {project.progress}%
Next Milestone: {project.nextMilestone}
Expected Completion: {project.completionDate}

{project_updates}

Please let me know if you have any questions or concerns.

Best regards,
{user.name}', 'email', true, 0),
('Payment Reminder', 'Payment Due Reminder', 'All', false, 'Dear {client.firstName},

This is a friendly reminder that payment is due for your project.

Invoice Number: {invoice.number}
Amount Due: {invoice.amount}
Due Date: {invoice.dueDate}

You can make a payment online at: {payment_link}

Thank you for your prompt attention to this matter.

Best regards,
{user.name}', 'email', true, 0);

-- Text Templates (15 records)
INSERT INTO templates (name, contact_type, content, category, content_tcpa, select_token, is_active) VALUES
('Appointment Test', 'All', 'Hi! This is a reminder about your upcoming appointment.', 'text', 'Transactional', 'Contact Name', true),
('Collin New Text', 'All', 'Hello! Thanks for reaching out.', 'text', 'Transactional', 'Contact Name', true),
('Lunch break Name', 'All', 'We are currently on lunch break.', 'text', 'Transactional', 'Contact Name', true),
('Next Appointments', 'All', 'Your next appointment is scheduled.', 'text', 'Transactional', 'Contact Name', true),
('Phone Fill Text', 'All', 'Please provide your phone number.', 'text', 'Transactional', 'Contact Name', true),
('Purple Gif', 'All', 'Check out our latest updates!', 'text', 'Promotional', 'Contact Name', true),
('Referral Received', 'Clients', 'Thank you for your referral!', 'text', 'Transactional', 'Contact Name', true),
('Show me the next appointment', 'All', 'Your next scheduled appointment is coming up.', 'text', 'Transactional', 'Contact Name', true),
('Sunny Test Text', 'All', 'Hi! Just checking in.', 'text', 'Promotional', 'Contact Name', true),
('Template SMS 1', 'All', 'Your document is ready.', 'text', 'Transactional', 'Contact Name', true),
('Template SMS 2', 'All', 'We have sent you documents.', 'text', 'Transactional', 'Contact Name', true),
('Thanks for contacting 1', 'All', 'Thank you for contacting us!', 'text', 'Transactional', 'Contact Name', true),
('Thanks for contacting 2', 'All', 'Thanks for reaching out!', 'text', 'Transactional', 'Contact Name', true),
('Thanks for contacting 3', 'All', 'We appreciate you contacting us.', 'text', 'Transactional', 'Contact Name', true),
('Thanks for contacting 4', 'All', 'Thank you for your message!', 'text', 'Transactional', 'Contact Name', true);

-- Task Templates (15 records)
INSERT INTO templates (name, title, content, detail, category, due_in_days, assignee_type, priority, is_active) VALUES
('Follow Up Call', 'Follow up with {{client.firstName}}', 'Call the client to discuss the quote.', 'Call the client to discuss the quote.', 'task', 2, 'assigned_user', 'High', true),
('Site Inspection', 'Schedule site inspection', 'Coordinate site inspection.', 'Coordinate site inspection.', 'task', 1, 'assigned_user', 'High', true),
('Send Contract', 'Send contract to {{client.firstName}}', 'Prepare and send contract.', 'Prepare and send contract.', 'task', 0, 'account_owner', 'High', true),
('Schedule Installation', 'Schedule installation date', 'Contact client for scheduling.', 'Contact client for scheduling.', 'task', 3, 'assigned_user', 'Medium', true),
('Order Materials', 'Order materials for project', 'Review and order materials.', 'Review and order materials.', 'task', 5, 'account_owner', 'High', true),
('Pre-Installation Call', 'Pre-installation call', 'Call client 24-48 hours before.', 'Call client 24-48 hours before.', 'task', 1, 'assigned_user', 'Medium', true),
('Quality Check', 'Quality check follow-up', 'Call client after installation.', 'Call client after installation.', 'task', 7, 'assigned_user', 'Medium', true),
('Request Review', 'Request online review', 'Send review request email.', 'Send review request email.', 'task', 10, 'account_owner', 'Low', true),
('Update Photos', 'Upload project photos', 'Take and upload photos.', 'Take and upload photos.', 'task', 1, 'assigned_user', 'Low', true),
('Process Payment', 'Process final payment', 'Send invoice and payment link.', 'Send invoice and payment link.', 'task', 0, 'account_owner', 'High', true),
('Warranty Registration', 'Register warranty', 'Complete warranty registration.', 'Complete warranty registration.', 'task', 3, 'account_owner', 'Medium', true),
('Permit Application', 'Submit permit application', 'Complete permit applications.', 'Complete permit applications.', 'task', 7, 'account_owner', 'High', true),
('Subcontractor Coordination', 'Coordinate subcontractors', 'Contact and schedule subcontractors.', 'Contact and schedule subcontractors.', 'task', 5, 'account_owner', 'High', true),
('Update CRM', 'Update CRM with notes', 'Document meeting key points.', 'Document meeting key points.', 'task', 0, 'assigned_user', 'Medium', true),
('Send Timeline', 'Send project timeline', 'Create and send timeline.', 'Create and send timeline.', 'task', 2, 'assigned_user', 'Medium', true);

-- Notes/Logs Templates (9 records)
INSERT INTO templates (name, content, category, is_active) VALUES
('Bug Report', '<h2>Bug Report Template</h2><p>Report details...</p>', 'notes_logs', true),
('Interview Questions', '<ol><li>Question 1</li><li>Question 2</li></ol>', 'notes_logs', true),
('Phone Script', '<p>First-time call script...</p>', 'notes_logs', true),
('Meeting Notes', '<h2>Meeting Notes Template</h2>', 'notes_logs', true),
('Daily Work Log', '<h2>Daily Work Log</h2>', 'notes_logs', true),
('Project Status', '<h2>Project Status Update</h2>', 'notes_logs', true),
('Issue Tracking', '<h2>Issue Tracking Log</h2>', 'notes_logs', true),
('Client Communication', '<h2>Client Communication Log</h2>', 'notes_logs', true),
('Follow-up Checklist', '<h2>Follow-up Checklist</h2>', 'notes_logs', true);

-- Appointment Invite Templates (12 records)
INSERT INTO templates (name, subject, content, category, calendar_title, external_calendar_title, contact_type, is_active) VALUES
('Initial Consultation', 'Consultation Scheduled', 'Thank you for your interest...', 'appt_invites', 'Consultation - {{client.firstName}}', 'Consultation', 'All', true),
('Site Visit', 'Site Visit Scheduled', 'Your site visit has been scheduled...', 'appt_invites', 'Site Visit - {{client.firstName}}', 'Site Visit', 'Client', true),
('Installation', 'Installation Scheduled', 'Great news! Your installation is scheduled...', 'appt_invites', 'INSTALL: {{client.firstName}}', 'Installation', 'Client', true),
('Follow-Up', 'Follow-Up Appointment', 'I would like to schedule a follow-up...', 'appt_invites', 'Follow-Up - {{client.firstName}}', 'Follow-Up Visit', 'Client', true),
('Final Walkthrough', 'Final Walkthrough Scheduled', 'Time for the final walkthrough...', 'appt_invites', 'Final Walkthrough - {{client.firstName}}', 'Final Walkthrough', 'Client', true),
('Quote Presentation', 'Quote Presentation Meeting', 'Ready to present your quote...', 'appt_invites', 'Quote Presentation - {{client.firstName}}', 'Quote Review', 'All', true),
('Inspection', 'Inspection Scheduled', 'Your inspection has been scheduled...', 'appt_invites', 'Inspection - {{client.firstName}}', 'Inspection', 'Client', true),
('Emergency Service', 'Emergency Service Scheduled', 'Emergency service call scheduled...', 'appt_invites', 'EMERGENCY: {{client.firstName}}', 'Emergency Service', 'Client', true),
('Vendor Meeting', 'Vendor Meeting', 'Schedule meeting to discuss...', 'appt_invites', 'Vendor Meeting - {{vendor.companyName}}', 'Meeting', 'Vendor', true),
('Team Meeting', 'Team Meeting', 'Team meeting scheduled...', 'appt_invites', 'Team Meeting', 'Team Meeting', 'Employee', true),
('Virtual Consultation', 'Virtual Consultation', 'Virtual consultation is set...', 'appt_invites', 'Virtual Consult - {{client.firstName}}', 'Virtual Meeting', 'All', true),
('Color Selection', 'Color Selection Meeting', 'Time to select colors...', 'appt_invites', 'Color Selection - {{client.firstName}}', 'Color Selection', 'Client', true);

-- Export List Templates (8 records)
INSERT INTO templates (name, description, content, category, variables, is_active) VALUES
('All Contacts Export', 'Export all contacts', 'Export all contact information...', 'export_list', '{"fields": ["name", "email", "phone"]}', true),
('Active Clients Only', 'Export active clients', 'Filtered export of active clients...', 'export_list', '{"fields": ["name", "email", "phone"]}', true),
('Project Financial Summary', 'Export financial data', 'Comprehensive financial export...', 'export_list', '{"fields": ["project_id", "total_amount"]}', true),
('Open Opportunities', 'Export open opportunities', 'Sales pipeline export...', 'export_list', '{"fields": ["contact_name", "company_name"]}', true),
('Payment History', 'Export payment history', 'Detailed payment export...', 'export_list', '{"fields": ["payment_id", "amount"]}', true),
('Monthly Revenue', 'Export monthly revenue', 'Revenue analysis export...', 'export_list', '{"fields": ["month", "total_revenue"]}', true),
('Vendor Contact List', 'Export vendor contacts', 'Complete vendor directory...', 'export_list', '{"fields": ["company_name", "email"]}', true),
('Calendar Appointments', 'Export scheduled appointments', 'Calendar export...', 'export_list', '{"fields": ["event_date", "event_time"]}', true);

-- ============================================================
-- SEED PART 6: CONNECTION PLANS (18 total)
-- ============================================================

INSERT INTO connection_plans (id, name, contact_types, plan_type, is_active) VALUES
('11111111-1111-1111-1111-111111111111', 'New Lead Follow-Up Plan', 'Lead,Prospect', 'Connection Plans', true),
('22222222-2222-2222-2222-222222222222', 'Lost Opportunity Re-engagement', 'Lost Opportunity', 'Connection Plans', true),
('33333333-3333-3333-3333-333333333333', 'Post-Meeting Follow-Up', 'Prospect,Warm Lead', 'Connection Plans', true),
('44444444-4444-4444-4444-444444444444', 'Customer Onboarding', 'Customer,New Customer', 'Connection Plans', true),
('11111111-2222-3333-4444-555555555555', 'Lead Conversion Fast Track', 'Clients', 'Conversion Plans', true),
('22222222-3333-4444-5555-666666666666', 'Standard Conversion Flow', 'Clients', 'Conversion Plans', true),
('33333333-4444-5555-6666-777777777777', 'Enterprise Conversion', 'Clients,Partner', 'Conversion Plans', true),
('44444444-5555-6666-7777-888888888888', 'Customer Loyalty Program', 'Clients', 'Retention Plans', true),
('55555555-6666-7777-8888-999999999999', 'Win-Back Campaign', 'Clients', 'Retention Plans', true),
('66666666-7777-8888-9999-aaaaaaaaaaaa', 'VIP Customer Care', 'Clients', 'Retention Plans', true),
('77777777-8888-9999-aaaa-bbbbbbbbbbbb', 'Trade Show Follow-Up', 'Clients,Partner', 'Events Plans', true),
('88888888-9999-aaaa-bbbb-cccccccccccc', 'Webinar Attendee Sequence', 'Clients', 'Events Plans', true),
('99999999-aaaa-bbbb-cccc-dddddddddddd', 'Conference Networking', 'Partner,Vendor', 'Events Plans', true),
('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'Spring Campaign', 'Clients', 'Seasonal Plans', true),
('bbbbbbbb-cccc-dddd-eeee-ffffffffffff', 'Summer Special', 'Clients', 'Seasonal Plans', true),
('cccccccc-dddd-eeee-ffff-000000000000', 'Holiday Greetings', 'Clients,Partner,Vendor', 'Seasonal Plans', true),
('dddddddd-eeee-ffff-0000-111111111111', 'Multi-Channel Blast', 'Clients', 'Parallel Trigger Plans', true),
('eeeeeeee-ffff-0000-1111-222222222222', 'Urgent Response Protocol', 'Clients', 'Parallel Trigger Plans', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- SEED PART 7: CONNECTION PLAN ACTIONS (18 actions)
-- ============================================================

INSERT INTO connection_plan_actions (connection_plan_id, step_number, action_name, action_type, delivery_timing, delivery_type, display_order, action_config) VALUES
('11111111-1111-1111-1111-111111111111', 1, 'Send Welcome Email', 'email', 'Immediate', 'Email', 1, '{"template": "welcome_new_lead"}'::jsonb),
('11111111-1111-1111-1111-111111111111', 2, 'Schedule Introduction Call', 'call', 'Day 2', 'Task', 2, '{"duration": "30min"}'::jsonb),
('11111111-1111-1111-1111-111111111111', 3, 'Follow-Up Email', 'email', 'Day 3', 'Email', 3, '{"template": "post_call"}'::jsonb),
('11111111-1111-1111-1111-111111111111', 4, 'Send Demo Link', 'email', 'Day 7', 'Email', 4, '{"template": "demo"}'::jsonb),
('11111111-1111-1111-1111-111111111111', 5, 'Check-In', 'email', 'Day 14', 'Email', 5, '{"template": "checkin"}'::jsonb),
('22222222-2222-2222-2222-222222222222', 1, 'Check-In Email', 'email', 'Immediate', 'Email', 1, '{"template": "checkin"}'::jsonb),
('22222222-2222-2222-2222-222222222222', 2, 'Share Value Prop', 'email', 'Day 7', 'Email', 2, '{"template": "value_prop"}'::jsonb),
('22222222-2222-2222-2222-222222222222', 3, 'Offer Discount', 'email', 'Day 14', 'Email', 3, '{"discount": "20%"}'::jsonb),
('22222222-2222-2222-2222-222222222222', 4, 'Final Reach Out', 'email', 'Day 30', 'Email', 4, '{"template": "final"}'::jsonb),
('33333333-3333-3333-3333-333333333333', 1, 'Thank You Email', 'email', 'Same Day', 'Email', 1, '{"template": "thank_you"}'::jsonb),
('33333333-3333-3333-3333-333333333333', 2, 'Deliver Proposal', 'email', 'Day 2', 'Email', 2, '{"template": "proposal"}'::jsonb),
('33333333-3333-3333-3333-333333333333', 3, 'Follow-Up Call', 'call', 'Day 7', 'Task', 3, '{"duration": "15min"}'::jsonb),
('44444444-4444-4444-4444-444444444444', 1, 'Welcome Email', 'email', 'Immediate', 'Email', 1, '{"template": "welcome"}'::jsonb),
('44444444-4444-4444-4444-444444444444', 2, 'Schedule Training', 'meeting', 'Day 1', 'Task', 2, '{"duration": "60min"}'::jsonb),
('44444444-4444-4444-4444-444444444444', 3, 'Send Documentation', 'email', 'Day 3', 'Email', 3, '{"template": "docs"}'::jsonb),
('44444444-4444-4444-4444-444444444444', 4, 'One-Week Check-In', 'call', 'Day 7', 'Task', 4, '{"duration": "30min"}'::jsonb),
('44444444-4444-4444-4444-444444444444', 5, 'Feedback Survey', 'email', 'Day 14', 'Email', 5, '{"template": "survey"}'::jsonb),
('44444444-4444-4444-4444-444444444444', 6, 'Completion Certificate', 'email', 'Day 30', 'Email', 6, '{"template": "complete"}'::jsonb),

-- Actions for Lead Conversion Fast Track (3 actions)
('11111111-2222-3333-4444-555555555555', 1, 'Immediate Response', 'email', 'Immediate', 'Email', 1, '{"template": "immediate_response", "priority": "urgent"}'::jsonb),
('11111111-2222-3333-4444-555555555555', 2, 'Schedule Demo Today', 'call', 'Same Day', 'Task', 2, '{"duration": "30min", "priority": "high"}'::jsonb),
('11111111-2222-3333-4444-555555555555', 3, 'Close Deal', 'email', 'Day 1', 'Email', 3, '{"template": "close_proposal", "discount": "early_bird"}'::jsonb),

-- Actions for Standard Conversion Flow (4 actions)
('22222222-3333-4444-5555-666666666666', 1, 'Welcome and Educate', 'email', 'Immediate', 'Email', 1, '{"template": "education_series"}'::jsonb),
('22222222-3333-4444-5555-666666666666', 2, 'Feature Highlight', 'email', 'Day 3', 'Email', 2, '{"template": "feature_benefits"}'::jsonb),
('22222222-3333-4444-5555-666666666666', 3, 'Case Study Share', 'email', 'Day 7', 'Email', 3, '{"template": "success_story"}'::jsonb),
('22222222-3333-4444-5555-666666666666', 4, 'Conversion Offer', 'email', 'Day 14', 'Email', 4, '{"template": "limited_offer"}'::jsonb),

-- Actions for Enterprise Conversion (5 actions)
('33333333-4444-5555-6666-777777777777', 1, 'Executive Welcome', 'email', 'Immediate', 'Email', 1, '{"template": "executive_welcome"}'::jsonb),
('33333333-4444-5555-6666-777777777777', 2, 'Schedule Executive Demo', 'call', 'Day 2', 'Task', 2, '{"duration": "60min", "attendees": "multiple"}'::jsonb),
('33333333-4444-5555-6666-777777777777', 3, 'ROI Analysis', 'email', 'Day 5', 'Email', 3, '{"template": "roi_calculator"}'::jsonb),
('33333333-4444-5555-6666-777777777777', 4, 'Custom Proposal', 'email', 'Day 10', 'Email', 4, '{"template": "enterprise_proposal"}'::jsonb),
('33333333-4444-5555-6666-777777777777', 5, 'Contract Negotiation', 'call', 'Day 15', 'Task', 5, '{"duration": "90min"}'::jsonb),

-- Actions for Customer Loyalty Program (4 actions)
('44444444-5555-6666-7777-888888888888', 1, 'Thank You Message', 'email', 'Immediate', 'Email', 1, '{"template": "loyalty_welcome"}'::jsonb),
('44444444-5555-6666-7777-888888888888', 2, 'Exclusive Benefits', 'email', 'Day 7', 'Email', 2, '{"template": "loyalty_benefits"}'::jsonb),
('44444444-5555-6666-7777-888888888888', 3, 'Referral Program', 'email', 'Day 30', 'Email', 3, '{"template": "referral_invite"}'::jsonb),
('44444444-5555-6666-7777-888888888888', 4, 'Anniversary Reward', 'email', 'Day 90', 'Email', 4, '{"template": "anniversary_special"}'::jsonb),

-- Actions for Win-Back Campaign (4 actions)
('55555555-6666-7777-8888-999999999999', 1, 'We Miss You', 'email', 'Immediate', 'Email', 1, '{"template": "win_back_intro"}'::jsonb),
('55555555-6666-7777-8888-999999999999', 2, 'Special Win-Back Offer', 'email', 'Day 3', 'Email', 2, '{"template": "win_back_offer", "discount": "30%"}'::jsonb),
('55555555-6666-7777-8888-999999999999', 3, 'Feedback Request', 'email', 'Day 7', 'Email', 3, '{"template": "feedback_survey"}'::jsonb),
('55555555-6666-7777-8888-999999999999', 4, 'Final Attempt', 'email', 'Day 14', 'Email', 4, '{"template": "last_chance"}'::jsonb),

-- Actions for VIP Customer Care (5 actions)
('66666666-7777-8888-9999-aaaaaaaaaaaa', 1, 'VIP Welcome', 'email', 'Immediate', 'Email', 1, '{"template": "vip_welcome", "tone": "exclusive"}'::jsonb),
('66666666-7777-8888-9999-aaaaaaaaaaaa', 2, 'Dedicated Account Manager', 'call', 'Day 1', 'Task', 2, '{"duration": "45min", "type": "introduction"}'::jsonb),
('66666666-7777-8888-9999-aaaaaaaaaaaa', 3, 'VIP Benefits Overview', 'email', 'Day 3', 'Email', 3, '{"template": "vip_perks"}'::jsonb),
('66666666-7777-8888-9999-aaaaaaaaaaaa', 4, 'Monthly Check-In', 'call', 'Day 30', 'Task', 4, '{"duration": "30min", "recurring": true}'::jsonb),
('66666666-7777-8888-9999-aaaaaaaaaaaa', 5, 'Exclusive Preview', 'email', 'Day 60', 'Email', 5, '{"template": "vip_preview"}'::jsonb),

-- Actions for Trade Show Follow-Up (3 actions)
('77777777-8888-9999-aaaa-bbbbbbbbbbbb', 1, 'Thank You for Visiting', 'email', 'Same Day', 'Email', 1, '{"template": "tradeshow_thanks"}'::jsonb),
('77777777-8888-9999-aaaa-bbbbbbbbbbbb', 2, 'Booth Materials', 'email', 'Day 1', 'Email', 2, '{"template": "tradeshow_materials"}'::jsonb),
('77777777-8888-9999-aaaa-bbbbbbbbbbbb', 3, 'Schedule Follow-Up', 'call', 'Day 3', 'Task', 3, '{"duration": "30min"}'::jsonb),

-- Actions for Webinar Attendee Sequence (4 actions)
('88888888-9999-aaaa-bbbb-cccccccccccc', 1, 'Webinar Thank You', 'email', 'Same Day', 'Email', 1, '{"template": "webinar_thanks", "include_recording": true}'::jsonb),
('88888888-9999-aaaa-bbbb-cccccccccccc', 2, 'Slides and Resources', 'email', 'Day 1', 'Email', 2, '{"template": "webinar_resources"}'::jsonb),
('88888888-9999-aaaa-bbbb-cccccccccccc', 3, 'Implementation Guide', 'email', 'Day 3', 'Email', 3, '{"template": "implementation_guide"}'::jsonb),
('88888888-9999-aaaa-bbbb-cccccccccccc', 4, 'Consultation Offer', 'email', 'Day 7', 'Email', 4, '{"template": "free_consultation"}'::jsonb),

-- Actions for Conference Networking (3 actions)
('99999999-aaaa-bbbb-cccc-dddddddddddd', 1, 'Nice Meeting You', 'email', 'Same Day', 'Email', 1, '{"template": "conference_intro"}'::jsonb),
('99999999-aaaa-bbbb-cccc-dddddddddddd', 2, 'Share Resources', 'email', 'Day 2', 'Email', 2, '{"template": "conference_resources"}'::jsonb),
('99999999-aaaa-bbbb-cccc-dddddddddddd', 3, 'Partnership Discussion', 'call', 'Day 7', 'Task', 3, '{"duration": "45min", "type": "partnership"}'::jsonb),

-- Actions for Spring Campaign (3 actions)
('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 1, 'Spring Announcement', 'email', 'Immediate', 'Email', 1, '{"template": "spring_launch"}'::jsonb),
('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 2, 'Spring Special Offer', 'email', 'Day 7', 'Email', 2, '{"template": "spring_promo"}'::jsonb),
('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 3, 'Last Chance Spring', 'email', 'Day 21', 'Email', 3, '{"template": "spring_ending"}'::jsonb),

-- Actions for Summer Special (3 actions)
('bbbbbbbb-cccc-dddd-eeee-ffffffffffff', 1, 'Summer Kickoff', 'email', 'Immediate', 'Email', 1, '{"template": "summer_start"}'::jsonb),
('bbbbbbbb-cccc-dddd-eeee-ffffffffffff', 2, 'Mid-Summer Sale', 'email', 'Day 14', 'Email', 2, '{"template": "summer_sale"}'::jsonb),
('bbbbbbbb-cccc-dddd-eeee-ffffffffffff', 3, 'End of Summer', 'email', 'Day 28', 'Email', 3, '{"template": "summer_finale"}'::jsonb),

-- Actions for Holiday Greetings (4 actions)
('cccccccc-dddd-eeee-ffff-000000000000', 1, 'Holiday Greeting', 'email', 'Immediate', 'Email', 1, '{"template": "holiday_greeting"}'::jsonb),
('cccccccc-dddd-eeee-ffff-000000000000', 2, 'Year-End Thank You', 'email', 'Day 7', 'Email', 2, '{"template": "year_end_thanks"}'::jsonb),
('cccccccc-dddd-eeee-ffff-000000000000', 3, 'New Year Message', 'email', 'Day 14', 'Email', 3, '{"template": "new_year_message"}'::jsonb),
('cccccccc-dddd-eeee-ffff-000000000000', 4, 'New Year Special', 'email', 'Day 21', 'Email', 4, '{"template": "new_year_offer"}'::jsonb),

-- Actions for Multi-Channel Blast (5 actions)
('dddddddd-eeee-ffff-0000-111111111111', 1, 'Email Announcement', 'email', 'Immediate', 'Email', 1, '{"template": "multi_channel_email"}'::jsonb),
('dddddddd-eeee-ffff-0000-111111111111', 2, 'SMS Alert', 'text', 'Immediate', 'Text', 2, '{"template": "multi_channel_sms"}'::jsonb),
('dddddddd-eeee-ffff-0000-111111111111', 3, 'Follow-Up Call', 'call', 'Day 1', 'Task', 3, '{"duration": "15min"}'::jsonb),
('dddddddd-eeee-ffff-0000-111111111111', 4, 'Social Media Touch', 'email', 'Day 2', 'Email', 4, '{"template": "social_reminder"}'::jsonb),
('dddddddd-eeee-ffff-0000-111111111111', 5, 'Final Push', 'email', 'Day 7', 'Email', 5, '{"template": "final_reminder"}'::jsonb),

-- Actions for Urgent Response Protocol (4 actions)
('eeeeeeee-ffff-0000-1111-222222222222', 1, 'Immediate Acknowledgment', 'email', 'Immediate', 'Email', 1, '{"template": "urgent_ack", "priority": "critical"}'::jsonb),
('eeeeeeee-ffff-0000-1111-222222222222', 2, 'Urgent Call', 'call', 'Immediate', 'Task', 2, '{"duration": "15min", "priority": "urgent"}'::jsonb),
('eeeeeeee-ffff-0000-1111-222222222222', 3, 'Status Update', 'email', 'Same Day', 'Email', 3, '{"template": "urgent_update"}'::jsonb),
('eeeeeeee-ffff-0000-1111-222222222222', 4, 'Resolution Follow-Up', 'call', 'Day 1', 'Task', 4, '{"duration": "30min", "type": "resolution"}'::jsonb)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED PART 8: MESSAGES (22 franchise messages)
-- ============================================================

-- Note: These messages reference specific contact IDs that will be generated dynamically
-- In a production environment, these would link to actual contacts
-- For this demo, we'll create placeholder messages without contact_id links

INSERT INTO messages (type, direction, subject, body, preview_text, sender_name, sender_email, sender_phone, is_read, is_starred, contact_type, lead_status, company_name, opportunity_name, timestamp) VALUES
('email', 'inbound', 'Franchise Opportunity - Texas', 'I am interested in franchise opportunities in Texas...', 'I am interested in franchise...', 'John Franchise', 'john@example.com', '(555) 111-1111', false, true, 'candidates', 'new', NULL, 'Franchise - Dallas TX', now() - interval '2 hours'),
('text', 'inbound', '', 'Is the San Diego territory available?', 'Is the San Diego territory...', 'Sarah Investor', 'sarah@example.com', '(555) 222-2222', false, false, 'candidates', 'contacted', NULL, 'Franchise - San Diego CA', now() - interval '4 hours'),
('email', 'inbound', 'FDD Questions', 'I have reviewed the FDD and have questions...', 'I have reviewed the FDD...', 'Mike Business', 'mike@example.com', '(555) 333-3333', true, true, 'candidates', 'qualified', NULL, 'Franchise - Chicago IL', now() - interval '1 day'),
('call', 'outbound', '', 'Called to schedule Discovery Day...', 'Called to schedule...', 'Your Company', '', '(555) 000-0001', true, true, 'candidates', 'qualified', NULL, 'Franchise - Charlotte NC', now() - interval '6 hours'),
('email', 'inbound', 'Multi-Unit Development', 'Interested in developing multiple locations...', 'Interested in developing...', 'Lisa Developer', 'lisa@example.com', '(555) 444-4444', true, true, 'additional_locations', 'contacted', 'Developer Group', 'Multi-Unit Development', now() - interval '5 hours'),
('text', 'outbound', '', 'Following up on financial qualification...', 'Following up on financial...', 'Your Company', '', '(555) 000-0001', true, false, 'candidates', 'qualified', NULL, 'Franchise - Houston TX', now() - interval '8 hours'),
('email', 'inbound', 'Post Discovery Day', 'Thank you for the excellent Discovery Day...', 'Thank you for the excellent...', 'Tom Ready', 'tom@example.com', '(555) 555-5555', true, true, 'candidates', 'converted', NULL, 'Franchise Agreement - Raleigh NC', now() - interval '3 hours'),
('thumbtack', 'inbound', 'Thumbtack Inquiry', 'New franchise inquiry from Thumbtack...', 'New franchise inquiry...', 'Amy Lead', 'amy@example.com', '(555) 666-6666', false, false, 'candidates', 'new', NULL, 'Franchise Opportunity', now() - interval '1 hour'),
('email', 'inbound', 'Territory Questions', 'Questions about available territories...', 'Questions about available...', 'Bob Prospect', 'bob@example.com', '(555) 777-7777', false, false, 'candidates', 'new', NULL, 'Franchise Inquiry', now() - interval '12 hours'),
('text', 'inbound', '', 'Can you send me more information?', 'Can you send me more...', 'Carol Interest', 'carol@example.com', '(555) 888-8888', true, false, 'candidates', 'contacted', NULL, 'Franchise Info Request', now() - interval '2 days'),
('email', 'outbound', 'Follow-up on Meeting', 'Thank you for meeting with us yesterday...', 'Thank you for meeting...', 'Your Company', 'franchise@company.com', '(555) 000-0001', true, false, 'candidates', 'qualified', NULL, 'Franchise Discussion', now() - interval '1 day'),
('call', 'inbound', '', 'Inbound call from interested candidate...', 'Inbound call from...', 'David Caller', '', '(555) 999-9999', true, false, 'candidates', 'contacted', NULL, 'Franchise Call Inquiry', now() - interval '3 hours'),
('email', 'inbound', 'Resale Opportunity', 'Interested in purchasing existing location...', 'Interested in purchasing...', 'Eve Buyer', 'eve@example.com', '(555) 101-0101', false, true, 'resale_candidates', 'new', NULL, 'Franchise Resale', now() - interval '8 hours'),
('text', 'outbound', '', 'Scheduled your site visit for next Tuesday...', 'Scheduled your site visit...', 'Your Company', '', '(555) 000-0001', true, false, 'candidates', 'qualified', NULL, 'Site Visit Confirmation', now() - interval '5 hours'),
('email', 'inbound', 'Additional Location', 'Looking to expand with additional location...', 'Looking to expand with...', 'Frank Owner', 'frank@example.com', '(555) 102-0202', true, true, 'additional_locations', 'qualified', 'Existing Franchisee', 'Expansion Opportunity', now() - interval '6 hours'),
('thumbtack', 'inbound', 'Thumbtack Lead 2', 'Another franchise inquiry from Thumbtack...', 'Another franchise inquiry...', 'Grace New', 'grace@example.com', '(555) 103-0303', false, false, 'candidates', 'new', NULL, 'Franchise Lead', now() - interval '30 minutes'),
('call', 'outbound', '', 'Left voicemail about franchise opportunity...', 'Left voicemail about...', 'Your Company', '', '(555) 000-0001', true, false, 'candidates', 'contacted', NULL, 'Franchise Voicemail', now() - interval '4 hours'),
('email', 'inbound', 'Acquisition Inquiry', 'Corporate acquisition inquiry...', 'Corporate acquisition...', 'Harry Corporate', 'harry@corporate.com', '(555) 104-0404', true, true, 'acquisitions', 'qualified', 'Big Corp Inc', 'Acquisition Discussion', now() - interval '1 day'),
('text', 'inbound', '', 'What are the startup costs?', 'What are the startup...', 'Iris Question', 'iris@example.com', '(555) 105-0505', false, false, 'candidates', 'new', NULL, 'Cost Inquiry', now() - interval '7 hours'),
('email', 'outbound', 'FDD Sent', 'Franchise Disclosure Document attached...', 'Franchise Disclosure...', 'Your Company', 'franchise@company.com', '(555) 000-0001', true, false, 'candidates', 'qualified', NULL, 'FDD Delivery', now() - interval '2 days'),
('call', 'inbound', '', 'Follow-up call from Discovery Day attendee...', 'Follow-up call from...', 'Jack Attendee', '', '(555) 106-0606', true, true, 'candidates', 'converted', NULL, 'Post Discovery Call', now() - interval '1 hour'),
('email', 'inbound', 'Ready to Proceed', 'Ready to move forward with franchise agreement...', 'Ready to move forward...', 'Kelly Ready', 'kelly@example.com', '(555) 107-0707', true, true, 'candidates', 'converted', NULL, 'Franchise Agreement', now() - interval '30 minutes')
ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED PART 9: SAVED FILTERS (6 records)
-- ============================================================

INSERT INTO saved_filters (id, name, filter_type, filter_config, is_active) VALUES
('d0886a6a-465d-4a24-9c2d-e83791c04825', 'Before and After', 'Contact Filters', '{"actionPlan":"all","salesCycle":"all"}'::jsonb, true),
('7b197572-2836-447e-8d2d-03a9963b52ce', 'New Leads Only', 'Contact Filters', '{"salesCycle":"New Lead"}'::jsonb, true),
('308a8580-252f-42f7-9681-c137b2fc8dda', 'Triple Three', 'Contact Filters', '{"state":"CA"}'::jsonb, true),
('6bf5014a-2cac-478c-98f0-c0302693acce', 'unknown lead source and apt set', 'Contact Filters', '{"leadSource":"Other"}'::jsonb, true),
('1d199e2c-d27a-458f-b963-43583c6be12d', 'can text', 'Advanced Filters', '{"advancedRows":[{"field":"cell_phone","value":"","operator":"is_not_empty"}]}'::jsonb, true),
('598d2343-d82e-4c70-9e9c-c31594a647ce', 'Search for Kent', 'Advanced Filters', '{"advancedRows":[{"field":"name","value":"Kent","operator":"contains"}]}'::jsonb, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- SEED PART 10: ACCOUNT SETTINGS (1 record)
-- ============================================================

INSERT INTO account_settings (
  first_name, last_name, phone, email, country, company, account_owner, website, office_phone,
  address_1, address_2, address_3, default_page, default_contact_tab, theme_color, header_color, footer_color
) VALUES (
  'Test_Account', 'Owner', '(303) 929-1447', 'kent@clienttether.com', 'US',
  'CT Enterprise Test Accounts', 'The Account Owners now', 'www.clienttether.com', '(801) 447-1544',
  '105 N Main St', 'Spanish Fork, UT 84660', 'Bond #: UT123456789',
  'Accounts', 'Log-a-Call', '#0d6efd', '#161516', '#b0b2b0'
)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED PART 11: ACTION PLANS SETTINGS (1 record)
-- ============================================================

INSERT INTO action_plans_settings (
  action_call_option, action_call_divert_to_assigned_user, send_from_assigned_user,
  action_plan_email_option, play_client_status_message, ring_time_seconds,
  phone_return_option, phone_return_divert_to_assigned_user,
  business_hours_phone, after_hours_phone, text_notification_phone,
  send_delayed_action_plan_texts_business_hours, end_connection_plan_on_return_text
) VALUES (
  'default', false, true, 'send_all', true, 30, 'default', false,
  '(303) 929-1447', '(303) 929-1447', '(801) 709-1847', true, true
)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED PART 12: USERS (15 records)
-- ============================================================

INSERT INTO users (username, first_name, last_name, phone, email, user_type, api_id, address, city, state, zipcode) VALUES
  ('saraadmin', 'Sara', 'Admin', '4359388063', 'sara.hansen181+admin@gmail.com', 'admin', '17469', '1450 Blake St', 'Denver', 'CO', '80202'),
  ('tmrkadmin', 'TMRK Admin', 'Team', '3039291579', 'g+Admin@tmrk.com', 'admin', '19605', '635 S State St', 'Salt Lake City', 'UT', '84111'),
  ('neeradminuser', 'Neeraj', 'Admin User', '8878789922', 'neeraj+admin@clienttether.com', 'admin', '20791', '2400 17th St', 'Denver', 'CO', '80202'),
  ('collin+newadmin', 'Col', 'Gav', '4802344319', 'collin+newadmin@gmail.com', 'admin', '22780', '275 E South Temple', 'Salt Lake City', 'UT', '84111'),
  ('angeltestingacc', 'Angel', 'TestAccount', '3039291447', 'angel+test20@clienttether.com', 'standard', '31690', '1701 Wynkoop St', 'Denver', 'CO', '80202'),
  ('ctdefault1', 'Admin', 'Kent', '4152511945', 'KentHall303+User35051@gmail.com', 'admin', '35051', '1700 Lincoln St', 'Denver', 'CO', '80203'),
  ('referpro1', 'ReferPro', 'Platform', '8018555555', 'matt+referpro1@referpro.com', 'standard', '35952', '123 Tech Drive', 'Provo', 'UT', '84601'),
  ('ctdefault2', 'Standard', 'Kent', '4152511945', 'KentHall303+User102@gmail.com', 'standard', '11672', '1899 Wynkoop St', 'Denver', 'CO', '80202'),
  ('kentjoe', 'Sara', 'Joe', '4359388063', 'kent+joe@clienttether.com', 'salesperson', '17032', '1600 Glenarm Pl', 'Denver', 'CO', '80202'),
  ('sarastand', 'Jeanette', 'Standards', '3039291579', 'sara.hansen181+Standards@gmail.com', 'standard', '17468', '1500 Market St', 'Denver', 'CO', '80202'),
  ('akshitan', 'Akshita', 'Nagar', '8017091800', 'nagarakshita20@gmail.com', 'salesperson', '18361', '55 E 400 S', 'Salt Lake City', 'UT', '84111'),
  ('tmrk', 'TMRK', 'Team', '3039291447', 'g@tmrk.com', 'standard', '19604', '1435 Arapahoe St', 'Denver', 'CO', '80202'),
  ('neerct1', 'Neeraj', 'QA', '8878789922', 'neeraj12@clienttether.com', 'standard', '20612', '1801 California St', 'Denver', 'CO', '80202'),
  ('collintestuser', 'Collin', 'Gavel', '4806212649', 'collin+testuser@clienttether.com', 'subcontractor', '20833', '350 S 400 W', 'Salt Lake City', 'UT', '84101'),
  ('jvs_georgeduffield', 'Jule', 'Virtual Scheduler', '8015551234', 'jvs_georgeduffield@clienttether.com', 'subcontractor', '21902', '145 W Broadway', 'Salt Lake City', 'UT', '84101')
ON CONFLICT (username) DO NOTHING;

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '======================================================';
  RAISE NOTICE 'DATABASE SETUP COMPLETE!';
  RAISE NOTICE '======================================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Table Record Counts:';
  RAISE NOTICE '-------------------';
  RAISE NOTICE 'sales_cycles: %', (SELECT COUNT(*) FROM sales_cycles);
  RAISE NOTICE 'customers: %', (SELECT COUNT(*) FROM customers);
  RAISE NOTICE 'jobs: %', (SELECT COUNT(*) FROM jobs);
  RAISE NOTICE 'contacts: %', (SELECT COUNT(*) FROM contacts);
  RAISE NOTICE 'opportunities: %', (SELECT COUNT(*) FROM opportunities);
  RAISE NOTICE 'calendars: %', (SELECT COUNT(*) FROM calendars);
  RAISE NOTICE 'calendar_events: %', (SELECT COUNT(*) FROM calendar_events);
  RAISE NOTICE 'templates: %', (SELECT COUNT(*) FROM templates);
  RAISE NOTICE 'connection_plans: %', (SELECT COUNT(*) FROM connection_plans);
  RAISE NOTICE 'connection_plan_actions: %', (SELECT COUNT(*) FROM connection_plan_actions);
  RAISE NOTICE 'messages: %', (SELECT COUNT(*) FROM messages);
  RAISE NOTICE 'saved_filters: %', (SELECT COUNT(*) FROM saved_filters);
  RAISE NOTICE 'account_settings: %', (SELECT COUNT(*) FROM account_settings);
  RAISE NOTICE 'action_plans_settings: %', (SELECT COUNT(*) FROM action_plans_settings);
  RAISE NOTICE 'users: %', (SELECT COUNT(*) FROM users);
  RAISE NOTICE '';
  RAISE NOTICE '======================================================';
  RAISE NOTICE '✓ All tables created and seeded successfully!';
  RAISE NOTICE '✓ Jobs page ready with % customers and % jobs', (SELECT COUNT(*) FROM customers), (SELECT COUNT(*) FROM jobs);
  RAISE NOTICE '✓ Contacts page ready with % contacts', (SELECT COUNT(*) FROM contacts);
  RAISE NOTICE '✓ Pipeline page ready with % opportunities across % sales cycles', (SELECT COUNT(*) FROM opportunities), (SELECT COUNT(*) FROM sales_cycles);
  RAISE NOTICE '✓ Templates page ready with % templates', (SELECT COUNT(*) FROM templates);
  RAISE NOTICE '✓ Action Plans page ready with % plans', (SELECT COUNT(*) FROM connection_plans);
  RAISE NOTICE '✓ Calendar ready with % events', (SELECT COUNT(*) FROM calendar_events);
  RAISE NOTICE '✓ Messages center ready with % messages', (SELECT COUNT(*) FROM messages);
  RAISE NOTICE '✓ Settings pages configured with % users', (SELECT COUNT(*) FROM users);
  RAISE NOTICE '';
  RAISE NOTICE 'REFRESH YOUR APP - Everything should work now!';
  RAISE NOTICE '======================================================';
  RAISE NOTICE '';
END $$;
