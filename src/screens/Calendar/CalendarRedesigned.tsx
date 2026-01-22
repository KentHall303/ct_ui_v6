import React, { useRef, useLayoutEffect, useState } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import { CalendarHeader } from '../../components/calendar/CalendarHeader';
import { CalendarSidebar } from '../../components/calendar/CalendarSidebar';
import { MonthView } from '../../components/calendar/MonthView';
import { WeekView } from '../../components/calendar/WeekView';
import { DayView } from '../../components/calendar/DayView';
import { AgendaView } from '../../components/calendar/AgendaView';
import { CalendarEventWithCalendar } from '../../services/calendarService';
import { EventDetailsPopup } from '../../components/calendar/EventDetailsPopup';

export const CalendarRedesigned: React.FC = () => {
  const calendar = useCalendar();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEventWithCalendar | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

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

  const handleToggleSidebar = () => {
    calendar.setSidebarCollapsed(!calendar.sidebarCollapsed);
  };

  const handleEventClick = (event: CalendarEventWithCalendar, clientX?: number, clientY?: number) => {
    setSelectedEvent(event);
    setPopupPosition({
      x: clientX ?? window.innerWidth / 2,
      y: clientY ?? window.innerHeight / 2
    });
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedEvent(null);
  };

  const handleDateClick = (date: Date) => {
    calendar.setCurrentDate(date);
    calendar.setView('day');
  };

  const handleRefresh = () => {
    calendar.refreshData();
  };

  return (
    <div className="d-flex flex-column w-100 h-100">
      <div className="flex-shrink-0">
        <CalendarHeader
          currentDate={calendar.currentDate}
          view={calendar.view}
          sidebarCollapsed={calendar.sidebarCollapsed}
          agendaVisibleDates={calendar.agendaVisibleDates}
          onViewChange={calendar.setView}
          onToday={calendar.goToToday}
          onPrevious={calendar.goToPrevious}
          onNext={calendar.goToNext}
          onToggleSidebar={handleToggleSidebar}
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
            calendars={calendar.calendars}
            selectedCalendars={calendar.selectedCalendars}
            onToggleCalendar={calendar.toggleCalendar}
            onSelectAll={calendar.selectAllCalendars}
            onClearAll={calendar.clearAllCalendars}
            onRefresh={handleRefresh}
            collapsed={calendar.sidebarCollapsed}
            isLoading={calendar.isLoading}
            events={calendar.events}
            view={calendar.view}
            currentDate={calendar.currentDate}
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
                  <WeekView
                    currentDate={calendar.currentDate}
                    events={calendar.events}
                    onEventClick={handleEventClick}
                  />
                )}
                {calendar.view === 'day' && (
                  <DayView
                    currentDate={calendar.currentDate}
                    events={calendar.events}
                    onEventClick={handleEventClick}
                  />
                )}
                {calendar.view === 'agenda' && (
                  <AgendaView
                    events={calendar.events}
                    visibleDates={calendar.agendaVisibleDates}
                    onEventClick={handleEventClick}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {showPopup && selectedEvent && (
        <EventDetailsPopup
          event={selectedEvent}
          position={popupPosition}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};
