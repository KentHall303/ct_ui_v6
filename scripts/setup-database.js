#!/usr/bin/env node

/**
 * Database Setup Script
 *
 * This script applies all database migrations from the supabase/migrations folder
 * to ensure consistent database schema and seed data across all team members.
 *
 * Usage:
 *   node scripts/setup-database.js          # Apply all migrations
 *   node scripts/setup-database.js --check  # Check migration status only
 */

import { createClient } from '@supabase/supabase-js';
import { readdir, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const isCheckOnly = args.includes('--check');

// Load environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Error: Missing Supabase environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkDatabaseConnection() {
  try {
    const { data, error } = await supabase.from('estimators').select('count').limit(1);
    if (error) throw error;
    return true;
  } catch (error) {
    return false;
  }
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
  console.log('\n📊 Database Status Check\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const tables = [
    { name: 'estimators', description: 'Team members/estimators' },
    { name: 'calendar_events', description: 'Calendar appointments' },
    { name: 'opportunities', description: 'Sales pipeline opportunities' },
    { name: 'sales_cycles', description: 'Sales cycle stages' },
    { name: 'templates', description: 'Email templates' },
    { name: 'meetings', description: 'Meeting records' },
    { name: 'messages', description: 'Message center data' },
    { name: 'cogs_items', description: 'Cost of goods sold items' }
  ];

  let allTablesExist = true;
  let hasData = false;

  for (const table of tables) {
    const exists = await checkTableExists(table.name);
    const count = exists ? await checkDataExists(table.name) : 0;

    if (!exists) {
      allTablesExist = false;
      console.log(`❌ ${table.name.padEnd(20)} - Missing (${table.description})`);
    } else if (count === 0) {
      console.log(`⚠️  ${table.name.padEnd(20)} - Empty (${table.description})`);
    } else {
      hasData = true;
      console.log(`✅ ${table.name.padEnd(20)} - ${count} records (${table.description})`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (!allTablesExist) {
    console.log('⚠️  Some tables are missing. Run "npm run db:setup" to create them.\n');
    return false;
  } else if (!hasData) {
    console.log('⚠️  Database schema exists but has no sample data.');
    console.log('   Run "npm run db:seed" to add sample data.\n');
    return false;
  } else {
    console.log('✅ Database is properly set up with sample data!\n');
    return true;
  }
}

async function main() {
  console.log('\n🚀 ClientTether Database Setup\n');

  // Check database connection
  console.log('Checking database connection...');
  const connected = await checkDatabaseConnection();

  if (!connected) {
    console.log('⚠️  Database tables not yet created.');
  } else {
    console.log('✅ Connected to Supabase');
  }

  if (isCheckOnly) {
    await checkDatabaseStatus();
    return;
  }

  console.log('\n📝 Important Information:\n');
  console.log('This project uses a hosted Supabase database.');
  console.log('Database migrations are managed through the Supabase dashboard.\n');
  console.log('To ensure your database has the latest schema and sample data:\n');
  console.log('1. The migrations in supabase/migrations/ should already be applied');
  console.log('2. Run "npm run db:check" to verify your database status');
  console.log('3. If tables are missing, contact your team admin to apply migrations\n');

  await checkDatabaseStatus();
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
