import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { TopHeader } from '../TopHeader/TopHeader';

interface AppLayoutProps {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
  headerProps?: any;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  sidebarContent,
  headerProps
}) => {
  return (
    <div className="app-layout">
      {/* Top Header - Full Width */}
      <TopHeader {...headerProps} />
      
      {/* Main Content Area */}
      <Container fluid className="p-0">
        <Row className="g-0 min-vh-100">
          {/* Sidebar */}
          {sidebarContent && (
            <Col xs={12} md={3} lg={2} className="sidebar-area">
              {sidebarContent}
            </Col>
          )}
          
          {/* Main Content */}
          <Col xs={12} md={sidebarContent ? 9 : 12} lg={sidebarContent ? 10 : 12} className="main-content-area">
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};