/*
  ============================================================
  CRITICAL: APPLY THIS SQL FILE FIRST
  ============================================================

  This file creates all missing database tables and data that
  the application needs to function properly.

  HOW TO USE:
  1. Open your Supabase project dashboard
  2. Go to SQL Editor (left sidebar)
  3. Copy this ENTIRE file
  4. Paste it into the SQL Editor
  5. Click "Run" button
  6. Done! Your database is now complete.

  This file is safe to run multiple times - it checks for
  existing tables and only creates what's missing.

  ============================================================
*/

-- ============================================================
-- 1. CREATE TEMPLATES SCHEMA
-- ============================================================

/*
  Creates the templates table with all necessary fields for:
  - Email templates
  - Text templates
  - Task templates
  - Appointment invite templates
  - Notes/logs templates
  - Export list templates
*/

CREATE TABLE IF NOT EXISTS templates (
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

  -- Email template specific fields
  subject text,
  contact_type text DEFAULT 'All',
  exclude_client boolean DEFAULT false,
  additional_emails text,
  bcc_email text,
  content_tcpa text CHECK (content_tcpa IN ('Promotional', 'Transactional', 'Mixed')),

  -- Text template specific fields
  select_token text,
  protect_from_overwriting boolean DEFAULT false,
  protect_from_sharing boolean DEFAULT false,

  -- Task template specific fields
  title text,
  detail text,
  due_in_days integer,
  assignee_type text CHECK (assignee_type IN ('account_owner', 'assigned_user', 'specific_user')),
  priority text,

  -- Appointment template specific fields
  calendar_title text,
  external_calendar_title text
);

-- Enable Row Level Security
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Allow public access (demo purposes)
DROP POLICY IF EXISTS "Allow public read access to templates" ON templates;
CREATE POLICY "Allow public read access to templates"
  ON templates FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Allow public insert access to templates" ON templates;
CREATE POLICY "Allow public insert access to templates"
  ON templates FOR INSERT
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access to templates" ON templates;
CREATE POLICY "Allow public update access to templates"
  ON templates FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete access to templates" ON templates;
CREATE POLICY "Allow public delete access to templates"
  ON templates FOR DELETE
  TO public
  USING (true);

-- ============================================================
-- 2. CREATE CONNECTION PLANS SCHEMA
-- ============================================================

/*
  Creates the connection_plans table for managing
  automated action sequences
*/

CREATE TABLE IF NOT EXISTS connection_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE connection_plans ENABLE ROW LEVEL SECURITY;

-- Allow public access (demo purposes)
DROP POLICY IF EXISTS "Allow public read access to connection_plans" ON connection_plans;
CREATE POLICY "Allow public read access to connection_plans"
  ON connection_plans FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Allow public insert access to connection_plans" ON connection_plans;
CREATE POLICY "Allow public insert access to connection_plans"
  ON connection_plans FOR INSERT
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access to connection_plans" ON connection_plans;
CREATE POLICY "Allow public update access to connection_plans"
  ON connection_plans FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete access to connection_plans" ON connection_plans;
CREATE POLICY "Allow public delete access to connection_plans"
  ON connection_plans FOR DELETE
  TO public
  USING (true);

-- ============================================================
-- 3. CREATE CONNECTION PLAN ACTIONS SCHEMA
-- ============================================================

/*
  Creates the connection_plan_actions table for storing
  individual actions within connection plans
*/

CREATE TABLE IF NOT EXISTS connection_plan_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_plan_id uuid NOT NULL REFERENCES connection_plans(id) ON DELETE CASCADE,
  action_type text NOT NULL CHECK (action_type IN (
    'send_email',
    'send_text',
    'create_task',
    'schedule_appointment',
    'add_note',
    'wait_delay'
  )),
  sequence_order integer NOT NULL,
  action_config jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE connection_plan_actions ENABLE ROW LEVEL SECURITY;

-- Allow public access (demo purposes)
DROP POLICY IF EXISTS "Allow public read access to connection_plan_actions" ON connection_plan_actions;
CREATE POLICY "Allow public read access to connection_plan_actions"
  ON connection_plan_actions FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Allow public insert access to connection_plan_actions" ON connection_plan_actions;
