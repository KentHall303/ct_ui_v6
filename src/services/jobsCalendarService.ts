import { supabase } from '../lib/supabase';

export interface JobsCalendar {
  id: string;
  contact_id: string;
  name: string;
  color: string;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobsCalendarWithContact extends JobsCalendar {
  contact_category: string;
  is_user_based?: boolean;
}

export interface JobsCalendarEvent {
  id: string;
  jobs_calendar_id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  status: string;
  quote_id: string | null;
  contact_name: string | null;
  amount: number | null;
  created_at: string;
  updated_at: string;
}

export interface JobsCalendarEventWithCalendar extends JobsCalendarEvent {
  calendar: JobsCalendar | null;
}

export interface ContactsByCategory {
  estimators: JobsCalendarWithContact[];
  fieldManagers: JobsCalendarWithContact[];
  subcontractors: JobsCalendarWithContact[];
}

export async function fetchJobsCalendarsGroupedByCategory(): Promise<ContactsByCategory> {
  const [calendarsResult, usersResult] = await Promise.all([
    supabase
      .from('jobs_calendars')
      .select(`
        *,
        contacts!contact_id (
          contact_category
        )
      `)
      .order('name', { ascending: true }),
    supabase
      .from('users')
      .select('*')
      .eq('user_type', 'subcontractor')
      .eq('is_active', true)
      .order('first_name', { ascending: true })
  ]);

  if (calendarsResult.error) {
    console.error('Error fetching jobs calendars:', calendarsResult.error);
    return { estimators: [], fieldManagers: [], subcontractors: [] };
  }

  const calendars = (calendarsResult.data || []).map((item: any) => ({
    ...item,
    contact_category: item.contacts?.contact_category || 'Estimator',
    contacts: undefined
  })) as JobsCalendarWithContact[];

  const subcontractorUsers = (usersResult.data || []).map((user: any) => ({
    id: `user_${user.id}`,
    contact_id: user.id,
    name: `${user.first_name} ${user.last_name}`,
    color: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
    is_visible: true,
    created_at: user.created_at,
    updated_at: user.updated_at,
    contact_category: 'Subcontractor',
    is_user_based: true
  })) as JobsCalendarWithContact[];

  const existingSubcontractors = calendars.filter(c => c.contact_category === 'Subcontractor');
  const allSubcontractors = [...existingSubcontractors, ...subcontractorUsers];

  return {
    estimators: calendars.filter(c => c.contact_category === 'Estimator'),
    fieldManagers: calendars.filter(c => c.contact_category === 'Field Manager'),
    subcontractors: allSubcontractors
  };
}

export async function fetchAllJobsCalendars(): Promise<JobsCalendarWithContact[]> {
  const [calendarsResult, usersResult] = await Promise.all([
    supabase
      .from('jobs_calendars')
      .select(`
        *,
        contacts!contact_id (
          contact_category
        )
      `)
      .order('name', { ascending: true }),
    supabase
      .from('users')
      .select('*')
      .eq('user_type', 'subcontractor')
      .eq('is_active', true)
      .order('first_name', { ascending: true })
  ]);

  if (calendarsResult.error) {
    console.error('Error fetching jobs calendars:', calendarsResult.error);
    return [];
  }

  const calendars = (calendarsResult.data || []).map((item: any) => ({
    ...item,
    contact_category: item.contacts?.contact_category || 'Estimator',
    contacts: undefined
  })) as JobsCalendarWithContact[];

  const subcontractorUsers = (usersResult.data || []).map((user: any) => ({
    id: `user_${user.id}`,
    contact_id: user.id,
    name: `${user.first_name} ${user.last_name}`,
    color: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
    is_visible: true,
    created_at: user.created_at,
    updated_at: user.updated_at,
    contact_category: 'Subcontractor',
    is_user_based: true
  })) as JobsCalendarWithContact[];

  return [...calendars, ...subcontractorUsers].sort((a, b) => a.name.localeCompare(b.name));
}

export async function fetchJobsCalendars(): Promise<JobsCalendar[]> {
  const { data, error } = await supabase
    .from('jobs_calendars')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching jobs calendars:', error);
    return [];
  }

  return data || [];
}

export async function updateJobsCalendarVisibility(calendarId: string, isVisible: boolean): Promise<void> {
  const { error } = await supabase
    .from('jobs_calendars')
    .update({ is_visible: isVisible, updated_at: new Date().toISOString() })
    .eq('id', calendarId);

  if (error) {
    console.error('Error updating jobs calendar visibility:', error);
    throw error;
  }
}

export async function fetchJobsCalendarEvents(
  startDate?: Date,
  endDate?: Date,
  visibleCalendarIds?: string[]
): Promise<JobsCalendarEventWithCalendar[]> {
  let query = supabase
    .from('jobs_calendar_events')
    .select(`
      *,
      jobs_calendars!jobs_calendar_id (
        id,
        contact_id,
        name,
        color,
        is_visible,
        created_at,
        updated_at
      )
    `);

  if (startDate) {
    query = query.gte('start_date', startDate.toISOString());
  }

  if (endDate) {
    query = query.lte('end_date', endDate.toISOString());
  }

  if (visibleCalendarIds && visibleCalendarIds.length > 0) {
    query = query.in('jobs_calendar_id', visibleCalendarIds);
  }

  query = query.order('start_date', { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching jobs calendar events:', error);
    return [];
  }

  return (data || []).map((item: any) => ({
    ...item,
    calendar: item.jobs_calendars,
    jobs_calendars: undefined
  })) as JobsCalendarEventWithCalendar[];
}

export async function createJobsCalendarEvent(
  event: Omit<JobsCalendarEvent, 'id' | 'created_at' | 'updated_at'>
): Promise<JobsCalendarEvent | null> {
  const { data, error } = await supabase
    .from('jobs_calendar_events')
    .insert(event)
    .select()
    .single();

  if (error) {
    console.error('Error creating jobs calendar event:', error);
    return null;
  }

  return data;
}

export async function updateJobsCalendarEvent(
  eventId: string,
  updates: Partial<JobsCalendarEvent>
): Promise<JobsCalendarEvent | null> {
  const { data, error } = await supabase
    .from('jobs_calendar_events')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', eventId)
    .select()
    .single();

  if (error) {
    console.error('Error updating jobs calendar event:', error);
    return null;
  }

  return data;
}

export async function deleteJobsCalendarEvent(eventId: string): Promise<boolean> {
  const { error } = await supabase
    .from('jobs_calendar_events')
    .delete()
    .eq('id', eventId);

  if (error) {
    console.error('Error deleting jobs calendar event:', error);
    return false;
  }

  return true;
}
