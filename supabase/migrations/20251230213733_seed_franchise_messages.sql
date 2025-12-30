/*
  # Seed Franchise-Related Messages
  
  1. Sample Data
    - Creates 22 messages with franchise-specific content
    - Links messages to existing contacts in the database
    - Includes emails, texts, calls, and Thumbtack leads about franchise opportunities
    - Mix of inbound and outbound communications
  
  2. Message Details
    - Realistic franchise business scenarios (territory, FDD, discovery days, fees)
    - Various contact types: candidates, resale_candidates, additional_locations, acquisitions
    - Lead statuses distributed across the sales funnel
    - Read/unread and starred states for active management
    - Recent timestamps showing active franchise inquiry pipeline
    
  3. Contact Types
    - candidates: New franchise prospects
    - resale_candidates: Interested in purchasing existing franchise locations
    - additional_locations: Existing franchisees expanding
    - acquisitions: Corporate acquisition inquiries
*/

-- Delete existing demo messages to start fresh
DELETE FROM messages WHERE opportunity_name LIKE '%Franchise%' OR opportunity_name LIKE '%Territory%';

-- Insert franchise-specific messages linked to real contacts
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
  contact_type, 
  lead_status, 
  company_name, 
  opportunity_name, 
  created_at
) VALUES

-- Email: Initial franchise inquiry (New lead)
(
  'e8f1c505-819c-4bd4-8cb4-af9cad1a75c5',
  'email',
  'inbound',
  'Franchise Opportunity Inquiry - Texas Territory',
  'Hello, I came across your franchise opportunity and I''m very interested in learning more. I have 15 years of business management experience and I''m looking to invest in a proven franchise system. Can you send me information about available territories in the Dallas-Fort Worth area? I''d also like to know the initial investment requirements and expected ROI. Thank you!',
  'Hello, I came across your franchise opportunity and I''m very interested in learning more...',
  'Ashley Garcia',
  'ashley.garcia@example.com',
  '(854) 282-9255',
  false,
  true,
  now() - interval '2 hours',
  'candidates',
  'new',
  NULL,
  'Franchise Opportunity - Dallas TX',
  now() - interval '2 hours'
),

-- Text: Quick territory question
(
  '6f8d7047-5f87-4f94-8412-8dbb6312140d',
  'text',
  'inbound',
  '',
  'Hi! Quick question - is the San Diego territory still available? I''m ready to move forward if it is.',
  'Hi! Quick question - is the San Diego territory still available?',
  'Stephanie Walker',
  'stephanie.walker@example.com',
  '(821) 877-3524',
  false,
  false,
  now() - interval '4 hours',
  'candidates',
  'contacted',
  NULL,
  'Franchise Opportunity - San Diego CA',
  now() - interval '4 hours'
),

-- Email: FDD review questions
(
  '2dde10d2-3a8f-44fc-83ec-159a8015c075',
  'email',
  'inbound',
  'Re: Franchise Disclosure Document - Questions',
  'Thank you for sending the FDD. I''ve reviewed Item 7 and have some questions about the initial investment range. The low end shows $175K and high end $285K - can you help me understand what drives that variance? Also, I''d like to discuss the territory size and protected radius mentioned in Item 12. When can we schedule a call?',
  'Thank you for sending the FDD. I''ve reviewed Item 7 and have some questions...',
  'Joseph Hall',
  'joseph.hall@example.com',
  '(560) 323-4205',
  true,
  true,
  now() - interval '1 day',
  'candidates',
  'qualified',
  NULL,
  'Franchise Opportunity - Chicago IL',
  now() - interval '1 day'
),

-- Call: Discovery day scheduling
(
  '7dfcbedd-284c-4fec-ab82-89600dac943e',
  'call',
  'outbound',
  '',
  'Called Elizabeth to schedule Discovery Day. She''s available March 15-16. Will send calendar invite and travel info. She''s bringing her business partner who has restaurant experience. Very excited and prepared with questions.',
  'Called Elizabeth to schedule Discovery Day. She''s available March 15-16...',
  'Your Company',
  '',
  '(555) 000-0001',
  true,
  true,
  now() - interval '6 hours',
  'candidates',
  'qualified',
  NULL,
  'Franchise Opportunity - Charlotte NC',
  now() - interval '6 hours'
),

