import React from 'react';
import { BodyLayout } from '../../components/layout/BodyLayout/BodyLayout';
import { Button } from '../../components/bootstrap/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/bootstrap/Table';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { emailTemplateService } from '../../services/emailTemplateService';
import { EmailTemplate } from '../../lib/supabase';
import { Modal } from 'react-bootstrap';
import { FloatingInput, FloatingSelect, FloatingSelectOption } from '../../components/bootstrap/FormControls';

const EmailTemplates = (): JSX.Element => {
  const [templates, setTemplates] = React.useState<EmailTemplate[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>({ key: 'name', direction: 'asc' });
  const [showModal, setShowModal] = React.useState(false);
  const [editingTemplate, setEditingTemplate] = React.useState<EmailTemplate | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [deletingTemplate, setDeletingTemplate] = React.useState<EmailTemplate | null>(null);

  const [formData, setFormData] = React.useState({
    name: '',
    subject: '',
    contact_type: 'All',
    exclude_client: false,
    content: '',
  });

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = React.useState<number | null>(null);

  React.useEffect(() => {
    loadTemplates();
  }, []);

  React.useLayoutEffect(() => {
    function computeHeight() {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const h = Math.max(200, Math.floor(vh - rect.top - 16));
      setMaxHeight(h);
    }
    computeHeight();
    window.addEventListener('resize', computeHeight);
    return () => window.removeEventListener('resize', computeHeight);
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const data = await emailTemplateService.getAll();
      setTemplates(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return ' ▲';
  };

  const getSortProps = (key: string) => ({
    'aria-sort': sortConfig?.key === key
      ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending')
      : 'none' as const,
    onClick: () => handleSort(key),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSort(key);
      }
    },
    tabIndex: 0,
    role: 'button',
    style: { cursor: 'pointer' }
  });

  const sortedTemplates = React.useMemo(() => {
    if (!sortConfig) return templates;

    return [...templates].sort((a, b) => {
      const aVal = a[sortConfig.key as keyof EmailTemplate];
      const bVal = b[sortConfig.key as keyof EmailTemplate];

      const aStr = String(aVal || '').toLowerCase();
      const bStr = String(bVal || '').toLowerCase();

      if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [templates, sortConfig]);

  const handleAddNew = () => {
    setEditingTemplate(null);
    setFormData({
      name: '',
      subject: '',
      contact_type: 'All',
      exclude_client: false,
      content: '',
    });
    setShowModal(true);
  };

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      subject: template.subject || '',
      contact_type: template.contact_type || 'All',
      exclude_client: template.exclude_client,
      content: template.content,
    });
    setShowModal(true);
  };

  const handleDelete = (template: EmailTemplate) => {
    setDeletingTemplate(template);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deletingTemplate) return;

    try {
      await emailTemplateService.delete(deletingTemplate.id);
      await loadTemplates();
      setShowDeleteConfirm(false);
      setDeletingTemplate(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete template');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingTemplate) {
        await emailTemplateService.update(editingTemplate.id, formData);
      } else {
        await emailTemplateService.create(formData);
      }
      await loadTemplates();
      setShowModal(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save template');
    }
  };

  return (
    <>
      <div className="d-flex flex-column w-100 h-100">
        <div className="px-3 pt-4 pb-3">
          <div className="d-flex flex-column align-items-center gap-3">
            <h1 className="h2 fw-bold text-dark text-uppercase m-0" style={{ letterSpacing: '0.1em' }}>
              EMAIL TEMPLATES
            </h1>
            <Button
              variant="success"
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px', padding: 0 }}
              onClick={handleAddNew}
              title="Add new template"
            >
              <Plus size={20} />
            </Button>
          </div>
        </div>

        <div className="px-3 pt-3">
          <div
            ref={scrollRef}
            className="bg-white rounded-3 overflow-auto border shadow-sm"
            style={{ maxHeight: maxHeight ?? undefined }}
          >
            <div style={{ minWidth: '1000px' }}>
              <Table className="standard-table position-relative">
                <caption className="visually-hidden">
                  Email templates table showing {templates.length} records.
                  Use arrow keys to navigate, Enter or Space to sort columns.
                  {sortConfig && ` Currently sorted by ${sortConfig.key} in ${sortConfig.direction}ending order.`}
                </caption>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      scope="col"
                      {...getSortProps('name')}
                      aria-label={`Sort by name ${sortConfig?.key === 'name' ? sortConfig.direction : 'ascending'}`}
                    >
                      Name{getSortIcon('name')}
                    </TableHead>
                    <TableHead
                      scope="col"
                      {...getSortProps('subject')}
                      aria-label={`Sort by subject ${sortConfig?.key === 'subject' ? sortConfig.direction : 'ascending'}`}
                    >
                      Subject{getSortIcon('subject')}
                    </TableHead>
                    <TableHead
                      scope="col"
                      {...getSortProps('contact_type')}
                      aria-label={`Sort by contact type ${sortConfig?.key === 'contact_type' ? sortConfig.direction : 'ascending'}`}
                    >
                      Contact Type{getSortIcon('contact_type')}
                    </TableHead>
                    <TableHead
                      scope="col"
                      {...getSortProps('exclude_client')}
                      aria-label={`Sort by exclude client ${sortConfig?.key === 'exclude_client' ? sortConfig.direction : 'ascending'}`}
                    >
                      Exclude Client{getSortIcon('exclude_client')}
                    </TableHead>
                    <TableHead scope="col">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        Loading templates...
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-danger">
                        {error}
                      </TableCell>
                    </TableRow>
                  ) : sortedTemplates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No email templates found. Click "Add new" to create one.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedTemplates.map((template, index) => (
                      <TableRow key={template.id} role="row" aria-rowindex={index + 2}>
                        <TableCell role="gridcell">
                          <div className="text-dark">{template.name}</div>
                        </TableCell>
                        <TableCell role="gridcell">
                          <div className="text-dark">{template.subject || ''}</div>
                        </TableCell>
                        <TableCell role="gridcell">
                          <div className="text-dark">{template.contact_type || 'All'}</div>
                        </TableCell>
                        <TableCell role="gridcell">
                          <div className="d-flex justify-content-center">
                            <input
                              type="checkbox"
                              checked={template.exclude_client}
                              readOnly
                              className="form-check-input"
                              style={{ cursor: 'default' }}
                            />
                          </div>
                        </TableCell>
                        <TableCell role="gridcell">
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-link p-0 text-primary"
                              onClick={() => handleEdit(template)}
                              title="Edit template"
                              style={{ border: 'none', background: 'none' }}
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              className="btn btn-link p-0 text-danger"
                              onClick={() => handleDelete(template)}
                              title="Delete template"
                              style={{ border: 'none', background: 'none' }}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingTemplate ? 'Edit' : 'Add'} Email Template</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="mb-3">
              <FloatingInput
                label="Template Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <FloatingInput
                label="Email Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <FloatingSelect
                label="Contact Type"
                value={formData.contact_type}
                onChange={(e) => setFormData({ ...formData, contact_type: e.target.value })}
              >
                <FloatingSelectOption value="All">All</FloatingSelectOption>
                <FloatingSelectOption value="Client">Client</FloatingSelectOption>
                <FloatingSelectOption value="Employee">Employee</FloatingSelectOption>
                <FloatingSelectOption value="Partner">Partner</FloatingSelectOption>
                <FloatingSelectOption value="Vendor">Vendor</FloatingSelectOption>
              </FloatingSelect>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="excludeClient"
                checked={formData.exclude_client}
                onChange={(e) => setFormData({ ...formData, exclude_client: e.target.checked })}
              />
              <label className="form-check-label" htmlFor="excludeClient">
                Exclude Client
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Template Content</label>
              <textarea
                id="content"
                className="form-control"
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingTemplate ? 'Update' : 'Create'} Template
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the template "{deletingTemplate?.name}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const EmailTemplatesPage: React.FC = (): JSX.Element => {
  return (
    <BodyLayout>
      <EmailTemplates />
    </BodyLayout>
  );
};
