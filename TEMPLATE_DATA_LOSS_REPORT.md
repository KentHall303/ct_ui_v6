# Template Data Loss - Investigation Report

**Date:** December 3, 2025
**Status:** CRITICAL DATA LOSS CONFIRMED

---

## Executive Summary

Custom template data has been completely lost due to destructive migration files. Only generic demo templates currently exist in the database. All custom email and notes/logs templates created by users have been deleted.

---

## What Was Lost

### Confirmed Deletions
- **ALL custom email templates** - Deleted by migration `20251120224206_seed_email_templates.sql`
- **ALL custom notes/logs templates** - Deleted by migration `20251120224337_seed_notes_logs_templates.sql`

### Missing Categories (Never Seeded)
- **Task templates** (0 records)
- **Appointment invite templates** (0 records)
- **Export list templates** (0 records)

---

## What Currently Exists

### Email Templates (10 records)
- 5x "! please provide missing Data" (generic demo templates)
- 5x "{{client.firstName}} signature process as promised" (generic demo templates)
- All created: 2025-12-03 19:54:29
- All have `created_by = null` (system-generated, not user-created)

### Text/SMS Templates (15 records)
- Appointment Test
- Collin New Text
- Lunch break Name
- Next Appointments
- Phone Fill Text
- Purple Gif
- Referral Received (ReferPro)
- Show me the next appointment
- Sunny Test Text
- Template SMS with Attachment (2x)
- Thanks for contacting us! (4x)
- All created: 2025-12-03 19:54:52
- All have `created_by = null` (system-generated)

---

## Root Cause Analysis

### Problem 1: Destructive Migration Pattern

Two migration files use `DELETE FROM templates WHERE category = 'X'` before inserting demo data:

**File:** `supabase/migrations/20251120224206_seed_email_templates.sql`
```sql
DELETE FROM templates WHERE category = 'email';
```

**File:** `supabase/migrations/20251120224337_seed_notes_logs_templates.sql`
```sql
DELETE FROM templates WHERE category = 'notes_logs';
```

### Problem 2: Migration Not Tracked

- The templates table exists with full schema
- Data exists in the database
- BUT: No template migrations are recorded in `supabase_migrations.schema_migrations`
- This suggests manual SQL execution outside the migration system

### Why This Is Wrong

Migrations should **NEVER** delete existing user data. The correct pattern is:

```sql
INSERT INTO templates (...) VALUES (...)
ON CONFLICT DO NOTHING;
```

This pattern is used correctly in other template migration files:
- `seed_text_templates.sql` - Uses `ON CONFLICT DO NOTHING`
- `seed_task_templates_fixed.sql` - Uses `ON CONFLICT DO NOTHING`
- `seed_appointment_invite_templates.sql` - Uses `ON CONFLICT DO NOTHING`
- `seed_export_list_templates.sql` - Uses `ON CONFLICT DO NOTHING`

---

## Recovery Options

### Option 1: Supabase Point-in-Time Recovery (BEST CHANCE)
Check if Supabase has automatic backups enabled for this project. The Pro plan includes:
- Daily backups
- Point-in-time recovery
- Can restore to any point before the destructive migration ran

**Action Required:** Log into Supabase Dashboard → Project Settings → Backups

### Option 2: Application Logs
Check if the application cached or logged template content that could be recovered.

### Option 3: Version Control
Check if template data was committed to Git in any form (seed files, exports, etc.).

### Option 4: Manual Recreation
Users will need to manually recreate their custom templates from memory or documentation.

---

## Immediate Actions Required

### 1. Prevent Further Data Loss
Remove ALL `DELETE` statements from migration files.

### 2. Backup Current State
Export all current templates before making any changes.

### 3. Fix Migration Files
Update problematic migrations to use safe patterns.

### 4. Document Recovery Process
Create a recovery plan for users to recreate lost templates.

### 5. Implement Safeguards
- Add migration review process
- Implement automated backups
- Add pre-migration data exports
- Create template export/import functionality

---

## Migration Files That Need Fixing

1. `supabase/migrations/20251030195332_seed_email_templates.sql` - Line 15
2. `supabase/migrations/20251114175115_update_email_templates_seed_data.sql` - Line 30
3. `supabase/migrations/20251114175508_update_email_templates_seed_data.sql` - Line 30
4. `supabase/migrations/20251117210919_seed_notes_logs_templates.sql` - Line 25
5. `supabase/migrations/20251120224206_seed_email_templates.sql` - Line 15
6. `supabase/migrations/20251120224337_seed_notes_logs_templates.sql` - Line 25

---

## Recommendations for Future

### Database Safety
1. Never use `DELETE`, `DROP`, or `TRUNCATE` in migration files
2. Always use `ON CONFLICT DO NOTHING` for seed data
3. Implement automated daily backups
4. Test migrations on staging before production
5. Add migration rollback procedures

### Application Features
1. Add template export functionality (JSON/CSV)
2. Add template import functionality
3. Implement template versioning/history
4. Add "soft delete" instead of hard delete
5. Create template backup reminders for users

### Process Improvements
1. Require migration peer review
2. Document migration best practices
3. Create migration checklist
4. Implement pre-migration backup automation
5. Add migration impact assessment requirement

---

## Contact Information

If you can recover the original template data, please import it using a new migration file with proper conflict handling.
