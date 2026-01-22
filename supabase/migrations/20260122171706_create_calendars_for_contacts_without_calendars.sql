/*
  # Create Calendars for Contacts Without Calendars

  1. Purpose
    - Create calendars for existing contacts that don't have one
    - Link remaining unlinked events to their calendars

  2. Changes
    - Creates calendars for contacts missing them
    - Updates calendar_events to link to correct calendars
*/

INSERT INTO calendars (id, name, color, is_active, contact_id, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  c.name,
  (ARRAY['#198754', '#0d6efd', '#6610f2', '#fd7e14', '#0dcaf0', '#20c997', '#ffc107', '#d63384', '#dc3545', '#17a2b8', '#28a745', '#e83e8c', '#6f42c1', '#ff6b6b', '#4ecdc4'])[1 + (ROW_NUMBER() OVER (ORDER BY c.name) % 15)],
  true,
  c.id,
  NOW(),
  NOW()
FROM contacts c
WHERE NOT EXISTS (
  SELECT 1 FROM calendars cal WHERE cal.contact_id = c.id
);

UPDATE calendar_events ce
SET calendar_id = cal.id
FROM calendars cal
JOIN contacts con ON cal.contact_id = con.id
WHERE ce.calendar_id IS NULL
  AND cal.is_active = true
  AND con.name ILIKE SPLIT_PART(ce.title, ' ', 1) || '%';
