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
    <div className="bg-white px-4 py-3">
      <div className="d-flex align-items-center justify-content-between">
        {/* Left Section: Title and Subtitle */}
        <div>
          <h1 className="h2 fw-bold text-dark mb-1">
            Accounts
          </h1>
          <p className="small text-secondary mb-0">
            11 Multi Level Accounts and 1 Single Level Accounts
          </p>
        </div>

        {/* Right Section: Search Controls */}
        <div style={{ width: '380px' }}>
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
  );
};
