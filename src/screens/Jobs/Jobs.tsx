import React from "react";
import { Button } from "../../components/bootstrap/Button";
import { FloatingInput, FloatingSelect, FloatingSelectOption } from "../../components/bootstrap/FormControls";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/bootstrap/Table";
import { Badge, Card, Container, Row, Col, ButtonGroup, Button as BSButton, Form } from "react-bootstrap";
import { Search as SearchIcon, RefreshCw as RefreshCwIcon, Settings as SettingsIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, ChevronsLeft as ChevronsLeftIcon, ChevronsRight as ChevronsRightIcon, Plus as PlusIcon, Minus as MinusIcon, Mail as MailIcon, MessageSquare as MessageSquareIcon, FileText as FileTextIcon, Printer as PrinterIcon, Download as DownloadIcon, CreditCard as EditIcon, Trash as TrashIcon, User as UserIcon, DollarSign as DollarSignIcon, Calendar as CalendarIcon, TrendingUp as TrendingUpIcon, List as ListIcon, Calendar as CalendarIconView, Receipt as ReceiptIcon, Eye as EyeIcon } from "lucide-react";
import { AddCOGSModal } from "../../components/modals/AddCOGSModal";
import { GrossMarginModal } from "../../components/modals/GrossMarginModal";
import { JobsReportsFSModal } from "../../components/modals/JobsReportsFSModal";
import { EditAppointmentModal } from "../../components/modals/EditAppointmentModal";
import { supabase } from "../../lib/supabase";
import { sampleCalendarEvents, CalendarEvent, isEventStart, isEventEnd, isEventMiddle } from "../../data/sampleCalendarData";
import { fetchCalendarEventsWithCalendar, fetchCalendars, CalendarEventWithCalendar, updateCalendarEvent, Calendar, fetchEstimators, Estimator } from "../../services/calendarService";
import { DispatchingMapView } from "../../components/dispatching/DispatchingMapView";
import { fetchSubcontractors, Subcontractor } from "../../services/subcontractorService";
import { fetchJobsCalendarsGroupedByCategory, fetchJobsCalendarEvents, updateJobsCalendarVisibility, JobsCalendarWithContact, JobsCalendarEventWithCalendar, ContactsByCategory } from "../../services/jobsCalendarService";
import { fetchQuotesWithJobs, updateQuoteJob, QuoteWithJobs, QuoteJob } from "../../services/quoteService";

const actionButtons = [
  { label: "New Quote", variant: "default", icon: PlusIcon },
  { label: "Email", variant: "info", icon: MailIcon },
  { label: "SMS", variant: "info", icon: MessageSquareIcon },
  { label: "Print", variant: "info", icon: PrinterIcon },
  { label: "Export", variant: "info", icon: DownloadIcon },
];

const secondaryButtons = [
  { label: "Duplicate", variant: "info", icon: FileTextIcon },
  { label: "Convert", variant: "info", icon: TrendingUpIcon },
  { label: "Schedule", variant: "info", icon: CalendarIcon },
];

const rightButtons = [
  { label: "Update", variant: "info", icon: RefreshCwIcon },
  { label: "Edit", variant: "warning", icon: EditIcon },
  { label: "Delete", variant: "destructive", icon: TrashIcon },
];

const quotesData = [
  {
    id: 1,
    quoteNumber: "New Quote #122",
    contactName: "Kent1030 Hall1030",
    amount: "$2,960.80",
    material: "$0.00",
    labor: "$0.00",
    balanceDue: "$2,960.80",
    woStatus: "pending",
    payments: "0",
    totalCogs: "$0.00",
    grossMargin: "100.00%",
    statusColor: "bg-yellow-500"
  },
  {
    id: 2,
    quoteNumber: "New Quote #123",
    contactName: "Kent1030 Hall1030",
    amount: "$1,196.61",
    material: "$0.00",
    labor: "$0.00",
    balanceDue: "$1,196.61",
    woStatus: "active",
    payments: "0",
    totalCogs: "$0.00",
    grossMargin: "100.00%",
    statusColor: "bg-green-500"
  },
  {
    id: 3,
    quoteNumber: "New Quote #136",
    contactName: "Kent1030 Hall1030",
    amount: "$1,120.00",
    material: "$0.00",
    labor: "$0.00",
    balanceDue: "$1,120.00",
    woStatus: "overdue",
    payments: "0",
    totalCogs: "$0.00",
    grossMargin: "100.00%",
    statusColor: "bg-red-500"
  },
  {
    id: 4,
    quoteNumber: "New Quote #138",
    contactName: "Brantley Jeff",
    amount: "$60.00",
    material: "$0.00",
    labor: "$0.00",
    balanceDue: "$60.00",
    woStatus: "active",
    payments: "0",
    totalCogs: "$0.00",
    grossMargin: "100.00%",
    statusColor: "bg-green-500"
  },
  {
    id: 5,
    quoteNumber: "New Quote #142",
    contactName: "Kent1105 Hall1105",
    amount: "$4,322.26",
    material: "$0.00",
    labor: "$0.00",
    balanceDue: "$3,322.26",
    woStatus: "pending",
    payments: "$1,000.00",
    totalCogs: "$0.00",
    grossMargin: "100.00%",
    statusColor: "bg-yellow-500"
  },
  {
    id: 6,
    quoteNumber: "New Quote #146",
    contactName: "Kent Hall",
    amount: "$4,441.50",
    material: "$0.00",
    labor: "$0.00",
    balanceDue: "$3,941.50",
    woStatus: "active",
    payments: "$500.00",
    totalCogs: "$0.00",
    grossMargin: "100.00%",
    statusColor: "bg-green-500"
  },
  {
    id: 7,
    quoteNumber: "New Quote #148",
    contactName: "Kent9876 Hall9876",
    amount: "$3,840.15",
    material: "$0.00",
    labor: "$0.00",
    balanceDue: "$3,840.15",
    woStatus: "active",
    payments: "0",
    totalCogs: "$0.00",
    grossMargin: "100.00%",
    statusColor: "bg-green-500"
  },
  {
    id: 8,
    quoteNumber: "New Quote #174",
    contactName: "Kent Hall",
    amount: "$7,434.32",
    material: "$0.00",
    labor: "$0.00",
    balanceDue: "$7,434.32",
    woStatus: "active",
    payments: "0",
    totalCogs: "$0.00",
    grossMargin: "100.00%",
    statusColor: "bg-green-500"
  },
  {
    id: 9,
    quoteNumber: "New Quote #180",
    contactName: "Demo Moore",
    amount: "$2,192.42",
    material: "$0.00",
    labor: "$0.00",
    balanceDue: "$573.18",
    woStatus: "active",
    payments: "$1,619.24",
    totalCogs: "$0.00",
    grossMargin: "100.00%",
    statusColor: "bg-green-500"
  },
  {
    id: 10,
    quoteNumber: "New Quote #181",
    contactName: "klap again",
    amount: "$828.00",
    material: "$0.00",
    labor: "$0.00",
    balanceDue: "$828.00",
    woStatus: "active",
    payments: "0.00",
    totalCogs: "$0.00",
    grossMargin: "100.00%",
    statusColor: "bg-green-500"
  }
];

// Subcontractors are loaded from database

const getButtonVariantClass = (variant: string) => {
  switch (variant) {
    case "info":
      return "primary";
    case "warning":
      return "warning";
    case "destructive":
      return "danger";
    default:
      return "success";
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return "success";
    case "pending":
      return "warning";
    case "overdue":
      return "danger";
    default:
      return "secondary";
  }
};

