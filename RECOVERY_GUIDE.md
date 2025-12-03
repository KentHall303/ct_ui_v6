# Template Data Recovery Guide

This guide helps you recover lost template data and prevent future data loss.

---

## Immediate Recovery Options

### Option 1: Supabase Point-in-Time Recovery (RECOMMENDED)

If you have a Supabase Pro plan, you can restore your database to a point before the data loss occurred.

**Steps:**
1. Log into your Supabase Dashboard
2. Navigate to: **Project Settings** → **Database** → **Backups**
3. Check if backups are available
4. Look for a backup from **before December 3, 2025 19:54 UTC**
5. Click **Restore** on the appropriate backup
6. Wait for restoration to complete (this may take several minutes)

**Important:** This will restore the ENTIRE database to that point in time. Any data created after that backup will be lost.

### Option 2: Check Application Logs

If your application logs template operations, you may be able to extract template content from logs.

**Check these locations:**
- Application server logs
- Frontend console logs (if templates were displayed)
- API request/response logs
- Debug logs

### Option 3: Git History

Check if template data was previously committed to version control.

**Commands to search:**
```bash
# Search for template-related commits
git log --all --grep="template"

# Search for files containing template data
git log --all --full-history -- "*template*"

# Search for seed data files
git log --all --full-history -- "supabase/migrations/*seed*"
```

### Option 4: Team Member Backups

Check if any team members have:
- Local database dumps
- Exported template files
- Screenshots of template lists
- Email notifications containing template content

---

## What Data Can Be Recovered

### Still Exists (Safe)
- Text/SMS Templates (15 records) - These survived because they use ON CONFLICT DO NOTHING
- Database schema and structure
- All other non-template data

### Lost (Cannot Recover Without Backup)
- ALL custom email templates
- ALL custom notes/logs templates

### Never Created
- Task templates
- Appointment invite templates
- Export list templates

---

## Prevention: Never Let This Happen Again

### 1. Enable Automatic Backups

**Supabase Pro Plan:**
- Daily automatic backups
- Point-in-time recovery
- Up to 7 days retention (configurable)

**Setup:**
1. Upgrade to Supabase Pro (if not already)
2. Enable automatic backups in Project Settings
3. Configure retention period
4. Test restoration process

### 2. Implement Template Export Functionality

Add the ability to export templates as JSON or CSV files.

**Example export query:**
```sql
COPY (
  SELECT * FROM templates
  ORDER BY category, name
) TO '/path/to/templates_backup.csv' WITH CSV HEADER;
```

### 3. Add Pre-Migration Backup Script

Create a script that automatically backs up data before running migrations.

**Create file:** `scripts/backup-before-migration.sh`
```bash
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

echo "Backing up templates table..."
psql $DATABASE_URL -c "COPY (SELECT * FROM templates) TO STDOUT WITH CSV HEADER" > "$BACKUP_DIR/templates_$TIMESTAMP.csv"
echo "Backup saved to $BACKUP_DIR/templates_$TIMESTAMP.csv"
```

### 4. Use Version Control for Template Data

Store template content in version-controlled seed files:

**Example structure:**
```
project/
└── data/
    └── templates/
        ├── email_templates.json
        ├── text_templates.json
        ├── task_templates.json
        └── notes_logs_templates.json
```

### 5. Add Template Soft Delete

Instead of permanently deleting templates, mark them as inactive:

```sql
-- Add deleted_at column if not exists
ALTER TABLE templates ADD COLUMN deleted_at timestamptz;

-- Soft delete instead of hard delete
UPDATE templates
SET deleted_at = now(), is_active = false
WHERE id = 'template-id';

-- Filter out deleted templates in queries
SELECT * FROM templates WHERE deleted_at IS NULL;
```

### 6. Implement Template Versioning

Track changes to templates over time:

```sql
CREATE TABLE template_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES templates(id),
  name text NOT NULL,
  content text NOT NULL,
  version_number integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid
);
```

### 7. Add Migration Review Process

**Before applying any migration:**
1. Read the migration file completely
2. Check for destructive operations (DELETE, DROP, TRUNCATE)
3. Run on staging environment first
4. Backup production data
5. Apply to production
6. Verify data integrity

**Migration Checklist:**
```markdown
- [ ] Migration file reviewed by 2+ team members
- [ ] No DELETE/DROP/TRUNCATE statements for user data
- [ ] Uses ON CONFLICT DO NOTHING for seed data
- [ ] Tested on staging environment
- [ ] Production backup created
- [ ] Rollback plan documented
- [ ] Data verification queries prepared
```

---

## Manual Template Recreation

If you cannot recover data from backups, you'll need to manually recreate templates.

### Step 1: Document What You Remember

Create a spreadsheet with:
- Template name
- Template category
- Template content
- Any special settings

### Step 2: Check Reference Materials

Look for templates in:
- Email sent to clients (check sent folder)
- Slack/Teams messages where templates were discussed
- Documentation or training materials
- Previous proposals or communications

### Step 3: Recreate Templates

Use the template management UI or insert directly into the database:

```sql
INSERT INTO templates (
  name,
  category,
  content,
  subject,
  contact_type,
  is_active
) VALUES (
  'Your Template Name',
  'email',  -- or 'text', 'task', 'appt_invites', 'notes_logs', 'export_list'
  'Template content here...',
  'Email subject line',
  'All',
  true
) ON CONFLICT DO NOTHING;
```

---

## Database Monitoring

Set up alerts to catch data loss quickly:

### 1. Template Count Monitoring

Create a daily script that checks template counts:

```sql
SELECT
  category,
  COUNT(*) as count,
  MAX(created_at) as last_created
FROM templates
GROUP BY category;
```

Alert if counts drop significantly between checks.

### 2. Database Change Notifications

Enable Supabase Realtime or create database triggers:

```sql
CREATE OR REPLACE FUNCTION notify_template_delete()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('template_deleted',
    json_build_object(
      'id', OLD.id,
      'name', OLD.name,
      'category', OLD.category
    )::text
  );
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER template_delete_notification
BEFORE DELETE ON templates
FOR EACH ROW
EXECUTE FUNCTION notify_template_delete();
```

### 3. Audit Logging

Track all template changes:

```sql
CREATE TABLE template_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid,
  operation text,  -- 'INSERT', 'UPDATE', 'DELETE'
  old_data jsonb,
  new_data jsonb,
  changed_by uuid,
  changed_at timestamptz DEFAULT now()
);
```

---

## Support Resources

- **Supabase Documentation:** https://supabase.com/docs/guides/database/backups
- **PostgreSQL Backup Guide:** https://www.postgresql.org/docs/current/backup.html
- **Project Issue Tracker:** [Link to your GitHub issues]

---

## Next Steps

1. **Immediate:** Check if Supabase backups are available
2. **Today:** Implement daily backup script
3. **This Week:** Add template export functionality
4. **This Week:** Set up database monitoring
5. **This Month:** Implement template versioning
6. **Ongoing:** Follow migration review checklist
