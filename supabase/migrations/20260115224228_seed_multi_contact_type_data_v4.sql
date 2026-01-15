/*
  # Seed Multi-Contact Type Data - Fixed version

  Creates:
  - 16 new sales cycle stages for Employee, Partner, Vendor, Other pipelines
  - 15 Employee contacts with opportunities
  - 12 Partner contacts with opportunities
  - 12 Vendor contacts with opportunities
  - 8 Other contacts with opportunities
*/

-- SALES CYCLES
INSERT INTO sales_cycles (id, name, order_position, is_active) VALUES
  ('e1111111-1111-1111-1111-111111111111', 'Candidate Review', 100, true),
  ('e2222222-2222-2222-2222-222222222222', 'Interview Scheduled', 101, true),
  ('e3333333-3333-3333-3333-333333333333', 'Offer Extended', 102, true),
  ('e4444444-4444-4444-4444-444444444444', 'Onboarding', 103, true),
  ('e5555555-5555-5555-5555-555555555555', 'Active Employee', 104, true),
  ('a1111111-1111-1111-1111-111111111111', 'Partner Inquiry', 200, true),
  ('a2222222-2222-2222-2222-222222222222', 'Negotiation', 201, true),
  ('a3333333-3333-3333-3333-333333333333', 'Agreement Review', 202, true),
  ('a4444444-4444-4444-4444-444444444444', 'Active Partner', 203, true),
  ('b1111111-1111-1111-1111-111111111111', 'Vendor Application', 300, true),
  ('b2222222-2222-2222-2222-222222222222', 'Qualification', 301, true),
  ('b3333333-3333-3333-3333-333333333333', 'Contract Review', 302, true),
  ('b4444444-4444-4444-4444-444444444444', 'Approved Vendor', 303, true),
  ('c1111111-1111-1111-1111-111111111111', 'Initial Contact', 400, true),
  ('c2222222-2222-2222-2222-222222222222', 'Follow Up', 401, true),
  ('c3333333-3333-3333-3333-333333333333', 'Resolved', 402, true)
ON CONFLICT (id) DO NOTHING;

-- EMPLOYEE (15)
INSERT INTO opportunities (id, contact_name, sales_cycle_id, estimated_value, priority, lead_source, contact_type, order_position) VALUES
('11000001-0001-0001-0001-000000000001', 'Michael Chen', 'e1111111-1111-1111-1111-111111111111', 75000, 'new_lead', 'Indeed', 'employee', 0),
('11000002-0002-0002-0002-000000000002', 'Sarah Williams', 'e2222222-2222-2222-2222-222222222222', 65000, 'today_action', 'LinkedIn', 'employee', 1),
('11000003-0003-0003-0003-000000000003', 'David Rodriguez', 'e3333333-3333-3333-3333-333333333333', 82000, 'pending_action', 'Referral', 'employee', 2),
('11000004-0004-0004-0004-000000000004', 'Emily Thompson', 'e4444444-4444-4444-4444-444444444444', 58000, 'no_pending', 'Job Fair', 'employee', 3),
('11000005-0005-0005-0005-000000000005', 'James Wilson', 'e5555555-5555-5555-5555-555555555555', 92000, 'no_pending', 'Recruiter', 'employee', 4),
('11000006-0006-0006-0006-000000000006', 'Amanda Garcia', 'e1111111-1111-1111-1111-111111111111', 68000, 'new_lead', 'Indeed', 'employee', 5),
('11000007-0007-0007-0007-000000000007', 'Robert Martinez', 'e2222222-2222-2222-2222-222222222222', 71000, 'missed_action', 'LinkedIn', 'employee', 6),
('11000008-0008-0008-0008-000000000008', 'Jennifer Lee', 'e3333333-3333-3333-3333-333333333333', 78000, 'today_action', 'Referral', 'employee', 7),
('11000009-0009-0009-0009-000000000009', 'Christopher Brown', 'e4444444-4444-4444-4444-444444444444', 63000, 'pending_action', 'Indeed', 'employee', 8),
('11000010-0010-0010-0010-000000000010', 'Lisa Anderson', 'e5555555-5555-5555-5555-555555555555', 85000, 'no_pending', 'Recruiter', 'employee', 9),
('11000011-0011-0011-0011-000000000011', 'Daniel Taylor', 'e1111111-1111-1111-1111-111111111111', 72000, 'new_lead', 'Job Board', 'employee', 10),
('11000012-0012-0012-0012-000000000012', 'Michelle Davis', 'e2222222-2222-2222-2222-222222222222', 67000, 'today_action', 'LinkedIn', 'employee', 11),
('11000013-0013-0013-0013-000000000013', 'Kevin White', 'e3333333-3333-3333-3333-333333333333', 88000, 'pending_action', 'Referral', 'employee', 12),
('11000014-0014-0014-0014-000000000014', 'Rachel Moore', 'e4444444-4444-4444-4444-444444444444', 59000, 'no_pending', 'Job Fair', 'employee', 13),
('11000015-0015-0015-0015-000000000015', 'Brian Jackson', 'e5555555-5555-5555-5555-555555555555', 95000, 'no_pending', 'Recruiter', 'employee', 14)
ON CONFLICT (id) DO NOTHING;

