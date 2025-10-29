import React from "react";
import { Button } from "../../components/bootstrap/Button";
import { FloatingInput, FloatingSelect, FloatingSelectOption } from "../../components/bootstrap/FormControls";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/bootstrap/Table";
import { Badge, Card, Container, Row, Col } from "react-bootstrap";
import { Search as SearchIcon, RefreshCw as RefreshCwIcon, Settings as SettingsIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, ChevronsLeft as ChevronsLeftIcon, ChevronsRight as ChevronsRightIcon, Plus as PlusIcon, Mail as MailIcon, MessageSquare as MessageSquareIcon, FileText as FileTextIcon, Printer as PrinterIcon, Download as DownloadIcon, Bitcoin as EditIcon, Trash as TrashIcon, User as UserIcon, DollarSign as DollarSignIcon, Calendar as CalendarIcon, TrendingUp as TrendingUpIcon, List as ListIcon, Calendar as CalendarIconView, Receipt as ReceiptIcon } from "lucide-react";
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

const CalendarView = () => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = React.useState<number | null>(null);

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

  const hours = Array.from({ length: 14 }, (_, i) => i + 7);
  const today = new Date();
  const currentWeekStart = new Date(2025, 9, 26);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentWeekStart);
    date.setDate(currentWeekStart.getDate() + i);
    return date;
  });

  const sampleEvents = [
    { day: 1, startHour: 9, duration: 1.5, title: 'Time with Manish', color: '#4285f4', url: 'https://us02web.zoom.us/...' },
    { day: 1, startHour: 10.5, duration: 2, title: 'Kent / Emanuel', color: '#4285f4' },
    { day: 2, startHour: 8, duration: 1, title: 'Time with Manish', color: '#4285f4' },
    { day: 2, startHour: 9, duration: 1, title: 'Com with Ankit', color: '#7baaf7' },
    { day: 2, startHour: 11, duration: 1, title: 'TMI - Weekly Review', color: '#7baaf7' },
    { day: 3, startHour: 9, duration: 1, title: 'Time with Manish', color: '#4285f4' },
    { day: 3, startHour: 10, duration: 1, title: 'Com with Ankit', color: '#7baaf7' },
    { day: 3, startHour: 11, duration: 1, title: 'Footprints/CT weekly mtg', color: '#7baaf7' },
    { day: 3, startHour: 13, duration: 1, title: 'Jessica/Kent 2', color: '#93c5fd' },
    { day: 4, startHour: 8, duration: 1.5, title: 'Time with Manish', color: '#4285f4' },
    { day: 4, startHour: 9.5, duration: 1.5, title: 'Com with Ankit', color: '#7baaf7' },
    { day: 4, startHour: 11, duration: 1, title: 'REFINE: TK-954 Next Plan Trip', color: '#ea4335' },
    { day: 4, startHour: 12, duration: 1, title: 'ClientTether::Footprints Floors', color: '#ea4335' },
    { day: 4, startHour: 14, duration: 1, title: 'Kent / Emanuel', color: '#4285f4' },
    { day: 5, startHour: 9, duration: 1, title: 'Travel to CO', color: '#7baaf7' },
    { day: 5, startHour: 13, duration: 1, title: 'Kent/Kurt Zoom Call', color: '#ea4335' },
    { day: 6, startHour: 14, duration: 3, title: 'Test Tickets on Stage', color: '#fbbc04' },
  ];

  return (
    <div className="bg-white rounded-3 border shadow-sm" style={{ maxHeight: maxHeight ?? undefined, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div className="d-flex" style={{ height: '100%', minHeight: 0 }}>
        <div className="border-end bg-light p-3" style={{ width: '200px', flexShrink: 0, overflowY: 'auto' }}>
          <div className="mb-4">
            <h6 className="small fw-semibold text-dark mb-2">Estimators</h6>
            <div className="d-flex flex-column gap-1">
              {estimators.map((estimator, index) => (
                <label key={index} className="d-flex align-items-center gap-2" style={{ fontSize: '0.813rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    defaultChecked={estimator.checked}
                    className="form-check-input m-0"
                    style={{ width: '16px', height: '16px', flexShrink: 0 }}
                  />
                  <span className={estimator.checked ? 'text-dark' : 'text-secondary'}>
                    {estimator.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h6 className="small fw-semibold text-dark mb-2">Filters</h6>
            <div className="d-flex flex-column gap-2">
              <Button variant="success" size="sm" className="w-100 justify-content-start" style={{ fontSize: '0.813rem' }}>
                Today
              </Button>
              <Button variant="success" size="sm" className="w-100 justify-content-start" style={{ fontSize: '0.813rem' }}>
                Tomorrow
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-fill" style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div className="border-bottom p-3 bg-white" style={{ flexShrink: 0 }}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <Button variant="outline-secondary" size="sm" className="px-2 py-1">
                  <ChevronLeftIcon size={14} />
                </Button>
                <Button variant="primary" size="sm" className="px-3 py-1" style={{ fontSize: '0.813rem' }}>
                  Today
                </Button>
                <Button variant="outline-secondary" size="sm" className="px-2 py-1">
                  <ChevronRightIcon size={14} />
                </Button>
                <h5 className="mb-0 ms-2" style={{ fontSize: '1.1rem', fontWeight: 500 }}>Oct - Nov 2025</h5>
                <span className="badge bg-light text-dark border ms-2" style={{ fontSize: '0.75rem' }}>Week 44</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="small text-secondary" style={{ fontSize: '0.813rem' }}>View</span>
                <div className="btn-group btn-group-sm" role="group">
                  <button type="button" className="btn btn-outline-secondary" style={{ fontSize: '0.813rem' }}>Day</button>
                  <button type="button" className="btn btn-primary" style={{ fontSize: '0.813rem' }}>Week</button>
                  <button type="button" className="btn btn-outline-secondary" style={{ fontSize: '0.813rem' }}>Month</button>
                </div>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-fill" style={{ overflowY: 'auto', overflowX: 'auto', minHeight: 0 }}>
            <div style={{ minWidth: '800px' }}>
              <div className="d-flex border-bottom bg-white sticky-top" style={{ top: 0, zIndex: 10 }}>
                <div style={{ width: '60px', flexShrink: 0, borderRight: '1px solid #e5e7eb' }}></div>
                {weekDays.map((date, index) => {
                  const isToday = date.getDate() === 29 && date.getMonth() === 9;
                  const dayName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][index];
                  const dayNum = date.getDate();

                  return (
                    <div
                      key={index}
                      className="flex-fill text-center py-2 border-end"
                      style={{ minWidth: '100px' }}
                    >
                      <div className="small text-secondary mb-1" style={{ fontSize: '0.688rem', fontWeight: 500 }}>
                        {dayName}
                      </div>
                      <div
                        className={`mx-auto ${isToday ? 'bg-primary text-white' : 'text-dark'}`}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.875rem',
                          fontWeight: 500
                        }}
                      >
                        {dayNum}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="position-relative">
                <div className="d-flex">
                  <div style={{ width: '60px', flexShrink: 0 }}>
                    {hours.map((hour) => (
                      <div
                        key={hour}
                        className="text-end pe-2 text-secondary"
                        style={{ height: '60px', fontSize: '0.688rem', paddingTop: '4px' }}
                      >
                        {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                      </div>
                    ))}
                  </div>

                  <div className="flex-fill position-relative" style={{ borderLeft: '1px solid #e5e7eb' }}>
                    {weekDays.map((_, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="position-absolute"
                        style={{
                          left: `${(dayIndex / 7) * 100}%`,
                          width: `${100 / 7}%`,
                          height: '100%',
                          borderRight: '1px solid #e5e7eb'
                        }}
                      >
                        {hours.map((hour) => (
                          <div
                            key={hour}
                            className="border-top"
                            style={{
                              height: '60px',
                              borderColor: '#f3f4f6'
                            }}
                          />
                        ))}
                      </div>
                    ))}

                    {sampleEvents.map((event, index) => {
                      const top = (event.startHour - 7) * 60;
                      const height = event.duration * 60;
                      const left = (event.day / 7) * 100;
                      const width = (1 / 7) * 100;

                      return (
                        <div
                          key={index}
                          className="position-absolute rounded"
                          style={{
                            top: `${top}px`,
                            left: `calc(${left}% + 4px)`,
                            width: `calc(${width}% - 8px)`,
                            height: `${height - 2}px`,
                            backgroundColor: event.color,
                            color: 'white',
                            padding: '4px 6px',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: '1px solid rgba(255,255,255,0.2)',
                            zIndex: 1
                          }}
                        >
                          <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            lineHeight: '1.3'
                          }}>
                            {event.title}
                          </div>
                          {event.url && (
                            <div style={{
                              fontSize: '0.625rem',
                              opacity: 0.9,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {event.startHour >= 12 ? `${event.startHour === 12 ? 12 : event.startHour - 12}:${(event.startHour % 1) * 60 || '00'}pm` : `${event.startHour}:${(event.startHour % 1) * 60 || '00'}am`}
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
        </div>
      </div>
    </div>
  );
};

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