import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  fetchCalendars,
  fetchCalendarEventsWithCalendar,
  Calendar,
  CalendarEventWithCalendar
} from '../services/calendarService';
import { getNextNDatesWithEvents } from '../utils/dateUtils';

export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

export const AGENDA_DATES_PER_PAGE = 7;

export interface UseCalendarReturn {
  currentDate: Date;
  view: CalendarView;
  selectedCalendars: string[];
  calendars: Calendar[];
  events: CalendarEventWithCalendar[];
  isLoading: boolean;
  searchTerm: string;
  sidebarCollapsed: boolean;
  agendaAnchorDate: Date;
  agendaVisibleDates: Date[];
  setCurrentDate: (date: Date) => void;
  setView: (view: CalendarView) => void;
  toggleCalendar: (calendarId: string) => void;
  selectAllCalendars: () => void;
  clearAllCalendars: () => void;
  setSearchTerm: (term: string) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  goToToday: () => void;
  goToPrevious: () => void;
  goToNext: () => void;
  refreshData: () => Promise<void>;
}

export function useCalendar(): UseCalendarReturn {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>('month');
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [events, setEvents] = useState<CalendarEventWithCalendar[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [agendaAnchorDate, setAgendaAnchorDate] = useState<Date>(new Date());

  const agendaVisibleDates = useMemo(() => {
    if (view !== 'agenda') return [];
    return getNextNDatesWithEvents(events, agendaAnchorDate, AGENDA_DATES_PER_PAGE);
  }, [events, agendaAnchorDate, view]);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadEvents();
  }, [currentDate, view, selectedCalendars]);

  const loadInitialData = async () => {
    setIsLoading(true);
    const calendarsData = await fetchCalendars();
    setCalendars(calendarsData);
    const allCalendarIds = calendarsData.map(c => c.id);
    setSelectedCalendars(allCalendarIds);
    setIsLoading(false);
  };

  const loadEvents = async () => {
    if (calendars.length === 0 && selectedCalendars.length === 0) return;

    setIsLoading(true);
    const { startDate, endDate } = getDateRange(currentDate, view);
    const data = await fetchCalendarEventsWithCalendar(
      startDate,
      endDate,
      selectedCalendars.length > 0 ? selectedCalendars : undefined
    );
    setEvents(data);
    setIsLoading(false);
  };

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    const calendarsData = await fetchCalendars();
    setCalendars(calendarsData);

    const { startDate, endDate } = getDateRange(currentDate, view);
    const eventsData = await fetchCalendarEventsWithCalendar(
      startDate,
      endDate,
      selectedCalendars.length > 0 ? selectedCalendars : undefined
    );
    setEvents(eventsData);
    setIsLoading(false);
  }, [currentDate, view, selectedCalendars]);

  const toggleCalendar = useCallback((calendarId: string) => {
    setSelectedCalendars(prev =>
      prev.includes(calendarId)
        ? prev.filter(id => id !== calendarId)
        : [...prev, calendarId]
    );
  }, []);

  const selectAllCalendars = useCallback(() => {
    setSelectedCalendars(calendars.map(c => c.id));
  }, [calendars]);

  const clearAllCalendars = useCallback(() => {
    setSelectedCalendars([]);
  }, []);

  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentDate(today);
    if (view === 'agenda') {
      setAgendaAnchorDate(today);
    }
  }, [view]);

  const goToPrevious = useCallback(() => {
    if (view === 'agenda') {
      const newAnchor = new Date(agendaAnchorDate);
      newAnchor.setDate(newAnchor.getDate() - 1);
      setAgendaAnchorDate(newAnchor);
      return;
    }
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
  }, [view, agendaAnchorDate]);

  const goToNext = useCallback(() => {
    if (view === 'agenda') {
      const newAnchor = new Date(agendaAnchorDate);
      newAnchor.setDate(newAnchor.getDate() + 1);
      setAgendaAnchorDate(newAnchor);
      return;
    }
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
  }, [view, agendaAnchorDate]);

  return {
    currentDate,
    view,
    selectedCalendars,
    calendars,
    events,
    isLoading,
    searchTerm,
    sidebarCollapsed,
    agendaAnchorDate,
    agendaVisibleDates,
    setCurrentDate,
    setView,
    toggleCalendar,
    selectAllCalendars,
    clearAllCalendars,
    setSearchTerm,
    setSidebarCollapsed,
    goToToday,
    goToPrevious,
    goToNext,
    refreshData
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
      endDate.setMonth(endDate.getMonth() + 2);
      endDate.setHours(23, 59, 59, 999);
      break;
  }

  return { startDate, endDate };
}
