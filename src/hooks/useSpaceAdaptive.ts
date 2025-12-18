import { useState, useEffect, useCallback, RefObject } from 'react';

const SINGLE_EVENT_CARD_HEIGHT = 52;
const MULTIPLE_EVENT_CARD_HEIGHT = 28;
const COMPACT_ROW_HEIGHT = 20;
const DATE_HEADER_HEIGHT = 24;
const CONTAINER_PADDING = 8;

export type DisplayMode = 'compact' | 'comfort-single' | 'comfort-multiple';

interface SpaceAdaptiveResult {
  displayMode: DisplayMode;
  maxVisibleEvents: number;
}

export function calculateDisplayMode(
  availableHeight: number,
  eventCount: number,
  uniqueCalendarCount: number
): SpaceAdaptiveResult {
  const contentHeight = availableHeight - DATE_HEADER_HEIGHT - CONTAINER_PADDING;

  if (contentHeight <= 0 || eventCount === 0) {
    return { displayMode: 'comfort-single', maxVisibleEvents: 0 };
  }

  if (eventCount === 1) {
    return { displayMode: 'comfort-single', maxVisibleEvents: 1 };
  }

  const multipleViewHeight = eventCount * MULTIPLE_EVENT_CARD_HEIGHT;
  if (multipleViewHeight <= contentHeight) {
    return { displayMode: 'comfort-multiple', maxVisibleEvents: eventCount };
  }

  const compactViewHeight = uniqueCalendarCount * COMPACT_ROW_HEIGHT;
  if (compactViewHeight <= contentHeight) {
    return { displayMode: 'compact', maxVisibleEvents: eventCount };
  }

  const maxMultiple = Math.floor(contentHeight / MULTIPLE_EVENT_CARD_HEIGHT);
  if (maxMultiple >= 2) {
    return { displayMode: 'comfort-multiple', maxVisibleEvents: maxMultiple };
  }

  return { displayMode: 'compact', maxVisibleEvents: eventCount };
}

export function useSpaceAdaptive(
  containerRef: RefObject<HTMLElement>,
  eventCount: number,
  uniqueCalendarCount: number
): SpaceAdaptiveResult {
  const [result, setResult] = useState<SpaceAdaptiveResult>({
    displayMode: 'comfort-single',
    maxVisibleEvents: eventCount
  });

  const updateDisplayMode = useCallback(() => {
    if (!containerRef.current) return;

    const { height } = containerRef.current.getBoundingClientRect();
    const newResult = calculateDisplayMode(height, eventCount, uniqueCalendarCount);
    setResult(newResult);
  }, [containerRef, eventCount, uniqueCalendarCount]);

  useEffect(() => {
    updateDisplayMode();

    const resizeObserver = new ResizeObserver(() => {
      updateDisplayMode();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateDisplayMode);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDisplayMode);
    };
  }, [updateDisplayMode]);

  return result;
}

export function getUniqueCalendarCount(events: { calendar?: { id: string } }[]): number {
  const uniqueIds = new Set<string>();
  events.forEach(event => {
    if (event.calendar?.id) {
      uniqueIds.add(event.calendar.id);
    } else {
      uniqueIds.add('no-calendar');
    }
  });
  return uniqueIds.size;
}
