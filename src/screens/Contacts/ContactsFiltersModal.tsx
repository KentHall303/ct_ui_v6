import React, { useState, useEffect } from 'react';
import { Modal, Form, Collapse } from 'react-bootstrap';
import { Button } from '../../components/bootstrap/Button';
import { X } from 'lucide-react';
import { FloatingInput, FloatingSelect, FloatingSelectOption } from '../../components/bootstrap/FormControls';
import { US_STATES } from '../../data/stateProvinceData';
import { LEAD_SOURCES } from '../../data/leadSourceData';
import { salesCycleService, SalesCycle } from '../../services/salesCycleService';
import { userService, User } from '../../services/userService';
import { actionPlanService } from '../../services/actionPlanService';
import { savedFiltersService, SavedFilterGroup, FilterConfig, AdvancedFilterRow } from '../../services/savedFiltersService';
import { ConnectionPlan } from '../../lib/supabase';

interface ContactsFiltersModalProps {
  show: boolean;
  onHide: () => void;
  onApply: (filters: FilterConfig) => void;
  onClear: () => void;
  initialFilters?: FilterConfig;
}

const FIELD_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'cell_phone', label: 'Phone' },
  { value: 'address', label: 'Address' },
  { value: 'city', label: 'City' },
  { value: 'state', label: 'State' },
  { value: 'postal_code', label: 'Postal Code' },
  { value: 'lead_source', label: 'Lead Source' },
  { value: 'sales_cycle', label: 'Sales Cycle' },
  { value: 'assigned_user', label: 'Assigned User' },
  { value: 'white_board', label: 'White Board' },
  { value: 'created_date', label: 'Created Date' },
];

const MATCHING_OPTIONS = [
  { value: 'contains', label: 'Contains' },
  { value: 'equals', label: 'Equals' },
  { value: 'starts_with', label: 'Starts With' },
  { value: 'ends_with', label: 'Ends With' },
  { value: 'is_empty', label: 'Is Empty' },
  { value: 'is_not_empty', label: 'Is Not Empty' },
  { value: 'greater_than', label: 'Greater Than' },
  { value: 'less_than', label: 'Less Than' },
];

const CONTINUE_OPTIONS = [
  { value: 'and', label: 'AND' },
  { value: 'or', label: 'OR' },
];

const FIND_DUPLICATES_OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'name_phone', label: 'Name and Phone' },
  { value: 'phone', label: 'Phone' },
  { value: 'address', label: 'Address' },
];

const DEFAULT_ADVANCED_ROW: AdvancedFilterRow = {
  field: '',
  operator: '',
  value: '',
  continueWith: 'and',
};

