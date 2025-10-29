/*
  # Add More Pipeline Sample Data

  ## Overview
  Adds additional sample opportunities to the pipeline to test vertical scrolling
  functionality in the Kanban board view.

  ## Data Added
  - Additional opportunities spread across different sales cycle stages
  - Variety of contact types, estimated values, and lead sources
  - Realistic company names and contact information
  
  ## Purpose
  - Enable testing of vertical scroll in pipeline columns
  - Provide sufficient data volume to verify UI behavior
  - Demonstrate handling of multiple cards per column
*/

DO $$
DECLARE
  cycle_lead uuid;
  cycle_qualified uuid;
  cycle_meeting uuid;
  cycle_proposal uuid;
  cycle_negotiation uuid;
  cycle_won uuid;
  cycle_lost uuid;
BEGIN
  -- Get sales cycle IDs
  SELECT id INTO cycle_lead FROM sales_cycles WHERE name = 'Lead';
  SELECT id INTO cycle_qualified FROM sales_cycles WHERE name = 'Qualified';
  SELECT id INTO cycle_meeting FROM sales_cycles WHERE name = 'Meeting Scheduled';
  SELECT id INTO cycle_proposal FROM sales_cycles WHERE name = 'Proposal Sent';
  SELECT id INTO cycle_negotiation FROM sales_cycles WHERE name = 'Negotiation';
  SELECT id INTO cycle_won FROM sales_cycles WHERE name = 'Won';
  SELECT id INTO cycle_lost FROM sales_cycles WHERE name = 'Lost';

  -- Insert additional opportunities
  INSERT INTO opportunities (contact_name, company_name, email, phone, sales_cycle_id, estimated_value, priority, lead_source, contact_type) VALUES
    -- Lead column - add more records
    ('Robert Johnson', 'Johnson Manufacturing', 'robert@johnsonmfg.com', '555-0101', cycle_lead, 42000, 'high', 'Website', 'Client'),
    ('Lisa Chen', 'Chen Technologies', 'lisa@chentech.com', '555-0102', cycle_lead, 18500, 'medium', 'Referral', 'Prospect'),
    ('David Martinez', 'Martinez Consulting', 'david@martinezconsult.com', '555-0103', cycle_lead, 32000, 'high', 'Cold Call', 'Client'),
    ('Jennifer White', 'White Industries', 'jennifer@whiteindustries.com', '555-0104', cycle_lead, 15000, 'low', 'Website', 'Prospect'),
    ('Michael Brown', 'Brown & Associates', 'michael@brownassoc.com', '555-0105', cycle_lead, 55000, 'high', 'Referral', 'Client'),
    ('Amanda Taylor', 'Taylor Solutions', 'amanda@taylorsol.com', '555-0106', cycle_lead, 28000, 'medium', 'Trade Show', 'Prospect'),
    
    -- Qualified column - add more records
    ('Christopher Davis', 'Davis Enterprises', 'chris@davisenterprise.com', '555-0201', cycle_qualified, 65000, 'high', 'Referral', 'Client'),
    ('Jessica Wilson', 'Wilson Corporation', 'jessica@wilsoncorp.com', '555-0202', cycle_qualified, 38000, 'medium', 'Website', 'Client'),
    ('Matthew Anderson', 'Anderson Group', 'matt@andersongroup.com', '555-0203', cycle_qualified, 47000, 'high', 'Cold Call', 'Prospect'),
    ('Nicole Thomas', 'Thomas Tech', 'nicole@thomastech.com', '555-0204', cycle_qualified, 22000, 'low', 'Referral', 'Client'),
    ('Daniel Jackson', 'Jackson Industries', 'daniel@jacksonind.com', '555-0205', cycle_qualified, 71000, 'high', 'Website', 'Client'),
    
    -- Meeting Scheduled column - add more records
    ('Ashley Martinez', 'Martinez Corp', 'ashley@martinezcorp.com', '555-0301', cycle_meeting, 52000, 'high', 'Referral', 'Client'),
    ('Ryan Thompson', 'Thompson LLC', 'ryan@thompsonllc.com', '555-0302', cycle_meeting, 31000, 'medium', 'Cold Call', 'Prospect'),
    ('Lauren Garcia', 'Garcia Solutions', 'lauren@garciasol.com', '555-0303', cycle_meeting, 44000, 'high', 'Website', 'Client'),
    ('Brandon Lee', 'Lee Enterprises', 'brandon@leeenterprises.com', '555-0304', cycle_meeting, 29000, 'medium', 'Referral', 'Prospect'),
    ('Stephanie Moore', 'Moore Industries', 'stephanie@mooreind.com', '555-0305', cycle_meeting, 63000, 'high', 'Trade Show', 'Client'),
    
    -- Proposal Sent column - add more records
    ('Justin Clark', 'Clark Technologies', 'justin@clarktech.com', '555-0401', cycle_proposal, 85000, 'high', 'Referral', 'Client'),
    ('Megan Rodriguez', 'Rodriguez Group', 'megan@rodriguezgroup.com', '555-0402', cycle_proposal, 39000, 'medium', 'Website', 'Prospect'),
    ('Kevin Lewis', 'Lewis Corporation', 'kevin@lewiscorp.com', '555-0403', cycle_proposal, 56000, 'high', 'Cold Call', 'Client'),
    ('Rachel Walker', 'Walker Solutions', 'rachel@walkersol.com', '555-0404', cycle_proposal, 41000, 'medium', 'Referral', 'Client'),
    
    -- Negotiation column - add more records
    ('Andrew Hall', 'Hall Industries', 'andrew@hallind.com', '555-0501', cycle_negotiation, 95000, 'high', 'Referral', 'Client'),
    ('Brittany Allen', 'Allen Enterprises', 'brittany@allenent.com', '555-0502', cycle_negotiation, 48000, 'medium', 'Website', 'Client'),
    ('Jacob Young', 'Young Corporation', 'jacob@youngcorp.com', '555-0503', cycle_negotiation, 72000, 'high', 'Trade Show', 'Client'),
    
    -- Won column - add more records
    ('Victoria King', 'King Technologies', 'victoria@kingtech.com', '555-0601', cycle_won, 120000, 'high', 'Referral', 'Client'),
    ('Nathan Wright', 'Wright Solutions', 'nathan@wrightsol.com', '555-0602', cycle_won, 67000, 'medium', 'Website', 'Client'),
    ('Samantha Lopez', 'Lopez Enterprises', 'samantha@lopezent.com', '555-0603', cycle_won, 88000, 'high', 'Cold Call', 'Client'),
    
    -- Lost column - add more records
    ('Eric Hill', 'Hill Corporation', 'eric@hillcorp.com', '555-0701', cycle_lost, 35000, 'low', 'Website', 'Prospect'),
    ('Michelle Green', 'Green Industries', 'michelle@greenind.com', '555-0702', cycle_lost, 42000, 'medium', 'Cold Call', 'Prospect')
  ON CONFLICT DO NOTHING;
END $$;