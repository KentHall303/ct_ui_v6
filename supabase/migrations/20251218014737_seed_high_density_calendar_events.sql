/*
  # Seed High-Density Calendar Events for Testing Space-Adaptive Views

  1. Overview
    - Creates multiple events on specific dates to trigger the compact/aggregated view
    - Target dates: December 18, 19, 20, 22, 2025 and January 6, 7, 2026
    - Each high-density day has 6-10 events across different calendars
    - This allows testing of the space-adaptive calendar display

  2. Events Distribution
    - 8 events on December 18, 2025 (today)
    - 7 events on December 19, 2025
    - 6 events on December 20, 2025
    - 8 events on December 22, 2025
    - 9 events on January 6, 2026
    - 7 events on January 7, 2026

  3. Calendars Used
    - Product Design (11111111-...) - green
    - Software Engineering (22222222-...) - blue
    - User Research (33333333-...) - teal
    - Marketing (44444444-...) - orange
    - Client Meetings (55555555-...) - coral
*/

INSERT INTO calendar_events (title, description, calendar_id, event_type, status, start_date, end_date, is_all_day, contact_name, quote_number) VALUES
-- December 18, 2025 - 8 events (today - high density day)
('Client Kickoff Meeting', 'Initial kickoff with new client', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-12-18 08:00:00+00', '2025-12-18 09:00:00+00', false, 'Sarah Johnson', 'Q-2025-001'),
('Design System Review', 'Quarterly review of design components', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-12-18 09:30:00+00', '2025-12-18 10:30:00+00', false, 'Mike Chen', NULL),
('Sprint Planning Session', 'Plan Q1 development sprint', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-12-18 11:00:00+00', '2025-12-18 12:30:00+00', false, 'David Park', NULL),
('User Interview - Beta Tester', 'Interview with key beta user', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-12-18 13:00:00+00', '2025-12-18 14:00:00+00', false, 'Emily White', NULL),
('Marketing Strategy Sync', 'Align on Q1 marketing initiatives', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-12-18 14:30:00+00', '2025-12-18 15:30:00+00', false, 'Lisa Brown', NULL),
('Code Review Session', 'Review pending pull requests', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-12-18 15:00:00+00', '2025-12-18 16:00:00+00', false, 'Tom Wilson', NULL),
('Client Progress Update', 'Weekly status update call', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-12-18 16:00:00+00', '2025-12-18 16:30:00+00', false, 'Rachel Adams', 'Q-2025-002'),
('Design Team Standup', 'Daily design team sync', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-12-18 17:00:00+00', '2025-12-18 17:30:00+00', false, NULL, NULL),

-- December 19, 2025 - 7 events
('Prototype Review', 'Review interactive prototypes', '11111111-1111-1111-1111-111111111111', 'quote', 'pending', '2025-12-19 08:30:00+00', '2025-12-19 09:30:00+00', false, 'Anna Lee', NULL),
('Technical Deep Dive', 'Architecture discussion', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-12-19 10:00:00+00', '2025-12-19 11:30:00+00', false, 'James Miller', NULL),
('Usability Testing Session', 'Test new checkout flow', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-12-19 11:00:00+00', '2025-12-19 12:30:00+00', false, 'Karen Davis', NULL),
('Content Planning Meeting', 'Plan holiday content strategy', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-12-19 13:00:00+00', '2025-12-19 14:00:00+00', false, 'Chris Taylor', NULL),
('Client Demo', 'Demo new features', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-12-19 14:30:00+00', '2025-12-19 15:30:00+00', false, 'Nicole Spencer', 'Q-2025-003'),
('Bug Triage Meeting', 'Prioritize bug fixes', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-12-19 15:30:00+00', '2025-12-19 16:30:00+00', false, 'Mark Davidson', NULL),
('Research Synthesis', 'Compile research findings', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-12-19 16:00:00+00', '2025-12-19 17:00:00+00', false, NULL, NULL),

-- December 20, 2025 - 6 events
('Design Workshop', 'Collaborative design session', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-12-20 09:00:00+00', '2025-12-20 11:00:00+00', false, 'Jennifer Clark', NULL),
('Sprint Retrospective', 'End of sprint review', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-12-20 11:00:00+00', '2025-12-20 12:00:00+00', false, 'Robert Kim', NULL),
('Customer Interview', 'Interview enterprise customer', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-12-20 13:00:00+00', '2025-12-20 14:00:00+00', false, 'Patricia Moore', NULL),
('Campaign Review', 'Review ad campaign performance', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-12-20 14:00:00+00', '2025-12-20 15:00:00+00', false, 'William Jones', NULL),
('Stakeholder Update', 'Update key stakeholders', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-12-20 15:00:00+00', '2025-12-20 16:00:00+00', false, 'Elizabeth Garcia', 'Q-2025-004'),
('Team Social', 'Holiday team gathering', '55555555-5555-5555-5555-555555555555', 'follow_up', 'pending', '2025-12-20 17:00:00+00', '2025-12-20 19:00:00+00', false, NULL, NULL),

-- December 22, 2025 - 8 events
('Year-End Design Sync', 'Final design sync of the year', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-12-22 08:00:00+00', '2025-12-22 09:00:00+00', false, 'Brian Anderson', NULL),
('Production Deployment', 'Deploy final release', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-12-22 09:00:00+00', '2025-12-22 11:00:00+00', false, 'Kevin Thomas', NULL),
('Research Planning 2026', 'Plan next year research', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-12-22 10:00:00+00', '2025-12-22 11:30:00+00', false, 'Sandra Martinez', NULL),
('Marketing Wrap-up', 'Year-end marketing review', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-12-22 11:00:00+00', '2025-12-22 12:00:00+00', false, 'Daniel Robinson', NULL),
('Client Thank You Call', 'Holiday appreciation call', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-12-22 13:00:00+00', '2025-12-22 13:30:00+00', false, 'Amanda Lewis', 'Q-2025-005'),
('Infrastructure Review', 'Review system health', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-12-22 14:00:00+00', '2025-12-22 15:00:00+00', false, 'Steven Walker', NULL),
('UX Metrics Review', 'Review UX metrics for quarter', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-12-22 15:00:00+00', '2025-12-22 16:00:00+00', false, 'Michelle Hall', NULL),
('Holiday Planning', 'Plan Q1 launch activities', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-12-22 16:00:00+00', '2025-12-22 17:00:00+00', false, NULL, NULL),

-- January 6, 2026 - 9 events (first Monday of new year - very busy)
('New Year Kickoff', 'Team kickoff for 2026', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2026-01-06 08:00:00+00', '2026-01-06 09:30:00+00', false, 'Company Wide', NULL),
('Q1 Design Planning', 'Plan Q1 design initiatives', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2026-01-06 09:30:00+00', '2026-01-06 11:00:00+00', false, 'Design Team', NULL),
('Engineering Sync', 'Sync on Q1 engineering goals', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2026-01-06 10:00:00+00', '2026-01-06 11:30:00+00', false, 'Engineering Lead', NULL),
('Research Kickoff', 'Start new research initiative', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2026-01-06 11:00:00+00', '2026-01-06 12:00:00+00', false, 'Research Team', NULL),
('Marketing Strategy', '2026 marketing strategy', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2026-01-06 13:00:00+00', '2026-01-06 14:30:00+00', false, 'Marketing Team', NULL),
('Client Renewal Discussion', 'Discuss contract renewal', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2026-01-06 14:00:00+00', '2026-01-06 15:00:00+00', false, 'Alex Thompson', 'Q-2026-001'),
('Sprint 1 Planning', 'Plan first sprint of 2026', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2026-01-06 15:00:00+00', '2026-01-06 16:30:00+00', false, 'Scrum Team', NULL),
('Design Review', 'Review holiday design work', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2026-01-06 16:00:00+00', '2026-01-06 17:00:00+00', false, 'Design Lead', NULL),
('All Hands Meeting', 'Company all hands', '55555555-5555-5555-5555-555555555555', 'follow_up', 'active', '2026-01-06 17:00:00+00', '2026-01-06 18:00:00+00', false, 'All Staff', NULL),

-- January 7, 2026 - 7 events
('Component Library Update', 'Update shared components', '11111111-1111-1111-1111-111111111111', 'quote', 'pending', '2026-01-07 09:00:00+00', '2026-01-07 10:30:00+00', false, 'UI Team', NULL),
('Code Architecture Review', 'Review code architecture', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2026-01-07 10:00:00+00', '2026-01-07 11:30:00+00', false, 'Tech Lead', NULL),
('User Testing Schedule', 'Plan Q1 testing schedule', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2026-01-07 11:00:00+00', '2026-01-07 12:00:00+00', false, 'UX Team', NULL),
('Campaign Launch Meeting', 'Launch Q1 campaign', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2026-01-07 13:00:00+00', '2026-01-07 14:00:00+00', false, 'Campaign Manager', NULL),
('New Client Onboarding', 'Onboard enterprise client', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2026-01-07 14:00:00+00', '2026-01-07 15:30:00+00', false, 'Jessica Martinez', 'Q-2026-002'),
('Technical Debt Review', 'Review and prioritize tech debt', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2026-01-07 15:00:00+00', '2026-01-07 16:00:00+00', false, 'Backend Team', NULL),
('Competitive Analysis', 'Review competitor updates', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2026-01-07 16:00:00+00', '2026-01-07 17:00:00+00', false, 'Strategy Team', NULL);
