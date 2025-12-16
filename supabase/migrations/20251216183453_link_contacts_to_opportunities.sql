/*
  # Link Existing Contacts to Opportunities

  1. Data Migration
    - For each existing contact, create a corresponding opportunity
    - Link opportunity to contact via contact_id
    - Map contact's sales_cycle field to find matching sales_cycle_id
    - Generate random but realistic opportunity fields (estimated_value, priority, contact_type)
    - Link contact back to opportunity via opportunity_id
    - Preserve all existing contact data (email, phone, lead_source, etc.)

  2. Important Notes
    - Contacts with no sales_cycle will be assigned to first sales cycle (Lead/New Lead)
    - Random estimated values between $5,000 and $100,000
    - Priorities distributed across: new_lead, missed_action, today_action, pending_action, no_pending
    - Contact type defaults to 'Client' or 'Prospect'
*/

-- Step 1: Create opportunities for existing contacts that don't have linked opportunities yet
DO $$
DECLARE
  contact_record RECORD;
  cycle_id uuid;
  new_opp_id uuid;
  random_value numeric;
  random_priority text;
  priority_options text[] := ARRAY['new_lead', 'missed_action', 'today_action', 'pending_action', 'no_pending'];
  contact_type_val text;
  max_order_position integer;
BEGIN
  FOR contact_record IN 
    SELECT * FROM contacts WHERE opportunity_id IS NULL
  LOOP
    -- Find matching sales_cycle_id based on contact's sales_cycle name
    SELECT id INTO cycle_id
    FROM sales_cycles
    WHERE name = contact_record.sales_cycle
    AND is_active = true
    LIMIT 1;
    
    -- If no match found, use the first active sales cycle
    IF cycle_id IS NULL THEN
      SELECT id INTO cycle_id
      FROM sales_cycles
      WHERE is_active = true
      ORDER BY order_position
      LIMIT 1;
    END IF;
    
    -- Generate random estimated value between $5,000 and $100,000
    random_value := (RANDOM() * 95000 + 5000)::numeric(10,2);
    
    -- Select random priority
    random_priority := priority_options[1 + floor(random() * 5)];
    
    -- Determine contact type
    IF contact_record.client_tether IS NOT NULL AND contact_record.client_tether != '' THEN
      contact_type_val := 'Client';
    ELSE
      contact_type_val := 'Prospect';
    END IF;
    
    -- Get max order_position for this sales cycle
    SELECT COALESCE(MAX(order_position), -1) INTO max_order_position
    FROM opportunities
    WHERE sales_cycle_id = cycle_id;
    
    -- Create new opportunity
    INSERT INTO opportunities (
      id,
      contact_name,
      company_name,
      email,
      phone,
      sales_cycle_id,
      estimated_value,
      priority,
      lead_source,
      contact_type,
      order_position,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      contact_record.name,
      NULL, -- company_name defaults to null
      contact_record.email,
      contact_record.cell_phone,
      cycle_id,
      random_value,
      random_priority,
      contact_record.lead_source,
      contact_type_val,
      max_order_position + 1,
      contact_record.created_at,
      now()
    )
    RETURNING id INTO new_opp_id;
    
    -- Update opportunity with contact_id
    UPDATE opportunities
    SET contact_id = contact_record.id
    WHERE id = new_opp_id;
    
    -- Update contact with opportunity_id
    UPDATE contacts
    SET opportunity_id = new_opp_id
    WHERE id = contact_record.id;
    
  END LOOP;
END $$;