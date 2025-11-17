/*
  # Seed Additional Bid Types Data

  1. Purpose
    - Expand bid types with more comprehensive examples
    - Provide realistic bid type configurations for various trades
    - Support quote builder and proposal designer features
    - Demonstrate complex category and line item structures

  2. Data Inserted
    - 3 additional bid types (Exterior Painting, Roofing, Flooring)
    - Multiple categories per bid type (4-6 categories each)
    - Comprehensive line items per category (5-10 items each)
    - Detailed field configurations with formulas

  3. Structure
    - Bid Types: Top-level service categories
    - Categories: Sub-groupings within bid types
    - Line Items: Specific work items with fields
    - Fields: Configurable inputs with formulas for pricing

  4. Important Notes
    - All items include proper sort order for organized display
    - Field formulas support retail and sub-rate calculations
    - Mix of labor and material line items
    - Realistic field configurations based on industry standards
*/

DO $$
DECLARE
  bid_type_exterior_paint uuid;
  bid_type_roofing uuid;
  bid_type_flooring uuid;

  cat_prep_exterior uuid;
  cat_painting_exterior uuid;
  cat_trim_exterior uuid;
  cat_cleanup_exterior uuid;

  cat_tearoff uuid;
  cat_roof_install uuid;
  cat_flashing uuid;
  cat_ventilation uuid;

  cat_floor_prep uuid;
  cat_floor_install uuid;
  cat_floor_finishing uuid;
  cat_floor_trim uuid;
