/*
  # Seed Subcontractors Data
  
  1. Sample Data
    - Creates 15 subcontractors with various specialties
    - Includes contact information (email, phone)
    - All marked as active and available for selection
  
  2. Specialties Covered
    - Plumbing, Electrical, HVAC, Roofing
    - Drywall, Painting, Flooring, Cabinets
    - Concrete, Framing, Windows, Landscaping
*/

INSERT INTO subcontractors (id, name, email, phone, specialty, is_active, created_at, updated_at) VALUES
  ('a1b2c3d4-1111-4567-89ab-111111111111', 'ABC Plumbing Services', 'contact@abcplumbing.com', '(555) 111-2222', 'Plumbing', true, now() - interval '365 days', now() - interval '30 days'),
  ('a1b2c3d4-1111-4567-89ab-222222222222', 'Elite Electrical Contractors', 'info@eliteelectric.com', '(555) 222-3333', 'Electrical', true, now() - interval '300 days', now() - interval '15 days'),
  ('a1b2c3d4-1111-4567-89ab-333333333333', 'Comfort Zone HVAC', 'service@comfortzonehvac.com', '(555) 333-4444', 'HVAC', true, now() - interval '280 days', now() - interval '20 days'),
  ('a1b2c3d4-1111-4567-89ab-444444444444', 'TopShield Roofing', 'estimates@topshieldroofing.com', '(555) 444-5555', 'Roofing', true, now() - interval '400 days', now() - interval '45 days'),
  ('a1b2c3d4-1111-4567-89ab-555555555555', 'Perfect Finish Drywall', 'crew@perfectfinish.com', '(555) 555-6666', 'Drywall', true, now() - interval '200 days', now() - interval '10 days'),
  ('a1b2c3d4-1111-4567-89ab-666666666666', 'ColorCraft Painting', 'jobs@colorcraftpainting.com', '(555) 666-7777', 'Painting', true, now() - interval '250 days', now() - interval '25 days'),
  ('a1b2c3d4-1111-4567-89ab-777777777777', 'Premium Flooring Solutions', 'sales@premiumflooring.com', '(555) 777-8888', 'Flooring', true, now() - interval '180 days', now() - interval '8 days'),
  ('a1b2c3d4-1111-4567-89ab-888888888888', 'Custom Cabinet Masters', 'info@cabinetmasters.com', '(555) 888-9999', 'Cabinets', true, now() - interval '320 days', now() - interval '35 days'),
  ('a1b2c3d4-1111-4567-89ab-999999999999', 'SolidBase Concrete', 'office@solidbaseconcrete.com', '(555) 999-0000', 'Concrete', true, now() - interval '420 days', now() - interval '50 days'),
  ('a1b2c3d4-1111-4567-89ab-aaaaaaaaaaaa', 'Master Framers Inc', 'dispatch@masterframers.com', '(555) 000-1111', 'Framing', true, now() - interval '350 days', now() - interval '40 days'),
  ('a1b2c3d4-1111-4567-89ab-bbbbbbbbbbbb', 'ClearView Windows & Doors', 'service@clearviewwindows.com', '(555) 111-0000', 'Windows', true, now() - interval '270 days', now() - interval '18 days'),
  ('a1b2c3d4-1111-4567-89ab-cccccccccccc', 'GreenScape Landscaping', 'projects@greenscape.com', '(555) 222-1111', 'Landscaping', true, now() - interval '150 days', now() - interval '5 days'),
  ('a1b2c3d4-1111-4567-89ab-dddddddddddd', 'Tile & Stone Artisans', 'booking@tileartisans.com', '(555) 333-2222', 'Tile', true, now() - interval '190 days', now() - interval '12 days'),
  ('a1b2c3d4-1111-4567-89ab-eeeeeeeeeeee', 'Insulation Experts LLC', 'quotes@insulationexperts.com', '(555) 444-3333', 'Insulation', true, now() - interval '220 days', now() - interval '22 days'),
  ('a1b2c3d4-1111-4567-89ab-ffffffffffff', 'Precision Carpentry Works', 'shop@precisioncarpentry.com', '(555) 555-4444', 'Carpentry', true, now() - interval '310 days', now() - interval '28 days')
ON CONFLICT (id) DO NOTHING;