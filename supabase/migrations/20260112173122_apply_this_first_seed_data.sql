/*
  # Apply APPLY_THIS_FIRST.sql Seed Data
  
  Seeds the database with core template and connection plan data for the team project.
  
  This includes:
  - 10 email templates
  - 15 text templates
  - 15 task templates
  - 9 notes/logs templates
  - 12 appointment invite templates
  - 8 export list templates
  - 4 connection plans
  - 18 connection plan actions
*/

INSERT INTO templates (name, subject, contact_type, exclude_client, content, category, is_active, usage_count)
VALUES
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
{user.name}', 'email', true, 0),
  ('! please provide missing Data', '! Fill in form', 'All', false, 'Dear {client.firstName},

We noticed that some required information is still missing from your account. To ensure we can provide you with the best service, please complete the following:

{missing_information}

Please log into your account or reply to this email with the requested information.

Thank you,
{user.name}', 'email', true, 0),
  ('{{client.firstName}} signature process as promised', '{{client.firstName}} signature process as promised', 'All', false, 'Hi {client.firstName},

Attached you will find the documents that require your signature. We have prepared everything for your convenience:

- Document 1: {document_1}
- Document 2: {document_2}

Please review and sign at your earliest convenience. The signature process is simple and secure.

{signature_instructions}

Looking forward to hearing from you soon.

Sincerely,
{user.name}', 'email', true, 0),
  ('! please provide missing Data', '! Fill in form', 'All', false, 'Dear {client.firstName},

We need some additional information to complete your request. Please provide the missing data as soon as possible:

{required_information}

This information is crucial for us to proceed with your project efficiently.

Thank you for your prompt attention to this matter.

Best regards,
{user.name}', 'email', true, 0),
  ('{{client.firstName}} signature process as promised', '{{client.firstName}} signature process as promised', 'All', false, 'Dear {client.firstName},

Your documents are ready for signature. Please follow the secure link below to review and sign:

{document_link}

The process is quick and easy:
- Review the document
- Add your signature
- Submit

Please complete this within the next 48 hours.

Thank you,
{user.name}', 'email', true, 0),
  ('! please provide missing Data', '! Fill in form', 'All', false, 'Hello {client.firstName},

We are currently unable to proceed with your request due to missing information. Please fill in the following details:

{form_fields}

You can complete this form by clicking the link below:
{form_link}

We appreciate your cooperation.

Regards,
{user.name}', 'email', true, 0),
  ('{{client.firstName}} signature process as promised', '{{client.firstName}} signature process as promised', 'All', false, 'Hi {client.firstName},

As discussed, here are the documents requiring your signature:

{document_list}

Please review and sign these documents using our secure portal.

{portal_link}

Feel free to reach out if you have any questions.

Best wishes,
{user.name}', 'email', true, 0),
  ('! please provide missing Data', '! Fill in form', 'All', false, 'Dear {client.firstName},

To move forward with your application, we need you to provide some missing information:

{missing_data_list}

Please complete the form at your earliest convenience:
{completion_link}

Thank you for your assistance.

Sincerely,
{user.name}', 'email', true, 0),
  ('{{client.firstName}} signature process as promised', '{{client.firstName}} signature process as promised', 'All', false, 'Hello {client.firstName},

Your signature is required to finalize the documents we discussed. Please access the secure signing portal:

{signing_portal}

Steps to complete:
1. Open the document
2. Review the content
3. Sign electronically
4. Submit

Thank you for your prompt attention.

Best regards,
{user.name}', 'email', true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO connection_plans (id, name, contact_types, lead_sources, next_plan, count, is_active, show_only_here, build_pending_traditional, build_pending_domino, protect_from_overwriting, created_at, updated_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'New Lead Follow-Up Plan', 'Lead,Prospect', 'Website,Referral', NULL, 45, true, false, false, false, false, now() - interval '30 days', now() - interval '5 days'),
  ('22222222-2222-2222-2222-222222222222', 'Lost Opportunity Re-engagement', 'Lost Opportunity', 'All', NULL, 12, true, false, false, true, false, now() - interval '20 days', now() - interval '3 days'),
  ('33333333-3333-3333-3333-333333333333', 'Post-Meeting Follow-Up', 'Prospect,Warm Lead', NULL, 'New Lead Follow-Up Plan', 28, true, true, false, false, false, now() - interval '15 days', now() - interval '2 days'),
  ('44444444-4444-4444-4444-444444444444', 'Customer Onboarding', 'Customer,New Customer', NULL, NULL, 67, true, false, true, false, true, now() - interval '60 days', now() - interval '1 day')
ON CONFLICT DO NOTHING;

INSERT INTO connection_plan_actions (connection_plan_id, step_number, action_name, action_type, delivery_timing, delivery_type, add_notifications, display_order, action_config)
VALUES
  ('11111111-1111-1111-1111-111111111111', 1, 'Send Welcome Email', 'email', 'Immediate', 'Email', true, 1, '{"template": "welcome_new_lead", "priority": "high"}'::jsonb),
  ('11111111-1111-1111-1111-111111111111', 2, 'Schedule Introduction Call', 'call', 'Day 2', 'Task', true, 2, '{"duration": "30min", "type": "phone"}'::jsonb),
  ('11111111-1111-1111-1111-111111111111', 3, 'Follow-Up Email After Call', 'email', 'Day 3', 'Email', false, 3, '{"template": "post_call_followup"}'::jsonb),
  ('11111111-1111-1111-1111-111111111111', 4, 'Send Demo Scheduling Link', 'email', 'Day 7', 'Email', true, 4, '{"template": "demo_invitation", "include_calendar": true}'::jsonb),
  ('11111111-1111-1111-1111-111111111111', 5, 'Check-In and Next Steps', 'email', 'Day 14', 'Email', false, 5, '{"template": "two_week_checkin"}'::jsonb),
  ('22222222-2222-2222-2222-222222222222', 1, 'Friendly Check-In Email', 'email', 'Immediate', 'Email', false, 1, '{"template": "lost_opp_checkin", "tone": "casual"}'::jsonb),
  ('22222222-2222-2222-2222-222222222222', 2, 'Share Value Proposition', 'email', 'Day 7', 'Email', true, 2, '{"template": "value_prop_reengagement", "include_case_study": true}'::jsonb),
  ('22222222-2222-2222-2222-222222222222', 3, 'Offer Special Discount', 'email', 'Day 14', 'Email', true, 3, '{"template": "special_offer", "discount": "20%"}'::jsonb),
  ('22222222-2222-2222-2222-222222222222', 4, 'Final Reach Out', 'email', 'Day 30', 'Email', false, 4, '{"template": "final_touchpoint"}'::jsonb),
  ('33333333-3333-3333-3333-333333333333', 1, 'Thank You Email', 'email', 'Same Day', 'Email', false, 1, '{"template": "meeting_thank_you", "include_summary": true}'::jsonb),
  ('33333333-3333-3333-3333-333333333333', 2, 'Deliver Proposal', 'email', 'Day 2', 'Email', true, 2, '{"template": "proposal_delivery", "attach_pdf": true}'::jsonb),
  ('33333333-3333-3333-3333-333333333333', 3, 'Follow-Up Call', 'call', 'Day 7', 'Task', true, 3, '{"duration": "15min", "purpose": "proposal_review"}'::jsonb),
  ('44444444-4444-4444-4444-444444444444', 1, 'Welcome to Our Platform', 'email', 'Immediate', 'Email', true, 1, '{"template": "customer_welcome", "include_getting_started": true}'::jsonb),
  ('44444444-4444-4444-4444-444444444444', 2, 'Schedule Training Session', 'meeting', 'Day 1', 'Task', true, 2, '{"duration": "60min", "type": "video", "training_level": "basic"}'::jsonb),
  ('44444444-4444-4444-4444-444444444444', 3, 'Send Documentation Links', 'email', 'Day 3', 'Email', false, 3, '{"template": "documentation_package", "include_videos": true}'::jsonb),
  ('44444444-4444-4444-4444-444444444444', 4, 'One-Week Check-In', 'call', 'Day 7', 'Task', true, 4, '{"duration": "30min", "purpose": "progress_check"}'::jsonb),
  ('44444444-4444-4444-4444-444444444444', 5, 'Request Feedback Survey', 'email', 'Day 14', 'Email', false, 5, '{"template": "feedback_survey", "survey_link": true}'::jsonb),
  ('44444444-4444-4444-4444-444444444444', 6, 'Onboarding Completion Certificate', 'email', 'Day 30', 'Email', true, 6, '{"template": "onboarding_complete", "attach_certificate": true}'::jsonb)
ON CONFLICT DO NOTHING;