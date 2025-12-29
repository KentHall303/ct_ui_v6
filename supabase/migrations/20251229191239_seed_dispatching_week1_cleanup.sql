/*
  # Cleanup existing dispatching events

  1. Overview
    - Removes existing calendar events for the 5 main subcontractors
    - Prepares for fresh 2-week seed data
*/

DELETE FROM calendar_events WHERE user_id IN (
  'b1111111-1111-1111-1111-111111111111',
  'b2222222-2222-2222-2222-222222222222',
  'b3333333-3333-3333-3333-333333333333',
  'b4444444-4444-4444-4444-444444444444',
  'b5555555-5555-5555-5555-555555555555'
);
