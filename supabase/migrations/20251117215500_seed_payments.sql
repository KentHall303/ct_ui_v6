/*
  # Seed Payments Data

  1. Purpose
    - Populate the payments table with comprehensive payment records
    - Provide realistic payment history across different proposals and payment methods
    - Support financial tracking, reporting, and payment management features
    - Demonstrate various payment types and methods

  2. Data Inserted
    - 30 payment records across multiple proposals
    - Various payment methods (Cash, Card, Check, TetherPay-CC, TetherPay-ACH)
    - Different deposit types (Deposit, Final Payment, Partial Payment, Progress Payment)
    - Mix of dates from past 90 days to show payment history
    - Realistic amounts based on typical project values

  3. Fields Populated
    - proposal_id: Reference to quote/proposal number
    - date: Payment transaction date
    - payment_method: Method used for payment
    - deposit_type: Type of payment (deposit, final, partial, etc.)
    - amount: Payment amount in dollars
    - created_at: Record creation timestamp
    - updated_at: Last update timestamp
    - created_by: Set to null for demo data

  4. Important Notes
    - Payment amounts are realistic for various project types
    - Payment methods are distributed across available options
    - Dates span recent months to show payment timeline
    - Proposal IDs reference quotes from calendar events seed data
*/

-- Insert comprehensive payment data
INSERT INTO payments (proposal_id, date, payment_method, deposit_type, amount, created_by) VALUES
  -- Kitchen Remodel payments (Quote #150)
  ('Quote #150', '2025-08-15', 'Check', 'Deposit', 9000.00, NULL),
  ('Quote #150', '2025-09-10', 'TetherPay-CC', 'Progress Payment', 15000.00, NULL),
  ('Quote #150', '2025-10-05', 'TetherPay-ACH', 'Progress Payment', 12000.00, NULL),
  ('Quote #150', '2025-10-25', 'Card', 'Final Payment', 9000.00, NULL),

  -- Bathroom Renovation payments (Quote #123)
  ('Quote #123', '2025-08-20', 'TetherPay-CC', 'Deposit', 5700.00, NULL),
  ('Quote #123', '2025-09-15', 'Card', 'Progress Payment', 11400.00, NULL),
  ('Quote #123', '2025-10-10', 'Check', 'Final Payment', 11400.00, NULL),

  -- Roof Replacement payments (Quote #136)
  ('Quote #136', '2025-09-01', 'Check', 'Deposit', 5600.00, NULL),
  ('Quote #136', '2025-09-20', 'TetherPay-ACH', 'Progress Payment', 7500.00, NULL),
  ('Quote #136', '2025-10-15', 'Cash', 'Final Payment', 5900.00, NULL),

  -- Deck Construction payments (Quote #142)
  ('Quote #142', '2025-08-25', 'TetherPay-CC', 'Deposit', 4322.26, NULL),
  ('Quote #142', '2025-09-28', 'Card', 'Final Payment', 3241.70, NULL),

  -- Installation projects (Quote #146)
  ('Quote #146', '2025-09-05', 'Check', 'Deposit', 2220.75, NULL),
  ('Quote #146', '2025-09-25', 'TetherPay-CC', 'Final Payment', 2220.75, NULL),

  -- Window Installation (Quote #152)
  ('Quote #152', '2025-09-08', 'TetherPay-ACH', 'Deposit', 1445.25, NULL),
  ('Quote #152', '2025-09-22', 'Card', 'Final Payment', 1445.25, NULL),

  -- Flooring Project (Quote #174)
  ('Quote #174', '2025-09-12', 'Check', 'Deposit', 3717.16, NULL),
  ('Quote #174', '2025-10-01', 'TetherPay-CC', 'Progress Payment', 2477.44, NULL),
  ('Quote #174', '2025-10-20', 'Cash', 'Final Payment', 1239.72, NULL),

  -- HVAC Installation (Quote #176)
  ('Quote #176', '2025-09-14', 'TetherPay-ACH', 'Deposit', 1600.00, NULL),
  ('Quote #176', '2025-10-05', 'Card', 'Final Payment', 1600.00, NULL),

  -- Painting Project (Quote #180)
  ('Quote #180', '2025-09-18', 'Cash', 'Deposit', 1096.21, NULL),
  ('Quote #180', '2025-10-08', 'Check', 'Final Payment', 1096.21, NULL),

  -- Inspection Service (Quote #181)
  ('Quote #181', '2025-09-22', 'Card', 'Final Payment', 828.00, NULL),

  -- Larger Commercial Project (Quote #195)
  ('Quote #195', '2025-08-10', 'TetherPay-ACH', 'Deposit', 12750.00, NULL),
  ('Quote #195', '2025-09-05', 'Check', 'Progress Payment', 8500.00, NULL),
  ('Quote #195', '2025-09-25', 'TetherPay-CC', 'Progress Payment', 4250.00, NULL),

  -- Residential Projects
  ('Quote #183', '2025-09-24', 'TetherPay-CC', 'Deposit', 3375.00, NULL),
  ('Quote #183', '2025-10-15', 'Card', 'Final Payment', 3375.00, NULL),

  ('Quote #185', '2025-09-26', 'Check', 'Deposit', 2050.00, NULL),
  ('Quote #185', '2025-10-18', 'TetherPay-ACH', 'Final Payment', 2050.00, NULL),

  ('Quote #193', '2025-09-30', 'Cash', 'Deposit', 2115.00, NULL)
ON CONFLICT DO NOTHING;
