import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form, Row, Col } from 'react-bootstrap';
import { Button } from '../bootstrap/Button';
import { FloatingInput, FloatingSelect, FloatingSelectOption } from '../bootstrap/FormControls';
import { TokenDropdown } from '../bootstrap/TokenDropdown';
import { TaskTemplate } from '../../lib/supabase';
import { taskTemplateService } from '../../services/taskTemplateService';

interface AddTaskTemplateModalProps {
  show: boolean;
  onHide: () => void;
  template?: TaskTemplate | null;
  onSave?: () => void;
}

export const AddTaskTemplateModal: React.FC<AddTaskTemplateModalProps> = ({
  show,
  onHide,
  template = null,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [dueInDays, setDueInDays] = useState<number>(0);
  const [assigneeType, setAssigneeType] = useState<'account_owner' | 'assigned_user' | 'specific_user'>('assigned_user');
  const [priority, setPriority] = useState('');
  const [selectedToken, setSelectedToken] = useState('Contact ID');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const isEditMode = !!template;

  useEffect(() => {
    if (show && template) {
      setTitle(template.title || '');
      setDetail(template.detail || '');
      setDueInDays(template.due_in_days || 0);
      setAssigneeType(template.assignee_type || 'assigned_user');
      setPriority(template.priority || '');
      setSelectedToken(template.select_token || 'Contact ID');
    } else if (show && !template) {
      setTitle('');
      setDetail('');
      setDueInDays(0);
      setAssigneeType('assigned_user');
      setPriority('');
      setSelectedToken('Contact ID');
    }
  }, [show, template]);

  const handleSaveTemplate = async () => {
    try {
      setErrors([]);
      setSaving(true);

      const validationErrors: string[] = [];

      if (!title.trim()) {
        validationErrors.push('Title is required');
      }

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      const templateData: Partial<TaskTemplate> = {
        name: title.trim(),
        title: title.trim(),
        detail: detail.trim() || '',
        due_in_days: dueInDays,
        assignee_type: assigneeType,
        priority: priority.trim() || '',
        select_token: selectedToken,
      };

      if (isEditMode && template) {
        await taskTemplateService.update(template.id, templateData);
      } else {
        await taskTemplateService.create(templateData);
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

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title style={{ fontSize: '1.5rem', fontWeight: 400 }}>
          {isEditMode ? 'Edit Task Template' : 'Add Task Template'}
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
            <Col md={12}>
              <TokenDropdown
                label="Select Token"
                value={selectedToken}
                onChange={(value) => setSelectedToken(value)}
                placeholder="Select a token..."
              />
            </Col>
          </Row>

          <Row className="g-3">
            <Col md={12}>
              <FloatingInput
                label="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add title here..."
              />
            </Col>
          </Row>

          <Row className="g-3">
            <Col md={12}>
              <div className="form-floating-compact">
                <label className="mb-2">Detail:</label>
                <div>
                  <div className="d-flex gap-2 mb-2 pb-2 border-bottom flex-wrap">
                    <FloatingSelect
                      label="Font"
                      value="Arial"
                      onChange={() => {}}
                      style={{ width: '120px', fontSize: '0.875rem' }}
                    >
                      <FloatingSelectOption value="Arial">Arial</FloatingSelectOption>
                      <FloatingSelectOption value="Times New Roman">Times New Roman</FloatingSelectOption>
                      <FloatingSelectOption value="Courier New">Courier New</FloatingSelectOption>
                    </FloatingSelect>

                    <FloatingSelect
                      label="Size"
                      value="12"
                      onChange={() => {}}
                      style={{ width: '80px', fontSize: '0.875rem' }}
                    >
                      <FloatingSelectOption value="10">10</FloatingSelectOption>
                      <FloatingSelectOption value="12">12</FloatingSelectOption>
                      <FloatingSelectOption value="14">14</FloatingSelectOption>
                      <FloatingSelectOption value="16">16</FloatingSelectOption>
                    </FloatingSelect>

                    <FloatingSelect
                      label="Formats"
                      value="Normal"
                      onChange={() => {}}
                      style={{ width: '100px', fontSize: '0.875rem' }}
                    >
                      <FloatingSelectOption value="Normal">Normal</FloatingSelectOption>
                      <FloatingSelectOption value="Heading 1">Heading 1</FloatingSelectOption>
                      <FloatingSelectOption value="Heading 2">Heading 2</FloatingSelectOption>
                    </FloatingSelect>

                    <button
                      type="button"
                      className="btn btn-light border p-2"
                      title="Bold"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <strong>B</strong>
                    </button>

                    <button
                      type="button"
                      className="btn btn-light border p-2"
                      title="Underline"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <u>U</u>
                    </button>

                    <button
                      type="button"
                      className="btn btn-light border p-2"
                      title="Italic"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <i>I</i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-light border p-2"
                      title="Strikethrough"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <s>S</s>
                    </button>

                    <button
                      type="button"
                      className="btn btn-light border p-2"
                      title="Text Color"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 20h16"></path>
                        <path d="M12 4v12"></path>
                        <path d="M8 8l4-4 4 4"></path>
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="btn btn-light border p-2"
                      title="Font Size"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <strong>A</strong>
                    </button>

                    <button
                      type="button"
                      className="btn btn-light border p-2"
                      title="Align Left"
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
                      title="Align Center"
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
                      title="Align Right"
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
                      title="Horizontal Line"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="btn btn-light border p-2"
                      title="Bullet List"
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
                      title="Table"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="3" y1="15" x2="21" y2="15"></line>
                        <line x1="12" y1="3" x2="12" y2="21"></line>
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
                      title="Quote"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="btn btn-light border p-2"
                      title="Image"
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
                      title="Video"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="btn btn-light border p-2"
                      title="Fullscreen"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="btn btn-light border p-2"
                      title="Code"
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
                      minHeight: '200px',
                      backgroundColor: '#f8f9fa',
                      cursor: 'text'
                    }}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={(e) => setDetail(e.currentTarget.textContent || '')}
                    dangerouslySetInnerHTML={{ __html: detail }}
                  >
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="g-3">
            <Col md={12}>
              <FloatingInput
                label="Due In 'X' Days"
                type="number"
                value={dueInDays.toString()}
                onChange={(e) => setDueInDays(parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </Col>
          </Row>

          <Row className="g-3">
            <Col md={12}>
              <div className="form-floating-compact">
                <label className="mb-4">Assignee:</label>
                <div className="d-flex gap-4">
                  <Form.Group className="d-flex align-items-center gap-2 mb-0">
                    <Form.Check
                      type="radio"
                      id="assignee-account-owner"
                      name="assignee"
                      checked={assigneeType === 'account_owner'}
                      onChange={() => setAssigneeType('account_owner')}
                      style={{ cursor: 'pointer' }}
                    />
                    <Form.Label
                      htmlFor="assignee-account-owner"
                      className="mb-0"
                      style={{ cursor: 'pointer' }}
                    >
                      Account Owner
                    </Form.Label>
                  </Form.Group>

                  <Form.Group className="d-flex align-items-center gap-2 mb-0">
                    <Form.Check
                      type="radio"
                      id="assignee-assigned-user"
                      name="assignee"
                      checked={assigneeType === 'assigned_user'}
                      onChange={() => setAssigneeType('assigned_user')}
                      style={{ cursor: 'pointer' }}
                    />
                    <Form.Label
                      htmlFor="assignee-assigned-user"
                      className="mb-0"
                      style={{ cursor: 'pointer' }}
                    >
                      Assigned User
                    </Form.Label>
                  </Form.Group>

                  <Form.Group className="d-flex align-items-center gap-2 mb-0">
                    <Form.Check
                      type="radio"
                      id="assignee-specific-user"
                      name="assignee"
                      checked={assigneeType === 'specific_user'}
                      onChange={() => setAssigneeType('specific_user')}
                      style={{ cursor: 'pointer' }}
                    />
                    <Form.Label
                      htmlFor="assignee-specific-user"
                      className="mb-0"
                      style={{ cursor: 'pointer' }}
                    >
                      Specific User
                    </Form.Label>
                  </Form.Group>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="g-3">
            <Col md={12}>
              <FloatingInput
                label="Priority"
                type="text"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                placeholder="Add priority here..."
              />
            </Col>
          </Row>

          <Row className="g-3">
            <Col md={12} className="d-flex justify-content-end">
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
                {saving ? 'SAVING...' : 'SAVE TASK'}
              </Button>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};
