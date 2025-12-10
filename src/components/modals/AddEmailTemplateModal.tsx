import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form, Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import { Button } from '../bootstrap/Button';
import { FloatingInput, FloatingSelect, FloatingSelectOption } from '../bootstrap/FormControls';
import { TokenDropdown } from '../bootstrap/TokenDropdown';
import { Eye, Edit, Sun, Grid3x3, Code, CheckCircle, Bold, Italic, Underline, Strikethrough, List, ListOrdered, Link, Image as ImageIcon } from 'lucide-react';
import { EmailTemplate } from '../../lib/supabase';
import { emailTemplateService } from '../../services/emailTemplateService';

interface AddEmailTemplateModalProps {
  show: boolean;
  onHide: () => void;
  template?: EmailTemplate | null;
  onSave?: () => void;
}

export const AddEmailTemplateModal: React.FC<AddEmailTemplateModalProps> = ({
  show,
  onHide,
  template = null,
  onSave
}) => {
  console.log('AddEmailTemplateModal rendered with show:', show, 'template:', template);

  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [additionalEmails, setAdditionalEmails] = useState('');
  const [bcc, setBcc] = useState('');
  const [selectedToken, setSelectedToken] = useState('Contact ID');
  const [contactTypes, setContactTypes] = useState<string[]>(['All']);
  const [isContactTypeOpen, setIsContactTypeOpen] = useState(false);
  const contactTypeDropdownRef = useRef<HTMLDivElement>(null);
  const [protectFromOverwriting, setProtectFromOverwriting] = useState(false);
  const [protectFromSharing, setProtectFromSharing] = useState(false);
  const [excludeClient, setExcludeClient] = useState(false);
  const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'editor'>('preview');
  const [editorSubTab, setEditorSubTab] = useState<'sun' | 'block' | 'raw'>('block');
  const [contentTcpa, setContentTcpa] = useState('Promotional');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [htmlValidationError, setHtmlValidationError] = useState<string | null>(null);
  const [htmlValidationSuccess, setHtmlValidationSuccess] = useState(false);

  const isEditMode = !!template;

  useEffect(() => {
    if (show && template) {
      setName(template.name || '');
      setSubject(template.subject || '');
      setAdditionalEmails(template.additional_emails || '');
      setBcc(template.bcc_email || '');
      setSelectedToken(template.select_token || 'Contact ID');
      setContactTypes(template.contact_type ? template.contact_type.split(',').map(t => t.trim()) : ['All']);
      setProtectFromOverwriting(template.protect_from_overwriting || false);
      setProtectFromSharing(template.protect_from_sharing || false);
      setExcludeClient(template.exclude_client || false);
      setDescription(template.description || '');
      setContentTcpa(template.content_tcpa || 'Promotional');
      setContent(template.content || '');
    } else if (show && !template) {
      setName('');
      setSubject('');
      setAdditionalEmails('');
      setBcc('');
      setSelectedToken('Contact ID');
      setContactTypes(['All']);
      setProtectFromOverwriting(false);
      setProtectFromSharing(false);
      setExcludeClient(false);
      setDescription('');
      setContentTcpa('Promotional');
      setContent('');
      setActiveTab('preview');
      setEditorSubTab('block');
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
        validationErrors.push('Subject is required');
      }

      if (!content.trim()) {
        validationErrors.push('Content is required');
      }

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      const templateData: Partial<EmailTemplate> = {
        name: name.trim(),
        subject: subject.trim(),
        contact_type: contactTypes.join(', '),
        additional_emails: additionalEmails.trim() || undefined,
        bcc_email: bcc.trim() || undefined,
        select_token: selectedToken,
        exclude_client: excludeClient,
        protect_from_overwriting: protectFromOverwriting,
        protect_from_sharing: protectFromSharing,
        description: description.trim() || undefined,
        content_tcpa: contentTcpa as 'Promotional' | 'Transactional' | 'Mixed',
        content: content.trim(),
      };

      if (isEditMode && template) {
        await emailTemplateService.update(template.id, templateData);
      } else {
        await emailTemplateService.create(templateData);
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

  const handleSaveAsDraft = () => {
    console.log('Save as Draft clicked');
  };

  const handlePublish = () => {
    console.log('Publish clicked');
  };

  const validateHTML = () => {
    setHtmlValidationError(null);
    setHtmlValidationSuccess(false);

    if (!content.trim()) {
      setHtmlValidationError('HTML content is empty');
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const parseErrors = doc.querySelector('parsererror');

      if (parseErrors) {
        setHtmlValidationError('HTML syntax error: ' + parseErrors.textContent);
        return;
      }

      // Check for common issues
      const openTags = content.match(/<[^/][^>]*>/g) || [];
      const closeTags = content.match(/<\/[^>]*>/g) || [];

      if (openTags.length !== closeTags.length) {
        setHtmlValidationError('Warning: Unmatched tags detected. Check that all tags are properly closed.');
        return;
      }

      setHtmlValidationSuccess(true);
      setTimeout(() => setHtmlValidationSuccess(false), 3000);
    } catch (err) {
      setHtmlValidationError('Validation error: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleOpenBlockEditor = () => {
    console.log('Open Block Editor clicked');
    // TODO: Implement block editor modal
  };

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
          {isEditMode ? 'Edit Email Template' : 'Add Email Template'}
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
                label="Subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Add subject here..."
              />
            </Col>
            <Col md={6}>
              <FloatingInput
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Add name here..."
              />
            </Col>
          </Row>

          <Row className="g-3">
            <Col md={6}>
              <FloatingInput
                label="Additional Emails"
                type="text"
                value={additionalEmails}
                onChange={(e) => setAdditionalEmails(e.target.value)}
                placeholder="Add Email..."
              />
            </Col>
            <Col md={6}>
              <Row className="g-3">
                <Col md={6}>
                  <TokenDropdown
                    label="Select Token"
                    value={selectedToken}
                    onChange={(value) => setSelectedToken(value)}
                    placeholder="Select a token..."
                  />
                </Col>
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
              </Row>
            </Col>
          </Row>

          <Row className="g-3">
            <Col md={6}>
              <FloatingInput
                label="BCC"
                type="text"
                value={bcc}
                onChange={(e) => setBcc(e.target.value)}
                placeholder="Add BCC Email"
              />
            </Col>
            <Col md={6}>
              <div className="d-flex align-items-end h-100 pb-1">
                <div className="d-flex align-items-center gap-3">
                  <Form.Group className="d-flex align-items-center gap-2 mb-0">
                    <Form.Check
                      type="checkbox"
                      id="exclude-client"
                      checked={excludeClient}
                      onChange={(e) => setExcludeClient(e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    <Form.Label
                      htmlFor="exclude-client"
                      className="mb-0 small"
                      style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      Exclude Client
                    </Form.Label>
                  </Form.Group>

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
                </div>
              </div>
            </Col>
          </Row>

          <Row className="g-3 mb-0">
            <Col md={12}>
              <div className="d-flex align-items-end gap-2">
                <div className="flex-grow-1">
                  <FloatingInput
                    label="Description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-light border-0 p-2 d-flex align-items-center justify-content-center"
                  title="Attach file"
                  style={{ width: '32px', height: '32px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn btn-light border-0 p-2 d-flex align-items-center justify-content-center"
                  title="Delete"
                  style={{ width: '32px', height: '32px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 4 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
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

          <Card className="shadow-sm mt-2">
            <Card.Header className="bg-white border-bottom-0 pb-0 pt-2">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'nowrap' }}>
                  <Nav variant="underline" className="nav-underline" style={{ flex: '0 0 auto' }}>
                    <Nav.Item>
                      <Nav.Link
                        active={activeTab === 'preview'}
                        onClick={() => setActiveTab('preview')}
                        className="d-flex align-items-center gap-2"
                        style={{
                          cursor: 'pointer',
                          color: activeTab === 'preview' ? '#0d6efd' : '#6c757d',
                          borderBottomColor: activeTab === 'preview' ? '#0d6efd' : 'transparent'
                        }}
                      >
                        <Eye size={16} />
                        Published Content
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        active={activeTab === 'editor'}
                        onClick={() => setActiveTab('editor')}
                        className="d-flex align-items-center gap-2"
                        style={{
                          cursor: 'pointer',
                          color: activeTab === 'editor' ? '#0a58ca' : '#6c757d',
                          borderBottomColor: activeTab === 'editor' ? '#0a58ca' : 'transparent',
                          fontWeight: activeTab === 'editor' ? 600 : 400
                        }}
                      >
                        <Edit size={16} />
                        Editor
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  {activeTab === 'editor' && (
                  <div
                    style={{
                      flex: '0 0 auto',
                      display: 'flex'
                    }}
                  >
                    <Nav variant="underline" className="nav-underline">
                      <Nav.Item>
                        <Nav.Link
                          active={editorSubTab === 'sun'}
                          onClick={() => setEditorSubTab('sun')}
                          className="d-flex align-items-center gap-2"
                          style={{
                            cursor: 'pointer',
                            color: editorSubTab === 'sun' ? '#0d6efd' : '#6c757d',
                            borderBottomColor: editorSubTab === 'sun' ? '#0d6efd' : 'transparent',
                            fontSize: '0.9rem',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <Sun size={15} />
                          Sun Editor
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          active={editorSubTab === 'block'}
                          onClick={() => setEditorSubTab('block')}
                          className="d-flex align-items-center gap-2"
                          style={{
                            cursor: 'pointer',
                            color: editorSubTab === 'block' ? '#0d6efd' : '#6c757d',
                            borderBottomColor: editorSubTab === 'block' ? '#0d6efd' : 'transparent',
                            fontSize: '0.9rem',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <Grid3x3 size={15} />
                          Block Editor
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          active={editorSubTab === 'raw'}
                          onClick={() => setEditorSubTab('raw')}
                          className="d-flex align-items-center gap-2"
                          style={{
                            cursor: 'pointer',
                            color: editorSubTab === 'raw' ? '#0d6efd' : '#6c757d',
                            borderBottomColor: editorSubTab === 'raw' ? '#0d6efd' : 'transparent',
                            fontSize: '0.9rem',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <Code size={15} />
                          Raw HTML
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  )}
                </div>
              </Card.Header>

              <Card.Body>
                {activeTab === 'preview' && (
                  <div
                    className="border rounded d-flex align-items-center justify-content-center"
                    style={{
                      minHeight: '200px',
                      backgroundColor: '#6c757d',
                      color: '#dee2e6'
                    }}
                  >
                    <div className="text-center">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </div>
                  </div>
                )}

                {activeTab === 'editor' && editorSubTab === 'block' && (
                  <div
                    className="border rounded d-flex align-items-center justify-content-center"
                    style={{
                      minHeight: '250px',
                      backgroundColor: '#f8f9fa'
                    }}
                  >
                    <Button
                      variant="primary"
                      onClick={handleOpenBlockEditor}
                      className="d-flex align-items-center gap-2"
                      style={{ padding: '12px 32px', fontSize: '1rem' }}
                    >
                      <Grid3x3 size={20} />
                      Open Block Editor
                    </Button>
                  </div>
                )}

                {activeTab === 'editor' && editorSubTab === 'sun' && (
                  <div>
                    <div className="d-flex flex-wrap gap-2 mb-3 pb-2 border-bottom">
                      {/* Text Formatting */}
                      <button type="button" className="btn btn-light border p-2" title="Bold" style={{ width: '36px', height: '36px' }}>
                        <Bold size={16} />
                      </button>
                      <button type="button" className="btn btn-light border p-2" title="Italic" style={{ width: '36px', height: '36px' }}>
                        <Italic size={16} />
                      </button>
                      <button type="button" className="btn btn-light border p-2" title="Underline" style={{ width: '36px', height: '36px' }}>
                        <Underline size={16} />
                      </button>
                      <button type="button" className="btn btn-light border p-2" title="Strikethrough" style={{ width: '36px', height: '36px' }}>
                        <Strikethrough size={16} />
                      </button>

                      <div className="border-end mx-1"></div>

                      {/* Font Color */}
                      <button type="button" className="btn btn-light border p-2" title="Text color" style={{ width: '36px', height: '36px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2L3 22h18L12 2z"></path>
                          <rect x="3" y="20" width="18" height="2" fill="currentColor"></rect>
                        </svg>
                      </button>
                      <button type="button" className="btn btn-light border p-2" title="Background color" style={{ width: '36px', height: '36px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2v20M2 12h20"></path>
                        </svg>
                      </button>

                      <div className="border-end mx-1"></div>

                      {/* Alignment */}
                      <button type="button" className="btn btn-light border p-2" title="Align left" style={{ width: '36px', height: '36px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="17" y1="10" x2="3" y2="10"></line>
                          <line x1="21" y1="6" x2="3" y2="6"></line>
                          <line x1="21" y1="14" x2="3" y2="14"></line>
                          <line x1="17" y1="18" x2="3" y2="18"></line>
                        </svg>
                      </button>
                      <button type="button" className="btn btn-light border p-2" title="Align center" style={{ width: '36px', height: '36px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="10" x2="6" y2="10"></line>
                          <line x1="21" y1="6" x2="3" y2="6"></line>
                          <line x1="21" y1="14" x2="3" y2="14"></line>
                          <line x1="18" y1="18" x2="6" y2="18"></line>
                        </svg>
                      </button>
                      <button type="button" className="btn btn-light border p-2" title="Align right" style={{ width: '36px', height: '36px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="21" y1="10" x2="7" y2="10"></line>
                          <line x1="21" y1="6" x2="3" y2="6"></line>
                          <line x1="21" y1="14" x2="3" y2="14"></line>
                          <line x1="21" y1="18" x2="7" y2="18"></line>
                        </svg>
                      </button>
                      <button type="button" className="btn btn-light border p-2" title="Justify" style={{ width: '36px', height: '36px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="21" y1="10" x2="3" y2="10"></line>
                          <line x1="21" y1="6" x2="3" y2="6"></line>
                          <line x1="21" y1="14" x2="3" y2="14"></line>
                          <line x1="21" y1="18" x2="3" y2="18"></line>
                        </svg>
                      </button>

                      <div className="border-end mx-1"></div>

                      {/* Lists */}
                      <button type="button" className="btn btn-light border p-2" title="Bullet list" style={{ width: '36px', height: '36px' }}>
                        <List size={16} />
                      </button>
                      <button type="button" className="btn btn-light border p-2" title="Numbered list" style={{ width: '36px', height: '36px' }}>
                        <ListOrdered size={16} />
                      </button>

                      <div className="border-end mx-1"></div>

                      {/* Insert */}
                      <button type="button" className="btn btn-light border p-2" title="Insert link" style={{ width: '36px', height: '36px' }}>
                        <Link size={16} />
                      </button>
                      <button type="button" className="btn btn-light border p-2" title="Insert image" style={{ width: '36px', height: '36px' }}>
                        <ImageIcon size={16} />
                      </button>
                      <button type="button" className="btn btn-light border p-2" title="Insert table" style={{ width: '36px', height: '36px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="3" y1="9" x2="21" y2="9"></line>
                          <line x1="3" y1="15" x2="21" y2="15"></line>
                          <line x1="12" y1="3" x2="12" y2="21"></line>
                        </svg>
                      </button>
                    </div>
                    <div
                      className="border rounded p-3"
                      style={{
                        minHeight: '200px',
                        backgroundColor: '#f8f9fa',
                        cursor: 'text'
                      }}
                      contentEditable
                      suppressContentEditableWarning
                      onInput={(e) => setContent(e.currentTarget.textContent || '')}
                      dangerouslySetInnerHTML={{ __html: content }}
                    >
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <Button
                        variant="outline-secondary"
                        onClick={handleSaveAsDraft}
                        style={{ padding: '6px 20px', fontSize: '0.875rem' }}
                      >
                        SAVE AS A DRAFT ONLY
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handlePublish}
                        style={{ padding: '6px 32px', fontSize: '0.875rem' }}
                      >
                        PUBLISH
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === 'editor' && editorSubTab === 'raw' && (
                  <div>
                    {htmlValidationError && (
                      <div className="alert alert-danger py-2 mb-3" role="alert">
                        <small>{htmlValidationError}</small>
                      </div>
                    )}

                    {htmlValidationSuccess && (
                      <div className="alert alert-success py-2 mb-3" role="alert">
                        <small>HTML validation passed successfully!</small>
                      </div>
                    )}

                    <Form.Control
                      as="textarea"
                      rows={8}
                      placeholder="Enter HTML code..."
                      style={{ fontFamily: 'monospace', fontSize: '0.875rem', resize: 'vertical' }}
                      value={content}
                      onChange={(e) => {
                        setContent(e.target.value);
                        setHtmlValidationError(null);
                        setHtmlValidationSuccess(false);
                      }}
                    />
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <Button
                        variant="outline-secondary"
                        onClick={validateHTML}
                        className="d-flex align-items-center gap-2"
                        style={{ padding: '6px 20px', fontSize: '0.875rem' }}
                      >
                        <CheckCircle size={16} />
                        Validate HTML
                      </Button>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-secondary"
                          onClick={handleSaveAsDraft}
                          style={{ padding: '6px 20px', fontSize: '0.875rem' }}
                        >
                          SAVE AS A DRAFT ONLY
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handlePublish}
                          style={{ padding: '6px 32px', fontSize: '0.875rem' }}
                        >
                          PUBLISH
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>

          <Row className="g-3 mt-2">
            <Col md={3}>
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
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};
