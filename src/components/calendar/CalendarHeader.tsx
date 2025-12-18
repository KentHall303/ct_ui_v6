import React from 'react';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  PanelLeftClose as PanelLeftCloseIcon,
  PanelLeftOpen as PanelLeftOpenIcon
} from 'lucide-react';
import { Button } from '../bootstrap/Button';
import { CalendarLegend } from './CalendarLegend';
import { CalendarView } from '../../hooks/useCalendar';
import { formatMonthYear } from '../../utils/dateUtils';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  sidebarCollapsed: boolean;
  onViewChange: (view: CalendarView) => void;
  onToday: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleSidebar: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  sidebarCollapsed,
  onViewChange,
  onToday,
  onPrevious,
  onNext,
  onToggleSidebar
}) => {
  const viewButtons: Array<{ value: CalendarView; label: string }> = [
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' },
    { value: 'day', label: 'Day' },
    { value: 'agenda', label: 'Agenda' }
  ];

  return (
    <div className="px-3 pt-3">
      <div className="bg-white rounded-3 pt-3 pb-3 px-3 border shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-3">
          <div className="d-flex align-items-baseline gap-3">
            <h1 className="h3 fw-bold text-dark mb-0">Calendar</h1>
          </div>

          <CalendarLegend />
        </div>

        <div className="d-flex align-items-center gap-3" style={{ justifyContent: 'space-between', flex: 1 }}>
          <div className="d-flex align-items-center gap-2" style={{ flexShrink: 0 }}>
            <button
              type="button"
              className="btn p-1 text-secondary"
              onClick={onToggleSidebar}
              title={sidebarCollapsed ? 'Show filters' : 'Hide filters'}
              style={{ border: 'none', background: 'transparent', flexShrink: 0 }}
            >
              {sidebarCollapsed ? <PanelLeftOpenIcon size={20} /> : <PanelLeftCloseIcon size={20} />}
            </button>

            <div style={{
              border: '1px solid #f8f9fa',
              borderRadius: '6px',
              padding: '2px'
            }}>
              <div className="btn-group" role="group">
                {viewButtons.map((btn) => (
                  <Button
                    key={btn.value}
                    variant={view === btn.value ? 'primary' : 'link'}
                    size="sm"
                    className={view === btn.value ? 'px-3' : 'px-3 text-secondary text-decoration-none'}
                    onClick={() => onViewChange(btn.value)}
                    style={view === btn.value ? undefined : { backgroundColor: '#e9ecef' }}
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            </div>

            <span className="text-secondary">{formatMonthYear(currentDate)}</span>
          </div>

          <div className="d-flex align-items-center gap-2" style={{ flexShrink: 0 }}>
            <Button
              variant="link"
              size="sm"
              className="p-1 text-secondary text-decoration-none"
              onClick={onPrevious}
              title={view === 'month' ? 'Previous month' : view === 'week' ? 'Previous week' : 'Previous day'}
            >
              <ChevronLeftIcon size={20} />
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="px-4"
              onClick={onToday}
            >
              Today
            </Button>

            <Button
              variant="link"
              size="sm"
              className="p-1 text-secondary text-decoration-none"
              onClick={onNext}
              title={view === 'month' ? 'Next month' : view === 'week' ? 'Next week' : 'Next day'}
            >
              <ChevronRightIcon size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
