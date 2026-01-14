import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '../../../components/bootstrap/Button';
import { FloatingInput, FloatingSelect, FloatingSelectOption } from '../../../components/bootstrap/FormControls';
import { US_STATES } from '../../../data/stateProvinceData';
import { LEAD_SOURCES } from '../../../data/leadSourceData';
import { userService, User } from '../../../services/userService';
import { actionPlanService } from '../../../services/actionPlanService';
import { savedFiltersService, SavedFilterGroup } from '../../../services/savedFiltersService';
import { ConnectionPlan } from '../../../lib/supabase';

export interface PipelineFilterConfig {
  actionPlan?: string;
  state?: string;
  leadSource?: string;
  previousAccounts?: string;
  assignedUser?: string;
  closeDateFrom?: string;
  closeDateTo?: string;
  tags?: string;
}

interface PipelineFilterModalProps {
  show: boolean;
  onHide: () => void;
  onApply: (filters: PipelineFilterConfig) => void;
  onClear: () => void;
  initialFilters?: PipelineFilterConfig;
}

export const PipelineFilterModal: React.FC<PipelineFilterModalProps> = ({
  show,
  onHide,
  onApply,
  onClear,
  initialFilters = {},
}) => {
  const [actionPlan, setActionPlan] = useState(initialFilters.actionPlan || 'all');
  const [state, setState] = useState(initialFilters.state || '');
  const [leadSource, setLeadSource] = useState(initialFilters.leadSource || 'all');
  const [previousAccounts, setPreviousAccounts] = useState(initialFilters.previousAccounts || '');
  const [assignedUser, setAssignedUser] = useState(initialFilters.assignedUser || 'all');
  const [savedFilter, setSavedFilter] = useState('');
  const [closeDateFrom, setCloseDateFrom] = useState(initialFilters.closeDateFrom || '');
  const [closeDateTo, setCloseDateTo] = useState(initialFilters.closeDateTo || '');
  const [tags, setTags] = useState(initialFilters.tags || '');

  const [actionPlans, setActionPlans] = useState<ConnectionPlan[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [savedFilters, setSavedFilters] = useState<SavedFilterGroup[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newFilterName, setNewFilterName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (show) {
      loadDropdownData();
    }
  }, [show]);

  useEffect(() => {
    if (show && initialFilters) {
      setActionPlan(initialFilters.actionPlan || 'all');
      setState(initialFilters.state || '');
      setLeadSource(initialFilters.leadSource || 'all');
      setPreviousAccounts(initialFilters.previousAccounts || '');
      setAssignedUser(initialFilters.assignedUser || 'all');
      setCloseDateFrom(initialFilters.closeDateFrom || '');
      setCloseDateTo(initialFilters.closeDateTo || '');
      setTags(initialFilters.tags || '');
    }
  }, [show, initialFilters]);

  const loadDropdownData = async () => {
    try {
      const [plansData, usersData, filtersData] = await Promise.all([
        actionPlanService.getAll(),
        userService.getAll(),
        savedFiltersService.getGrouped(),
      ]);
      setActionPlans(plansData);
      setUsers(usersData);
      setSavedFilters(filtersData);
    } catch (err) {
      console.error('Error loading dropdown data:', err);
    }
  };

  const handleSavedFilterSelect = async (filterId: string) => {
    setSavedFilter(filterId);
    if (!filterId) return;

    const filter = await savedFiltersService.getById(filterId);
    if (filter && filter.filter_config) {
      const config = filter.filter_config as PipelineFilterConfig;
      setActionPlan(config.actionPlan || 'all');
      setState(config.state || '');
      setLeadSource(config.leadSource || 'all');
      setPreviousAccounts(config.previousAccounts || '');
      setAssignedUser(config.assignedUser || 'all');
      setCloseDateFrom(config.closeDateFrom || '');
      setCloseDateTo(config.closeDateTo || '');
      setTags(config.tags || '');
    }
  };

  const buildFilterConfig = (): PipelineFilterConfig => {
    const config: PipelineFilterConfig = {};
    if (actionPlan && actionPlan !== 'all') config.actionPlan = actionPlan;
    if (state) config.state = state;
    if (leadSource && leadSource !== 'all') config.leadSource = leadSource;
    if (previousAccounts) config.previousAccounts = previousAccounts;
    if (assignedUser && assignedUser !== 'all') config.assignedUser = assignedUser;
    if (closeDateFrom) config.closeDateFrom = closeDateFrom;
    if (closeDateTo) config.closeDateTo = closeDateTo;
    if (tags) config.tags = tags;
    return config;
  };

  const handleApply = () => {
    onApply(buildFilterConfig());
    onHide();
  };

  const handleClearAll = () => {
    setActionPlan('all');
    setState('');
    setLeadSource('all');
    setPreviousAccounts('');
    setSavedFilter('');
    setAssignedUser('all');
    setCloseDateFrom('');
    setCloseDateTo('');
    setTags('');
    onClear();
  };

  const handleSaveFilter = async () => {
    if (!newFilterName.trim()) return;

    setSaving(true);
    try {
      await savedFiltersService.create({
        name: newFilterName.trim(),
        filter_type: 'Pipeline Filters',
        filter_config: buildFilterConfig(),
        is_active: true,
      });

      const filtersData = await savedFiltersService.getGrouped();
      setSavedFilters(filtersData);
      setShowSaveDialog(false);
      setNewFilterName('');
    } catch (err) {
      console.error('Error saving filter:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title style={{ fontSize: '1.5rem', fontWeight: 400 }}>
          Filters
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3 pb-4">
        <div className="d-flex flex-column gap-3">
          <div className="row g-3">
            <div className="col-md-6">
              <FloatingSelect
                label="Action Plan"
                value={actionPlan}
                onChange={(e) => setActionPlan(e.target.value)}
              >
                <FloatingSelectOption value="all">All</FloatingSelectOption>
                {actionPlans.map(plan => (
                  <FloatingSelectOption key={plan.id} value={plan.id}>{plan.name}</FloatingSelectOption>
                ))}
              </FloatingSelect>
            </div>
            <div className="col-md-6">
              <FloatingSelect
                label="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <FloatingSelectOption value="">Please Select State</FloatingSelectOption>
                {US_STATES.map(s => (
                  <FloatingSelectOption key={s.value} value={s.value}>{s.label}</FloatingSelectOption>
                ))}
              </FloatingSelect>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <FloatingSelect
                label="Lead Source:"
                value={leadSource}
                onChange={(e) => setLeadSource(e.target.value)}
              >
                <FloatingSelectOption value="all">All</FloatingSelectOption>
                {LEAD_SOURCES.map(source => (
                  <FloatingSelectOption key={source} value={source}>{source}</FloatingSelectOption>
                ))}
              </FloatingSelect>
            </div>
            <div className="col-md-6">
              <FloatingSelect
                label="Previous Accounts"
                value={previousAccounts}
                onChange={(e) => setPreviousAccounts(e.target.value)}
              >
                <FloatingSelectOption value="">Please Select Previous Account</FloatingSelectOption>
              </FloatingSelect>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <FloatingSelect
                label="User Assigned:"
                value={assignedUser}
                onChange={(e) => setAssignedUser(e.target.value)}
              >
                <FloatingSelectOption value="all">All</FloatingSelectOption>
                {users.map(user => (
                  <FloatingSelectOption key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </FloatingSelectOption>
                ))}
              </FloatingSelect>
            </div>
            <div className="col-md-6">
              <FloatingSelect
                label="Saved Filters"
                value={savedFilter}
                onChange={(e) => handleSavedFilterSelect(e.target.value)}
              >
                <FloatingSelectOption value="">Select Filter</FloatingSelectOption>
                {savedFilters.map(group => (
                  <React.Fragment key={group.type}>
                    {group.filters.map(filter => (
                      <FloatingSelectOption key={filter.id} value={filter.id}>
                        {group.type}: {filter.name}
                      </FloatingSelectOption>
                    ))}
                  </React.Fragment>
                ))}
              </FloatingSelect>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-medium" style={{ fontSize: '0.875rem' }}>Close Date</label>
              <div className="row g-3">
                <div className="col-md-6">
                  <FloatingInput
                    label="From"
                    type="date"
                    value={closeDateFrom}
                    onChange={(e) => setCloseDateFrom(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <FloatingInput
                    label="To"
                    type="date"
                    value={closeDateTo}
                    onChange={(e) => setCloseDateTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-12">
              <FloatingInput
                label="Tags"
                type="text"
                placeholder="Search by tags..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          {showSaveDialog && (
            <div className="border rounded p-3 mt-2 bg-light">
              <div className="mb-3">
                <FloatingInput
                  label="Filter Name"
                  type="text"
                  placeholder="Enter filter name..."
                  value={newFilterName}
                  onChange={(e) => setNewFilterName(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => setShowSaveDialog(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSaveFilter} disabled={saving || !newFilterName.trim()}>
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <div className="d-flex gap-2">
          <Button variant="primary" onClick={() => {}}>
            Advanced Filters
          </Button>
          <Button variant="primary" onClick={() => setShowSaveDialog(true)}>
            Save Filter
          </Button>
          <Button variant="info" onClick={handleClearAll}>
            Clear All Settings
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Apply Filter
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
