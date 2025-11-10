import React from "react";
import { Button } from "../../components/bootstrap/Button";
import { FloatingInput, FloatingSelect, FloatingSelectOption } from "../../components/bootstrap/FormControls";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/bootstrap/Table";
import { Badge, Card, Container, Row, Col } from "react-bootstrap";
import { Search as SearchIcon, RefreshCw as RefreshCwIcon, Settings as SettingsIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, ChevronsLeft as ChevronsLeftIcon, ChevronsRight as ChevronsRightIcon, Plus as PlusIcon, Mail as MailIcon, MessageSquare as MessageSquareIcon, FileText as FileTextIcon, Printer as PrinterIcon, Download as DownloadIcon, Edit as EditIcon, Trash as TrashIcon, User as UserIcon, DollarSign as DollarSignIcon, Calendar as CalendarIcon, TrendingUp as TrendingUpIcon, List as ListIcon, Calendar as CalendarIconView, Receipt as ReceiptIcon } from "lucide-react";
import { AddCOGSModal } from "../../components/modals/AddCOGSModal";
import { GrossMarginModal } from "../../components/modals/GrossMarginModal";
import { JobsReportsFSModal } from "../../components/modals/JobsReportsFSModal";
import { supabase } from "../../lib/supabase";
import { sampleCalendarEvents, CalendarEvent, isEventStart, isEventEnd, isEventMiddle } from "../../data/sampleCalendarData";

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

const JobsHeader = ({ currentView, onViewChange, onReportsClick }: { currentView: 'table' | 'calendar' | 'dispatching', onViewChange: (view: 'table' | 'calendar' | 'dispatching') => void, onReportsClick: () => void }) => (
  <div className="px-3 pt-3">
    <div className="bg-white rounded-3 pt-2 pb-4 px-3 border shadow-sm">
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
    <div className="d-flex align-items-center mb-3">
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

  return (
    <>
      <div className="d-flex flex-column w-100 h-100">
        <div className="flex-shrink-0">
          <JobsHeader
            currentView={currentView}
            onViewChange={setCurrentView}
            onReportsClick={() => setShowReportsModal(true)}
          />
        </div>
        <div className="px-3 pt-3">
          {currentView === 'table' ? <TableView /> : currentView === 'calendar' ? <CalendarView /> : <div className="bg-white rounded-3 border shadow-sm p-5 text-center"><h4 className="text-secondary">Dispatching View Coming Soon</h4></div>}
        </div>
      </div>

      <JobsReportsFSModal
        show={showReportsModal}
        onHide={() => setShowReportsModal(false)}
      />
    </>
  );
};