import React, { useRef, useEffect, useMemo } from 'react';
import { CalendarEventWithCalendar } from '../../services/calendarService';
import {
  isToday,
  isSameDay,
  formatTimeRange,
  isEventOnDate
} from '../../utils/dateUtils';

interface DayViewProps {
  currentDate: Date;
  events: CalendarEventWithCalendar[];
  onEventClick?: (event: CalendarEventWithCalendar) => void;
}

const HOUR_HEIGHT = 60;
const TIME_COLUMN_WIDTH = 60;
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function hexToRgba(hex: string, alpha: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return hex;
}

function formatHourLabel(hour: number): string {
  if (hour === 0) return '12 AM';
  if (hour === 12) return '12 PM';
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}

interface PositionedEvent {
  event: CalendarEventWithCalendar;
  top: number;
  height: number;
  left: number;
  width: number;
}

function calculateEventPositions(
  events: CalendarEventWithCalendar[],
  date: Date
): PositionedEvent[] {
  const dayEvents = events
    .filter(event => isEventOnDate(event.start_date, event.end_date, date))
    .map(event => {
      const eventStart = new Date(event.start_date);
      const eventEnd = new Date(event.end_date);
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);

      const effectiveStart = eventStart < dayStart ? dayStart : eventStart;
      const effectiveEnd = eventEnd > dayEnd ? dayEnd : eventEnd;

      const startHour = effectiveStart.getHours();
      const startMinute = effectiveStart.getMinutes();
      const top = (startHour * 60 + startMinute) * (HOUR_HEIGHT / 60);

      const durationMinutes = (effectiveEnd.getTime() - effectiveStart.getTime()) / (1000 * 60);
      const height = Math.max(30, durationMinutes * (HOUR_HEIGHT / 60));

      return {
        event,
        top,
        height,
        startMinutes: startHour * 60 + startMinute,
        endMinutes: startHour * 60 + startMinute + durationMinutes
      };
    })
    .sort((a, b) => a.startMinutes - b.startMinutes);

  const positioned: PositionedEvent[] = [];
  const columns: { endMinutes: number }[] = [];

  for (const evt of dayEvents) {
    let columnIndex = columns.findIndex(col => col.endMinutes <= evt.startMinutes);
    if (columnIndex === -1) {
      columnIndex = columns.length;
      columns.push({ endMinutes: evt.endMinutes });
    } else {
      columns[columnIndex].endMinutes = evt.endMinutes;
    }

    positioned.push({
      event: evt.event,
      top: evt.top,
      height: evt.height,
      left: 0,
      width: 100
    });
  }

  const groups: { events: typeof dayEvents; maxColumns: number }[] = [];
  let currentGroup: typeof dayEvents = [];
  let groupEnd = 0;

  for (const evt of dayEvents) {
    if (currentGroup.length === 0 || evt.startMinutes < groupEnd) {
      currentGroup.push(evt);
      groupEnd = Math.max(groupEnd, evt.endMinutes);
    } else {
      if (currentGroup.length > 0) {
        groups.push({ events: [...currentGroup], maxColumns: 0 });
      }
      currentGroup = [evt];
      groupEnd = evt.endMinutes;
    }
  }
  if (currentGroup.length > 0) {
    groups.push({ events: currentGroup, maxColumns: 0 });
  }

  let posIndex = 0;
  for (const group of groups) {
    const cols: { endMinutes: number }[] = [];
    const assignments: number[] = [];

    for (const evt of group.events) {
      let col = cols.findIndex(c => c.endMinutes <= evt.startMinutes);
      if (col === -1) {
        col = cols.length;
        cols.push({ endMinutes: evt.endMinutes });
      } else {
        cols[col].endMinutes = evt.endMinutes;
      }
      assignments.push(col);
    }

    const numCols = cols.length;
    for (let i = 0; i < group.events.length; i++) {
      positioned[posIndex + i].left = (assignments[i] / numCols) * 100;
      positioned[posIndex + i].width = (1 / numCols) * 100 - 1;
    }
    posIndex += group.events.length;
  }

  return positioned;
}