CREATE POLICY "Allow public insert access to connection_plan_actions"
  ON connection_plan_actions FOR INSERT
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access to connection_plan_actions" ON connection_plan_actions;
CREATE POLICY "Allow public update access to connection_plan_actions"
  ON connection_plan_actions FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete access to connection_plan_actions" ON connection_plan_actions;
CREATE POLICY "Allow public delete access to connection_plan_actions"
  ON connection_plan_actions FOR DELETE
  TO public
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_connection_plan_actions_plan_id
  ON connection_plan_actions(connection_plan_id);

-- ============================================================
-- 4. SEED EMAIL TEMPLATES
-- ============================================================

INSERT INTO templates (name, category, description, subject, content, content_tcpa, contact_type, exclude_client, is_active, usage_count)
SELECT * FROM (VALUES
  (
    'Initial Contact - Residential',
    'email',
    'Lead Nurture',
    'Your Free Roofing Estimate is Ready',
    'Hi {contact_name},

Thank you for your interest in our roofing services. I wanted to personally reach out regarding your property at {property_address}.

Based on the information you provided, I''ve prepared a preliminary assessment and would love to schedule a time to provide you with a detailed, no-obligation estimate.

Our team specializes in:
• Residential roof replacement and repair
• Storm damage assessment
• Insurance claim assistance
• Premium materials with extended warranties

Would you be available for a quick 15-minute call this week? I have openings on {available_dates}.

Looking forward to helping you protect your home.

Best regards,
{user_name}
{company_name}
{phone_number}',
    'Promotional',
    'All',
    false,
    true,
    0
  ),
  (
    'Follow-up After Estimate',
    'email',
    'Sales Follow-up',
    'Questions About Your Roofing Estimate?',
    'Hi {contact_name},

I wanted to follow up on the estimate I provided for your roofing project at {property_address}.

Do you have any questions about:
• The scope of work outlined
• Material options and warranties
• Project timeline
• Financing options

I''m here to help clarify anything and ensure you have all the information needed to make the best decision for your home.

Would you like to schedule a brief call to discuss?

Best regards,
{user_name}
{company_name}
{phone_number}',
    'Promotional',
    'All',
    false,
    true,
    0
  ),
  (
    'Storm Damage Alert',
    'email',
    'Service Alert',
    'Recent Storm Alert - Free Roof Inspection',
    'Hi {contact_name},

We noticed your area at {property_address} was recently affected by severe weather. As a local roofing contractor, we wanted to reach out to offer our assistance.

We''re offering free storm damage inspections to help homeowners assess if they need repairs or a full roof replacement. Our team will:

• Conduct a thorough roof inspection
• Document any damage with photos
• Provide a detailed assessment report
• Assist with insurance claims if needed

Time is important - hidden damage can lead to bigger problems if left unchecked.

Can we schedule your free inspection this week?

Stay safe,
{user_name}
{company_name}
{phone_number}',
    'Promotional',
    'All',
    false,
    true,
    0
  )
) AS v(name, category, description, subject, content, content_tcpa, contact_type, exclude_client, is_active, usage_count)
WHERE NOT EXISTS (
  SELECT 1 FROM templates WHERE name = v.name AND category = 'email'
);

-- ============================================================
-- 5. SEED TEXT TEMPLATES
-- ============================================================

INSERT INTO templates (name, category, content, content_tcpa, contact_type, is_active, usage_count)
SELECT * FROM (VALUES
  (
    'Quick Check-in',
    'text',
    'Hi {contact_name}, this is {user_name} from {company_name}. Just checking in about your roofing project. Do you have any questions I can answer?',
    'Promotional',
    'All',
    true,
    0
  ),
  (
    'Appointment Reminder',
    'text',
    'Hi {contact_name}, friendly reminder about our appointment tomorrow at {appointment_time} for your property at {property_address}. See you then! - {user_name}',
    'Transactional',
    'All',
    true,
    0
  ),
  (
    'Estimate Ready',
    'text',
    'Hi {contact_name}, your roofing estimate is ready! I''ve sent it to your email. Let me know if you''d like to discuss any details. - {user_name} at {company_name}',
    'Promotional',
    'All',
    true,
    0
  )
) AS v(name, category, content, content_tcpa, contact_type, is_active, usage_count)
WHERE NOT EXISTS (
  SELECT 1 FROM templates WHERE name = v.name AND category = 'text'
);

