/*
  # Seed Calendar Events for All Weeks of 2025

  1. Overview
    - Creates events distributed across all 52 weeks of 2025
    - Each calendar gets multiple events per month
    - Varied event titles and times throughout the day

  2. Calendars
    - Product Design (11111111-...) - Design meetings, reviews
    - Software Engineering (22222222-...) - Code reviews, sprint planning
    - User Research (33333333-...) - User interviews, testing sessions
    - Marketing (44444444-...) - Campaign meetings, content reviews
    - Client Meetings (55555555-...) - Client calls, presentations

  3. Time Distribution
    - Events spread across 8 AM - 5 PM
    - Mix of 1-hour and 2-hour events
*/

INSERT INTO calendar_events (title, description, calendar_id, event_type, status, start_date, end_date, is_all_day) VALUES
-- January 2025 - Week 1-4
('Client Presentation Preparation', 'Prepare slides for client meeting', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-01-06 08:00:00+00', '2025-01-06 09:00:00+00', false),
('Design Review Session', 'Review latest mockups', '11111111-1111-1111-1111-111111111111', 'quote', 'pending', '2025-01-07 09:00:00+00', '2025-01-07 10:00:00+00', false),
('Sprint Planning', 'Plan Q1 sprint goals', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-01-06 10:00:00+00', '2025-01-06 11:30:00+00', false),
('Code Review Session', 'Review PRs for main branch', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-01-08 14:00:00+00', '2025-01-08 15:00:00+00', false),
('User Interview', 'Interview user about pain points', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-01-07 11:00:00+00', '2025-01-07 12:00:00+00', false),
('Usability Testing', 'Test new feature flow', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-01-09 13:00:00+00', '2025-01-09 14:30:00+00', false),
('Content Planning', 'Plan social media content', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-01-08 09:00:00+00', '2025-01-08 10:00:00+00', false),
('Campaign Review', 'Review Q4 campaign results', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-01-10 10:00:00+00', '2025-01-10 11:00:00+00', false),
('Client Kickoff Call', 'New project kickoff', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-01-06 14:00:00+00', '2025-01-06 15:00:00+00', false),
('Client Feedback Meeting', 'Gather feedback on prototype', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-01-09 15:00:00+00', '2025-01-09 16:00:00+00', false),
-- Week 3-4
('Design Revisions', 'Apply client feedback to designs', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-01-13 09:00:00+00', '2025-01-13 10:30:00+00', false),
('Team Standup', 'Daily standup meeting', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-01-14 09:00:00+00', '2025-01-14 09:30:00+00', false),
('Research Synthesis', 'Compile user research findings', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-01-15 10:00:00+00', '2025-01-15 11:30:00+00', false),
('Brand Workshop', 'Workshop on brand guidelines', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-01-16 13:00:00+00', '2025-01-16 15:00:00+00', false),
('Client Progress Update', 'Weekly progress update', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-01-17 11:00:00+00', '2025-01-17 12:00:00+00', false),
('Prototype Review', 'Review interactive prototype', '11111111-1111-1111-1111-111111111111', 'quote', 'pending', '2025-01-20 14:00:00+00', '2025-01-20 15:30:00+00', false),
('Architecture Discussion', 'Discuss system architecture', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-01-21 10:00:00+00', '2025-01-21 11:30:00+00', false),
('User Testing Session', 'Conduct user testing', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-01-22 14:00:00+00', '2025-01-22 16:00:00+00', false),
('Marketing Strategy', 'Q1 marketing strategy meeting', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-01-23 09:00:00+00', '2025-01-23 10:30:00+00', false),
('Client Demo', 'Demo new features to client', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-01-24 15:00:00+00', '2025-01-24 16:00:00+00', false),

-- February 2025
('Design System Update', 'Update component library', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-02-03 09:00:00+00', '2025-02-03 10:30:00+00', false),
('Sprint Retrospective', 'Review last sprint', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-02-04 14:00:00+00', '2025-02-04 15:00:00+00', false),
('Focus Group', 'Conduct focus group session', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-02-05 10:00:00+00', '2025-02-05 12:00:00+00', false),
('Email Campaign Review', 'Review email performance', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-02-06 11:00:00+00', '2025-02-06 12:00:00+00', false),
('Quarterly Business Review', 'QBR with client', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-02-07 14:00:00+00', '2025-02-07 16:00:00+00', false),
('Wireframe Workshop', 'Create wireframes for new feature', '11111111-1111-1111-1111-111111111111', 'quote', 'pending', '2025-02-10 09:00:00+00', '2025-02-10 11:00:00+00', false),
('Bug Triage', 'Prioritize bug backlog', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-02-11 10:00:00+00', '2025-02-11 11:00:00+00', false),
('Survey Analysis', 'Analyze user survey results', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-02-12 13:00:00+00', '2025-02-12 14:30:00+00', false),
('Social Media Planning', 'Plan February content', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-02-13 09:00:00+00', '2025-02-13 10:00:00+00', false),
('Contract Renewal Discussion', 'Discuss contract terms', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-02-14 11:00:00+00', '2025-02-14 12:00:00+00', false),
('Design Critique', 'Weekly design critique', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-02-17 14:00:00+00', '2025-02-17 15:30:00+00', false),
('Technical Deep Dive', 'Deep dive on API design', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-02-18 10:00:00+00', '2025-02-18 12:00:00+00', false),
('Competitor Analysis', 'Review competitor products', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-02-19 09:00:00+00', '2025-02-19 10:30:00+00', false),
('Ad Creative Review', 'Review new ad creatives', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-02-20 13:00:00+00', '2025-02-20 14:00:00+00', false),
('Client Status Call', 'Weekly status update', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-02-21 15:00:00+00', '2025-02-21 15:30:00+00', false),

-- March 2025
('Mobile Design Review', 'Review mobile app designs', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-03-03 09:00:00+00', '2025-03-03 10:00:00+00', false),
('DevOps Planning', 'Plan infrastructure updates', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-03-04 10:00:00+00', '2025-03-04 11:30:00+00', false),
('Card Sorting Exercise', 'Information architecture session', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-03-05 14:00:00+00', '2025-03-05 16:00:00+00', false),
('Press Release Draft', 'Review press release', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-03-06 09:00:00+00', '2025-03-06 10:00:00+00', false),
('New Project Discovery', 'Discovery session with new client', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-03-07 13:00:00+00', '2025-03-07 15:00:00+00', false),
('Icon Design Sprint', 'Create new icon set', '11111111-1111-1111-1111-111111111111', 'quote', 'pending', '2025-03-10 09:00:00+00', '2025-03-10 12:00:00+00', false),
('Performance Review', 'Review app performance', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-03-11 14:00:00+00', '2025-03-11 15:30:00+00', false),
('A/B Test Analysis', 'Analyze test results', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-03-12 10:00:00+00', '2025-03-12 11:00:00+00', false),
('Newsletter Planning', 'Plan March newsletter', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-03-13 11:00:00+00', '2025-03-13 12:00:00+00', false),
('Stakeholder Presentation', 'Present to stakeholders', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-03-14 14:00:00+00', '2025-03-14 15:30:00+00', false),
('Animation Workshop', 'Motion design workshop', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-03-17 10:00:00+00', '2025-03-17 12:00:00+00', false),
('Security Audit', 'Review security measures', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-03-18 09:00:00+00', '2025-03-18 11:00:00+00', false),
('Journey Mapping', 'Map user journey', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-03-19 13:00:00+00', '2025-03-19 15:00:00+00', false),
('Event Planning', 'Plan product launch event', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-03-20 09:00:00+00', '2025-03-20 10:30:00+00', false),
('Client Workshop', 'Collaborative workshop', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-03-21 10:00:00+00', '2025-03-21 12:00:00+00', false),

-- April 2025
('Q2 Design Goals', 'Set design goals for Q2', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-04-07 09:00:00+00', '2025-04-07 10:30:00+00', false),
('Tech Debt Review', 'Review technical debt', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-04-08 14:00:00+00', '2025-04-08 15:30:00+00', false),
('Persona Workshop', 'Update user personas', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-04-09 10:00:00+00', '2025-04-09 12:00:00+00', false),
('SEO Strategy', 'Review SEO performance', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-04-10 09:00:00+00', '2025-04-10 10:00:00+00', false),
('Proposal Review', 'Review new proposal', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-04-11 11:00:00+00', '2025-04-11 12:00:00+00', false),
('Accessibility Audit', 'Review accessibility', '11111111-1111-1111-1111-111111111111', 'quote', 'pending', '2025-04-14 10:00:00+00', '2025-04-14 11:30:00+00', false),
('Database Optimization', 'Optimize database queries', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-04-15 09:00:00+00', '2025-04-15 11:00:00+00', false),
('Heuristic Evaluation', 'UX heuristic review', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-04-16 14:00:00+00', '2025-04-16 16:00:00+00', false),
('Influencer Outreach', 'Plan influencer campaign', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-04-17 10:00:00+00', '2025-04-17 11:00:00+00', false),
('Executive Briefing', 'Brief executives on progress', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-04-18 14:00:00+00', '2025-04-18 15:00:00+00', false),
('Style Guide Update', 'Update brand style guide', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-04-21 09:00:00+00', '2025-04-21 10:30:00+00', false),
('API Documentation', 'Write API docs', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-04-22 10:00:00+00', '2025-04-22 12:00:00+00', false),
('Feedback Synthesis', 'Synthesize user feedback', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-04-23 13:00:00+00', '2025-04-23 14:30:00+00', false),
('Partnership Meeting', 'Discuss partnership', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-04-24 11:00:00+00', '2025-04-24 12:00:00+00', false),
('Mid-Project Review', 'Review project progress', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-04-25 15:00:00+00', '2025-04-25 16:30:00+00', false),

-- May 2025
('Design Sprint Kickoff', 'Start design sprint', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-05-05 09:00:00+00', '2025-05-05 10:00:00+00', false),
('Release Planning', 'Plan next release', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-05-06 10:00:00+00', '2025-05-06 12:00:00+00', false),
('Diary Study Review', 'Review diary study results', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-05-07 14:00:00+00', '2025-05-07 15:30:00+00', false),
('Campaign Launch', 'Launch summer campaign', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-05-08 09:00:00+00', '2025-05-08 10:00:00+00', false),
('Client Onboarding', 'Onboard new client', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-05-09 13:00:00+00', '2025-05-09 15:00:00+00', false),
('Color Palette Review', 'Review color system', '11111111-1111-1111-1111-111111111111', 'quote', 'pending', '2025-05-12 10:00:00+00', '2025-05-12 11:00:00+00', false),
('Load Testing', 'Conduct load tests', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-05-13 14:00:00+00', '2025-05-13 16:00:00+00', false),
('Benchmark Study', 'Benchmark against competitors', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-05-14 09:00:00+00', '2025-05-14 10:30:00+00', false),
('Video Content Planning', 'Plan video content', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-05-15 11:00:00+00', '2025-05-15 12:00:00+00', false),
('Budget Review', 'Review project budget', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-05-16 14:00:00+00', '2025-05-16 15:00:00+00', false),
('Typography Workshop', 'Typography standards workshop', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-05-19 09:00:00+00', '2025-05-19 11:00:00+00', false),
('Deployment Planning', 'Plan production deployment', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-05-20 10:00:00+00', '2025-05-20 11:30:00+00', false),
('Usability Report', 'Present usability findings', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-05-21 13:00:00+00', '2025-05-21 14:30:00+00', false),
('ROI Analysis', 'Analyze marketing ROI', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-05-22 09:00:00+00', '2025-05-22 10:00:00+00', false),
('Milestone Celebration', 'Celebrate project milestone', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-05-23 16:00:00+00', '2025-05-23 17:00:00+00', false),

-- June 2025
('Dashboard Design', 'Design new dashboard', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-06-02 09:00:00+00', '2025-06-02 11:00:00+00', false),
('Migration Planning', 'Plan data migration', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-06-03 10:00:00+00', '2025-06-03 12:00:00+00', false),
('Field Study', 'Conduct field research', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-06-04 09:00:00+00', '2025-06-04 17:00:00+00', false),
('Summer Campaign Review', 'Review summer campaign', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-06-05 14:00:00+00', '2025-06-05 15:00:00+00', false),
('Contract Signing', 'Sign new contract', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-06-06 11:00:00+00', '2025-06-06 12:00:00+00', false),
('Component Library', 'Build shared components', '11111111-1111-1111-1111-111111111111', 'quote', 'pending', '2025-06-09 09:00:00+00', '2025-06-09 12:00:00+00', false),
('Code Freeze Planning', 'Plan code freeze', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-06-10 14:00:00+00', '2025-06-10 15:00:00+00', false),
('Survey Design', 'Design user survey', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-06-11 10:00:00+00', '2025-06-11 11:30:00+00', false),
('Trade Show Prep', 'Prepare for trade show', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-06-12 09:00:00+00', '2025-06-12 11:00:00+00', false),
('Scope Review', 'Review project scope', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-06-13 15:00:00+00', '2025-06-13 16:30:00+00', false),
('Design Handoff', 'Handoff to developers', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-06-16 10:00:00+00', '2025-06-16 11:00:00+00', false),
('Integration Testing', 'Test integrations', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-06-17 14:00:00+00', '2025-06-17 17:00:00+00', false),
('Interview Synthesis', 'Synthesize interviews', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-06-18 09:00:00+00', '2025-06-18 11:00:00+00', false),
('PR Strategy', 'Plan PR activities', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-06-19 10:00:00+00', '2025-06-19 11:00:00+00', false),
('Q2 Review', 'Quarterly review with client', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-06-20 14:00:00+00', '2025-06-20 16:00:00+00', false),

-- July 2025
('Summer Design Review', 'Mid-year design review', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-07-07 09:00:00+00', '2025-07-07 10:30:00+00', false),
('Scaling Discussion', 'Discuss scaling needs', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-07-08 10:00:00+00', '2025-07-08 11:30:00+00', false),
('Tree Testing', 'Navigation tree testing', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-07-09 14:00:00+00', '2025-07-09 16:00:00+00', false),
('Content Audit', 'Audit website content', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-07-10 09:00:00+00', '2025-07-10 12:00:00+00', false),
('New Feature Discussion', 'Discuss new feature request', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-07-11 11:00:00+00', '2025-07-11 12:00:00+00', false),
('Dark Mode Design', 'Design dark mode theme', '11111111-1111-1111-1111-111111111111', 'quote', 'pending', '2025-07-14 09:00:00+00', '2025-07-14 11:00:00+00', false),
('Monitoring Setup', 'Set up monitoring', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-07-15 14:00:00+00', '2025-07-15 16:00:00+00', false),
('Concept Testing', 'Test new concepts', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-07-16 10:00:00+00', '2025-07-16 12:00:00+00', false),
('Webinar Planning', 'Plan customer webinar', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-07-17 09:00:00+00', '2025-07-17 10:00:00+00', false),
('Timeline Review', 'Review project timeline', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-07-18 15:00:00+00', '2025-07-18 16:00:00+00', false),
('Responsive Design', 'Review responsive layouts', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-07-21 10:00:00+00', '2025-07-21 11:30:00+00', false),
('Disaster Recovery', 'Plan disaster recovery', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-07-22 09:00:00+00', '2025-07-22 11:00:00+00', false),
('Customer Interview', 'Interview key customer', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-07-23 14:00:00+00', '2025-07-23 15:00:00+00', false),
('Social Listening', 'Review social mentions', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-07-24 10:00:00+00', '2025-07-24 11:00:00+00', false),
('Risk Assessment', 'Assess project risks', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-07-25 11:00:00+00', '2025-07-25 12:30:00+00', false),

-- August 2025
('Design System Audit', 'Audit design system', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-08-04 09:00:00+00', '2025-08-04 11:00:00+00', false),
('Feature Flag Review', 'Review feature flags', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-08-05 10:00:00+00', '2025-08-05 11:00:00+00', false),
('Accessibility Testing', 'Test with screen readers', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-08-06 14:00:00+00', '2025-08-06 16:00:00+00', false),
('Back to School Campaign', 'Plan fall campaign', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-08-07 09:00:00+00', '2025-08-07 10:30:00+00', false),
('Project Checkpoint', 'Monthly checkpoint', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-08-08 14:00:00+00', '2025-08-08 15:00:00+00', false),
('Navigation Redesign', 'Redesign navigation', '11111111-1111-1111-1111-111111111111', 'quote', 'pending', '2025-08-11 09:00:00+00', '2025-08-11 11:00:00+00', false),
('Cache Strategy', 'Plan caching strategy', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-08-12 10:00:00+00', '2025-08-12 11:30:00+00', false),
('Eye Tracking Study', 'Conduct eye tracking', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-08-13 09:00:00+00', '2025-08-13 12:00:00+00', false),
('Email Automation', 'Set up email automation', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-08-14 14:00:00+00', '2025-08-14 15:30:00+00', false),
('Deliverables Review', 'Review deliverables', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-08-15 11:00:00+00', '2025-08-15 12:00:00+00', false),
('Brand Refresh', 'Discuss brand refresh', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-08-18 10:00:00+00', '2025-08-18 11:30:00+00', false),
('Error Handling', 'Review error handling', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-08-19 14:00:00+00', '2025-08-19 15:30:00+00', false),
('Moderated Testing', 'Moderated usability test', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-08-20 10:00:00+00', '2025-08-20 12:00:00+00', false),
('Podcast Strategy', 'Plan podcast content', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-08-21 09:00:00+00', '2025-08-21 10:00:00+00', false),
('Team Building', 'Client team building', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-08-22 15:00:00+00', '2025-08-22 17:00:00+00', false),

-- September 2025
('Fall Design Sprint', 'Kick off fall sprint', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-09-01 09:00:00+00', '2025-09-01 10:00:00+00', false),
('Q3 Tech Review', 'Q3 technical review', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-09-02 10:00:00+00', '2025-09-02 12:00:00+00', false),
('Unmoderated Test Review', 'Review unmoderated tests', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-09-03 14:00:00+00', '2025-09-03 15:30:00+00', false),
('Fall Campaign Launch', 'Launch fall campaign', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-09-04 09:00:00+00', '2025-09-04 10:00:00+00', false),
('Renewal Discussion', 'Discuss contract renewal', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-09-05 11:00:00+00', '2025-09-05 12:00:00+00', false),
('Design Ops Review', 'Review design operations', '11111111-1111-1111-1111-111111111111', 'quote', 'pending', '2025-09-08 09:00:00+00', '2025-09-08 10:30:00+00', false),
('Microservices Review', 'Review architecture', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-09-09 14:00:00+00', '2025-09-09 16:00:00+00', false),
('NPS Analysis', 'Analyze NPS scores', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-09-10 10:00:00+00', '2025-09-10 11:00:00+00', false),
('Customer Story', 'Record customer story', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-09-11 13:00:00+00', '2025-09-11 14:00:00+00', false),
('Budget Planning', 'Plan next year budget', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-09-12 14:00:00+00', '2025-09-12 15:30:00+00', false),
('Form Design', 'Redesign complex forms', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-09-15 09:00:00+00', '2025-09-15 11:00:00+00', false),
('API Versioning', 'Plan API versioning', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-09-16 10:00:00+00', '2025-09-16 11:30:00+00', false),
('Friction Audit', 'Audit user friction', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-09-17 14:00:00+00', '2025-09-17 16:00:00+00', false),
('Awards Submission', 'Prepare award submission', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-09-18 09:00:00+00', '2025-09-18 10:00:00+00', false),
('Q3 Review', 'Quarterly business review', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-09-19 15:00:00+00', '2025-09-19 17:00:00+00', false),

-- October 2025
('October Design Review', 'Monthly design review', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-10-06 09:00:00+00', '2025-10-06 10:30:00+00', false),
('Tech Planning', 'Technology planning', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-10-07 10:00:00+00', '2025-10-07 12:00:00+00', false),
('Customer Feedback', 'Review customer feedback', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-10-08 14:00:00+00', '2025-10-08 15:30:00+00', false),
('Halloween Campaign', 'Plan seasonal campaign', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-10-09 09:00:00+00', '2025-10-09 10:00:00+00', false),
('Expansion Discussion', 'Discuss project expansion', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-10-10 11:00:00+00', '2025-10-10 12:30:00+00', false),
('Search Design', 'Design search experience', '11111111-1111-1111-1111-111111111111', 'quote', 'pending', '2025-10-13 09:00:00+00', '2025-10-13 11:00:00+00', false),
('Incident Review', 'Review recent incident', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-10-14 14:00:00+00', '2025-10-14 15:30:00+00', false),
('Beta Feedback', 'Review beta user feedback', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-10-15 10:00:00+00', '2025-10-15 11:30:00+00', false),
('Year-End Planning', 'Plan year-end activities', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-10-16 13:00:00+00', '2025-10-16 14:30:00+00', false),
('Resource Planning', 'Plan resource allocation', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-10-17 15:00:00+00', '2025-10-17 16:00:00+00', false),
('Notification Design', 'Design notification system', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-10-20 10:00:00+00', '2025-10-20 12:00:00+00', false),
('Logging Review', 'Review logging strategy', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-10-21 09:00:00+00', '2025-10-21 10:30:00+00', false),
('Support Analysis', 'Analyze support tickets', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-10-22 14:00:00+00', '2025-10-22 15:30:00+00', false),
('Conference Prep', 'Prepare for conference', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-10-23 09:00:00+00', '2025-10-23 11:00:00+00', false),
('Success Metrics', 'Review success metrics', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-10-24 11:00:00+00', '2025-10-24 12:00:00+00', false),

-- November 2025
('Q4 Design Goals', 'Set Q4 design goals', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-11-03 09:00:00+00', '2025-11-03 10:30:00+00', false),
('Black Friday Prep', 'Prepare for traffic spike', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-11-04 10:00:00+00', '2025-11-04 12:00:00+00', false),
('User Journey Review', 'Review user journeys', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-11-05 14:00:00+00', '2025-11-05 16:00:00+00', false),
('Holiday Campaign', 'Plan holiday campaign', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-11-06 09:00:00+00', '2025-11-06 10:30:00+00', false),
('Annual Review Prep', 'Prepare annual review', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-11-07 11:00:00+00', '2025-11-07 12:00:00+00', false),
('Onboarding Redesign', 'Redesign onboarding', '11111111-1111-1111-1111-111111111111', 'quote', 'pending', '2025-11-10 09:00:00+00', '2025-11-10 11:00:00+00', false),
('Year-End Freeze', 'Plan code freeze', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-11-11 14:00:00+00', '2025-11-11 15:00:00+00', false),
('Feature Prioritization', 'Prioritize features', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-11-12 10:00:00+00', '2025-11-12 11:30:00+00', false),
('Social Media Review', 'Review social performance', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-11-13 13:00:00+00', '2025-11-13 14:00:00+00', false),
('Contract Extension', 'Discuss contract extension', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-11-14 15:00:00+00', '2025-11-14 16:30:00+00', false),
('Settings Redesign', 'Redesign settings page', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-11-17 09:00:00+00', '2025-11-17 10:30:00+00', false),
('Backup Verification', 'Verify backup systems', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-11-18 10:00:00+00', '2025-11-18 11:00:00+00', false),
('Retention Analysis', 'Analyze user retention', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-11-19 14:00:00+00', '2025-11-19 15:30:00+00', false),
('Gift Guide Content', 'Create gift guide content', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-11-20 09:00:00+00', '2025-11-20 10:00:00+00', false),
('Strategy Session', 'Annual strategy session', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-11-21 10:00:00+00', '2025-11-21 12:00:00+00', false),

-- December 2025
('Year-End Design Review', 'Annual design review', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-12-01 09:00:00+00', '2025-12-01 11:00:00+00', false),
('Capacity Planning', 'Plan next year capacity', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-12-02 10:00:00+00', '2025-12-02 12:00:00+00', false),
('Annual Research Review', 'Review yearly research', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-12-03 14:00:00+00', '2025-12-03 16:00:00+00', false),
('Year in Review', 'Marketing year in review', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-12-04 09:00:00+00', '2025-12-04 10:30:00+00', false),
('Annual Business Review', 'Client annual review', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-12-05 14:00:00+00', '2025-12-05 16:00:00+00', false),
('Design Retrospective', 'Year-end retrospective', '11111111-1111-1111-1111-111111111111', 'quote', 'pending', '2025-12-08 09:00:00+00', '2025-12-08 10:30:00+00', false),
('Knowledge Transfer', 'Document knowledge', '22222222-2222-2222-2222-222222222222', 'installation', 'pending', '2025-12-09 10:00:00+00', '2025-12-09 12:00:00+00', false),
('Insights Report', 'Present research insights', '33333333-3333-3333-3333-333333333333', 'inspection', 'pending', '2025-12-10 14:00:00+00', '2025-12-10 15:30:00+00', false),
('Campaign Results', 'Review campaign results', '44444444-4444-4444-4444-444444444444', 'follow_up', 'active', '2025-12-11 09:00:00+00', '2025-12-11 10:00:00+00', false),
('Thank You Celebration', 'Client appreciation event', '55555555-5555-5555-5555-555555555555', 'quote', 'active', '2025-12-12 16:00:00+00', '2025-12-12 18:00:00+00', false),
('2026 Planning', 'Plan 2026 design roadmap', '11111111-1111-1111-1111-111111111111', 'quote', 'active', '2025-12-15 09:00:00+00', '2025-12-15 11:00:00+00', false),
('Tech Roadmap', 'Plan 2026 tech roadmap', '22222222-2222-2222-2222-222222222222', 'installation', 'active', '2025-12-16 10:00:00+00', '2025-12-16 12:00:00+00', false),
('Research Roadmap', 'Plan 2026 research', '33333333-3333-3333-3333-333333333333', 'inspection', 'active', '2025-12-17 14:00:00+00', '2025-12-17 15:30:00+00', false),
('Marketing Roadmap', 'Plan 2026 marketing', '44444444-4444-4444-4444-444444444444', 'follow_up', 'pending', '2025-12-18 09:00:00+00', '2025-12-18 10:30:00+00', false),
('New Year Kickoff Plan', 'Plan January kickoff', '55555555-5555-5555-5555-555555555555', 'quote', 'pending', '2025-12-19 11:00:00+00', '2025-12-19 12:00:00+00', false),
('Holiday Wishes', 'Send holiday wishes', '55555555-5555-5555-5555-555555555555', 'follow_up', 'active', '2025-12-22 10:00:00+00', '2025-12-22 10:30:00+00', false);
