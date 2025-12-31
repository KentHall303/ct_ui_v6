import React from "react";
import { Outlet } from "react-router-dom";
import { Button, Offcanvas } from "react-bootstrap";
import { Bell as BellIcon, CircleCheck as CheckCircleIcon, MessageSquare as MessageSquareIcon, PanelRightClose, Menu as MenuIcon } from "lucide-react";
import { Topbar } from "../Topbar/Topbar";
import { Navigation } from "../Navigation/Navigation";
import { LayoutProvider } from "../../../contexts/LayoutContext";

const rightSidebarButtons = [
  {
    id: "notifications",
    icon: BellIcon,
    label: "Notifications",
    isActive: true,
  },
  {
    id: "messages",
    icon: MessageSquareIcon,
    label: "Messages",
    isActive: false,
  },
  {
    id: "tasks",
    icon: CheckCircleIcon,
    label: "Tasks",
    isActive: false,
  },
];

function renderPanelContent(panelId: string) {
  switch (panelId) {
    case 'notifications':
      return (
        <>
          <div className="d-flex align-items-center justify-content-between p-4 border-bottom border-2">
            <div className="d-flex align-items-center gap-3">
              <BellIcon size={20} className="text-secondary" />
              <h2 className="fw-medium text-dark mb-0">Notifications</h2>
            </div>
          </div>
          <div className="flex-fill p-4 overflow-auto">
            <div className="d-grid gap-4">
              <Button
                variant="outline-primary"
                className="w-100 d-flex align-items-center gap-2 justify-content-start"
              >
                <BellIcon size={16} />
                Add a notification
              </Button>
              <div className="d-grid gap-3">
                <div className="d-flex align-items-start gap-3 p-3 bg-light rounded">
                  <div className="bg-primary rounded-circle mt-2 flex-shrink-0" style={{ width: '8px', height: '8px' }}></div>
                  <div className="flex-fill">
                    <h3 className="fw-medium text-dark small mb-1">
                      Review Required
                    </h3>
                    <p className="text-secondary small mb-2">
                      Multiple items need attention for compliance review.
                    </p>
                    <div className="d-flex align-items-center gap-2">
                      <span className="text-danger fw-medium small">2 hours ago</span>
                      <span className="text-muted small">• High Priority</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-top border-2">
            <Button
              variant="outline-secondary"
              className="w-100 d-flex justify-content-start text-secondary"
            >
              <span className="small">View all notifications</span>
            </Button>
          </div>
        </>
      );

    case 'messages':
      return (
        <>
          <div className="d-flex align-items-center justify-content-between p-4 border-bottom border-2">
            <div className="d-flex align-items-center gap-3">
              <MessageSquareIcon size={20} className="text-secondary" />
              <h2 className="fw-medium text-dark mb-0">Messages</h2>
            </div>
          </div>
          <div className="flex-fill p-4">
            <p className="text-secondary">Messages panel content goes here...</p>
          </div>
        </>
      );

    case 'tasks':
      return (
        <>
          <div className="d-flex align-items-center justify-content-between p-4 border-bottom border-2">
            <div className="d-flex align-items-center gap-3">
              <CheckCircleIcon size={20} className="text-secondary" />
              <h2 className="fw-medium text-dark mb-0">Tasks</h2>
            </div>
          </div>
          <div className="flex-fill p-4">
            <p className="text-secondary">Tasks panel content goes here...</p>
          </div>
        </>
      );

    default:
      return null;
  }
}

