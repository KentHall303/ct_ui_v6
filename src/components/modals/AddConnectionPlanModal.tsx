import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { Button } from '../bootstrap/Button';
import { FloatingInput, FloatingSelect, FloatingSelectOption } from '../bootstrap/FormControls';
import { ChipCheck } from '../bootstrap/ChipCheck';
import { Plus, RefreshCw, Mail, MessageSquare, Phone, CheckSquare, Tag, UserPlus, PhoneCall, Users, Bell, Zap, Sheet, Send, FileText, X, Webhook, ThumbsUp, MessageCircle, HelpCircle, Trash2, Info, Landmark, LibraryBig } from 'lucide-react';
import { ConnectionPlan, ConnectionPlanWithActions, ConnectionPlanAction, EmailTemplate } from '../../lib/supabase';
import { connectionPlanService } from '../../services/connectionPlanService';
import { emailTemplateService } from '../../services/emailTemplateService';
import { ActionFieldRenderer } from '../actions/ActionFieldRenderer';
import { getActionTypeFields, validateActionConfig, ACTION_TYPE_FIELDS } from '../../data/actionTypeFields';

const getActionTypeIcon = (actionType: string) => {
  const iconMap: Record<string, any> = {
    'Assign User': UserPlus,
    'Automated Call': PhoneCall,
    'Change Contact Type': Users,
    'Contact Reminder': Bell,
    'Dispatch.me Integration': Zap,
    'Email': Mail,
    'Google Sheet': Sheet,
    'Mailbox Power': Send,
    'Proposal Invoice Status': FileText,
    'Remove Seasonal/Event Actions': X,
    'Remove Parallel Trigger\'s Actions': X,
    'SMS': MessageSquare,
    'Sendjim': MessageCircle,
    'Task': CheckSquare,
    'Tag': Tag,
    'ThumbTack Integration': ThumbsUp,
    'Sales Chatz Integration': MessageCircle,
    'Webhook': Webhook,
  };
  return iconMap[actionType] || HelpCircle;
};

interface AddConnectionPlanModalProps {
  show: boolean;
  onHide: () => void;
  plan?: ConnectionPlan | null;
  onSave?: () => void;
}

