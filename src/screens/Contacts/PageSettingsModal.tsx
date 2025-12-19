import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { Button } from '../../components/bootstrap/Button';
import { X } from 'lucide-react';

export interface ColumnOption {
  id: string;
  label: string;
}

interface PageSettingsModalProps {
  show: boolean;
  onHide: () => void;
  columns: ColumnOption[];
  visibleColumns: string[];
  pageSize: number;
  onUpdate: (visibleColumns: string[], pageSize: number) => void;
}

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 150, 250, 500];

export const PageSettingsModal: React.FC<PageSettingsModalProps> = ({
  show,
  onHide,
  columns,
  visibleColumns,
  pageSize,
  onUpdate,
}) => {
  const [localVisibleColumns, setLocalVisibleColumns] = React.useState<string[]>(visibleColumns);
  const [localPageSize, setLocalPageSize] = React.useState<number>(pageSize);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setLocalVisibleColumns(visibleColumns);
    setLocalPageSize(pageSize);
  }, [visibleColumns, pageSize, show]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleColumnToggle = (columnId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalVisibleColumns(prev =>
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  };

  const removeColumn = (columnId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalVisibleColumns(prev => prev.filter(id => id !== columnId));
  };

  const handleUpdate = () => {
    onUpdate(localVisibleColumns, localPageSize);
    onHide();
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectedColumns = columns.filter(col => localVisibleColumns.includes(col.id));

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="h5">Page Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <label className="form-label fw-semibold mb-2">Display Columns</label>
          <div className="position-relative" ref={dropdownRef}>
            <div
              className="form-control d-flex flex-wrap gap-1 align-items-center position-relative"
              style={{ minHeight: '38px', cursor: 'pointer', paddingRight: '2rem' }}
              onClick={toggleDropdown}
            >
              {selectedColumns.length > 0 ? (
                selectedColumns.map(col => (
                  <span key={col.id} className="badge bg-primary d-flex align-items-center gap-1">
                    {col.label}
                    <button
                      type="button"
                      className="btn-close btn-close-white p-0 ms-1"
                      style={{ fontSize: '0.5em', width: '12px', height: '12px' }}
                      onClick={(e) => removeColumn(col.id, e)}
                      aria-label={`Remove ${col.label}`}
                    />
                  </span>
                ))
              ) : (
                <span className="text-muted">Click to select columns</span>
              )}
              <svg
                className="position-absolute end-0 me-2"
                style={{
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
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
            {isDropdownOpen && (
              <div
                className="position-absolute w-100 bg-white border rounded mt-1 shadow-sm"
                style={{ zIndex: 1050, maxHeight: '200px', overflowY: 'auto' }}
              >
                <div className="p-1">
                  {columns.map((column) => (
                    <div
                      key={column.id}
                      className="dropdown-item small py-2 d-flex align-items-center justify-content-between"
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => handleColumnToggle(column.id, e)}
                    >
                      <span>{column.label}</span>
                      {localVisibleColumns.includes(column.id) && (
                        <X size={14} className="text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex align-items-center gap-3">
            <label className="form-label fw-semibold mb-0" style={{ whiteSpace: 'nowrap' }}>
              Contacts Per Page:
            </label>
            <Form.Select
              value={localPageSize}
              onChange={(e) => setLocalPageSize(Number(e.target.value))}
              style={{ width: '100px' }}
              size="sm"
            >
              {PAGE_SIZE_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Form.Select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-top justify-content-center">
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
