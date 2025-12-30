import { supabase } from '../lib/supabase';

export interface SalesCycle {
  id: string;
  name: string;
  order_position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const salesCycleService = {
  async getAll(): Promise<SalesCycle[]> {
    const { data, error } = await supabase
      .from('sales_cycles')
      .select('*')
      .eq('is_active', true)
      .order('order_position', { ascending: true });

    if (error) {
      console.error('Error fetching sales cycles:', error);
      throw error;
    }

    return data || [];
  },

  async getById(id: string): Promise<SalesCycle | null> {
    const { data, error } = await supabase
      .from('sales_cycles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching sales cycle:', error);
      return null;
    }

    return data;
  }
};
