import React, { useState } from "react";
import { Modal, Row, Col, Container, Form, Card, InputGroup, Nav, Tab } from "react-bootstrap";
import { X, TrendingUp, Star, Plus, Copy, Trash2, Info, FileText, Download, ChartBar as BarChart3, ChevronDown, Presentation, History, MessageSquare, Mail, Calendar, SquareCheck as CheckSquare, Hash, MessageCircle, Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Code, Maximize2, MoveVertical as MoreVertical, Bell, Paperclip, Send, Smile } from "lucide-react";
import { Button } from "../../components/bootstrap/Button";
import { ContactInfoCard } from "../../components/ContactInfoCard";
import { FloatingInput, FloatingSelect, FloatingSelectOption } from "../../components/bootstrap/FormControls";
import { ChipCheck } from "../../components/bootstrap/ChipCheck";

interface ContactProfileModalProps {
  show: boolean;
  onHide: () => void;
}

export const ContactProfileModal: React.FC<ContactProfileModalProps> = ({
  show,
  onHide,
}) => {
  const [assignedUser, setAssignedUser] = useState("Select User");
  const [firstName, setFirstName] = useState("Christine");
  const [lastName, setLastName] = useState("Sparks");
  const [company, setCompany] = useState("Footprints Bath and Tile");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("christine@footprints.com");
  const [cellPhone, setCellPhone] = useState("(555) 123-4567");
  const [okToSms, setOkToSms] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Choose State");
  const [postalCode, setPostalCode] = useState("");
  const [contactType, setContactType] = useState("Select Type");

  const [opportunityName, setOpportunityName] = useState("Shed Repairs");
  const [dealSize, setDealSize] = useState("550");
  const [odds, setOdds] = useState("90");
  const [closeDate, setCloseDate] = useState("");
  const [actionPlan, setActionPlan] = useState("Estimate Won");
  const [salesCycle, setSalesCycle] = useState("Estimate Won");
  const [leadSource, setLeadSource] = useState("Google PPC");
  const [milestones, setMilestones] = useState({
    apptSet: false,
    quoted: false,
    closed: false,
    cmpl: false,
  });

  const toggleMilestone = (key: keyof typeof milestones) => {
    setMilestones(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const [proposals, setProposals] = useState([
    { id: 1, name: "Kent: 2024-...", qtd: true, cld: true, cmpl: true },
    { id: 2, name: "Kent: 2025-...", qtd: true, cld: true, cmpl: true },
    { id: 3, name: "Kent: 2025-...", qtd: true, cld: true, cmpl: true },
    { id: 4, name: "Kent: 2025-...", qtd: true, cld: true, cmpl: true },
    { id: 5, name: "Kent: 2025-...", qtd: true, cld: true, cmpl: true },
  ]);

  const [communicationTab, setCommunicationTab] = useState('whiteboard');

  const toggleProposalField = (id: number, field: 'qtd' | 'cld' | 'cmpl') => {
    setProposals(prev => prev.map(p =>
      p.id === id ? { ...p, [field]: !p[field] } : p
    ));
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="xl" 
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-dialog-scrollable"
    >
      <Modal.Header 
        className="border-bottom border-2 d-flex align-items-center justify-content-between position-relative" 
        style={{ height: '36px', padding: '0.5rem 1rem' }}
      >
        {/* Contact Full Name - Left Aligned */}
        <div className="h6 fw-bold mb-0 lh-1 text-dark">
          Christine Sparks
        </div>
        
        {/* Account Name - Center Aligned */}
        <div className="position-absolute start-50 translate-middle-x small fw-bold mb-0 lh-1 text-secondary">
          Footprints Bath and Tile - Central Mass
        </div>
        
        {/* Custom Close Button */}
        <Button
          variant="outline-secondary"
          size="sm"
          className="p-1 border-0 bg-transparent"
          onClick={onHide}
          title="Close"
        >
          <X size={16} className="text-secondary" />
        </Button>
      </Modal.Header>
      
      <Modal.Body className="p-0">
        <Container fluid className="h-100" style={{ backgroundColor: '#e9ecef' }}>
          <Row className="g-3 p-3 h-100" style={{ minHeight: '100%' }}>
            {/* First Column - Contact Info */}
            <Col xs={12} lg={3} className="d-flex flex-column gap-3">
              <ContactInfoCard
                title="Contact Info"
                displayNumber="25614523"
                defaultExpanded={true}
                onDuplicate={() => console.log('Duplicate Contact Info')}
              >
                <div className="d-flex flex-column gap-3">
                  <FloatingSelect
                    label="Assigned User"
                    value={assignedUser}
                    onChange={(e) => setAssignedUser(e.target.value)}
                  >
                    <FloatingSelectOption value="Select User">Select User</FloatingSelectOption>
                    <FloatingSelectOption value="John Doe">John Doe</FloatingSelectOption>
                    <FloatingSelectOption value="Jane Smith">Jane Smith</FloatingSelectOption>
                  </FloatingSelect>

                  <FloatingInput
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <FloatingInput
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />

                  <FloatingInput
                    label="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />

                  <FloatingInput
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <FloatingInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <FloatingInput
                    label="Cell Phone"
                    type="tel"
                    value={cellPhone}
                    onChange={(e) => setCellPhone(e.target.value)}
                  />

                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                      <span className="small text-secondary">OK to SMS?</span>
                      <Form.Check
                        type="switch"
                        checked={okToSms}
                        onChange={(e) => setOkToSms(e.target.checked)}
                        className="mb-0"
                      />
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="small text-secondary">Blocked</span>
                      <Form.Check
                        type="switch"
                        checked={blocked}
                        onChange={(e) => setBlocked(e.target.checked)}
                        className="mb-0"
                      />
                    </div>
                  </div>

                  <FloatingInput
                    label="Secondary Phone"
                    type="tel"
                    value={secondaryPhone}
                    onChange={(e) => setSecondaryPhone(e.target.value)}
                  />

                  <FloatingInput
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <FloatingInput
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />

                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="flex-fill"
                    >
                      Google Maps
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="flex-fill"
                    >
                      Zillow
                    </Button>
                  </div>

                  <div className="row g-2">
                    <div className="col-12 col-md-6">
                      <FloatingSelect
                        label="Select State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <FloatingSelectOption value="Choose State">Choose State</FloatingSelectOption>
                        <FloatingSelectOption value="MA">Massachusetts</FloatingSelectOption>
                        <FloatingSelectOption value="NY">New York</FloatingSelectOption>
                        <FloatingSelectOption value="CT">Connecticut</FloatingSelectOption>
                      </FloatingSelect>
                    </div>
                    <div className="col-12 col-md-6">
                      <FloatingInput
                        label="Postal Code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                  </div>

                  <FloatingSelect
                    label="Contact Type"
                    value={contactType}
                    onChange={(e) => setContactType(e.target.value)}
                  >
                    <FloatingSelectOption value="">Select Type</FloatingSelectOption>
                    <FloatingSelectOption value="Client">Client</FloatingSelectOption>
                    <FloatingSelectOption value="Employee">Employee</FloatingSelectOption>
                    <FloatingSelectOption value="Partner">Partner</FloatingSelectOption>
                    <FloatingSelectOption value="Vendor">Vendor</FloatingSelectOption>
                    <FloatingSelectOption value="Other">Other</FloatingSelectOption>
                  </FloatingSelect>
                </div>
              </ContactInfoCard>

              <ContactInfoCard
                title="Additional Contact Info"
                defaultExpanded={false}
              >
                <p className="text-secondary small mb-1">Title: Account Executive</p>
                <p className="text-secondary small mb-1">Reports To: John Doe</p>
                <p className="text-secondary small mb-1">LinkedIn: linkedin.com/in/csparks</p>
                <p className="text-secondary small mb-0">Twitter: @csparks</p>
              </ContactInfoCard>

              <ContactInfoCard
                title="Pending Actions"
                defaultExpanded={true}
              >
                <p className="text-secondary small mb-0">No pending actions</p>
              </ContactInfoCard>
            </Col>

            {/* Second Column - Opportunity and Related */}
            <Col xs={12} lg={3} className="d-flex flex-column gap-3">
              <ContactInfoCard
                title="Opportunities"
                count={1}
                defaultExpanded={true}
                headerActions={
                  <div className="d-flex align-items-center gap-2">
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 text-secondary d-flex align-items-center justify-content-center"
                      title="Favorite"
                      style={{ width: '16px', height: '16px' }}
                    >
                      <Star size={14} />
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 text-secondary d-flex align-items-center justify-content-center"
                      title="Add"
                      style={{ width: '16px', height: '16px' }}
                    >
                      <Plus size={14} />
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 text-secondary d-flex align-items-center justify-content-center"
                      title="Duplicate"
                      style={{ width: '16px', height: '16px' }}
                    >
                      <Copy size={14} />
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 text-secondary d-flex align-items-center justify-content-center"
                      title="Delete"
                      style={{ width: '16px', height: '16px' }}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                }
              >
                <div className="d-flex flex-column gap-3">
                  {/* Opportunity Selector */}
                  <FloatingSelect
                    label="Select Opportunity"
                    value={opportunityName}
                    onChange={(e) => setOpportunityName(e.target.value)}
                  >
                    <FloatingSelectOption value="Shed Repairs">Shed Repairs</FloatingSelectOption>
                    <FloatingSelectOption value="Deck Installation">Deck Installation</FloatingSelectOption>
                    <FloatingSelectOption value="Roof Repair">Roof Repair</FloatingSelectOption>
                  </FloatingSelect>

                  {/* Action Plan */}
                  <FloatingSelect
                    label="Action Plan"
                    value={actionPlan}
                    onChange={(e) => setActionPlan(e.target.value)}
                  >
                    <FloatingSelectOption value="Estimate Won">Estimate Won</FloatingSelectOption>
                    <FloatingSelectOption value="Proposal Sent">Proposal Sent</FloatingSelectOption>
                    <FloatingSelectOption value="Follow Up">Follow Up</FloatingSelectOption>
                  </FloatingSelect>

                  {/* Milestones Section */}
                  <div className="milestones-section">
                    <label className="form-label milestones-label">Milestones</label>
                    <div className="d-flex milestones-chips flex-wrap">
                      <ChipCheck
                        label="Appt Set"
                        shortLabel="Appt"
                        isActive={milestones.apptSet}
                        onClick={() => toggleMilestone('apptSet')}
                      />
                      <ChipCheck
                        label="Quoted"
                        shortLabel="Quote"
                        isActive={milestones.quoted}
                        onClick={() => toggleMilestone('quoted')}
                      />
                      <ChipCheck
                        label="Closed"
                        shortLabel="Close"
                        isActive={milestones.closed}
                        onClick={() => toggleMilestone('closed')}
                      />
                      <ChipCheck
                        label="CMPL"
                        isActive={milestones.cmpl}
                        onClick={() => toggleMilestone('cmpl')}
                      />
                    </div>
                  </div>

                  {/* Sales Cycle */}
                  <FloatingSelect
                    label="Sales Cycle"
                    value={salesCycle}
                    onChange={(e) => setSalesCycle(e.target.value)}
                  >
                    <FloatingSelectOption value="Estimate Won">Estimate Won</FloatingSelectOption>
                    <FloatingSelectOption value="Negotiation">Negotiation</FloatingSelectOption>
                    <FloatingSelectOption value="Closed Won">Closed Won</FloatingSelectOption>
                  </FloatingSelect>

                  {/* Deal Size - Full Width */}
                  <div className="position-relative">
                    <InputGroup>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="0.00"
                        value={dealSize}
                        onChange={(e) => setDealSize(e.target.value)}
                      />
                    </InputGroup>
                    <label className="form-label small mb-0 d-flex align-items-center gap-1" style={{ position: 'absolute', top: '-8px', left: '12px', backgroundColor: 'white', padding: '0 4px' }}>
                      Deal Size
                      <Info size={12} className="text-secondary" title="Total deal value" />
                    </label>
                  </div>

                  {/* Odds - Full Width */}
                  <div className="position-relative">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="0"
                        value={odds}
                        onChange={(e) => setOdds(e.target.value)}
                      />
                      <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup>
                    <label className="form-label small mb-0" style={{ position: 'absolute', top: '-8px', left: '12px', backgroundColor: 'white', padding: '0 4px' }}>
                      Odds
                    </label>
                  </div>

                  {/* Close Date - Full Width */}
                  <FloatingInput
                    label="Close Date"
                    type="date"
                    value={closeDate}
                    onChange={(e) => setCloseDate(e.target.value)}
                  />

                  {/* Lead Source */}
                  <FloatingSelect
                    label="Lead Source *"
                    value={leadSource}
                    onChange={(e) => setLeadSource(e.target.value)}
                  >
                    <FloatingSelectOption value="Google PPC">Google PPC</FloatingSelectOption>
                    <FloatingSelectOption value="Referral">Referral</FloatingSelectOption>
                    <FloatingSelectOption value="Website">Website</FloatingSelectOption>
                    <FloatingSelectOption value="Social Media">Social Media</FloatingSelectOption>
                  </FloatingSelect>
                </div>
              </ContactInfoCard>

              <ContactInfoCard
                title="Proposals"
                count={proposals.length}
                defaultExpanded={true}
                headerActions={
                  <div className="d-flex align-items-center gap-2">
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 d-flex align-items-center justify-content-center"
                      title="Add Proposal"
                      style={{ color: '#0d6efd', width: '16px', height: '16px' }}
                    >
                      <Plus size={14} />
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 d-flex align-items-center justify-content-center"
                      title="View Chart"
                      style={{ color: '#0d6efd', width: '16px', height: '16px' }}
                    >
                      <BarChart3 size={14} />
                    </Button>
                  </div>
                }
              >
                <div className="d-flex flex-column gap-2">
                  {/* Included With Header aligned with table */}
                  <div className="d-flex align-items-center gap-2 small fw-semibold text-secondary">
                    <div style={{ width: '100px' }}></div>
                    <div style={{ flex: 1, textAlign: 'center' }}>Included With:</div>
                  </div>

                  {/* Table Header */}
                  <div className="d-flex align-items-center gap-2 small fw-semibold text-secondary border-bottom pb-1 mb-1">
                    <div style={{ width: '100px' }}></div>
                    <div style={{ width: '40px', textAlign: 'center' }}>QTD</div>
                    <div style={{ width: '40px', textAlign: 'center' }}>CLD</div>
                    <div style={{ width: '40px', textAlign: 'center' }}>CMPL</div>
                    <div style={{ width: '50px' }}></div>
                  </div>

                  {/* Proposal Rows */}
                  {proposals.map((proposal) => (
                    <div key={proposal.id} className="d-flex align-items-center gap-2 py-1">
                      {/* Proposal Name with Icon */}
                      <div className="d-flex align-items-center gap-1" style={{ width: '100px' }}>
                        <FileText size={14} className="text-secondary flex-shrink-0" />
                        <span className="small text-primary text-truncate" style={{ cursor: 'pointer' }}>
                          {proposal.name}
                        </span>
                      </div>

                      {/* QTD Checkbox */}
                      <div style={{ width: '40px', textAlign: 'center' }}>
                        <Form.Check
                          type="checkbox"
                          checked={proposal.qtd}
                          onChange={() => toggleProposalField(proposal.id, 'qtd')}
                          className="mb-0"
                        />
                      </div>

                      {/* CLD Checkbox */}
                      <div style={{ width: '40px', textAlign: 'center' }}>
                        <Form.Check
                          type="checkbox"
                          checked={proposal.cld}
                          onChange={() => toggleProposalField(proposal.id, 'cld')}
                          className="mb-0"
                        />
                      </div>

                      {/* CMPL Checkbox */}
                      <div style={{ width: '40px', textAlign: 'center' }}>
                        <Form.Check
                          type="checkbox"
                          checked={proposal.cmpl}
                          onChange={() => toggleProposalField(proposal.id, 'cmpl')}
                          className="mb-0"
                        />
                      </div>

                      {/* Action Icons */}
                      <div className="d-flex gap-1" style={{ width: '50px' }}>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 text-secondary"
                          title="View Document"
                        >
                          <FileText size={16} />
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 text-success"
                          title="Download"
                        >
                          <Download size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ContactInfoCard>

              <ContactInfoCard
                title="Attachments"
                defaultExpanded={false}
              >
                <p className="text-secondary small mb-0">No attachments</p>
              </ContactInfoCard>

              <ContactInfoCard
                title="Tags"
                defaultExpanded={false}
              >
                <p className="text-secondary small mb-0">No tags</p>
              </ContactInfoCard>

              <ContactInfoCard
                title="Linked Contacts"
                defaultExpanded={false}
              >
                <p className="text-secondary small mb-0">No linked contacts</p>
              </ContactInfoCard>
            </Col>

            {/* Third Column - Special Commands & Main Content Area */}
            <Col xs={12} lg className="d-flex flex-column gap-3">
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <Card.Title as="h5" className="mb-0">Custom Features</Card.Title>
                </Card.Header>
                <Card.Body>
                  <p className="text-secondary small mb-0">
                    Special commands content will go here
                  </p>
                </Card.Body>
              </Card>

              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <Card.Title as="h5" className="mb-0">1:1 Communication Hub</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Tab.Container
                    activeKey={communicationTab}
                    onSelect={(k) => setCommunicationTab(k || 'whiteboard')}
                  >
                    <Nav variant="underline" className="nav-underline border-bottom mb-3">
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

                    <Tab.Content>
                      <Tab.Pane eventKey="whiteboard">
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
                      <Tab.Pane eventKey="history">
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
                                <small>10:40 AM SMS Removed By Amy Howard (DEFAULT)</small>
                              </div>
                              <div className="d-flex gap-2 mb-2 align-items-start">
                                <Mail size={16} className="text-primary mt-1" />
                                <div className="flex-grow-1">
                                  <small>10:40 AM Email Sent By Seasonal Plan: Halloween Halloween email (DEFAULT)</small>
                                  <Button variant="outline-secondary" size="sm" className="ms-2">View History</Button>
                                </div>
                              </div>
                              <div className="d-flex gap-2 mb-2 align-items-start">
                                <CheckSquare size={16} className="text-info mt-1" />
                                <small>10:40 AM Action Plan Initiated By Amy Howard (DEFAULT)</small>
                              </div>
                            </div>

                            <div className="mb-3">
                              <div className="badge bg-success text-white mb-2">19 Aug, 2025</div>
                              <div className="d-flex gap-2 mb-2 align-items-start">
                                <TrendingUp size={16} className="text-warning mt-1" />
                                <small>12:59 PM Conversion Step Changed By Amy Howard (DEFAULT)</small>
                              </div>
                              <div className="d-flex gap-2 mb-2 align-items-start">
                                <CheckSquare size={16} className="text-info mt-1" />
                                <small>12:59 PM Action Plan Initiated By Amy Howard (DEFAULT)</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="text">
                        <div className="p-3">
                          <div className="d-flex gap-3 mb-3">
                            <div>
                              <small className="me-2">Sorting:</small>
                              <Form.Check inline type="radio" name="textSort" id="text-asc" label="Ascending" defaultChecked />
                              <Form.Check inline type="radio" name="textSort" id="text-desc" label="Descending" />
                            </div>
                          </div>

                          <Row>
                            <Col md={6}>
                              <div className="border rounded p-3" style={{ height: '400px', overflowY: 'auto' }}>
                                <div className="mb-3">
                                  <small className="text-muted d-block">17 Jan, 2025 6:41 am</small>
                                  <div className="bg-light p-3 rounded mt-2">
                                    <div><strong>Footprints Floors - Appointment Confirmation</strong></div>
                                    <div className="mt-2">Date: January 31, 2025</div>
                                    <div>Arrival window: 4:00 pm - 5:00 pm (MST)</div>
                                    <div>Estimator: Rumpel</div>
                                    <div>Office Phone: (303) 276-7422</div>
                                    <div className="text-end mt-2"><small className="fst-italic">Delivered</small></div>
                                  </div>
                                  <div className="text-end mt-2">
                                    <small className="text-muted">29 Jan, 2025 9:53 pm</small>
                                    <small className="ms-2">3039291447</small>
                                  </div>
                                  <div className="bg-white border p-2 rounded mt-1 d-inline-block">
                                    Thanks! 😊
                                  </div>
                                </div>

                                <div className="mb-3">
                                  <small className="text-muted d-block">30 Jan, 2025 2:00 pm</small>
                                  <div className="bg-light p-3 rounded mt-2">
                                    <div><strong>Footprints Floors - Appointment Reminder</strong></div>
                                    <div className="mt-2">Date: January 31, 2025</div>
                                  </div>
                                </div>
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
                                <div className="text-end"><small className="text-success">😊 SMS Char Count: 0/150</small></div>
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
                      <Tab.Pane eventKey="email">
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
                      <Tab.Pane eventKey="event">
                        <div className="p-3">
                          <p className="text-secondary small mb-0">Event scheduling will go here</p>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="task">
                        <div className="p-3">
                          <p className="text-secondary small mb-0">Task management will go here</p>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="thumbtack">
                        <div className="p-3">
                          <p className="text-secondary small mb-0">Thumbtack integration will go here</p>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="saleschatz">
                        <div className="p-3">
                          <p className="text-secondary small mb-0">SalesChatz interface will go here</p>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};