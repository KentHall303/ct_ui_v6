/*
  # Seed Meetings, Jobs, and Customers Data

  1. Purpose
    - Populate customers, jobs, and meetings tables with comprehensive data
    - Create realistic job scenarios with associated meetings
    - Link meetings to subcontractors for coordination tracking
    - Support meeting management and job tracking features

  2. Data Inserted
    - 10 customer records
    - 12 job records across different statuses
    - 18 meeting records with various types and statuses
    - Meeting-subcontractor associations

  3. Relationships
    - Jobs linked to customers
    - Meetings linked to jobs
    - Meetings linked to subcontractors through junction table

  4. Meeting Types
    - site_visit: Initial site visits and assessments
    - consultation: Client consultations and planning
    - inspection: Quality and progress inspections
    - follow_up: Follow-up meetings and walkthroughs
*/

-- Insert customers
INSERT INTO customers (name, email, phone, address) VALUES
  ('Robert & Mary Johnson', 'robert.johnson@email.com', '555-1001', '123 Oak Street, Springfield, IL 62701'),
  ('Patricia Williams', 'patricia.williams@email.com', '555-1002', '456 Maple Avenue, Springfield, IL 62702'),
  ('Michael Davis', 'michael.davis@email.com', '555-1003', '789 Pine Road, Springfield, IL 62703'),
  ('Jennifer Martinez', 'jennifer.martinez@email.com', '555-1004', '321 Elm Drive, Springfield, IL 62704'),
  ('David Thompson', 'david.thompson@email.com', '555-1005', '654 Birch Lane, Springfield, IL 62705'),
  ('Sarah Anderson', 'sarah.anderson@email.com', '555-1006', '987 Cedar Court, Springfield, IL 62706'),
  ('James Wilson', 'james.wilson@email.com', '555-1007', '147 Willow Way, Springfield, IL 62707'),
  ('Linda Garcia', 'linda.garcia@email.com', '555-1008', '258 Spruce Street, Springfield, IL 62708'),
  ('Christopher Lee', 'christopher.lee@email.com', '555-1009', '369 Ash Boulevard, Springfield, IL 62709'),
  ('Elizabeth Brown', 'elizabeth.brown@email.com', '555-1010', '741 Cherry Avenue, Springfield, IL 62710')
ON CONFLICT DO NOTHING;

-- Insert jobs
DO $$
DECLARE
  customer_johnson uuid;
  customer_williams uuid;
  customer_davis uuid;
  customer_martinez uuid;
  customer_thompson uuid;
  customer_anderson uuid;
  customer_wilson uuid;
  customer_garcia uuid;
  customer_lee uuid;
  customer_brown uuid;

  job_kitchen_remodel uuid;
  job_bathroom_reno uuid;
  job_deck_build uuid;
  job_roof_replacement uuid;
  job_basement_finish uuid;
  job_window_install uuid;
  job_hvac_upgrade uuid;
  job_flooring_install uuid;
  job_exterior_paint uuid;
  job_master_addition uuid;
  job_pool_install uuid;
  job_garage_remodel uuid;
