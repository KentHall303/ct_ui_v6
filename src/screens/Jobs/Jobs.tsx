import React from "react";
import { Button } from "../../components/bootstrap/Button";
import { FloatingInput, FloatingSelect, FloatingSelectOption } from "../../components/bootstrap/FormControls";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/bootstrap/Table";
import { Badge, Card, Container, Row, Col } from "react-bootstrap";
import { Search as SearchIcon, RefreshCw as RefreshCwIcon, Settings as SettingsIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, ChevronsLeft as ChevronsLeftIcon, ChevronsRight as ChevronsRightIcon, Plus as PlusIcon, Mail as MailIcon, MessageSquare as MessageSquareIcon, FileText as FileTextIcon, Printer as PrinterIcon, Download as DownloadIcon, Edit as EditIcon, Trash as TrashIcon, User as UserIcon, DollarSign as DollarSignIcon, Calendar as CalendarIcon, TrendingUp as TrendingUpIcon, List as ListIcon, Calendar as CalendarIconView, Receipt as ReceiptIcon } from "lucide-react";
import { AddCOGSModal } from "../../components/modals/AddCOGSModal";
import { GrossMarginModal } from "../../components/modals/GrossMarginModal";
import { JobsReportsFSModal } from "../../components/modals/JobsReportsFSModal";
import { EditAppointmentModal } from "../../components/modals/EditAppointmentModal";
import { supabase } from "../../lib/supabase";
import { sampleCalendarEvents, CalendarEvent, isEventStart, isEventEnd, isEventMiddle } from "../../data/sampleCalendarData";
import { fetchCalendarEvents, fetchEstimators, CalendarEventWithEstimator, updateCalendarEvent } from "../../services/calendarService";

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

