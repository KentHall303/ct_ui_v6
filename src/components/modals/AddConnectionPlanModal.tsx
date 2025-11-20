import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { Button } from '../bootstrap/Button';
import { FloatingInput, FloatingSelect, FloatingSelectOption } from '../bootstrap/FormControls';
import { ChipCheck } from '../bootstrap/ChipCheck';
import { Plus, RefreshCw } from 'lucide-react';
import { ConnectionPlan, ConnectionPlanWithActions, ConnectionPlanAction } from '../../lib/supabase';
import { connectionPlanService } from '../../services/connectionPlanService';

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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availablePlans, setAvailablePlans] = useState<ConnectionPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);

  const isEditMode = !!plan;

  useEffect(() => {
    if (show) {
      loadAvailablePlans();
      if (plan) {
        setName(plan.name || '');
        setIsActive(plan.is_active);
        setShowOnlyHere(plan.show_only_here || false);
        setBuildPendingMethod(plan.build_pending_domino ? 'domino' : 'traditional');
        setContactTypes(plan.contact_types ? plan.contact_types.split(',').map(t => t.trim()) : ['All']);
        setNextPlan(plan.next_plan || '');
        setLeadSources(plan.lead_sources ? plan.lead_sources.split(',').map(s => s.trim()).filter(s => s) : []);
        setSpecificDate(plan.specific_date || '');
        setProtectFromOverwriting(plan.protect_from_overwriting || false);
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
  };

  const handleSave = async () => {
    try {
      setError(null);
      setSaving(true);

      if (!name.trim()) {
        setError('Connection plan name is required');
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
        specific_date: specificDate.trim() || undefined,
        protect_from_overwriting: protectFromOverwriting,
      };

      let savedPlan: ConnectionPlan;

      if (isEditMode && plan) {
        savedPlan = await connectionPlanService.update(plan.id, planData);
        await connectionPlanService.deleteAllActions(plan.id);
      } else {
        savedPlan = await connectionPlanService.create(planData);
      }

      if (actions.length > 0) {
        const actionsToSave = actions.map((action, index) => ({
          connection_plan_id: savedPlan.id,
          step_number: action.step_number || index + 1,
          action_name: action.action_name || '',
          action_type: action.action_type,
          delivery_timing: action.delivery_timing,
          delivery_type: action.delivery_type || 'Immediate',
          add_notifications: action.add_notifications || false,
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

  const handleSaveAction = () => {
    if (selectedActionIndex !== null && actionName.trim()) {
      const updatedActions = [...actions];
      updatedActions[selectedActionIndex] = {
        ...updatedActions[selectedActionIndex],
        action_name: actionName.trim(),
        action_type: actionType,
        delivery_type: deliveryType,
        add_notifications: addNotifications,
      };
      setActions(updatedActions);
      setActionName('');
      setActionType('');
      setAddNotifications(false);
      setDeliveryType('Immediate');
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
  };

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
            <div className="col-md-4">
              <FloatingInput
                label="Action plan Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter plan name..."
              />
            </div>
            <div className="col-md-8 d-flex align-items-center gap-3">
              <Form.Check
                type="switch"
                id="active-switch"
                label="Active"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                style={{ fontSize: '0.9375rem' }}
              />
              <Form.Check
                type="checkbox"
                id="show-only-here"
                label="Show only here"
                checked={showOnlyHere}
                onChange={(e) => setShowOnlyHere(e.target.checked)}
                style={{ fontSize: '0.9375rem' }}
              />
              <div className="d-flex align-items-center gap-2">
                <span className="text-secondary" style={{ fontSize: '0.9375rem', fontWeight: 500 }}>
                  Build Pending Action:
                </span>
                <ChipCheck
                  label="Traditional"
                  isActive={buildPendingMethod === 'traditional'}
                  onClick={() => setBuildPendingMethod('traditional')}
                />
                <ChipCheck
                  label="Domino Effect"
                  isActive={buildPendingMethod === 'domino'}
                  onClick={() => setBuildPendingMethod('domino')}
                />
              </div>
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
                type="text"
                value={specificDate}
                onChange={(e) => setSpecificDate(e.target.value)}
                placeholder=""
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="bg-light p-3 rounded" style={{ minHeight: '400px', maxHeight: '400px', overflowY: 'auto' }}>
                <button
                  className="btn btn-success rounded-circle d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '36px', height: '36px' }}
                  onClick={handleAddNewAction}
                >
                  <Plus size={18} />
                </button>
                <div className="d-flex flex-column gap-2">
                  {actions.map((action, index) => (
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
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="border rounded p-3">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <FloatingSelect
                      label="Action Type"
                      value={actionType}
                      onChange={(e) => setActionType(e.target.value)}
                    >
                      <FloatingSelectOption value="">Select Action Type</FloatingSelectOption>
                      <FloatingSelectOption value="message">Message</FloatingSelectOption>
                      <FloatingSelectOption value="email">Email</FloatingSelectOption>
                      <FloatingSelectOption value="call">Call</FloatingSelectOption>
                      <FloatingSelectOption value="task">Task</FloatingSelectOption>
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
                  <label className="form-label small">Delivery</label>
                  <div className="d-flex gap-3">
                    <Form.Check
                      type="radio"
                      id="delivery-immediate"
                      label="Immediate"
                      checked={deliveryType === 'Immediate'}
                      onChange={() => setDeliveryType('Immediate')}
                    />
                    <Form.Check
                      type="radio"
                      id="delivery-delayed"
                      label="Delayed"
                      checked={deliveryType === 'Delayed'}
                      onChange={() => setDeliveryType('Delayed')}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-link p-2"
                    title="Refresh"
                    onClick={() => {
                      setActionName('');
                      setActionType('');
                      setAddNotifications(false);
                      setDeliveryType('Immediate');
                    }}
                  >
                    <RefreshCw size={18} />
                  </button>
                  <Button
                    variant="success"
                    onClick={handleSaveAction}
                    disabled={!actionName.trim()}
                  >
                    Save Action
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <Form.Check
                type="checkbox"
                id="protect-overwriting"
                label="Protect from Overwriting"
                checked={protectFromOverwriting}
                onChange={(e) => setProtectFromOverwriting(e.target.checked)}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <Button
              variant="success"
              onClick={handleSave}
              disabled={saving}
              style={{
                backgroundColor: '#28a745',
                border: 'none',
                padding: '8px 24px',
                fontSize: '0.875rem',
                fontWeight: 500,
                opacity: saving ? 0.6 : 1
              }}
            >
              {saving ? 'SAVING...' : 'SAVE'}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
