/*
  # Add action configuration support to connection plan actions

  1. Changes
    - Add `action_config` JSONB column to `connection_plan_actions` table to store dynamic field values for each action type
    - Add index on `action_config` for better query performance with JSONB operations

  2. Notes
    - This allows each action type to store its specific field values in a flexible format
    - JSONB format enables querying specific fields while maintaining flexibility
    - No data migration needed as this is a new column with default NULL
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'connection_plan_actions' AND column_name = 'action_config'
  ) THEN
    ALTER TABLE connection_plan_actions
    ADD COLUMN action_config JSONB DEFAULT '{}'::jsonb;

    CREATE INDEX IF NOT EXISTS idx_connection_plan_actions_action_config
    ON connection_plan_actions USING gin(action_config);
  END IF;
END $$;