import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CalendarEventWithCalendar } from '../../services/calendarService';
import { CompactDaySummary } from './CompactDaySummary';
import { ComfortEventCard } from './ComfortEventCard';
import { calculateDisplayMode, getUniqueCalendarCount, DisplayMode } from '../../hooks/useSpaceAdaptive';
import { formatTime } from '../../utils/dateUtils';

interface DayCellProps {
  date: Date;
  events: CalendarEventWithCalendar[];
  inCurrentMonth: boolean;
  isToday: boolean;
  onEventClick?: (event: CalendarEventWithCalendar) => void;
  onDateClick?: (date: Date) => void;
}

const DATE_HEADER_HEIGHT = 24;
const CONTAINER_PADDING = 8;
const EVENT_CARD_HEIGHT = 28;
const EVENT_GAP = 4;
const OVERFLOW_BAR_HEIGHT = 22;

export const DayCell: React.FC<DayCellProps> = ({
  date,
  events,
  inCurrentMonth,
  isToday,
  onEventClick,
  onDateClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const eventsContainerRef = useRef<HTMLDivElement>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('comfort-multiple');
  const [containerHeight, setContainerHeight] = useState(0);
  const [maxVisibleEvents, setMaxVisibleEvents] = useState(events.length);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const uniqueCalendarCount = getUniqueCalendarCount(events);

  const updateDisplayMode = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const height = rect.height;
    setContainerHeight(height);

    const result = calculateDisplayMode(height, events.length, uniqueCalendarCount);
    setDisplayMode(result.displayMode);

    const availableHeight = height - DATE_HEADER_HEIGHT - CONTAINER_PADDING;
    const heightForEvents = availableHeight - (events.length > 0 ? OVERFLOW_BAR_HEIGHT : 0);
    const maxEvents = Math.max(1, Math.floor((heightForEvents + EVENT_GAP) / (EVENT_CARD_HEIGHT + EVENT_GAP)));

    if (events.length > maxEvents) {
      setMaxVisibleEvents(Math.max(1, maxEvents - 1));
    } else {
      setMaxVisibleEvents(events.length);
    }
  }, [events.length, uniqueCalendarCount]);

  useEffect(() => {
    updateDisplayMode();

    const resizeObserver = new ResizeObserver(() => {
      updateDisplayMode();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateDisplayMode]);

  const visibleEvents = events.slice(0, maxVisibleEvents);
  const hiddenEvents = events.slice(maxVisibleEvents);
  const hasOverflow = hiddenEvents.length > 0;

  const handleOverflowMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      top: rect.bottom - 2,
      left: rect.left
    });
    setShowPopover(true);
  };

  const handleOverflowMouseLeave = () => {
    setShowPopover(false);
  };

  const handleOverflowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDateClick?.(date);
  };

  const renderEvents = () => {
    if (events.length === 0) return null;

    if (displayMode === 'compact') {
      return (
        <CompactDaySummary
          events={events}
          showLabels={containerHeight > 100}
          onCalendarClick={() => onDateClick?.(date)}
        />
      );
    }

    if (displayMode === 'comfort-single' && events.length === 1) {
      return (
        <ComfortEventCard
          event={events[0]}
          mode="single"
          onClick={onEventClick}
        />
      );
    }

    return (
      <div className="d-flex flex-column gap-1 h-100">
        <div className="d-flex flex-column gap-1" style={{ flex: 1, overflow: 'hidden' }}>
          {visibleEvents.map((event) => (
            <ComfortEventCard
              key={event.id}
              event={event}
              mode="multiple"
              onClick={onEventClick}
            />
          ))}
        </div>
        {hasOverflow && (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              height: `${OVERFLOW_BAR_HEIGHT}px`,
              backgroundColor: '#6c757d',
              color: 'white',
              borderRadius: '4px',
              fontSize: '0.65rem',
              fontWeight: 500,
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background-color 0.15s ease'
            }}
            onClick={handleOverflowClick}
            onMouseEnter={handleOverflowMouseEnter}
            onMouseLeave={handleOverflowMouseLeave}
          >
            +{hiddenEvents.length} more
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`border rounded p-2 d-flex flex-column ${
          inCurrentMonth ? 'bg-white' : 'bg-light'
        } ${isToday ? 'border-primary border-2 shadow-sm' : 'border-1'}`}
        style={{
          minHeight: '100px',
          height: '100%',
          cursor: inCurrentMonth ? 'pointer' : 'default',
          transition: 'all 0.15s ease',
          opacity: inCurrentMonth ? 1 : 0.5,
          overflow: 'hidden'
        }}
        onClick={() => inCurrentMonth && onDateClick?.(date)}
        onMouseEnter={(e) => {
          if (inCurrentMonth) {
            e.currentTarget.style.backgroundColor = '#f8f9fa';
          }
        }}
        onMouseLeave={(e) => {
          if (inCurrentMonth) {
            e.currentTarget.style.backgroundColor = 'white';
          }
        }}
      >
        <div
          className={`small mb-1 ${isToday ? 'fw-bold text-primary' : 'text-secondary'}`}
          style={{ fontSize: '0.75rem', height: `${DATE_HEADER_HEIGHT - CONTAINER_PADDING}px`, flexShrink: 0 }}
        >
          {date.getDate()}
        </div>
        <div ref={eventsContainerRef} style={{ flex: 1, overflow: 'hidden' }}>
          {renderEvents()}
        </div>
      </div>

      {showPopover && hasOverflow && (
        <div
          style={{
            position: 'fixed',
            top: popoverPosition.top,
            left: popoverPosition.left,
            backgroundColor: 'white',
            border: '1px solid #dee2e6',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            padding: '8px 12px',
            zIndex: 9999,
            minWidth: '180px',
            maxWidth: '280px',
            maxHeight: '200px',
            overflowY: 'auto'
          }}
          onMouseEnter={() => setShowPopover(true)}
          onMouseLeave={() => setShowPopover(false)}
        >
          <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#6c757d', marginBottom: '6px' }}>
            {hiddenEvents.length} more event{hiddenEvents.length > 1 ? 's' : ''}
          </div>
          <div className="d-flex flex-column gap-1">
            {hiddenEvents.map((event) => (
              <div
                key={event.id}
                className="d-flex align-items-center gap-2"
                style={{
                  fontSize: '0.7rem',
                  padding: '4px 0',
                  borderBottom: '1px solid #f0f0f0'
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: event.calendar?.color || '#6b7280',
                    flexShrink: 0
                  }}
                />
                <span style={{ color: '#666', whiteSpace: 'nowrap' }}>
                  {event.is_all_day ? 'All Day' : formatTime(event.start_date)}
                </span>
                <span className="text-truncate" style={{ color: '#333', fontWeight: 500 }}>
                  {event.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