-- Email: Multi-unit inquiry
(
  '84031cee-2840-451f-97ef-7a1db8725a63',
  'email',
  'inbound',
  'Multi-Unit Development Opportunity',
  'Good afternoon. I''m interested in developing multiple franchise locations in the Austin and San Antonio markets. I currently own 3 fast-casual restaurant franchises and am looking to diversify my portfolio. Do you offer multi-unit development agreements? If so, what are the terms and incentives? I have the capital and infrastructure to open 5-7 locations over the next 3 years.',
  'Good afternoon. I''m interested in developing multiple franchise locations in Austin...',
  'Nicole Clark',
  'nicole.clark@example.com',
  '(887) 242-2047',
  true,
  true,
  now() - interval '5 hours',
  'additional_locations',
  'contacted',
  'Clark Restaurant Group',
  'Multi-Unit Development - TX',
  now() - interval '5 hours'
),

-- Text: Financial qualification follow-up
(
  '84f5d2aa-5305-44aa-9ef7-d0ce1b512d34',
  'text',
  'outbound',
  '',
  'Hi Michael! Following up on our call. For the financial qualification, we need verification of $100K liquid capital and $350K net worth. Your banker can send the letter directly. Let me know if you need the template!',
  'Hi Michael! Following up on our call. For the financial qualification...',
  'Your Company',
  '',
  '(555) 000-0001',
  true,
  false,
  now() - interval '8 hours',
  'candidates',
  'qualified',
  NULL,
  'Franchise Opportunity - Houston TX',
  now() - interval '8 hours'
),

-- Email: Post-discovery day feedback
(
  '7ee818d0-6822-4f06-b437-8398fcc461a9',
  'email',
  'inbound',
  'Re: Discovery Day Follow-Up',
  'I wanted to thank you and your team for an excellent Discovery Day experience. Meeting the existing franchisees and seeing the training facility in person really solidified my decision. My wife and I have discussed it extensively and we''re ready to move forward! Please send the franchise agreement. We''re targeting a June opening in the Raleigh area.',
  'I wanted to thank you and your team for an excellent Discovery Day experience...',
  'Matthew Lewis',
  'matthew.lewis@example.com',
  '(558) 843-7183',
  true,
  true,
  now() - interval '3 hours',
  'candidates',
  'converted',
  NULL,
  'Franchise Agreement - Raleigh NC',
  now() - interval '3 hours'
),

-- Thumbtack: New franchise lead
(
  '5753fa59-e3fe-43c0-942a-3bd4f12f6fa5',
  'thumbtack',
  'inbound',
  'New Franchise Inquiry from Thumbtack',
  'Location: New York, NY | Interest Level: High | Investment Budget: $200K-$300K | Timeline: 6-9 months | Experience: 10 years retail management | Message: Looking for a franchise with strong brand recognition and comprehensive training. Interested in protected territory model. Would like information packet and franchise cost breakdown.',
  'Location: New York, NY | Interest Level: High | Investment Budget: $200K-$300K...',
  'John Smith',
  'john.smith@example.com',
  '(222) 907-7586',
  false,
  true,
  now() - interval '1 hour',
  'candidates',
  'new',
  NULL,
  'Franchise Inquiry - New York NY',
  now() - interval '1 hour'
),

-- Call: Existing franchisee referral
(
  '7ec22768-8f0e-4e1f-8af5-2db8f3f96e43',
  'call',
  'inbound',
  '',
  'Brian called - referred by Tom Anderson (Syracuse franchisee). Wants to open in Buffalo area. Has visited Tom''s location multiple times. Strong financial background, owns commercial real estate. Scheduled FDD review call for Thursday 2pm.',
  'Brian called - referred by Tom Anderson (Syracuse franchisee). Wants to open in Buffalo...',
  'Brian Scott',
  'brian.scott@example.com',
  '(406) 211-8873',
  true,
  false,
  now() - interval '12 hours',
  'candidates',
  'contacted',
  NULL,
  'Franchise Opportunity - Buffalo NY',
  now() - interval '12 hours'
),

-- Email: Training program inquiry
(
  'eac37a5a-156d-4579-90d4-4a7212ea8aa0',
  'email',
  'inbound',
  'Questions About Training and Support',
  'Hi, I''m in the final stages of my decision and have a few questions about the training program. How long is the initial training? Is it at headquarters or on-site? Also, what does the ongoing support look like after opening? Do you provide marketing materials and campaigns? And is there a dedicated support person assigned to each franchisee?',
  'Hi, I''m in the final stages of my decision and have a few questions about the training...',
  'Amanda Lopez',
  'amanda.lopez@example.com',
  '(218) 578-7444',
  false,
  false,
  now() - interval '9 hours',
  'candidates',
  'qualified',
  NULL,
  'Franchise Opportunity - Chicago IL',
  now() - interval '9 hours'
),

