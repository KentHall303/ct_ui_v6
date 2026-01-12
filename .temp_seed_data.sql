INSERT INTO templates (name, subject, contact_type, exclude_client, content, category, is_active, usage_count)
VALUES
  (
    '! please provide missing Data',
    '! Fill in form',
    'All',
    false,
    'Dear {client.firstName},

We are missing some important information to proceed with your project. Please provide the following details at your earliest convenience:

{missing_fields}

You can update this information by logging into your portal or by replying to this email.

Thank you for your cooperation.

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '{{client.firstName}} signature process as promised',
    '{{client.firstName}} signature process as promised',
    'All',
    false,
    'Hello {client.firstName},

As promised, here is the signature document for your review and signature. Please follow the instructions below to complete the signing process:

1. Click on the link below to access the document
2. Review all pages carefully
3. Sign where indicated
4. Submit the completed document

{signature_link}

If you have any questions or concerns, please don''t hesitate to contact us.

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '! please provide missing Data',
    '! Fill in form',
    'All',
    false,
    'Dear {client.firstName},

We noticed that some required information is still missing from your account. To ensure we can provide you with the best service, please complete the following:

{missing_information}

Please log into your account or reply to this email with the requested information.

Thank you,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '{{client.firstName}} signature process as promised',
    '{{client.firstName}} signature process as promised',
    'All',
    false,
    'Hi {client.firstName},

Attached you will find the documents that require your signature. We have prepared everything for your convenience:

- Document 1: {document_1}
- Document 2: {document_2}

Please review and sign at your earliest convenience. The signature process is simple and secure.

{signature_instructions}

Looking forward to hearing from you soon.

Sincerely,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '! please provide missing Data',
    '! Fill in form',
    'All',
    false,
    'Dear {client.firstName},

We need some additional information to complete your request. Please provide the missing data as soon as possible:

{required_information}

This information is crucial for us to proceed with your project efficiently.

Thank you for your prompt attention to this matter.

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '{{client.firstName}} signature process as promised',
    '{{client.firstName}} signature process as promised',
    'All',
    false,
    'Dear {client.firstName},

Your documents are ready for signature. Please follow the secure link below to review and sign:

{document_link}

The process is quick and easy:
- Review the document
- Add your signature
- Submit

Please complete this within the next 48 hours.

Thank you,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '! please provide missing Data',
    '! Fill in form',
    'All',
    false,
    'Hello {client.firstName},

We are currently unable to proceed with your request due to missing information. Please fill in the following details:

{form_fields}

You can complete this form by clicking the link below:
{form_link}

We appreciate your cooperation.

Regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '{{client.firstName}} signature process as promised',
    '{{client.firstName}} signature process as promised',
    'All',
    false,
    'Hi {client.firstName},

As discussed, here are the documents requiring your signature:

{document_list}

Please review and sign these documents using our secure portal.

{portal_link}

Feel free to reach out if you have any questions.

Best wishes,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '! please provide missing Data',
    '! Fill in form',
    'All',
    false,
    'Dear {client.firstName},

To move forward with your application, we need you to provide some missing information:

{missing_data_list}

Please complete the form at your earliest convenience:
{completion_link}

Thank you for your assistance.

Sincerely,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '{{client.firstName}} signature process as promised',
    '{{client.firstName}} signature process as promised',
    'All',
    false,
    'Hello {client.firstName},

Your signature is required to finalize the documents we discussed. Please access the secure signing portal:

{signing_portal}

Steps to complete:
1. Open the document
2. Review the content
3. Sign electronically
4. Submit

Thank you for your prompt attention.

Best regards,
{user.name}',
    'email',
    true,
    0
  );

-- ============================================================
-- PART 6: SEED TEXT TEMPLATES (15 records)
-- ============================================================

