import React, { useState, useEffect } from 'react';
import { BodyLayout } from '../../components/layout/BodyLayout/BodyLayout';
import { Button } from '../../components/bootstrap/Button';
import { Table, TableBody, TableRow, TableCell } from '../../components/bootstrap/Table';
import { ResizableTableHead } from '../../components/bootstrap/ResizableTableHead';
import { useResizableColumns, ColumnConfig } from '../../hooks/useResizableColumns';
import { Plus, LogIn, Edit2, XCircle, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapse, Form } from 'react-bootstrap';
import { fetchUsers, User } from '../../services/userService';

type SortDirection = 'asc' | 'desc';

export const AccountPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: SortDirection } | null>(null);
  const [showAccountsDisplay, setShowAccountsDisplay] = useState(false);
  const [showFeatureClone, setShowFeatureClone] = useState(false);
  const [accountsDisplayOption, setAccountsDisplayOption] = useState('account_name');
  const [featureCloneOptions, setFeatureCloneOptions] = useState({
    coreAddOns: false,
    proposalSettings: false,
    proposalBidTypes: false,
    proposalTemplates: false,
    proposalOtherTypes: false,
  });

  const columns: ColumnConfig[] = [
    { id: 'username', label: 'UserName', defaultWidth: 180, minWidth: 120 },
    { id: 'first_name', label: 'First Name', defaultWidth: 200, minWidth: 120 },
    { id: 'last_name', label: 'Last Name', defaultWidth: 160, minWidth: 100 },
    { id: 'phone', label: 'Phone', defaultWidth: 160, minWidth: 120 },
    { id: 'email', label: 'Email', defaultWidth: 280, minWidth: 180 },
    { id: 'actions', label: 'Action', defaultWidth: 160, minWidth: 140 },
  ];

  const {
    columnWidths,
    isResizing,
    resizingColumn,
    handleMouseDown,
  } = useResizableColumns(columns, 'settingsAccountColumns');

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setLoading(false);
    };
    loadUsers();
  }, []);

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? (
        <ChevronUp size={14} style={{ marginLeft: '8px' }} />
      ) : (
        <ChevronDown size={14} style={{ marginLeft: '8px' }} />
      );
    }
    return <ChevronUp size={14} style={{ marginLeft: '8px', opacity: 0.3 }} />;
  };

  const sortedUsers = React.useMemo(() => {
    if (!sortConfig) return users;

    return [...users].sort((a, b) => {
      const aVal = a[sortConfig.key as keyof User];
      const bVal = b[sortConfig.key as keyof User];

      const aStr = String(aVal || '').toLowerCase();
      const bStr = String(bVal || '').toLowerCase();

      if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [users, sortConfig]);

  const getSortProps = (key: string) => ({
    'aria-sort': sortConfig?.key === key
      ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending')
      : 'none' as const,
    onClick: () => handleSort(key),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSort(key);
      }
    },
    tabIndex: 0,
    role: 'button',
    style: { cursor: 'pointer' }
  });

  const handleLoginAs = (user: User) => {
    console.log('Log in as account:', user.username);
  };

  const handleEdit = (user: User) => {
    console.log('Edit user:', user.username);
  };

  const handleDeactivate = (user: User) => {
    console.log('Deactivate user:', user.username);
  };

  const handleCreateNewAccount = () => {
    console.log('Create new account');
  };

  const handleFeatureCloneChange = (key: keyof typeof featureCloneOptions) => {
    setFeatureCloneOptions(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <BodyLayout>
      <div className="d-flex flex-column w-100 h-100">
        <div className="px-3 pt-3 flex-shrink-0">
          <div className="bg-white rounded-3 pt-3 px-4 pb-3 border shadow-sm">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="h4 fw-bold text-dark mb-0">Accounts Information</h2>
              <Button
                variant="success"
                size="sm"
                className="rounded-pill d-flex align-items-center gap-2"
                style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                onClick={handleCreateNewAccount}
              >
                <Plus size={14} />
                <span>Create New Account</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="px-3 pt-3 flex-shrink-0">
          <div className="bg-white rounded-3 border shadow-sm">
            <div
              className="d-flex align-items-center justify-content-between px-4 py-3"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowAccountsDisplay(!showAccountsDisplay)}
            >
              <h3 className="h6 fw-semibold text-dark mb-0">Accounts Display</h3>
              {showAccountsDisplay ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <Collapse in={showAccountsDisplay}>
              <div>
                <div className="px-4 pb-4">
                  <p className="text-muted mb-3" style={{ fontSize: '0.875rem' }}>
                    Please select the display option you would prefer for the Account List on the Account page.
                  </p>
                  <Form>
                    <Form.Check
                      type="radio"
                      id="display-account-name"
                      name="accountsDisplay"
                      label="Account Name"
                      checked={accountsDisplayOption === 'account_name'}
                      onChange={() => setAccountsDisplayOption('account_name')}
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      id="display-account-admin"
                      name="accountsDisplay"
                      label="Account Admin"
                      checked={accountsDisplayOption === 'account_admin'}
                      onChange={() => setAccountsDisplayOption('account_admin')}
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      id="display-notification-settings"
                      name="accountsDisplay"
                      label="Notification Settings"
                      checked={accountsDisplayOption === 'notification_settings'}
                      onChange={() => setAccountsDisplayOption('notification_settings')}
                    />
                  </Form>
                </div>
              </div>
            </Collapse>

            <hr className="my-0 mx-4" style={{ borderColor: '#e0e0e0' }} />

            <div
              className="d-flex align-items-center justify-content-between px-4 py-3"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowFeatureClone(!showFeatureClone)}
            >
              <h3 className="h6 fw-semibold text-dark mb-0">Feature Clone Overview</h3>
              {showFeatureClone ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <Collapse in={showFeatureClone}>
              <div>
                <div className="px-4 pb-4">
                  <Form>
                    <Form.Check
                      type="checkbox"
                      id="clone-core-addons"
                      label="Core Add-Ons"
                      checked={featureCloneOptions.coreAddOns}
                      onChange={() => handleFeatureCloneChange('coreAddOns')}
                      className="mb-2"
                    />
                    <Form.Check
                      type="checkbox"
                      id="clone-proposal-settings"
                      label="Proposal Settings (Preferences, Tax Display, Pdf Details)"
                      checked={featureCloneOptions.proposalSettings}
                      onChange={() => handleFeatureCloneChange('proposalSettings')}
                      className="mb-2"
                    />
                    <Form.Check
                      type="checkbox"
                      id="clone-proposal-bid-types"
                      label="Proposal Bid Types"
                      checked={featureCloneOptions.proposalBidTypes}
                      onChange={() => handleFeatureCloneChange('proposalBidTypes')}
                      className="mb-2"
                    />
                    <Form.Check
                      type="checkbox"
                      id="clone-proposal-templates"
                      label="Proposal Templates"
                      checked={featureCloneOptions.proposalTemplates}
                      onChange={() => handleFeatureCloneChange('proposalTemplates')}
                      className="mb-2"
                    />
                    <Form.Check
                      type="checkbox"
                      id="clone-proposal-other-types"
                      label="Proposal Other types"
                      checked={featureCloneOptions.proposalOtherTypes}
                      onChange={() => handleFeatureCloneChange('proposalOtherTypes')}
                    />
                  </Form>
                </div>
              </div>
            </Collapse>
          </div>
        </div>

        <div className="px-3 pt-3 pb-3 flex-fill" style={{ minHeight: 0, overflow: 'hidden' }}>
          <div className="bg-white rounded-3 border shadow-sm h-100 d-flex flex-column" style={{ overflow: 'hidden' }}>
            <div className="flex-fill" style={{ overflow: 'auto' }}>
              {loading ? (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <Table>
                  <ResizableTableHead
                    columns={columns}
                    columnWidths={columnWidths}
                    onResizeStart={handleMouseDown}
                    isResizing={isResizing}
                    resizingColumn={resizingColumn}
                    renderHeaderContent={(column) => {
                      if (column.id === 'actions') return 'Action';

                      return (
                        <div {...getSortProps(column.id)}>
                          {column.label}
                          {getSortIcon(column.id)}
                        </div>
                      );
                    }}
                  />
                  <TableBody>
                    {sortedUsers.map((user, index) => (
                      <TableRow key={user.id} aria-rowindex={index + 2}>
                        <TableCell style={{ width: columnWidths.username }}>
                          <span className="text-dark">{user.username}</span>
                        </TableCell>
                        <TableCell style={{ width: columnWidths.first_name }}>
                          <span className="text-dark">{user.first_name}</span>
                        </TableCell>
                        <TableCell style={{ width: columnWidths.last_name }}>
                          <span className="text-dark">{user.last_name}</span>
                        </TableCell>
                        <TableCell style={{ width: columnWidths.phone }}>
                          <span className="text-secondary">{user.phone}</span>
                        </TableCell>
                        <TableCell style={{ width: columnWidths.email }}>
                          <span className="text-secondary">{user.email}</span>
                        </TableCell>
                        <TableCell style={{ width: columnWidths.actions }}>
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => handleLoginAs(user)}
                              className="btn btn-sm btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: '32px', height: '32px', padding: 0 }}
                              title="Log in as account"
                              aria-label={`Log in as ${user.username}`}
                            >
                              <LogIn size={14} />
                            </button>
                            <button
                              onClick={() => handleEdit(user)}
                              className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: '32px', height: '32px', padding: 0 }}
                              title="Edit"
                              aria-label={`Edit ${user.username}`}
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeactivate(user)}
                              className="btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: '32px', height: '32px', padding: 0 }}
                              title="Deactivate"
                              aria-label={`Deactivate ${user.username}`}
                            >
                              <XCircle size={14} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>
    </BodyLayout>
  );
};
