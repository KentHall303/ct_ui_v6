import { supabase } from '../lib/supabase';

export interface SeedDataExport {
  timestamp: string;
  tables: {
    [tableName: string]: any[];
  };
}

export interface TableInfo {
  name: string;
  displayName: string;
  count?: number;
}

const AVAILABLE_TABLES: TableInfo[] = [
  { name: 'meetings', displayName: 'Meetings' },
  { name: 'subcontractors', displayName: 'Subcontractors' },
  { name: 'calendar_events', displayName: 'Calendar Events' },
  { name: 'templates', displayName: 'Templates' },
  { name: 'connection_plans', displayName: 'Connection Plans' },
  { name: 'connection_plan_actions', displayName: 'Connection Plan Actions' },
  { name: 'bid_types', displayName: 'Bid Types' },
  { name: 'bid_type_categories', displayName: 'Bid Type Categories' },
  { name: 'bid_type_line_items', displayName: 'Bid Type Line Items' },
  { name: 'cogs_items', displayName: 'COGS Items' },
  { name: 'messages', displayName: 'Messages' },
  { name: 'payments', displayName: 'Payments' },
  { name: 'tokens', displayName: 'Tokens' },
];

export async function getTableInfo(): Promise<TableInfo[]> {
  const tablesWithCounts = await Promise.all(
    AVAILABLE_TABLES.map(async (table) => {
      const { count, error } = await supabase
        .from(table.name)
        .select('*', { count: 'exact', head: true });

      return {
        ...table,
        count: error ? 0 : (count || 0),
      };
    })
  );

  return tablesWithCounts;
}

export async function exportSeedData(tableNames: string[]): Promise<SeedDataExport> {
  const exportData: SeedDataExport = {
    timestamp: new Date().toISOString(),
    tables: {},
  };

  for (const tableName of tableNames) {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error(`Error exporting ${tableName}:`, error);
      continue;
    }

    exportData.tables[tableName] = data || [];
  }

  return exportData;
}

export function downloadSeedData(exportData: SeedDataExport, filename?: string): void {
  const jsonStr = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `seed-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function importSeedData(
  seedData: SeedDataExport,
  options: {
    mode: 'append' | 'replace';
    selectedTables?: string[];
  }
): Promise<{ success: boolean; errors: string[]; imported: Record<string, number> }> {
  const { mode, selectedTables } = options;
  const errors: string[] = [];
  const imported: Record<string, number> = {};

  const tablesToImport = selectedTables || Object.keys(seedData.tables);

  for (const tableName of tablesToImport) {
    const tableData = seedData.tables[tableName];

    if (!tableData || tableData.length === 0) {
      continue;
    }

    try {
      if (mode === 'replace') {
        const { error: deleteError } = await supabase
          .from(tableName)
          .delete()
          .neq('id', '00000000-0000-0000-0000-000000000000');

        if (deleteError) {
          errors.push(`Failed to clear ${tableName}: ${deleteError.message}`);
          continue;
        }
      }

      const { data, error: insertError } = await supabase
        .from(tableName)
        .insert(tableData)
        .select();

      if (insertError) {
        errors.push(`Failed to import ${tableName}: ${insertError.message}`);
        continue;
      }

      imported[tableName] = data?.length || 0;
    } catch (err) {
      errors.push(`Unexpected error importing ${tableName}: ${err}`);
    }
  }

  return {
    success: errors.length === 0,
    errors,
    imported,
  };
}

export function parseSeedDataFile(fileContent: string): SeedDataExport | null {
  try {
    const parsed = JSON.parse(fileContent);

    if (!parsed.timestamp || !parsed.tables) {
      throw new Error('Invalid seed data format');
    }

    return parsed as SeedDataExport;
  } catch (err) {
    console.error('Failed to parse seed data file:', err);
    return null;
  }
}
