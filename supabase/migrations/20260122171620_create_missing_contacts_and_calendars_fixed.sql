/*
  # Create Missing Contacts and Calendars for Event Linking

  1. Purpose
    - Create contacts for last names that appear in event titles but don't have matching contacts
    - Create associated calendars with unique colors for each new contact
    - Link remaining unlinked events to their calendars

  2. Changes
    - Inserts new contacts with required fields
    - Creates calendars linked to each new contact
    - Updates calendar_events to link to correct calendars
*/

DO $$
DECLARE
  new_contact_id UUID;
  color_palette TEXT[] := ARRAY[
    '#198754', '#0d6efd', '#6610f2', '#fd7e14', '#0dcaf0',
    '#20c997', '#ffc107', '#d63384', '#dc3545', '#6c757d',
    '#17a2b8', '#28a745', '#e83e8c', '#6f42c1', '#ff6b6b',
    '#4ecdc4', '#95e1d3', '#f38181', '#2ecc71', '#3498db',
    '#9b59b6', '#e67e22', '#1abc9c', '#f1c40f', '#e74c3c'
  ];
  color_index INT := 0;
  missing_names TEXT[][] := ARRAY[
    ARRAY['Michael', 'Adams'],
    ARRAY['Sarah', 'Bailey'],
    ARRAY['Robert', 'Baker'],
    ARRAY['Linda', 'Bell'],
    ARRAY['William', 'Bennett'],
    ARRAY['Patricia', 'Brooks'],
    ARRAY['James', 'Campbell'],
    ARRAY['Barbara', 'Carter'],
    ARRAY['David', 'Chen'],
    ARRAY['Susan', 'Collins'],
    ARRAY['Richard', 'Cook'],
    ARRAY['Jessica', 'Cooper'],
    ARRAY['Charles', 'Cox'],
    ARRAY['Karen', 'Edwards'],
    ARRAY['Thomas', 'Evans'],
    ARRAY['Maria', 'Gonzalez'],
    ARRAY['Steven', 'Gray'],
    ARRAY['Nancy', 'Hernandez'],
    ARRAY['Mark', 'Hill'],
    ARRAY['Betty', 'Howard'],
    ARRAY['Paul', 'Jackson'],
    ARRAY['Dorothy', 'James'],
    ARRAY['Andrew', 'Kelly'],
    ARRAY['Lisa', 'Martin'],
    ARRAY['Joshua', 'Miller'],
    ARRAY['Sandra', 'Mitchell'],
    ARRAY['Kenneth', 'Moore'],
    ARRAY['Ashley', 'Morgan'],
    ARRAY['Kevin', 'Morris'],
    ARRAY['Kimberly', 'Murphy'],
    ARRAY['Brian', 'Nelson'],
    ARRAY['Donna', 'Parker'],
    ARRAY['George', 'Perez'],
    ARRAY['Michelle', 'Peterson'],
    ARRAY['Edward', 'Phillips'],
    ARRAY['Carol', 'Price'],
    ARRAY['Ronald', 'Ramirez'],
    ARRAY['Amanda', 'Reed'],
    ARRAY['Timothy', 'Richardson'],
    ARRAY['Deborah', 'Rivera'],
    ARRAY['Jason', 'Roberts'],
    ARRAY['Stephanie', 'Robinson'],
    ARRAY['Ryan', 'Rogers'],
    ARRAY['Rebecca', 'Sanchez'],
    ARRAY['Jacob', 'Sanders'],
    ARRAY['Sharon', 'Stewart'],
    ARRAY['Gary', 'Thompson'],
    ARRAY['Cynthia', 'Torres'],
    ARRAY['Nicholas', 'Turner'],
    ARRAY['Kathleen', 'Ward'],
    ARRAY['Eric', 'Watson'],
    ARRAY['Anna', 'Williams'],
    ARRAY['Stephen', 'Wood']
  ];
  name_pair TEXT[];
  full_name TEXT;
BEGIN
  FOREACH name_pair SLICE 1 IN ARRAY missing_names
  LOOP
    full_name := name_pair[1] || ' ' || name_pair[2];
    
    IF NOT EXISTS (
      SELECT 1 FROM contacts 
      WHERE UPPER(SPLIT_PART(name, ' ', array_length(string_to_array(name, ' '), 1))) = UPPER(name_pair[2])
    ) THEN
      new_contact_id := gen_random_uuid();
      
      INSERT INTO contacts (id, name, email, cell_phone, contact_type, created_at, updated_at)
      VALUES (
        new_contact_id,
        full_name,
        LOWER(name_pair[1]) || '.' || LOWER(name_pair[2]) || '@example.com',
        '555-' || LPAD((100 + color_index)::TEXT, 3, '0') || '-' || LPAD((1000 + color_index)::TEXT, 4, '0'),
        'Client',
        NOW(),
        NOW()
      );
      
      INSERT INTO calendars (id, name, color, is_active, contact_id, created_at, updated_at)
      VALUES (
        gen_random_uuid(),
        full_name,
        color_palette[1 + (color_index % array_length(color_palette, 1))],
        true,
        new_contact_id,
        NOW(),
        NOW()
      );
      
      color_index := color_index + 1;
    END IF;
  END LOOP;
END $$;

UPDATE calendar_events ce
SET calendar_id = cal.id
FROM calendars cal
JOIN contacts con ON cal.contact_id = con.id
WHERE ce.calendar_id IS NULL
  AND cal.is_active = true
  AND UPPER(SPLIT_PART(ce.title, ' ', 1)) = UPPER(SPLIT_PART(con.name, ' ', array_length(string_to_array(con.name, ' '), 1)));
