import React, { useState, useRef } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CalendarEventWithCalendar } from '../../services/calendarService';

interface DraggableEventProps {
  event: CalendarEventWithCalendar;
  position: {
    left: number;
    width: number;
    isMultiDay: boolean;
    dayType: 'single' | 'start' | 'middle' | 'end';
  };
  topOffset: number;
  height: number;
  userColor: string;
  isDragging: boolean;
  onClick: () => void;
  onResize?: (eventId: string, newEndDate: string) => void;
  totalHours?: number;
  gridStart?: number;
  selectedDate?: Date;
}

export const DraggableEvent: React.FC<DraggableEventProps> = ({
  event,
  position,
  topOffset,
  height,
  userColor,
  isDragging,
  onClick,
  onResize,
  totalHours = 14,
  gridStart = 7,
  selectedDate = new Date()
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: event.id
  });

  const [isResizing, setIsResizing] = useState(false);
  const [resizeWidth, setResizeWidth] = useState<number | null>(null);
  const eventRef = useRef<HTMLDivElement>(null);
  const startResizeX = useRef<number>(0);
  const startWidth = useRef<number>(0);

  const time = new Date(event.start_date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const displayTitle = event.quote_number || event.title;

  let borderRadius = '4px';
  if (position.isMultiDay) {
    if (position.dayType === 'start') {
      borderRadius = '4px 0 0 4px';
    } else if (position.dayType === 'end') {
      borderRadius = '0 4px 4px 0';
    } else if (position.dayType === 'middle') {
      borderRadius = '0';
    }
  }

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    startResizeX.current = e.clientX;
    startWidth.current = position.width;
  };

  React.useEffect(() => {
    if (!isResizing) return;

    const handleResizeMove = (e: MouseEvent) => {
      if (!eventRef.current) return;

      const parentWidth = eventRef.current.parentElement?.offsetWidth || 1;
      const deltaX = e.clientX - startResizeX.current;
      const deltaPercent = (deltaX / parentWidth) * 100;

      let newWidth = startWidth.current + deltaPercent;
      const maxWidth = 100 - position.left;
      newWidth = Math.max(5, Math.min(newWidth, maxWidth));

      setResizeWidth(newWidth);
    };

    const handleResizeEnd = () => {
      setIsResizing(false);

      if (resizeWidth !== null && onResize) {
        const widthRatio = resizeWidth / 100;
        const durationHours = widthRatio * totalHours;

        const startDate = new Date(event.start_date);
        const newEndDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

        onResize(event.id, newEndDate.toISOString());
      }

      setResizeWidth(null);
    };

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);

    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, resizeWidth, position.left, event.id, event.start_date, onResize, totalHours]);

  const currentWidth = resizeWidth !== null ? resizeWidth : position.width;

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 156, g: 163, b: 175 };
  };

  const rgb = hexToRgb(userColor);
  const backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.85)`;

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${position.left}%`,
    width: `${currentWidth}%`,
    top: `${topOffset}px`,
    height: `${height}px`,
    backgroundColor,
    borderRadius,
    padding: '6px 8px',
    cursor: isDragging ? 'grabbing' : 'grab',
    transition: isResizing ? 'none' : (isDragging ? 'none' : 'box-shadow 0.15s ease, transform 0.15s ease'),
    zIndex: isDragging || isResizing ? 100 : 1,
    opacity: isDragging ? 0.7 : 1,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    touchAction: 'none'
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging && !isResizing) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (node) {
          (eventRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (!isDragging && !isResizing) {
          e.currentTarget.style.transform = transform
            ? `translate3d(${transform.x}px, ${transform.y - 2}px, 0)`
            : 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging && !isResizing) {
          e.currentTarget.style.transform = transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
      title={`${time}\n${displayTitle}\n${event.contact_name || ''}\n${event.quote_number ? `Quote: ${event.quote_number}` : ''}\n${event.amount ? `$${event.amount.toLocaleString()}` : ''}\n\nDrag to reschedule or click to edit`}
    >
      <div className="d-flex align-items-center gap-1" style={{ marginBottom: '3px' }}>
        <span style={{ fontSize: '0.65rem', opacity: 0.9 }}>
          {event.event_type === 'quote' ? '💰' : event.event_type === 'installation' ? '🔧' : event.event_type === 'inspection' ? '✓' : '📋'}
        </span>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: '700',
          color: '#fff',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          lineHeight: '1.3',
          flex: 1
        }}>
          {event.quote_number || displayTitle}
        </div>
      </div>
      <div style={{
        fontSize: '0.7rem',
        color: '#fff',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        lineHeight: '1.2',
        opacity: 0.95
      }}>
        {event.contact_name}
      </div>
      {event.amount && (
        <div style={{
          fontSize: '0.7rem',
          fontWeight: '600',
          color: '#fff',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          lineHeight: '1.2',
          marginTop: '2px'
        }}>
          ${event.amount.toLocaleString()}
        </div>
      )}

      {!position.isMultiDay && (
        <div
          onMouseDown={handleResizeStart}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '8px',
            cursor: 'ew-resize',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{
            width: '3px',
            height: '60%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '2px'
          }} />
        </div>
      )}
    </div>
  );
};
