# Team Admin Setup Guide

This guide is for team administrators who need to set up and manage the shared Supabase database for the ClientTether project.

## Overview

The project uses a shared Supabase database where all team members connect to the same instance. This ensures everyone sees the same sample data and has a consistent development experience.

## Initial Database Setup

### Prerequisites

1. Access to the Supabase project dashboard
2. The project's Supabase credentials (URL and anon key)

### Applying Migrations

All database migrations are stored in the `supabase/migrations/` directory. These migrations must be applied to set up the database schema and seed data.

#### Option 1: Using Supabase Dashboard (Recommended)

1. **Log in to Supabase Dashboard**
   - Go to [https://app.supabase.com](https://app.supabase.com)
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Apply Migrations in Order**
   - Open each migration file from `supabase/migrations/` in chronological order
   - Copy the entire SQL content
   - Paste it into the SQL Editor
   - Click "Run" to execute
   - Repeat for all migration files

4. **Verify Success**
   - Check for any error messages
   - Use the Table Editor to verify tables were created
   - Check that sample data was inserted

**Important Migration Order:**

The migrations should be applied in chronological order (by filename timestamp):

```
1. 20251004172104_create_meetings_and_subcontractors_schema.sql
2. 20251007175631_create_cogs_items_table.sql
3. 20251007221155_create_messages_table.sql
4. 20251008002531_add_message_fields_for_display.sql
5. ... (continue in chronological order)
```

#### Option 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Install Supabase CLI globally
npm install -g supabase

# Link to your Supabase project
supabase link --project-ref <your-project-ref>

# Apply all migrations
supabase db push
```

### Key Migrations with Seed Data

The following migrations contain sample data that all team members should see:

1. **20251029223547_create_calendar_events_schema.sql**
   - Creates `estimators` and `calendar_events` tables
   - Seeds 8 estimators (Test_Account Owner, Sara Joe, etc.)
   - Seeds calendar events for September 2025

2. **20251029223914_seed_calendar_events.sql**
   - Adds more calendar events across September 2025
   - Various event types and statuses

3. **20251112185257_seed_dispatching_test_data.sql**
   - Adds comprehensive appointments for September 15, 2025
   - Multiple appointments per estimator for dispatching view testing

4. **20251029230033_add_pipeline_sample_data.sql**
   - Seeds sales pipeline opportunities
   - Spread across all sales cycle stages

5. **20251114175508_update_email_templates_seed_data.sql**
   - Seeds email templates
   - Various template types for different communication scenarios

## Verifying the Setup

After applying migrations, you can verify the setup using the verification script:

```bash
npm run db:check
```

Expected output:

```
✅ estimators          - 8 records (Team members/estimators)
✅ calendar_events     - 60+ records (Calendar appointments)
✅ opportunities       - 40+ records (Sales pipeline opportunities)
✅ sales_cycles        - 7 records (Sales cycle stages)
✅ templates          - Multiple records (Email templates)
```

## Sharing Access with Team Members

### 1. Provide Credentials

Each team member needs:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - The anonymous/public API key

**Where to find these:**
- Supabase Dashboard → Settings → API
- Copy "Project URL" and "anon public" key

### 2. .env Template

Provide team members with this `.env` template:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Security Note

⚠️ **Never share the service_role key!** Only share the `anon` public key.

## Resetting Sample Data

If the sample data becomes corrupted or needs to be reset:

### Option 1: Re-run Seed Migrations

1. Delete existing data:
   ```sql
   TRUNCATE TABLE calendar_events CASCADE;
   TRUNCATE TABLE estimators CASCADE;
   TRUNCATE TABLE opportunities CASCADE;
   -- Add other tables as needed
   ```

2. Re-run the seed migration files listed above

### Option 2: Full Database Reset

⚠️ **Caution: This will delete ALL data**

1. In Supabase Dashboard, go to Settings → Database
2. Use "Reset Database" option
3. Re-apply all migrations in order

## Troubleshooting

### Migration Fails with "relation already exists"

**Cause:** Migration was already partially applied

**Solution:** The migrations use `CREATE TABLE IF NOT EXISTS` and `ON CONFLICT DO NOTHING`, so you can safely re-run them.

### Foreign Key Violations

**Cause:** Migrations applied out of order

**Solution:**
1. Note which migration failed
2. Check which tables it depends on
3. Apply dependency migrations first
4. Retry the failed migration

### No Sample Data Appearing

**Cause:** Seed migrations weren't applied or data was deleted

**Solution:**
1. Check if tables exist: `SELECT * FROM estimators;`
2. If tables exist but empty, re-run seed migrations
3. If tables don't exist, apply schema migrations first

### Team Members Can't See Data

**Possible Causes:**

1. **Wrong environment variables** - Verify they're using correct Supabase URL and key
2. **RLS Policies** - Ensure anonymous access policies are in place (they are in the migrations)
3. **Network issues** - Check Supabase project status

**Solutions:**
1. Have them run `npm run db:check` to diagnose
2. Verify their `.env` file matches your credentials exactly
3. Check Supabase Dashboard → Database → Policies to ensure anonymous SELECT policies exist

## Adding New Migrations

When adding new features that require database changes:

1. **Create a new migration file** with timestamp:
   ```
   supabase/migrations/YYYYMMDDHHMMSS_description.sql
   ```

2. **Include proper documentation** in SQL comments:
   ```sql
   /*
     # Migration Title

     ## Changes
     - What tables/columns are added
     - What data is seeded

     ## Security
     - RLS policies added
   */
   ```

3. **Test the migration** before sharing:
   - Apply it to test database
   - Verify it works
   - Document any manual steps needed

4. **Notify the team**:
   - Commit the migration file to Git
   - Inform team that new migration is available
   - Provide instructions if manual steps needed

## Migration Best Practices

1. **Always use idempotent operations:**
   - `CREATE TABLE IF NOT EXISTS`
   - `DO $$ BEGIN ... IF NOT EXISTS ... END $$;`
   - `ON CONFLICT DO NOTHING` for inserts

2. **Never use destructive operations:**
   - Avoid `DROP TABLE` in shared migrations
   - Don't delete sample data
   - Use `ALTER TABLE ADD COLUMN IF NOT EXISTS` patterns

3. **Include seed data in migrations:**
   - Sample data should be in migration files
   - This ensures consistency across team
   - Use meaningful, realistic test data

4. **Document everything:**
   - Clear migration comments
   - List all changes
   - Note any dependencies

## Maintenance

### Regular Tasks

1. **Monitor database size** - Supabase free tier has limits
2. **Check for stale data** - Remove old test records if needed
3. **Update seed data** - Keep sample data relevant and useful
4. **Review RLS policies** - Ensure security is maintained

### When to Reset

Consider resetting the database when:
- Sample data becomes too cluttered
- Schema changes make old data incompatible
- Major refactoring requires clean slate
- Team needs to test fresh onboarding experience

## Contact

If you encounter issues not covered in this guide:

1. Check Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
2. Review migration files in `supabase/migrations/`
3. Contact the project lead or DevOps team
