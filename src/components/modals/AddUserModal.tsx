import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Collapse } from 'react-bootstrap';
import { Button } from '../bootstrap/Button';
import { FloatingInput, FloatingSelect } from '../bootstrap/FormControls';
import { Info, ChevronDown, ChevronRight } from 'lucide-react';
import { UserType, USER_TYPE_LABELS, createUser, updateUser } from '../../services/userService';

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

const TIME_OPTIONS = [
  '12:00 am', '12:30 am', '1:00 am', '1:30 am', '2:00 am', '2:30 am',
  '3:00 am', '3:30 am', '4:00 am', '4:30 am', '5:00 am', '5:30 am',
  '6:00 am', '6:30 am', '7:00 am', '7:30 am', '8:00 am', '8:30 am',
  '9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am',
  '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm', '2:00 pm', '2:30 pm',
  '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm', '5:00 pm', '5:30 pm',
  '6:00 pm', '6:30 pm', '7:00 pm', '7:30 pm', '8:00 pm', '8:30 pm',
  '9:00 pm', '9:30 pm', '10:00 pm', '10:30 pm', '11:00 pm', '11:30 pm',
];

const DEFAULT_SCHEDULE = [
  { day: 'Monday', enabled: true, startTime: '6:00 am', endTime: '5:00 pm' },
  { day: 'Tuesday', enabled: true, startTime: '8:00 am', endTime: '5:30 pm' },
  { day: 'Wednesday', enabled: true, startTime: '8:00 am', endTime: '5:00 pm' },
  { day: 'Thursday', enabled: true, startTime: '5:00 am', endTime: '5:00 pm' },
  { day: 'Friday', enabled: true, startTime: '5:30 am', endTime: '6:00 pm' },
  { day: 'Saturday', enabled: false, startTime: '12:00 am', endTime: '12:00 am' },
  { day: 'Sunday', enabled: false, startTime: '12:00 am', endTime: '12:00 am' },
];

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  apiId: string;
  userType?: UserType;
}

