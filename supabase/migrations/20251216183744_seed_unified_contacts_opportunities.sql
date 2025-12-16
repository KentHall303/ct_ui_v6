/*
  # Generate Unified Seed Data for Contacts and Opportunities

  1. Data Generation
    - Clear existing contacts and opportunities (preserves sales_cycles)
    - Generate 25 sample contacts with realistic data
    - Create matching opportunities for each contact
    - Link contacts and opportunities via contact_id and opportunity_id
    - Map sales_cycle names to sales_cycle_id values
    - Distribute contacts across different sales cycles
    - Use realistic names, emails, phones, states, lead sources

  2. Important Notes
    - All contacts have corresponding opportunities (visible in Contacts page)
    - Opportunities distributed across sales cycles
    - Random but realistic data for all fields
    - Estimated values between $10,000 and $150,000
    - Various priorities and contact types
*/

-- Clear existing contacts and opportunities (but keep sales_cycles)
DELETE FROM contacts;
DELETE FROM opportunities;

-- Generate seed data
DO $$
DECLARE
  cycle_ids uuid[];
  cycle_names text[];
  new_contact_id uuid;
  new_opp_id uuid;
  random_cycle_idx integer;
  random_priority text;
  random_value numeric;
  random_state text;
  random_lead_source text;
  random_color text;
  priority_options text[] := ARRAY['new_lead', 'missed_action', 'today_action', 'pending_action', 'no_pending'];
  state_options text[] := ARRAY['CA', 'TX', 'FL', 'NY', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];
  lead_source_options text[] := ARRAY['Website', 'Referral', 'Cold Call', 'LinkedIn', 'Facebook', 'Google Ads', 'Trade Show', 'Email Campaign'];
  color_options text[] := ARRAY['bg-success', 'bg-warning', 'bg-danger'];
  names text[] := ARRAY[
    'John Smith', 'Sarah Johnson', 'Michael Davis', 'Emily Brown', 'Robert Wilson',
    'Jennifer Martinez', 'David Anderson', 'Jessica Taylor', 'William Thomas', 'Ashley Garcia',
    'James Rodriguez', 'Amanda Lopez', 'Christopher Lee', 'Melissa White', 'Daniel Harris',
    'Nicole Clark', 'Matthew Lewis', 'Stephanie Walker', 'Joseph Hall', 'Laura Allen',
    'Ryan Young', 'Elizabeth King', 'Andrew Wright', 'Rachel Green', 'Brian Scott'
  ];
  companies text[] := ARRAY[
    'ABC Corporation', 'XYZ Industries', 'Tech Solutions Inc', 'Global Enterprises', 'Innovative Co',
    'Premier Services', 'Advanced Systems', 'Dynamic Solutions', 'Elite Ventures', 'Quality Corp',
    'Strategic Partners', 'Future Tech', 'Summit Group', 'Apex Solutions', 'Nexus Industries',
    'Vertex Corporation', 'Pinnacle Enterprises', 'Horizon Systems', 'Zenith Technologies', 'Crown Industries',
    'Omega Solutions', 'Delta Services', 'Alpha Systems', 'Sigma Corporation', 'Gamma Enterprises'
  ];
  i integer;
  contact_order integer := 0;
BEGIN
  -- Get sales cycle IDs and names
  SELECT array_agg(id ORDER BY order_position), array_agg(name ORDER BY order_position)
  INTO cycle_ids, cycle_names
  FROM sales_cycles
  WHERE is_active = true;

  -- Generate 25 contacts with linked opportunities
  FOR i IN 1..25 LOOP
    -- Select random sales cycle
    random_cycle_idx := 1 + floor(random() * array_length(cycle_ids, 1))::integer;
    
    -- Generate random data
    random_priority := priority_options[1 + floor(random() * 5)::integer];
    random_value := (RANDOM() * 140000 + 10000)::numeric(10,2);
    random_state := state_options[1 + floor(random() * array_length(state_options, 1))::integer];
    random_lead_source := lead_source_options[1 + floor(random() * array_length(lead_source_options, 1))::integer];
    random_color := color_options[1 + floor(random() * array_length(color_options, 1))::integer];
    
    -- Create contact
    new_contact_id := gen_random_uuid();
    
    INSERT INTO contacts (
      id,
      name,
      email,
      cell_phone,
      state,
      sales_cycle,
      lead_source,
      created_date,
      white_board,
      status_color,
      is_starred,
      client_tether,
      assigned_user,
      next_date,
      favorite_color,
      created_at,
      updated_at
    ) VALUES (
      new_contact_id,
      names[i],
      lower(replace(names[i], ' ', '.')) || '@example.com',
      '(' || (200 + floor(random() * 800)::integer)::text || ') ' || 
        (200 + floor(random() * 800)::integer)::text || '-' ||
        (1000 + floor(random() * 9000)::integer)::text,
      random_state,
      cycle_names[random_cycle_idx],
      random_lead_source,
      now() - (floor(random() * 90)::integer || ' days')::interval,
      CASE 
        WHEN random() < 0.3 THEN 'Follow up needed'
        WHEN random() < 0.6 THEN 'Hot lead'
        ELSE ''
      END,
      random_color,
      random() < 0.2,
      CASE WHEN random() < 0.7 THEN 'Primary Contact' ELSE 'Secondary Contact' END,
      CASE 
        WHEN random() < 0.33 THEN 'John Doe'
        WHEN random() < 0.66 THEN 'Jane Smith'
        ELSE 'Bob Johnson'
      END,
      CASE 
        WHEN random() < 0.5 THEN now() + (floor(random() * 30)::integer || ' days')::interval
        ELSE NULL
      END,
      CASE 
        WHEN random() < 0.25 THEN 'Red'
        WHEN random() < 0.5 THEN 'Blue'
        WHEN random() < 0.75 THEN 'Green'
        ELSE 'Yellow'
      END,
      now() - (floor(random() * 90)::integer || ' days')::interval,
      now()
    );
    
    -- Get max order_position for this sales cycle
    SELECT COALESCE(MAX(order_position), -1) + 1
    INTO contact_order
    FROM opportunities
    WHERE sales_cycle_id = cycle_ids[random_cycle_idx];
    
    -- Create corresponding opportunity
    new_opp_id := gen_random_uuid();
    
    INSERT INTO opportunities (
      id,
      contact_id,
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
      new_opp_id,
      new_contact_id,
      names[i],
      companies[i],
      lower(replace(names[i], ' ', '.')) || '@example.com',
      '(' || (200 + floor(random() * 800)::integer)::text || ') ' || 
        (200 + floor(random() * 800)::integer)::text || '-' ||
        (1000 + floor(random() * 9000)::integer)::text,
      cycle_ids[random_cycle_idx],
      random_value,
      random_priority,
      random_lead_source,
      CASE WHEN random() < 0.7 THEN 'Client' ELSE 'Prospect' END,
      contact_order,
      now() - (floor(random() * 90)::integer || ' days')::interval,
      now()
    );
    
    -- Link contact to opportunity
    UPDATE contacts
    SET opportunity_id = new_opp_id
    WHERE id = new_contact_id;
    
  END LOOP;
END $$;