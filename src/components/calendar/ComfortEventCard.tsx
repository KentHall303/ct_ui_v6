import React from 'react';
import { CalendarEventWithCalendar } from '../../services/calendarService';
import { formatTime } from '../../utils/dateUtils';
import { ChevronRight } from 'lucide-react';

type DisplayMode = 'single' | 'multiple';

interface ComfortEventCardProps {
  event: CalendarEventWithCalendar;
  mode: DisplayMode;
  onClick?: (event: CalendarEventWithCalendar, clientX?: number, clientY?: number) => void;
}

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

export const ComfortEventCard: React.FC<ComfortEventCardProps> = ({
  event,
  mode,
  onClick
}) => {
  const calendarColor = event.calendar?.color || '#6b7280';
  const timeDisplay = event.is_all_day
    ? 'All Day'
    : formatTime(event.start_date);

  if (mode === 'single') {
    return (
      <div
        style={{
          padding: '6px 8px',
          borderRadius: '6px',
          backgroundColor: hexToRgba(calendarColor, 0.08),
          borderLeft: `3px solid ${calendarColor}`,
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 0.15s ease'
        }}
        onClick={(e) => onClick?.(event, e.clientX, e.clientY)}
        onMouseEnter={(e) => {
          if (onClick) {
            e.currentTarget.style.backgroundColor = hexToRgba(calendarColor, 0.15);
            e.currentTarget.style.transform = 'translateY(-1px)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = hexToRgba(calendarColor, 0.08);
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div className="d-flex align-items-start gap-2">
          <div style={{ flex: 1, minWidth: 0 }}>
            {event.quote_number && (
              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: calendarColor,
                  marginBottom: '2px'
                }}
              >
                {event.quote_number}
              </div>
            )}
            {event.contact_name && (
              <div
                className="text-truncate fw-semibold"
                style={{
                  fontSize: '0.7rem',
                  color: '#333',
                  lineHeight: 1.3
                }}
              >
                {event.contact_name}
              </div>
            )}
            {!event.contact_name && (
              <div
                className="text-truncate fw-semibold"
                style={{
                  fontSize: '0.7rem',
                  color: '#333',
                  lineHeight: 1.3
                }}
              >
                {event.title}
              </div>
            )}
            {event.description && (
              <div
                className="text-truncate"
                style={{
                  fontSize: '0.6rem',
                  color: '#666',
                  lineHeight: 1.3,
                  marginTop: '2px'
                }}
              >
                {event.description}
              </div>
            )}
          </div>
          <div
            style={{
              fontSize: '0.6rem',
              color: '#888',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {timeDisplay}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="d-flex align-items-center gap-2"
      style={{
        padding: '4px 6px',
        borderRadius: '4px',
        backgroundColor: hexToRgba(calendarColor, 0.08),
        borderLeft: `3px solid ${calendarColor}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.15s ease'
      }}
      onClick={(e) => onClick?.(event, e.clientX, e.clientY)}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = hexToRgba(calendarColor, 0.15);
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = hexToRgba(calendarColor, 0.08);
      }}
    >
      <ChevronRight
        size={12}
        style={{ color: calendarColor, flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="d-flex align-items-center gap-2">
          {event.quote_number && (
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                color: calendarColor
              }}
            >
              {event.quote_number}
            </span>
          )}
          <span
            className="text-truncate"
            style={{
              fontSize: '0.65rem',
              color: '#333',
              fontWeight: 500,
              flex: 1,
              minWidth: 0
            }}
          >
            {event.contact_name || event.title}
          </span>
        </div>
      </div>
      <div
        style={{
          fontSize: '0.6rem',
          color: '#888',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}
      >
        {timeDisplay}
      </div>
    </div>
  );
};
