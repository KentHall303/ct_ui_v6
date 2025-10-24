import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { ContactProfileFSModal3 } from "../../components/modals/ContactProfileFSModal3";
import { ProposalFSModal } from "../../components/modals/ProposalFSModal";

export const TestingModals: React.FC = () => {
  const [showFullscreenModal3, setShowFullscreenModal3] = React.useState(false);
  const [showProposalModal, setShowProposalModal] = React.useState(false);
  return (
    <div className="d-flex flex-column h-100 bg-white min-h-0 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-bottom border-1 px-4 py-3">
        <div className="d-flex align-items-baseline gap-4">
          <h2 className="h2 fw-bold text-dark mb-0">Testing Modals</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-fill min-h-0 overflow-auto bg-white px-4 py-4">
        <Container fluid>
          <Row className="g-4">
            <Col xs={12} lg={6}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 fw-semibold">Modal Testing Area</h5>
                </Card.Header>
                <Card.Body>
                  <p className="text-muted mb-4">This page is for testing modal components.</p>
                  <div className="text-center">
                    <div className="d-grid gap-3 mx-auto" style={{ maxWidth: '300px' }}>
                      <Button
                        variant="info"
                        size="lg"
                        className="d-flex align-items-center justify-content-center gap-2"
                        onClick={() => setShowFullscreenModal3(true)}
                      >
                        <ExternalLinkIcon size={20} />
                        Open Contact Profile Modal
                      </Button>

                      <Button
                        variant="primary"
                        size="lg"
                        className="d-flex align-items-center justify-content-center gap-2"
                        onClick={() => setShowProposalModal(true)}
                      >
                        <ExternalLinkIcon size={20} />
                        Open Proposal Modal
                      </Button>

                      <div className="text-start mt-3">
                        <h6 className="fw-semibold mb-2">Modal Features:</h6>
                        <ul className="list-unstyled small text-muted">
                          <li className="mb-1">✓ Overlay display above current page</li>
                          <li className="mb-1">✓ Bootstrap 5.3 Modal component</li>
                          <li className="mb-1">✓ Custom header with contact name and account</li>
                          <li className="mb-1">✓ Static backdrop (prevents accidental closing)</li>
                          <li className="mb-1">✓ Responsive design for all screen sizes</li>
                          <li className="mb-1">✓ Fullscreen modal option (.modal-fullscreen)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} lg={6}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 fw-semibold">Additional Modal Pages</h5>
                </Card.Header>
                <Card.Body>
                  <p className="text-muted mb-3">
                    Individual modal pages are now available in the Design Hub menu for isolated testing.
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-2">✓ Contact Profile Modal</li>
                    <li className="mb-2">✓ Proposal Modal</li>
                    <li className="mb-2">✓ Meeting Management</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <ContactProfileFSModal3
        show={showFullscreenModal3}
        onHide={() => setShowFullscreenModal3(false)}
      />

      <ProposalFSModal
        show={showProposalModal}
        onHide={() => setShowProposalModal(false)}
      />
    </div>
  );
};