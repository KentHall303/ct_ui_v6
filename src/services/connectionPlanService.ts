import { supabase, ConnectionPlan, ConnectionPlanAction, ConnectionPlanWithActions, ActionPlanType } from '../lib/supabase';

export const connectionPlanService = {
  async getAll(): Promise<ConnectionPlan[]> {
    const { data, error } = await supabase
      .from('connection_plans')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch connection plans: ${error.message}`);
    }

    return data || [];
  },

  async getByPlanType(planType: ActionPlanType): Promise<ConnectionPlan[]> {
    const { data, error } = await supabase
      .from('connection_plans')
      .select('*')
      .eq('is_active', true)
      .eq('plan_type', planType)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch connection plans: ${error.message}`);
    }

    return data || [];
  },

  async getById(id: string): Promise<ConnectionPlanWithActions | null> {
    const { data: plan, error: planError } = await supabase
      .from('connection_plans')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (planError) {
      throw new Error(`Failed to fetch connection plan: ${planError.message}`);
    }

    if (!plan) {
      return null;
    }

    const { data: actions, error: actionsError } = await supabase
      .from('connection_plan_actions')
      .select('*')
      .eq('connection_plan_id', id)
      .order('display_order', { ascending: true });

    if (actionsError) {
      throw new Error(`Failed to fetch connection plan actions: ${actionsError.message}`);
    }

    return {
      ...plan,
      actions: actions || []
    };
  },

  async create(plan: Partial<ConnectionPlan>): Promise<ConnectionPlan> {
    const { data, error } = await supabase
      .from('connection_plans')
      .insert({
        ...plan,
        is_active: plan.is_active !== undefined ? plan.is_active : true,
        count: 0,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create connection plan: ${error.message}`);
    }

    return data;
  },

  async update(id: string, plan: Partial<ConnectionPlan>): Promise<ConnectionPlan> {
    const { data, error } = await supabase
      .from('connection_plans')
      .update({
        ...plan,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update connection plan: ${error.message}`);
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('connection_plans')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete connection plan: ${error.message}`);
    }
  },

  async duplicate(id: string): Promise<ConnectionPlan> {
    const original = await this.getById(id);

    if (!original) {
      throw new Error('Connection plan not found');
    }

    const duplicatedPlan: Partial<ConnectionPlan> = {
      name: `${original.name} (copy)`,
      contact_types: original.contact_types,
      next_plan: original.next_plan,
      lead_sources: original.lead_sources,
      specific_date: original.specific_date,
      plan_id: original.plan_id,
      count: 0,
      is_active: original.is_active,
      show_only_here: original.show_only_here,
      build_pending_traditional: original.build_pending_traditional,
      build_pending_domino: original.build_pending_domino,
      protect_from_overwriting: original.protect_from_overwriting,
    };

    const newPlan = await this.create(duplicatedPlan);

    if (original.actions && original.actions.length > 0) {
      const duplicatedActions = original.actions.map(action => ({
        connection_plan_id: newPlan.id,
        step_number: action.step_number,
        action_name: action.action_name,
        action_type: action.action_type,
        delivery_timing: action.delivery_timing,
        delivery_type: action.delivery_type,
        add_notifications: action.add_notifications,
        display_order: action.display_order,
      }));

      await this.createActions(duplicatedActions);
    }

    return newPlan;
  },

  async createAction(action: Partial<ConnectionPlanAction>): Promise<ConnectionPlanAction> {
    const { data, error } = await supabase
      .from('connection_plan_actions')
      .insert(action)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create connection plan action: ${error.message}`);
    }

    return data;
  },

  async createActions(actions: Partial<ConnectionPlanAction>[]): Promise<ConnectionPlanAction[]> {
    const { data, error } = await supabase
      .from('connection_plan_actions')
      .insert(actions)
      .select();

    if (error) {
      throw new Error(`Failed to create connection plan actions: ${error.message}`);
    }

    return data || [];
  },

  async updateAction(id: string, action: Partial<ConnectionPlanAction>): Promise<ConnectionPlanAction> {
    const { data, error } = await supabase
      .from('connection_plan_actions')
      .update(action)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update connection plan action: ${error.message}`);
    }

    return data;
  },

  async deleteAction(id: string): Promise<void> {
    const { error } = await supabase
      .from('connection_plan_actions')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete connection plan action: ${error.message}`);
    }
  },

  async deleteAllActions(connectionPlanId: string): Promise<void> {
    const { error } = await supabase
      .from('connection_plan_actions')
      .delete()
      .eq('connection_plan_id', connectionPlanId);

    if (error) {
      throw new Error(`Failed to delete connection plan actions: ${error.message}`);
    }
  },
};
