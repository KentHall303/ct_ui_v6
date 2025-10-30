// file: project/src/screens/Accounts/sections/CustomSidenavSection/CustomSidenavSection.tsx
import React from "react";
import { flushSync } from "react-dom";
import { Button, Collapse, Image } from "react-bootstrap";
import { LayoutDashboard as LayoutDashboardIcon, Users as UsersIcon, Briefcase as BriefcaseIcon, Calendar as CalendarIcon, MessageSquare as MessageSquareIcon, ClipboardList as ClipboardListIcon, Settings as SettingsIcon, ChevronDown as ChevronDownIcon, Palette as PaletteIcon, PanelLeftOpen, PanelLeftClose, LogOut as LogOutIcon, FileText as FileTextIcon } from "lucide-react";

/* ────────────────────────────────────────────────────────────────────────────
   Props
   ────────────────────────────────────────────────────────────────────────── */
type CustomSidenavSectionProps = {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  activeMenuItem?: string;
  onMenuItemClick?: (menuId: string) => void;
  isMobile?: boolean;
};

/* ────────────────────────────────────────────────────────────────────────────
   Menu data
   ────────────────────────────────────────────────────────────────────────── */
const pipelineSub = [
  { id: "pipeline-client", label: "Client" },
  { id: "pipeline-employee", label: "Employee" },
  { id: "pipeline-partner", label: "Partner" },
  { id: "pipeline-vendor", label: "Vendor" },
  { id: "pipeline-new-order", label: "New order" },
];

const contactsSub = [
  { id: "contacts-clients", label: "Clients" },
  { id: "contacts-employee", label: "Employee" },
  { id: "contacts-partner", label: "Partner" },
  { id: "contacts-vendor", label: "Vendor" },
  { id: "contacts-new-other", label: "New Other" },
  { id: "contacts-all", label: "All" },
  { id: "contacts-archived", label: "Archived" },
];

const actionPlansSub = [
  { id: "ap-connection", label: "Connection Plans" },
  { id: "ap-conversion", label: "Conversion Plans" },
  { id: "ap-retention", label: "Retention Plans" },
];

const templatesSub = [
  { id: "tp-email", label: "Email" },
  { id: "tp-task", label: "Task" },
  { id: "tp-text", label: "Text" },
  { id: "tp-appt-invites", label: "Appt Invites" },
  { id: "tp-notes-logs", label: "Notes/Logs" },
  { id: "tp-export-list", label: "Export List for Review" },
];

const designHubSub = [
  { id: "dh-announcements", label: "Announcements" },
  { id: "dh-hosted-pages", label: "Hosted Pages" },
  { id: "dh-log-codes", label: "Log Codes" },
  { id: "dh-pipeline", label: "Pipeline" },
  { id: "dh-proposal", label: "Proposal" },
  { id: "dh-triggers", label: "Triggers" },
  { id: "dh-typology", label: "Typography" },
  { id: "form-examples", label: "Form Examples" },
  { id: "bootstrap-components", label: "Bootstrap Components" },
  { id: "contact-profile", label: "Contact Profile" },
];

const settingsSub = [
  { id: "st-chart-builder", label: "Chart Builder" },
  { id: "st-api-monitor", label: "API Monitor" },
  { id: "st-webhook-monitor", label: "Webhook Monitor" },
];

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  hasDropdown: boolean;
  subItems?: { id: string; label: string }[];
};

const navigationItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboardIcon, hasDropdown: false },
  { id: "accounts", label: "Accounts", icon: UsersIcon, hasDropdown: false },
  { id: "pipeline", label: "Pipeline", icon: BriefcaseIcon, hasDropdown: true, subItems: pipelineSub },
  { id: "contacts", label: "Contacts", icon: MessageSquareIcon, hasDropdown: true, subItems: contactsSub },
  { id: "jobs", label: "Jobs", icon: ClipboardListIcon, hasDropdown: false },
  { id: "calendar", label: "Calendar", icon: CalendarIcon, hasDropdown: false },
  { id: "action-plans", label: "Action Plans", icon: ClipboardListIcon, hasDropdown: true, subItems: actionPlansSub },
  { id: "templates", label: "Templates", icon: FileTextIcon, hasDropdown: true, subItems: templatesSub },
  { id: "design-hub", label: "Design Hub", icon: PaletteIcon, hasDropdown: true, subItems: designHubSub },
  { id: "settings", label: "Settings", icon: SettingsIcon, hasDropdown: true, subItems: settingsSub },
];

