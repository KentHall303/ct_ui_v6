import React from "react";
import { Button } from "../../components/bootstrap/Button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/bootstrap/Table";
import { StandardSearch } from "../../components/bootstrap/StandardSearch";
import { ChevronUp, ChevronDown } from 'lucide-react';

type Account = {
  id: number;
  company: string;
  accountAdmin: string;
  lastLogin: string;
  createdDate: string;
  trialExpires: string;
  subscriptionPlan: string;
  status: "Active" | "Inactive";
  level: number;
  hasChildren?: boolean;
};

const accountsData: Account[] = [
  {
    id: 1,
    company: "Footprints Bath and Tile Operations",
    accountAdmin: "Footprints Bath and Tile Operations",
    lastLogin: "October 29, 2024 10:34 am",
    createdDate: "June 1, 2024 11:40 pm",
    trialExpires: "Bryan - Footprints Welcome Home",
    subscriptionPlan: "25 Footprints Bath & Tile",
    status: "Active",
    level: 0,
    hasChildren: true
  },
  {
    id: 2,
    company: "Clone",
    accountAdmin: "Clone - Footprints Bath and Tile",
    lastLogin: "",
    createdDate: "August 13, 2024 10:09 am",
    trialExpires: "Footprints Bath and Tile Operations",
    subscriptionPlan: "Unset",
    status: "Active",
    level: 1,
    hasChildren: false
  },
  {
    id: 3,
    company: "Footprints Bath and Tile - A Test Account",
    accountAdmin: "Cat - Footprints Bath and Tile",
    lastLogin: "October 8, 2024 10:44 am",
    createdDate: "October 8, 2024 10:43 am",
    trialExpires: "Footprints Bath and Tile Operations",
    subscriptionPlan: "Unset",
    status: "Active",
    level: 1,
    hasChildren: false
  },
  {
    id: 4,
    company: "Footprints Bath and Tile - Blue Ridge",
    accountAdmin: "Rich - Footprints Bath and Tile",
    lastLogin: "September 10, 2025 4:36 pm",
    createdDate: "November 18, 2024 8:51 am",
    trialExpires: "Footprints Bath and Tile Operations",
    subscriptionPlan: "25 Footprints Bath & Tile_Subaccount",
    status: "Active",
    level: 1,
    hasChildren: false
  },
  {
    id: 5,
    company: "Footprints Bath and Tile - Bridgeport",
    accountAdmin: "Alex - Footprints Bath and Tile",
    lastLogin: "September 30, 2024 11:46 am",
    createdDate: "September 20, 2024 8:07 am",
    trialExpires: "Footprints Bath and Tile Operations",
    subscriptionPlan: "25 Footprints Bath & Tile_Subaccount",
    status: "Active",
    level: 1,
    hasChildren: false
  },
  {
    id: 6,
    company: "Footprints Bath and Tile - Carmel",
    accountAdmin: "Kyle - Footprints Bath and Tile",
    lastLogin: "September 30, 2024 12:06 pm",
    createdDate: "September 30, 2024 12:04 pm",
    trialExpires: "Footprints Bath and Tile Operations",
    subscriptionPlan: "25 Footprints Bath & Tile_Subaccount",
    status: "Active",
    level: 1,
    hasChildren: false
  },
  {
    id: 7,
    company: "Footprints Bath and Tile - Central Mass",
    accountAdmin: "Sean - Footprints Bath and Tile",
    lastLogin: "August 1, 2025 2:48 pm",
    createdDate: "March 21, 2025 1:59 pm",
    trialExpires: "Footprints Bath and Tile Operations",
    subscriptionPlan: "25 Footprints Bath & Tile_Subaccount",
    status: "Active",
    level: 1,
    hasChildren: false
  },
  {
    id: 8,
    company: "Footprints Bath and Tile - Charlotte",
    accountAdmin: "Brandon - Footprints Bath and Tile",
    lastLogin: "September 2, 2025 8:51 am",
    createdDate: "September 11, 2024 2:07 pm",
    trialExpires: "Footprints Bath and Tile Operations",
    subscriptionPlan: "25 Footprints Bath & Tile_Subaccount",
    status: "Active",
    level: 1,
    hasChildren: false
  },
  {
    id: 9,
    company: "Footprints Bath and Tile - Columbus",
    accountAdmin: "Clint - Footprints Bath and Tile",
    lastLogin: "August 13, 2025 12:03 pm",
    createdDate: "September 16, 2024 2:59 pm",
    trialExpires: "Footprints Bath and Tile Operations",
    subscriptionPlan: "25 Footprints Bath & Tile_Subaccount",
    status: "Active",
    level: 1,
    hasChildren: false
  },
  {
    id: 10,
    company: "Footprints Bath and Tile - Denver",
    accountAdmin: "Scott - Footprints Bath and Tile",
    lastLogin: "October 2, 2025 7:29 pm",
    createdDate: "March 9, 2020 1:55 pm",
    trialExpires: "Footprints Bath and Tile Operations",
    subscriptionPlan: "25 Footprints Bath & Tile_MultiLevel",
    status: "Active",
    level: 1,
    hasChildren: true
  },
  {
    id: 11,
    company: "Footprints Bath and Tile - Denver Central",
    accountAdmin: "Jordan - Footprints Bath and Tile",
    lastLogin: "July 24, 2024 1:27 pm",
    createdDate: "May 23, 2024 2:53 pm",
    trialExpires: "Scott - Footprints Bath and Tile",
    subscriptionPlan: "25 Footprints Bath & Tile_Subaccount",
    status: "Active",
    level: 2,
    hasChildren: false
  },
  {
    id: 12,
    company: "Footprints Bath and Tile - Denver East",
    accountAdmin: "Namita - Footprints Bath and Tile",
    lastLogin: "October 16, 2024 1:24 pm",
    createdDate: "October 7, 2024 12:37 pm",
    trialExpires: "Scott - Footprints Bath and Tile",
    subscriptionPlan: "25 Footprints Bath & Tile_Subaccount",
    status: "Active",
    level: 2,
    hasChildren: false
  },
];

