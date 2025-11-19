import { supabase, TokenCategory, Token, TokenCategoryWithTokens } from '../lib/supabase';

class TokenService {
  async getAllCategoriesWithTokens(): Promise<TokenCategoryWithTokens[]> {
    const { data: categories, error: categoriesError } = await supabase
      .from('token_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (categoriesError) {
      throw new Error(`Failed to fetch categories: ${categoriesError.message}`);
    }

    const { data: tokens, error: tokensError } = await supabase
      .from('tokens')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (tokensError) {
      throw new Error(`Failed to fetch tokens: ${tokensError.message}`);
    }

    const categoriesWithTokens: TokenCategoryWithTokens[] = (categories || []).map(category => ({
      ...category,
      tokens: (tokens || []).filter(token => token.category_id === category.id)
    }));

    return categoriesWithTokens;
  }

  async getCategories(): Promise<TokenCategory[]> {
    const { data, error } = await supabase
      .from('token_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    return data || [];
  }

  async getTokensByCategory(categoryId: string): Promise<Token[]> {
    const { data, error } = await supabase
      .from('tokens')
      .select('*')
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch tokens: ${error.message}`);
    }

    return data || [];
  }

  async createCategory(category: Partial<TokenCategory>): Promise<TokenCategory> {
    const { data, error } = await supabase
      .from('token_categories')
      .insert({
        name: category.name,
        display_order: category.display_order || 0,
        is_active: category.is_active !== undefined ? category.is_active : true
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }

    return data;
  }

  async updateCategory(id: string, category: Partial<TokenCategory>): Promise<TokenCategory> {
    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (category.name !== undefined) updateData.name = category.name;
    if (category.display_order !== undefined) updateData.display_order = category.display_order;
    if (category.is_active !== undefined) updateData.is_active = category.is_active;

    const { data, error } = await supabase
      .from('token_categories')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }

    return data;
  }

  async deleteCategory(id: string): Promise<void> {
    const { error } = await supabase
      .from('token_categories')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }

  async createToken(token: Partial<Token>): Promise<Token> {
    const { data, error } = await supabase
      .from('tokens')
      .insert({
        category_id: token.category_id,
        token_value: token.token_value,
        display_order: token.display_order || 0,
        is_active: token.is_active !== undefined ? token.is_active : true
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create token: ${error.message}`);
    }

    return data;
  }

  async updateToken(id: string, token: Partial<Token>): Promise<Token> {
    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (token.token_value !== undefined) updateData.token_value = token.token_value;
    if (token.display_order !== undefined) updateData.display_order = token.display_order;
    if (token.is_active !== undefined) updateData.is_active = token.is_active;
    if (token.category_id !== undefined) updateData.category_id = token.category_id;

    const { data, error } = await supabase
      .from('tokens')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update token: ${error.message}`);
    }

    return data;
  }

  async deleteToken(id: string): Promise<void> {
    const { error } = await supabase
      .from('tokens')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete token: ${error.message}`);
    }
  }

  async reorderCategories(categoryIds: string[]): Promise<void> {
    const updates = categoryIds.map((id, index) =>
      supabase
        .from('token_categories')
        .update({ display_order: index + 1, updated_at: new Date().toISOString() })
        .eq('id', id)
    );

    await Promise.all(updates);
  }

  async reorderTokens(tokenIds: string[]): Promise<void> {
    const updates = tokenIds.map((id, index) =>
      supabase
        .from('tokens')
        .update({ display_order: index + 1, updated_at: new Date().toISOString() })
        .eq('id', id)
    );

    await Promise.all(updates);
  }
}

export const tokenService = new TokenService();