INSERT INTO contacts (id, name, email, cell_phone, state, sales_cycle, lead_source, created_date, contact_type, opportunity_id, status_color) VALUES
('21000001-0001-0001-0001-000000000001', 'Michael Chen', 'michael.chen@email.com', '(555) 101-0001', 'CA', 'Candidate Review', 'Indeed', '2025-01-10', 'employee', '11000001-0001-0001-0001-000000000001', 'primary'),
('21000002-0002-0002-0002-000000000002', 'Sarah Williams', 'sarah.williams@email.com', '(555) 101-0002', 'TX', 'Interview Scheduled', 'LinkedIn', '2025-01-08', 'employee', '11000002-0002-0002-0002-000000000002', 'warning'),
('21000003-0003-0003-0003-000000000003', 'David Rodriguez', 'david.rodriguez@email.com', '(555) 101-0003', 'FL', 'Offer Extended', 'Referral', '2025-01-05', 'employee', '11000003-0003-0003-0003-000000000003', 'info'),
('21000004-0004-0004-0004-000000000004', 'Emily Thompson', 'emily.thompson@email.com', '(555) 101-0004', 'NY', 'Onboarding', 'Job Fair', '2025-01-02', 'employee', '11000004-0004-0004-0004-000000000004', 'success'),
('21000005-0005-0005-0005-000000000005', 'James Wilson', 'james.wilson@email.com', '(555) 101-0005', 'WA', 'Active Employee', 'Recruiter', '2024-12-15', 'employee', '11000005-0005-0005-0005-000000000005', 'success'),
('21000006-0006-0006-0006-000000000006', 'Amanda Garcia', 'amanda.garcia@email.com', '(555) 101-0006', 'AZ', 'Candidate Review', 'Indeed', '2025-01-12', 'employee', '11000006-0006-0006-0006-000000000006', 'primary'),
('21000007-0007-0007-0007-000000000007', 'Robert Martinez', 'robert.martinez@email.com', '(555) 101-0007', 'CO', 'Interview Scheduled', 'LinkedIn', '2025-01-06', 'employee', '11000007-0007-0007-0007-000000000007', 'danger'),
('21000008-0008-0008-0008-000000000008', 'Jennifer Lee', 'jennifer.lee@email.com', '(555) 101-0008', 'OR', 'Offer Extended', 'Referral', '2025-01-04', 'employee', '11000008-0008-0008-0008-000000000008', 'warning'),
('21000009-0009-0009-0009-000000000009', 'Christopher Brown', 'christopher.brown@email.com', '(555) 101-0009', 'GA', 'Onboarding', 'Indeed', '2025-01-01', 'employee', '11000009-0009-0009-0009-000000000009', 'info'),
('21000010-0010-0010-0010-000000000010', 'Lisa Anderson', 'lisa.anderson@email.com', '(555) 101-0010', 'NC', 'Active Employee', 'Recruiter', '2024-11-20', 'employee', '11000010-0010-0010-0010-000000000010', 'success'),
('21000011-0011-0011-0011-000000000011', 'Daniel Taylor', 'daniel.taylor@email.com', '(555) 101-0011', 'MI', 'Candidate Review', 'Job Board', '2025-01-14', 'employee', '11000011-0011-0011-0011-000000000011', 'primary'),
('21000012-0012-0012-0012-000000000012', 'Michelle Davis', 'michelle.davis@email.com', '(555) 101-0012', 'OH', 'Interview Scheduled', 'LinkedIn', '2025-01-09', 'employee', '11000012-0012-0012-0012-000000000012', 'warning'),
('21000013-0013-0013-0013-000000000013', 'Kevin White', 'kevin.white@email.com', '(555) 101-0013', 'PA', 'Offer Extended', 'Referral', '2025-01-03', 'employee', '11000013-0013-0013-0013-000000000013', 'info'),
('21000014-0014-0014-0014-000000000014', 'Rachel Moore', 'rachel.moore@email.com', '(555) 101-0014', 'NJ', 'Onboarding', 'Job Fair', '2024-12-28', 'employee', '11000014-0014-0014-0014-000000000014', 'success'),
('21000015-0015-0015-0015-000000000015', 'Brian Jackson', 'brian.jackson@email.com', '(555) 101-0015', 'IL', 'Active Employee', 'Recruiter', '2024-10-15', 'employee', '11000015-0015-0015-0015-000000000015', 'success')
ON CONFLICT (id) DO NOTHING;

