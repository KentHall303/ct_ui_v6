import React from 'react';
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
}

export const DraggableEvent: React.FC<DraggableEventProps> = ({
  event,
  position,
  topOffset,
  height,
  userColor,
  isDragging,
  onClick
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: event.id
  });

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

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${position.left}%`,
    width: `${position.width}%`,
    top: `${topOffset}px`,
    height: `${height}px`,
    backgroundColor: `${userColor}20`,
    border: position.isMultiDay ? `2px dashed ${userColor}` : `2px solid ${userColor}`,
    borderRadius,
    padding: '4px 6px',
    cursor: isDragging ? 'grabbing' : 'grab',
    transition: isDragging ? 'none' : 'box-shadow 0.15s ease, transform 0.15s ease',
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.5 : 1,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    touchAction: 'none'
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (!isDragging) {
          e.currentTarget.style.transform = transform
            ? `translate3d(${transform.x}px, ${transform.y - 2}px, 0)`
            : 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          e.currentTarget.style.transform = transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
      title={`${time}\n${displayTitle}\n${event.contact_name || ''}\n${event.quote_number ? `Quote: ${event.quote_number}` : ''}\n${event.amount ? `$${event.amount.toLocaleString()}` : ''}\n\nDrag to reschedule or click to edit`}
    >
      <div className="d-flex align-items-center gap-1" style={{ marginBottom: '2px' }}>
        <span style={{ fontSize: '0.6rem', opacity: 0.8 }}>
          {event.event_type === 'quote' ? '💰' : event.event_type === 'installation' ? '🔧' : event.event_type === 'inspection' ? '✓' : '📋'}
        </span>
        <div style={{
          fontSize: '0.7rem',
          fontWeight: '700',
          color: userColor,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          lineHeight: '1.2',
          flex: 1
        }}>
          {event.quote_number || displayTitle}
        </div>
      </div>
      <div style={{
        fontSize: '0.65rem',
        color: userColor,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        lineHeight: '1.1',
        opacity: 0.9
      }}>
        {event.contact_name}
      </div>
      {event.amount && (
        <div style={{
          fontSize: '0.65rem',
          fontWeight: '600',
          color: userColor,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          lineHeight: '1.1',
          marginTop: '1px'
        }}>
          ${event.amount.toLocaleString()}
        </div>
      )}
    </div>
  );
};
