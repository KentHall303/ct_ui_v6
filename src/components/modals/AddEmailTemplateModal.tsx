import React, { useState } from 'react';
import { Modal, Form, Row, Col } from 'react-bootstrap';
import { Button } from '../bootstrap/Button';

interface AddEmailTemplateModalProps {
  show: boolean;
  onHide: () => void;
}

export const AddEmailTemplateModal: React.FC<AddEmailTemplateModalProps> = ({
  show,
  onHide
}) => {
  console.log('AddEmailTemplateModal rendered with show:', show);

  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [additionalEmails, setAdditionalEmails] = useState('');
  const [bcc, setBcc] = useState('');
  const [selectedToken, setSelectedToken] = useState('Contact ID');
  const [contactType, setContactType] = useState('All');
  const [protectFromOverwriting, setProtectFromOverwriting] = useState(false);
  const [protectFromSharing, setProtectFromSharing] = useState(false);
  const [excludeClient, setExcludeClient] = useState(false);
  const [description, setDescription] = useState('');
  const [activeEditorTab, setActiveEditorTab] = useState<'sun' | 'block' | 'raw'>('block');
  const [contentTcpa, setContentTcpa] = useState('Promotional');

  const handleSaveTemplate = () => {
    console.log('Save Template clicked', {
      subject,
      name,
      additionalEmails,
      bcc,
      selectedToken,
      contactType,
      protectFromOverwriting,
      protectFromSharing,
      excludeClient,
      description,
      contentTcpa
    });
  };

  const handleSaveAsDraft = () => {
    console.log('Save as Draft clicked');
  };

  const handlePublish = () => {
    console.log('Publish clicked');
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
          Add Email Template
        </Modal.Title>
        <Button
          variant="success"
          onClick={handleSaveTemplate}
          className="ms-auto me-3"
          style={{
            backgroundColor: '#28a745',
            border: 'none',
            padding: '8px 24px',
            fontSize: '0.875rem',
            fontWeight: 500
          }}
        >
          SAVE TEMPLATE
        </Button>
      </Modal.Header>
      <Modal.Body className="pt-3 pb-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="d-flex flex-column gap-3">
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-medium">Subject</Form.Label>
                <Form.Control
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Add subject here..."
                  style={{ fontSize: '0.875rem' }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-medium">Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Add name here..."
                  style={{ fontSize: '0.875rem' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-medium">Add'l Emails</Form.Label>
                <Form.Control
                  type="text"
                  value={additionalEmails}
                  onChange={(e) => setAdditionalEmails(e.target.value)}
                  placeholder="Add Email..."
                  style={{ fontSize: '0.875rem' }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-medium">Select Token</Form.Label>
                <div className="d-flex align-items-center gap-2">
                  <Form.Select
                    value={selectedToken}
                    onChange={(e) => setSelectedToken(e.target.value)}
                    style={{ fontSize: '0.875rem' }}
                  >
                    <option>Contact ID</option>
                    <option>Contact Name</option>
                    <option>Contact Email</option>
                    <option>Contact Phone</option>
                  </Form.Select>
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style={{ width: '32px', height: '32px', minWidth: '32px', cursor: 'not-allowed' }}
                    title="Clear selection"
                  >
                    <span style={{ fontSize: '1rem', color: '#6c757d' }}>×</span>
                  </div>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-medium">BCC</Form.Label>
                <Form.Control
                  type="text"
                  value={bcc}
                  onChange={(e) => setBcc(e.target.value)}
                  placeholder="Add BCC Email"
                  style={{ fontSize: '0.875rem' }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-medium">Contact Type</Form.Label>
                <div className="d-flex align-items-center gap-2">
                  <Form.Select
                    value={contactType}
                    onChange={(e) => setContactType(e.target.value)}
                    style={{ fontSize: '0.875rem' }}
                  >
                    <option>All</option>
                    <option>Client</option>
                    <option>Vendor</option>
                    <option>Employee</option>
                  </Form.Select>
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style={{ width: '32px', height: '32px', minWidth: '32px', cursor: 'not-allowed' }}
                    title="Clear selection"
                  >
                    <span style={{ fontSize: '1rem', color: '#6c757d' }}>×</span>
                  </div>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <div className="d-flex align-items-center gap-4">
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

                <div className="d-flex align-items-center gap-2 ms-auto">
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
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </Col>
          </Row>

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
              style={{ cursor: 'pointer' }}
            >
              Exclude Client
            </Form.Label>
          </Form.Group>

          <div>
            <Form.Label className="small fw-medium">Description</Form.Label>
            <div className="border rounded" style={{ minHeight: '300px' }}>
              <div className="border-bottom d-flex align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
                <button
                  type="button"
                  className={`btn border-0 px-3 py-2 small ${activeEditorTab === 'sun' ? 'fw-bold' : ''}`}
                  style={{
                    borderRadius: 0,
                    backgroundColor: activeEditorTab === 'sun' ? 'white' : 'transparent',
                    borderBottom: activeEditorTab === 'sun' ? '2px solid #0d6efd' : 'none'
                  }}
                  onClick={() => setActiveEditorTab('sun')}
                >
                  SUN EDITOR
                </button>
                <button
                  type="button"
                  className={`btn border-0 px-3 py-2 small ${activeEditorTab === 'block' ? 'fw-bold' : ''}`}
                  style={{
                    borderRadius: 0,
                    backgroundColor: activeEditorTab === 'block' ? 'white' : 'transparent',
                    borderBottom: activeEditorTab === 'block' ? '2px solid #0d6efd' : 'none'
                  }}
                  onClick={() => setActiveEditorTab('block')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-1">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  BLOCK EDITOR
                </button>
                <button
                  type="button"
                  className={`btn border-0 px-3 py-2 small ${activeEditorTab === 'raw' ? 'fw-bold' : ''}`}
                  style={{
                    borderRadius: 0,
                    backgroundColor: activeEditorTab === 'raw' ? 'white' : 'transparent',
                    borderBottom: activeEditorTab === 'raw' ? '2px solid #0d6efd' : 'none'
                  }}
                  onClick={() => setActiveEditorTab('raw')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-1">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  RAW HTML
                </button>
              </div>

              <div className="p-3" style={{ minHeight: '250px', backgroundColor: 'white' }}>
                {activeEditorTab === 'block' && (
                  <div>
                    <div className="d-flex gap-2 mb-3 pb-2 border-bottom">
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
                        title="Align right"
                        style={{ width: '36px', height: '36px' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="21" y1="10" x2="7" y2="10"></line>
                          <line x1="21" y1="6" x2="3" y2="6"></line>
                          <line x1="21" y1="14" x2="3" y2="14"></line>
                          <line x1="21" y1="18" x2="7" y2="18"></line>
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="btn btn-light border p-2"
                        title="Justify"
                        style={{ width: '36px', height: '36px' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="21" y1="10" x2="3" y2="10"></line>
                          <line x1="21" y1="6" x2="3" y2="6"></line>
                          <line x1="21" y1="14" x2="3" y2="14"></line>
                          <line x1="21" y1="18" x2="3" y2="18"></line>
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
                    </div>
                    <div
                      className="border rounded p-3"
                      style={{
                        minHeight: '150px',
                        backgroundColor: '#f8f9fa',
                        cursor: 'text'
                      }}
                      contentEditable
                      suppressContentEditableWarning
                    >
                      {description}
                    </div>
                  </div>
                )}
                {activeEditorTab === 'sun' && (
                  <div className="text-muted text-center py-5">
                    SUN EDITOR content area
                  </div>
                )}
                {activeEditorTab === 'raw' && (
                  <Form.Control
                    as="textarea"
                    rows={8}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter HTML code..."
                    style={{ fontFamily: 'monospace', fontSize: '0.875rem', resize: 'none' }}
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <Form.Label className="small fw-medium mb-2">Preview</Form.Label>
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
            <div className="mt-2 text-center small text-muted">
              Publish Content
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex align-items-center gap-2">
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="contentTcpaDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ fontSize: '0.875rem', padding: '6px 16px' }}
                >
                  CONTENT TCPA
                </button>
                <ul className="dropdown-menu" aria-labelledby="contentTcpaDropdown">
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => setContentTcpa('Promotional')}
                    >
                      Promotional
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => setContentTcpa('Transactional')}
                    >
                      Transactional
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => setContentTcpa('Mixed')}
                    >
                      Mixed
                    </button>
                  </li>
                </ul>
              </div>
              <span className="small text-muted">Selected: {contentTcpa}</span>
            </div>

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
      </Modal.Body>
    </Modal>
  );
};
