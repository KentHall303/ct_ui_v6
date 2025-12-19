/*
  # Seed Connection Plans Data

  ## Overview
  Seeds initial connection plans and their associated actions.

  ## Data
  - 3 Connection Plans with actions
    - New Lead Follow-up Sequence
    - Post-Estimate Nurture
    - Storm Damage Response
*/

-- Connection Plans
INSERT INTO connection_plans (id, name, description, contact_types, is_active)
SELECT * FROM (VALUES
  (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'New Lead Follow-up Sequence',
    'Automated follow-up sequence for new residential leads with initial contact, follow-up emails, and task creation',
    'Residential',
    true
  ),
  (
    '00000000-0000-0000-0000-000000000002'::uuid,
    'Post-Estimate Nurture',
    'Nurture sequence after estimate is provided to answer questions and move lead to close',
    'All',
    true
  ),
  (
    '00000000-0000-0000-0000-000000000003'::uuid,
    'Storm Damage Response',
    'Rapid response sequence for storm-damaged properties with inspection scheduling and insurance assistance',
    'Storm Damage',
    true
  )
) AS v(id, name, description, contact_types, is_active)
WHERE NOT EXISTS (
  SELECT 1 FROM connection_plans WHERE id = v.id
);

-- Connection Plan Actions
INSERT INTO connection_plan_actions (connection_plan_id, action_type, sequence_order, action_config)
SELECT * FROM (VALUES
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