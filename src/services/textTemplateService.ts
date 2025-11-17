import { supabase, TextTemplate } from '../lib/supabase';

export const textTemplateService = {
  async getAll(): Promise<TextTemplate[]> {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('category', 'text')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch text templates: ${error.message}`);
    }

    return data || [];
  },

  async getById(id: string): Promise<TextTemplate | null> {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .eq('category', 'text')
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch text template: ${error.message}`);
    }

    return data;
  },

  async create(template: Partial<TextTemplate>): Promise<TextTemplate> {
    const { data, error } = await supabase
      .from('templates')
      .insert({
        ...template,
        category: 'text',
        is_active: true,
        usage_count: 0,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create text template: ${error.message}`);
    }

    return data;
  },

  async update(id: string, template: Partial<TextTemplate>): Promise<TextTemplate> {
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
      throw new Error(`Failed to update text template: ${error.message}`);
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete text template: ${error.message}`);
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

  async duplicate(id: string): Promise<TextTemplate> {
    const original = await this.getById(id);

    if (!original) {
      throw new Error('Template not found');
    }

    const duplicatedTemplate: Partial<TextTemplate> = {
      name: `${original.name} (copy)`,
      contact_type: original.contact_type,
      content: original.content,
      select_token: original.select_token,
      content_tcpa: original.content_tcpa,
      protect_from_overwriting: original.protect_from_overwriting,
      protect_from_sharing: original.protect_from_sharing,
      category: original.category,
    };

    return await this.create(duplicatedTemplate);
  },
};
