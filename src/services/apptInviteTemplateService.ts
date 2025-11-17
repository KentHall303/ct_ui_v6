import { supabase, ApptInviteTemplate } from '../lib/supabase';

export const apptInviteTemplateService = {
  async getAll(): Promise<ApptInviteTemplate[]> {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('category', 'appt_invites')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch appointment invite templates: ${error.message}`);
    }

    return data || [];
  },

  async getById(id: string): Promise<ApptInviteTemplate | null> {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .eq('category', 'appt_invites')
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch appointment invite template: ${error.message}`);
    }

    return data;
  },

  async create(template: Partial<ApptInviteTemplate>): Promise<ApptInviteTemplate> {
    const { data, error } = await supabase
      .from('templates')
      .insert({
        ...template,
        category: 'appt_invites',
        is_active: true,
        usage_count: 0,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create appointment invite template: ${error.message}`);
    }

    return data;
  },

  async update(id: string, template: Partial<ApptInviteTemplate>): Promise<ApptInviteTemplate> {
    const { data, error } = await supabase
      .from('templates')
      .update({
        ...template,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update appointment invite template: ${error.message}`);
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete appointment invite template: ${error.message}`);
    }
  },

  async incrementUsageCount(id: string): Promise<void> {
    const { error } = await supabase
      .from('templates')
      .update({
        usage_count: supabase.rpc('increment', { row_id: id }),
        last_used_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.warn('Failed to increment usage count:', error.message);
    }
  },

  async duplicate(id: string): Promise<ApptInviteTemplate> {
    const original = await this.getById(id);

    if (!original) {
      throw new Error('Template not found');
    }

    const duplicatedTemplate: Partial<ApptInviteTemplate> = {
      name: `${original.name} (copy)`,
      subject: original.subject,
      contact_type: original.contact_type,
      additional_emails: original.additional_emails,
      calendar_title: original.calendar_title,
      external_calendar_title: original.external_calendar_title,
      select_token: original.select_token,
      content: original.content,
      protect_from_overwriting: original.protect_from_overwriting,
      category: original.category,
      description: original.description,
      variables: original.variables,
      tags: original.tags,
    };

    return await this.create(duplicatedTemplate);
  },
};
