import { useState, useCallback, useEffect } from 'react';
import {
  fetchEstimators,
  fetchCalendarEvents,
  Estimator,
  CalendarEventWithEstimator
} from '../services/calendarService';

export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

export interface UseCalendarReturn {
  currentDate: Date;
  view: CalendarView;
  selectedEstimators: string[];
  estimators: Estimator[];
  events: CalendarEventWithEstimator[];
  isLoading: boolean;
  searchTerm: string;
  sidebarCollapsed: boolean;
  setCurrentDate: (date: Date) => void;
  setView: (view: CalendarView) => void;
  toggleEstimator: (estimatorId: string) => void;
  setSearchTerm: (term: string) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  goToToday: () => void;
  goToPrevious: () => void;
  goToNext: () => void;
  refreshEvents: () => Promise<void>;
}

export function useCalendar(): UseCalendarReturn {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>('month');
  const [selectedEstimators, setSelectedEstimators] = useState<string[]>([]);
  const [estimators, setEstimators] = useState<Estimator[]>([]);
  const [events, setEvents] = useState<CalendarEventWithEstimator[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  useEffect(() => {
    loadEstimators();
  }, []);

  useEffect(() => {
    loadEvents();
  }, [currentDate, view, selectedEstimators]);

  const loadEstimators = async () => {
    const data = await fetchEstimators();
    setEstimators(data);
  };

  const loadEvents = async () => {
    setIsLoading(true);
    const { startDate, endDate } = getDateRange(currentDate, view);
    const data = await fetchCalendarEvents(
      startDate,
      endDate,
      selectedEstimators.length > 0 ? selectedEstimators : undefined
    );
    setEvents(data);
    setIsLoading(false);
  };

  const refreshEvents = useCallback(async () => {
    await loadEvents();
  }, [currentDate, view, selectedEstimators]);

  const toggleEstimator = useCallback((estimatorId: string) => {
    setSelectedEstimators(prev =>
      prev.includes(estimatorId)
        ? prev.filter(id => id !== estimatorId)
        : [...prev, estimatorId]
    );
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      switch (view) {
        case 'month':
          newDate.setMonth(newDate.getMonth() - 1);
          break;
        case 'week':
          newDate.setDate(newDate.getDate() - 7);
          break;
        case 'day':
          newDate.setDate(newDate.getDate() - 1);
          break;
        default:
          newDate.setMonth(newDate.getMonth() - 1);
      }
      return newDate;
    });
  }, [view]);

  const goToNext = useCallback(() => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      switch (view) {
        case 'month':
          newDate.setMonth(newDate.getMonth() + 1);
          break;
        case 'week':
          newDate.setDate(newDate.getDate() + 7);
          break;
        case 'day':
          newDate.setDate(newDate.getDate() + 1);
          break;
        default:
          newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  }, [view]);

  return {
    currentDate,
    view,
    selectedEstimators,
    estimators,
    events,
    isLoading,
    searchTerm,
    sidebarCollapsed,
    setCurrentDate,
    setView,
    toggleEstimator,
    setSearchTerm,
    setSidebarCollapsed,
    goToToday,
    goToPrevious,
    goToNext,
    refreshEvents
  };
}

function getDateRange(date: Date, view: CalendarView): { startDate: Date; endDate: Date } {
  const startDate = new Date(date);
  const endDate = new Date(date);

  switch (view) {
    case 'month':
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'week':
      const dayOfWeek = startDate.getDay();
      startDate.setDate(startDate.getDate() - dayOfWeek);
      startDate.setHours(0, 0, 0, 0);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'day':
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'agenda':
      startDate.setHours(0, 0, 0, 0);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setHours(23, 59, 59, 999);
      break;
  }

  return { startDate, endDate };
}
