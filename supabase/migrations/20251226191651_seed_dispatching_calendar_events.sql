/*
  # Seed Dispatching Calendar Events

  1. New Data
    - Creates calendar events for Sept 14, 15, 16, 2025
    - Links events to estimators (subcontractors) and contacts
    - Each estimator has 4-5 jobs per day
    - Varied event types: quote, installation, inspection, follow_up

  2. Purpose
    - Provides data for the Jobs dispatching timeline view
    - Each event has coordinates for map visualization
    - Events are scheduled throughout the workday (8am-5pm)
*/

-- Sept 15, 2025 (Monday) - Main day - Kent Hall (SLC)
INSERT INTO calendar_events (id, title, description, event_type, status, start_date, end_date, is_all_day, location, contact_name, contact_email, contact_phone, estimator_id, contact_id, latitude, longitude, created_at, updated_at)
VALUES
  ('e1110001-0001-0001-0001-000000000001', 'Bathroom Tile Quote', 'Initial consultation for master bathroom remodel', 'quote', 'pending', '2025-09-15 08:00:00', '2025-09-15 09:30:00', false, '123 Main Street, Salt Lake City, UT 84101', 'Robert Martinez', 'robert.m@email.com', '(801) 555-1001', 'a1b2c3d4-e5f6-4789-abcd-111111111111', 'c1111111-1111-1111-1111-111111111111', 40.7608, -111.8910, now(), now()),
  ('e1110001-0001-0001-0001-000000000002', 'Kitchen Backsplash Install', 'Install subway tile backsplash', 'installation', 'pending', '2025-09-15 10:00:00', '2025-09-15 12:00:00', false, '456 State Street, Salt Lake City, UT 84111', 'Jennifer Adams', 'jennifer.a@email.com', '(801) 555-1002', 'a1b2c3d4-e5f6-4789-abcd-111111111111', 'c2222222-2222-2222-2222-222222222222', 40.7580, -111.8760, now(), now()),
  ('e1110001-0001-0001-0001-000000000003', 'Floor Tile Inspection', 'Final inspection of new floor installation', 'inspection', 'pending', '2025-09-15 13:00:00', '2025-09-15 14:00:00', false, '789 Highland Drive, Salt Lake City, UT 84106', 'William Chen', 'william.c@email.com', '(801) 555-1003', 'a1b2c3d4-e5f6-4789-abcd-111111111111', 'c3333333-3333-3333-3333-333333333333', 40.7220, -111.8530, now(), now()),
  ('e1110001-0001-0001-0001-000000000004', 'Shower Tile Quote', 'Quote for walk-in shower tile work', 'quote', 'pending', '2025-09-15 14:30:00', '2025-09-15 15:30:00', false, '234 Sugarhouse Ave, Salt Lake City, UT 84105', 'Lisa Thompson', 'lisa.t@email.com', '(801) 555-1004', 'a1b2c3d4-e5f6-4789-abcd-111111111111', 'c4444444-4444-4444-4444-444444444444', 40.7260, -111.8590, now(), now()),
  ('e1110001-0001-0001-0001-000000000005', 'Follow-up Consultation', 'Discuss design options with client', 'follow_up', 'pending', '2025-09-15 16:00:00', '2025-09-15 17:00:00', false, '567 Murray Blvd, Murray, UT 84107', 'Michael Brown', 'michael.b@email.com', '(801) 555-1005', 'a1b2c3d4-e5f6-4789-abcd-111111111111', 'c5555555-5555-5555-5555-555555555555', 40.6668, -111.8880, now(), now()),

  -- Sept 15, 2025 - Jordan Schupbach (SLC)
  ('e2220001-0001-0001-0001-000000000001', 'Master Bath Remodel', 'Full bathroom renovation start', 'installation', 'pending', '2025-09-15 07:30:00', '2025-09-15 10:00:00', false, '890 Sandy Parkway, Sandy, UT 84070', 'Sarah Wilson', 'sarah.w@email.com', '(801) 555-1006', 'a1b2c3d4-e5f6-4789-abcd-222222222222', 'c6666666-6666-6666-6666-666666666666', 40.5912, -111.8510, now(), now()),
  ('e2220001-0001-0001-0001-000000000002', 'Guest Bath Quote', 'Quote for guest bathroom update', 'quote', 'pending', '2025-09-15 10:30:00', '2025-09-15 11:30:00', false, '321 Draper Lane, Draper, UT 84020', 'David Lee', 'david.l@email.com', '(801) 555-1007', 'a1b2c3d4-e5f6-4789-abcd-222222222222', 'c7777777-7777-7777-7777-777777777777', 40.5246, -111.8638, now(), now()),
  ('e2220001-0001-0001-0001-000000000003', 'Vanity Installation', 'Install new vanity and fixtures', 'installation', 'pending', '2025-09-15 12:30:00', '2025-09-15 14:30:00', false, '654 Cottonwood Heights, Cottonwood Heights, UT 84121', 'Emily Garcia', 'emily.g@email.com', '(801) 555-1008', 'a1b2c3d4-e5f6-4789-abcd-222222222222', 'c8888888-8888-8888-8888-888888888888', 40.6197, -111.8102, now(), now()),
  ('e2220001-0001-0001-0001-000000000004', 'Final Walkthrough', 'Final project walkthrough and punch list', 'inspection', 'pending', '2025-09-15 15:00:00', '2025-09-15 16:00:00', false, '987 Holladay Blvd, Holladay, UT 84117', 'James Anderson', 'james.a@email.com', '(801) 555-1009', 'a1b2c3d4-e5f6-4789-abcd-222222222222', 'c9999999-9999-9999-9999-999999999999', 40.6676, -111.8241, now(), now()),

  -- Sept 15, 2025 - Mike Thompson (SLC)
  ('e3330001-0001-0001-0001-000000000001', 'Kitchen Remodel Consult', 'Initial kitchen remodel consultation', 'quote', 'pending', '2025-09-15 08:30:00', '2025-09-15 10:00:00', false, '147 Millcreek Way, Millcreek, UT 84109', 'Amanda Clark', 'amanda.c@email.com', '(801) 555-1010', 'a1b2c3d4-e5f6-4789-abcd-333333333333', 'caaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 40.6850, -111.8250, now(), now()),
  ('e3330001-0001-0001-0001-000000000002', 'Cabinet Installation', 'Install kitchen cabinets phase 1', 'installation', 'pending', '2025-09-15 10:30:00', '2025-09-15 13:30:00', false, '258 West Valley Road, West Valley City, UT 84119', 'Chris Taylor', 'chris.t@email.com', '(801) 555-1011', 'a1b2c3d4-e5f6-4789-abcd-333333333333', 'cbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 40.6916, -111.9740, now(), now()),
  ('e3330001-0001-0001-0001-000000000003', 'Countertop Measure', 'Measure for new countertops', 'quote', 'pending', '2025-09-15 14:00:00', '2025-09-15 15:00:00', false, '369 Taylorsville Lane, Taylorsville, UT 84123', 'Nicole Wright', 'nicole.w@email.com', '(801) 555-1012', 'a1b2c3d4-e5f6-4789-abcd-333333333333', 'ccccccc1-cccc-cccc-cccc-cccccccccccc', 40.6676, -111.9388, now(), now()),
  ('e3330001-0001-0001-0001-000000000004', 'Follow-up Visit', 'Review kitchen design options', 'follow_up', 'pending', '2025-09-15 15:30:00', '2025-09-15 16:30:00', false, '123 Main Street, Salt Lake City, UT 84101', 'Robert Martinez', 'robert.m@email.com', '(801) 555-1001', 'a1b2c3d4-e5f6-4789-abcd-333333333333', 'c1111111-1111-1111-1111-111111111111', 40.7608, -111.8910, now(), now()),

  -- Sept 15, 2025 - Sarah Chen (Denver)
  ('e4440001-0001-0001-0001-000000000001', 'Hardwood Floor Quote', 'Quote for living room hardwood', 'quote', 'pending', '2025-09-15 08:00:00', '2025-09-15 09:30:00', false, '100 Larimer Street, Denver, CO 80202', 'Kevin Moore', 'kevin.m@email.com', '(303) 555-2001', 'a1b2c3d4-e5f6-4789-abcd-444444444444', 'd1111111-1111-1111-1111-111111111111', 39.7508, -104.9997, now(), now()),
  ('e4440001-0001-0001-0001-000000000002', 'LVP Installation', 'Install luxury vinyl plank flooring', 'installation', 'pending', '2025-09-15 10:00:00', '2025-09-15 12:30:00', false, '200 Cherry Creek Dr, Denver, CO 80206', 'Patricia Davis', 'patricia.d@email.com', '(303) 555-2002', 'a1b2c3d4-e5f6-4789-abcd-444444444444', 'd2222222-2222-2222-2222-222222222222', 39.7178, -104.9539, now(), now()),
  ('e4440001-0001-0001-0001-000000000003', 'Carpet Removal', 'Remove old carpet and prep subfloor', 'installation', 'pending', '2025-09-15 13:30:00', '2025-09-15 15:00:00', false, '300 Highland Ave, Denver, CO 80211', 'Thomas Harris', 'thomas.h@email.com', '(303) 555-2003', 'a1b2c3d4-e5f6-4789-abcd-444444444444', 'd3333333-3333-3333-3333-333333333333', 39.7621, -105.0132, now(), now()),
  ('e4440001-0001-0001-0001-000000000004', 'Floor Inspection', 'Quality check on completed floor', 'inspection', 'pending', '2025-09-15 15:30:00', '2025-09-15 16:30:00', false, '400 Capitol Hill Blvd, Denver, CO 80203', 'Jessica Martinez', 'jessica.m@email.com', '(303) 555-2004', 'a1b2c3d4-e5f6-4789-abcd-444444444444', 'd4444444-4444-4444-4444-444444444444', 39.7312, -104.9826, now(), now()),

  -- Sept 15, 2025 - Carlos Rivera (Denver)
  ('e5550001-0001-0001-0001-000000000001', 'General Contracting Quote', 'Whole home renovation estimate', 'quote', 'pending', '2025-09-15 07:30:00', '2025-09-15 09:30:00', false, '500 Aurora Parkway, Aurora, CO 80012', 'Daniel Johnson', 'daniel.j@email.com', '(303) 555-2005', 'a1b2c3d4-e5f6-4789-abcd-555555555555', 'd5555555-5555-5555-5555-555555555555', 39.7294, -104.8319, now(), now()),
  ('e5550001-0001-0001-0001-000000000002', 'Basement Finish', 'Continue basement finishing project', 'installation', 'pending', '2025-09-15 10:00:00', '2025-09-15 13:00:00', false, '600 Lakewood Center, Lakewood, CO 80226', 'Michelle Lewis', 'michelle.l@email.com', '(303) 555-2006', 'a1b2c3d4-e5f6-4789-abcd-555555555555', 'd6666666-6666-6666-6666-666666666666', 39.7047, -105.0814, now(), now()),
  ('e5550001-0001-0001-0001-000000000003', 'Deck Quote', 'Quote for new deck construction', 'quote', 'pending', '2025-09-15 14:00:00', '2025-09-15 15:00:00', false, '700 Englewood Drive, Englewood, CO 80110', 'Ryan Walker', 'ryan.w@email.com', '(303) 555-2007', 'a1b2c3d4-e5f6-4789-abcd-555555555555', 'd7777777-7777-7777-7777-777777777777', 39.6478, -104.9878, now(), now()),
  ('e5550001-0001-0001-0001-000000000004', 'Project Walkthrough', 'Final walkthrough before payment', 'inspection', 'pending', '2025-09-15 15:30:00', '2025-09-15 16:30:00', false, '800 Littleton Blvd, Littleton, CO 80120', 'Stephanie Hall', 'stephanie.h@email.com', '(303) 555-2008', 'a1b2c3d4-e5f6-4789-abcd-555555555555', 'd8888888-8888-8888-8888-888888888888', 39.6133, -105.0166, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Sept 14, 2025 (Sunday - previous day) - Kent Hall
INSERT INTO calendar_events (id, title, description, event_type, status, start_date, end_date, is_all_day, location, contact_name, contact_email, contact_phone, estimator_id, contact_id, latitude, longitude, created_at, updated_at)
VALUES
  ('e1110014-0001-0001-0001-000000000001', 'Emergency Repair', 'Fix leaking shower pan', 'installation', 'completed', '2025-09-14 09:00:00', '2025-09-14 11:00:00', false, '234 Sugarhouse Ave, Salt Lake City, UT 84105', 'Lisa Thompson', 'lisa.t@email.com', '(801) 555-1004', 'a1b2c3d4-e5f6-4789-abcd-111111111111', 'c4444444-4444-4444-4444-444444444444', 40.7260, -111.8590, now(), now()),
  ('e1110014-0001-0001-0001-000000000002', 'Tile Consultation', 'Design consultation for tile selection', 'quote', 'completed', '2025-09-14 13:00:00', '2025-09-14 14:30:00', false, '567 Murray Blvd, Murray, UT 84107', 'Michael Brown', 'michael.b@email.com', '(801) 555-1005', 'a1b2c3d4-e5f6-4789-abcd-111111111111', 'c5555555-5555-5555-5555-555555555555', 40.6668, -111.8880, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Sept 16, 2025 (Tuesday - next day) - Kent Hall
INSERT INTO calendar_events (id, title, description, event_type, status, start_date, end_date, is_all_day, location, contact_name, contact_email, contact_phone, estimator_id, contact_id, latitude, longitude, created_at, updated_at)
VALUES
  ('e1110016-0001-0001-0001-000000000001', 'Bathroom Tile Install', 'Start bathroom tile installation', 'installation', 'pending', '2025-09-16 08:00:00', '2025-09-16 12:00:00', false, '123 Main Street, Salt Lake City, UT 84101', 'Robert Martinez', 'robert.m@email.com', '(801) 555-1001', 'a1b2c3d4-e5f6-4789-abcd-111111111111', 'c1111111-1111-1111-1111-111111111111', 40.7608, -111.8910, now(), now()),
  ('e1110016-0001-0001-0001-000000000002', 'Shower Pan Install', 'Install new shower pan', 'installation', 'pending', '2025-09-16 13:00:00', '2025-09-16 16:00:00', false, '456 State Street, Salt Lake City, UT 84111', 'Jennifer Adams', 'jennifer.a@email.com', '(801) 555-1002', 'a1b2c3d4-e5f6-4789-abcd-111111111111', 'c2222222-2222-2222-2222-222222222222', 40.7580, -111.8760, now(), now())
ON CONFLICT (id) DO NOTHING;