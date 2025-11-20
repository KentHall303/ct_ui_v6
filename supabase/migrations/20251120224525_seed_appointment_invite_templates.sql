/*
  # Seed Appointment Invite Templates Data

  1. Purpose
    - Populate the templates table with appointment invite templates
    - Provide examples for various appointment types and scenarios
    - Showcase calendar integration and external invite features

  2. Data Inserted
    - 12 appointment invite templates covering different appointment types
    - Templates with email subjects, calendar titles, and external calendar titles
    - Various contact types (All, Client, Vendor, Employee)
    - Professional content with token support

  3. Fields Populated
    - name: Template name
    - subject: Email subject line
    - content: Email body content
    - category: Set to 'appt_invites' for all records
    - calendar_title: Internal calendar event title
    - external_calendar_title: Title for external calendar invite sent to client
    - contact_type: Target audience
    - select_token: Default token selection
    - is_active: All set to true
    - usage_count: Initialized to 0
*/

-- Insert comprehensive appointment invite templates
INSERT INTO templates (
  name,
  subject,
  content,
  category,
  calendar_title,
  external_calendar_title,
  contact_type,
  select_token,
  is_active,
  usage_count
) VALUES
  (
    'Initial Consultation Appointment',
    'Appointment Scheduled: Initial Consultation with {{user.name}}',
    'Hello {{client.firstName}},

Thank you for your interest in our services! I''m excited to meet with you to discuss your project.

Your consultation is scheduled for:
Date: {{appointment.date}}
Time: {{appointment.time}}
Location: {{appointment.location}}

During this consultation, we''ll:
- Review your project requirements and goals
- Discuss timeline and budget considerations
- Answer any questions you may have
- Provide initial recommendations

Please feel free to bring any inspiration photos, measurements, or questions you''d like to discuss.

If you need to reschedule, please let me know as soon as possible.

Looking forward to meeting you!

Best regards,
{{user.name}}
{{user.phone}}',
    'appt_invites',
    'Initial Consultation - {{client.firstName}} {{client.lastName}}',
    'Consultation with {{company.name}}',
    'All',
    'Contact Name',
    true,
    0
  ),
  (
    'Site Visit Appointment',
    'Site Visit Scheduled - {{appointment.date}}',
    'Hi {{client.firstName}},

Your site visit has been scheduled! We''ll be coming out to take measurements, assess the space, and discuss your project in detail.

Appointment Details:
Date: {{appointment.date}}
Time: {{appointment.time}}
Address: {{client.address}}
Estimator: {{user.name}}

What to expect:
- We''ll walk through the project area
- Take necessary measurements and photos
- Discuss your preferences and requirements
- Answer your questions on-site
- Provide timeline and next steps

The visit typically takes 30-60 minutes. Please ensure access to all relevant areas.

See you soon!

{{user.name}}
{{company.name}}
{{user.phone}}',
    'appt_invites',
    'Site Visit - {{client.firstName}} {{client.lastName}} - {{client.address}}',
    'Site Visit - {{company.name}}',
    'Client',
    'Contact Name',
    true,
    0
  ),
  (
    'Installation Appointment',
    'Installation Scheduled: {{project.name}}',
    'Dear {{client.firstName}},

Great news! Your installation has been scheduled.

Installation Details:
Project: {{project.name}}
Date: {{appointment.date}}
Start Time: {{appointment.time}}
Estimated Duration: {{appointment.duration}}
Crew Lead: {{user.name}}

Before we arrive:
- Please clear the work area of any personal items
- Ensure we have access to power outlets and water (if needed)
- Remove any fragile items from nearby areas
- Arrange for parking if needed

We''ll call you the day before to confirm our arrival time.

If you have any questions or concerns, please don''t hesitate to reach out.

Thank you for choosing {{company.name}}!

Best regards,
{{user.name}}
{{user.phone}}',
    'appt_invites',
    'INSTALL: {{client.firstName}} {{client.lastName}} - {{project.name}}',
    'Installation - {{company.name}}',
    'Client',
    'Contact Name',
    true,
    0
  ),
  (
    'Follow-Up Appointment',
    'Follow-Up Appointment: {{project.name}}',
    'Hello {{client.firstName}},

I''d like to schedule a follow-up appointment to check on how everything is going with your completed project.

Proposed Meeting:
Date: {{appointment.date}}
Time: {{appointment.time}}
Duration: 15-30 minutes

During this visit, we''ll:
- Inspect the completed work
- Address any concerns or questions
- Ensure everything meets your expectations
- Discuss warranty and maintenance

Please confirm if this time works for you, or suggest an alternative.

Looking forward to seeing you!

{{user.name}}
{{company.name}}
{{user.phone}}',
    'appt_invites',
    'Follow-Up - {{client.firstName}} {{client.lastName}}',
    'Follow-Up Visit - {{company.name}}',
    'Client',
    'Contact Name',
    true,
    0
  ),
  (
    'Final Walkthrough',
    'Final Walkthrough Scheduled - {{project.name}}',
    'Hi {{client.firstName}},

It''s time for the final walkthrough of your completed project!

Walkthrough Details:
Date: {{appointment.date}}
Time: {{appointment.time}}
Location: {{project.address}}

During this walkthrough, we''ll:
- Review all completed work together
- Address any final touch-ups if needed
- Provide care and maintenance instructions
- Answer any questions
- Process final payment

Please take your time to inspect everything carefully. We want you to be 100% satisfied!

See you then!

{{user.name}}
{{company.name}}
{{user.phone}}',
    'appt_invites',
    'Final Walkthrough - {{client.firstName}} {{client.lastName}}',
    'Final Walkthrough - {{company.name}}',
    'Client',
    'Contact Name',
    true,
    0
  ),
  (
    'Quote Presentation Appointment',
    'Quote Presentation Meeting - {{appointment.date}}',
    'Dear {{client.firstName}},

I''m ready to present your detailed quote! I''ve scheduled time for us to review everything together.

Meeting Details:
Date: {{appointment.date}}
Time: {{appointment.time}}
Format: {{appointment.format}}

We''ll cover:
- Detailed breakdown of costs
- Project timeline and milestones
- Payment terms and options
- Warranty information
- Next steps if you decide to proceed

I''ve prepared a comprehensive proposal that addresses all your requirements. Feel free to bring any questions!

Looking forward to our meeting!

{{user.name}}
{{company.name}}
{{user.phone}}',
    'appt_invites',
    'Quote Presentation - {{client.firstName}} {{client.lastName}}',
    'Quote Review - {{company.name}}',
    'All',
    'Contact Name',
    true,
    0
  ),
  (
    'Inspection Appointment',
    'Inspection Scheduled: {{inspection.type}}',
    'Hello {{client.firstName}},

Your {{inspection.type}} inspection has been scheduled.

Inspection Details:
Date: {{appointment.date}}
Time: {{appointment.time}}
Inspector: {{user.name}}
Estimated Duration: {{appointment.duration}}

What we''ll inspect:
{{inspection.checklist}}

After the inspection, you''ll receive:
- Detailed inspection report
- Photos of any issues found
- Recommendations for repairs or maintenance
- Quote for any necessary work

Please ensure access to all areas that need inspection.

Thank you!

{{user.name}}
{{company.name}}
{{user.phone}}',
    'appt_invites',
    '{{inspection.type}} Inspection - {{client.firstName}} {{client.lastName}}',
    'Inspection - {{company.name}}',
    'Client',
    'Contact Name',
    true,
    0
  ),
  (
    'Emergency Service Call',
    'Emergency Service Scheduled',
    'Hi {{client.firstName}},

We''ve scheduled an emergency service call to address your urgent issue.

Service Call Details:
Date: {{appointment.date}}
Arrival Window: {{appointment.time}}
Technician: {{user.name}}
Issue: {{service.issue}}

Our technician will:
- Assess the situation
- Provide immediate solutions
- Give you a detailed explanation
- Discuss long-term fixes if needed

We''ll call you when we''re on the way.

Emergency Contact: {{user.phone}}

{{company.name}}',
    'appt_invites',
    'EMERGENCY: {{client.firstName}} {{client.lastName}} - {{service.issue}}',
    'Emergency Service - {{company.name}}',
    'Client',
    'Contact Name',
    true,
    0
  ),
  (
    'Vendor Meeting',
    'Vendor Meeting: {{meeting.topic}}',
    'Hello {{vendor.contactName}},

I''d like to schedule a meeting to discuss {{meeting.topic}}.

Meeting Details:
Date: {{appointment.date}}
Time: {{appointment.time}}
Location: {{appointment.location}}
Duration: {{appointment.duration}}

Agenda:
{{meeting.agenda}}

Please confirm your attendance and let me know if you need to adjust the time.

Best regards,
{{user.name}}
{{company.name}}
{{user.phone}}',
    'appt_invites',
    'Vendor Meeting - {{vendor.companyName}} - {{meeting.topic}}',
    'Meeting with {{company.name}}',
    'Vendor',
    'Contact Name',
    true,
    0
  ),
  (
    'Team Meeting',
    'Team Meeting: {{meeting.topic}}',
    'Hi Team,

We have a meeting scheduled to discuss {{meeting.topic}}.

Meeting Details:
Date: {{appointment.date}}
Time: {{appointment.time}}
Location: {{appointment.location}}
Duration: {{appointment.duration}}

Agenda:
{{meeting.agenda}}

Please review any relevant materials beforehand and come prepared with questions or updates.

See you there!

{{user.name}}',
    'appt_invites',
    'Team Meeting - {{meeting.topic}}',
    'Team Meeting - {{meeting.topic}}',
    'Employee',
    'Contact Name',
    true,
    0
  ),
  (
    'Virtual Consultation',
    'Virtual Consultation - {{appointment.date}}',
    'Hello {{client.firstName}},

Your virtual consultation is all set!

Video Call Details:
Date: {{appointment.date}}
Time: {{appointment.time}}
Meeting Link: {{appointment.videoLink}}
Duration: {{appointment.duration}}

Before the call:
- Test your camera and microphone
- Have your measurements ready (if applicable)
- Prepare any photos or documents to share
- Write down your questions

I''ll send you a reminder 30 minutes before our call.

Looking forward to connecting!

{{user.name}}
{{company.name}}
{{user.phone}}',
    'appt_invites',
    'Virtual Consult - {{client.firstName}} {{client.lastName}}',
    'Virtual Meeting with {{company.name}}',
    'All',
    'Contact Name',
    true,
    0
  ),
  (
    'Color Selection Appointment',
    'Color Selection Meeting - {{project.name}}',
    'Hi {{client.firstName}},

It''s time to select colors for your {{project.name}} project!

Appointment Details:
Date: {{appointment.date}}
Time: {{appointment.time}}
Location: {{appointment.location}}

What to bring:
- Any fabric or paint samples from your space
- Photos of your room/area
- Your inspiration images
- A list of your must-haves

We''ll review:
- Color options and recommendations
- Sample swatches
- How colors will look in your space
- Finish options

This is the fun part! Take your time and don''t hesitate to ask questions.

See you soon!

{{user.name}}
{{company.name}}
{{user.phone}}',
    'appt_invites',
    'Color Selection - {{client.firstName}} {{client.lastName}}',
    'Color Selection - {{company.name}}',
    'Client',
    'Contact Name',
    true,
    0
  )
ON CONFLICT DO NOTHING;