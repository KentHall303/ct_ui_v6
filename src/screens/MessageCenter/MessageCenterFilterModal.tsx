import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '../../components/bootstrap/Button';
import { FloatingSelect, FloatingSelectOption } from '../../components/bootstrap/FormControls';
import { connectionPlanService } from '../../services/connectionPlanService';
import { salesCycleService, SalesCycle } from '../../services/salesCycleService';
import { fetchUsers, User, USER_TYPE_LABELS, UserType } from '../../services/userService';
import { ConnectionPlan } from '../../lib/supabase';
import { US_STATES, CANADIAN_PROVINCES } from '../../data/stateProvinceData';
import { LEAD_SOURCES } from '../../data/leadSourceData';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface MessageCenterFilterModalProps {
  show: boolean;
  onHide: () => void;
  actionPlan: string;
  userAssigned: string;
  state: string;
  salesCycle: string;
  leadSource: string;
  messageDirection: 'inbound' | 'outbound' | 'both' | 'none';
  tags: string;
  onApply: (
    actionPlan: string,
    userAssigned: string,
    state: string,
    salesCycle: string,
    leadSource: string,
    messageDirection: 'inbound' | 'outbound' | 'both' | 'none',
    tags: string
  ) => void;
}

interface GroupedUsers {
  admin: User[];
  salesperson: User[];
  standard: User[];
  subcontractor: User[];
}

