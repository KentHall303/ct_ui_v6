import React from 'react';
import { BodyLayout } from '../../components/layout/BodyLayout/BodyLayout';
import { Button } from '../../components/bootstrap/Button';
import { Table, TableBody, TableRow, TableCell } from '../../components/bootstrap/Table';
import { ResizableTableHead } from '../../components/bootstrap/ResizableTableHead';
import { useResizableColumns, ColumnConfig } from '../../hooks/useResizableColumns';
import { TruncatedTagList } from '../../components/bootstrap/TruncatedTagList';
import { Plus, Copy, Edit2, Trash2, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapse } from 'react-bootstrap';
import { formatDateTime } from '../../utils/dateUtils';

interface SampleDataItem {
  id: string;
  name: string;
  category: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Archived';
  tags: string[];
  count: number;
  priority: 'High' | 'Medium' | 'Low';
  created_at: string;
  updated_at: string;
}

const sampleData: SampleDataItem[] = [
  {
    id: '1',
    name: 'Premium Service Package',
    category: 'Services',
    status: 'Active',
    tags: ['Premium', 'Featured', 'Popular'],
    count: 45,
    priority: 'High',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-03-20T14:45:00Z',
  },
  {
    id: '2',
    name: 'Standard Maintenance Plan',
    category: 'Maintenance',
    status: 'Active',
    tags: ['Standard', 'Monthly'],
    count: 128,
    priority: 'Medium',
    created_at: '2024-01-20T09:15:00Z',
    updated_at: '2024-03-18T11:20:00Z',
  },
  {
    id: '3',
    name: 'Emergency Repair Service',
    category: 'Services',
    status: 'Active',
    tags: ['Emergency', '24/7', 'Priority'],
    count: 23,
    priority: 'High',
    created_at: '2024-02-01T08:00:00Z',
    updated_at: '2024-03-19T16:30:00Z',
  },
  {
    id: '4',
    name: 'Basic Consultation',
    category: 'Consultation',
    status: 'Pending',
    tags: ['Basic', 'Introductory'],
    count: 67,
    priority: 'Low',
    created_at: '2024-02-10T13:45:00Z',
    updated_at: '2024-03-15T10:00:00Z',
  },
  {
    id: '5',
    name: 'Annual Inspection Package',
    category: 'Inspection',
    status: 'Active',
    tags: ['Annual', 'Comprehensive', 'Required'],
    count: 89,
    priority: 'High',
    created_at: '2024-01-05T07:30:00Z',
    updated_at: '2024-03-22T09:15:00Z',
  },
  {
    id: '6',
    name: 'Seasonal Tune-Up',
    category: 'Maintenance',
    status: 'Inactive',
    tags: ['Seasonal', 'Optional'],
    count: 34,
    priority: 'Low',
    created_at: '2024-01-25T11:00:00Z',
    updated_at: '2024-02-28T15:45:00Z',
  },
  {
    id: '7',
    name: 'Extended Warranty Service',
    category: 'Warranty',
    status: 'Active',
    tags: ['Extended', 'Premium', 'Protection'],
    count: 156,
    priority: 'Medium',
    created_at: '2024-01-18T14:20:00Z',
    updated_at: '2024-03-21T13:10:00Z',
  },
  {
    id: '8',
    name: 'Legacy Support Plan',
    category: 'Support',
    status: 'Archived',
    tags: ['Legacy', 'Deprecated'],
    count: 12,
    priority: 'Low',
    created_at: '2023-12-10T16:00:00Z',
    updated_at: '2024-01-05T09:30:00Z',
  },
];

