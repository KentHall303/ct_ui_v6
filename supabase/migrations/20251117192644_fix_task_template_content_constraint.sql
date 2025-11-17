/*
  # Fix Task Template Content Constraint

  ## Overview
  This migration resolves the issue where task templates cannot be created due to
  the NOT NULL constraint on the content column. Task templates use the 'detail'
  field for their content, so the 'content' column should be nullable for task templates.

  ## Changes
    1. Modify the content column to allow NULL values
    2. Add a check constraint to ensure content is required only for non-task templates
    3. Backfill existing task templates to copy detail to content field
    4. Add trigger to automatically sync content from detail for task templates

  ## Security
    - No changes to RLS policies
    - Maintains existing security rules

  ## Notes
    - This maintains backward compatibility with email templates
    - Task templates will now store content in both 'detail' and 'content' fields for consistency
*/

-- First, make the content column nullable
ALTER TABLE templates ALTER COLUMN content DROP NOT NULL;

-- Add a check constraint to ensure content is provided for non-task templates
-- Task templates can have NULL content since they use 'detail' field
ALTER TABLE templates DROP CONSTRAINT IF EXISTS check_content_required;
ALTER TABLE templates ADD CONSTRAINT check_content_required
  CHECK (
    (category = 'task' AND (content IS NOT NULL OR detail IS NOT NULL)) OR
    (category != 'task' AND content IS NOT NULL)
  );

-- Backfill existing task templates: copy detail to content if content is NULL
UPDATE templates
SET content = COALESCE(detail, '')
WHERE category = 'task' AND content IS NULL;

-- Create a trigger function to automatically populate content from detail for task templates
CREATE OR REPLACE FUNCTION sync_task_template_content()
RETURNS TRIGGER AS $$
BEGIN
  -- For task templates, ensure content is synced with detail
  IF NEW.category = 'task' THEN
    IF NEW.content IS NULL AND NEW.detail IS NOT NULL THEN
      NEW.content := NEW.detail;
    ELSIF NEW.content IS NULL AND NEW.detail IS NULL THEN
      NEW.content := '';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically sync content for task templates
DROP TRIGGER IF EXISTS trigger_sync_task_template_content ON templates;
CREATE TRIGGER trigger_sync_task_template_content
  BEFORE INSERT OR UPDATE ON templates
  FOR EACH ROW
  EXECUTE FUNCTION sync_task_template_content();