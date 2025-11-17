/*
  # Seed COGS Items Data

  1. Purpose
    - Populate the cogs_items table with comprehensive cost tracking data
    - Provide realistic labor and material costs across different proposals
    - Support financial reporting, profit margin analysis, and cost management
    - Demonstrate various cost scenarios and subcontractor tracking

  2. Data Inserted
    - 40 COGS items across multiple proposals
    - Mix of labor and material costs
    - Various subcontractors and material sources
    - Paid and unpaid status examples
    - Realistic cost amounts for different project types

  3. Fields Populated
    - proposal_id: Reference to quote/proposal number
    - name: Description of labor or material item
    - cost: Cost amount in dollars
    - type: Either 'labor' or 'material'
    - subcontractor: Name of subcontractor (for labor items)
    - material_source: Source vendor (for material items)
    - is_paid: Payment status
    - labor_hours: Hours worked (for labor items)
    - hourly_rate: Rate per hour (for labor items)
    - receipt_image_url: Optional receipt reference
    - created_by: Set to null for demo data

  4. Important Notes
    - Costs are distributed across proposals from calendar events
    - Labor items include subcontractor assignments
    - Material items include source information
    - Some items marked as unpaid to show outstanding costs
    - Proposal IDs reference quotes from calendar events seed data
*/

