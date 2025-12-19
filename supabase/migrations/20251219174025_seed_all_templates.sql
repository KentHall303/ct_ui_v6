/*
  # Seed All Templates

  ## Overview
  Seeds initial template data for all categories:
  - Email templates (3)
  - Text templates (3)
  - Task templates (4)
  - Appointment invite templates (3)
  - Notes/logs templates (3)
  - Export list templates (3)
*/

-- Email Templates
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
- Residential roof replacement and repair
- Storm damage assessment
- Insurance claim assistance
- Premium materials with extended warranties

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
- The scope of work outlined
- Material options and warranties
- Project timeline
- Financing options

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

- Conduct a thorough roof inspection
- Document any damage with photos
- Provide a detailed assessment report
- Assist with insurance claims if needed

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

-- Text Templates
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

-- Task Templates
INSERT INTO templates (name, category, title, detail, due_in_days, assignee_type, priority, is_active, usage_count, content)
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
    0,
    'Follow up task'
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
    0,
    'Insurance docs task'
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
    0,
    'Walkthrough task'
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
    0,
    'Materials task'
  )
) AS v(name, category, title, detail, due_in_days, assignee_type, priority, is_active, usage_count, content)
WHERE NOT EXISTS (
  SELECT 1 FROM templates WHERE name = v.name AND category = 'task'
);

-- Appointment Invite Templates
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

-- Notes/Logs Templates
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

-- Export List Templates
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