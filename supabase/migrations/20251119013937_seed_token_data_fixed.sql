/*
  # Seed Token Data

  Seeds the token_categories and tokens tables with existing token data
  from the application's tokenData.ts file.
*/

-- Insert token categories in the correct order
INSERT INTO token_categories (name, display_order, is_active) VALUES
('Contact', 1, true),
('User Custom Fields', 2, true),
('Common Custom Fields', 3, true),
('Hosted Pages', 4, true),
('External Integration Ids', 5, true),
('Custom Option', 6, true),
('Logged in User', 7, true),
('Bot Appointments', 8, true),
('Account', 9, true),
('Appointments', 10, true),
('Current Date-Time', 11, true),
('Holiday and OoO', 12, true),
('Proposals', 13, true),
('Work Orders', 14, true)
ON CONFLICT DO NOTHING;

-- Insert Contact category tokens
INSERT INTO tokens (category_id, token_value, display_order, is_active)
SELECT tc.id, t.token_value, t.display_order, true
FROM token_categories tc,
LATERAL (VALUES
  ('Contact Id', 1),
  ('Contact Link', 2),
  ('First Name', 3),
  ('Last Name', 4),
  ('Company Name', 5),
  ('Opportunity Name', 6),
  ('Assigned User', 7),
  ('Action Plan', 8),
  ('Address', 9),
  ('City', 10),
  ('State', 11),
  ('Zip Code', 12),
  ('Email', 13),
  ('Home Phone', 14),
  ('Cell Phone', 15),
  ('Contact Type', 16),
  ('Job Title', 17),
  ('Deal Size', 18),
  ('Deal Closed', 19),
  ('Age', 20),
  ('Education', 21),
  ('Gender', 22),
  ('Lead Source', 23),
  ('Sales Cycle Name', 24),
  ('Sales Cycle ID', 25),
  ('High Net Worth', 26),
  ('Home Owner Status', 27),
  ('Household Income', 28),
  ('Length of Residence', 29),
  ('Market Value', 30),
  ('Marital Status', 31),
  ('Occupation', 32),
  ('Presence of Children', 33),
  ('Presence of Pets', 34),
  ('Anniversary 1', 35),
  ('Anniversary 2', 36),
  ('Clients Date Last', 37),
  ('Clients Date Next', 38),
  ('Facebook', 39),
  ('LinkedIn', 40),
  ('Twitter', 41),
  ('Payment', 42),
  ('Whiteboard', 43),
  ('Created Date', 44),
  ('Close Date', 45),
  ('UTM Source', 46),
  ('UTM Medium', 47),
  ('UTM Campaign', 48),
  ('UTM Term', 49),
  ('UTM Content', 50),
  ('UTM Three', 51),
  ('UTM Five', 52),
  ('Star Icon', 53),
  ('Fire Icon', 54),
  ('Days In Column', 55)
) AS t(token_value, display_order)
WHERE tc.name = 'Contact'
ON CONFLICT DO NOTHING;

-- Insert User Custom Fields tokens
INSERT INTO tokens (category_id, token_value, display_order, is_active)
SELECT id, 'Calendly', 1, true
FROM token_categories
WHERE name = 'User Custom Fields'
ON CONFLICT DO NOTHING;

-- Insert Common Custom Fields tokens
INSERT INTO tokens (category_id, token_value, display_order, is_active)
SELECT tc.id, t.token_value, t.display_order, true
FROM token_categories tc,
LATERAL (VALUES
  ('cell', 1),
  ('CCF-TextArea', 2),
  ('Total assets', 3),
  ('Liabilities', 4),
  ('testingURLangel', 5),
  ('start date', 6),
  ('1', 7),
  ('agag', 8),
  ('cellPhone 2', 9),
  ('city State 3', 10),
  ('City State 2', 11),
  ('City State', 12),
  ('color', 13),
  ('date1', 14),
  ('date2', 15),
  ('Example', 16),
  ('Favorite Wood Type', 17),
  ('flkjlj', 18),
  ('g', 19),
  ('ga', 20),
  ('gg', 21),
  ('gageee', 22),
  ('Square Feet', 23),
  ('referral', 24),
  ('RefferalLinkText', 25),
  ('Price / Gal', 26),
  ('Story Points', 27),
  ('Fred''s Phone', 28),
  ('SqFt', 29),
  ('Where Live', 30),
  ('options', 31),
  ('w', 32),
  ('r', 33),
  ('fhsf', 34),
  ('shfhsfh', 35),
  ('No default', 36),
  ('New field', 37),
  ('Opt in Sweepstakes', 38),
  ('text area', 39),
  ('testing spaces', 40),
  ('This is a client custom', 41),
  ('phone', 42),
  ('url', 43)
) AS t(token_value, display_order)
WHERE tc.name = 'Common Custom Fields'
ON CONFLICT DO NOTHING;

-- Insert Hosted Pages tokens
INSERT INTO tokens (category_id, token_value, display_order, is_active)
SELECT tc.id, t.token_value, t.display_order, true
FROM token_categories tc,
LATERAL (VALUES
  ('Align Fields with long labels', 1),
  ('BE Test 1', 2),
  ('Chat Tool 264', 3),
  ('cls', 4),
  ('ct', 5),
  ('CTBlockEditor', 6),
  ('CTSign#988', 7),
  ('DaBot23', 8),
  ('Daily Routes', 9),
  ('DaTest Form', 10),
  ('Enmanuel Test', 11),
  ('FDD delivery System', 12),
  ('FillWithValues', 13),
  ('firsttest', 14),
  ('Illinois Arbitration Accept Reject', 15),
  ('In Home Estimate', 16),
  ('Lead Form Porch', 17),
  ('net worth calc', 18),
  ('New Lead With Mtg', 19),
  ('newScheduler', 20),
  ('newScheduler Ground Zero', 21),
  ('Route scheduling Test', 22),
  ('Sign your life away', 23),
  ('signature', 24),
  ('SIm to Everbowl', 25),
  ('Simple_001', 26),
  ('Test', 27),
  ('TESTING ERROR', 28),
  ('Testing102', 29),
  ('The sign page', 30),
  ('x State Requirements', 31),
  ('Z Text Area test', 32),
  ('Z-noLeadRoutingTest', 33)
) AS t(token_value, display_order)
WHERE tc.name = 'Hosted Pages'
ON CONFLICT DO NOTHING;