-- ============================================================
-- 6. SEED TASK TEMPLATES
-- ============================================================

INSERT INTO templates (name, category, title, detail, due_in_days, assignee_type, priority, is_active, usage_count)
SELECT * FROM (VALUES
  (
    'Follow up on estimate',
    'task',
    'Follow up on estimate',
    'Call {contact_name} to discuss the estimate provided for {property_address}. Address any questions or concerns.',
    3,
    'account_owner',
    'High',
    true,
    0
  ),
  (
    'Send insurance documentation',
    'task',
    'Send insurance documentation',
    'Prepare and send insurance claim documentation for {contact_name} - {property_address}',
    1,
    'account_owner',
    'High',
    true,
    0
  ),
  (
    'Schedule final walkthrough',
    'task',
    'Schedule final walkthrough',
    'Coordinate final walkthrough with {contact_name} for completed project at {property_address}',
    0,
    'account_owner',
    'Medium',
    true,
    0
  ),
  (
    'Order materials',
    'task',
    'Order materials',
    'Order materials for {contact_name} project at {property_address}. Confirm delivery date.',
    7,
    'assigned_user',
    'Medium',
    true,
    0
  )
) AS v(name, category, title, detail, due_in_days, assignee_type, priority, is_active, usage_count)
WHERE NOT EXISTS (
  SELECT 1 FROM templates WHERE name = v.name AND category = 'task'
);

-- ============================================================
-- 7. SEED APPOINTMENT INVITE TEMPLATES
-- ============================================================

INSERT INTO templates (name, category, subject, contact_type, calendar_title, external_calendar_title, content, is_active, usage_count)
SELECT * FROM (VALUES
  (
    'Initial Consultation',
    'appt_invites',
    'Roofing Consultation Scheduled',
    'All',
    'Roofing Consultation - {contact_name}',
    'Roofing Consultation',
    'Initial consultation to assess roofing needs and provide estimate.',
    true,
    0
  ),
  (
    'Follow-up Meeting',
    'appt_invites',
    'Follow-up Meeting Scheduled',
    'All',
    'Follow-up Discussion - {contact_name}',
    'Follow-up Discussion',
    'Follow-up meeting to discuss estimate and answer questions.',
    true,
    0
  ),
  (
    'Project Kickoff',
    'appt_invites',
    'Project Kickoff Meeting',
    'All',
    'Project Kickoff - {property_address}',
    'Project Kickoff',
    'Project kickoff meeting to review scope, timeline, and answer any final questions.',
    true,
    0
  )
) AS v(name, category, subject, contact_type, calendar_title, external_calendar_title, content, is_active, usage_count)
WHERE NOT EXISTS (
  SELECT 1 FROM templates WHERE name = v.name AND category = 'appt_invites'
);

-- ============================================================
-- 8. SEED NOTES/LOGS TEMPLATES
-- ============================================================

INSERT INTO templates (name, category, description, content, is_active, usage_count)
SELECT * FROM (VALUES
  (
    'Initial Contact Note',
    'notes_logs',
    'Contact Notes',
    'Initial contact with {contact_name}. Discussed: {discussion_points}. Next steps: {next_steps}',
    true,
    0
  ),
  (
    'Site Visit Summary',
    'notes_logs',
    'Inspection Notes',
    'Site visit completed at {property_address}. Observations: {observations}. Recommendations: {recommendations}',
    true,
    0
  ),
  (
    'Customer Concern',
    'notes_logs',
    'Customer Service',
    'Customer {contact_name} raised concern: {concern_details}. Resolution plan: {resolution_plan}',
    true,
    0
  )
) AS v(name, category, description, content, is_active, usage_count)
WHERE NOT EXISTS (
  SELECT 1 FROM templates WHERE name = v.name AND category = 'notes_logs'
);

-- ============================================================
-- 9. SEED EXPORT LIST TEMPLATES
-- ============================================================

