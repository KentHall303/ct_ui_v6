/*
  # Link Calendar Events to Calendars by Name Matching

  1. Purpose
    - Events have titles like "King Exterior Siding" where "King" is a last name
    - Contacts have names like "Elizabeth King" where "King" is their last name
    - Each contact has an associated calendar with a unique color
    - This migration links events to their correct calendars for proper color display

  2. Changes
    - Updates calendar_id on calendar_events table
    - Matches first word of event title to last word of contact name
    - Links through the calendars table via contact_id

  3. Data Affected
    - calendar_events with null calendar_id will be updated
    - Only events whose title starts with a recognized last name will be linked
*/

UPDATE calendar_events ce
SET calendar_id = cal.id
FROM calendars cal
JOIN contacts con ON cal.contact_id = con.id
WHERE ce.calendar_id IS NULL
  AND cal.is_active = true
  AND UPPER(SPLIT_PART(ce.title, ' ', 1)) = UPPER(SPLIT_PART(con.name, ' ', array_length(string_to_array(con.name, ' '), 1)));
