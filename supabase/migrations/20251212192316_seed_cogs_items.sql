/*
  # Seed COGS Items Data
  
  1. Sample Data
    - Creates 40+ COGS items across different jobs
    - Mix of labor and material costs
    - Includes subcontractor assignments and payment status
  
  2. Cost Details
    - Labor items with hourly rates and hours worked
    - Material items with suppliers and sources
    - Realistic pricing for various trades
    - Mix of paid and unpaid items
*/

INSERT INTO cogs_items (proposal_id, name, cost, type, subcontractor, date, rate, hours, paid, material_source, receipt_image_url, created_by, created_at, updated_at) VALUES
  -- Kitchen Remodel (Job 111...)
  ('e1f9a4b5-5678-4567-89ab-111111111111', 'Cabinet Installation Labor', 2400.00, 'labor', 'Custom Cabinet Masters', now() - interval '50 days', 60.00, 40, true, NULL, NULL, NULL, now() - interval '50 days', now() - interval '50 days'),
  ('e1f9a4b5-5678-4567-89ab-111111111111', 'Kitchen Cabinets', 8500.00, 'material', 'Custom Cabinet Masters', now() - interval '52 days', NULL, NULL, true, 'Direct from manufacturer', NULL, NULL, now() - interval '52 days', now() - interval '52 days'),
  ('e1f9a4b5-5678-4567-89ab-111111111111', 'Plumbing Labor', 1800.00, 'labor', 'ABC Plumbing Services', now() - interval '45 days', 90.00, 20, true, NULL, NULL, NULL, now() - interval '45 days', now() - interval '45 days'),
  ('e1f9a4b5-5678-4567-89ab-111111111111', 'Plumbing Fixtures & Materials', 2200.00, 'material', 'ABC Plumbing Services', now() - interval '45 days', NULL, NULL, true, 'Ferguson', NULL, NULL, now() - interval '45 days', now() - interval '45 days'),
  ('e1f9a4b5-5678-4567-89ab-111111111111', 'Electrical Work', 1500.00, 'labor', 'Elite Electrical Contractors', now() - interval '40 days', 75.00, 20, true, NULL, NULL, NULL, now() - interval '40 days', now() - interval '40 days'),
  ('e1f9a4b5-5678-4567-89ab-111111111111', 'Electrical Materials', 800.00, 'material', 'Elite Electrical Contractors', now() - interval '40 days', NULL, NULL, true, 'Home Depot Pro', NULL, NULL, now() - interval '40 days', now() - interval '40 days'),
  ('e1f9a4b5-5678-4567-89ab-111111111111', 'Countertop Installation', 3200.00, 'material', NULL, now() - interval '30 days', NULL, NULL, true, 'Local granite fabricator', NULL, NULL, now() - interval '30 days', now() - interval '30 days'),
  ('e1f9a4b5-5678-4567-89ab-111111111111', 'Tile Backsplash Labor', 960.00, 'labor', 'Tile & Stone Artisans', now() - interval '25 days', 60.00, 16, false, NULL, NULL, NULL, now() - interval '25 days', now() - interval '25 days'),
  ('e1f9a4b5-5678-4567-89ab-111111111111', 'Tile Materials', 650.00, 'material', 'Tile & Stone Artisans', now() - interval '26 days', NULL, NULL, false, 'TileBar', NULL, NULL, now() - interval '26 days', now() - interval '26 days'),
  
  -- Bathroom Addition (Job 222...)
  ('e1f9a4b5-5678-4567-89ab-222222222222', 'Framing Labor', 2800.00, 'labor', 'Master Framers Inc', now() - interval '38 days', 70.00, 40, true, NULL, NULL, NULL, now() - interval '38 days', now() - interval '38 days'),
  ('e1f9a4b5-5678-4567-89ab-222222222222', 'Framing Materials', 1200.00, 'material', 'Master Framers Inc', now() - interval '38 days', NULL, NULL, true, 'Lowes Pro', NULL, NULL, now() - interval '38 days', now() - interval '38 days'),
  ('e1f9a4b5-5678-4567-89ab-222222222222', 'Plumbing Rough-In', 2400.00, 'labor', 'ABC Plumbing Services', now() - interval '30 days', 80.00, 30, true, NULL, NULL, NULL, now() - interval '30 days', now() - interval '30 days'),
  ('e1f9a4b5-5678-4567-89ab-222222222222', 'Plumbing Fixtures', 3500.00, 'material', 'ABC Plumbing Services', now() - interval '30 days', NULL, NULL, true, 'Ferguson', NULL, NULL, now() - interval '30 days', now() - interval '30 days'),
  ('e1f9a4b5-5678-4567-89ab-222222222222', 'Drywall Installation', 1600.00, 'labor', 'Perfect Finish Drywall', now() - interval '20 days', 50.00, 32, false, NULL, NULL, NULL, now() - interval '20 days', now() - interval '20 days'),
  ('e1f9a4b5-5678-4567-89ab-222222222222', 'Drywall Materials', 800.00, 'material', 'Perfect Finish Drywall', now() - interval '20 days', NULL, NULL, false, 'Home Depot', NULL, NULL, now() - interval '20 days', now() - interval '20 days'),
  ('e1f9a4b5-5678-4567-89ab-222222222222', 'Tile Installation', 2200.00, 'labor', 'Tile & Stone Artisans', now() - interval '15 days', 55.00, 40, false, NULL, NULL, NULL, now() - interval '15 days', now() - interval '15 days'),
  ('e1f9a4b5-5678-4567-89ab-222222222222', 'Tile & Flooring Materials', 1800.00, 'material', 'Tile & Stone Artisans', now() - interval '15 days', NULL, NULL, false, 'TileBar', NULL, NULL, now() - interval '15 days', now() - interval '15 days'),
  
  -- Roof Replacement (Job 333...)
  ('e1f9a4b5-5678-4567-89ab-333333333333', 'Roof Tear-Off Labor', 2200.00, 'labor', 'TopShield Roofing', now() - interval '26 days', 55.00, 40, true, NULL, NULL, NULL, now() - interval '26 days', now() - interval '26 days'),
  ('e1f9a4b5-5678-4567-89ab-333333333333', 'Roofing Shingles', 4800.00, 'material', 'TopShield Roofing', now() - interval '26 days', NULL, NULL, true, 'ABC Supply', NULL, NULL, now() - interval '26 days', now() - interval '26 days'),
  ('e1f9a4b5-5678-4567-89ab-333333333333', 'Underlayment & Supplies', 1200.00, 'material', 'TopShield Roofing', now() - interval '26 days', NULL, NULL, true, 'ABC Supply', NULL, NULL, now() - interval '26 days', now() - interval '26 days'),
  
  -- Cafeteria Renovation (Job 444...)
  ('e1f9a4b5-5678-4567-89ab-444444444444', 'Demolition Labor', 3500.00, 'labor', NULL, now() - interval '85 days', 45.00, 78, true, NULL, NULL, NULL, now() - interval '85 days', now() - interval '85 days'),
  ('e1f9a4b5-5678-4567-89ab-444444444444', 'Electrical System Upgrade', 12000.00, 'labor', 'Elite Electrical Contractors', now() - interval '70 days', 85.00, 141, true, NULL, NULL, NULL, now() - interval '70 days', now() - interval '70 days'),
  ('e1f9a4b5-5678-4567-89ab-444444444444', 'Electrical Materials', 8500.00, 'material', 'Elite Electrical Contractors', now() - interval '70 days', NULL, NULL, true, 'Graybar', NULL, NULL, now() - interval '70 days', now() - interval '70 days'),
  ('e1f9a4b5-5678-4567-89ab-444444444444', 'HVAC Installation', 15000.00, 'labor', 'Comfort Zone HVAC', now() - interval '55 days', 95.00, 158, true, NULL, NULL, NULL, now() - interval '55 days', now() - interval '55 days'),
  ('e1f9a4b5-5678-4567-89ab-444444444444', 'HVAC Equipment', 22000.00, 'material', 'Comfort Zone HVAC', now() - interval '55 days', NULL, NULL, true, 'Direct from Carrier', NULL, NULL, now() - interval '55 days', now() - interval '55 days'),
  ('e1f9a4b5-5678-4567-89ab-444444444444', 'Flooring Installation', 8000.00, 'labor', 'Premium Flooring Solutions', now() - interval '35 days', 50.00, 160, true, NULL, NULL, NULL, now() - interval '35 days', now() - interval '35 days'),
  ('e1f9a4b5-5678-4567-89ab-444444444444', 'Commercial Flooring', 12000.00, 'material', 'Premium Flooring Solutions', now() - interval '35 days', NULL, NULL, true, 'Floor & Decor', NULL, NULL, now() - interval '35 days', now() - interval '35 days'),
  ('e1f9a4b5-5678-4567-89ab-444444444444', 'Painting Labor', 4500.00, 'labor', 'ColorCraft Painting', now() - interval '15 days', 45.00, 100, false, NULL, NULL, NULL, now() - interval '15 days', now() - interval '15 days'),
  ('e1f9a4b5-5678-4567-89ab-444444444444', 'Paint & Materials', 2800.00, 'material', 'ColorCraft Painting', now() - interval '15 days', NULL, NULL, false, 'Sherwin-Williams', NULL, NULL, now() - interval '15 days', now() - interval '15 days'),
  
  -- Office Build-Out (Job 666...)
  ('e1f9a4b5-5678-4567-89ab-666666666666', 'Framing & Partition Walls', 8500.00, 'labor', 'Master Framers Inc', now() - interval '110 days', 70.00, 121, true, NULL, NULL, NULL, now() - interval '110 days', now() - interval '110 days'),
  ('e1f9a4b5-5678-4567-89ab-666666666666', 'Framing Materials', 4200.00, 'material', 'Master Framers Inc', now() - interval '110 days', NULL, NULL, true, 'Lowes Pro', NULL, NULL, now() - interval '110 days', now() - interval '110 days'),
  ('e1f9a4b5-5678-4567-89ab-666666666666', 'Electrical Work', 9500.00, 'labor', 'Elite Electrical Contractors', now() - interval '95 days', 85.00, 112, true, NULL, NULL, NULL, now() - interval '95 days', now() - interval '95 days'),
  ('e1f9a4b5-5678-4567-89ab-666666666666', 'Electrical Materials', 5800.00, 'material', 'Elite Electrical Contractors', now() - interval '95 days', NULL, NULL, true, 'Graybar', NULL, NULL, now() - interval '95 days', now() - interval '95 days'),
  ('e1f9a4b5-5678-4567-89ab-666666666666', 'Drywall & Finishing', 7200.00, 'labor', 'Perfect Finish Drywall', now() - interval '80 days', 50.00, 144, true, NULL, NULL, NULL, now() - interval '80 days', now() - interval '80 days'),
  ('e1f9a4b5-5678-4567-89ab-666666666666', 'Drywall Materials', 3500.00, 'material', 'Perfect Finish Drywall', now() - interval '80 days', NULL, NULL, true, 'Home Depot', NULL, NULL, now() - interval '80 days', now() - interval '80 days'),
  ('e1f9a4b5-5678-4567-89ab-666666666666', 'Flooring Installation', 6500.00, 'labor', 'Premium Flooring Solutions', now() - interval '50 days', 50.00, 130, true, NULL, NULL, NULL, now() - interval '50 days', now() - interval '50 days'),
  ('e1f9a4b5-5678-4567-89ab-666666666666', 'Commercial Carpet', 8200.00, 'material', 'Premium Flooring Solutions', now() - interval '50 days', NULL, NULL, true, 'Shaw Contract', NULL, NULL, now() - interval '50 days', now() - interval '50 days'),
  ('e1f9a4b5-5678-4567-89ab-666666666666', 'Painting Labor', 3800.00, 'labor', 'ColorCraft Painting', now() - interval '35 days', 45.00, 84, true, NULL, NULL, NULL, now() - interval '35 days', now() - interval '35 days'),
  ('e1f9a4b5-5678-4567-89ab-666666666666', 'Paint & Supplies', 2100.00, 'material', 'ColorCraft Painting', now() - interval '35 days', NULL, NULL, true, 'Sherwin-Williams', NULL, NULL, now() - interval '35 days', now() - interval '35 days'),
  
  -- Window Replacement (Job 888...)
  ('e1f9a4b5-5678-4567-89ab-888888888888', 'Window Installation Labor', 2800.00, 'labor', 'ClearView Windows & Doors', now() - interval '72 days', 70.00, 40, true, NULL, NULL, NULL, now() - interval '72 days', now() - interval '72 days'),
  ('e1f9a4b5-5678-4567-89ab-888888888888', 'Vinyl Windows (18 units)', 9200.00, 'material', 'ClearView Windows & Doors', now() - interval '72 days', NULL, NULL, true, 'Andersen Windows', NULL, NULL, now() - interval '72 days', now() - interval '72 days'),
  ('e1f9a4b5-5678-4567-89ab-888888888888', 'Trim Work & Finishing', 1200.00, 'labor', 'Precision Carpentry Works', now() - interval '68 days', 60.00, 20, true, NULL, NULL, NULL, now() - interval '68 days', now() - interval '68 days'),
  
  -- Flooring Installation (Job bbb...)
  ('e1f9a4b5-5678-4567-89ab-bbbbbbbbbbbb', 'Hardwood Installation', 4200.00, 'labor', 'Premium Flooring Solutions', now() - interval '175 days', 52.00, 81, true, NULL, NULL, NULL, now() - interval '175 days', now() - interval '175 days'),
  ('e1f9a4b5-5678-4567-89ab-bbbbbbbbbbbb', 'Hardwood Flooring', 5800.00, 'material', 'Premium Flooring Solutions', now() - interval '175 days', NULL, NULL, true, 'Lumber Liquidators', NULL, NULL, now() - interval '175 days', now() - interval '175 days');