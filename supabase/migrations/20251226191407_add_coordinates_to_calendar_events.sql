/*
  # Add Coordinates to Calendar Events

  1. Schema Changes
    - Adds `latitude` column for GPS coordinates
    - Adds `longitude` column for GPS coordinates
    - Adds `contact_id` column to link events to contacts

  2. Purpose
    - Enables map visualization of appointment locations
    - Required for route planning in the Jobs dispatching map view
    - Links events to contacts for address lookup
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calendar_events' AND column_name = 'latitude'
  ) THEN
    ALTER TABLE calendar_events ADD COLUMN latitude decimal(10, 7);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calendar_events' AND column_name = 'longitude'
  ) THEN
    ALTER TABLE calendar_events ADD COLUMN longitude decimal(10, 7);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calendar_events' AND column_name = 'contact_id'
  ) THEN
    ALTER TABLE calendar_events ADD COLUMN contact_id uuid REFERENCES contacts(id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_calendar_events_contact_id ON calendar_events(contact_id);