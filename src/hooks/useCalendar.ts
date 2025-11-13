import { useState, useCallback, useEffect } from 'react';
import {
  fetchEstimators,
  fetchCalendarEvents,
  getAllSkills,
  Estimator,
  EstimatorFilters,
  CalendarEventWithEstimator
} from '../services/calendarService';

export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

export interface UseCalendarReturn {
  currentDate: Date;
  view: CalendarView;
  selectedEstimators: string[];
  estimators: Estimator[];
  allEstimators: Estimator[];
  events: CalendarEventWithEstimator[];
  isLoading: boolean;
  searchTerm: string;
  sidebarCollapsed: boolean;
  rateFilter: { min?: number; max?: number };
  skillFilters: string[];
  availableSkills: string[];
  setCurrentDate: (date: Date) => void;
  setView: (view: CalendarView) => void;
  toggleEstimator: (estimatorId: string) => void;
  setSearchTerm: (term: string) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setRateFilter: (filter: { min?: number; max?: number }) => void;
  toggleSkillFilter: (skill: string) => void;
  clearAllFilters: () => void;
  goToToday: () => void;
  goToPrevious: () => void;
  goToNext: () => void;
  refreshEvents: () => Promise<void>;
}

export function useCalendar(): UseCalendarReturn {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>('month');
  const [selectedEstimators, setSelectedEstimators] = useState<string[]>([]);
  const [allEstimators, setAllEstimators] = useState<Estimator[]>([]);
  const [estimators, setEstimators] = useState<Estimator[]>([]);
  const [events, setEvents] = useState<CalendarEventWithEstimator[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [rateFilter, setRateFilter] = useState<{ min?: number; max?: number }>({});
  const [skillFilters, setSkillFilters] = useState<string[]>([]);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadEstimators();
  }, [rateFilter, skillFilters]);

  useEffect(() => {
    loadEvents();
  }, [currentDate, view, selectedEstimators]);

  const loadInitialData = async () => {
    const [allEstimatorsData, skills] = await Promise.all([
      fetchEstimators(),
      getAllSkills()
    ]);
    setAllEstimators(allEstimatorsData);
    setEstimators(allEstimatorsData);
    setAvailableSkills(skills);
  };

  const loadEstimators = async () => {
    const filters: EstimatorFilters = {};

    if (rateFilter.min !== undefined || rateFilter.max !== undefined) {
      filters.minRate = rateFilter.min;
      filters.maxRate = rateFilter.max;
    }

    if (skillFilters.length > 0) {
      filters.skills = skillFilters;
    }

    const data = await fetchEstimators(Object.keys(filters).length > 0 ? filters : undefined);
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

  const toggleSkillFilter = useCallback((skill: string) => {
    setSkillFilters(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  }, []);

  const clearAllFilters = useCallback(() => {
    setRateFilter({});
    setSkillFilters([]);
    setSelectedEstimators([]);
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
    allEstimators,
    events,
    isLoading,
    searchTerm,
    sidebarCollapsed,
    rateFilter,
    skillFilters,
    availableSkills,
    setCurrentDate,
    setView,
    toggleEstimator,
    setSearchTerm,
    setSidebarCollapsed,
    setRateFilter,
    toggleSkillFilter,
    clearAllFilters,
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
