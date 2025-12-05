/*
  # Seed Dispatching View Test Data
  
  This migration creates multiple appointments for September 15, 2025 to test the dispatching view appointment editing functionality.
  
  1. Data Created
    - Multiple calendar events for each active estimator on Sept 15, 2025
    - Events spread throughout the day (7 AM to 8 PM)
    - Various appointment types (quote, installation, inspection, follow_up)
    - Different statuses (pending, active, completed, overdue)
    - Realistic contact names and amounts
  
  2. Purpose
    - Enable testing of appointment editing modal
    - Show multiple appointments per estimator in timeline view
    - Test drag-and-drop functionality
    - Demonstrate different appointment types and statuses
*/

-- Insert test appointments for September 15, 2025
INSERT INTO calendar_events (
  title,
  description,
  event_type,
  status,
  start_date,
  end_date,
  is_all_day,
  location,
  estimator_id,
  contact_name,
  contact_email,
  contact_phone,
  amount,
  quote_number,
  notes
) VALUES
-- Test_Account Owner appointments
(
  'Kitchen Remodel Quote',
  'Initial consultation for kitchen renovation',
  'quote',
  'active',
  '2025-09-15 08:00:00',
  '2025-09-15 10:00:00',
  false,
  '123 Main St, Springfield',
  (SELECT id FROM estimators WHERE name = 'Test_Account Owner' LIMIT 1),
  'Lisa Anderson',
  'lisa.anderson@email.com',
  '555-0101',
  2960.80,
  'Quote #150',
  'Customer interested in full kitchen renovation'
),
(
  'Bathroom Installation',
  'Install new bathroom fixtures',
  'installation',
  'active',
  '2025-09-15 11:30:00',
  '2025-09-15 14:00:00',
  false,
  '456 Oak Ave, Springfield',
  (SELECT id FROM estimators WHERE name = 'Test_Account Owner' LIMIT 1),
  'Mark Thompson',
  'mark.thompson@email.com',
  '555-0102',
  1196.61,
  'Quote #151',
  'Second phase of bathroom remodel'
),
(
  'Roof Inspection',
  'Annual roof inspection',
  'inspection',
  'pending',
  '2025-09-15 15:00:00',
  '2025-09-15 16:00:00',
  false,
  '789 Elm St, Springfield',
  (SELECT id FROM estimators WHERE name = 'Test_Account Owner' LIMIT 1),
  'Nancy Clark',
  'nancy.clark@email.com',
  '555-0103',
  0,
  'Quote #152',
  'Customer requested inspection before quote'
),
(
  'Follow Up - Deck Project',
  'Check in on deck project progress',
  'follow_up',
  'completed',
  '2025-09-15 17:00:00',
  '2025-09-15 18:00:00',
  false,
  '321 Pine Rd, Springfield',
  (SELECT id FROM estimators WHERE name = 'Test_Account Owner' LIMIT 1),
  'Patricia Green',
  'patricia.green@email.com',
  '555-0104',
  4322.26,
  'Quote #142',
  'Final walkthrough and payment collection'
),

-- Sara Joe appointments
(
  'Window Replacement Quote',
  'Quote for replacing all windows',
  'quote',
  'pending',
  '2025-09-15 09:00:00',
  '2025-09-15 10:30:00',
  false,
  '555 Maple Dr, Springfield',
  (SELECT id FROM estimators WHERE name = 'Sara Joe' LIMIT 1),
  'Rachel Green',
  'rachel.green@email.com',
  '555-0201',
  3840.15,
  'Quote #153',
  'Energy efficient windows requested'
),
(
  'Fence Installation',
  'Install privacy fence in backyard',
  'installation',
  'active',
  '2025-09-15 12:00:00',
  '2025-09-15 15:00:00',
  false,
  '888 Birch Ln, Springfield',
  (SELECT id FROM estimators WHERE name = 'Sara Joe' LIMIT 1),
  'Steven Parker',
  'steven.parker@email.com',
  '555-0202',
  2192.42,
  'Quote #154',
  'Cedar fence with gate'
),
(
  'Gutter Cleaning',
  'Clean and inspect gutters',
  'inspection',
  'active',
  '2025-09-15 16:00:00',
  '2025-09-15 17:00:00',
  false,
  '999 Cedar St, Springfield',
  (SELECT id FROM estimators WHERE name = 'Sara Joe' LIMIT 1),
  'Teresa Hughes',
  'teresa.hughes@email.com',
  '555-0203',
  450.00,
  'Quote #155',
  'Annual maintenance'
),

