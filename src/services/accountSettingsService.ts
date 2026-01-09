import { supabase } from '../lib/supabase';

export interface AccountSettings {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  country: string;
  profile_image_url: string;
  is_active: boolean;
  record_call: boolean;
  notification_sound: boolean;
  right_side_panel_opened: boolean;
  default_page: string;
  default_contact_tab: string;
  company: string;
  account_owner: string;
  website: string;
  office_phone: string;
  notification_auto_delete_days: number;
  address_1: string;
  address_2: string;
  address_3: string;
  default_date_format: string;
  default_time_format: string;
  theme_color: string;
  header_color: string;
  footer_color: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
}

export type AccountSettingsUpdate = Partial<Omit<AccountSettings, 'id' | 'created_at' | 'updated_at'>>;

export async function fetchAccountSettings(): Promise<AccountSettings | null> {
  const { data, error } = await supabase
    .from('account_settings')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching account settings:', error);
    return null;
  }

  return data;
}

export async function updateAccountSettings(
  id: string,
  updates: AccountSettingsUpdate
): Promise<AccountSettings | null> {
  const { data, error } = await supabase
    .from('account_settings')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error updating account settings:', error);
    return null;
  }

  return data;
}

export async function createAccountSettings(
  settings: AccountSettingsUpdate
): Promise<AccountSettings | null> {
  const { data, error } = await supabase
    .from('account_settings')
    .insert(settings)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating account settings:', error);
    return null;
  }

  return data;
}

export async function uploadImage(
  file: File,
  bucket: string,
  folder: string
): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    return null;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return data.publicUrl;
}