INSERT INTO templates (
  name,
  contact_type,
  content,
  category,
  content_tcpa,
  select_token,
  is_active,
  usage_count
) VALUES
  (
    'Appointment Test',
    'All',
    'Hi! This is a reminder about your upcoming appointment. Please confirm your attendance. Reply YES to confirm.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Collin New Text',
    'All',
    'Hello! Thanks for reaching out. We will get back to you shortly with more information.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Lunch break Name',
    'All',
    'We are currently on lunch break and will respond to your message after 2 PM. Thank you for your patience!',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Next Appointments',
    'All',
    'Your next appointment is scheduled. We look forward to seeing you!',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Phone Fill Text',
    'All',
    'Please provide your phone number so we can contact you regarding your inquiry.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Purple Gif',
    'All',
    'Check out our latest updates and special offers! Visit our website for more details.',
    'text',
    'Promotional',
    'Contact Name',
    true,
    0
  ),
  (
    'Referral Received (ReferPro)',
    'Clients',
    'Thank you for your referral! We truly appreciate your trust in recommending our services.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Show me the next appointment',
    'All',
    'Your next scheduled appointment is coming up. Reply INFO for details or CONFIRM to acknowledge.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Sunny Test Text - how are you doing',
    'All',
    'Hi! Just checking in to see how everything is going. Let us know if you need anything!',
    'text',
    'Promotional',
    'Contact Name',
    true,
    0
  ),
  (
    'Template SMS with Attachment',
    'All',
    'Your document is ready. Please check your email for the attachment we sent you.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Template SMS with Attachment',
    'All',
    'We have sent you important documents via email. Please review them at your earliest convenience.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Thanks for contacting us!',
    'All',
    'Thank you for contacting us! We have received your message and will respond within 24 hours.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Thanks for contacting us!',
    'All',
    'Thanks for reaching out! Your inquiry is important to us and we will get back to you soon.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Thanks for contacting us!',
    'All',
    'We appreciate you contacting us. A member of our team will be in touch shortly.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  ),
  (
    'Thanks for contacting us! (copy)',
    'All',
    'Thank you for your message! We value your business and will respond as quickly as possible.',
    'text',
    'Transactional',
    'Contact Name',
    true,
    0
  );

-- ============================================================
-- PART 7: SEED TASK TEMPLATES (15 records)
-- ============================================================

INSERT INTO templates (
  name,
  title,
  content,
  detail,
  category,
  due_in_days,
  assignee_type,
  priority,
  is_active,
  usage_count
) VALUES
  (
    'Follow Up Call - Post Quote',
    'Follow up with {{client.firstName}} {{client.lastName}} on quote',
    'Call the client to discuss the quote we sent. Answer any questions they may have about pricing, timeline, or scope of work. Try to move them toward a decision.',
    'Call the client to discuss the quote we sent. Answer any questions they may have about pricing, timeline, or scope of work. Try to move them toward a decision.',
    'task',
    2,
    'assigned_user',
    'High',
    true,
    0
  ),
  (
    'Site Inspection Required',
    'Schedule site inspection for {{client.firstName}} {{client.lastName}}',
    'Coordinate with the client to schedule an on-site inspection. Take photos, measurements, and notes about any potential issues or special requirements.',
    'Coordinate with the client to schedule an on-site inspection. Take photos, measurements, and notes about any potential issues or special requirements.',
    'task',
    1,
    'assigned_user',
    'High',
    true,
    0
  ),
  (
    'Send Contract Documents',
    'Send contract to {{client.firstName}} for signature',
    'Prepare and send the contract documents to the client via email. Include instructions for electronic signature and payment terms. Follow up within 24 hours if no response.',
    'Prepare and send the contract documents to the client via email. Include instructions for electronic signature and payment terms. Follow up within 24 hours if no response.',
    'task',
    0,
    'account_owner',
    'High',
    true,
    0
  ),
  (
    'Schedule Installation',
    'Schedule installation date with {{client.firstName}}',
    'Contact the client to schedule the installation. Confirm crew availability, obtain any necessary permits, and send calendar invitation with all details.',
    'Contact the client to schedule the installation. Confirm crew availability, obtain any necessary permits, and send calendar invitation with all details.',
    'task',
    3,
    'assigned_user',
    'Medium',
    true,
    0
  ),
  (
    'Order Materials',
    'Order materials for {{client.firstName}} project',
    'Review the quote and order all necessary materials. Verify quantities, colors, and specifications match client selections. Confirm delivery date aligns with installation schedule.',
    'Review the quote and order all necessary materials. Verify quantities, colors, and specifications match client selections. Confirm delivery date aligns with installation schedule.',
    'task',
    5,
    'account_owner',
    'High',
    true,
    0
  ),
  (
    'Pre-Installation Call',
    'Pre-installation call with {{client.firstName}}',
    'Call client 24-48 hours before installation to confirm appointment, review what to expect, and answer any last-minute questions. Remind them of any preparation needed on their end.',
    'Call client 24-48 hours before installation to confirm appointment, review what to expect, and answer any last-minute questions. Remind them of any preparation needed on their end.',
    'task',
    1,
    'assigned_user',
    'Medium',
    true,
    0
  ),
  (
    'Quality Check Follow Up',
    'Quality check follow-up for {{client.firstName}}',
    'Call client 3-5 days after installation to ensure satisfaction with the work. Address any concerns immediately and document feedback for records.',
    'Call client 3-5 days after installation to ensure satisfaction with the work. Address any concerns immediately and document feedback for records.',
    'task',
    7,
    'assigned_user',
    'Medium',
    true,
    0
  ),
  (
    'Request Review',
    'Request online review from {{client.firstName}}',
    'Send review request email to satisfied client. Include direct links to Google, Yelp, and other relevant review platforms. Thank them for their business.',
    'Send review request email to satisfied client. Include direct links to Google, Yelp, and other relevant review platforms. Thank them for their business.',
    'task',
    10,
    'account_owner',
    'Low',
    true,
    0
  ),
  (
    'Update Project Photos',
    'Upload before/after photos for {{client.firstName}} project',
    'Take high-quality photos of completed work. Upload to project folder and client portal. Request client permission to use photos for marketing purposes.',
    'Take high-quality photos of completed work. Upload to project folder and client portal. Request client permission to use photos for marketing purposes.',
    'task',
    1,
    'assigned_user',
    'Low',
    true,
    0
  ),
  (
    'Process Final Payment',
    'Process final payment for {{client.firstName}}',
    'Send final invoice and payment link to client. Verify all work is complete and client is satisfied before processing. Update accounting records.',
    'Send final invoice and payment link to client. Verify all work is complete and client is satisfied before processing. Update accounting records.',
    'task',
    0,
    'account_owner',
    'High',
    true,
    0
  ),
  (
    'Warranty Registration',
    'Register warranty for {{client.firstName}}',
    'Complete warranty registration with manufacturer. File warranty documents in client folder and send copy to client. Set reminder for warranty expiration.',
    'Complete warranty registration with manufacturer. File warranty documents in client folder and send copy to client. Set reminder for warranty expiration.',
    'task',
    3,
    'account_owner',
    'Medium',
    true,
    0
  ),
  (
    'Permit Application',
    'Submit permit application for {{client.firstName}} project',
    'Complete and submit all required permit applications to local authorities. Track application status and notify client once permits are approved.',
    'Complete and submit all required permit applications to local authorities. Track application status and notify client once permits are approved.',
    'task',
    7,
    'account_owner',
    'High',
    true,
    0
  ),
  (
    'Subcontractor Coordination',
    'Coordinate subcontractors for {{client.firstName}} project',
    'Contact and schedule all necessary subcontractors. Confirm availability, rates, and scope of work. Send project details and site access information.',
    'Contact and schedule all necessary subcontractors. Confirm availability, rates, and scope of work. Send project details and site access information.',
    'task',
    5,
    'account_owner',
    'High',
    true,
    0
  ),
  (
    'Update CRM Notes',
    'Update CRM with notes from {{client.firstName}} meeting',
    'Document all key points from client meeting. Update project status, next steps, and any changes to scope or timeline. Tag relevant team members.',
    'Document all key points from client meeting. Update project status, next steps, and any changes to scope or timeline. Tag relevant team members.',
    'task',
    0,
    'assigned_user',
    'Medium',
    true,
    0
  ),
  (
    'Send Project Timeline',
    'Send project timeline to {{client.firstName}}',
    'Create detailed project timeline with key milestones and deadlines. Send to client for review and approval. Update based on client feedback.',
    'Create detailed project timeline with key milestones and deadlines. Send to client for review and approval. Update based on client feedback.',
    'task',
    2,
    'assigned_user',
    'Medium',
    true,
    0
  );

-- ============================================================
-- PART 8: SEED NOTES/LOGS TEMPLATES (9 records)
-- ============================================================

INSERT INTO templates (name, content, category, is_active, usage_count)
VALUES
  (
    'Bug Report Outline',
    '<h2><strong>1. Report Header</strong></h2>
<ul>
<li><strong>Title:</strong> A brief, descriptive title that summarizes the issue. Start with the main area of the System that is affected followed by a few identifying words</li>
<li><strong>Reported By:</strong> Names of the persons reporting the bug. Account Name, CSM Name</li>
<li><strong>Date Reported:</strong> When the bug was first noticed and reported. (YYYY-MM-DD)</li>
<li><strong>Priority and Severity:</strong> Define the urgency and impact of the bug. (Low, Medium, High)</li>
</ul>
<h2><strong>2. Environment and Configuration</strong></h2>
<ul>
<li><strong>Browser Name and Version:</strong> The version of the software where the bug was found.</li>
</ul>',
    'notes_logs',
    true,
    0
  ),
  (
    'Interview Questions',
    '<ol>
<li>where do you live</li>
<li>what color banana do you like: green, yellow, spotted brown, black?</li>
</ol>',
    'notes_logs',
    true,
    0
  ),
  (
    'Phone Script for a First-Time Call',
    '<ol>
<li><strong>Introduction</strong>
<ul>
<li>"Good [morning/afternoon/evening], my name is [Your Name], and I''m calling from [Company/Organization Name]. May I speak with [Recipient''s Name], please?"</li>
</ul>
</li>
<li><strong>Purpose of Call</strong>
<ul>
<li>"I''m reaching out today to [briefly state the purpose of the call]. Our [product/service/organization] specializes in [briefly describe what you offer or the issue you want to address]."</li>
</ul>
</li>
<li><strong>Engage the Recipient</strong>
<ul>
<li>"I''d love to get your thoughts on [a relevant topic or question related to your purpose]."</li>
<li>"How do you currently handle [relevant issue or need related to your purpose]?"</li>
</ul>
</li>
<li><strong>Present Benefits/Value</strong>
<ul>
<li>"Many of our clients have found that [mention a key benefit or value proposition of your product/service]. This could be particularly beneficial for you because [relate it to something relevant to the recipient]."</li>
</ul>
</li>
<li><strong>Address Potential Concerns</strong></li>
</ol>',
    'notes_logs',
    true,
    0
  ),
  (
    'Meeting Notes',
    '<h2><strong>Meeting Notes Template</strong></h2>
<p><strong>Date:</strong> [Date]</p>
<p><strong>Time:</strong> [Start Time] - [End Time]</p>
<p><strong>Location:</strong> [Physical Location / Virtual Meeting Link]</p>
<p><strong>Attendees:</strong></p>
<ul>
<li>[Name 1]</li>
<li>[Name 2]</li>
<li>[Name 3]</li>
</ul>
<h3><strong>Agenda</strong></h3>
<ol>
<li>[Topic 1]</li>
<li>[Topic 2]</li>
<li>[Topic 3]</li>
</ol>
<h3><strong>Discussion Points</strong></h3>
<p><strong>Topic 1:</strong></p>
<ul>
<li>Key point discussed</li>
<li>Decisions made</li>
<li>Action items identified</li>
</ul>
<p><strong>Topic 2:</strong></p>
<ul>
<li>Key point discussed</li>
<li>Decisions made</li>
<li>Action items identified</li>
</ul>
<h3><strong>Action Items</strong></h3>
<ul>
<li>[Action Item 1] - Assigned to: [Name] - Due: [Date]</li>
<li>[Action Item 2] - Assigned to: [Name] - Due: [Date]</li>
</ul>
<h3><strong>Next Meeting</strong></h3>
<p><strong>Date:</strong> [Date]</p>
<p><strong>Time:</strong> [Time]</p>
<p><strong>Topics:</strong> [Topics to be discussed]</p>',
    'notes_logs',
    true,
    0
  ),
  (
    'Daily Work Log',
    '<h2><strong>Daily Work Log</strong></h2>
<p><strong>Date:</strong> [Date]</p>
<p><strong>Employee:</strong> [Your Name]</p>
<p><strong>Department:</strong> [Your Department]</p>
<h3><strong>Tasks Completed Today</strong></h3>
<ol>
<li><strong>[Task Name]</strong>
<ul>
<li>Time Spent: [Hours/Minutes]</li>
<li>Status: Completed / In Progress</li>
<li>Notes: [Any relevant notes]</li>
</ul>
</li>
</ol>
<h3><strong>Challenges Encountered</strong></h3>
<ul>
<li>[Challenge 1 and how it was addressed]</li>
</ul>
<h3><strong>Key Accomplishments</strong></h3>
<ul>
<li>[Accomplishment 1]</li>
</ul>
<h3><strong>Tomorrow''s Priorities</strong></h3>
<ol>
<li>[Priority Task 1]</li>
<li>[Priority Task 2]</li>
</ol>',
    'notes_logs',
    true,
    0
  ),
  (
    'Project Status Update',
    '<h2><strong>Project Status Update</strong></h2>
<p><strong>Project Name:</strong> [Project Name]</p>
<p><strong>Report Date:</strong> [Date]</p>
<p><strong>Project Manager:</strong> [Name]</p>
<h3><strong>Overall Status</strong></h3>
<p><strong>Status:</strong> On Track / At Risk / Behind Schedule</p>
<p><strong>Completion Percentage:</strong> [X]%</p>
<h3><strong>Milestones Achieved</strong></h3>
<ul>
<li>[Milestone 1] - Completed on [Date]</li>
</ul>
<h3><strong>Current Activities</strong></h3>
<ol>
<li>[Activity 1] - [Status]</li>
</ol>
<h3><strong>Upcoming Milestones</strong></h3>
<ul>
<li>[Milestone] - Target Date: [Date]</li>
</ul>
<h3><strong>Issues and Risks</strong></h3>
<p><strong>Issue 1:</strong> [Description]</p>
<ul>
<li>Impact: High / Medium / Low</li>
<li>Mitigation: [Action being taken]</li>
</ul>',
    'notes_logs',
    true,
    0
  ),
  (
    'Issue Tracking Log',
    '<h2><strong>Issue Tracking Log</strong></h2>
<p><strong>Issue ID:</strong> #[Number]</p>
<p><strong>Date Logged:</strong> [Date]</p>
<p><strong>Reported By:</strong> [Name]</p>
<p><strong>Assigned To:</strong> [Name]</p>
<h3><strong>Issue Details</strong></h3>
<p><strong>Title:</strong> [Brief description of the issue]</p>
<p><strong>Category:</strong> Bug / Feature Request / Enhancement / Other</p>
<p><strong>Priority:</strong> Critical / High / Medium / Low</p>
<p><strong>Status:</strong> New / In Progress / Resolved / Closed</p>
<h3><strong>Description</strong></h3>
<p>[Detailed description of the issue]</p>
<h3><strong>Steps to Reproduce</strong></h3>
<ol>
<li>[Step 1]</li>
<li>[Step 2]</li>
</ol>
<h3><strong>Resolution</strong></h3>
<p><strong>Date Resolved:</strong> [Date]</p>
<p><strong>Resolution Notes:</strong> [Description of how the issue was resolved]</p>',
    'notes_logs',
    true,
    0
  ),
  (
    'Client Communication Log',
    '<h2><strong>Client Communication Log</strong></h2>
<p><strong>Client Name:</strong> [Client Name]</p>
<p><strong>Contact Person:</strong> [Name]</p>
<p><strong>Date:</strong> [Date]</p>
<p><strong>Communication Method:</strong> Phone / Email / In-Person / Video Call</p>
<h3><strong>Purpose of Communication</strong></h3>
<p>[Brief description of why the communication took place]</p>
<h3><strong>Topics Discussed</strong></h3>
<ol>
<li><strong>[Topic 1]</strong>
<ul>
<li>Key points: [Summary]</li>
</ul>
</li>
</ol>
<h3><strong>Decisions Made</strong></h3>
<ul>
<li>[Decision 1]</li>
</ul>
<h3><strong>Action Items</strong></h3>
<ul>
<li><strong>Our Team:</strong> [Action item] - Due: [Date]</li>
<li><strong>Client:</strong> [Action item] - Due: [Date]</li>
</ul>
<h3><strong>Next Steps</strong></h3>
<ul>
<li>[Next step 1]</li>
</ul>',
    'notes_logs',
    true,
    0
  ),
  (
    'Follow-up Checklist',
    '<h2><strong>Follow-up Checklist</strong></h2>
<p><strong>Project/Task Name:</strong> [Name]</p>
<p><strong>Date Created:</strong> [Date]</p>
<p><strong>Owner:</strong> [Your Name]</p>
<h3><strong>Immediate Actions (Within 24 hours)</strong></h3>
<ul>
<li>[Action item 1]</li>
<li>[Action item 2]</li>
</ul>
<h3><strong>Short-term Actions (Within 1 week)</strong></h3>
<ul>
<li>[Action item 1] - Due: [Date]</li>
</ul>
<h3><strong>Communication Follow-ups</strong></h3>
<ul>
<li>Send email to [Name] regarding [Topic] - Due: [Date]</li>
</ul>
<h3><strong>Documentation Required</strong></h3>
<ul>
<li>Update [Document name]</li>
</ul>
<h3><strong>Dependencies/Blockers</strong></h3>
<p><strong>Waiting on:</strong></p>
<ul>
<li>[Dependency 1] - Expected by: [Date]</li>
</ul>
<h3><strong>Review Date</strong></h3>
<p><strong>Next Review:</strong> [Date]</p>',
    'notes_logs',
    true,
    0
  );

-- ============================================================
-- PART 9: SEED APPOINTMENT INVITE TEMPLATES (12 records)
-- ============================================================

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

The visit typically takes 30-60 minutes.

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

We''ll call you the day before to confirm our arrival time.

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

Please confirm if this time works for you.

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

Please take your time to inspect everything carefully.

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

Please confirm your attendance.

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

Please review any relevant materials beforehand.

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

This is the fun part!

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
  );

