/*
  # Seed Messages Data

  1. Purpose
    - Populate the messages table with comprehensive communication history
    - Provide realistic examples of text, email, call, and Thumbtack messages
    - Support unified communication hub and message center features
    - Demonstrate various message types, directions, and statuses

  2. Data Inserted
    - 35 message records across different types and directions
    - Mix of read/unread and starred/unstarred messages
    - Various timestamps from past 30 days to show message history
    - Realistic message content and sender information
    - Inbound and outbound messages

  3. Fields Populated
    - contact_id: Set to null for demo data (can be linked later)
    - type: Message type (text, call, email, thumbtack)
    - direction: inbound or outbound
    - subject: Email subject lines
    - body: Full message content
    - preview_text: Short preview for list view
    - sender_name: Name of sender
    - sender_email: Email address
    - sender_phone: Phone number
    - is_read: Read status
    - is_starred: Star/pin status
    - timestamp: Message timestamp
    - user_id: Set to null for demo data

  4. Important Notes
    - Messages are distributed across different types and dates
    - Some messages are unread to show notification counts
    - Some messages are starred to show priority items
    - Email messages have subjects, others don't
    - Call messages include call duration in metadata
*/

-- Insert comprehensive message data
INSERT INTO messages (
  contact_id,
  type,
  direction,
  subject,
  body,
  preview_text,
  sender_name,
  sender_email,
  sender_phone,
  is_read,
  is_starred,
  timestamp,
  metadata,
  user_id
) VALUES
  -- Text Messages
  (
    NULL,
    'text',
    'inbound',
    '',
    'Hi! I received your quote for the kitchen remodel. When can we schedule a time to discuss the details?',
    'Hi! I received your quote for the kitchen remodel. When can we...',
    'Robert Johnson',
    '',
    '555-1001',
    false,
    true,
    now() - INTERVAL '2 hours',
    '{"phone_number": "555-1001"}',
    NULL
  ),
  (
    NULL,
    'text',
    'outbound',
    '',
    'Great to hear from you! I have availability tomorrow at 10am or Thursday at 2pm. Which works better for you?',
    'Great to hear from you! I have availability tomorrow at 10am or...',
    'Your Company',
    '',
    '555-0000',
    true,
    false,
    now() - INTERVAL '1 hour 45 minutes',
    '{"phone_number": "555-0000"}',
    NULL
  ),
  (
    NULL,
    'text',
    'inbound',
    '',
    'Thursday at 2pm works perfect. See you then!',
    'Thursday at 2pm works perfect. See you then!',
    'Robert Johnson',
    '',
    '555-1001',
    false,
    false,
    now() - INTERVAL '1 hour 30 minutes',
    '{"phone_number": "555-1001"}',
    NULL
  ),
  (
    NULL,
    'text',
    'inbound',
    '',
    'Do you offer financing options for larger projects?',
    'Do you offer financing options for larger projects?',
    'Patricia Williams',
    '',
    '555-1002',
    true,
    false,
    now() - INTERVAL '5 hours',
    '{"phone_number": "555-1002"}',
    NULL
  ),
  (
    NULL,
    'text',
    'inbound',
    '',
    'Just wanted to say thank you for the excellent work on our bathroom! It looks amazing!',
    'Just wanted to say thank you for the excellent work on our...',
    'Sarah Anderson',
    '',
    '555-1006',
    true,
    true,
    now() - INTERVAL '1 day',
    '{"phone_number": "555-1006"}',
    NULL
  ),
  (
    NULL,
    'text',
    'inbound',
    '',
    'Can you send me some references from previous deck projects?',
    'Can you send me some references from previous deck projects?',
    'Michael Davis',
    '',
    '555-1003',
    false,
    false,
    now() - INTERVAL '3 hours',
    '{"phone_number": "555-1003"}',
    NULL
  ),
  (
    NULL,
    'text',
    'outbound',
    '',
    'Absolutely! I''ll email you a list of recent deck projects with photos and contact info for references.',
    'Absolutely! I''ll email you a list of recent deck projects with...',
    'Your Company',
    '',
    '555-0000',
    true,
    false,
    now() - INTERVAL '2 hours 45 minutes',
    '{"phone_number": "555-0000"}',
    NULL
  ),
  (
    NULL,
    'text',
    'inbound',
    '',
    'We need to reschedule tomorrow''s appointment. Can we move it to next week?',
    'We need to reschedule tomorrow''s appointment. Can we move it...',
    'Jennifer Martinez',
    '',
    '555-1004',
    false,
    true,
    now() - INTERVAL '4 hours',
    '{"phone_number": "555-1004"}',
    NULL
  ),

  -- Email Messages
  (
    NULL,
    'email',
    'inbound',
    'Question about your services',
    'Hello,\n\nI''m interested in getting a quote for replacing the siding on my house. The house is approximately 2,200 square feet. Can you provide an estimate and let me know your availability for a site visit?\n\nBest regards,\nDavid Thompson',
    'Hello, I''m interested in getting a quote for replacing the siding...',
    'David Thompson',
    'david.thompson@email.com',
    '555-1005',
    true,
    false,
    now() - INTERVAL '1 day 5 hours',
    '{"email_id": "msg_abc123", "has_attachments": false}',
    NULL
  ),
  (
    NULL,
    'email',
    'outbound',
    'Re: Question about your services',
    'Hi David,\n\nThank you for reaching out! I''d be happy to provide a quote for your siding replacement project.\n\nI have availability for a site visit this Thursday at 10am or Friday at 2pm. The visit typically takes 30-45 minutes, and I''ll be able to provide a detailed quote within 24 hours after the visit.\n\nPlease let me know which time works best for you.\n\nBest regards,\nYour Name',
    'Hi David, Thank you for reaching out! I''d be happy to provide a...',
    'Your Company',
    'info@yourcompany.com',
    '555-0000',
    true,
    false,
    now() - INTERVAL '1 day 2 hours',
    '{"email_id": "msg_abc124", "in_reply_to": "msg_abc123"}',
    NULL
  ),
  (
    NULL,
    'email',
    'inbound',
    'Payment confirmation needed',
    'Hi,\n\nI made a payment last week but haven''t received a confirmation email yet. Can you please confirm that you received the $5,000 deposit for our kitchen project?\n\nThanks,\nLinda Garcia',
    'Hi, I made a payment last week but haven''t received a confirmation...',
    'Linda Garcia',
    'linda.garcia@email.com',
    '555-1008',
    false,
    true,
    now() - INTERVAL '6 hours',
    '{"email_id": "msg_def456", "has_attachments": false}',
    NULL
  ),
  (
    NULL,
    'email',
    'inbound',
    'Thank you!',
    'I wanted to send a quick note to thank you and your team for the wonderful job on our window installation. Everything looks perfect and the crew was very professional. I''ll definitely be recommending your services to friends and family!\n\nBest,\nChristopher Lee',
    'I wanted to send a quick note to thank you and your team for the...',
    'Christopher Lee',
    'christopher.lee@email.com',
    '555-1009',
    true,
    true,
    now() - INTERVAL '2 days',
    '{"email_id": "msg_ghi789", "has_attachments": false}',
    NULL
  ),
  (
    NULL,
    'email',
    'inbound',
    'Change order request',
    'Hello,\n\nAfter thinking about it, we''d like to add an additional window to the bedroom as part of the project. Can you provide pricing for this change and let me know how it affects the timeline?\n\nAttached is a photo showing where we''d like the window installed.\n\nThanks,\nElizabeth Brown',
    'Hello, After thinking about it, we''d like to add an additional...',
    'Elizabeth Brown',
    'elizabeth.brown@email.com',
    '555-1010',
    false,
    false,
    now() - INTERVAL '8 hours',
    '{"email_id": "msg_jkl012", "has_attachments": true, "attachment_count": 1}',
    NULL
  ),
  (
    NULL,
    'email',
    'outbound',
    'Your Quote - Kitchen Remodel Project',
    'Dear Robert,\n\nThank you for meeting with me yesterday. As promised, I''ve attached a detailed quote for your kitchen remodel project.\n\nThe quote includes:\n- Complete cabinet installation\n- Countertop replacement\n- New appliances\n- Electrical upgrades\n- Plumbing modifications\n\nTotal investment: $45,000\nEstimated timeline: 6-8 weeks\n\nPlease review and let me know if you have any questions. I''m happy to schedule another meeting to discuss any details.\n\nBest regards,\nYour Name',
    'Dear Robert, Thank you for meeting with me yesterday. As promised...',
    'Your Company',
    'info@yourcompany.com',
    '555-0000',
    true,
    false,
    now() - INTERVAL '3 days',
    '{"email_id": "msg_mno345", "has_attachments": true, "attachment_count": 1}',
    NULL
  ),
  (
    NULL,
    'email',
    'inbound',
    'Warranty information request',
    'Hi,\n\nCould you please send me the warranty information for the HVAC system you installed last month? I need it for my home warranty company.\n\nThank you,\nJames Wilson',
    'Hi, Could you please send me the warranty information for the HVAC...',
    'James Wilson',
    'james.wilson@email.com',
    '555-1007',
    true,
    false,
    now() - INTERVAL '12 hours',
    '{"email_id": "msg_pqr678", "has_attachments": false}',
    NULL
  ),

  -- Call Messages
  (
    NULL,
    'call',
    'inbound',
    '',
    'Customer called to ask about availability for a roofing project. Discussed timeline and scheduled site visit for next Tuesday at 9am.',
    'Customer called to ask about availability for a roofing project...',
    'Jennifer Martinez',
    '',
    '555-1004',
    true,
    false,
    now() - INTERVAL '4 days',
    '{"call_duration": 420, "call_type": "general_inquiry"}',
    NULL
  ),
  (
    NULL,
    'call',
    'outbound',
    '',
    'Called to follow up on quote sent last week. Left voicemail asking client to call back to discuss.',
    'Called to follow up on quote sent last week. Left voicemail...',
    'Your Company',
    '',
    '555-0000',
    true,
    false,
    now() - INTERVAL '2 days 3 hours',
    '{"call_duration": 45, "call_type": "follow_up", "voicemail": true}',
    NULL
  ),
  (
    NULL,
    'call',
    'inbound',
    '',
    'Customer called with questions about payment options and financing. Explained our payment plans and sent follow-up email with details.',
    'Customer called with questions about payment options and financing...',
    'Patricia Williams',
    '',
    '555-1002',
    true,
    false,
    now() - INTERVAL '1 day 8 hours',
    '{"call_duration": 540, "call_type": "payment_inquiry"}',
    NULL
  ),
  (
    NULL,
    'call',
    'inbound',
    '',
    'Customer called to report minor issue with installation. Scheduled service visit for tomorrow morning.',
    'Customer called to report minor issue with installation. Scheduled...',
    'Michael Davis',
    '',
    '555-1003',
    false,
    true,
    now() - INTERVAL '3 hours',
    '{"call_duration": 360, "call_type": "service_request"}',
    NULL
  ),
  (
    NULL,
    'call',
    'outbound',
    '',
    'Called to confirm tomorrow''s appointment. Client confirmed and asked about estimated completion time.',
    'Called to confirm tomorrow''s appointment. Client confirmed and...',
    'Your Company',
    '',
    '555-0000',
    true,
    false,
    now() - INTERVAL '10 hours',
    '{"call_duration": 180, "call_type": "appointment_confirmation"}',
    NULL
  ),
  (
    NULL,
    'call',
    'inbound',
    '',
    'Referral from existing client. New customer interested in bathroom remodel. Scheduled consultation for next Friday.',
    'Referral from existing client. New customer interested in bathroom...',
    'New Lead - Referral',
    '',
    '555-2001',
    false,
    true,
    now() - INTERVAL '5 hours',
    '{"call_duration": 480, "call_type": "new_lead", "referral_source": "Sarah Anderson"}',
    NULL
  ),

  -- Thumbtack Messages
  (
    NULL,
    'thumbtack',
    'inbound',
    'Deck Building Project',
    'I''m looking for someone to build a deck in my backyard. The space is approximately 20x15 feet. I''d like composite materials and need it completed before summer. Can you provide a quote?\n\n- Location: Springfield, IL\n- Budget: $10,000 - $15,000\n- Timeline: ASAP',
    'I''m looking for someone to build a deck in my backyard. The space...',
    'John Smith',
    'john.smith@email.com',
    '555-3001',
    false,
    false,
    now() - INTERVAL '1 day',
    '{"thumbtack_request_id": "req_12345", "project_type": "deck_building", "budget_range": "10000-15000"}',
    NULL
  ),
  (
    NULL,
    'thumbtack',
    'inbound',
    'Kitchen Remodeling',
    'Looking for a contractor to remodel my kitchen. Need new cabinets, countertops, and flooring. Would like to see examples of previous work.\n\n- Property Type: Single Family Home\n- Project Size: Full Kitchen\n- Timeline: Flexible',
    'Looking for a contractor to remodel my kitchen. Need new cabinets...',
    'Maria Rodriguez',
    'maria.rodriguez@email.com',
    '555-3002',
    true,
    false,
    now() - INTERVAL '3 days',
    '{"thumbtack_request_id": "req_12346", "project_type": "kitchen_remodel", "property_type": "single_family"}',
    NULL
  ),
  (
    NULL,
    'thumbtack',
    'outbound',
    'Re: Deck Building Project',
    'Hi John,\n\nThank you for your interest! I''d love to help with your deck project. I have extensive experience with composite decking and can definitely work within your budget and timeline.\n\nI''d like to schedule a free consultation to:\n- Discuss your design preferences\n- Take measurements\n- Provide a detailed quote\n\nAre you available for a site visit this week?\n\nBest regards,\nYour Name\nYour Company',
    'Hi John, Thank you for your interest! I''d love to help with your deck...',
    'Your Company',
    'info@yourcompany.com',
    '555-0000',
    true,
    false,
    now() - INTERVAL '23 hours',
    '{"thumbtack_request_id": "req_12345", "response_type": "quote_request"}',
    NULL
  ),
  (
    NULL,
    'thumbtack',
    'inbound',
    'Bathroom Renovation',
    'Need a complete bathroom renovation including new tub, vanity, toilet, and tile work. Bathroom is approximately 8x10 feet.\n\n- Start Date: Within 2 months\n- Budget: $15,000 - $20,000\n- Location: Springfield, IL',
    'Need a complete bathroom renovation including new tub, vanity...',
    'Karen White',
    'karen.white@email.com',
    '555-3003',
    false,
    true,
    now() - INTERVAL '8 hours',
    '{"thumbtack_request_id": "req_12347", "project_type": "bathroom_renovation", "budget_range": "15000-20000"}',
    NULL
  ),
  (
    NULL,
    'thumbtack',
    'inbound',
    'Roof Repair',
    'I have a leak in my roof that needs immediate attention. Looking for someone who can come out this week to assess and provide repair estimate.\n\n- Issue: Water leak\n- Urgency: High\n- Property: 2-story home',
    'I have a leak in my roof that needs immediate attention. Looking...',
    'Tom Harris',
    'tom.harris@email.com',
    '555-3004',
    false,
    true,
    now() - INTERVAL '2 hours',
    '{"thumbtack_request_id": "req_12348", "project_type": "roof_repair", "urgency": "high"}',
    NULL
  ),

  -- Additional varied messages
  (
    NULL,
    'text',
    'inbound',
    '',
    'What time should I expect your crew tomorrow?',
    'What time should I expect your crew tomorrow?',
    'Sarah Anderson',
    '',
    '555-1006',
    true,
    false,
    now() - INTERVAL '14 hours',
    '{"phone_number": "555-1006"}',
    NULL
  ),
  (
    NULL,
    'text',
    'outbound',
    '',
    'Our crew will arrive between 8:00-8:30am tomorrow morning. They''ll call 15 minutes before arrival.',
    'Our crew will arrive between 8:00-8:30am tomorrow morning. They''ll...',
    'Your Company',
    '',
    '555-0000',
    true,
    false,
    now() - INTERVAL '13 hours 45 minutes',
    '{"phone_number": "555-0000"}',
    NULL
  ),
  (
    NULL,
    'email',
    'inbound',
    'Request for additional services',
    'Hi,\n\nNow that the deck is complete, I''m thinking about adding a pergola over part of it. Can you provide a quote for that as well?\n\nThanks,\nMichael',
    'Hi, Now that the deck is complete, I''m thinking about adding a...',
    'Michael Davis',
    'michael.davis@email.com',
    '555-1003',
    false,
    false,
    now() - INTERVAL '18 hours',
    '{"email_id": "msg_stu901", "has_attachments": false}',
    NULL
  ),
  (
    NULL,
    'call',
    'inbound',
    '',
    'Customer called to express satisfaction with completed project and asked about warranty coverage.',
    'Customer called to express satisfaction with completed project and...',
    'Elizabeth Brown',
    '',
    '555-1010',
    true,
    true,
    now() - INTERVAL '5 days',
    '{"call_duration": 300, "call_type": "follow_up"}',
    NULL
  ),
  (
    NULL,
    'text',
    'inbound',
    '',
    'Can I get a copy of the final invoice emailed to me?',
    'Can I get a copy of the final invoice emailed to me?',
    'James Wilson',
    '',
    '555-1007',
    false,
    false,
    now() - INTERVAL '7 hours',
    '{"phone_number": "555-1007"}',
    NULL
  ),
  (
    NULL,
    'email',
    'outbound',
    'Project Completion Survey',
    'Dear Valued Client,\n\nThank you for choosing our services! Now that your project is complete, we''d love to hear about your experience.\n\nPlease take a moment to complete this brief survey:\n[Survey Link]\n\nYour feedback helps us improve our services and helps other homeowners make informed decisions.\n\nThank you!\n\nBest regards,\nYour Company Team',
    'Dear Valued Client, Thank you for choosing our services! Now that...',
    'Your Company',
    'info@yourcompany.com',
    '555-0000',
    true,
    false,
    now() - INTERVAL '6 days',
    '{"email_id": "msg_vwx234", "email_type": "survey", "has_attachments": false}',
    NULL
  )
ON CONFLICT DO NOTHING;
