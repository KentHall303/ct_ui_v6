import { supabase } from '../lib/supabase';

export interface AddonSetting {
  id: string;
  addon_id: string;
  enabled: boolean;
  input_value: string | null;
  created_at: string;
  updated_at: string;
}

export type AddonSettingUpdate = {
  enabled: boolean;
  input_value?: string | null;
};

export async function fetchAddonSettings(): Promise<Record<string, AddonSetting>> {
  const { data, error } = await supabase
    .from('addon_settings')
    .select('*');

  if (error) {
    console.error('Error fetching addon settings:', error);
    return {};
  }

  const settingsMap: Record<string, AddonSetting> = {};
  if (data) {
    data.forEach((setting) => {
      settingsMap[setting.addon_id] = setting;
    });
  }

  return settingsMap;
}

export async function upsertAddonSetting(
  addonId: string,
  update: AddonSettingUpdate
): Promise<AddonSetting | null> {
  const { data, error } = await supabase
    .from('addon_settings')
    .upsert(
      {
        addon_id: addonId,
        enabled: update.enabled,
        input_value: update.input_value ?? null,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'addon_id',
      }
    )
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error upserting addon setting:', error);
    return null;
  }

  return data;
}

export async function bulkUpsertAddonSettings(
  updates: Array<{ addonId: string; enabled: boolean; inputValue?: string | null }>
): Promise<boolean> {
  const upsertData = updates.map((update) => ({
    addon_id: update.addonId,
    enabled: update.enabled,
    input_value: update.inputValue ?? null,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from('addon_settings')
    .upsert(upsertData, {
      onConflict: 'addon_id',
    });

  if (error) {
    console.error('Error bulk upserting addon settings:', error);
    return false;
  }

  return true;
}
