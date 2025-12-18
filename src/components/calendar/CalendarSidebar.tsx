import React from 'react';
import { Button } from '../bootstrap/Button';
import { Calendar } from '../../services/calendarService';
import { RefreshCw } from 'lucide-react';

interface CalendarSidebarProps {
  calendars: Calendar[];
  selectedCalendars: string[];
  onToggleCalendar: (calendarId: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onRefresh: () => void;
  collapsed: boolean;
  isLoading?: boolean;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  calendars,
  selectedCalendars,
  onToggleCalendar,
  onSelectAll,
  onClearAll,
  onRefresh,
  collapsed,
  isLoading = false
}) => {
  if (collapsed) {
    return null;
  }

  const activeCalendars = calendars.filter(c => c.is_active);
  const allSelected = selectedCalendars.length === activeCalendars.length;
  const noneSelected = selectedCalendars.length === 0;

  return (
    <div className="border-end bg-light" style={{ width: '300px', flexShrink: 0, overflowY: 'auto', maxHeight: '100%' }}>
      <div className="p-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="fw-bold text-dark mb-0">My Calendars</h6>
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
            {activeCalendars.map((calendar) => {
              const isSelected = selectedCalendars.includes(calendar.id);
              return (
                <label
                  key={calendar.id}
                  className="d-flex align-items-center gap-3"
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleCalendar(calendar.id)}
                    className="d-none"
                  />
                  <div
                    className="rounded d-flex align-items-center justify-content-center"
                    style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: isSelected ? calendar.color : 'transparent',
                      border: `2px solid ${calendar.color}`,
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
                  <span className="fw-medium text-dark" style={{ fontSize: '0.95rem' }}>
                    {calendar.name}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {activeCalendars.length === 0 && (
          <div className="text-center text-secondary small py-4">
            No calendars available
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
