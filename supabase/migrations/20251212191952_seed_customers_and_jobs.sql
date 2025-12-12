/*
  # Seed Customers and Jobs Data
  
  1. Sample Data
    - Creates 10 sample customers with realistic contact information
    - Creates 12 jobs linked to these customers with various statuses
    - Jobs span different project types and price ranges
  
  2. Data Details
    - Customers include residential and commercial clients
    - Jobs have statuses: proposal, active, completed, on_hold
    - Total amounts range from $5,000 to $150,000
*/

-- Insert sample customers
INSERT INTO customers (id, name, email, phone, address, created_at, updated_at) VALUES
  ('d1e8f3a4-1234-4567-89ab-111111111111', 'John & Sarah Martinez', 'john.martinez@email.com', '(555) 123-4567', '123 Oak Street, Springfield, IL 62701', now() - interval '90 days', now() - interval '30 days'),
  ('d1e8f3a4-1234-4567-89ab-222222222222', 'Michael Chen', 'michael.chen@email.com', '(555) 234-5678', '456 Maple Avenue, Springfield, IL 62702', now() - interval '75 days', now() - interval '20 days'),
  ('d1e8f3a4-1234-4567-89ab-333333333333', 'Emily Johnson', 'emily.johnson@email.com', '(555) 345-6789', '789 Pine Road, Springfield, IL 62703', now() - interval '60 days', now() - interval '15 days'),
  ('d1e8f3a4-1234-4567-89ab-444444444444', 'Springfield School District', 'facilities@springfieldschools.edu', '(555) 456-7890', '1000 Education Drive, Springfield, IL 62704', now() - interval '120 days', now() - interval '45 days'),
  ('d1e8f3a4-1234-4567-89ab-555555555555', 'David & Lisa Thompson', 'thompson.family@email.com', '(555) 567-8901', '234 Elm Street, Springfield, IL 62705', now() - interval '45 days', now() - interval '10 days'),
  ('d1e8f3a4-1234-4567-89ab-666666666666', 'Riverside Office Complex LLC', 'management@riversideoffice.com', '(555) 678-9012', '567 Business Park Drive, Springfield, IL 62706', now() - interval '150 days', now() - interval '60 days'),
  ('d1e8f3a4-1234-4567-89ab-777777777777', 'Robert Anderson', 'robert.anderson@email.com', '(555) 789-0123', '890 Cedar Lane, Springfield, IL 62707', now() - interval '30 days', now() - interval '5 days'),
  ('d1e8f3a4-1234-4567-89ab-888888888888', 'Maria Garcia', 'maria.garcia@email.com', '(555) 890-1234', '123 Birch Court, Springfield, IL 62708', now() - interval '100 days', now() - interval '25 days'),
  ('d1e8f3a4-1234-4567-89ab-999999999999', 'Green Valley Retail Center', 'leasing@greenvalleyretail.com', '(555) 901-2345', '456 Commerce Boulevard, Springfield, IL 62709', now() - interval '180 days', now() - interval '90 days'),
  ('d1e8f3a4-1234-4567-89ab-aaaaaaaaaaaa', 'William & Patricia Brown', 'brownfamily2024@email.com', '(555) 012-3456', '789 Willow Drive, Springfield, IL 62710', now() - interval '15 days', now() - interval '2 days')
ON CONFLICT (id) DO NOTHING;

