import React from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { MeetingsList } from "../../components/MeetingsList";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="danger">
          <Alert.Heading>Unable to Load Meetings</Alert.Heading>
          <p className="mb-0">
            {this.state.error?.message || 'An unexpected error occurred while loading the meetings list.'}
          </p>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export const MeetingManagementPage: React.FC = () => {
  return (
    <div className="d-flex flex-column align-items-start align-self-stretch flex-fill">
      <Container fluid className="py-4">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Header className="bg-light">
                <h5 className="mb-0 fw-semibold">Meeting Management</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-muted mb-3">
                  Schedule and manage meetings with subcontractors. Create new meetings, select participants, and track meeting details.
                </p>
                <ErrorBoundary>
                  <React.Suspense fallback={<div className="text-center py-4">Loading meetings...</div>}>
                    <MeetingsList jobId="820097a3-7b54-4d58-bc8f-bdc2f535d746" />
                  </React.Suspense>
                </ErrorBoundary>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
