import { supabase } from '../lib/supabase';

export interface Estimator {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  is_active: boolean;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  event_type: 'quote' | 'installation' | 'inspection' | 'follow_up';
  status: 'pending' | 'active' | 'completed' | 'overdue';
  start_date: string;
  end_date: string;
  is_all_day: boolean;
  location: string | null;
  estimator_id: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  amount: number | null;
  quote_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CalendarEventWithEstimator extends CalendarEvent {
  estimator?: Estimator;
}

export async function fetchEstimators(): Promise<Estimator[]> {
  const { data, error } = await supabase
    .from('estimators')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching estimators:', error);
    return [];
  }

  return data || [];
}

export async function fetchCalendarEvents(
  startDate: Date,
  endDate: Date,
  estimatorIds?: string[]
): Promise<CalendarEventWithEstimator[]> {
  let query = supabase
    .from('calendar_events')
    .select(`
      *,
      estimator:estimators(*)
    `)
    .gte('start_date', startDate.toISOString())
    .lte('start_date', endDate.toISOString())
    .order('start_date');

  if (estimatorIds && estimatorIds.length > 0) {
    query = query.in('estimator_id', estimatorIds);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }

  return (data || []).map((event: any) => ({
    ...event,
    estimator: event.estimator || undefined
  }));
}

export async function createCalendarEvent(
  event: Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at'>
): Promise<CalendarEvent | null> {
  const { data, error } = await supabase
    .from('calendar_events')
    .insert(event)
    .select()
    .single();

  if (error) {
    console.error('Error creating calendar event:', error);
    return null;
  }

  return data;
}

export async function updateCalendarEvent(
  id: string,
  updates: Partial<Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at'>>
): Promise<CalendarEvent | null> {
  const { data, error } = await supabase
    .from('calendar_events')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating calendar event:', error);
    return null;
  }

  return data;
}

export async function deleteCalendarEvent(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('calendar_events')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting calendar event:', error);
    return false;
  }

  return true;
}

export async function searchCalendarEvents(
  searchTerm: string
): Promise<CalendarEventWithEstimator[]> {
  const { data, error } = await supabase
    .from('calendar_events')
    .select(`
      *,
      estimator:estimators(*)
    `)
    .or(`title.ilike.%${searchTerm}%,contact_name.ilike.%${searchTerm}%,quote_number.ilike.%${searchTerm}%`)
    .order('start_date');

  if (error) {
    console.error('Error searching calendar events:', error);
    return [];
  }

  return (data || []).map((event: any) => ({
    ...event,
    estimator: event.estimator || undefined
  }));
}
