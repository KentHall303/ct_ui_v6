import { supabase, TaskTemplate } from '../lib/supabase';

export const taskTemplateService = {
  async getAll(): Promise<TaskTemplate[]> {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('category', 'task')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch task templates: ${error.message}`);
    }

    return data || [];
  },

  async getById(id: string): Promise<TaskTemplate | null> {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .eq('category', 'task')
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch task template: ${error.message}`);
    }

    return data;
  },

  async create(template: Partial<TaskTemplate>): Promise<TaskTemplate> {
    const { data, error } = await supabase
      .from('templates')
      .insert({
        ...template,
        category: 'task',
        is_active: true,
        usage_count: 0,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create task template: ${error.message}`);
    }

    return data;
  },

  async update(id: string, template: Partial<TaskTemplate>): Promise<TaskTemplate> {
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
      throw new Error(`Failed to update task template: ${error.message}`);
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete task template: ${error.message}`);
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

  async duplicate(id: string): Promise<TaskTemplate> {
    const original = await this.getById(id);

    if (!original) {
      throw new Error('Template not found');
    }

    const duplicatedTemplate: Partial<TaskTemplate> = {
      name: `${original.name} (copy)`,
      title: original.title,
      detail: original.detail,
      due_in_days: original.due_in_days,
      assignee_type: original.assignee_type,
      priority: original.priority,
      select_token: original.select_token,
      category: original.category,
    };

    return await this.create(duplicatedTemplate);
  },
};
