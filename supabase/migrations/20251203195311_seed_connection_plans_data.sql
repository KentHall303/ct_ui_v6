/*
  # Seed Connection Plans Data

  ## Overview
  This migration populates the connection_plans and connection_plan_actions tables
  with sample data for demonstration purposes.

  ## Sample Data
    1. New Lead Follow-Up Plan
       - For new leads from website
       - 5 actions: welcome email, intro call, follow-up email, demo scheduling, closing email
    
    2. Lost Opportunity Re-engagement
       - For lost opportunities
       - 4 actions: check-in email, value proposition, special offer, final reach out
    
    3. Post-Meeting Follow-Up
       - For contacts after initial meeting
       - 3 actions: thank you email, proposal delivery, follow-up call
    
    4. Customer Onboarding
       - For new customers
       - 6 actions: welcome, training schedule, documentation, check-in, feedback, completion

  ## Notes
    - All plans are active by default
    - Actions are ordered by display_order
    - Each action has realistic timing and delivery configuration
*/

-- Insert sample connection plans
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

-- Insert actions for New Lead Follow-Up Plan
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

-- Insert actions for Lost Opportunity Re-engagement
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

-- Insert actions for Post-Meeting Follow-Up
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

-- Insert actions for Customer Onboarding
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
