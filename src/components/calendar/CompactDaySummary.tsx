import React from 'react';
import { CalendarEventWithCalendar, Calendar } from '../../services/calendarService';

interface CalendarCount {
  calendar: Calendar;
  count: number;
}

interface CompactDaySummaryProps {
  events: CalendarEventWithCalendar[];
  onCalendarClick?: (calendarId: string) => void;
  showLabels?: boolean;
}

export const CompactDaySummary: React.FC<CompactDaySummaryProps> = ({
  events,
  onCalendarClick,
  showLabels = true
}) => {
  const calendarCounts = React.useMemo(() => {
    const countMap = new Map<string, CalendarCount>();

    events.forEach(event => {
      if (event.calendar) {
        const existing = countMap.get(event.calendar.id);
        if (existing) {
          existing.count++;
        } else {
          countMap.set(event.calendar.id, {
            calendar: event.calendar,
            count: 1
          });
        }
      } else {
        const noCalendarKey = 'no-calendar';
        const existing = countMap.get(noCalendarKey);
        if (existing) {
          existing.count++;
        } else {
          countMap.set(noCalendarKey, {
            calendar: {
              id: noCalendarKey,
              name: 'Other',
              color: '#6b7280',
              is_active: true,
              created_at: '',
              updated_at: ''
            },
            count: 1
          });
        }
      }
    });

    return Array.from(countMap.values()).sort((a, b) => b.count - a.count);
  }, [events]);

  if (calendarCounts.length === 0) {
    return null;
  }

  return (
    <div className="d-flex flex-column gap-1">
      {calendarCounts.map(({ calendar, count }) => (
        <div
          key={calendar.id}
          className="d-flex align-items-center justify-content-between"
          style={{
            padding: '2px 4px',
            borderRadius: '4px',
            cursor: onCalendarClick ? 'pointer' : 'default',
            transition: 'background-color 0.15s ease'
          }}
          onClick={() => onCalendarClick?.(calendar.id)}
          onMouseEnter={(e) => {
            if (onCalendarClick) {
              e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div className="d-flex align-items-center gap-2" style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: calendar.color,
                flexShrink: 0
              }}
            />
            {showLabels && (
              <span
                className="text-truncate"
                style={{
                  fontSize: '0.65rem',
                  color: '#555',
                  lineHeight: 1.2
                }}
              >
                {calendar.name}
              </span>
            )}
          </div>
          <div
            style={{
              backgroundColor: calendar.color,
              color: '#fff',
              fontSize: '0.6rem',
              fontWeight: 600,
              borderRadius: '10px',
              padding: '1px 6px',
              minWidth: '18px',
              textAlign: 'center',
              flexShrink: 0
            }}
          >
            {count}
          </div>
        </div>
      ))}
    </div>
  );
};
