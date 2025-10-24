import React from "react";
import { Container, Row, Col, Card, Nav, Tab, Accordion } from "react-bootstrap";
import { List as ListIcon, Calendar as CalendarIcon, Grid2x2 as GridIcon, ChartBar as BarChartIcon } from "lucide-react";

export const BootstrapComponents = (): JSX.Element => {
  const [activeTab, setActiveTab] = React.useState<string>('overview');

  return (
    <div className="d-flex flex-column h-100 bg-white min-h-0 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-bottom border-1 px-4 py-3">
        <div className="d-flex align-items-baseline gap-4">
          <h2 className="h2 fw-bold text-dark mb-0">Bootstrap Components</h2>
          <p className="small text-secondary mb-0">Examples of Bootstrap UI components</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-fill min-h-0 overflow-auto bg-white px-4 py-4">
        <Container fluid>
          <Row className="g-4">
            {/* Top Three Cards: Colors, Alerts, and Callouts */}
            <Col xs={12} lg={4}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 fw-semibold">Colors</h5>
                  <p className="text-muted small mb-0">
                    Bootstrap 5.3 contextual colors and utilities
                  </p>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-3">
                    <div>
                      <h6 className="fw-semibold mb-2">Gray Scale (white, 100-900)</h6>
                      <div className="d-grid gap-1">
                        <div className="p-2 rounded border" style={{ backgroundColor: '#ffffff', color: '#000' }}>
                          white (#ffffff)
                        </div>
                        <div className="p-2 rounded" style={{ backgroundColor: '#f8f9fa', color: '#000' }}>
                          gray-100 (#f8f9fa)
                        </div>
                        <div className="p-2 rounded" style={{ backgroundColor: '#e9ecef', color: '#000' }}>
                          gray-200 (#e9ecef)
                        </div>
                        <div className="p-2 rounded" style={{ backgroundColor: '#dee2e6', color: '#000' }}>
                          gray-300 (#dee2e6)
                        </div>
                        <div className="p-2 rounded" style={{ backgroundColor: '#ced4da', color: '#000' }}>
                          gray-400 (#ced4da)
                        </div>
                        <div className="p-2 rounded" style={{ backgroundColor: '#adb5bd', color: '#000' }}>
                          gray-500 (#adb5bd)
                        </div>
                        <div className="p-2 rounded" style={{ backgroundColor: '#6c757d', color: '#fff' }}>
                          gray-600 (#6c757d)
                        </div>
                        <div className="p-2 rounded" style={{ backgroundColor: '#495057', color: '#fff' }}>
                          gray-700 (#495057)
                        </div>
                        <div className="p-2 rounded" style={{ backgroundColor: '#343a40', color: '#fff' }}>
                          gray-800 (#343a40)
                        </div>
                        <div className="p-2 rounded" style={{ backgroundColor: '#212529', color: '#fff' }}>
                          gray-900 (#212529)
                        </div>
                      </div>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-2">Text Colors</h6>
                      <div className="d-grid gap-1">
                        <div className="text-primary">.text-primary</div>
                        <div className="text-secondary">.text-secondary</div>
                        <div className="text-success">.text-success</div>
                        <div className="text-danger">.text-danger</div>
                        <div className="text-warning">.text-warning</div>
                        <div className="text-info">.text-info</div>
                        <div className="text-dark">.text-dark</div>
                        <div className="text-muted">.text-muted</div>
                      </div>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-2">Background Colors</h6>
                      <div className="d-grid gap-1">
                        <div className="bg-primary text-white p-2 rounded">.bg-primary</div>
                        <div className="bg-secondary text-white p-2 rounded">.bg-secondary</div>
                        <div className="bg-success text-white p-2 rounded">.bg-success</div>
                        <div className="bg-danger text-white p-2 rounded">.bg-danger</div>
                        <div className="bg-warning text-dark p-2 rounded">.bg-warning</div>
                        <div className="bg-info text-white p-2 rounded">.bg-info</div>
                        <div className="bg-light text-dark p-2 rounded border">.bg-light</div>
                        <div className="bg-dark text-white p-2 rounded">.bg-dark</div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} lg={4}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 fw-semibold">Alerts</h5>
                  <p className="text-muted small mb-0">
                    Bootstrap 5.3 alert components for user feedback
                  </p>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-3">
                    <div className="alert alert-primary mb-0" role="alert">
                      <strong>Primary Alert!</strong> This is a primary alert with additional info.
                    </div>
                    <div className="alert alert-secondary mb-0" role="alert">
                      <strong>Secondary Alert!</strong> This is a secondary alert message.
                    </div>
                    <div className="alert alert-success mb-0" role="alert">
                      <strong>Success!</strong> Your action was completed successfully.
                    </div>
                    <div className="alert alert-danger mb-0" role="alert">
                      <strong>Error!</strong> Something went wrong. Please try again.
                    </div>
                    <div className="alert alert-warning mb-0" role="alert">
                      <strong>Warning!</strong> Please review your input before proceeding.
                    </div>
                    <div className="alert alert-info mb-0" role="alert">
                      <strong>Info!</strong> Here's some helpful information for you.
                    </div>
                    <div className="alert alert-light mb-0" role="alert">
                      <strong>Light Alert!</strong> This is a light colored alert.
                    </div>
                    <div className="alert alert-dark mb-0" role="alert">
                      <strong>Dark Alert!</strong> This is a dark colored alert.
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} lg={4}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 fw-semibold">
                    Callouts <span className="text-primary">#</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="callout-default">
                    Default callout
                  </div>
                  <div className="callout-warning">
                    Warning callout
                  </div>
                  <div className="callout-danger">
                    Danger callout
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Tabs Component */}
            <Col xs={12}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 fw-semibold">Tabs Component</h5>
                  <p className="text-muted small mb-0">
                    Navigation tabs styled similar to the Jobs page view controls
                  </p>
                </Card.Header>
                <Card.Body>
                  <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'overview')}>
                    {/* Tab Navigation - styled like Jobs page */}
                    <div className="d-flex align-items-center mb-3">
                      <Nav variant="underline" className="nav-underline">
                        <Nav.Item>
                          <Nav.Link 
                            eventKey="overview"
                            className={`d-flex align-items-center gap-2 ${
                              activeTab === 'overview' 
                                ? 'active' 
                                : ''
                            }`}
                          >
                            <GridIcon size={16} />
                            Overview
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link 
                            eventKey="analytics"
                            className={`d-flex align-items-center gap-2 ${
                              activeTab === 'analytics' 
                                ? 'active' 
                                : ''
                            }`}
                          >
                            <BarChartIcon size={16} />
                            Analytics
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link 
                            eventKey="reports"
                            className={`d-flex align-items-center gap-2 ${
                              activeTab === 'reports' 
                                ? 'active' 
                                : ''
                            }`}
                          >
                            <ListIcon size={16} />
                            Reports
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link 
                            eventKey="schedule"
                            className={`d-flex align-items-center gap-2 ${
                              activeTab === 'schedule' 
                                ? 'active' 
                                : ''
                            }`}
                          >
                            <CalendarIcon size={16} />
                            Schedule
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>

                    {/* Tab Content */}
                    <Tab.Content>
                      <Tab.Pane eventKey="overview">
                        <div className="p-4 bg-light rounded">
                          <h6 className="fw-semibold mb-3">Overview Dashboard</h6>
                          <p className="text-muted mb-3">
                            This is the overview tab content. Here you would typically display 
                            key metrics, summaries, and important information at a glance.
                          </p>
                          <div className="row g-3">
                            <div className="col-md-4">
                              <div className="card bg-primary bg-opacity-10 border-primary border-opacity-25">
                                <div className="card-body text-center">
                                  <h5 className="text-primary">142</h5>
                                  <small className="text-muted">Total Items</small>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="card bg-success bg-opacity-10 border-success border-opacity-25">
                                <div className="card-body text-center">
                                  <h5 className="text-success">98%</h5>
                                  <small className="text-muted">Success Rate</small>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="card bg-warning bg-opacity-10 border-warning border-opacity-25">
                                <div className="card-body text-center">
                                  <h5 className="text-warning">24</h5>
                                  <small className="text-muted">Pending</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="analytics">
                        <div className="p-4 bg-light rounded">
                          <h6 className="fw-semibold mb-3">Analytics Dashboard</h6>
                          <p className="text-muted mb-3">
                            Analytics content would go here. This could include charts, 
                            graphs, and detailed performance metrics.
                          </p>
                          <div className="alert alert-info">
                            <strong>Note:</strong> Chart components would be integrated here 
                            using libraries like Chart.js or D3.js.
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="reports">
                        <div className="p-4 bg-light rounded">
                          <h6 className="fw-semibold mb-3">Reports Section</h6>
                          <p className="text-muted mb-3">
                            Generate and view various reports. This section would contain 
                            report filters, export options, and report listings.
                          </p>
                          <div className="list-group">
                            <div className="list-group-item d-flex justify-content-between align-items-center">
                              Monthly Summary Report
                              <span className="badge bg-primary rounded-pill">New</span>
                            </div>
                            <div className="list-group-item d-flex justify-content-between align-items-center">
                              Weekly Performance Report
                              <span className="badge bg-secondary rounded-pill">Ready</span>
                            </div>
                            <div className="list-group-item d-flex justify-content-between align-items-center">
                              Annual Review Report
                              <span className="badge bg-success rounded-pill">Complete</span>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="schedule">
                        <div className="p-4 bg-light rounded">
                          <h6 className="fw-semibold mb-3">Schedule Management</h6>
                          <p className="text-muted mb-3">
                            Manage schedules, appointments, and time-based activities. 
                            This would integrate with calendar components.
                          </p>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <div className="card">
                                <div className="card-header">
                                  <small className="text-muted">Today's Schedule</small>
                                </div>
                                <div className="card-body">
                                  <div className="d-flex align-items-center mb-2">
                                    <div className="bg-primary rounded-circle me-2" style={{width: '8px', height: '8px'}}></div>
                                    <small>9:00 AM - Team Meeting</small>
                                  </div>
                                  <div className="d-flex align-items-center mb-2">
                                    <div className="bg-success rounded-circle me-2" style={{width: '8px', height: '8px'}}></div>
                                    <small>2:00 PM - Client Call</small>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <div className="bg-warning rounded-circle me-2" style={{width: '8px', height: '8px'}}></div>
                                    <small>4:30 PM - Project Review</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="card">
                                <div className="card-header">
                                  <small className="text-muted">Upcoming</small>
                                </div>
                                <div className="card-body">
                                  <small className="text-muted">Tomorrow: 3 appointments</small><br />
                                  <small className="text-muted">This Week: 12 appointments</small><br />
                                  <small className="text-muted">Next Week: 8 appointments</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Card.Body>
              </Card>
            </Col>

            {/* Accordions Component */}
            <Col xs={12}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 fw-semibold">Accordion Component</h5>
                  <p className="text-muted small mb-0">
                    Collapsible content sections using Bootstrap accordions
                  </p>
                </Card.Header>
                <Card.Body>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <strong>Getting Started</strong>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="mb-3">
                          Welcome to our platform! This section contains essential information 
                          to help you get started with your account setup and initial configuration.
                        </p>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <h6 className="fw-semibold">Quick Setup</h6>
                            <ul className="list-unstyled">
                              <li className="mb-1">
                                <span className="badge bg-success me-2">✓</span>
                                Create your account
                              </li>
                              <li className="mb-1">
                                <span className="badge bg-success me-2">✓</span>
                                Verify your email
                              </li>
                              <li className="mb-1">
                                <span className="badge bg-warning me-2">○</span>
                                Complete your profile
                              </li>
                              <li className="mb-1">
                                <span className="badge bg-secondary me-2">○</span>
                                Set up preferences
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <h6 className="fw-semibold">Resources</h6>
                            <p className="small text-muted">
                              Check out our documentation, video tutorials, and community 
                              forums to make the most of your experience.
                            </p>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        <strong>Account Settings</strong>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="mb-3">
                          Manage your account preferences, security settings, and personal information. 
                          Keep your account secure and up-to-date.
                        </p>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <div className="card bg-light">
                              <div className="card-body text-center">
                                <h6 className="card-title">Profile</h6>
                                <p className="card-text small">Update personal information</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="card bg-light">
                              <div className="card-body text-center">
                                <h6 className="card-title">Security</h6>
                                <p className="card-text small">Password & 2FA settings</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="card bg-light">
                              <div className="card-body text-center">
                                <h6 className="card-title">Notifications</h6>
                                <p className="card-text small">Email & push preferences</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        <strong>Features & Tools</strong>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="mb-3">
                          Explore the powerful features and tools available in your account. 
                          Learn how to maximize productivity and efficiency.
                        </p>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <h6 className="fw-semibold text-primary">Core Features</h6>
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item px-0">
                                <strong>Dashboard:</strong> Real-time overview of your data
                              </li>
                              <li className="list-group-item px-0">
                                <strong>Analytics:</strong> Detailed insights and reporting
                              </li>
                              <li className="list-group-item px-0">
                                <strong>Automation:</strong> Streamline repetitive tasks
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <h6 className="fw-semibold text-success">Advanced Tools</h6>
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item px-0">
                                <strong>API Access:</strong> Integrate with external systems
                              </li>
                              <li className="list-group-item px-0">
                                <strong>Custom Reports:</strong> Build tailored analytics
                              </li>
                              <li className="list-group-item px-0">
                                <strong>Team Collaboration:</strong> Share and collaborate
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        <strong>Support & Help</strong>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="mb-3">
                          Need assistance? We're here to help! Find answers to common questions 
                          and learn how to contact our support team.
                        </p>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className="alert alert-info">
                              <h6 className="alert-heading">Knowledge Base</h6>
                              <p className="mb-0">
                                Search our comprehensive knowledge base for step-by-step guides, 
                                troubleshooting tips, and best practices.
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="alert alert-success">
                              <h6 className="alert-heading">Contact Support</h6>
                              <p className="mb-0">
                                Can't find what you're looking for? Our support team is available 
                                24/7 to help you resolve any issues.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <small className="text-muted">
                            <strong>Response Times:</strong> Email support typically responds within 2-4 hours. 
                            Live chat is available during business hours (9 AM - 6 PM EST).
                          </small>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};