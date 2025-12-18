import React, { useEffect, useRef } from 'react';
import { CalendarEventWithCalendar } from '../../services/calendarService';
import { formatTime, formatFullDayDate } from '../../utils/dateUtils';

interface EventDetailsPopupProps {
  event: CalendarEventWithCalendar;
  position: { x: number; y: number };
  onClose: () => void;
}

const STATUS_COLORS = {
  pending: '#ffc107',
  active: '#0d6efd',
  completed: '#198754',
  overdue: '#dc3545'
};

const STATUS_LABELS = {
  pending: 'Pending',
  active: 'Active',
  completed: 'Completed',
  overdue: 'Overdue'
};

const TYPE_LABELS = {
  quote: 'Quote',
  installation: 'Installation',
  inspection: 'Inspection',
  follow_up: 'Follow Up'
};

export const EventDetailsPopup: React.FC<EventDetailsPopupProps> = ({
  event,
  position,
  onClose
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    if (popupRef.current) {
      const rect = popupRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedTop = position.y;
      let adjustedLeft = position.x;

      if (position.x + rect.width > viewportWidth) {
        adjustedLeft = viewportWidth - rect.width - 20;
      }

      if (position.y + rect.height > viewportHeight) {
        adjustedTop = viewportHeight - rect.height - 20;
      }

      if (adjustedTop < 20) adjustedTop = 20;
      if (adjustedLeft < 20) adjustedLeft = 20;

      popupRef.current.style.top = `${adjustedTop}px`;
      popupRef.current.style.left = `${adjustedLeft}px`;
    }
  }, [position]);

  const formatDateRange = () => {
    if (event.is_all_day) {
      return `All Day - ${formatFullDayDate(new Date(event.start_date))}`;
    }
    const start = new Date(event.start_date);
    const end = new Date(event.end_date);
    return `${formatFullDayDate(start)} ${formatTime(event.start_date)} - ${formatTime(event.end_date)}`;
  };

  return (
    <div
      ref={popupRef}
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        backgroundColor: 'white',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        padding: '0',
        zIndex: 10000,
        minWidth: '320px',
        maxWidth: '400px',
        animation: 'fadeIn 0.15s ease-in-out'
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-4px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 16px 12px 16px',
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        <h6 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1a1a1a', flex: 1 }}>
          {event.title || 'Untitled Event'}
        </h6>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            color: '#6c757d',
            padding: '0 0 0 8px',
            lineHeight: 1,
            transition: 'color 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#6c757d'}
        >
          &times;
        </button>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {event.calendar && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: event.calendar.color,
                  flexShrink: 0
                }}
              />
              <span style={{ fontSize: '0.875rem', color: '#666', fontWeight: 500 }}>
                {event.calendar.name}
              </span>
            </div>
          )}

          <div style={{ fontSize: '0.875rem', color: '#333' }}>
            <div style={{ fontWeight: 500, marginBottom: '2px' }}>
              {formatDateRange()}
            </div>
          </div>

          {event.contact_name && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ fontSize: '0.875rem', color: '#666', fontWeight: 500 }}>Contact:</span>
              <span style={{ fontSize: '0.875rem', color: '#333' }}>{event.contact_name}</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '12px',
                backgroundColor: STATUS_COLORS[event.status],
                color: 'white'
              }}
            >
              {STATUS_LABELS[event.status]}
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '12px',
                backgroundColor: '#e9ecef',
                color: '#495057'
              }}
            >
              {TYPE_LABELS[event.event_type]}
            </span>
          </div>

          {event.amount !== null && event.amount > 0 && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ fontSize: '0.875rem', color: '#666', fontWeight: 500 }}>Amount:</span>
              <span style={{ fontSize: '0.875rem', color: '#333', fontWeight: 600 }}>
                ${event.amount.toFixed(2)}
              </span>
            </div>
          )}

          {event.quote_number && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ fontSize: '0.875rem', color: '#666', fontWeight: 500 }}>Quote #:</span>
              <span style={{ fontSize: '0.875rem', color: '#333' }}>{event.quote_number}</span>
            </div>
          )}

          {event.location && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ fontSize: '0.875rem', color: '#666', fontWeight: 500 }}>Location:</span>
              <span style={{ fontSize: '0.875rem', color: '#333' }}>{event.location}</span>
            </div>
          )}

          {event.notes && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
              <span style={{ fontSize: '0.875rem', color: '#666', fontWeight: 500 }}>Notes:</span>
              <div
                style={{
                  fontSize: '0.875rem',
                  color: '#333',
                  backgroundColor: '#f8f9fa',
                  padding: '8px',
                  borderRadius: '4px',
                  maxHeight: '100px',
                  overflowY: 'auto'
                }}
              >
                {event.notes}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