-- PARTNER (12)
INSERT INTO opportunities (id, contact_name, company_name, sales_cycle_id, estimated_value, priority, lead_source, contact_type, order_position) VALUES
('12000001-0001-0001-0001-000000000001', 'John Parker', 'TechVentures Inc', 'a1111111-1111-1111-1111-111111111111', 150000, 'new_lead', 'Conference', 'partner', 0),
('12000002-0002-0002-0002-000000000002', 'Maria Santos', 'Global Solutions LLC', 'a2222222-2222-2222-2222-222222222222', 280000, 'today_action', 'Referral', 'partner', 1),
('12000003-0003-0003-0003-000000000003', 'Thomas Reed', 'Apex Consulting', 'a3333333-3333-3333-3333-333333333333', 320000, 'pending_action', 'Trade Show', 'partner', 2),
('12000004-0004-0004-0004-000000000004', 'Susan Kim', 'Innovation Labs', 'a4444444-4444-4444-4444-444444444444', 450000, 'no_pending', 'Existing Partner', 'partner', 3),
('12000005-0005-0005-0005-000000000005', 'Andrew Collins', 'Strategic Partners Co', 'a1111111-1111-1111-1111-111111111111', 180000, 'new_lead', 'Website', 'partner', 4),
('12000006-0006-0006-0006-000000000006', 'Linda Foster', 'Premier Services Group', 'a2222222-2222-2222-2222-222222222222', 220000, 'missed_action', 'Referral', 'partner', 5),
('12000007-0007-0007-0007-000000000007', 'Richard Hughes', 'Digital Alliance Inc', 'a3333333-3333-3333-3333-333333333333', 385000, 'today_action', 'Conference', 'partner', 6),
('12000008-0008-0008-0008-000000000008', 'Patricia Evans', 'Synergy Corp', 'a4444444-4444-4444-4444-444444444444', 520000, 'no_pending', 'Existing Partner', 'partner', 7),
('12000009-0009-0009-0009-000000000009', 'Mark Thompson', 'NextGen Solutions', 'a1111111-1111-1111-1111-111111111111', 195000, 'new_lead', 'Trade Show', 'partner', 8),
('12000010-0010-0010-0010-000000000010', 'Jessica Morgan', 'United Business Alliance', 'a2222222-2222-2222-2222-222222222222', 265000, 'pending_action', 'Website', 'partner', 9),
('12000011-0011-0011-0011-000000000011', 'Steven Clark', 'Alliance Partners Ltd', 'a3333333-3333-3333-3333-333333333333', 340000, 'today_action', 'Referral', 'partner', 10),
('12000012-0012-0012-0012-000000000012', 'Catherine Lewis', 'Pinnacle Group', 'a4444444-4444-4444-4444-444444444444', 480000, 'no_pending', 'Existing Partner', 'partner', 11)
ON CONFLICT (id) DO NOTHING;

