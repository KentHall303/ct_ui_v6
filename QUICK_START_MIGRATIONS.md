# Quick Start: Applying Database Migrations

This guide shows you how to quickly apply all database migrations to get your team's database populated with the proper schema and sample data.

## For Team Admins: First Time Setup

### Step 1: Access Supabase Dashboard

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Log in and select your project
3. Click **"SQL Editor"** in the left sidebar

### Step 2: Apply Migrations

You need to run the migrations in order. Here's the fastest way:

#### Method A: Run All-in-One Script (Recommended)

I'll create a consolidated script that includes all essential migrations. Copy and paste this into the SQL Editor:

**Note:** If you prefer to run migrations individually for better control, see Method B below.

#### Method B: Run Migrations One by One

Run these key migrations in the SQL Editor (copy entire file content and click "Run"):

1. **Core Schema & Estimators:**
   - `20251029223547_create_calendar_events_schema.sql` - Creates estimators and calendar tables + 8 sample estimators

2. **Calendar Sample Data:**
   - `20251029223914_seed_calendar_events.sql` - Adds calendar events for September 2025
   - `20251112185257_seed_dispatching_test_data.sql` - Adds detailed September 15 appointments

3. **Pipeline Setup:**
   - `20251025211347_create_pipeline_tables.sql` - Creates sales pipeline tables
   - `20251029230033_add_pipeline_sample_data.sql` - Adds sample opportunities

4. **Templates:**
   - `20251114175324_create_templates_schema.sql` - Creates templates table
   - `20251114175508_update_email_templates_seed_data.sql` - Adds sample templates

5. **Other Features:**
   - `20251004172104_create_meetings_and_subcontractors_schema.sql` - Meetings and subcontractors
   - `20251007221155_create_messages_table.sql` - Message center
   - `20251007175631_create_cogs_items_table.sql` - Cost tracking

### Step 3: Verify Success

After running migrations, team members can verify by running:

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
✅ meetings           - Records present
✅ messages           - Records present
✅ cogs_items         - Records present
```

## For Team Members: Verifying Your Setup

Once your admin has applied the migrations:

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <project-directory>
   ```

2. **Create .env file**
   Ask your team admin for the Supabase credentials and create:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Check database**
   ```bash
   npm run db:check
   ```

5. **Start development**
   ```bash
   npm run dev
   ```

## What Sample Data You Should See

After successful setup, you'll immediately see:

### Calendar View (Jobs → Dispatching)
- **8 Estimators:** Test_Account Owner, Sara Joe, Jeanette Standards, Standard Kent, Sara Admin, Absolute Nugget, Frank Team, Sara Admin Team
- **Multiple appointments on September 15, 2025:**
  - Test_Account Owner: Kitchen Remodel, Bathroom Installation, Roof Inspection, Follow Up
  - Sara Joe: Window Replacement, Fence Installation, Gutter Cleaning
  - Jeanette Standards: Flooring Installation, Painting Project, HVAC Inspection
  - And more appointments throughout the month

### Pipeline View
- **7 Sales Stages:** Lead, Qualified, Meeting Scheduled, Proposal Sent, Negotiation, Won, Lost
- **40+ Opportunities** spread across all stages with realistic company names and contact info

### Templates
- Email templates for various scenarios
- Different template types and categories

### Message Center
- Sample messages and communications

## Troubleshooting

### "Tables Missing" Error

**Problem:** Running `npm run db:check` shows tables are missing

**Solution:**
- Team admin needs to apply the migrations through Supabase Dashboard
- See "Step 2: Apply Migrations" above

### "Tables Empty" Warning

**Problem:** Tables exist but no data shows

**Solution:**
- The seed data migrations weren't run
- Run these specific migrations:
  - `20251029223914_seed_calendar_events.sql`
  - `20251112185257_seed_dispatching_test_data.sql`
  - `20251029230033_add_pipeline_sample_data.sql`
  - `20251114175508_update_email_templates_seed_data.sql`

### "Can't Connect" Error

**Problem:** Can't connect to Supabase

**Solutions:**
1. Verify `.env` file exists in project root
2. Check credentials are correct
3. Ensure using the `anon` key, not `service_role` key
4. Verify Supabase project is active

## Need Help?

- Check `SETUP_GUIDE.md` for detailed admin instructions
- Check `README.md` for general documentation
- Run `npm run db:check` to diagnose issues
- Contact your team admin or project lead