-- Jeanette Standards appointments
(
  'Flooring Installation Quote',
  'Quote for hardwood floor installation',
  'quote',
  'pending',
  '2025-09-15 08:30:00',
  '2025-09-15 10:00:00',
  false,
  '147 Walnut Ave, Springfield',
  (SELECT id FROM estimators WHERE name = 'Jeanette Standards' LIMIT 1),
  'Wendy Foster',
  'wendy.foster@email.com',
  '555-0301',
  7434.32,
  'Quote #156',
  'Entire first floor hardwood'
),
(
  'Painting Project',
  'Interior painting - living room and bedrooms',
  'installation',
  'active',
  '2025-09-15 11:00:00',
  '2025-09-15 14:00:00',
  false,
  '258 Spruce Ct, Springfield',
  (SELECT id FROM estimators WHERE name = 'Jeanette Standards' LIMIT 1),
  'Xavier Brooks',
  'xavier.brooks@email.com',
  '555-0302',
  1120.00,
  'Quote #157',
  'Two coats, customer providing paint'
),
(
  'HVAC Inspection',
  'Annual HVAC system inspection',
  'inspection',
  'overdue',
  '2025-09-15 14:30:00',
  '2025-09-15 15:30:00',
  false,
  '369 Ash Blvd, Springfield',
  (SELECT id FROM estimators WHERE name = 'Jeanette Standards' LIMIT 1),
  'Yvonne Bell',
  'yvonne.bell@email.com',
  '555-0303',
  0,
  'Quote #158',
  'Customer rescheduled twice'
),
(
  'Landscaping Follow Up',
  'Review completed landscaping work',
  'follow_up',
  'pending',
  '2025-09-15 17:30:00',
  '2025-09-15 18:30:00',
  false,
  '741 Cherry Way, Springfield',
  (SELECT id FROM estimators WHERE name = 'Jeanette Standards' LIMIT 1),
  'Zachary Hill',
  'zachary.hill@email.com',
  '555-0304',
  5250.00,
  'Quote #159',
  'Final payment pending'
),

-- Standard Kent appointments
(
  'Siding Replacement Quote',
  'Quote for vinyl siding replacement',
  'quote',
  'active',
  '2025-09-15 10:00:00',
  '2025-09-15 11:30:00',
  false,
  '852 Dogwood Dr, Springfield',
  (SELECT id FROM estimators WHERE name = 'Standard Kent' LIMIT 1),
  'Alice Cooper',
  'alice.cooper@email.com',
  '555-0401',
  8500.00,
  'Quote #160',
  'Full house siding replacement'
),
(
  'Deck Installation',
  'Build new composite deck',
  'installation',
  'active',
  '2025-09-15 13:00:00',
  '2025-09-15 16:00:00',
  false,
  '963 Willow Rd, Springfield',
  (SELECT id FROM estimators WHERE name = 'Standard Kent' LIMIT 1),
  'Bob Martinez',
  'bob.martinez@email.com',
  '555-0402',
  6780.50,
  'Quote #161',
  '20x16 deck with stairs'
),

-- Sara Admin appointments
(
  'Plumbing Repair',
  'Emergency plumbing repair',
  'installation',
  'overdue',
  '2025-09-15 07:00:00',
  '2025-09-15 09:00:00',
  false,
  '159 Redwood Ln, Springfield',
  (SELECT id FROM estimators WHERE name = 'Sara Admin' LIMIT 1),
  'Carol Davis',
  'carol.davis@email.com',
  '555-0501',
  890.00,
  'Quote #162',
  'Water leak in basement'
),
(
  'Electrical Quote',
  'Quote for panel upgrade',
  'quote',
  'pending',
  '2025-09-15 10:30:00',
  '2025-09-15 12:00:00',
  false,
  '267 Poplar St, Springfield',
  (SELECT id FROM estimators WHERE name = 'Sara Admin' LIMIT 1),
  'David Wilson',
  'david.wilson@email.com',
  '555-0502',
  3200.00,
  'Quote #163',
  '200 amp service upgrade'
),
(
  'Drywall Repair',
  'Repair water damage to drywall',
  'installation',
  'active',
  '2025-09-15 14:00:00',
  '2025-09-15 16:00:00',
  false,
  '378 Hickory Ave, Springfield',
  (SELECT id FROM estimators WHERE name = 'Sara Admin' LIMIT 1),
  'Emma Johnson',
  'emma.johnson@email.com',
  '555-0503',
  1450.00,
  'Quote #164',
  'Two rooms affected'
);