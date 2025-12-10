import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form, Row, Col } from 'react-bootstrap';
import { Button } from '../bootstrap/Button';
import { FloatingInput, FloatingSelect, FloatingSelectOption } from '../bootstrap/FormControls';
import { TokenDropdown } from '../bootstrap/TokenDropdown';
import { ApptInviteTemplate } from '../../lib/supabase';
import { apptInviteTemplateService } from '../../services/apptInviteTemplateService';

interface AddApptInviteTemplateModalProps {
  show: boolean;
  onHide: () => void;
  template?: ApptInviteTemplate | null;
  onSave?: () => void;
}

export const AddApptInviteTemplateModal: React.FC<AddApptInviteTemplateModalProps> = ({
  show,
  onHide,
  template = null,
  onSave
}) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [additionalEmails, setAdditionalEmails] = useState('');
  const [calendarTitle, setCalendarTitle] = useState('');
  const [externalCalendarTitle, setExternalCalendarTitle] = useState('');
  const [selectedToken, setSelectedToken] = useState('Contact ID');
  const [contactTypes, setContactTypes] = useState<string[]>(['All']);
  const [isContactTypeOpen, setIsContactTypeOpen] = useState(false);
  const contactTypeDropdownRef = useRef<HTMLDivElement>(null);
  const [protectFromOverwriting, setProtectFromOverwriting] = useState(false);
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const isEditMode = !!template;

  useEffect(() => {
    if (show && template) {
      setName(template.name || '');
      setSubject(template.subject || '');
      setAdditionalEmails(template.additional_emails || '');
      setCalendarTitle(template.calendar_title || '');
      setExternalCalendarTitle(template.external_calendar_title || '');
      setSelectedToken(template.select_token || 'Contact ID');
      setContactTypes(template.contact_type ? template.contact_type.split(',').map(t => t.trim()) : ['All']);
      setProtectFromOverwriting(template.protect_from_overwriting || false);
      setContent(template.content || '');
    } else if (show && !template) {
      setName('');
      setSubject('');
      setAdditionalEmails('');
      setCalendarTitle('');
      setExternalCalendarTitle('');
      setSelectedToken('Contact ID');
      setContactTypes(['All']);
      setProtectFromOverwriting(false);
      setContent('');
    }
  }, [show, template]);

  const handleSaveTemplate = async () => {
    try {
      setErrors([]);
      setSaving(true);

      const validationErrors: string[] = [];

      if (!name.trim()) {
        validationErrors.push('Template name is required');
      }

      if (!subject.trim()) {
        validationErrors.push('Email subject is required');
      }

      if (!content.trim()) {
        validationErrors.push('Content is required');
      }

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      const templateData: Partial<ApptInviteTemplate> = {
        name: name.trim(),
        subject: subject.trim(),
        contact_type: contactTypes.join(', '),
        additional_emails: additionalEmails.trim() || undefined,
        calendar_title: calendarTitle.trim() || undefined,
        external_calendar_title: externalCalendarTitle.trim() || undefined,
        select_token: selectedToken,
        protect_from_overwriting: protectFromOverwriting,
        content: content.trim(),
      };

      if (isEditMode && template) {
        await apptInviteTemplateService.update(template.id, templateData);
      } else {
        await apptInviteTemplateService.create(templateData);
      }

      if (onSave) {
        onSave();
      }

      onHide();
    } catch (err) {
      console.error('Error saving template:', err);
      setErrors([err instanceof Error ? err.message : 'Failed to save template']);
    } finally {
      setSaving(false);
    }
  };

  const toggleContactTypeDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsContactTypeOpen(!isContactTypeOpen);
  };

  const handleContactTypeToggle = (type: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContactTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const removeContactType = (type: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContactTypes(prev => prev.filter(t => t !== type));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contactTypeDropdownRef.current && !contactTypeDropdownRef.current.contains(event.target as Node) && isContactTypeOpen) {
        setIsContactTypeOpen(false);
      }
    };

    if (isContactTypeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isContactTypeOpen]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      backdrop="static"
      style={{ maxWidth: '100vw' }}
    >
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title style={{ fontSize: '1.5rem', fontWeight: 400 }}>
          {isEditMode ? 'EDIT APPT INVITE TEMPLATE' : 'ADD APPT INVITE TEMPLATE'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3 pb-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="d-flex flex-column gap-3">
          {errors.length > 0 && (
            <div className="alert alert-danger mb-0" role="alert">
              <strong>Please fix the following errors:</strong>
              <ul className="mb-0 mt-2">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <Row className="g-3">
            <Col md={6}>
              <FloatingInput
                label="Template Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Add Name here..."
              />
            </Col>
            <Col md={6}>
              <Row className="g-3">
                <Col md={6}>
                  <div className="position-relative" ref={contactTypeDropdownRef}>
                    <div className="form-floating-compact">
                      <div
                        className="form-control d-flex flex-wrap gap-1 align-items-center position-relative"
                        style={{ minHeight: '38px', cursor: 'pointer', paddingRight: '2rem' }}
                        onClick={toggleContactTypeDropdown}
                      >
                        {contactTypes.map(type => (
                          <span key={type} className="badge bg-primary d-flex align-items-center gap-1">
                            {type}
                            <button
                              type="button"
                              className="btn-close btn-close-white"
                              style={{ fontSize: '0.6em' }}
                              onClick={(e) => {
                                removeContactType(type, e);
                              }}
                            ></button>
                          </span>
                        ))}
                        {contactTypes.length === 0 && (
                          <span className="text-muted">Select Contact Type</span>
                        )}
                        <svg
                          className="position-absolute end-0 me-2"
                          style={{
                            transform: isContactTypeOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                            top: '50%',
                            marginTop: '-8px'
                          }}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                      </div>
                      <label>Set as Default for Contact Type</label>
                    </div>
                    {isContactTypeOpen && (
                      <div className="position-absolute w-100 bg-white border rounded mt-1 shadow-sm" style={{ zIndex: 1050, maxHeight: '200px', overflowY: 'auto' }}>
                        <div className="p-1">
                          <div
                            className="dropdown-item small py-1"
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => handleContactTypeToggle('All', e)}
                          >
                            All {contactTypes.includes('All') && '✓'}
                          </div>
                          <div
                            className="dropdown-item small py-1"
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => handleContactTypeToggle('Client', e)}
                          >
                            Client {contactTypes.includes('Client') && '✓'}
                          </div>
                          <div
                            className="dropdown-item small py-1"
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => handleContactTypeToggle('Vendor', e)}
                          >
                            Vendor {contactTypes.includes('Vendor') && '✓'}
                          </div>
                          <div
                            className="dropdown-item small py-1"
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => handleContactTypeToggle('Employee', e)}
                          >
                            Employee {contactTypes.includes('Employee') && '✓'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
                <Col md={6}>
                  <TokenDropdown
                    label="Select Token"
                    value={selectedToken}
                    onChange={(value) => setSelectedToken(value)}
                    placeholder="Select a token..."
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="g-3">
            <Col md={6}>
              <FloatingInput
                label="Email Subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Add subject here..."
              />
            </Col>
            <Col md={6}>
              <FloatingInput
                label="Calendar Title"
                type="text"
                value={calendarTitle}
                onChange={(e) => setCalendarTitle(e.target.value)}
                placeholder="Add Calendar title here..."
              />
            </Col>
          </Row>

          <Row className="g-3">
            <Col md={6}>
              <FloatingInput
                label="Addt'l Emails"
                type="text"
                value={additionalEmails}
                onChange={(e) => setAdditionalEmails(e.target.value)}
                placeholder="Add Email"
              />
            </Col>
            <Col md={6}>
              <FloatingInput
                label="External Calendar Title"
                type="text"
                value={externalCalendarTitle}
                onChange={(e) => setExternalCalendarTitle(e.target.value)}
                placeholder="Add External Calendar Title here..."
              />
            </Col>
          </Row>

          <div>
            <div className="d-flex gap-2 mb-3 pb-2 border-bottom">
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Font"
                style={{ width: '100px', height: '36px', fontSize: '0.875rem' }}
              >
                Font
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ms-1">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Size"
                style={{ width: '80px', height: '36px', fontSize: '0.875rem' }}
              >
                Size
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ms-1">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Formats"
                style={{ width: '100px', height: '36px', fontSize: '0.875rem' }}
              >
                Formats
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ms-1">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Bold"
                style={{ width: '36px', height: '36px', fontWeight: 'bold' }}
              >
                B
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Italic"
                style={{ width: '36px', height: '36px', fontStyle: 'italic' }}
              >
                I
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Underline"
                style={{ width: '36px', height: '36px', textDecoration: 'underline' }}
              >
                U
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Strikethrough"
                style={{ width: '36px', height: '36px', textDecoration: 'line-through' }}
              >
                S
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Text color"
                style={{ width: '36px', height: '36px' }}
              >
                A
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Background color"
                style={{ width: '36px', height: '36px' }}
              >
                A
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Align left"
                style={{ width: '36px', height: '36px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="17" y1="10" x2="3" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="17" y1="18" x2="3" y2="18"></line>
                </svg>
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Align center"
                style={{ width: '36px', height: '36px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="10" x2="6" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="18" y1="18" x2="6" y2="18"></line>
                </svg>
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Bullet list"
                style={{ width: '36px', height: '36px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <circle cx="4" cy="6" r="1"></circle>
                  <circle cx="4" cy="12" r="1"></circle>
                  <circle cx="4" cy="18" r="1"></circle>
                </svg>
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Numbered list"
                style={{ width: '36px', height: '36px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="10" y1="6" x2="21" y2="6"></line>
                  <line x1="10" y1="12" x2="21" y2="12"></line>
                  <line x1="10" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Table"
                style={{ width: '36px', height: '36px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Link"
                style={{ width: '36px', height: '36px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Insert image"
                style={{ width: '36px', height: '36px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Fullscreen"
                style={{ width: '36px', height: '36px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              </button>
              <button
                type="button"
                className="btn btn-light border p-2"
                title="Code view"
                style={{ width: '36px', height: '36px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </button>
            </div>
            <div
              className="border rounded p-3"
              style={{
                minHeight: '250px',
                backgroundColor: '#f8f9fa',
                cursor: 'text'
              }}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => setContent(e.currentTarget.textContent || '')}
              dangerouslySetInnerHTML={{ __html: content }}
            >
            </div>
          </div>

          <Row className="g-3 mt-2">
            <Col md={12}>
              <div className="d-flex align-items-center justify-content-between">
                <Form.Group className="d-flex align-items-center gap-2 mb-0">
                  <Form.Check
                    type="checkbox"
                    id="protect-overwriting"
                    checked={protectFromOverwriting}
                    onChange={(e) => setProtectFromOverwriting(e.target.checked)}
                    style={{ cursor: 'pointer' }}
                  />
                  <Form.Label
                    htmlFor="protect-overwriting"
                    className="mb-0"
                    style={{ cursor: 'pointer' }}
                  >
                    Protect from Overwriting
                  </Form.Label>
                </Form.Group>

                <Button
                  variant="success"
                  onClick={handleSaveTemplate}
                  disabled={saving}
                  style={{
                    backgroundColor: '#28a745',
                    border: 'none',
                    padding: '8px 24px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    opacity: saving ? 0.6 : 1
                  }}
                >
                  {saving ? 'SAVING...' : 'Save Template'}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};
