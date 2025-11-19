import React from 'react';
import { BodyLayout } from '../../components/layout/BodyLayout/BodyLayout';
import { selectTokenCategories, TokenCategory } from '../../data/tokenData';

interface CategorizedDropdownProps {
  label: string;
  placeholder?: string;
  categories: TokenCategory[];
  value?: string;
  onChange?: (value: string) => void;
}

const CategorizedDropdown: React.FC<CategorizedDropdownProps> = ({
  label,
  placeholder = 'Select an option...',
  categories,
  value = '',
  onChange
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (token: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedValue(token);
    setIsOpen(false);
    if (onChange) {
      onChange(token);
    }
  };

  return (
    <div className="position-relative" ref={dropdownRef}>
      <div className="form-floating-compact">
        <div
          className="form-control d-flex align-items-center justify-content-between position-relative"
          style={{ cursor: 'pointer', minHeight: '38px', paddingRight: '2rem' }}
          onClick={toggleDropdown}
        >
          <span className={selectedValue ? 'text-dark' : 'text-muted'}>
            {selectedValue || placeholder}
          </span>
          <svg
            className="position-absolute end-0 me-2"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              top: '50%',
              marginTop: '-8px'
            }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>
        <label>{label}</label>
      </div>
      {isOpen && (
        <div
          className="position-absolute w-100 bg-white border rounded mt-1 shadow-sm"
          style={{ zIndex: 1050, maxHeight: '400px', overflowY: 'auto' }}
        >
          {categories.map((category, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              <div className="p-2 border-bottom bg-light">
                <small className="fw-semibold text-muted">{category.name}</small>
              </div>
              <div className="p-1">
                {category.tokens.map((token, tokenIndex) => (
                  <div
                    key={`${categoryIndex}-${tokenIndex}`}
                    className="dropdown-item small py-2"
                    style={{
                      cursor: 'pointer',
                      backgroundColor: selectedValue === token ? '#f8f9fa' : 'transparent',
                      fontWeight: selectedValue === token ? 600 : 400
                    }}
                    onClick={(e) => handleSelect(token, e)}
                    onMouseEnter={(e) => {
                      if (selectedValue !== token) {
                        e.currentTarget.style.backgroundColor = '#e9ecef';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedValue !== token) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {token}
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

const Dropdowns = (): JSX.Element => {
  const [selectedToken, setSelectedToken] = React.useState<string>('');

  const handleTokenChange = (value: string) => {
    setSelectedToken(value);
    console.log('Selected token:', value);
  };

  return (
    <div className="d-flex flex-column w-100 h-100">
      <div className="px-3 pt-3 flex-shrink-0">
        <div className="bg-white rounded-3 pt-3 pb-3 px-4 border shadow-sm">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h2 className="h2 fw-bold text-dark mb-2">Dropdowns</h2>
              <p className="text-muted small mb-0">
                Categorized dropdown menus for selecting tokens and other options. Categories are for organization only and cannot be selected.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 pt-3 pb-3 flex-fill" style={{ minHeight: 0, overflow: 'auto' }}>
        <div className="bg-white rounded-3 border shadow-sm p-4">
          <div className="row g-4">
            <div className="col-md-6">
              <h5 className="fw-semibold mb-3">Select Token</h5>
              <CategorizedDropdown
                label="Token"
                placeholder="Select a token..."
                categories={selectTokenCategories}
                value={selectedToken}
                onChange={handleTokenChange}
              />
              {selectedToken && (
                <div className="mt-3 p-3 bg-light rounded">
                  <small className="text-muted">Selected token:</small>
                  <div className="fw-semibold text-dark mt-1">{selectedToken}</div>
                </div>
              )}
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded">
                <h6 className="fw-semibold mb-2">About This Dropdown</h6>
                <ul className="small mb-0">
                  <li>Categories are displayed as headers (non-selectable)</li>
                  <li>Only individual tokens within categories can be selected</li>
                  <li>Tokens are organized by functional groups</li>
                  <li>Dropdown closes when clicking outside</li>
                  <li>Selected value is highlighted in the list</li>
                  <li>Hover states provide visual feedback</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DropdownsTemplatesPage: React.FC = (): JSX.Element => {
  return (
    <BodyLayout>
      <Dropdowns />
    </BodyLayout>
  );
};
