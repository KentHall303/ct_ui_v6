import React from 'react';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronsLeft as ChevronsLeftIcon,
  ChevronsRight as ChevronsRightIcon,
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
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn p-1 text-secondary"
              onClick={onToggleSidebar}
              title={sidebarCollapsed ? 'Show filters' : 'Hide filters'}
              style={{ border: 'none', background: 'transparent' }}
            >
              {sidebarCollapsed ? <PanelLeftOpenIcon size={20} /> : <PanelLeftCloseIcon size={20} />}
            </button>

            <div className="d-flex align-items-baseline gap-3">
              <h1 className="h3 fw-bold text-dark mb-0">Calendar</h1>
              <span className="text-secondary">{formatMonthYear(currentDate)}</span>
            </div>
          </div>

          <CalendarLegend />
        </div>

        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-1">
            <Button
              variant="outline-secondary"
              size="sm"
              className="px-2 py-1"
              onClick={() => {
                onPrevious();
                onPrevious();
              }}
              title="Previous year"
            >
              <ChevronsLeftIcon size={6} />
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              className="px-2 py-1"
              onClick={onPrevious}
              title={view === 'month' ? 'Previous month' : view === 'week' ? 'Previous week' : 'Previous day'}
            >
              <ChevronLeftIcon size={6} />
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
              variant="outline-secondary"
              size="sm"
              className="px-2 py-1"
              onClick={onNext}
              title={view === 'month' ? 'Next month' : view === 'week' ? 'Next week' : 'Next day'}
            >
              <ChevronRightIcon size={6} />
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              className="px-2 py-1"
              onClick={() => {
                onNext();
                onNext();
              }}
              title="Next year"
            >
              <ChevronsRightIcon size={6} />
            </Button>
          </div>

          <div className="btn-group" role="group">
            {viewButtons.map((btn) => (
              <Button
                key={btn.value}
                variant={view === btn.value ? 'primary' : 'outline-secondary'}
                size="sm"
                className="px-3"
                onClick={() => onViewChange(btn.value)}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
