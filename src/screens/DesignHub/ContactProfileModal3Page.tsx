import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ContactProfileFSModal3 } from "../../components/modals/ContactProfileFSModal3";

export const ContactProfileModal3Page: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="d-flex flex-column align-items-start align-self-stretch flex-fill">
      <Container fluid className="py-4">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Header className="bg-light">
                <h5 className="mb-0 fw-semibold">Contact Profile Modal - Version 3</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-muted mb-3">
                  This modal demonstrates the third version of the contact profile design with refined interactions.
                </p>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Open Contact Profile Modal 3
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <ContactProfileFSModal3 show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
};