-- Text: Franchise fee negotiation
(
  'a51cdc98-73f7-43b8-892e-858465df2502',
  'text',
  'inbound',
  '',
  'Got the agreement. Everything looks good except I was hoping for the multi-unit discount on the franchise fee since I''m committed to opening 3 locations. Can we discuss?',
  'Got the agreement. Everything looks good except I was hoping for multi-unit discount...',
  'Andrew Wright',
  'andrew.wright@example.com',
  '(738) 981-5030',
  false,
  true,
  now() - interval '5 hours',
  'additional_locations',
  'qualified',
  NULL,
  'Multi-Unit Agreement - FL',
  now() - interval '5 hours'
),

-- Email: Site selection assistance
(
  '3cca808b-df35-483b-a140-91a66c1a76cf',
  'email',
  'inbound',
  'Real Estate Site Selection Help',
  'We signed the franchise agreement last week and now we''re in site selection phase. I''ve identified 3 potential locations in Manhattan. Can you send someone from your real estate team to evaluate them? Also, what are the typical lease terms you recommend? I want to make sure we choose the optimal location for success.',
  'We signed the franchise agreement last week and now we''re in site selection phase...',
  'James Rodriguez',
  'james.rodriguez@example.com',
  '(775) 528-6279',
  true,
  false,
  now() - interval '2 days',
  'candidates',
  'converted',
  NULL,
  'Site Selection - Manhattan NY',
  now() - interval '2 days'
),

-- Email: Resale opportunity inquiry
(
  'cdc72cc5-f8e0-408d-ab51-12250a1785ef',
  'email',
  'inbound',
  'Interest in Resale Location',
  'I saw on your website that there''s an existing franchise location for sale in Orange County. I''m very interested in purchasing an established location rather than starting from scratch. Can you provide details on the financials, reason for sale, and transition process? I have franchise experience with another brand.',
  'I saw on your website that there''s an existing franchise location for sale in Orange County...',
  'Robert Wilson',
  'robert.wilson@example.com',
  '(414) 957-6176',
  true,
  true,
  now() - interval '7 hours',
  'resale_candidates',
  'contacted',
  NULL,
  'Resale Opportunity - Orange County CA',
  now() - interval '7 hours'
),

-- Call: Financing options discussion
(
  '225b8d3c-c364-40a8-9123-0d6170a10691',
  'call',
  'outbound',
  '',
  'Discussed SBA loan process with Rachel. She has strong credit (750+) and can put 30% down. Connected her with our preferred SBA lender. They can typically approve $200K loans for qualified franchisees. She''ll apply this week and keep us updated.',
  'Discussed SBA loan process with Rachel. She has strong credit and can put 30% down...',
  'Your Company',
  '',
  '(555) 000-0001',
  true,
  false,
  now() - interval '1 day',
  'candidates',
  'qualified',
  NULL,
  'Franchise Opportunity - Albany NY',
  now() - interval '1 day'
),

-- Text: Quick response to territory question
(
  'ac73e367-e251-44b1-bc06-61301b8a909a',
  'text',
  'outbound',
  '',
  'Hi Christopher! Yes, the Austin territory is still available. It covers a 10-mile radius from downtown with population of 350K. Exclusive rights for 5 years. Want to schedule a call to discuss?',
  'Hi Christopher! Yes, the Austin territory is still available. 10-mile radius from downtown...',
  'Your Company',
  '',
  '(555) 000-0001',
  true,
  false,
  now() - interval '3 hours',
  'candidates',
  'contacted',
  NULL,
  'Franchise Opportunity - Austin TX',
  now() - interval '3 hours'
),

-- Email: Royalty structure clarification
(
  '40d38416-5858-497a-83c1-b55ded992f4a',
  'email',
  'inbound',
  'Clarification on Royalty and Marketing Fees',
  'I''m reviewing the FDD Item 6 and want to make sure I understand the ongoing fees correctly. It shows 6% royalty on gross sales plus 2% marketing fund contribution. Are there any other recurring fees? Also, is the marketing fund managed centrally and how is it allocated? Do individual franchisees have input on local marketing?',
  'I''m reviewing the FDD Item 6 and want to make sure I understand the ongoing fees...',
  'Melissa White',
  'melissa.white@example.com',
  '(396) 556-7802',
  false,
  false,
  now() - interval '10 hours',
  'candidates',
  'contacted',
  NULL,
  'Franchise Opportunity - Philadelphia PA',
  now() - interval '10 hours'
),