-- Insert External Integration Ids tokens
INSERT INTO tokens (category_id, token_value, display_order, is_active)
SELECT id, 'CT External Id', 1, true
FROM token_categories
WHERE name = 'External Integration Ids'
ON CONFLICT DO NOTHING;

-- Insert Custom Option tokens
INSERT INTO tokens (category_id, token_value, display_order, is_active)
SELECT id, 'User Defined', 1, true
FROM token_categories
WHERE name = 'Custom Option'
ON CONFLICT DO NOTHING;

-- Insert Logged in User tokens
INSERT INTO tokens (category_id, token_value, display_order, is_active)
SELECT tc.id, t.token_value, t.display_order, true
FROM token_categories tc,
LATERAL (VALUES
  ('User ID', 1),
  ('User First Name', 2),
  ('User Last Name', 3),
  ('User Phone', 4),
  ('User Email', 5)
) AS t(token_value, display_order)
WHERE tc.name = 'Logged in User'
ON CONFLICT DO NOTHING;

-- Insert Bot Appointments tokens
INSERT INTO tokens (category_id, token_value, display_order, is_active)
SELECT id, 'Tech Feature Review', 1, true
FROM token_categories
WHERE name = 'Bot Appointments'
ON CONFLICT DO NOTHING;

-- Insert Account tokens
INSERT INTO tokens (category_id, token_value, display_order, is_active)
SELECT tc.id, t.token_value, t.display_order, true
FROM token_categories tc,
LATERAL (VALUES
  ('Account First Name', 1),
  ('Account Last Name', 2),
  ('Account Phone', 3),
  ('Account Office Phone', 4),
  ('Account System Phone', 5),
  ('Account Email', 6),
  ('Account Address 1', 7),
  ('Account Address 2', 8),
  ('Account Address 3', 9),
  ('Account Company Name', 10),
  ('Account Web Address', 11),
  ('Account Web Key', 12),
  ('Account X Access Token', 13),
  ('Account Owner', 14),
  ('Reputation Link', 15),
  ('Reputation Link V2', 16)
) AS t(token_value, display_order)
WHERE tc.name = 'Account'
ON CONFLICT DO NOTHING;

-- Insert Appointments tokens
INSERT INTO tokens (category_id, token_value, display_order, is_active)
SELECT tc.id, t.token_value, t.display_order, true
FROM token_categories tc,
LATERAL (VALUES
  ('Next Appointment Start Date', 1),
  ('Next Appointment Start Time', 2),
  ('Next Appointment End Date', 3),
  ('Next Appointment End Time', 4),
  ('Next All Appointment Start DateTime', 5),
  ('Next All Appointment End DateTime', 6)
) AS t(token_value, display_order)
WHERE tc.name = 'Appointments'
ON CONFLICT DO NOTHING;

-- Insert Current Date-Time tokens
INSERT INTO tokens (category_id, token_value, display_order, is_active)
SELECT tc.id, t.token_value, t.display_order, true
FROM token_categories tc,
LATERAL (VALUES
  ('Today Date (m/d/Y)', 1),
  ('Today DateTime (Y-m-d H:i:s)', 2)
) AS t(token_value, display_order)
WHERE tc.name = 'Current Date-Time'
ON CONFLICT DO NOTHING;

-- Insert Holiday and OoO tokens
INSERT INTO tokens (category_id, token_value, display_order, is_active)
SELECT tc.id, t.token_value, t.display_order, true
FROM token_categories tc,
LATERAL (VALUES
  ('Vacation Title', 1),
  ('Vacation Start Date', 2),
  ('Vacation End Date', 3),
  ('Return Vacation Date (Next day of Vacation End Date)', 4)
) AS t(token_value, display_order)
WHERE tc.name = 'Holiday and OoO'
ON CONFLICT DO NOTHING;

-- Insert Proposals tokens
INSERT INTO tokens (category_id, token_value, display_order, is_active)
SELECT tc.id, t.token_value, t.display_order, true
FROM token_categories tc,
LATERAL (VALUES
  ('Estimator', 1),
  ('Quote Number', 2),
  ('Proposal ID', 3),
  ('Proposal Link', 4),
  ('Long Proposal Link', 5),
  ('Proposal Field Manager Link', 6),
  ('Proposal Invoice Link', 7),
  ('Proposal Quote Number', 8),
  ('Proposal Change Order Link', 9),
  ('Proposal Punch List Link', 10),
  ('Proposal Presentation Button', 11),
  ('Proposal Presentation Link', 12)
) AS t(token_value, display_order)
WHERE tc.name = 'Proposals'
ON CONFLICT DO NOTHING;

-- Insert Work Orders tokens
INSERT INTO tokens (category_id, token_value, display_order, is_active)
SELECT tc.id, t.token_value, t.display_order, true
FROM token_categories tc,
LATERAL (VALUES
  ('WO Link', 1),
  ('WO Start Date', 2),
  ('WO End Date', 3),
  ('WO Subcontractor Name', 4),
  ('WO Subcontractor Email', 5)
) AS t(token_value, display_order)
WHERE tc.name = 'Work Orders'
ON CONFLICT DO NOTHING;