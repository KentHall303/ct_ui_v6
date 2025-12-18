import React from 'react';
import { CalendarEventWithCalendar } from '../../services/calendarService';
import { DayCell } from './DayCell';
import {
  getMonthDays,
  isDateInMonth,
  isToday,
  isEventOnDate
} from '../../utils/dateUtils';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEventWithCalendar[];
  onEventClick?: (event: CalendarEventWithCalendar, clientX?: number, clientY?: number) => void;
  onDateClick?: (date: Date) => void;
}

const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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

  const rowCount = Math.ceil(monthDays.length / 7);

  return (
    <div className="d-flex flex-column" style={{ height: '100%' }}>
      <div className="px-3 pt-3 pb-2 bg-white" style={{ flexShrink: 0 }}>
        <div className="d-grid mb-0" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {weekDays.map((day) => (
            <div key={day} className="text-center py-2 small fw-semibold text-secondary bg-light rounded">
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-fill px-3 pb-3 bg-white" style={{ overflow: 'hidden' }}>
        <div
          className="d-grid h-100"
          style={{
            gridTemplateColumns: 'repeat(7, 1fr)',
            gridTemplateRows: `repeat(${rowCount}, 1fr)`,
            gap: '4px'
          }}
        >
          {monthDays.map((date, index) => {
            const dateEvents = getEventsForDate(date);
            const inCurrentMonth = isDateInMonth(date, currentDate);
            const today = isToday(date);

            return (
              <DayCell
                key={index}
                date={date}
                events={dateEvents}
                inCurrentMonth={inCurrentMonth}
                isToday={today}
                onEventClick={onEventClick}
                onDateClick={onDateClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