BEGIN
  -- Get customer IDs
  SELECT id INTO customer_johnson FROM customers WHERE name = 'Robert & Mary Johnson' LIMIT 1;
  SELECT id INTO customer_williams FROM customers WHERE name = 'Patricia Williams' LIMIT 1;
  SELECT id INTO customer_davis FROM customers WHERE name = 'Michael Davis' LIMIT 1;
  SELECT id INTO customer_martinez FROM customers WHERE name = 'Jennifer Martinez' LIMIT 1;
  SELECT id INTO customer_thompson FROM customers WHERE name = 'David Thompson' LIMIT 1;
  SELECT id INTO customer_anderson FROM customers WHERE name = 'Sarah Anderson' LIMIT 1;
  SELECT id INTO customer_wilson FROM customers WHERE name = 'James Wilson' LIMIT 1;
  SELECT id INTO customer_garcia FROM customers WHERE name = 'Linda Garcia' LIMIT 1;
  SELECT id INTO customer_lee FROM customers WHERE name = 'Christopher Lee' LIMIT 1;
  SELECT id INTO customer_brown FROM customers WHERE name = 'Elizabeth Brown' LIMIT 1;

  -- Insert jobs and capture IDs
  INSERT INTO jobs (customer_id, title, description, address, status, total_amount)
  VALUES (customer_johnson, 'Kitchen Remodel', 'Complete kitchen renovation including cabinets, countertops, and appliances', '123 Oak Street, Springfield, IL 62701', 'in_progress', 45000.00)
  RETURNING id INTO job_kitchen_remodel;

  INSERT INTO jobs (customer_id, title, description, address, status, total_amount)
  VALUES (customer_williams, 'Master Bathroom Renovation', 'Full master bathroom remodel with walk-in shower and double vanity', '456 Maple Avenue, Springfield, IL 62702', 'approved', 28500.00)
  RETURNING id INTO job_bathroom_reno;

  INSERT INTO jobs (customer_id, title, description, address, status, total_amount)
  VALUES (customer_davis, 'Deck Construction', 'Build 20x16 composite deck with stairs and railing', '789 Pine Road, Springfield, IL 62703', 'proposal', 15200.00)
  RETURNING id INTO job_deck_build;

  INSERT INTO jobs (customer_id, title, description, address, status, total_amount)
  VALUES (customer_martinez, 'Roof Replacement', 'Complete roof tear-off and replacement with architectural shingles', '321 Elm Drive, Springfield, IL 62704', 'in_progress', 18900.00)
  RETURNING id INTO job_roof_replacement;

  INSERT INTO jobs (customer_id, title, description, address, status, total_amount)
  VALUES (customer_thompson, 'Basement Finishing', 'Finish basement with rec room, bedroom, and bathroom', '654 Birch Lane, Springfield, IL 62705', 'approved', 52000.00)
  RETURNING id INTO job_basement_finish;

  INSERT INTO jobs (customer_id, title, description, address, status, total_amount)
  VALUES (customer_anderson, 'Window Replacement', 'Replace all windows with energy-efficient vinyl windows', '987 Cedar Court, Springfield, IL 62706', 'completed', 12400.00)
  RETURNING id INTO job_window_install;

  INSERT INTO jobs (customer_id, title, description, address, status, total_amount)
  VALUES (customer_wilson, 'HVAC System Upgrade', 'Install new HVAC system with smart thermostat', '147 Willow Way, Springfield, IL 62707', 'proposal', 9800.00)
  RETURNING id INTO job_hvac_upgrade;

  INSERT INTO jobs (customer_id, title, description, address, status, total_amount)
  VALUES (customer_garcia, 'Hardwood Flooring Installation', 'Install hardwood flooring throughout first floor', '258 Spruce Street, Springfield, IL 62708', 'in_progress', 16700.00)
  RETURNING id INTO job_flooring_install;

  INSERT INTO jobs (customer_id, title, description, address, status, total_amount)
  VALUES (customer_lee, 'Exterior Painting', 'Paint entire exterior including trim and garage door', '369 Ash Boulevard, Springfield, IL 62709', 'approved', 8500.00)
  RETURNING id INTO job_exterior_paint;

  INSERT INTO jobs (customer_id, title, description, address, status, total_amount)
  VALUES (customer_brown, 'Master Suite Addition', 'Add master suite with bedroom, bathroom, and walk-in closet', '741 Cherry Avenue, Springfield, IL 62710', 'proposal', 95000.00)
  RETURNING id INTO job_master_addition;

  INSERT INTO jobs (customer_id, title, description, address, status, total_amount)
  VALUES (customer_johnson, 'Pool Installation', 'Install in-ground pool with patio and fencing', '123 Oak Street, Springfield, IL 62701', 'cancelled', 75000.00)
  RETURNING id INTO job_pool_install;

  INSERT INTO jobs (customer_id, title, description, address, status, total_amount)
  VALUES (customer_davis, 'Garage Conversion', 'Convert garage into home office and storage', '789 Pine Road, Springfield, IL 62703', 'completed', 22000.00)
  RETURNING id INTO job_garage_remodel;

  -- Insert meetings
  INSERT INTO meetings (job_id, title, description, meeting_type, start_date, end_date, location, status, notes)
  VALUES
    (job_kitchen_remodel, 'Kitchen Design Consultation', 'Review cabinet selections and countertop options with client', 'consultation', '2025-09-20 10:00:00', '2025-09-20 11:30:00', '123 Oak Street, Springfield, IL', 'completed', 'Client selected white shaker cabinets with quartz countertops'),
    (job_kitchen_remodel, 'Plumbing Rough-In Inspection', 'Inspect plumbing work before drywall installation', 'inspection', '2025-10-05 14:00:00', '2025-10-05 15:00:00', '123 Oak Street, Springfield, IL', 'completed', 'All plumbing passed inspection'),
    (job_kitchen_remodel, 'Cabinet Installation Follow-Up', 'Check cabinet installation and address any issues', 'follow_up', '2025-10-22 09:00:00', '2025-10-22 10:00:00', '123 Oak Street, Springfield, IL', 'scheduled', NULL),

    (job_bathroom_reno, 'Initial Site Visit', 'Measure bathroom and discuss design preferences', 'site_visit', '2025-09-12 13:00:00', '2025-09-12 14:00:00', '456 Maple Avenue, Springfield, IL', 'completed', 'Client wants walk-in shower with bench seating'),
    (job_bathroom_reno, 'Tile Selection Meeting', 'Review tile options for shower and floor', 'consultation', '2025-09-25 11:00:00', '2025-09-25 12:00:00', 'Showroom', 'completed', 'Selected 12x24 gray tile for walls and mosaic floor'),
    (job_bathroom_reno, 'Pre-Construction Meeting', 'Final walkthrough before demolition begins', 'follow_up', '2025-10-08 10:00:00', '2025-10-08 10:30:00', '456 Maple Avenue, Springfield, IL', 'scheduled', NULL),

    (job_deck_build, 'Deck Design Consultation', 'Review deck plans and material options', 'site_visit', '2025-09-18 15:00:00', '2025-09-18 16:30:00', '789 Pine Road, Springfield, IL', 'completed', 'Client approved composite decking in gray color'),
    (job_deck_build, 'Quote Presentation', 'Present detailed quote and timeline', 'consultation', '2025-09-28 14:00:00', '2025-09-28 15:00:00', 'Office', 'scheduled', NULL),

    (job_roof_replacement, 'Roof Inspection', 'Inspect current roof condition and document damage', 'inspection', '2025-09-10 09:00:00', '2025-09-10 10:00:00', '321 Elm Drive, Springfield, IL', 'completed', 'Multiple missing shingles and water damage in northeast corner'),
    (job_roof_replacement, 'Roofing Progress Check', 'Mid-project inspection of roofing work', 'inspection', '2025-10-15 13:00:00', '2025-10-15 14:00:00', '321 Elm Drive, Springfield, IL', 'scheduled', NULL),

    (job_basement_finish, 'Basement Planning Meeting', 'Discuss layout, electrical, and plumbing requirements', 'consultation', '2025-09-22 10:00:00', '2025-09-22 12:00:00', '654 Birch Lane, Springfield, IL', 'completed', 'Client wants home theater area and guest bedroom'),
    (job_basement_finish, 'Subcontractor Coordination', 'Meet with plumbing and electrical subs', 'site_visit', '2025-10-10 08:00:00', '2025-10-10 10:00:00', '654 Birch Lane, Springfield, IL', 'scheduled', NULL),

    (job_window_install, 'Final Walkthrough', 'Inspect completed window installation', 'follow_up', '2025-09-30 14:00:00', '2025-09-30 15:00:00', '987 Cedar Court, Springfield, IL', 'completed', 'All windows installed correctly, client very satisfied'),

    (job_hvac_upgrade, 'HVAC Assessment', 'Evaluate current system and recommend upgrades', 'site_visit', '2025-09-16 11:00:00', '2025-09-16 12:00:00', '147 Willow Way, Springfield, IL', 'completed', 'Current system is 18 years old and inefficient'),

    (job_flooring_install, 'Flooring Material Selection', 'Choose hardwood species and finish', 'consultation', '2025-09-19 13:00:00', '2025-09-19 14:30:00', 'Showroom', 'completed', 'Selected red oak with natural finish'),
    (job_flooring_install, 'Installation Progress Meeting', 'Check progress and address any concerns', 'inspection', '2025-10-12 10:00:00', '2025-10-12 11:00:00', '258 Spruce Street, Springfield, IL', 'scheduled', NULL),

    (job_exterior_paint, 'Color Selection Consultation', 'Choose exterior paint colors', 'consultation', '2025-09-24 15:00:00', '2025-09-24 16:00:00', '369 Ash Boulevard, Springfield, IL', 'completed', 'Selected light gray for siding, white for trim'),

    (job_master_addition, 'Addition Planning Meeting', 'Review architectural plans and discuss timeline', 'consultation', '2025-09-26 09:00:00', '2025-09-26 11:00:00', '741 Cherry Avenue, Springfield, IL', 'scheduled', NULL);

  -- Link subcontractors to meetings
  INSERT INTO meeting_subcontractors (meeting_id, subcontractor_id, is_primary, notes)
  SELECT
    m.id,
    (SELECT id FROM subcontractors WHERE name = 'Elite Plumbing Services' LIMIT 1),
    true,
    'Primary plumber for rough-in work'
  FROM meetings m WHERE m.title = 'Plumbing Rough-In Inspection';

  INSERT INTO meeting_subcontractors (meeting_id, subcontractor_id, is_primary, notes)
  SELECT
    m.id,
    (SELECT id FROM subcontractors WHERE name = 'Precision Carpentry Co.' LIMIT 1),
    true,
    'Cabinet installation specialist'
  FROM meetings m WHERE m.title = 'Cabinet Installation Follow-Up';

  INSERT INTO meeting_subcontractors (meeting_id, subcontractor_id, is_primary, notes)
  SELECT
    m.id,
    (SELECT id FROM subcontractors WHERE name = 'Master Tile & Stone' LIMIT 1),
    true,
    'Tile contractor for shower and floor'
  FROM meetings m WHERE m.title = 'Tile Selection Meeting';

  INSERT INTO meeting_subcontractors (meeting_id, subcontractor_id, is_primary, notes)
  SELECT
    m.id,
    (SELECT id FROM subcontractors WHERE name = 'Apex Roofing Contractors' LIMIT 1),
    true,
    'Roofing contractor'
  FROM meetings m WHERE m.title = 'Roofing Progress Check';

  INSERT INTO meeting_subcontractors (meeting_id, subcontractor_id, is_primary, notes)
  SELECT
    m.id,
    (SELECT id FROM subcontractors WHERE name = 'Elite Plumbing Services' LIMIT 1),
    false,
    'Plumbing for basement bathroom'
  FROM meetings m WHERE m.title = 'Subcontractor Coordination';

  INSERT INTO meeting_subcontractors (meeting_id, subcontractor_id, is_primary, notes)
  SELECT
    m.id,
    (SELECT id FROM subcontractors WHERE name = 'ProWire Electrical' LIMIT 1),
    true,
    'Electrical for basement'
  FROM meetings m WHERE m.title = 'Subcontractor Coordination';

  INSERT INTO meeting_subcontractors (meeting_id, subcontractor_id, is_primary, notes)
  SELECT
    m.id,
    (SELECT id FROM subcontractors WHERE name = 'Crystal Clear Windows' LIMIT 1),
    true,
    'Window installation contractor'
  FROM meetings m WHERE m.title = 'Final Walkthrough' AND m.job_id = job_window_install;

  INSERT INTO meeting_subcontractors (meeting_id, subcontractor_id, is_primary, notes)
  SELECT
    m.id,
    (SELECT id FROM subcontractors WHERE name = 'Summit HVAC Solutions' LIMIT 1),
    true,
    'HVAC installation contractor'
  FROM meetings m WHERE m.title = 'HVAC Assessment';

  INSERT INTO meeting_subcontractors (meeting_id, subcontractor_id, is_primary, notes)
  SELECT
    m.id,
    (SELECT id FROM subcontractors WHERE name = 'FloorMaster Installation' LIMIT 1),
    true,
    'Hardwood flooring installer'
  FROM meetings m WHERE m.title = 'Installation Progress Meeting';

  INSERT INTO meeting_subcontractors (meeting_id, subcontractor_id, is_primary, notes)
  SELECT
    m.id,
    (SELECT id FROM subcontractors WHERE name = 'Perfect Paint Pros' LIMIT 1),
    true,
    'Exterior painting contractor'
  FROM meetings m WHERE m.title = 'Color Selection Consultation';
END $$;
