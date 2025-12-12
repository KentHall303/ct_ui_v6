/*
  # Seed Meetings Data
  
  1. Sample Data
    - Creates 15 meetings linked to various jobs
    - Includes site visits, project reviews, and inspections
    - Associates relevant subcontractors with meetings
  
  2. Meeting Details
    - Different meeting types: site_visit, project_review, inspection
    - Various statuses: scheduled, completed, cancelled
    - Realistic date ranges spanning past and future
*/

-- Insert meetings
INSERT INTO meetings (id, job_id, title, description, meeting_type, start_date, end_date, location, status, notes, created_at, updated_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'e1f9a4b5-5678-4567-89ab-111111111111', 'Initial Kitchen Walk-Through', 'Review kitchen layout and take measurements', 'site_visit', now() - interval '55 days', now() - interval '55 days' + interval '2 hours', '123 Oak Street, Springfield, IL 62701', 'completed', 'Client requested custom cabinet modifications', now() - interval '60 days', now() - interval '55 days'),
  ('22222222-2222-2222-2222-222222222222', 'e1f9a4b5-5678-4567-89ab-111111111111', 'Plumbing Coordination Meeting', 'Discuss plumbing modifications with subcontractor', 'project_review', now() - interval '45 days', now() - interval '45 days' + interval '1 hour', '123 Oak Street, Springfield, IL 62701', 'completed', 'Need to relocate water lines for island', now() - interval '50 days', now() - interval '45 days'),
  ('33333333-3333-3333-3333-333333333333', 'e1f9a4b5-5678-4567-89ab-222222222222', 'Bathroom Addition Site Visit', 'Initial consultation for bathroom addition', 'site_visit', now() - interval '40 days', now() - interval '40 days' + interval '90 minutes', '456 Maple Avenue, Springfield, IL 62702', 'completed', 'Discussed tile selections and fixture options', now() - interval '45 days', now() - interval '40 days'),
  ('44444444-4444-4444-4444-444444444444', 'e1f9a4b5-5678-4567-89ab-333333333333', 'Roof Inspection', 'Assess current roof condition', 'inspection', now() - interval '28 days', now() - interval '28 days' + interval '1 hour', '789 Pine Road, Springfield, IL 62703', 'completed', 'Found extensive water damage in northwest corner', now() - interval '30 days', now() - interval '28 days'),
  ('55555555-5555-5555-5555-555555555555', 'e1f9a4b5-5678-4567-89ab-444444444444', 'Cafeteria Design Review', 'Review plans with school administration', 'project_review', now() - interval '85 days', now() - interval '85 days' + interval '3 hours', '1000 Education Drive, Springfield, IL 62704', 'completed', 'Approved final design with minor color changes', now() - interval '90 days', now() - interval '85 days'),
  ('66666666-6666-6666-6666-666666666666', 'e1f9a4b5-5678-4567-89ab-444444444444', 'Mid-Project Progress Review', 'Check cafeteria renovation progress', 'project_review', now() - interval '30 days', now() - interval '30 days' + interval '2 hours', '1000 Education Drive, Springfield, IL 62704', 'completed', 'Project on schedule, electrical work ahead of timeline', now() - interval '35 days', now() - interval '30 days'),
  ('77777777-7777-7777-7777-777777777777', 'e1f9a4b5-5678-4567-89ab-555555555555', 'Deck Design Consultation', 'Discuss deck materials and design options', 'site_visit', now() - interval '18 days', now() - interval '18 days' + interval '90 minutes', '234 Elm Street, Springfield, IL 62705', 'completed', 'Client chose composite decking with cable railings', now() - interval '20 days', now() - interval '18 days'),
  ('88888888-8888-8888-8888-888888888888', 'e1f9a4b5-5678-4567-89ab-666666666666', 'Final Walk-Through', 'Final inspection of completed office build-out', 'inspection', now() - interval '32 days', now() - interval '32 days' + interval '2 hours', '567 Business Park Drive, Springfield, IL 62706', 'completed', 'Minor punch list items identified and completed same day', now() - interval '35 days', now() - interval '32 days'),
  ('99999999-9999-9999-9999-999999999999', 'e1f9a4b5-5678-4567-89ab-777777777777', 'Basement Layout Planning', 'Plan basement finishing layout with homeowners', 'site_visit', now() - interval '12 days', now() - interval '12 days' + interval '2 hours', '890 Cedar Lane, Springfield, IL 62707', 'completed', 'Added egress window to bedroom plan', now() - interval '15 days', now() - interval '12 days'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'e1f9a4b5-5678-4567-89ab-111111111111', 'Kitchen Progress Check', 'Mid-project inspection', 'project_review', now() + interval '3 days', now() + interval '3 days' + interval '1 hour', '123 Oak Street, Springfield, IL 62701', 'scheduled', 'Review cabinet installation progress', now() - interval '5 days', now() - interval '5 days'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'e1f9a4b5-5678-4567-89ab-222222222222', 'Tile Selection Meeting', 'Choose bathroom tiles and fixtures', 'project_review', now() + interval '5 days', now() + interval '5 days' + interval '90 minutes', '456 Maple Avenue, Springfield, IL 62702', 'scheduled', 'Client to review tile samples', now() - interval '3 days', now() - interval '3 days'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'e1f9a4b5-5678-4567-89ab-333333333333', 'Roofing Start Date Meeting', 'Confirm project start and materials delivery', 'project_review', now() + interval '7 days', now() + interval '7 days' + interval '1 hour', '789 Pine Road, Springfield, IL 62703', 'scheduled', 'Weather permitting start date', now() - interval '2 days', now() - interval '2 days'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'e1f9a4b5-5678-4567-89ab-aaaaaaaaaaaa', 'Garage Design Review', 'Review architectural plans for new garage', 'site_visit', now() + interval '2 days', now() + interval '2 days' + interval '2 hours', '789 Willow Drive, Springfield, IL 62710', 'scheduled', 'Review loft storage design', now() - interval '8 days', now() - interval '8 days'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'e1f9a4b5-5678-4567-89ab-cccccccccccc', 'HVAC System Assessment', 'Evaluate existing HVAC and plan new installation', 'inspection', now() - interval '22 days', now() - interval '22 days' + interval '2 hours', '567 Business Park Drive, Springfield, IL 62706', 'completed', 'Old units at end of life, replacement recommended', now() - interval '25 days', now() - interval '22 days'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'e1f9a4b5-5678-4567-89ab-555555555555', 'Deck Construction Kickoff', 'Pre-construction meeting before deck build', 'project_review', now() + interval '10 days', now() + interval '10 days' + interval '1 hour', '234 Elm Street, Springfield, IL 62705', 'scheduled', 'Confirm materials delivery schedule', now() - interval '1 day', now() - interval '1 day')
