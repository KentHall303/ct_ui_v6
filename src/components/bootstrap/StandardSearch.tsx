import React from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { X } from "lucide-react";

interface StandardSearchProps {
  placeholder?: string;
  searchFocusOptions?: string[];
  onSearch?: (searchValue: string, searchFocus: string) => void;
  showDropdown?: boolean;
  size?: 'sm' | 'lg';
}

export const StandardSearch: React.FC<StandardSearchProps> = ({
  placeholder = "Search...",
  searchFocusOptions = ['Combo'],
  onSearch,
  showDropdown: showDropdownProp = true,
  size
}) => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [searchFocus, setSearchFocus] = React.useState<string>(searchFocusOptions[0]);
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue, searchFocus);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFocusSelect = (option: string) => {
    setSearchFocus(option);
    setShowDropdown(false);
  };

  return (
    <InputGroup style={{ flexWrap: 'nowrap' }}>
      <div style={{ position: 'relative', flex: '1 1 auto', display: 'flex' }}>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          size={size}
          style={{
            borderRight: 'none',
            paddingRight: searchValue ? '36px' : '12px',
            width: '100%'
          }}
        />
        {searchValue && (
          <div
            onClick={handleClearSearch}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              pointerEvents: 'auto'
            }}
          >
            <X size={16} color="#6c757d" />
          </div>
        )}
      </div>
      <Button
        variant="primary"
        onClick={handleSearch}
        size={size}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: size === 'sm' ? '0.25rem 0.5rem' : '0.375rem 0.5rem',
          borderTopRightRadius: showDropdownProp ? 0 : undefined,
          borderBottomRightRadius: showDropdownProp ? 0 : undefined
        }}
      >
        <svg
          width={size === 'sm' ? '16' : '18'}
          height={size === 'sm' ? '16' : '18'}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </Button>
      {showDropdownProp && (
        <div className="position-relative" ref={dropdownRef}>
          <Button
            variant="secondary"
            onClick={() => setShowDropdown(!showDropdown)}
            size={size}
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
              paddingLeft: size === 'sm' ? '10px' : '12px',
              paddingRight: size === 'sm' ? '10px' : '12px',
              maxWidth: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            title={searchFocus}
          >
            <span style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {searchFocus}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                flexShrink: 0
              }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </Button>
          {showDropdown && (
            <div
              className="position-absolute bg-white border rounded shadow-sm"
              style={{
                top: 'calc(100% + 4px)',
                right: 0,
                minWidth: '200px',
                zIndex: 1050,
                maxHeight: '300px',
                overflowY: 'auto'
              }}
            >
              <div className="p-2 border-bottom bg-light">
                <strong className="small">Search Focus</strong>
              </div>
              {searchFocusOptions.map((option) => (
                <div
                  key={option}
                  className="px-3 py-2 small"
                  style={{
                    cursor: 'pointer',
                    backgroundColor: searchFocus === option ? '#f8f9fa' : 'transparent',
                    fontWeight: searchFocus === option ? 600 : 400
                  }}
                  onClick={() => handleFocusSelect(option)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e9ecef';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = searchFocus === option ? '#f8f9fa' : 'transparent';
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </InputGroup>
  );
};
