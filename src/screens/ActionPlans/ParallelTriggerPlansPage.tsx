import React from 'react';
import { BodyLayout } from '../../components/layout/BodyLayout/BodyLayout';
import { Button } from '../../components/bootstrap/Button';
import { Table, TableBody, TableRow, TableCell } from '../../components/bootstrap/Table';
import { ResizableTableHead } from '../../components/bootstrap/ResizableTableHead';
import { useResizableColumns, ColumnConfig } from '../../hooks/useResizableColumns';
import { TruncatedTagList } from '../../components/bootstrap/TruncatedTagList';
import { Plus, Copy, ChevronDown, ChevronRight, Landmark, LibraryBig, ChevronUp } from 'lucide-react';
import { Collapse } from 'react-bootstrap';
import { AddConnectionPlanModal } from '../../components/modals/AddConnectionPlanModal';
import { connectionPlanService } from '../../services/connectionPlanService';
import { ConnectionPlan } from '../../lib/supabase';
import { formatDateTime } from '../../utils/dateUtils';

const ParallelTriggerPlans = (): JSX.Element => {
  const [plans, setPlans] = React.useState<ConnectionPlan[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [duplicating, setDuplicating] = React.useState<string | null>(null);
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>({ key: 'updated_at', direction: 'desc' });
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [editingPlan, setEditingPlan] = React.useState<ConnectionPlan | null>(null);
  const [showInfo, setShowInfo] = React.useState(() => {
    const saved = localStorage.getItem('parallelTriggerPlansInfoVisible');
    return saved !== null ? saved === 'true' : true;
  });

  const columns: ColumnConfig[] = [
    { id: 'icon', label: '', defaultWidth: 60, minWidth: 50 },
    { id: 'name', label: 'Name', defaultWidth: 200, minWidth: 120 },
    { id: 'contact_types', label: 'Contact Types', defaultWidth: 150, minWidth: 100 },
    { id: 'next_plan', label: 'Next Plan', defaultWidth: 180, minWidth: 120 },
    { id: 'lead_sources', label: 'Lead Source', defaultWidth: 180, minWidth: 120 },
    { id: 'specific_date', label: 'Specific Date', defaultWidth: 140, minWidth: 100 },
    { id: 'plan_id', label: 'Plan Id', defaultWidth: 120, minWidth: 80 },
    { id: 'count', label: 'Count', defaultWidth: 100, minWidth: 80 },
    { id: 'action', label: 'Action', defaultWidth: 100, minWidth: 90 },
  ];

  const {
    columnWidths,
    isResizing,
    resizingColumn,
    handleMouseDown,
  } = useResizableColumns(columns, 'parallelTriggerPlansColumns');

  React.useEffect(() => {
    loadPlans();
  }, []);

  const toggleInfo = () => {
    setShowInfo((prev) => {
      const newValue = !prev;
      localStorage.setItem('parallelTriggerPlansInfoVisible', String(newValue));
      return newValue;
    });
  };

  const loadPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await connectionPlanService.getByPlanType('Parallel Trigger Plans');
      setPlans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load parallel trigger plans');
      console.error('Error loading parallel trigger plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPlan = (plan: ConnectionPlan) => {
    setEditingPlan(plan);
    setShowAddModal(true);
  };

  const handleDuplicatePlan = async (plan: ConnectionPlan) => {
    try {
      setDuplicating(plan.id);
      await connectionPlanService.duplicate(plan.id);
      await loadPlans();
    } catch (err) {
      console.error('Error duplicating parallel trigger plan:', err);
      alert('Failed to duplicate parallel trigger plan. Please try again.');
    } finally {
      setDuplicating(null);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingPlan(null);
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

  const sortedPlans = React.useMemo(() => {
    if (!sortConfig) return plans;

    return [...plans].sort((a, b) => {
      let aVal = a[sortConfig.key as keyof ConnectionPlan];
      let bVal = b[sortConfig.key as keyof ConnectionPlan];

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
  }, [plans, sortConfig]);

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
        <p className="mt-3 text-muted">Loading parallel trigger plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column w-100 h-100 align-items-center justify-content-center">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
        <button className="btn btn-primary" onClick={loadPlans}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column w-100 h-100">
      <div className="px-3 pt-3 flex-shrink-0">
        <div className={`bg-white rounded-3 pt-3 px-4 border shadow-sm ${showInfo ? 'pb-4' : 'pb-3'}`}>
          <div className="d-flex align-items-start justify-content-between">
            <div className="flex-grow-1" style={{ maxWidth: 'calc(100% - 140px)' }}>
              <div className="d-flex align-items-center gap-2 mb-1">
                <h2 className="h4 fw-bold text-dark mb-0">Parallel Trigger Plans</h2>
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
                    ID: 1610
                  </div>
                  <p className="text-secondary mb-2" style={{ fontSize: '0.9375rem', lineHeight: '1.5' }}>
                    Parallel Trigger Plans enable multi-channel outreach by triggering simultaneous
                    communications across email, SMS, and phone calls. These plans are ideal for
                    high-priority or time-sensitive scenarios requiring immediate response.
                  </p>
                  <a
                    href="https://support.clienttether.com/action-plans/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                    style={{ fontSize: '0.9375rem', textDecoration: 'none' }}
                  >
                    More info
                  </a>
                </div>
              </Collapse>
            </div>
            <Button
              variant="success"
              size="sm"
              className="rounded-pill d-flex align-items-center gap-2 flex-shrink-0"
              style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              title="Add new parallel trigger plan"
              onClick={() => {
                setShowAddModal(true);
              }}
            >
              <Plus size={14} />
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
          <Table className={`standard-table table-striped mb-0 ${isResizing ? 'resizing' : ''}`}>
            <caption className="visually-hidden">
              Parallel trigger plans table showing {plans.length} records.
              Use arrow keys to navigate, Enter or Space to sort columns.
              {sortConfig && ` Currently sorted by ${sortConfig.key} in ${sortConfig.direction}ending order.`}
            </caption>
            <ResizableTableHead
              columns={columns}
              columnWidths={columnWidths}
              isResizing={isResizing}
              resizingColumn={resizingColumn}
              onResizeStart={handleMouseDown}
              sortConfig={sortConfig}
              onSort={handleSort}
              getSortIcon={getSortIcon}
            />
            <TableBody>
              {sortedPlans.map((plan, index) => (
                <TableRow
                  key={plan.id}
                  role="row"
                  aria-rowindex={index + 2}
                >
                  <TableCell role="gridcell" style={{ width: `${columnWidths.icon}px` }}>
                    <div className="d-flex align-items-center justify-content-center">
                      <span
                        className={`badge rounded-circle d-flex align-items-center justify-content-center ${
                          plan.build_pending_domino ? 'badge-domino-bg' : 'badge-traditional-bg'
                        }`}
                        style={{
                          width: '20px',
                          height: '20px',
                          padding: '3px',
                          flexShrink: 0
                        }}
                        title={plan.build_pending_domino ? 'Domino' : 'Traditional'}
                        aria-label={plan.build_pending_domino ? 'Domino method' : 'Traditional method'}
                      >
                        {plan.build_pending_domino ? (
                          <LibraryBig size={12} color="#6c757d" />
                        ) : (
                          <Landmark size={12} color="#6c757d" />
                        )}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell role="gridcell" style={{ width: `${columnWidths.name}px` }}>
                    <div
                      className="text-dark"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '0.8125rem'
                      }}
                      title={plan.name}
                    >
                      {plan.name}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell" style={{ width: `${columnWidths.contact_types}px`, overflow: 'hidden' }}>
                    <TruncatedTagList
                      value={plan.contact_types}
                      defaultText="All"
                      maxWidth={columnWidths.contact_types - 20}
                    />
                  </TableCell>

                  <TableCell role="gridcell" style={{ width: `${columnWidths.next_plan}px` }}>
                    <div className="text-dark" style={{ fontSize: '0.8125rem' }}>
                      {plan.next_plan || ''}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell" style={{ width: `${columnWidths.lead_sources}px`, overflow: 'hidden' }}>
                    <TruncatedTagList
                      value={plan.lead_sources}
                      defaultText=""
                      maxWidth={columnWidths.lead_sources - 20}
                    />
                  </TableCell>

                  <TableCell role="gridcell" style={{ width: `${columnWidths.specific_date}px` }}>
                    <div className="text-dark" style={{ fontSize: '0.8125rem' }}>
                      {plan.specific_date ? formatDateTime(plan.specific_date) : ''}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell" style={{ width: `${columnWidths.plan_id}px` }}>
                    <div className="text-dark" style={{ fontSize: '0.8125rem' }}>
                      {plan.plan_id || '-1'}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell" style={{ width: `${columnWidths.count}px` }}>
                    <div className="text-dark" style={{ fontSize: '0.8125rem' }}>
                      {plan.count}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell" style={{ width: `${columnWidths.action}px` }}>
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-link p-0 border rounded-circle d-flex align-items-center justify-content-center"
                        title="Edit parallel trigger plan"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderColor: '#dee2e6',
                          color: '#6c757d',
                          backgroundColor: 'white'
                        }}
                        onClick={() => handleEditPlan(plan)}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                      </button>
                      <button
                        className="btn btn-link p-0 border rounded-circle d-flex align-items-center justify-content-center"
                        title="Duplicate parallel trigger plan"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderColor: '#dee2e6',
                          color: '#6c757d',
                          backgroundColor: 'white',
                          opacity: duplicating === plan.id ? 0.5 : 1
                        }}
                        onClick={() => handleDuplicatePlan(plan)}
                        disabled={duplicating === plan.id}
                      >
                        <Copy size={12} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddConnectionPlanModal
        show={showAddModal}
        onHide={handleCloseModal}
        plan={editingPlan}
        onSave={loadPlans}
      />
    </div>
  );
};

export const ParallelTriggerPlansPage: React.FC = (): JSX.Element => {
  return (
    <BodyLayout>
      <ParallelTriggerPlans />
    </BodyLayout>
  );
};
