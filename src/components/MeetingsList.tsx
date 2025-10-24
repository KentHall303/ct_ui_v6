import React, { useState, useEffect } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaEdit, FaTrash, FaUsers } from 'react-icons/fa';
import { Button } from './bootstrap/Button';
import { MeetingModal } from './modals/MeetingModal';
import { meetingService } from '../services/meetingService';
import { MeetingWithSubcontractors } from '../lib/supabase';

interface MeetingsListProps {
  jobId: string;
}

export const MeetingsList: React.FC<MeetingsListProps> = ({ jobId }) => {
  const [meetings, setMeetings] = useState<MeetingWithSubcontractors[]>([]);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingWithSubcontractors | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMeetings();
  }, [jobId]);

  const loadMeetings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await meetingService.getMeetingsByJobId(jobId);
      setMeetings(data);
    } catch (error) {
      console.error('Error loading meetings:', error);
      setError('Failed to load meetings. Please try again.');
      setMeetings([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMeeting = () => {
    setSelectedMeeting(undefined);
    setShowMeetingModal(true);
  };

  const handleEditMeeting = (meeting: MeetingWithSubcontractors) => {
    setSelectedMeeting(meeting);
    setShowMeetingModal(true);
  };

  const handleDeleteMeeting = async (meetingId: string) => {
    if (!confirm('Are you sure you want to delete this meeting?')) return;

    try {
      await meetingService.deleteMeeting(meetingId);
      await loadMeetings();
    } catch (error) {
      console.error('Error deleting meeting:', error);
      alert('Failed to delete meeting');
    }
  };

  const handleSaveMeeting = async () => {
    await loadMeetings();
    setShowMeetingModal(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'primary';
      case 'in_progress': return 'warning';
      case 'completed': return 'success';
      case 'cancelled': return 'secondary';
      default: return 'secondary';
    }
  };

  const getMeetingTypeLabel = (type: string) => {
    switch (type) {
      case 'site_visit': return 'Site Visit';
      case 'consultation': return 'Consultation';
      case 'inspection': return 'Inspection';
      case 'follow_up': return 'Follow Up';
      default: return type;
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading meetings...</div>;
  }

  if (error) {
    return (
      <Card className="text-center py-4">
        <Card.Body>
          <p className="text-danger mb-3">{error}</p>
          <Button variant="primary" onClick={loadMeetings}>
            Retry
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Meetings</h5>
        <Button variant="primary" size="sm" onClick={handleAddMeeting}>
          + Add Meeting
        </Button>
      </div>

      {meetings.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <FaCalendarAlt size={48} className="text-muted mb-3" />
            <p className="text-muted mb-3">No meetings scheduled yet</p>
            <Button variant="primary" onClick={handleAddMeeting}>
              Schedule Your First Meeting
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div className="d-flex flex-column gap-3">
          {meetings.map((meeting) => (
            <Card key={meeting.id} className="shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <h6 className="mb-0">{meeting.title}</h6>
                      <Badge bg={getStatusColor(meeting.status)}>
                        {meeting.status.replace('_', ' ')}
                      </Badge>
                      <Badge bg="info" className="text-capitalize">
                        {getMeetingTypeLabel(meeting.meeting_type)}
                      </Badge>
                    </div>
                    {meeting.description && (
                      <p className="text-muted mb-2 small">{meeting.description}</p>
                    )}
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEditMeeting(meeting)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteMeeting(meeting.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3 mb-3">
                  <div className="d-flex align-items-center gap-2 text-muted small">
                    <FaCalendarAlt />
                    <span>{formatDate(meeting.start_date)}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 text-muted small">
                    <FaClock />
                    <span>
                      {formatTime(meeting.start_date)} - {formatTime(meeting.end_date)}
                    </span>
                  </div>
                  {meeting.location && (
                    <div className="d-flex align-items-center gap-2 text-muted small">
                      <FaMapMarkerAlt />
                      <span>{meeting.location}</span>
                    </div>
                  )}
                </div>

                {meeting.subcontractors.length > 0 && (
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <FaUsers className="text-muted" size={14} />
                      <small className="text-muted fw-semibold">Assigned Subcontractors:</small>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {meeting.subcontractors.map((sub) => (
                        <Badge
                          key={sub.id}
                          bg={sub.is_primary ? 'primary' : 'secondary'}
                          className="px-2 py-1"
                        >
                          {sub.name}
                          {sub.is_primary && ' (Primary)'}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {meeting.notes && (
                  <div className="mt-3 pt-3 border-top">
                    <small className="text-muted fw-semibold d-block mb-1">Notes:</small>
                    <small className="text-muted">{meeting.notes}</small>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      <MeetingModal
        show={showMeetingModal}
        onHide={() => setShowMeetingModal(false)}
        onSave={handleSaveMeeting}
        jobId={jobId}
        meeting={selectedMeeting}
      />
    </div>
  );
};
