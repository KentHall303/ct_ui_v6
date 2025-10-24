import { supabase, Meeting, MeetingSubcontractor, Subcontractor, MeetingWithSubcontractors } from '../lib/supabase';

export const meetingService = {
  async getAllSubcontractors(): Promise<Subcontractor[]> {
    const { data, error } = await supabase
      .from('subcontractors')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async getMeetingsByJobId(jobId: string): Promise<MeetingWithSubcontractors[]> {
    const { data: meetings, error: meetingsError } = await supabase
      .from('meetings')
      .select('*')
      .eq('job_id', jobId)
      .order('start_date');

    if (meetingsError) throw meetingsError;

    if (!meetings || meetings.length === 0) return [];

    const meetingsWithSubs = await Promise.all(
      meetings.map(async (meeting) => {
        const { data: meetingSubs, error: subsError } = await supabase
          .from('meeting_subcontractors')
          .select(`
            is_primary,
            notes,
            subcontractors (*)
          `)
          .eq('meeting_id', meeting.id);

        if (subsError) throw subsError;

        const subcontractors = (meetingSubs || []).map((ms: any) => ({
          ...ms.subcontractors,
          is_primary: ms.is_primary,
          notes: ms.notes
        }));

        return {
          ...meeting,
          subcontractors
        } as MeetingWithSubcontractors;
      })
    );

    return meetingsWithSubs;
  },

  async createMeeting(
    jobId: string,
    meetingData: {
      title: string;
      description?: string;
      meeting_type: string;
      start_date: string;
      end_date: string;
      location?: string;
      status?: string;
      notes?: string;
    },
    subcontractorIds: Array<{ id: string; is_primary: boolean }>
  ): Promise<MeetingWithSubcontractors> {
    const { data: meeting, error: meetingError } = await supabase
      .from('meetings')
      .insert({
        job_id: jobId,
        ...meetingData
      })
      .select()
      .single();

    if (meetingError) throw meetingError;

    if (subcontractorIds.length > 0) {
      const meetingSubcontractors = subcontractorIds.map(sub => ({
        meeting_id: meeting.id,
        subcontractor_id: sub.id,
        is_primary: sub.is_primary
      }));

      const { error: subsError } = await supabase
        .from('meeting_subcontractors')
        .insert(meetingSubcontractors);

      if (subsError) throw subsError;
    }

    const { data: meetingSubs } = await supabase
      .from('meeting_subcontractors')
      .select(`
        is_primary,
        notes,
        subcontractors (*)
      `)
      .eq('meeting_id', meeting.id);

    const subcontractors = (meetingSubs || []).map((ms: any) => ({
      ...ms.subcontractors,
      is_primary: ms.is_primary,
      notes: ms.notes
    }));

    return {
      ...meeting,
      subcontractors
    } as MeetingWithSubcontractors;
  },

  async updateMeeting(
    meetingId: string,
    meetingData: Partial<Meeting>,
    subcontractorIds?: Array<{ id: string; is_primary: boolean }>
  ): Promise<MeetingWithSubcontractors> {
    const { data: meeting, error: meetingError } = await supabase
      .from('meetings')
      .update(meetingData)
      .eq('id', meetingId)
      .select()
      .single();

    if (meetingError) throw meetingError;

    if (subcontractorIds !== undefined) {
      await supabase
        .from('meeting_subcontractors')
        .delete()
        .eq('meeting_id', meetingId);

      if (subcontractorIds.length > 0) {
        const meetingSubcontractors = subcontractorIds.map(sub => ({
          meeting_id: meetingId,
          subcontractor_id: sub.id,
          is_primary: sub.is_primary
        }));

        const { error: subsError } = await supabase
          .from('meeting_subcontractors')
          .insert(meetingSubcontractors);

        if (subsError) throw subsError;
      }
    }

    const { data: meetingSubs } = await supabase
      .from('meeting_subcontractors')
      .select(`
        is_primary,
        notes,
        subcontractors (*)
      `)
      .eq('meeting_id', meetingId);

    const subcontractors = (meetingSubs || []).map((ms: any) => ({
      ...ms.subcontractors,
      is_primary: ms.is_primary,
      notes: ms.notes
    }));

    return {
      ...meeting,
      subcontractors
    } as MeetingWithSubcontractors;
  },

  async deleteMeeting(meetingId: string): Promise<void> {
    const { error } = await supabase
      .from('meetings')
      .delete()
      .eq('id', meetingId);

    if (error) throw error;
  }
};
