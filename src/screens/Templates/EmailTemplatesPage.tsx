import React from 'react';
import { BodyLayout } from '../../components/layout/BodyLayout/BodyLayout';
import { Button } from '../../components/bootstrap/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/bootstrap/Table';
import { Plus } from 'lucide-react';
import { AddEmailTemplateModal } from '../../components/modals/AddEmailTemplateModal';

type EmailTemplateDisplay = {
  id: string;
  name: string;
  contactType: string;
};

const placeholderTemplates: EmailTemplateDisplay[] = [
  {
    id: '1',
    name: 'I please provide missing Data',
    contactType: 'All'
  },
  {
    id: '2',
    name: '{{client.firstName}} signature process as promised',
    contactType: 'All'
  },
  {
    id: '3',
    name: 'I please provide missing Data',
    contactType: 'All'
  },
  {
    id: '4',
    name: '{{client.firstName}} signature process as promised',
    contactType: 'All'
  },
  {
    id: '5',
    name: 'I please provide missing Data',
    contactType: 'All'
  },
  {
    id: '6',
    name: '{{client.firstName}} signature process as promised',
    contactType: 'All'
  },
  {
    id: '7',
    name: 'I please provide missing Data',
    contactType: 'All'
  },
  {
    id: '8',
    name: '{{client.firstName}} signature process as promised',
    contactType: 'All'
  },
  {
    id: '9',
    name: 'I please provide missing Data',
    contactType: 'All'
  },
  {
    id: '10',
    name: '{{client.firstName}} signature process as promised',
    contactType: 'All'
  },
  {
    id: '11',
    name: 'I please provide missing Data',
    contactType: 'All'
  }
];

const EmailTemplates = (): JSX.Element => {
  const [templates] = React.useState<EmailTemplateDisplay[]>(placeholderTemplates);
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>({ key: 'name', direction: 'asc' });
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [editingTemplate, setEditingTemplate] = React.useState<EmailTemplateDisplay | null>(null);

  React.useEffect(() => {
    console.log('EmailTemplates: showAddModal changed to:', showAddModal);
  }, [showAddModal]);

  const handleEditTemplate = (template: EmailTemplateDisplay) => {
    setEditingTemplate(template);
    setShowAddModal(true);
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

      <div className="px-3 pt-3 pb-3 flex-fill d-flex flex-column" style={{ minHeight: 0 }}>
        <div
          className="bg-white rounded-3 border shadow-sm d-flex flex-column h-100"
          style={{ overflow: 'hidden' }}
        >
          <Table className="standard-table position-relative mb-0 h-100 d-flex flex-column">
            <caption className="visually-hidden">
              Email templates table showing {templates.length} records.
              Use arrow keys to navigate, Enter or Space to sort columns.
              {sortConfig && ` Currently sorted by ${sortConfig.key} in ${sortConfig.direction}ending order.`}
            </caption>
            <TableHeader className="flex-shrink-0">
              <TableRow>
                <TableHead
                  scope="col"
                  {...getSortProps('name')}
                  aria-label={`Sort by name ${sortConfig?.key === 'name' ? sortConfig.direction : 'ascending'}`}
                  style={{ width: '50%' }}
                >
                  Name{getSortIcon('name')}
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('contactType')}
                  aria-label={`Sort by contact type ${sortConfig?.key === 'contactType' ? sortConfig.direction : 'ascending'}`}
                  style={{ width: '30%' }}
                >
                  Contact Type{getSortIcon('contactType')}
                </TableHead>
                <TableHead scope="col" style={{ width: '20%', textAlign: 'center' }}>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="flex-fill" style={{ overflow: 'auto' }}>
              {sortedTemplates.map((template, index) => (
                <TableRow
                  key={template.id}
                  role="row"
                  aria-rowindex={index + 2}
                >
                  <TableCell role="gridcell" style={{ width: '50%', maxWidth: '50%' }}>
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

                  <TableCell role="gridcell" style={{ width: '30%', maxWidth: '30%' }}>
                    <div className="text-dark" style={{ fontSize: '0.9375rem' }}>{template.contactType}</div>
                  </TableCell>

                  <TableCell role="gridcell" style={{ width: '20%', maxWidth: '20%' }}>
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

      <AddEmailTemplateModal
        show={showAddModal}
        onHide={handleCloseModal}
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
