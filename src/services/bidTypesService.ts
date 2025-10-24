import { supabase } from '../lib/supabase';

export interface BidType {
  id: string;
  name: string;
  description?: string;
  package_template_id?: string;
  is_archived: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface BidCategory {
  id: string;
  bid_type_id: string;
  name: string;
  description?: string;
  sort_order: number;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface BidLineItem {
  id: string;
  bid_category_id: string;
  line_item_type: string;
  name: string;
  description?: string;
  show_on_worksheet: boolean;
  show_on_workorder: boolean;
  sort_order: number;
  is_archived: boolean;
  retail_formula?: string;
  material_retail_formula?: string;
  material_cogs_formula?: string;
  labor_retail_formula?: string;
  labor_cogs_formula?: string;
  created_at: string;
  updated_at: string;
}

export interface BidLineItemField {
  id: string;
  bid_line_item_id: string;
  field_name: string;
  field_type: 'text' | 'number' | 'select' | 'checkbox' | 'textarea';
  default_value?: string;
  field_size: 'small' | 'medium' | 'large';
  is_hidden: boolean;
  is_required: boolean;
  is_taxed: boolean;
  sort_order: number;
  retail_formula?: string;
  sub_rate_formula?: string;
  created_at: string;
  updated_at: string;
}

export interface BidTypeWithDetails extends BidType {
  categories: BidCategoryWithDetails[];
}

export interface BidCategoryWithDetails extends BidCategory {
  line_items: BidLineItemWithFields[];
}

export interface BidLineItemWithFields extends BidLineItem {
  fields: BidLineItemField[];
}

export const bidTypesService = {
  async getAllBidTypes(includeArchived: boolean = false): Promise<BidTypeWithDetails[]> {
    let query = supabase
      .from('bid_types')
      .select(`
        *,
        categories:bid_categories(
          *,
          line_items:bid_line_items(
            *,
            fields:bid_line_item_fields(*)
          )
        )
      `)
      .order('sort_order', { ascending: true });

    if (!includeArchived) {
      query = query.eq('is_archived', false);
    }

    const { data, error } = await query;

    if (error) throw error;
    return (data as any[]).map(bt => ({
      ...bt,
      categories: (bt.categories || [])
        .filter((c: any) => includeArchived || !c.is_archived)
        .sort((a: any, b: any) => a.sort_order - b.sort_order)
        .map((c: any) => ({
          ...c,
          line_items: (c.line_items || [])
            .filter((li: any) => includeArchived || !li.is_archived)
            .sort((a: any, b: any) => a.sort_order - b.sort_order)
            .map((li: any) => ({
              ...li,
              fields: (li.fields || []).sort((a: any, b: any) => a.sort_order - b.sort_order)
            }))
        }))
    }));
  },

  async getBidType(id: string): Promise<BidTypeWithDetails | null> {
    const { data, error } = await supabase
      .from('bid_types')
      .select(`
        *,
        categories:bid_categories(
          *,
          line_items:bid_line_items(
            *,
            fields:bid_line_item_fields(*)
          )
        )
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      categories: (data.categories || [])
        .sort((a: any, b: any) => a.sort_order - b.sort_order)
        .map((c: any) => ({
          ...c,
          line_items: (c.line_items || [])
            .sort((a: any, b: any) => a.sort_order - b.sort_order)
            .map((li: any) => ({
              ...li,
              fields: (li.fields || []).sort((a: any, b: any) => a.sort_order - b.sort_order)
            }))
        }))
    } as BidTypeWithDetails;
  },

  async createBidType(bidType: Partial<BidType>): Promise<BidType> {
    const maxOrder = await this.getMaxSortOrder('bid_types');

    const { data, error } = await supabase
      .from('bid_types')
      .insert({
        name: bidType.name || 'New Bid Type',
        description: bidType.description,
        package_template_id: bidType.package_template_id,
        sort_order: maxOrder + 1,
        is_archived: false
      })
      .select()
      .single();

    if (error) throw error;
    return data as BidType;
  },

  async updateBidType(id: string, updates: Partial<BidType>): Promise<BidType> {
    const { data, error } = await supabase
      .from('bid_types')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as BidType;
  },

  async deleteBidType(id: string): Promise<void> {
    const { error } = await supabase
      .from('bid_types')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async archiveBidType(id: string, archived: boolean = true): Promise<BidType> {
    return this.updateBidType(id, { is_archived: archived });
  },

  async duplicateBidType(id: string): Promise<BidType> {
    const original = await this.getBidType(id);
    if (!original) throw new Error('Bid type not found');

    const newBidType = await this.createBidType({
      name: `${original.name} (Copy)`,
      description: original.description,
      package_template_id: original.package_template_id
    });

    for (const category of original.categories) {
      const newCategory = await this.createBidCategory({
        bid_type_id: newBidType.id,
        name: category.name,
        description: category.description
      });

      for (const lineItem of category.line_items) {
        const newLineItem = await this.createBidLineItem({
          bid_category_id: newCategory.id,
          line_item_type: lineItem.line_item_type,
          name: lineItem.name,
          description: lineItem.description,
          show_on_worksheet: lineItem.show_on_worksheet,
          show_on_workorder: lineItem.show_on_workorder
        });

        for (const field of lineItem.fields) {
          await this.createBidLineItemField({
            bid_line_item_id: newLineItem.id,
            field_name: field.field_name,
            field_type: field.field_type,
            default_value: field.default_value,
            field_size: field.field_size,
            is_hidden: field.is_hidden,
            is_required: field.is_required,
            is_taxed: field.is_taxed,
            retail_formula: field.retail_formula,
            sub_rate_formula: field.sub_rate_formula
          });
        }
      }
    }

    return newBidType;
  },

  async createBidCategory(category: Partial<BidCategory>): Promise<BidCategory> {
    if (!category.bid_type_id) throw new Error('bid_type_id is required');

    const maxOrder = await this.getMaxSortOrder('bid_categories', 'bid_type_id', category.bid_type_id);

    const { data, error } = await supabase
      .from('bid_categories')
      .insert({
        bid_type_id: category.bid_type_id,
        name: category.name || 'New Category',
        description: category.description,
        sort_order: maxOrder + 1,
        is_archived: false
      })
      .select()
      .single();

    if (error) throw error;
    return data as BidCategory;
  },

  async updateBidCategory(id: string, updates: Partial<BidCategory>): Promise<BidCategory> {
    const { data, error } = await supabase
      .from('bid_categories')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as BidCategory;
  },

  async deleteBidCategory(id: string): Promise<void> {
    const { error } = await supabase
      .from('bid_categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async createBidLineItem(lineItem: Partial<BidLineItem>): Promise<BidLineItem> {
    if (!lineItem.bid_category_id) throw new Error('bid_category_id is required');

    const maxOrder = await this.getMaxSortOrder('bid_line_items', 'bid_category_id', lineItem.bid_category_id);

    const { data, error } = await supabase
      .from('bid_line_items')
      .insert({
        bid_category_id: lineItem.bid_category_id,
        line_item_type: lineItem.line_item_type || 'standard',
        name: lineItem.name || 'New Line Item',
        description: lineItem.description,
        show_on_worksheet: lineItem.show_on_worksheet || false,
        show_on_workorder: lineItem.show_on_workorder || false,
        sort_order: maxOrder + 1,
        is_archived: false
      })
      .select()
      .single();

    if (error) throw error;
    return data as BidLineItem;
  },

  async updateBidLineItem(id: string, updates: Partial<BidLineItem>): Promise<BidLineItem> {
    const { data, error } = await supabase
      .from('bid_line_items')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as BidLineItem;
  },

  async deleteBidLineItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('bid_line_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async createBidLineItemField(field: Partial<BidLineItemField>): Promise<BidLineItemField> {
    if (!field.bid_line_item_id) throw new Error('bid_line_item_id is required');

    const maxOrder = await this.getMaxSortOrder('bid_line_item_fields', 'bid_line_item_id', field.bid_line_item_id);

    const { data, error } = await supabase
      .from('bid_line_item_fields')
      .insert({
        bid_line_item_id: field.bid_line_item_id,
        field_name: field.field_name || 'New Field',
        field_type: field.field_type || 'text',
        default_value: field.default_value,
        field_size: field.field_size || 'medium',
        is_hidden: field.is_hidden || false,
        is_required: field.is_required || false,
        is_taxed: field.is_taxed || false,
        sort_order: maxOrder + 1,
        retail_formula: field.retail_formula,
        sub_rate_formula: field.sub_rate_formula
      })
      .select()
      .single();

    if (error) throw error;
    return data as BidLineItemField;
  },

  async updateBidLineItemField(id: string, updates: Partial<BidLineItemField>): Promise<BidLineItemField> {
    const { data, error } = await supabase
      .from('bid_line_item_fields')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as BidLineItemField;
  },

  async deleteBidLineItemField(id: string): Promise<void> {
    const { error } = await supabase
      .from('bid_line_item_fields')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async updateSortOrders(table: string, items: Array<{ id: string; sort_order: number }>): Promise<void> {
    for (const item of items) {
      await supabase
        .from(table)
        .update({ sort_order: item.sort_order, updated_at: new Date().toISOString() })
        .eq('id', item.id);
    }
  },

  async reorderBidTypes(items: Array<{ id: string; sort_order: number }>): Promise<void> {
    return this.updateSortOrders('bid_types', items);
  },

  async reorderCategories(items: Array<{ id: string; sort_order: number }>): Promise<void> {
    return this.updateSortOrders('bid_categories', items);
  },

  async reorderLineItems(items: Array<{ id: string; sort_order: number }>): Promise<void> {
    return this.updateSortOrders('bid_line_items', items);
  },

  async getMaxSortOrder(table: string, filterColumn?: string, filterValue?: string): Promise<number> {
    let query = supabase
      .from(table)
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1);

    if (filterColumn && filterValue) {
      query = query.eq(filterColumn, filterValue);
    }

    const { data } = await query;
    return data && data.length > 0 ? data[0].sort_order : 0;
  }
};
