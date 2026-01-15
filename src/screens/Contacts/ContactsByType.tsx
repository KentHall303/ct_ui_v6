import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../../components/bootstrap/Button";
import { Form, InputGroup, Badge, Button as BSButton } from "react-bootstrap";
import { Table, TableBody, TableRow, TableCell } from "../../components/bootstrap/Table";
import { ResizableTableHead } from "../../components/bootstrap/ResizableTableHead";
import { useResizableColumns, ColumnConfig } from "../../hooks/useResizableColumns";
import { contactService } from "../../services/contactService";
import { Contact, ContactType } from "../../lib/supabase";
import { PageSettingsModal, ColumnOption } from "./PageSettingsModal";
import { ContactProfileFSModal3 } from "../../components/modals/ContactProfileFSModal3";
import { NewClientModal } from "../../components/modals/NewClientModal";
import { ContactTypeBadge } from "../../components/contacts/ContactTypeBadge";
import { RefreshCw as RefreshCwIcon, Settings as SettingsIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, ChevronsLeft as ChevronsLeftIcon, ChevronsRight as ChevronsRightIcon, Phone as PhoneIcon, Star as StarIcon, Upload as UploadIcon, Download as DownloadIcon, ChevronUp, ChevronDown, Search, Circle, Filter as FilterIcon, X as XIcon, Pencil as PencilIcon, Check as CheckIcon } from "lucide-react";
import { ContactsFiltersModal } from "./ContactsFiltersModal";
import { FilterConfig } from "../../services/savedFiltersService";

const DEFAULT_VISIBLE_COLUMNS = ['email', 'cell_phone', 'state', 'sales_cycle', 'lead_source', 'created_date', 'white_board', 'assigned_user', 'next_date', 'favorite_color'];
const DEFAULT_PAGE_SIZE = 25;

const contactTypeOptions: ContactType[] = ['Client', 'Employee', 'Partner', 'Vendor', 'Other'];

const alwaysVisibleButtons = [
  { label: "Update", variant: "info", icon: RefreshCwIcon },
  { label: "Import", variant: "info", icon: UploadIcon },
  { label: "Export", variant: "info", icon: DownloadIcon },
];

const getButtonVariantClass = (variant: string) => {
  switch (variant) {
    case "info": return "primary";
    case "warning": return "warning";
    case "destructive": return "danger";
    default: return "success";
  }
};

const getStatusBorderColor = (statusColor: string | null | undefined): string => {
  if (!statusColor) return '#9ca3af';
  switch (statusColor) {
    case 'bg-success': return '#198754';
    case 'bg-warning': return '#ffc107';
    case 'bg-danger': return '#dc3545';
    case 'bg-primary': return '#0d6efd';
    case 'bg-info': return '#0dcaf0';
    default: return '#9ca3af';
  }
};

interface ContactsByTypeProps {
  contactType: ContactType;
  title: string;
  newButtonLabel?: string;
}

const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
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

