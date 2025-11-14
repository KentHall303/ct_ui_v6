import React from 'react';
import { BodyLayout } from '../../components/layout/BodyLayout/BodyLayout';
import { Button } from '../../components/bootstrap/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/bootstrap/Table';
import { Plus, Copy } from 'lucide-react';
import { formatDateTime } from '../../utils/dateUtils';
import { AddEmailTemplateModal } from '../../components/modals/AddEmailTemplateModal';
import { emailTemplateService } from '../../services/emailTemplateService';
import { EmailTemplate } from '../../lib/supabase';

const EmailTemplates = (): JSX.Element => {
  const [templates, setTemplates] = React.useState<EmailTemplate[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [duplicating, setDuplicating] = React.useState<string | null>(null);
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>({ key: 'updated_at', direction: 'desc' });
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [editingTemplate, setEditingTemplate] = React.useState<EmailTemplate | null>(null);

  React.useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await emailTemplateService.getAll();
      setTemplates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load templates');
      console.error('Error loading templates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setShowAddModal(true);
  };

  const handleDuplicateTemplate = async (template: EmailTemplate) => {
    try {
      setDuplicating(template.id);
      await emailTemplateService.duplicate(template.id);
      await loadTemplates();
    } catch (err) {
      console.error('Error duplicating template:', err);
      alert('Failed to duplicate template. Please try again.');
    } finally {
      setDuplicating(null);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingTemplate(null);
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

  const sortedTemplates = React.useMemo(() => {
    if (!sortConfig) return templates;

    return [...templates].sort((a, b) => {
      let aVal = a[sortConfig.key as keyof EmailTemplate];
      let bVal = b[sortConfig.key as keyof EmailTemplate];

      if (sortConfig.key === 'updated_at' || sortConfig.key === 'created_at') {
        const aTime = aVal ? new Date(aVal as string).getTime() : 0;
        const bTime = bVal ? new Date(bVal as string).getTime() : 0;
        return sortConfig.direction === 'asc' ? aTime - bTime : bTime - aTime;
      }

      const aStr = String(aVal || '').toLowerCase();
      const bStr = String(bVal || '').toLowerCase();

      if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [templates, sortConfig]);

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

  if (loading) {
    return (
      <div className="d-flex flex-column w-100 h-100 align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading templates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column w-100 h-100 align-items-center justify-content-center">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
        <button className="btn btn-primary" onClick={loadTemplates}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column w-100 h-100">
      <div className="px-3 pt-3 flex-shrink-0">
        <div className="bg-white rounded-3 pt-3 pb-3 px-4 border shadow-sm">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="h2 fw-bold text-dark mb-0">Email Templates</h2>
            <Button
              variant="success"
              className="rounded-pill d-flex align-items-center gap-2"
              title="Add new template"
              onClick={() => {
                console.log('Add new button clicked');
                setShowAddModal(true);
              }}
            >
              <Plus size={16} />
              <span>Add New</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-3 pt-3 pb-3 flex-fill" style={{ minHeight: 0, overflow: 'hidden' }}>
        <div
          className="bg-white rounded-3 border shadow-sm h-100"
          style={{ overflow: 'auto' }}
        >
          <Table className="standard-table mb-0">
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
                  style={{ width: '60%' }}
                >
                  Name{getSortIcon('name')}
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('updated_at')}
                  aria-label={`Sort by last updated ${sortConfig?.key === 'updated_at' ? sortConfig.direction : 'ascending'}`}
                  style={{ width: '30%' }}
                >
                  Last Updated{getSortIcon('updated_at')}
                </TableHead>
                <TableHead scope="col" style={{ textAlign: 'center', width: '10%' }}>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTemplates.map((template, index) => (
                <TableRow
                  key={template.id}
                  role="row"
                  aria-rowindex={index + 2}
                >
                  <TableCell role="gridcell">
                    <div
                      className="text-dark"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '0.9375rem'
                      }}
                      title={template.name}
                    >
                      {template.name}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="text-dark" style={{ fontSize: '0.9375rem' }}>
                      {formatDateTime(template.updated_at)}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-link p-0 border rounded-circle d-flex align-items-center justify-content-center"
                        title="Edit template"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderColor: '#dee2e6',
                          color: '#6c757d',
                          backgroundColor: 'white'
                        }}
                        onClick={() => handleEditTemplate(template)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                      </button>
                      <button
                        className="btn btn-link p-0 border rounded-circle d-flex align-items-center justify-content-center"
                        title="Duplicate template"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderColor: '#dee2e6',
                          color: '#6c757d',
                          backgroundColor: 'white',
                          opacity: duplicating === template.id ? 0.5 : 1
                        }}
                        onClick={() => handleDuplicateTemplate(template)}
                        disabled={duplicating === template.id}
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddEmailTemplateModal
        show={showAddModal}
        onHide={handleCloseModal}
        template={editingTemplate}
        onSave={loadTemplates}
      />
    </div>
  );
};

export const EmailTemplatesPage: React.FC = (): JSX.Element => {
  return (
    <BodyLayout>
      <EmailTemplates />
    </BodyLayout>
  );
};
