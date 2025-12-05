/*
  # Seed Calendar Events

  ## Overview
  Seeds the calendar with sample events matching the original demo data.
  This provides realistic data for testing and demonstration purposes.

  ## Data Seeded
  - Multiple calendar events across September 2025
  - Various event types (quotes, installations, inspections, follow-ups)
  - Different status values (active, pending, overdue, completed)
  - Multi-day events for larger projects
  - Events assigned to different estimators

  ## Important Notes
  - This is demo data only and should be replaced with real data in production
  - All dates are set for September 2025 to match the calendar view
  - Event times and amounts are realistic examples
*/

-- Insert sample calendar events
DO $$
DECLARE
  estimator_test uuid;
  estimator_kent uuid;
  estimator_sara uuid;
  estimator_jeanette uuid;
  estimator_sara_admin uuid;
  estimator_nugget uuid;
  estimator_frank uuid;
  estimator_sara_team uuid;
BEGIN
  -- Get estimator IDs
  SELECT id INTO estimator_test FROM estimators WHERE name = 'Test_Account Owner';
  SELECT id INTO estimator_kent FROM estimators WHERE name = 'Standard Kent';
  SELECT id INTO estimator_sara FROM estimators WHERE name = 'Sara Joe';
  SELECT id INTO estimator_jeanette FROM estimators WHERE name = 'Jeanette Standards';
  SELECT id INTO estimator_sara_admin FROM estimators WHERE name = 'Sara Admin';
  SELECT id INTO estimator_nugget FROM estimators WHERE name = 'Absolute Nugget';
  SELECT id INTO estimator_frank FROM estimators WHERE name = 'Frank Team';
  SELECT id INTO estimator_sara_team FROM estimators WHERE name = 'Sara Admin Team';

  -- Insert events
  INSERT INTO calendar_events (title, event_type, status, start_date, end_date, is_all_day, estimator_id, contact_name, amount, quote_number) VALUES
    ('Site Visit - Kent Hall', 'quote', 'active', '2025-09-03 09:00:00+00', '2025-09-03 10:00:00+00', false, estimator_test, 'Kent Hall', 2960.80, 'Quote #122'),
    ('Consultation - Sarah Johnson', 'installation', 'pending', '2025-09-03 14:00:00+00', '2025-09-03 15:00:00+00', false, estimator_kent, 'Sarah Johnson', 1196.61, 'Quote #123'),
    ('Inspection - Mike Davis', 'inspection', 'active', '2025-09-05 10:30:00+00', '2025-09-05 11:30:00+00', false, estimator_test, 'Mike Davis', 1120.00, 'Quote #136'),
    ('Follow-up - Brantley Jeff', 'follow_up', 'completed', '2025-09-08 13:00:00+00', '2025-09-08 14:00:00+00', false, estimator_sara, 'Brantley Jeff', 60.00, 'Quote #138'),
    ('Global Enterprises Installation', 'installation', 'active', '2025-09-08 00:00:00+00', '2025-09-11 23:59:59+00', true, estimator_test, 'Global Enterprises', 25500.00, 'Quote #195'),
    ('Site Visit - Kent Hall', 'quote', 'pending', '2025-09-10 11:00:00+00', '2025-09-10 12:00:00+00', false, estimator_test, 'Kent Hall', 4322.26, 'Quote #142'),
    ('Installation - Emily Brown', 'installation', 'active', '2025-09-12 09:30:00+00', '2025-09-12 12:00:00+00', false, estimator_test, 'Emily Brown', 4441.50, 'Quote #146'),
    ('Consultation - Robert Wilson', 'quote', 'active', '2025-09-12 15:00:00+00', '2025-09-12 16:30:00+00', false, estimator_frank, 'Robert Wilson', 3840.15, 'Quote #148'),
    ('Installation - Lisa Anderson', 'installation', 'active', '2025-09-15 08:00:00+00', '2025-09-15 12:00:00+00', false, estimator_test, 'Lisa Anderson', 5234.00, 'Quote #150'),
    ('Site Visit - David Martinez', 'quote', 'pending', '2025-09-15 13:30:00+00', '2025-09-15 15:00:00+00', false, estimator_sara_admin, 'David Martinez', 2890.50, 'Quote #152'),
    ('Tech Solutions Installation', 'installation', 'active', '2025-09-16 00:00:00+00', '2025-09-19 23:59:59+00', true, estimator_test, 'Tech Solutions Inc', 18750.00, 'Quote #198'),
    ('Inspection - Jennifer Lee', 'inspection', 'overdue', '2025-09-17 10:00:00+00', '2025-09-17 11:30:00+00', false, estimator_test, 'Jennifer Lee', 7434.32, 'Quote #174'),
    ('Consultation - Thomas Garcia', 'quote', 'active', '2025-09-18 14:30:00+00', '2025-09-18 16:00:00+00', false, estimator_jeanette, 'Thomas Garcia', 3200.00, 'Quote #176'),
    ('Follow-up - Amanda White', 'follow_up', 'completed', '2025-09-19 11:30:00+00', '2025-09-19 12:30:00+00', false, estimator_sara, 'Amanda White', 1850.75, 'Quote #178'),
    ('Installation - Demo Moore', 'installation', 'active', '2025-09-22 09:00:00+00', '2025-09-22 13:00:00+00', false, estimator_test, 'Demo Moore', 2192.42, 'Quote #180'),
    ('Site Visit - Chris Taylor', 'quote', 'pending', '2025-09-22 15:30:00+00', '2025-09-22 17:00:00+00', false, estimator_nugget, 'Chris Taylor', 828.00, 'Quote #181'),
    ('Metro Construction Project', 'installation', 'pending', '2025-09-23 00:00:00+00', '2025-09-27 23:59:59+00', true, estimator_test, 'Metro Construction', 32000.00, 'Quote #201'),
    ('Installation - Patricia Brown', 'installation', 'active', '2025-09-24 10:00:00+00', '2025-09-24 14:00:00+00', false, estimator_test, 'Patricia Brown', 6750.00, 'Quote #183'),
    ('Consultation - Kevin Miller', 'quote', 'pending', '2025-09-24 13:00:00+00', '2025-09-24 14:30:00+00', false, estimator_frank, 'Kevin Miller', 4100.00, 'Quote #185'),
    ('Inspection - Michelle Davis', 'inspection', 'active', '2025-09-25 11:00:00+00', '2025-09-25 12:30:00+00', false, estimator_sara_team, 'Michelle Davis', 3450.00, 'Quote #187'),
    ('Follow-up - Brian Johnson', 'follow_up', 'overdue', '2025-09-26 09:30:00+00', '2025-09-26 10:30:00+00', false, estimator_test, 'Brian Johnson', 2680.00, 'Quote #189'),
    ('Site Visit - Jessica Wilson', 'quote', 'pending', '2025-09-29 14:00:00+00', '2025-09-29 15:30:00+00', false, estimator_kent, 'Jessica Wilson', 5920.00, 'Quote #191'),
    ('Installation - Daniel Anderson', 'installation', 'active', '2025-09-30 10:30:00+00', '2025-09-30 14:00:00+00', false, estimator_test, 'Daniel Anderson', 4230.00, 'Quote #193')
  ON CONFLICT DO NOTHING;
END $$;