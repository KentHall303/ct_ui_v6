import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Collapse } from 'react-bootstrap';
import { Button } from '../../components/bootstrap/Button';
import { Plus, X } from 'lucide-react';
import { US_STATES } from '../../data/stateProvinceData';
import { LEAD_SOURCES } from '../../data/leadSourceData';
import { salesCycleService, SalesCycle } from '../../services/salesCycleService';
import { userService, User } from '../../services/userService';
import { actionPlanService } from '../../services/actionPlanService';
import { savedFiltersService, SavedFilter, SavedFilterGroup, FilterConfig, AdvancedFilterRow } from '../../services/savedFiltersService';
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
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header className="border-bottom d-flex justify-content-between align-items-center">
        <Modal.Title className="h5">Filters</Modal.Title>
        <button
          type="button"
          className="btn-close"
          onClick={onHide}
          aria-label="Close"
        />
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small fw-semibold">Action Plan:</Form.Label>
              <Form.Select
                size="sm"
                value={actionPlan}
                onChange={(e) => setActionPlan(e.target.value)}
              >
                <option value="all">All</option>
                {actionPlans.map(plan => (
                  <option key={plan.id} value={plan.id}>{plan.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small fw-semibold">State</Form.Label>
              <Form.Select
                size="sm"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Please Select State</option>
                {US_STATES.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small fw-semibold">Sales Cycle:</Form.Label>
              <Form.Select
                size="sm"
                value={salesCycle}
                onChange={(e) => setSalesCycle(e.target.value)}
              >
                <option value="all">All</option>
                {salesCycles.map(cycle => (
                  <option key={cycle.id} value={cycle.id}>{cycle.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small fw-semibold">Previous Accounts</Form.Label>
              <Form.Select
                size="sm"
                value={previousAccounts}
                onChange={(e) => setPreviousAccounts(e.target.value)}
              >
                <option value="">Please Select Previous Account</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small fw-semibold">Lead Source:</Form.Label>
              <Form.Select
                size="sm"
                value={leadSource}
                onChange={(e) => setLeadSource(e.target.value)}
              >
                <option value="all">All</option>
                {LEAD_SOURCES.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small fw-semibold">Saved Filters</Form.Label>
              <Form.Select
                size="sm"
                value={savedFilter}
                onChange={(e) => handleSavedFilterSelect(e.target.value)}
              >
                <option value="">Select Filter</option>
                {savedFilters.map(group => (
                  <optgroup key={group.type} label={group.type}>
                    {group.filters.map(filter => (
                      <option key={filter.id} value={filter.id}>{filter.name}</option>
                    ))}
                  </optgroup>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small fw-semibold">Assigned User:</Form.Label>
              <Form.Select
                size="sm"
                value={assignedUser}
                onChange={(e) => setAssignedUser(e.target.value)}
              >
                <option value="all">All</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small fw-semibold">Find Duplicates</Form.Label>
              <Form.Select
                size="sm"
                value={findDuplicates}
                onChange={(e) => setFindDuplicates(e.target.value)}
              >
                <option value="">Select Filter</option>
                {FIND_DUPLICATES_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small fw-semibold">Tags</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Search by tags..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Collapse in={showAdvanced}>
          <div className="border-top pt-3 mt-3">
            <div className="mb-3">
              {advancedRows.map((row, index) => (
                <Row key={index} className="mb-2 align-items-end">
                  <Col md={3}>
                    <Form.Group>
                      {index === 0 && <Form.Label className="small fw-semibold">Search</Form.Label>}
                      <Form.Select
                        size="sm"
                        value={row.field}
                        onChange={(e) => handleAdvancedRowChange(index, 'field', e.target.value)}
                      >
                        <option value="">Select Field Name</option>
                        {FIELD_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      {index === 0 && <Form.Label className="small fw-semibold">That is</Form.Label>}
                      <Form.Select
                        size="sm"
                        value={row.operator}
                        onChange={(e) => handleAdvancedRowChange(index, 'operator', e.target.value)}
                      >
                        <option value="">Select Matching Option</option>
                        {MATCHING_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      {index === 0 && <Form.Label className="small fw-semibold">The Value</Form.Label>}
                      <Form.Control
                        type="text"
                        size="sm"
                        value={row.value}
                        onChange={(e) => handleAdvancedRowChange(index, 'value', e.target.value)}
                        disabled={row.operator === 'is_empty' || row.operator === 'is_not_empty'}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      {index === 0 && <Form.Label className="small fw-semibold">Continue With</Form.Label>}
                      <Form.Select
                        size="sm"
                        value={row.continueWith}
                        onChange={(e) => handleAdvancedRowChange(index, 'continueWith', e.target.value)}
                      >
                        <option value="">Select Extension Option</option>
                        {CONTINUE_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={1}>
                    {advancedRows.length > 1 && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-danger p-0"
                        onClick={() => handleRemoveAdvancedRow(index)}
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </Col>
                </Row>
              ))}
            </div>

            <div className="mb-3">
              <span
                className="text-success small"
                style={{ cursor: 'pointer' }}
                onClick={handleAddAdvancedRow}
              >
                Add More
              </span>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" size="sm" onClick={handleAdvancedCancel}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={() => setShowSaveDialog(true)}>
                Save Filter
              </Button>
              <Button variant="success" size="sm" onClick={handleAdvancedClear}>
                Clear
              </Button>
              <Button variant="primary" size="sm" onClick={handleAdvancedSearch}>
                Search
              </Button>
            </div>
          </div>
        </Collapse>

        {showSaveDialog && (
          <div className="border rounded p-3 mt-3 bg-light">
            <Form.Group className="mb-2">
              <Form.Label className="small fw-semibold">Filter Name:</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Enter filter name..."
                value={newFilterName}
                onChange={(e) => setNewFilterName(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setShowSaveDialog(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveFilter} disabled={saving || !newFilterName.trim()}>
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="border-top">
        <div className="d-flex gap-2">
          <Button variant="primary" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
            Advanced Filters
          </Button>
          <Button variant="primary" size="sm" onClick={() => setShowSaveDialog(true)}>
            Save Filter
          </Button>
          <Button variant="info" size="sm" onClick={handleClearAll}>
            Clear All Settings
          </Button>
          <Button variant="primary" size="sm" onClick={handleApply}>
            Apply Filter
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