export const ContactsByType: React.FC<ContactsByTypeProps> = ({ contactType, title, newButtonLabel }) => {
  const storageKeyPrefix = `contacts${contactType}`;
  const STORAGE_KEY_VISIBLE_COLUMNS = `${storageKeyPrefix}VisibleColumns`;
  const STORAGE_KEY_PAGE_SIZE = `${storageKeyPrefix}PageSize`;

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [activePriorityFilter, setActivePriorityFilter] = useState<string | null>(null);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<Partial<Contact>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [pageSize, setPageSize] = useState(() => loadFromLocalStorage(STORAGE_KEY_PAGE_SIZE, DEFAULT_PAGE_SIZE));
  const [visibleColumns, setVisibleColumns] = useState<string[]>(() => loadFromLocalStorage(STORAGE_KEY_VISIBLE_COLUMNS, DEFAULT_VISIBLE_COLUMNS));
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [showContactModal, setShowContactModal] = useState(false);
  const [contactModalMode, setContactModalMode] = useState<'create' | 'edit'>('create');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const [showNewClientModal, setShowNewClientModal] = useState(false);

  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterConfig>({});

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>({ key: 'name', direction: 'asc' });

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  const allColumns: ColumnConfig[] = [
    { id: 'checkbox', label: '', defaultWidth: 110, minWidth: 110 },
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

  const columns = allColumns.filter(col => col.id === 'checkbox' || col.id === 'name' || visibleColumns.includes(col.id));

  const { columnWidths, isResizing, resizingColumn, handleMouseDown } = useResizableColumns(allColumns, `${storageKeyPrefix}Columns`);

  useEffect(() => {
    loadContacts();
  }, [currentPage, searchTerm, sortConfig, pageSize, contactType]);

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
      const response = await contactService.getByType(contactType, {
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
      return sortConfig.direction === 'asc' ? <ChevronUp size={14} style={{ marginLeft: '8px' }} /> : <ChevronDown size={14} style={{ marginLeft: '8px' }} />;
    }
    return <ChevronUp size={14} style={{ marginLeft: '8px', opacity: 0.3 }} />;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = () => {
    setSearchTerm(searchValue);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    loadContacts();
  };

  const handlePriorityFilterChange = (priority: string) => {
    setActivePriorityFilter(prev => prev === priority ? null : priority);
  };

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts(prev => prev.includes(contactId) ? prev.filter(id => id !== contactId) : [...prev, contactId]);
  };

  const handleSelectAll = () => {
    const filteredContactsList = activePriorityFilter ? contacts.filter(contact => contact.status_color === activePriorityFilter) : contacts;
    if (selectedContacts.length === filteredContactsList.length && filteredContactsList.length > 0) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContactsList.map(c => c.id));
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

  const handleNewContact = () => {
    setShowNewClientModal(true);
  };

  const handleClientCreated = async (contact: Contact) => {
    await loadContacts();
    setShowNewClientModal(false);
    setSelectedContact(contact);
    setContactModalMode('edit');
    setShowContactModal(true);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setContactModalMode('edit');
    setShowContactModal(true);
  };

  const handleContactModalClose = () => {
    setShowContactModal(false);
    setSelectedContact(null);
  };

  const handleContactSaved = () => {
    loadContacts();
  };

  const handleOpenFilters = () => {
    setShowFiltersModal(true);
  };

  const handleApplyFilters = (filters: FilterConfig) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setAppliedFilters({});
    setCurrentPage(1);
  };

  const hasActiveFilters = Object.keys(appliedFilters).length > 0;

  const startEditing = useCallback((contact: Contact) => {
    setEditingContactId(contact.id);
    setEditedValues({
      name: contact.name,
      email: contact.email,
      cell_phone: contact.cell_phone,
      state: contact.state,
      sales_cycle: contact.sales_cycle,
      lead_source: contact.lead_source,
      created_date: contact.created_date,
      white_board: contact.white_board,
      assigned_user: contact.assigned_user,
      next_date: contact.next_date,
      favorite_color: contact.favorite_color,
      contact_type: contact.contact_type,
    });
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingContactId(null);
    setEditedValues({});
  }, []);

  const saveEditing = useCallback(async () => {
    if (!editingContactId) return;
    setIsSaving(true);
    try {
      await contactService.updateInline(editingContactId, editedValues);
      setEditingContactId(null);
      setEditedValues({});
      await loadContacts();
    } catch (err) {
      console.error('Failed to save contact:', err);
    } finally {
      setIsSaving(false);
    }
  }, [editingContactId, editedValues]);

  const updateEditedField = useCallback((field: keyof Contact, value: string) => {
    setEditedValues(prev => ({ ...prev, [field]: value }));
  }, []);

  const renderEditableCell = (contact: Contact, columnId: string) => {
    const isEditing = editingContactId === contact.id;
    const value = isEditing ? editedValues[columnId as keyof Contact] : contact[columnId as keyof Contact];

    if (isEditing) {
      return (
        <Form.Control
          size="sm"
          type="text"
          value={(value as string) || ''}
          onChange={(e) => updateEditedField(columnId as keyof Contact, e.target.value)}
        />
      );
    }

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
        return <div className="text-dark">{contact.created_date ? new Date(contact.created_date).toLocaleDateString() : ''}</div>;
      case 'white_board':
        return <div className="text-dark">{contact.white_board || ''}</div>;
      case 'assigned_user':
        return <div className="text-dark">{contact.assigned_user || ''}</div>;
      case 'next_date':
        return <div className="text-dark">{contact.next_date ? new Date(contact.next_date).toLocaleDateString() : ''}</div>;
      case 'favorite_color':
        return (
          <div className="d-flex align-items-center gap-2 text-dark">
            {contact.favorite_color && (
              <>
                <div
                  className={`rounded-circle ${contact.favorite_color === "Red" ? "bg-danger" : contact.favorite_color === "Blue" ? "bg-primary" : contact.favorite_color === "Yellow" ? "bg-warning" : "bg-success"}`}
                  style={{ width: '12px', height: '12px' }}
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
        <button className="btn btn-primary" onClick={loadContacts}>Retry</button>
      </div>
    );
  }

  const filteredContacts = activePriorityFilter ? contacts.filter(contact => contact.status_color === activePriorityFilter) : contacts;

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
          .editing-row {
            background-color: #fff3cd !important;
          }
        `}
      </style>
      <div className="flex-shrink-0">
        <div className="px-3 pt-3">
          <div className="bg-white rounded-3 pt-3 pb-3 px-4 border shadow-sm">
            <h2 className="h4 fw-bold text-dark mb-2">{title}</h2>
            <div className="d-flex align-items-center justify-content-between">
              <p className="text-secondary mb-0" style={{ fontSize: '0.875rem' }}>
                {totalRecords} Records
                {selectedContacts.length > 0 && <span> | {selectedContacts.length} Selected</span>}
              </p>
              <div className="d-flex align-items-center gap-2">
                <InputGroup style={{ width: '280px', flexWrap: 'nowrap' }}>
                  <Form.Control
                    type="text"
                    placeholder="Search Contact..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    style={{ borderRight: 'none' }}
                    size="sm"
                  />
                  <BSButton
                    variant="primary"
                    size="sm"
                    className="d-flex align-items-center justify-content-center"
                    onClick={handleSearch}
                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, padding: '0.375rem 0.5rem' }}
                  >
                    <Search size={16} />
                  </BSButton>
                </InputGroup>
                <BSButton
                  variant="success"
                  size="sm"
                  className="d-flex align-items-center gap-2 fw-bold"
                  style={{ whiteSpace: 'nowrap', padding: '0.375rem 0.75rem' }}
                  title={`Add new ${contactType.toLowerCase()}`}
                  onClick={handleNewContact}
                >
                  {newButtonLabel || `New ${contactType}`}
                </BSButton>
              </div>
            </div>

            <div className="py-0 mt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-1">
                  <Badge
                    bg="danger"
                    className="px-2 py-1"
                    title="Red Priority"
                    role="button"
                    onClick={() => handlePriorityFilterChange('bg-danger')}
                    style={{ cursor: 'pointer', opacity: activePriorityFilter === null || activePriorityFilter === 'bg-danger' ? 1 : 0.3, transition: 'opacity 0.2s' }}
                  >
                    <Circle size={10} fill="currentColor" />
                  </Badge>
                  <Badge
                    bg="warning"
                    className="px-2 py-1"
                    title="Yellow Priority"
                    role="button"
                    onClick={() => handlePriorityFilterChange('bg-warning')}
                    style={{ cursor: 'pointer', opacity: activePriorityFilter === null || activePriorityFilter === 'bg-warning' ? 1 : 0.3, transition: 'opacity 0.2s' }}
                  >
                    <Circle size={10} fill="currentColor" />
                  </Badge>
                  <Badge
                    bg="success"
                    className="px-2 py-1"
                    title="Green Priority"
                    role="button"
                    onClick={() => handlePriorityFilterChange('bg-success')}
                    style={{ cursor: 'pointer', opacity: activePriorityFilter === null || activePriorityFilter === 'bg-success' ? 1 : 0.3, transition: 'opacity 0.2s' }}
                  >
                    <Circle size={10} fill="currentColor" />
                  </Badge>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Button variant="link" size="sm" className="p-1 text-decoration-none" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                    <ChevronsLeftIcon size={16} />
                  </Button>
                  <Button variant="link" size="sm" className="p-1 text-decoration-none" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <ChevronLeftIcon size={16} />
                  </Button>
                  <div className="d-flex gap-1">
                    {totalPages > 0 && Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                        <Button key={pageNum} variant={currentPage === pageNum ? "primary" : "link"} size="sm" className="px-2 py-1" onClick={() => handlePageChange(pageNum)}>
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button variant="link" size="sm" className="p-1 text-decoration-none" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
                    <ChevronRightIcon size={16} />
                  </Button>
                  <Button variant="link" size="sm" className="p-1 text-decoration-none" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages || totalPages === 0}>
                    <ChevronsRightIcon size={16} />
                  </Button>
                </div>

                <div className="d-flex align-items-center gap-2">
                  {alwaysVisibleButtons.map((button, index) => (
                    <Button
                      key={index}
                      variant={getButtonVariantClass(button.variant)}
                      className="rounded-pill d-flex align-items-center gap-1"
                      title={button.label}
                      onClick={button.label === "Update" ? handleRefresh : undefined}
                      style={{ padding: '0.25rem 0.625rem', fontSize: '0.8125rem' }}
                    >
                      <button.icon size={12} />
                      <span>{button.label}</span>
                    </Button>
                  ))}
                  <Button variant="link" size="sm" className="p-1 text-decoration-none" onClick={handleOpenFilters} title="Advanced Filters">
                    <FilterIcon size={16} />
                  </Button>
                  <Button variant="link" size="sm" className={`p-1 text-decoration-none ${hasActiveFilters ? 'text-danger' : ''}`} onClick={handleClearFilters} title="Clear Filters">
                    <XIcon size={16} />
                  </Button>
                  <Button variant="link" size="sm" className="p-1 text-decoration-none" onClick={handleOpenSettings}>
                    <SettingsIcon size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 pt-3 flex-grow-1 d-flex flex-column min-h-0">
        <div
          ref={scrollRef}
          className="bg-white rounded-3 border shadow-sm contacts-table-scroll flex-grow-1"
          style={{ maxHeight: maxHeight ?? undefined, overflowY: 'auto', overflowX: 'auto' }}
        >
          <Table
            className={`standard-table table-striped mb-0 ${isResizing ? 'resizing' : ''}`}
            style={{ width: `${columns.reduce((sum, col) => sum + (columnWidths[col.id] || col.defaultWidth), 0)}px` }}
          >
            <caption className="visually-hidden">
              Contacts table showing {contacts.length} records.
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
              stickyColumns={[]}
              renderCustomHeader={(column) => {
                if (column.id === 'checkbox') {
                  return (
                    <input
                      type="checkbox"
                      className="form-check-input"
                      aria-label="Select all"
                      checked={filteredContacts.length > 0 && selectedContacts.length === filteredContacts.length}
                      onChange={handleSelectAll}
                    />
                  );
                }
                return null;
              }}
            />
            <TableBody>
              {filteredContacts.map((contact, index) => {
                const isEditing = editingContactId === contact.id;
                return (
                  <TableRow
                    key={contact.id}
                    role="row"
                    aria-rowindex={index + 2}
                    className={isEditing ? 'editing-row' : ''}
                  >
                    <TableCell
                      style={{
                        width: `${columnWidths.checkbox}px`,
                        borderLeft: `3px solid ${getStatusBorderColor(contact.status_color)}`
                      }}
                      role="gridcell"
                    >
                      <div className="d-flex align-items-center gap-2">
                        {isEditing ? (
                          <>
                            <Button
                              variant="success"
                              size="sm"
                              className="p-1"
                              onClick={saveEditing}
                              disabled={isSaving}
                              title="Save"
                            >
                              <CheckIcon size={14} />
                            </Button>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              className="p-1"
                              onClick={cancelEditing}
                              disabled={isSaving}
                              title="Cancel"
                            >
                              <XIcon size={14} />
                            </Button>
                          </>
                        ) : (
                          <>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              aria-label={`Select ${contact.name}`}
                              checked={selectedContacts.includes(contact.id)}
                              onChange={() => handleSelectContact(contact.id)}
                            />
                            {contact.contact_type && (
                              <ContactTypeBadge type={contact.contact_type} size="sm" />
                            )}
                            <Button
                              variant="link"
                              size="sm"
                              className="p-0 text-secondary"
                              onClick={() => startEditing(contact)}
                              title="Edit inline"
                            >
                              <PencilIcon size={14} />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>

                    <TableCell style={{ width: `${columnWidths.name}px` }} role="gridcell">
                      {isEditing ? (
                        <div className="d-flex align-items-center gap-2">
                          <Form.Select
                            size="sm"
                            value={editedValues.contact_type || contact.contact_type || contactType}
                            onChange={(e) => updateEditedField('contact_type', e.target.value)}
                            style={{ width: '90px' }}
                          >
                            {contactTypeOptions.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </Form.Select>
                          <Form.Control
                            size="sm"
                            type="text"
                            value={editedValues.name || ''}
                            onChange={(e) => updateEditedField('name', e.target.value)}
                            placeholder="Name"
                          />
                        </div>
                      ) : (
                        <div className="d-flex flex-column">
                          <div className="fw-medium small">
                            <span
                              className="text-primary"
                              style={{ cursor: 'pointer', textDecoration: 'none' }}
                              onClick={() => handleEditContact(contact)}
                              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => e.key === 'Enter' && handleEditContact(contact)}
                            >
                              {contact.name}
                            </span>
                          </div>
                          <div className="d-flex align-items-center gap-1 text-secondary" style={{ fontSize: '0.75rem' }}>
                            <StarIcon size={12} />
                            <span>Default</span>
                          </div>
                          <div className="text-secondary" style={{ fontSize: '0.75rem' }}>
                            {contact.client_tether || 'Client Tether'}
                          </div>
                        </div>
                      )}
                    </TableCell>

                    {columns
                      .filter(col => col.id !== 'checkbox' && col.id !== 'name')
                      .map(col => (
                        <TableCell key={col.id} role="gridcell" style={{ width: `${columnWidths[col.id]}px` }}>
                          {renderEditableCell(contact, col.id)}
                        </TableCell>
                      ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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

      <ContactsFiltersModal
        show={showFiltersModal}
        onHide={() => setShowFiltersModal(false)}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        initialFilters={appliedFilters}
      />

      <ContactProfileFSModal3
        show={showContactModal}
        onHide={handleContactModalClose}
        mode={contactModalMode}
        initialData={selectedContact}
        onSave={handleContactSaved}
      />

      <NewClientModal
        show={showNewClientModal}
        onHide={() => setShowNewClientModal(false)}
        onClientCreated={handleClientCreated}
        defaultContactType={contactType}
      />
    </div>
  );
};