-- ============================================================
-- PART 10: SEED EXPORT LIST TEMPLATES (8 records)
-- ============================================================

INSERT INTO templates (
  name,
  description,
  content,
  category,
  variables,
  is_active,
  usage_count
) VALUES
  (
    'All Contacts Export',
    'Export all contact information including clients, vendors, and employees with full details',
    'Export all contacts with complete information including name, email, phone, address, contact type, status, and custom fields. Suitable for CRM backups or data migration.',
    'export_list',
    '{"fields": ["first_name", "last_name", "email", "phone", "mobile", "company", "contact_type", "address", "city", "state", "zip", "status", "lead_source", "tags", "notes", "created_at", "updated_at"], "format": "csv", "includeHeaders": true, "dateFormat": "YYYY-MM-DD"}',
    true,
    0
  ),
  (
    'Active Clients Only',
    'Export only active client contacts with primary contact information',
    'Filtered export of active clients with essential contact details. Perfect for marketing campaigns or client communications.',
    'export_list',
    '{"fields": ["first_name", "last_name", "email", "phone", "company", "address", "city", "state", "zip"], "filters": {"contact_type": "Client", "status": "Active"}, "format": "csv", "includeHeaders": true}',
    true,
    0
  ),
  (
    'Project Financial Summary',
    'Export financial data for all projects including revenue, costs, and profit margins',
    'Comprehensive financial export showing project revenue, costs (labor and materials), profit margins, and payment status. Ideal for financial reporting and analysis.',
    'export_list',
    '{"fields": ["project_id", "project_name", "client_name", "quote_number", "total_amount", "labor_cost", "material_cost", "total_cogs", "gross_profit", "profit_margin", "payment_status", "amount_paid", "balance_due", "start_date", "completion_date"], "format": "xlsx", "includeHeaders": true, "calculations": true}',
    true,
    0
  ),
  (
    'Open Opportunities Report',
    'Export all open opportunities in the sales pipeline with key metrics',
    'Sales pipeline export showing all opportunities that are not yet won or lost. Includes estimated value, stage, priority, and age of opportunity.',
    'export_list',
    '{"fields": ["contact_name", "company_name", "email", "phone", "sales_stage", "estimated_value", "priority", "lead_source", "assigned_to", "days_in_stage", "created_at", "last_contact_date", "next_action"], "filters": {"status": ["Lead", "Qualified", "Meeting Scheduled", "Proposal Sent", "Negotiation"]}, "format": "csv", "includeHeaders": true}',
    true,
    0
  ),
  (
    'Payment History Export',
    'Export complete payment history with transaction details',
    'Detailed payment export including all transactions, payment methods, dates, and reference numbers. Useful for accounting reconciliation.',
    'export_list',
    '{"fields": ["payment_id", "transaction_date", "client_name", "project_name", "quote_number", "payment_method", "amount", "transaction_reference", "payment_type", "notes", "processed_by"], "format": "xlsx", "includeHeaders": true, "dateFormat": "MM/DD/YYYY", "currencyFormat": "USD"}',
    true,
    0
  ),
  (
    'Monthly Revenue Report',
    'Export monthly revenue breakdown by project type and payment status',
    'Revenue analysis export grouped by month, showing revenue by project type, payment status, and outstanding balances.',
    'export_list',
    '{"fields": ["month", "project_type", "total_revenue", "paid_amount", "outstanding_balance", "number_of_projects", "average_project_value"], "groupBy": "month", "format": "xlsx", "includeHeaders": true, "includeSummary": true}',
    true,
    0
  ),
  (
    'Vendor Contact List',
    'Export all vendor and subcontractor contact information',
    'Complete vendor directory with contact details, specialties, rates, and performance ratings. Useful for vendor management and procurement.',
    'export_list',
    '{"fields": ["company_name", "contact_name", "email", "phone", "specialties", "hourly_rate", "rating", "insurance_status", "license_number", "address", "city", "state", "last_project_date"], "filters": {"contact_type": "Vendor"}, "format": "csv", "includeHeaders": true}',
    true,
    0
  ),
  (
    'Calendar Appointments Export',
    'Export scheduled appointments and calendar events with details',
    'Calendar export showing all appointments, installations, inspections, and meetings with date, time, location, and assigned personnel.',
    'export_list',
    '{"fields": ["event_date", "event_time", "event_type", "title", "client_name", "location", "assigned_to", "status", "duration", "amount", "quote_number", "notes"], "format": "xlsx", "includeHeaders": true, "sortBy": "event_date", "dateFormat": "MM/DD/YYYY", "timeFormat": "hh:mm A"}',
    true,
    0
  );

