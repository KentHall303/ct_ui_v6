import React from 'react';
import { CalendarEventWithCalendar } from '../../services/calendarService';
import { formatTime, isEventStart, isEventEnd, isEventMiddle } from '../../utils/dateUtils';
import { Edit } from 'lucide-react';

interface EventCardProps {
  event: CalendarEventWithCalendar;
  date: Date;
  onClick?: (event: CalendarEventWithCalendar) => void;
  onEditClick?: (event: CalendarEventWithCalendar) => void;
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

export const EventCard: React.FC<EventCardProps> = ({ event, date, onClick, onEditClick }) => {
  const calendarColor = event.calendar?.color || '#6b7280';

  const isMultiDay = event.start_date !== event.end_date && !event.is_all_day;
  const isStart = isEventStart(event.start_date, date);
  const isEnd = isEventEnd(event.end_date, date);
  const isMiddle = isEventMiddle(event.start_date, event.end_date, date);

  let borderRadius = '4px';
  if (isMultiDay) {
    if (isStart && !isEnd) {
      borderRadius = '4px 0 0 4px';
    } else if (isEnd && !isStart) {
      borderRadius = '0 4px 4px 0';
    } else if (isMiddle) {
      borderRadius = '0';
    }
  }

  const displayTime = event.is_all_day
    ? 'All Day'
    : `${formatTime(event.start_date)} - ${formatTime(event.end_date)}`;
  const displayTitle = event.title;

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditClick?.(event);
  };

  const handleCardClick = () => {
    if (onEditClick) {
      onEditClick(event);
    } else {
      onClick?.(event);
    }
  };

  return (
    <div
      className="position-relative"
      style={{
        fontSize: '0.7rem',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        borderRadius,
        backgroundColor: hexToRgba(calendarColor, 0.12),
        borderLeft: `3px solid ${calendarColor}`,
        padding: '4px 6px',
        ...(isMultiDay && {
          borderLeftWidth: isStart ? '3px' : '0',
        })
      }}
      onClick={handleCardClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.zIndex = '10';
        e.currentTarget.style.backgroundColor = hexToRgba(calendarColor, 0.2);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.zIndex = '1';
        e.currentTarget.style.backgroundColor = hexToRgba(calendarColor, 0.12);
      }}
      title={`${displayTitle}\n${displayTime}${isMultiDay ? '\nMulti-day event' : ''}`}
    >
      {isStart && onEditClick && (
        <button
          onClick={handleEditClick}
          style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '3px',
            padding: '2px 4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
            zIndex: 2,
            color: calendarColor
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title="Edit appointment"
        >
          <Edit size={10} />
        </button>
      )}

      {isStart && (
        <>
          <div
            className="text-truncate fw-semibold"
            style={{
              color: '#666',
              fontSize: '0.65rem',
              lineHeight: 1.2
            }}
          >
            {displayTime}
          </div>
          <div
            className="text-truncate fw-bold"
            style={{
              paddingRight: onEditClick ? '16px' : '0',
              color: '#333',
              lineHeight: 1.3
            }}
          >
            {displayTitle}
          </div>
        </>
      )}
      {isMiddle && (
        <div className="text-truncate fw-bold" style={{ color: '#333' }}>
          {displayTitle} (cont.)
        </div>
      )}
      {isEnd && !isStart && (
        <div className="text-truncate fw-bold" style={{ color: '#333' }}>
          {displayTitle} (ends)
        </div>
      )}
    </div>
  );
};
