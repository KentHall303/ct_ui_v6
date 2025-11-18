import { supabase } from '../lib/supabase';

export interface Estimator {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  is_active: boolean;
  color: string;
  hourly_rate: number;
  skills: string[];
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

export interface EstimatorFilters {
  minRate?: number;
  maxRate?: number;
  skills?: string[];
}

export async function fetchEstimators(filters?: EstimatorFilters): Promise<Estimator[]> {
  let query = supabase
    .from('estimators')
    .select('*')
    .eq('is_active', true);

  if (filters?.minRate !== undefined) {
    query = query.gte('hourly_rate', filters.minRate);
  }

  if (filters?.maxRate !== undefined) {
    query = query.lte('hourly_rate', filters.maxRate);
  }

  if (filters?.skills && filters.skills.length > 0) {
    query = query.overlaps('skills', filters.skills);
  }

  query = query.order('name');

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching estimators:', error);
    return [];
  }

  return data || [];
}

export async function getAllSkills(): Promise<string[]> {
  const { data, error } = await supabase
    .from('estimators')
    .select('skills')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }

  const allSkills = new Set<string>();
  data?.forEach((estimator: any) => {
    estimator.skills?.forEach((skill: string) => allSkills.add(skill));
  });

  return Array.from(allSkills).sort();
}

export async function fetchCalendarEvents(
  startDate: Date,
  endDate: Date,
  subcontractorNames?: string[]
): Promise<CalendarEventWithEstimator[]> {
  // Fetch meetings with their associated subcontractors
  const { data: meetings, error: meetingsError } = await supabase
    .from('meetings')
    .select(`
      *,
      meeting_subcontractors (
        subcontractor:subcontractors (*)
      )
    `)
    .lte('start_date', endDate.toISOString())
    .gte('end_date', startDate.toISOString())
    .order('start_date');

  if (meetingsError) {
    console.error('Error fetching meetings:', meetingsError);
    return [];
  }

  console.log('Fetched meetings:', meetings?.length, 'meetings');
  console.log('Filter by subcontractors:', subcontractorNames);

  // Transform meetings to match CalendarEventWithEstimator structure
  const events = (meetings || [])
    .filter((meeting: any) => {
      // If specific subcontractor names are requested, filter by them
      if (!subcontractorNames || subcontractorNames.length === 0) return true;

      const meetingSubs = meeting.meeting_subcontractors || [];
      return meetingSubs.some((ms: any) =>
        subcontractorNames.includes(ms.subcontractor?.name)
      );
    })
    .flatMap((meeting: any) => {
      const meetingSubs = meeting.meeting_subcontractors || [];

      // If no subcontractors assigned, return the meeting once without estimator
      if (meetingSubs.length === 0) {
        return [{
          id: meeting.id,
          title: meeting.title,
          description: meeting.description,
          event_type: meeting.meeting_type,
          status: meeting.status,
          start_date: meeting.start_date,
          end_date: meeting.end_date,
          is_all_day: false,
          location: meeting.location,
          estimator_id: null,
          contact_name: null,
          contact_email: null,
          contact_phone: null,
          amount: null,
          quote_number: null,
          notes: meeting.notes,
          created_at: meeting.created_at,
          updated_at: meeting.updated_at,
          estimator: undefined
        }];
      }

      // Return one event per subcontractor assigned to the meeting
      return meetingSubs.map((ms: any) => ({
        id: meeting.id,
        title: meeting.title,
        description: meeting.description,
        event_type: meeting.meeting_type,
        status: meeting.status,
        start_date: meeting.start_date,
        end_date: meeting.end_date,
        is_all_day: false,
        location: meeting.location,
        estimator_id: ms.subcontractor?.id,
        contact_name: null,
        contact_email: null,
        contact_phone: null,
        amount: null,
        quote_number: meeting.title,
        notes: meeting.notes,
        created_at: meeting.created_at,
        updated_at: meeting.updated_at,
        estimator: ms.subcontractor ? {
          id: ms.subcontractor.id,
          name: ms.subcontractor.name,
          email: ms.subcontractor.email,
          phone: ms.subcontractor.phone,
          is_active: ms.subcontractor.is_active,
          color: '#3b82f6',
          hourly_rate: 0,
          skills: [ms.subcontractor.specialty].filter(Boolean),
          created_at: ms.subcontractor.created_at,
          updated_at: ms.subcontractor.updated_at
        } : undefined
      }));
    });

  console.log('Transformed events:', events.length, 'events');
  console.log('Sample event:', events[0]);

  return events;
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