export const ContactsFiltersModal: React.FC<ContactsFiltersModalProps> = ({
  show,
  onHide,
  onApply,
  onClear,
  initialFilters = {},
}) => {
  const [actionPlan, setActionPlan] = useState(initialFilters.actionPlan || 'all');
  const [state, setState] = useState(initialFilters.state || '');
  const [salesCycle, setSalesCycle] = useState(initialFilters.salesCycle || 'all');
  const [previousAccounts, setPreviousAccounts] = useState(initialFilters.previousAccounts || '');
  const [leadSource, setLeadSource] = useState(initialFilters.leadSource || 'all');
  const [savedFilter, setSavedFilter] = useState('');
  const [assignedUser, setAssignedUser] = useState(initialFilters.assignedUser || 'all');
  const [tags, setTags] = useState(initialFilters.tags || '');
  const [findDuplicates, setFindDuplicates] = useState(initialFilters.findDuplicates || '');

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedRows, setAdvancedRows] = useState<AdvancedFilterRow[]>(
    initialFilters.advancedRows || [{ ...DEFAULT_ADVANCED_ROW }, { ...DEFAULT_ADVANCED_ROW }]
  );

  const [salesCycles, setSalesCycles] = useState<SalesCycle[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [actionPlans, setActionPlans] = useState<ConnectionPlan[]>([]);
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
      setSalesCycle(initialFilters.salesCycle || 'all');
      setPreviousAccounts(initialFilters.previousAccounts || '');
      setLeadSource(initialFilters.leadSource || 'all');
      setAssignedUser(initialFilters.assignedUser || 'all');
      setTags(initialFilters.tags || '');
      setFindDuplicates(initialFilters.findDuplicates || '');
      setAdvancedRows(initialFilters.advancedRows || [{ ...DEFAULT_ADVANCED_ROW }, { ...DEFAULT_ADVANCED_ROW }]);
    }
  }, [show, initialFilters]);

  const loadDropdownData = async () => {
    try {
      const [cyclesData, usersData, plansData, filtersData] = await Promise.all([
        salesCycleService.getAll(),
        userService.getAll(),
        actionPlanService.getAll(),
        savedFiltersService.getGrouped(),
      ]);
      setSalesCycles(cyclesData);
      setUsers(usersData);
      setActionPlans(plansData);
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
      const config = filter.filter_config;
      setActionPlan(config.actionPlan || 'all');
      setState(config.state || '');
      setSalesCycle(config.salesCycle || 'all');
      setPreviousAccounts(config.previousAccounts || '');
      setLeadSource(config.leadSource || 'all');
      setAssignedUser(config.assignedUser || 'all');
      setTags(config.tags || '');
      setFindDuplicates(config.findDuplicates || '');
      if (config.advancedRows && config.advancedRows.length > 0) {
        setAdvancedRows(config.advancedRows);
        setShowAdvanced(true);
      }
    }
  };

  const handleAdvancedRowChange = (index: number, field: keyof AdvancedFilterRow, value: string) => {
    setAdvancedRows(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddAdvancedRow = () => {
    setAdvancedRows(prev => [...prev, { ...DEFAULT_ADVANCED_ROW }]);
  };

  const handleRemoveAdvancedRow = (index: number) => {
    if (advancedRows.length > 1) {
      setAdvancedRows(prev => prev.filter((_, i) => i !== index));
    }
  };

  const buildFilterConfig = (): FilterConfig => {
    const config: FilterConfig = {};
    if (actionPlan && actionPlan !== 'all') config.actionPlan = actionPlan;
    if (state) config.state = state;
    if (salesCycle && salesCycle !== 'all') config.salesCycle = salesCycle;
    if (previousAccounts) config.previousAccounts = previousAccounts;
    if (leadSource && leadSource !== 'all') config.leadSource = leadSource;
    if (assignedUser && assignedUser !== 'all') config.assignedUser = assignedUser;
    if (tags) config.tags = tags;
    if (findDuplicates) config.findDuplicates = findDuplicates;

    const validAdvancedRows = advancedRows.filter(row => row.field && row.operator);
    if (validAdvancedRows.length > 0) {
      config.advancedRows = validAdvancedRows;
    }

    return config;
  };

  const handleApply = () => {
    onApply(buildFilterConfig());
    onHide();
  };

  const handleClearAll = () => {
    setActionPlan('all');
    setState('');
    setSalesCycle('all');
    setPreviousAccounts('');
    setLeadSource('all');
    setSavedFilter('');
    setAssignedUser('all');
    setTags('');
    setFindDuplicates('');
    setAdvancedRows([{ ...DEFAULT_ADVANCED_ROW }, { ...DEFAULT_ADVANCED_ROW }]);
    setShowAdvanced(false);
  };

  const handleSaveFilter = async () => {
    if (!newFilterName.trim()) return;

    setSaving(true);
    try {
      const hasAdvanced = advancedRows.some(row => row.field && row.operator);
      const filterType = hasAdvanced ? 'Advanced Filters' : 'Contact Filters';

      await savedFiltersService.create({
        name: newFilterName.trim(),
        filter_type: filterType,
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

  const handleAdvancedSearch = () => {
    handleApply();
  };

  const handleAdvancedClear = () => {
    setAdvancedRows([{ ...DEFAULT_ADVANCED_ROW }, { ...DEFAULT_ADVANCED_ROW }]);
  };

  const handleAdvancedCancel = () => {
    setShowAdvanced(false);
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
                label="Sales Cycle"
                value={salesCycle}
                onChange={(e) => setSalesCycle(e.target.value)}
              >
                <FloatingSelectOption value="all">All</FloatingSelectOption>
                {salesCycles.map(cycle => (
                  <FloatingSelectOption key={cycle.id} value={cycle.id}>{cycle.name}</FloatingSelectOption>
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
                label="Lead Source"
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
            <div className="col-md-6">
              <FloatingSelect
                label="Assigned User"
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
                label="Find Duplicates"
                value={findDuplicates}
                onChange={(e) => setFindDuplicates(e.target.value)}
              >
                <FloatingSelectOption value="">Select Filter</FloatingSelectOption>
                {FIND_DUPLICATES_OPTIONS.map(opt => (
                  <FloatingSelectOption key={opt.value} value={opt.value}>{opt.label}</FloatingSelectOption>
                ))}
              </FloatingSelect>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <FloatingInput
                label="Tags"
                type="text"
                placeholder="Search by tags..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          <Collapse in={showAdvanced}>
            <div className="border-top pt-3 mt-2">
              <div className="mb-3">
                {advancedRows.map((row, index) => (
                  <div key={index} className="row g-2 mb-2 align-items-end">
                    <div className="col-md-3">
                      <FloatingSelect
                        label={index === 0 ? "Search" : "Field"}
                        value={row.field}
                        onChange={(e) => handleAdvancedRowChange(index, 'field', e.target.value)}
                      >
                        <FloatingSelectOption value="">Select Field Name</FloatingSelectOption>
                        {FIELD_OPTIONS.map(opt => (
                          <FloatingSelectOption key={opt.value} value={opt.value}>{opt.label}</FloatingSelectOption>
                        ))}
                      </FloatingSelect>
                    </div>
                    <div className="col-md-3">
                      <FloatingSelect
                        label={index === 0 ? "That is" : "Operator"}
                        value={row.operator}
                        onChange={(e) => handleAdvancedRowChange(index, 'operator', e.target.value)}
                      >
                        <FloatingSelectOption value="">Select Matching Option</FloatingSelectOption>
                        {MATCHING_OPTIONS.map(opt => (
                          <FloatingSelectOption key={opt.value} value={opt.value}>{opt.label}</FloatingSelectOption>
                        ))}
                      </FloatingSelect>
                    </div>
                    <div className="col-md-3">
                      <FloatingInput
                        label={index === 0 ? "The Value" : "Value"}
                        type="text"
                        value={row.value}
                        onChange={(e) => handleAdvancedRowChange(index, 'value', e.target.value)}
                        disabled={row.operator === 'is_empty' || row.operator === 'is_not_empty'}
                      />
                    </div>
                    <div className="col-md-2">
                      <FloatingSelect
                        label={index === 0 ? "Continue With" : "Continue"}
                        value={row.continueWith}
                        onChange={(e) => handleAdvancedRowChange(index, 'continueWith', e.target.value)}
                      >
                        <FloatingSelectOption value="">Select Option</FloatingSelectOption>
                        {CONTINUE_OPTIONS.map(opt => (
                          <FloatingSelectOption key={opt.value} value={opt.value}>{opt.label}</FloatingSelectOption>
                        ))}
                      </FloatingSelect>
                    </div>
                    <div className="col-md-1 d-flex align-items-center justify-content-center" style={{ minHeight: '58px' }}>
                      {advancedRows.length > 1 && (
                        <Button
                          variant="link"
                          size="sm"
                          className="text-danger p-0"
                          onClick={() => handleRemoveAdvancedRow(index)}
                        >
                          <X size={18} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <span
                  className="text-success small fw-medium"
                  style={{ cursor: 'pointer' }}
                  onClick={handleAddAdvancedRow}
                >
                  + Add More
                </span>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={handleAdvancedCancel}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setShowSaveDialog(true)}>
                  Save Filter
                </Button>
                <Button variant="success" onClick={handleAdvancedClear}>
                  Clear
                </Button>
                <Button variant="primary" onClick={handleAdvancedSearch}>
                  Search
                </Button>
              </div>
            </div>
          </Collapse>

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
          <Button variant="primary" onClick={() => setShowAdvanced(!showAdvanced)}>
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
