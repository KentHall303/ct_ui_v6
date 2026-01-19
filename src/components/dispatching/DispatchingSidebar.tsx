import React, { useMemo } from 'react';
import { Button } from '../bootstrap/Button';
import { RefreshCw } from 'lucide-react';
import { CalendarEventWithCalendar } from '../../services/calendarService';

interface EstimatorWithColor {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  color: string;
}

interface DispatchingSidebarProps {
  subcontractors: EstimatorWithColor[];
  selectedSubcontractors: string[];
  onToggleSubcontractor: (name: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onRefresh: () => void;
  collapsed: boolean;
  isLoading?: boolean;
  events?: CalendarEventWithCalendar[];
}

export const DispatchingSidebar: React.FC<DispatchingSidebarProps> = ({
  subcontractors,
  selectedSubcontractors,
  onToggleSubcontractor,
  onSelectAll,
  onClearAll,
  onRefresh,
  collapsed,
  isLoading = false,
  events = []
}) => {
  const eventCountsByUser = useMemo(() => {
    const counts: Record<string, number> = {};
    events.forEach(event => {
      if (event.estimator?.name) {
        counts[event.estimator.name] = (counts[event.estimator.name] || 0) + 1;
      }
    });
    return counts;
  }, [events]);

  if (collapsed) {
    return null;
  }

  const allSelected = selectedSubcontractors.length === subcontractors.length;
  const noneSelected = selectedSubcontractors.length === 0;

  return (
    <div className="border-end bg-light" style={{ width: '300px', flexShrink: 0, overflowY: 'auto', maxHeight: '100%' }}>
      <div className="p-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="fw-bold text-dark mb-0">Users</h6>
          <Button
            variant="link"
            size="sm"
            className="p-0 text-decoration-none"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? 'spin' : ''} />
          </Button>
        </div>

        <div className="d-flex gap-2 mb-3">
          <Button
            variant="outline-secondary"
            size="sm"
            className="flex-fill small"
            onClick={onSelectAll}
            disabled={allSelected}
          >
            Select All
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            className="flex-fill small"
            onClick={onClearAll}
            disabled={noneSelected}
          >
            Clear All
          </Button>
        </div>

        <div className="bg-white rounded-3 shadow-sm p-3">
          <div className="d-flex flex-column gap-3">
            {subcontractors.map((subcontractor) => {
              const isSelected = selectedSubcontractors.includes(subcontractor.name);
              const eventCount = eventCountsByUser[subcontractor.name] || 0;
              return (
                <label
                  key={subcontractor.id}
                  className="d-flex align-items-center gap-3"
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSubcontractor(subcontractor.name)}
                    className="d-none"
                  />
                  <div
                    className="rounded d-flex align-items-center justify-content-center"
                    style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: isSelected ? subcontractor.color : 'transparent',
                      border: `2px solid ${subcontractor.color}`,
                      transition: 'all 0.15s ease',
                      flexShrink: 0
                    }}
                  >
                    {isSelected && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <div className="d-flex flex-column flex-fill" style={{ minWidth: 0 }}>
                    <span
                      className={`text-dark ${isSelected ? 'fw-bold' : ''}`}
                      style={{ fontSize: '0.95rem' }}
                    >
                      {subcontractor.name}
                    </span>
                    {(subcontractor.email || subcontractor.phone) && (
                      <span className="text-muted" style={{ fontSize: '0.7rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {subcontractor.email || subcontractor.phone}
                      </span>
                    )}
                  </div>
                  {eventCount > 0 && (
                    <span
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: subcontractor.color,
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        minWidth: '20px',
                        height: '20px',
                        borderRadius: '10px',
                        padding: '0 6px',
                        flexShrink: 0
                      }}
                    >
                      {eventCount}
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {subcontractors.length === 0 && (
          <div className="text-center text-secondary small py-4">
            No users available
          </div>
        )}
      </div>

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
