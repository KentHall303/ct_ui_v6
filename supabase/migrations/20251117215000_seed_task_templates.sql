/*
  # Seed Task Templates Data

  1. Purpose
    - Populate the templates table with comprehensive task templates
    - Provide realistic examples for various business scenarios
    - Showcase token usage and dynamic content features

  2. Data Inserted
    - 15 task templates with varying priorities and due dates
    - Templates include task titles, detailed descriptions, assignee types, and priorities
    - Coverage of common business tasks (follow-ups, inspections, documentation, etc.)

  3. Fields Populated
    - name: Template name
    - title: Task title with token support
    - detail: Detailed task instructions
    - category: Set to 'task' for all records
    - due_in_days: Days until task is due
    - assignee_type: Who the task is assigned to (account_owner, assigned_user, specific_user)
    - priority: Task priority (High, Medium, Low)
    - is_active: All set to true
    - usage_count: Initialized to 0
*/

-- Insert comprehensive task templates
INSERT INTO templates (
  name,
  title,
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
    'task',
    2,
    'assigned_user',
    'Medium',
    true,
    0
  )
ON CONFLICT DO NOTHING;
