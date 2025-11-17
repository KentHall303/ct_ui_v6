import { supabase, NotesLogsTemplate } from '../lib/supabase';

export const notesLogsTemplateService = {
  async getAll(): Promise<NotesLogsTemplate[]> {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('category', 'notes_logs')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch notes/logs templates: ${error.message}`);
    }

    return data || [];
  },

  async getById(id: string): Promise<NotesLogsTemplate | null> {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .eq('category', 'notes_logs')
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch notes/logs template: ${error.message}`);
    }

    return data;
  },

  async create(template: Partial<NotesLogsTemplate>): Promise<NotesLogsTemplate> {
    const { data, error } = await supabase
      .from('templates')
      .insert({
        ...template,
        category: 'notes_logs',
        is_active: true,
        usage_count: 0,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create notes/logs template: ${error.message}`);
    }

    return data;
  },

  async update(id: string, template: Partial<NotesLogsTemplate>): Promise<NotesLogsTemplate> {
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
      throw new Error(`Failed to update notes/logs template: ${error.message}`);
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete notes/logs template: ${error.message}`);
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

  async duplicate(id: string): Promise<NotesLogsTemplate> {
    const original = await this.getById(id);

    if (!original) {
      throw new Error('Template not found');
    }

    const duplicatedTemplate: Partial<NotesLogsTemplate> = {
      name: `${original.name} (copy)`,
      content: original.content,
      category: original.category,
      description: original.description,
      variables: original.variables,
      tags: original.tags,
    };

    return await this.create(duplicatedTemplate);
  },
};
