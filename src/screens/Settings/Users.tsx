import React, { useState } from 'react';
import { Button } from '../../components/bootstrap/Button';
import { Table, TableBody, TableRow, TableCell } from '../../components/bootstrap/Table';
import { ResizableTableHead } from '../../components/bootstrap/ResizableTableHead';
import { useResizableColumns, ColumnConfig } from '../../hooks/useResizableColumns';
import { Plus, Copy, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { AddUserModal } from '../../components/modals/AddUserModal';

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  apiId: string;
}

const mockUsers: User[] = [
  { id: '1', username: 'saraadmin', firstName: 'sara', lastName: 'Admin', phone: '4359388063', email: 'sara.hansen181+admin@gmail.com', apiId: '17469' },
  { id: '2', username: 'tmrkadmin', firstName: 'tmrk Admin', lastName: 'Team', phone: '3039291579', email: 'g+Admin@tmrk.com', apiId: '19605' },
  { id: '3', username: 'neeradminuser', firstName: 'neeraj', lastName: 'admin user', phone: '8878789922', email: 'neeraj+admin@clienttether.com', apiId: '20791' },
  { id: '4', username: 'collin+newadmin', firstName: 'Col', lastName: 'Gav', phone: '4802344319', email: 'collin+newadmin@gmail.com', apiId: '22780' },
  { id: '5', username: 'angeltestingacc', firstName: 'ANGEL', lastName: 'TESTACCOUNT', phone: '3039291447', email: 'angel+test20@clienttether.com', apiId: '31690' },
  { id: '6', username: 'ctdefault1', firstName: 'Admin', lastName: 'Kent', phone: '4152511945', email: 'KentHall303+User35051@gmail.com', apiId: '35051' },
  { id: '7', username: 'referpro1', firstName: 'ReferPro', lastName: 'Platform', phone: '8018555555', email: 'matt+referpro1@referpro.com', apiId: '35952' },
  { id: '8', username: 'ctdefault2', firstName: 'Standard', lastName: 'Kent', phone: '4152511945', email: 'KentHall303+User102@gmail.com', apiId: '11672' },
  { id: '9', username: 'kentjoe', firstName: 'Sara', lastName: 'Joe', phone: '4359388063', email: 'kent+joe@clienttether.com', apiId: '17032' },
  { id: '10', username: 'sarastand', firstName: 'Jeanette', lastName: 'Standards', phone: '3039291579', email: 'sara.hansen181+Standards@gmail.com', apiId: '17468' },
  { id: '11', username: 'akshitan!', firstName: 'Akshita', lastName: 'Nagar', phone: '8017091800', email: 'nagarakshita20@gmail.com', apiId: '18361' },
  { id: '12', username: 'tmrk', firstName: 'tmrk', lastName: 'Team', phone: '3039291447', email: 'g@tmrk.com', apiId: '19604' },
  { id: '13', username: 'neerct1', firstName: 'Neeraj', lastName: 'QA', phone: '8878789922', email: 'neeraj12@clienttether.com', apiId: '20612' },
  { id: '14', username: 'collintestuser', firstName: 'Collin', lastName: 'Gavel', phone: '4806212649', email: 'collin+testuser@clienttether.com', apiId: '20833' },
  { id: '15', username: 'jvs_georgeduffield', firstName: 'Jule', lastName: 'Virtual Scheduler', phone: '', email: 'jvs_georgeduffield@clienttether.com', apiId: '21902' },
];

const columns: ColumnConfig[] = [
  { id: 'username', label: 'Username', defaultWidth: 150, minWidth: 100 },
  { id: 'firstName', label: 'First Name', defaultWidth: 120, minWidth: 80 },
  { id: 'lastName', label: 'Last Name', defaultWidth: 150, minWidth: 100 },
  { id: 'phone', label: 'Phone', defaultWidth: 130, minWidth: 100 },
  { id: 'email', label: 'Email', defaultWidth: 200, minWidth: 150 },
  { id: 'apiId', label: 'ID for API v2', defaultWidth: 100, minWidth: 80 },
  { id: 'actions', label: 'Actions', defaultWidth: 120, minWidth: 100 },
];

