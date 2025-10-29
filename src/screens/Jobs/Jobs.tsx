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

const JobsHeader = ({ currentView, onViewChange, onReportsClick }: { currentView: 'table' | 'calendar', onViewChange: (view: 'table' | 'calendar') => void, onReportsClick: () => void }) => (
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

const CalendarView = () => (
  <Card className="h-100">
    <Card.Header className="bg-light">
      <h5 className="mb-0 fw-semibold">Calendar View</h5>
    </Card.Header>
    <Card.Body className="p-0">
      <div className="d-flex h-100 bg-white">
        {/* Left Sidebar - Estimators */}
        <div className="border-end border-2 bg-light p-4" style={{ width: '256px' }}>
          <div className="mb-6">
            <h3 className="small fw-semibold text-dark mb-3">Estimators</h3>
            <div className="d-grid gap-2">
              {estimators.map((estimator, index) => (
                <label key={index} className="d-flex align-items-center gap-2 small">
                  <input 
                    type="checkbox" 
                    defaultChecked={estimator.checked}
                    className="form-check-input" 
                  />
                  <span className={estimator.checked ? 'text-dark' : 'text-secondary'}>
                    {estimator.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="small fw-semibold text-dark mb-3">Filters</h3>
            <div className="d-grid gap-2">
              <Button variant="success" size="sm" className="w-100 justify-content-start small">
                Today
              </Button>
              <Button variant="success" size="sm" className="w-100 justify-content-start small">
                Tomorrow
              </Button>
            </div>
          </div>
        </div>

        {/* Main Calendar Area */}
        <div className="flex-fill p-4">
          <div className="bg-white border border-2 rounded h-100">
            {/* Calendar Header */}
            <div className="d-flex align-items-center justify-content-between p-4 border-bottom border-2">
              <div className="d-flex align-items-center gap-4">
                <Button variant="outline-secondary" size="sm">
                  <ChevronLeftIcon size={16} />
                </Button>
                <h2 className="h5 fw-semibold">September 2025</h2>
                <Button variant="outline-secondary" size="sm">
                  <ChevronRightIcon size={16} />
                </Button>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FloatingSelect label="View" className="w-32">
                  <FloatingSelectOption value="month">Month</FloatingSelectOption>
                  <FloatingSelectOption value="week">Week</FloatingSelectOption>
                  <FloatingSelectOption value="day">Day</FloatingSelectOption>
                </FloatingSelect>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              <div className="row g-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="col p-2 text-center small fw-medium text-secondary bg-light rounded">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="row g-1" style={{ height: '384px' }}>
                {/* Calendar days - simplified for demo */}
                {Array.from({ length: 35 }, (_, i) => {
                  const dayNumber = i - 6; // Start from previous month
                  const isCurrentMonth = dayNumber > 0 && dayNumber <= 30;
                  const isToday = dayNumber === 15; // Example today
                  
                  return (
                    <div
                      key={i}
                      className={`col p-2 border border-1 rounded ${
                        isCurrentMonth ? 'bg-white' : 'bg-light'
                      } ${isToday ? 'bg-primary bg-opacity-10 border-primary' : ''}`}
                      style={{ minHeight: '80px' }}
                    >
                      {isCurrentMonth && (
                        <div className={`small ${isToday ? 'fw-bold text-primary' : 'text-secondary'}`}>
                          {dayNumber}
                        </div>
                      )}
                      {/* Sample events */}
                      {(dayNumber === 3 || dayNumber === 15 || dayNumber === 24) && (
                        <div className="mt-1">
                          <div className="small bg-primary bg-opacity-10 text-primary px-1 py-1 rounded mb-1" style={{ fontSize: '0.75rem' }}>
                            Quote #122
                          </div>
                          {dayNumber === 15 && (
                            <div className="small bg-success bg-opacity-10 text-success px-1 py-1 rounded" style={{ fontSize: '0.75rem' }}>
                              Quote #146
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card.Body>
  </Card>
);

export const Jobs = (): JSX.Element => {
  const [currentView, setCurrentView] = React.useState<'table' | 'calendar'>('table');
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
          {currentView === 'table' ? <TableView /> : <CalendarView />}
        </div>
      </div>

      <JobsReportsFSModal
        show={showReportsModal}
        onHide={() => setShowReportsModal(false)}
      />
    </>
  );
};