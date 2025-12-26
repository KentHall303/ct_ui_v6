/*
  # Generate Contact Calendars and Reassign Events

  ## Overview
  Replaces static placeholder calendars with dynamic contact-based calendars.
  Each contact gets their own calendar with a randomly assigned color.

  ## Changes
  1. Delete existing placeholder calendars (Client Meetings, Marketing, etc.)
  2. Create one calendar per contact with random color assignment
  3. Randomly reassign all existing calendar events to contact calendars
  4. Ensure all events have valid calendar_id references

  ## Color Palette
  Uses a predefined set of professional colors for calendar assignment
*/

-- Delete all existing placeholder calendars
DELETE FROM calendars WHERE contact_id IS NULL;

-- Create a calendar for each contact with random color assignment
DO $$
DECLARE
  contact_record RECORD;
  color_palette TEXT[] := ARRAY[
    '#198754', -- Green
    '#0d6efd', -- Blue
    '#6610f2', -- Purple
    '#fd7e14', -- Orange
    '#0dcaf0', -- Cyan
    '#20c997', -- Teal
    '#ffc107', -- Yellow
    '#d63384', -- Pink
    '#dc3545', -- Red
    '#6c757d', -- Gray
    '#17a2b8', -- Info Blue
    '#28a745', -- Success Green
    '#e83e8c', -- Magenta
    '#6f42c1', -- Violet
    '#fd7e14', -- Bright Orange
    '#20c997', -- Mint
    '#ff6b6b', -- Coral
    '#4ecdc4', -- Turquoise
    '#95e1d3', -- Light Teal
    '#f38181'  -- Light Red
  ];
  selected_color TEXT;
  color_index INT;
  contact_count INT := 0;
BEGIN
  FOR contact_record IN 
    SELECT id, name FROM contacts
  LOOP
    -- Select color cyclically from palette
    color_index := (contact_count % array_length(color_palette, 1)) + 1;
    selected_color := color_palette[color_index];
    
    -- Create calendar for this contact
    INSERT INTO calendars (name, color, is_active, contact_id, created_at, updated_at)
    VALUES (
      contact_record.name,
      selected_color,
      true,
      contact_record.id,
      now(),
      now()
    )
    ON CONFLICT (contact_id) DO NOTHING;
    
    contact_count := contact_count + 1;
  END LOOP;
END $$;

-- Randomly reassign all calendar events to contact calendars
DO $$
DECLARE
  event_record RECORD;
  random_calendar_id UUID;
  calendar_ids UUID[];
BEGIN
  -- Get all calendar IDs into an array
  SELECT ARRAY_AGG(id) INTO calendar_ids FROM calendars WHERE contact_id IS NOT NULL;
  
  -- Only proceed if we have calendars
  IF calendar_ids IS NOT NULL AND array_length(calendar_ids, 1) > 0 THEN
    -- Update each calendar event with a random calendar
    FOR event_record IN 
      SELECT id FROM calendar_events
    LOOP
      -- Pick a random calendar from the array
      random_calendar_id := calendar_ids[1 + floor(random() * array_length(calendar_ids, 1))::int];
      
      -- Update the event
      UPDATE calendar_events 
      SET calendar_id = random_calendar_id
      WHERE id = event_record.id;
    END LOOP;
  END IF;
END $$;