-- Insert sample jobs
INSERT INTO jobs (id, customer_id, title, description, address, status, total_amount, created_at, updated_at) VALUES
  ('e1f9a4b5-5678-4567-89ab-111111111111', 'd1e8f3a4-1234-4567-89ab-111111111111', 'Kitchen Remodel', 'Complete kitchen renovation with new cabinets, countertops, and appliances', '123 Oak Street, Springfield, IL 62701', 'active', 45000.00, now() - interval '60 days', now() - interval '5 days'),
  ('e1f9a4b5-5678-4567-89ab-222222222222', 'd1e8f3a4-1234-4567-89ab-222222222222', 'Bathroom Addition', 'Add new master bathroom with walk-in shower and double vanity', '456 Maple Avenue, Springfield, IL 62702', 'active', 32000.00, now() - interval '45 days', now() - interval '3 days'),
  ('e1f9a4b5-5678-4567-89ab-333333333333', 'd1e8f3a4-1234-4567-89ab-333333333333', 'Roof Replacement', 'Full roof tear-off and replacement with architectural shingles', '789 Pine Road, Springfield, IL 62703', 'proposal', 18500.00, now() - interval '30 days', now() - interval '2 days'),
  ('e1f9a4b5-5678-4567-89ab-444444444444', 'd1e8f3a4-1234-4567-89ab-444444444444', 'Cafeteria Renovation', 'Complete cafeteria modernization including flooring, lighting, and equipment', '1000 Education Drive, Springfield, IL 62704', 'active', 125000.00, now() - interval '90 days', now() - interval '10 days'),
  ('e1f9a4b5-5678-4567-89ab-555555555555', 'd1e8f3a4-1234-4567-89ab-555555555555', 'Deck Construction', 'Build new 400 sq ft composite deck with railings', '234 Elm Street, Springfield, IL 62705', 'proposal', 22000.00, now() - interval '20 days', now() - interval '1 day'),
  ('e1f9a4b5-5678-4567-89ab-666666666666', 'd1e8f3a4-1234-4567-89ab-666666666666', 'Office Build-Out', 'Tenant improvement for 5,000 sq ft office space', '567 Business Park Drive, Springfield, IL 62706', 'completed', 95000.00, now() - interval '120 days', now() - interval '30 days'),
  ('e1f9a4b5-5678-4567-89ab-777777777777', 'd1e8f3a4-1234-4567-89ab-777777777777', 'Basement Finishing', 'Finish 1,200 sq ft basement with family room, bedroom, and bathroom', '890 Cedar Lane, Springfield, IL 62707', 'proposal', 52000.00, now() - interval '15 days', now()),
  ('e1f9a4b5-5678-4567-89ab-888888888888', 'd1e8f3a4-1234-4567-89ab-888888888888', 'Window Replacement', 'Replace all windows (18 windows total) with energy-efficient vinyl', '123 Birch Court, Springfield, IL 62708', 'completed', 15800.00, now() - interval '75 days', now() - interval '20 days'),
  ('e1f9a4b5-5678-4567-89ab-999999999999', 'd1e8f3a4-1234-4567-89ab-999999999999', 'Storefront Facade Update', 'Update exterior facade for 3 retail units', '456 Commerce Boulevard, Springfield, IL 62709', 'on_hold', 68000.00, now() - interval '150 days', now() - interval '60 days'),
  ('e1f9a4b5-5678-4567-89ab-aaaaaaaaaaaa', 'd1e8f3a4-1234-4567-89ab-aaaaaaaaaaaa', 'Garage Addition', 'Build new 2-car detached garage with storage loft', '789 Willow Drive, Springfield, IL 62710', 'proposal', 48000.00, now() - interval '10 days', now()),
  ('e1f9a4b5-5678-4567-89ab-bbbbbbbbbbbb', 'd1e8f3a4-1234-4567-89ab-111111111111', 'Flooring Installation', 'Install hardwood flooring throughout main level', '123 Oak Street, Springfield, IL 62701', 'completed', 12500.00, now() - interval '180 days', now() - interval '90 days'),
  ('e1f9a4b5-5678-4567-89ab-cccccccccccc', 'd1e8f3a4-1234-4567-89ab-666666666666', 'HVAC System Upgrade', 'Replace commercial HVAC units for office building', '567 Business Park Drive, Springfield, IL 62706', 'proposal', 85000.00, now() - interval '25 days', now() - interval '3 days')
ON CONFLICT (id) DO NOTHING;