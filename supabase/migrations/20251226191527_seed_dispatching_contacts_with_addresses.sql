/*
  # Seed Dispatching Contacts with Addresses

  1. New Data
    - Creates 20 contacts with full address information
    - 12 in Salt Lake City, UT area
    - 8 in Denver, CO area
    - Each has latitude/longitude for map positioning

  2. Purpose
    - Provides customer locations for the Jobs dispatching map view
    - Enables route visualization between appointments
*/

INSERT INTO contacts (id, name, email, cell_phone, state, address, city, postal_code, latitude, longitude, sales_cycle, lead_source, created_at, updated_at)
VALUES
  -- Salt Lake City Area Contacts
  ('c1111111-1111-1111-1111-111111111111', 'Robert Martinez', 'robert.m@email.com', '(801) 555-1001', 'UT', '123 Main Street', 'Salt Lake City', '84101', 40.7608, -111.8910, 'Quoted', 'Google', now(), now()),
  ('c2222222-2222-2222-2222-222222222222', 'Jennifer Adams', 'jennifer.a@email.com', '(801) 555-1002', 'UT', '456 State Street', 'Salt Lake City', '84111', 40.7580, -111.8760, 'Appointment Set', 'Referral', now(), now()),
  ('c3333333-3333-3333-3333-333333333333', 'William Chen', 'william.c@email.com', '(801) 555-1003', 'UT', '789 Highland Drive', 'Salt Lake City', '84106', 40.7220, -111.8530, 'New Lead', 'Thumbtack', now(), now()),
  ('c4444444-4444-4444-4444-444444444444', 'Lisa Thompson', 'lisa.t@email.com', '(801) 555-1004', 'UT', '234 Sugarhouse Ave', 'Salt Lake City', '84105', 40.7260, -111.8590, 'Quoted', 'Website', now(), now()),
  ('c5555555-5555-5555-5555-555555555555', 'Michael Brown', 'michael.b@email.com', '(801) 555-1005', 'UT', '567 Murray Blvd', 'Murray', '84107', 40.6668, -111.8880, 'Appointment Set', 'Google', now(), now()),
  ('c6666666-6666-6666-6666-666666666666', 'Sarah Wilson', 'sarah.w@email.com', '(801) 555-1006', 'UT', '890 Sandy Parkway', 'Sandy', '84070', 40.5912, -111.8510, 'Closed Won', 'Referral', now(), now()),
  ('c7777777-7777-7777-7777-777777777777', 'David Lee', 'david.l@email.com', '(801) 555-1007', 'UT', '321 Draper Lane', 'Draper', '84020', 40.5246, -111.8638, 'New Lead', 'Angi', now(), now()),
  ('c8888888-8888-8888-8888-888888888888', 'Emily Garcia', 'emily.g@email.com', '(801) 555-1008', 'UT', '654 Cottonwood Heights', 'Cottonwood Heights', '84121', 40.6197, -111.8102, 'Quoted', 'Website', now(), now()),
  ('c9999999-9999-9999-9999-999999999999', 'James Anderson', 'james.a@email.com', '(801) 555-1009', 'UT', '987 Holladay Blvd', 'Holladay', '84117', 40.6676, -111.8241, 'Appointment Set', 'Google', now(), now()),
  ('caaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Amanda Clark', 'amanda.c@email.com', '(801) 555-1010', 'UT', '147 Millcreek Way', 'Millcreek', '84109', 40.6850, -111.8250, 'Closed Won', 'Thumbtack', now(), now()),
  ('cbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Chris Taylor', 'chris.t@email.com', '(801) 555-1011', 'UT', '258 West Valley Road', 'West Valley City', '84119', 40.6916, -111.9740, 'Quoted', 'Referral', now(), now()),
  ('ccccccc1-cccc-cccc-cccc-cccccccccccc', 'Nicole Wright', 'nicole.w@email.com', '(801) 555-1012', 'UT', '369 Taylorsville Lane', 'Taylorsville', '84123', 40.6676, -111.9388, 'New Lead', 'Website', now(), now()),
  
  -- Denver Area Contacts
  ('d1111111-1111-1111-1111-111111111111', 'Kevin Moore', 'kevin.m@email.com', '(303) 555-2001', 'CO', '100 Larimer Street', 'Denver', '80202', 39.7508, -104.9997, 'Quoted', 'Google', now(), now()),
  ('d2222222-2222-2222-2222-222222222222', 'Patricia Davis', 'patricia.d@email.com', '(303) 555-2002', 'CO', '200 Cherry Creek Dr', 'Denver', '80206', 39.7178, -104.9539, 'Appointment Set', 'Referral', now(), now()),
  ('d3333333-3333-3333-3333-333333333333', 'Thomas Harris', 'thomas.h@email.com', '(303) 555-2003', 'CO', '300 Highland Ave', 'Denver', '80211', 39.7621, -105.0132, 'New Lead', 'Angi', now(), now()),
  ('d4444444-4444-4444-4444-444444444444', 'Jessica Martinez', 'jessica.m@email.com', '(303) 555-2004', 'CO', '400 Capitol Hill Blvd', 'Denver', '80203', 39.7312, -104.9826, 'Quoted', 'Website', now(), now()),
  ('d5555555-5555-5555-5555-555555555555', 'Daniel Johnson', 'daniel.j@email.com', '(303) 555-2005', 'CO', '500 Aurora Parkway', 'Aurora', '80012', 39.7294, -104.8319, 'Appointment Set', 'Thumbtack', now(), now()),
  ('d6666666-6666-6666-6666-666666666666', 'Michelle Lewis', 'michelle.l@email.com', '(303) 555-2006', 'CO', '600 Lakewood Center', 'Lakewood', '80226', 39.7047, -105.0814, 'Closed Won', 'Google', now(), now()),
  ('d7777777-7777-7777-7777-777777777777', 'Ryan Walker', 'ryan.w@email.com', '(303) 555-2007', 'CO', '700 Englewood Drive', 'Englewood', '80110', 39.6478, -104.9878, 'Quoted', 'Referral', now(), now()),
  ('d8888888-8888-8888-8888-888888888888', 'Stephanie Hall', 'stephanie.h@email.com', '(303) 555-2008', 'CO', '800 Littleton Blvd', 'Littleton', '80120', 39.6133, -105.0166, 'New Lead', 'Website', now(), now())
ON CONFLICT (id) DO NOTHING;