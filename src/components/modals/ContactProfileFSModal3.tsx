import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Container, Form, Card, InputGroup, Nav, Tab } from "react-bootstrap";
import { X, TrendingUp, Star, Plus, Copy, Trash2, Info, FileText, Download, ChartBar as BarChart3, ChevronDown, Presentation, History, MessageSquare, Mail, Calendar, SquareCheck as CheckSquare, Hash, MessageCircle, Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Code, Maximize2, MoveVertical as MoreVertical, Bell, Paperclip, Send, Smile, Grid3x3, CirclePlus as PlusCircle, Expand, GripVertical, Coins, Settings, MoveHorizontal as MoreHorizontal } from "lucide-react";
import { Button } from "../../components/bootstrap/Button";
import { AddButton } from "../../components/bootstrap/AddButton";
import { ContactInfoCard } from "../../components/ContactInfoCard";
import { FloatingInput, FloatingSelect, FloatingSelectOption } from "../../components/bootstrap/FormControls";
import { ChipCheck } from "../../components/bootstrap/ChipCheck";
import { CardHeaderActionsMenu, CardHeaderActionItem } from "../../components/CardHeaderActionsMenu";
import { Contact } from "../../lib/supabase";
import { contactService } from "../../services/contactService";
import { userService, User } from "../../services/userService";
import { salesCycleService, SalesCycle } from "../../services/salesCycleService";
import { actionPlanService, ActionPlanGroup } from "../../services/actionPlanService";
import { stateProvinceData } from "../../data/stateProvinceData";
import { leadSourceData } from "../../data/leadSourceData";

interface ContactProfileFSModal3Props {
  show: boolean;
  onHide: () => void;
  mode?: 'create' | 'edit';
  initialData?: Contact | null;
  onSave?: () => void | Promise<void>;
}

