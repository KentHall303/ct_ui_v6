import { supabase, Contact } from '../lib/supabase';
import { createCalendarForContact, updateCalendarName, deleteCalendarForContact } from './calendarService';

export interface ContactsQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface ContactsResponse {
  contacts: Contact[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const contactService = {
  async getAll(params: ContactsQueryParams = {}): Promise<ContactsResponse> {
    const {
      page = 1,
      pageSize = 40,
      search = '',
      sortBy = 'name',
      sortDirection = 'asc'
    } = params;

    // Build query with LEFT JOIN to opportunities and sales_cycles
    let query = supabase
      .from('contacts')
      .select(`
        *,
        opportunities!opportunity_id(
          id,
          sales_cycle_id,
          sales_cycles!sales_cycle_id(
            name
          )
        )
      `, { count: 'exact' });

    // Filter to only show contacts that are in the pipeline (have an opportunity)
    query = query.not('opportunity_id', 'is', null);

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,cell_phone.ilike.%${search}%`);
    }

    query = query.order(sortBy, { ascending: sortDirection === 'asc' });

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Failed to fetch contacts: ${error.message}`);
    }

    // Map the sales_cycle name from the joined sales_cycles table
    const contacts = (data || []).map((contact: any) => {
      const salesCycleName = contact.opportunities?.sales_cycles?.name || contact.sales_cycle;
      return {
        ...contact,
        sales_cycle: salesCycleName,
        opportunities: undefined // Remove the nested object from the result
      };
    });

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      contacts,
      total,
      page,
      pageSize,
      totalPages
    };
  },

  async getById(id: string): Promise<Contact | null> {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch contact: ${error.message}`);
    }

    return data;
  },

  async create(contact: Partial<Contact>): Promise<Contact> {
    const { data, error } = await supabase
      .from('contacts')
      .insert(contact)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create contact: ${error.message}`);
    }

    if (data && data.name) {
      await createCalendarForContact(data.id, data.name);
    }

    return data;
  },

  async update(id: string, contact: Partial<Contact>): Promise<Contact> {
    const { data, error } = await supabase
      .from('contacts')
      .update({
        ...contact,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update contact: ${error.message}`);
    }

    if (data && contact.name) {
      await updateCalendarName(data.id, contact.name);
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete contact: ${error.message}`);
    }
  },
};
