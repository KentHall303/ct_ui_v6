export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function isToday(date: Date | string): boolean {
  return isSameDay(date, new Date());
}

export function getMonthDays(date: Date): Date[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];

  const startDayOfWeek = firstDay.getDay();
  for (let i = 0; i < startDayOfWeek; i++) {
    const prevDay = new Date(year, month, -startDayOfWeek + i + 1);
    days.push(prevDay);
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day));
  }

  const totalNeeded = startDayOfWeek + lastDay.getDate();
  const totalRows = totalNeeded <= 35 ? 35 : 42;
  const remainingDays = totalRows - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
}

export function isDateInMonth(date: Date, currentMonth: Date): boolean {
  return date.getMonth() === currentMonth.getMonth() &&
         date.getFullYear() === currentMonth.getFullYear();
}

export function dateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isEventOnDate(eventStart: string, eventEnd: string, date: Date): boolean {
  const start = new Date(eventStart);
  const end = new Date(eventEnd);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  return checkDate >= start && checkDate <= end;
}

export function isEventStart(eventStart: string, date: Date): boolean {
  return isSameDay(new Date(eventStart), date);
}

export function isEventEnd(eventEnd: string, date: Date): boolean {
  return isSameDay(new Date(eventEnd), date);
}

export function isEventMiddle(eventStart: string, eventEnd: string, date: Date): boolean {
  const start = new Date(eventStart);
  const end = new Date(eventEnd);
  const checkDate = new Date(date);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  checkDate.setHours(0, 0, 0, 0);

  return checkDate > start && checkDate < end;
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function getWeekDays(date: Date): Date[] {
  const days: Date[] = [];
  const current = new Date(date);
  const dayOfWeek = current.getDay();
  current.setDate(current.getDate() - dayOfWeek);

  for (let i = 0; i < 7; i++) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
}

export function getHourFromDate(dateString: string): number {
  const d = new Date(dateString);
  return d.getHours();
}

export function getMinuteFromDate(dateString: string): number {
  const d = new Date(dateString);
  return d.getMinutes();
}

export function getEventDurationInMinutes(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.max(30, (end.getTime() - start.getTime()) / (1000 * 60));
}

export function formatTimeRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const formatHour = (d: Date) => {
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const h = hours.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');
    return `${h}:${m}`;
  };
  return `${formatHour(start)} - ${formatHour(end)}`;
}

export function getVisibleDateRange(
  view: 'month' | 'week' | 'day' | 'agenda',
  currentDate: Date
): { start: Date; end: Date } {
  if (view === 'day') {
    const start = new Date(currentDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(currentDate);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  if (view === 'week') {
    const weekDays = getWeekDays(currentDate);
    const start = new Date(weekDays[0]);
    start.setHours(0, 0, 0, 0);
    const end = new Date(weekDays[6]);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  const monthDays = getMonthDays(currentDate);
  const start = new Date(monthDays[0]);
  start.setHours(0, 0, 0, 0);
  const end = new Date(monthDays[monthDays.length - 1]);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

export function getWeekNumber(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNumber = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNumber + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}

export function formatWeekHeader(date: Date): string {
  const weekDays = getWeekDays(date);
  const startDate = weekDays[0];
  const endDate = weekDays[6];
  const weekNumber = getWeekNumber(date);

  const startMonth = startDate.toLocaleDateString('en-US', { month: 'long' });
  const endMonth = endDate.toLocaleDateString('en-US', { month: 'long' });
  const year = endDate.getFullYear();

  if (startMonth === endMonth) {
    return `Week ${weekNumber} - ${startMonth} ${startDate.getDate()} - ${endDate.getDate()}, ${year}`;
  } else {
    return `Week ${weekNumber} - ${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}, ${year}`;
  }
}

export function formatFullDayDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();
}