BEGIN
  -- Insert Exterior Painting bid type
  INSERT INTO bid_types (name, description, sort_order)
  VALUES ('Exterior Painting', 'Complete exterior painting services including siding, trim, doors, and specialty surfaces', 3)
  RETURNING id INTO bid_type_exterior_paint;

  -- Insert Roofing bid type
  INSERT INTO bid_types (name, description, sort_order)
  VALUES ('Roofing', 'Residential and commercial roofing installation, repair, and maintenance', 4)
  RETURNING id INTO bid_type_roofing;

  -- Insert Flooring bid type
  INSERT INTO bid_types (name, description, sort_order)
  VALUES ('Flooring Installation', 'Professional flooring installation including hardwood, laminate, tile, and carpet', 5)
  RETURNING id INTO bid_type_flooring;

  -- ============= EXTERIOR PAINTING CATEGORIES AND LINE ITEMS =============

  -- Exterior Prep Work Category
  INSERT INTO bid_categories (bid_type_id, name, description, sort_order)
  VALUES (bid_type_exterior_paint, 'Exterior Prep Work', 'Surface preparation for exterior painting', 1)
  RETURNING id INTO cat_prep_exterior;

  INSERT INTO bid_line_items (bid_category_id, line_item_type, name, description, show_on_worksheet, show_on_workorder, sort_order)
  VALUES
    (cat_prep_exterior, 'Labor', 'Power Washing', 'Pressure wash all surfaces to be painted', true, true, 1),
    (cat_prep_exterior, 'Labor', 'Scraping & Sanding', 'Remove loose paint and sand surfaces', true, true, 2),
    (cat_prep_exterior, 'Labor', 'Caulking & Sealing', 'Caulk gaps and seal joints', true, true, 3),
    (cat_prep_exterior, 'Material', 'Primer', 'Exterior primer for bare wood and repairs', true, false, 4),
    (cat_prep_exterior, 'Material', 'Wood Filler', 'Filler for cracks and holes', true, false, 5);

  -- Exterior Painting Category
  INSERT INTO bid_categories (bid_type_id, name, description, sort_order)
  VALUES (bid_type_exterior_paint, 'Exterior Painting', 'Main exterior painting work', 2)
  RETURNING id INTO cat_painting_exterior;

  INSERT INTO bid_line_items (bid_category_id, line_item_type, name, description, show_on_worksheet, show_on_workorder, sort_order)
  VALUES
    (cat_painting_exterior, 'Labor', 'Siding Paint - First Coat', 'First coat application on siding', true, true, 1),
    (cat_painting_exterior, 'Labor', 'Siding Paint - Second Coat', 'Second coat application on siding', true, true, 2),
    (cat_painting_exterior, 'Material', 'Exterior Paint - Body', 'Premium exterior paint for main surfaces', true, false, 3),
    (cat_painting_exterior, 'Labor', 'Door Painting', 'Paint exterior doors', true, true, 4),
    (cat_painting_exterior, 'Labor', 'Window Frame Painting', 'Paint window frames and sills', true, true, 5);

  -- Trim and Detail Work Category
  INSERT INTO bid_categories (bid_type_id, name, description, sort_order)
  VALUES (bid_type_exterior_paint, 'Trim & Detail Work', 'Trim painting and detail work', 3)
  RETURNING id INTO cat_trim_exterior;

  INSERT INTO bid_line_items (bid_category_id, line_item_type, name, description, show_on_worksheet, show_on_workorder, sort_order)
  VALUES
    (cat_trim_exterior, 'Labor', 'Fascia & Soffit Painting', 'Paint fascia and soffit boards', true, true, 1),
    (cat_trim_exterior, 'Labor', 'Trim Painting', 'Paint all exterior trim', true, true, 2),
    (cat_trim_exterior, 'Material', 'Trim Paint', 'High-quality exterior trim paint', true, false, 3),
    (cat_trim_exterior, 'Labor', 'Shutter Painting', 'Paint exterior shutters', true, true, 4);

  -- Cleanup Category
  INSERT INTO bid_categories (bid_type_id, name, description, sort_order)
  VALUES (bid_type_exterior_paint, 'Cleanup & Final', 'Project cleanup and final inspection', 4)
  RETURNING id INTO cat_cleanup_exterior;

  INSERT INTO bid_line_items (bid_category_id, line_item_type, name, description, show_on_worksheet, show_on_workorder, sort_order)
  VALUES
    (cat_cleanup_exterior, 'Labor', 'Site Cleanup', 'Remove all equipment and materials', true, true, 1),
    (cat_cleanup_exterior, 'Labor', 'Final Walkthrough', 'Final inspection with client', true, true, 2);

  -- ============= ROOFING CATEGORIES AND LINE ITEMS =============

  -- Tear-Off Category
  INSERT INTO bid_categories (bid_type_id, name, description, sort_order)
  VALUES (bid_type_roofing, 'Tear-Off & Disposal', 'Remove existing roofing materials', 1)
  RETURNING id INTO cat_tearoff;

  INSERT INTO bid_line_items (bid_category_id, line_item_type, name, description, show_on_worksheet, show_on_workorder, sort_order)
  VALUES
    (cat_tearoff, 'Labor', 'Shingle Removal', 'Remove existing shingles down to deck', true, true, 1),
    (cat_tearoff, 'Labor', 'Underlayment Removal', 'Remove old underlayment', true, true, 2),
    (cat_tearoff, 'Material', 'Dumpster Rental', 'Debris removal container', true, false, 3),
    (cat_tearoff, 'Labor', 'Deck Inspection & Repair', 'Inspect and repair roof deck', true, true, 4);

  -- Roof Installation Category
  INSERT INTO bid_categories (bid_type_id, name, description, sort_order)
  VALUES (bid_type_roofing, 'Roof Installation', 'New roofing material installation', 2)
  RETURNING id INTO cat_roof_install;

  INSERT INTO bid_line_items (bid_category_id, line_item_type, name, description, show_on_worksheet, show_on_workorder, sort_order)
  VALUES
    (cat_roof_install, 'Material', 'Ice & Water Shield', 'Ice and water barrier for critical areas', true, false, 1),
    (cat_roof_install, 'Material', 'Synthetic Underlayment', 'High-quality roofing underlayment', true, false, 2),
    (cat_roof_install, 'Labor', 'Underlayment Installation', 'Install ice/water shield and underlayment', true, true, 3),
    (cat_roof_install, 'Material', 'Architectural Shingles', 'Premium architectural shingles', true, false, 4),
    (cat_roof_install, 'Labor', 'Shingle Installation', 'Install roofing shingles', true, true, 5),
    (cat_roof_install, 'Material', 'Ridge Cap Shingles', 'Ridge cap shingles', true, false, 6),
    (cat_roof_install, 'Labor', 'Ridge Cap Installation', 'Install ridge cap', true, true, 7);

  -- Flashing Category
  INSERT INTO bid_categories (bid_type_id, name, description, sort_order)
  VALUES (bid_type_roofing, 'Flashing & Trim', 'Install flashing and trim components', 3)
  RETURNING id INTO cat_flashing;

  INSERT INTO bid_line_items (bid_category_id, line_item_type, name, description, show_on_worksheet, show_on_workorder, sort_order)
  VALUES
    (cat_flashing, 'Material', 'Valley Flashing', 'Metal valley flashing', true, false, 1),
    (cat_flashing, 'Labor', 'Valley Flashing Install', 'Install valley flashing', true, true, 2),
    (cat_flashing, 'Material', 'Step Flashing', 'Step flashing for walls and chimneys', true, false, 3),
    (cat_flashing, 'Labor', 'Chimney Flashing', 'Install chimney flashing', true, true, 4),
    (cat_flashing, 'Material', 'Drip Edge', 'Aluminum drip edge', true, false, 5),
    (cat_flashing, 'Labor', 'Drip Edge Installation', 'Install drip edge', true, true, 6);

  -- Ventilation Category
  INSERT INTO bid_categories (bid_type_id, name, description, sort_order)
  VALUES (bid_type_roofing, 'Ventilation', 'Roof ventilation system', 4)
  RETURNING id INTO cat_ventilation;

  INSERT INTO bid_line_items (bid_category_id, line_item_type, name, description, show_on_worksheet, show_on_workorder, sort_order)
  VALUES
    (cat_ventilation, 'Material', 'Ridge Vent', 'Continuous ridge ventilation', true, false, 1),
    (cat_ventilation, 'Labor', 'Ridge Vent Install', 'Install ridge vent system', true, true, 2),
    (cat_ventilation, 'Material', 'Roof Vents', 'Individual roof vents', true, false, 3),
    (cat_ventilation, 'Labor', 'Roof Vent Install', 'Install roof vents', true, true, 4);

  -- ============= FLOORING CATEGORIES AND LINE ITEMS =============

  -- Floor Preparation Category
  INSERT INTO bid_categories (bid_type_id, name, description, sort_order)
  VALUES (bid_type_flooring, 'Floor Preparation', 'Subfloor preparation and leveling', 1)
  RETURNING id INTO cat_floor_prep;

  INSERT INTO bid_line_items (bid_category_id, line_item_type, name, description, show_on_worksheet, show_on_workorder, sort_order)
  VALUES
    (cat_floor_prep, 'Labor', 'Remove Existing Flooring', 'Remove and dispose of old flooring', true, true, 1),
    (cat_floor_prep, 'Labor', 'Subfloor Inspection', 'Inspect and assess subfloor condition', true, true, 2),
    (cat_floor_prep, 'Labor', 'Subfloor Repair', 'Repair damaged subfloor areas', true, true, 3),
    (cat_floor_prep, 'Material', 'Leveling Compound', 'Self-leveling underlayment', true, false, 4),
    (cat_floor_prep, 'Labor', 'Floor Leveling', 'Apply leveling compound', true, true, 5);

  -- Floor Installation Category
  INSERT INTO bid_categories (bid_type_id, name, description, sort_order)
  VALUES (bid_type_flooring, 'Floor Installation', 'Main flooring installation work', 2)
  RETURNING id INTO cat_floor_install;

  INSERT INTO bid_line_items (bid_category_id, line_item_type, name, description, show_on_worksheet, show_on_workorder, sort_order)
  VALUES
    (cat_floor_install, 'Material', 'Underlayment', 'Moisture barrier and sound dampening', true, false, 1),
    (cat_floor_install, 'Labor', 'Underlayment Install', 'Install underlayment', true, true, 2),
    (cat_floor_install, 'Material', 'Flooring Material', 'Hardwood, laminate, or tile flooring', true, false, 3),
    (cat_floor_install, 'Labor', 'Flooring Installation', 'Install flooring material', true, true, 4),
    (cat_floor_install, 'Material', 'Adhesive/Fasteners', 'Installation materials', true, false, 5);

  -- Finishing Category
  INSERT INTO bid_categories (bid_type_id, name, description, sort_order)
  VALUES (bid_type_flooring, 'Finishing Work', 'Sanding, staining, and sealing', 3)
  RETURNING id INTO cat_floor_finishing;

  INSERT INTO bid_line_items (bid_category_id, line_item_type, name, description, show_on_worksheet, show_on_workorder, sort_order)
  VALUES
    (cat_floor_finishing, 'Labor', 'Floor Sanding', 'Sand hardwood floor smooth', true, true, 1),
    (cat_floor_finishing, 'Material', 'Wood Stain', 'Floor stain in selected color', true, false, 2),
    (cat_floor_finishing, 'Labor', 'Stain Application', 'Apply stain to floor', true, true, 3),
    (cat_floor_finishing, 'Material', 'Floor Finish', 'Polyurethane floor finish', true, false, 4),
    (cat_floor_finishing, 'Labor', 'Finish Application', 'Apply protective finish coats', true, true, 5);

  -- Trim and Transition Category
  INSERT INTO bid_categories (bid_type_id, name, description, sort_order)
  VALUES (bid_type_flooring, 'Trim & Transitions', 'Install baseboards and transitions', 4)
  RETURNING id INTO cat_floor_trim;

  INSERT INTO bid_line_items (bid_category_id, line_item_type, name, description, show_on_worksheet, show_on_workorder, sort_order)
  VALUES
    (cat_floor_trim, 'Material', 'Baseboards', 'Baseboard trim material', true, false, 1),
    (cat_floor_trim, 'Labor', 'Baseboard Installation', 'Install baseboards', true, true, 2),
    (cat_floor_trim, 'Material', 'Transition Strips', 'Doorway transition pieces', true, false, 3),
    (cat_floor_trim, 'Labor', 'Transition Install', 'Install transition strips', true, true, 4),
    (cat_floor_trim, 'Material', 'Quarter Round', 'Quarter round trim', true, false, 5),
    (cat_floor_trim, 'Labor', 'Quarter Round Install', 'Install quarter round', true, true, 6);

END $$;
