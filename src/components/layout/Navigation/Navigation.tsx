import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Collapse, Image } from "react-bootstrap";
import {
  LayoutDashboard as LayoutDashboardIcon,
  MessageSquare as MessageSquareIcon,
  ClipboardList as ClipboardListIcon,
  Settings as SettingsIcon,
  ChevronDown as ChevronDownIcon,
  Palette as PaletteIcon,
  PanelLeftOpen,
  PanelLeftClose,
  LogOut as LogOutIcon,
  Users as UsersIcon,
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  FileText as FileTextIcon
} from "lucide-react";

type NavigationProps = {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobile?: boolean;
  onMobileClose?: () => void;
};

type NavSubItem = {
  id: string;
  label: string;
  path: string;
};

type NavItem = {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  hasDropdown: boolean;
  subItems?: NavSubItem[];
};

const navigationItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboardIcon,
    hasDropdown: false
  },
  {
    id: "accounts",
    label: "Accounts",
    path: "/accounts",
    icon: UsersIcon,
    hasDropdown: false
  },
  {
    id: "pipeline",
    label: "Pipeline",
    path: "/pipeline",
    icon: BriefcaseIcon,
    hasDropdown: true,
    subItems: [
      { id: "pipeline-client", label: "Client", path: "/pipeline/client" },
      { id: "pipeline-employee", label: "Employee", path: "/pipeline/employee" },
      { id: "pipeline-partner", label: "Partner", path: "/pipeline/partner" },
      { id: "pipeline-vendor", label: "Vendor", path: "/pipeline/vendor" },
      { id: "pipeline-new-order", label: "New order", path: "/pipeline/new-order" },
    ]
  },
  {
    id: "contacts",
    label: "Contacts",
    path: "/contacts",
    icon: MessageSquareIcon,
    hasDropdown: true,
    subItems: [
      { id: "contacts-clients", label: "Clients", path: "/contacts/clients" },
      { id: "contacts-employee", label: "Employee", path: "/contacts/employee" },
      { id: "contacts-partner", label: "Partner", path: "/contacts/partner" },
      { id: "contacts-vendor", label: "Vendor", path: "/contacts/vendor" },
      { id: "contacts-new-other", label: "New Other", path: "/contacts/new-other" },
      { id: "contacts-all", label: "All", path: "/contacts/all" },
      { id: "contacts-archived", label: "Archived", path: "/contacts/archived" },
    ]
  },
  {
    id: "jobs",
    label: "Jobs",
    path: "/jobs",
    icon: ClipboardListIcon,
    hasDropdown: false
  },
  {
    id: "calendar",
    label: "Calendar",
    path: "/calendar",
    icon: CalendarIcon,
    hasDropdown: false
  },
  {
    id: "message-center",
    label: "Message Center",
    path: "/message-center",
    icon: MessageSquareIcon,
    hasDropdown: false
  },
  {
    id: "action-plans",
    label: "Action Plans",
    path: "/action-plans",
    icon: ClipboardListIcon,
    hasDropdown: true,
    subItems: [
      { id: "ap-connection", label: "Connection Plans", path: "/action-plans/connection" },
      { id: "ap-conversion", label: "Conversion Plans", path: "/action-plans/conversion" },
      { id: "ap-retention", label: "Retention Plans", path: "/action-plans/retention" },
      { id: "ap-events", label: "Events Plans", path: "/action-plans/events" },
      { id: "ap-seasonal", label: "Seasonal Plans", path: "/action-plans/seasonal" },
      { id: "ap-parallel-trigger", label: "Parallel Trigger Plans", path: "/action-plans/parallel-trigger" },
    ]
  },
  {
    id: "templates",
    label: "Templates",
    path: "/templates",
    icon: FileTextIcon,
    hasDropdown: true,
    subItems: [
      { id: "tp-email", label: "Email", path: "/templates/email" },
      { id: "tp-task", label: "Task", path: "/templates/task" },
      { id: "tp-text", label: "Text", path: "/templates/text" },
      { id: "tp-appt-invites", label: "Appointment Invites", path: "/templates/appt-invites" },
      { id: "tp-notes-logs", label: "Notes/Logs", path: "/templates/notes-logs" },
      { id: "tp-export-list", label: "Export List for Review", path: "/templates/export-list" },
      { id: "tp-dropdowns", label: "Dropdowns", path: "/templates/dropdowns" },
    ]
  },
  {
    id: "design-hub",
    label: "Design Hub",
    path: "/design-hub",
    icon: PaletteIcon,
    hasDropdown: true,
    subItems: [
      { id: "dh-announcements", label: "Announcements", path: "/design-hub/announcements" },
      { id: "dh-hosted-pages", label: "Hosted Pages", path: "/design-hub/hosted-pages" },
      { id: "dh-log-codes", label: "Log Codes", path: "/design-hub/log-codes" },
      { id: "dh-pipeline", label: "Pipeline", path: "/design-hub/pipeline" },
      { id: "dh-proposal", label: "Proposal", path: "/design-hub/proposal" },
      { id: "dh-proposal-modal", label: "Proposal Modal", path: "/design-hub/proposal-modal" },
      { id: "dh-table-standards", label: "Table Standards", path: "/design-hub/table-standards" },
      { id: "dh-triggers", label: "Triggers", path: "/design-hub/triggers" },
      { id: "dh-typography", label: "Typography", path: "/design-hub/typography" },
      { id: "form-examples", label: "Form Examples", path: "/design-hub/form-examples" },
      { id: "bootstrap-components", label: "Bootstrap Components", path: "/design-hub/bootstrap-components" },
      { id: "contact-profile-modal-3", label: "Contact Profile Modal", path: "/design-hub/contact-profile-modal-3" },
      { id: "meeting-management", label: "Meeting Management", path: "/design-hub/meeting-management" },
    ]
  },
  {
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: SettingsIcon,
    hasDropdown: true,
    subItems: [
      { id: "st-account", label: "Account", path: "/settings/account" },
      { id: "st-account-info", label: "Account Info", path: "/settings/account-info" },
      { id: "st-action-plans", label: "Action Plans", path: "/settings/action-plans" },
      { id: "st-add-ons", label: "Add-Ons", path: "/settings/add-ons" },
      { id: "st-announcements", label: "Announcements", path: "/settings/announcements" },
      { id: "st-angi-ads", label: "Angi Ads", path: "/settings/angi-ads" },
      { id: "st-angi-leads", label: "Angi Leads", path: "/settings/angi-leads" },
      { id: "st-api", label: "API", path: "/settings/api-monitor" },
      { id: "st-appointments", label: "Appointments", path: "/settings/appointments" },
      { id: "st-audit-logs", label: "Audit Logs", path: "/settings/audit-logs" },
      { id: "st-bid-types", label: "Bid Types", path: "/settings/bid-types" },
      { id: "st-calendar", label: "Calendar", path: "/settings/calendar" },
      { id: "st-chart-builder", label: "Chart Builder", path: "/settings/chart-builder" },
      { id: "st-company", label: "Company", path: "/settings/company" },
      { id: "st-contacts", label: "Contacts", path: "/settings/contacts" },
      { id: "st-currency", label: "Currency", path: "/settings/currency" },
      { id: "st-custom-fields", label: "Custom Fields", path: "/settings/custom-fields" },
      { id: "st-data-export", label: "Data Export", path: "/settings/data-export" },
      { id: "st-data-import", label: "Data Import", path: "/settings/data-import" },
      { id: "st-email", label: "Email", path: "/settings/email" },
      { id: "st-forms", label: "Forms", path: "/settings/forms" },
      { id: "st-integrations", label: "Integrations", path: "/settings/integrations" },
      { id: "st-jobs", label: "Jobs", path: "/settings/jobs" },
      { id: "st-language", label: "Language", path: "/settings/language" },
      { id: "st-lead-sources", label: "Lead Sources", path: "/settings/lead-sources" },
      { id: "st-notifications", label: "Notifications", path: "/settings/notifications" },
      { id: "st-payment-methods", label: "Payment Methods", path: "/settings/payment-methods" },
      { id: "st-permissions", label: "Permissions", path: "/settings/permissions" },
      { id: "st-pipeline", label: "Pipeline", path: "/settings/pipeline" },
      { id: "st-privacy", label: "Privacy", path: "/settings/privacy" },
      { id: "st-products", label: "Products", path: "/settings/products" },
      { id: "st-profile", label: "Profile", path: "/settings/profile" },
      { id: "st-reports", label: "Reports", path: "/settings/reports" },
      { id: "st-security", label: "Security", path: "/settings/security" },
      { id: "st-seed-data", label: "Seed Data", path: "/settings/seed-data" },
      { id: "st-service-bridge", label: "Service Bridge", path: "/settings/service-bridge" },
      { id: "st-service-bridge-2", label: "Service Bridge 2", path: "/settings/service-bridge-2" },
      { id: "st-tags", label: "Tags", path: "/settings/tags" },
      { id: "st-task-settings", label: "Task Settings", path: "/settings/task-settings" },
      { id: "st-team", label: "Team", path: "/settings/team" },
      { id: "st-telephony", label: "Telephony", path: "/settings/telephony" },
      { id: "st-templates", label: "Templates", path: "/settings/templates" },
      { id: "st-text-messaging", label: "Text Messaging", path: "/settings/text-messaging" },
      { id: "st-themes", label: "Themes", path: "/settings/themes" },
      { id: "st-thumbtack", label: "Thumbtack", path: "/settings/thumbtack" },
      { id: "st-time-zones", label: "Time Zones", path: "/settings/time-zones" },
      { id: "st-triggers", label: "Triggers", path: "/settings/triggers" },
      { id: "st-users", label: "Users", path: "/settings/users" },
      { id: "st-webhook-monitor", label: "Webhook Monitor", path: "/settings/webhook-monitor" },
      { id: "st-webhooks", label: "Webhooks", path: "/settings/webhooks" },
      { id: "st-workflows", label: "Workflows", path: "/settings/workflows" },
    ]
  }
];

