import React, { useState, useMemo, useCallback } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  CollisionDetection
} from '@dnd-kit/core';
import { CalendarEventWithCalendar, updateCalendarEvent } from '../../services/calendarService';
import { DraggableEvent } from './DraggableEvent';
import { DroppableTimeSlot } from './DroppableTimeSlot';

interface EstimatorWithColor {
  id: string;
  name: string;
  color: string;
}

interface DispatchingTimelineViewProps {
  events: CalendarEventWithCalendar[];
  selectedSubcontractors: string[];
  subcontractorsWithColors: EstimatorWithColor[];
  selectedDate: Date;
  onEventClick: (event: CalendarEventWithCalendar) => void;
  onEventsChange: () => void;
}

const GRID_START = 7;
const GRID_END = 21;
const TOTAL_HOURS = GRID_END - GRID_START;
const STANDARD_EVENT_HEIGHT = 55;
const EVENT_SPACING = 6;

const leftEdgeCollision: CollisionDetection = ({ droppableRects, droppableContainers, active }) => {
  if (!active || !active.rect.current.translated) {
    return [];
  }

  const leftEdge = active.rect.current.translated.left;
  const verticalCenter = active.rect.current.translated.top + active.rect.current.translated.height / 2;

  const collisions: { id: string; data: { droppableContainer: typeof droppableContainers[0]; value: number } }[] = [];

  for (const droppableContainer of droppableContainers) {
    const { id } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect) {
      const isWithinHorizontal = leftEdge >= rect.left && leftEdge < rect.right;
      const isWithinVertical = verticalCenter >= rect.top && verticalCenter <= rect.bottom;

      if (isWithinHorizontal && isWithinVertical) {
        const distanceFromLeft = leftEdge - rect.left;
        collisions.push({
          id: id as string,
          data: { droppableContainer, value: distanceFromLeft }
        });
      }
    }
  }

  return collisions.sort((a, b) => a.data.value - b.data.value);
};

const hours = Array.from({ length: 14 }, (_, i) => {
  const hour = i + 7;
  return hour <= 12 ? `${hour} am` : `${hour - 12} pm`;
});

const isMultiDayEvent = (startDate: string, endDate: string): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startOnly = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()));
  const endOnly = new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()));
  return endOnly.getTime() > startOnly.getTime();
};

const calculatePosition = (startDate: string, endDate: string, viewDate: Date): {
  left: number;
  width: number;
  visible: boolean;
  isMultiDay: boolean;
  dayType: 'single' | 'start' | 'middle' | 'end'
} => {
  const date = new Date(startDate);
  const endDateTime = new Date(endDate);

  const viewDateOnly = new Date(Date.UTC(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate()));
  const startDateOnly = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const endDateOnly = new Date(Date.UTC(endDateTime.getFullYear(), endDateTime.getMonth(), endDateTime.getDate()));

  if (viewDateOnly.getTime() < startDateOnly.getTime() || viewDateOnly.getTime() > endDateOnly.getTime()) {
    return { left: 0, width: 0, visible: false, isMultiDay: false, dayType: 'single' };
  }

  const isMultiDay = isMultiDayEvent(startDate, endDate);
  let dayType: 'single' | 'start' | 'middle' | 'end' = 'single';

  if (isMultiDay) {
    if (viewDateOnly.getTime() === startDateOnly.getTime()) {
      dayType = 'start';
    } else if (viewDateOnly.getTime() === endDateOnly.getTime()) {
      dayType = 'end';
    } else {
      dayType = 'middle';
    }
  }

  let startHour: number;
  let durationHours: number;

  if (dayType === 'middle') {
    startHour = GRID_START;
    durationHours = TOTAL_HOURS;
  } else if (dayType === 'start') {
    startHour = date.getHours() + date.getMinutes() / 60;
    if (startHour < GRID_START) startHour = GRID_START;
    durationHours = GRID_END - startHour;
  } else if (dayType === 'end') {
    startHour = GRID_START;
    const endHour = endDateTime.getHours() + endDateTime.getMinutes() / 60;
    durationHours = Math.min(endHour, GRID_END) - GRID_START;
  } else {
    startHour = date.getHours() + date.getMinutes() / 60;
    if (startHour < GRID_START || startHour >= GRID_END) {
      return { left: 0, width: 0, visible: false, isMultiDay: false, dayType: 'single' };
    }

    const durationMs = endDateTime.getTime() - date.getTime();
    durationHours = durationMs / (1000 * 60 * 60);
  }

  const left = ((startHour - GRID_START) / TOTAL_HOURS) * 100;
  const width = (durationHours / TOTAL_HOURS) * 100;

  return {
    left,
    width: Math.min(width, 100 - left),
    visible: true,
    isMultiDay,
    dayType
  };
};