const JobsHeader = ({
  currentView,
  onViewChange,
  onReportsClick,
  rateFilter,
  skillFilters,
  availableSkills,
  onRateFilterChange,
  onSkillToggle,
  milestones,
  toggleMilestone,
  scheduling,
  setScheduling,
  payments,
  setPayments
}: {
  currentView: 'table' | 'calendar' | 'dispatching',
  onViewChange: (view: 'table' | 'calendar' | 'dispatching') => void,
  onReportsClick: () => void,
  rateFilter?: { min?: number; max?: number },
  skillFilters?: string[],
  availableSkills?: string[],
  onRateFilterChange?: (filter: { min?: number; max?: number }) => void,
  onSkillToggle?: (skill: string) => void,
  milestones?: { complete: boolean; quoted: boolean; closed: boolean },
  toggleMilestone?: (milestone: 'complete' | 'quoted' | 'closed') => void,
  scheduling?: 'all' | 'scheduled' | 'unscheduled',
  setScheduling?: (value: 'all' | 'scheduled' | 'unscheduled') => void,
  payments?: 'all' | 'unpaid' | 'paid',
  setPayments?: (value: 'all' | 'unpaid' | 'paid') => void
}) => {
  const [skillsDropdownOpen, setSkillsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSkillsDropdownOpen(false);
      }
    };

    if (skillsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [skillsDropdownOpen]);

  return (
  <div className="px-3 pt-3">
    <div className="bg-white rounded-3 pt-2 pb-2 px-3 border shadow-sm">
    {/* Title Section - Following wireframe standards */}
    <div className="d-flex align-items-baseline justify-content-between mb-0 pt-0">
      <div className="d-flex align-items-baseline gap-4">
        <h2 className="h2 fw-bold text-dark">
          Jobs
        </h2>
        <p className="small text-secondary">
          {currentView === 'table' ? '94 Quotes Listed' : 'September 2025'}
        </p>
      </div>
      <a href="#" onClick={(e) => { e.preventDefault(); onReportsClick(); }} className="small text-primary text-decoration-none fw-medium">Reports</a>
    </div>

    {/* View Toggle Buttons */}
    <div className="d-flex align-items-center mb-2">
      <ul className="nav nav-underline">
        <li className="nav-item">
          <button
            className={`nav-link d-flex align-items-center gap-2 ${currentView === 'table' ? 'active' : ''}`}
            onClick={() => onViewChange('table')}
          >
            <ListIcon size={16} />
            Table
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link d-flex align-items-center gap-2 ${currentView === 'calendar' ? 'active' : ''}`}
            onClick={() => onViewChange('calendar')}
          >
            <CalendarIconView size={16} />
            Calendar
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link d-flex align-items-center gap-2 ${currentView === 'dispatching' ? 'active' : ''}`}
            onClick={() => onViewChange('dispatching')}
          >
            <TrendingUpIcon size={16} />
            Dispatching
          </button>
        </li>
      </ul>

      {/* Rate and Skills Filters - Only show for dispatching view */}
      {currentView === 'dispatching' && onRateFilterChange && onSkillToggle && (
        <div className="d-flex align-items-center gap-3 ms-auto ps-3 border-start">
          {/* Rate Filter Dropdown */}
          <div className="position-relative">
            <select
              className="form-select form-select-sm bg-light"
              style={{ minWidth: '140px', borderColor: '#dee2e6' }}
              value={
                rateFilter?.min === undefined && rateFilter?.max === undefined
                  ? 'all'
                  : rateFilter?.min === 0 && rateFilter?.max === 60
                  ? '0-60'
                  : rateFilter?.min === 60 && rateFilter?.max === 80
                  ? '60-80'
                  : rateFilter?.min === 80 && rateFilter?.max === 100
                  ? '80-100'
                  : rateFilter?.min === 100 && rateFilter?.max === undefined
                  ? '100+'
                  : 'all'
              }
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'all') {
                  onRateFilterChange({ min: undefined, max: undefined });
                } else if (value === '0-60') {
                  onRateFilterChange({ min: 0, max: 60 });
                } else if (value === '60-80') {
                  onRateFilterChange({ min: 60, max: 80 });
                } else if (value === '80-100') {
                  onRateFilterChange({ min: 80, max: 100 });
                } else if (value === '100+') {
                  onRateFilterChange({ min: 100, max: undefined });
                }
              }}
            >
              <option value="all">All Rates</option>
              <option value="0-60">$0-$60/hr</option>
              <option value="60-80">$60-$80/hr</option>
              <option value="80-100">$80-$100/hr</option>
              <option value="100+">$100+/hr</option>
            </select>
          </div>

          {/* Skills Filter Dropdown */}
          <div className="position-relative" ref={dropdownRef}>
            <button
              className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2 bg-light"
              style={{
                borderColor: '#dee2e6',
                color: '#6c757d'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e9ecef';
                e.currentTarget.style.color = '#495057';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
                e.currentTarget.style.color = '#6c757d';
              }}
              type="button"
              onClick={() => setSkillsDropdownOpen(!skillsDropdownOpen)}
              aria-expanded={skillsDropdownOpen}
            >
              Skills
              {skillFilters && skillFilters.length > 0 && (
                <span className="badge bg-primary rounded-pill">{skillFilters.length}</span>
              )}
            </button>
            <div
              className={`dropdown-menu p-3 ${skillsDropdownOpen ? 'show' : ''}`}
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                left: 'auto',
                minWidth: '320px',
                maxWidth: '400px',
                marginTop: '0.25rem',
                zIndex: 1000
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex flex-wrap gap-2">
                {availableSkills?.map((skill) => {
                  const isSelected = skillFilters?.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      className={`btn btn-sm ${
                        isSelected
                          ? 'btn-success'
                          : 'btn-outline-secondary'
                      }`}
                      style={{
                        fontSize: '0.75rem',
                        ...(isSelected ? {} : {
                          color: '#6c757d',
                          borderColor: '#6c757d'
                        })
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = '#6c757d';
                          e.currentTarget.style.borderColor = '#6c757d';
                          e.currentTarget.style.color = '#fff';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderColor = '#6c757d';
                          e.currentTarget.style.color = '#6c757d';
                        }
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        onSkillToggle(skill);
                      }}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
              {skillFilters && skillFilters.length > 0 && (
                <div className="mt-3 pt-2 border-top">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger w-100"
                    onClick={(e) => {
                      e.preventDefault();
                      skillFilters.forEach(skill => onSkillToggle(skill));
                    }}
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Table View Controls - Only show for table view */}
    {currentView === 'table' && (
      <>
        {/* Filter Segmented Controls */}
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          {/* Section 1: Sales Cycles Group */}
          <div className="d-flex align-items-center gap-2">
            <span className="small fw-semibold text-dark">Sales Cycles:</span>
            <div className="form-check form-switch mb-0">
              <input className="form-check-input" type="checkbox" defaultChecked id="salesCycleSwitch" style={{ cursor: 'pointer' }} />
              <label className="form-check-label small fw-medium" htmlFor="salesCycleSwitch" style={{ cursor: 'pointer' }}>
                Active
              </label>
            </div>
          </div>

          {/* Section 2: Milestones, Scheduling, and Payments (grouped in center) */}
          <div className="d-flex align-items-center gap-3 flex-wrap">
            {/* Milestones Group - Segmented Control */}
            <div className="d-flex align-items-center gap-2">
              <span className="small fw-semibold text-dark">Milestones:</span>
              <ButtonGroup size="sm">
                <BSButton
                  variant={milestones?.complete ? "primary" : "outline-secondary"}
                  onClick={() => toggleMilestone?.('complete')}
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem' }}
                >
                  Complete
                </BSButton>
                <BSButton
                  variant={milestones?.quoted ? "primary" : "outline-secondary"}
                  onClick={() => toggleMilestone?.('quoted')}
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem' }}
                >
                  Quoted
                </BSButton>
                <BSButton
                  variant={milestones?.closed ? "primary" : "outline-secondary"}
                  onClick={() => toggleMilestone?.('closed')}
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem' }}
                >
                  Closed
                </BSButton>
              </ButtonGroup>
            </div>

            {/* Scheduling Group - Segmented Control */}
            <div className="d-flex align-items-center gap-2">
              <span className="small fw-semibold text-dark">Scheduling:</span>
              <ButtonGroup size="sm">
                <BSButton
                  variant={scheduling === 'all' ? "primary" : "outline-secondary"}
                  onClick={() => setScheduling?.('all')}
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem' }}
                >
                  All
                </BSButton>
                <BSButton
                  variant={scheduling === 'scheduled' ? "primary" : "outline-secondary"}
                  onClick={() => setScheduling?.('scheduled')}
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem' }}
                >
                  Scheduled
                </BSButton>
                <BSButton
                  variant={scheduling === 'unscheduled' ? "primary" : "outline-secondary"}
                  onClick={() => setScheduling?.('unscheduled')}
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem' }}
                >
                  Unscheduled
                </BSButton>
              </ButtonGroup>
            </div>

            {/* Payments Group - Segmented Control */}
            <div className="d-flex align-items-center gap-2">
              <span className="small fw-semibold text-dark">Payments:</span>
              <ButtonGroup size="sm">
                <BSButton
                  variant={payments === 'all' ? "primary" : "outline-secondary"}
                  onClick={() => setPayments?.('all')}
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem' }}
                >
                  All
                </BSButton>
                <BSButton
                  variant={payments === 'unpaid' ? "primary" : "outline-secondary"}
                  onClick={() => setPayments?.('unpaid')}
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem' }}
                >
                  Unpaid
                </BSButton>
                <BSButton
                  variant={payments === 'paid' ? "primary" : "outline-secondary"}
                  onClick={() => setPayments?.('paid')}
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem' }}
                >
                  Paid
                </BSButton>
              </ButtonGroup>
            </div>
          </div>

          {/* Section 3: Search Bar */}
          <div className="position-relative" style={{ width: '240px', minWidth: '0' }}>
            <SearchIcon
              size={16}
              className="position-absolute text-secondary"
              style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}
            />
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search Contact/Quote/Subcontractor..."
              style={{ paddingLeft: '36px', fontSize: '0.875rem' }}
            />
          </div>
        </div>

        {/* Pagination and Action Controls */}
        <div className="mt-4">
          <div className="d-flex align-items-center justify-content-center flex-wrap gap-4 position-relative">
            {/* Center - Pagination */}
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-link p-1 text-decoration-none">
                <ChevronsLeftIcon size={16} />
              </button>
              <button className="btn btn-link p-1 text-decoration-none">
                <ChevronLeftIcon size={16} />
              </button>
              <div className="d-flex gap-1">
                <button className="btn btn-primary btn-sm px-2 py-1 small">
                  1
                </button>
                <button className="btn btn-link btn-sm px-2 py-1 text-decoration-none small">
                  2
                </button>
                <button className="btn btn-link btn-sm px-2 py-1 text-decoration-none small">
                  3
                </button>
                <span className="d-flex align-items-center px-2 small text-secondary">...</span>
                <button className="btn btn-link btn-sm px-2 py-1 text-decoration-none small">
                  10
                </button>
              </div>
              <button className="btn btn-link p-1 text-decoration-none">
                <ChevronRightIcon size={16} />
              </button>
              <button className="btn btn-link p-1 text-decoration-none">
                <ChevronsRightIcon size={16} />
              </button>
            </div>

            {/* Right side - Action icons */}
            <div className="d-flex align-items-center gap-2 position-absolute end-0">
              <button className="btn btn-link p-1 text-decoration-none">
                <RefreshCwIcon size={16} />
              </button>
              <button className="btn btn-link p-1 text-decoration-none">
                <SettingsIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      </>
    )}
    </div>
  </div>
  );
};

