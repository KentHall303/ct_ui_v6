import React from "react";
import { Button } from "../../components/bootstrap/Button";
import { FloatingInput, FloatingSelect, FloatingSelectOption } from "../../components/bootstrap/FormControls";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/bootstrap/Table";
import { ContactInfoCard } from "../../components/ContactInfoCard";
import { RefreshCw as RefreshCwIcon, Settings as SettingsIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, ChevronsLeft as ChevronsLeftIcon, ChevronsRight as ChevronsRightIcon, Phone as PhoneIcon, Star as StarIcon, UserPlus as UserPlusIcon, Mail as MailIcon, MessageSquare as MessageSquareIcon, Merge as MergeIcon, Bitcoin as EditIcon, Users as UsersIcon, SeparatorHorizontal as SeparatorHorizontalIcon, Send as SendIcon, Link as LinkIcon, Upload as UploadIcon, Download as DownloadIcon, Pin as PushPinIcon, RotateCcw as RotateCcwIcon, Trash as TrashIcon, Clock as ClockIcon, Paperclip as PaperclipIcon, Copy as CopyIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Mock data + small helpers                                           */
/* ------------------------------------------------------------------ */

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

const contactsData = Array.from({ length: 40 }).map((_, i) => {
  const colors = ["Red", "Blue", "Yellow"] as const;
  const states = ["TN", "UT", "CO"] as const;
  const statuses = ["bg-red-500", "bg-yellow-500", "bg-green-500"] as const;
  return {
    id: i + 1,
    name: "Lisa Berthing",
    email: "Kenthall303+325@gmail.com",
    cellPhone: "(303) 929-1447",
    state: states[i % states.length],
    salesCycle: "New Lead",
    leadSource: "Unknown",
    createdDate: "March 25, 2025",
    whiteBoard: "",
    statusColor: statuses[i % statuses.length],
    isStarred: false,
    clientTether: "Client Tether",
    assignedUser: ["Kent", "Dave", "Kurt", "Ankit"][i % 4],
    nextDate: "April 12, 2025",
    favoriteColor: colors[i % colors.length],
    contactInfoNumber: `${25814523 + i}`,
    pendingActionsCount: Math.floor(Math.random() * 5),
    attachmentsCount: Math.floor(Math.random() * 10),
  };
});

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

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

const ContactsHeader = () => (
  <div className="px-3 pt-3">
    <div className="bg-white rounded-3 pt-2 pb-4 px-3 border shadow-sm">
    <div className="d-flex align-items-center justify-content-between mb-1">
      <div className="d-flex align-items-baseline gap-4">
        <h1 className="h2 fw-bold text-dark">Contacts - Client</h1>
        <p className="small text-secondary">55 Records in Clients List</p>
      </div>
    </div>

    <div className="d-flex align-items-start justify-content-between gap-4 mb-3">
      <div className="d-flex flex-column gap-3">
        <div className="d-flex gap-2 flex-wrap">
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

        <div className="d-flex gap-2 flex-wrap">
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

      <div className="d-flex flex-column gap-3 align-items-end">
        <div className="d-flex gap-2 flex-wrap">
          {rightButtons
            .filter((b) => b.variant === "info")
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

        <div className="d-flex gap-2 flex-wrap">
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
          <Button variant="link" size="sm" className="p-1 text-decoration-none">
            <ChevronsLeftIcon size={16} />
          </Button>
          <Button variant="link" size="sm" className="p-1 text-decoration-none">
            <ChevronLeftIcon size={16} />
          </Button>
          <div className="d-flex gap-1">
            <Button
              variant="primary"
              size="sm"
              className="px-2 py-1"
            >
              1
            </Button>
            <Button variant="link" size="sm" className="px-2 py-1 text-decoration-none">
              2
            </Button>
          </div>
          <Button variant="link" size="sm" className="p-1 text-decoration-none">
            <ChevronRightIcon size={16} />
          </Button>
          <Button variant="link" size="sm" className="p-1 text-decoration-none">
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
            <FloatingInput label="Search" placeholder="Search Contact..." />
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Button variant="link" size="sm" className="p-1 text-decoration-none">
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

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

export const Contacts = (): JSX.Element => {
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>({ key: 'name', direction: 'asc' });

  // This ref container becomes the scroll parent for the table.
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = React.useState<number | null>(null);

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

  React.useLayoutEffect(() => {
    function computeHeight() {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // 16px bottom buffer to avoid touching the viewport edge
      const h = Math.max(200, Math.floor(vh - rect.top - 16));
      setMaxHeight(h);
    }
    computeHeight();
    window.addEventListener("resize", computeHeight);
    return () => window.removeEventListener("resize", computeHeight);
  }, []);

  return (
    <div className="d-flex flex-column w-100 h-100">
      <div className="flex-shrink-0">
        <ContactsHeader />
      </div>

      <div className="px-3 pt-3">
      <div
        ref={scrollRef}
        className="bg-white rounded-3 overflow-auto border shadow-sm"
        style={{ maxHeight: maxHeight ?? undefined }}
      >
        <div style={{ minWidth: '1400px' }}>
          {/* isolate => stable z-index for sticky cells */}
          <Table className="contacts-table position-relative">
            <caption className="visually-hidden">
              Contacts table showing {contactsData.length} client records. 
              Use arrow keys to navigate, Enter or Space to sort columns.
              {sortConfig && ` Currently sorted by ${sortConfig.key} in ${sortConfig.direction}ending order.`}
            </caption>
            {/* Sticky header */}
            <TableHeader>
              <TableRow>
                <TableHead className="position-sticky start-0" style={{ width: '48px', zIndex: 40, top: 0 }}>
                  <input type="checkbox" className="form-check-input" aria-label="Select all" />
                </TableHead>
                <TableHead
                  className="position-sticky"
                  style={{ left: '48px', minWidth: '250px', zIndex: 40, top: 0 }}
                  scope="col"
                  {...getSortProps('name')}
                  aria-label={`Sort by name ${sortConfig?.key === 'name' ? sortConfig.direction : 'ascending'}`}
                >
                  <>
                    <div className="d-flex align-items-center gap-2">
                      <span>Name{getSortIcon('name')}</span>
                      <div className="d-flex gap-1">
                        <div className="rounded-circle bg-danger" style={{ width: '8px', height: '8px' }} title="Red" />
                        <div className="rounded-circle bg-warning" style={{ width: '8px', height: '8px' }} title="Yellow" />
                        <div className="rounded-circle bg-success" style={{ width: '8px', height: '8px' }} title="Green" />
                      </div>
                    </div>
                  </>
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('email')}
                  aria-label={`Sort by email ${sortConfig?.key === 'email' ? sortConfig.direction : 'ascending'}`}
                >
                  Email{getSortIcon('email')}
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('cellPhone')}
                  aria-label={`Sort by cell phone ${sortConfig?.key === 'cellPhone' ? sortConfig.direction : 'ascending'}`}
                >
                  Cell Phone{getSortIcon('cellPhone')}
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('state')}
                  aria-label={`Sort by state ${sortConfig?.key === 'state' ? sortConfig.direction : 'ascending'}`}
                >
                  State{getSortIcon('state')}
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('salesCycle')}
                  aria-label={`Sort by sales cycle ${sortConfig?.key === 'salesCycle' ? sortConfig.direction : 'ascending'}`}
                >
                  Sales Cycle{getSortIcon('salesCycle')}
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('leadSource')}
                  aria-label={`Sort by lead source ${sortConfig?.key === 'leadSource' ? sortConfig.direction : 'ascending'}`}
                >
                  Lead Source{getSortIcon('leadSource')}
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('createdDate')}
                  aria-label={`Sort by created date ${sortConfig?.key === 'createdDate' ? sortConfig.direction : 'ascending'}`}
                >
                  Created Date{getSortIcon('createdDate')}
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('whiteBoard')}
                  aria-label={`Sort by white board ${sortConfig?.key === 'whiteBoard' ? sortConfig.direction : 'ascending'}`}
                >
                  White Board{getSortIcon('whiteBoard')}
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('assignedUser')}
                  aria-label={`Sort by assigned user ${sortConfig?.key === 'assignedUser' ? sortConfig.direction : 'ascending'}`}
                >
                  Assigned User{getSortIcon('assignedUser')}
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('nextDate')}
                  aria-label={`Sort by next date ${sortConfig?.key === 'nextDate' ? sortConfig.direction : 'ascending'}`}
                >
                  Next Date{getSortIcon('nextDate')}
                </TableHead>
                <TableHead
                  scope="col"
                  {...getSortProps('favoriteColor')}
                  aria-label={`Sort by favorite color ${sortConfig?.key === 'favoriteColor' ? sortConfig.direction : 'ascending'}`}
                >
                  Favorite Color{getSortIcon('favoriteColor')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contactsData.map((contact, index) => (
                <TableRow
                  key={contact.id}
                  role="row"
                  aria-rowindex={index + 2}
                >
                  <TableCell
                    className="position-sticky start-0"
                    style={{ zIndex: 30 }}
                    role="gridcell"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        aria-label={`Select ${contact.name}`}
                        aria-describedby={`contact-${contact.id}-name`}
                      />
                      <div className={`rounded-circle ${contact.statusColor.replace('bg-', 'bg-')}`} style={{ width: '8px', height: '8px' }} />
                    </div>
                  </TableCell>

                  {/* Sticky second column */}
                  <TableCell
                    className="position-sticky"
                    style={{ left: '48px', minWidth: '250px', zIndex: 30 }}
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
                      <div className="text-secondary" style={{ fontSize: '0.75rem' }}>{contact.clientTether}</div>
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="text-dark">{contact.email}</div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="d-flex align-items-center gap-1 text-dark">
                      <PhoneIcon size={12} />
                      {contact.cellPhone}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="text-dark">{contact.state}</div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="text-dark">
                      {contact.salesCycle}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="text-dark">
                      {contact.leadSource}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="text-dark">
                      {contact.createdDate}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="text-dark">
                      {contact.whiteBoard}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="text-dark">
                      {contact.assignedUser}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="text-dark">
                      {contact.nextDate}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell">
                    <div className="d-flex align-items-center gap-2 text-dark">
                      <div
                        className={`rounded-circle ${
                          contact.favoriteColor === "Red"
                            ? "bg-danger"
                            : contact.favoriteColor === "Blue"
                            ? "bg-primary"
                            : "bg-warning"
                        }`}
                        style={{ width: '12px', height: '12px' }}
                        aria-label={`${contact.favoriteColor} color indicator`}
                      />
                      {contact.favoriteColor}
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