INSERT INTO templates (name, category, description, content, is_active, usage_count)
SELECT * FROM (VALUES
  (
    'Sales Pipeline Export',
    'export_list',
    'Sales',
    'Export configuration for sales pipeline data including contact info, estimate amounts, and status',
    true,
    0
  ),
  (
    'Active Projects Export',
    'export_list',
    'Projects',
    'Export configuration for active project data including timelines, budgets, and completion status',
    true,
    0
  ),
  (
    'Customer Contact List',
    'export_list',
    'Marketing',
    'Export configuration for customer contact information for marketing campaigns',
    true,
    0
  )
) AS v(name, category, description, content, is_active, usage_count)
WHERE NOT EXISTS (
  SELECT 1 FROM templates WHERE name = v.name AND category = 'export_list'
);

-- ============================================================
-- 10. SEED CONNECTION PLANS DATA
-- ============================================================

INSERT INTO connection_plans (id, name, description, is_active)
SELECT * FROM (VALUES
  (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'New Lead Follow-up Sequence',
    'Automated follow-up sequence for new residential leads with initial contact, follow-up emails, and task creation',
    true
  ),
  (
    '00000000-0000-0000-0000-000000000002'::uuid,
    'Post-Estimate Nurture',
    'Nurture sequence after estimate is provided to answer questions and move lead to close',
    true
  ),
  (
    '00000000-0000-0000-0000-000000000003'::uuid,
    'Storm Damage Response',
    'Rapid response sequence for storm-damaged properties with inspection scheduling and insurance assistance',
    true
  )
) AS v(id, name, description, is_active)
WHERE NOT EXISTS (
  SELECT 1 FROM connection_plans WHERE id = v.id
);

-- ============================================================
-- 11. SEED CONNECTION PLAN ACTIONS
-- ============================================================

INSERT INTO connection_plan_actions (connection_plan_id, action_type, sequence_order, action_config)
SELECT * FROM (VALUES
  -- New Lead Follow-up Sequence Actions
  (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'send_email',
    1,
    '{"template_id": "use_template", "template_name": "Initial Contact - Residential", "delay_hours": 0}'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'create_task',
    2,
    '{"template_id": "use_template", "template_name": "Follow up on estimate", "delay_hours": 24}'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'send_text',
    3,
    '{"template_id": "use_template", "template_name": "Quick Check-in", "delay_hours": 72}'::jsonb
  ),
  -- Post-Estimate Nurture Actions
  (
    '00000000-0000-0000-0000-000000000002'::uuid,
    'send_email',
    1,
    '{"template_id": "use_template", "template_name": "Follow-up After Estimate", "delay_hours": 48}'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000002'::uuid,
    'send_text',
    2,
    '{"template_id": "use_template", "template_name": "Estimate Ready", "delay_hours": 96}'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000002'::uuid,
    'create_task',
    3,
    '{"template_id": "use_template", "template_name": "Follow up on estimate", "delay_hours": 168}'::jsonb
  ),
  -- Storm Damage Response Actions
  (
    '00000000-0000-0000-0000-000000000003'::uuid,
    'send_email',
    1,
    '{"template_id": "use_template", "template_name": "Storm Damage Alert", "delay_hours": 0}'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000003'::uuid,
    'schedule_appointment',
    2,
    '{"template_id": "use_template", "template_name": "Initial Consultation", "delay_hours": 2}'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000003'::uuid,
    'create_task',
    3,
    '{"template_id": "use_template", "template_name": "Send insurance documentation", "delay_hours": 24}'::jsonb
  )
) AS v(connection_plan_id, action_type, sequence_order, action_config)
WHERE NOT EXISTS (
  SELECT 1 FROM connection_plan_actions
  WHERE connection_plan_id = v.connection_plan_id
    AND sequence_order = v.sequence_order
);

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================

-- Uncomment these to verify the data was inserted correctly:

-- SELECT COUNT(*) as template_count FROM templates;
-- SELECT COUNT(*) as connection_plan_count FROM connection_plans;
-- SELECT COUNT(*) as action_count FROM connection_plan_actions;

-- ============================================================
-- SUCCESS!
-- ============================================================

-- If you see no errors above, your database is now complete!
-- You can now use the application with full functionality.
