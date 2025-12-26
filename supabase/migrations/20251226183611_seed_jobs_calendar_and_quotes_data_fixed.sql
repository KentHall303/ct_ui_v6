/*
  # Seed Jobs Calendar and Quotes Data
  
  This migration seeds:
  1. Updates existing contacts with contact_category values (Estimator, Field Manager, Subcontractor)
  2. Creates jobs_calendars for contacts
  3. Creates sample quotes for the Jobs table
  4. Creates sample quote_jobs (sub-rows) for expandable quotes
  
  The data matches the design mockups with realistic names and values.
*/

-- First, let's update existing contacts with categories
UPDATE contacts
SET contact_category = CASE
  WHEN name ILIKE '%Tmrk%' OR name ILIKE '%Neeraj%' OR name ILIKE '%Collin%' OR name ILIKE '%Jule%' OR name ILIKE '%Bogus%' THEN 'Estimator'
  WHEN name ILIKE '%Little%' OR name ILIKE '%Admin%' OR name ILIKE '%ReferPro%' OR name ILIKE '%ZAPIER%' OR name ILIKE '%Carlos%' OR name ILIKE '%Test%' OR name ILIKE '%Fasd%' THEN 'Field Manager'
  WHEN name ILIKE '%Sub%' OR name ILIKE '%Angel%' THEN 'Subcontractor'
  ELSE 'Estimator'
END
WHERE contact_category IS NULL OR contact_category = 'Estimator';

-- Insert additional contacts to match the mockup if they don't exist
INSERT INTO contacts (name, email, contact_category)
SELECT v.name, v.email, v.contact_category
FROM (VALUES
  ('Tmrk Team', 'tmrk.team@example.com', 'Estimator'),
  ('Tmrk Admin Team', 'tmrk.admin@example.com', 'Estimator'),
  ('Neeraj QA', 'neeraj.qa@example.com', 'Estimator'),
  ('Neeraj admin user', 'neeraj.admin@example.com', 'Estimator'),
  ('Collin Gavel', 'collin.gavel@example.com', 'Estimator'),
  ('Jule Virtual Scheduler', 'jule.scheduler@example.com', 'Estimator'),
  ('Bogus1 Bogus', 'bogus1@example.com', 'Estimator'),
  ('Little red', 'little.red@example.com', 'Field Manager'),
  ('Admin Kent', 'admin.kent@example.com', 'Field Manager'),
  ('ReferPro Platform', 'referpro@example.com', 'Field Manager'),
  ('ZAPIER TEST', 'zapier.test@example.com', 'Field Manager'),
  ('Carlos BANGAS', 'carlos.bangas@example.com', 'Field Manager'),
  ('Test One', 'test.one@example.com', 'Field Manager'),
  ('Test Two', 'test.two@example.com', 'Field Manager'),
  ('Fasdfasd fdsafds', 'fasdfasd@example.com', 'Field Manager'),
  ('Sub Test Sub Test', 'sub.test@example.com', 'Subcontractor'),
  ('Angelsub Handalsub', 'angelsub@example.com', 'Subcontractor'),
  ('Subcon 1 Testing', 'subcon1@example.com', 'Subcontractor')
) AS v(name, email, contact_category)
WHERE NOT EXISTS (
  SELECT 1 FROM contacts c WHERE c.name = v.name
);

-- Update any remaining contacts to get proper categories
UPDATE contacts
SET contact_category = 'Estimator'
WHERE contact_category IS NULL;

-- Define colors for jobs calendars
DO $$
DECLARE
  contact_rec RECORD;
  color_index int := 0;
  colors text[] := ARRAY['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#84cc16', '#ef4444', '#14b8a6', '#f97316', '#a855f7', '#22c55e', '#eab308'];
BEGIN
  -- Create jobs_calendars for all contacts
  FOR contact_rec IN SELECT id, name FROM contacts LOOP
    INSERT INTO jobs_calendars (contact_id, name, color, is_visible)
    SELECT contact_rec.id, contact_rec.name, colors[(color_index % 13) + 1], color_index < 3
    WHERE NOT EXISTS (SELECT 1 FROM jobs_calendars jc WHERE jc.contact_id = contact_rec.id);
    color_index := color_index + 1;
  END LOOP;
END $$;

