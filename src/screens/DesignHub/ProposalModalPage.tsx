import React from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { ProposalFSModal } from "../../components/modals/ProposalFSModal";

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
    console.error('ProposalModal ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="danger">
          <Alert.Heading>Unable to Load Proposal Modal</Alert.Heading>
          <p className="mb-0">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <Button
            variant="outline-danger"
            size="sm"
            className="mt-3"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </Button>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export const ProposalModalPage: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="d-flex flex-column align-items-start align-self-stretch flex-fill">
      <Container fluid className="py-4">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Header className="bg-light">
                <h5 className="mb-0 fw-semibold">Proposal Modal</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-muted mb-3">
                  This modal demonstrates the proposal creation and editing interface with fullscreen layout.
                </p>
                <ErrorBoundary>
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    Open Proposal Modal
                  </Button>
                </ErrorBoundary>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <ErrorBoundary>
        {showModal && <ProposalFSModal show={showModal} onHide={() => setShowModal(false)} />}
      </ErrorBoundary>
    </div>
  );
};
