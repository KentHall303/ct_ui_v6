/*
  # Add user_id column to calendar_events

  1. Changes
    - Add `user_id` column (uuid) to `calendar_events` table
    - References the `users` table for subcontractor assignments
    - This replaces the `estimator_id` which referenced the `subcontractors` table
    
  2. Purpose
    - Link calendar events directly to users with user_type='subcontractor'
    - Simplify the data model by using the users table for all personnel
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'calendar_events' AND column_name = 'user_id' AND table_schema = 'public'
  ) THEN
    ALTER TABLE public.calendar_events ADD COLUMN user_id uuid REFERENCES public.users(id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_calendar_events_user_id ON public.calendar_events(user_id);