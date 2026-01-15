import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Form, InputGroup } from "react-bootstrap";
import { X, Star, Info, Paperclip, Tag, Users } from "lucide-react";
import { Button } from "../bootstrap/Button";
import { ContactInfoCard } from "../ContactInfoCard";
import { FloatingInput, FloatingSelect, FloatingSelectOption } from "../bootstrap/FormControls";
import { AddressAutocomplete } from "../bootstrap/AddressAutocomplete";
import { ChipCheck } from "../bootstrap/ChipCheck";
import { AddressSuggestion } from "../../data/mockAddressData";
import { Contact, ContactType } from "../../lib/supabase";
import { contactService } from "../../services/contactService";
import { userService, User } from "../../services/userService";
import { salesCycleService, SalesCycle } from "../../services/salesCycleService";
import { stateProvinceData } from "../../data/stateProvinceData";
import { leadSourceData } from "../../data/leadSourceData";

const contactTypeOptions: ContactType[] = ['Client', 'Employee', 'Partner', 'Vendor', 'Other'];

interface NewClientModalProps {
  show: boolean;
  onHide: () => void;
  onClientCreated: (contact: Contact) => void;
  defaultContactType?: ContactType;
}

export const NewClientModal: React.FC<NewClientModalProps> = ({
  show,
  onHide,
  onClientCreated,
  defaultContactType,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [salesCycles, setSalesCycles] = useState<SalesCycle[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; contactType?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [assignedUser, setAssignedUser] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [contactType, setContactType] = useState("");

  const [dealSize, setDealSize] = useState("");
  const [odds, setOdds] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [salesCycleId, setSalesCycleId] = useState("");
  const [leadSource, setLeadSource] = useState("");

  const [milestones, setMilestones] = useState({
    apptSet: false,
    quoted: false,
    closed: false,
    cmpl: false,
  });

  useEffect(() => {
    if (show) {
      loadDropdownData();
      resetForm();
    }
  }, [show]);

  const loadDropdownData = async () => {
    setLoadingData(true);
    try {
      const [usersData, cyclesData] = await Promise.all([
        userService.getAll(),
        salesCycleService.getAll(),
      ]);
      setUsers(usersData);
      setSalesCycles(cyclesData);

      if (cyclesData.length > 0) {
        const newLeadCycle = cyclesData.find(c => c.name === 'New Lead');
        setSalesCycleId(newLeadCycle?.id || cyclesData[0].id);
      }
    } catch (err) {
      console.error('Error loading dropdown data:', err);
    } finally {
      setLoadingData(false);
    }
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
    setContactType(defaultContactType || '');
    setDealSize('');
    setOdds('');
    setCloseDate('');
    setMilestones({
      apptSet: false,
      quoted: false,
      closed: false,
      cmpl: false,
    });
    setErrors({});
    setSubmitError(null);
  };

  const toggleMilestone = (key: keyof typeof milestones) => {
    setMilestones(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddressSelect = (selectedAddress: AddressSuggestion) => {
    setAddress(selectedAddress.streetAddress);
    setCity(selectedAddress.city);
    setState(selectedAddress.state);
    setPostalCode(selectedAddress.postalCode);
  };

  const validateForm = (): boolean => {
    const newErrors: { firstName?: string; lastName?: string; contactType?: string } = {};
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!contactType) {
      newErrors.contactType = 'Contact type is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateClient = async () => {
    if (!validateForm()) return;

    setSaving(true);
    setSubmitError(null);
    try {
      const result = await contactService.createWithOpportunity({
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
        contactType: contactType as ContactType,
      });

      onClientCreated(result.contact);
      onHide();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create client. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header
        className="border-bottom d-flex align-items-center justify-content-between"
        style={{ padding: '0.75rem 1rem' }}
      >
        <Modal.Title className="h5 fw-bold mb-0">New Client</Modal.Title>
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onHide}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={handleCreateClient}
            disabled={saving || loadingData || (salesCycles.length === 0 && !loadingData)}
            style={{ minWidth: '120px' }}
          >
            {saving ? 'Creating...' : 'Create Client'}
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

      <Modal.Body style={{ backgroundColor: '#f8f9fa', maxHeight: '80vh', overflowY: 'auto' }}>
        {submitError && (
          <div className="alert alert-danger d-flex align-items-center mb-3" role="alert">
            <X size={16} className="me-2 flex-shrink-0" />
            <div>{submitError}</div>
          </div>
        )}
        {salesCycles.length === 0 && !loadingData && (
          <div className="alert alert-warning d-flex align-items-center mb-3" role="alert">
            <Info size={16} className="me-2 flex-shrink-0" />
            <div>No sales cycles available. Please configure pipeline stages first.</div>
          </div>
        )}
        <Row className="g-3">
          <Col xs={12} lg={5}>
            <ContactInfoCard
              title="Contact Info"
              defaultExpanded={true}
              hideChevron={true}
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

                <AddressAutocomplete
                  label="Address"
                  value={address}
                  onChange={setAddress}
                  onAddressSelect={handleAddressSelect}
                />

                <FloatingInput
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />

                <div className="row g-2">
                  <div className="col-6">
                    <FloatingSelect
                      label="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <FloatingSelectOption value="">Select</FloatingSelectOption>
                      {stateProvinceData.map((st) => (
                        <FloatingSelectOption key={st.abbreviation} value={st.abbreviation}>
                          {st.abbreviation}
                        </FloatingSelectOption>
                      ))}
                    </FloatingSelect>
                  </div>
                  <div className="col-6">
                    <FloatingInput
                      label="Postal Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <FloatingSelect
                    label="Contact Type *"
                    value={contactType}
                    onChange={(e) => {
                      setContactType(e.target.value);
                      if (errors.contactType) setErrors(prev => ({ ...prev, contactType: undefined }));
                    }}
                    className={errors.contactType ? 'is-invalid' : ''}
                  >
                    <FloatingSelectOption value="">Select Type</FloatingSelectOption>
                    {contactTypeOptions.map((type) => (
                      <FloatingSelectOption key={type} value={type}>{type}</FloatingSelectOption>
                    ))}
                  </FloatingSelect>
                  {errors.contactType && <div className="text-danger small mt-1">{errors.contactType}</div>}
                </div>
              </div>
            </ContactInfoCard>
          </Col>

          <Col xs={12} lg={7}>
            <div className="d-flex flex-column gap-3">
              <ContactInfoCard
                title="Opportunity"
                defaultExpanded={true}
                hideChevron={true}
              >
                <div className="row g-3">
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

                  <div className="col-12 col-md-6">
                    <FloatingInput
                      label="Close Date"
                      type="date"
                      value={closeDate}
                      onChange={(e) => setCloseDate(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <div className="d-flex flex-wrap gap-2">
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
                </div>
              </ContactInfoCard>

              <ContactInfoCard
                title="Attachments"
                defaultExpanded={false}
                icon={Paperclip}
              >
                <div className="text-center py-3">
                  <Paperclip size={24} className="text-muted mb-2" />
                  <p className="text-secondary small mb-0">No attachments yet</p>
                  <p className="text-muted small">You can add attachments after creating the client</p>
                </div>
              </ContactInfoCard>

              <ContactInfoCard
                title="Tags"
                defaultExpanded={false}
                icon={Tag}
              >
                <div className="text-center py-3">
                  <Tag size={24} className="text-muted mb-2" />
                  <p className="text-secondary small mb-0">No tags</p>
                  <p className="text-muted small">You can add tags after creating the client</p>
                </div>
              </ContactInfoCard>

              <ContactInfoCard
                title="Linked Contacts"
                defaultExpanded={false}
                icon={Users}
              >
                <div className="text-center py-3">
                  <Users size={24} className="text-muted mb-2" />
                  <p className="text-secondary small mb-0">No linked contacts</p>
                  <p className="text-muted small">You can link contacts after creating the client</p>
                </div>
              </ContactInfoCard>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
