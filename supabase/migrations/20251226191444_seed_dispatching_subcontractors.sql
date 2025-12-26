/*
  # Seed Dispatching Subcontractors (Estimators)

  1. New Data
    - Creates 5 subcontractors/estimators for the Jobs dispatching view
    - Each has a specialty and is marked as active
    - Names: Kent Hall, Jordan Schupbach, Mike Thompson, Sarah Chen, Carlos Rivera

  2. Purpose
    - Provides estimators for the timeline and map views
    - Each estimator can have multiple jobs assigned per day
*/

INSERT INTO subcontractors (id, name, email, phone, specialty, is_active, created_at, updated_at)
VALUES
  ('a1b2c3d4-e5f6-4789-abcd-111111111111', 'Kent Hall', 'kent.hall@company.com', '(801) 555-0101', 'Tile Installation', true, now(), now()),
  ('a1b2c3d4-e5f6-4789-abcd-222222222222', 'Jordan Schupbach', 'jordan.s@company.com', '(801) 555-0102', 'Bathroom Remodel', true, now(), now()),
  ('a1b2c3d4-e5f6-4789-abcd-333333333333', 'Mike Thompson', 'mike.t@company.com', '(801) 555-0103', 'Kitchen Remodel', true, now(), now()),
  ('a1b2c3d4-e5f6-4789-abcd-444444444444', 'Sarah Chen', 'sarah.c@company.com', '(303) 555-0104', 'Flooring', true, now(), now()),
  ('a1b2c3d4-e5f6-4789-abcd-555555555555', 'Carlos Rivera', 'carlos.r@company.com', '(303) 555-0105', 'General Contracting', true, now(), now())
ON CONFLICT (id) DO NOTHING;