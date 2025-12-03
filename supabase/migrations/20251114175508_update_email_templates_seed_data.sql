/*
  # Update Email Templates with Production Data

  ## Overview
  This migration replaces the existing email template seed data with the complete set of
  production templates including proper naming, subjects, and contact types.

  ## Changes
    1. Clear existing email template seed data
    2. Insert 42 production email templates with:
       - Proper template names
       - Corresponding email subjects
       - Contact type assignments (All or Partner)
       - Sample content for each template
       - Active status and usage tracking fields

  ## Data Details
    - Templates include various types: follow-ups, scheduling, proposals, signatures, etc.
    - Most templates are set to contact_type 'All'
    - One template is set to contact_type 'Partner'
    - All templates are marked as active (is_active = true)
    - Usage count initialized to 0 for all templates

  ## Notes
    - This migration is idempotent - it can be run multiple times safely
    - Uses ON CONFLICT DO NOTHING to prevent overwriting existing templates
    - NEVER deletes existing user data
    - Template content includes placeholder text that can be customized

  ## Safety Note
    - Original version had destructive DELETE statement - REMOVED FOR SAFETY
    - Now preserves all existing user-created templates
*/

INSERT INTO templates (name, subject, contact_type, exclude_client, content, category, is_active, usage_count)
VALUES
  (
    '-token test (copy)',
    '-token test',
    'All',
    false,
    'This is a test template for token functionality.

Please review and test the token system.

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '! Fill in form',
    '! Fill in form',
    'All',
    false,
    'Dear {client.firstName},

We need you to complete the required form to proceed with your request.

Please click the link below to access the form:
{form_link}

Thank you for your cooperation.

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '! Fill in form (copy)',
    '! Fill in form',
    'All',
    false,
    'Dear {client.firstName},

We need you to complete the required form to proceed with your request.

Please click the link below to access the form:
{form_link}

Thank you for your cooperation.

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '! Fill in form (copy) 2nd',
    '! Fill in form',
    'All',
    false,
    'Dear {client.firstName},

We need you to complete the required form to proceed with your request.

Please click the link below to access the form:
{form_link}

Thank you for your cooperation.

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '! please provide missing Data',
    'please provide missing Data',
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
    '!23 Addtl and BCC',
    '!23 Addtl and BCC',
    'All',
    false,
    'This template includes additional recipients and BCC functionality.

{template_content}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '{{client.firstName}} Online Interview Schedule',
    '{{client.firstName}} Online Interview Schedule',
    'All',
    false,
    'Hello {client.firstName},

We would like to schedule an online interview with you to discuss your project requirements.

Please select a convenient time from the available slots:
{interview_slots}

Looking forward to speaking with you.

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
    '{{client.firstName}}, Schedule a Clean',
    '{{client.firstName}}, Schedule a Clean',
    'All',
    false,
    'Hello {client.firstName},

We would like to schedule a cleaning appointment for your property.

Please let us know your preferred date and time, and we will arrange everything for you.

{scheduling_link}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '0 235',
    'New aqgadg',
    'Partner',
    false,
    'New partner communication regarding project updates.

{project_details}

Please review and provide feedback.

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    '00 A follow up',
    '1st Follow Up Email',
    'All',
    false,
    'Dear {client.firstName},

This is a follow-up regarding our previous communication.

{follow_up_details}

Please let us know if you have any questions or need additional information.

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'angel sun template',
    'sun template angel',
    'All',
    false,
    'Custom template for specific use case.

{template_content}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'BE TEST 1',
    'BE TEST 1',
    'All',
    false,
    'Backend testing template.

{test_content}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Birds testing Template',
    'Birds testing Template 33',
    'All',
    false,
    'Testing template for specific scenarios.

{test_details}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Change Order Proposal',
    'Change Order Proposal',
    'All',
    false,
    'Dear {client.firstName},

Please find attached the change order proposal for your review.

{proposal_details}

Please review and approve at your earliest convenience.

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Change Order Sign Test',
    'change order sign',
    'All',
    false,
    'Dear {client.firstName},

The change order is ready for your signature.

{signature_instructions}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Check google review Tolkien',
    'Check google review Tolkien',
    'All',
    false,
    'Dear {client.firstName},

We would appreciate if you could leave us a review on Google.

{review_link}

Thank you for your feedback!

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Collin Email Template',
    'Collin Email Template',
    'All',
    false,
    'Custom template for specific communication.

{content}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Crazy Template',
    'Crazy Template',
    'All',
    false,
    'Custom template content.

{details}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'CT Sign Template',
    'CT Sign Template',
    'All',
    false,
    'Contract signing template.

{contract_details}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'CT Sign Tokens',
    'CT Sign Tokens',
    'All',
    false,
    'Contract signing with token functionality.

{signing_link}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'DaName',
    'DaSubject',
    'All',
    false,
    'Template content.

{content}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Discovery Call',
    '{{client.firstName}}, Invitation to schedule a Discovery Call with ClientTether',
    'All',
    false,
    'Hello {client.firstName},

We would like to invite you to schedule a discovery call with our team.

During this call, we will discuss your needs and how we can help you achieve your goals.

{scheduling_link}

Looking forward to speaking with you!

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Email Temp Name Bug Report Outline',
    'email subject Bug Report Outline',
    'All',
    false,
    'Bug report template for technical issues.

{bug_details}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Exclude the client Template Test TECH-299',
    'Exclude Client Template',
    'All',
    false,
    'Template for internal communication only.

{internal_details}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Experience Utah TEST',
    'Experience Utah TEST',
    'All',
    false,
    'Testing template for Utah region.

{regional_content}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'FDD Delivery',
    'FDD Delivery',
    'All',
    false,
    'Dear {client.firstName},

Your FDD documents are ready for delivery.

{delivery_details}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'FDD in Block Editor',
    'FDD in Block Editor',
    'All',
    false,
    'FDD template with block editor support.

{fdd_content}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Google',
    'Google',
    'All',
    false,
    'Google integration template.

{integration_details}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Hey {{client.firstName}}, Welcome',
    'Hey {{client.firstName}}, Welcome',
    'All',
    false,
    'Hello {client.firstName},

Welcome! We are excited to have you on board.

{welcome_details}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'in home estimate',
    'in home estimate',
    'All',
    false,
    'Dear {client.firstName},

We would like to schedule an in-home estimate for your project.

{estimate_scheduling}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Juan Pablo',
    'Test desk',
    'All',
    false,
    'Testing template.

{test_content}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Kent''s Email NEW TESTING ANGEL',
    'Hello {{client.firstName}}! TESTING BY ANGEL',
    'All',
    false,
    'Hello {client.firstName}!

Testing new email functionality.

{test_details}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'long email',
    'long email',
    'All',
    false,
    'This is a longer email template with more detailed content.

{detailed_content}

Please review all sections carefully.

{additional_information}

Thank you for your time and attention.

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Lunch Break',
    'Lunch Break',
    'All',
    false,
    'Lunch break notification template.

{break_details}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'New Schedule Test',
    'New Schedule Test',
    'All',
    false,
    'Testing new scheduling functionality.

{schedule_details}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'NOthing to see here',
    'NOthing to see here',
    'All',
    false,
    'Placeholder template.

{content}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Phone Fill Email',
    'Phone Fill Email',
    'All',
    false,
    'Dear {client.firstName},

Please provide your phone number for our records.

{phone_form_link}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'progress payment request',
    'progress payment request',
    'All',
    false,
    'Dear {client.firstName},

We are requesting a progress payment for the work completed so far.

{payment_details}

Please process this payment at your earliest convenience.

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Proposal Deposit Req',
    'Proposal Deposit Req',
    'All',
    false,
    'Dear {client.firstName},

Your proposal has been approved. We now require a deposit to begin work.

{deposit_details}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'proposal diestribution',
    'new Proposals',
    'All',
    false,
    'New proposal distribution notification.

{proposal_list}

Best regards,
{user.name}',
    'email',
    true,
    0
  ),
  (
    'Proposal Invoice Combo',
    'Proposal Invoice Combo',
    'All',
    false,
    'Dear {client.firstName},

Please find attached your proposal and invoice.

{documents}

Best regards,
{user.name}',
    'email',
    true,
    0
  )
ON CONFLICT DO NOTHING;
