import React, { useRef, useLayoutEffect, useState } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import { CalendarHeader } from '../../components/calendar/CalendarHeader';
import { CalendarSidebar } from '../../components/calendar/CalendarSidebar';
import { MonthView } from '../../components/calendar/MonthView';
import { CalendarEventWithEstimator } from '../../services/calendarService';

export const CalendarRedesigned: React.FC = () => {
  const calendar = useCalendar();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    function computeHeight() {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const h = Math.max(400, Math.floor(vh - rect.top - 16));
      setMaxHeight(h);
    }
    computeHeight();
    window.addEventListener('resize', computeHeight);
    return () => window.removeEventListener('resize', computeHeight);
  }, []);

  const handleSelectAll = () => {
    const allEstimatorIds = calendar.estimators.map(e => e.id);
    allEstimatorIds.forEach(id => {
      if (!calendar.selectedEstimators.includes(id)) {
        calendar.toggleEstimator(id);
      }
    });
  };

  const handleClearAll = () => {
    calendar.selectedEstimators.forEach(id => {
      calendar.toggleEstimator(id);
    });
  };

  const handleToggleSidebar = () => {
    calendar.setSidebarCollapsed(!calendar.sidebarCollapsed);
  };

  const handleEventClick = (event: CalendarEventWithEstimator) => {
    console.log('Event clicked:', event);
  };

  const handleDateClick = (date: Date) => {
    console.log('Date clicked:', date);
  };

  return (
    <div className="d-flex flex-column w-100 h-100">
      <div className="flex-shrink-0">
        <CalendarHeader
          currentDate={calendar.currentDate}
          view={calendar.view}
          searchTerm={calendar.searchTerm}
          sidebarCollapsed={calendar.sidebarCollapsed}
          onViewChange={calendar.setView}
          onSearchChange={calendar.setSearchTerm}
          onToday={calendar.goToToday}
          onPrevious={calendar.goToPrevious}
          onNext={calendar.goToNext}
          onToggleSidebar={handleToggleSidebar}
          onNewEvent={() => console.log('New event')}
          onNewMeeting={() => console.log('New meeting')}
          onExport={() => console.log('Export')}
          onSync={() => console.log('Sync')}
        />
      </div>

      <div className="px-3 pt-3 flex-fill" style={{ minHeight: 0 }}>
        <div
          ref={scrollRef}
          className="bg-white rounded-3 border shadow-sm d-flex"
          style={{
            maxHeight: maxHeight ?? undefined,
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <CalendarSidebar
            estimators={calendar.estimators}
            selectedEstimators={calendar.selectedEstimators}
            onToggleEstimator={calendar.toggleEstimator}
            onSelectAll={handleSelectAll}
            onClearAll={handleClearAll}
            collapsed={calendar.sidebarCollapsed}
          />

          <div className="flex-fill d-flex flex-column" style={{ minHeight: 0, overflow: 'hidden' }}>
            {calendar.isLoading ? (
              <div className="d-flex align-items-center justify-content-center flex-fill">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {calendar.view === 'month' && (
                  <MonthView
                    currentDate={calendar.currentDate}
                    events={calendar.events}
                    onEventClick={handleEventClick}
                    onDateClick={handleDateClick}
                  />
                )}
                {calendar.view === 'week' && (
                  <div className="d-flex align-items-center justify-content-center flex-fill text-secondary">
                    Week view coming soon
                  </div>
                )}
                {calendar.view === 'day' && (
                  <div className="d-flex align-items-center justify-content-center flex-fill text-secondary">
                    Day view coming soon
                  </div>
                )}
                {calendar.view === 'agenda' && (
                  <div className="d-flex align-items-center justify-content-center flex-fill text-secondary">
                    Agenda view coming soon
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