const AccountsHeader = () => {
  const multiLevelCount = accountsData.filter(a => a.level > 0).length;
  const singleLevelCount = accountsData.filter(a => a.level === 0).length;

  const searchFocusOptions = [
    'Combo',
    'Company Name',
    'Account Admin',
    'Subscription Plan',
    'Status',
    'Created Date',
    'Trial Expires'
  ];

  const handleSearch = (searchValue: string, searchFocus: string) => {
    console.log('Searching accounts:', searchValue, 'in:', searchFocus);
  };

  return (
    <div className="px-3 pt-3 flex-shrink-0">
      <div className="bg-white rounded-3 pt-3 pb-3 px-4 border shadow-sm">
        <h2 className="h4 fw-bold text-dark mb-2">Accounts</h2>
        <div className="d-flex align-items-center justify-content-between">
          <p className="text-secondary mb-0" style={{ fontSize: '0.875rem' }}>
            {multiLevelCount} Multi Level Accounts and {singleLevelCount} Single Level Accounts
          </p>
          <div style={{ width: '400px', fontSize: '0.8125rem' }}>
            <StandardSearch
              placeholder="Search Account..."
              searchFocusOptions={searchFocusOptions}
              onSearch={handleSearch}
              showDropdown={true}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Accounts = (): JSX.Element => {
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>({ key: 'company', direction: 'asc' });

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

  return (
    <div className="d-flex flex-column w-100 h-100">
      <AccountsHeader />

      <div className="px-3 pt-3 pb-3 flex-fill" style={{ minHeight: 0, overflow: 'hidden' }}>
        <div
          className="bg-white rounded-3 border shadow-sm h-100"
          style={{ overflow: 'auto' }}
        >
          <div style={{ minWidth: '1000px' }}>
            <Table className="standard-table table-striped mb-0">
              <caption className="visually-hidden">
                Accounts table showing {accountsData.length} records.
                Use arrow keys to navigate, Enter or Space to sort columns.
                {sortConfig && ` Currently sorted by ${sortConfig.key} in ${sortConfig.direction}ending order.`}
              </caption>
              <TableHeader>
                <TableRow>
                  <TableHead
                    scope="col"
                    {...getSortProps('company')}
                    aria-label={`Sort by company ${sortConfig?.key === 'company' ? sortConfig.direction : 'ascending'}`}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Company{getSortIcon('company')}
                    </span>
                  </TableHead>
                  <TableHead
                    scope="col"
                    {...getSortProps('accountAdmin')}
                    aria-label={`Sort by account admin ${sortConfig?.key === 'accountAdmin' ? sortConfig.direction : 'ascending'}`}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Account Admin{getSortIcon('accountAdmin')}
                    </span>
                  </TableHead>
                  <TableHead
                    scope="col"
                    {...getSortProps('lastLogin')}
                    aria-label={`Sort by last login ${sortConfig?.key === 'lastLogin' ? sortConfig.direction : 'ascending'}`}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Last Login{getSortIcon('lastLogin')}
                    </span>
                  </TableHead>
                  <TableHead
                    scope="col"
                    {...getSortProps('createdDate')}
                    aria-label={`Sort by created date ${sortConfig?.key === 'createdDate' ? sortConfig.direction : 'ascending'}`}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Created Date{getSortIcon('createdDate')}
                    </span>
                  </TableHead>
                  <TableHead
                    scope="col"
                    {...getSortProps('trialExpires')}
                    aria-label={`Sort by trial expires ${sortConfig?.key === 'trialExpires' ? sortConfig.direction : 'ascending'}`}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Trial Expires{getSortIcon('trialExpires')}
                    </span>
                  </TableHead>
                  <TableHead
                    scope="col"
                    {...getSortProps('subscriptionPlan')}
                    aria-label={`Sort by subscription plan ${sortConfig?.key === 'subscriptionPlan' ? sortConfig.direction : 'ascending'}`}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Subscription Plan{getSortIcon('subscriptionPlan')}
                    </span>
                  </TableHead>
                  <TableHead
                    scope="col"
                    {...getSortProps('status')}
                    aria-label={`Sort by status ${sortConfig?.key === 'status' ? sortConfig.direction : 'ascending'}`}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Status{getSortIcon('status')}
                    </span>
                  </TableHead>
                  <TableHead scope="col">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accountsData.map((account, index) => (
                  <TableRow
                    key={account.id}
                    role="row"
                    aria-rowindex={index + 2}
                  >
                    <TableCell role="gridcell">
                      <div
                        className="d-flex align-items-center gap-2"
                        style={{ paddingLeft: `${account.level * 24}px` }}
                      >
                        {account.hasChildren && (
                          <span className="text-warning fw-bold" style={{ fontSize: '1rem' }}>+</span>
                        )}
                        <span className="fw-medium text-dark">{account.company}</span>
                      </div>
                    </TableCell>

                    <TableCell role="gridcell">
                      <div className="text-dark small">{account.accountAdmin}</div>
                    </TableCell>

                    <TableCell role="gridcell">
                      <div className="text-dark small">{account.lastLogin || '-'}</div>
                    </TableCell>

                    <TableCell role="gridcell">
                      <div className="text-dark small">{account.createdDate}</div>
                    </TableCell>

                    <TableCell role="gridcell">
                      <div className="text-dark small">{account.trialExpires}</div>
                    </TableCell>

                    <TableCell role="gridcell">
                      <div className="text-dark small">{account.subscriptionPlan}</div>
                    </TableCell>

                    <TableCell role="gridcell">
                      <span className={`badge ${account.status === 'Active' ? 'bg-success' : 'bg-secondary'} small`}>
                        {account.status}
                      </span>
                    </TableCell>

                    <TableCell role="gridcell">
                      <div className="d-flex gap-1">
                        <Button
                          variant="primary"
                          size="sm"
                          className="px-2 py-1 small"
                          title="Login to this account"
                        >
                          Login
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="px-2 py-1 small"
                          title="Account actions"
                        >
                          Actions
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