interface AddUserModalProps {
  show: boolean;
  onHide: () => void;
  user?: User | null;
  onSave?: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  show,
  onHide,
  user = null,
  onSave
}) => {
  const isEditMode = !!user;

  const [userType, setUserType] = useState<UserType>('standard');
  const [isSaving, setIsSaving] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [defaultPage, setDefaultPage] = useState('');
  const [defaultContactTab, setDefaultContactTab] = useState('Text');
  const [timezone, setTimezone] = useState('Mountain');

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  const [contactTypes, setContactTypes] = useState({
    clients: true,
    employee: true,
    partner: true,
    vendor: true,
    newOther: true,
  });

  const [showCalendar, setShowCalendar] = useState(true);
  const [sendDailyReminders, setSendDailyReminders] = useState(false);

  const [operationSettingsOpen, setOperationSettingsOpen] = useState(false);
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);

  const [customField, setCustomField] = useState('');
  const [calendlyUrl, setCalendlyUrl] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  useEffect(() => {
    if (show && user) {
      setUserType(user.userType || 'standard');
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setPhone(user.phone || '');
      setEmail(user.email || '');
      setUsername(user.username || '');
    } else if (show && !user) {
      setUserType('standard');
      setFirstName('');
      setLastName('');
      setPhone('');
      setEmail('');
      setUsername('');
      setDefaultPage('');
      setDefaultContactTab('Text');
      setTimezone('Mountain');
      setAddress('');
      setCity('');
      setState('');
      setZipcode('');
      setContactTypes({
        clients: true,
        employee: true,
        partner: true,
        vendor: true,
        newOther: true,
      });
      setShowCalendar(true);
      setSendDailyReminders(false);
      setSchedule(DEFAULT_SCHEDULE);
      setCustomField('');
      setCalendlyUrl('');
      setNewPassword('');
      setRepeatPassword('');
    }
  }, [show, user]);

  const handleSave = async () => {
    if (!firstName || !lastName || !email || !username) {
      return;
    }

    setIsSaving(true);

    try {
      const userData = {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || undefined,
        user_type: userType,
        timezone: timezone || undefined,
        default_page: defaultPage || undefined,
        default_contact_tab: defaultContactTab || undefined,
      };

      if (isEditMode && user) {
        await updateUser(user.id, userData);
      } else {
        await createUser(userData);
      }

      if (onSave) {
        onSave();
      }
      onHide();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleScheduleChange = (index: number, field: string, value: string | boolean) => {
    setSchedule(prev => prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleContactTypeToggle = (type: keyof typeof contactTypes) => {
    setContactTypes(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title style={{ fontSize: '1.25rem', fontWeight: 500 }}>
          {isEditMode ? 'Edit User' : 'Add User'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <Row className="g-3">
          <Col md={6} className="pe-4">
            <div className="d-flex flex-column gap-3">
              <FloatingSelect
                label="User Type"
                value={userType}
                onChange={(e) => setUserType(e.target.value as UserType)}
              >
                <option value="standard">{USER_TYPE_LABELS.standard}</option>
                <option value="admin">{USER_TYPE_LABELS.admin}</option>
                <option value="salesperson">{USER_TYPE_LABELS.salesperson}</option>
                <option value="subcontractor">{USER_TYPE_LABELS.subcontractor}</option>
              </FloatingSelect>

              <Row className="g-3">
                <Col md={6}>
                  <FloatingInput
                    label="First Name *"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                  />
                </Col>
                <Col md={6}>
                  <FloatingInput
                    label="Last Name *"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                  />
                </Col>
              </Row>

              <FloatingInput
                label="Phone Number *"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(435) 938-8063"
              />

              <FloatingInput
                label="Email *"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
              />

              <FloatingInput
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />

              <Row className="g-3">
                <Col md={6}>
                  <FloatingSelect
                    label="Default Page"
                    value={defaultPage}
                    onChange={(e) => setDefaultPage(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="dashboard">Dashboard</option>
                    <option value="contacts">Contacts</option>
                    <option value="calendar">Calendar</option>
                    <option value="pipeline">Pipeline</option>
                  </FloatingSelect>
                </Col>
                <Col md={6}>
                  <FloatingSelect
                    label="Default Contact Tab"
                    value={defaultContactTab}
                    onChange={(e) => setDefaultContactTab(e.target.value)}
                  >
                    <option value="Text">Text</option>
                    <option value="Email">Email</option>
                    <option value="Notes">Notes</option>
                    <option value="Activity">Activity</option>
                  </FloatingSelect>
                </Col>
              </Row>

              <FloatingSelect
                label="Timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                <option value="Mountain">Mountain</option>
                <option value="Pacific">Pacific</option>
                <option value="Central">Central</option>
                <option value="Eastern">Eastern</option>
              </FloatingSelect>

              <hr className="my-2" />

              <div className="d-flex align-items-end gap-2">
                <div className="flex-grow-1">
                  <FloatingSelect
                    label="User Custom Fields"
                    value={customField}
                    onChange={(e) => setCustomField(e.target.value)}
                  >
                    <option value="">Select Custom Field</option>
                    <option value="field1">Custom Field 1</option>
                    <option value="field2">Custom Field 2</option>
                  </FloatingSelect>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  style={{
                    backgroundColor: '#0d6efd',
                    border: 'none',
                    padding: '6px 16px',
                    height: '38px'
                  }}
                >
                  Add
                </Button>
              </div>

              <FloatingInput
                label="Calendly URL"
                type="text"
                value={calendlyUrl}
                onChange={(e) => setCalendlyUrl(e.target.value)}
                placeholder="https://calendly.com/..."
              />

              <hr className="my-2" />

              <Row className="g-3">
                <Col md={6}>
                  <FloatingInput
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </Col>
                <Col md={6}>
                  <FloatingInput
                    label="Repeat Password"
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder="Repeat password"
                  />
                </Col>
              </Row>

              <div>
                <Button
                  variant="success"
                  style={{
                    backgroundColor: '#3cb371',
                    border: 'none',
                    padding: '8px 20px',
                    fontSize: '0.875rem'
                  }}
                  onClick={() => console.log('Update password clicked')}
                >
                  Update Password
                </Button>
              </div>
            </div>
          </Col>

          <Col md={6} className="ps-4" style={{ borderLeft: '1px solid #dee2e6' }}>
            <div className="d-flex flex-column gap-3">
              <fieldset className="border rounded p-3">
                <legend className="float-none w-auto px-2 fs-6 fw-medium" style={{ fontSize: '0.875rem' }}>
                  Scheduler Address
                </legend>

                <div className="d-flex flex-column gap-3">
                  <FloatingInput
                    label="Address *"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address"
                  />

                  <Row className="g-3">
                    <Col md={6}>
                      <FloatingInput
                        label="City *"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city"
                      />
                    </Col>
                    <Col md={6}>
                      <FloatingSelect
                        label="State *"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="">Select State</option>
                        {US_STATES.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </FloatingSelect>
                    </Col>
                  </Row>

                  <FloatingInput
                    label="Zipcode *"
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    placeholder="Enter zip"
                  />
                </div>
              </fieldset>

              <fieldset className="border rounded p-3">
                <legend className="float-none w-auto px-2 fs-6 fw-medium" style={{ fontSize: '0.875rem' }}>
                  Contact Types
                </legend>
                <div className="d-flex flex-wrap gap-3">
                  <Form.Check
                    type="checkbox"
                    id="contact-clients"
                    label="Clients"
                    checked={contactTypes.clients}
                    onChange={() => handleContactTypeToggle('clients')}
                  />
                  <Form.Check
                    type="checkbox"
                    id="contact-employee"
                    label="Employee"
                    checked={contactTypes.employee}
                    onChange={() => handleContactTypeToggle('employee')}
                  />
                  <Form.Check
                    type="checkbox"
                    id="contact-partner"
                    label="Partner"
                    checked={contactTypes.partner}
                    onChange={() => handleContactTypeToggle('partner')}
                  />
                  <Form.Check
                    type="checkbox"
                    id="contact-vendor"
                    label="Vendor"
                    checked={contactTypes.vendor}
                    onChange={() => handleContactTypeToggle('vendor')}
                  />
                  <Form.Check
                    type="checkbox"
                    id="contact-newother"
                    label="New Other"
                    checked={contactTypes.newOther}
                    onChange={() => handleContactTypeToggle('newOther')}
                  />
                </div>
              </fieldset>

              <div className="d-flex flex-column gap-2">
                <Form.Check
                  type="checkbox"
                  id="show-calendar"
                  checked={showCalendar}
                  onChange={(e) => setShowCalendar(e.target.checked)}
                  label={
                    <span className="d-flex align-items-center gap-1">
                      Show Calendar?
                      <Info size={14} className="text-muted" />
                    </span>
                  }
                />
                <Form.Check
                  type="checkbox"
                  id="send-reminders"
                  label="Send Daily Email Reminders"
                  checked={sendDailyReminders}
                  onChange={(e) => setSendDailyReminders(e.target.checked)}
                />
              </div>

              <div className="border rounded overflow-hidden">
                <div
                  className="d-flex align-items-center gap-2 px-3 py-2"
                  style={{ backgroundColor: '#e9ecef', cursor: 'pointer' }}
                  onClick={() => setOperationSettingsOpen(!operationSettingsOpen)}
                >
                  {operationSettingsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  <span className="fw-medium" style={{ fontSize: '0.875rem' }}>Operation Settings</span>
                </div>
                <Collapse in={operationSettingsOpen}>
                  <div className="p-3">
                    {schedule.map((item, index) => (
                      <div key={item.day} className="d-flex align-items-center gap-3 mb-2">
                        <Form.Check
                          type="checkbox"
                          id={`day-${item.day}`}
                          checked={item.enabled}
                          onChange={(e) => handleScheduleChange(index, 'enabled', e.target.checked)}
                          label=""
                          style={{ minWidth: '20px' }}
                        />
                        <span
                          className={item.enabled ? 'fw-medium' : 'text-muted'}
                          style={{ minWidth: '90px', fontSize: '0.875rem' }}
                        >
                          {item.day}
                        </span>
                        <Form.Select
                          size="sm"
                          value={item.startTime}
                          onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                          disabled={!item.enabled}
                          style={{ width: '120px' }}
                        >
                          {TIME_OPTIONS.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </Form.Select>
                        <Form.Select
                          size="sm"
                          value={item.endTime}
                          onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                          disabled={!item.enabled}
                          style={{ width: '120px' }}
                        >
                          {TIME_OPTIONS.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </Form.Select>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={onHide} disabled={isSaving}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add User')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
