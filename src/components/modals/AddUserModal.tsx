import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Collapse } from 'react-bootstrap';
import { Button } from '../bootstrap/Button';
import { FloatingInput, FloatingSelect, FloatingSelectOption } from '../bootstrap/FormControls';
import { Info, ChevronDown, ChevronRight } from 'lucide-react';

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

  const [userType, setUserType] = useState('Admin');
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

  const [operationSettingsOpen, setOperationSettingsOpen] = useState(true);
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);

  const [customField, setCustomField] = useState('');
  const [calendlyUrl, setCalendlyUrl] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  useEffect(() => {
    if (show && user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setPhone(user.phone || '');
      setEmail(user.email || '');
      setUsername(user.username || '');
    } else if (show && !user) {
      setUserType('Admin');
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

  const handleSave = () => {
    console.log('Saving user:', {
      userType,
      firstName,
      lastName,
      phone,
      email,
      username,
      defaultPage,
      defaultContactTab,
      timezone,
      address,
      city,
      state,
      zipcode,
      contactTypes,
      showCalendar,
      sendDailyReminders,
      schedule,
      customField,
      calendlyUrl,
    });

    if (onSave) {
      onSave();
    }
    onHide();
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
          Add/Edit User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <Row>
          <Col md={6} className="pe-4">
            <div className="d-flex flex-column gap-3">
              <div>
                <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  User Type
                </Form.Label>
                <Form.Select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  style={{ maxWidth: '200px' }}
                >
                  <option value="Admin">Admin</option>
                  <option value="Standard">Standard</option>
                </Form.Select>
              </div>

              <div>
                <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  First Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="sara"
                />
              </div>

              <div>
                <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  Last Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Admin"
                />
              </div>

              <div>
                <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  Phone Number <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(435) 938-8063"
                />
              </div>

              <div>
                <Form.Label className="mb-1 d-flex align-items-center gap-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  Email <span className="text-danger">*</span>
                </Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sara.hansen181+admin@gmail.com"
                  />
                  <Info
                    size={16}
                    className="position-absolute text-muted"
                    style={{ right: '12px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                </div>
              </div>

              <div>
                <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  Username
                </Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="saraadmin"
                  />
                  <Info
                    size={16}
                    className="position-absolute text-muted"
                    style={{ right: '12px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                </div>
              </div>

              <div>
                <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  Default Page
                </Form.Label>
                <Form.Select
                  value={defaultPage}
                  onChange={(e) => setDefaultPage(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="dashboard">Dashboard</option>
                  <option value="contacts">Contacts</option>
                  <option value="calendar">Calendar</option>
                  <option value="pipeline">Pipeline</option>
                </Form.Select>
              </div>

              <div>
                <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  Default Contact Tab
                </Form.Label>
                <Form.Select
                  value={defaultContactTab}
                  onChange={(e) => setDefaultContactTab(e.target.value)}
                >
                  <option value="Text">Text</option>
                  <option value="Email">Email</option>
                  <option value="Notes">Notes</option>
                  <option value="Activity">Activity</option>
                </Form.Select>
              </div>

              <div>
                <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  Timezone
                </Form.Label>
                <Form.Select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  <option value="Mountain">Mountain</option>
                  <option value="Pacific">Pacific</option>
                  <option value="Central">Central</option>
                  <option value="Eastern">Eastern</option>
                </Form.Select>
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
                  <div>
                    <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                      Address <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter Address"
                    />
                  </div>

                  <div>
                    <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                      City <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter City"
                    />
                  </div>

                  <div>
                    <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                      State <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">Select State</option>
                      {US_STATES.map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </Form.Select>
                  </div>

                  <div>
                    <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                      Zipcode <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                      placeholder="Enter zip"
                    />
                  </div>
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

              <hr className="my-2" />

              <div className="d-flex align-items-end gap-2">
                <div className="flex-grow-1">
                  <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    User Custom Fields
                  </Form.Label>
                  <Form.Select
                    value={customField}
                    onChange={(e) => setCustomField(e.target.value)}
                  >
                    <option value="">Select Custom Field</option>
                    <option value="field1">Custom Field 1</option>
                    <option value="field2">Custom Field 2</option>
                  </Form.Select>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  style={{
                    backgroundColor: '#0d6efd',
                    border: 'none',
                    padding: '6px 16px'
                  }}
                >
                  Add
                </Button>
              </div>

              <div>
                <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  Calendly
                </Form.Label>
                <Form.Control
                  type="text"
                  value={calendlyUrl}
                  onChange={(e) => setCalendlyUrl(e.target.value)}
                  placeholder="Https://apple.com"
                />
              </div>

              <hr className="my-2" />

              <Row className="g-3">
                <Col md={6}>
                  <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    New Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter New Password"
                  />
                </Col>
                <Col md={6}>
                  <Form.Label className="mb-1" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    Repeat Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder="Repeat New Password"
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
        </Row>
      </Modal.Body>
    </Modal>
  );
};