const JOB_STATUSES = ['Pending', 'Started', 'Completed', 'Need More Time', 'Decline', 'Cancelled'] as const;

const JobStatusDropdown = ({ status, onStatusChange }: { status: string; onStatusChange: (newStatus: string) => void }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <div
        className="rounded-circle"
        style={{ width: '8px', height: '8px', backgroundColor: '#ffc107', flexShrink: 0 }}
      />
      <Form.Select
        size="sm"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', width: 'auto', minWidth: '120px' }}
      >
        {JOB_STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </Form.Select>
    </div>
  );
};

const TableView = () => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = React.useState<number | null>(null);
  const [showCOGSModal, setShowCOGSModal] = React.useState(false);
  const [showGMModal, setShowGMModal] = React.useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = React.useState<string>('');
  const [quotes, setQuotes] = React.useState<QuoteWithJobs[]>([]);
  const [expandedQuotes, setExpandedQuotes] = React.useState<Set<string>>(new Set());
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadQuotes = async () => {
      setLoading(true);
      const data = await fetchQuotesWithJobs();
      setQuotes(data);
      setLoading(false);
    };
    loadQuotes();
  }, []);

  const toggleExpand = (quoteId: string) => {
    setExpandedQuotes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(quoteId)) {
        newSet.delete(quoteId);
      } else {
        newSet.add(quoteId);
      }
      return newSet;
    });
  };

  const handleJobStatusChange = async (jobId: string, newStatus: string) => {
    try {
      await updateQuoteJob(jobId, { status: newStatus as QuoteJob['status'] });
      setQuotes(prev => prev.map(quote => ({
        ...quote,
        jobs: quote.jobs.map(job => job.id === jobId ? { ...job, status: newStatus as QuoteJob['status'] } : job)
      })));
    } catch (err) {
      console.error('Failed to update job status:', err);
    }
  };

  const handleAddCOGS = (quoteId: string) => {
    setSelectedQuoteId(quoteId);
    setShowCOGSModal(true);
  };

  const handleViewGrossMargin = (quoteId: string) => {
    setSelectedQuoteId(quoteId);
    setShowGMModal(true);
  };

  const handleCOGSSuccess = async () => {
    const data = await fetchQuotesWithJobs();
    setQuotes(data);
  };

  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined) return '$0.00';
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  React.useLayoutEffect(() => {
    function computeHeight() {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const h = Math.max(200, Math.floor(vh - rect.top - 16));
      setMaxHeight(h);
    }
    computeHeight();
    window.addEventListener("resize", computeHeight);
    return () => window.removeEventListener("resize", computeHeight);
  }, []);

  return (
    <>
    <div
      ref={scrollRef}
      className="bg-white rounded-3 overflow-auto border shadow-sm"
      style={{ maxHeight: maxHeight ?? undefined }}
    >
      <div style={{ minWidth: '1600px' }}>
        <Table className="jobs-table" striped>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: '48px' }}></TableHead>
              <TableHead style={{ minWidth: '150px' }}>Quote #</TableHead>
              <TableHead style={{ minWidth: '180px' }}>Contact Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Labor</TableHead>
              <TableHead>Balance Due</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>WO Status</TableHead>
              <TableHead>Payments</TableHead>
              <TableHead>Total COGS</TableHead>
              <TableHead>Gross Margin</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={14} className="text-center py-4">
                  <span className="text-secondary">Loading quotes...</span>
                </TableCell>
              </TableRow>
            ) : quotes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={14} className="text-center py-4">
                  <span className="text-secondary">No quotes found</span>
                </TableCell>
              </TableRow>
            ) : (
              quotes.map((quote) => (
                <React.Fragment key={quote.id}>
                  <TableRow>
                    <TableCell>
                      <button
                        className="btn btn-link p-0 text-decoration-none"
                        onClick={() => toggleExpand(quote.id)}
                        style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {expandedQuotes.has(quote.id) ? (
                          <MinusIcon size={14} className="text-secondary" />
                        ) : (
                          <PlusIcon size={14} className="text-secondary" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell style={{ minWidth: '150px' }}>
                      <div className="fw-medium small text-dark">{quote.quote_number}</div>
                    </TableCell>
                    <TableCell>
                      <div className="small text-primary">{quote.contact_name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="small fw-medium text-dark">{formatCurrency(quote.amount)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="small text-secondary">{formatCurrency(quote.material)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="small text-secondary">{formatCurrency(quote.labor)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="small fw-medium text-danger">{formatCurrency(quote.balance_due)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="small text-secondary">{formatDate(quote.start_date)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="small text-secondary">{formatDate(quote.end_date)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center gap-1">
                        <div
                          className="rounded-circle"
                          style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: quote.wo_status === 'active' ? '#28a745' : quote.wo_status === 'pending' ? '#ffc107' : '#dc3545'
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="small text-secondary">{quote.payments !== 0 ? formatCurrency(quote.payments) : '0'}</div>
                    </TableCell>
                    <TableCell>
                      <div className="small text-secondary">{formatCurrency(quote.total_cogs)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="small fw-medium text-success">{quote.gross_margin?.toFixed(2)}%</div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center justify-content-center gap-1">
                        <Button variant="outline-secondary" size="sm" className="rounded-circle p-1" title="View contact">
                          <UserIcon size={12} />
                        </Button>
                        <Button variant="outline-secondary" size="sm" className="rounded-circle p-1" title="View">
                          <EyeIcon size={12} />
                        </Button>
                        <Button variant="outline-secondary" size="sm" className="rounded-circle p-1" title="Edit quote">
                          <EditIcon size={12} />
                        </Button>
                        <Button variant="outline-secondary" size="sm" className="rounded-circle p-1" title="Print">
                          <PrinterIcon size={12} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedQuotes.has(quote.id) && quote.jobs.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={14} style={{ padding: 0, backgroundColor: '#f8f9fa' }}>
                        <table className="table table-sm mb-0" style={{ backgroundColor: 'transparent', width: '100%', tableLayout: 'fixed' }}>
                          <thead>
                            <tr>
                              <th style={{ width: '15%' }} className="small fw-semibold text-secondary ps-3">Subcontractor</th>
                              <th style={{ width: '20%' }} className="small fw-semibold text-secondary">Bid Types</th>
                              <th style={{ width: '18%' }} className="small fw-semibold text-secondary">Start Date Time</th>
                              <th style={{ width: '18%' }} className="small fw-semibold text-secondary">End Date Time</th>
                              <th style={{ width: '14%' }} className="small fw-semibold text-secondary">Status</th>
                              <th style={{ width: '15%' }} className="small fw-semibold text-secondary">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {quote.jobs.map((job) => (
                              <tr key={job.id}>
                                <td className="small text-dark ps-3">{job.subcontractor_name || '-'}</td>
                                <td className="small text-dark">{job.bid_type || '-'}</td>
                                <td className="small text-secondary">{formatDateTime(job.start_date_time)}</td>
                                <td className="small text-secondary">{formatDateTime(job.end_date_time)}</td>
                                <td>
                                  <JobStatusDropdown
                                    status={job.status}
                                    onStatusChange={(newStatus) => handleJobStatusChange(job.id, newStatus)}
                                  />
                                </td>
                                <td>
                                  <div className="d-flex align-items-center gap-1">
                                    <Button variant="outline-secondary" size="sm" className="rounded-circle p-1" title="View">
                                      <EyeIcon size={12} />
                                    </Button>
                                    <Button variant="outline-secondary" size="sm" className="rounded-circle p-1" title="Edit">
                                      <EditIcon size={12} />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>

    <AddCOGSModal
      show={showCOGSModal}
      onHide={() => {
        setShowCOGSModal(false);
        setSelectedQuoteId('');
      }}
      proposalId={selectedQuoteId}
      onSuccess={handleCOGSSuccess}
    />

    <GrossMarginModal
      show={showGMModal}
      onHide={() => {
        setShowGMModal(false);
        setSelectedQuoteId('');
      }}
      proposalId="1754"
      proposalNumber="Proposal #1754"
      proposalName="Christine Rohacz"
      revenue={29795.00}
    />
    </>
  );
};

const DispatchingView = ({
  rateFilter = {},
  skillFilters = [],
  onAvailableSkillsLoad
}: {
  rateFilter?: { min?: number; max?: number };
  skillFilters?: string[];
  onAvailableSkillsLoad?: (skills: string[]) => void;
}) => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = React.useState<number | null>(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedSubcontractors, setSelectedSubcontractors] = React.useState<string[]>([]);
  const [subcontractors, setSubcontractors] = React.useState<Subcontractor[]>([]);
  const [events, setEvents] = React.useState<CalendarEventWithCalendar[]>([]);
  const [draggedEvent, setDraggedEvent] = React.useState<CalendarEventWithCalendar | null>(null);
  const [viewMode, setViewMode] = React.useState<'timeline' | 'map'>('timeline');
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEventWithCalendar | null>(null);
  const [dbEstimators, setDbEstimators] = React.useState<any[]>([]);
  const [allDbEstimators, setAllDbEstimators] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [resizingEvent, setResizingEvent] = React.useState<{ event: CalendarEventWithCalendar; startX: number; originalWidth: number } | null>(null);

  React.useLayoutEffect(() => {
    function computeHeight() {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const h = Math.max(400, Math.floor(vh - rect.top - 16));
      setMaxHeight(h);
    }
    computeHeight();
    window.addEventListener("resize", computeHeight);
    return () => window.removeEventListener("resize", computeHeight);
  }, []);

  // Generate colors for subcontractors
  const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#84cc16', '#ef4444', '#8b5cf6', '#14b8a6', '#f97316', '#a855f7', '#22c55e', '#eab308', '#06b6d4'];
  const subcontractorsWithColors = subcontractors.map((sub, idx) => ({
    ...sub,
    color: colors[idx % colors.length]
  }));

  // Load subcontractors from database
  React.useEffect(() => {
    const loadSubcontractors = async () => {
      const data = await fetchSubcontractors({ isActive: true });
      setSubcontractors(data);
      // Pre-select first 3 subcontractors
      if (data.length > 0 && selectedSubcontractors.length === 0) {
        setSelectedSubcontractors(data.slice(0, 3).map(s => s.name));
      }
    };
    loadSubcontractors();
  }, []);

  // Load calendar events from database
  React.useEffect(() => {
    if (subcontractors.length > 0) {
      loadCalendarData();
    }
  }, [selectedDate, rateFilter, skillFilters, selectedSubcontractors, subcontractors.length]);

  const loadCalendarData = async () => {
    setLoading(true);
    try {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const [eventsData, calendarsData] = await Promise.all([
        fetchCalendarEventsWithCalendar(startOfDay, endOfDay, selectedSubcontractors.length > 0 ? selectedSubcontractors : undefined),
        fetchCalendars()
      ]);

      setEvents(eventsData);
      setDbEstimators(calendarsData);
      setAllDbEstimators(calendarsData);
      if (onAvailableSkillsLoad) {
        onAvailableSkillsLoad([]);
      }
    } catch (error) {
      console.error('Error loading calendar data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSubcontractor = (subcontractorName: string) => {
    setSelectedSubcontractors(prev =>
      prev.includes(subcontractorName)
        ? prev.filter(e => e !== subcontractorName)
        : [...prev, subcontractorName]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const goToTomorrow = () => {
    const tomorrow = new Date(selectedDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow);
  };

  const navigateDay = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  // Generate hours from 7 AM to 8 PM
  const hours = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 7;
    return hour <= 12 ? `${hour} am` : `${hour - 12} pm`;
  });

  // Get events for selected date and estimator
  const getEventsForEstimator = (subcontractorName: string) => {
    return events.filter(event => event.estimator?.name === subcontractorName);
  };

  const parseTime = (timeStr: string): number => {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return 7;
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3].toUpperCase();

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    return hours + minutes / 60;
  };

  const formatTimeFromDecimal = (decimal: number): string => {
    const totalMinutes = Math.round(decimal * 60);
    let hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const period = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;

    return `${hours}:${String(minutes).padStart(2, '0')} ${period}`;
  };

  const isMultiDayEvent = (startDate: string, endDate: string): boolean => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startOnly = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()));
    const endOnly = new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()));
    return endOnly.getTime() > startOnly.getTime();
  };

  const getEventDayType = (event: CalendarEventWithCalendar, viewDate: Date): 'single' | 'start' | 'middle' | 'end' => {
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    const viewDateOnly = new Date(viewDate);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    viewDateOnly.setHours(0, 0, 0, 0);

    if (!isMultiDayEvent(event.start_date, event.end_date)) {
      return 'single';
    }

    if (viewDateOnly.getTime() === startDate.getTime()) {
      return 'start';
    } else if (viewDateOnly.getTime() === endDate.getTime()) {
      return 'end';
    } else if (viewDateOnly.getTime() > startDate.getTime() && viewDateOnly.getTime() < endDate.getTime()) {
      return 'middle';
    }

    return 'single';
  };

  const calculatePosition = (startDate: string, endDate: string, viewDate: Date): { left: string; width: string; visible: boolean; isMultiDay: boolean; dayType: 'single' | 'start' | 'middle' | 'end' } => {
    const date = new Date(startDate);
    const endDateTime = new Date(endDate);

    // Use UTC for date-only comparisons to avoid timezone issues
    const viewDateOnly = new Date(Date.UTC(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate()));

    const startDateOnly = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

    const endDateOnly = new Date(Date.UTC(endDateTime.getFullYear(), endDateTime.getMonth(), endDateTime.getDate()));

    // Check if this event should be visible on this day
    if (viewDateOnly.getTime() < startDateOnly.getTime() || viewDateOnly.getTime() > endDateOnly.getTime()) {
      return { left: '0%', width: '0%', visible: false, isMultiDay: false, dayType: 'single' };
    }

    const isMultiDay = isMultiDayEvent(startDate, endDate);
    let dayType: 'single' | 'start' | 'middle' | 'end' = 'single';

    if (isMultiDay) {
      if (viewDateOnly.getTime() === startDateOnly.getTime()) {
        dayType = 'start';
      } else if (viewDateOnly.getTime() === endDateOnly.getTime()) {
        dayType = 'end';
      } else {
        dayType = 'middle';
      }
    }

    const gridStart = 7;
    const gridEnd = 21;
    const totalHours = gridEnd - gridStart;

    let startHour: number;
    let durationHours: number;

    if (dayType === 'middle') {
      // Full day on intermediate days
      startHour = gridStart;
      durationHours = totalHours;
    } else if (dayType === 'start') {
      // From actual start time to end of day
      startHour = date.getHours() + date.getMinutes() / 60;
      if (startHour < gridStart) startHour = gridStart;
      durationHours = gridEnd - startHour;
    } else if (dayType === 'end') {
      // From start of day to actual end time
      startHour = gridStart;
      const endHour = endDateTime.getHours() + endDateTime.getMinutes() / 60;
      durationHours = Math.min(endHour, gridEnd) - gridStart;
    } else {
      // Single day event
      startHour = date.getHours() + date.getMinutes() / 60;
      if (startHour < gridStart || startHour >= gridEnd) {
        return { left: '0%', width: '0%', visible: false, isMultiDay: false, dayType: 'single' };
      }

      const durationMs = endDateTime.getTime() - date.getTime();
      durationHours = durationMs / (1000 * 60 * 60);
    }

    const left = ((startHour - gridStart) / totalHours) * 100;
    const width = (durationHours / totalHours) * 100;

    return {
      left: `${left}%`,
      width: `${Math.min(width, 100 - left)}%`,
      visible: true,
      isMultiDay,
      dayType
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: '#d1f4e0', border: '#10b981', text: '#059669' };
      case 'pending':
        return { bg: '#fef3c7', border: '#f59e0b', text: '#d97706' };
      case 'overdue':
        return { bg: '#fee2e2', border: '#ef4444', text: '#dc2626' };
      case 'completed':
        return { bg: '#dbeafe', border: '#3b82f6', text: '#2563eb' };
      default:
        return { bg: '#f3f4f6', border: '#9ca3af', text: '#6b7280' };
    }
  };

  const handleDragStart = (e: React.DragEvent, event: CalendarEventWithCalendar) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnd = () => {
    setDraggedEvent(null);
  };

  const handleEventClick = (event: CalendarEventWithCalendar, e: React.MouseEvent) => {
    // Only open modal if not dragging
    if (!draggedEvent) {
      setSelectedEvent(event);
      setShowEditModal(true);
    }
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setSelectedEvent(null);
  };

  const handleEventSave = () => {
    loadCalendarData();
    handleModalClose();
  };

  const handleResizeStart = (e: React.MouseEvent, event: CalendarEventWithCalendar) => {
    e.stopPropagation();
    e.preventDefault();
    const target = (e.currentTarget as HTMLElement).parentElement;
    if (target) {
      const rect = target.getBoundingClientRect();
      setResizingEvent({
        event,
        startX: e.clientX,
        originalWidth: rect.width
      });
    }
  };

  React.useEffect(() => {
    if (!resizingEvent) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingEvent) return;

      const deltaX = e.clientX - resizingEvent.startX;
      const timelineContainer = document.querySelector('.timeline-container');
      if (!timelineContainer) return;

      const containerRect = timelineContainer.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const totalHours = 14; // 7am to 9pm
      const hourWidth = containerWidth / totalHours;

      // Calculate new duration based on drag distance
      const deltaHours = deltaX / hourWidth;
      const originalDuration = (new Date(resizingEvent.event.end_date).getTime() - new Date(resizingEvent.event.start_date).getTime()) / (1000 * 60 * 60);
      const newDuration = Math.max(0.5, originalDuration + deltaHours); // Minimum 30 minutes

      // Round to nearest 30 minutes
      const roundedDuration = Math.round(newDuration * 2) / 2;

      // Update the event end time temporarily
      const newEndDate = new Date(resizingEvent.event.start_date);
      newEndDate.setHours(newEndDate.getHours() + Math.floor(roundedDuration));
      newEndDate.setMinutes(newEndDate.getMinutes() + (roundedDuration % 1) * 60);

      // Visual feedback - update the element width
      const eventElement = document.querySelector(`[data-event-id="${resizingEvent.event.id}"]`) as HTMLElement;
      if (eventElement) {
        const widthPercent = (roundedDuration / totalHours) * 100;
        const startHour = new Date(resizingEvent.event.start_date).getHours() + new Date(resizingEvent.event.start_date).getMinutes() / 60;
        const gridStart = 7;
        const leftPercent = ((startHour - gridStart) / totalHours) * 100;
        const maxWidth = 100 - leftPercent;
        eventElement.style.width = `${Math.min(widthPercent, maxWidth)}%`;
      }
    };

    const handleMouseUp = async () => {
      if (!resizingEvent) return;

      const eventElement = document.querySelector(`[data-event-id="${resizingEvent.event.id}"]`) as HTMLElement;
      if (!eventElement) {
        setResizingEvent(null);
        return;
      }

      const timelineContainer = document.querySelector('.timeline-container');
      if (!timelineContainer) {
        setResizingEvent(null);
        return;
      }

      const containerRect = timelineContainer.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const totalHours = 14;
      const hourWidth = containerWidth / totalHours;

      const eventRect = eventElement.getBoundingClientRect();
      const newDurationHours = (eventRect.width / hourWidth);
      const roundedDuration = Math.round(newDurationHours * 2) / 2; // Round to nearest 30 minutes

      const newEndDate = new Date(resizingEvent.event.start_date);
      newEndDate.setHours(newEndDate.getHours() + Math.floor(roundedDuration));
      newEndDate.setMinutes(newEndDate.getMinutes() + (roundedDuration % 1) * 60);

      try {
        await updateCalendarEvent(resizingEvent.event.id, {
          end_date: newEndDate.toISOString()
        });
        await loadCalendarData();
      } catch (error) {
        console.error('Error resizing event:', error);
      }

      setResizingEvent(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingEvent]);

  const handleEventDelete = (eventId: string) => {
    loadCalendarData();
    handleModalClose();
  };

  return (
    <div
      ref={scrollRef}
      className="bg-white rounded-3 border shadow-sm"
      style={{ maxHeight: maxHeight ?? undefined, display: 'flex', flexDirection: 'column' }}
    >
      <div className="d-flex flex-fill" style={{ minHeight: 0 }}>
        {/* Left Sidebar */}
        <div className="border-end bg-light p-3" style={{ width: '280px', flexShrink: 0, overflowY: 'auto' }}>
          <div className="mb-4">
            <h6 className="fw-bold text-dark mb-3">Subcontractors</h6>
            <div className="d-flex flex-column gap-2">
              {subcontractorsWithColors.map((subcontractor) => (
                <label
                  key={subcontractor.id}
                  className="d-flex align-items-center gap-2 p-2 rounded"
                  style={{ cursor: 'pointer', transition: 'background-color 0.15s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <input
                    type="checkbox"
                    checked={selectedSubcontractors.includes(subcontractor.name)}
                    onChange={() => toggleSubcontractor(subcontractor.name)}
                    className="form-check-input mt-0"
                    style={{ cursor: 'pointer' }}
                  />
                  <div
                    className="rounded"
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: subcontractor.color,
                      flexShrink: 0
                    }}
                  />
                  <div className="d-flex flex-column flex-fill">
                    <span className={`small ${selectedSubcontractors.includes(subcontractor.name) ? 'fw-semibold text-dark' : 'text-secondary'}`}>
                      {subcontractor.name}
                    </span>
                    <span className="text-muted" style={{ fontSize: '0.65rem' }}>
                      {subcontractor.specialty || 'General'}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Main Timeline Area */}
        <div className="flex-fill d-flex flex-column" style={{ minHeight: 0, overflow: 'hidden' }}>
          {/* Date Navigation Header */}
          <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white">
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="link"
                size="sm"
                className="p-1 text-secondary text-decoration-none"
                onClick={() => navigateDay(-1)}
              >
                <ChevronLeftIcon size={20} />
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="px-4"
                onClick={goToToday}
              >
                Today
              </Button>
              <Button
                variant="link"
                size="sm"
                className="p-1 text-secondary text-decoration-none"
                onClick={() => navigateDay(1)}
              >
                <ChevronRightIcon size={20} />
              </Button>
              <h5 className="mb-0 fw-bold">{formatDate(selectedDate)}</h5>
            </div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn btn-sm ${viewMode === 'timeline' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('timeline')}
                style={{ fontSize: '0.8rem' }}
              >
                Timeline View
              </button>
              <button
                type="button"
                className={`btn btn-sm ${viewMode === 'map' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('map')}
                style={{ fontSize: '0.8rem' }}
              >
                Map View
              </button>
            </div>
          </div>

          {/* Timeline Grid */}
          {viewMode === 'timeline' ? (
            <div className="flex-fill" style={{ overflowY: 'auto', overflowX: 'auto' }}>
              <div style={{ minWidth: '1200px' }}>
              {/* Hours Header */}
              <div className="d-flex border-bottom bg-light sticky-top" style={{ top: 0, zIndex: 2 }}>
                <div className="border-end bg-white" style={{ width: '180px', flexShrink: 0, padding: '12px 16px' }}>
                  <span className="small fw-semibold text-secondary">Unassigned</span>
                </div>
                <div className="d-flex flex-fill">
                  {hours.map((hour, i) => (
                    <div
                      key={i}
                      className="text-center border-end"
                      style={{ flex: 1, padding: '12px 8px', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280' }}
                    >
                      {hour}
                    </div>
                  ))}
                </div>
              </div>

              {/* Subcontractor Rows */}
              {selectedSubcontractors.map((subcontractorName, index) => {
                const subcontractorEvents = getEventsForEstimator(subcontractorName);
                const subcontractor = subcontractorsWithColors.find(e => e.name === subcontractorName);

                // Calculate the maximum number of overlapping events for this estimator to determine row height
                const visibleEventsForRow = subcontractorEvents
                  .map(event => ({
                    event,
                    position: calculatePosition(event.start_date, event.end_date, selectedDate)
                  }))
                  .filter(({ position }) => position.visible);

                // Build event layers to find max depth
                const eventLayersMap = new Map<string, number>();
                const sortedEvents = visibleEventsForRow.sort((a, b) => {
                  const aLeft = parseFloat(a.position.left);
                  const bLeft = parseFloat(b.position.left);
                  if (aLeft !== bLeft) return aLeft - bLeft;
                  const aWidth = parseFloat(a.position.width);
                  const bWidth = parseFloat(b.position.width);
                  return bWidth - aWidth;
                });

                for (const { event, position } of sortedEvents) {
                  const eventStart = parseFloat(position.left);
                  const eventEnd = eventStart + parseFloat(position.width);

                  let layer = 0;
                  let foundLayer = false;

                  while (!foundLayer) {
                    let hasConflict = false;

                    for (const [otherId, otherLayer] of eventLayersMap.entries()) {
                      if (otherLayer !== layer) continue;

                      const otherData = sortedEvents.find(ve => ve.event.id === otherId);
                      if (!otherData) continue;

                      const otherStart = parseFloat(otherData.position.left);
                      const otherEnd = otherStart + parseFloat(otherData.position.width);

                      if (!(eventEnd <= otherStart || eventStart >= otherEnd)) {
                        hasConflict = true;
                        break;
                      }
                    }

                    if (!hasConflict) {
                      eventLayersMap.set(event.id, layer);
                      foundLayer = true;
                    } else {
                      layer++;
                    }
                  }
                }

                const maxLayers = eventLayersMap.size > 0 ? Math.max(...Array.from(eventLayersMap.values())) + 1 : 1;
                const standardEventHeight = 40;
                const eventSpacing = 6;
                const rowPadding = 16;
                const calculatedRowHeight = rowPadding + (maxLayers * standardEventHeight) + ((maxLayers - 1) * eventSpacing);
                const rowHeight = Math.max(60, calculatedRowHeight);

                return (
                  <div key={index} className="d-flex border-bottom" style={{ minHeight: `${rowHeight}px` }}>
                    {/* Estimator Name */}
                    <div className="border-end d-flex align-items-center" style={{ width: '180px', flexShrink: 0, padding: '6px 12px', backgroundColor: '#fff' }}>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="rounded-circle"
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: subcontractor?.color || '#9ca3af',
                            flexShrink: 0
                          }}
                        />
                        <span style={{ fontSize: '0.8rem', fontWeight: '500' }} className="text-dark">{subcontractorName}</span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div
                      className="position-relative flex-fill timeline-container"
                      style={{ backgroundColor: '#fafafa', minHeight: `${rowHeight}px` }}
                    >
                      {/* Half-Hour Drop Zones */}
                      <div className="d-flex h-100 position-absolute w-100">
                        {hours.map((_, hourIndex) => {
                          const hourValue = hourIndex + 7;
                          return (
                            <React.Fragment key={hourIndex}>
                              {/* First half (on the hour) */}
                              <div
                                className="position-relative"
                                style={{ flex: 1, height: '100%', borderRight: '1px dashed #d1d5db' }}
                                onDragOver={handleDragOver}
                                onDrop={async (e) => {
                                  e.preventDefault();
                                  e.stopPropagation();

                                  if (draggedEvent) {
                                    try {
                                      const newStartDate = new Date(selectedDate);
                                      newStartDate.setHours(hourValue, 0, 0, 0);

                                      const duration = new Date(draggedEvent.end_date).getTime() - new Date(draggedEvent.start_date).getTime();
                                      const newEndDate = new Date(newStartDate.getTime() + duration);

                                      const subcontractor = subcontractorsWithColors.find(est => est.name === subcontractorName);

                                      console.log('Updating event:', {
                                        id: draggedEvent.id,
                                        newTime: newStartDate.toISOString(),
                                        subcontractor: subcontractor?.name
                                      });

                                      const result = await updateCalendarEvent(draggedEvent.id, {
                                        start_date: newStartDate.toISOString(),
                                        end_date: newEndDate.toISOString(),
                                        estimator_id: estimator?.id || null
                                      });

                                      console.log('Update result:', result);

                                      setDraggedEvent(null);
                                      await loadCalendarData();
                                    } catch (error) {
                                      console.error('Error updating event:', error);
                                      setDraggedEvent(null);
                                    }
                                  }
                                }}
                                onDragEnter={(e) => {
                                  if (draggedEvent) {
                                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                                  }
                                }}
                                onDragLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                              >
                                <div className="border-end h-100" style={{ position: 'absolute', left: 0, width: '1px' }} />
                              </div>
                              {/* Second half (half-hour) */}
                              <div
                                className="position-relative"
                                style={{ flex: 1, height: '100%', borderRight: hourIndex === hours.length - 1 ? '1px solid #dee2e6' : '1px solid #dee2e6' }}
                                onDragOver={handleDragOver}
                                onDrop={async (e) => {
                                  e.preventDefault();
                                  e.stopPropagation();

                                  if (draggedEvent) {
                                    try {
                                      const newStartDate = new Date(selectedDate);
                                      newStartDate.setHours(hourValue, 30, 0, 0);

                                      const duration = new Date(draggedEvent.end_date).getTime() - new Date(draggedEvent.start_date).getTime();
                                      const newEndDate = new Date(newStartDate.getTime() + duration);

                                      const subcontractor = subcontractorsWithColors.find(est => est.name === subcontractorName);

                                      console.log('Updating event (half hour):', {
                                        id: draggedEvent.id,
                                        newTime: newStartDate.toISOString(),
                                        subcontractor: subcontractor?.name
                                      });

                                      const result = await updateCalendarEvent(draggedEvent.id, {
                                        start_date: newStartDate.toISOString(),
                                        end_date: newEndDate.toISOString(),
                                        estimator_id: estimator?.id || null
                                      });

                                      console.log('Update result:', result);

                                      setDraggedEvent(null);
                                      await loadCalendarData();
                                    } catch (error) {
                                      console.error('Error updating event:', error);
                                      setDraggedEvent(null);
                                    }
                                  }
                                }}
                                onDragEnter={(e) => {
                                  if (draggedEvent) {
                                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                                  }
                                }}
                                onDragLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                              />
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* Events */}
                      {(() => {
                        // Use the same layer calculation that we already computed above for row height
                        const standardEventHeight = 40;
                        const eventSpacing = 6;

                        return subcontractorEvents.map((event) => {
                          const position = calculatePosition(event.start_date, event.end_date, selectedDate);

                          if (!position.visible) {
                            return null;
                          }

                          const layer = eventLayersMap.get(event.id) || 0;
                          const topOffset = 8 + (layer * (standardEventHeight + eventSpacing));

                          const colors = getStatusColor(event.status);
                          const displayTitle = event.quote_number || event.title;
                          const time = new Date(event.start_date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

                          let borderRadius = '4px';
                          if (position.isMultiDay) {
                            if (position.dayType === 'start') {
                              borderRadius = '4px 0 0 4px';
                            } else if (position.dayType === 'end') {
                              borderRadius = '0 4px 4px 0';
                            } else if (position.dayType === 'middle') {
                              borderRadius = '0';
                            }
                          }

                        return (
                          <div
                            key={event.id}
                            data-event-id={event.id}
                            draggable={!resizingEvent}
                            onDragStart={(e) => {
                              handleDragStart(e, event);
                              // Hide the original element during drag to prevent interference
                              setTimeout(() => {
                                if (e.currentTarget instanceof HTMLElement) {
                                  e.currentTarget.style.pointerEvents = 'none';
                                }
                              }, 0);
                            }}
                            onDragEnd={(e) => {
                              handleDragEnd();
                              // Restore pointer events
                              if (e.currentTarget instanceof HTMLElement) {
                                e.currentTarget.style.pointerEvents = 'auto';
                              }
                            }}
                            onClick={(e) => {
                              // Don't open modal if clicking on resize handle
                              if ((e.target as HTMLElement).classList.contains('resize-handle')) {
                                return;
                              }
                              handleEventClick(event, e);
                            }}
                            className="position-absolute"
                            style={{
                              left: position.left,
                              width: position.width,
                              top: `${topOffset}px`,
                              height: `${standardEventHeight}px`,
                              backgroundColor: colors.bg,
                              border: position.isMultiDay ? `2px dashed ${colors.border}` : `2px solid ${colors.border}`,
                              borderRadius,
                              padding: '4px 6px',
                              cursor: draggedEvent?.id === event.id ? 'grabbing' : 'grab',
                              transition: resizingEvent?.event.id === event.id ? 'none' : 'all 0.15s ease',
                              zIndex: 1,
                              opacity: draggedEvent?.id === event.id ? 0.5 : 1
                            }}
                            onMouseEnter={(e) => {
                              if (!draggedEvent) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                            title={`${time}\n${displayTitle}\n${event.contact_name || ''}\n${event.quote_number ? `Quote: ${event.quote_number}` : ''}\n${event.amount ? `$${event.amount.toLocaleString()}` : ''}\n\nDrag to reschedule or click to edit`}
                          >
                            <div className="d-flex align-items-center gap-1" style={{ marginBottom: '2px' }}>
                              <span style={{ fontSize: '0.6rem', opacity: 0.8 }}>
                                {event.event_type === 'quote' ? '💰' : event.event_type === 'installation' ? '🔧' : event.event_type === 'inspection' ? '✓' : '📋'}
                              </span>
                              <div style={{ fontSize: '0.7rem', fontWeight: '700', color: colors.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: '1.2', flex: 1 }}>
                                {event.quote_number || displayTitle}
                              </div>
                            </div>
                            <div style={{ fontSize: '0.65rem', color: colors.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: '1.1', opacity: 0.9 }}>
                              {event.contact_name}
                            </div>
                            {event.amount && (
                              <div style={{ fontSize: '0.65rem', fontWeight: '600', color: colors.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: '1.1', marginTop: '1px' }}>
                                ${event.amount.toLocaleString()}
                              </div>
                            )}
                            {/* Resize Handle - only show on single day events or end of multi-day events */}
                            {(!position.isMultiDay || position.dayType === 'end') && (
                              <div
                                className="resize-handle"
                                onMouseDown={(e) => handleResizeStart(e, event)}
                                style={{
                                  position: 'absolute',
                                  right: '-2px',
                                  top: 0,
                                  bottom: 0,
                                  width: '8px',
                                  cursor: 'ew-resize',
                                  backgroundColor: 'transparent',
                                  zIndex: 2
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = colors.border;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                              />
                            )}
                          </div>
                        );
                      });
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          ) : (
            <DispatchingMapView
              events={events}
              selectedSubcontractors={selectedSubcontractors}
              subcontractorsWithColors={subcontractorsWithColors}
            />
          )}
        </div>
      </div>

      {/* Edit Appointment Modal */}
      <EditAppointmentModal
        show={showEditModal}
        onHide={handleModalClose}
        event={selectedEvent}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
      />
    </div>
  );
};

const CalendarView = () => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = React.useState<number | null>(null);
  const [calendars, setCalendars] = React.useState<ContactsByCategory>({ estimators: [], fieldManagers: [], subcontractors: [] });
  const [selectedCalendarIds, setSelectedCalendarIds] = React.useState<string[]>([]);
  const [events, setEvents] = React.useState<JobsCalendarEventWithCalendar[]>([]);
  const [currentDate, setCurrentDate] = React.useState(new Date(2025, 8, 15));

  React.useEffect(() => {
    const loadCalendars = async () => {
      const data = await fetchJobsCalendarsGroupedByCategory();
      setCalendars(data);
      const visibleIds = [...data.estimators, ...data.fieldManagers, ...data.subcontractors]
        .filter(c => c.is_visible)
        .map(c => c.id);
      setSelectedCalendarIds(visibleIds);
    };
    loadCalendars();
  }, []);

  React.useEffect(() => {
    const loadEvents = async () => {
      if (selectedCalendarIds.length === 0) {
        setEvents([]);
        return;
      }
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59);
      const data = await fetchJobsCalendarEvents(startOfMonth, endOfMonth, selectedCalendarIds);
      setEvents(data);
    };
    loadEvents();
  }, [selectedCalendarIds, currentDate]);

  React.useLayoutEffect(() => {
    function computeHeight() {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const h = Math.max(400, Math.floor(vh - rect.top - 16));
      setMaxHeight(h);
    }
    computeHeight();
    window.addEventListener("resize", computeHeight);
    return () => window.removeEventListener("resize", computeHeight);
  }, []);

  const toggleCalendar = async (calendar: JobsCalendarWithContact) => {
    const newVisible = !selectedCalendarIds.includes(calendar.id);
    if (newVisible) {
      setSelectedCalendarIds(prev => [...prev, calendar.id]);
    } else {
      setSelectedCalendarIds(prev => prev.filter(id => id !== calendar.id));
    }
    try {
      await updateJobsCalendarVisibility(calendar.id, newVisible);
    } catch (e) {
      console.error('Failed to update visibility:', e);
    }
  };

  const getEventsByDate = (date: string): JobsCalendarEventWithCalendar[] => {
    return events.filter(event => {
      const eventDate = new Date(event.start_date).toISOString().split('T')[0];
      return eventDate === date;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: 'bg-success', text: 'text-success', border: 'border-success' };
      case 'pending':
        return { bg: 'bg-warning', text: 'text-warning', border: 'border-warning' };
      case 'overdue':
        return { bg: 'bg-danger', text: 'text-danger', border: 'border-danger' };
      case 'completed':
        return { bg: 'bg-info', text: 'text-info', border: 'border-info' };
      default:
        return { bg: 'bg-secondary', text: 'text-secondary', border: 'border-secondary' };
    }
  };

  const generateCalendarDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const today = new Date();

    for (let i = 0; i < 35; i++) {
      const dayNumber = i - startDayOfWeek + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const dateString = isCurrentMonth ? `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}` : '';
      const isToday = isCurrentMonth && dayNumber === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      const dayEvents = isCurrentMonth ? getEventsByDate(dateString) : [];

      days.push({
        dayNumber: isCurrentMonth ? dayNumber : null,
        dateString,
        isCurrentMonth,
        isToday,
        events: dayEvents
      });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const navigateMonth = (direction: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const renderCategorySection = (title: string, items: JobsCalendarWithContact[]) => (
    <div className="mb-3">
      <h6 className="fw-semibold text-dark mb-2" style={{ fontSize: '0.8rem' }}>{title}</h6>
      <div className="d-flex flex-column gap-1">
        {items.map((calendar) => (
          <label
            key={calendar.id}
            className="d-flex align-items-center gap-2 py-1 px-2 rounded"
            style={{ cursor: 'pointer', transition: 'background-color 0.15s' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <input
              type="checkbox"
              checked={selectedCalendarIds.includes(calendar.id)}
              onChange={() => toggleCalendar(calendar)}
              className="form-check-input mt-0"
              style={{ cursor: 'pointer', accentColor: calendar.color }}
            />
            <span className={`small ${selectedCalendarIds.includes(calendar.id) ? 'fw-medium text-dark' : 'text-secondary'}`}>
              {calendar.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div
      ref={scrollRef}
      className="bg-white rounded-3 border shadow-sm"
      style={{ maxHeight: maxHeight ?? undefined, display: 'flex', flexDirection: 'column' }}
    >
      <div className="d-flex flex-fill" style={{ minHeight: 0 }}>
        <div className="border-end bg-light p-3" style={{ width: '240px', flexShrink: 0, overflowY: 'auto' }}>
          <h6 className="fw-bold text-dark mb-3">Jobs Calendars</h6>

          {renderCategorySection('Estimators', calendars.estimators)}
          <hr className="my-2" />
          {renderCategorySection('Field Manager', calendars.fieldManagers)}
          <hr className="my-2" />
          {renderCategorySection('Subcontractors', calendars.subcontractors)}

          <hr className="my-3" />
          <div>
            <h6 className="fw-semibold text-dark mb-2" style={{ fontSize: '0.8rem' }}>Quick Filters</h6>
            <div className="d-flex flex-column gap-2">
              <Button variant="outline-primary" size="sm" className="w-100 text-start small" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outline-primary" size="sm" className="w-100 text-start small" onClick={() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setCurrentDate(tomorrow);
              }}>
                Tomorrow
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-fill d-flex flex-column" style={{ minHeight: 0 }}>
          <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white">
            <div className="d-flex align-items-center gap-3">
              <Button variant="outline-secondary" size="sm" className="px-2 py-1" onClick={() => navigateMonth(-1)}>
                <ChevronLeftIcon size={16} />
              </Button>
              <h5 className="mb-0 fw-bold">{monthName}</h5>
              <Button variant="outline-secondary" size="sm" className="px-2 py-1" onClick={() => navigateMonth(1)}>
                <ChevronRightIcon size={16} />
              </Button>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Button variant="primary" size="sm" className="px-3">Month</Button>
              <Button variant="outline-secondary" size="sm" className="px-3">Week</Button>
              <Button variant="outline-secondary" size="sm" className="px-3">Day</Button>
            </div>
          </div>

          <div className="flex-fill p-3" style={{ overflowY: 'auto' }}>
            <div className="d-grid mb-2" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center py-2 small fw-semibold text-secondary bg-light rounded">
                  {day}
                </div>
              ))}
            </div>

            <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
              {calendarDays.map((day, i) => (
                <div
                  key={i}
                  className={`border rounded p-2 ${
                    day.isCurrentMonth ? 'bg-white' : 'bg-light'
                  } ${day.isToday ? 'border-primary border-2 shadow-sm' : 'border-1'}`}
                  style={{
                    minHeight: '110px',
                    cursor: day.isCurrentMonth ? 'pointer' : 'default',
                    transition: 'all 0.15s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (day.isCurrentMonth) {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (day.isCurrentMonth) {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {day.dayNumber && (
                    <>
                      <div className={`small mb-2 ${day.isToday ? 'fw-bold text-primary' : 'text-secondary'}`} style={{ fontSize: '0.75rem' }}>
                        {day.dayNumber}
                      </div>
                      {day.events.length > 0 && (
                        <div className="d-flex flex-column gap-1">
                          {day.events.slice(0, 2).map((event) => {
                            const colors = getStatusColor(event.status);
                            const calColor = event.calendar?.color || '#3b82f6';
                            return (
                              <div
                                key={event.id}
                                className="px-2 py-1 rounded"
                                style={{
                                  fontSize: '0.65rem',
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease',
                                  backgroundColor: `${calColor}20`,
                                  borderLeft: `3px solid ${calColor}`,
                                  color: '#333'
                                }}
                                title={`${event.title}\n${event.contact_name || ''}\n${event.amount ? `$${event.amount}` : ''}`}
                              >
                                <div className="fw-semibold text-truncate">{event.title}</div>
                                {event.contact_name && <div className="text-truncate text-muted">{event.contact_name}</div>}
                              </div>
                            );
                          })}
                          {day.events.length > 2 && (
                            <div
                              className="small text-primary fw-semibold text-center"
                              style={{ fontSize: '0.65rem', cursor: 'pointer' }}
                            >
                              +{day.events.length - 2} more
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Jobs = (): JSX.Element => {
  const [currentView, setCurrentView] = React.useState<'table' | 'calendar' | 'dispatching'>('table');
  const [showReportsModal, setShowReportsModal] = React.useState(false);
  const [rateFilter, setRateFilter] = React.useState<{ min?: number; max?: number }>({});
  const [skillFilters, setSkillFilters] = React.useState<string[]>([]);
  const [availableSkills, setAvailableSkills] = React.useState<string[]>([]);

  const [milestones, setMilestones] = React.useState({
    complete: true,
    quoted: false,
    closed: false
  });
  const [scheduling, setScheduling] = React.useState<'all' | 'scheduled' | 'unscheduled'>('all');
  const [payments, setPayments] = React.useState<'all' | 'unpaid' | 'paid'>('all');

  const toggleSkillFilter = (skill: string) => {
    setSkillFilters(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const toggleMilestone = (milestone: 'complete' | 'quoted' | 'closed') => {
    setMilestones(prev => ({
      ...prev,
      [milestone]: !prev[milestone]
    }));
  };

  return (
    <>
      <div className="d-flex flex-column w-100 h-100">
        <div className="flex-shrink-0">
          <JobsHeader
            currentView={currentView}
            onViewChange={setCurrentView}
            onReportsClick={() => setShowReportsModal(true)}
            rateFilter={rateFilter}
            skillFilters={skillFilters}
            availableSkills={availableSkills}
            onRateFilterChange={setRateFilter}
            onSkillToggle={toggleSkillFilter}
            milestones={milestones}
            toggleMilestone={toggleMilestone}
            scheduling={scheduling}
            setScheduling={setScheduling}
            payments={payments}
            setPayments={setPayments}
          />
        </div>
        <div className="px-3 pt-2 pb-3">
          {currentView === 'table' ? (
            <TableView />
          ) : currentView === 'calendar' ? (
            <CalendarView />
          ) : (
            <DispatchingView
              rateFilter={rateFilter}
              skillFilters={skillFilters}
              onAvailableSkillsLoad={setAvailableSkills}
            />
          )}
        </div>
      </div>

      <JobsReportsFSModal
        show={showReportsModal}
        onHide={() => setShowReportsModal(false)}
      />
    </>
  );
};