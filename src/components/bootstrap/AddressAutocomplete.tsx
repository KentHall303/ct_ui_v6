import React, { useState, useRef, useEffect, useCallback } from "react";
import { Form } from "react-bootstrap";
import { MapPin, Loader2 } from "lucide-react";
import { searchAddresses, AddressSuggestion } from "../../data/mockAddressData";

interface AddressAutocompleteProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onAddressSelect: (address: AddressSuggestion) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  label,
  value,
  onChange,
  onAddressSelect,
  className = "",
  disabled = false,
  placeholder = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const autoId = React.useId();
  const controlId = `addr-${autoId}`;

  const handleSearch = useCallback((query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      const results = searchAddresses(query);
      setSuggestions(results);
      setIsOpen(results.length > 0);
      setHighlightedIndex(-1);
      setIsSearching(false);
    }, 100);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    handleSearch(newValue);
  };

  const handleSelectAddress = (address: AddressSuggestion) => {
    onChange(address.streetAddress);
    onAddressSelect(address);
    setIsOpen(false);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleSelectAddress(suggestions[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      case "Tab":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`
      );
      highlightedElement?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  return (
    <div className={`address-autocomplete-wrapper position-relative ${className}`}>
      <Form.Floating className="form-floating-compact">
        <Form.Control
          ref={inputRef}
          id={controlId}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (value.length >= 2) {
              handleSearch(value);
            }
          }}
          disabled={disabled}
          autoComplete="off"
          dir="ltr"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />
        <Form.Label htmlFor={controlId}>{label}</Form.Label>
        {isSearching && (
          <span
            className="position-absolute"
            style={{
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <Loader2 size={16} className="text-muted animate-spin" />
          </span>
        )}
      </Form.Floating>

      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="address-dropdown"
          role="listbox"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1050,
            backgroundColor: "#fff",
            border: "1px solid #dee2e6",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            maxHeight: "280px",
            overflowY: "auto",
            marginTop: "4px",
          }}
        >
          <div
            className="px-3 py-2 text-muted small border-bottom"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <MapPin size={12} className="me-1" style={{ marginTop: "-2px" }} />
            Demo addresses - Select one to auto-fill
          </div>
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              data-index={index}
              role="option"
              aria-selected={highlightedIndex === index}
              onClick={() => handleSelectAddress(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className="address-suggestion-item"
              style={{
                padding: "10px 14px",
                cursor: "pointer",
                backgroundColor:
                  highlightedIndex === index ? "#e9f5ff" : "transparent",
                borderBottom:
                  index < suggestions.length - 1 ? "1px solid #f0f0f0" : "none",
                transition: "background-color 0.15s ease",
              }}
            >
              <div
                className="d-flex align-items-start gap-2"
              >
                <MapPin
                  size={16}
                  className="text-secondary flex-shrink-0"
                  style={{ marginTop: "2px" }}
                />
                <div className="flex-grow-1 min-w-0">
                  <div
                    className="fw-medium text-dark"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {suggestion.streetAddress}
                  </div>
                  <div className="text-muted small">
                    {suggestion.city}, {suggestion.state} {suggestion.postalCode}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .address-autocomplete-wrapper .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .address-suggestion-item:hover {
          background-color: #e9f5ff !important;
        }
        .address-dropdown::-webkit-scrollbar {
          width: 6px;
        }
        .address-dropdown::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .address-dropdown::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .address-dropdown::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </div>
  );
};
