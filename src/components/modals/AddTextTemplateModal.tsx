import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form, Row, Col } from 'react-bootstrap';
import { Button } from '../bootstrap/Button';
import { FloatingInput, FloatingSelect, FloatingSelectOption } from '../bootstrap/FormControls';
import { TextTemplate } from '../../lib/supabase';
import { textTemplateService } from '../../services/textTemplateService';

interface AddTextTemplateModalProps {
  show: boolean;
  onHide: () => void;
  template?: TextTemplate | null;
  onSave?: () => void;
}

export const AddTextTemplateModal: React.FC<AddTextTemplateModalProps> = ({
  show,
  onHide,
  template = null,
  onSave
}) => {
  const [name, setName] = useState('');
  const [selectedToken, setSelectedToken] = useState('Contact ID');
  const [contactTypes, setContactTypes] = useState<string[]>(['All']);
  const [isContactTypeOpen, setIsContactTypeOpen] = useState(false);
  const contactTypeDropdownRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState('');
  const [contentTcpa, setContentTcpa] = useState('Promotional');
  const [protectFromOverwriting, setProtectFromOverwriting] = useState(false);
  const [protectFromSharing, setProtectFromSharing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditMode = !!template;
  const charCount = content.length;
  const charCountColor = charCount > 150 ? '#dc3545' : '#28a745';

  useEffect(() => {
    if (show && template) {
      setName(template.name || '');
      setSelectedToken(template.select_token || 'Contact ID');
      setContactTypes(template.contact_type ? template.contact_type.split(',').map(t => t.trim()) : ['All']);
      setContent(template.content || '');
      setContentTcpa(template.content_tcpa || 'Promotional');
      setProtectFromOverwriting(template.protect_from_overwriting || false);
      setProtectFromSharing(template.protect_from_sharing || false);
    } else if (show && !template) {
      setName('');
      setSelectedToken('Contact ID');
      setContactTypes(['All']);
      setContent('');
      setContentTcpa('Promotional');
      setProtectFromOverwriting(false);
      setProtectFromSharing(false);
    }
  }, [show, template]);

  const handleSaveTemplate = async () => {
    try {
      setError(null);
      setSaving(true);

      if (!name.trim()) {
        setError('Template name is required');
        return;
      }

      if (!content.trim()) {
        setError('Content is required');
        return;
      }

      const templateData: Partial<TextTemplate> = {
        name: name.trim(),
        contact_type: contactTypes.join(', '),
        content: content.trim(),
        select_token: selectedToken,
        content_tcpa: contentTcpa as 'Promotional' | 'Transactional' | 'Mixed',
        protect_from_overwriting: protectFromOverwriting,
        protect_from_sharing: protectFromSharing,
      };

      if (isEditMode && template) {
        await textTemplateService.update(template.id, templateData);
      } else {
        await textTemplateService.create(templateData);
      }

      if (onSave) {
        onSave();
      }

      onHide();
    } catch (err) {
      console.error('Error saving template:', err);
      setError(err instanceof Error ? err.message : 'Failed to save template');
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
          {isEditMode ? 'EDIT TEXT TEMPLATE' : 'ADD TEXT TEMPLATE'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3 pb-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="d-flex flex-column gap-3">
          {error && (
            <div className="alert alert-danger mb-0" role="alert">
              {error}
            </div>
          )}

          <Row>
            <Col md={6}>
              <FloatingInput
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Add Name here..."
              />
            </Col>
            <Col md={6}>
              <FloatingSelect
                label="Select Token"
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
              >
                <FloatingSelectOption value="Contact ID">Contact ID</FloatingSelectOption>
                <FloatingSelectOption value="Contact Name">Contact Name</FloatingSelectOption>
                <FloatingSelectOption value="Contact Email">Contact Email</FloatingSelectOption>
                <FloatingSelectOption value="Contact Phone">Contact Phone</FloatingSelectOption>
              </FloatingSelect>
            </Col>
          </Row>

          <Row>
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
                      <span className="text-muted">Click to select contact types</span>
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
                  <label>Contact Type</label>
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
              <div className="d-flex align-items-center gap-2 h-100">
                <span style={{ fontSize: '1.2rem', color: charCountColor, fontWeight: 500 }}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={charCountColor}
                    strokeWidth="2"
                    style={{ marginRight: '4px', verticalAlign: 'middle' }}
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                  SMS Char Count:
                </span>
                <span style={{ fontSize: '1.2rem', color: charCountColor, fontWeight: 'bold' }}>
                  {charCount}/150
                </span>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <div className="form-floating-compact">
                <label className="mb-2">Content:</label>
                <textarea
                  className="form-control"
                  placeholder="Add content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{
                    minHeight: '200px',
                    resize: 'vertical',
                    fontSize: '0.9375rem'
                  }}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <FloatingSelect
                label="Content TCPA"
                value={contentTcpa}
                onChange={(e) => setContentTcpa(e.target.value)}
              >
                <FloatingSelectOption value="Promotional">Promotional</FloatingSelectOption>
                <FloatingSelectOption value="Transactional">Transactional</FloatingSelectOption>
                <FloatingSelectOption value="Mixed">Mixed</FloatingSelectOption>
              </FloatingSelect>
            </Col>
            <Col md={8}>
              <div className="d-flex align-items-end h-100 pb-1 justify-content-end gap-3">
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
                    className="mb-0 small"
                    style={{ cursor: 'pointer' }}
                  >
                    Protect from Overwriting
                  </Form.Label>
                </Form.Group>

                <Form.Group className="d-flex align-items-center gap-2 mb-0">
                  <Form.Check
                    type="checkbox"
                    id="protect-sharing"
                    checked={protectFromSharing}
                    onChange={(e) => setProtectFromSharing(e.target.checked)}
                    style={{ cursor: 'pointer' }}
                  />
                  <Form.Label
                    htmlFor="protect-sharing"
                    className="mb-0 small"
                    style={{ cursor: 'pointer' }}
                  >
                    Protect from Sharing
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
                  {saving ? 'SAVING...' : 'SAVE TEMPLATE'}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};
