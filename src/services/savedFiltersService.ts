import { supabase } from '../lib/supabase';

export interface SavedFilter {
  id: string;
  name: string;
  filter_type: 'Contact Filters' | 'Advanced Filters';
  filter_config: FilterConfig;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface FilterConfig {
  actionPlan?: string;
  state?: string;
  salesCycle?: string;
  previousAccounts?: string;
  leadSource?: string;
  assignedUser?: string;
  tags?: string;
  findDuplicates?: string;
  advancedRows?: AdvancedFilterRow[];
}

export interface AdvancedFilterRow {
  field: string;
  operator: string;
  value: string;
  continueWith: string;
}

export interface SavedFilterGroup {
  type: 'Contact Filters' | 'Advanced Filters';
  filters: SavedFilter[];
}

export const savedFiltersService = {
  async getAll(): Promise<SavedFilter[]> {
    const { data, error } = await supabase
      .from('saved_filters')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching saved filters:', error);
      return [];
    }

    return data || [];
  },

  async getGrouped(): Promise<SavedFilterGroup[]> {
    const filters = await this.getAll();

    const contactFilters = filters.filter(f => f.filter_type === 'Contact Filters');
    const advancedFilters = filters.filter(f => f.filter_type === 'Advanced Filters');

    const groups: SavedFilterGroup[] = [];

    if (contactFilters.length > 0) {
      groups.push({ type: 'Contact Filters', filters: contactFilters });
    }

    if (advancedFilters.length > 0) {
      groups.push({ type: 'Advanced Filters', filters: advancedFilters });
    }

    return groups;
  },

  async getById(id: string): Promise<SavedFilter | null> {
    const { data, error } = await supabase
      .from('saved_filters')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching saved filter:', error);
      return null;
    }

    return data;
  },

  async create(filter: Omit<SavedFilter, 'id' | 'created_at' | 'updated_at'>): Promise<SavedFilter | null> {
    const { data, error } = await supabase
      .from('saved_filters')
      .insert([filter])
      .select()
      .single();

    if (error) {
      console.error('Error creating saved filter:', error);
      return null;
    }

    return data;
  },

  async update(id: string, updates: Partial<SavedFilter>): Promise<SavedFilter | null> {
    const { data, error } = await supabase
      .from('saved_filters')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating saved filter:', error);
      return null;
    }

    return data;
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('saved_filters')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting saved filter:', error);
      return false;
    }

    return true;
  }
};