export const DayView: React.FC<DayViewProps> = ({
  currentDate,
  events,
  onEventClick
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const today = isToday(currentDate);
  const dayOfWeek = currentDate.getDay();

  const positionedEvents = useMemo(
    () => calculateEventPositions(events, currentDate),
    [events, currentDate]
  );

  useEffect(() => {
    if (scrollRef.current) {
      const scrollTo = 9 * HOUR_HEIGHT;
      scrollRef.current.scrollTop = scrollTo;
    }
  }, [currentDate]);

  return (
    <div className="d-flex flex-column h-100 position-relative">
      <div className="flex-shrink-0 bg-white border-bottom">
        <div className="d-flex">
          <div style={{ width: TIME_COLUMN_WIDTH, flexShrink: 0 }} />
          <div className="flex-fill d-flex position-relative">
            <div
              className="flex-fill text-center py-2"
              style={{
                backgroundColor: today ? 'rgba(13, 110, 253, 0.05)' : undefined
              }}
            >
              <div
                className="small fw-semibold"
                style={{
                  color: today ? '#0d6efd' : '#6c757d',
                  fontSize: '0.7rem'
                }}
              >
                {WEEK_DAYS[dayOfWeek]}
              </div>
              <div
                className="fw-bold"
                style={{
                  color: today ? '#0d6efd' : '#212529',
                  fontSize: '1.25rem'
                }}
              >
                {currentDate.getDate()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-fill"
        style={{ overflowY: 'auto', overflowX: 'hidden' }}
      >
        <div className="d-flex" style={{ height: HOUR_HEIGHT * 24 }}>
          <div
            style={{
              width: TIME_COLUMN_WIDTH,
              flexShrink: 0,
              position: 'relative'
            }}
          >
            {HOURS.map(hour => (
              <div
                key={hour}
                className="text-end pe-2 text-secondary"
                style={{
                  position: 'absolute',
                  top: hour * HOUR_HEIGHT - 8,
                  right: 0,
                  fontSize: '0.7rem',
                  lineHeight: 1
                }}
              >
                {hour === 0 ? '' : formatHourLabel(hour)}
              </div>
            ))}
          </div>

          <div className="flex-fill d-flex position-relative">
            {HOURS.map(hour => (
              <div
                key={hour}
                style={{
                  position: 'absolute',
                  top: hour * HOUR_HEIGHT,
                  left: 0,
                  right: 0,
                  height: HOUR_HEIGHT,
                  borderTop: '1px solid #e9ecef'
                }}
              />
            ))}

            <div
              className="flex-fill position-relative"
              style={{
                backgroundColor: today ? 'rgba(13, 110, 253, 0.02)' : undefined
              }}
            >
              {positionedEvents.map((pos, eventIndex) => {
                const calendarColor = pos.event.calendar?.color || '#6b7280';
                const isMultiDay = !isSameDay(pos.event.start_date, pos.event.end_date);
                const startsToday = isSameDay(pos.event.start_date, currentDate);

                return (
                  <div
                    key={`${pos.event.id}-${eventIndex}`}
                    className="position-absolute"
                    style={{
                      top: pos.top,
                      left: `${pos.left}%`,
                      width: `${pos.width}%`,
                      height: pos.height,
                      padding: '0 2px',
                      zIndex: 1
                    }}
                  >
                    <div
                      className="h-100 overflow-hidden"
                      style={{
                        backgroundColor: hexToRgba(calendarColor, 0.15),
                        borderLeft: `3px solid ${calendarColor}`,
                        borderRadius: '4px',
                        padding: '4px 6px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onClick={() => onEventClick?.(pos.event)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = hexToRgba(calendarColor, 0.25);
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.zIndex = '10';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = hexToRgba(calendarColor, 0.15);
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.zIndex = '1';
                      }}
                      title={`${pos.event.title}\n${formatTimeRange(pos.event.start_date, pos.event.end_date)}`}
                    >
                      <div
                        className="fw-bold text-truncate"
                        style={{
                          fontSize: '0.7rem',
                          color: '#333',
                          lineHeight: 1.3
                        }}
                      >
                        {pos.event.title}
                        {isMultiDay && !startsToday && ' (cont.)'}
                      </div>
                      {pos.height > 40 && (
                        <div
                          className="text-truncate"
                          style={{
                            fontSize: '0.65rem',
                            color: '#666',
                            lineHeight: 1.2
                          }}
                        >
                          {formatTimeRange(pos.event.start_date, pos.event.end_date)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
