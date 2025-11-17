/*
  # Add Task-Specific Fields to Templates Table

  ## Overview
  This migration adds task-specific columns to the templates table to support
  task template functionality including title, detail, due dates, assignee, and priority.

  ## Changes
    1. New Columns Added:
      - `title` (text) - Task title with token support (e.g., {{client.firstName}})
      - `detail` (text) - Detailed task description/instructions
      - `due_in_days` (integer, default 0) - Number of days until task is due
      - `assignee_type` (text, default 'assigned_user') - Type of assignee (account_owner, assigned_user, specific_user)
      - `priority` (text) - Task priority level

  ## Notes
    - All new fields are nullable to maintain backward compatibility with existing templates
    - Default values are provided where appropriate
    - These fields are specifically for task templates but won't break other template types
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'title'
  ) THEN
    ALTER TABLE templates ADD COLUMN title text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'detail'
  ) THEN
    ALTER TABLE templates ADD COLUMN detail text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'due_in_days'
  ) THEN
    ALTER TABLE templates ADD COLUMN due_in_days integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'assignee_type'
  ) THEN
    ALTER TABLE templates ADD COLUMN assignee_type text DEFAULT 'assigned_user';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'templates' AND column_name = 'priority'
  ) THEN
    ALTER TABLE templates ADD COLUMN priority text;
  END IF;
END $$;