export const Navigation = ({
  isCollapsed = false,
  onToggleCollapse,
  isMobile = false,
  onMobileClose,
}: NavigationProps): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMap, setOpenMap] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navigationItems.forEach((item) => {
      if (item.hasDropdown) {
        const isActiveParent = item.subItems?.some(sub => location.pathname === sub.path);
        initial[item.id] = isActiveParent || false;
      }
    });
    return initial;
  });

  const handlePrimaryClick = (item: NavItem) => {
    if (item.hasDropdown) {
      if (isCollapsed && !isMobile) {
        onToggleCollapse?.();
        setTimeout(() => {
          setOpenMap((prev) => {
            const next: Record<string, boolean> = {};
            navigationItems.forEach((i) => {
              next[i.id] = i.id === item.id ? !prev[item.id] : false;
            });
            return next;
          });
        }, 150);
        return;
      }
      setOpenMap((prev) => {
        const next: Record<string, boolean> = {};
        navigationItems.forEach((i) => {
          next[i.id] = i.id === item.id ? !prev[item.id] : false;
        });
        return next;
      });
    } else {
      const closed: Record<string, boolean> = {};
      navigationItems.forEach((i) => (closed[i.id] = false));
      setOpenMap(closed);
      navigate(item.path);
      if (isMobile) {
        onMobileClose?.();
      }
    }
  };

  const handleSubItemClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      onMobileClose?.();
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (item: NavItem) => {
    return item.subItems?.some(sub => location.pathname === sub.path) || false;
  };

  return (
    <nav
      className="d-flex flex-column align-items-start bg-white border-end"
      style={{
        height: isMobile ? "100%" : "calc(100vh - 39px)",
        width: isMobile ? "100%" : (isCollapsed ? "60px" : "257px")
      }}
    >
      {!isMobile ? (
        isCollapsed ? (
          <div
            className="w-100 d-flex align-items-center justify-content-center bg-white"
            style={{ height: "80px" }}
          >
            <UsersIcon size={24} className="text-secondary" />
          </div>
        ) : (
          <div
            className="w-100 bg-white d-flex align-items-center justify-content-center"
            style={{ height: "80px", width: "257px" }}
          >
            <Image className="w-100 h-100 object-fit-cover" alt="Logo" src="/image-1-1.png" />
          </div>
        )
      ) : null}

      {!isMobile && (
        <div className={`d-flex flex-column align-items-start align-self-stretch w-100 rounded overflow-hidden ${
          isCollapsed ? "px-1 py-1" : "px-2 py-1"
        }`}>
          <Button
            variant="link"
            className={`nav-item-button px-0 py-2 d-flex align-items-center ${
              isCollapsed ? "justify-content-center" : "justify-content-end"
            } align-self-stretch w-100 border-0`}
            onClick={onToggleCollapse}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </Button>
        </div>
      )}

      <div
        className={`d-flex flex-fill align-self-stretch w-100 flex-column align-items-start overflow-auto ${
          (isCollapsed && !isMobile) ? "px-1 py-1" : "px-2 py-1"
        }`}
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const open = !!openMap[item.id];
          const parentActive = isParentActive(item);
          return (
            <div key={item.id} className="d-flex flex-column align-items-start align-self-stretch w-100 mb-1">
              {(isCollapsed && !isMobile) ? (
                <div className="d-flex flex-column align-items-center align-self-stretch w-100 rounded overflow-hidden">
                  <Button
                    variant="link"
                    className={`nav-item-button px-0 py-2 d-flex align-items-center justify-content-center align-self-stretch w-100 border-0 ${
                      (isActive(item.path) || parentActive) ? "nav-item-active" : ""
                    }`}
                    onClick={() => handlePrimaryClick(item)}
                    aria-expanded={open}
                    aria-controls={`submenu-${item.id}`}
                    title={item.label}
                  >
                    <Icon size={18} />
                  </Button>
                </div>
              ) : (
                <div className="d-flex flex-column align-items-start align-self-stretch w-100 rounded overflow-hidden">
                  <Button
                    variant="link"
                    className={`nav-item-button px-3 py-2 d-flex align-items-center justify-content-between align-self-stretch w-100 border-0 ${
                      (isActive(item.path) || parentActive) ? "nav-item-active" : ""
                    }`}
                    onClick={() => handlePrimaryClick(item)}
                    aria-expanded={open}
                    aria-controls={`submenu-${item.id}`}
                  >
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <Icon size={16} />
                      </div>
                      <span className="text-start">{item.label}</span>
                    </div>
                    {item.hasDropdown ? (
                      <ChevronDownIcon
                        size={16}
                        className={`transition-transform ${open ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    ) : (
                      <span className="visually-hidden">No submenu</span>
                    )}
                  </Button>
                  {item.hasDropdown && item.subItems && (
                    <Collapse in={open} mountOnEnter unmountOnExit>
                      <div
                        id={`submenu-${item.id}`}
                        className="d-flex flex-column align-items-start align-self-stretch w-100 ps-4"
                      >
                        {item.subItems.map((sub) => (
                          <div
                            key={sub.id}
                            className="d-flex flex-column align-items-start align-self-stretch w-100"
                          >
                            <Button
                              variant="link"
                              className={`nav-item-button px-3 py-1 d-flex align-items-center justify-content-start align-self-stretch w-100 border-0 ${
                                isActive(sub.path) ? "nav-item-active" : ""
                              }`}
                              onClick={() => handleSubItemClick(sub.path)}
                              aria-current={isActive(sub.path) ? "page" : undefined}
                            >
                              <span className="ms-1">{sub.label}</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </Collapse>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!isMobile && (
        <div className="mt-auto w-100 d-flex flex-column border-top p-2">
          <Button
            variant="link"
            className="nav-item-button d-flex align-items-center justify-content-start border-0"
            onClick={() => console.log('Logout clicked')}
          >
            <LogOutIcon size={16} className="me-2" />
            {(!isCollapsed || isMobile) && <span>Log out</span>}
          </Button>
          {(!isCollapsed || isMobile) && (
            <div className="mt-3 small text-muted text-center">
              © ClientTether LLC
              <br />
              All Rights Reserved
              <br />
              <a href="#" className="text-decoration-none">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="#" className="text-decoration-none">
                Terms of Use
              </a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