-- ============================================================
-- PART 11: SEED CONNECTION PLANS (4 records)
-- ============================================================

INSERT INTO connection_plans (id, name, contact_types, lead_sources, next_plan, count, is_active, show_only_here, build_pending_traditional, build_pending_domino, protect_from_overwriting, created_at, updated_at)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'New Lead Follow-Up Plan',
    'Lead,Prospect',
    'Website,Referral',
    NULL,
    45,
    true,
    false,
    false,
    false,
    false,
    now() - interval '30 days',
    now() - interval '5 days'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Lost Opportunity Re-engagement',
    'Lost Opportunity',
    'All',
    NULL,
    12,
    true,
    false,
    false,
    true,
    false,
    now() - interval '20 days',
    now() - interval '3 days'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Post-Meeting Follow-Up',
    'Prospect,Warm Lead',
    NULL,
    'New Lead Follow-Up Plan',
    28,
    true,
    true,
    false,
    false,
    false,
    now() - interval '15 days',
    now() - interval '2 days'
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'Customer Onboarding',
    'Customer,New Customer',
    NULL,
    NULL,
    67,
    true,
    false,
    true,
    false,
    true,
    now() - interval '60 days',
    now() - interval '1 day'
  );

-- ============================================================
-- PART 12: SEED CONNECTION PLAN ACTIONS (18 records)
-- ============================================================