-- Email: Validation calls feedback
(
  '91dbed71-8bcc-40fd-86c3-6aa896d1a394',
  'email',
  'inbound',
  'Validation Calls Completed',
  'I just finished my validation calls with 5 existing franchisees and I''m blown away by the positive feedback! Everyone spoke highly of the support team, the training program, and the profitability. The franchisee in Charlotte was especially helpful. I''m ready to schedule my Discovery Day. What dates do you have available in March?',
  'I just finished my validation calls with 5 existing franchisees and I''m blown away...',
  'Jessica Taylor',
  'jessica.taylor@example.com',
  '(831) 932-9230',
  true,
  true,
  now() - interval '4 hours',
  'candidates',
  'qualified',
  NULL,
  'Franchise Opportunity - Raleigh NC',
  now() - interval '4 hours'
),

-- Thumbtack: Conversion prospect
(
  '40fb40d6-689f-484a-829a-6ad3d61085c1',
  'thumbtack',
  'inbound',
  'High-Intent Franchise Lead',
  'Location: Los Angeles, CA | Interest Level: Very High | Investment Budget: $250K+ | Timeline: 3-4 months | Experience: Owned 2 businesses (sold successfully) | Message: Looking for franchise with proven business model and strong unit economics. Prefer service-based franchise. Can move quickly if terms are right. Have legal and financial team ready.',
  'Location: Los Angeles, CA | Interest Level: Very High | Investment Budget: $250K+...',
  'Jennifer Martinez',
  'jennifer.martinez@example.com',
  '(383) 781-5638',
  false,
  true,
  now() - interval '30 minutes',
  'candidates',
  'new',
  NULL,
  'Franchise Inquiry - Los Angeles CA',
  now() - interval '30 minutes'
),

-- Call: Corporate acquisition interest
(
  '92b7cc61-8412-4bbf-972b-e9c9aaf96e80',
  'call',
  'inbound',
  '',
  'David Anderson from Regional Development Group. Interested in acquiring master franchise rights for Pennsylvania. Wants to develop 15-20 locations over 5 years. Has experience with similar rollout with another franchise brand. Scheduled meeting with VP of Development for next week.',
  'David Anderson from Regional Development Group. Master franchise rights for Pennsylvania...',
  'David Anderson',
  'david.anderson@example.com',
  '(879) 243-1193',
  true,
  true,
  now() - interval '2 hours',
  'acquisitions',
  'contacted',
  'Regional Development Group',
  'Master Franchise - Pennsylvania',
  now() - interval '2 hours'
),

-- Email: Item 19 performance data questions
(
  'a8439994-319d-4cac-b2a2-c0bd046f1946',
  'email',
  'inbound',
  'Questions About Item 19 Financial Performance',
  'I''m analyzing the financial performance representations in Item 19 of the FDD. The top quartile shows average gross revenue of $1.2M with EBITDA margins around 18%. Can you help me understand what differentiates the top performers? Is it location, management, or other factors? Also, what''s the typical ramp-up period to reach these numbers?',
  'I''m analyzing the financial performance representations in Item 19 of the FDD...',
  'Laura Allen',
  'laura.allen@example.com',
  '(940) 985-6945',
  true,
  false,
  now() - interval '15 hours',
  'candidates',
  'contacted',
  NULL,
  'Franchise Opportunity - Pittsburgh PA',
  now() - interval '15 hours'
),

-- Text: Passive investor inquiry
(
  '156e77ec-3ce4-49b9-aa2a-3f5ae692e4f6',
  'text',
  'inbound',
  '',
  'Do you allow passive/semi-absentee ownership? I have a strong operations manager who would run day-to-day but I want to maintain ownership. What are the requirements?',
  'Do you allow passive/semi-absentee ownership? I have a strong operations manager...',
  'Sarah Johnson',
  'sarah.johnson@example.com',
  '(479) 239-4401',
  false,
  false,
  now() - interval '6 hours',
  'candidates',
  'contacted',
  NULL,
  'Franchise Opportunity - Chicago IL',
  now() - interval '6 hours'
),

-- Email: Franchise agreement signed!
(
  'e7f90d40-d164-41cf-98b7-2269bf75fc14',
  'email',
  'inbound',
  'Franchise Agreement Executed!',
  'Great news - we''ve signed and returned the franchise agreement! Wire transfer for the franchise fee will be sent tomorrow. We''re incredibly excited to join the franchise family. What are the next steps? When does training begin? And can we start the site selection process immediately? We''re targeting a September grand opening.',
  'Great news - we''ve signed and returned the franchise agreement! Wire transfer for the fee...',
  'Daniel Harris',
  'daniel.harris@example.com',
  '(327) 680-2229',
  true,
  true,
  now() - interval '1 hour',
  'candidates',
  'converted',
  NULL,
  'Franchise Agreement - Chicago IL',
  now() - interval '1 hour'
);
