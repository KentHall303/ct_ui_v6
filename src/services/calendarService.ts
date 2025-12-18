import { supabase } from '../lib/supabase';

export interface Calendar {
  id: string;
  name: string;
  color: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  calendar_id: string | null;
  event_type: 'quote' | 'installation' | 'inspection' | 'follow_up';
  status: 'pending' | 'active' | 'completed' | 'overdue';
  start_date: string;
  end_date: string;
  is_all_day: boolean;
  location: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  amount: number | null;
  quote_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CalendarEventWithCalendar extends CalendarEvent {
  calendar?: Calendar;
}

export async function fetchCalendars(): Promise<Calendar[]> {
  const { data, error } = await supabase
    .from('calendars')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching calendars:', error);
    return [];
  }

  return data || [];
}

export async function fetchCalendarEventsWithCalendar(
  startDate: Date,
  endDate: Date,
  selectedCalendarIds?: string[]
): Promise<CalendarEventWithCalendar[]> {
  let query = supabase
    .from('calendar_events')
    .select(`
      *,
      calendar:calendars(*)
    `)
    .lte('start_date', endDate.toISOString())
    .gte('end_date', startDate.toISOString())
    .order('start_date');

  if (selectedCalendarIds && selectedCalendarIds.length > 0) {
    query = query.in('calendar_id', selectedCalendarIds);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }

  return (data || []).map((event: any) => ({
    ...event,
    calendar: event.calendar || undefined
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
): Promise<CalendarEventWithCalendar[]> {
  const { data, error } = await supabase
    .from('calendar_events')
    .select(`
      *,
      calendar:calendars(*)
    `)
    .or(`title.ilike.%${searchTerm}%,contact_name.ilike.%${searchTerm}%,quote_number.ilike.%${searchTerm}%`)
    .order('start_date');

  if (error) {
    console.error('Error searching calendar events:', error);
    return [];
  }

  return (data || []).map((event: any) => ({
    ...event,
    calendar: event.calendar || undefined
  }));
}
