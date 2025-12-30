import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '../../components/bootstrap/Button';
import { FloatingSelect, FloatingSelectOption } from '../../components/bootstrap/FormControls';
import { connectionPlanService } from '../../services/connectionPlanService';
import { fetchUsers, User, USER_TYPE_LABELS, UserType } from '../../services/userService';
import { ConnectionPlan } from '../../lib/supabase';
import { US_STATES, CANADIAN_PROVINCES } from '../../data/stateProvinceData';

interface MessageCenterFilterModalProps {
  show: boolean;
  onHide: () => void;
  actionPlan: string;
  userAssigned: string;
  state: string;
  onApply: (actionPlan: string, userAssigned: string, state: string) => void;
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
  onApply,
}) => {
  const [localActionPlan, setLocalActionPlan] = useState<string>(actionPlan);
  const [localUserAssigned, setLocalUserAssigned] = useState<string>(userAssigned);
  const [localState, setLocalState] = useState<string>(state);

  const [actionPlans, setActionPlans] = useState<ConnectionPlan[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    setLocalActionPlan(actionPlan);
    setLocalUserAssigned(userAssigned);
    setLocalState(state);
  }, [actionPlan, userAssigned, state, show]);

  useEffect(() => {
    if (show) {
      loadActionPlans();
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
    onApply(localActionPlan, localUserAssigned, localState);
    onHide();
  };

  const handleClear = () => {
    setLocalActionPlan('');
    setLocalUserAssigned('');
    setLocalState('');
  };

  const groupedUsers = groupUsersByType();
  const userTypeOrder: UserType[] = ['admin', 'salesperson', 'standard', 'subcontractor'];

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title style={{ fontSize: '1.5rem', fontWeight: 400 }}>
          Filter Messages
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3 pb-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="d-flex flex-column gap-3">
          <FloatingSelect
            label="Action Plans"
            value={localActionPlan}
            onChange={(e) => setLocalActionPlan(e.target.value)}
            disabled={loadingPlans}
          >
            <FloatingSelectOption value="">
              {loadingPlans ? 'Loading...' : 'All Action Plans'}
            </FloatingSelectOption>
            {actionPlans.map(plan => (
              <FloatingSelectOption key={plan.id} value={plan.id}>
                {plan.name}
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
              {loadingUsers ? 'Loading...' : 'All Users'}
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

          <FloatingSelect
            label="State"
            value={localState}
            onChange={(e) => setLocalState(e.target.value)}
          >
            <FloatingSelectOption value="">All States</FloatingSelectOption>
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

          <div className="d-flex justify-content-center gap-2 mt-2">
            <Button variant="outline-secondary" onClick={handleClear}>
              Clear Filters
            </Button>
            <Button variant="primary" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
