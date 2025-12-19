import React from "react";
import { Button } from "../../components/bootstrap/Button";
import { Form, InputGroup, Dropdown, Button as BSButton } from "react-bootstrap";
import { Table, TableBody, TableRow, TableCell } from "../../components/bootstrap/Table";
import { ResizableTableHead } from "../../components/bootstrap/ResizableTableHead";
import { useResizableColumns, ColumnConfig } from "../../hooks/useResizableColumns";
import { contactService } from "../../services/contactService";
import { Contact } from "../../lib/supabase";
import { RefreshCw as RefreshCwIcon, Settings as SettingsIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, ChevronsLeft as ChevronsLeftIcon, ChevronsRight as ChevronsRightIcon, Phone as PhoneIcon, Star as StarIcon, Mail as MailIcon, MessageSquare as MessageSquareIcon, Merge as MergeIcon, Bitcoin as EditIcon, Users as UsersIcon, SeparatorHorizontal as SeparatorHorizontalIcon, Send as SendIcon, Link as LinkIcon, Upload as UploadIcon, Download as DownloadIcon, Pin as PushPinIcon, RotateCcw as RotateCcwIcon, Trash as TrashIcon, ChevronUp, ChevronDown, Search } from "lucide-react";

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
              <Button variant="link" size="sm" className="p-1 text-decoration-none">
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
                      <input
                        type="checkbox"
                        className="form-check-input"
                        aria-label="Select all"
                        checked={contacts.length > 0 && selectedContacts.length === contacts.length}
                        onChange={handleSelectAll}
                      />
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
                          checked={selectedContacts.includes(contact.id)}
                          onChange={() => handleSelectContact(contact.id)}
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