-- Actions for New Lead Follow-Up Plan (5 actions)
INSERT INTO connection_plan_actions (connection_plan_id, step_number, action_name, action_type, delivery_timing, delivery_type, add_notifications, display_order, action_config)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    1,
    'Send Welcome Email',
    'email',
    'Immediate',
    'Email',
    true,
    1,
    '{"template": "welcome_new_lead", "priority": "high"}'::jsonb
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    2,
    'Schedule Introduction Call',
    'call',
    'Day 2',
    'Task',
    true,
    2,
    '{"duration": "30min", "type": "phone"}'::jsonb
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    3,
    'Follow-Up Email After Call',
    'email',
    'Day 3',
    'Email',
    false,
    3,
    '{"template": "post_call_followup"}'::jsonb
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    4,
    'Send Demo Scheduling Link',
    'email',
    'Day 7',
    'Email',
    true,
    4,
    '{"template": "demo_invitation", "include_calendar": true}'::jsonb
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    5,
    'Check-In and Next Steps',
    'email',
    'Day 14',
    'Email',
    false,
    5,
    '{"template": "two_week_checkin"}'::jsonb
  );

-- Actions for Lost Opportunity Re-engagement (4 actions)
INSERT INTO connection_plan_actions (connection_plan_id, step_number, action_name, action_type, delivery_timing, delivery_type, add_notifications, display_order, action_config)
VALUES
  (
    '22222222-2222-2222-2222-222222222222',
    1,
    'Friendly Check-In Email',
    'email',
    'Immediate',
    'Email',
    false,
    1,
    '{"template": "lost_opp_checkin", "tone": "casual"}'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    2,
    'Share Value Proposition',
    'email',
    'Day 7',
    'Email',
    true,
    2,
    '{"template": "value_prop_reengagement", "include_case_study": true}'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    3,
    'Offer Special Discount',
    'email',
    'Day 14',
    'Email',
    true,
    3,
    '{"template": "special_offer", "discount": "20%"}'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    4,
    'Final Reach Out',
    'email',
    'Day 30',
    'Email',
    false,
    4,
    '{"template": "final_touchpoint"}'::jsonb
  );

