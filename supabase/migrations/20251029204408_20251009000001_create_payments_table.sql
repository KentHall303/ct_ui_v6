/*
  # Create Payments Table

  1. New Tables
    - `payments`
      - `id` (uuid, primary key) - Unique identifier for each payment
      - `proposal_id` (text, required) - Reference to the proposal this payment belongs to
      - `date` (date, required) - Date when the payment was made
      - `payment_method` (text, required) - Payment method (Cash, Card, Check, TetherPay-CC, TetherPay-ACH, Other, Refund)
      - `deposit_type` (text, required) - Type of deposit (Deposit, Final Payment, Partial Payment, etc.)
      - `amount` (decimal, required) - Payment amount in dollars
      - `created_at` (timestamptz) - Timestamp when the payment was created
      - `updated_at` (timestamptz) - Timestamp when the payment was last updated
      - `created_by` (uuid) - User who created this payment

  2. Security
    - Enable RLS on `payments` table
    - Add policy for authenticated users to read payments
    - Add policy for authenticated users to insert their own payments
    - Add policy for authenticated users to update their own payments
    - Add policy for authenticated users to delete their own payments

  3. Indexes
    - Add index on `proposal_id` for efficient querying by proposal
    - Add index on `created_by` for efficient querying by user
    - Add index on `date` for efficient date-based queries
*/

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  payment_method text NOT NULL CHECK (payment_method IN ('Cash', 'Card', 'Check', 'TetherPay-CC', 'TetherPay-ACH', 'Other', 'Refund')),
  deposit_type text NOT NULL,
  amount decimal(10, 2) NOT NULL DEFAULT 0.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view payments"
  ON payments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own payments"
  ON payments FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own payments"
  ON payments FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_payments_proposal_id ON payments(proposal_id);
CREATE INDEX IF NOT EXISTS idx_payments_created_by ON payments(created_by);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(date);

-- Create updated_at trigger
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'update_payments_updated_at'
  ) THEN
    CREATE TRIGGER update_payments_updated_at
      BEFORE UPDATE ON payments
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;