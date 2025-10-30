import React from "react";
import { BodyLayout } from "../../components/layout/BodyLayout/BodyLayout";
import { Button } from "../../components/bootstrap/Button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/bootstrap/Table";

function parseDateString(dateStr: string): Date | null {
  if (!dateStr || dateStr.trim() === '') return null;
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function sortAccounts(accounts: Account[], key: string, direction: 'asc' | 'desc'): Account[] {
  const dateColumns = ['lastLogin', 'createdDate'];
  const isDateColumn = dateColumns.includes(key);

  const sorted = [...accounts].sort((a, b) => {
    let aVal = a[key as keyof Account];
    let bVal = b[key as keyof Account];

    if (isDateColumn) {
      const aDate = parseDateString(String(aVal));
      const bDate = parseDateString(String(bVal));

      if (aDate === null && bDate === null) return 0;
      if (aDate === null) return 1;
      if (bDate === null) return -1;

      return direction === 'asc'
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    }

    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();

    if (aStr < bStr) return direction === 'asc' ? -1 : 1;
    if (aStr > bStr) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
}

function buildHierarchy(accounts: Account[]): Account[] {
  const result: Account[] = [];
  const accountMap = new Map<number, Account>();

  accounts.forEach(acc => accountMap.set(acc.id, acc));

  accounts.forEach(account => {
    if (account.level === 0) {
      result.push(account);
      addChildren(account, accounts, result);
    }
  });

  return result;
}

function addChildren(parent: Account, allAccounts: Account[], result: Account[]) {
  const parentIndex = allAccounts.indexOf(parent);

  for (let i = parentIndex + 1; i < allAccounts.length; i++) {
    const account = allAccounts[i];

    if (account.level <= parent.level) {
      break;
    }

    if (account.level === parent.level + 1) {
      result.push(account);
      if (account.hasChildren) {
        addChildren(account, allAccounts, result);
      }
    }
  }
}

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

const TableStandards = (): JSX.Element => {
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>({ key: 'company', direction: 'asc' });

  const [expandedRows, setExpandedRows] = React.useState<Set<number>>(new Set());

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = React.useState<number | null>(null);

  const handleSort = (key: string) => {
    setExpandedRows(new Set());
    setSortConfig(current => {
      if (current?.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const toggleRow = (accountId: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(accountId)) {
        newSet.delete(accountId);
      } else {
        newSet.add(accountId);
      }
      return newSet;
    });
  };

  const isRowVisible = (account: Account, index: number): boolean => {
    if (account.level === 0) return true;

    for (let i = index - 1; i >= 0; i--) {
      const potentialParent = sortedAndFilteredData[i];

      if (potentialParent.level < account.level) {
        if (potentialParent.level === account.level - 1) {
          if (!expandedRows.has(potentialParent.id)) {
            return false;
          }
        }

        if (potentialParent.level === 0) {
          break;
        }
      }
    }

    return true;
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return ' ▲';
  };

  const sortedAndFilteredData = React.useMemo(() => {
    if (!sortConfig) return accountsData;

    const topLevelAccounts = accountsData.filter(acc => acc.level === 0);
    const sortedTopLevel = sortAccounts(topLevelAccounts, sortConfig.key, sortConfig.direction);

    const result: Account[] = [];
    sortedTopLevel.forEach(parent => {
      result.push(parent);
      addChildren(parent, accountsData, result);
    });

    return result;
  }, [sortConfig]);

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

  React.useLayoutEffect(() => {
    function computeHeight() {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const h = Math.max(200, Math.floor(vh - rect.top - 16));
      setMaxHeight(h);
    }
    computeHeight();
    window.addEventListener("resize", computeHeight);
    return () => window.removeEventListener("resize", computeHeight);
  }, []);

  return (
    <div className="d-flex flex-column w-100 h-100">
      <div className="px-3 pt-3">
        <div
          ref={scrollRef}
          className="bg-white rounded-3 overflow-auto border shadow-sm"
          style={{ maxHeight: maxHeight ?? undefined }}
        >
          <div style={{ minWidth: '1000px' }}>
            <Table className="contacts-table position-relative">
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
                    Company{getSortIcon('company')}
                  </TableHead>
                  <TableHead
                    scope="col"
                    {...getSortProps('accountAdmin')}
                    aria-label={`Sort by account admin ${sortConfig?.key === 'accountAdmin' ? sortConfig.direction : 'ascending'}`}
                  >
                    Account Admin{getSortIcon('accountAdmin')}
                  </TableHead>
                  <TableHead
                    scope="col"
                    {...getSortProps('lastLogin')}
                    aria-label={`Sort by last login ${sortConfig?.key === 'lastLogin' ? sortConfig.direction : 'ascending'}`}
                  >
                    Last Login{getSortIcon('lastLogin')}
                  </TableHead>
                  <TableHead
                    scope="col"
                    {...getSortProps('createdDate')}
                    aria-label={`Sort by created date ${sortConfig?.key === 'createdDate' ? sortConfig.direction : 'ascending'}`}
                  >
                    Created Date{getSortIcon('createdDate')}
                  </TableHead>
                  <TableHead
                    scope="col"
                    {...getSortProps('trialExpires')}
                    aria-label={`Sort by trial expires ${sortConfig?.key === 'trialExpires' ? sortConfig.direction : 'ascending'}`}
                  >
                    Trial Expires{getSortIcon('trialExpires')}
                  </TableHead>
                  <TableHead
                    scope="col"
                    {...getSortProps('subscriptionPlan')}
                    aria-label={`Sort by subscription plan ${sortConfig?.key === 'subscriptionPlan' ? sortConfig.direction : 'ascending'}`}
                  >
                    Subscription Plan{getSortIcon('subscriptionPlan')}
                  </TableHead>
                  <TableHead
                    scope="col"
                    {...getSortProps('status')}
                    aria-label={`Sort by status ${sortConfig?.key === 'status' ? sortConfig.direction : 'ascending'}`}
                  >
                    Status{getSortIcon('status')}
                  </TableHead>
                  <TableHead scope="col">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAndFilteredData.map((account, index) => {
                  const isVisible = isRowVisible(account, index);
                  const isExpanded = expandedRows.has(account.id);

                  return (
                    <TableRow
                      key={account.id}
                      role="row"
                      aria-rowindex={index + 2}
                      style={{ display: isVisible ? '' : 'none' }}
                    >
                      <TableCell role="gridcell">
                        <div
                          className="d-flex align-items-center gap-2"
                          style={{ paddingLeft: `${account.level * 24}px` }}
                        >
                          {account.hasChildren && (
                            <span
                              className="text-warning fw-bold"
                              style={{ fontSize: '1rem', cursor: 'pointer', userSelect: 'none' }}
                              onClick={() => toggleRow(account.id)}
                              role="button"
                              aria-label={isExpanded ? 'Collapse' : 'Expand'}
                            >
                              {isExpanded ? '−' : '+'}
                            </span>
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
                      <span className={`badge badge-table-status ${account.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                        {account.status}
                      </span>
                    </TableCell>

                      <TableCell role="gridcell">
                        <div className="d-flex gap-1">
                          <Button
                            variant="primary"
                            size="sm"
                            className="px-2 py-1"
                            title="Login to this account"
                          >
                            Login
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="px-2 py-1"
                            title="Account actions"
                          >
                            Actions
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TableStandardsPage = (): JSX.Element => {
  return (
    <BodyLayout>
      <TableStandards />
    </BodyLayout>
  );
};
