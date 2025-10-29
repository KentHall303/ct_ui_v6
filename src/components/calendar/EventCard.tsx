import React from 'react';
import { CalendarEventWithEstimator } from '../../services/calendarService';
import { formatTime, formatCurrency, isEventStart, isEventEnd, isEventMiddle } from '../../utils/dateUtils';

interface EventCardProps {
  event: CalendarEventWithEstimator;
  date: Date;
  onClick?: (event: CalendarEventWithEstimator) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, date, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: 'bg-success', text: 'text-success', border: 'border-success' };
      case 'pending':
        return { bg: 'bg-warning', text: 'text-warning', border: 'border-warning' };
      case 'overdue':
        return { bg: 'bg-danger', text: 'text-danger', border: 'border-danger' };
      case 'completed':
        return { bg: 'bg-info', text: 'text-info', border: 'border-info' };
      default:
        return { bg: 'bg-secondary', text: 'text-secondary', border: 'border-secondary' };
    }
  };

  const colors = getStatusColor(event.status);
  const isMultiDay = event.start_date !== event.end_date && !event.is_all_day;
  const isStart = isEventStart(event.start_date, date);
  const isEnd = isEventEnd(event.end_date, date);
  const isMiddle = isEventMiddle(event.start_date, event.end_date, date);

  let borderRadius = '0.25rem';
  if (isMultiDay) {
    if (isStart && !isEnd) {
      borderRadius = '0.25rem 0 0 0.25rem';
    } else if (isEnd && !isStart) {
      borderRadius = '0 0.25rem 0.25rem 0';
    } else if (isMiddle) {
      borderRadius = '0';
    }
  }

  const displayTime = event.is_all_day ? 'All Day' : formatTime(event.start_date);
  const displayTitle = event.quote_number || event.title;
  const displayAmount = event.amount ? formatCurrency(event.amount) : '';

  return (
    <div
      className={`${colors.bg} bg-opacity-10 ${colors.text} border ${colors.border} px-2 py-1`}
      style={{
        fontSize: '0.7rem',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        borderRadius,
        position: 'relative',
        ...(isMultiDay && {
          borderLeft: isStart ? undefined : 'none',
          borderRight: isEnd ? undefined : 'none',
        })
      }}
      onClick={() => onClick?.(event)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.zIndex = '10';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.zIndex = '1';
      }}
      title={`${displayTitle}\n${event.contact_name || ''}\n${displayTime}\n${displayAmount}${isMultiDay ? '\nMulti-day event' : ''}`}
    >
      {isStart && (
        <>
          <div className="fw-semibold text-truncate">{displayTime}</div>
          <div className="text-truncate fw-bold">{displayTitle}</div>
          {event.contact_name && (
            <div className="text-truncate opacity-75">{event.contact_name}</div>
          )}
        </>
      )}
      {isMiddle && (
        <div className="text-truncate fw-bold">{displayTitle} (cont.)</div>
      )}
      {isEnd && !isStart && (
        <div className="text-truncate fw-bold">{displayTitle} (ends)</div>
      )}
    </div>
  );
};