INSERT INTO contacts (id, name, email, cell_phone, state, sales_cycle, lead_source, created_date, contact_type, opportunity_id, status_color) VALUES
('22000001-0001-0001-0001-000000000001', 'John Parker - TechVentures', 'jparker@techventures.com', '(555) 201-0001', 'CA', 'Partner Inquiry', 'Conference', '2025-01-11', 'partner', '12000001-0001-0001-0001-000000000001', 'primary'),
('22000002-0002-0002-0002-000000000002', 'Maria Santos - Global Solutions', 'msantos@globalsolutions.com', '(555) 201-0002', 'TX', 'Negotiation', 'Referral', '2025-01-07', 'partner', '12000002-0002-0002-0002-000000000002', 'warning'),
('22000003-0003-0003-0003-000000000003', 'Thomas Reed - Apex Consulting', 'treed@apexconsulting.com', '(555) 201-0003', 'NY', 'Agreement Review', 'Trade Show', '2025-01-04', 'partner', '12000003-0003-0003-0003-000000000003', 'info'),
('22000004-0004-0004-0004-000000000004', 'Susan Kim - Innovation Labs', 'skim@innovationlabs.com', '(555) 201-0004', 'WA', 'Active Partner', 'Existing Partner', '2024-11-15', 'partner', '12000004-0004-0004-0004-000000000004', 'success'),
('22000005-0005-0005-0005-000000000005', 'Andrew Collins - Strategic Partners', 'acollins@strategicpartners.com', '(555) 201-0005', 'FL', 'Partner Inquiry', 'Website', '2025-01-13', 'partner', '12000005-0005-0005-0005-000000000005', 'primary'),
('22000006-0006-0006-0006-000000000006', 'Linda Foster - Premier Services', 'lfoster@premierservices.com', '(555) 201-0006', 'CO', 'Negotiation', 'Referral', '2025-01-05', 'partner', '12000006-0006-0006-0006-000000000006', 'danger'),
('22000007-0007-0007-0007-000000000007', 'Richard Hughes - Digital Alliance', 'rhughes@digitalalliance.com', '(555) 201-0007', 'AZ', 'Agreement Review', 'Conference', '2025-01-02', 'partner', '12000007-0007-0007-0007-000000000007', 'warning'),
('22000008-0008-0008-0008-000000000008', 'Patricia Evans - Synergy Corp', 'pevans@synergycorp.com', '(555) 201-0008', 'MA', 'Active Partner', 'Existing Partner', '2024-09-20', 'partner', '12000008-0008-0008-0008-000000000008', 'success'),
('22000009-0009-0009-0009-000000000009', 'Mark Thompson - NextGen', 'mthompson@nextgensolutions.com', '(555) 201-0009', 'OR', 'Partner Inquiry', 'Trade Show', '2025-01-14', 'partner', '12000009-0009-0009-0009-000000000009', 'primary'),
('22000010-0010-0010-0010-000000000010', 'Jessica Morgan - UBA', 'jmorgan@unitedba.com', '(555) 201-0010', 'GA', 'Negotiation', 'Website', '2025-01-06', 'partner', '12000010-0010-0010-0010-000000000010', 'info'),
('22000011-0011-0011-0011-000000000011', 'Steven Clark - Alliance Partners', 'sclark@alliancepartners.com', '(555) 201-0011', 'NC', 'Agreement Review', 'Referral', '2025-01-03', 'partner', '12000011-0011-0011-0011-000000000011', 'warning'),
('22000012-0012-0012-0012-000000000012', 'Catherine Lewis - Pinnacle', 'clewis@pinnaclegroup.com', '(555) 201-0012', 'VA', 'Active Partner', 'Existing Partner', '2024-08-10', 'partner', '12000012-0012-0012-0012-000000000012', 'success')
ON CONFLICT (id) DO NOTHING;

