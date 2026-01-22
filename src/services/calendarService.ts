import { supabase } from '../lib/supabase';

export interface Calendar {
  id: string;
  name: string;
  color: string;
  is_active: boolean;
  contact_id: string;
  created_at: string;
  updated_at: string;
}

export interface Estimator {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  is_active: boolean;
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
  estimator_id: string | null;
  user_id: string | null;
  contact_id: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
}

export interface CalendarEventWithCalendar extends CalendarEvent {
  calendar?: Calendar;
  estimator?: Estimator;
}

export async function fetchCalendars(): Promise<Calendar[]> {
  const { data, error } = await supabase
    .from('calendars')
    .select(`
      *,
      contact:contacts!contact_id(id, name)
    `)
    .eq('is_active', true)
    .not('contact_id', 'is', null)
    .order('name');

  if (error) {
    console.error('Error fetching calendars:', error);
    return [];
  }

  return (data || []).map((calendar: any) => ({
    id: calendar.id,
    name: calendar.contact?.name || calendar.name,
    color: calendar.color,
    is_active: calendar.is_active,
    contact_id: calendar.contact_id,
    created_at: calendar.created_at,
    updated_at: calendar.updated_at
  }));
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
      calendar:calendars(*),
      estimator:users!user_id(id, first_name, last_name, email, phone, is_active)
    `)
    .lte('start_date', endDate.toISOString())
    .gte('end_date', startDate.toISOString())
    .order('start_date');

  if (selectedCalendarIds && selectedCalendarIds.length > 0) {
    const calendarIdsFilter = selectedCalendarIds.map(id => `calendar_id.eq.${id}`).join(',');
    query = query.or(`calendar_id.is.null,${calendarIdsFilter}`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }

  return (data || []).map((event: any) => ({
    ...event,
    calendar: event.calendar || undefined,
    estimator: event.estimator ? {
      ...event.estimator,
      name: `${event.estimator.first_name} ${event.estimator.last_name}`
    } : undefined
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

const COLOR_PALETTE = [
  '#198754', '#0d6efd', '#6610f2', '#fd7e14', '#0dcaf0',
  '#20c997', '#ffc107', '#d63384', '#dc3545', '#6c757d',
  '#17a2b8', '#28a745', '#e83e8c', '#6f42c1', '#ff6b6b',
  '#4ecdc4', '#95e1d3', '#f38181'
];

function getRandomColor(): string {
  return COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
}

export async function createCalendarForContact(
  contactId: string,
  contactName: string
): Promise<Calendar | null> {
  const { data, error } = await supabase
    .from('calendars')
    .insert({
      name: contactName,
      color: getRandomColor(),
      is_active: true,
      contact_id: contactId
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating calendar for contact:', error);
    return null;
  }

  return data;
}

export async function updateCalendarName(
  contactId: string,
  newName: string
): Promise<Calendar | null> {
  const { data, error } = await supabase
    .from('calendars')
    .update({ name: newName, updated_at: new Date().toISOString() })
    .eq('contact_id', contactId)
    .select()
    .single();

  if (error) {
    console.error('Error updating calendar name:', error);
    return null;
  }

  return data;
}

export async function deleteCalendarForContact(contactId: string): Promise<boolean> {
  const { error } = await supabase
    .from('calendars')
    .delete()
    .eq('contact_id', contactId);

  if (error) {
    console.error('Error deleting calendar for contact:', error);
    return false;
  }

  return true;
}

export async function fetchEstimators(): Promise<Estimator[]> {
  const { data, error } = await supabase
    .from('users')
    .select('id, first_name, last_name, email, phone, is_active')
    .eq('user_type', 'subcontractor')
    .eq('is_active', true)
    .order('first_name');

  if (error) {
    console.error('Error fetching estimators:', error);
    return [];
  }

  return (data || []).map(user => ({
    ...user,
    name: `${user.first_name} ${user.last_name}`
  }));
}

export async function fetchCalendarEventsForDispatching(
  date: Date
): Promise<CalendarEventWithCalendar[]> {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from('calendar_events')
    .select(`
      *,
      calendar:calendars(*),
      estimator:users!user_id(id, first_name, last_name, email, phone, is_active)
    `)
    .gte('start_date', startOfDay.toISOString())
    .lte('start_date', endOfDay.toISOString())
    .order('start_date');

  if (error) {
    console.error('Error fetching calendar events for dispatching:', error);
    return [];
  }

  return (data || []).map((event: any) => ({
    ...event,
    calendar: event.calendar || undefined,
    estimator: event.estimator ? {
      ...event.estimator,
      name: `${event.estimator.first_name} ${event.estimator.last_name}`
    } : undefined
  }));
}
