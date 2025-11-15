import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://0ec90b57d6e95fcbda19832f.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw';

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

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  contact_type: string;
  exclude_client: boolean;
  content: string;
  category: string;
  description?: string;
  variables?: Record<string, any>;
  tags?: string[];
  is_active: boolean;
  usage_count: number;
  last_used_at?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  content_tcpa?: 'Promotional' | 'Transactional' | 'Mixed';
  additional_emails?: string;
  bcc_email?: string;
  select_token?: string;
  protect_from_overwriting?: boolean;
  protect_from_sharing?: boolean;
}
