/*
  # Seed action plans across different plan types

  1. New Data
    - Adds sample action plans for each plan type category
    - Connection Plans (existing data remains)
    - Conversion Plans - for converting leads to customers
    - Retention Plans - for retaining existing customers
    - Events Plans - for event-based follow-ups
    - Seasonal Plans - for seasonal campaigns
    - Parallel Trigger Plans - for concurrent triggers

  2. Purpose
    - Demonstrates the action plan categorization system
    - Provides sample data for testing the grouped dropdown
*/

INSERT INTO connection_plans (name, description, contact_types, is_active, plan_type)
SELECT * FROM (VALUES
  ('Lead Conversion Fast Track', 'Aggressive follow-up for hot leads', 'Clients', true, 'Conversion Plans'),
  ('Standard Conversion Flow', 'Standard lead nurturing sequence', 'Clients', true, 'Conversion Plans'),
  ('Enterprise Conversion', 'Multi-touch enterprise conversion', 'Clients, Partner', true, 'Conversion Plans'),
  ('Customer Loyalty Program', 'Monthly check-ins with existing customers', 'Clients', true, 'Retention Plans'),
  ('Win-Back Campaign', 'Re-engage inactive customers', 'Clients', true, 'Retention Plans'),
  ('VIP Customer Care', 'Premium support for top customers', 'Clients', true, 'Retention Plans'),
  ('Trade Show Follow-Up', 'Post-event lead nurturing', 'Clients, Partner', true, 'Events Plans'),
  ('Webinar Attendee Sequence', 'Follow-up for webinar participants', 'Clients', true, 'Events Plans'),
  ('Conference Networking', 'Connect after conferences', 'Partner, Vendor', true, 'Events Plans'),
  ('Spring Campaign', 'Q1 seasonal outreach', 'Clients', true, 'Seasonal Plans'),
  ('Summer Special', 'Q2 seasonal promotions', 'Clients', true, 'Seasonal Plans'),
  ('Holiday Greetings', 'Q4 holiday outreach', 'Clients, Partner, Vendor', true, 'Seasonal Plans'),
  ('Multi-Channel Blast', 'Simultaneous email, SMS, and call', 'Clients', true, 'Parallel Trigger Plans'),
  ('Urgent Response Protocol', 'High-priority parallel outreach', 'Clients', true, 'Parallel Trigger Plans')
) AS v(name, description, contact_types, is_active, plan_type)
WHERE NOT EXISTS (
  SELECT 1 FROM connection_plans WHERE connection_plans.name = v.name
);