import React from "react";
import { Button } from "../../components/bootstrap/Button";
import { Form, InputGroup, Dropdown, Button as BSButton } from "react-bootstrap";
import { Table, TableBody, TableRow, TableCell } from "../../components/bootstrap/Table";
import { ResizableTableHead } from "../../components/bootstrap/ResizableTableHead";
import { useResizableColumns, ColumnConfig } from "../../hooks/useResizableColumns";
import { contactService } from "../../services/contactService";
import { Contact } from "../../lib/supabase";
import { PageSettingsModal, ColumnOption } from "./PageSettingsModal";
import { RefreshCw as RefreshCwIcon, Settings as SettingsIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, ChevronsLeft as ChevronsLeftIcon, ChevronsRight as ChevronsRightIcon, Phone as PhoneIcon, Star as StarIcon, Mail as MailIcon, MessageSquare as MessageSquareIcon, Merge as MergeIcon, Bitcoin as EditIcon, Users as UsersIcon, SeparatorHorizontal as SeparatorHorizontalIcon, Send as SendIcon, Link as LinkIcon, Upload as UploadIcon, Download as DownloadIcon, Pin as PushPinIcon, RotateCcw as RotateCcwIcon, Trash as TrashIcon, ChevronUp, ChevronDown, Search } from "lucide-react";

const STORAGE_KEY_VISIBLE_COLUMNS = 'contactsVisibleColumns';
const STORAGE_KEY_PAGE_SIZE = 'contactsPageSize';

const DEFAULT_VISIBLE_COLUMNS = ['email', 'cell_phone', 'state', 'sales_cycle', 'lead_source', 'created_date', 'white_board', 'assigned_user', 'next_date', 'favorite_color'];
const DEFAULT_PAGE_SIZE = 25;

