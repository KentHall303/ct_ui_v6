import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col } from 'react-bootstrap';
import { Button } from '../bootstrap/Button';
import { FloatingInput, FloatingSelect, FloatingSelectOption } from '../bootstrap/FormControls';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { meetingService } from '../../services/meetingService';
import { Subcontractor, MeetingWithSubcontractors } from '../../lib/supabase';

interface MeetingModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (meeting: MeetingWithSubcontractors) => void;
  jobId: string;
  meeting?: MeetingWithSubcontractors;
}

export const MeetingModal: React.FC<MeetingModalProps> = ({
  show,
  onHide,
  onSave,
  jobId,
  meeting
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [meetingType, setMeetingType] = useState<'site_visit' | 'consultation' | 'inspection' | 'follow_up'>('site_visit');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('10:00');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'scheduled' | 'in_progress' | 'completed' | 'cancelled'>('scheduled');

  const [availableSubcontractors, setAvailableSubcontractors] = useState<Subcontractor[]>([]);
  const [selectedSubcontractors, setSelectedSubcontractors] = useState<Array<{ id: string; name: string; isPrimary: boolean }>>([]);
  const [showSubModal, setShowSubModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (show) {
      loadSubcontractors();
      if (meeting) {
        setTitle(meeting.title);
        setDescription(meeting.description || '');
        setMeetingType(meeting.meeting_type);

        const start = new Date(meeting.start_date);
        setStartDate(start.toISOString().split('T')[0]);
        setStartTime(start.toTimeString().slice(0, 5));

        const end = new Date(meeting.end_date);
        setEndDate(end.toISOString().split('T')[0]);
        setEndTime(end.toTimeString().slice(0, 5));

        setLocation(meeting.location || '');
        setNotes(meeting.notes || '');
        setStatus(meeting.status);

        setSelectedSubcontractors(
          meeting.subcontractors.map(sub => ({
            id: sub.id,
            name: sub.name,
            isPrimary: sub.is_primary
          }))
        );
      } else {
        resetForm();
      }
    }
  }, [show, meeting]);

  const loadSubcontractors = async () => {
    setIsLoading(true);
    try {
      const subs = await meetingService.getAllSubcontractors();
      setAvailableSubcontractors(subs);
    } catch (error) {
      console.error('Error loading subcontractors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setMeetingType('site_visit');
    const now = new Date();
    setStartDate(now.toISOString().split('T')[0]);
    setStartTime('09:00');
    setEndDate(now.toISOString().split('T')[0]);
    setEndTime('10:00');
    setLocation('');
    setNotes('');
    setStatus('scheduled');
    setSelectedSubcontractors([]);
  };

  const toggleSubcontractor = (subcontractor: Subcontractor) => {
    const isSelected = selectedSubcontractors.some(s => s.id === subcontractor.id);
    if (isSelected) {
      setSelectedSubcontractors(selectedSubcontractors.filter(s => s.id !== subcontractor.id));
    } else {
      setSelectedSubcontractors([...selectedSubcontractors, {
        id: subcontractor.id,
        name: subcontractor.name,
        isPrimary: false
      }]);
    }
  };

  const setPrimarySubcontractor = (id: string) => {
    setSelectedSubcontractors(selectedSubcontractors.map(s => ({
      ...s,
      isPrimary: s.id === id
    })));
  };

  const handleSave = async () => {
    if (!title.trim() || !startDate || !endDate) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    try {
      const startDateTime = new Date(`${startDate}T${startTime}`).toISOString();
      const endDateTime = new Date(`${endDate}T${endTime}`).toISOString();

      const meetingData = {
        title,
        description,
        meeting_type: meetingType,
        start_date: startDateTime,
        end_date: endDateTime,
        location,
        status,
        notes
      };

      const subIds = selectedSubcontractors.map(s => ({
        id: s.id,
        is_primary: s.isPrimary
      }));

      let savedMeeting: MeetingWithSubcontractors;
      if (meeting) {
        savedMeeting = await meetingService.updateMeeting(meeting.id, meetingData, subIds);
      } else {
        savedMeeting = await meetingService.createMeeting(jobId, meetingData, subIds);
      }

      onSave(savedMeeting);
      onHide();
    } catch (error) {
      console.error('Error saving meeting:', error);
      alert('Failed to save meeting. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
        <Modal.Header closeButton className="border-0 pb-2">
          <Modal.Title style={{ fontSize: '1.25rem', fontWeight: 500 }}>
            {meeting ? 'Edit Meeting' : 'New Meeting'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2 pb-4">
          <div className="d-flex flex-column gap-3">
            <FloatingInput
              label="Meeting Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Meeting Title"
            />

            <Row>
              <Col md={6}>
                <FloatingSelect
                  label="Meeting Type"
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value as any)}
                >
                  <FloatingSelectOption value="site_visit">Site Visit</FloatingSelectOption>
                  <FloatingSelectOption value="consultation">Consultation</FloatingSelectOption>
                  <FloatingSelectOption value="inspection">Inspection</FloatingSelectOption>
                  <FloatingSelectOption value="follow_up">Follow Up</FloatingSelectOption>
                </FloatingSelect>
              </Col>
              <Col md={6}>
                <FloatingSelect
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                >
                  <FloatingSelectOption value="scheduled">Scheduled</FloatingSelectOption>
                  <FloatingSelectOption value="in_progress">In Progress</FloatingSelectOption>
                  <FloatingSelectOption value="completed">Completed</FloatingSelectOption>
                  <FloatingSelectOption value="cancelled">Cancelled</FloatingSelectOption>
                </FloatingSelect>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FloatingInput
                  label="Start Date *"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <FloatingInput
                  label="Start Time *"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FloatingInput
                  label="End Date *"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <FloatingInput
                  label="End Time *"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </Col>
            </Row>

            <FloatingInput
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Meeting Location"
            />

            <div>
              <label className="form-label small text-secondary mb-2">Description</label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Meeting description..."
                style={{ resize: 'none' }}
              />
            </div>

            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="form-label small text-secondary mb-0">Assigned Subcontractors</label>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setShowSubModal(true)}
                  style={{ padding: '0', fontSize: '0.875rem' }}
                >
                  + Add Subcontractors
                </Button>
              </div>
              <div className="border rounded p-3" style={{ minHeight: '80px', backgroundColor: '#f8f9fa' }}>
                {selectedSubcontractors.length === 0 ? (
                  <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>No subcontractors assigned</p>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {selectedSubcontractors.map((sub, index) => (
                      <div key={sub.id} className="d-flex align-items-center gap-2">
                        <span
                          className={`badge ${sub.isPrimary ? 'bg-primary' : 'bg-secondary'} rounded-circle d-flex align-items-center justify-content-center`}
                          style={{ width: '24px', height: '24px', fontSize: '0.75rem' }}
                        >
                          {index + 1}
                        </span>
                        <span style={{ fontSize: '0.875rem' }}>
                          {sub.name}
                          {sub.isPrimary && <span className="text-muted ms-1">(Primary)</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="form-label small text-secondary mb-2">Notes</label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Meeting notes..."
                style={{ resize: 'none' }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={onHide} disabled={isSaving}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Meeting'}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Subcontractor Selection Modal */}
      <Modal show={showSubModal} onHide={() => setShowSubModal(false)} centered size="sm" backdrop="static">
        <Modal.Header closeButton className="border-0 pb-2">
          <Modal.Title style={{ fontSize: '1.1rem', fontWeight: 500 }}>Select Subcontractors</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2 pb-3">
          {isLoading ? (
            <p className="text-center text-muted">Loading...</p>
          ) : (
            <div className="d-flex flex-column gap-2">
              {availableSubcontractors.map((subcontractor) => {
                const isSelected = selectedSubcontractors.some(s => s.id === subcontractor.id);
                const isPrimary = selectedSubcontractors.find(s => s.id === subcontractor.id)?.isPrimary || false;

                return (
                  <div
                    key={subcontractor.id}
                    className="p-3 border rounded d-flex align-items-center justify-content-between"
                    style={{ backgroundColor: isSelected ? '#f8f9fa' : 'white' }}
                  >
                    <div className="d-flex align-items-center gap-2 flex-grow-1">
                      <Form.Check
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSubcontractor(subcontractor)}
                        style={{ cursor: 'pointer' }}
                      />
                      <div
                        style={{ cursor: 'pointer', flex: 1 }}
                        onClick={() => toggleSubcontractor(subcontractor)}
                      >
                        <div>{subcontractor.name}</div>
                        {subcontractor.specialty && (
                          <small className="text-muted">{subcontractor.specialty}</small>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => setPrimarySubcontractor(subcontractor.id)}
                        title={isPrimary ? 'Primary' : 'Set as primary'}
                      >
                        {isPrimary ? (
                          <FaStar className="text-warning" size={18} />
                        ) : (
                          <FaRegStar className="text-secondary" size={18} />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-3 text-center">
            <Button
              variant="primary"
              onClick={() => setShowSubModal(false)}
              style={{ minWidth: '100px' }}
            >
              DONE
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
