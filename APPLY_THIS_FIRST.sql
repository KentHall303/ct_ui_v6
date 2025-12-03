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
  type text NOT NULL CHECK (type IN (
    'email',
    'text',
    'task',
    'appointment_invite',
    'notes_logs',
    'export_list'
  )),
  category text,
  subject text,
  content text,
  tcpa_disclosure text,
  task_category text,
  task_due_in_days integer,
  appt_title text,
  appt_duration_minutes integer,
  appt_location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
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

INSERT INTO templates (name, type, category, subject, content, tcpa_disclosure)
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
    'By responding, you consent to receive calls/texts about our services. Reply STOP to opt out.'
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
    'Message and data rates may apply. Reply STOP to opt out.'
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
    'By responding, you consent to receive communications. Reply STOP to opt out.'
  )
) AS v(name, type, category, subject, content, tcpa_disclosure)
WHERE NOT EXISTS (
  SELECT 1 FROM templates WHERE name = v.name AND type = 'email'
);

-- ============================================================
-- 5. SEED TEXT TEMPLATES
-- ============================================================

INSERT INTO templates (name, type, category, content, tcpa_disclosure)
SELECT * FROM (VALUES
  (
    'Quick Check-in',
    'text',
    'Follow-up',
    'Hi {contact_name}, this is {user_name} from {company_name}. Just checking in about your roofing project. Do you have any questions I can answer?',
    'Reply STOP to opt out'
  ),
  (
    'Appointment Reminder',
    'text',
    'Reminders',
    'Hi {contact_name}, friendly reminder about our appointment tomorrow at {appointment_time} for your property at {property_address}. See you then! - {user_name}',
    'Reply STOP to opt out'
  ),
  (
    'Estimate Ready',
    'text',
    'Sales',
    'Hi {contact_name}, your roofing estimate is ready! I''ve sent it to your email. Let me know if you''d like to discuss any details. - {user_name} at {company_name}',
    'Reply STOP to opt out'
  )
) AS v(name, type, category, content, tcpa_disclosure)
WHERE NOT EXISTS (
  SELECT 1 FROM templates WHERE name = v.name AND type = 'text'
);

-- ============================================================
-- 6. SEED TASK TEMPLATES
-- ============================================================

INSERT INTO templates (name, type, task_category, content, task_due_in_days)
SELECT * FROM (VALUES
  (
    'Follow up on estimate',
    'task',
    'Sales',
    'Call {contact_name} to discuss the estimate provided for {property_address}. Address any questions or concerns.',
    3
  ),
  (
    'Send insurance documentation',
    'task',
    'Administrative',
    'Prepare and send insurance claim documentation for {contact_name} - {property_address}',
    1
  ),
  (
    'Schedule final walkthrough',
    'task',
    'Project Management',
    'Coordinate final walkthrough with {contact_name} for completed project at {property_address}',
    0
  ),
  (
    'Order materials',
    'task',
    'Operations',
    'Order materials for {contact_name} project at {property_address}. Confirm delivery date.',
    7
  )
) AS v(name, type, task_category, content, task_due_in_days)
WHERE NOT EXISTS (
  SELECT 1 FROM templates WHERE name = v.name AND type = 'task'
);

-- ============================================================
-- 7. SEED APPOINTMENT INVITE TEMPLATES
-- ============================================================

INSERT INTO templates (name, type, appt_title, appt_duration_minutes, appt_location, content)
SELECT * FROM (VALUES
  (
    'Initial Consultation',
    'appointment_invite',
    'Roofing Consultation - {contact_name}',
    60,
    '{property_address}',
    'Initial consultation to assess roofing needs and provide estimate.'
  ),
  (
    'Follow-up Meeting',
    'appointment_invite',
    'Follow-up Discussion - {contact_name}',
    30,
    'Office or Phone',
    'Follow-up meeting to discuss estimate and answer questions.'
  ),
  (
    'Project Kickoff',
    'appointment_invite',
    'Project Kickoff - {property_address}',
    45,
    '{property_address}',
    'Project kickoff meeting to review scope, timeline, and answer any final questions.'
  )
) AS v(name, type, appt_title, appt_duration_minutes, appt_location, content)
WHERE NOT EXISTS (
  SELECT 1 FROM templates WHERE name = v.name AND type = 'appointment_invite'
);

-- ============================================================
-- 8. SEED NOTES/LOGS TEMPLATES
-- ============================================================

INSERT INTO templates (name, type, category, content)
SELECT * FROM (VALUES
  (
    'Initial Contact Note',
    'notes_logs',
    'Contact Notes',
    'Initial contact with {contact_name}. Discussed: {discussion_points}. Next steps: {next_steps}'
  ),
  (
    'Site Visit Summary',
    'notes_logs',
    'Inspection Notes',
    'Site visit completed at {property_address}. Observations: {observations}. Recommendations: {recommendations}'
  ),
  (
    'Customer Concern',
    'notes_logs',
    'Customer Service',
    'Customer {contact_name} raised concern: {concern_details}. Resolution plan: {resolution_plan}'
  )
) AS v(name, type, category, content)
WHERE NOT EXISTS (
  SELECT 1 FROM templates WHERE name = v.name AND type = 'notes_logs'
);

-- ============================================================
-- 9. SEED EXPORT LIST TEMPLATES
-- ============================================================

INSERT INTO templates (name, type, category, content)
SELECT * FROM (VALUES
  (
    'Sales Pipeline Export',
    'export_list',
    'Sales',
    'Export configuration for sales pipeline data including contact info, estimate amounts, and status'
  ),
  (
    'Active Projects Export',
    'export_list',
    'Projects',
    'Export configuration for active project data including timelines, budgets, and completion status'
  ),
  (
    'Customer Contact List',
    'export_list',
    'Marketing',
    'Export configuration for customer contact information for marketing campaigns'
  )
) AS v(name, type, category, content)
WHERE NOT EXISTS (
  SELECT 1 FROM templates WHERE name = v.name AND type = 'export_list'
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
