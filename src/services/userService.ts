import { supabase } from '../lib/supabase';

export type UserType = 'standard' | 'admin' | 'salesperson' | 'subcontractor';

export interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  user_type: UserType;
  api_id: string | null;
  timezone: string | null;
  default_page: string | null;
  default_contact_tab: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateUserInput {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  user_type: UserType;
  api_id?: string;
  timezone?: string;
  default_page?: string;
  default_contact_tab?: string;
}

export interface UpdateUserInput {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  user_type?: UserType;
  api_id?: string;
  timezone?: string;
  default_page?: string;
  default_contact_tab?: string;
  is_active?: boolean;
}

export const USER_TYPE_LABELS: Record<UserType, string> = {
  standard: 'Standard',
  admin: 'Admin',
  salesperson: 'Salesperson',
  subcontractor: 'Subcontractor (Subs)',
};

export async function fetchUsers(filters?: {
  userType?: UserType;
  isActive?: boolean;
}): Promise<User[]> {
  try {
    let query = supabase
      .from('users')
      .select('*')
      .order('first_name', { ascending: true });

    if (filters?.userType) {
      query = query.eq('user_type', filters.userType);
    }

    if (filters?.isActive !== undefined) {
      query = query.eq('is_active', filters.isActive);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function fetchUserById(id: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function createUser(input: CreateUserInput): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([input])
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function updateUser(id: string, input: UpdateUserInput): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ ...input, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting user:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
}