ON CONFLICT (id) DO NOTHING;

-- Link subcontractors to meetings
INSERT INTO meeting_subcontractors (id, meeting_id, subcontractor_id, is_primary, notes, created_at) VALUES
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'a1b2c3d4-1111-4567-89ab-111111111111', true, 'Lead plumber for kitchen remodel', now() - interval '50 days'),
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', 'a1b2c3d4-1111-4567-89ab-777777777777', true, 'Flooring consultation for bathroom', now() - interval '45 days'),
  (gen_random_uuid(), '44444444-4444-4444-4444-444444444444', 'a1b2c3d4-1111-4567-89ab-444444444444', true, 'Roof inspection and estimate', now() - interval '30 days'),
  (gen_random_uuid(), '55555555-5555-5555-5555-555555555555', 'a1b2c3d4-1111-4567-89ab-222222222222', true, 'Electrical contractor for cafeteria', now() - interval '90 days'),
  (gen_random_uuid(), '55555555-5555-5555-5555-555555555555', 'a1b2c3d4-1111-4567-89ab-333333333333', false, 'HVAC contractor for cafeteria', now() - interval '90 days'),
  (gen_random_uuid(), 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'a1b2c3d4-1111-4567-89ab-333333333333', true, 'HVAC assessment and quote', now() - interval '25 days')
ON CONFLICT (id) DO NOTHING;