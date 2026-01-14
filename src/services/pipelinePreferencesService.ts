import { supabase } from '../lib/supabase';

export type DisplayByOption = 'contact_name' | 'company_name';

export interface PipelinePreference {
  id: string;
  user_identifier: string;
  display_by: DisplayByOption;
  created_at: string;
  updated_at: string;
}

const DEFAULT_USER_IDENTIFIER = 'default_user';

export const pipelinePreferencesService = {
  async getPreferences(userIdentifier: string = DEFAULT_USER_IDENTIFIER): Promise<PipelinePreference | null> {
    const { data, error } = await supabase
      .from('pipeline_preferences')
      .select('*')
      .eq('user_identifier', userIdentifier)
      .maybeSingle();

    if (error) {
      console.error('Error fetching pipeline preferences:', error);
      return null;
    }

    return data;
  },

  async getDisplayBy(userIdentifier: string = DEFAULT_USER_IDENTIFIER): Promise<DisplayByOption> {
    const prefs = await this.getPreferences(userIdentifier);
    return prefs?.display_by || 'contact_name';
  },

  async setDisplayBy(displayBy: DisplayByOption, userIdentifier: string = DEFAULT_USER_IDENTIFIER): Promise<boolean> {
    const existing = await this.getPreferences(userIdentifier);

    if (existing) {
      const { error } = await supabase
        .from('pipeline_preferences')
        .update({ display_by: displayBy })
        .eq('user_identifier', userIdentifier);

      if (error) {
        console.error('Error updating pipeline preferences:', error);
        return false;
      }
    } else {
      const { error } = await supabase
        .from('pipeline_preferences')
        .insert({
          user_identifier: userIdentifier,
          display_by: displayBy,
        });

      if (error) {
        console.error('Error creating pipeline preferences:', error);
        return false;
      }
    }

    return true;
  },
};