export const MainLayout = (): JSX.Element => {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = React.useState(false);
  const [activeRightPanel, setActiveRightPanel] = React.useState<string | null>(null);
  const [showLeftSidebar, setShowLeftSidebar] = React.useState(false);
  const [showRightSidebar, setShowRightSidebar] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const leftSidebarWidth = leftSidebarCollapsed ? '60px' : '257px';
  const rightSidebarWidth = activeRightPanel ? '327px' : '52px';

  return (
    <div className="d-flex flex-column bg-white overflow-x-hidden vh-100 position-relative">
      <Topbar />

      {isMobile && (
        <div className="d-flex justify-content-between align-items-center p-2 bg-light border-bottom">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setShowLeftSidebar(true)}
            className="d-flex align-items-center gap-2"
          >
            <MenuIcon size={16} />
            Menu
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setShowRightSidebar(true)}
            className="d-flex align-items-center gap-2"
          >
            <BellIcon size={16} />
            Actions
          </Button>
        </div>
      )}

      <div className="d-flex flex-fill min-h-0">
        {isMobile ? (
          <Offcanvas
            show={showLeftSidebar}
            onHide={() => setShowLeftSidebar(false)}
            placement="start"
            className="w-75"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0">
              <Navigation
                isCollapsed={false}
                onToggleCollapse={() => {}}
                isMobile={true}
                onMobileClose={() => setShowLeftSidebar(false)}
              />
            </Offcanvas.Body>
          </Offcanvas>
        ) : (
          <div
            className="bg-white shadow-elevation-1 d-flex flex-column position-relative transition-all border-end flex-shrink-0"
            style={{ width: leftSidebarWidth }}
          >
            <div className="flex-fill min-h-0">
              <Navigation
                isCollapsed={leftSidebarCollapsed}
                onToggleCollapse={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
                isMobile={false}
              />
            </div>
          </div>
        )}

        <div
          className="flex-fill min-h-0 overflow-hidden p-2"
          style={{
            width: isMobile ? '100%' : `calc(100vw - ${leftSidebarWidth} - ${rightSidebarWidth})`,
            backgroundColor: '#e9ecef'
          }}
        >
          <LayoutProvider isLeftSidebarCollapsed={leftSidebarCollapsed}>
            <Outlet />
          </LayoutProvider>
        </div>

        {isMobile ? (
          <Offcanvas
            show={showRightSidebar}
            onHide={() => setShowRightSidebar(false)}
            placement="end"
            className="w-75"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Actions</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0">
              <div className="d-flex flex-column h-100">
                {rightSidebarButtons.map((button, index) => (
                  <Button
                    key={index}
                    variant="outline-secondary"
                    className={`m-2 d-flex align-items-center gap-2 ${
                      activeRightPanel === button.id ? "bg-primary bg-opacity-10" : ""
                    }`}
                    onClick={() => {
                      setActiveRightPanel(activeRightPanel === button.id ? null : button.id);
                    }}
                  >
                    <button.icon size={20} />
                    {button.label}
                  </Button>
                ))}

                {activeRightPanel && (
                  <div className="flex-fill border-top mt-2 pt-2">
                    {renderPanelContent(activeRightPanel)}
                  </div>
                )}
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        ) : (
          <div
            className="bg-white shadow-elevation-1 d-flex flex-column transition-all border-start overflow-x-hidden flex-shrink-0"
            style={{ width: rightSidebarWidth }}
          >
            <div className="d-flex h-100 min-h-0">
              <div className="d-flex flex-column items-center py-4 gap-2 flex-shrink-0">
                {rightSidebarButtons.map((button, index) => (
                  <Button
                    key={index}
                    variant="link"
                    size="sm"
                    className={`p-2 rounded-circle border-0 shadow-none ${
                      activeRightPanel === button.id ? "bg-primary bg-opacity-10" : ""
                    }`}
                    onClick={() => {
                      setActiveRightPanel(activeRightPanel === button.id ? null : button.id);
                    }}
                  >
                    <button.icon className="w-6 h-6 text-gray-600" />
                  </Button>
                ))}
              </div>

              {activeRightPanel && (
                <div className="d-flex flex-column h-100 border-start min-h-0" style={{ width: '275px' }}>
                  <div className="d-flex justify-content-end p-2 border-bottom border-2">
                    <Button
                      variant="link"
                      size="sm"
                      className="p-2 border-0 shadow-none text-secondary"
                      onClick={() => setActiveRightPanel(null)}
                      title="Collapse panel"
                    >
                      <PanelRightClose size={16} />
                    </Button>
                  </div>
                  {renderPanelContent(activeRightPanel)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
