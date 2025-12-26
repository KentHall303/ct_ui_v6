/*
  # Add Estimator ID to Calendar Events

  1. Schema Changes
    - Adds `estimator_id` column to `calendar_events` table
    - This column links calendar events to subcontractors for the dispatching view
    - Foreign key reference to `subcontractors` table

  2. Purpose
    - Enables filtering calendar events by subcontractor/estimator
    - Required for the Jobs dispatching timeline and map views
    - Allows drag-and-drop assignment of events to different estimators
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calendar_events' AND column_name = 'estimator_id'
  ) THEN
    ALTER TABLE calendar_events ADD COLUMN estimator_id uuid REFERENCES subcontractors(id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_calendar_events_estimator_id ON calendar_events(estimator_id);