/*
  # Seed Messages Data
  
  1. Sample Data
    - Creates 30 messages of different types
    - Includes emails, texts, calls, and Thumbtack leads
    - Mix of inbound and outbound communications
  
  2. Message Details
    - Various contact types and lead statuses
    - Realistic content and metadata
    - Read/unread and starred states
    - Recent timestamps for active communication threads
*/

INSERT INTO messages (type, direction, subject, body, preview_text, sender_name, sender_email, sender_phone, is_read, is_starred, timestamp, contact_type, lead_status, company_name, opportunity_name, user_id, created_at) VALUES
  -- Inbound emails from prospects
  ('email', 'inbound', 'Interested in Kitchen Remodel', 'Hi, I found your company online and I''m interested in getting a quote for a complete kitchen remodel. Our kitchen is about 200 sq ft and we''re looking to update everything - cabinets, countertops, appliances, flooring. When would you be available for a consultation?', 'Hi, I found your company online and I''m interested in getting a quote for a complete kitchen remodel...', 'Jennifer Williams', 'jwilliams2024@email.com', '(555) 123-7890', true, false, now() - interval '2 hours', 'candidates', 'new', NULL, 'Kitchen Remodel - Williams Residence', NULL, now() - interval '2 hours'),
  
  ('email', 'inbound', 'Quote Request - Bathroom Addition', 'Hello, we''re planning to add a master bathroom to our home and would like to schedule a consultation. We have the floor plans ready and are hoping to start in the next 2-3 months. Please let me know your availability.', 'Hello, we''re planning to add a master bathroom to our home and would like to schedule a consultation...', 'David Martinez', 'dmartinez@email.com', '(555) 234-8901', false, true, now() - interval '5 hours', 'candidates', 'new', NULL, 'Master Bath Addition', NULL, now() - interval '5 hours'),
  
  ('email', 'inbound', 'Re: Proposal #2024-156', 'Thank you for the detailed proposal. We''ve reviewed everything and have a few questions about the timeline and material selections. Can we schedule a call this week to discuss?', 'Thank you for the detailed proposal. We''ve reviewed everything and have a few questions...', 'Sarah Thompson', 'sthompson@email.com', '(555) 345-9012', true, false, now() - interval '1 day', 'candidates', 'contacted', NULL, 'Deck Construction - Thompson', NULL, now() - interval '1 day'),
  
  ('email', 'inbound', 'Project Timeline Question', 'Hi, we received your quote for the basement finishing project. The pricing looks good, but we''re wondering if you could complete the work by mid-December for the holidays. Let us know if that''s possible.', 'Hi, we received your quote for the basement finishing project. The pricing looks good, but we''re wondering...', 'Robert Chen', 'rchen@email.com', '(555) 456-0123', false, false, now() - interval '3 hours', 'candidates', 'qualified', NULL, 'Basement Finishing - Chen', NULL, now() - interval '3 hours'),
  
  -- Outbound emails to prospects
  ('email', 'outbound', 'Your Kitchen Remodel Quote - Proposal #2024-189', 'Dear Mr. and Mrs. Martinez, Thank you for meeting with us yesterday. As discussed, I''ve attached a detailed proposal for your kitchen remodel project. The total investment is $45,000 and includes all materials, labor, and permits. We can start within 3 weeks of contract signing.', 'Dear Mr. and Mrs. Martinez, Thank you for meeting with us yesterday...', 'Your Company', 'quotes@yourcompany.com', '(555) 000-0001', true, false, now() - interval '2 days', 'candidates', 'contacted', NULL, 'Kitchen Remodel - Martinez', NULL, now() - interval '2 days'),
  
  ('email', 'outbound', 'Follow-up: Roof Replacement Consultation', 'Hi Emily, I wanted to follow up on our site visit last week. Have you had a chance to review the proposal we sent? I''m happy to answer any questions you might have about the project scope or timeline.', 'Hi Emily, I wanted to follow up on our site visit last week...', 'Your Company', 'info@yourcompany.com', '(555) 000-0001', true, false, now() - interval '4 days', 'candidates', 'contacted', NULL, 'Roof Replacement - Johnson', NULL, now() - interval '4 days'),
  
  ('email', 'outbound', 'Thank You for Your Business!', 'Dear Mr. Anderson, Thank you for choosing us for your window replacement project. We''re thrilled with how everything turned out! As discussed, your final invoice is attached. We''d greatly appreciate it if you could leave us a review on Google.', 'Dear Mr. Anderson, Thank you for choosing us for your window replacement project...', 'Your Company', 'info@yourcompany.com', '(555) 000-0001', true, false, now() - interval '6 days', 'candidates', 'converted', NULL, 'Window Replacement - Anderson', NULL, now() - interval '6 days'),
  
  -- Text messages
  ('text', 'inbound', '', 'Hi, this is Lisa from 456 Oak St. Our kitchen cabinets were supposed to be delivered today but we haven''t heard anything. Can you give me an update?', 'Hi, this is Lisa from 456 Oak St. Our kitchen cabinets were supposed to be delivered today...', 'Lisa Parker', '', '(555) 567-1234', true, false, now() - interval '6 hours', 'candidates', 'contacted', NULL, 'Kitchen Remodel - Parker', NULL, now() - interval '6 hours'),
  
  ('text', 'outbound', '', 'Good news! Your cabinets arrived this morning and our team will be there tomorrow at 8am to start installation. The project is on schedule.', 'Good news! Your cabinets arrived this morning and our team will be there tomorrow at 8am...', 'Your Company', '', '(555) 000-0001', true, false, now() - interval '5 hours', 'candidates', 'contacted', NULL, 'Kitchen Remodel - Parker', NULL, now() - interval '5 hours'),
  
  ('text', 'inbound', '', 'Thanks for the quick update! See you tomorrow morning.', 'Thanks for the quick update! See you tomorrow morning.', 'Lisa Parker', '', '(555) 567-1234', true, false, now() - interval '4 hours', 'candidates', 'contacted', NULL, 'Kitchen Remodel - Parker', NULL, now() - interval '4 hours'),
  
  ('text', 'inbound', '', 'Hey, I got your card at the home show last month. Still interested in that deck project we talked about. Are you available for a quote this week?', 'Hey, I got your card at the home show last month. Still interested in that deck project...', 'Mike Sullivan', '', '(555) 678-2345', false, false, now() - interval '8 hours', 'candidates', 'new', NULL, 'Deck Project - Sullivan', NULL, now() - interval '8 hours'),
  
  ('text', 'outbound', '', 'Hi Mike! Great to hear from you. I have availability Thursday at 2pm or Friday at 10am this week. Which works better for you?', 'Hi Mike! Great to hear from you. I have availability Thursday at 2pm or Friday at 10am...', 'Your Company', '', '(555) 000-0001', true, false, now() - interval '7 hours', 'candidates', 'contacted', NULL, 'Deck Project - Sullivan', NULL, now() - interval '7 hours'),
  
  -- Call logs
  ('call', 'inbound', '', 'Customer called requesting emergency roof repair after storm damage. Left callback number.', 'Customer called requesting emergency roof repair after storm damage...', 'Unknown Caller', '', '(555) 789-3456', true, true, now() - interval '3 hours', 'candidates', 'new', NULL, 'Emergency Roof Repair', NULL, now() - interval '3 hours'),
  
  ('call', 'outbound', '', 'Called back re: emergency roof repair. Scheduled for site visit tomorrow at 9am. Customer concerned about water damage.', 'Called back re: emergency roof repair. Scheduled for site visit tomorrow at 9am...', 'Your Company', '', '(555) 000-0001', true, true, now() - interval '2 hours', 'candidates', 'contacted', NULL, 'Emergency Roof Repair', NULL, now() - interval '2 hours'),
  
  ('call', 'inbound', '', 'Spoke with Mrs. Garcia about bathroom remodel timeline. She''s ready to move forward and wants to schedule a start date. Transferred to project coordinator.', 'Spoke with Mrs. Garcia about bathroom remodel timeline...', 'Maria Garcia', '', '(555) 890-1234', true, false, now() - interval '1 day', 'candidates', 'qualified', NULL, 'Bathroom Remodel - Garcia', NULL, now() - interval '1 day'),
  
  ('call', 'outbound', '', 'Follow-up call to Mr. Brown regarding deck proposal. Left voicemail asking him to review materials selection page and call back with questions.', 'Follow-up call to Mr. Brown regarding deck proposal. Left voicemail asking him to review...', 'Your Company', '', '(555) 000-0001', true, false, now() - interval '2 days', 'candidates', 'contacted', NULL, 'Deck Construction - Brown', NULL, now() - interval '2 days'),
  
  -- Thumbtack leads
  ('thumbtack', 'inbound', 'New Thumbtack Lead: Kitchen Remodel', 'ZIP: 62701 | Project: Complete kitchen renovation | Budget: $40,000-$60,000 | Timeline: 2-3 months | Details: Looking to update 1970s kitchen with modern cabinets, quartz countertops, new appliances, and tile backsplash. Approximately 180 sq ft.', 'ZIP: 62701 | Project: Complete kitchen renovation | Budget: $40,000-$60,000...', 'Patricia Nelson', 'pnelson@email.com', '(555) 901-2345', false, true, now() - interval '1 hour', 'candidates', 'new', NULL, 'Kitchen Remodel - Nelson', NULL, now() - interval '1 hour'),
  
  ('thumbtack', 'inbound', 'New Thumbtack Lead: Bathroom Addition', 'ZIP: 62702 | Project: Add new bathroom | Budget: $25,000-$35,000 | Timeline: Flexible | Details: Need to add a second full bathroom to single-bath home. Have rough location picked out. Looking for design ideas and accurate quote.', 'ZIP: 62702 | Project: Add new bathroom | Budget: $25,000-$35,000...', 'James Wilson', 'jwilson@email.com', '(555) 012-3456', false, false, now() - interval '4 hours', 'candidates', 'new', NULL, 'Bathroom Addition - Wilson', NULL, now() - interval '4 hours'),
  
  ('thumbtack', 'inbound', 'New Thumbtack Lead: Deck Construction', 'ZIP: 62703 | Project: Build new deck | Budget: $15,000-$25,000 | Timeline: Spring 2025 | Details: Want to build 16x20 ft deck off back of house. Prefer composite materials. Need design help and professional installation.', 'ZIP: 62703 | Project: Build new deck | Budget: $15,000-$25,000...', 'Angela Rodriguez', 'arodriguez@email.com', '(555) 123-4567', false, false, now() - interval '1 day', 'candidates', 'new', NULL, 'Deck Construction - Rodriguez', NULL, now() - interval '1 day'),
  
  -- Additional varied messages
  ('email', 'inbound', 'Question about your services', 'Do you handle commercial projects? We have a small office space that needs renovation and we''re looking for a reliable contractor. About 2,000 sq ft.', 'Do you handle commercial projects? We have a small office space that needs renovation...', 'Steven Adams', 'sadams@smallbiz.com', '(555) 234-5678', false, false, now() - interval '12 hours', 'candidates', 'new', 'Small Business Inc', 'Office Renovation', NULL, now() - interval '12 hours'),
  
  ('email', 'inbound', 'Re: Office Build-Out Quote', 'We''ve received approval from the board to move forward with the office renovation. Can we schedule a kickoff meeting next week? We''d like to start by mid-January.', 'We''ve received approval from the board to move forward with the office renovation...', 'Karen Lee', 'klee@techstartup.com', '(555) 345-6789', true, true, now() - interval '6 hours', 'candidates', 'qualified', 'Tech Startup LLC', 'Office Build-Out - Tech Startup', NULL, now() - interval '6 hours'),
  
  ('text', 'inbound', '', 'Quick question - do you offer payment plans for larger projects? Looking at a $50k+ kitchen remodel.', 'Quick question - do you offer payment plans for larger projects?...', 'Thomas Wright', '', '(555) 456-7890', false, false, now() - interval '9 hours', 'candidates', 'new', NULL, 'Kitchen Remodel - Wright', NULL, now() - interval '9 hours'),
  
  ('text', 'outbound', '', 'Yes, we offer flexible payment plans! Typically 30% down, 40% at project midpoint, and 30% upon completion. We can also discuss other options. When would you like to meet?', 'Yes, we offer flexible payment plans! Typically 30% down, 40% at project midpoint...', 'Your Company', '', '(555) 000-0001', true, false, now() - interval '8 hours', 'candidates', 'contacted', NULL, 'Kitchen Remodel - Wright', NULL, now() - interval '8 hours'),
  
  ('call', 'inbound', '', 'Referral from John Martinez. Customer interested in similar kitchen remodel work. Scheduled consultation for next Tuesday at 3pm.', 'Referral from John Martinez. Customer interested in similar kitchen remodel work...', 'Rachel Foster', '', '(555) 567-8901', true, false, now() - interval '5 hours', 'candidates', 'contacted', NULL, 'Kitchen Remodel - Foster (Referral)', NULL, now() - interval '5 hours'),
  
  ('email', 'outbound', 'Project Completion & Final Walkthrough', 'Dear Mrs. Garcia, Your bathroom addition is complete! We''d like to schedule a final walkthrough with you this week. Please let us know what day works best. We''re confident you''ll love the results!', 'Dear Mrs. Garcia, Your bathroom addition is complete! We''d like to schedule a final walkthrough...', 'Your Company', 'projects@yourcompany.com', '(555) 000-0001', true, false, now() - interval '3 days', 'candidates', 'converted', NULL, 'Bathroom Addition - Garcia', NULL, now() - interval '3 days'),
  
  ('thumbtack', 'inbound', 'New Thumbtack Lead: Basement Finishing', 'ZIP: 62705 | Project: Finish basement | Budget: $35,000-$50,000 | Timeline: 3-4 months | Details: 1,000 sq ft unfinished basement. Want family room, bedroom, bathroom, and utility closet. Need help with design and layout.', 'ZIP: 62705 | Project: Finish basement | Budget: $35,000-$50,000...', 'Christopher Davis', 'cdavis@email.com', '(555) 678-9012', false, true, now() - interval '2 hours', 'candidates', 'new', NULL, 'Basement Finishing - Davis', NULL, now() - interval '2 hours'),
  
  ('email', 'inbound', 'Can you match this price?', 'Hi, I got another quote for my roof replacement that came in at $15,500. Your quote is $18,500. Can you match or come closer to that price? I prefer to work with your company based on reviews.', 'Hi, I got another quote for my roof replacement that came in at $15,500...', 'Barbara Miller', 'bmiller@email.com', '(555) 789-0123', false, false, now() - interval '10 hours', 'candidates', 'qualified', NULL, 'Roof Replacement - Miller', NULL, now() - interval '10 hours'),
  
  ('call', 'outbound', '', 'Discussed pricing with Barbara Miller. Explained quality differences in materials and our warranty. She''s thinking it over and will call back by Friday.', 'Discussed pricing with Barbara Miller. Explained quality differences...', 'Your Company', '', '(555) 000-0001', true, false, now() - interval '9 hours', 'candidates', 'qualified', NULL, 'Roof Replacement - Miller', NULL, now() - interval '9 hours'),
  
  ('text', 'inbound', '', 'Project looks great! Neighbors are already asking for your number 😊', 'Project looks great! Neighbors are already asking for your number', 'John Martinez', '', '(555) 234-5678', true, true, now() - interval '1 day', 'candidates', 'converted', NULL, 'Kitchen Remodel - Martinez', NULL, now() - interval '1 day');