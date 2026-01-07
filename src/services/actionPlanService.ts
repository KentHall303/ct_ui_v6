import { supabase, ConnectionPlan, ActionPlanType } from '../lib/supabase';

export interface ActionPlanGroup {
  type: ActionPlanType;
  plans: ConnectionPlan[];
}

export const ACTION_PLAN_TYPES: ActionPlanType[] = [
  'Connection Plans',
  'Conversion Plans',
  'Retention Plans',
  'Events Plans',
  'Seasonal Plans',
  'Parallel Trigger Plans'
];

export const actionPlanService = {
  async getAllGroupedByType(): Promise<ActionPlanGroup[]> {
    const { data, error } = await supabase
      .from('connection_plans')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch action plans: ${error.message}`);
    }

    const plans = data || [];

    const grouped: ActionPlanGroup[] = ACTION_PLAN_TYPES.map(type => ({
      type,
      plans: plans.filter(plan => plan.plan_type === type)
    })).filter(group => group.plans.length > 0);

    return grouped;
  },

  async getAll(): Promise<ConnectionPlan[]> {
    const { data, error } = await supabase
      .from('connection_plans')
      .select('*')
      .eq('is_active', true)
      .order('plan_type', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch action plans: ${error.message}`);
    }

    return data || [];
  },

  async getByType(planType: ActionPlanType): Promise<ConnectionPlan[]> {
    const { data, error } = await supabase
      .from('connection_plans')
      .select('*')
      .eq('is_active', true)
      .eq('plan_type', planType)
      .order('name', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch action plans: ${error.message}`);
    }

    return data || [];
  },

  async getById(id: string): Promise<ConnectionPlan | null> {
    const { data, error } = await supabase
      .from('connection_plans')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch action plan: ${error.message}`);
    }

    return data;
  }
};
