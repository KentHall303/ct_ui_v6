/*
  # Update opportunities table for enhanced pipeline functionality

  1. Changes
    - Add `order_position` column to opportunities table for drag-and-drop ordering
    - Remove old priority check constraint
    - Add new priority check constraint with values:
      - 'new_lead' for red priority (New Lead)
      - 'missed_action' for yellow priority (Missed Action)
      - 'today_action' for green priority (Today's Action)
      - 'pending_action' for gray priority (Has Pending Action(s))
      - 'no_pending' for black priority (No Pending Actions)
    - Migrate existing priority values to new schema
    - Initialize order_position values for existing records

  2. Security
    - No RLS changes needed (existing policies remain)
*/

-- Add order_position column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'opportunities' AND column_name = 'order_position'
  ) THEN
    ALTER TABLE opportunities ADD COLUMN order_position INTEGER DEFAULT 0;
  END IF;
END $$;

-- Drop old priority check constraint
ALTER TABLE opportunities DROP CONSTRAINT IF EXISTS opportunities_priority_check;

-- Update existing priority values to new schema BEFORE adding new constraint
-- Map old values: high -> missed_action, medium -> today_action, low -> pending_action
UPDATE opportunities
SET priority = CASE 
  WHEN priority = 'high' THEN 'missed_action'
  WHEN priority = 'medium' THEN 'today_action'
  WHEN priority = 'low' THEN 'pending_action'
  ELSE 'no_pending'
END;

-- Add new priority check constraint with updated values
ALTER TABLE opportunities
ADD CONSTRAINT opportunities_priority_check 
CHECK (priority IN ('new_lead', 'missed_action', 'today_action', 'pending_action', 'no_pending'));

-- Add some variety to the priorities for better visual testing
UPDATE opportunities
SET priority = 'new_lead'
WHERE id IN (
  SELECT id FROM opportunities 
  WHERE priority = 'missed_action' 
  ORDER BY created_at
  LIMIT 3
);

UPDATE opportunities
SET priority = 'no_pending'
WHERE id IN (
  SELECT id FROM opportunities 
  WHERE priority = 'pending_action' 
  ORDER BY created_at
  LIMIT 2
);

-- Initialize order_position for existing records (ordered by created_at within each sales_cycle)
DO $$
DECLARE
  cycle_record RECORD;
  opp_record RECORD;
  position_counter INTEGER;
BEGIN
  FOR cycle_record IN SELECT DISTINCT sales_cycle_id FROM opportunities LOOP
    position_counter := 0;
    FOR opp_record IN 
      SELECT id FROM opportunities 
      WHERE sales_cycle_id = cycle_record.sales_cycle_id 
      ORDER BY created_at 
    LOOP
      UPDATE opportunities 
      SET order_position = position_counter 
      WHERE id = opp_record.id;
      position_counter := position_counter + 1;
    END LOOP;
  END LOOP;
END $$;