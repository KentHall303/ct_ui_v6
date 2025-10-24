import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Subcontractor {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  specialty?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  customer_id: string;
  title: string;
  description?: string;
  address?: string;
  status: 'proposal' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
  total_amount?: number;
  created_at: string;
  updated_at: string;
}

export interface Meeting {
  id: string;
  job_id: string;
  title: string;
  description?: string;
  meeting_type: 'site_visit' | 'consultation' | 'inspection' | 'follow_up';
  start_date: string;
  end_date: string;
  location?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface MeetingSubcontractor {
  id: string;
  meeting_id: string;
  subcontractor_id: string;
  is_primary: boolean;
  notes?: string;
  created_at: string;
}

export interface MeetingWithSubcontractors extends Meeting {
  subcontractors: Array<Subcontractor & { is_primary: boolean; notes?: string }>;
}