-- VENDOR (12)
INSERT INTO opportunities (id, contact_name, company_name, sales_cycle_id, estimated_value, priority, lead_source, contact_type, order_position) VALUES
('13000001-0001-0001-0001-000000000001', 'Robert Hayes', 'Industrial Supplies Co', 'b1111111-1111-1111-1111-111111111111', 45000, 'new_lead', 'Trade Show', 'vendor', 0),
('13000002-0002-0002-0002-000000000002', 'Nancy Wright', 'Quality Materials Inc', 'b2222222-2222-2222-2222-222222222222', 78000, 'today_action', 'Referral', 'vendor', 1),
('13000003-0003-0003-0003-000000000003', 'George Adams', 'Pro Equipment Ltd', 'b3333333-3333-3333-3333-333333333333', 125000, 'pending_action', 'Website', 'vendor', 2),
('13000004-0004-0004-0004-000000000004', 'Helen Scott', 'Premier Tools Corp', 'b4444444-4444-4444-4444-444444444444', 185000, 'no_pending', 'Existing Vendor', 'vendor', 3),
('13000005-0005-0005-0005-000000000005', 'Frank Nelson', 'BuildRight Supplies', 'b1111111-1111-1111-1111-111111111111', 52000, 'new_lead', 'Cold Call', 'vendor', 4),
('13000006-0006-0006-0006-000000000006', 'Dorothy King', 'Reliable Parts LLC', 'b2222222-2222-2222-2222-222222222222', 68000, 'missed_action', 'Trade Show', 'vendor', 5),
('13000007-0007-0007-0007-000000000007', 'Carl Baker', 'FastShip Logistics', 'b3333333-3333-3333-3333-333333333333', 95000, 'today_action', 'Referral', 'vendor', 6),
('13000008-0008-0008-0008-000000000008', 'Ruth Green', 'Elite Manufacturing', 'b4444444-4444-4444-4444-444444444444', 220000, 'no_pending', 'Existing Vendor', 'vendor', 7),
('13000009-0009-0009-0009-000000000009', 'Larry Hill', 'Central Distribution', 'b1111111-1111-1111-1111-111111111111', 58000, 'new_lead', 'Website', 'vendor', 8),
('13000010-0010-0010-0010-000000000010', 'Betty Robinson', 'National Components', 'b2222222-2222-2222-2222-222222222222', 82000, 'pending_action', 'Cold Call', 'vendor', 9),
('13000011-0011-0011-0011-000000000011', 'Edward Turner', 'Allied Resources', 'b3333333-3333-3333-3333-333333333333', 115000, 'today_action', 'Trade Show', 'vendor', 10),
('13000012-0012-0012-0012-000000000012', 'Margaret Phillips', 'Midwest Suppliers', 'b4444444-4444-4444-4444-444444444444', 175000, 'no_pending', 'Existing Vendor', 'vendor', 11)
ON CONFLICT (id) DO NOTHING;

INSERT INTO contacts (id, name, email, cell_phone, state, sales_cycle, lead_source, created_date, contact_type, opportunity_id, status_color) VALUES
('23000001-0001-0001-0001-000000000001', 'Robert Hayes - Industrial Supplies', 'rhayes@industrialsupplies.com', '(555) 301-0001', 'OH', 'Vendor Application', 'Trade Show', '2025-01-10', 'vendor', '13000001-0001-0001-0001-000000000001', 'primary'),
('23000002-0002-0002-0002-000000000002', 'Nancy Wright - Quality Materials', 'nwright@qualitymaterials.com', '(555) 301-0002', 'MI', 'Qualification', 'Referral', '2025-01-08', 'vendor', '13000002-0002-0002-0002-000000000002', 'warning'),
('23000003-0003-0003-0003-000000000003', 'George Adams - Pro Equipment', 'gadams@proequipment.com', '(555) 301-0003', 'PA', 'Contract Review', 'Website', '2025-01-05', 'vendor', '13000003-0003-0003-0003-000000000003', 'info'),
('23000004-0004-0004-0004-000000000004', 'Helen Scott - Premier Tools', 'hscott@premiertools.com', '(555) 301-0004', 'IN', 'Approved Vendor', 'Existing Vendor', '2024-10-20', 'vendor', '13000004-0004-0004-0004-000000000004', 'success'),
('23000005-0005-0005-0005-000000000005', 'Frank Nelson - BuildRight', 'fnelson@buildright.com', '(555) 301-0005', 'TN', 'Vendor Application', 'Cold Call', '2025-01-12', 'vendor', '13000005-0005-0005-0005-000000000005', 'primary'),
('23000006-0006-0006-0006-000000000006', 'Dorothy King - Reliable Parts', 'dking@reliableparts.com', '(555) 301-0006', 'MO', 'Qualification', 'Trade Show', '2025-01-06', 'vendor', '13000006-0006-0006-0006-000000000006', 'danger'),
('23000007-0007-0007-0007-000000000007', 'Carl Baker - FastShip', 'cbaker@fastshiplogistics.com', '(555) 301-0007', 'KY', 'Contract Review', 'Referral', '2025-01-03', 'vendor', '13000007-0007-0007-0007-000000000007', 'warning'),
('23000008-0008-0008-0008-000000000008', 'Ruth Green - Elite Manufacturing', 'rgreen@elitemanufacturing.com', '(555) 301-0008', 'WI', 'Approved Vendor', 'Existing Vendor', '2024-09-15', 'vendor', '13000008-0008-0008-0008-000000000008', 'success'),
('23000009-0009-0009-0009-000000000009', 'Larry Hill - Central Distribution', 'lhill@centraldist.com', '(555) 301-0009', 'MN', 'Vendor Application', 'Website', '2025-01-14', 'vendor', '13000009-0009-0009-0009-000000000009', 'primary'),
('23000010-0010-0010-0010-000000000010', 'Betty Robinson - National Components', 'brobinson@nationalcomponents.com', '(555) 301-0010', 'IA', 'Qualification', 'Cold Call', '2025-01-07', 'vendor', '13000010-0010-0010-0010-000000000010', 'info'),
('23000011-0011-0011-0011-000000000011', 'Edward Turner - Allied Resources', 'eturner@alliedresources.com', '(555) 301-0011', 'AL', 'Contract Review', 'Trade Show', '2025-01-02', 'vendor', '13000011-0011-0011-0011-000000000011', 'warning'),
('23000012-0012-0012-0012-000000000012', 'Margaret Phillips - Midwest Suppliers', 'mphillips@midwestsuppliers.com', '(555) 301-0012', 'KS', 'Approved Vendor', 'Existing Vendor', '2024-08-25', 'vendor', '13000012-0012-0012-0012-000000000012', 'success')
ON CONFLICT (id) DO NOTHING;

