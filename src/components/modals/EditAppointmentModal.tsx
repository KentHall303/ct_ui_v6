import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { CalendarEventWithCalendar, updateCalendarEvent, fetchCalendars, Calendar } from '../../services/calendarService';
import { X, Calendar as CalendarIcon, Clock, User, DollarSign, Trash2 } from 'lucide-react';

interface EditAppointmentModalProps {
  show: boolean;
  onHide: () => void;
  event: CalendarEventWithCalendar | null;
  onSave: () => void;
  onDelete?: (eventId: string) => void;
}

export const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({
  show,
  onHide,
  event,
  onSave,
  onDelete
}) => {
  const [formData, setFormData] = useState({
    title: '',
    contact_name: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    calendar_id: '',
    amount: '',
    status: 'pending' as 'pending' | 'active' | 'completed' | 'overdue',
    event_type: 'quote' as 'quote' | 'installation' | 'inspection' | 'follow_up',
    notes: '',
    is_all_day: false,
  });

  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadCalendars();
  }, []);

  useEffect(() => {
    if (event && show) {
      const startDate = new Date(event.start_date);
      const endDate = new Date(event.end_date);

      setFormData({
        title: event.title || event.quote_number || '',
        contact_name: event.contact_name || '',
        start_date: startDate.toISOString().split('T')[0],
        start_time: event.is_all_day ? '' : startDate.toTimeString().slice(0, 5),
        end_date: endDate.toISOString().split('T')[0],
        end_time: event.is_all_day ? '' : endDate.toTimeString().slice(0, 5),
        calendar_id: event.calendar_id || '',
        amount: event.amount?.toString() || '',
        status: event.status,
        event_type: event.event_type,
        notes: event.notes || '',
        is_all_day: event.is_all_day,
      });
      setError(null);
      setSuccess(false);
    }
  }, [event, show]);

  const loadCalendars = async () => {
    const data = await fetchCalendars();
    setCalendars(data);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!event) return;

    setLoading(true);
    setError(null);

    try {
      const startDateTime = formData.is_all_day
        ? new Date(`${formData.start_date}T00:00:00`)
        : new Date(`${formData.start_date}T${formData.start_time}`);

      const endDateTime = formData.is_all_day
        ? new Date(`${formData.end_date}T23:59:59`)
        : new Date(`${formData.end_date}T${formData.end_time || formData.start_time}`);

      const updates = {
        title: formData.title,
        contact_name: formData.contact_name,
        start_date: startDateTime.toISOString(),
        end_date: endDateTime.toISOString(),
        calendar_id: formData.calendar_id || null,
        amount: formData.amount ? parseFloat(formData.amount) : null,
        status: formData.status,
        event_type: formData.event_type,
        notes: formData.notes,
        is_all_day: formData.is_all_day,
      };

      const result = await updateCalendarEvent(event.id, updates);

      if (result) {
        setSuccess(true);
        setTimeout(() => {
          onSave();
          onHide();
        }, 1000);
      } else {
        setError('Failed to update appointment');
      }
    } catch (err) {
      setError('An error occurred while updating the appointment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    if (event && onDelete && window.confirm('Are you sure you want to delete this appointment?')) {
      onDelete(event.id);
      onHide();
    }
  };

  if (!event) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="h5 fw-bold">
          <CalendarIcon size={20} className="me-2" />
          Edit Appointment
        </Modal.Title>
        <button
          type="button"
          className="btn-close"
          onClick={onHide}
          aria-label="Close"
        />
      </Modal.Header>

      <Modal.Body>
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success">
            Appointment updated successfully!
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Group>
                <Form.Label className="small fw-semibold">Title / Quote Number</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter title or quote number"
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label className="small fw-semibold">Contact Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.contact_name}
                  onChange={(e) => handleChange('contact_name', e.target.value)}
                  placeholder="Enter contact name"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-semibold">
                  <CalendarIcon size={14} className="me-1" />
                  Start Date
                </Form.Label>
                <Form.Control
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleChange('start_date', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-semibold">
                  <Clock size={14} className="me-1" />
                  Start Time
                </Form.Label>
                <Form.Control
                  type="time"
                  value={formData.start_time}
                  onChange={(e) => handleChange('start_time', e.target.value)}
                  disabled={formData.is_all_day}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-semibold">
                  <CalendarIcon size={14} className="me-1" />
                  End Date
                </Form.Label>
                <Form.Control
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => handleChange('end_date', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-semibold">
                  <Clock size={14} className="me-1" />
                  End Time
                </Form.Label>
                <Form.Control
                  type="time"
                  value={formData.end_time}
                  onChange={(e) => handleChange('end_time', e.target.value)}
                  disabled={formData.is_all_day}
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Check
                type="checkbox"
                label="All Day Event"
                checked={formData.is_all_day}
                onChange={(e) => handleChange('is_all_day', e.target.checked)}
              />
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-semibold">
                  <User size={14} className="me-1" />
                  Calendar
                </Form.Label>
                <Form.Select
                  value={formData.calendar_id}
                  onChange={(e) => handleChange('calendar_id', e.target.value)}
                >
                  <option value="">Select Calendar</option>
                  {calendars.map(cal => (
                    <option key={cal.id} value={cal.id}>
                      {cal.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-semibold">
                  <DollarSign size={14} className="me-1" />
                  Amount
                </Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                  placeholder="0.00"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-semibold">Status</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-semibold">Type</Form.Label>
                <Form.Select
                  value={formData.event_type}
                  onChange={(e) => handleChange('event_type', e.target.value)}
                >
                  <option value="quote">Quote</option>
                  <option value="installation">Installation</option>
                  <option value="inspection">Inspection</option>
                  <option value="follow_up">Follow Up</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label className="small fw-semibold">Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Add notes..."
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <div className="d-flex justify-content-between w-100">
          {onDelete && (
            <Button
              variant="outline-danger"
              onClick={handleDeleteClick}
              disabled={loading}
            >
              <Trash2 size={16} className="me-1" />
              Delete
            </Button>
          )}
          <div className="ms-auto d-flex gap-2">
            <Button variant="outline-secondary" onClick={onHide} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={loading || success}
            >
              {loading ? 'Saving...' : success ? 'Saved!' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
