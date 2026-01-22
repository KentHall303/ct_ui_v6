import React, { useState, useEffect } from "react";
import { Row, Col, Form, InputGroup, Nav, Tab, Button } from "react-bootstrap";
import { Presentation, History, MessageSquare, Mail, Calendar, SquareCheck as CheckSquare, Hash, MessageCircle, Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Code, Maximize2, Bell, Paperclip, Send, Smile, TrendingUp } from "lucide-react";
import { messageService, Message } from "../../services/messageService";

interface ContactCommunicationHubProps {
  contactId: string | null;
  defaultTab?: string;
}

export const ContactCommunicationHub: React.FC<ContactCommunicationHubProps> = ({
  contactId,
  defaultTab = 'text'
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contactId && activeTab === 'text') {
      fetchMessages();
    }
  }, [contactId, activeTab]);

  const fetchMessages = async () => {
    if (!contactId) return;

    setLoading(true);
    try {
      const data = await messageService.getMessagesByContactId(contactId, 'text');
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch contact messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatMessageDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (!contactId) {
    return (
      <div className="d-flex flex-column h-100 bg-white">
        <div className="d-flex align-items-center justify-content-center flex-grow-1">
          <div className="text-center text-secondary">
            <MessageSquare size={64} className="mb-3" />
            <h5>No Contact Selected</h5>
            <p className="mb-0">Select a message to view contact communication</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column h-100 bg-white">
      <Tab.Container
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || 'text')}
      >
        <Nav variant="underline" className="nav-underline border-bottom px-3 pt-2">
          <Nav.Item>
            <Nav.Link
              eventKey="whiteboard"
              className="d-flex align-items-center gap-2"
            >
              <Presentation size={16} />
              Whiteboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="history"
              className="d-flex align-items-center gap-2"
            >
              <History size={16} />
              History
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="text"
              className="d-flex align-items-center gap-2"
            >
              <MessageSquare size={16} />
              Text
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="email"
              className="d-flex align-items-center gap-2"
            >
              <Mail size={16} />
              Email
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="event"
              className="d-flex align-items-center gap-2"
            >
              <Calendar size={16} />
              Event
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="task"
              className="d-flex align-items-center gap-2"
            >
              <CheckSquare size={16} />
              Task
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="thumbtack"
              className="d-flex align-items-center gap-2"
            >
              <Hash size={16} />
              Thumbtack
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="saleschatz"
              className="d-flex align-items-center gap-2"
            >
              <MessageCircle size={16} />
              SalesChatz
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="flex-grow-1 overflow-auto">
          <Tab.Pane eventKey="whiteboard" className="h-100">
            <div className="p-3">
              <div className="d-flex gap-3 mb-3">
                <Form.Check
                  type="radio"
                  name="whiteboardType"
                  id="whiteboard-type-whiteboard"
                  label="Whiteboard"
                  defaultChecked
                />
                <Form.Check
                  type="radio"
                  name="whiteboardType"
                  id="whiteboard-type-note"
                  label="Add Note"
                />
                <Form.Check
                  type="radio"
                  name="whiteboardType"
                  id="whiteboard-type-log"
                  label="Log-a-Call"
                />
                <div className="ms-auto">
                  <Form.Select size="sm" style={{ width: '200px' }}>
                    <option>Choose a template</option>
                  </Form.Select>
                </div>
              </div>

              <div className="border rounded">
                <div className="d-flex gap-2 p-2 border-bottom bg-light flex-wrap">
                  <Form.Select size="sm" style={{ width: '120px' }}>
                    <option>Font</option>
                  </Form.Select>
                  <Form.Select size="sm" style={{ width: '80px' }}>
                    <option>Size</option>
                  </Form.Select>
                  <Form.Select size="sm" style={{ width: '100px' }}>
                    <option>Formats</option>
                  </Form.Select>
                  <div className="vr"></div>
                  <Button variant="light" size="sm"><Bold size={14} /></Button>
                  <Button variant="light" size="sm"><Underline size={14} /></Button>
                  <Button variant="light" size="sm"><Italic size={14} /></Button>
                  <Button variant="light" size="sm"><Strikethrough size={14} /></Button>
                  <div className="vr"></div>
                  <Button variant="light" size="sm"><AlignLeft size={14} /></Button>
                  <Button variant="light" size="sm"><AlignCenter size={14} /></Button>
                  <Button variant="light" size="sm"><AlignRight size={14} /></Button>
                  <div className="vr"></div>
                  <Button variant="light" size="sm"><List size={14} /></Button>
                  <Button variant="light" size="sm"><ListOrdered size={14} /></Button>
                  <Button variant="light" size="sm"><LinkIcon size={14} /></Button>
                  <Button variant="light" size="sm"><ImageIcon size={14} /></Button>
                  <Button variant="light" size="sm"><Code size={14} /></Button>
                  <Button variant="light" size="sm"><Maximize2 size={14} /></Button>
                </div>
                <div style={{ minHeight: '200px', padding: '12px', backgroundColor: 'white' }}>
                  <p className="text-muted small mb-0">Start typing...</p>
                </div>
              </div>

              <div className="mt-3">
                <Button variant="success">Save Whiteboard</Button>
              </div>
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="history" className="h-100">
            <div className="p-3">
              <div className="d-flex gap-2 mb-3">
                <Form.Select size="sm" style={{ width: '200px' }}>
                  <option>Choose Types...</option>
                </Form.Select>
                <InputGroup size="sm" className="flex-grow-1">
                  <Form.Control placeholder="search note..." />
                  <Button variant="primary">Search</Button>
                </InputGroup>
              </div>

              <div className="timeline-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <div className="mb-3">
                  <div className="badge bg-success text-white mb-2">3 Sep, 2025</div>
                  <div className="d-flex gap-2 mb-2 align-items-start">
                    <MessageSquare size={16} className="text-success mt-1" />
                    <small>10:40 AM SMS Removed By System</small>
                  </div>
                  <div className="d-flex gap-2 mb-2 align-items-start">
                    <Mail size={16} className="text-primary mt-1" />
                    <div className="flex-grow-1">
                      <small>10:40 AM Email Sent By System</small>
                      <Button variant="outline-secondary" size="sm" className="ms-2">View History</Button>
                    </div>
                  </div>
                  <div className="d-flex gap-2 mb-2 align-items-start">
                    <CheckSquare size={16} className="text-info mt-1" />
                    <small>10:40 AM Action Plan Initiated</small>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="badge bg-success text-white mb-2">19 Aug, 2025</div>
                  <div className="d-flex gap-2 mb-2 align-items-start">
                    <TrendingUp size={16} className="text-warning mt-1" />
                    <small>12:59 PM Conversion Step Changed</small>
                  </div>
                  <div className="d-flex gap-2 mb-2 align-items-start">
                    <CheckSquare size={16} className="text-info mt-1" />
                    <small>12:59 PM Action Plan Initiated</small>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="text" className="h-100">
            <div className="p-3 h-100 d-flex flex-column">
              <div className="d-flex gap-3 mb-3">
                <div>
                  <small className="me-2">Sorting:</small>
                  <Form.Check inline type="radio" name="textSort" id="text-asc" label="Ascending" defaultChecked />
                  <Form.Check inline type="radio" name="textSort" id="text-desc" label="Descending" />
                </div>
              </div>

              <Row className="flex-grow-1">
                <Col md={6}>
                  <div className="border rounded p-3" style={{ height: '400px', overflowY: 'auto' }}>
                    {loading ? (
                      <div className="d-flex align-items-center justify-content-center h-100">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="text-center text-secondary">
                        <MessageSquare size={48} className="mb-2" />
                        <p>No text messages found</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div key={message.id} className="mb-3">
                          <small className="text-muted d-block">{formatMessageDate(message.timestamp)}</small>
                          <div className={`p-3 rounded mt-2 ${message.direction === 'outbound' ? 'bg-light' : 'bg-white border'}`}>
                            {message.subject && <div><strong>{message.subject}</strong></div>}
                            <div className="mt-2">{message.body}</div>
                            <div className="text-end mt-2">
                              <small className="fst-italic text-muted">
                                {message.direction === 'outbound' ? 'Sent' : 'Received'}
                              </small>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-2">
                    <Form.Check inline type="checkbox" id="exclude-client" label="Exclude Client" />
                    <Form.Check inline type="checkbox" id="add-notification" label="Add Notification" />
                  </div>
                  <Form.Control size="sm" placeholder="Enter Alternate Number" className="mb-2" />
                  <Form.Select size="sm" className="mb-2">
                    <option>Choose a template</option>
                  </Form.Select>
                  <div className="mb-2">
                    <small>Message:</small>
                    <div className="text-end"><small className="text-success">SMS Char Count: 0/150</small></div>
                  </div>
                  <Form.Control as="textarea" rows={8} />
                  <div className="d-flex gap-2 mt-2">
                    <Button variant="success" size="sm"><Smile size={14} /></Button>
                    <Button variant="outline-secondary" size="sm"><Paperclip size={14} /></Button>
                    <Button variant="success" className="ms-auto">Send SMS</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="email" className="h-100">
            <div className="p-3">
              <div className="mb-3">
                <Form.Label>Subject:</Form.Label>
                <InputGroup>
                  <Form.Control placeholder="Subject" />
                  <Button variant="outline-secondary">...</Button>
                  <Form.Check type="checkbox" label="Exclude Client" className="ms-3 align-self-center" />
                </InputGroup>
              </div>

              <div className="mb-3">
                <Form.Check inline type="radio" name="emailEditor" id="sun-editor" label="Sun Editor" defaultChecked />
                <Form.Check inline type="radio" name="emailEditor" id="block-editor" label="Block Editor" />
                <Form.Check inline type="radio" name="emailEditor" id="raw-html" label="Raw HTML" />
                <Form.Select size="sm" className="mt-2" style={{ width: '200px' }}>
                  <option>Choose a template</option>
                </Form.Select>
              </div>

              <div className="mb-3">
                <Form.Label>Message:</Form.Label>
                <div className="border rounded">
                  <div className="d-flex gap-2 p-2 border-bottom bg-light flex-wrap">
                    <Form.Select size="sm" style={{ width: '100px' }}>
                      <option>Font</option>
                    </Form.Select>
                    <Form.Select size="sm" style={{ width: '80px' }}>
                      <option>Size</option>
                    </Form.Select>
                    <Form.Select size="sm" style={{ width: '100px' }}>
                      <option>Formats</option>
                    </Form.Select>
                    <div className="vr"></div>
                    <Button variant="light" size="sm"><Bold size={14} /></Button>
                    <Button variant="light" size="sm"><Underline size={14} /></Button>
                    <Button variant="light" size="sm"><Italic size={14} /></Button>
                    <Button variant="light" size="sm"><Strikethrough size={14} /></Button>
                    <div className="vr"></div>
                    <Button variant="light" size="sm"><AlignLeft size={14} /></Button>
                    <Button variant="light" size="sm"><AlignCenter size={14} /></Button>
                    <Button variant="light" size="sm"><AlignRight size={14} /></Button>
                    <div className="vr"></div>
                    <Button variant="light" size="sm"><List size={14} /></Button>
                    <Button variant="light" size="sm"><LinkIcon size={14} /></Button>
                    <Button variant="light" size="sm"><ImageIcon size={14} /></Button>
                    <Button variant="light" size="sm"><Code size={14} /></Button>
                    <Button variant="light" size="sm"><Maximize2 size={14} /></Button>
                  </div>
                  <div style={{ minHeight: '250px', padding: '12px', backgroundColor: 'white' }}>
                    <p className="text-muted small mb-0">Compose your email...</p>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2">
                <Button variant="success"><Smile size={14} className="me-1" />Emoji</Button>
                <Button variant="outline-secondary"><Bell size={16} /></Button>
                <Button variant="outline-secondary"><Paperclip size={16} /></Button>
                <Button variant="outline-secondary" className="ms-auto">Clear</Button>
                <Button variant="success">Send Email</Button>
              </div>
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="event" className="h-100">
            <div className="p-3">
              <p className="text-secondary small mb-0">Event scheduling will go here</p>
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="task" className="h-100">
            <div className="p-3">
              <p className="text-secondary small mb-0">Task management will go here</p>
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="thumbtack" className="h-100">
            <div className="p-3">
              <p className="text-secondary small mb-0">Thumbtack integration will go here</p>
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="saleschatz" className="h-100">
            <div className="p-3">
              <p className="text-secondary small mb-0">SalesChatz interface will go here</p>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};
