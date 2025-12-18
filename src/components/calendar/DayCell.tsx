import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CalendarEventWithCalendar } from '../../services/calendarService';
import { CompactDaySummary } from './CompactDaySummary';
import { ComfortEventCard } from './ComfortEventCard';
import { calculateDisplayMode, getUniqueCalendarCount, DisplayMode } from '../../hooks/useSpaceAdaptive';

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

export const DayCell: React.FC<DayCellProps> = ({
  date,
  events,
  inCurrentMonth,
  isToday,
  onEventClick,
  onDateClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('comfort-multiple');
  const [containerHeight, setContainerHeight] = useState(0);

  const uniqueCalendarCount = getUniqueCalendarCount(events);

  const updateDisplayMode = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const height = rect.height;
    setContainerHeight(height);

    const result = calculateDisplayMode(height, events.length, uniqueCalendarCount);
    setDisplayMode(result.displayMode);
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
      <div className="d-flex flex-column gap-1">
        {events.map((event) => (
          <ComfortEventCard
            key={event.id}
            event={event}
            mode="multiple"
            onClick={onEventClick}
          />
        ))}
      </div>
    );
  };

  return (
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
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {renderEvents()}
      </div>
    </div>
  );
};