export const TableStandardsPage: React.FC = () => {
  const [data, setData] = React.useState<SampleDataItem[]>(sampleData);
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>({ key: 'updated_at', direction: 'desc' });
  const [showInfo, setShowInfo] = React.useState(() => {
    const saved = localStorage.getItem('tableStandardsInfoVisible');
    return saved !== null ? saved === 'true' : true;
  });
  const [showDocumentation, setShowDocumentation] = React.useState(false);

  const columns: ColumnConfig[] = [
    { id: 'icon', label: '', defaultWidth: 60, minWidth: 50 },
    { id: 'name', label: 'Name', defaultWidth: 250, minWidth: 150 },
    { id: 'category', label: 'Category', defaultWidth: 140, minWidth: 100 },
    { id: 'status', label: 'Status', defaultWidth: 120, minWidth: 100 },
    { id: 'tags', label: 'Tags', defaultWidth: 200, minWidth: 120 },
    { id: 'count', label: 'Count', defaultWidth: 100, minWidth: 80 },
    { id: 'priority', label: 'Priority', defaultWidth: 110, minWidth: 90 },
    { id: 'updated_at', label: 'Last Updated', defaultWidth: 180, minWidth: 140 },
    { id: 'actions', label: 'Actions', defaultWidth: 140, minWidth: 120 },
  ];

  const {
    columnWidths,
    isResizing,
    resizingColumn,
    handleMouseDown,
  } = useResizableColumns(columns, 'tableStandardsColumns');

  const toggleInfo = () => {
    setShowInfo((prev) => {
      const newValue = !prev;
      localStorage.setItem('tableStandardsInfoVisible', String(newValue));
      return newValue;
    });
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
      return sortConfig.direction === 'asc' ? (
        <ChevronUp size={14} style={{ marginLeft: '8px' }} />
      ) : (
        <ChevronDown size={14} style={{ marginLeft: '8px' }} />
      );
    }
    return <ChevronUp size={14} style={{ marginLeft: '8px', opacity: 0.3 }} />;
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      let aVal = a[sortConfig.key as keyof SampleDataItem];
      let bVal = b[sortConfig.key as keyof SampleDataItem];

      if (sortConfig.key === 'updated_at' || sortConfig.key === 'created_at') {
        const aTime = aVal ? new Date(aVal as string).getTime() : 0;
        const bTime = bVal ? new Date(bVal as string).getTime() : 0;
        return sortConfig.direction === 'asc' ? aTime - bTime : bTime - aTime;
      }

      if (sortConfig.key === 'count') {
        const aNum = Number(aVal) || 0;
        const bNum = Number(bVal) || 0;
        return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
      }

      const aStr = String(aVal || '').toLowerCase();
      const bStr = String(bVal || '').toLowerCase();

      if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

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

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'badge bg-success';
      case 'Inactive':
        return 'badge bg-secondary';
      case 'Pending':
        return 'badge bg-warning text-dark';
      case 'Archived':
        return 'badge bg-dark';
      default:
        return 'badge bg-secondary';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'badge bg-danger';
      case 'Medium':
        return 'badge bg-info';
      case 'Low':
        return 'badge bg-light text-dark';
      default:
        return 'badge bg-secondary';
    }
  };

  const handleEdit = (item: SampleDataItem) => {
    console.log('Edit item:', item);
    alert(`Edit: ${item.name}`);
  };

  const handleDuplicate = (item: SampleDataItem) => {
    console.log('Duplicate item:', item);
    alert(`Duplicate: ${item.name}`);
  };

  const handleDelete = (item: SampleDataItem) => {
    console.log('Delete item:', item);
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      setData(prev => prev.filter(d => d.id !== item.id));
    }
  };

  const handleAddNew = () => {
    console.log('Add new item');
    alert('Add New Item - This would open a modal');
  };

  return (
    <BodyLayout>
      <div className="d-flex flex-column w-100 h-100">
        {/* Header Card */}
        <div className="px-3 pt-3 flex-shrink-0">
          <div className={`bg-white rounded-3 pt-3 px-4 border shadow-sm ${showInfo ? 'pb-4' : 'pb-3'}`}>
            <div className="d-flex align-items-start justify-content-between">
              <div className="flex-grow-1" style={{ maxWidth: 'calc(100% - 140px)' }}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h2 className="h4 fw-bold text-dark mb-0">Table Standards</h2>
                  <button
                    onClick={toggleInfo}
                    className="btn btn-link p-0 text-secondary border-0"
                    style={{
                      background: 'none',
                      fontSize: '1rem',
                      lineHeight: 1,
                      marginTop: '2px'
                    }}
                    title={showInfo ? 'Hide information' : 'Show information'}
                    aria-label={showInfo ? 'Hide information' : 'Show information'}
                  >
                    {showInfo ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </button>
                </div>
                <Collapse in={showInfo}>
                  <div>
                    <div className="text-muted mb-3" style={{ fontSize: '0.875rem' }}>
                      Reference ID: TABLE-STD-001
                    </div>
                    <p className="text-secondary mb-2" style={{ fontSize: '0.9375rem', lineHeight: '1.5' }}>
                      This page demonstrates the standard table implementation pattern used throughout the application.
                      Features include sortable columns, resizable widths, tag displays, status badges, action buttons,
                      and proper accessibility support. Use this as a reference when creating new tables.
                    </p>
                    <button
                      onClick={() => setShowDocumentation(!showDocumentation)}
                      className="btn btn-link p-0 text-primary"
                      style={{ fontSize: '0.9375rem', textDecoration: 'none' }}
                    >
                      {showDocumentation ? 'Hide' : 'Show'} Implementation Details
                    </button>
                  </div>
                </Collapse>
              </div>
              <Button
                variant="success"
                size="sm"
                className="rounded-pill d-flex align-items-center gap-2 flex-shrink-0"
                style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                title="Add new item"
                onClick={handleAddNew}
              >
                <Plus size={14} />
                <span>Add New</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Documentation Section */}
        {showDocumentation && (
          <div className="px-3 pt-3 flex-shrink-0">
            <div className="bg-light rounded-3 p-4 border">
              <h3 className="h5 fw-bold text-dark mb-3">Implementation Guide</h3>

              <div className="mb-4">
                <h4 className="h6 fw-semibold text-dark mb-2">Key Features:</h4>
                <ul className="text-secondary" style={{ fontSize: '0.9rem' }}>
                  <li><strong>Resizable Columns:</strong> Users can drag column borders to adjust widths. Widths persist in localStorage.</li>
                  <li><strong>Sortable Headers:</strong> Click column headers to sort ascending/descending. Icons indicate sort direction.</li>
                  <li><strong>Tag Display:</strong> Uses TruncatedTagList component to show tags with overflow handling.</li>
                  <li><strong>Status Badges:</strong> Color-coded badges for status and priority fields.</li>
                  <li><strong>Action Buttons:</strong> Edit, duplicate, and delete actions with icon buttons.</li>
                  <li><strong>Collapsible Header:</strong> Information section can be collapsed, state persists in localStorage.</li>
                  <li><strong>Accessibility:</strong> Proper ARIA labels, keyboard navigation, and screen reader support.</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="h6 fw-semibold text-dark mb-2">Required Imports:</h4>
                <pre className="bg-white p-3 rounded border" style={{ fontSize: '0.85rem', overflowX: 'auto' }}>
{`import { Table, TableBody, TableRow, TableCell } from '../../components/bootstrap/Table';
import { ResizableTableHead } from '../../components/bootstrap/ResizableTableHead';
import { useResizableColumns, ColumnConfig } from '../../hooks/useResizableColumns';
import { TruncatedTagList } from '../../components/bootstrap/TruncatedTagList';
import { Button } from '../../components/bootstrap/Button';`}
                </pre>
              </div>

              <div className="mb-4">
                <h4 className="h6 fw-semibold text-dark mb-2">Column Configuration:</h4>
                <pre className="bg-white p-3 rounded border" style={{ fontSize: '0.85rem', overflowX: 'auto' }}>
{`const columns: ColumnConfig[] = [
  { id: 'name', label: 'Name', defaultWidth: 250, minWidth: 150 },
  { id: 'status', label: 'Status', defaultWidth: 120, minWidth: 100 },
  // ... more columns
];

const { columnWidths, handleMouseDown } = useResizableColumns(
  columns,
  'uniqueStorageKey'
);`}
                </pre>
              </div>

              <div>
                <h4 className="h6 fw-semibold text-dark mb-2">Best Practices:</h4>
                <ul className="text-secondary" style={{ fontSize: '0.9rem' }}>
                  <li>Always provide unique localStorage keys for column widths</li>
                  <li>Include proper ARIA labels for accessibility</li>
                  <li>Use consistent badge colors for status indicators</li>
                  <li>Implement keyboard navigation for sortable headers</li>
                  <li>Add loading and error states for async data</li>
                  <li>Keep action buttons consistent across tables</li>
                  <li>Use TruncatedTagList for arrays of tags or labels</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Table Container */}
        <div className="px-3 pt-3 pb-3 flex-fill" style={{ minHeight: 0, overflow: 'hidden' }}>
          <div className="bg-white rounded-3 border shadow-sm h-100 d-flex flex-column" style={{ overflow: 'hidden' }}>
            <div className="flex-fill" style={{ overflow: 'auto' }}>
              <Table>
                <ResizableTableHead
                  columns={columns}
                  columnWidths={columnWidths}
                  onResizeStart={handleMouseDown}
                  isResizing={isResizing}
                  resizingColumn={resizingColumn}
                  renderHeaderContent={(column) => {
                    if (column.id === 'icon') return null;
                    if (column.id === 'actions') return 'Actions';

                    return (
                      <div {...getSortProps(column.id)}>
                        {column.label}
                        {getSortIcon(column.id)}
                      </div>
                    );
                  }}
                />
                <TableBody>
                  {sortedData.map((item, index) => (
                    <TableRow key={item.id} aria-rowindex={index + 2}>
                      <TableCell style={{ width: columnWidths.icon }}>
                        <div
                          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                          style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}
                        >
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                      </TableCell>
                      <TableCell style={{ width: columnWidths.name }}>
                        <div className="fw-semibold text-dark">{item.name}</div>
                      </TableCell>
                      <TableCell style={{ width: columnWidths.category }}>
                        <span className="text-secondary">{item.category}</span>
                      </TableCell>
                      <TableCell style={{ width: columnWidths.status }}>
                        <span className={getStatusBadgeClass(item.status)}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell style={{ width: columnWidths.tags }}>
                        <TruncatedTagList tags={item.tags} maxVisible={2} />
                      </TableCell>
                      <TableCell style={{ width: columnWidths.count }}>
                        <span className="fw-medium text-dark">{item.count}</span>
                      </TableCell>
                      <TableCell style={{ width: columnWidths.priority }}>
                        <span className={getPriorityBadgeClass(item.priority)}>
                          {item.priority}
                        </span>
                      </TableCell>
                      <TableCell style={{ width: columnWidths.updated_at }}>
                        <span className="text-muted" style={{ fontSize: '0.875rem' }}>
                          {formatDateTime(item.updated_at)}
                        </span>
                      </TableCell>
                      <TableCell style={{ width: columnWidths.actions }}>
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="btn btn-sm btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '32px', height: '32px', padding: 0 }}
                            title="Edit"
                            aria-label={`Edit ${item.name}`}
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDuplicate(item)}
                            className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '32px', height: '32px', padding: 0 }}
                            title="Duplicate"
                            aria-label={`Duplicate ${item.name}`}
                          >
                            <Copy size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '32px', height: '32px', padding: 0 }}
                            title="Delete"
                            aria-label={`Delete ${item.name}`}
                          >
                            <Trash2 size={14} />
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
      </div>
    </BodyLayout>
  );
};
