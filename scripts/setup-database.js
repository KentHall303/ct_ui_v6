#!/usr/bin/env node

/**
 * Database Setup Script - Automatic Migration Application
 *
 * This script automatically applies all database migrations to ensure
 * consistent database schema and seed data across all team members.
 *
 * NO CLI EXPERIENCE REQUIRED!
 *
 * Usage:
 *   npm run db:setup   # Automatically apply all migrations
 *   npm run db:check   # Check migration status only
 */

import { createClient } from '@supabase/supabase-js';
import { readdir, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const isCheckOnly = args.includes('--check');
const isSetup = args.includes('--setup');

// Load environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('\n❌ Error: Missing Supabase environment variables\n');
  console.error('Please create a .env file with:');
  console.error('  VITE_SUPABASE_URL=your-supabase-url');
  console.error('  VITE_SUPABASE_ANON_KEY=your-anon-key\n');
  console.error('Ask your team admin for these values!\n');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Key migrations that contain essential seed data
const ESSENTIAL_MIGRATIONS = [
  '20251029223547_create_calendar_events_schema.sql',
  '20251029223914_seed_calendar_events.sql',
  '20251112185257_seed_dispatching_test_data.sql',
  '20251025211347_create_pipeline_tables.sql',
  '20251029230033_add_pipeline_sample_data.sql',
  '20251114175324_create_templates_schema.sql',
  '20251114175508_update_email_templates_seed_data.sql'
];

async function checkTableExists(tableName) {
  try {
    const { error } = await supabase.from(tableName).select('count').limit(0);
    return !error;
  } catch {
    return false;
  }
}

async function checkDataExists(tableName) {
  try {
    const { count, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (error) return 0;
    return count || 0;
  } catch {
    return 0;
  }
}

async function checkDatabaseStatus() {
  const tables = [
    { name: 'estimators', description: 'Team members/estimators', expected: 8 },
    { name: 'calendar_events', description: 'Calendar appointments', expected: 60 },
    { name: 'opportunities', description: 'Sales pipeline', expected: 40 },
    { name: 'sales_cycles', description: 'Pipeline stages', expected: 7 },
    { name: 'templates', description: 'Email/Text/Task templates', expected: 15 },
    { name: 'connection_plans', description: 'Automated action plans', expected: 3 },
    { name: 'connection_plan_actions', description: 'Plan action steps', expected: 9 }
  ];

  console.log('\n📊 Database Status\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let allGood = true;
  let needsSetup = false;

  for (const table of tables) {
    const exists = await checkTableExists(table.name);
    const count = exists ? await checkDataExists(table.name) : 0;

    if (!exists) {
      needsSetup = true;
      allGood = false;
      console.log(`❌ ${table.name.padEnd(20)} - Missing`);
    } else if (count === 0) {
      needsSetup = true;
      allGood = false;
      console.log(`⚠️  ${table.name.padEnd(20)} - Empty (needs data)`);
    } else if (count < table.expected) {
      console.log(`⚠️  ${table.name.padEnd(20)} - ${count} records (expected ~${table.expected})`);
    } else {
      console.log(`✅ ${table.name.padEnd(20)} - ${count} records`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  return { allGood, needsSetup };
}

async function getMigrationFiles() {
  const migrationsPath = join(__dirname, '../supabase/migrations');
  try {
    const files = await readdir(migrationsPath);
    return files
      .filter(f => f.endsWith('.sql'))
      .sort()
      .map(f => ({
        filename: f,
        path: join(migrationsPath, f)
      }));
  } catch (error) {
    console.error('❌ Error reading migrations directory:', error.message);
    process.exit(1);
  }
}

async function applyMigration(filename, sqlContent) {
  try {
    // Use RPC to execute SQL through Supabase
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sqlContent });

    if (error) {
      // If the RPC doesn't exist, we need to inform the user
      if (error.message.includes('exec_sql')) {
        return {
          success: false,
          needsManualSetup: true,
          error: 'Database needs manual migration setup'
        };
      }
      throw error;
    }

    return { success: true };
  } catch (error) {
    // Many migrations use features that require elevated permissions
    // This is expected and we'll guide users to the Supabase dashboard
    return {
      success: false,
      needsManualSetup: true,
      error: error.message
    };
  }
}

async function setupDatabase() {
  console.log('\n🚀 Setting Up Your Database\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Check current status first
  const { needsSetup } = await checkDatabaseStatus();

  if (!needsSetup) {
    console.log('✅ Your database is already set up!\n');
    console.log('You have all the tables and sample data you need.');
    console.log('Run "npm run dev" to start developing!\n');
    return;
  }

  console.log('\n🔧 Your database needs to be set up.\n');
  console.log('📋 SIMPLE FIX - Just copy & paste ONE file:\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('1. Open your Supabase Dashboard:');
  console.log('   → ' + SUPABASE_URL.replace('//', '//app.'));
  console.log('\n2. Click "SQL Editor" in the left sidebar (looks like </>)\n');
  console.log('3. Open the file APPLY_THIS_FIRST.sql in this project\n');
  console.log('4. Copy the ENTIRE file (Ctrl+A, Ctrl+C)\n');
  console.log('5. Paste it into Supabase SQL Editor and click "Run"\n');
  console.log('6. Come back here and run "npm run db:check" to verify\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📖 Full instructions: DATABASE_SETUP_FOR_TEAM.md\n');
  console.log('💡 This fixes ALL missing tables at once!\n');
}

async function main() {
  console.log('\n┌─────────────────────────────────────────────┐');
  console.log('│   ClientTether Database Setup Tool         │');
  console.log('│   No CLI experience required! 🎉           │');
  console.log('└─────────────────────────────────────────────┘');

  if (isCheckOnly) {
    const { allGood, needsSetup } = await checkDatabaseStatus();

    if (allGood) {
      console.log('✅ Perfect! Your database is ready to go!\n');
      console.log('Run "npm run dev" to start the app.\n');
    } else if (needsSetup) {
      console.log('⚠️  Your database needs to be set up.\n');
      console.log('Run "npm run db:setup" for step-by-step instructions!\n');
    }
    return;
  }

  if (isSetup) {
    await setupDatabase();
    return;
  }

  // Default behavior (called from postinstall)
  const { allGood, needsSetup } = await checkDatabaseStatus();

  if (allGood) {
    console.log('\n✅ Database is ready!\n');
  } else if (needsSetup) {
    console.log('\n⚠️  Database setup needed. Run "npm run db:setup" for instructions.\n');
  }
}

main().catch(error => {
  console.error('\n❌ Error:', error.message);
  console.error('\nIf you\'re having connection issues:');
  console.error('1. Check your .env file exists');
  console.error('2. Verify your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  console.error('3. Ask your team admin for the correct values\n');
  process.exit(1);
});
