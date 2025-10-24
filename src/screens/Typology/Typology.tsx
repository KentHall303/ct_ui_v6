import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export const Typology = (): JSX.Element => {
  return (
    <div className="d-flex flex-column h-100 bg-white min-h-0 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-bottom border-1 px-4 py-3">
        <div className="d-flex align-items-baseline gap-4">
          <h2 className="h2 fw-bold text-dark mb-0">Typography</h2>
          <p className="small text-secondary mb-0">Typography System Overview</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-fill min-h-0 overflow-auto bg-white px-4 py-4">
        <Container fluid>
          <Row className="g-4">
            {/* Headings Section */}
            <Col xs={12}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 fw-semibold">Headings</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-3">
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <h1 className="mb-0">Heading 1 (h1)</h1>
                      <code className="text-muted small">h1, .h1</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <h2 className="mb-0">Heading 2 (h2)</h2>
                      <code className="text-muted small">h2, .h2</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <h3 className="mb-0">Heading 3 (h3)</h3>
                      <code className="text-muted small">h3, .h3</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <h4 className="mb-0">Heading 4 (h4)</h4>
                      <code className="text-muted small">h4, .h4</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <h5 className="mb-0">Heading 5 (h5)</h5>
                      <code className="text-muted small">h5, .h5</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="mb-0">Heading 6 (h6)</h6>
                      <code className="text-muted small">h6, .h6</code>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Display Headings */}
            <Col xs={12} lg={6}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 fw-semibold">Display Headings</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-3">
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <div className="display-1">Display 1</div>
                      <code className="text-muted small">.display-1</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <div className="display-2">Display 2</div>
                      <code className="text-muted small">.display-2</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <div className="display-3">Display 3</div>
                      <code className="text-muted small">.display-3</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="display-4">Display 4</div>
                      <code className="text-muted small">.display-4</code>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Body Text */}
            <Col xs={12} lg={6}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 fw-semibold">Body Text</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-3">
                    <div className="border-bottom pb-2">
                      <p className="mb-1">Regular body text - This is the default paragraph text used throughout the application.</p>
                      <code className="text-muted small">p, body text</code>
                    </div>
                    <div className="border-bottom pb-2">
                      <p className="lead mb-1">Lead text - This is lead paragraph text that stands out from regular body text.</p>
                      <code className="text-muted small">.lead</code>
                    </div>
                    <div className="border-bottom pb-2">
                      <small className="d-block mb-1">Small text - This is smaller text for captions and fine print.</small>
                      <code className="text-muted small">small, .small</code>
                    </div>
                    <div>
                      <span className="text-muted d-block mb-1">Muted text - This is muted text for less important information.</span>
                      <code className="text-muted small">.text-muted</code>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Font Weights */}
            <Col xs={12} lg={6}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 fw-semibold">Font Weights</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-3">
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <span className="fw-light">Light weight text</span>
                      <code className="text-muted small">.fw-light</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <span className="fw-normal">Normal weight text</span>
                      <code className="text-muted small">.fw-normal</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <span className="fw-medium">Medium weight text</span>
                      <code className="text-muted small">.fw-medium</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <span className="fw-semibold">Semibold weight text</span>
                      <code className="text-muted small">.fw-semibold</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="fw-bold">Bold weight text</span>
                      <code className="text-muted small">.fw-bold</code>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Text Colors */}
            <Col xs={12} lg={6}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 fw-semibold">Text Colors</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-3">
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <span className="text-primary">Primary text color</span>
                      <code className="text-muted small">.text-primary</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <span className="text-secondary">Secondary text color</span>
                      <code className="text-muted small">.text-secondary</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <span className="text-success">Success text color</span>
                      <code className="text-muted small">.text-success</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <span className="text-danger">Danger text color</span>
                      <code className="text-muted small">.text-danger</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <span className="text-warning">Warning text color</span>
                      <code className="text-muted small">.text-warning</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <span className="text-info">Info text color</span>
                      <code className="text-muted small">.text-info</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                      <span className="text-dark">Dark text color</span>
                      <code className="text-muted small">.text-dark</code>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-muted">Muted text color</span>
                      <code className="text-muted small">.text-muted</code>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Text Utilities */}
            <Col xs={12}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 fw-semibold">Text Utilities</h5>
                </Card.Header>
                <Card.Body>
                  <Row className="g-4">
                    <Col md={4}>
                      <h6 className="fw-semibold mb-3">Text Alignment</h6>
                      <div className="d-grid gap-2">
                        <div className="text-start border p-2">Left aligned text</div>
                        <div className="text-center border p-2">Center aligned text</div>
                        <div className="text-end border p-2">Right aligned text</div>
                      </div>
                    </Col>
                    <Col md={4}>
                      <h6 className="fw-semibold mb-3">Text Transform</h6>
                      <div className="d-grid gap-2">
                        <div className="text-lowercase border p-2">LOWERCASE TEXT</div>
                        <div className="text-uppercase border p-2">uppercase text</div>
                        <div className="text-capitalize border p-2">capitalize text</div>
                      </div>
                    </Col>
                    <Col md={4}>
                      <h6 className="fw-semibold mb-3">Text Decoration</h6>
                      <div className="d-grid gap-2">
                        <div className="text-decoration-underline border p-2">Underlined text</div>
                        <div className="text-decoration-line-through border p-2">Strikethrough text</div>
                        <div className="text-decoration-none border p-2">
                          <a href="#" className="text-decoration-none">No decoration link</a>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Code and Monospace */}
            <Col xs={12}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 fw-semibold">Code & Monospace</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-3">
                    <div className="border-bottom pb-2">
                      <p className="mb-1">Inline code: <code>console.log('Hello World')</code></p>
                      <code className="text-muted small">&lt;code&gt;</code>
                    </div>
                    <div className="border-bottom pb-2">
                      <p className="mb-1">Keyboard input: Press <kbd>Ctrl</kbd> + <kbd>C</kbd></p>
                      <code className="text-muted small">&lt;kbd&gt;</code>
                    </div>
                    <div>
                      <p className="mb-1">Code block:</p>
                      <pre className="bg-light p-3 rounded"><code>function greet(name) &#123;{'\n'}  return &#96;Hello, $&#123;name&#125;!&#96;;{'\n'}&#125;</code></pre>
                      <code className="text-muted small">&lt;pre&gt;&lt;code&gt;</code>
                    </div>
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