-- Create sample quotes
INSERT INTO quotes (quote_number, contact_name, amount, material, labor, balance_due, start_date, end_date, wo_status, payments, total_cogs, gross_margin)
SELECT * FROM (VALUES
  ('New Quote #122', 'Kent1030 Hall1030', 2960.80::decimal, 0.00::decimal, 0.00::decimal, 2960.80::decimal, NULL::timestamptz, NULL::timestamptz, 'pending', 0.00::decimal, 0.00::decimal, 100.00::decimal),
  ('New Quote #123', 'Kent1030 Hall1030', 1196.61::decimal, 0.00::decimal, 0.00::decimal, 1196.61::decimal, NULL::timestamptz, NULL::timestamptz, 'active', 0.00::decimal, 0.00::decimal, 100.00::decimal),
  ('New Quote #136', 'Kent1030 Hall1030', 1120.00::decimal, 0.00::decimal, 0.00::decimal, 1120.00::decimal, NULL::timestamptz, NULL::timestamptz, 'pending', 0.00::decimal, 0.00::decimal, 100.00::decimal),
  ('New Quote #142', 'Kent1105 Hall1105', 4322.26::decimal, 0.00::decimal, 0.00::decimal, 3322.26::decimal, NULL::timestamptz, NULL::timestamptz, 'pending', 1000.00::decimal, 0.00::decimal, 100.00::decimal),
  ('New Quote #196', 'Donald Duck', 14500.00::decimal, 0.00::decimal, 0.00::decimal, 7962.76::decimal, NULL::timestamptz, NULL::timestamptz, 'active', 0.00::decimal, 6537.24::decimal, 100.00::decimal),
  ('New Quote #207', 'Mickey 908 Mouse', 6437.07::decimal, 0.00::decimal, 100.00::decimal, 6538.07::decimal, NULL::timestamptz, NULL::timestamptz, 'pending', -101.00::decimal, 100.00::decimal, 98.45::decimal)
) AS v(quote_number, contact_name, amount, material, labor, balance_due, start_date, end_date, wo_status, payments, total_cogs, gross_margin)
WHERE NOT EXISTS (SELECT 1 FROM quotes q WHERE q.quote_number = v.quote_number);

-- Create quote_jobs (sub-rows) for expandable quotes
DO $$
DECLARE
  quote_122_id uuid;
  quote_142_id uuid;
  quote_207_id uuid;
BEGIN
  SELECT id INTO quote_122_id FROM quotes WHERE quote_number = 'New Quote #122';
  SELECT id INTO quote_142_id FROM quotes WHERE quote_number = 'New Quote #142';
  SELECT id INTO quote_207_id FROM quotes WHERE quote_number = 'New Quote #207';

  -- Jobs for Quote #122
  IF quote_122_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM quote_jobs WHERE quote_id = quote_122_id) THEN
    INSERT INTO quote_jobs (quote_id, subcontractor_name, bid_type, start_date_time, end_date_time, status)
    VALUES (quote_122_id, 'Sara Reece', 'My Interior Painting', NULL, NULL, 'Pending');
  END IF;

  -- Jobs for Quote #142
  IF quote_142_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM quote_jobs WHERE quote_id = quote_142_id) THEN
    INSERT INTO quote_jobs (quote_id, subcontractor_name, bid_type, start_date_time, end_date_time, status)
    VALUES (quote_142_id, 'Sara Reece', 'My Interior Painting', NULL, NULL, 'Pending');
  END IF;

  -- Jobs for Quote #207 (multiple jobs)
  IF quote_207_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM quote_jobs WHERE quote_id = quote_207_id) THEN
    INSERT INTO quote_jobs (quote_id, subcontractor_name, bid_type, start_date_time, end_date_time, status)
    VALUES 
      (quote_207_id, 'Sara Reece', NULL, NULL, NULL, 'Pending'),
      (quote_207_id, 'Sara Reece', NULL, NULL, NULL, 'Pending'),
      (quote_207_id, 'Sara Reece', 'My Interior Painting', NULL, NULL, 'Pending');
  END IF;
END $$;

-- Create some jobs_calendar_events for sample data
DO $$
DECLARE
  calendar_rec RECORD;
  event_date timestamptz := now();
BEGIN
  FOR calendar_rec IN 
    SELECT jc.id, jc.name 
    FROM jobs_calendars jc 
    JOIN contacts c ON jc.contact_id = c.id 
    WHERE jc.is_visible = true 
    LIMIT 3
  LOOP
    IF NOT EXISTS (SELECT 1 FROM jobs_calendar_events WHERE jobs_calendar_id = calendar_rec.id) THEN
      INSERT INTO jobs_calendar_events (jobs_calendar_id, title, description, start_date, end_date, status, quote_id, contact_name, amount)
      VALUES 
        (calendar_rec.id, 'Site Visit - Quote #122', 'Initial site assessment', event_date + interval '1 day', event_date + interval '1 day' + interval '2 hours', 'pending', 'New Quote #122', 'Kent1030 Hall1030', 2960.80),
        (calendar_rec.id, 'Installation - Quote #142', 'Interior painting job', event_date + interval '3 days', event_date + interval '4 days', 'pending', 'New Quote #142', 'Kent1105 Hall1105', 4322.26);
    END IF;
  END LOOP;
END $$;
