/*
  # Add plan_type column to connection_plans table

  1. Changes
    - Add `plan_type` column to `connection_plans` table to categorize action plans
    - Valid plan types: Connection Plans, Conversion Plans, Retention Plans, Events Plans, Seasonal Plans, Parallel Trigger Plans
    - Default value is 'Connection Plans' for existing records

  2. Purpose
    - Enables grouping of action plans by category in dropdowns
    - Supports the Action Plans menu structure
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'connection_plans' AND column_name = 'plan_type'
  ) THEN
    ALTER TABLE connection_plans ADD COLUMN plan_type text DEFAULT 'Connection Plans';
    
    ALTER TABLE connection_plans ADD CONSTRAINT connection_plans_plan_type_check
      CHECK (plan_type IN ('Connection Plans', 'Conversion Plans', 'Retention Plans', 'Events Plans', 'Seasonal Plans', 'Parallel Trigger Plans'));
  END IF;
END $$;

UPDATE connection_plans SET plan_type = 'Connection Plans' WHERE plan_type IS NULL;