-- OTHER (8)
INSERT INTO opportunities (id, contact_name, company_name, sales_cycle_id, estimated_value, priority, lead_source, contact_type, order_position) VALUES
('14000001-0001-0001-0001-000000000001', 'Sarah Mitchell', 'Channel 5 News', 'c1111111-1111-1111-1111-111111111111', 0, 'new_lead', 'Media', 'other', 0),
('14000002-0002-0002-0002-000000000002', 'William Campbell', 'Industry Association', 'c2222222-2222-2222-2222-222222222222', 0, 'today_action', 'Networking', 'other', 1),
('14000003-0003-0003-0003-000000000003', 'Janet Cooper', 'City Planning Dept', 'c3333333-3333-3333-3333-333333333333', 0, 'no_pending', 'Government', 'other', 2),
('14000004-0004-0004-0004-000000000004', 'Dr. Richard Brooks', 'State University', 'c1111111-1111-1111-1111-111111111111', 0, 'new_lead', 'Academic', 'other', 3),
('14000005-0005-0005-0005-000000000005', 'Diana Ross', 'Hope Foundation', 'c2222222-2222-2222-2222-222222222222', 0, 'pending_action', 'Community', 'other', 4),
('14000006-0006-0006-0006-000000000006', 'Peter Wallace', 'Wallace & Associates', 'c3333333-3333-3333-3333-333333333333', 0, 'no_pending', 'Legal', 'other', 5),
('14000007-0007-0007-0007-000000000007', 'Alice Peterson', 'Industry Weekly', 'c1111111-1111-1111-1111-111111111111', 0, 'new_lead', 'Media', 'other', 6),
('14000008-0008-0008-0008-000000000008', 'James Morris', 'Capital Ventures', 'c2222222-2222-2222-2222-222222222222', 0, 'today_action', 'Finance', 'other', 7)
ON CONFLICT (id) DO NOTHING;