/* ────────────────────────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────────────────────── */
export const CustomSidenavSection = ({
  isCollapsed = false,
  onToggleCollapse,
  activeMenuItem = "accounts",
  onMenuItemClick,
  isMobile = false,
}: CustomSidenavSectionProps): JSX.Element => {
  // state for which primaries are expanded
  const [openMap, setOpenMap] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navigationItems.forEach((item) => {
      if (item.hasDropdown) initial[item.id] = false;
    });
    return initial;
  });

  const handlePrimaryClick = (item: NavItem) => {
    if (item.hasDropdown) {
      if (isCollapsed) {
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
      flushSync(() => {
        const closed: Record<string, boolean> = {};
        navigationItems.forEach((i) => (closed[i.id] = false));
        setOpenMap(closed);
      });
      onMenuItemClick?.(item.id);
    }
  };

  const handleSubItemClick = (id: string) => {
    onMenuItemClick?.(id);
  };

  const isActive = (id: string) => activeMenuItem === id;

  return (
    <nav
      className={`d-flex flex-column align-items-start bg-white border-end border-2`}
      style={{ 
        height: isMobile ? "100%" : "calc(100vh - 39px)", 
        width: isMobile ? "100%" : (isCollapsed ? "60px" : "257px") 
      }}
    >
      {/* Header with logo */}
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

      {/* Collapse toggle button */}
      {!isMobile && (<div className={`${isCollapsed ? "p-1 w-100" : "p-1 align-self-end"}`}>
        <Button
          variant="link"
          onClick={onToggleCollapse}
          className="p-2 border-0 shadow-none text-secondary hover:text-dark"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </Button>
      </div>)}

      {/* Main nav items */}
      <div
        className={`d-flex flex-fill align-self-stretch w-100 flex-column align-items-start overflow-auto ${
          (isCollapsed && !isMobile) ? "px-1 py-1" : "px-2 py-1"
        }`}
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const open = !!openMap[item.id];
          return (
            <div key={item.id} className="d-flex flex-column align-items-start align-self-stretch w-100 mb-1">
              {(isCollapsed && !isMobile) ? (
                <div className="d-flex flex-column align-items-center align-self-stretch w-100 rounded overflow-hidden">
                  <Button
                    variant="outline-secondary"
                    className="px-0 py-2 d-flex align-items-center justify-content-center align-self-stretch w-100 border-0"
                    onClick={() => {
                      if (item.hasDropdown) {
                        handlePrimaryClick(item);
                      } else {
                        flushSync(() => {
                          const closed: Record<string, boolean> = {};
                          navigationItems.forEach((i) => (closed[i.id] = false));
                          setOpenMap(closed);
                        });
                        onMenuItemClick?.(item.id);
                      }
                    }}
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
                    variant="outline-secondary"
                    className="px-3 py-2 d-flex align-items-center justify-content-between align-self-stretch w-100 border-0"
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
                              variant="outline-secondary"
                              className={`px-3 py-1 d-flex align-items-center justify-content-start align-self-stretch w-100 border-0 ${
                                isActive(sub.id) ? "bg-primary bg-opacity-10" : ""
                              }`}
                              onClick={() => handleSubItemClick(sub.id)}
                              aria-current={isActive(sub.id) ? "page" : undefined}
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

      {/* Footer */}
      {!isMobile && (<div className="mt-auto w-100 d-flex flex-column border-top p-2">
        <Button
          variant="outline-secondary"
          className="d-flex align-items-center justify-content-start border-0"
          onClick={() => onMenuItemClick?.("logout")}
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
      </div>)}
    </nav>
  );
};
