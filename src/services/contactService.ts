import { supabase, Contact } from '../lib/supabase';

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

    let query = supabase
      .from('contacts')
      .select('*', { count: 'exact' });

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

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      contacts: data || [],
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