const actionButtons = [
  { label: "Email", variant: "info", icon: MailIcon },
  { label: "SMS", variant: "info", icon: MessageSquareIcon },
  { label: "Merge", variant: "info", icon: MergeIcon },
  { label: "Change", variant: "info", icon: EditIcon },
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

const getStatusBorderColor = (statusColor: string | null | undefined): string => {
  if (!statusColor) return '#9ca3af';
  switch (statusColor) {
    case 'bg-success':
      return '#198754';
    case 'bg-warning':
      return '#ffc107';
    case 'bg-danger':
      return '#dc3545';
    case 'bg-primary':
      return '#0d6efd';
    case 'bg-info':
      return '#0dcaf0';
    default:
      return '#9ca3af';
  }
};

interface ContactsHeaderProps {
  totalRecords: number;
  selectedCount: number;
  currentPage: number;
  totalPages: number;
  filterValue: string;
  onFilterChange: (filter: string) => void;
  onPageChange: (page: number) => void;
  onSearch: (search: string) => void;
  onRefresh: () => void;
  onOpenSettings: () => void;
}

const ContactsHeader: React.FC<ContactsHeaderProps> = ({
  totalRecords,
  selectedCount,
  currentPage,
  totalPages,
  filterValue,
  onFilterChange,
  onPageChange,
  onSearch,
  onRefresh,
  onOpenSettings
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

  const handleSearchClick = () => {
    onSearch(searchValue);
  };

  const filterOptions = [
    { value: 'main-contacts', label: 'Main Contacts' },
    { value: 'active-opportunities', label: 'Active Opportunities' },
    { value: 'all-opportunities', label: 'All Opportunities' },
  ];

  const currentFilterLabel = filterOptions.find(opt => opt.value === filterValue)?.label || 'All Opportunities';

  return (
    <div className="px-3 pt-3">
      <div className="bg-white rounded-3 pt-3 pb-3 px-4 border shadow-sm">
        <h2 className="h4 fw-bold text-dark mb-2">Contacts - Client</h2>
        <div className="d-flex align-items-center justify-content-between">
          <p className="text-secondary mb-0" style={{ fontSize: '0.875rem' }}>
            {totalRecords} Records in Clients List
            {selectedCount > 0 && (
              <span> | {selectedCount} Selected</span>
            )}
          </p>
          <div className="d-flex align-items-center gap-2">
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-primary"
                size="sm"
                className="d-flex align-items-center gap-1"
                style={{ minWidth: '160px', justifyContent: 'space-between' }}
              >
                {currentFilterLabel}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {filterOptions.map((option) => (
                  <Dropdown.Item
                    key={option.value}
                    active={filterValue === option.value}
                    onClick={() => onFilterChange(option.value)}
                  >
                    {option.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <InputGroup style={{ width: '280px', flexWrap: 'nowrap' }}>
              <Form.Control
                type="text"
                placeholder="Search Contact..."
                value={searchValue}
                onChange={handleSearchChange}
                onKeyPress={handleSearchKeyPress}
                style={{ borderRight: 'none' }}
                size="sm"
              />
              <BSButton
                variant="primary"
                size="sm"
                className="d-flex align-items-center justify-content-center"
                onClick={handleSearchClick}
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  padding: '0.375rem 0.5rem'
                }}
              >
                <Search size={16} />
              </BSButton>
            </InputGroup>
            <BSButton
              variant="success"
              size="sm"
              className="d-flex align-items-center gap-2 fw-bold"
              style={{
                whiteSpace: 'nowrap',
                padding: '0.375rem 0.75rem'
              }}
              title="Add new client"
            >
              New Client
            </BSButton>
          </div>
        </div>

        <div className="py-0 mt-3">
          <div className="d-flex align-items-center justify-content-between">
            <div style={{ width: '48px' }} />
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

            <div className="d-flex align-items-center gap-2">
              <Button
                variant="link"
                size="sm"
                className="p-1 text-decoration-none"
                onClick={onRefresh}
              >
                <RefreshCwIcon size={16} />
              </Button>
              <Button
                variant="link"
                size="sm"
                className="p-1 text-decoration-none"
                onClick={onOpenSettings}
              >
                <SettingsIcon size={16} />
              </Button>
            </div>
          </div>
        </div>

        {selectedCount > 0 && (
          <div className="pt-3 mt-2 border-top">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex gap-1 flex-wrap">
                {actionButtons.map((button, index) => (
                  <Button
                    key={index}
                    variant={getButtonVariantClass(button.variant)}
                    className="rounded-pill d-flex align-items-center gap-1"
                    title={button.label}
                    style={{ padding: '0.25rem 0.625rem', fontSize: '0.8125rem' }}
                  >
                    <button.icon size={12} />
                    <span>{button.label}</span>
                  </Button>
                ))}
              </div>
              <div className="d-flex gap-1 flex-wrap">
                {rightButtons.map((button, index) => (
                  <Button
                    key={index}
                    variant={getButtonVariantClass(button.variant)}
                    className="rounded-pill d-flex align-items-center gap-1"
                    title={button.label}
                    onClick={button.label === "Update" ? onRefresh : undefined}
                    style={{ padding: '0.25rem 0.625rem', fontSize: '0.8125rem' }}
                  >
                    <button.icon size={12} />
                    <span>{button.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e);
  }
  return defaultValue;
};

const saveToLocalStorage = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
};

export const Contacts = (): JSX.Element => {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterValue, setFilterValue] = React.useState('all-opportunities');
  const [selectedContacts, setSelectedContacts] = React.useState<string[]>([]);

  const [pageSize, setPageSize] = React.useState(() =>
    loadFromLocalStorage(STORAGE_KEY_PAGE_SIZE, DEFAULT_PAGE_SIZE)
  );
  const [visibleColumns, setVisibleColumns] = React.useState<string[]>(() =>
    loadFromLocalStorage(STORAGE_KEY_VISIBLE_COLUMNS, DEFAULT_VISIBLE_COLUMNS)
  );
  const [showSettingsModal, setShowSettingsModal] = React.useState(false);

  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>({ key: 'name', direction: 'asc' });

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = React.useState<number | null>(null);

  const allColumns: ColumnConfig[] = [
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

  const toggleableColumnOptions: ColumnOption[] = allColumns
    .filter(col => col.id !== 'checkbox' && col.id !== 'name')
    .map(col => ({ id: col.id, label: col.label }));

  const columns = allColumns.filter(col =>
    col.id === 'checkbox' || col.id === 'name' || visibleColumns.includes(col.id)
  );

  const {
    columnWidths,
    isResizing,
    resizingColumn,
    handleMouseDown,
  } = useResizableColumns(allColumns, 'contactsColumns');

  React.useEffect(() => {
    loadContacts();
  }, [currentPage, searchTerm, sortConfig, pageSize]);

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

  const handleFilterChange = (filter: string) => {
    setFilterValue(filter);
    setCurrentPage(1);
  };

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts(prev => {
      if (prev.includes(contactId)) {
        return prev.filter(id => id !== contactId);
      }
      return [...prev, contactId];
    });
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(c => c.id));
    }
  };

  const handleOpenSettings = () => {
    setShowSettingsModal(true);
  };

  const handleSettingsUpdate = (newVisibleColumns: string[], newPageSize: number) => {
    setVisibleColumns(newVisibleColumns);
    setPageSize(newPageSize);
    saveToLocalStorage(STORAGE_KEY_VISIBLE_COLUMNS, newVisibleColumns);
    saveToLocalStorage(STORAGE_KEY_PAGE_SIZE, newPageSize);
    setCurrentPage(1);
  };

  const renderCell = (contact: Contact, columnId: string) => {
    switch (columnId) {
      case 'email':
        return <div className="text-dark">{contact.email || ''}</div>;
      case 'cell_phone':
        return (
          <div className="d-flex align-items-center gap-1 text-dark">
            {contact.cell_phone && (
              <>
                <PhoneIcon size={12} />
                {contact.cell_phone}
              </>
            )}
          </div>
        );
      case 'state':
        return <div className="text-dark">{contact.state || ''}</div>;
      case 'sales_cycle':
        return <div className="text-dark">{contact.sales_cycle || ''}</div>;
      case 'lead_source':
        return <div className="text-dark">{contact.lead_source || ''}</div>;
      case 'created_date':
        return (
          <div className="text-dark">
            {contact.created_date ? new Date(contact.created_date).toLocaleDateString() : ''}
          </div>
        );
      case 'white_board':
        return <div className="text-dark">{contact.white_board || ''}</div>;
      case 'assigned_user':
        return <div className="text-dark">{contact.assigned_user || ''}</div>;
      case 'next_date':
        return (
          <div className="text-dark">
            {contact.next_date ? new Date(contact.next_date).toLocaleDateString() : ''}
          </div>
        );
      case 'favorite_color':
        return (
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
        );
      default:
        return null;
    }
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
          selectedCount={selectedContacts.length}
          currentPage={currentPage}
          totalPages={totalPages}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          onOpenSettings={handleOpenSettings}
        />
      </div>

      <div className="px-3 pt-3 flex-grow-1 d-flex flex-column min-h-0">
        <div
          ref={scrollRef}
          className="bg-white rounded-3 border shadow-sm contacts-table-scroll flex-grow-1"
          style={{ maxHeight: maxHeight ?? undefined, overflowY: 'auto', overflowX: 'auto' }}
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
                stickyColumns={[
                  { columnId: 'checkbox', left: 0 },
                  { columnId: 'name', left: columnWidths.checkbox }
                ]}
                renderCustomHeader={(column) => {
                  if (column.id === 'checkbox') {
                    return (
                      <input
                        type="checkbox"
                        className="form-check-input"
                        aria-label="Select all"
                        checked={contacts.length > 0 && selectedContacts.length === contacts.length}
                        onChange={handleSelectAll}
                      />
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
                      style={{
                        width: `${columnWidths.checkbox}px`,
                        zIndex: 30,
                        borderLeft: `3px solid ${getStatusBorderColor(contact.status_color)}`
                      }}
                      role="gridcell"
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        aria-label={`Select ${contact.name}`}
                        aria-describedby={`contact-${contact.id}-name`}
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => handleSelectContact(contact.id)}
                      />
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

                    {columns
                      .filter(col => col.id !== 'checkbox' && col.id !== 'name')
                      .map(col => (
                        <TableCell
                          key={col.id}
                          role="gridcell"
                          style={{ width: `${columnWidths[col.id]}px` }}
                        >
                          {renderCell(contact, col.id)}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <PageSettingsModal
        show={showSettingsModal}
        onHide={() => setShowSettingsModal(false)}
        columns={toggleableColumnOptions}
        visibleColumns={visibleColumns}
        pageSize={pageSize}
        onUpdate={handleSettingsUpdate}
      />
    </div>
  );
};
