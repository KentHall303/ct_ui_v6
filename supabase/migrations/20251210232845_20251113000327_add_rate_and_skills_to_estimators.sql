/*
  # Add Rate and Skills to Estimators

  1. Changes to `estimators` table
    - Add `hourly_rate` (numeric) - The hourly rate for the estimator
    - Add `skills` (text array) - Array of skills/specializations for the estimator
    
  2. Purpose
    - Enable filtering estimators by rate ranges
    - Enable filtering estimators by specific skills
    - Support better appointment matching based on estimator capabilities
    
  3. Sample Skills
    - Roofing, Siding, Windows, Gutters, Painting, HVAC, Plumbing, Electrical, etc.
*/

-- Add hourly_rate column to estimators
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'estimators' AND column_name = 'hourly_rate'
  ) THEN
    ALTER TABLE estimators ADD COLUMN hourly_rate NUMERIC(10, 2) DEFAULT 0.00;
  END IF;
END $$;

-- Add skills array column to estimators
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'estimators' AND column_name = 'skills'
  ) THEN
    ALTER TABLE estimators ADD COLUMN skills TEXT[] DEFAULT '{}';
  END IF;
END $$;

-- Update existing estimators with sample data
UPDATE estimators
SET 
  hourly_rate = CASE name
    WHEN 'Test_Account Owner' THEN 85.00
    WHEN 'Standard Kent' THEN 65.00
    WHEN 'Sara Joe' THEN 75.00
    WHEN 'Jeanette Standards' THEN 70.00
    WHEN 'Sara Admin' THEN 60.00
    WHEN 'Absolute Nugget' THEN 90.00
    WHEN 'Frank Team' THEN 80.00
    WHEN 'Sara Admin Team' THEN 95.00
    ELSE 50.00
  END,
  skills = CASE name
    WHEN 'Test_Account Owner' THEN ARRAY['Roofing', 'Siding', 'Windows', 'Project Management']
    WHEN 'Standard Kent' THEN ARRAY['Windows', 'Doors', 'Interior']
    WHEN 'Sara Joe' THEN ARRAY['Roofing', 'Gutters', 'Exterior']
    WHEN 'Jeanette Standards' THEN ARRAY['Painting', 'Drywall', 'Interior']
    WHEN 'Sara Admin' THEN ARRAY['Scheduling', 'Coordination']
    WHEN 'Absolute Nugget' THEN ARRAY['HVAC', 'Plumbing', 'Electrical']
    WHEN 'Frank Team' THEN ARRAY['Roofing', 'Siding', 'Commercial']
    WHEN 'Sara Admin Team' THEN ARRAY['Project Management', 'Commercial', 'Multi-Unit']
    ELSE ARRAY['General']
  END
WHERE hourly_rate IS NULL OR hourly_rate = 0;