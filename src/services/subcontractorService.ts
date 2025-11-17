import { supabase } from '../lib/supabase';

export interface Subcontractor {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  specialty: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function fetchSubcontractors(filters?: {
  isActive?: boolean;
}): Promise<Subcontractor[]> {
  try {
    let query = supabase
      .from('subcontractors')
      .select('*')
      .order('name', { ascending: true });

    if (filters?.isActive !== undefined) {
      query = query.eq('is_active', filters.isActive);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching subcontractors:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching subcontractors:', error);
    return [];
  }
}

export async function fetchSubcontractorById(id: string): Promise<Subcontractor | null> {
  try {
    const { data, error } = await supabase
      .from('subcontractors')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching subcontractor:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching subcontractor:', error);
    return null;
  }
}
