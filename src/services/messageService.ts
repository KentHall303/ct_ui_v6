import { supabase } from '../lib/supabase';

export interface Message {
  id: string;
  contact_id?: string;
  type: 'text' | 'call' | 'email' | 'thumbtack';
  direction: 'inbound' | 'outbound';
  subject: string;
  body: string;
  preview_text: string;
  sender_name: string;
  sender_email: string;
  sender_phone: string;
  company_name?: string;
  opportunity_name?: string;
  contact_type?: 'candidates' | 'resale_candidates' | 'additional_locations' | 'acquisitions' | 'other';
  lead_status?: 'new' | 'contacted' | 'qualified' | 'lost' | 'converted';
  is_read: boolean;
  is_starred: boolean;
  timestamp: string;
  attachments: any[];
  metadata: any;
  created_at: string;
  user_id: string;
}

export interface MessageCounts {
  text: number;
  call: number;
  email: number;
  thumbtack: number;
  total: number;
}

export interface MessageFilters {
  type?: string;
  userAssigned?: string;
  state?: string;
  actionPlan?: string;
}

export const messageService = {
  async getMessages(type?: string, filters?: MessageFilters): Promise<Message[]> {
    const hasContactFilters = filters?.userAssigned || filters?.state;

    if (hasContactFilters) {
      const { data: contactIds, error: contactError } = await supabase
        .from('contacts')
        .select('id')
        .match({
          ...(filters?.userAssigned && { assigned_user: filters.userAssigned }),
          ...(filters?.state && { state: filters.state }),
        });

      if (contactError) {
        console.error('Error fetching contacts for filter:', contactError);
        throw contactError;
      }

      const validContactIds = contactIds?.map(c => c.id) || [];

      if (validContactIds.length === 0) {
        return [];
      }

      let query = supabase
        .from('messages')
        .select('*')
        .in('contact_id', validContactIds)
        .order('timestamp', { ascending: false });

      if (type && type !== 'all') {
        query = query.eq('type', type);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching messages:', error);
        throw error;
      }

      return data || [];
    }

    let query = supabase
      .from('messages')
      .select('*')
      .order('timestamp', { ascending: false });

    if (type && type !== 'all') {
      query = query.eq('type', type);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }

    return data || [];
  },

  async getUnreadCounts(): Promise<MessageCounts> {
    const { data, error } = await supabase
      .from('messages')
      .select('type, is_read')
      .eq('is_read', false);

    if (error) {
      console.error('Error fetching unread counts:', error);
      return { text: 0, call: 0, email: 0, thumbtack: 0, total: 0 };
    }

    const counts = {
      text: 0,
      call: 0,
      email: 0,
      thumbtack: 0,
      total: data?.length || 0
    };

    data?.forEach(msg => {
      if (msg.type in counts) {
        counts[msg.type as keyof Omit<MessageCounts, 'total'>]++;
      }
    });

    return counts;
  },

  async markAsRead(messageId: string): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('id', messageId);

    if (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  },

  async toggleStar(messageId: string, isStarred: boolean): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .update({ is_starred: isStarred })
      .eq('id', messageId);

    if (error) {
      console.error('Error toggling star:', error);
      throw error;
    }
  },

  async deleteMessage(messageId: string): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId);

    if (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }
};
