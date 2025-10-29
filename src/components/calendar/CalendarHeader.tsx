import React from 'react';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronsLeft as ChevronsLeftIcon,
  ChevronsRight as ChevronsRightIcon,
  Plus as PlusIcon,
  Video as VideoIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  PanelLeftClose as PanelLeftCloseIcon,
  PanelLeftOpen as PanelLeftOpenIcon
} from 'lucide-react';
import { Button } from '../bootstrap/Button';
import { FloatingInput } from '../bootstrap/FormControls';
import { CalendarLegend } from './CalendarLegend';
import { CalendarView } from '../../hooks/useCalendar';
import { formatMonthYear } from '../../utils/dateUtils';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  searchTerm: string;
  sidebarCollapsed: boolean;
  onViewChange: (view: CalendarView) => void;
  onSearchChange: (term: string) => void;
  onToday: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleSidebar: () => void;
  onNewEvent?: () => void;
  onNewMeeting?: () => void;
  onExport?: () => void;
  onSync?: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  searchTerm,
  sidebarCollapsed,
  onViewChange,
  onSearchChange,
  onToday,
  onPrevious,
  onNext,
  onToggleSidebar,
  onNewEvent,
  onNewMeeting,
  onExport,
  onSync
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
          <div className="d-flex align-items-center gap-3">
            <Button
              variant="outline-secondary"
              size="sm"
              className="p-2"
              onClick={onToggleSidebar}
              title={sidebarCollapsed ? 'Show filters' : 'Hide filters'}
            >
              {sidebarCollapsed ? <PanelLeftOpenIcon size={16} /> : <PanelLeftCloseIcon size={16} />}
            </Button>

            <div className="d-flex align-items-baseline gap-3">
              <h1 className="h3 fw-bold text-dark mb-0">Calendar</h1>
              <span className="text-secondary">{formatMonthYear(currentDate)}</span>
            </div>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            {onNewEvent && (
              <Button
                variant="success"
                className="rounded-pill d-flex align-items-center gap-2 btn-pill-custom"
                onClick={onNewEvent}
              >
                <PlusIcon size={14} />
                <span className="d-none d-lg-inline">New Event</span>
              </Button>
            )}
            {onNewMeeting && (
              <Button
                variant="primary"
                className="rounded-pill d-flex align-items-center gap-2 btn-pill-custom"
                onClick={onNewMeeting}
              >
                <VideoIcon size={14} />
                <span className="d-none d-lg-inline">New Meeting</span>
              </Button>
            )}
            {onExport && (
              <Button
                variant="outline-primary"
                className="rounded-pill d-flex align-items-center gap-2"
                onClick={onExport}
              >
                <DownloadIcon size={14} />
                <span className="d-none d-lg-inline">Export</span>
              </Button>
            )}
            {onSync && (
              <Button
                variant="outline-primary"
                className="rounded-pill d-flex align-items-center gap-2"
                onClick={onSync}
              >
                <UploadIcon size={14} />
                <span className="d-none d-lg-inline">Sync</span>
              </Button>
            )}
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              className="p-2"
              onClick={() => {
                onPrevious();
                onPrevious();
              }}
              title="Previous year"
            >
              <ChevronsLeftIcon size={16} />
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              className="p-2"
              onClick={onPrevious}
              title={view === 'month' ? 'Previous month' : view === 'week' ? 'Previous week' : 'Previous day'}
            >
              <ChevronLeftIcon size={16} />
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
              className="p-2"
              onClick={onNext}
              title={view === 'month' ? 'Next month' : view === 'week' ? 'Next week' : 'Next day'}
            >
              <ChevronRightIcon size={16} />
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              className="p-2"
              onClick={() => {
                onNext();
                onNext();
              }}
              title="Next year"
            >
              <ChevronsRightIcon size={16} />
            </Button>
          </div>

          <div className="d-flex align-items-center gap-3 flex-wrap">
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

            <div style={{ width: '280px' }}>
              <FloatingInput
                label="Search events..."
                placeholder="Quote number, contact, etc."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-top">
          <CalendarLegend />
        </div>
      </div>
    </div>
  );
};
