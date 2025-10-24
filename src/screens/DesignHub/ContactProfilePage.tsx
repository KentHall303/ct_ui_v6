import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Button } from "../../components/bootstrap/Button";
import { User as UserIcon, ExternalLink as ExternalLinkIcon } from "lucide-react";

interface ContactProfilePageProps {
  onOpenModal: () => void;
}

export const ContactProfilePage: React.FC<ContactProfilePageProps> = ({
  onOpenModal,
}) => {
  return (
    <div className="d-flex flex-column h-100 bg-white min-h-0 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-bottom border-1 px-4 py-3">
        <div className="d-flex align-items-baseline gap-4">
          <h2 className="h2 fw-bold text-dark mb-0">Contact Profile</h2>
          <p className="small text-secondary mb-0">Modal Component Testing Page</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-fill min-h-0 overflow-auto bg-white px-4 py-4">
        <Container fluid>
          <Row className="g-4 justify-content-center">
            <Col xs={12} lg={8}>
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-light">
                  <div className="d-flex align-items-center gap-2">
                    <UserIcon size={20} className="text-primary" />
                    <h5 className="mb-0 fw-semibold">Contact Profile Modal Test</h5>
                  </div>
                </Card.Header>
                <Card.Body className="text-center py-5">
                  <div className="mb-4">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                      <UserIcon size={40} className="text-primary" />
                    </div>
                    <h4 className="fw-semibold text-dark mb-2">Contact Profile Modal</h4>
                    <p className="text-muted mb-4">
                      This page demonstrates the Contact Profile modal component. 
                      Click the button below to open the modal as an overlay.
                    </p>
                  </div>

                  <div className="d-grid gap-3 mx-auto" style={{ maxWidth: '300px' }}>
                    <Button
                      variant="primary"
                      size="lg"
                      className="d-flex align-items-center justify-content-center gap-2"
                      onClick={onOpenModal}
                    >
                      <ExternalLinkIcon size={20} />
                      Open Contact Profile Modal
                    </Button>
                    
                    <div className="text-start">
                      <h6 className="fw-semibold mb-2">Modal Features:</h6>
                      <ul className="list-unstyled small text-muted">
                        <li className="mb-1">✓ Overlay display above current page</li>
                        <li className="mb-1">✓ Bootstrap 5.3 Modal component</li>
                        <li className="mb-1">✓ Custom header with contact name and account</li>
                        <li className="mb-1">✓ Static backdrop (prevents accidental closing)</li>
                        <li className="mb-1">✓ Responsive design for all screen sizes</li>
                      </ul>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-light">
                  <h6 className="mb-0 fw-semibold">Implementation Notes</h6>
                </Card.Header>
                <Card.Body>
                  <div className="small">
                    <h6 className="fw-semibold mb-2">How it works:</h6>
                    <ol className="ps-3 mb-3">
                      <li className="mb-1">Navigate to this page via Design Hub menu</li>
                      <li className="mb-1">Click the "Open Contact Profile Modal" button</li>
                      <li className="mb-1">Modal appears as overlay</li>
                      <li className="mb-1">Close modal using X button in header</li>
                    </ol>
                    
                    <h6 className="fw-semibold mb-2">Technical Details:</h6>
                    <ul className="list-unstyled text-muted">
                      <li className="mb-1"><strong>Component:</strong> ContactProfileModal.tsx</li>
                      <li className="mb-1"><strong>State:</strong> showContactProfileModal</li>
                      <li className="mb-1"><strong>Framework:</strong> React Bootstrap 5.3</li>
                      <li className="mb-1"><strong>Backdrop:</strong> Static (no click-outside close)</li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};