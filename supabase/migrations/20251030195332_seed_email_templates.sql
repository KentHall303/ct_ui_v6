/*
  # Seed Email Templates

  ## Overview
  This migration adds sample email template data for testing and demonstration purposes.

  ## Sample Data
    - Creates several email templates with various contact types
    - Includes templates for missing data notifications and signature processes
    - Sets proper category, contact_type, and exclude_client values
*/

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
  )
ON CONFLICT DO NOTHING;