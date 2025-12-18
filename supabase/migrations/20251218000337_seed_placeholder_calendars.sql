/*
  # Seed Placeholder Calendars

  1. Data
    - Product Design (green) - #48bb78
    - Software Engineering (blue) - #4299e1
    - User Research (teal) - #38b2ac
    - Marketing (orange) - #ed8936
    - Client Meetings (coral) - #fc8181

  2. Notes
    - Each calendar has a distinct color for visual identification
    - Events will inherit their calendar's color
    - Similar to Google Calendar's color system
*/

INSERT INTO calendars (id, name, color, is_active) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Product Design', '#48bb78', true),
  ('22222222-2222-2222-2222-222222222222', 'Software Engineering', '#4299e1', true),
  ('33333333-3333-3333-3333-333333333333', 'User Research', '#38b2ac', true),
  ('44444444-4444-4444-4444-444444444444', 'Marketing', '#ed8936', true),
  ('55555555-5555-5555-5555-555555555555', 'Client Meetings', '#fc8181', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  color = EXCLUDED.color,
  is_active = EXCLUDED.is_active;
