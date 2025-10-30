/*
  # Create expenses table for Expense Tracker App

  1. New Tables
    - `expenses`
      - `id` (uuid, primary key) - Unique identifier for each expense
      - `amount` (numeric) - The expense amount
      - `description` (text) - Description of the expense
      - `category` (text) - Category of the expense (e.g., Food, Transport, Entertainment)
      - `date` (timestamptz) - Date and time when the expense was incurred
      - `user_id` (uuid) - Reference to the user who created the expense
      - `created_at` (timestamptz) - Timestamp when the record was created

  2. Security
    - Enable RLS on `expenses` table
    - Add policy for authenticated users to insert their own expenses
    - Add policy for authenticated users to select their own expenses
    - Add policy for authenticated users to update their own expenses
    - Add policy for authenticated users to delete their own expenses

  3. Notes
    - All expenses are user-specific and protected by RLS
    - The date field defaults to the current timestamp
    - Amount is stored as numeric for precise decimal handling
*/

CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount numeric NOT NULL DEFAULT 0,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  date timestamptz NOT NULL DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own expenses"
  ON expenses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own expenses"
  ON expenses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own expenses"
  ON expenses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own expenses"
  ON expenses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date DESC);