export const Users = (): JSX.Element => {
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    columnWidths,
    isResizing,
    resizingColumn,
    handleMouseDown,
  } = useResizableColumns(columns, 'usersTableColumns');

  const handleSort = (key: string) => {
    if (key === 'actions') return;
    setSortConfig(current => {
      if (current?.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const getSortIcon = (key: string) => {
    if (key === 'actions') return null;
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
    if (!sortConfig) return mockUsers;

    return [...mockUsers].sort((a, b) => {
      const aVal = a[sortConfig.key as keyof User];
      const bVal = b[sortConfig.key as keyof User];

      const aStr = String(aVal || '').toLowerCase();
      const bStr = String(bVal || '').toLowerCase();

      if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortConfig]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDuplicate = (user: User) => {
    console.log('Duplicate user:', user);
  };

  const handleDelete = (user: User) => {
    console.log('Delete user:', user);
  };

  const handleCreateNew = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="d-flex flex-column w-100 h-100">
      <div className="px-3 pt-3 flex-shrink-0">
        <div className="bg-white rounded-3 pt-3 pb-3 px-4 border shadow-sm">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="h4 fw-bold text-dark mb-0">Users</h2>
            <Button
              variant="success"
              size="sm"
              className="rounded-pill d-flex align-items-center gap-2"
              style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              title="Create new user"
              onClick={handleCreateNew}
            >
              <Plus size={14} />
              <span>Create New User</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-3 pt-3 pb-3 flex-fill" style={{ minHeight: 0, overflow: 'hidden' }}>
        <div
          className="bg-white rounded-3 border shadow-sm h-100"
          style={{ overflow: 'auto' }}
        >
          <Table className={`standard-table table-striped mb-0 ${isResizing ? 'resizing' : ''}`}>
            <caption className="visually-hidden">
              Users table showing {mockUsers.length} records.
              Use arrow keys to navigate, Enter or Space to sort columns.
              {sortConfig && ` Currently sorted by ${sortConfig.key} in ${sortConfig.direction}ending order.`}
            </caption>
            <ResizableTableHead
              columns={columns}
              columnWidths={columnWidths}
              isResizing={isResizing}
              resizingColumn={resizingColumn}
              onResizeStart={handleMouseDown}
              sortConfig={sortConfig}
              onSort={handleSort}
              getSortIcon={getSortIcon}
            />
            <TableBody>
              {sortedUsers.map((user, index) => (
                <TableRow
                  key={user.id}
                  role="row"
                  aria-rowindex={index + 2}
                >
                  <TableCell role="gridcell" style={{ width: `${columnWidths.username}px` }}>
                    <div
                      className="text-dark"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '0.8125rem'
                      }}
                      title={user.username}
                    >
                      {user.username}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell" style={{ width: `${columnWidths.firstName}px` }}>
                    <div
                      className="text-dark"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '0.8125rem'
                      }}
                      title={user.firstName}
                    >
                      {user.firstName}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell" style={{ width: `${columnWidths.lastName}px` }}>
                    <div
                      className="text-dark"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '0.8125rem'
                      }}
                      title={user.lastName}
                    >
                      {user.lastName}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell" style={{ width: `${columnWidths.phone}px` }}>
                    <div
                      className="text-dark"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '0.8125rem'
                      }}
                      title={user.phone}
                    >
                      {user.phone}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell" style={{ width: `${columnWidths.email}px` }}>
                    <div
                      className="text-dark"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '0.8125rem'
                      }}
                      title={user.email}
                    >
                      {user.email}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell" style={{ width: `${columnWidths.apiId}px` }}>
                    <div
                      className="text-dark"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '0.8125rem'
                      }}
                      title={user.apiId}
                    >
                      {user.apiId}
                    </div>
                  </TableCell>

                  <TableCell role="gridcell" style={{ width: `${columnWidths.actions}px` }}>
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-link p-0 border rounded-circle d-flex align-items-center justify-content-center"
                        title="Edit user"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderColor: '#dee2e6',
                          color: '#6c757d',
                          backgroundColor: 'white'
                        }}
                        onClick={() => handleEdit(user)}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                      </button>
                      <button
                        className="btn btn-link p-0 border rounded-circle d-flex align-items-center justify-content-center"
                        title="Duplicate user"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderColor: '#dee2e6',
                          color: '#6c757d',
                          backgroundColor: 'white'
                        }}
                        onClick={() => handleDuplicate(user)}
                      >
                        <Copy size={12} />
                      </button>
                      <button
                        className="btn btn-link p-0 border rounded-circle d-flex align-items-center justify-content-center"
                        title="Delete user"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderColor: '#dee2e6',
                          color: '#6c757d',
                          backgroundColor: 'white'
                        }}
                        onClick={() => handleDelete(user)}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddUserModal
        show={showModal}
        onHide={handleCloseModal}
        user={selectedUser}
        onSave={handleCloseModal}
      />
    </div>
  );
};
