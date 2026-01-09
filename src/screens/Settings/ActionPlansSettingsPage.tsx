import React, { useState, useEffect, useCallback } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { BodyPageLayout } from '../../components/layout/BodyPageLayout/BodyPageLayout';
import { Button } from '../../components/bootstrap/Button';
import {
  fetchActionPlansSettings,
  updateActionPlansSettings,
  ActionPlansSettings,
} from '../../services/actionPlansSettingsService';
import { fetchAccountSettings } from '../../services/accountSettingsService';
import { handlePhoneInput } from '../../utils/phoneFormatter';

const CARD_HEADER_STYLE: React.CSSProperties = {
  backgroundColor: '#3498db',
  color: 'white',
  textAlign: 'center',
  fontWeight: 600,
  padding: '10px 16px',
};

export const ActionPlansSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<ActionPlansSettings | null>(null);
  const [accountName, setAccountName] = useState('CT Test Accounts');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [actionCallOption, setActionCallOption] = useState<'default' | 'ordered' | 'simultaneous'>('default');
  const [actionCallDivertToAssignedUser, setActionCallDivertToAssignedUser] = useState(false);

  const [bccSystemSendsActionPlanEmails, setBccSystemSendsActionPlanEmails] = useState(false);
  const [bccUserSendsBulkEmails, setBccUserSendsBulkEmails] = useState(false);
  const [bccUserSendsManualEmails, setBccUserSendsManualEmails] = useState(false);
  const [bccAccountOwnerSendsEmails, setBccAccountOwnerSendsEmails] = useState(false);
  const [sendTodayScheduleToOwner, setSendTodayScheduleToOwner] = useState(false);
  const [sendFromAssignedUser, setSendFromAssignedUser] = useState(true);
  const [actionPlanEmailOption, setActionPlanEmailOption] = useState<'send_all' | 'send_assigned_only'>('send_all');

  const [playClientStatusMessage, setPlayClientStatusMessage] = useState(true);
  const [ringTimeSeconds, setRingTimeSeconds] = useState(30);
  const [phoneReturnOption, setPhoneReturnOption] = useState<'default' | 'ordered' | 'pass_through' | 'simultaneous'>('default');
  const [phoneReturnDivertToAssignedUser, setPhoneReturnDivertToAssignedUser] = useState(false);
  const [businessHoursPhone, setBusinessHoursPhone] = useState('');
  const [afterHoursPhone, setAfterHoursPhone] = useState('');

  const [textNotificationPhone, setTextNotificationPhone] = useState('');
  const [sendOwnerTextOperationHoursOnly, setSendOwnerTextOperationHoursOnly] = useState(false);
  const [sendDelayedActionPlanTextsBusinessHours, setSendDelayedActionPlanTextsBusinessHours] = useState(true);
  const [endConnectionPlanOnReturnText, setEndConnectionPlanOnReturnText] = useState(true);

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const [actionPlansData, accountData] = await Promise.all([
        fetchActionPlansSettings(),
        fetchAccountSettings(),
      ]);

      if (accountData?.company) {
        setAccountName(accountData.company);
      }

      if (actionPlansData) {
        setSettings(actionPlansData);
        setActionCallOption(actionPlansData.action_call_option);
        setActionCallDivertToAssignedUser(actionPlansData.action_call_divert_to_assigned_user);
        setBccSystemSendsActionPlanEmails(actionPlansData.bcc_system_sends_action_plan_emails);
        setBccUserSendsBulkEmails(actionPlansData.bcc_user_sends_bulk_emails);
        setBccUserSendsManualEmails(actionPlansData.bcc_user_sends_manual_emails);
        setBccAccountOwnerSendsEmails(actionPlansData.bcc_account_owner_sends_emails);
        setSendTodayScheduleToOwner(actionPlansData.send_today_schedule_to_owner);
        setSendFromAssignedUser(actionPlansData.send_from_assigned_user);
        setActionPlanEmailOption(actionPlansData.action_plan_email_option);
        setPlayClientStatusMessage(actionPlansData.play_client_status_message);
        setRingTimeSeconds(actionPlansData.ring_time_seconds);
        setPhoneReturnOption(actionPlansData.phone_return_option);
        setPhoneReturnDivertToAssignedUser(actionPlansData.phone_return_divert_to_assigned_user);
        setBusinessHoursPhone(actionPlansData.business_hours_phone || '');
        setAfterHoursPhone(actionPlansData.after_hours_phone || '');
        setTextNotificationPhone(actionPlansData.text_notification_phone || '');
        setSendOwnerTextOperationHoursOnly(actionPlansData.send_owner_text_operation_hours_only);
        setSendDelayedActionPlanTextsBusinessHours(actionPlansData.send_delayed_action_plan_texts_business_hours);
        setEndConnectionPlanOnReturnText(actionPlansData.end_connection_plan_on_return_text);
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
      await updateActionPlansSettings(settings.id, {
        action_call_option: actionCallOption,
        action_call_divert_to_assigned_user: actionCallDivertToAssignedUser,
        bcc_system_sends_action_plan_emails: bccSystemSendsActionPlanEmails,
        bcc_user_sends_bulk_emails: bccUserSendsBulkEmails,
        bcc_user_sends_manual_emails: bccUserSendsManualEmails,
        bcc_account_owner_sends_emails: bccAccountOwnerSendsEmails,
        send_today_schedule_to_owner: sendTodayScheduleToOwner,
        send_from_assigned_user: sendFromAssignedUser,
        action_plan_email_option: actionPlanEmailOption,
        play_client_status_message: playClientStatusMessage,
        ring_time_seconds: ringTimeSeconds,
        phone_return_option: phoneReturnOption,
        phone_return_divert_to_assigned_user: phoneReturnDivertToAssignedUser,
        business_hours_phone: businessHoursPhone,
        after_hours_phone: afterHoursPhone,
        text_notification_phone: textNotificationPhone,
        send_owner_text_operation_hours_only: sendOwnerTextOperationHoursOnly,
        send_delayed_action_plan_texts_business_hours: sendDelayedActionPlanTextsBusinessHours,
        end_connection_plan_on_return_text: endConnectionPlanOnReturnText,
      });
      await loadSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRingTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setRingTimeSeconds(Math.min(100, Math.max(0, value)));
  };

  const renderHeader = () => (
    <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
      <h5 className="mb-0 fw-semibold">Action Plans Settings</h5>
      <Button
        variant="primary"
        onClick={handleSave}
        disabled={isSaving || isLoading}
        style={{ minWidth: '140px' }}
      >
        {isSaving ? 'Saving...' : 'Save Settings'}
      </Button>
    </div>
  );

  if (isLoading) {
    return (
      <BodyPageLayout header={renderHeader()}>
        <div className="p-4 d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </BodyPageLayout>
    );
  }

  return (
    <BodyPageLayout header={renderHeader()}>
      <div className="p-4" style={{ maxWidth: '1400px' }}>
        <Row className="g-4">
          <Col md={6}>
            <Card className="shadow-sm h-100">
              <Card.Header style={CARD_HEADER_STYLE}>
                Action Call options
              </Card.Header>
              <Card.Body className="p-4">
                <div className="d-flex flex-column gap-2">
                  <Form.Check
                    type="radio"
                    id="action-call-default"
                    name="actionCallOption"
                    label="Default"
                    checked={actionCallOption === 'default'}
                    onChange={() => setActionCallOption('default')}
                  />
                  <div className="ms-4">
                    <Form.Check
                      type="checkbox"
                      id="action-call-divert"
                      label="Divert to Assigned User when possible."
                      checked={actionCallDivertToAssignedUser}
                      onChange={(e) => setActionCallDivertToAssignedUser(e.target.checked)}
                      disabled={actionCallOption !== 'default'}
                    />
                  </div>
                  <Form.Check
                    type="radio"
                    id="action-call-ordered"
                    name="actionCallOption"
                    label="Ordered"
                    checked={actionCallOption === 'ordered'}
                    onChange={() => setActionCallOption('ordered')}
                  />
                  <Form.Check
                    type="radio"
                    id="action-call-simultaneous"
                    name="actionCallOption"
                    label="Simultaneous"
                    checked={actionCallOption === 'simultaneous'}
                    onChange={() => setActionCallOption('simultaneous')}
                  />
                </div>

                <p className="text-muted mt-4 mb-0" style={{ fontSize: '0.875rem' }}>
                  By default, only the phone number for the main user is called when an Action Call.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm h-100">
              <Card.Header style={CARD_HEADER_STYLE}>
                System Emails to/from Users
              </Card.Header>
              <Card.Body className="p-4">
                <div className="fw-semibold mb-2">BCC Account Owner when...</div>
                <div className="d-flex flex-column gap-2 mb-3">
                  <Form.Check
                    type="checkbox"
                    id="bcc-system-sends"
                    label="System sends Action Plan and Scheduled Emails."
                    checked={bccSystemSendsActionPlanEmails}
                    onChange={(e) => setBccSystemSendsActionPlanEmails(e.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="bcc-user-bulk"
                    label="User sends Bulk Emails."
                    checked={bccUserSendsBulkEmails}
                    onChange={(e) => setBccUserSendsBulkEmails(e.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="bcc-user-manual"
                    label="User sends Manual (Single) Emails."
                    checked={bccUserSendsManualEmails}
                    onChange={(e) => setBccUserSendsManualEmails(e.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="bcc-owner-sends"
                    label="Account Owner sends emails."
                    checked={bccAccountOwnerSendsEmails}
                    onChange={(e) => setBccAccountOwnerSendsEmails(e.target.checked)}
                  />
                </div>

                <Form.Check
                  type="checkbox"
                  id="send-today-schedule"
                  label="Send Today's Schedule to Account Owner."
                  checked={sendTodayScheduleToOwner}
                  onChange={(e) => setSendTodayScheduleToOwner(e.target.checked)}
                  className="mb-3"
                />

                <div className="fw-semibold mb-2">Action Plan Emails</div>
                <div className="d-flex flex-column gap-2">
                  <Form.Check
                    type="checkbox"
                    id="send-from-assigned"
                    label="Send from Assigned User."
                    checked={sendFromAssignedUser}
                    onChange={(e) => setSendFromAssignedUser(e.target.checked)}
                  />
                  <Form.Check
                    type="radio"
                    id="email-send-all"
                    name="actionPlanEmailOption"
                    label="Send All Email."
                    checked={actionPlanEmailOption === 'send_all'}
                    onChange={() => setActionPlanEmailOption('send_all')}
                  />
                  <Form.Check
                    type="radio"
                    id="email-send-assigned-only"
                    name="actionPlanEmailOption"
                    label="Send Only Assigned User Email."
                    checked={actionPlanEmailOption === 'send_assigned_only'}
                    onChange={() => setActionPlanEmailOption('send_assigned_only')}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm h-100">
              <Card.Header style={CARD_HEADER_STYLE}>
                {accountName} Phone Return
              </Card.Header>
              <Card.Body className="p-4">
                <Form.Check
                  type="checkbox"
                  id="play-client-status"
                  label="Play Client Status Message"
                  checked={playClientStatusMessage}
                  onChange={(e) => setPlayClientStatusMessage(e.target.checked)}
                  className="mb-1"
                />
                <div className="text-muted mb-3" style={{ fontSize: '0.875rem', marginLeft: '24px' }}>
                  (Will use {accountName} Voicemail)
                </div>

                <div className="d-flex align-items-center gap-2 mb-3">
                  <Form.Control
                    type="number"
                    value={ringTimeSeconds}
                    onChange={handleRingTimeChange}
                    min={0}
                    max={100}
                    style={{ width: '80px' }}
                  />
                  <span style={{ fontSize: '0.875rem' }}>Ring time before Rolling [0-100] in Seconds</span>
                </div>

                <div className="d-flex flex-column gap-2 mb-3">
                  <Form.Check
                    type="radio"
                    id="phone-return-default"
                    name="phoneReturnOption"
                    label="Default"
                    checked={phoneReturnOption === 'default'}
                    onChange={() => setPhoneReturnOption('default')}
                  />
                  <div className="ms-4">
                    <Form.Check
                      type="checkbox"
                      id="phone-return-divert"
                      label="Divert to Assigned User when possible"
                      checked={phoneReturnDivertToAssignedUser}
                      onChange={(e) => setPhoneReturnDivertToAssignedUser(e.target.checked)}
                      disabled={phoneReturnOption !== 'default'}
                    />
                    <Form.Check
                      type="checkbox"
                      id="phone-return-pass-through"
                      label="Pass Through"
                      disabled
                      className="mt-1"
                    />
                  </div>
                  <Form.Check
                    type="radio"
                    id="phone-return-ordered"
                    name="phoneReturnOption"
                    label="Ordered"
                    checked={phoneReturnOption === 'ordered'}
                    onChange={() => setPhoneReturnOption('ordered')}
                  />
                  <Form.Check
                    type="radio"
                    id="phone-return-simultaneous"
                    name="phoneReturnOption"
                    label="Simultaneous"
                    checked={phoneReturnOption === 'simultaneous'}
                    onChange={() => setPhoneReturnOption('simultaneous')}
                  />
                </div>

                <p className="text-muted mb-3" style={{ fontSize: '0.875rem' }}>
                  When you receive phone calls to your {accountName} number, this is the number the calls will be forwarded to.
                </p>

                <Row className="g-3">
                  <Col xs={12}>
                    <div className="d-flex align-items-center gap-3">
                      <span style={{ minWidth: '100px' }}>Business Hours:</span>
                      <Form.Control
                        type="tel"
                        value={businessHoursPhone}
                        onChange={(e) => handlePhoneInput(e, setBusinessHoursPhone)}
                        placeholder="(XXX) XXX-XXXX"
                        style={{ maxWidth: '180px' }}
                      />
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="d-flex align-items-center gap-3">
                      <span style={{ minWidth: '100px' }}>After Hours:</span>
                      <Form.Control
                        type="tel"
                        value={afterHoursPhone}
                        onChange={(e) => handlePhoneInput(e, setAfterHoursPhone)}
                        placeholder="(XXX) XXX-XXXX"
                        style={{ maxWidth: '180px' }}
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm h-100">
              <Card.Header style={CARD_HEADER_STYLE}>
                {accountName} Account Text Settings
              </Card.Header>
              <Card.Body className="p-4">
                <p className="mb-3" style={{ fontSize: '0.875rem' }}>
                  Enter the phone number where all Text Notifications will be sent if Account Owner settings includes Text AU and Contact does not have an Assigned User (AU).
                </p>

                <Form.Control
                  type="tel"
                  value={textNotificationPhone}
                  onChange={(e) => handlePhoneInput(e, setTextNotificationPhone)}
                  placeholder="(XXX) XXX-XXXX"
                  className="mb-4"
                  style={{ maxWidth: '180px' }}
                />

                <div className="d-flex flex-column gap-2">
                  <Form.Check
                    type="checkbox"
                    id="send-owner-text-operation"
                    label="Send Account Owner Text msgs during Operation Hours only."
                    checked={sendOwnerTextOperationHoursOnly}
                    onChange={(e) => setSendOwnerTextOperationHoursOnly(e.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="send-delayed-texts"
                    label="Send 'Delayed' Action Plan Texts during Business Hours Only."
                    checked={sendDelayedActionPlanTextsBusinessHours}
                    onChange={(e) => setSendDelayedActionPlanTextsBusinessHours(e.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="end-connection-plan"
                    label="End Connection Plan on Return Text."
                    checked={endConnectionPlanOnReturnText}
                    onChange={(e) => setEndConnectionPlanOnReturnText(e.target.checked)}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </BodyPageLayout>
  );
};
