import { supabase, EmailTemplate } from '../lib/supabase';

export const emailTemplateService = {
  async getAll(): Promise<EmailTemplate[]> {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('category', 'email')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch email templates: ${error.message}`);
    }

    return data || [];
  },

  async getById(id: string): Promise<EmailTemplate | null> {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .eq('category', 'email')
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch email template: ${error.message}`);
    }

    return data;
  },

  async create(template: Partial<EmailTemplate>): Promise<EmailTemplate> {
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('templates')
      .insert({
        ...template,
        category: 'email',
        is_active: true,
        usage_count: 0,
        created_by: user?.id || null,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create email template: ${error.message}`);
    }

    return data;
  },

  async update(id: string, template: Partial<EmailTemplate>): Promise<EmailTemplate> {
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
      throw new Error(`Failed to update email template: ${error.message}`);
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete email template: ${error.message}`);
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
};
