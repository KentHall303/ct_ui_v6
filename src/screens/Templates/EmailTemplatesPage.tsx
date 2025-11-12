import React from 'react';
import { BodyLayout } from '../../components/layout/BodyLayout/BodyLayout';
import { Button } from '../../components/bootstrap/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/bootstrap/Table';
import { Plus } from 'lucide-react';
import { emailTemplateService } from '../../services/emailTemplateService';
import { EmailTemplate } from '../../lib/supabase';
import { AddEmailTemplateModal } from '../../components/modals/AddEmailTemplateModal';

type EmailTemplateDisplay = {
  id: string;
  name: string;
  subject: string;
  contactType: string;
  excludeClient: boolean;
};

const EmailTemplates = (): JSX.Element => {
  const [templates, setTemplates] = React.useState<EmailTemplateDisplay[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>({ key: 'name', direction: 'asc' });

  const fetchTemplates = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await emailTemplateService.getAll();
      const displayTemplates: EmailTemplateDisplay[] = data.map(template => ({
        id: template.id,
        name: template.name,
        subject: template.subject,
        contactType: template.contact_type,
        excludeClient: template.exclude_client
      }));
      setTemplates(displayTemplates);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load templates');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleAddSuccess = () => {
    fetchTemplates();
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
      let aVal = a[sortConfig.key as keyof EmailTemplateDisplay];
      let bVal = b[sortConfig.key as keyof EmailTemplateDisplay];

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

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
      <div className="d-flex flex-column w-100">
        <div className="px-3 pt-4 pb-3">
          <h2 className="h2 fw-bold text-dark text-uppercase m-0 text-center" style={{ letterSpacing: '0.1em' }}>
            EMAIL TEMPLATES
          </h2>
        </div>
        <div className="px-3 pt-3 text-center">
          <p>Loading templates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column w-100">
        <div className="px-3 pt-4 pb-3">
          <h2 className="h2 fw-bold text-dark text-uppercase m-0 text-center" style={{ letterSpacing: '0.1em' }}>
            EMAIL TEMPLATES
          </h2>
        </div>
        <div className="px-3 pt-3 text-center">
          <p className="text-danger">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column w-100">
      <div className="px-3 pt-4 pb-3">
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="link"
            className="d-flex align-items-center gap-2 text-decoration-none p-0 border-0"
            title="Add new template"
            style={{ fontSize: '0.875rem' }}
            onClick={() => setShowAddModal(true)}
          >
            <div
              className="rounded-circle bg-success d-flex align-items-center justify-content-center"
              style={{ width: '32px', height: '32px' }}
            >
              <Plus size={16} className="text-white" />
            </div>
            <span className="text-dark fw-medium">Add new</span>
          </Button>
          <h2 className="h2 fw-bold text-dark text-uppercase m-0 flex-grow-1 text-center" style={{ letterSpacing: '0.1em' }}>
            EMAIL TEMPLATES
          </h2>
          <div style={{ width: '100px' }}></div>
        </div>
      </div>

      <div className="px-3 pt-3">
        <div
          className="bg-white rounded-3 overflow-auto border shadow-sm"
          style={{ maxHeight: '500px' }}
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
                    {...getSortProps('contactType')}
                    aria-label={`Sort by contact type ${sortConfig?.key === 'contactType' ? sortConfig.direction : 'ascending'}`}
                  >
                    Contact Type{getSortIcon('contactType')}
                  </TableHead>
                  <TableHead
                    scope="col"
                    {...getSortProps('excludeClient')}
                    aria-label={`Sort by exclude client ${sortConfig?.key === 'excludeClient' ? sortConfig.direction : 'ascending'}`}
                  >
                    Exclude Client{getSortIcon('excludeClient')}
                  </TableHead>
                  <TableHead scope="col">
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
                      <div className="text-dark small">{template.name}</div>
                    </TableCell>

                    <TableCell role="gridcell">
                      <div className="text-dark small">{template.subject}</div>
                    </TableCell>

                    <TableCell role="gridcell">
                      <div className="text-dark small">{template.contactType}</div>
                    </TableCell>

                    <TableCell role="gridcell">
                      <div className="d-flex justify-content-center">
                        <input
                          type="checkbox"
                          checked={template.excludeClient}
                          readOnly
                          className="form-check-input"
                          style={{ cursor: 'default' }}
                        />
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
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                          </svg>
                        </button>
                        <button
                          className="btn btn-link p-0 border rounded-circle d-flex align-items-center justify-content-center"
                          title="Copy template"
                          style={{
                            width: '32px',
                            height: '32px',
                            borderColor: '#dee2e6',
                            color: '#6c757d',
                            backgroundColor: 'white'
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                          </svg>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <AddEmailTemplateModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
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
