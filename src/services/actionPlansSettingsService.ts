import { supabase } from '../lib/supabase';

export interface ActionPlansSettings {
  id: string;
  action_call_option: 'default' | 'ordered' | 'simultaneous';
  action_call_divert_to_assigned_user: boolean;
  bcc_system_sends_action_plan_emails: boolean;
  bcc_user_sends_bulk_emails: boolean;
  bcc_user_sends_manual_emails: boolean;
  bcc_account_owner_sends_emails: boolean;
  send_today_schedule_to_owner: boolean;
  send_from_assigned_user: boolean;
  action_plan_email_option: 'send_all' | 'send_assigned_only';
  play_client_status_message: boolean;
  ring_time_seconds: number;
  phone_return_option: 'default' | 'ordered' | 'pass_through' | 'simultaneous';
  phone_return_divert_to_assigned_user: boolean;
  business_hours_phone: string;
  after_hours_phone: string;
  text_notification_phone: string;
  send_owner_text_operation_hours_only: boolean;
  send_delayed_action_plan_texts_business_hours: boolean;
  end_connection_plan_on_return_text: boolean;
  created_at: string;
  updated_at: string;
}

export type ActionPlansSettingsUpdate = Partial<Omit<ActionPlansSettings, 'id' | 'created_at' | 'updated_at'>>;

export async function fetchActionPlansSettings(): Promise<ActionPlansSettings | null> {
  const { data, error } = await supabase
    .from('action_plans_settings')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching action plans settings:', error);
    return null;
  }

  return data;
}

export async function updateActionPlansSettings(
  id: string,
  updates: ActionPlansSettingsUpdate
): Promise<ActionPlansSettings | null> {
  const { data, error } = await supabase
    .from('action_plans_settings')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error updating action plans settings:', error);
    return null;
  }

  return data;
}

export async function createActionPlansSettings(
  settings: ActionPlansSettingsUpdate
): Promise<ActionPlansSettings | null> {
  const { data, error } = await supabase
    .from('action_plans_settings')
    .insert(settings)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating action plans settings:', error);
    return null;
  }

  return data;
}