INSERT INTO contacts (id, name, email, cell_phone, state, sales_cycle, lead_source, created_date, contact_type, opportunity_id, status_color) VALUES
('24000001-0001-0001-0001-000000000001', 'Sarah Mitchell - Channel 5 News', 'smitchell@channel5news.com', '(555) 401-0001', 'CA', 'Initial Contact', 'Media', '2025-01-12', 'other', '14000001-0001-0001-0001-000000000001', 'primary'),
('24000002-0002-0002-0002-000000000002', 'William Campbell - Industry Assoc', 'wcampbell@industryassoc.org', '(555) 401-0002', 'DC', 'Follow Up', 'Networking', '2025-01-08', 'other', '14000002-0002-0002-0002-000000000002', 'warning'),
('24000003-0003-0003-0003-000000000003', 'Janet Cooper - City Planning', 'jcooper@cityplanning.gov', '(555) 401-0003', 'NY', 'Resolved', 'Government', '2025-01-02', 'other', '14000003-0003-0003-0003-000000000003', 'success'),
('24000004-0004-0004-0004-000000000004', 'Dr. Richard Brooks - State University', 'rbrooks@stateuniv.edu', '(555) 401-0004', 'MA', 'Initial Contact', 'Academic', '2025-01-11', 'other', '14000004-0004-0004-0004-000000000004', 'primary'),
('24000005-0005-0005-0005-000000000005', 'Diana Ross - Hope Foundation', 'dross@hopefoundation.org', '(555) 401-0005', 'IL', 'Follow Up', 'Community', '2025-01-06', 'other', '14000005-0005-0005-0005-000000000005', 'info'),
('24000006-0006-0006-0006-000000000006', 'Peter Wallace - Wallace & Associates', 'pwallace@wallacelaw.com', '(555) 401-0006', 'TX', 'Resolved', 'Legal', '2024-12-20', 'other', '14000006-0006-0006-0006-000000000006', 'success'),
('24000007-0007-0007-0007-000000000007', 'Alice Peterson - Industry Weekly', 'apeterson@industryweekly.com', '(555) 401-0007', 'PA', 'Initial Contact', 'Media', '2025-01-14', 'other', '14000007-0007-0007-0007-000000000007', 'primary'),
('24000008-0008-0008-0008-000000000008', 'James Morris - Capital Ventures', 'jmorris@capitalventures.com', '(555) 401-0008', 'CT', 'Follow Up', 'Finance', '2025-01-09', 'other', '14000008-0008-0008-0008-000000000008', 'warning')
ON CONFLICT (id) DO NOTHING;

