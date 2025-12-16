import React from "react";
import { Button } from "../../components/bootstrap/Button";
import { FloatingInput, FloatingSelect, FloatingSelectOption } from "../../components/bootstrap/FormControls";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/bootstrap/Table";
import { ResizableTableHead } from "../../components/bootstrap/ResizableTableHead";
import { useResizableColumns, ColumnConfig } from "../../hooks/useResizableColumns";
import { contactService } from "../../services/contactService";
import { Contact } from "../../lib/supabase";
import { RefreshCw as RefreshCwIcon, Settings as SettingsIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, ChevronsLeft as ChevronsLeftIcon, ChevronsRight as ChevronsRightIcon, Phone as PhoneIcon, Star as StarIcon, UserPlus as UserPlusIcon, Mail as MailIcon, MessageSquare as MessageSquareIcon, Merge as MergeIcon, Bitcoin as EditIcon, Users as UsersIcon, SeparatorHorizontal as SeparatorHorizontalIcon, Send as SendIcon, Link as LinkIcon, Upload as UploadIcon, Download as DownloadIcon, Pin as PushPinIcon, RotateCcw as RotateCcwIcon, Trash as TrashIcon, ChevronUp, ChevronDown } from "lucide-react";

const actionButtons = [
  { label: "New Client", variant: "default", icon: UserPlusIcon },
  { label: "Email", variant: "info", icon: MailIcon },
  { label: "SMS", variant: "info", icon: MessageSquareIcon },
  { label: "Merge", variant: "info", icon: MergeIcon },
  { label: "Change", variant: "info", icon: EditIcon },
];

const secondaryButtons = [
  { label: "Combined", variant: "info", icon: UsersIcon },
  { label: "Separate", variant: "info", icon: SeparatorHorizontalIcon },
  { label: "Send to Account", variant: "info", icon: SendIcon },
  { label: "Link Contacts", variant: "info", icon: LinkIcon },
];