-- Actions for Post-Meeting Follow-Up (3 actions)
INSERT INTO connection_plan_actions (connection_plan_id, step_number, action_name, action_type, delivery_timing, delivery_type, add_notifications, display_order, action_config)
VALUES
  (
    '33333333-3333-3333-3333-333333333333',
    1,
    'Thank You Email',
    'email',
    'Same Day',
    'Email',
    false,
    1,
    '{"template": "meeting_thank_you", "include_summary": true}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    2,
    'Deliver Proposal',
    'email',
    'Day 2',
    'Email',
    true,
    2,
    '{"template": "proposal_delivery", "attach_pdf": true}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    3,
    'Follow-Up Call',
    'call',
    'Day 7',
    'Task',
    true,
    3,
    '{"duration": "15min", "purpose": "proposal_review"}'::jsonb
  );

-- Actions for Customer Onboarding (6 actions)
INSERT INTO connection_plan_actions (connection_plan_id, step_number, action_name, action_type, delivery_timing, delivery_type, add_notifications, display_order, action_config)
VALUES
  (
    '44444444-4444-4444-4444-444444444444',
    1,
    'Welcome to Our Platform',
    'email',
    'Immediate',
    'Email',
    true,
    1,
    '{"template": "customer_welcome", "include_getting_started": true}'::jsonb
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    2,
    'Schedule Training Session',
    'meeting',
    'Day 1',
    'Task',
    true,
    2,
    '{"duration": "60min", "type": "video", "training_level": "basic"}'::jsonb
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    3,
    'Send Documentation Links',
    'email',
    'Day 3',
    'Email',
    false,
    3,
    '{"template": "documentation_package", "include_videos": true}'::jsonb
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    4,
    'One-Week Check-In',
    'call',
    'Day 7',
    'Task',
    true,
    4,
    '{"duration": "30min", "purpose": "progress_check"}'::jsonb
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    5,
    'Request Feedback Survey',
    'email',
    'Day 14',
    'Email',
    false,
    5,
    '{"template": "feedback_survey", "survey_link": true}'::jsonb
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    6,
    'Onboarding Completion Certificate',
    'email',
    'Day 30',
    'Email',
    true,
    6,
    '{"template": "onboarding_complete", "attach_certificate": true}'::jsonb
  );