export const MessageCenterFilterModal: React.FC<MessageCenterFilterModalProps> = ({
  show,
  onHide,
  actionPlan,
  userAssigned,
  state,
  salesCycle,
  leadSource,
  messageDirection,
  tags,
  onApply,
}) => {
  const [localActionPlan, setLocalActionPlan] = useState<string>(actionPlan);
  const [localUserAssigned, setLocalUserAssigned] = useState<string>(userAssigned);
  const [localState, setLocalState] = useState<string>(state);
  const [localSalesCycle, setLocalSalesCycle] = useState<string>(salesCycle);
  const [localLeadSource, setLocalLeadSource] = useState<string>(leadSource);
  const [localMessageDirection, setLocalMessageDirection] = useState<'inbound' | 'outbound' | 'both' | 'none'>(messageDirection);
  const [localTags, setLocalTags] = useState<string>(tags);

  const [actionPlans, setActionPlans] = useState<ConnectionPlan[]>([]);
  const [salesCycles, setSalesCycles] = useState<SalesCycle[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [loadingSalesCycles, setLoadingSalesCycles] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    setLocalActionPlan(actionPlan);
    setLocalUserAssigned(userAssigned);
    setLocalState(state);
    setLocalSalesCycle(salesCycle);
    setLocalLeadSource(leadSource);
    setLocalMessageDirection(messageDirection);
    setLocalTags(tags);
  }, [actionPlan, userAssigned, state, salesCycle, leadSource, messageDirection, tags, show]);

  useEffect(() => {
    if (show) {
      loadActionPlans();
      loadSalesCycles();
      loadUsers();
    }
  }, [show]);

  const loadActionPlans = async () => {
    try {
      setLoadingPlans(true);
      const plans = await connectionPlanService.getAll();
      const sortedPlans = plans.sort((a, b) => a.name.localeCompare(b.name));
      setActionPlans(sortedPlans);
    } catch (err) {
      console.error('Error loading action plans:', err);
    } finally {
      setLoadingPlans(false);
    }
  };

  const loadSalesCycles = async () => {
    try {
      setLoadingSalesCycles(true);
      const cycles = await salesCycleService.getAll();
      setSalesCycles(cycles);
    } catch (err) {
      console.error('Error loading sales cycles:', err);
    } finally {
      setLoadingSalesCycles(false);
    }
  };

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const allUsers = await fetchUsers();
      setUsers(allUsers);
    } catch (err) {
      console.error('Error loading users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const groupUsersByType = (): GroupedUsers => {
    const grouped: GroupedUsers = {
      admin: [],
      salesperson: [],
      standard: [],
      subcontractor: [],
    };

    users.forEach(user => {
      const userType = user.user_type as UserType;
      if (grouped[userType]) {
        grouped[userType].push(user);
      }
    });

    Object.keys(grouped).forEach(key => {
      grouped[key as keyof GroupedUsers].sort((a, b) =>
        a.first_name.localeCompare(b.first_name)
      );
    });

    return grouped;
  };

  const formatUserDisplay = (user: User): string => {
    return `${user.first_name} ${user.last_name} - ${user.username}`;
  };

  const handleApply = () => {
    onApply(
      localActionPlan,
      localUserAssigned,
      localState,
      localSalesCycle,
      localLeadSource,
      localMessageDirection,
      localTags
    );
    onHide();
  };

  const handleClear = () => {
    setLocalActionPlan('');
    setLocalUserAssigned('');
    setLocalState('');
    setLocalSalesCycle('');
    setLocalLeadSource('');
    setLocalMessageDirection('both');
    setLocalTags('');
  };

  const toggleDirection = (direction: 'inbound' | 'outbound') => {
    const otherDirection = direction === 'inbound' ? 'outbound' : 'inbound';

    if (localMessageDirection === 'none') {
      setLocalMessageDirection(direction);
    } else if (localMessageDirection === direction) {
      setLocalMessageDirection('none');
    } else if (localMessageDirection === otherDirection) {
      setLocalMessageDirection('both');
    } else if (localMessageDirection === 'both') {
      setLocalMessageDirection(otherDirection);
    }
  };

  const groupedUsers = groupUsersByType();
  const userTypeOrder: UserType[] = ['admin', 'salesperson', 'standard', 'subcontractor'];

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title style={{ fontSize: '1.5rem', fontWeight: 600 }}>
          Advanced Filters
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3 pb-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="d-flex gap-4">
          <div className="d-flex flex-column gap-3" style={{ flex: '1' }}>
            <FloatingSelect
              label="Action Plan"
              value={localActionPlan}
              onChange={(e) => setLocalActionPlan(e.target.value)}
              disabled={loadingPlans}
            >
              <FloatingSelectOption value="">
                {loadingPlans ? 'Loading...' : 'All'}
              </FloatingSelectOption>
              {actionPlans.map(plan => (
                <FloatingSelectOption key={plan.id} value={plan.id}>
                  {plan.name}
                </FloatingSelectOption>
              ))}
            </FloatingSelect>

            <FloatingSelect
              label="Sales Cycle"
              value={localSalesCycle}
              onChange={(e) => setLocalSalesCycle(e.target.value)}
              disabled={loadingSalesCycles}
            >
              <FloatingSelectOption value="">
                {loadingSalesCycles ? 'Loading...' : 'All'}
              </FloatingSelectOption>
              {salesCycles.map(cycle => (
                <FloatingSelectOption key={cycle.id} value={cycle.id}>
                  {cycle.name}
                </FloatingSelectOption>
              ))}
            </FloatingSelect>

            <FloatingSelect
              label="Lead Source"
              value={localLeadSource}
              onChange={(e) => setLocalLeadSource(e.target.value)}
            >
              <FloatingSelectOption value="">All</FloatingSelectOption>
              {LEAD_SOURCES.map(source => (
                <FloatingSelectOption key={source} value={source}>
                  {source}
                </FloatingSelectOption>
              ))}
            </FloatingSelect>

            <FloatingSelect
              label="User Assigned"
              value={localUserAssigned}
              onChange={(e) => setLocalUserAssigned(e.target.value)}
              disabled={loadingUsers}
            >
              <FloatingSelectOption value="">
                {loadingUsers ? 'Loading...' : 'All'}
              </FloatingSelectOption>
              {userTypeOrder.map(userType => {
                const usersInGroup = groupedUsers[userType];
                if (usersInGroup.length === 0) return null;
                return (
                  <optgroup key={userType} label={USER_TYPE_LABELS[userType]}>
                    {usersInGroup.map(user => (
                      <option key={user.id} value={user.id}>
                        {formatUserDisplay(user)}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </FloatingSelect>
          </div>

          <div className="d-flex flex-column gap-3" style={{ flex: '1' }}>
            <FloatingSelect
              label="State"
              value={localState}
              onChange={(e) => setLocalState(e.target.value)}
            >
              <FloatingSelectOption value="">Please Select State</FloatingSelectOption>
              <optgroup label="US States">
                {US_STATES.map(state => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Canadian Provinces">
                {CANADIAN_PROVINCES.map(province => (
                  <option key={province.value} value={province.value}>
                    {province.label}
                  </option>
                ))}
              </optgroup>
            </FloatingSelect>

            <div>
              <label className="form-label" style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Message Direction:
              </label>
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-2">
                  <div
                    onClick={() => toggleDirection('outbound')}
                    style={{
                      width: '48px',
                      height: '24px',
                      borderRadius: '12px',
                      backgroundColor: localMessageDirection === 'outbound' || localMessageDirection === 'both' ? '#a8d5ba' : '#d1d5db',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: '2px',
                        left: localMessageDirection === 'outbound' || localMessageDirection === 'both' ? '26px' : '2px',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                      }}
                    />
                  </div>
                  <ArrowLeft size={20} style={{ color: '#6c757d' }} />
                </div>

                <div className="d-flex align-items-center gap-2">
                  <div
                    onClick={() => toggleDirection('inbound')}
                    style={{
                      width: '48px',
                      height: '24px',
                      borderRadius: '12px',
                      backgroundColor: localMessageDirection === 'inbound' || localMessageDirection === 'both' ? '#a8d5ba' : '#d1d5db',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: '2px',
                        left: localMessageDirection === 'inbound' || localMessageDirection === 'both' ? '26px' : '2px',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                      }}
                    />
                  </div>
                  <ArrowRight size={20} style={{ color: '#6c757d' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="tagsInput"
              placeholder="Search by tags..."
              value={localTags}
              onChange={(e) => setLocalTags(e.target.value)}
            />
            <label htmlFor="tagsInput">Tags</label>
          </div>
        </div>

        <div className="d-flex justify-content-center gap-2 mt-4">
          <Button variant="outline-secondary" onClick={handleClear} style={{ minWidth: '160px' }}>
            Clear All Settings
          </Button>
          <Button variant="primary" onClick={handleApply} style={{ minWidth: '160px' }}>
            Save and Update
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