export const DispatchingTimelineView: React.FC<DispatchingTimelineViewProps> = ({
  events,
  selectedSubcontractors,
  subcontractorsWithColors,
  selectedDate,
  onEventClick,
  onEventsChange
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [localEvents, setLocalEvents] = useState<CalendarEventWithCalendar[]>(events);

  React.useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  );

  const activeEvent = useMemo(() => {
    if (!activeId) return null;
    return localEvents.find(e => e.id === activeId) || null;
  }, [activeId, localEvents]);

  const getEventsForEstimator = useCallback((subcontractorName: string) => {
    return localEvents.filter(event => event.estimator?.name === subcontractorName);
  }, [localEvents]);

  const calculateEventLayers = useCallback((subcontractorEvents: CalendarEventWithCalendar[]) => {
    const eventLayersMap = new Map<string, number>();

    const visibleEventsForRow = subcontractorEvents
      .map(event => ({
        event,
        position: calculatePosition(event.start_date, event.end_date, selectedDate)
      }))
      .filter(({ position }) => position.visible);

    const sortedEvents = visibleEventsForRow.sort((a, b) => {
      if (a.position.left !== b.position.left) return a.position.left - b.position.left;
      return b.position.width - a.position.width;
    });

    for (const { event, position } of sortedEvents) {
      const eventStart = position.left;
      const eventEnd = eventStart + position.width;

      let layer = 0;
      let foundLayer = false;

      while (!foundLayer) {
        let hasConflict = false;

        for (const [otherId, otherLayer] of eventLayersMap.entries()) {
          if (otherLayer !== layer) continue;

          const otherData = sortedEvents.find(ve => ve.event.id === otherId);
          if (!otherData) continue;

          const otherStart = otherData.position.left;
          const otherEnd = otherStart + otherData.position.width;

          if (!(eventEnd <= otherStart || eventStart >= otherEnd)) {
            hasConflict = true;
            break;
          }
        }

        if (!hasConflict) {
          eventLayersMap.set(event.id, layer);
          foundLayer = true;
        } else {
          layer++;
        }
      }
    }

    return eventLayersMap;
  }, [selectedDate]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverId(event.over?.id as string || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);

    if (!over || !active) return;

    const draggedEvent = localEvents.find(e => e.id === active.id);
    if (!draggedEvent) return;

    const dropId = over.id as string;
    const [targetUser, hourStr, minuteStr, layerStr] = dropId.split('-');
    const targetHour = parseInt(hourStr, 10);
    const targetMinute = parseInt(minuteStr, 10);
    const targetLayer = parseInt(layerStr, 10);

    if (isNaN(targetHour) || isNaN(targetMinute)) return;

    const newStartDate = new Date(selectedDate);
    newStartDate.setHours(targetHour, targetMinute, 0, 0);

    const duration = new Date(draggedEvent.end_date).getTime() - new Date(draggedEvent.start_date).getTime();
    const newEndDate = new Date(newStartDate.getTime() + duration);

    const targetSubcontractor = subcontractorsWithColors.find(s => s.name === targetUser);

    const updatedEvent = {
      ...draggedEvent,
      start_date: newStartDate.toISOString(),
      end_date: newEndDate.toISOString(),
      user_id: targetSubcontractor?.id || draggedEvent.user_id,
      estimator: targetSubcontractor ? {
        ...draggedEvent.estimator,
        id: targetSubcontractor.id,
        name: targetSubcontractor.name
      } : draggedEvent.estimator
    };

    setLocalEvents(prev =>
      prev.map(e => e.id === draggedEvent.id ? updatedEvent : e)
    );

    try {
      await updateCalendarEvent(draggedEvent.id, {
        start_date: newStartDate.toISOString(),
        end_date: newEndDate.toISOString(),
        user_id: targetSubcontractor?.id || null
      });
    } catch (error) {
      console.error('Error updating event:', error);
      setLocalEvents(events);
    }
  };

  const handleResize = async (eventId: string, newEndDate: string) => {
    const event = localEvents.find(e => e.id === eventId);
    if (!event) return;

    const updatedEvent = {
      ...event,
      end_date: newEndDate
    };

    setLocalEvents(prev =>
      prev.map(e => e.id === eventId ? updatedEvent : e)
    );

    try {
      await updateCalendarEvent(eventId, {
        end_date: newEndDate
      });
      onEventsChange();
    } catch (error) {
      console.error('Error resizing event:', error);
      setLocalEvents(events);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={leftEdgeCollision}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex-fill" style={{ overflowY: 'auto', overflowX: 'auto' }}>
        <div style={{ minWidth: '1200px' }}>
          <div className="d-flex border-bottom bg-light sticky-top" style={{ top: 0, zIndex: 2 }}>
            <div className="border-end bg-white" style={{ width: '180px', flexShrink: 0, padding: '12px 16px' }}>
              <span className="small fw-semibold text-secondary">User</span>
            </div>
            <div className="d-flex flex-fill">
              {hours.map((hour, i) => (
                <div
                  key={i}
                  className="text-center border-end"
                  style={{ flex: 1, padding: '12px 8px', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280' }}
                >
                  {hour}
                </div>
              ))}
            </div>
          </div>

          {selectedSubcontractors.map((subcontractorName, index) => {
            const subcontractorEvents = getEventsForEstimator(subcontractorName);
            const subcontractor = subcontractorsWithColors.find(e => e.name === subcontractorName);
            const eventLayersMap = calculateEventLayers(subcontractorEvents);

            const maxLayers = eventLayersMap.size > 0 ? Math.max(...Array.from(eventLayersMap.values())) + 1 : 1;
            const rowPadding = 16;
            const calculatedRowHeight = rowPadding + (maxLayers * STANDARD_EVENT_HEIGHT) + ((maxLayers - 1) * EVENT_SPACING);
            const rowHeight = Math.max(60, calculatedRowHeight);

            return (
              <div key={index} className="d-flex border-bottom" style={{ minHeight: `${rowHeight}px` }}>
                <div className="border-end d-flex align-items-center" style={{ width: '180px', flexShrink: 0, padding: '6px 12px', backgroundColor: '#fff' }}>
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="rounded-circle"
                      style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: subcontractor?.color || '#9ca3af',
                        flexShrink: 0
                      }}
                    />
                    <span style={{ fontSize: '0.8rem', fontWeight: '500' }} className="text-dark">{subcontractorName}</span>
                  </div>
                </div>

                <div
                  className="position-relative flex-fill timeline-container"
                  style={{ backgroundColor: '#fafafa', minHeight: `${rowHeight}px` }}
                >
                  <div className="d-flex h-100 position-absolute w-100">
                    {hours.map((_, hourIndex) => {
                      const hourValue = hourIndex + 7;
                      return (
                        <React.Fragment key={hourIndex}>
                          <DroppableTimeSlot
                            id={`${subcontractorName}-${hourValue}-0-0`}
                            isOver={overId === `${subcontractorName}-${hourValue}-0-0`}
                            isFirst
                          />
                          <DroppableTimeSlot
                            id={`${subcontractorName}-${hourValue}-30-0`}
                            isOver={overId === `${subcontractorName}-${hourValue}-30-0`}
                            isLast={hourIndex === hours.length - 1}
                          />
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {subcontractorEvents.map((event) => {
                    const position = calculatePosition(event.start_date, event.end_date, selectedDate);
                    if (!position.visible) return null;

                    const layer = eventLayersMap.get(event.id) || 0;
                    const topOffset = 8 + (layer * (STANDARD_EVENT_HEIGHT + EVENT_SPACING));
                    const assignedUser = subcontractorsWithColors.find(s => s.name === event.estimator?.name);
                    const userColor = assignedUser?.color || '#9ca3af';
                    const isDragging = activeId === event.id;

                    return (
                      <DraggableEvent
                        key={event.id}
                        event={event}
                        position={position}
                        topOffset={topOffset}
                        height={STANDARD_EVENT_HEIGHT}
                        userColor={userColor}
                        isDragging={isDragging}
                        onClick={() => onEventClick(event)}
                        onResize={handleResize}
                        totalHours={TOTAL_HOURS}
                        gridStart={GRID_START}
                        selectedDate={selectedDate}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <DragOverlay dropAnimation={{
        duration: 200,
        easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'
      }}>
        {activeEvent ? (() => {
          const activeUser = subcontractorsWithColors.find(s => s.name === activeEvent.estimator?.name);
          const activeUserColor = activeUser?.color || '#9ca3af';

          const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : { r: 156, g: 163, b: 175 };
          };

          const rgb = hexToRgb(activeUserColor);
          const backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.85)`;

          return (
            <div
              style={{
                width: '200px',
                height: `${STANDARD_EVENT_HEIGHT}px`,
                backgroundColor,
                borderRadius: '4px',
                padding: '6px 8px',
                cursor: 'grabbing',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                transform: 'scale(1.02)',
                opacity: 0.95
              }}
            >
              <div className="d-flex align-items-center gap-1" style={{ marginBottom: '3px' }}>
                <span style={{ fontSize: '0.65rem', opacity: 0.9 }}>
                  {activeEvent.event_type === 'quote' ? '💰' : activeEvent.event_type === 'installation' ? '🔧' : activeEvent.event_type === 'inspection' ? '✓' : '📋'}
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
                  {activeEvent.quote_number || activeEvent.title}
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
                {activeEvent.contact_name}
              </div>
              {activeEvent.amount && (
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
                  ${activeEvent.amount.toLocaleString()}
                </div>
              )}
            </div>
          );
        })() : null}
      </DragOverlay>
    </DndContext>
  );
};
