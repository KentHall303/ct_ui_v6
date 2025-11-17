import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { Button } from '../bootstrap/Button';
import { FloatingInput } from '../bootstrap/FormControls';
import { NotesLogsTemplate } from '../../lib/supabase';
import { notesLogsTemplateService } from '../../services/notesLogsTemplateService';

interface AddNotesLogsTemplateModalProps {
  show: boolean;
  onHide: () => void;
  template?: NotesLogsTemplate | null;
  onSave?: () => void;
}

export const AddNotesLogsTemplateModal: React.FC<AddNotesLogsTemplateModalProps> = ({
  show,
  onHide,
  template = null,
  onSave
}) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const isEditMode = !!template;

  useEffect(() => {
    if (show && template) {
      setName(template.name || '');
      setContent(template.content || '');
    } else if (show && !template) {
      setName('');
      setContent('');
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

      const templateData: Partial<NotesLogsTemplate> = {
        name: name.trim(),
        content: content || '',
      };

      if (isEditMode && template) {
        await notesLogsTemplateService.update(template.id, templateData);
      } else {
        await notesLogsTemplateService.create(templateData);
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

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    execCommand('fontName', e.target.value);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    execCommand('fontSize', e.target.value);
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    execCommand('formatBlock', e.target.value);
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
          {isEditMode ? 'EDIT NOTES/LOGS TEMPLATE' : 'ADD NOTES/LOGS TEMPLATE'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3 pb-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="d-flex flex-column gap-3">
          {error && (
            <div className="alert alert-danger mb-0" role="alert">
              {error}
            </div>
          )}

          <div>
            <FloatingInput
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Add name here..."
            />
          </div>

          <div>
            <div className="border rounded" style={{ backgroundColor: '#fff' }}>
              <div className="d-flex gap-2 p-2 border-bottom flex-wrap" style={{ backgroundColor: '#f8f9fa' }}>
                <select
                  className="form-select form-select-sm"
                  onChange={handleFontChange}
                  style={{ width: 'auto', fontSize: '0.875rem' }}
                  defaultValue=""
                >
                  <option value="">Font</option>
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                </select>

                <select
                  className="form-select form-select-sm"
                  onChange={handleSizeChange}
                  style={{ width: 'auto', fontSize: '0.875rem' }}
                  defaultValue=""
                >
                  <option value="">Size</option>
                  <option value="1">Small</option>
                  <option value="3">Normal</option>
                  <option value="5">Large</option>
                  <option value="7">Huge</option>
                </select>

                <select
                  className="form-select form-select-sm"
                  onChange={handleFormatChange}
                  style={{ width: 'auto', fontSize: '0.875rem' }}
                  defaultValue=""
                >
                  <option value="">Formats</option>
                  <option value="p">Paragraph</option>
                  <option value="h1">Heading 1</option>
                  <option value="h2">Heading 2</option>
                  <option value="h3">Heading 3</option>
                  <option value="pre">Preformatted</option>
                </select>

                <button
                  type="button"
                  className="btn btn-light border btn-sm"
                  onClick={() => execCommand('bold')}
                  title="Bold"
                  style={{ padding: '4px 8px' }}
                >
                  <strong>B</strong>
                </button>

                <button
                  type="button"
                  className="btn btn-light border btn-sm"
                  onClick={() => execCommand('underline')}
                  title="Underline"
                  style={{ padding: '4px 8px' }}
                >
                  <u>U</u>
                </button>

                <button
                  type="button"
                  className="btn btn-light border btn-sm"
                  onClick={() => execCommand('italic')}
                  title="Italic"
                  style={{ padding: '4px 8px' }}
                >
                  <em>I</em>
                </button>

                <button
                  type="button"
                  className="btn btn-light border btn-sm"
                  onClick={() => execCommand('strikeThrough')}
                  title="Strikethrough"
                  style={{ padding: '4px 8px' }}
                >
                  <s>S</s>
                </button>

                <button
                  type="button"
                  className="btn btn-light border btn-sm"
                  onClick={() => {
                    const color = prompt('Enter color (hex or name):');
                    if (color) execCommand('foreColor', color);
                  }}
                  title="Text Color"
                  style={{ padding: '4px 8px' }}
                >
                  <span style={{ color: '#333' }}>A</span>
                </button>

                <button
                  type="button"
                  className="btn btn-light border btn-sm"
                  onClick={() => {
                    const color = prompt('Enter background color (hex or name):');
                    if (color) execCommand('backColor', color);
                  }}
                  title="Background Color"
                  style={{ padding: '4px 8px' }}
                >
                  <span style={{ background: '#ffeb3b', padding: '0 4px' }}>A</span>
                </button>

                <button
                  type="button"
                  className="btn btn-light border btn-sm"
                  onClick={() => execCommand('justifyLeft')}
                  title="Align Left"
                  style={{ padding: '4px 8px' }}
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
                  className="btn btn-light border btn-sm"
                  onClick={() => execCommand('justifyCenter')}
                  title="Align Center"
                  style={{ padding: '4px 8px' }}
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
                  className="btn btn-light border btn-sm"
                  onClick={() => execCommand('justifyRight')}
                  title="Align Right"
                  style={{ padding: '4px 8px' }}
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
                  className="btn btn-light border btn-sm"
                  onClick={() => execCommand('justifyFull')}
                  title="Justify"
                  style={{ padding: '4px 8px' }}
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
                  className="btn btn-light border btn-sm"
                  onClick={() => execCommand('insertUnorderedList')}
                  title="Bullet List"
                  style={{ padding: '4px 8px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>

                <button
                  type="button"
                  className="btn btn-light border btn-sm"
                  onClick={() => execCommand('insertOrderedList')}
                  title="Numbered List"
                  style={{ padding: '4px 8px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="10" y1="6" x2="21" y2="6"></line>
                    <line x1="10" y1="12" x2="21" y2="12"></line>
                    <line x1="10" y1="18" x2="21" y2="18"></line>
                    <path d="M4 6h1v4"></path>
                    <path d="M4 10h2"></path>
                    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
                  </svg>
                </button>

                <button
                  type="button"
                  className="btn btn-light border btn-sm"
                  onClick={() => {
                    const url = prompt('Enter link URL:');
                    if (url) execCommand('createLink', url);
                  }}
                  title="Insert Link"
                  style={{ padding: '4px 8px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </button>

                <button
                  type="button"
                  className="btn btn-light border btn-sm"
                  onClick={() => {
                    const url = prompt('Enter image URL:');
                    if (url) execCommand('insertImage', url);
                  }}
                  title="Insert Image"
                  style={{ padding: '4px 8px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </button>

                <button
                  type="button"
                  className="btn btn-light border btn-sm"
                  onClick={() => {
                    const rows = prompt('Number of rows:', '3');
                    const cols = prompt('Number of columns:', '3');
                    if (rows && cols) {
                      let table = '<table border="1" style="border-collapse: collapse; width: 100%;"><tbody>';
                      for (let i = 0; i < parseInt(rows); i++) {
                        table += '<tr>';
                        for (let j = 0; j < parseInt(cols); j++) {
                          table += '<td style="padding: 8px; border: 1px solid #ddd;">&nbsp;</td>';
                        }
                        table += '</tr>';
                      }
                      table += '</tbody></table>';
                      execCommand('insertHTML', table);
                    }
                  }}
                  title="Insert Table"
                  style={{ padding: '4px 8px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="3" y1="15" x2="21" y2="15"></line>
                    <line x1="12" y1="3" x2="12" y2="21"></line>
                  </svg>
                </button>

                <button
                  type="button"
                  className="btn btn-light border btn-sm"
                  onClick={() => execCommand('formatBlock', 'blockquote')}
                  title="Quote"
                  style={{ padding: '4px 8px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </button>

                <button
                  type="button"
                  className="btn btn-light border btn-sm"
                  onClick={() => execCommand('formatBlock', 'pre')}
                  title="Code"
                  style={{ padding: '4px 8px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </button>
              </div>

              <div
                ref={editorRef}
                className="p-3"
                style={{
                  minHeight: '300px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  cursor: 'text',
                  backgroundColor: '#fff'
                }}
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setContent(e.currentTarget.innerHTML)}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-2">
            <Button
              variant="info"
              style={{
                backgroundColor: '#17a2b8',
                border: 'none',
                padding: '8px 24px',
                fontSize: '0.875rem',
                fontWeight: 500
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
              Add Files
            </Button>

            <Button
              variant="danger"
              style={{
                backgroundColor: '#dc3545',
                border: 'none',
                padding: '8px 24px',
                fontSize: '0.875rem',
                fontWeight: 500
              }}
            >
              Delete
            </Button>

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
        </div>
      </Modal.Body>
    </Modal>
  );
};
