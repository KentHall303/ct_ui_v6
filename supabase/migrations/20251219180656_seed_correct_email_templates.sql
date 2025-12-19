/*
  # Seed Email Templates - Correct Data

  ## Overview
  This migration adds the CORRECT 10 email template records matching the original data.
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