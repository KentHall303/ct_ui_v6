/*
  # Seed Subcontractor Users and Link Calendar Events

  1. New Data
    - Creates users in the public.users table for each subcontractor
    - Uses user_type='subcontractor' to identify them
    - Preserves subcontractor names, emails, phones
    
  2. Updates
    - Links calendar_events.user_id to the corresponding user based on estimator_id mapping
    
  3. Purpose
    - Enables the dispatching feature to use the users table instead of subcontractors table
*/

INSERT INTO public.users (id, username, first_name, last_name, email, phone, user_type, is_active, address, city, state, zipcode, created_at, updated_at)
VALUES 
  ('b1111111-1111-1111-1111-111111111111', 'kent_hall_sub', 'Kent', 'Hall', 'kent.hall@company.com', '(801) 555-0101', 'subcontractor', true, '123 Tile Street', 'Salt Lake City', 'UT', '84101', now(), now()),
  ('b2222222-2222-2222-2222-222222222222', 'jordan_schupbach_sub', 'Jordan', 'Schupbach', 'jordan.s@company.com', '(801) 555-0102', 'subcontractor', true, '456 Bathroom Ave', 'Salt Lake City', 'UT', '84102', now(), now()),
  ('b3333333-3333-3333-3333-333333333333', 'mike_thompson_sub', 'Mike', 'Thompson', 'mike.t@company.com', '(801) 555-0103', 'subcontractor', true, '789 Kitchen Blvd', 'Salt Lake City', 'UT', '84103', now(), now()),
  ('b4444444-4444-4444-4444-444444444444', 'sarah_chen_sub', 'Sarah', 'Chen', 'sarah.c@company.com', '(303) 555-0104', 'subcontractor', true, '101 Flooring Way', 'Denver', 'CO', '80202', now(), now()),
  ('b5555555-5555-5555-5555-555555555555', 'carlos_rivera_sub', 'Carlos', 'Rivera', 'carlos.r@company.com', '(303) 555-0105', 'subcontractor', true, '202 Contractor Rd', 'Denver', 'CO', '80203', now(), now())
ON CONFLICT (id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  user_type = EXCLUDED.user_type,
  is_active = EXCLUDED.is_active,
  updated_at = now();

UPDATE public.calendar_events ce
SET user_id = CASE 
  WHEN ce.estimator_id = 'a1b2c3d4-e5f6-4789-abcd-111111111111' THEN 'b1111111-1111-1111-1111-111111111111'::uuid
  WHEN ce.estimator_id = 'a1b2c3d4-e5f6-4789-abcd-222222222222' THEN 'b2222222-2222-2222-2222-222222222222'::uuid
  WHEN ce.estimator_id = 'a1b2c3d4-e5f6-4789-abcd-333333333333' THEN 'b3333333-3333-3333-3333-333333333333'::uuid
  WHEN ce.estimator_id = 'a1b2c3d4-e5f6-4789-abcd-444444444444' THEN 'b4444444-4444-4444-4444-444444444444'::uuid
  WHEN ce.estimator_id = 'a1b2c3d4-e5f6-4789-abcd-555555555555' THEN 'b5555555-5555-5555-5555-555555555555'::uuid
  ELSE ce.user_id
END
WHERE ce.estimator_id IS NOT NULL;