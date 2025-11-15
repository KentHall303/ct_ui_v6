# ClientTether - Construction Management Platform

A comprehensive construction management platform for tracking jobs, managing calendars, handling sales pipelines, and coordinating team activities.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Database Management](#database-management)
- [Team Onboarding](#team-onboarding)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v18.0.0 or higher)
- npm (comes with Node.js)
- Git

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Install Dependencies

```bash
npm install
```

This will automatically check your database connection status after installation.

### 3. Verify Database Setup

```bash
npm run db:check
```

This command will show you the current status of your database tables and sample data.

### 4. Start Development Server

```bash
npm run dev
```

After a few seconds, your project should be accessible at [http://localhost:5173/](http://localhost:5173/)

## Database Setup

This project uses [Supabase](https://supabase.com/) as its database. The database connection is shared across all team members.

### Environment Variables

Your `.env` file should contain:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ Important:** Never commit the `.env` file to Git. It's already included in `.gitignore`.

### Database Schema

The database includes the following main tables:

- **estimators** - Team members and estimators
- **calendar_events** - Appointments and scheduled events
- **opportunities** - Sales pipeline opportunities
- **sales_cycles** - Sales cycle stage definitions
- **templates** - Email and communication templates
- **meetings** - Meeting records
- **messages** - Internal messaging data
- **cogs_items** - Cost of goods sold tracking

### Sample Data

The project includes comprehensive sample data for:

- 8 estimators (Test_Account Owner, Sara Joe, Jeanette Standards, etc.)
- Multiple calendar events throughout September 2025
- Pipeline opportunities across all sales stages
- Email templates for various communication scenarios
- Messages, meetings, and COGS items for testing

This sample data helps you immediately understand the UI/UX without having to create test data manually.

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run db:check` - Check database connection and status
- `npm run db:status` - Same as db:check (alias)

### Database Management

#### Check Database Status

To verify your database tables and sample data:

```bash
npm run db:check
```

This will show:
- ✅ Tables that exist with data
- ⚠️  Tables that exist but are empty
- ❌ Tables that are missing

#### Understanding the Output

```
✅ estimators          - 8 records (Team members/estimators)
✅ calendar_events     - 45 records (Calendar appointments)
⚠️  opportunities       - Empty (Sales pipeline opportunities)
❌ messages            - Missing (Message center data)
```

## Team Onboarding

### For New Team Members

When joining the project, follow these steps:

1. **Get Access to Supabase**
   - Ask your team admin for the Supabase project credentials
   - You'll need the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

2. **Set Up Your Environment**
   - Clone the repository
   - Create a `.env` file in the project root
   - Add your Supabase credentials

3. **Install and Verify**
   ```bash
   npm install
   npm run db:check
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

### Expected Experience

After setup, you should immediately see:
- **Calendar View**: Appointments for multiple estimators in September 2025
- **Pipeline View**: Sales opportunities across different stages
- **Message Center**: Sample messages
- **Templates**: Pre-configured email templates

If you don't see this data, run `npm run db:check` to diagnose the issue.

## Troubleshooting

### Database Connection Issues

**Problem:** Can't connect to Supabase

**Solutions:**
1. Verify your `.env` file exists and contains valid credentials
2. Check that `VITE_SUPABASE_URL` starts with `https://`
3. Ensure `VITE_SUPABASE_ANON_KEY` is the anon/public key (not the service role key)
4. Contact your team admin to verify Supabase project access

### Missing Sample Data

**Problem:** Tables exist but no data is showing in the UI

**Solutions:**
1. Run `npm run db:check` to see which tables are empty
2. Contact your team admin - migrations with seed data may need to be applied
3. The seed data SQL files are in `supabase/migrations/` with filenames containing "seed"

### Empty Database

**Problem:** `npm run db:check` shows tables are missing

**Solution:**
- The database migrations need to be applied by a team admin
- All migration files are in `supabase/migrations/`
- These can be applied through the Supabase dashboard or CLI

### Environment Variables Not Loading

**Problem:** Getting errors about missing `VITE_SUPABASE_URL`

**Solutions:**
1. Ensure your `.env` file is in the project root directory
2. Restart your development server after creating/modifying `.env`
3. Verify there are no typos in variable names
4. Make sure variables start with `VITE_` prefix

## Project Structure

```
project-root/
├── src/
│   ├── components/       # React components
│   ├── screens/          # Page components
│   ├── services/         # API service layer
│   ├── hooks/           # Custom React hooks
│   └── styles/          # SCSS styles
├── supabase/
│   └── migrations/      # Database migration files (with seed data)
├── scripts/
│   └── setup-database.js # Database verification script
├── .env                 # Environment variables (not in Git)
└── package.json
```

## Database Migrations

All database migrations are stored in `supabase/migrations/`. These include:

- Schema definitions (table structures)
- Seed data (sample estimators, events, opportunities, etc.)
- Indexes and constraints
- Row Level Security policies

Migrations are applied through Supabase and shared across all team members via the hosted database.

## Additional Documentation

### For Team Members
- **README.md** (this file) - Complete setup and usage guide
- **QUICK_START_MIGRATIONS.md** - Fast migration setup reference

### For Team Admins
- **SETUP_GUIDE.md** - Detailed admin guide for applying migrations
- **TEAM_SETUP_SUMMARY.md** - Overview of the team setup system

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

## Support

If you encounter issues:

1. Check this README's [Troubleshooting](#troubleshooting) section
2. Run `npm run db:check` to diagnose database issues
3. Review the additional documentation files listed above
4. Contact your team admin or project lead