const estimators = [
  { name: "Test_Account Owner", checked: true },
  { name: "Standard Kent", checked: false },
  { name: "Sara Joe", checked: false },
  { name: "Jeanette Standards", checked: false },
  { name: "Sara Admin", checked: false },
  { name: "Absolute Nugget", checked: false },
  { name: "Frank Team", checked: false },
  { name: "Sara Admin Team", checked: false },
];

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
  onSkillToggle
}: {
  currentView: 'table' | 'calendar' | 'dispatching',
  onViewChange: (view: 'table' | 'calendar' | 'dispatching') => void,
  onReportsClick: () => void,
  rateFilter?: { min?: number; max?: number },
  skillFilters?: string[],
  availableSkills?: string[],
  onRateFilterChange?: (filter: { min?: number; max?: number }) => void,
  onSkillToggle?: (skill: string) => void
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
              style={{ borderColor: '#dee2e6' }}
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
        {/* Filter Checkboxes - Grouped like in image */}
        <div className="d-flex align-items-center gap-4 flex-wrap">
          {/* Sales Cycles Group */}
          <div className="d-flex align-items-center gap-2">
            <span className="small fw-semibold text-dark">Sales Cycles:</span>
            <div className="form-check form-switch mb-0">
              <input className="form-check-input" type="checkbox" defaultChecked id="salesCycleSwitch" style={{ cursor: 'pointer' }} />
              <label className="form-check-label small fw-medium" htmlFor="salesCycleSwitch" style={{ cursor: 'pointer' }}>
                Active
              </label>
            </div>
          </div>

          {/* Milestones Group */}
          <div className="d-flex align-items-center gap-2">
            <span className="small fw-semibold text-dark">Milestones:</span>
            <div className="d-flex align-items-center gap-2">
              <label className="d-flex align-items-center gap-1 small mb-0" style={{ cursor: 'pointer' }}>
                <input type="checkbox" className="form-check-input mt-0" style={{ cursor: 'pointer' }} />
                <span>Quoted</span>
              </label>
              <label className="d-flex align-items-center gap-1 small mb-0" style={{ cursor: 'pointer' }}>
                <input type="checkbox" className="form-check-input mt-0" style={{ cursor: 'pointer' }} />
                <span>Closed</span>
              </label>
              <label className="d-flex align-items-center gap-1 small mb-0" style={{ cursor: 'pointer' }}>
                <input type="checkbox" className="form-check-input mt-0" style={{ cursor: 'pointer' }} />
                <span>Complete</span>
              </label>
            </div>
          </div>

          {/* Scheduling Group */}
          <div className="d-flex align-items-center gap-2">
            <span className="small fw-semibold text-dark">Scheduling:</span>
            <div className="d-flex align-items-center gap-2">
              <label className="d-flex align-items-center gap-1 small mb-0" style={{ cursor: 'pointer' }}>
                <input type="radio" name="scheduling" value="all" className="form-check-input mt-0" style={{ cursor: 'pointer' }} />
                <span>All</span>
              </label>
              <label className="d-flex align-items-center gap-1 small mb-0" style={{ cursor: 'pointer' }}>
                <input type="radio" name="scheduling" value="scheduled" defaultChecked className="form-check-input mt-0" style={{ cursor: 'pointer' }} />
                <span>Scheduled</span>
              </label>
              <label className="d-flex align-items-center gap-1 small mb-0" style={{ cursor: 'pointer' }}>
                <input type="radio" name="scheduling" value="unscheduled" className="form-check-input mt-0" style={{ cursor: 'pointer' }} />
                <span>Unscheduled</span>
              </label>
            </div>
          </div>

          {/* Payments Group */}
          <div className="d-flex align-items-center gap-2">
            <span className="small fw-semibold text-dark">Payments:</span>
            <div className="d-flex align-items-center gap-2">
              <label className="d-flex align-items-center gap-1 small mb-0" style={{ cursor: 'pointer' }}>
                <input type="radio" name="payments" value="all" className="form-check-input mt-0" style={{ cursor: 'pointer' }} />
                <span>All</span>
              </label>
              <label className="d-flex align-items-center gap-1 small mb-0" style={{ cursor: 'pointer' }}>
                <input type="radio" name="payments" value="paid" className="form-check-input mt-0" style={{ cursor: 'pointer' }} />
                <span>Paid</span>
              </label>
              <label className="d-flex align-items-center gap-1 small mb-0" style={{ cursor: 'pointer' }}>
                <input type="radio" name="payments" value="unpaid" defaultChecked className="form-check-input mt-0" style={{ cursor: 'pointer' }} />
                <span>Unpaid</span>
              </label>
            </div>
          </div>
        </div>

        {/* Pagination and Search Controls - Following wireframe standards */}
        <div className="py-0">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-4">
            {/* Left side - Pagination */}
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-link p-1 text-decoration-none">
                <ChevronsLeftIcon size={16} />
              </button>
              <button className="btn btn-link p-1 text-decoration-none">
                <ChevronLeftIcon size={16} />
              </button>
              <div className="d-flex gap-1">
                <button className="btn btn-primary btn-sm px-2 py-1">
                  1
                </button>
                <button className="btn btn-link btn-sm px-2 py-1 text-decoration-none">
                  2
                </button>
                <button className="btn btn-link btn-sm px-2 py-1 text-decoration-none">
                  3
                </button>
                <span className="d-flex align-items-center px-2 small text-secondary">...</span>
                <button className="btn btn-link btn-sm px-2 py-1 text-decoration-none">
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

            {/* Center - Search */}
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <div className="position-relative" style={{ width: '320px', minWidth: '0' }}>
                <SearchIcon
                  size={16}
                  className="position-absolute text-secondary"
                  style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Contact/Quote/Subcontractor..."
                  style={{ paddingLeft: '36px', height: 'calc(1.5em + 0.75rem + 2px)' }}
                />
              </div>
            </div>

            {/* Right side - Action icons */}
            <div className="d-flex align-items-center gap-2">
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

const TableView = () => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = React.useState<number | null>(null);
  const [showCOGSModal, setShowCOGSModal] = React.useState(false);
  const [showGMModal, setShowGMModal] = React.useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = React.useState<string>('');
  const [quotesWithCOGS, setQuotesWithCOGS] = React.useState(quotesData);

  const handleAddCOGS = (quoteId: string) => {
    setSelectedQuoteId(quoteId);
    setShowCOGSModal(true);
  };

  const handleViewGrossMargin = (quoteId: string) => {
    setSelectedQuoteId(quoteId);
    setShowGMModal(true);
  };

  const handleCOGSSuccess = async () => {
    if (!selectedQuoteId) return;

    try {
      const { data: cogsItems, error } = await supabase
        .from('cogs_items')
        .select('cost')
        .eq('proposal_id', selectedQuoteId);

      if (error) throw error;

      const totalCOGS = cogsItems?.reduce((sum, item) => sum + parseFloat(item.cost), 0) || 0;

      setQuotesWithCOGS(prevQuotes =>
        prevQuotes.map(quote => {
          if (quote.quoteNumber === selectedQuoteId) {
            const amount = parseFloat(quote.amount.replace(/[^0-9.-]+/g, ''));
            const grossMargin = amount > 0 ? (((amount - totalCOGS) / amount) * 100).toFixed(2) : '100.00';
            return {
              ...quote,
              totalCogs: `$${totalCOGS.toFixed(2)}`,
              grossMargin: `${grossMargin}%`
            };
          }
          return quote;
        })
      );
    } catch (err) {
      console.error('Failed to refresh COGS data:', err);
    }
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
              <TableHead style={{ width: '48px' }}>
                <input type="checkbox" className="form-check-input" />
              </TableHead>
              <TableHead style={{ minWidth: '180px' }}>
                Quote # ▲
              </TableHead>
              <TableHead style={{ minWidth: '200px' }}>
                Contact Name ▲
              </TableHead>
              <TableHead>
                Amount ▲
              </TableHead>
              <TableHead>
                Material ▲
              </TableHead>
              <TableHead>
                Labor ▲
              </TableHead>
              <TableHead>
                Balance Due ▲
              </TableHead>
              <TableHead>
                Payments ▲
              </TableHead>
              <TableHead>
                Total COGS ▲
              </TableHead>
              <TableHead>
                Gross Margin ▲
              </TableHead>
              <TableHead>
                WO Status ▲
              </TableHead>
              <TableHead>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotesWithCOGS.map((quote, index) => (
              <TableRow
                key={quote.id}
              >
                <TableCell>
                  <input type="checkbox" className="form-check-input" />
                </TableCell>
                <TableCell style={{ minWidth: '180px' }}>
                  <div className="fw-medium small text-dark">
                    {quote.quoteNumber}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="small text-secondary">
                    {quote.contactName}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="small fw-medium text-dark">
                    {quote.amount}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="small text-secondary">
                    {quote.material}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="small text-secondary">
                    {quote.labor}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="small fw-medium text-dark">
                    {quote.balanceDue}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="small text-secondary">
                    {quote.payments}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="small text-secondary">
                    {quote.totalCogs}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="small fw-medium text-success">
                    {quote.grossMargin}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge bg={getStatusBadge(quote.woStatus)} className="small">
                    {quote.woStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="d-flex align-items-center justify-content-center gap-1">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-circle p-1"
                      title="View contact"
                    >
                      <UserIcon size={12} />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-circle p-1"
                      title="Edit quote"
                    >
                      <EditIcon size={12} />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-circle p-1"
                      title="Print"
                    >
                      <PrinterIcon size={12} />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-circle p-1"
                      title="More options"
                    >
                      <DollarSignIcon size={12} />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-circle p-1"
                      title="Add Cost of Goods Sold"
                      onClick={() => handleAddCOGS(quote.quoteNumber)}
                    >
                      <ReceiptIcon size={12} />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-circle p-1"
                      title="View Gross Margin Report"
                      onClick={() => handleViewGrossMargin(quote.quoteNumber)}
                    >
                      <TrendingUpIcon size={12} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>

    {/* Add COGS Modal */}
    <AddCOGSModal
      show={showCOGSModal}
      onHide={() => {
        setShowCOGSModal(false);
        setSelectedQuoteId('');
      }}
      proposalId={selectedQuoteId}
      onSuccess={handleCOGSSuccess}
    />

    {/* Gross Margin Modal */}
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
  const [selectedDate, setSelectedDate] = React.useState(new Date(2025, 8, 15)); // Sept 15, 2025
  const [selectedEstimators, setSelectedEstimators] = React.useState<string[]>(['Test_Account Owner', 'Sara Joe', 'Jeanette Standards']);
  const [events, setEvents] = React.useState<CalendarEventWithEstimator[]>([]);
  const [draggedEvent, setDraggedEvent] = React.useState<CalendarEventWithEstimator | null>(null);
  const [viewMode, setViewMode] = React.useState<'timeline' | 'map'>('timeline');
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEventWithEstimator | null>(null);
  const [dbEstimators, setDbEstimators] = React.useState<any[]>([]);
  const [allDbEstimators, setAllDbEstimators] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [resizingEvent, setResizingEvent] = React.useState<{ event: CalendarEventWithEstimator; startX: number; originalWidth: number } | null>(null);

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

  const estimators = [
    { name: 'Test_Account Owner', color: '#3b82f6' },
    { name: 'Standard Kent', color: '#10b981' },
    { name: 'Sara Joe', color: '#8b5cf6' },
    { name: 'Jeanette Standards', color: '#f59e0b' },
    { name: 'Sara Admin', color: '#ec4899' },
    { name: 'Absolute Nugget', color: '#06b6d4' },
    { name: 'Frank Team', color: '#84cc16' },
  ];

  // Load calendar events from database
  React.useEffect(() => {
    loadCalendarData();
  }, [selectedDate, rateFilter, skillFilters]);

  const loadCalendarData = async () => {
    setLoading(true);
    try {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const filters: any = {};
      if (rateFilter.min !== undefined || rateFilter.max !== undefined) {
        filters.minRate = rateFilter.min;
        filters.maxRate = rateFilter.max;
      }
      if (skillFilters.length > 0) {
        filters.skills = skillFilters;
      }

      const [eventsData, estimatorsData, allEstimatorsData, skillsData] = await Promise.all([
        fetchCalendarEvents(startOfDay, endOfDay),
        fetchEstimators(Object.keys(filters).length > 0 ? filters : undefined),
        fetchEstimators(),
        import('../../services/calendarService').then(m => m.getAllSkills())
      ]);

      setEvents(eventsData);
      setDbEstimators(estimatorsData);
      setAllDbEstimators(allEstimatorsData);
      if (onAvailableSkillsLoad) {
        onAvailableSkillsLoad(skillsData);
      }
    } catch (error) {
      console.error('Error loading calendar data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleEstimator = (estimatorName: string) => {
    setSelectedEstimators(prev =>
      prev.includes(estimatorName)
        ? prev.filter(e => e !== estimatorName)
        : [...prev, estimatorName]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const goToToday = () => {
    setSelectedDate(new Date(2025, 8, 15));
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
  const getEventsForEstimator = (estimatorName: string) => {
    return events.filter(event => event.estimator?.name === estimatorName);
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

  const getEventDayType = (event: CalendarEventWithEstimator, viewDate: Date): 'single' | 'start' | 'middle' | 'end' => {
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

  const handleDragStart = (e: React.DragEvent, event: CalendarEventWithEstimator) => {
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

  const handleEventClick = (event: CalendarEventWithEstimator, e: React.MouseEvent) => {
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

  const handleResizeStart = (e: React.MouseEvent, event: CalendarEventWithEstimator) => {
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
            <h6 className="fw-bold text-dark mb-3">Estimators</h6>
            <div className="d-flex flex-column gap-2">
              {dbEstimators.map((estimator) => (
                <label
                  key={estimator.id}
                  className="d-flex align-items-center gap-2 p-2 rounded"
                  style={{ cursor: 'pointer', transition: 'background-color 0.15s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <input
                    type="checkbox"
                    checked={selectedEstimators.includes(estimator.name)}
                    onChange={() => toggleEstimator(estimator.name)}
                    className="form-check-input mt-0"
                    style={{ cursor: 'pointer' }}
                  />
                  <div
                    className="rounded"
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: estimator.color,
                      flexShrink: 0
                    }}
                  />
                  <div className="d-flex flex-column flex-fill">
                    <span className={`small ${selectedEstimators.includes(estimator.name) ? 'fw-semibold text-dark' : 'text-secondary'}`}>
                      {estimator.name}
                    </span>
                    <span className="text-muted" style={{ fontSize: '0.65rem' }}>
                      ${estimator.hourly_rate}/hr • {estimator.skills?.slice(0, 2).join(', ')}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h6 className="fw-bold text-dark mb-3">Quick Filters</h6>
            <div className="d-flex flex-column gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                className="w-100 text-start small"
                onClick={goToToday}
              >
                Today
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                className="w-100 text-start small"
                onClick={goToTomorrow}
              >
                Tomorrow
              </Button>
            </div>
          </div>
        </div>

        {/* Main Timeline Area */}
        <div className="flex-fill d-flex flex-column" style={{ minHeight: 0, overflow: 'hidden' }}>
          {/* Date Navigation Header */}
          <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white">
            <div className="d-flex align-items-center gap-3">
              <Button
                variant="outline-secondary"
                size="sm"
                className="px-2 py-1"
                onClick={() => navigateDay(-1)}
              >
                <ChevronLeftIcon size={16} />
              </Button>
              <h5 className="mb-0 fw-bold">{formatDate(selectedDate)}</h5>
              <Button
                variant="outline-secondary"
                size="sm"
                className="px-2 py-1"
                onClick={() => navigateDay(1)}
              >
                <ChevronRightIcon size={16} />
              </Button>
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

              {/* Estimator Rows */}
              {selectedEstimators.map((estimatorName, index) => {
                const estimatorEvents = getEventsForEstimator(estimatorName);
                const estimator = estimators.find(e => e.name === estimatorName);

                // Calculate the maximum number of overlapping events for this estimator to determine row height
                const visibleEventsForRow = estimatorEvents
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
                            backgroundColor: estimator?.color || '#9ca3af',
                            flexShrink: 0
                          }}
                        />
                        <span style={{ fontSize: '0.8rem', fontWeight: '500' }} className="text-dark">{estimatorName}</span>
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

                                      const estimator = dbEstimators.find(est => est.name === estimatorName);

                                      console.log('Updating event:', {
                                        id: draggedEvent.id,
                                        newTime: newStartDate.toISOString(),
                                        estimator: estimator?.name
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

                                      const estimator = dbEstimators.find(est => est.name === estimatorName);

                                      console.log('Updating event (half hour):', {
                                        id: draggedEvent.id,
                                        newTime: newStartDate.toISOString(),
                                        estimator: estimator?.name
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

                        return estimatorEvents.map((event) => {
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
                            title={`${time}\n${displayTitle}\n${event.contact_name || ''}\n\nDrag to reschedule or click to edit`}
                          >
                            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: colors.text, marginBottom: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: '1.1' }}>
                              {displayTitle}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: colors.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: '1.1' }}>
                              {event.contact_name}
                            </div>
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
            /* Map View */
            <div className="flex-fill position-relative" style={{ overflowY: 'auto' }}>
              {/* Mock Map Background */}
              <div className="position-relative" style={{ minHeight: '600px', backgroundColor: '#e5e7eb' }}>
                {/* Map Placeholder */}
                <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center" style={{ opacity: 0.3 }}>
                  <div className="text-center">
                    <div style={{ fontSize: '4rem', color: '#9ca3af' }}>🗺️</div>
                    <p className="text-muted">Map Integration Placeholder</p>
                  </div>
                </div>

                {/* User Pins and Routes */}
                {selectedEstimators.map((estimatorName, index) => {
                  const estimator = estimators.find(e => e.name === estimatorName);
                  const estimatorEvents = events.filter(e => e.estimator === estimatorName);

                  return (
                    <div key={estimatorName}>
                      {/* User Pin */}
                      <div
                        className="position-absolute"
                        style={{
                          top: `${120 + index * 150}px`,
                          left: `${100 + index * 80}px`,
                          zIndex: 10
                        }}
                      >
                        <div className="d-flex flex-column align-items-center">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow"
                            style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: estimator?.color || '#9ca3af',
                              fontSize: '0.75rem'
                            }}
                          >
                            {estimatorName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div className="mt-1 px-2 py-1 bg-white rounded shadow-sm" style={{ fontSize: '0.7rem', fontWeight: '600' }}>
                            {estimatorName}
                          </div>
                        </div>
                      </div>

                      {/* Route Line (mock) */}
                      <svg
                        className="position-absolute"
                        style={{
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          pointerEvents: 'none',
                          zIndex: 1
                        }}
                      >
                        <path
                          d={`M ${115 + index * 80} ${140 + index * 150} Q ${300 + index * 100} ${200 + index * 80} ${400 + index * 120} ${180 + index * 100}`}
                          fill="none"
                          stroke={estimator?.color || '#9ca3af'}
                          strokeWidth="3"
                          strokeDasharray="5,5"
                          opacity="0.6"
                        />
                      </svg>

                      {/* Appointment Pins */}
                      {estimatorEvents.slice(0, 3).map((event, eventIndex) => (
                        <div
                          key={event.id}
                          className="position-absolute"
                          style={{
                            top: `${150 + index * 150 + eventIndex * 40}px`,
                            left: `${380 + index * 120 + eventIndex * 50}px`,
                            zIndex: 5
                          }}
                        >
                          <div className="position-relative">
                            {/* Pin Icon */}
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center shadow"
                              style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: 'white',
                                border: `3px solid ${estimator?.color || '#9ca3af'}`
                              }}
                            >
                              <div
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  backgroundColor: estimator?.color || '#9ca3af',
                                  borderRadius: '50%'
                                }}
                              />
                            </div>
                            {/* Event Info Card */}
                            <div
                              className="position-absolute bg-white rounded shadow px-2 py-1"
                              style={{
                                top: '-8px',
                                left: '40px',
                                minWidth: '140px',
                                fontSize: '0.65rem',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              <div className="fw-bold" style={{ color: estimator?.color }}>{event.time}</div>
                              <div className="fw-semibold text-dark">{event.quoteNumber}</div>
                              <div className="text-muted" style={{ fontSize: '0.6rem' }}>{event.contactName}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Timeline Strip at Bottom */}
              <div className="border-top bg-white p-3" style={{ position: 'sticky', bottom: 0 }}>
                <div className="d-flex gap-3" style={{ overflowX: 'auto' }}>
                  {selectedEstimators.map((estimatorName) => {
                    const estimator = estimators.find(e => e.name === estimatorName);
                    const estimatorEvents = events.filter(e => e.estimator === estimatorName).sort((a, b) => {
                      const parseTime = (time: string) => {
                        const [timePart, period] = time.split(' ');
                        let [hours, minutes] = timePart.split(':').map(Number);
                        if (period === 'PM' && hours !== 12) hours += 12;
                        if (period === 'AM' && hours === 12) hours = 0;
                        return hours + minutes / 60;
                      };
                      return parseTime(a.time) - parseTime(b.time);
                    });

                    return (
                      <div key={estimatorName} className="d-flex align-items-center gap-2 bg-light rounded p-2" style={{ minWidth: '200px' }}>
                        <div
                          className="rounded-circle"
                          style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: estimator?.color || '#9ca3af',
                            flexShrink: 0
                          }}
                        />
                        <div className="flex-fill">
                          <div style={{ fontSize: '0.75rem', fontWeight: '600' }} className="text-dark mb-1">
                            {estimatorName}
                          </div>
                          <div className="d-flex gap-1" style={{ fontSize: '0.65rem' }}>
                            {estimatorEvents.slice(0, 4).map((event, idx) => (
                              <span key={event.id} className="text-muted">
                                {event.time}{idx < Math.min(estimatorEvents.length, 4) - 1 ? ' →' : ''}
                              </span>
                            ))}
                            {estimatorEvents.length > 4 && (
                              <span className="text-muted">+{estimatorEvents.length - 4}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
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
  const [selectedEstimators, setSelectedEstimators] = React.useState<string[]>(['Test_Account Owner']);

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

  const toggleEstimator = (estimatorName: string) => {
    setSelectedEstimators(prev =>
      prev.includes(estimatorName)
        ? prev.filter(e => e !== estimatorName)
        : [...prev, estimatorName]
    );
  };

  const getEventsByDate = (date: string): CalendarEvent[] => {
    return sampleCalendarEvents.filter(event => {
      const matchesDate = event.date === date;
      const matchesEstimator = selectedEstimators.length === 0 || selectedEstimators.includes(event.estimator);
      return matchesDate && matchesEstimator;
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
    const firstDayOfMonth = 1;
    const startDayOfWeek = 0;

    for (let i = 0; i < 35; i++) {
      const dayNumber = i - startDayOfWeek + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= 30;
      const dateString = isCurrentMonth ? `2025-09-${String(dayNumber).padStart(2, '0')}` : '';
      const isToday = dayNumber === 15;
      const events = isCurrentMonth ? getEventsByDate(dateString) : [];

      days.push({
        dayNumber: isCurrentMonth ? dayNumber : null,
        dateString,
        isCurrentMonth,
        isToday,
        events
      });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div
      ref={scrollRef}
      className="bg-white rounded-3 border shadow-sm"
      style={{ maxHeight: maxHeight ?? undefined, display: 'flex', flexDirection: 'column' }}
    >
      <div className="d-flex flex-fill" style={{ minHeight: 0 }}>
        {/* Left Sidebar - Estimators */}
        <div className="border-end bg-light p-3" style={{ width: '240px', flexShrink: 0, overflowY: 'auto' }}>
          <div className="mb-4">
            <h6 className="fw-bold text-dark mb-3">Estimators</h6>
            <div className="d-flex flex-column gap-2">
              {estimators.map((estimator, index) => (
                <label
                  key={index}
                  className="d-flex align-items-center gap-2 p-2 rounded"
                  style={{ cursor: 'pointer', transition: 'background-color 0.15s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <input
                    type="checkbox"
                    checked={selectedEstimators.includes(estimator.name)}
                    onChange={() => toggleEstimator(estimator.name)}
                    className="form-check-input mt-0"
                    style={{ cursor: 'pointer' }}
                  />
                  <span className={`small ${selectedEstimators.includes(estimator.name) ? 'fw-semibold text-dark' : 'text-secondary'}`}>
                    {estimator.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h6 className="fw-bold text-dark mb-3">Quick Filters</h6>
            <div className="d-flex flex-column gap-2">
              <Button variant="outline-primary" size="sm" className="w-100 text-start small">
                Today
              </Button>
              <Button variant="outline-primary" size="sm" className="w-100 text-start small">
                Tomorrow
              </Button>
            </div>
          </div>
        </div>

        {/* Main Calendar Area */}
        <div className="flex-fill d-flex flex-column" style={{ minHeight: 0 }}>
          {/* Calendar Header */}
          <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white">
            <div className="d-flex align-items-center gap-3">
              <Button variant="outline-secondary" size="sm" className="px-2 py-1">
                <ChevronLeftIcon size={16} />
              </Button>
              <h5 className="mb-0 fw-bold">September 2025</h5>
              <Button variant="outline-secondary" size="sm" className="px-2 py-1">
                <ChevronRightIcon size={16} />
              </Button>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Button variant="primary" size="sm" className="px-3">Month</Button>
              <Button variant="outline-secondary" size="sm" className="px-3">Week</Button>
              <Button variant="outline-secondary" size="sm" className="px-3">Day</Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-fill p-3" style={{ overflowY: 'auto' }}>
            {/* Day Headers */}
            <div className="d-grid mb-2" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center py-2 small fw-semibold text-secondary bg-light rounded">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
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
                            const isStart = isEventStart(event, day.dateString);
                            const isEnd = isEventEnd(event, day.dateString);
                            const isMiddle = isEventMiddle(event, day.dateString);
                            const isMultiDay = event.isMultiDay;

                            let borderRadius = '0.25rem';
                            if (isMultiDay) {
                              if (isStart && !isEnd) {
                                borderRadius = '0.25rem 0 0 0.25rem';
                              } else if (isEnd && !isStart) {
                                borderRadius = '0 0.25rem 0.25rem 0';
                              } else if (isMiddle) {
                                borderRadius = '0';
                              }
                            }

                            return (
                              <div
                                key={event.id}
                                className={`${colors.bg} bg-opacity-10 ${colors.text} border ${colors.border} px-2 py-1 ${isMultiDay ? 'fw-bold' : ''}`}
                                style={{
                                  fontSize: '0.65rem',
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease',
                                  borderRadius,
                                  position: 'relative',
                                  ...(isMultiDay && {
                                    borderLeft: isStart ? undefined : 'none',
                                    borderRight: isEnd ? undefined : 'none',
                                  })
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.02)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                                title={`${event.quoteNumber}\n${event.contactName}\n${event.time}\n${event.amount}${isMultiDay ? '\nMulti-day event' : ''}`}
                              >
                                {isStart && (
                                  <>
                                    <div className="fw-semibold text-truncate">{event.time}</div>
                                    <div className="text-truncate">{event.quoteNumber}</div>
                                  </>
                                )}
                                {isMiddle && (
                                  <div className="text-truncate">{event.quoteNumber} (cont.)</div>
                                )}
                                {isEnd && !isStart && (
                                  <div className="text-truncate">{event.quoteNumber} (ends)</div>
                                )}
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

  const toggleSkillFilter = (skill: string) => {
    setSkillFilters(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
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