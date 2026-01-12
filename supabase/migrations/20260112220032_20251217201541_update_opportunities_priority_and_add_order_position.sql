/*
  # Update opportunities priority values and add order_position

  1. Changes
    - Drop old priority constraint
    - Add order_position column
    - Update priority values from old format to new format
    - Add new priority constraint with updated values
    
  2. Priority Mapping
    - high -> new_lead
    - medium -> pending_action
    - low -> no_pending
    
  3. Notes
    - order_position is used to order opportunities within each sales cycle column
    - Existing records get order_position based on created_at timestamp
*/

-- Drop the old priority constraint
ALTER TABLE opportunities DROP CONSTRAINT IF EXISTS opportunities_priority_check;

-- Add order_position column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'opportunities' AND column_name = 'order_position'
  ) THEN
    ALTER TABLE opportunities ADD COLUMN order_position integer DEFAULT 0;
  END IF;
END $$;

-- Update existing priority values to new format
UPDATE opportunities
SET priority = CASE
  WHEN priority = 'high' THEN 'new_lead'
  WHEN priority = 'medium' THEN 'pending_action'
  WHEN priority = 'low' THEN 'no_pending'
  ELSE 'pending_action'
END;

-- Add new priority constraint with updated values
ALTER TABLE opportunities ADD CONSTRAINT opportunities_priority_check 
  CHECK (priority = ANY (ARRAY['new_lead'::text, 'missed_action'::text, 'today_action'::text, 'pending_action'::text, 'no_pending'::text]));

-- Set order_position for existing records
WITH ranked_opps AS (
  SELECT 
    id,
    ROW_NUMBER() OVER (PARTITION BY sales_cycle_id ORDER BY created_at) - 1 as new_position
  FROM opportunities
  WHERE sales_cycle_id IS NOT NULL
)
UPDATE opportunities o
SET order_position = ro.new_position
FROM ranked_opps ro
WHERE o.id = ro.id;

-- Create index on order_position for sorting
CREATE INDEX IF NOT EXISTS idx_opportunities_order_position ON opportunities(sales_cycle_id, order_position);