-- Link opportunities to contacts
UPDATE opportunities SET contact_id = '21000001-0001-0001-0001-000000000001' WHERE id = '11000001-0001-0001-0001-000000000001';
UPDATE opportunities SET contact_id = '21000002-0002-0002-0002-000000000002' WHERE id = '11000002-0002-0002-0002-000000000002';
UPDATE opportunities SET contact_id = '21000003-0003-0003-0003-000000000003' WHERE id = '11000003-0003-0003-0003-000000000003';
UPDATE opportunities SET contact_id = '21000004-0004-0004-0004-000000000004' WHERE id = '11000004-0004-0004-0004-000000000004';
UPDATE opportunities SET contact_id = '21000005-0005-0005-0005-000000000005' WHERE id = '11000005-0005-0005-0005-000000000005';
UPDATE opportunities SET contact_id = '21000006-0006-0006-0006-000000000006' WHERE id = '11000006-0006-0006-0006-000000000006';
UPDATE opportunities SET contact_id = '21000007-0007-0007-0007-000000000007' WHERE id = '11000007-0007-0007-0007-000000000007';
UPDATE opportunities SET contact_id = '21000008-0008-0008-0008-000000000008' WHERE id = '11000008-0008-0008-0008-000000000008';
UPDATE opportunities SET contact_id = '21000009-0009-0009-0009-000000000009' WHERE id = '11000009-0009-0009-0009-000000000009';
UPDATE opportunities SET contact_id = '21000010-0010-0010-0010-000000000010' WHERE id = '11000010-0010-0010-0010-000000000010';
UPDATE opportunities SET contact_id = '21000011-0011-0011-0011-000000000011' WHERE id = '11000011-0011-0011-0011-000000000011';
UPDATE opportunities SET contact_id = '21000012-0012-0012-0012-000000000012' WHERE id = '11000012-0012-0012-0012-000000000012';
UPDATE opportunities SET contact_id = '21000013-0013-0013-0013-000000000013' WHERE id = '11000013-0013-0013-0013-000000000013';
UPDATE opportunities SET contact_id = '21000014-0014-0014-0014-000000000014' WHERE id = '11000014-0014-0014-0014-000000000014';
UPDATE opportunities SET contact_id = '21000015-0015-0015-0015-000000000015' WHERE id = '11000015-0015-0015-0015-000000000015';
UPDATE opportunities SET contact_id = '22000001-0001-0001-0001-000000000001' WHERE id = '12000001-0001-0001-0001-000000000001';
UPDATE opportunities SET contact_id = '22000002-0002-0002-0002-000000000002' WHERE id = '12000002-0002-0002-0002-000000000002';
UPDATE opportunities SET contact_id = '22000003-0003-0003-0003-000000000003' WHERE id = '12000003-0003-0003-0003-000000000003';
UPDATE opportunities SET contact_id = '22000004-0004-0004-0004-000000000004' WHERE id = '12000004-0004-0004-0004-000000000004';
UPDATE opportunities SET contact_id = '22000005-0005-0005-0005-000000000005' WHERE id = '12000005-0005-0005-0005-000000000005';
UPDATE opportunities SET contact_id = '22000006-0006-0006-0006-000000000006' WHERE id = '12000006-0006-0006-0006-000000000006';
UPDATE opportunities SET contact_id = '22000007-0007-0007-0007-000000000007' WHERE id = '12000007-0007-0007-0007-000000000007';
UPDATE opportunities SET contact_id = '22000008-0008-0008-0008-000000000008' WHERE id = '12000008-0008-0008-0008-000000000008';
UPDATE opportunities SET contact_id = '22000009-0009-0009-0009-000000000009' WHERE id = '12000009-0009-0009-0009-000000000009';
UPDATE opportunities SET contact_id = '22000010-0010-0010-0010-000000000010' WHERE id = '12000010-0010-0010-0010-000000000010';
UPDATE opportunities SET contact_id = '22000011-0011-0011-0011-000000000011' WHERE id = '12000011-0011-0011-0011-000000000011';
UPDATE opportunities SET contact_id = '22000012-0012-0012-0012-000000000012' WHERE id = '12000012-0012-0012-0012-000000000012';
UPDATE opportunities SET contact_id = '23000001-0001-0001-0001-000000000001' WHERE id = '13000001-0001-0001-0001-000000000001';
UPDATE opportunities SET contact_id = '23000002-0002-0002-0002-000000000002' WHERE id = '13000002-0002-0002-0002-000000000002';
UPDATE opportunities SET contact_id = '23000003-0003-0003-0003-000000000003' WHERE id = '13000003-0003-0003-0003-000000000003';
UPDATE opportunities SET contact_id = '23000004-0004-0004-0004-000000000004' WHERE id = '13000004-0004-0004-0004-000000000004';
UPDATE opportunities SET contact_id = '23000005-0005-0005-0005-000000000005' WHERE id = '13000005-0005-0005-0005-000000000005';
UPDATE opportunities SET contact_id = '23000006-0006-0006-0006-000000000006' WHERE id = '13000006-0006-0006-0006-000000000006';
UPDATE opportunities SET contact_id = '23000007-0007-0007-0007-000000000007' WHERE id = '13000007-0007-0007-0007-000000000007';
UPDATE opportunities SET contact_id = '23000008-0008-0008-0008-000000000008' WHERE id = '13000008-0008-0008-0008-000000000008';
UPDATE opportunities SET contact_id = '23000009-0009-0009-0009-000000000009' WHERE id = '13000009-0009-0009-0009-000000000009';
UPDATE opportunities SET contact_id = '23000010-0010-0010-0010-000000000010' WHERE id = '13000010-0010-0010-0010-000000000010';
UPDATE opportunities SET contact_id = '23000011-0011-0011-0011-000000000011' WHERE id = '13000011-0011-0011-0011-000000000011';
UPDATE opportunities SET contact_id = '23000012-0012-0012-0012-000000000012' WHERE id = '13000012-0012-0012-0012-000000000012';
UPDATE opportunities SET contact_id = '24000001-0001-0001-0001-000000000001' WHERE id = '14000001-0001-0001-0001-000000000001';
UPDATE opportunities SET contact_id = '24000002-0002-0002-0002-000000000002' WHERE id = '14000002-0002-0002-0002-000000000002';
UPDATE opportunities SET contact_id = '24000003-0003-0003-0003-000000000003' WHERE id = '14000003-0003-0003-0003-000000000003';
UPDATE opportunities SET contact_id = '24000004-0004-0004-0004-000000000004' WHERE id = '14000004-0004-0004-0004-000000000004';
UPDATE opportunities SET contact_id = '24000005-0005-0005-0005-000000000005' WHERE id = '14000005-0005-0005-0005-000000000005';
UPDATE opportunities SET contact_id = '24000006-0006-0006-0006-000000000006' WHERE id = '14000006-0006-0006-0006-000000000006';
UPDATE opportunities SET contact_id = '24000007-0007-0007-0007-000000000007' WHERE id = '14000007-0007-0007-0007-000000000007';
UPDATE opportunities SET contact_id = '24000008-0008-0008-0008-000000000008' WHERE id = '14000008-0008-0008-0008-000000000008';