export const AddConnectionPlanModal: React.FC<AddConnectionPlanModalProps> = ({
  show,
  onHide,
  plan = null,
  onSave
}) => {
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [showOnlyHere, setShowOnlyHere] = useState(false);
  const [buildPendingMethod, setBuildPendingMethod] = useState<'traditional' | 'domino'>('traditional');
  const [contactTypes, setContactTypes] = useState<string[]>(['All']);
  const [isContactTypeOpen, setIsContactTypeOpen] = useState(false);
  const contactTypeDropdownRef = useRef<HTMLDivElement>(null);
  const [nextPlan, setNextPlan] = useState('');
  const [leadSources, setLeadSources] = useState<string[]>([]);
  const [isLeadSourceOpen, setIsLeadSourceOpen] = useState(false);
  const leadSourceDropdownRef = useRef<HTMLDivElement>(null);
  const [specificDate, setSpecificDate] = useState('');
  const [protectFromOverwriting, setProtectFromOverwriting] = useState(false);
  const [actions, setActions] = useState<Partial<ConnectionPlanAction>[]>([]);
  const [selectedActionIndex, setSelectedActionIndex] = useState<number | null>(null);
  const [actionType, setActionType] = useState('');
  const [actionName, setActionName] = useState('');
  const [addNotifications, setAddNotifications] = useState(false);
  const [deliveryType, setDeliveryType] = useState('Immediate');
  const [deliveryValue, setDeliveryValue] = useState<number>(1);
  const [deliveryUnit, setDeliveryUnit] = useState('Minutes');
  const [actionConfig, setActionConfig] = useState<Record<string, any>>({});
  const [actionConfigErrors, setActionConfigErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availablePlans, setAvailablePlans] = useState<ConnectionPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [basicInfoSaved, setBasicInfoSaved] = useState(false);
  const [savedPlanId, setSavedPlanId] = useState<string | null>(null);

  const isEditMode = !!plan;

  useEffect(() => {
    if (show) {
      loadAvailablePlans();
      loadEmailTemplates();
      if (plan) {
        setName(plan.name || '');
        setIsActive(plan.is_active);
        setShowOnlyHere(plan.show_only_here || false);
        setBuildPendingMethod(plan.build_pending_domino ? 'domino' : 'traditional');
        setContactTypes(plan.contact_types ? plan.contact_types.split(',').map(t => t.trim()) : ['All']);
        setNextPlan(plan.next_plan || '');
        setLeadSources(plan.lead_sources ? plan.lead_sources.split(',').map(s => s.trim()).filter(s => s) : []);
        setSpecificDate(plan.specific_date ? plan.specific_date.slice(0, 16) : '');
        setProtectFromOverwriting(plan.protect_from_overwriting || false);
        setBasicInfoSaved(true);
        setSavedPlanId(plan.id);
        loadPlanActions(plan.id);
      } else {
        resetForm();
      }
    }
  }, [show, plan]);

  const loadAvailablePlans = async () => {
    try {
      setLoadingPlans(true);
      const allPlans = await connectionPlanService.getAll();
      const filteredPlans = plan ? allPlans.filter(p => p.id !== plan.id) : allPlans;
      const sortedPlans = filteredPlans.sort((a, b) => a.name.localeCompare(b.name));
      setAvailablePlans(sortedPlans);
    } catch (err) {
      console.error('Error loading available plans:', err);
    } finally {
      setLoadingPlans(false);
    }
  };

  const loadEmailTemplates = async () => {
    try {
      const templates = await emailTemplateService.getAll();
      setEmailTemplates(templates);

      if (ACTION_TYPE_FIELDS['Email'] && ACTION_TYPE_FIELDS['Email'].fields) {
        const templateField = ACTION_TYPE_FIELDS['Email'].fields.find(f => f.name === 'template');
        if (templateField) {
          templateField.options = templates.map(t => ({
            value: t.id,
            label: t.name
          }));
        }
      }
    } catch (err) {
      console.error('Error loading email templates:', err);
    }
  };

  const loadPlanActions = async (planId: string) => {
    try {
      const planWithActions = await connectionPlanService.getById(planId);
      if (planWithActions && planWithActions.actions) {
        setActions(planWithActions.actions);
      }
    } catch (err) {
      console.error('Error loading plan actions:', err);
    }
  };

  const resetForm = () => {
    setName('');
    setIsActive(true);
    setShowOnlyHere(false);
    setBuildPendingMethod('traditional');
    setContactTypes(['All']);
    setNextPlan('');
    setLeadSources([]);
    setSpecificDate('');
    setProtectFromOverwriting(false);
    setActions([]);
    setSelectedActionIndex(null);
    setActionType('');
    setActionName('');
    setAddNotifications(false);
    setDeliveryType('Immediate');
    setDeliveryValue(1);
    setDeliveryUnit('Minutes');
    setActionConfig({});
    setActionConfigErrors({});
    setBasicInfoSaved(false);
    setSavedPlanId(null);
  };

  const handleSaveBasicInfo = async () => {
    try {
      setError(null);
      setSaving(true);

      if (!name.trim()) {
        setError('Action plan name is required');
        return;
      }

      const planData: Partial<ConnectionPlan> = {
        name: name.trim(),
        is_active: isActive,
        show_only_here: showOnlyHere,
        build_pending_traditional: buildPendingMethod === 'traditional',
        build_pending_domino: buildPendingMethod === 'domino',
        contact_types: contactTypes.join(', '),
        next_plan: nextPlan.trim() || undefined,
        lead_sources: leadSources.join(', ') || undefined,
        specific_date: specificDate.trim() ? `${specificDate.trim()}:00` : undefined,
        protect_from_overwriting: protectFromOverwriting,
      };

      let savedPlan: ConnectionPlan;

      if (savedPlanId) {
        savedPlan = await connectionPlanService.update(savedPlanId, planData);
      } else {
        savedPlan = await connectionPlanService.create(planData);
      }

      setSavedPlanId(savedPlan.id);
      setBasicInfoSaved(true);
      setError(null);
    } catch (err) {
      console.error('Error saving basic info:', err);
      setError(err instanceof Error ? err.message : 'Failed to save connection plan');
    } finally {
      setSaving(false);
    }
  };

  const handleFinalSave = async () => {
    try {
      setError(null);
      setSaving(true);

      if (!savedPlanId) {
        setError('Please save basic information first');
        return;
      }

      if (actions.length === 0) {
        setError('At least one action step is required');
        return;
      }

      await connectionPlanService.deleteAllActions(savedPlanId);

      if (actions.length > 0) {
        const actionsToSave = actions.map((action, index) => ({
          connection_plan_id: savedPlanId,
          step_number: action.step_number || index + 1,
          action_name: action.action_name || '',
          action_type: action.action_type,
          delivery_timing: action.delivery_timing,
          delivery_type: action.delivery_type || 'Immediate',
          add_notifications: action.add_notifications || false,
          action_config: action.action_config || {},
          display_order: index,
        }));
        await connectionPlanService.createActions(actionsToSave);
      }

      if (onSave) {
        onSave();
      }

      onHide();
    } catch (err) {
      console.error('Error saving connection plan:', err);
      setError(err instanceof Error ? err.message : 'Failed to save connection plan');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (isEditMode) {
      try {
        setError(null);
        setSaving(true);

        if (!name.trim()) {
          setError('Connection plan name is required');
          return;
        }

        if (actions.length === 0) {
          setError('At least one action step is required');
          return;
        }

        const planData: Partial<ConnectionPlan> = {
          name: name.trim(),
          is_active: isActive,
          show_only_here: showOnlyHere,
          build_pending_traditional: buildPendingMethod === 'traditional',
          build_pending_domino: buildPendingMethod === 'domino',
          contact_types: contactTypes.join(', '),
          next_plan: nextPlan.trim() || undefined,
          lead_sources: leadSources.join(', ') || undefined,
          specific_date: specificDate.trim() ? `${specificDate.trim()}:00` : undefined,
          protect_from_overwriting: protectFromOverwriting,
        };

        const savedPlan = await connectionPlanService.update(plan!.id, planData);
        await connectionPlanService.deleteAllActions(plan!.id);

        if (actions.length > 0) {
          const actionsToSave = actions.map((action, index) => ({
            connection_plan_id: savedPlan.id,
            step_number: action.step_number || index + 1,
            action_name: action.action_name || '',
            action_type: action.action_type,
            delivery_timing: action.delivery_timing,
            delivery_type: action.delivery_type || 'Immediate',
            add_notifications: action.add_notifications || false,
            action_config: action.action_config || {},
            display_order: index,
          }));
          await connectionPlanService.createActions(actionsToSave);
        }

        if (onSave) {
          onSave();
        }

        onHide();
      } catch (err) {
        console.error('Error saving connection plan:', err);
        setError(err instanceof Error ? err.message : 'Failed to save connection plan');
      } finally {
        setSaving(false);
      }
    } else {
      if (!basicInfoSaved) {
        await handleSaveBasicInfo();
      } else {
        await handleFinalSave();
      }
    }
  };

  const toggleContactTypeDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsContactTypeOpen(!isContactTypeOpen);
  };

  const handleContactTypeToggle = (type: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContactTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const removeContactType = (type: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContactTypes(prev => prev.filter(t => t !== type));
  };

  const toggleLeadSourceDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLeadSourceOpen(!isLeadSourceOpen);
  };

  const handleLeadSourceToggle = (source: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLeadSources(prev =>
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const removeLeadSource = (source: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLeadSources(prev => prev.filter(s => s !== source));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contactTypeDropdownRef.current && !contactTypeDropdownRef.current.contains(event.target as Node) && isContactTypeOpen) {
        setIsContactTypeOpen(false);
      }
      if (leadSourceDropdownRef.current && !leadSourceDropdownRef.current.contains(event.target as Node) && isLeadSourceOpen) {
        setIsLeadSourceOpen(false);
      }
    };

    if (isContactTypeOpen || isLeadSourceOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isContactTypeOpen, isLeadSourceOpen]);

  const handleAddNewAction = () => {
    const newAction: Partial<ConnectionPlanAction> = {
      step_number: actions.length + 1,
      action_name: 'New Action',
      action_type: '',
      delivery_timing: 'Immediate',
      delivery_type: 'Immediate',
      add_notifications: false,
      display_order: actions.length,
    };
    setActions([...actions, newAction]);
    setSelectedActionIndex(actions.length);
  };

  const handleSaveAction = async () => {
    if (selectedActionIndex !== null && actionName.trim() && actionType) {
      const validation = validateActionConfig(actionType, actionConfig);

      if (!validation.isValid) {
        setActionConfigErrors(validation.errors);
        return;
      }

      if (actionType === 'Email' && actionConfig.saveAsTemplate && actionConfig.subject && actionConfig.body) {
        try {
          await emailTemplateService.create({
            name: actionName.trim(),
            subject: actionConfig.subject,
            content: actionConfig.body,
            contact_type: 'All',
            exclude_client: false,
            bcc_email: actionConfig.bccEmail || undefined,
            additional_emails: actionConfig.additionalEmails || undefined,
            select_token: actionConfig.selectToken || undefined,
          });

          await loadEmailTemplates();
        } catch (err) {
          console.error('Error saving email template:', err);
        }
      }

      let deliveryTiming = 'Immediate';
      if (deliveryType === 'Before') {
        deliveryTiming = `Before ${deliveryValue} ${deliveryUnit}`;
      } else if (deliveryType === 'Delayed') {
        deliveryTiming = `Delayed ${deliveryValue} ${deliveryUnit}`;
      }

      const updatedActions = [...actions];
      updatedActions[selectedActionIndex] = {
        ...updatedActions[selectedActionIndex],
        action_name: actionName.trim(),
        action_type: actionType,
        delivery_type: deliveryType,
        delivery_timing: deliveryTiming,
        add_notifications: addNotifications,
        action_config: {
          ...actionConfig,
          deliveryValue: deliveryType !== 'Immediate' ? deliveryValue : undefined,
          deliveryUnit: deliveryType !== 'Immediate' ? deliveryUnit : undefined,
        },
      };
      setActions(updatedActions);
      setActionName('');
      setActionType('');
      setAddNotifications(false);
      setDeliveryType('Immediate');
      setDeliveryValue(1);
      setDeliveryUnit('Minutes');
      setActionConfig({});
      setActionConfigErrors({});
      setSelectedActionIndex(null);
    }
  };

  const handleDeleteAction = () => {
    if (selectedActionIndex !== null) {
      const updatedActions = actions.filter((_, index) => index !== selectedActionIndex);
      updatedActions.forEach((action, index) => {
        action.step_number = index + 1;
      });
      setActions(updatedActions);
      setActionName('');
      setActionType('');
      setAddNotifications(false);
      setDeliveryType('Immediate');
      setDeliveryValue(1);
      setDeliveryUnit('Minutes');
      setActionConfig({});
      setActionConfigErrors({});
      setSelectedActionIndex(null);
    }
  };

  const handleSelectAction = (index: number) => {
    setSelectedActionIndex(index);
    const action = actions[index];
    setActionName(action.action_name || '');
    setActionType(action.action_type || '');
    setAddNotifications(action.add_notifications || false);
    setDeliveryType(action.delivery_type || 'Immediate');

    const config = action.action_config || {};
    setActionConfig(config);

    if (config.deliveryValue) {
      setDeliveryValue(config.deliveryValue);
    } else {
      setDeliveryValue(1);
    }

    if (config.deliveryUnit) {
      setDeliveryUnit(config.deliveryUnit);
    } else {
      setDeliveryUnit('Minutes');
    }

    setActionConfigErrors({});
  };

  const handleActionTypeChange = (newActionType: string) => {
    if (newActionType !== actionType) {
      setActionType(newActionType);
      setActionConfig({});
      setActionConfigErrors({});
    }
  };

  useEffect(() => {
    if (actionType === 'Email' && actionConfig.template) {
      const selectedTemplate = emailTemplates.find(t => t.id === actionConfig.template);
      if (selectedTemplate) {
        setActionConfig(prev => ({
          ...prev,
          subject: selectedTemplate.subject || prev.subject,
          body: selectedTemplate.content || prev.body,
          bccEmail: selectedTemplate.bcc_email || prev.bccEmail,
          additionalEmails: selectedTemplate.additional_emails || prev.additionalEmails,
          selectToken: selectedTemplate.select_token || prev.selectToken,
        }));
      }
    }
  }, [actionConfig.template, actionType, emailTemplates]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      backdrop="static"
      style={{ maxWidth: '100vw' }}
    >
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title style={{ fontSize: '1.5rem', fontWeight: 400 }}>
          {isEditMode ? 'Edit Connection Plan' : 'Add Connection Plan'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3 pb-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="d-flex flex-column gap-3">
          {error && (
            <div className="alert alert-danger mb-0" role="alert">
              {error}
            </div>
          )}

          <div className="row align-items-center">
            <div className="col-md-3">
              <FloatingInput
                label="Action plan Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter plan name..."
              />
            </div>
            <div className="col-md-3 d-flex align-items-center">
              <Form.Check
                type="switch"
                id="active-switch"
                label="Active"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </div>
            <div className="col-md-6 d-flex align-items-center gap-2">
              <span className="text-secondary" style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                Build Pending Action:
              </span>
              <ChipCheck
                label="Traditional"
                isActive={buildPendingMethod === 'traditional'}
                onClick={() => setBuildPendingMethod('traditional')}
                icon={Landmark}
                iconColor="#198754"
              />
              <ChipCheck
                label="Domino"
                isActive={buildPendingMethod === 'domino'}
                onClick={() => setBuildPendingMethod('domino')}
                icon={LibraryBig}
                iconColor="#0dcaf0"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="position-relative" ref={contactTypeDropdownRef}>
                <div className="form-floating-compact">
                  <div
                    className="form-control d-flex flex-wrap gap-1 align-items-center position-relative"
                    style={{ minHeight: '38px', cursor: 'pointer', paddingRight: '2rem' }}
                    onClick={toggleContactTypeDropdown}
                  >
                    {contactTypes.map(type => (
                      <span key={type} className="badge bg-primary d-flex align-items-center gap-1">
                        {type}
                        <button
                          type="button"
                          className="btn-close btn-close-white"
                          style={{ fontSize: '0.6em' }}
                          onClick={(e) => removeContactType(type, e)}
                        ></button>
                      </span>
                    ))}
                    {contactTypes.length === 0 && (
                      <span className="text-muted">Select types</span>
                    )}
                    <svg
                      className="position-absolute end-0 me-2"
                      style={{
                        transform: isContactTypeOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        top: '50%',
                        marginTop: '-8px'
                      }}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </div>
                  <label>Contact Types:</label>
                </div>
                {isContactTypeOpen && (
                  <div className="position-absolute w-100 bg-white border rounded mt-1 shadow-sm" style={{ zIndex: 1050, maxHeight: '200px', overflowY: 'auto' }}>
                    <div className="p-1">
                      {['All', 'Client', 'Vendor', 'Employee', 'Partner'].map(type => (
                        <div
                          key={type}
                          className="dropdown-item small py-1"
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => handleContactTypeToggle(type, e)}
                        >
                          {type} {contactTypes.includes(type) && '✓'}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <FloatingSelect
                label="Next plan:"
                value={nextPlan}
                onChange={(e) => setNextPlan(e.target.value)}
                disabled={loadingPlans}
              >
                <FloatingSelectOption value="">
                  {loadingPlans ? 'Loading plans...' : 'Select Action Plan'}
                </FloatingSelectOption>
                {availablePlans.length > 0 && (
                  <optgroup label="Connection Plans">
                    {availablePlans.map((p) => (
                      <FloatingSelectOption key={p.id} value={p.name}>
                        {p.name}
                      </FloatingSelectOption>
                    ))}
                  </optgroup>
                )}
              </FloatingSelect>
            </div>
            <div className="col-md-3">
              <div className="position-relative" ref={leadSourceDropdownRef}>
                <div className="form-floating-compact">
                  <div
                    className="form-control d-flex flex-wrap gap-1 align-items-center position-relative"
                    style={{ minHeight: '38px', cursor: 'pointer', paddingRight: '2rem' }}
                    onClick={toggleLeadSourceDropdown}
                  >
                    {leadSources.map(source => (
                      <span key={source} className="badge bg-primary d-flex align-items-center gap-1">
                        {source}
                        <button
                          type="button"
                          className="btn-close btn-close-white"
                          style={{ fontSize: '0.6em' }}
                          onClick={(e) => removeLeadSource(source, e)}
                        ></button>
                      </span>
                    ))}
                    {leadSources.length === 0 && (
                      <span className="text-muted">Select sources</span>
                    )}
                    <svg
                      className="position-absolute end-0 me-2"
                      style={{
                        transform: isLeadSourceOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        top: '50%',
                        marginTop: '-8px'
                      }}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </div>
                  <label>Lead Sources:</label>
                </div>
                {isLeadSourceOpen && (
                  <div className="position-absolute w-100 bg-white border rounded mt-1 shadow-sm" style={{ zIndex: 1050, maxHeight: '200px', overflowY: 'auto' }}>
                    <div className="p-1">
                      {['Not Attached', 'Facebook', 'Facebook 2', 'Porch', 'Import', 'CT NEERAJ'].map(source => (
                        <div
                          key={source}
                          className="dropdown-item small py-1"
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => handleLeadSourceToggle(source, e)}
                        >
                          {source} {leadSources.includes(source) && '✓'}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <FloatingInput
                label="Specific Date:"
                type="datetime-local"
                value={specificDate}
                onChange={(e) => setSpecificDate(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-md-9 d-flex align-items-center gap-3">
              <Form.Check
                type="checkbox"
                id="show-only-here"
                label="Show only here"
                checked={showOnlyHere}
                onChange={(e) => setShowOnlyHere(e.target.checked)}
                style={{ whiteSpace: 'nowrap' }}
              />
              <Form.Check
                type="checkbox"
                id="protect-overwriting"
                label="Protect from Overwriting"
                checked={protectFromOverwriting}
                onChange={(e) => setProtectFromOverwriting(e.target.checked)}
                style={{ whiteSpace: 'nowrap' }}
              />
            </div>
            <div className="col-md-3 d-flex justify-content-end">
              {!isEditMode && !basicInfoSaved ? (
                <Button
                  variant="success"
                  onClick={handleSaveBasicInfo}
                  disabled={saving || !name.trim()}
                  style={{
                    backgroundColor: '#28a745',
                    border: 'none',
                    padding: '8px 24px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    opacity: (saving || !name.trim()) ? 0.6 : 1
                  }}
                >
                  {saving ? 'SAVING...' : 'SAVE & CONTINUE'}
                </Button>
              ) : !isEditMode && basicInfoSaved ? (
                <Button
                  variant="success"
                  onClick={handleFinalSave}
                  disabled={saving || actions.length === 0}
                  style={{
                    backgroundColor: '#28a745',
                    border: 'none',
                    padding: '8px 24px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    opacity: (saving || actions.length === 0) ? 0.6 : 1
                  }}
                >
                  {saving ? 'SAVING...' : 'SAVE CONNECTION PLAN'}
                </Button>
              ) : isEditMode ? (
                <Button
                  variant="success"
                  onClick={handleSave}
                  disabled={saving || actions.length === 0 || !name.trim()}
                  style={{
                    backgroundColor: '#28a745',
                    border: 'none',
                    padding: '8px 24px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    opacity: (saving || actions.length === 0 || !name.trim()) ? 0.6 : 1
                  }}
                >
                  {saving ? 'SAVING...' : 'SAVE'}
                </Button>
              ) : null}
            </div>
          </div>

          {!isEditMode && basicInfoSaved && (
            <div className="alert alert-success mb-0" role="alert">
              <strong>Basic information saved!</strong> You can now add action steps to your connection plan.
            </div>
          )}

          {(isEditMode || basicInfoSaved) && (
            <>
              <hr className="my-1" style={{ borderTop: '1px solid #dee2e6' }} />

              <div className="row">
            <div className="col-md-3">
              <div className="bg-light p-3 rounded" style={{ minHeight: '400px', maxHeight: '400px', overflowY: 'auto', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div className="d-flex justify-content-center mb-3">
                  <Button
                    variant="success"
                    className="rounded-pill d-flex align-items-center gap-1"
                    onClick={handleAddNewAction}
                    disabled={actions.some(action => !action.action_type)}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.375rem 0.75rem',
                      lineHeight: '1.3',
                      minHeight: '28px',
                      fontWeight: 500,
                      opacity: actions.some(action => !action.action_type) ? 0.6 : 1
                    }}
                  >
                    <Plus size={14} />
                    <span>Add Action Step</span>
                  </Button>
                </div>
                <div className="d-flex flex-column gap-3">
                  {actions.length === 0 ? (
                    <div className="text-center text-muted py-5" style={{ fontSize: '0.875rem' }}>
                      Currently there are no Action Steps defined for this plan
                    </div>
                  ) : (
                    actions.map((action, index) => {
                      const IconComponent = getActionTypeIcon(action.action_type || '');
                      return (
                        <div
                          key={index}
                          className={`p-2 bg-white rounded border cursor-pointer ${selectedActionIndex === index ? 'border-primary' : ''}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleSelectAction(index)}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                              <div className="small text-muted">Step {action.step_number}</div>
                              <div className="fw-medium" style={{ fontSize: '0.875rem', color: '#17a2b8' }}>
                                {action.action_name}
                              </div>
                              <div className="small text-muted">{action.delivery_timing || 'Immediate'}</div>
                            </div>
                            <div>
                              <IconComponent size={20} className="text-secondary" />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="border rounded p-3" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <FloatingSelect
                      label="Action Type"
                      value={actionType}
                      onChange={(e) => handleActionTypeChange(e.target.value)}
                    >
                      <FloatingSelectOption value="">Select Action Type</FloatingSelectOption>
                      <FloatingSelectOption value="Add To Campaign">Add To Campaign</FloatingSelectOption>
                      <FloatingSelectOption value="Add To Pipeline">Add To Pipeline</FloatingSelectOption>
                      <FloatingSelectOption value="Appointment">Appointment</FloatingSelectOption>
                      <FloatingSelectOption value="Change Stage">Change Stage</FloatingSelectOption>
                      <FloatingSelectOption value="Drip Sequence">Drip Sequence</FloatingSelectOption>
                      <FloatingSelectOption value="Email">Email</FloatingSelectOption>
                      <FloatingSelectOption value="Google Sheet">Google Sheet</FloatingSelectOption>
                      <FloatingSelectOption value="Mailbox Power">Mailbox Power</FloatingSelectOption>
                      <FloatingSelectOption value="Proposal Invoice Status">Proposal Invoice Status</FloatingSelectOption>
                      <FloatingSelectOption value="Remove Parallel Trigger's Actions">Remove Parallel Trigger's Actions</FloatingSelectOption>
                      <FloatingSelectOption value="Remove Seasonal/Event Actions">Remove Seasonal/Event Actions</FloatingSelectOption>
                      <FloatingSelectOption value="SMS">SMS</FloatingSelectOption>
                      <FloatingSelectOption value="Sendjim">Sendjim</FloatingSelectOption>
                      <FloatingSelectOption value="Task">Task</FloatingSelectOption>
                      <FloatingSelectOption value="Tag">Tag</FloatingSelectOption>
                      <FloatingSelectOption value="ThumbTack Integration">ThumbTack Integration</FloatingSelectOption>
                      <FloatingSelectOption value="Sales Chatz Integration">Sales Chatz Integration</FloatingSelectOption>
                      <FloatingSelectOption value="Webhook">Webhook</FloatingSelectOption>
                    </FloatingSelect>
                  </div>
                  <div className="col-md-6">
                    <FloatingInput
                      label="Action Name"
                      type="text"
                      value={actionName}
                      onChange={(e) => setActionName(e.target.value)}
                      placeholder="Enter action name"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="add-notifications"
                    label="Add Notifications"
                    checked={addNotifications}
                    onChange={(e) => setAddNotifications(e.target.checked)}
                  />
                </div>
                <div className="mb-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <label className="form-label small mb-0">Delivery</label>
                    <Info size={16} className="text-muted" />
                  </div>
                  <div className="d-flex gap-3 align-items-center flex-wrap">
                    <Form.Check
                      type="radio"
                      id="delivery-immediate"
                      label="Immediate"
                      checked={deliveryType === 'Immediate'}
                      onChange={() => setDeliveryType('Immediate')}
                    />
                    <Form.Check
                      type="radio"
                      id="delivery-before"
                      label="Before"
                      checked={deliveryType === 'Before'}
                      onChange={() => setDeliveryType('Before')}
                    />
                    <Form.Check
                      type="radio"
                      id="delivery-delayed"
                      label="Delayed"
                      checked={deliveryType === 'Delayed'}
                      onChange={() => setDeliveryType('Delayed')}
                    />
                    {(deliveryType === 'Before' || deliveryType === 'Delayed') && (
                      <>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          style={{ width: '120px' }}
                          value={deliveryValue}
                          onChange={(e) => setDeliveryValue(Number(e.target.value))}
                          min="1"
                          placeholder={deliveryType}
                        />
                        <select
                          className="form-select form-select-sm"
                          style={{ width: '120px' }}
                          value={deliveryUnit}
                          onChange={(e) => setDeliveryUnit(e.target.value)}
                        >
                          <option value="Minutes">Minutes</option>
                          <option value="Hours">Hours</option>
                          <option value="Days">Days</option>
                          <option value="Weeks">Weeks</option>
                          <option value="Months">Months</option>
                          <option value="Years">Years</option>
                        </select>
                      </>
                    )}
                  </div>
                </div>

                {actionType && (
                  <div className="border-top pt-3 mt-3">
                    <h6 className="mb-3 text-secondary">Action Configuration</h6>
                    {getActionTypeFields(actionType).map((field) => (
                      <ActionFieldRenderer
                        key={field.name}
                        field={field}
                        value={actionConfig[field.name]}
                        onChange={(value) => {
                          setActionConfig({ ...actionConfig, [field.name]: value });
                          if (actionConfigErrors[field.name]) {
                            const newErrors = { ...actionConfigErrors };
                            delete newErrors[field.name];
                            setActionConfigErrors(newErrors);
                          }
                        }}
                        error={actionConfigErrors[field.name]}
                        formValues={actionConfig}
                      />
                    ))}
                  </div>
                )}
                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-link p-2"
                    title="Refresh"
                    onClick={() => {
                      setActionName('');
                      setActionType('');
                      setAddNotifications(false);
                      setDeliveryType('Immediate');
                      setDeliveryValue(1);
                      setDeliveryUnit('Minutes');
                      setActionConfig({});
                      setActionConfigErrors({});
                    }}
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button
                    className="btn btn-link p-2 text-danger"
                    title="Delete Action"
                    onClick={handleDeleteAction}
                    disabled={selectedActionIndex === null}
                    style={{ opacity: selectedActionIndex === null ? 0.5 : 1 }}
                  >
                    <Trash2 size={18} />
                  </button>
                  <Button
                    variant="success"
                    onClick={handleSaveAction}
                    disabled={!actionName.trim()}
                    style={{ fontSize: '0.9375rem' }}
                  >
                    Save Action
                  </Button>
                </div>
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};
