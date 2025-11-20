import React from 'react';
import { BodyLayout } from '../../components/layout/BodyLayout/BodyLayout';
import { Button } from '../../components/bootstrap/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/bootstrap/Table';
import { Plus, Copy, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapse } from 'react-bootstrap';
import { AddConnectionPlanModal } from '../../components/modals/AddConnectionPlanModal';
import { connectionPlanService } from '../../services/connectionPlanService';
import { ConnectionPlan } from '../../lib/supabase';
import { formatDateTime } from '../../utils/dateUtils';

const ConnectionPlans = (): JSX.Element => {
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
    const saved = localStorage.getItem('connectionPlansInfoVisible');
    return saved !== null ? saved === 'true' : true;
  });

  React.useEffect(() => {
    loadPlans();
  }, []);

  const toggleInfo = () => {
    setShowInfo((prev) => {
      const newValue = !prev;
      localStorage.setItem('connectionPlansInfoVisible', String(newValue));
      return newValue;
    });
  };

  const loadPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await connectionPlanService.getAll();
      setPlans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load connection plans');
      console.error('Error loading connection plans:', err);
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
      console.error('Error duplicating connection plan:', err);
      alert('Failed to duplicate connection plan. Please try again.');
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
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return ' ▲';
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
        <p className="mt-3 text-muted">Loading connection plans...</p>
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
                <h2 className="h2 fw-bold text-dark mb-0">Connection Plans</h2>
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
                    ID: 1605
                  </div>
                  <p className="text-secondary mb-2" style={{ fontSize: '0.9375rem', lineHeight: '1.5' }}>
                    Connection Plans support the "Speed to Lead" process via short-term,
                    automated communications, typically have a Lead Source attached and can
                    flow to a Retention Plan for continued long-term outreach in instances where
                    the lead does not engage.
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
              className="rounded-pill d-flex align-items-center gap-2 flex-shrink-0"
              title="Add new connection plan"
              onClick={() => {
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
          <Table className="standard-table table-striped mb-0">
            <caption className="visually-hidden">
              Connection plans table showing {plans.length} records.
              Use arrow keys to navigate, Enter or Space to sort columns.
              {sortConfig && ` Currently sorted by ${sortConfig.key} in ${sortConfig.direction}ending order.`}
            </caption>
            <TableHeader>
              <TableRow>
                <TableHead
                  scope="col"
                  {...getSortProps('name')}
                  aria-label={`Sort by name ${sortConfig?.key === 'name' ? sortConfig.direction : 'ascending'}`}
                  style={{ width: '20%' }}
                >
                  Name{getSortIcon('name')}
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('contact_types')}
                  aria-label={`Sort by contact types ${sortConfig?.key === 'contact_types' ? sortConfig.direction : 'ascending'}`}
                  style={{ width: '12%' }}
                >
                  Contact Types{getSortIcon('contact_types')}
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('next_plan')}
                  aria-label={`Sort by next plan ${sortConfig?.key === 'next_plan' ? sortConfig.direction : 'ascending'}`}
                  style={{ width: '15%' }}
                >
                  Next Plan
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('lead_sources')}
                  aria-label={`Sort by lead source ${sortConfig?.key === 'lead_sources' ? sortConfig.direction : 'ascending'}`}
                  style={{ width: '15%' }}
                >
                  Lead Source
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('specific_date')}
                  aria-label={`Sort by specific date ${sortConfig?.key === 'specific_date' ? sortConfig.direction : 'ascending'}`}
                  style={{ width: '12%' }}
                >
                  Specific Date
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('plan_id')}
                  aria-label={`Sort by plan id ${sortConfig?.key === 'plan_id' ? sortConfig.direction : 'ascending'}`}
                  style={{ width: '10%' }}
                >
                  Plan Id
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('count')}
                  aria-label={`Sort by count ${sortConfig?.key === 'count' ? sortConfig.direction : 'ascending'}`}
                  style={{ width: '8%' }}
                >
                  Count
                </TableHead>
                <TableHead scope="col" style={{ textAlign: 'center', width: '8%' }}>
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPlans.map((plan, index) => (
                <TableRow
                  key={plan.id}
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
                      title={plan.name}
                    >
                      {plan.name}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="text-dark" style={{ fontSize: '0.9375rem' }}>
                      {plan.contact_types || 'All'}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="text-dark" style={{ fontSize: '0.9375rem' }}>
                      {plan.next_plan || ''}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="text-dark" style={{ fontSize: '0.9375rem' }}>
                      {plan.lead_sources || ''}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="text-dark" style={{ fontSize: '0.9375rem' }}>
                      {plan.specific_date ? formatDateTime(plan.specific_date) : ''}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="text-dark" style={{ fontSize: '0.9375rem' }}>
                      {plan.plan_id || '-1'}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="text-dark" style={{ fontSize: '0.9375rem' }}>
                      {plan.count}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-link p-0 border rounded-circle d-flex align-items-center justify-content-center"
                        title="Edit connection plan"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderColor: '#dee2e6',
                          color: '#6c757d',
                          backgroundColor: 'white'
                        }}
                        onClick={() => handleEditPlan(plan)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                      </button>
                      <button
                        className="btn btn-link p-0 border rounded-circle d-flex align-items-center justify-content-center"
                        title="Duplicate connection plan"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderColor: '#dee2e6',
                          color: '#6c757d',
                          backgroundColor: 'white',
                          opacity: duplicating === plan.id ? 0.5 : 1
                        }}
                        onClick={() => handleDuplicatePlan(plan)}
                        disabled={duplicating === plan.id}
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

      <AddConnectionPlanModal
        show={showAddModal}
        onHide={handleCloseModal}
        plan={editingPlan}
        onSave={loadPlans}
      />
    </div>
  );
};

export const ConnectionPlansPage: React.FC = (): JSX.Element => {
  return (
    <BodyLayout>
      <ConnectionPlans />
    </BodyLayout>
  );
};
