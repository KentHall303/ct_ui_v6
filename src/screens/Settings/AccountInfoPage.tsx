import React, { useState, useEffect, useCallback } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { BodyPageLayout } from '../../components/layout/BodyPageLayout/BodyPageLayout';
import { FloatingInput, FloatingSelect } from '../../components/bootstrap/FormControls';
import { Button } from '../../components/bootstrap/Button';
import { ImageDropzone } from '../../components/bootstrap/ImageDropzone';
import { Info } from 'lucide-react';
import {
  fetchAccountSettings,
  updateAccountSettings,
  AccountSettings,
} from '../../services/accountSettingsService';

const COUNTRIES = [
  { value: 'US', label: 'US' },
  { value: 'CA', label: 'Canada' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
];

const DEFAULT_PAGES = [
  { value: 'Accounts', label: 'Accounts' },
  { value: 'Contacts', label: 'Contacts' },
  { value: 'Calendar', label: 'Calendar' },
  { value: 'Pipeline', label: 'Pipeline' },
  { value: 'Dashboard', label: 'Dashboard' },
];

const CONTACT_TABS = [
  { value: 'Log-a-Call', label: 'Log-a-Call' },
  { value: 'Text', label: 'Text' },
  { value: 'Email', label: 'Email' },
  { value: 'Notes', label: 'Notes' },
  { value: 'Activity', label: 'Activity' },
];

const DATE_FORMATS = [
  { value: 'd-m-Y', label: 'd-m-Y', example: '01-12-2001' },
  { value: 'Y-m-d', label: 'Y-m-d', example: '2001-12-01' },
  { value: 'Y/m/d', label: 'Y/m/d', example: '2001/12/01' },
  { value: 'd/m/Y', label: 'd/m/Y', example: '01/12/2001' },
  { value: 'm/d/Y', label: 'm/d/Y', example: '12/01/2001' },
  { value: 'm-d-Y', label: 'm-d-Y', example: '12-01-2001' },
  { value: 'F j, Y', label: 'F j, Y', example: 'December 01, 2001' },
];

const TIME_FORMATS = [
  { value: 'H:i:s', label: 'H:i:s', example: '13:10:59' },
  { value: 'H:i', label: 'H:i', example: '13:10' },
  { value: 'g:i a', label: 'g:i a', example: '1:10 pm' },
  { value: 'h:i a', label: 'h:i a', example: '01:10 pm' },
];

const THEME_COLORS = [
  '#f59e0b',
  '#22c55e',
  '#1e3a8a',
  '#06b6d4',
  '#3b82f6',
  '#ef4444',
  '#dc2626',
  '#6b7280',
];

export const AccountInfoPage: React.FC = () => {
  const [settings, setSettings] = useState<AccountSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('US');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [recordCall, setRecordCall] = useState(true);
  const [notificationSound, setNotificationSound] = useState(true);
  const [rightSidePanelOpened, setRightSidePanelOpened] = useState(true);
  const [defaultPage, setDefaultPage] = useState('Accounts');
  const [defaultContactTab, setDefaultContactTab] = useState('Log-a-Call');

  const [company, setCompany] = useState('');
  const [accountOwner, setAccountOwner] = useState('');
  const [website, setWebsite] = useState('');
  const [officePhone, setOfficePhone] = useState('');
  const [notificationAutoDeleteDays, setNotificationAutoDeleteDays] = useState('30');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [dateFormat, setDateFormat] = useState('F j, Y');
  const [timeFormat, setTimeFormat] = useState('g:i a');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [themeColor, setThemeColor] = useState('#3b82f6');
  const [headerColor, setHeaderColor] = useState('#161516');
  const [footerColor, setFooterColor] = useState('#b0b2b0');
  const [logoUrl, setLogoUrl] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAccountSettings();
      if (data) {
        setSettings(data);
        setFirstName(data.first_name || '');
        setLastName(data.last_name || '');
        setPhone(data.phone || '');
        setEmail(data.email || '');
        setCountry(data.country || 'US');
        setProfileImageUrl(data.profile_image_url || '');
        setIsActive(data.is_active ?? true);
        setRecordCall(data.record_call ?? true);
        setNotificationSound(data.notification_sound ?? true);
        setRightSidePanelOpened(data.right_side_panel_opened ?? true);
        setDefaultPage(data.default_page || 'Accounts');
        setDefaultContactTab(data.default_contact_tab || 'Log-a-Call');
        setCompany(data.company || '');
        setAccountOwner(data.account_owner || '');
        setWebsite(data.website || '');
        setOfficePhone(data.office_phone || '');
        setNotificationAutoDeleteDays(String(data.notification_auto_delete_days || 30));
        setAddress1(data.address_1 || '');
        setAddress2(data.address_2 || '');
        setAddress3(data.address_3 || '');
        setDateFormat(data.default_date_format || 'F j, Y');
        setTimeFormat(data.default_time_format || 'g:i a');
        setThemeColor(data.theme_color || '#3b82f6');
        setHeaderColor(data.header_color || '#161516');
        setFooterColor(data.footer_color || '#b0b2b0');
        setLogoUrl(data.logo_url || '');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleSave = async () => {
    if (!settings?.id) return;

    setIsSaving(true);
    try {
      await updateAccountSettings(settings.id, {
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
        country,
        profile_image_url: profileImageUrl,
        is_active: isActive,
        record_call: recordCall,
        notification_sound: notificationSound,
        right_side_panel_opened: rightSidePanelOpened,
        default_page: defaultPage,
        default_contact_tab: defaultContactTab,
        company,
        account_owner: accountOwner,
        website,
        office_phone: officePhone,
        notification_auto_delete_days: parseInt(notificationAutoDeleteDays) || 30,
        address_1: address1,
        address_2: address2,
        address_3: address3,
        default_date_format: dateFormat,
        default_time_format: timeFormat,
        theme_color: themeColor,
        header_color: headerColor,
        footer_color: footerColor,
        logo_url: logoUrl,
      });
      await loadSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfileImageSelect = (file: File) => {
    setProfileFile(file);
  };

  const handleProfileImageRemove = () => {
    setProfileFile(null);
    setProfileImageUrl('');
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <BodyPageLayout title="Account Info">
        <div className="p-4 d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </BodyPageLayout>
    );
  }

  return (
    <BodyPageLayout title="Account Info">
      <div className="p-4" style={{ maxWidth: '1200px' }}>
        <div className="d-flex flex-column gap-4">
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="d-flex align-items-center gap-3">
                  <h5 className="fw-bold mb-0">Personal Information</h5>
                  <Form.Check
                    type="switch"
                    id="is-active"
                    label="Active"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="mb-0"
                  />
                </div>
                <ImageDropzone
                  imageUrl={profileImageUrl}
                  onImageSelect={handleProfileImageSelect}
                  onImageRemove={handleProfileImageRemove}
                  size={80}
                />
              </div>

              <Row className="g-3">
                <Col md={4}>
                  <FloatingInput
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <FloatingInput
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
                <Col md={4} />
              </Row>

              <Row className="g-3 mt-1">
                <Col md={4}>
                  <FloatingInput
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <div className="position-relative">
                    <FloatingInput
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Info
                      size={16}
                      className="position-absolute text-muted"
                      style={{ right: '12px', top: '50%', transform: 'translateY(-50%)' }}
                      title="Primary email for notifications"
                    />
                  </div>
                </Col>
                <Col md={4} />
              </Row>

              <Row className="g-3 mt-1">
                <Col md={4}>
                  <FloatingSelect
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </FloatingSelect>
                </Col>
                <Col md={4}>
                  <div className="d-flex gap-4 align-items-center h-100">
                    <Form.Check
                      type="switch"
                      id="record-call"
                      label="Record Call"
                      checked={recordCall}
                      onChange={(e) => setRecordCall(e.target.checked)}
                    />
                    <Form.Check
                      type="switch"
                      id="notification-sound"
                      label="Notification Sound"
                      checked={notificationSound}
                      onChange={(e) => setNotificationSound(e.target.checked)}
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <Form.Check
                    type="switch"
                    id="right-panel"
                    label="Right Side Panel Opened"
                    checked={rightSidePanelOpened}
                    onChange={(e) => setRightSidePanelOpened(e.target.checked)}
                    className="h-100 d-flex align-items-center"
                  />
                </Col>
              </Row>

              <Row className="g-3 mt-1">
                <Col md={4}>
                  <FloatingSelect
                    label="Default Page"
                    value={defaultPage}
                    onChange={(e) => setDefaultPage(e.target.value)}
                  >
                    {DEFAULT_PAGES.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </FloatingSelect>
                </Col>
                <Col md={4}>
                  <FloatingSelect
                    label="Default Contact Tab"
                    value={defaultContactTab}
                    onChange={(e) => setDefaultContactTab(e.target.value)}
                  >
                    {CONTACT_TABS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </FloatingSelect>
                </Col>
                <Col md={4} />
              </Row>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4">Account Information</h5>

              <Row className="g-3">
                <Col md={4}>
                  <FloatingInput
                    label="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <FloatingInput
                    label="Account Owner"
                    value={accountOwner}
                    onChange={(e) => setAccountOwner(e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <FloatingInput
                    label="Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </Col>
              </Row>

              <Row className="g-3 mt-1">
                <Col md={4}>
                  <FloatingInput
                    label="Office-Phone"
                    value={officePhone}
                    onChange={(e) => setOfficePhone(e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <FloatingInput
                    label="Notification Auto-delete Days"
                    type="number"
                    value={notificationAutoDeleteDays}
                    onChange={(e) => setNotificationAutoDeleteDays(e.target.value)}
                  />
                </Col>
                <Col md={4} />
              </Row>

              <Row className="g-3 mt-1">
                <Col md={4}>
                  <FloatingInput
                    label="Address 1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <FloatingInput
                    label="Address 2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <FloatingInput
                    label="Address 3"
                    value={address3}
                    onChange={(e) => setAddress3(e.target.value)}
                  />
                </Col>
              </Row>

              <Row className="g-4 mt-3">
                <Col md={6}>
                  <div className="mb-2 fw-medium">Default Date Format</div>
                  <div className="d-flex flex-column gap-1">
                    {DATE_FORMATS.map((df) => (
                      <Form.Check
                        key={df.value}
                        type="radio"
                        id={`date-${df.value}`}
                        name="dateFormat"
                        label={`${df.label} (${df.example})`}
                        checked={dateFormat === df.value}
                        onChange={() => setDateFormat(df.value)}
                      />
                    ))}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-2 fw-medium">Default Time Format</div>
                  <div className="d-flex flex-column gap-1">
                    {TIME_FORMATS.map((tf) => (
                      <Form.Check
                        key={tf.value}
                        type="radio"
                        id={`time-${tf.value}`}
                        name="timeFormat"
                        label={`${tf.label} (${tf.example})`}
                        checked={timeFormat === tf.value}
                        onChange={() => setTimeFormat(tf.value)}
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Row className="g-4">
            <Col md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4">Password</h5>

                  <div className="d-flex flex-column gap-3">
                    <FloatingInput
                      label="Current Password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <FloatingInput
                      label="New Password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <FloatingInput
                      label="Repeat New Password"
                      type="password"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4">Theme</h5>

                  <div className="mb-3">
                    <div className="mb-2 small fw-medium">Theme Color</div>
                    <div className="d-flex gap-2 flex-wrap">
                      {THEME_COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setThemeColor(color)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: color,
                            border: themeColor === color ? '3px solid #000' : '2px solid #dee2e6',
                            cursor: 'pointer',
                            transition: 'transform 0.15s ease',
                            transform: themeColor === color ? 'scale(1.1)' : 'scale(1)',
                          }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="mb-2 small fw-medium">Header Color</div>
                    <div className="d-flex align-items-center gap-2">
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: headerColor,
                          border: '1px solid #dee2e6',
                          borderRadius: '4px',
                        }}
                      />
                      <Form.Control
                        type="text"
                        value={headerColor}
                        onChange={(e) => setHeaderColor(e.target.value)}
                        style={{ maxWidth: '120px' }}
                        size="sm"
                      />
                      <Form.Control
                        type="color"
                        value={headerColor}
                        onChange={(e) => setHeaderColor(e.target.value)}
                        style={{ width: '40px', height: '32px', padding: '2px' }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="mb-2 small fw-medium">Footer Color</div>
                    <div className="d-flex align-items-center gap-2">
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: footerColor,
                          border: '1px solid #dee2e6',
                          borderRadius: '4px',
                        }}
                      />
                      <Form.Control
                        type="text"
                        value={footerColor}
                        onChange={(e) => setFooterColor(e.target.value)}
                        style={{ maxWidth: '120px' }}
                        size="sm"
                      />
                      <Form.Control
                        type="color"
                        value={footerColor}
                        onChange={(e) => setFooterColor(e.target.value)}
                        style={{ width: '40px', height: '32px', padding: '2px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 small fw-medium">Logo</div>
                    <div className="d-flex align-items-center gap-3">
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleLogoFileChange}
                        size="sm"
                        style={{ maxWidth: '200px' }}
                      />
                      {logoUrl && (
                        <img
                          src={logoUrl}
                          alt="Logo preview"
                          style={{
                            maxHeight: '40px',
                            maxWidth: '100px',
                            objectFit: 'contain',
                          }}
                        />
                      )}
                    </div>
                    <div className="small text-muted mt-1">
                      Recommended file size or other instructions can go here.
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="mt-2">
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={isSaving}
              style={{ minWidth: '120px' }}
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </div>
      </div>
    </BodyPageLayout>
  );
};