const rightButtons = [
  { label: "Update", variant: "info", icon: RefreshCwIcon },
  { label: "Import", variant: "info", icon: UploadIcon },
  { label: "Export", variant: "info", icon: DownloadIcon },
  { label: "Push", variant: "info", icon: PushPinIcon },
  { label: "Release", variant: "warning", icon: RotateCcwIcon },
  { label: "Delete", variant: "destructive", icon: TrashIcon },
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

interface ContactsHeaderProps {
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSearch: (search: string) => void;
  onRefresh: () => void;
}

const ContactsHeader: React.FC<ContactsHeaderProps> = ({
  totalRecords,
  currentPage,
  totalPages,
  onPageChange,
  onSearch,
  onRefresh
}) => {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchValue);
    }
  };

  return (
    <div className="px-3 pt-3">
      <div className="bg-white rounded-3 pt-2 pb-4 px-3 border shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-1">
          <div className="d-flex align-items-baseline gap-4">
            <h1 className="h2 fw-bold text-dark">Contacts - Client</h1>
            <p className="small text-secondary">{totalRecords} Records in Clients List</p>
          </div>
        </div>

        <div className="d-flex align-items-start justify-content-between gap-4 mb-3">
          <div className="d-flex flex-column gap-1">
            <div className="d-flex gap-1 flex-wrap">
              {actionButtons.map((button, index) => (
                <Button
                  key={index}
                  variant={getButtonVariantClass(button.variant)}
                  className="rounded-pill d-flex align-items-center gap-1 btn-pill-custom"
                  title={button.label}
                >
                  <button.icon size={12} />
                  <span className="d-none d-lg-inline">{button.label}</span>
                </Button>
              ))}
            </div>

            <div className="d-flex gap-1 flex-wrap">
              {secondaryButtons.map((button, index) => (
                <Button
                  key={index}
                  variant="primary"
                  className="rounded-pill d-flex align-items-center gap-1 btn-pill-custom"
                  title={button.label}
                >
                  <button.icon size={12} />
                  <span className="d-none d-lg-inline">{button.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="d-flex flex-column gap-1 align-items-end">
            <div className="d-flex gap-1 flex-wrap">
              {rightButtons
                .filter((b) => b.variant === "info")
                .map((button, index) => (
                  <Button
                    key={index}
                    variant={getButtonVariantClass(button.variant)}
                    className="rounded-pill d-flex align-items-center gap-1 btn-pill-custom"
                    title={button.label}
                    onClick={button.label === "Update" ? onRefresh : undefined}
                  >
                    <button.icon size={12} />
                    <span className="d-none d-lg-inline">{button.label}</span>
                  </Button>
                ))}
            </div>

            <div className="d-flex gap-1 flex-wrap">
              {rightButtons
                .filter((b) => b.variant !== "info")
                .map((button, index) => (
                  <Button
                    key={index}
                    variant={getButtonVariantClass(button.variant)}
                    className="rounded-pill d-flex align-items-center gap-1 btn-pill-custom"
                    title={button.label}
                  >
                    <button.icon size={12} />
                    <span className="d-none d-lg-inline">{button.label}</span>
                  </Button>
                ))}
            </div>
          </div>
        </div>

        <div className="py-0 mt-3">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="link"
                size="sm"
                className="p-1 text-decoration-none"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeftIcon size={16} />
              </Button>
              <Button
                variant="link"
                size="sm"
                className="p-1 text-decoration-none"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon size={16} />
              </Button>
              <div className="d-flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "primary" : "link"}
                      size="sm"
                      className="px-2 py-1"
                      onClick={() => onPageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="link"
                size="sm"
                className="p-1 text-decoration-none"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon size={16} />
              </Button>
              <Button
                variant="link"
                size="sm"
                className="p-1 text-decoration-none"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRightIcon size={16} />
              </Button>
            </div>

            <div className="d-flex align-items-center gap-2 flex-wrap contacts-header-filters">
              <div className="d-flex flex-column align-items-start position-relative filter-select-wrapper" style={{ width: '220px', minWidth: '0' }}>
                <FloatingSelect label="Filter">
                  <FloatingSelectOption value="all-opportunities">
                    All Opportunities
                  </FloatingSelectOption>
                </FloatingSelect>
              </div>

              <div className="d-flex flex-column align-items-start position-relative search-input-wrapper" style={{ width: '280px', minWidth: '0' }}>
                <FloatingInput
                  label="Search"
                  placeholder="Search Contact..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyPress={handleSearchKeyPress}
                />
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <Button
                variant="link"
                size="sm"
                className="p-1 text-decoration-none"
                onClick={onRefresh}
              >
                <RefreshCwIcon size={16} />
              </Button>
              <Button variant="link" size="sm" className="p-1 text-decoration-none">
                <SettingsIcon size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Contacts = (): JSX.Element => {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState('');
  const pageSize = 40;

  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>({ key: 'name', direction: 'asc' });

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = React.useState<number | null>(null);

  const columns: ColumnConfig[] = [
    { id: 'checkbox', label: '', defaultWidth: 48, minWidth: 48 },
    { id: 'name', label: 'Name', defaultWidth: 250, minWidth: 150 },
    { id: 'email', label: 'Email', defaultWidth: 250, minWidth: 150 },
    { id: 'cell_phone', label: 'Cell Phone', defaultWidth: 150, minWidth: 100 },
    { id: 'state', label: 'State', defaultWidth: 100, minWidth: 80 },
    { id: 'sales_cycle', label: 'Sales Cycle', defaultWidth: 150, minWidth: 100 },
    { id: 'lead_source', label: 'Lead Source', defaultWidth: 150, minWidth: 100 },
    { id: 'created_date', label: 'Created Date', defaultWidth: 150, minWidth: 100 },
    { id: 'white_board', label: 'White Board', defaultWidth: 150, minWidth: 100 },
    { id: 'assigned_user', label: 'Assigned User', defaultWidth: 150, minWidth: 100 },
    { id: 'next_date', label: 'Next Date', defaultWidth: 150, minWidth: 100 },
    { id: 'favorite_color', label: 'Favorite Color', defaultWidth: 150, minWidth: 100 },
  ];

  const {
    columnWidths,
    isResizing,
    resizingColumn,
    handleMouseDown,
  } = useResizableColumns(columns, 'contactsColumns');

  React.useEffect(() => {
    loadContacts();
  }, [currentPage, searchTerm, sortConfig]);

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

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await contactService.getAll({
        page: currentPage,
        pageSize,
        search: searchTerm,
        sortBy: sortConfig?.key || 'name',
        sortDirection: sortConfig?.direction || 'asc',
      });
      setContacts(response.contacts);
      setTotalRecords(response.total);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contacts');
      console.error('Error loading contacts:', err);
    } finally {
      setLoading(false);
    }
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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    loadContacts();
  };

  if (loading && contacts.length === 0) {
    return (
      <div className="d-flex flex-column w-100 h-100 align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading contacts...</p>
      </div>
    );
  }

  if (error && contacts.length === 0) {
    return (
      <div className="d-flex flex-column w-100 h-100 align-items-center justify-content-center">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
        <button className="btn btn-primary" onClick={loadContacts}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column w-100 h-100">
      <style>
        {`
          .contacts-table-scroll::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }
          .contacts-table-scroll::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 5px;
          }
          .contacts-table-scroll::-webkit-scrollbar-thumb {
            background: #cbd5e0;
            border-radius: 5px;
          }
          .contacts-table-scroll::-webkit-scrollbar-thumb:hover {
            background: #a0aec0;
          }
          .contacts-table-scroll::-webkit-scrollbar-corner {
            background: #f1f1f1;
          }
        `}
      </style>
      <div className="flex-shrink-0">
        <ContactsHeader
          totalRecords={totalRecords}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
          onRefresh={handleRefresh}
        />
      </div>

      <div className="px-3 pt-3">
        <div
          ref={scrollRef}
          className="bg-white rounded-3 overflow-auto border shadow-sm contacts-table-scroll"
          style={{ maxHeight: maxHeight ?? undefined, overflowX: 'auto', overflowY: 'auto' }}
        >
          <div style={{ minWidth: '1400px' }}>
            <Table className={`standard-table table-striped mb-0 ${isResizing ? 'resizing' : ''}`}>
              <caption className="visually-hidden">
                Contacts table showing {contacts.length} client records.
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
                renderCustomHeader={(column) => {
                  if (column.id === 'checkbox') {
                    return (
                      <input type="checkbox" className="form-check-input" aria-label="Select all" />
                    );
                  }
                  if (column.id === 'name') {
                    return (
                      <>
                        <span>Name</span>
                        <div className="d-flex gap-1 ms-2">
                          <div className="rounded-circle bg-danger" style={{ width: '8px', height: '8px' }} title="Red" />
                          <div className="rounded-circle bg-warning" style={{ width: '8px', height: '8px' }} title="Yellow" />
                          <div className="rounded-circle bg-success" style={{ width: '8px', height: '8px' }} title="Green" />
                        </div>
                      </>
                    );
                  }
                  return null;
                }}
              />
              <TableBody>
                {contacts.map((contact, index) => (
                  <TableRow
                    key={contact.id}
                    role="row"
                    aria-rowindex={index + 2}
                  >
                    <TableCell
                      className="position-sticky start-0"
                      style={{ width: `${columnWidths.checkbox}px`, zIndex: 30 }}
                      role="gridcell"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          aria-label={`Select ${contact.name}`}
                          aria-describedby={`contact-${contact.id}-name`}
                        />
                        <div
                          className={`rounded-circle ${contact.status_color || 'bg-success'}`}
                          style={{ width: '8px', height: '8px' }}
                        />
                      </div>
                    </TableCell>

                    <TableCell
                      className="position-sticky"
                      style={{ left: `${columnWidths.checkbox}px`, width: `${columnWidths.name}px`, zIndex: 30 }}
                      role="gridcell"
                    >
                      <div className="d-flex flex-column">
                        <div className="fw-medium small text-dark">
                          <span id={`contact-${contact.id}-name`}>{contact.name}</span>
                        </div>
                        <div className="d-flex align-items-center gap-1 text-secondary" style={{ fontSize: '0.75rem' }}>
                          <StarIcon size={12} />
                          <span>Default</span>
                        </div>
                        <div className="text-secondary" style={{ fontSize: '0.75rem' }}>
                          {contact.client_tether || 'Client Tether'}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell role="gridcell" style={{ width: `${columnWidths.email}px` }}>
                      <div className="text-dark">{contact.email || ''}</div>
                    </TableCell>

                    <TableCell role="gridcell" style={{ width: `${columnWidths.cell_phone}px` }}>
                      <div className="d-flex align-items-center gap-1 text-dark">
                        {contact.cell_phone && (
                          <>
                            <PhoneIcon size={12} />
                            {contact.cell_phone}
                          </>
                        )}
                      </div>
                    </TableCell>

                    <TableCell role="gridcell" style={{ width: `${columnWidths.state}px` }}>
                      <div className="text-dark">{contact.state || ''}</div>
                    </TableCell>

                    <TableCell role="gridcell" style={{ width: `${columnWidths.sales_cycle}px` }}>
                      <div className="text-dark">{contact.sales_cycle || ''}</div>
                    </TableCell>

                    <TableCell role="gridcell" style={{ width: `${columnWidths.lead_source}px` }}>
                      <div className="text-dark">{contact.lead_source || ''}</div>
                    </TableCell>

                    <TableCell role="gridcell" style={{ width: `${columnWidths.created_date}px` }}>
                      <div className="text-dark">
                        {contact.created_date ? new Date(contact.created_date).toLocaleDateString() : ''}
                      </div>
                    </TableCell>

                    <TableCell role="gridcell" style={{ width: `${columnWidths.white_board}px` }}>
                      <div className="text-dark">{contact.white_board || ''}</div>
                    </TableCell>

                    <TableCell role="gridcell" style={{ width: `${columnWidths.assigned_user}px` }}>
                      <div className="text-dark">{contact.assigned_user || ''}</div>
                    </TableCell>

                    <TableCell role="gridcell" style={{ width: `${columnWidths.next_date}px` }}>
                      <div className="text-dark">
                        {contact.next_date ? new Date(contact.next_date).toLocaleDateString() : ''}
                      </div>
                    </TableCell>

                    <TableCell role="gridcell" style={{ width: `${columnWidths.favorite_color}px` }}>
                      <div className="d-flex align-items-center gap-2 text-dark">
                        {contact.favorite_color && (
                          <>
                            <div
                              className={`rounded-circle ${
                                contact.favorite_color === "Red"
                                  ? "bg-danger"
                                  : contact.favorite_color === "Blue"
                                  ? "bg-primary"
                                  : contact.favorite_color === "Yellow"
                                  ? "bg-warning"
                                  : "bg-success"
                              }`}
                              style={{ width: '12px', height: '12px' }}
                              aria-label={`${contact.favorite_color} color indicator`}
                            />
                            {contact.favorite_color}
                          </>
                        )}
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
  );
};
