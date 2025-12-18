import React from 'react';
import { CalendarEventWithCalendar } from '../../services/calendarService';
import { EventCard } from './EventCard';
import {
  getMonthDays,
  isDateInMonth,
  isToday,
  isEventOnDate
} from '../../utils/dateUtils';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEventWithCalendar[];
  onEventClick?: (event: CalendarEventWithCalendar) => void;
  onDateClick?: (date: Date) => void;
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onEventClick,
  onDateClick
}) => {
  const monthDays = getMonthDays(currentDate);

  const getEventsForDate = (date: Date): CalendarEventWithCalendar[] => {
    return events.filter(event =>
      isEventOnDate(event.start_date, event.end_date, date)
    ).sort((a, b) => {
      if (a.is_all_day && !b.is_all_day) return -1;
      if (!a.is_all_day && b.is_all_day) return 1;
      return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
    });
  };

  return (
    <div className="d-flex flex-column" style={{ height: '100%' }}>
      <div className="px-3 pt-3 pb-2 bg-white">
        <div className="d-grid mb-0" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {weekDays.map((day) => (
            <div key={day} className="text-center py-2 small fw-semibold text-secondary bg-light rounded">
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-fill px-3 pb-3 bg-white" style={{ overflowY: 'auto' }}>
        <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {monthDays.map((date, index) => {
            const dateEvents = getEventsForDate(date);
            const inCurrentMonth = isDateInMonth(date, currentDate);
            const today = isToday(date);

            return (
              <div
                key={index}
                className={`border rounded p-2 ${
                  inCurrentMonth ? 'bg-white' : 'bg-light'
                } ${today ? 'border-primary border-2 shadow-sm' : 'border-1'}`}
                style={{
                  minHeight: '120px',
                  cursor: inCurrentMonth ? 'pointer' : 'default',
                  transition: 'all 0.15s ease',
                  opacity: inCurrentMonth ? 1 : 0.5
                }}
                onClick={() => inCurrentMonth && onDateClick?.(date)}
                onMouseEnter={(e) => {
                  if (inCurrentMonth) {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (inCurrentMonth) {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div
                  className={`small mb-2 ${today ? 'fw-bold text-primary' : 'text-secondary'}`}
                  style={{ fontSize: '0.75rem' }}
                >
                  {date.getDate()}
                </div>
                {dateEvents.length > 0 && (
                  <div className="d-flex flex-column gap-1">
                    {dateEvents.slice(0, 3).map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        date={date}
                        onClick={(e) => {
                          onEventClick?.(event);
                        }}
                      />
                    ))}
                    {dateEvents.length > 3 && (
                      <div
                        className="small text-primary fw-semibold text-center"
                        style={{ fontSize: '0.65rem', cursor: 'pointer' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDateClick?.(date);
                        }}
                      >
                        +{dateEvents.length - 3} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
