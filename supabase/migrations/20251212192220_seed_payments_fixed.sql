/*
  # Seed Payments Data
  
  1. Sample Data
    - Creates 25 payments across different jobs
    - Various payment methods: Cash, Card, Check, TetherPay-CC, TetherPay-ACH
    - Different deposit types: Initial Deposit, Progress Payment, Final Payment
  
  2. Payment Details
    - Realistic amounts based on job totals
    - Payment dates correspond to project timelines
    - Mix of completed and pending payments
*/

INSERT INTO payments (proposal_id, date, payment_method, deposit_type, amount, created_at, updated_at, created_by) VALUES
  ('e1f9a4b5-5678-4567-89ab-111111111111', now() - interval '58 days', 'Check', 'Initial Deposit', 13500.00, now() - interval '58 days', now() - interval '58 days', NULL),
  ('e1f9a4b5-5678-4567-89ab-111111111111', now() - interval '35 days', 'TetherPay-CC', 'Progress Payment', 15750.00, now() - interval '35 days', now() - interval '35 days', NULL),
  ('e1f9a4b5-5678-4567-89ab-111111111111', now() - interval '10 days', 'Card', 'Progress Payment', 11250.00, now() - interval '10 days', now() - interval '10 days', NULL),
  
  ('e1f9a4b5-5678-4567-89ab-222222222222', now() - interval '43 days', 'TetherPay-ACH', 'Initial Deposit', 9600.00, now() - interval '43 days', now() - interval '43 days', NULL),
  ('e1f9a4b5-5678-4567-89ab-222222222222', now() - interval '20 days', 'TetherPay-ACH', 'Progress Payment', 12800.00, now() - interval '20 days', now() - interval '20 days', NULL),
  
  ('e1f9a4b5-5678-4567-89ab-444444444444', now() - interval '88 days', 'Check', 'Initial Deposit', 37500.00, now() - interval '88 days', now() - interval '88 days', NULL),
  ('e1f9a4b5-5678-4567-89ab-444444444444', now() - interval '60 days', 'Check', 'Progress Payment', 37500.00, now() - interval '60 days', now() - interval '60 days', NULL),
  ('e1f9a4b5-5678-4567-89ab-444444444444', now() - interval '30 days', 'Check', 'Progress Payment', 37500.00, now() - interval '30 days', now() - interval '30 days', NULL),
  
  ('e1f9a4b5-5678-4567-89ab-666666666666', now() - interval '115 days', 'TetherPay-CC', 'Initial Deposit', 28500.00, now() - interval '115 days', now() - interval '115 days', NULL),
  ('e1f9a4b5-5678-4567-89ab-666666666666', now() - interval '80 days', 'TetherPay-CC', 'Progress Payment', 33250.00, now() - interval '80 days', now() - interval '80 days', NULL),
  ('e1f9a4b5-5678-4567-89ab-666666666666', now() - interval '32 days', 'TetherPay-CC', 'Final Payment', 33250.00, now() - interval '32 days', now() - interval '32 days', NULL),
  
  ('e1f9a4b5-5678-4567-89ab-888888888888', now() - interval '73 days', 'Card', 'Initial Deposit', 7900.00, now() - interval '73 days', now() - interval '73 days', NULL),
  ('e1f9a4b5-5678-4567-89ab-888888888888', now() - interval '21 days', 'Card', 'Final Payment', 7900.00, now() - interval '21 days', now() - interval '21 days', NULL),
  
  ('e1f9a4b5-5678-4567-89ab-999999999999', now() - interval '145 days', 'Check', 'Initial Deposit', 20400.00, now() - interval '145 days', now() - interval '145 days', NULL),
  ('e1f9a4b5-5678-4567-89ab-999999999999', now() - interval '100 days', 'Check', 'Progress Payment', 27200.00, now() - interval '100 days', now() - interval '100 days', NULL),
  
  ('e1f9a4b5-5678-4567-89ab-bbbbbbbbbbbb', now() - interval '175 days', 'Cash', 'Initial Deposit', 3750.00, now() - interval '175 days', now() - interval '175 days', NULL),
  ('e1f9a4b5-5678-4567-89ab-bbbbbbbbbbbb', now() - interval '150 days', 'Cash', 'Progress Payment', 5000.00, now() - interval '150 days', now() - interval '150 days', NULL),
  ('e1f9a4b5-5678-4567-89ab-bbbbbbbbbbbb', now() - interval '92 days', 'Cash', 'Final Payment', 3750.00, now() - interval '92 days', now() - interval '92 days', NULL),
  
  ('e1f9a4b5-5678-4567-89ab-555555555555', now() - interval '18 days', 'TetherPay-CC', 'Initial Deposit', 6600.00, now() - interval '18 days', now() - interval '18 days', NULL),
  
  ('e1f9a4b5-5678-4567-89ab-777777777777', now() - interval '12 days', 'Check', 'Initial Deposit', 15600.00, now() - interval '12 days', now() - interval '12 days', NULL),
  
  ('e1f9a4b5-5678-4567-89ab-aaaaaaaaaaaa', now() - interval '8 days', 'TetherPay-ACH', 'Initial Deposit', 14400.00, now() - interval '8 days', now() - interval '8 days', NULL),
  
  ('e1f9a4b5-5678-4567-89ab-cccccccccccc', now() - interval '23 days', 'Check', 'Initial Deposit', 25500.00, now() - interval '23 days', now() - interval '23 days', NULL),
  
  ('e1f9a4b5-5678-4567-89ab-333333333333', now() - interval '25 days', 'TetherPay-CC', 'Initial Deposit', 5550.00, now() - interval '25 days', now() - interval '25 days', NULL),
  
  ('e1f9a4b5-5678-4567-89ab-444444444444', now() - interval '5 days', 'Check', 'Final Payment', 12500.00, now() - interval '5 days', now() - interval '5 days', NULL),
  
  ('e1f9a4b5-5678-4567-89ab-111111111111', now() - interval '2 days', 'Card', 'Final Payment', 4500.00, now() - interval '2 days', now() - interval '2 days', NULL);