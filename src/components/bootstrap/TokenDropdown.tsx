import React, { useState, useEffect, useRef } from 'react';
import { tokenService } from '../../services/tokenService';
import { TokenCategoryWithTokens } from '../../lib/supabase';

interface TokenDropdownProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const TokenDropdown: React.FC<TokenDropdownProps> = ({
  label,
  placeholder = 'Select a token...',
  value = '',
  onChange,
  className = '',
  style = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [categories, setCategories] = useState<TokenCategoryWithTokens[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tokenService.getAllCategoriesWithTokens();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load token categories:', err);
      setError('Failed to load tokens');
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!loading && !error) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
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
    <div className={`position-relative ${className}`} ref={dropdownRef} style={style}>
      <div className="form-floating-compact">
        <div
          className="form-control d-flex align-items-center justify-content-between position-relative"
          style={{ cursor: loading || error ? 'not-allowed' : 'pointer', minHeight: '38px', paddingRight: '2rem' }}
          onClick={toggleDropdown}
        >
          <span className={selectedValue ? 'text-dark' : 'text-muted'}>
            {loading ? 'Loading...' : error ? 'Error loading tokens' : (selectedValue || placeholder)}
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
      {isOpen && !loading && !error && (
        <div
          className="position-absolute w-100 bg-white border rounded mt-1 shadow-sm"
          style={{ zIndex: 1050, maxHeight: '400px', overflowY: 'auto' }}
        >
          {categories.map((category, categoryIndex) => (
            <React.Fragment key={category.id}>
              <div className="p-2 border-bottom bg-light">
                <small className="fw-semibold text-muted">{category.name}</small>
              </div>
              <div className="p-1">
                {category.tokens.map((token) => (
                  <div
                    key={token.id}
                    className="dropdown-item small py-2"
                    style={{
                      cursor: 'pointer',
                      backgroundColor: selectedValue === token.token_value ? '#f8f9fa' : 'transparent',
                      fontWeight: selectedValue === token.token_value ? 600 : 400
                    }}
                    onClick={(e) => handleSelect(token.token_value, e)}
                    onMouseEnter={(e) => {
                      if (selectedValue !== token.token_value) {
                        e.currentTarget.style.backgroundColor = '#e9ecef';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedValue !== token.token_value) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {token.token_value}
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
