import React, { useMemo } from 'react';
import { CalendarEventWithCalendar } from '../../services/calendarService';
import {
  isToday,
  isEventOnDate,
  formatAgendaTime,
  formatAgendaDayHeader
} from '../../utils/dateUtils';

interface AgendaViewProps {
  events: CalendarEventWithCalendar[];
  visibleDates: Date[];
  onEventClick?: (event: CalendarEventWithCalendar, clientX?: number, clientY?: number) => void;
}

interface DayEvents {
  date: Date;
  events: CalendarEventWithCalendar[];
}

function groupEventsByDay(events: CalendarEventWithCalendar[], days: Date[]): DayEvents[] {
  return days.map(date => {
    const dayEvents = events
      .filter(event => isEventOnDate(event.start_date, event.end_date, date))
      .sort((a, b) => {
        if (a.is_all_day && !b.is_all_day) return -1;
        if (!a.is_all_day && b.is_all_day) return 1;
        return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
      });
    return { date, events: dayEvents };
  }).filter(day => day.events.length > 0);
}

interface AgendaDayHeaderProps {
  date: Date;
}

const AgendaDayHeader: React.FC<AgendaDayHeaderProps> = ({ date }) => {
  const today = isToday(date);
  const { day, monthDay } = formatAgendaDayHeader(date);

  return (
    <div
      className="d-flex align-items-center gap-3 py-3"
      style={{ borderBottom: '1px solid #e9ecef' }}
    >
      <div
        className="d-flex align-items-center justify-content-center fw-bold"
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          backgroundColor: today ? '#0d6efd' : 'transparent',
          color: today ? 'white' : '#1a1a1a',
          fontSize: '1.25rem',
          flexShrink: 0
        }}
      >
        {day}
      </div>
      <span
        style={{
          fontSize: '0.8rem',
          fontWeight: 500,
          color: today ? '#0d6efd' : '#6c757d',
          letterSpacing: '0.3px'
        }}
      >
        {monthDay}
      </span>
    </div>
  );
};

interface AgendaEventRowProps {
  event: CalendarEventWithCalendar;
  onClick?: (event: CalendarEventWithCalendar, clientX?: number, clientY?: number) => void;
}

const AgendaEventRow: React.FC<AgendaEventRowProps> = ({ event, onClick }) => {
  const calendarColor = event.calendar?.color || '#6b7280';
  const timeDisplay = formatAgendaTime(event.start_date, event.end_date, event.is_all_day);
  const isCancelled = event.status === 'overdue';

  return (
    <div
      className="d-flex align-items-start gap-3 py-2"
      style={{
        paddingLeft: 56,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background-color 0.15s ease'
      }}
      onClick={(e) => onClick?.(event, e.clientX, e.clientY)}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = '#f8f9fa';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: isCancelled ? 'transparent' : calendarColor,
          border: isCancelled ? `2px solid ${calendarColor}` : 'none',
          flexShrink: 0,
          marginTop: 5
        }}
      />
      <div
        style={{
          width: 110,
          flexShrink: 0,
          fontSize: '0.875rem',
          color: '#495057'
        }}
      >
        {timeDisplay}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontSize: '0.875rem',
            color: '#1a1a1a',
            fontWeight: 500,
            textDecoration: isCancelled ? 'line-through' : 'none'
          }}
        >
          {event.title}
        </span>
        {event.location && (
          <span
            style={{
              fontSize: '0.875rem',
              color: '#6c757d',
              marginLeft: 8
            }}
          >
            {event.location}
          </span>
        )}
      </div>
    </div>
  );
};

export const AgendaView: React.FC<AgendaViewProps> = ({
  events,
  visibleDates,
  onEventClick
}) => {
  const groupedEvents = useMemo(() => groupEventsByDay(events, visibleDates), [events, visibleDates]);

  if (groupedEvents.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center h-100 text-secondary">
        <div style={{ fontSize: '1.25rem', marginBottom: 8 }}>No upcoming events</div>
        <div style={{ fontSize: '0.875rem' }}>Events will appear here when scheduled</div>
      </div>
    );
  }

  return (
    <div className="h-100">
      <div style={{ padding: '0 24px' }}>
        {groupedEvents.map((dayData) => (
          <div key={dayData.date.toISOString()}>
            <AgendaDayHeader date={dayData.date} />
            <div>
              {dayData.events.map((event) => (
                <AgendaEventRow
                  key={event.id}
                  event={event}
                  onClick={onEventClick}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