-- Insert comprehensive COGS items data
INSERT INTO cogs_items (
  proposal_id,
  name,
  cost,
  type,
  subcontractor,
  material_source,
  is_paid,
  labor_hours,
  hourly_rate,
  created_by
) VALUES
  -- Kitchen Remodel (Quote #150) - Multiple labor and material costs
  ('Quote #150', 'Cabinet Installation Labor', 3200.00, 'labor', 'Precision Carpentry Co.', NULL, true, 40, 80.00, NULL),
  ('Quote #150', 'Plumbing Rough-In', 2400.00, 'labor', 'Elite Plumbing Services', NULL, true, 24, 100.00, NULL),
  ('Quote #150', 'Electrical Work', 1800.00, 'labor', 'ProWire Electrical', NULL, true, 18, 100.00, NULL),
  ('Quote #150', 'Kitchen Cabinets', 12500.00, 'material', NULL, 'Cabinet World Supply', true, NULL, NULL, NULL),
  ('Quote #150', 'Quartz Countertops', 5800.00, 'material', NULL, 'Granite & Marble Works', true, NULL, NULL, NULL),
  ('Quote #150', 'Appliances Package', 4200.00, 'material', NULL, 'Best Buy Commercial', true, NULL, NULL, NULL),
  ('Quote #150', 'Tile Backsplash', 680.00, 'material', NULL, 'Master Tile & Stone', true, NULL, NULL, NULL),

  -- Bathroom Renovation (Quote #123)
  ('Quote #123', 'Bathroom Demo and Prep', 1200.00, 'labor', 'Reliable Demolition Co.', NULL, true, 16, 75.00, NULL),
  ('Quote #123', 'Tile Installation Labor', 2400.00, 'labor', 'Master Tile & Stone', NULL, true, 32, 75.00, NULL),
  ('Quote #123', 'Plumbing Installation', 1800.00, 'labor', 'Elite Plumbing Services', NULL, true, 18, 100.00, NULL),
  ('Quote #123', 'Shower Tiles and Materials', 2200.00, 'material', NULL, 'Master Tile & Stone', true, NULL, NULL, NULL),
  ('Quote #123', 'Vanity and Sink', 1850.00, 'material', NULL, 'Bathroom Fixtures Direct', true, NULL, NULL, NULL),
  ('Quote #123', 'Shower Door', 980.00, 'material', NULL, 'Crystal Clear Windows', true, NULL, NULL, NULL),

  -- Roof Replacement (Quote #136)
  ('Quote #136', 'Roof Tear-Off Labor', 2100.00, 'labor', 'Apex Roofing Contractors', NULL, true, 16, 131.25, NULL),
  ('Quote #136', 'Roof Installation Labor', 3800.00, 'labor', 'Apex Roofing Contractors', NULL, true, 32, 118.75, NULL),
  ('Quote #136', 'Architectural Shingles', 4200.00, 'material', NULL, 'Roofing Supply Co.', true, NULL, NULL, NULL),
  ('Quote #136', 'Underlayment and Flashing', 1450.00, 'material', NULL, 'Roofing Supply Co.', true, NULL, NULL, NULL),

  -- Deck Construction (Quote #142)
  ('Quote #142', 'Deck Framing Labor', 1600.00, 'labor', 'Precision Carpentry Co.', NULL, true, 24, 66.67, NULL),
  ('Quote #142', 'Deck Installation Labor', 1800.00, 'labor', 'Precision Carpentry Co.', NULL, true, 24, 75.00, NULL),
  ('Quote #142', 'Composite Decking Material', 3200.00, 'material', NULL, 'Deck Supply Warehouse', true, NULL, NULL, NULL),
  ('Quote #142', 'Railing System', 1400.00, 'material', NULL, 'Deck Supply Warehouse', true, NULL, NULL, NULL),
  ('Quote #142', 'Hardware and Fasteners', 280.00, 'material', NULL, 'Home Depot Pro', true, NULL, NULL, NULL),

  -- Flooring Installation (Quote #174)
  ('Quote #174', 'Floor Preparation Labor', 1200.00, 'labor', 'FloorMaster Installation', NULL, true, 16, 75.00, NULL),
  ('Quote #174', 'Hardwood Installation Labor', 2800.00, 'labor', 'FloorMaster Installation', NULL, false, 40, 70.00, NULL),
  ('Quote #174', 'Red Oak Hardwood Flooring', 4500.00, 'material', NULL, 'Hardwood Flooring Direct', true, NULL, NULL, NULL),
  ('Quote #174', 'Underlayment and Finish', 980.00, 'material', NULL, 'Hardwood Flooring Direct', false, NULL, NULL, NULL),

  -- HVAC Installation (Quote #176)
  ('Quote #176', 'HVAC Installation Labor', 1600.00, 'labor', 'Summit HVAC Solutions', NULL, true, 16, 100.00, NULL),
  ('Quote #176', 'HVAC Unit and Equipment', 4200.00, 'material', NULL, 'HVAC Wholesale Supply', true, NULL, NULL, NULL),
  ('Quote #176', 'Ductwork Materials', 850.00, 'material', NULL, 'HVAC Wholesale Supply', true, NULL, NULL, NULL),

  -- Painting Project (Quote #180)
  ('Quote #180', 'Interior Painting Labor', 1400.00, 'labor', 'Perfect Paint Pros', NULL, true, 20, 70.00, NULL),
  ('Quote #180', 'Paint and Supplies', 450.00, 'material', NULL, 'Sherwin-Williams Pro', true, NULL, NULL, NULL),

  -- Window Installation (Quote #152)
  ('Quote #152', 'Window Installation Labor', 1200.00, 'labor', 'Crystal Clear Windows', NULL, true, 12, 100.00, NULL),
  ('Quote #152', 'Vinyl Windows', 3850.00, 'material', NULL, 'Window World Supply', true, NULL, NULL, NULL),

  -- Larger Commercial Project (Quote #195)
  ('Quote #195', 'General Labor - Week 1', 4500.00, 'labor', 'Multiple Crews', NULL, true, 90, 50.00, NULL),
  ('Quote #195', 'General Labor - Week 2', 4800.00, 'labor', 'Multiple Crews', NULL, true, 96, 50.00, NULL),
  ('Quote #195', 'Materials Package 1', 6200.00, 'material', NULL, 'Commercial Building Supply', true, NULL, NULL, NULL),
  ('Quote #195', 'Materials Package 2', 5800.00, 'material', NULL, 'Commercial Building Supply', false, NULL, NULL, NULL),

  -- Additional Projects
  ('Quote #183', 'Installation Labor', 2400.00, 'labor', 'Precision Carpentry Co.', NULL, true, 32, 75.00, NULL),
  ('Quote #183', 'Materials and Supplies', 2850.00, 'material', NULL, 'General Supply Co.', true, NULL, NULL, NULL),

  ('Quote #185', 'Service Labor', 1800.00, 'labor', 'Elite Plumbing Services', NULL, false, 18, 100.00, NULL),
  ('Quote #185', 'Parts and Materials', 1200.00, 'material', NULL, 'Plumbing Supply House', false, NULL, NULL, NULL)
ON CONFLICT DO NOTHING;