export const ContactProfileFSModal3: React.FC<ContactProfileFSModal3Props> = ({
  show,
  onHide,
  mode = 'edit',
  initialData = null,
  onSave,
}) => {
  const opportunitiesCardRef = React.useRef<HTMLDivElement>(null);
  const [opportunitiesHeight, setOpportunitiesHeight] = useState<number | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [salesCycles, setSalesCycles] = useState<SalesCycle[]>([]);
  const [actionPlanGroups, setActionPlanGroups] = useState<ActionPlanGroup[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string }>({});

  const [assignedUser, setAssignedUser] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [okToSms, setOkToSms] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [contactType, setContactType] = useState("");

  const [opportunityName, setOpportunityName] = useState("");
  const [dealSize, setDealSize] = useState("");
  const [odds, setOdds] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [actionPlan, setActionPlan] = useState("");
  const [salesCycleId, setSalesCycleId] = useState("");
  const [leadSource, setLeadSource] = useState("");

  useEffect(() => {
    if (show) {
      loadDropdownData();
      if (mode === 'edit' && initialData) {
        populateFormFromContact(initialData);
      } else if (mode === 'create') {
        resetForm();
      }
    }
  }, [show, mode, initialData]);

  const loadDropdownData = async () => {
    setLoadingData(true);
    try {
      const [usersData, cyclesData, plansData] = await Promise.all([
        userService.getAll(),
        salesCycleService.getAll(),
        actionPlanService.getAllGroupedByType(),
      ]);
      setUsers(usersData);
      setSalesCycles(cyclesData);
      setActionPlanGroups(plansData);

      if (mode === 'create' && cyclesData.length > 0) {
        const newLeadCycle = cyclesData.find(c => c.name === 'New Lead');
        setSalesCycleId(newLeadCycle?.id || cyclesData[0].id);
      }
    } catch (err) {
      console.error('Error loading dropdown data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const populateFormFromContact = (contact: Contact) => {
    const nameParts = contact.name?.split(' ') || ['', ''];
    setFirstName(nameParts[0] || '');
    setLastName(nameParts.slice(1).join(' ') || '');
    setEmail(contact.email || '');
    setCellPhone(contact.cell_phone || '');
    setState(contact.state || '');
    setAddress(contact.address || '');
    setCity(contact.city || '');
    setPostalCode(contact.postal_code || '');
    setLeadSource(contact.lead_source || '');
    setAssignedUser(contact.assigned_user || '');
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setCellPhone('');
    setState('');
    setAddress('');
    setCity('');
    setPostalCode('');
    setLeadSource('');
    setAssignedUser('');
    setCompany('');
    setTitle('');
    setSecondaryPhone('');
    setOkToSms(true);
    setBlocked(false);
    setContactType('');
    setOpportunityName('');
    setDealSize('');
    setOdds('');
    setCloseDate('');
    setActionPlan('');
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: { firstName?: string; lastName?: string } = {};
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveContact = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      if (mode === 'create') {
        await contactService.createWithOpportunity({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim() || undefined,
          cellPhone: cellPhone.trim() || undefined,
          state: state || undefined,
          address: address.trim() || undefined,
          city: city.trim() || undefined,
          postalCode: postalCode.trim() || undefined,
          leadSource: leadSource || undefined,
          assignedUser: assignedUser || undefined,
          salesCycleId: salesCycleId || undefined,
          actionPlanId: actionPlan || undefined,
        });
      } else if (mode === 'edit' && initialData) {
        await contactService.updateWithOpportunity(initialData.id, {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim() || undefined,
          cellPhone: cellPhone.trim() || undefined,
          state: state || undefined,
          address: address.trim() || undefined,
          city: city.trim() || undefined,
          postalCode: postalCode.trim() || undefined,
          leadSource: leadSource || undefined,
          assignedUser: assignedUser || undefined,
          salesCycleId: salesCycleId || undefined,
          actionPlanId: actionPlan || undefined,
        });
      }

      if (onSave) {
        await onSave();
      }
      onHide();
    } catch (err) {
      console.error('Error saving contact:', err);
    } finally {
      setSaving(false);
    }
  };
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
    { id: 1, name: "Kent: 2024-...", qtd: true, cld: true, cmpl: true, paymentStatus: 'partial', sortOrder: 1 },
    { id: 2, name: "Kent: 2025-...", qtd: true, cld: true, cmpl: true, paymentStatus: 'paid', sortOrder: 2 },
    { id: 3, name: "Kent: 2025-...", qtd: false, cld: false, cmpl: false, paymentStatus: 'unpaid', sortOrder: 3 },
  ]);

  const [draggedProposal, setDraggedProposal] = useState<number | null>(null);

  const [communicationTab, setCommunicationTab] = useState('whiteboard');
  const [showAdditionalInfoModal, setShowAdditionalInfoModal] = useState(false);

  const toggleProposalField = (id: number, field: 'qtd' | 'cld' | 'cmpl') => {
    setProposals(prev => prev.map(p =>
      p.id === id ? { ...p, [field]: !p[field] } : p
    ));
  };

  const handleDragStart = (e: React.DragEvent, proposalId: number) => {
    setDraggedProposal(proposalId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggedProposal === null || draggedProposal === targetId) return;

    setProposals(prev => {
      const draggedIndex = prev.findIndex(p => p.id === draggedProposal);
      const targetIndex = prev.findIndex(p => p.id === targetId);
      const newProposals = [...prev];
      const [draggedItem] = newProposals.splice(draggedIndex, 1);
      newProposals.splice(targetIndex, 0, draggedItem);
      return newProposals.map((p, idx) => ({ ...p, sortOrder: idx + 1 }));
    });
    setDraggedProposal(null);
  };

  const handleDragEnd = () => {
    setDraggedProposal(null);
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return '#28a745';
      case 'partial': return '#ffc107';
      case 'unpaid': return '#6c757d';
      default: return '#6c757d';
    }
  };

  React.useEffect(() => {
    if (opportunitiesCardRef.current) {
      const updateHeight = () => {
        const height = opportunitiesCardRef.current?.offsetHeight;
        if (height) {
          setOpportunitiesHeight(height);
        }
      };

      updateHeight();
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(opportunitiesCardRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      fullscreen={true}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header
        className="border-bottom border-2 d-flex align-items-center justify-content-between position-relative"
        style={{ height: '36px', padding: '0.5rem 1rem' }}
      >
        {/* Contact Full Name - Left Aligned */}
        <div className="h6 fw-bold mb-0 lh-1 text-dark">
          {mode === 'create' ? 'New Client' : `${firstName} ${lastName}`.trim() || 'Contact Profile'}
        </div>

        {/* Account Name - Center Aligned */}
        <div className="position-absolute start-50 translate-middle-x small fw-bold mb-0 lh-1 text-secondary">
          {company || (mode === 'edit' ? 'Contact Details' : 'Enter Contact Information')}
        </div>

        {/* Right side container with Save Button and Close Button */}
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="success"
            size="sm"
            onClick={handleSaveContact}
            disabled={saving || loadingData}
            style={{ minWidth: '100px' }}
          >
            {saving ? 'Saving...' : mode === 'create' ? 'Create Client' : 'Save Changes'}
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            className="p-1 border-0 bg-transparent"
            onClick={onHide}
            title="Close"
          >
            <X size={16} className="text-secondary" />
          </Button>
        </div>
      </Modal.Header>

      <Modal.Body className="p-0" style={{ height: '100%', overflow: 'auto', backgroundColor: '#e9ecef' }}>
        <Container fluid style={{ minHeight: '100%' }}>
          {/* First Row: Opportunities, Proposals, Custom Features */}
          <Row className="g-3 px-3 pt-3 align-items-start">
            {/* Opportunities - ~55% */}
            <Col xs={12} xl={7}>
              <div ref={opportunitiesCardRef}>
                            <ContactInfoCard
                              title="Opportunity"
                              count={1}
                              defaultExpanded={true}
                              disableHeightStretch={true}
                              hideChevron={true}
                              headerActions={
                                <div className="card-header-actions-responsive">
                                  {/* Desktop: Show all action buttons */}
                                  <div className="header-action-buttons">
                                    <AddButton title="Add" />
                                    <Button
                                      variant="link"
                                      size="sm"
                                      className="p-0 text-secondary d-flex align-items-center justify-content-center"
                                      title="Show Opportunity Matrix"
                                      style={{ width: '16px', height: '16px' }}
                                    >
                                      <Grid3x3 size={14} />
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

                                  {/* Tablet/Mobile: Show overflow menu */}
                                  <div className="header-action-menu">
                                    <CardHeaderActionsMenu>
                                      <CardHeaderActionItem
                                        icon={<AddButton />}
                                        label="Add"
                                        onClick={() => console.log('Add clicked')}
                                      />
                                      <CardHeaderActionItem
                                        icon={<Grid3x3 size={16} />}
                                        label="Show Opportunity Matrix"
                                        onClick={() => console.log('Show Opportunity Matrix clicked')}
                                      />
                                      <CardHeaderActionItem
                                        icon={<Trash2 size={16} />}
                                        label="Delete"
                                        onClick={() => console.log('Delete clicked')}
                                        variant="danger"
                                      />
                                    </CardHeaderActionsMenu>
                                  </div>
                                </div>
                              }
                            >
                              <div className="row g-3">
                                {/* Line 1: Opportunities List and Action Plan */}
                                <div className="col-12 col-md-6">
                                  <div className="position-relative">
                                    <InputGroup>
                                      <InputGroup.Text>
                                        <Star size={16} className="text-warning" fill="currentColor" />
                                      </InputGroup.Text>
                                      <Form.Select
                                        value={opportunityName}
                                        onChange={(e) => setOpportunityName(e.target.value)}
                                      >
                                        <option value="Shed Repairs">Shed Repairs</option>
                                        <option value="Deck Installation">Deck Installation</option>
                                        <option value="Roof Repair">Roof Repair</option>
                                      </Form.Select>
                                    </InputGroup>
                                    <label className="form-label small mb-0" style={{ position: 'absolute', top: '-8px', left: '12px', backgroundColor: 'white', padding: '0 4px' }}>
                                      Opportunities List
                                    </label>
                                  </div>
                                </div>

                                <div className="col-12 col-md-6">
                                  <FloatingSelect
                                    label="Action Plan"
                                    value={actionPlan}
                                    onChange={(e) => setActionPlan(e.target.value)}
                                  >
                                    <FloatingSelectOption value="">Select Action Plan</FloatingSelectOption>
                                    {actionPlanGroups.map((group) => (
                                      <optgroup key={group.type} label={group.type}>
                                        {group.plans.map((plan) => (
                                          <option key={plan.id} value={plan.id}>{plan.name}</option>
                                        ))}
                                      </optgroup>
                                    ))}
                                  </FloatingSelect>
                                </div>

                                {/* Line 2: Sales Cycle and Milestones */}
                                <div className="col-12 col-md-6">
                                  <FloatingSelect
                                    label="Sales Cycle"
                                    value={salesCycleId}
                                    onChange={(e) => setSalesCycleId(e.target.value)}
                                  >
                                    <FloatingSelectOption value="">Select Sales Cycle</FloatingSelectOption>
                                    {salesCycles.map((cycle) => (
                                      <FloatingSelectOption key={cycle.id} value={cycle.id}>
                                        {cycle.name}
                                      </FloatingSelectOption>
                                    ))}
                                  </FloatingSelect>
                                </div>

                                <div className="col-12 col-md-6">
                                  <div className="d-flex milestones-chips flex-wrap gap-2">
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

                                {/* Line 3: Deal Size, Odds, Close Date, Lead Source */}
                                <div className="col-6 col-md-3">
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
                                </div>

                                <div className="col-6 col-md-3">
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
                                </div>

                                <div className="col-6 col-md-3">
                                  <FloatingInput
                                    label="Close Date"
                                    type="date"
                                    value={closeDate}
                                    onChange={(e) => setCloseDate(e.target.value)}
                                  />
                                </div>

                                <div className="col-6 col-md-3">
                                  <FloatingSelect
                                    label="Lead Source"
                                    value={leadSource}
                                    onChange={(e) => setLeadSource(e.target.value)}
                                  >
                                    <FloatingSelectOption value="">Select Lead Source</FloatingSelectOption>
                                    {leadSourceData.map((source) => (
                                      <FloatingSelectOption key={source.value} value={source.value}>
                                        {source.label}
                                      </FloatingSelectOption>
                                    ))}
                                  </FloatingSelect>
                                </div>
                              </div>
                            </ContactInfoCard>
              </div>
            </Col>

            {/* Proposals - ~25% */}
            <Col xs={12} xl={3}>
              <ContactInfoCard
                title="Proposals"
                count={proposals.length}
                defaultExpanded={true}
                disableHeightStretch={true}
                hideChevron={true}
                fixedHeight={opportunitiesHeight ? `${opportunitiesHeight}px` : undefined}
                headerActions={
                  <div className="card-header-actions-responsive">
                    <div className="header-action-buttons">
                      <AddButton title="Add Proposal" />
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 d-flex align-items-center justify-content-center"
                        title="View List"
                        style={{ color: '#0d6efd', width: '16px', height: '16px' }}
                      >
                        <List size={14} />
                      </Button>
                    </div>
                    <div className="header-action-menu">
                      <CardHeaderActionsMenu>
                        <CardHeaderActionItem
                          icon={<AddButton />}
                          label="Add Proposal"
                          onClick={() => console.log('Add Proposal clicked')}
                        />
                        <CardHeaderActionItem
                          icon={<List size={16} />}
                          label="View List"
                          onClick={() => console.log('View List clicked')}
                        />
                      </CardHeaderActionsMenu>
                    </div>
                  </div>
                }
              >
                <div className="d-flex flex-column" style={{ height: '100%' }}>
                  {/* Included With Header */}
                  <div className="text-center small fw-normal text-secondary mb-1">
                    Included With:
                  </div>

                  {/* Table Header */}
                  <div className="d-flex align-items-center gap-1 small fw-semibold text-secondary border-bottom pb-1 mb-1" style={{ fontSize: '0.7rem' }}>
                    <div style={{ width: '16px' }}></div>
                    <div style={{ flex: 1, minWidth: '60px' }}></div>
                    <div style={{ width: '16px' }}></div>
                    <div style={{ width: '28px', textAlign: 'center' }}>QTD</div>
                    <div style={{ width: '28px', textAlign: 'center' }}>CLD</div>
                    <div style={{ width: '28px', textAlign: 'center' }}>CMPL</div>
                    <div style={{ width: '16px' }}></div>
                    <div style={{ width: '16px' }}></div>
                    <div style={{ width: '16px' }}></div>
                    <div style={{ width: '16px' }}></div>
                    <div style={{ width: '16px' }}></div>
                  </div>

                  {/* Scrollable Proposals List */}
                  <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
                    {proposals.map((proposal) => (
                      <div
                        key={proposal.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, proposal.id)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, proposal.id)}
                        onDragEnd={handleDragEnd}
                        className="d-flex align-items-center gap-1 py-1 px-1 rounded mb-1"
                        style={{
                          cursor: 'move',
                          backgroundColor: draggedProposal === proposal.id ? '#f8f9fa' : 'transparent',
                          opacity: draggedProposal === proposal.id ? 0.5 : 1,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {/* Drag Handle */}
                        <div style={{ width: '16px', cursor: 'grab' }} title="Drag to reorder">
                          <GripVertical size={12} className="text-muted" />
                        </div>

                        {/* Proposal Name with Icon */}
                        <div className="d-flex align-items-center gap-1" style={{ flex: 1, minWidth: '60px' }}>
                          <FileText size={11} className="text-secondary flex-shrink-0" />
                          <span className="small text-primary text-truncate" style={{ cursor: 'pointer', fontSize: '0.7rem' }}>
                            {proposal.name}
                          </span>
                        </div>

                        {/* Payment Status Icon */}
                        <div style={{ width: '16px', textAlign: 'center' }} title="Payment Status">
                          <Coins size={12} style={{ color: getPaymentStatusColor(proposal.paymentStatus) }} />
                        </div>

                        {/* QTD Checkbox */}
                        <div style={{ width: '28px', textAlign: 'center' }}>
                          <Form.Check
                            type="checkbox"
                            checked={proposal.qtd}
                            onChange={() => toggleProposalField(proposal.id, 'qtd')}
                            className="mb-0"
                            style={{ transform: 'scale(0.85)' }}
                          />
                        </div>

                        {/* CLD Checkbox */}
                        <div style={{ width: '28px', textAlign: 'center' }}>
                          <Form.Check
                            type="checkbox"
                            checked={proposal.cld}
                            onChange={() => toggleProposalField(proposal.id, 'cld')}
                            className="mb-0"
                            style={{ transform: 'scale(0.85)' }}
                          />
                        </div>

                        {/* CMPL Checkbox */}
                        <div style={{ width: '28px', textAlign: 'center' }}>
                          <Form.Check
                            type="checkbox"
                            checked={proposal.cmpl}
                            onChange={() => toggleProposalField(proposal.id, 'cmpl')}
                            className="mb-0"
                            style={{ transform: 'scale(0.85)' }}
                          />
                        </div>

                        {/* Icon Placeholder 1 - Copy */}
                        <div style={{ width: '16px', textAlign: 'center' }}>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 text-secondary"
                            title="Copy Proposal"
                            style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={() => console.log('Copy proposal', proposal.id)}
                          >
                            <Copy size={11} />
                          </Button>
                        </div>

                        {/* Icon Placeholder 2 - Download */}
                        <div style={{ width: '16px', textAlign: 'center' }}>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 text-secondary"
                            title="Download"
                            style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={() => console.log('Download proposal', proposal.id)}
                          >
                            <Download size={11} />
                          </Button>
                        </div>

                        {/* Icon Placeholder 3 - Settings */}
                        <div style={{ width: '16px', textAlign: 'center' }}>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 text-secondary"
                            title="Settings"
                            style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={() => console.log('Settings for proposal', proposal.id)}
                          >
                            <Settings size={11} />
                          </Button>
                        </div>

                        {/* Icon Placeholder 4 - Bell/Notification */}
                        <div style={{ width: '16px', textAlign: 'center' }}>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 text-secondary"
                            title="Notifications"
                            style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={() => console.log('Notifications for proposal', proposal.id)}
                          >
                            <Bell size={11} />
                          </Button>
                        </div>

                        {/* Icon Placeholder 5 - More Options */}
                        <div style={{ width: '16px', textAlign: 'center' }}>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 text-secondary"
                            title="More Options"
                            style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={() => console.log('More options for proposal', proposal.id)}
                          >
                            <MoreHorizontal size={11} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ContactInfoCard>
            </Col>

            {/* Custom Features - ~20% */}
            <Col xs={12} xl={2}>
              <ContactInfoCard
                title="Custom Features"
                defaultExpanded={true}
                disableHeightStretch={true}
                hideChevron={true}
                fixedHeight={opportunitiesHeight ? `${opportunitiesHeight}px` : undefined}
              >
                <div className="small text-primary" style={{ cursor: 'pointer' }}>
                  Special commands content will go here
                </div>
              </ContactInfoCard>
            </Col>
          </Row>

          {/* Three Column Layout */}
          <Row className="g-3 px-3 pb-3" style={{ paddingTop: '12px' }}>
            <Col xs={12} lg={3} className="d-flex flex-column gap-3">
              <ContactInfoCard
                title="Contact Info"
                displayNumber="25614523"
                defaultExpanded={true}
                onDuplicate={() => console.log('Duplicate Contact Info')}
                headerActions={
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 text-secondary d-flex align-items-center justify-content-center"
                    title="Additional Contact Fields"
                    onClick={() => setShowAdditionalInfoModal(true)}
                    style={{ width: '16px', height: '16px' }}
                  >
                    <Expand size={14} />
                  </Button>
                }
              >
                <div className="d-flex flex-column gap-3">
                  <FloatingSelect
                    label="Assigned User"
                    value={assignedUser}
                    onChange={(e) => setAssignedUser(e.target.value)}
                  >
                    <FloatingSelectOption value="">Select User</FloatingSelectOption>
                    {users.map((user) => (
                      <FloatingSelectOption key={user.id} value={`${user.first_name} ${user.last_name}`}>
                        {user.first_name} {user.last_name}
                      </FloatingSelectOption>
                    ))}
                  </FloatingSelect>

                  <div>
                    <FloatingInput
                      label="First Name *"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (errors.firstName) setErrors(prev => ({ ...prev, firstName: undefined }));
                      }}
                      className={errors.firstName ? 'is-invalid' : ''}
                    />
                    {errors.firstName && <div className="text-danger small mt-1">{errors.firstName}</div>}
                  </div>

                  <div>
                    <FloatingInput
                      label="Last Name *"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        if (errors.lastName) setErrors(prev => ({ ...prev, lastName: undefined }));
                      }}
                      className={errors.lastName ? 'is-invalid' : ''}
                    />
                    {errors.lastName && <div className="text-danger small mt-1">{errors.lastName}</div>}
                  </div>

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
                        <FloatingSelectOption value="">Choose State</FloatingSelectOption>
                        {stateProvinceData.map((st) => (
                          <FloatingSelectOption key={st.abbreviation} value={st.abbreviation}>
                            {st.name}
                          </FloatingSelectOption>
                        ))}
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
                    <FloatingSelectOption value="Select Type">Select Type</FloatingSelectOption>
                    <FloatingSelectOption value="Lead">Lead</FloatingSelectOption>
                    <FloatingSelectOption value="Customer">Customer</FloatingSelectOption>
                    <FloatingSelectOption value="Partner">Partner</FloatingSelectOption>
                  </FloatingSelect>
                </div>
              </ContactInfoCard>

              <ContactInfoCard
                title="Pending Actions"
                defaultExpanded={true}
              >
                <p className="text-secondary small mb-0">No pending actions</p>
              </ContactInfoCard>

              <ContactInfoCard
                title="Attachments"
                defaultExpanded={false}
              >
                <p className="text-secondary small mb-0">No attachments</p>
              </ContactInfoCard>
            </Col>

            {/* Second Column - Communication Hub & Related */}
            <Col xs={12} lg className="d-flex flex-column gap-3">
              <Card className="shadow-sm">
                <Tab.Container
                  activeKey={communicationTab}
                  onSelect={(k) => setCommunicationTab(k || 'whiteboard')}
                >
                  <Card.Header className="bg-white border-bottom-0 pb-0">
                    <Nav variant="underline" className="nav-underline">
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
                  </Card.Header>

                  <Card.Body>
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
                  </Card.Body>
                </Tab.Container>
              </Card>

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
          </Row>
        </Container>
      </Modal.Body>

      {/* Additional Contact Info Large Modal */}
      <Modal
        show={showAdditionalInfoModal}
        onHide={() => setShowAdditionalInfoModal(false)}
        size="lg"
        centered
        backdrop="static"
        backdropClassName="show"
      >
        <Modal.Header closeButton>
          <Modal.Title>Additional Contact Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-3">
            <FloatingInput
              label="Title"
              value="Account Executive"
              onChange={() => {}}
            />
            <FloatingInput
              label="Reports To"
              value="John Doe"
              onChange={() => {}}
            />
            <FloatingInput
              label="LinkedIn"
              value="linkedin.com/in/csparks"
              onChange={() => {}}
            />
            <FloatingInput
              label="Twitter"
              value="@csparks"
              onChange={() => {}}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdditionalInfoModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowAdditionalInfoModal(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Modal>
  );
};
