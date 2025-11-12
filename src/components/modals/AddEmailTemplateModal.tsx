import React, { useState } from 'react';
import { Modal, Form, Row, Col, Nav } from 'react-bootstrap';
import { Button } from '../bootstrap/Button';
import { FloatingInput, FloatingSelect, FloatingSelectOption } from '../bootstrap/FormControls';
import { Lock, HelpCircle, Trash2, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { emailTemplateService } from '../../services/emailTemplateService';

interface AddEmailTemplateModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess?: () => void;
}

type EditorTab = 'sun' | 'block' | 'raw';

export const AddEmailTemplateModal: React.FC<AddEmailTemplateModalProps> = ({
  show,
  onHide,
  onSuccess
}) => {
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [additionalEmails, setAdditionalEmails] = useState('');
  const [bccEmail, setBccEmail] = useState('');
  const [excludeClient, setExcludeClient] = useState(false);
  const [selectToken, setSelectToken] = useState('Contact ID');
  const [contactType, setContactType] = useState('All');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState<EditorTab>('sun');
  const [contentTcpa, setContentTcpa] = useState('Promotional');
  const [protectFromOverwriting, setProtectFromOverwriting] = useState(false);
  const [protectFromSharing, setProtectFromSharing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quillModules = {
    toolbar: [
      [{ 'align': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const validateEmail = (email: string): boolean => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = async () => {
    setError(null);

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    if (!subject.trim()) {
      setError('Subject is required');
      return;
    }

    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    if (additionalEmails && !validateEmail(additionalEmails)) {
      setError('Additional Emails must be a valid email address');
      return;
    }

    if (bccEmail && !validateEmail(bccEmail)) {
      setError('BCC Email must be a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const templateData = {
        name: name.trim(),
        subject: subject.trim(),
        content: content.trim(),
        contact_type: contactType,
        exclude_client: excludeClient,
        additional_emails: additionalEmails.trim() || null,
        bcc_email: bccEmail.trim() || null,
        select_token: selectToken,
        description: description.trim() || null,
        protect_from_overwriting: protectFromOverwriting,
        protect_from_sharing: protectFromSharing,
        category: 'email',
        is_active: true
      };

      await emailTemplateService.create(templateData);

      resetForm();
      if (onSuccess) onSuccess();
      onHide();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create email template');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubject('');
    setName('');
    setAdditionalEmails('');
    setBccEmail('');
    setExcludeClient(false);
    setSelectToken('Contact ID');
    setContactType('All');
    setDescription('');
    setContent('');
    setActiveTab('sun');
    setContentTcpa('Promotional');
    setProtectFromOverwriting(false);
    setProtectFromSharing(false);
    setError(null);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add Email Template</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && (
          <div className="alert alert-danger mb-3" role="alert">
            {error}
          </div>
        )}

        <Row className="mb-3">
          <Col md={6}>
            <FloatingInput
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Add subject here..."
              disabled={isSubmitting}
            />
          </Col>
          <Col md={6}>
            <FloatingInput
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Add name here..."
              disabled={isSubmitting}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <FloatingInput
              label="Additional Emails"
              value={additionalEmails}
              onChange={(e) => setAdditionalEmails(e.target.value)}
              placeholder="Add Email..."
              disabled={isSubmitting}
              type="email"
            />
          </Col>
          <Col md={6}>
            <div className="d-flex align-items-center gap-2">
              <FloatingSelect
                label="Select Token"
                value={selectToken}
                onChange={(e) => setSelectToken(e.target.value)}
                disabled={isSubmitting}
              >
                <FloatingSelectOption value="Contact ID">Contact ID</FloatingSelectOption>
                <FloatingSelectOption value="First Name">First Name</FloatingSelectOption>
                <FloatingSelectOption value="Last Name">Last Name</FloatingSelectOption>
                <FloatingSelectOption value="Company">Company</FloatingSelectOption>
              </FloatingSelect>
              <HelpCircle size={16} className="text-muted" style={{ marginTop: '8px' }} />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <FloatingInput
              label="BCC"
              value={bccEmail}
              onChange={(e) => setBccEmail(e.target.value)}
              placeholder="Add BCC Email"
              disabled={isSubmitting}
              type="email"
            />
          </Col>
          <Col md={6}>
            <div className="d-flex align-items-center gap-2">
              <FloatingSelect
                label="Contact Type"
                value={contactType}
                onChange={(e) => setContactType(e.target.value)}
                disabled={isSubmitting}
              >
                <FloatingSelectOption value="All">All</FloatingSelectOption>
                <FloatingSelectOption value="Client">Client</FloatingSelectOption>
                <FloatingSelectOption value="Employee">Employee</FloatingSelectOption>
                <FloatingSelectOption value="Partner">Partner</FloatingSelectOption>
                <FloatingSelectOption value="Vendor">Vendor</FloatingSelectOption>
              </FloatingSelect>
              <HelpCircle size={16} className="text-muted" style={{ marginTop: '8px' }} />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Check
              type="checkbox"
              id="exclude-client"
              label="Exclude Client"
              checked={excludeClient}
              onChange={(e) => setExcludeClient(e.target.checked)}
              disabled={isSubmitting}
            />
          </Col>
          <Col md={6}>
            <div className="d-flex align-items-center justify-content-between">
              <Form.Label>Description</Form.Label>
              <Trash2 size={16} className="text-muted" style={{ cursor: 'pointer' }} />
            </div>
            <Form.Control
              as="textarea"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              style={{ resize: 'none' }}
            />
          </Col>
        </Row>

        <div className="mb-3">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'sun'}
                onClick={() => setActiveTab('sun')}
                style={{ cursor: 'pointer' }}
              >
                SUN EDITOR
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'block'}
                onClick={() => setActiveTab('block')}
                style={{ cursor: 'pointer' }}
              >
                BLOCK EDITOR
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'raw'}
                onClick={() => setActiveTab('raw')}
                style={{ cursor: 'pointer' }}
              >
                RAW HTML
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {activeTab === 'sun' && (
            <div style={{ minHeight: '300px' }}>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
                style={{ height: '250px', marginBottom: '42px' }}
              />
            </div>
          )}

          {activeTab === 'block' && (
            <div className="border rounded p-3" style={{ minHeight: '300px', backgroundColor: '#f8f9fa' }}>
              <p className="text-muted">Block editor functionality coming soon...</p>
              <Form.Control
                as="textarea"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          )}

          {activeTab === 'raw' && (
            <Form.Control
              as="textarea"
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
              style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
            />
          )}
        </div>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label className="small text-secondary">Preview</Form.Label>
            <div
              className="border rounded d-flex align-items-center justify-content-center"
              style={{ height: '150px', backgroundColor: '#f8f9fa' }}
            >
              <ImageIcon size={48} className="text-muted" />
            </div>
            <Form.Label className="small text-secondary mt-3">Publish Content</Form.Label>
          </Col>
          <Col md={6}>
            <FloatingSelect
              label="Content TCPA"
              value={contentTcpa}
              onChange={(e) => setContentTcpa(e.target.value)}
              disabled={isSubmitting}
            >
              <FloatingSelectOption value="Promotional">Promotional</FloatingSelectOption>
              <FloatingSelectOption value="Transactional">Transactional</FloatingSelectOption>
              <FloatingSelectOption value="Mixed">Mixed</FloatingSelectOption>
            </FloatingSelect>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Check
              type="checkbox"
              id="protect-overwriting"
              label={
                <span className="d-flex align-items-center gap-2">
                  <Lock size={14} />
                  Protect from Overwriting
                </span>
              }
              checked={protectFromOverwriting}
              onChange={(e) => setProtectFromOverwriting(e.target.checked)}
              disabled={isSubmitting}
            />
          </Col>
          <Col md={6}>
            <Form.Check
              type="checkbox"
              id="protect-sharing"
              label={
                <span className="d-flex align-items-center gap-2">
                  <Lock size={14} />
                  Protect from Sharing
                </span>
              }
              checked={protectFromSharing}
              onChange={(e) => setProtectFromSharing(e.target.checked)}
              disabled={isSubmitting}
            />
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          SAVE AS A DRAFT ONLY
        </Button>
        <Button
          variant="success"
          onClick={handleSave}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'PUBLISHING...' : 'PUBLISH'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
