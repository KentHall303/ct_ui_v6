/*
  # Seed Future Calendar Events for Agenda View Testing

  1. Purpose
    - Add calendar events starting from January 22, 2026 onward
    - Provides data for agenda view testing
    - Includes various event types: quotes, installations, inspections, follow-ups

  2. Data Added
    - Events spread across the next 4 weeks (Jan 22 - Feb 18, 2026)
    - Multiple events per day to test density
    - Different event types and durations
*/

INSERT INTO calendar_events (title, start_date, end_date, event_type, status, location)
VALUES
  -- Week 1: January 22-28, 2026
  ('Johnson Kitchen Quote', '2026-01-22 09:00:00+00', '2026-01-22 10:30:00+00', 'quote', 'pending', '123 Oak Street'),
  ('Williams Bathroom Inspection', '2026-01-22 11:00:00+00', '2026-01-22 12:00:00+00', 'inspection', 'pending', '456 Maple Ave'),
  ('Davis Deck Installation Day 1', '2026-01-22 08:00:00+00', '2026-01-22 16:00:00+00', 'installation', 'active', '789 Pine Road'),
  ('Miller Follow-up Call', '2026-01-22 14:00:00+00', '2026-01-22 14:30:00+00', 'follow_up', 'pending', 'Phone Call'),
  
  ('Brown Garage Renovation Start', '2026-01-23 07:30:00+00', '2026-01-23 15:30:00+00', 'installation', 'pending', '321 Cedar Lane'),
  ('Wilson Living Room Quote', '2026-01-23 10:00:00+00', '2026-01-23 11:30:00+00', 'quote', 'pending', '654 Birch Way'),
  ('Taylor Fence Final Inspection', '2026-01-23 13:00:00+00', '2026-01-23 14:00:00+00', 'inspection', 'pending', '987 Elm Court'),
  
  ('Anderson Pool House Quote', '2026-01-24 09:30:00+00', '2026-01-24 11:00:00+00', 'quote', 'pending', '147 Willow Drive'),
  ('Thomas Basement Waterproofing', '2026-01-24 08:00:00+00', '2026-01-24 17:00:00+00', 'installation', 'pending', '258 Spruce Street'),
  ('Jackson Roof Repair', '2026-01-24 12:00:00+00', '2026-01-24 16:00:00+00', 'installation', 'pending', '369 Ash Avenue'),
  
  ('White Sunroom Addition Quote', '2026-01-25 10:00:00+00', '2026-01-25 12:00:00+00', 'quote', 'pending', '741 Redwood Place'),
  ('Harris Driveway Repair', '2026-01-25 08:00:00+00', '2026-01-25 14:00:00+00', 'installation', 'pending', '852 Sequoia Blvd'),
  
  ('Martin Office Renovation Day 1', '2026-01-26 07:00:00+00', '2026-01-26 15:00:00+00', 'installation', 'pending', '963 Magnolia Court'),
  ('Garcia Home Theater Quote', '2026-01-26 11:00:00+00', '2026-01-26 12:30:00+00', 'quote', 'pending', '159 Dogwood Lane'),
  
  ('Martinez Patio Extension', '2026-01-27 08:30:00+00', '2026-01-27 16:30:00+00', 'installation', 'pending', '267 Hickory Road'),
  ('Robinson Landscape Design Meeting', '2026-01-27 14:00:00+00', '2026-01-27 15:30:00+00', 'quote', 'pending', '378 Walnut Street'),
  ('Clark Kitchen Remodel Inspection', '2026-01-27 10:00:00+00', '2026-01-27 11:00:00+00', 'inspection', 'pending', '489 Chestnut Ave'),
  
  ('Rodriguez Bathroom Tile Work', '2026-01-28 08:00:00+00', '2026-01-28 15:00:00+00', 'installation', 'pending', '591 Poplar Drive'),
  ('Lewis Master Suite Quote', '2026-01-28 09:30:00+00', '2026-01-28 11:00:00+00', 'quote', 'pending', '602 Sycamore Way'),
  
  -- Week 2: January 29 - February 4, 2026
  ('Lee Whole House Painting', '2026-01-29 07:00:00+00', '2026-01-29 18:00:00+00', 'installation', 'pending', '713 Aspen Circle'),
  ('Walker Attic Conversion Quote', '2026-01-29 10:00:00+00', '2026-01-29 11:30:00+00', 'quote', 'pending', '824 Cypress Lane'),
  ('Hall Foundation Inspection', '2026-01-29 14:00:00+00', '2026-01-29 15:30:00+00', 'inspection', 'pending', '935 Juniper Road'),
  
  ('Allen Window Replacement', '2026-01-30 08:00:00+00', '2026-01-30 16:00:00+00', 'installation', 'pending', '146 Fir Street'),
  ('Young Flooring Quote', '2026-01-30 11:00:00+00', '2026-01-30 12:30:00+00', 'quote', 'pending', '257 Linden Ave'),
  ('Hernandez HVAC Follow-up', '2026-01-30 15:00:00+00', '2026-01-30 15:30:00+00', 'follow_up', 'pending', 'Phone Call'),
  
  ('King Exterior Siding Day 1', '2026-01-31 07:30:00+00', '2026-01-31 16:30:00+00', 'installation', 'pending', '368 Locust Place'),
  ('Wright Mudroom Addition Quote', '2026-01-31 09:00:00+00', '2026-01-31 10:30:00+00', 'quote', 'pending', '479 Mulberry Court'),
  
  ('Lopez Pergola Installation', '2026-02-01 08:00:00+00', '2026-02-01 14:00:00+00', 'installation', 'pending', '581 Hawthorn Drive'),
  ('Hill Guest Bathroom Quote', '2026-02-01 10:30:00+00', '2026-02-01 12:00:00+00', 'quote', 'pending', '692 Beech Way'),
  ('Scott Electrical Inspection', '2026-02-01 13:00:00+00', '2026-02-01 14:00:00+00', 'inspection', 'pending', '703 Alder Street'),
  
  ('Green Basement Finishing', '2026-02-02 07:00:00+00', '2026-02-02 17:00:00+00', 'installation', 'pending', '814 Laurel Avenue'),
  ('Adams Outdoor Kitchen Quote', '2026-02-02 11:00:00+00', '2026-02-02 12:30:00+00', 'quote', 'pending', '925 Palm Road'),
  
  ('Baker Carport Construction', '2026-02-03 08:00:00+00', '2026-02-03 16:00:00+00', 'installation', 'pending', '136 Olive Lane'),
  ('Gonzalez Plumbing Quote', '2026-02-03 09:30:00+00', '2026-02-03 10:30:00+00', 'quote', 'pending', '247 Ivy Circle'),
  ('Nelson Roof Final Inspection', '2026-02-03 14:00:00+00', '2026-02-03 15:00:00+00', 'inspection', 'pending', '358 Vine Street'),
  
  ('Carter Crown Molding Install', '2026-02-04 08:30:00+00', '2026-02-04 15:00:00+00', 'installation', 'pending', '469 Holly Drive'),
  ('Mitchell Wine Cellar Quote', '2026-02-04 10:00:00+00', '2026-02-04 11:30:00+00', 'quote', 'pending', '571 Rosewood Way'),
  
  -- Week 3: February 5-11, 2026
  ('Perez Staircase Renovation', '2026-02-05 07:30:00+00', '2026-02-05 16:00:00+00', 'installation', 'pending', '682 Oakwood Ave'),
  ('Roberts Home Office Quote', '2026-02-05 11:00:00+00', '2026-02-05 12:30:00+00', 'quote', 'pending', '793 Pinewood Court'),
  ('Turner Deck Inspection', '2026-02-05 14:30:00+00', '2026-02-05 15:30:00+00', 'inspection', 'pending', '804 Maplewood Lane'),
  
  ('Phillips Screened Porch', '2026-02-06 08:00:00+00', '2026-02-06 17:00:00+00', 'installation', 'pending', '915 Cedarwood Road'),
  ('Campbell Garage Door Quote', '2026-02-06 09:30:00+00', '2026-02-06 10:30:00+00', 'quote', 'pending', '126 Birchwood Place'),
  ('Parker Follow-up Meeting', '2026-02-06 13:00:00+00', '2026-02-06 14:00:00+00', 'follow_up', 'pending', '237 Elmwood Drive'),
  
  ('Evans Kitchen Cabinet Install', '2026-02-07 07:00:00+00', '2026-02-07 16:00:00+00', 'installation', 'pending', '348 Willowwood Way'),
  ('Edwards Spa Bathroom Quote', '2026-02-07 10:00:00+00', '2026-02-07 11:30:00+00', 'quote', 'pending', '459 Fernwood Street'),
  
  ('Collins Fireplace Installation', '2026-02-08 08:00:00+00', '2026-02-08 15:00:00+00', 'installation', 'pending', '561 Briarwood Ave'),
  ('Stewart Closet System Quote', '2026-02-08 11:30:00+00', '2026-02-08 13:00:00+00', 'quote', 'pending', '672 Wildwood Court'),
  ('Sanchez Plumbing Inspection', '2026-02-08 09:00:00+00', '2026-02-08 10:00:00+00', 'inspection', 'pending', '783 Greenwood Lane'),
  
  ('Morris Mudroom Renovation', '2026-02-09 08:30:00+00', '2026-02-09 16:30:00+00', 'installation', 'pending', '894 Ridgewood Road'),
  ('Rogers Laundry Room Quote', '2026-02-09 10:00:00+00', '2026-02-09 11:00:00+00', 'quote', 'pending', '905 Shadewood Place'),
  
  ('Reed Concrete Patio Pour', '2026-02-10 06:30:00+00', '2026-02-10 14:00:00+00', 'installation', 'pending', '116 Stonewood Drive'),
  ('Cook Home Gym Quote', '2026-02-10 11:00:00+00', '2026-02-10 12:30:00+00', 'quote', 'pending', '227 Ironwood Way'),
  ('Morgan Electrical Final', '2026-02-10 15:00:00+00', '2026-02-10 16:00:00+00', 'inspection', 'pending', '338 Driftwood Street'),
  
  ('Bell Trim Carpentry', '2026-02-11 08:00:00+00', '2026-02-11 15:00:00+00', 'installation', 'pending', '449 Heartwood Ave'),
  ('Murphy Sunroom Quote', '2026-02-11 09:30:00+00', '2026-02-11 11:00:00+00', 'quote', 'pending', '551 Cottonwood Court'),
  
  -- Week 4: February 12-18, 2026
  ('Bailey Master Bath Remodel', '2026-02-12 07:00:00+00', '2026-02-12 17:00:00+00', 'installation', 'pending', '662 Teakwood Lane'),
  ('Rivera Deck Extension Quote', '2026-02-12 10:30:00+00', '2026-02-12 12:00:00+00', 'quote', 'pending', '773 Cherrywood Road'),
  ('Cooper Foundation Inspection', '2026-02-12 14:00:00+00', '2026-02-12 15:30:00+00', 'inspection', 'pending', '884 Applewood Place'),
  
  ('Richardson Fence Installation', '2026-02-13 08:00:00+00', '2026-02-13 16:00:00+00', 'installation', 'pending', '995 Pearwood Drive'),
  ('Cox Basement Bar Quote', '2026-02-13 11:00:00+00', '2026-02-13 12:30:00+00', 'quote', 'pending', '106 Limewood Way'),
  ('Howard Follow-up Call', '2026-02-13 15:00:00+00', '2026-02-13 15:30:00+00', 'follow_up', 'pending', 'Phone Call'),
  
  ('Ward Skylight Installation', '2026-02-14 08:30:00+00', '2026-02-14 14:00:00+00', 'installation', 'pending', '217 Boxwood Street'),
  ('Torres Exercise Room Quote', '2026-02-14 10:00:00+00', '2026-02-14 11:30:00+00', 'quote', 'pending', '328 Sandalwood Ave'),
  
  ('Peterson Whole House Fan', '2026-02-15 09:00:00+00', '2026-02-15 13:00:00+00', 'installation', 'pending', '439 Yellowwood Court'),
  ('Gray Pantry Remodel Quote', '2026-02-15 14:00:00+00', '2026-02-15 15:30:00+00', 'quote', 'pending', '541 Whitewood Lane'),
  ('Ramirez HVAC Inspection', '2026-02-15 11:00:00+00', '2026-02-15 12:00:00+00', 'inspection', 'pending', '652 Blackwood Road'),
  
  ('James Hardwood Floor Refinish', '2026-02-16 07:00:00+00', '2026-02-16 18:00:00+00', 'installation', 'pending', '763 Silverwood Place'),
  ('Watson Carriage House Quote', '2026-02-16 10:30:00+00', '2026-02-16 12:00:00+00', 'quote', 'pending', '874 Goldwood Drive'),
  
  ('Brooks Accent Wall Install', '2026-02-17 08:00:00+00', '2026-02-17 12:00:00+00', 'installation', 'pending', '985 Bronzewood Way'),
  ('Kelly Pool Deck Quote', '2026-02-17 13:00:00+00', '2026-02-17 14:30:00+00', 'quote', 'pending', '196 Copperwood Street'),
  ('Sanders Building Permit Final', '2026-02-17 10:00:00+00', '2026-02-17 11:00:00+00', 'inspection', 'pending', '207 Brassworth Ave'),
  
  ('Price Outdoor Fireplace', '2026-02-18 08:30:00+00', '2026-02-18 16:00:00+00', 'installation', 'pending', '318 Steelwood Court'),
  ('Bennett Greenhouse Quote', '2026-02-18 11:00:00+00', '2026-02-18 12:30:00+00', 'quote', 'pending', '429 Ironwood Lane'),
  ('Wood Garage Conversion Final', '2026-02-18 14:00:00+00', '2026-02-18 15:00:00+00', 'inspection', 'pending', '531 Tinwood Road');
