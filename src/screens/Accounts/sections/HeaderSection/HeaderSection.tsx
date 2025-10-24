import React from "react";
import { StandardSearch } from "../../../../components/bootstrap/StandardSearch";

export const HeaderSection = (): JSX.Element => {
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
    <div className="bg-white">
      {/* Title Section */}
      <div className="d-flex align-items-baseline gap-4 mb-1 px-4 pt-2">
        <h1 className="h2 fw-bold text-dark">
          Accounts
        </h1>
        <p className="small text-secondary">
          11 Multi Level Accounts and 1 Single Level Accounts
        </p>
      </div>

      {/* Search Controls */}
      <div className="py-0 px-4 pb-4">
        <div className="d-flex align-items-center justify-content-end">
          <div style={{ width: '420px' }}>
            <StandardSearch
              placeholder="Search Account..."
              searchFocusOptions={searchFocusOptions}
              onSearch={handleSearch}
              showDropdown={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
