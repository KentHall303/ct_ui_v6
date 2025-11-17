/*
  # Seed Subcontractors Data

  1. Purpose
    - Populate the subcontractors table with comprehensive vendor data
    - Provide realistic examples for various trades and specialties
    - Support subcontractor management and scheduling features

  2. Data Inserted
    - 15 subcontractor records covering various construction trades
    - Includes contact information, specialties, and active status
    - Mix of active and inactive subcontractors for testing

  3. Fields Populated
    - name: Subcontractor/company name
    - email: Contact email address
    - phone: Contact phone number
    - specialty: Trade or specialty area
    - is_active: Active status (true/false)
    - created_at: Creation timestamp
    - updated_at: Last update timestamp
*/

-- Insert comprehensive subcontractor data
INSERT INTO subcontractors (name, email, phone, specialty, is_active) VALUES
  ('Elite Plumbing Services', 'contact@eliteplumbing.com', '555-0101', 'Plumbing', true),
  ('ProWire Electrical', 'info@prowireelectric.com', '555-0102', 'Electrical', true),
  ('Summit HVAC Solutions', 'service@summithvac.com', '555-0103', 'HVAC', true),
  ('Precision Carpentry Co.', 'jobs@precisioncarpentry.com', '555-0104', 'Carpentry', true),
  ('Master Tile & Stone', 'estimating@mastertile.com', '555-0105', 'Tile Work', true),
  ('Apex Roofing Contractors', 'quotes@apexroofing.com', '555-0106', 'Roofing', true),
  ('Foundation Experts LLC', 'contact@foundationexperts.com', '555-0107', 'Foundation & Concrete', true),
  ('Green Thumb Landscaping', 'info@greenthumblandscape.com', '555-0108', 'Landscaping', true),
  ('Crystal Clear Windows', 'service@crystalclearwindows.com', '555-0109', 'Window Installation', true),
  ('Perfect Paint Pros', 'jobs@perfectpaint.com', '555-0110', 'Painting', true),
  ('Solid Drywall Solutions', 'contact@soliddrywall.com', '555-0111', 'Drywall', true),
  ('Granite & Marble Works', 'sales@graniteworks.com', '555-0112', 'Countertops', true),
  ('Custom Cabinets Direct', 'info@customcabinetsdirect.com', '555-0113', 'Cabinetry', true),
  ('FloorMaster Installation', 'scheduling@floormaster.com', '555-0114', 'Flooring', true),
  ('Reliable Demolition Co.', 'dispatch@reliabledemo.com', '555-0115', 'Demolition', false)
ON CONFLICT DO NOTHING;
