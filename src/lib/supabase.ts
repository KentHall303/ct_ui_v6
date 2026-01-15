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

export interface TaskTemplate {
  id: string;
  name: string;
  title: string;
  detail: string;
  content?: string;
  due_in_days: number;
  assignee_type: 'account_owner' | 'assigned_user' | 'specific_user';
  priority: string;
  select_token?: string;
  category: string;
  is_active: boolean;
  usage_count: number;
  last_used_at?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface TextTemplate {
  id: string;
  name: string;
  contact_type: string;
  content: string;
  select_token?: string;
  content_tcpa?: 'Promotional' | 'Transactional' | 'Mixed';
  protect_from_overwriting?: boolean;
  protect_from_sharing?: boolean;
  category: string;
  is_active: boolean;
  usage_count: number;
  last_used_at?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface ApptInviteTemplate {
  id: string;
  name: string;
  subject: string;
  contact_type: string;
  additional_emails?: string;
  calendar_title?: string;
  external_calendar_title?: string;
  select_token?: string;
  content: string;
  protect_from_overwriting?: boolean;
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
}

export interface NotesLogsTemplate {
  id: string;
  name: string;
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
}

export interface TokenCategory {
  id: string;
  name: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Token {
  id: string;
  category_id: string;
  token_value: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TokenCategoryWithTokens extends TokenCategory {
  tokens: Token[];
}

export type ActionPlanType = 'Connection Plans' | 'Conversion Plans' | 'Retention Plans' | 'Events Plans' | 'Seasonal Plans' | 'Parallel Trigger Plans';

export interface ConnectionPlan {
  id: string;
  name: string;
  contact_types: string;
  next_plan?: string;
  lead_sources?: string;
  specific_date?: string;
  plan_id?: string;
  count: number;
  is_active: boolean;
  show_only_here: boolean;
  build_pending_traditional: boolean;
  build_pending_domino: boolean;
  protect_from_overwriting: boolean;
  plan_type: ActionPlanType;
  created_at: string;
  updated_at: string;
}

export interface ConnectionPlanAction {
  id: string;
  connection_plan_id: string;
  step_number: number;
  action_name: string;
  action_type?: string;
  delivery_timing?: string;
  delivery_type: string;
  add_notifications: boolean;
  display_order: number;
  action_config?: Record<string, any>;
  created_at: string;
}

export interface ConnectionPlanWithActions extends ConnectionPlan {
  actions: ConnectionPlanAction[];
}

export type ContactType = 'Client' | 'Employee' | 'Partner' | 'Vendor' | 'Other';

export interface Contact {
  id: string;
  name: string;
  email?: string;
  cell_phone?: string;
  state?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  sales_cycle?: string;
  lead_source?: string;
  created_date?: string;
  white_board?: string;
  status_color?: string;
  is_starred?: boolean;
  client_tether?: string;
  assigned_user?: string;
  next_date?: string;
  favorite_color?: string;
  opportunity_id?: string;
  contact_type?: ContactType;
  created_at: string;
  updated_at: string;
}

export interface Opportunity {
  id: string;
  contact_id?: string;
  contact_name: string;
  company_name?: string;
  email?: string;
  phone?: string;
  sales_cycle_id: string;
  estimated_value: number;
  priority: 'new_lead' | 'missed_action' | 'today_action' | 'pending_action' | 'no_pending';
  lead_source?: string;
  contact_type: string;
  order_position: number;
  created_at: string;
  updated_at: string;
}
